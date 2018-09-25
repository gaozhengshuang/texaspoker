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
	this.RegistProtoMsg(msg.C2RS_ReqSitDown{}, on_C2RS_ReqSitDown)
	this.RegistProtoMsg(msg.C2RS_ReqStandUp{}, on_C2RS_ReqStandUp)

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
func on_C2RS_ReqSitDown(session network.IBaseNetSession, message interface{}, u *RoomUser) {
	tmsg := message.(*msg.C2RS_ReqSitDown)
	roomid := u.RoomId()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 请求坐下到无效的房间中 房间[%d]", u.Name(), u.Id(), roomid)
		return
	}

	room.UserSitDown(u, tmsg.GetSeat())
}

// 站起
func on_C2RS_ReqStandUp(session network.IBaseNetSession, message interface{}, u *RoomUser) {
	//tmsg := message.(*msg.C2RS_ReqStandUp)
	roomid := u.RoomId()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 请求坐下到无效的房间中 房间[%d]", u.Name(), u.Id(), roomid)
		return
	}

	room.UserStandUp(u)
}

