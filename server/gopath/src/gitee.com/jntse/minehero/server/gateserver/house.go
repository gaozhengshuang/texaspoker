package main

import (
	_ "fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
)

func (this *GateUser) ReqMatchHouseData() {
	send := &msg.GW2MS_ReqUserHouse{}
	send.Userid = pb.Uint64(this.Id())
	Match().SendCmd(send)
}

func (this *GateUser) SendHouseData() {
	send := &msg.GW2C_AckHouseData{}
	for _, v := range this.housedata {
		send.Datas = append(send.Datas, v)
	}
	this.SendMsg(send)
}

func (this *GateUser) UpdateHouseData(data []*msg.HouseData) {
	this.housedata = data
	this.SendHouseData()
}

func (this *GateUser) GetUserHouseDataByHouseId(houseid uint64) *msg.HouseData {
	for _, v := range this.housedata {
		if houseid == v.GetId() {
			return v
		}
	}
	return nil
}

func (this *GateUser) HouseLevelUp(houseid uint64) {
	house := this.GetUserHouseDataByHouseId(houseid)
	if house != nil {
		base, find := tbl.THouseBase.THouseById[house.GetTid()]
		if find == false {
			log.Error("无效的房屋  tid[%d]", house.GetTid())
			return
		}
		if house.GetLevel() >= base.MaxLevel {
			//房屋到最高等级
			return
		}
		needgold := base.LevelUpCost
		if this.RemoveGold(needgold, "升级房屋扣除", true) == false {
			//钱不够
			return
		} else {
			sendmatch := &msg.GW2MS_ReqHouseLevelUp{}
			sendmatch.Userid = pb.Uint64(this.Id())
			sendmatch.Houseid = pb.Uint64(house.GetId())
			Match().SendCmd(sendmatch)
		}
	} else {
		log.Error("HouseLevelUp house not found id:%d", houseid)
	}
}

func (this *GateUser) HouseCellLevelUp(houseid uint64, index uint32) {
	house := this.GetUserHouseDataByHouseId(houseid)
	if house != nil {
		cells := house.GetHousecells()
		for _, v := range cells {
			if v.GetIndex() == index {
				base, find := tbl.THouseCellBase.THouseCellById[v.GetTid()]
				if find == false {
					log.Error("无效的房间Cell  tid[%d]", v.GetTid())
					return
				}
				if v.GetLevel() >= base.MaxLevel {
					//Cell到最高等级
					return
				}
				needgold := base.LevelUpCost
				if this.RemoveGold(needgold, "升级房屋扣除", true) == false {
					//钱不够
					return
				} else {
					sendmatch := &msg.GW2MS_ReqHouseCellLevelUp{}
					sendmatch.Userid = pb.Uint64(this.Id())
					sendmatch.Houseid = pb.Uint64(houseid)
					sendmatch.Index = pb.Uint32(index)
					Match().SendCmd(sendmatch)
				}

				return
			}
		}
		//here not find index
		log.Error("HouseCellLevelUp index not found index:%d", index)
	} else {
		log.Error("HouseCellLevelUp house not found id:%d", houseid)
	}

}

func (this *GateUser) TakeSelfHouseGold(houseid uint64, index uint32) {
	house := this.GetUserHouseDataByHouseId(houseid)
	if house != nil {
		cells := house.GetHousecells()
		for _, v := range cells {
			if v.GetIndex() == index {
				if v.GetGold() <= 0 {
					//没钱可取
					log.Error("TakeSelfHouseGold have no gold")
					return
				}
				sendmatch := &msg.GW2MS_ReqTakeSelfHouseGold{}
				sendmatch.Userid = pb.Uint64(this.Id())
				sendmatch.Houseid = pb.Uint64(houseid)
				sendmatch.Index = pb.Uint32(index)
				Match().SendCmd(sendmatch)
				return
			}
		}
		//here not find index
		log.Error("TakeSelfHouseGold index not found index:%d", index)
	} else {
		log.Error("TakeSelfHouseGold house not found id:%d", houseid)
	}

}

func (this *GateUser) TakeOtherHouseGold(houseid uint64, index uint32) {
	if this.robcount <= 0 {
		return
	}
	sendmatch := &msg.GW2MS_ReqTakeOtherHouseGold{}
	sendmatch.Userid = pb.Uint64(this.Id())
	sendmatch.Houseid = pb.Uint64(houseid)
	sendmatch.Index = pb.Uint32(index)
	sendmatch.Username = pb.String(this.Name())
	Match().SendCmd(sendmatch)
}

func (this *GateUser) ReqRandHouseList() {
	sendmatch := &msg.GW2MS_ReqRandHouseList{}
	sendmatch.Userid = pb.Uint64(this.Id())
	Match().SendCmd(sendmatch)
}

//上限检查更新 抢钱次数
func (this *GateUser) OnlineUpdateRobCount() {
	if this.tm_logout > 0 {
		nowtimehour := util.CURTIME() / 3600
		logouttimehour := this.tm_logout / 3600
		dexhours := nowtimehour - logouttimehour
		if dexhours > 0 {
			addcount := dexhours * 5
			this.SetRobCount(this.GetRobCount() + uint32(addcount))
		}
	}
}

func (this *GateUser) ReqOtherUserHouse(otherid uint64) {
	sendmatch := &msg.GW2MS_ReqOtherUserHouseData{}
	sendmatch.Userid = pb.Uint64(this.Id())
	sendmatch.Otherid = pb.Uint64(otherid)
	Match().SendCmd(sendmatch)
}
