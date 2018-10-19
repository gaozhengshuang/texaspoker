package main
import (
	"fmt"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

func (u *RoomUser) GetGold() int32 {
	//return u.Entity().GetGold()
	gold := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "gold").Val())
	return gold
}

func (u *RoomUser) RemoveGold(gold int32, reason string, syn bool) bool {
	if u.aiflag == true {
		return true
	}
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

func (u *RoomUser) AddGold(gold int32, reason string, syn bool) {
	//entity := u.Entity()
	//entity.Gold = pb.Int32(u.GetGold() + gold)
	if u.aiflag == true {
		return 
	}
	goldsrc := u.GetGold()
	newgold := goldsrc + gold
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "gold", newgold)
	if syn {
		u.SendPropertyChange()
	}
	u.SyncGoldRankRedis()
	u.OnAchieveProcessChanged(int32(AchieveGroup_Gold))
	log.Info("玩家[%d] 添加金币[%d] 库存[%d] 原因[%s]", u.Id(), gold, newgold, reason)
}

func (u *RoomUser) SetGold(gold int32, reason string, syn bool) {
	//entity := u.Entity()
	//entity.Gold = pb.Int32(gold)
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "gold", gold)
	if syn {
		u.SendPropertyChange()
	}
	u.SyncGoldRankRedis()
	log.Info("玩家[%d] 设置金币[%d] 库存[%d] 原因[%s]", u.Id(), gold, gold, reason)
}

func (u *RoomUser) SendGold() {
	send := &msg.GW2C_PushGoldUpdate{Num: pb.Int32(u.GetGold())}
	u.SendClientMsg(send)
}

func (u *RoomUser) SendDiamond() {
	send := &msg.GW2C_PushDiamondUpdate{Num: pb.Int32(u.GetDiamond())}
	u.SendClientMsg(send)
}

// 元宝
func (u *RoomUser) GetYuanbao() int32 {
	yuanbao := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao").Val())
	return yuanbao
}

func (u *RoomUser) AddYuanbao(yuanbao int32, reason string) {
	newyuanbao := u.GetYuanbao() + yuanbao
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao", newyuanbao)
	log.Info("玩家[%d] 添加元宝[%d] 库存[%d] 原因[%s]", u.Id(), yuanbao, newyuanbao, reason)
}

func (u *RoomUser) RemoveYuanbao(yuanbao int32, reason string) bool {
	yuanbaosrc := u.GetYuanbao()
	if yuanbaosrc >= yuanbao {
		newyuanbao := yuanbaosrc - yuanbao
		Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao", newyuanbao)
		//RCounter().IncrByDate("item_remove", int32(msg.ItemId_YuanBao), yuanbao)
		log.Info("玩家[%d] 扣除元宝[%d] 库存[%d] 原因[%s]", u.Id(), yuanbao, newyuanbao, reason)
		return true
	}
	log.Info("玩家[%d] 扣除元宝[%d]失败 库存[%d] 原因[%s]", u.Id(), yuanbao, yuanbaosrc, reason)
	return false
}

func (u *RoomUser) GetDiamond() int32 {
	diamond := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "diamond").Val())
	return diamond
}

// 移除金卷
func (u *RoomUser) RemoveDiamond(num int32, reason string, syn bool) bool {
	diamondsrc := u.GetDiamond()
	if diamondsrc >= num {
		newdiamond := diamondsrc - num
		Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "diamond", newdiamond)
		if syn {
			u.SendPropertyChange()
		}
		log.Info("玩家[%d] 扣除金卷[%d] 库存[%d] 原因[%s]", u.Id(), num, newdiamond, reason)
		//RCounter().IncrByDate("item_remove", int32(msg.ItemId_Diamond), num)
		return true
	}
	log.Info("玩家[%d] 扣除金卷[%d]失败 库存[%d] 原因[%s]", u.Id(), num, diamondsrc, reason)
	return false
}

// 添加金卷
func (u *RoomUser) AddDiamond(num int32, reason string, syn bool) {
	newdiamond := u.GetDiamond() + num
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "diamond", newdiamond)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加钻石[%d] 库存[%d] 原因[%s]", u.Id(), num, newdiamond, reason)
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
		u.bag.AddItem(item, num, reason)
	}
	//RCounter().IncrByDate("item_add", item, num)

}

// 扣除道具
func (u *RoomUser) RemoveItem(item int32, num int32, reason string) bool {
	return u.bag.RemoveItem(item, num, reason)
}

