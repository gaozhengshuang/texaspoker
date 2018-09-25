package main
import (
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	//"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	_"github.com/go-redis/redis"
)


// --------------------------------------------------------------------------
/// @brief 转发客户端消息Handler
/// @return 
// --------------------------------------------------------------------------
type ClientMsgFunHandler func(session network.IBaseNetSession, message interface{}, u *RoomUser)
type ClientMsgHandler struct {
	msghandler map[string]ClientMsgFunHandler
}

func NewClientMsgHandler() *ClientMsgHandler {
	h := new(ClientMsgHandler)
	h.Init()
	return h
}

func (this *ClientMsgHandler) Init() {
	this.msghandler = make(map[string]ClientMsgFunHandler)

	// 消息注册
	//this.RegistProtoMsg(msg.C2GW_StartLuckyDraw{}, on_C2GW_StartLuckyDraw)
	//this.RegistProtoMsg(msg.C2RS_ReqSitDown{}, on_C2RS_ReqSitDown)
	//this.RegistProtoMsg(msg.C2RS_ReqStandUp{}, on_C2RS_ReqStandUp)

	//德州房间内消息
	this.RegistProtoMsg(msg.C2RS_ReqTimeAwardInfo{}, on_C2RS_ReqTimeAwardInfo)
	this.RegistProtoMsg(msg.C2RS_ReqBuyInGame{}, on_C2RS_ReqBuyInGame)
	this.RegistProtoMsg(msg.C2RS_ReqFriendGetRoleInfo{}, on_C2RS_ReqFriendGetRoleInfo)
	this.RegistProtoMsg(msg.C2RS_ReqNextRound{}, on_C2RS_ReqNextRound)
	this.RegistProtoMsg(msg.C2RS_ReqAction{}, on_C2RS_ReqAction)
	this.RegistProtoMsg(msg.C2RS_ReqBrightCard{}, on_C2RS_ReqBrightCard)
	this.RegistProtoMsg(msg.C2RS_ReqAddCoin{}, on_C2RS_ReqAddCoin)
	this.RegistProtoMsg(msg.C2RS_ReqBrightInTime{}, on_C2RS_ReqBrightInTime)
}

func (this *ClientMsgHandler) RegistProtoMsg(message interface{} , fn ClientMsgFunHandler) {
	msg_type := reflect.TypeOf(message)
	this.msghandler[msg_type.String()] = fn
}

func (this *ClientMsgHandler) Handler(session network.IBaseNetSession, message interface{}, uid int64) {
	pbmsg := message.(pb.Message)
	name := pb.MessageName(pbmsg)
	fn, ok := this.msghandler[name]
	if ok == false {
		log.Error("ClientMsgHandler 未注册消息%s", name)
		return
	}

	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return 
	}

	fn(session, message, u)
}

//func on_C2GW_StartLuckyDraw(session network.IBaseNetSession, message interface{}, uid int64) {
//	//tmsg := message.(*msg.C2GW_StartLuckyDraw)
//	user := UserMgr().FindUser(uid)
//	if user == nil { 
//		log.Error("C2GW_StartLuckyDraw 玩家[%d]没有在Room中", uid)
//		return 
//	}
//	user.LuckyDraw()
//}

// 坐下
//func on_C2RS_ReqSitDown(session network.IBaseNetSession, message interface{}, u *RoomUser) {
//	tmsg := message.(*msg.C2RS_ReqSitDown)
//	roomid := u.RoomId()
//	room := RoomMgr().Find(roomid)
//	if room == nil {
//		log.Error("[房间] 玩家[%s %d] 请求坐下到无效的房间中 房间[%d]", u.Name(), u.Id(), roomid)
//		return
//	}
//
//	room.UserSitDown(u, tmsg.GetSeat())
//}

// 站起
//func on_C2RS_ReqStandUp(session network.IBaseNetSession, message interface{}, u *RoomUser) {
//	//tmsg := message.(*msg.C2RS_ReqStandUp)
//	roomid := u.RoomId()
//	room := RoomMgr().Find(roomid)
//	if room == nil {
//		log.Error("[房间] 玩家[%s %d] 请求坐下到无效的房间中 房间[%d]", u.Name(), u.Id(), roomid)
//		return
//	}
//
//	room.UserStandUp(u)
//}

func on_C2RS_ReqBrightInTime(session network.IBaseNetSession, message interface{}, u *RoomUser) {
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.BrightCardInTime(u.Id())
}

func on_C2RS_ReqTimeAwardInfo(session network.IBaseNetSession, message interface{}, u *RoomUser) {
	tmsg := message.(*msg.C2RS_ReqTimeAwardInfo)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqTimeAwardInfo(u.Id(), tmsg)
}

func on_C2RS_ReqBuyInGame(session network.IBaseNetSession, message interface{}, u *RoomUser) {
	tmsg := message.(*msg.C2RS_ReqBuyInGame)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.BuyInGame(u.Id(), tmsg)
}

func on_C2RS_ReqFriendGetRoleInfo(session network.IBaseNetSession, message interface{}, u *RoomUser) {
	tmsg := message.(*msg.C2RS_ReqFriendGetRoleInfo)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqFriendGetRoleInfo(u.Id(), tmsg)
}

func on_C2RS_ReqNextRound(session network.IBaseNetSession, message interface{}, u *RoomUser) {
	tmsg := message.(*msg.C2RS_ReqNextRound)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqNextRound(u.Id(), tmsg)
}

func on_C2RS_ReqAction(session network.IBaseNetSession, message interface{}, u *RoomUser) {
	tmsg := message.(*msg.C2RS_ReqAction)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqAction(u.Id(), tmsg)
}

func on_C2RS_ReqBrightCard(session network.IBaseNetSession, message interface{}, u *RoomUser) {
	tmsg := message.(*msg.C2RS_ReqBrightCard)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqBrightCard(u.Id(), tmsg)
}

func on_C2RS_ReqAddCoin(session network.IBaseNetSession, message interface{}, u *RoomUser) {
	tmsg := message.(*msg.C2RS_ReqAddCoin)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqAddCoin(u.Id(), tmsg)
}

