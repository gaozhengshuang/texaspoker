package main

import (
	"fmt"
	_ "gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	"github.com/go-redis/redis"
	"strconv"
	"strings"
	_"time"
)

// 添加道具
func (u *GateUser) AddItem(item int32, num int64, reason string, syn bool) {
	if item == int32(msg.ItemId_YuanBao) {
		u.AddYuanbao(num, reason, syn)
	} else if item == int32(msg.ItemId_Gold) {
		u.AddGold(num, reason, syn)
	} else if item == int32(msg.ItemId_Diamond) {
		u.AddDiamond(num, reason, syn)
	} else {
		sumnum := Redis().HIncrBy(fmt.Sprintf("useritem_%d_%d", u.Id(), item), "num", num).Val()
		if sumnum == int64(num) {
			Redis().SAdd(fmt.Sprintf("userbag_%d", u.Id()), fmt.Sprintf("%d", item))
		}
		u.UpdateItem(item, int32(sumnum))
		log.Info("玩家[%d] 添加道具 itemid[%d] num[%d] reason:%s",u.Id(), item, sumnum, reason)
	}
}

//检查是否有足够的道具
func (u *GateUser) CheckEnoughItem(item int32, num int64) bool {
	if item == int32(msg.ItemId_YuanBao) {
		return u.GetYuanbao() >= num
	} else if item == int32(msg.ItemId_Gold) {
		return u.GetGold() >= num
	} else if item == int32(msg.ItemId_Diamond) {
		return u.GetDiamond() >= num
	} else {
		have := util.Atol(Redis().HGet(fmt.Sprintf("useritem_%d_%d", u.Id(), item), "num").Val())
		return have >= num
	}
}

// 扣除道具
func (u *GateUser) RemoveItem(item int32, num int64, reason string) bool {
	if item == int32(msg.ItemId_YuanBao) {
		return u.RemoveYuanbao(num, reason, true)
	} else if item == int32(msg.ItemId_Gold) {
		return u.RemoveGold(num, reason, true)
	} else if item == int32(msg.ItemId_Diamond) {
		return u.RemoveDiamond(num, reason, true)
	} else {
		if u.CheckEnoughItem(item, num) {
			return false
		}
		sumnum := Redis().HIncrBy(fmt.Sprintf("useritem_%d_%d", u.Id(), item), "num", -num).Val()
		if sumnum == 0 {
			Redis().SRem(fmt.Sprintf("userbag_%d"), u.Id(), fmt.Sprintf("%d"), item)
		}
		u.UpdateItem(item, int32(sumnum))
		log.Info("玩家[%d] 减少道具 itemid[%d] num[%d] reason:%s",u.Id(), item, sumnum, reason)
		return true
	}
}

// 金币
func (u *GateUser) GetGold() int64 {
	return u.EntityBase().Gold()
}

func (u *GateUser) AddGold(gold int64, reason string, syn bool) {
	u.EntityBase().IncGold(gold)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加金币[%d] 库存[%d] 原因[%s]", u.Id(), gold, u.GetGold(), reason)
	u.SyncGoldRankRedis()
	u.OnAchieveProcessChanged(int32(AchieveGroup_Gold))
}

func (u *GateUser) RemoveGold(gold int64, reason string, syn bool) bool {
	goldsrc := u.GetGold()
	if goldsrc < gold {
		log.Info("玩家[%d] 扣除金币失败[%d] 原因[%s]", u.Id(), gold, reason)
		return false
	}

	u.EntityBase().DecGold(gold)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 扣除金币[%d] 库存[%d] 原因[%s]", u.Id(), gold, u.GetGold(), reason)
	u.SyncGoldRankRedis()
	return true
}

// 添加元宝
func (u *GateUser) GetYuanbao() int64 {
	return u.EntityBase().YuanBao()
}

func (u *GateUser) AddYuanbao(yuanbao int64, reason string, syn bool) {
	u.EntityBase().IncYuanBao(yuanbao)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加元宝[%d] 库存[%d] 原因[%s]", u.Id(), yuanbao, u.GetYuanbao(), reason)
}

func (u *GateUser) RemoveYuanbao(yuanbao int64, reason string, syn bool) bool {
	yuanbaosrc := u.GetYuanbao()
	if yuanbaosrc < yuanbao {
		log.Info("玩家[%d] 扣除元宝[%d]失败 库存[%d] 原因[%s]", u.Id(), yuanbao, yuanbaosrc, reason)
		return false
	}

	u.EntityBase().DecYuanBao(yuanbao)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 扣除元宝[%d] 库存[%d] 原因[%s]", u.Id(), yuanbao, u.GetYuanbao(), reason)
	return true
}

// 添加钻石
func (u *GateUser) GetDiamond() int64 {
	return u.EntityBase().Diamond()
}

func (u *GateUser) AddDiamond(num int64, reason string, syn bool) {
	u.EntityBase().IncDiamond(num)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加钻石[%d] 库存[%d] 原因[%s]", u.Id(), num, u.GetDiamond(), reason)
}

func (u *GateUser) RemoveDiamond(num int64, reason string, syn bool) bool {
	diamondsrc := u.GetDiamond()
	if diamondsrc < num {
		log.Info("玩家[%d] 添加钻石[%d]失败 库存[%d] 原因[%s]", u.Id(), num, diamondsrc, reason)
		return false
	}

	u.EntityBase().DecDiamond(num)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加钻石[%d] 库存[%d] 原因[%s]", u.Id(), num, u.GetDiamond(), reason)
	return true
}

func (u *GateUser) SendPropertyChange() {
	send := &msg.RS2C_RolePushPropertyChange{}
	send.Diamond = pb.Int64(u.GetDiamond())
	send.Gold = pb.Int64(u.GetGold())
	send.Safegold = pb.Int64(0)
	send.Yuanbao = pb.Int64(u.GetYuanbao())
	send.Silvercardtime = pb.Int32(u.silvercardtime)
	send.Goldcardtime = pb.Int32(u.goldcardtime)
	u.SendMsg(send)
}

func (u *GateUser) Level() int32 {
	return u.EntityBase().Level()
}

func (u *GateUser) AddLevel(num int32) {
	u.EntityBase().IncLevel(num)
	u.OnAchieveProcessChanged(int32(AchieveGroup_Level))
}

func (u *GateUser) Exp() int32 {
	return u.EntityBase().Exp()
}

func (u *GateUser) SetExp(exp int32) {
	u.EntityBase().SetExp(exp)
}

// 添加经验
func (u *GateUser) AddExp(num int32, reason string) {
	oldlevel, exp := u.Level(), u.Exp()
	newlevel := oldlevel
	exp = exp + num
	for {
		lvlbase, ok := tbl.LevelBasee.ExpById[oldlevel + 1]
		if ok == false {
			break
		}

		// 下一级需要经验
		if exp < int32(lvlbase.Exp) || lvlbase.Exp == 0 {
			break
		}

		exp = exp - int32(lvlbase.Exp)
		u.OnLevelUp()
		newlevel++
	}

	u.SetExp(exp)
	u.SyncLevelRankRedis()
	log.Info("玩家[%d] 添加经验[%d] 老等级[%d] 新等级[%d] 经验[%d] 原因[%s]", u.Id(), num, oldlevel, newlevel, exp, reason)
}

// 升级
func (u *GateUser) OnLevelUp() {
	u.AddLevel(1)
}

func (u *GateUser) VipLevel() int32 {
	return u.EntityBase().VipLevel()
}

func (u *GateUser) SetVipLevel(num int32) {
	u.EntityBase().SetVipLevel(num)
}

func (u *GateUser) VipExp() int32 {
	return u.EntityBase().VipExp()
}

func (u *GateUser) AddVipExp(vipexp int32) {
	maxexp := int32(tbl.Global.Vip.maxexp)
	oldvipexp := VipExp()
	newvipexp := oldvipexp + vipexp
	if newvipexp > maxexp {
		newvipexp = maxexp
	}
	u.EntityBase().SetVipExp(newvipexp)
	u.CalVipLevel(newvipexp)
}

func (u *GateUser) SubVipExp(vipexp int32) {
	oldvipexp := VipExp()
	newvipexp := oldvipexp - vipexp 
	if newvipexp < 0 {
		newvipexp = 0
	}
	u.EntityBase().SetVipExp(newvipexp)
	u.CalVipLevel(newvipexp)
}

func (u *GateUser) CalVipLevel(vipexp) {
	
}

// 获得补偿
func (u *GateUser) CheckHaveCompensation() {
	strkey := fmt.Sprintf("compen_%d", u.Id())
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

		u.AddItem(int32(intid), int64(intnum), "系统补偿", true)
		Redis().Del(strkey)
		//log.Info("玩家%s获得系统补偿 id:%d, 数量:%d", u.account, intid, intnum)
	}
}

func (u *GateUser) SendItemInfo() {
	items := Redis().SMembers(fmt.Sprintf("userbag_%d", u.Id())).Val()
	send := &msg.GW2C_PushItemList{}
	pipe := Redis().Pipeline()
	for _, itemid := range items {
		pipe.HGetAll(fmt.Sprintf("useritem_%d_%s", u.Id(), itemid))
	}
	cmds, err := pipe.Exec()
	if err != nil {
		log.Error("[道具] 拉取道具列表失败 %s", err)
		pipe.Close()
		return
	}
	pipe.Close()

	if len(items) != len(cmds) {
		log.Error("[道具] 拉取道具列表失败 数量不匹配")
		return
	}

	for key, cmd := range cmds {
		cmdbase , ok := cmd.(*redis.StringStringMapCmd)
		if ok == false {
			continue
		}
		var num int32 = 0
		for k, v := range cmdbase.Val() {
			if k == "num"   { num = util.NewVarType(v).Int32() }
		}
		iteminfo := &msg.UserItemInfo{}
		id,_ := strconv.ParseInt(items[key], 10, 64)
		iteminfo.Id = pb.Int32(int32(id))
		iteminfo.Num = pb.Int32(int32(num))
		//log.Info("道具信息%v", iteminfo)
		send.List = append(send.List, iteminfo)
	}
	u.SendMsg(send)
}

func (u *GateUser) UpdateItem(id int32, num int32) {
	send := &msg.GW2C_PushUpdateItem{}
	send.Id = pb.Int32(id)
	send.Num = pb.Int32(num)
	u.SendMsg(send)
}


