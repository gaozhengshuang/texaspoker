package main
import (
	//"gitee.com/jntse/gotoolkit/util"
	//"gitee.com/jntse/gotoolkit/net"
	//"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)


func (u *User) ReqTFRoomList() {
	send := &msg.C2GW_ReqTFRoomList{}
	u.SendGateMsg(send)
}

func (u *User) ReqEnterTFRoom() {
	send := &msg.C2GW_ReqEnterTFRoom{Id:pb.Int64(0), Userid:pb.Int64(u.Id()) }
	u.SendGateMsg(send)
}

func (u *User) ReqTexasFightBet() {
	send := &msg.C2RS_ReqTexasFightBet{Pos:pb.Int32(1), Num:pb.Int32(100) }
	u.SendGateMsg(send)
}
