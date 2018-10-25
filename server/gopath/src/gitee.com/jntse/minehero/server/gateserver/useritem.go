package main

import (
	"fmt"
	_ "gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	"strconv"
	"strings"
	"time"
)

// 添加道具
func (u *GateUser) AddItem(item int32, num int32, reason string, syn bool) {
	if item == int32(msg.ItemId_YuanBao) {
		u.AddYuanbao(num, reason, syn)
	} else if item == int32(msg.ItemId_Gold) {
		u.AddGold(num, reason, syn)
	} else if item == int32(msg.ItemId_Diamond) {
		u.AddDiamond(num, reason, syn)
	} else {
		sumnum := Redis().IncrBy(fmt.Sprintf("useritem_%d_%d", u.Id(), item), int64(num)).Val()
		if sumnum == int64(num) {
			Redis().SAdd(fmt.Sprintf("userbag_%d"), u.Id(), fmt.Sprintf("%d"), item)
		}
		log.Info("玩家[%d] 添加道具 itemid[%d] num[%d] reason:%s",u.Id(), item, sumnum, reason)
	}
}

//检查是否有足够的道具
func (u *GateUser) CheckEnoughItem(item int32, num int32) bool {
	if item == int32(msg.ItemId_YuanBao) {
		return u.GetYuanbao() >= num
	} else if item == int32(msg.ItemId_Gold) {
		return u.GetGold() >= num
	} else if item == int32(msg.ItemId_Diamond) {
		return u.GetDiamond() >= num
	} else {
		have,_ := Redis().Get(fmt.Sprintf("useritem_%d_%d", u.Id(), item)).Int64()
		return have >= int64(num)
	}
}

// 扣除道具
func (u *GateUser) RemoveItem(item int32, num int32, reason string) bool {
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
		sumnum := Redis().DecrBy(fmt.Sprintf("useritem_%d_%d", u.Id(), item), int64(num)).Val()
		if sumnum == 0 {
			Redis().SRem(fmt.Sprintf("userbag_%d"), u.Id(), fmt.Sprintf("%d"), item)
		}
		log.Info("玩家[%d] 减少道具 itemid[%d] num[%d] reason:%s",u.Id(), item, sumnum, reason)
		return true
	}
}

// 金币
func (u *GateUser) GetGold() int32 {
	gold := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "gold").Val())
	return gold
}

func (u *GateUser) AddGold(gold int32, reason string, syn bool) {
	newgold := u.GetGold() + gold
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "gold", newgold)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加金币[%d] 库存[%d] 原因[%s]", u.Id(), gold, newgold, reason)
	u.SyncGoldRankRedis()
	u.OnAchieveProcessChanged(int32(AchieveGroup_Gold))
}

func (u *GateUser) RemoveGold(gold int32, reason string, syn bool) bool {
	goldsrc := u.GetGold()
	if goldsrc >= gold {
		newgold := goldsrc - gold
		Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "gold", newgold)
		if syn {
			u.SendPropertyChange()
		}
		log.Info("玩家[%d] 扣除金币[%d] 库存[%d] 原因[%s]", u.Id(), gold, newgold, reason)
		//RCounter().IncrByDate("item_remove", int32(msg.ItemId_Gold), gold)
		u.SyncGoldRankRedis()
		return true
	}
	log.Info("玩家[%d] 扣除金币失败[%d] 原因[%s]", u.Id(), gold, reason)
	return false
}

// 添加元宝
func (u *GateUser) GetYuanbao() int32 {
	yuanbao := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao").Val())
	return yuanbao 
}

func (u *GateUser) AddYuanbao(yuanbao int32, reason string, syn bool) {
	newyuanbao := u.GetYuanbao() + yuanbao
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao", newyuanbao)
	if syn {
		u.SendPropertyChange()
	}
	//RCounter().IncrByDate("item_add", int32(msg.ItemId_YuanBao), yuanbao)
	log.Info("玩家[%d] 添加元宝[%d] 库存[%d] 原因[%s]", u.Id(), yuanbao, newyuanbao, reason)
}

func (u *GateUser) RemoveYuanbao(yuanbao int32, reason string, syn bool) bool {
	yuanbaosrc := u.GetYuanbao()
	if yuanbaosrc >= yuanbao {
		newyuanbao := yuanbaosrc - yuanbao
		Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao", newyuanbao)
		if syn {
			//send := &msg.GW2C_PushYuanBaoUpdate{Num: pb.Int32(u.GetYuanbao())}
			//u.SendMsg(send)
			u.SendPropertyChange()
		}
		log.Info("玩家[%d] 扣除元宝[%d] 库存[%d] 原因[%s]", u.Id(), yuanbao, newyuanbao, reason)
		//RCounter().IncrByDate("item_remove", int32(msg.ItemId_YuanBao), yuanbao)
		return true
	}
	log.Info("玩家[%d] 扣除元宝[%d]失败 库存[%d] 原因[%s]", u.Id(), yuanbao, yuanbaosrc, reason)
	return false
}

// 添加钻石
func (u *GateUser) GetDiamond() int32 {
	diamond := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "diamond").Val())
	return diamond
}

func (u *GateUser) AddDiamond(num int32, reason string, syn bool) {
	newdiamond := u.GetDiamond() + num
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "diamond", newdiamond)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加钻石[%d] 库存[%d] 原因[%s]", u.Id(), num, newdiamond, reason)
}

func (u *GateUser) RemoveDiamond(num int32, reason string, syn bool) bool {
	diamondsrc := u.GetDiamond()
	if diamondsrc >= num {
		newdiamond := diamondsrc - num
		Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "diamond", newdiamond)
		if syn {
			u.SendPropertyChange()
		}
		log.Info("玩家[%d] 添加钻石[%d] 库存[%d] 原因[%s]", u.Id(), num, newdiamond, reason)
		//RCounter().IncrByDate("item_remove", int32(msg.ItemId_Diamond), num)
		return true
	}
	log.Info("玩家[%d] 添加钻石[%d]失败 库存[%d] 原因[%s]", u.Id(), num, diamondsrc, reason)
	return false
}

func (u *GateUser) SendPropertyChange() {
	send := &msg.RS2C_RolePushPropertyChange{}
	send.Diamond = pb.Int32(u.GetDiamond())
	send.Gold = pb.Int32(u.GetGold())
	send.Safegold = pb.Int32(0)
	send.Yuanbao = pb.Int32(u.GetYuanbao())
	send.Silvercardtime = pb.Int32(u.silvercardtime)
	send.Goldcardtime = pb.Int32(u.goldcardtime)
	u.SendMsg(send)
}

// TODO: 获得补偿
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

		u.AddItem(int32(intid), int32(intnum), "系统补偿", true)
		Redis().Del(strkey)
		//log.Info("玩家%s获得系统补偿 id:%d, 数量:%d", u.account, intid, intnum)
	}
}

// 统计登陆
func (u *GateUser) LoginStatistics() {
	datetime := time.Now().Format("2006-01-02")
	if u.statistics.tm_login == 0 {
		key := fmt.Sprintf("%s_create", datetime)
		Redis().Incr(key)
		key = fmt.Sprintf("%s_loginsum", datetime)
		Redis().Incr(key)
		u.statistics.continuelogin = 1
		return
	}
	if util.IsNextDay(u.statistics.tm_login, util.CURTIME()) {
		u.statistics.continuelogin += 1
		if u.statistics.nocountlogin == 0 {
			key := fmt.Sprintf("%s_login_%d", datetime, u.statistics.continuelogin)
			Redis().Incr(key)
		}
		key2 := fmt.Sprintf("%s_loginsum", datetime)
		Redis().Incr(key2)
	} else {
		if !util.IsSameDay(u.statistics.tm_login, util.CURTIME()) {
			u.statistics.continuelogin = 1
			u.statistics.nocountlogin = 1
			key := fmt.Sprintf("%s_loginsum", datetime)
			Redis().Incr(key)
		}
	}
	
	//离线跨天
	if !util.IsSameDay(u.statistics.tm_login, util.CURTIME()) {
		u.UserDailyReset()
	}
	//离线跨周
	if !util.IsSameWeek(u.statistics.tm_login, util.CURTIME()) {
		u.ActivityResetByWeek()
		u.WeekResetAchieve()
	}
}

// 添加经验
func (u *GateUser) AddExp(num int32, reason string) {
	oldlevel := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "level").Val())
	exp := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "exp").Val())+num
	newlevel := oldlevel
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
