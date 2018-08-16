package main

import (
	_ "fmt"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

func (this *GateUser) SynCarData() {
	send := &msg.GW2C_ResCarInfo{}

	carinfo := CarMgr().GetCarByUser(this.Id())
	carids := make([]uint64, 0)
	for _, v := range carinfo {
		tmp := v.PackBin()
		send.Cardatas = append(send.Cardatas, tmp)
		if v.parkingid != 0 {
			carids = append(carids, v.parkingid)
		}
	}

	parkinginfo := CarMgr().GetParkingById(carids)
	for _, v := range parkinginfo {
		tmp := v.PackBin()
		send.Parkingdatas = append(send.Parkingdatas, tmp)
	}
	this.SendMsg(send)
}

func (this *GateUser) SynParkingData(){
	send := &msg.GW2C_ResParkingInfo{}
	parkinginfo := CarMgr().GetParkingByUser(this.Id())
	for _, v := range parkinginfo {
		tmp := v.PackBin()
		send.Parkingdatas = append(send.Parkingdatas, tmp)
	}
	this.SendMsg(send)
}

