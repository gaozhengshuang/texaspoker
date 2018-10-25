package main
import (
	"fmt"
	_"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

func (u *RoomUser) GetGold() int32 {
	return u.EntityBase().Gold()
}

func (u *RoomUser) RemoveGold(gold int32, reason string, syn bool) bool {
	if u.aiflag == true {
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

func (u *RoomUser) AddGold(gold int32, reason string, syn bool) {
	if u.aiflag == true {
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

func (u *RoomUser) SendGold() {
	send := &msg.GW2C_PushGoldUpdate{Num: pb.Int32(u.GetGold())}
	u.SendClientMsg(send)
}

func (u *RoomUser) SendDiamond() {
	send := &msg.GW2C_PushDiamondUpdate{Num: pb.Int32(u.GetDiamond())}
	u.SendClientMsg(send)
}

func (u *RoomUser) SendPropertyChange() {
	send := &msg.RS2C_RolePushPropertyChange{}
	send.Diamond = pb.Int32(u.GetDiamond())
	send.Gold = pb.Int32(u.GetGold())
	send.Yuanbao =pb.Int32(u.GetYuanbao())
	send.Safegold = pb.Int32(0)
	u.SendClientMsg(send)
}

// 元宝
func (u *RoomUser) GetYuanbao() int32 {
	return u.EntityBase().YuanBao()
}

func (u *RoomUser) AddYuanbao(yuanbao int32, reason string) {
	u.EntityBase().IncYuanBao(yuanbao)
	log.Info("玩家[%d] 添加元宝[%d] 库存[%d] 原因[%s]", u.Id(), yuanbao, u.GetGold(), reason)
}

func (u *RoomUser) RemoveYuanbao(yuanbao int32, reason string, syn bool) bool {
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

func (u *RoomUser) GetDiamond() int32 {
	return u.EntityBase().Diamond()
}

// 移除金卷
func (u *RoomUser) RemoveDiamond(num int32, reason string, syn bool) bool {
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
func (u *RoomUser) AddDiamond(num int32, reason string, syn bool) {
	u.EntityBase().IncDiamond(num)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加钻石[%d] 库存[%d] 原因[%s]", u.Id(), num, u.GetDiamond(), reason)
}

// 添加道具
func (u *RoomUser) AddItem(item int32, num int32, reason string, syn bool) {
	if item == int32(msg.ItemId_YuanBao) {
		u.AddYuanbao(num, reason)
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

func (u *RoomUser) CheckEnoughItem(item int32, num int32) bool {
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
func (u *RoomUser) RemoveItem(item int32, num int32, reason string) bool {
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

// 添加经验
func (u *RoomUser) AddExp(num int32, reason string, syn bool) {
	send := &msg.RS2GW_AddExp{}
	send.Uid = pb.Int64(u.Id())
	send.Exp = pb.Int32(num)
	send.Txt = pb.String(reason)
	u.SendMsg(send)	
}


