package main

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	_ "gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	"net/http"
	"strconv"
	"strings"
	"time"
)

// 添加道具
func (this *GateUser) AddItem(item int32, num int32, reason string, syn bool) {
	//log.Info("玩家[%d] 添加道具 itemid[%d] num[%d] reason:%s",this.Id(),item,num,reason)
	if item == int32(msg.ItemId_YuanBao) {
		this.AddYuanbao(num, reason, syn)
	} else if item == int32(msg.ItemId_Gold) {
		this.AddGold(num, reason, syn)
	} else if item == int32(msg.ItemId_Diamond) {
		this.AddDiamond(num, reason, syn)
	} else if item == int32(msg.ItemId_FreeStep) {
	} else if item == int32(msg.ItemId_Strength) {
	} else {
		this.bag.AddItem(item, num, reason)
	}
	//CountMgr().AddGet(item, num)
	RCounter().IncrByDate("item_add", int32(item), num)
}

func (u *GateUser) SendPropertyChange() {
	send := &msg.RS2C_RolePushPropertyChange{}
	send.Diamond = pb.Int32(u.diamond)
	send.Gold = pb.Int32(u.gold)
	send.Safegold = pb.Int32(0)
	u.SendMsg(send)
}

// 扣除道具
func (this *GateUser) RemoveItem(item int32, num int32, reason string) bool {
	if item == int32(msg.ItemId_YuanBao) {
		return this.RemoveYuanbao(num, reason, true)
	} else if item == int32(msg.ItemId_Gold) {
		return this.RemoveGold(num, reason, true)
	} else if item == int32(msg.ItemId_Diamond) {
		return this.RemoveDiamond(num, reason, true)
	} else {
		return this.bag.RemoveItem(item, num, reason)
	}
}

// 金币
func (this *GateUser) GetGold() int32 { return this.gold }
func (this *GateUser) AddGold(gold int32, reason string, syn bool) {
	this.gold = this.GetGold() + gold
	if syn {
		this.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加金币[%d] 库存[%d] 原因[%s]", this.Id(), gold, this.GetGold(), reason)
	this.SyncGoldRankRedis()
}
func (this *GateUser) RemoveGold(gold int32, reason string, syn bool) bool {
	if this.GetGold() >= gold {
		this.gold = this.GetGold() - gold
		if syn {
			this.SendPropertyChange()
		}
		log.Info("玩家[%d] 扣除金币[%d] 库存[%d] 原因[%s]", this.Id(), gold, this.GetGold(), reason)
		RCounter().IncrByDate("item_remove", int32(msg.ItemId_Gold), gold)
		this.SyncGoldRankRedis()
		return true
	}
	log.Info("玩家[%d] 扣除金币失败[%d] 原因[%s]", this.Id(), gold, reason)
	return false
}

// 添加元宝
func (this *GateUser) GetYuanbao() int32 { return this.yuanbao }
func (this *GateUser) AddYuanbao(yuanbao int32, reason string, syn bool) {
	this.yuanbao = this.GetYuanbao() + yuanbao
	if syn {
		send := &msg.GW2C_PushYuanBaoUpdate{Num: pb.Int32(this.GetYuanbao())}
		this.SendMsg(send)
	}
	RCounter().IncrByDate("item_add", int32(msg.ItemId_YuanBao), yuanbao)
	log.Info("玩家[%d] 添加元宝[%d] 库存[%d] 原因[%s]", this.Id(), yuanbao, this.GetYuanbao(), reason)
}
func (this *GateUser) RemoveYuanbao(yuanbao int32, reason string, syn bool) bool {
	if this.GetYuanbao() >= yuanbao {
		this.yuanbao = this.GetYuanbao() - yuanbao
		if syn {
			send := &msg.GW2C_PushYuanBaoUpdate{Num: pb.Int32(this.GetYuanbao())}
			this.SendMsg(send)
		}
		log.Info("玩家[%d] 扣除元宝[%d] 库存[%d] 原因[%s]", this.Id(), yuanbao, this.GetYuanbao(), reason)
		RCounter().IncrByDate("item_remove", int32(msg.ItemId_YuanBao), yuanbao)
		return true
	}
	log.Info("玩家[%d] 扣除元宝[%d]失败 库存[%d] 原因[%s]", this.Id(), yuanbao, this.GetYuanbao(), reason)
	return false
}

// 添加钻石
func (this *GateUser) GetDiamond() int32 { return this.diamond }
func (this *GateUser) AddDiamond(num int32, reason string, syn bool) {
	this.diamond = this.GetDiamond() + num
	//this.SynAddMidsMoney(int64(num), reason)
	if syn {
		this.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加钻石[%d] 库存[%d] 原因[%s]", this.Id(), num, this.GetDiamond(), reason)
}
func (this *GateUser) RemoveDiamond(num int32, reason string, syn bool) bool {
	if this.GetDiamond() >= num {
		this.diamond = this.GetDiamond() - num
		//this.SynRemoveMidsMoney(int64(num), reason)
		if syn {
			this.SendPropertyChange()
		}
		log.Info("玩家[%d] 添加钻石[%d] 库存[%d] 原因[%s]", this.Id(), num, this.GetDiamond(), reason)
		RCounter().IncrByDate("item_remove", int32(msg.ItemId_Diamond), num)
		return true
	}
	log.Info("玩家[%d] 添加钻石[%d]失败 库存[%d] 原因[%s]", this.Id(), num, this.GetDiamond(), reason)
	return false
}

// 购买道具
func (this *GateUser) BuyItem(productid int32, num int32) {
	product, ok := tbl.ShopBase.TShopById[productid]
	if ok == false {
		log.Error("[元宝商店] 玩家[%s %d] 购买商品[%d]，配置不存在", this.Name(), this.Id(), productid)
		return
	}

	itemid := int32(product.Itemid)
	item, ok := tbl.ItemBase.ItemBaseDataById[itemid]
	if ok == false {
		log.Error("[元宝商店] 玩家[%s %d] 购买商品[%d]，无效的道具[%d]", this.Name(), this.Id(), productid, itemid)
		return
	}

	cost := int32(product.Price) * num
	if this.GetYuanbao() < cost {
		log.Error("[元宝商店] 玩家[%s %d] 购买商品[%d]，元宝不足", this.Name(), this.Id(), itemid)
		this.SendNotify("元宝不足") // 元宝要提示为积分，唉
		return
	}
	this.RemoveYuanbao(cost, "商店购买道具", true)
	this.AddItem(itemid, num*int32(product.Num), "商店购买道具", true)
	this.SendNotify("购买成功")
	GateSvr().SendNotice(this.Head(), msg.NoticeType_Marquee, def.MakeNoticeText(this.Name(), "#00ff00", 26),
		def.MakeNoticeText("获得", "#00ff00", 26), def.MakeNoticeText(item.Name, "#00ff00", 26))

}

// 使用道具
func (this *GateUser) UseItem(itemid, num int32) {
	have := this.bag.GetItemNum(itemid)
	if have < num {
		this.SendNotify("道具数量不足")
		return
	}

	this.bag.RemoveItem(itemid, num, "使用背包道具")
}

// 检查玩家身上是否有哪些道具 参数info 为道具id做key 数量做Value的map
func (this *GateUser) CheckEnoughItems(info map[int32]int32) bool {
	for itemid, num := range info {
		have := this.bag.GetItemNum(itemid)
		if have < num {
			return false
		}
	}
	return true
}

// 提货
func (this *GateUser) DeliveryGoods(list []*msg.DeliveryGoods, token string) {

	// 虚拟道具不扣运费，小商品不能单独邮寄
	IsFreeDelivercost, IsAllSmallware := true, true
	for _, item := range list {
		base, ok := tbl.ItemBase.ItemBaseDataById[item.GetItemid()]
		if ok == false {
			this.SendNotify("存在无效的道具")
			return
		}
		if base.Type != int32(msg.ItemType_MobileCard) && base.Type != int32(msg.ItemType_ShoppingCard) {
			IsFreeDelivercost = false
		}
		if base.Type != int32(msg.ItemType_Smallware) {
			IsAllSmallware = false
		}

		if base.Type == int32(msg.ItemType_ClothesItem) {
			this.SendNotify("时装道具不能发货")
			return
		}
	}

	// 小商品不能单独邮寄
	if IsAllSmallware == true {
		this.SendNotify("小商品不能单独邮寄")
		return
	}

	// 虚拟道具不扣运费，实物道具邮寄少于2个道具扣运费
	amount, delivercost := int32(0), int32(0)
	if IsFreeDelivercost == false {
		for _, item := range list {
			amount += item.GetNum()
		}
		if int64(amount) < tbl.Delivery.Freelimit {
			delivercost = int32(tbl.Delivery.Cost)
			if this.GetYuanbao() < delivercost {
				this.SendNotify("运费不足")
				return
			}
		}
	}

	// 玩家收货地址为空，从红包获取一次
	if this.GetAddressSize() == 0 {
		this.SendNotify("提货失败，没有收货地址")
		log.Error("[提货] 玩家[%s %d] 没有收货地址", this.Name(), this.Id())
		return
	}

	// 检查
	for _, item := range list {
		if this.bag.GetItemNum(item.GetItemid()) < item.GetNum() {
			this.SendNotify("提货失败，道具数量不足")
			log.Error("[提货] 玩家[%s %d] 提货[%d] 数量[%d]，道具数量不足", this.Name(), this.Id(), item.GetItemid(), item.GetNum())
			return
		}
	}

	// 删除
	if delivercost >= 0 {
		this.RemoveYuanbao(delivercost, "提货扣运费", true)
	}
	for _, item := range list {
		this.RemoveItem(item.GetItemid(), item.GetNum(), "玩家提货")
	}

	// 发送到订单到平台
	type OrderItem struct {
		Id    int32  `json:"itemid"`
		Desc  string `json:"itemname"`
		Count int32  `json:"count"`
	}
	type DeliveryOrder struct {
		Id      int64       `json:"uid"`
		Way     string      `json:"way"`
		Name    string      `json:"playerName"`
		Phone   string      `json:"playerMobile"`
		Address string      `json:"playerAddr"`
		Nonce   string      `json:"nonce"`
		Sign    string      `json:"sign"`
		GameId  string      `json:"gameid"`
		Dev     string      `json:"dev"`
		Items   []OrderItem `json:"itemlist"`
	}

	// 发货平台提供的Key，不是红包key
	key1 := "top5737e7d6cb76cc84cb74bd9df946c"
	key2 := "01ca55b6371a5e5023130a0c6ea5dd11883af1c7bbbede3dea52d01a25877019"

	address := this.GetDefaultAddress()
	order := &DeliveryOrder{Id: this.Id(), Way: "0", Name: address.GetReceiver(), Phone: address.GetPhone(), Address: address.GetAddress()}
	order.GameId = tbl.Delivery.GameID
	order.Dev = tbl.Delivery.Dev // 测试标记
	for _, item := range list {
		base := FindItemBase(item.GetItemid())
		if base == nil {
			log.Error("[提货] 玩家[%s %d] 道具[%d]配置无效", this.Name(), this.Id(), item.GetItemid())
			continue
		}
		orderitem := OrderItem{Id: base.Id, Desc: base.Name, Count: item.GetNum()}
		order.Items = append(order.Items, orderitem)
	}
	order.Nonce = strconv.FormatInt(int64(this.Id()), 10) + "_" + strconv.FormatInt(util.CURTIMEUS(), 10)
	signbytes := []byte(key1 + order.Nonce + key2)
	md5array := md5.Sum(signbytes)
	md5bytes := []byte(md5array[:])
	md5string := fmt.Sprintf("%x", md5bytes)
	order.Sign = md5string

	orderbytes, err := json.Marshal(order)
	if err != nil {
		this.SendNotify("提货异常，稍后再试")
		log.Error("[提货] 玩家[%s %d] 序列化json订单失败[%s]", this.Name(), this.Id(), err)
		return
	}

	orderstr := util.BytesToString(orderbytes)
	url_platform := tbl.Delivery.URLAPI
	log.Info("[提货] 玩家[%s %d] 向平台[%s] 推送订单[%s]\n", this.Name(), this.Id(), url_platform, orderstr)
	resp, posterr := network.HttpPost(url_platform, orderstr)
	if posterr != nil {
		log.Error("[提货] 玩家[%s %d] HttpPost失败 err[%v] resp[%v]", this.Name(), this.Id(), posterr, resp)
		return
	}

	if resp.Code != http.StatusOK {
		log.Error("[提货] 玩家[%s %d] HttpPost返回错误码 resp[%v]", this.Name(), this.Id(), resp)
		return
	}

	this.SendNotify("提货成功")
}

// 签到
/*
func (this *GateUser) GetSignReward() {
	if util.IsSameDay(int64(this.signtime), util.CURTIME()) {
		return
	}
	sconfig, ok := tbl.SignBase.TSignById[int32(this.signreward+1)]
	if !ok {
		return
	}
	this.SendNotify("领取成功")
	this.signtime = int32(util.CURTIME())
	this.AddItem(int32(sconfig.CostId), int32(sconfig.Num), "签到奖励", true)
	this.signreward += 1
	if this.signreward >= 7 {
		this.signreward = 0
	}

	item, itemok := tbl.ItemBase.ItemBaseDataById[int32(sconfig.CostId)]
	if itemok {
		GateSvr().SendNotice(this.Head(), msg.NoticeType_Marquee,
			def.MakeNoticeText(this.Name(), "#00ff00", 26),
			def.MakeNoticeText("领取每日签到奖励", "#00ff00", 26),
			def.MakeNoticeText(strconv.Itoa(int(sconfig.Num)), "#00ff00", 26),
			def.MakeNoticeText(item.Name, "#00ff00", 26),
		)
	}
}
*/

func (this *GateUser) SendSign() {
	if util.IsSameDay(int64(this.signtime), util.CURTIME()) {
		return
	}
	/*
		send := &msg.GW2C_Ret7DayReward{Day: pb.Int32(this.signreward + 1)}
		this.SendMsg(send)
	*/
}

// TODO: 获得补偿
func (this *GateUser) CheckHaveCompensation() {
	strkey := fmt.Sprintf("compen_%d", this.Id())
	members := Redis().SMembers(strkey).Val()
	//log.Info("key %s", strkey)
	for _, value := range members {
		para := strings.Split(value, ":")
		if len(para) != 2 {
			continue
		}

		intid, iderr := strconv.Atoi(para[0])
		intnum, numerr := strconv.Atoi(para[1])
		if iderr != nil || numerr != nil {
			continue
		}

		this.AddItem(int32(intid), int32(intnum), "系统补偿", true)
		Redis().Del(strkey)
		//log.Info("玩家%s获得系统补偿 id:%d, 数量:%d", this.account, intid, intnum)
	}
}

// 统计登陆
func (this *GateUser) LoginStatistics() {
	datetime := time.Now().Format("2006-01-02")
	if this.tm_login == 0 {
		key := fmt.Sprintf("%s_create", datetime)
		Redis().Incr(key)
		key = fmt.Sprintf("%s_loginsum", datetime)
		Redis().Incr(key)
		this.continuelogin = 1
		return
	}
	diffday := false
	if util.IsNextDay(this.tm_login, util.CURTIME()) {
		this.continuelogin += 1
		if this.nocountlogin == 0 {
			key := fmt.Sprintf("%s_login_%d", datetime, this.continuelogin)
			Redis().Incr(key)
		}
		key2 := fmt.Sprintf("%s_loginsum", datetime)
		Redis().Incr(key2)
		diffday = true
	} else {
		if !util.IsSameDay(this.tm_login, util.CURTIME()) {
			this.continuelogin = 1
			this.nocountlogin = 1
			key := fmt.Sprintf("%s_loginsum", datetime)
			Redis().Incr(key)
			diffday = true
		}
	}

	if diffday {
		this.ActivityResetByDay()
	}

	if !util.IsSameWeek(this.tm_login, util.CURTIME()) {
		this.ActivityResetByWeek()
	}
}

// 幸运抽奖
func (this *GateUser) LuckyDraw() {

	// 检查消耗
	cost := int32(tbl.Game.LuckDrawPrice)
	if this.GetGold() < cost {
		this.SendNotify("金币不足")
		return
	}

	// 每周重置
	curtime := util.CURTIME()
	if util.IsSameWeek(this.GetDiamondCostReset(), curtime) != false {
		this.SetDiamondCost(0)
		this.SetDiamondCostReset(util.CURTIME())
	}

	// 解析概率配置
	ParseProString := func(sliceweight *[]util.WeightOdds, Pro []string) bool {
		log.Trace("[%d %s] 抽奖概率为[%v]", this.Id(), this.Name(), Pro)
		ProObj := util.SplitIntString(Pro, "-")
		for _, v := range ProObj {
			if v.Len() != 2 {
				log.Error("[幸运抽奖] 解析道具产出概率配置异常 ObjSplit=%#v", v)
				return false
			}
			id, weight := v.Value(0), v.Value(1)
			*sliceweight = append(*sliceweight, util.WeightOdds{Weight: int32(weight), Uid: int64(id), Num: int64(0)})
		}
		return true
	}

	giftweight := make([]util.WeightOdds, 0)
	for _, v := range tbl.GiftProBase.TGiftProById {
		if this.GetDiamondCost() >= int64(v.Limitmin) && this.GetDiamondCost() < int64(v.Limitmax) {
			if ParseProString(&giftweight, v.Pro) == false {
				return
			}
			break
		}
	}

	//for k ,v := range tbl.TBallGiftbase.TBallGiftById {
	//	giftweight = append(giftweight, util.WeightOdds{Weight:v.Pro, Uid:int64(k)})
	//}
	index := util.SelectByWeightOdds(giftweight)
	if index < 0 || index >= int32(len(giftweight)) {
		log.Error("[%d %s] 抽奖异常，无法获取抽奖id", this.Id(), this.Name())
		return
	}

	uid := giftweight[index].Uid
	gift, find := tbl.TBallGiftbase.TBallGiftById[int32(uid)]
	if find == false {
		log.Error("[%d %s] 无效的奖励id[%d]", this.Id(), this.Name(), uid)
		return
	}

	this.RemoveGold(cost, "幸运抽奖", true)

	if int32(gift.ItemId) == int32(msg.ItemId_Gold) {
		this.AddItem(int32(gift.ItemId), int32(gift.Num), "幸运抽奖", false) // 金币不同步，客户端自己添加
	} else {
		this.AddItem(int32(gift.ItemId), int32(gift.Num), "幸运抽奖", true)
	}
	drawitem := &msg.LuckyDrawItem{Time: pb.Int64(curtime), Item: pb.Int32(gift.ItemId), Num: pb.Int32(gift.Num), Worth: pb.Int32(gift.Cost)}
	this.luckydraw = append(this.luckydraw, drawitem)
	this.luckydrawtotal += int64(gift.Cost)
	if len(this.luckydraw) > int(tbl.Game.LuckDrawHistroyLimlit) {
		this.luckydraw = this.luckydraw[1:]
	}

	// 同步抽奖历史列表
	recordmsg := &msg.GW2C_SendLuckyDrawRecord{Luckydraw: &msg.LuckyDrawRecord{Drawlist: make([]*msg.LuckyDrawItem, 0)}}
	for _, v := range this.luckydraw {
		recordmsg.Luckydraw.Drawlist = append(recordmsg.Luckydraw.Drawlist, v)
	}
	this.SendMsg(recordmsg)

	// feedback
	send := &msg.GW2C_LuckyDrawHit{Id: pb.Int32(int32(uid))}
	this.SendMsg(send)
}

// 添加经验
func (this *GateUser) AddExp(num int32, reason string) {
	old, exp := this.Level(), this.Exp()+num
	for {
		lvlbase, ok := tbl.LevelBasee.TLevelById[this.Level()]
		if ok == false {
			break
		}

		// 下一级需要经验
		if exp < int32(lvlbase.ExpNums) || lvlbase.ExpNums == 0 {
			break
		}

		exp = exp - int32(lvlbase.ExpNums)
		this.OnLevelUp()
	}
	this.SetExp(exp)
	log.Info("玩家[%d] 添加经验[%d] 老等级[%d] 新等级[%d] 经验[%d] 原因[%s]", this.Id(), num, old, this.Level(), this.Exp(), reason)
}

// 升级
func (this *GateUser) OnLevelUp() {
	this.AddLevel(1)
}
