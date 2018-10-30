package main
import (
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

func (u *User) DoTexasFightCmd(subcmd []string) {
	if len(subcmd) == 0 {
		return
	}

	cmd := subcmd[0]
	switch cmd {
	case "list":
		u.ReqTFRoomList()
	case "enter":
		u.ReqEnterTFRoom(subcmd[1:])
	case "leave":
		u.ReqTFLeave()
	case "bet":
		u.ReqTexasFightBet(subcmd[1:])
	case "lastaward":
		u.ReqTFLastAwardPoolHit()
	case "standlist":
		u.ReqTFStandPlayer()
	case "trend":
		u.ReqWinLoseTrend()
	case "bankers":
		u.ReqTFBankerList()
	case "bebanker":
		u.ReqTFBecomeBanker()
	case "quitbanker":
		u.ReqTFQuitBanker()
	case "sit":
		u.ReqTFSitDown(subcmd[1:])
	case "stand":
		u.ReqTFStandUp()
	case "start":
		u.ReqTFStart()
	}
}

func (u *User) ReqTFRoomList() {
	send := &msg.C2GW_ReqTFRoomList{}
	u.SendGateMsg(send)
}

func (u *User) ReqEnterTFRoom(subcmd []string) {
	if len(subcmd) != 1 { return }
	uid := util.Atol(subcmd[0])
	send := &msg.C2GW_ReqEnterTFRoom{Id:pb.Int64(uid), Userid:pb.Int64(u.Id()) }
	u.SendGateMsg(send)

	u.ReqTFStart()
}

func (u *User) ReqTFLeave() {
	send := &msg.C2RS_ReqTFLeave{}
	u.SendRoomMsg(send)
}

func (u *User) ReqTexasFightBet(subcmd []string) {
	if len(subcmd) != 2 { return }
	pos, num := util.Atoi(subcmd[0]), util.Atol(subcmd[1])
	send := &msg.C2RS_ReqTexasFightBet{Pos:pb.Int32(pos), Num:pb.Int64(num) }
	u.SendRoomMsg(send)
}

func (u *User) ReqTFLastAwardPoolHit() {
	send := &msg.C2RS_ReqTFLastAwardPoolHit{}
	u.SendRoomMsg(send)
}

func (u *User) ReqTFStandPlayer() {
	send := &msg.C2RS_ReqTFStandPlayer{Start:pb.Int32(0), Count:pb.Int32(100) }
	u.SendRoomMsg(send)
}

func (u *User) ReqWinLoseTrend() {
	send := &msg.C2RS_ReqWinLoseTrend{}
	u.SendRoomMsg(send)
}

func (u *User) ReqTFBankerList() {
	send := &msg.C2RS_ReqTFBankerList{}
	u.SendRoomMsg(send)
}

func (u *User) ReqTFBecomeBanker() {
	send := &msg.C2RS_ReqTFBecomeBanker{}
	u.SendRoomMsg(send)
}

func (u *User) ReqTFQuitBanker() {
	send := &msg.C2RS_ReqTFQuitBanker{}
	u.SendRoomMsg(send)
}

func (u *User) ReqTFSitDown(subcmd []string) {
	if len(subcmd) != 1 { return }
	pos := util.Atoi(subcmd[0])
	send := &msg.C2RS_ReqTFSitDown{Pos:pb.Int32(pos)}
	u.SendRoomMsg(send)
}

func (u *User) ReqTFStandUp() {
	send := &msg.C2RS_ReqTFStandUp{}
	u.SendRoomMsg(send)
}

func (u *User) ReqTFStart() {
	send := &msg.C2RS_ReqTFStart{}
	u.SendRoomMsg(send)
}





// --------------------------------------------------------------------------
/// @brief 百人大战协议
///
/// @param network.IBaseNetSession
/// @param interface{}
///
/// @return 
// --------------------------------------------------------------------------
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

