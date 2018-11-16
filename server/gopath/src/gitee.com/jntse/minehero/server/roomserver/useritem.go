package main
import (
	"fmt"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

func (u *RoomUser) GetGold() int64 {
	if u.IsAI() == true {
		//return u.EntityBase().AIGold()
		return 0
	}
	return u.EntityBase().Gold()
}

func (u *RoomUser) RemoveGold(gold int64, reason string, syn bool) bool {
	if u.IsAI() == true {
		//u.EntityBase().DecAIGold(gold)
		return true
	}
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

func (u *RoomUser) AddGold(gold int64, reason string, syn bool) {
	if u.IsAI() == true {
		//u.EntityBase().IncAIGold(gold)
		return 
	}
	u.EntityBase().IncGold(gold)
	if syn {
		u.SendPropertyChange()
	}
	u.SyncGoldRankRedis()
	u.OnAchieveProcessChanged(int32(AchieveGroup_Gold))
	log.Info("玩家[%d] 添加金币[%d] 库存[%d] 原因[%s]", u.Id(), gold, u.GetGold(), reason)
}

func (u *RoomUser) SetAIGold(gold int64) {
	if u.IsAI() == true {
		u.EntityBase().SetAIGold(gold)
	}
}

func (u *RoomUser) SendPropertyChange() {
	send := &msg.RS2C_RolePushPropertyChange{}
	send.Diamond = pb.Int64(u.GetDiamond())
	send.Gold = pb.Int64(u.GetGold())
	send.Yuanbao =pb.Int64(u.GetYuanbao())
	send.Safegold = pb.Int64(0)
	u.SendClientMsg(send)
}

// 元宝
func (u *RoomUser) GetYuanbao() int64 {
	return u.EntityBase().YuanBao()
}

func (u *RoomUser) AddYuanbao(yuanbao int64, reason string) {
	u.EntityBase().IncYuanBao(yuanbao)
	log.Info("玩家[%d] 添加元宝[%d] 库存[%d] 原因[%s]", u.Id(), yuanbao, u.GetGold(), reason)
}

func (u *RoomUser) RemoveYuanbao(yuanbao int64, reason string, syn bool) bool {
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

func (u *RoomUser) GetDiamond() int64 {
	return u.EntityBase().Diamond()
}

// 移除金卷
func (u *RoomUser) RemoveDiamond(num int64, reason string, syn bool) bool {
	diamondsrc := u.GetDiamond()
	if diamondsrc < num {
		log.Info("玩家[%d] 扣除金卷[%d]失败 库存[%d] 原因[%s]", u.Id(), num, diamondsrc, reason)
		return false
	}

	u.EntityBase().DecDiamond(num)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 扣除金卷[%d] 库存[%d] 原因[%s]", u.Id(), num, u.GetDiamond(), reason)
	return true
}

// 添加金卷
func (u *RoomUser) AddDiamond(num int64, reason string, syn bool) {
	u.EntityBase().IncDiamond(num)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加钻石[%d] 库存[%d] 原因[%s]", u.Id(), num, u.GetDiamond(), reason)
}

// 添加道具
func (u *RoomUser) AddItem(item int32, num int64, reason string, syn bool) {
	if item == int32(msg.ItemId_YuanBao) {
		u.AddYuanbao(num, reason)
	} else if item == int32(msg.ItemId_Gold) {
		u.AddGold(num, reason, syn)
	} else if item == int32(msg.ItemId_Diamond) {
		u.AddDiamond(num, reason, syn)
	} else {
		sumnum := Redis().HIncrBy(fmt.Sprintf("useritem_%d_%d", u.Id(), item), "num", num).Val()
		if sumnum == num {
			Redis().SAdd(fmt.Sprintf("userbag_%d"), u.Id(), fmt.Sprintf("%d"), item)
		}
		u.UpdateItem(item, int32(sumnum))
		log.Info("玩家[%d] 添加道具 itemid[%d] num[%d] reason:%s",u.Id(), item, sumnum, reason)
	}
}

func (u *RoomUser) CheckEnoughItem(item int32, num int64) bool {
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
func (u *RoomUser) RemoveItem(item int32, num int64, reason string) bool {
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

// 添加经验
func (u *RoomUser) AddExp(num int32, reason string, syn bool) {
	send := &msg.RS2GW_AddExp{}
	send.Uid = pb.Int64(u.Id())
	send.Exp = pb.Int32(num)
	send.Txt = pb.String(reason)
	u.SendMsg(send)	
}

//更新道具信息
func (u *RoomUser) UpdateItem(id int32, num int32) {
	send := &msg.GW2C_PushUpdateItem{}
	send.Id = pb.Int32(id)
	send.Num = pb.Int32(num)
	u.SendMsg(send)
}
