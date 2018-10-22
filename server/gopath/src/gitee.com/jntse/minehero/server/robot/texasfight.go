package main
import (
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)


func (u *User) ReqTFRoomList() {
	send := &msg.C2GW_ReqTFRoomList{}
	u.SendGateMsg(send)
}

func (u *User) ReqEnterTFRoom(subcmd string) {
	uid := util.Atol(subcmd)
	send := &msg.C2GW_ReqEnterTFRoom{Id:pb.Int64(uid), Userid:pb.Int64(u.Id()) }
	u.SendGateMsg(send)
}

func (u *User) ReqTexasFightBet(subcmd []string) {
	if len(subcmd) != 2 { return }
	pos, num := util.Atoi(subcmd[0]), util.Atoi(subcmd[1])
	send := &msg.C2RS_ReqTexasFightBet{Pos:pb.Int32(pos), Num:pb.Int32(num) }
	u.SendGateMsg(send)
}

func on_GW2C_RetTFRoomList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetTFRoomList)
	log.Info("%+v", tmsg)
}

func on_GW2C_RetEnterTFRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetEnterTFRoom)
	log.Info("%+v", tmsg)
}

func on_RS2C_RetTexasFightBet(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetTexasFightBet)
	log.Info("%+v", tmsg)

}

func on_RS2C_RetTFLastAwardPoolHit(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetTFLastAwardPoolHit)
	log.Info("%+v", tmsg)

}

func on_RS2C_RetTFStandPlayer(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetTFStandPlayer)
	log.Info("%+v", tmsg)
}

func on_RS2C_RetWinLoseTrend(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetWinLoseTrend)
	log.Info("%+v", tmsg)
}

func on_RS2C_RetTFBankerList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetTFBankerList)
	log.Info("%+v", tmsg)
}

func on_RS2C_RetTFBecomeBanker(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetTFBecomeBanker)
	log.Info("%+v", tmsg)
}

func on_RS2C_RetTFQuitBanker(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetTFQuitBanker)
	log.Info("%+v", tmsg)
}

func on_RS2C_RetTFSitDown(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetTFSitDown)
	log.Info("%+v", tmsg)
}

func on_RS2C_ReqTFStandUp(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_ReqTFStandUp)
	log.Info("%+v", tmsg)
}

func on_RS2C_RetTFLeave(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetTFLeave)
	log.Info("%+v", tmsg)
}

func on_RS2C_RetTFStart(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetTFStart)
	log.Info("%+v", tmsg)
}

func on_RS2C_PushBetPoolChange(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_PushBetPoolChange)
	log.Info("%+v", tmsg)
}

func on_RS2C_PushTFRoundOver(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_PushTFRoundOver)
	log.Info("%+v", tmsg)
}

func on_RS2C_PushTFStateChange(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_PushTFStateChange)
	log.Info("%+v", tmsg)
}

func on_RS2C_PushTFPosChange(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_PushTFPosChange)
	log.Info("%+v", tmsg)
}

func on_RS2C_PushTFPlayerKickOut(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_PushTFPlayerKickOut)
	log.Info("%+v", tmsg)
}

