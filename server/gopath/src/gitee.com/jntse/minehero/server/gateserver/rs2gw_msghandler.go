package main
import (
	"reflect"
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
)


//func init() {
//	log.Info("rs2gw_msghandler.init")
//	NewRS2GWMsgHandler()
//}

type RS2GWMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewRS2GWMsgHandler() *RS2GWMsgHandler {
	handler := &RS2GWMsgHandler{}
	handler.Init()
	return handler
}

func (mh* RS2GWMsgHandler) Init() {

	mh.msgparser = network.NewProtoParser("RS2GW_MsgParser", tbl.ProtoMsgIndexGenerator)
	if mh.msgparser == nil {
		return
	}

	// 收
	mh.msgparser.RegistProtoMsg(msg.RS2GW_ReqRegist{}, on_RS2GW_ReqRegist)
	mh.msgparser.RegistProtoMsg(msg.RS2GW_RetUserDisconnect{}, on_RS2GW_RetUserDisconnect)
	mh.msgparser.RegistProtoMsg(msg.RS2GW_MsgTransfer{}, on_RS2GW_MsgTransfer)
	mh.msgparser.RegistProtoMsg(msg.RS2GW_MTTRoomMember{}, on_RS2GW_MTTRoomMember)
	mh.msgparser.RegistProtoMsg(msg.RS2GW_MTTCancel{}, on_RS2GW_MTTCancel)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushMsgNotify{}, on_GW2C_PushMsgNotify)

	// 房间
	mh.msgparser.RegistProtoMsg(msg.RS2GW_PushRoomDestory{}, on_RS2GW_PushRoomDestory)
	mh.msgparser.RegistProtoMsg(msg.RS2GW_UserLeaveRoom{}, on_RS2GW_UserLeaveRoom)
	mh.msgparser.RegistProtoMsg(msg.RS2GW_RetEnterRoom{}, on_RS2GW_RetEnterRoom)
}

func on_RS2GW_ReqRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2GW_ReqRegist)
	//log.Info(reflect.TypeOf(tmsg).String())

	// TODO: 重复注册服务器为了第一时间发现问题使用了panic
	name := tmsg.GetAgentname()
	if RoomSvrMgr().IsRegisted(name) == true {
		log.Fatal(fmt.Sprintf("重复注册房间服务器 %s", name))
		session.SendCmd(&msg.GW2RS_RetRegist{Errcode: pb.String("重复注册房间服务器"), Agentname:pb.String(GateSvr().Name())})
		return
	}

	RoomSvrMgr().AddNew(session, name)
	session.SendCmd(&msg.GW2RS_RetRegist{Agentname:pb.String(GateSvr().Name())})
}

func on_GW2C_PushMsgNotify(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushMsgNotify)
	if user := UserMgr().FindById(tmsg.GetUserid()); user != nil {
		user.SendMsg(tmsg)
	}
}

func on_RS2GW_MTTRoomMember(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2GW_MTTRoomMember)
	send := &msg.RS2C_PushMTTRoomId{}
	for _, room := range tmsg.GetRooms() {
		for _, member := range room.GetMembers() {
			if user := UserMgr().FindById(member); user != nil {
				send.Mttid = pb.Int32(room.GetMttuid())
				send.Id = pb.Int64(room.GetRoomuid())
				user.SendMsg(send)
			}
		}
	}
}

func on_RS2GW_MTTCancel(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2GW_MTTCancel)
	send := &msg.RS2C_PushMTTCancel{}
	send.Recordid = pb.Int32(tmsg.GetRecordid())
	for _, member := range tmsg.GetMembers() {
		if user := UserMgr().FindById(member); user != nil {
			user.SendMsg(send)
		}
	}
}

//func on_BT_GameInit(session network.IBaseNetSession, message interface{}) {
//	tmsg := message.(*msg.BT_GameInit)
//	user := UserMgr().FindById(tmsg.GetOwnerid())
//	if user == nil {
//		log.Error("房间[%d] BT_GameInit 找不到玩家[%d]", tmsg.GetRoomid(), tmsg.GetOwnerid())
//		return
//	}
//	user.SendMsg(tmsg)
//}
//
//func on_BT_GameStart(session network.IBaseNetSession, message interface{}) {
//	tmsg := message.(*msg.BT_GameStart)
//	user := UserMgr().FindById(tmsg.GetOwnerid())
//	if user == nil {
//		log.Error("房间[%d] BT_GameStart 找不到玩家[%d]", tmsg.GetRoomid(), tmsg.GetOwnerid())
//		return
//	}
//	user.SendMsg(tmsg)
//}
//
//func on_BT_GameEnd(session network.IBaseNetSession, message interface{}) {
//	tmsg := message.(*msg.BT_GameEnd)
//	user := UserMgr().FindById(tmsg.GetOwnerid())
//	if user == nil {
//		log.Error("房间[%d] BT_GameEnd 找不到玩家[%d]", tmsg.GetRoomid(), tmsg.GetOwnerid())
//		return
//	}
//	user.OnGameEnd(tmsg.GetBin(), tmsg.GetReason())
//	log.Info("房间[%d] BT_GameEnd 游戏结束，Owner[%d]", tmsg.GetRoomid(), tmsg.GetOwnerid())
//}

func on_RS2GW_PushRoomDestory(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2GW_PushRoomDestory)
	userid := tmsg.GetUserid()
	user := UserMgr().FindById(userid)
	if user == nil {
		log.Error("RS2GW_PushRoomDestory 找不到玩家[%d]", userid)
		return
	}
	user.OnDestoryRoom()
}

// 离开房间
func on_RS2GW_UserLeaveRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2GW_UserLeaveRoom)
	userid := tmsg.GetUserid()
	user := UserMgr().FindById(userid)
	if user == nil {
		log.Error("RS2GW_UserLeaveRoom 找不到玩家[%d]", userid)
		return
	}
	user.OnLeaveRoom()
}

// 进入房间
func on_RS2GW_RetEnterRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2GW_RetEnterRoom)
	userid := tmsg.GetUserid()
	user := UserMgr().FindById(userid)
	if user == nil {
		log.Error("RS2GW_RetEnterRoom 找不到玩家[%d]", userid)
		return
	}
	user.OnEnterRoom(session.Id(), tmsg)
}

// 玩家断开连接
func on_RS2GW_RetUserDisconnect(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.RS2GW_RetUserDisconnect)
	//roomid, userid := tmsg.GetRoomid(), tmsg.GetUserid()
	//user := UserMgr().FindById(userid)
	//if user == nil {
	//	log.Error("RS2GW_RetUserDisconnect 找不到玩家[%d]", userid)
	//	return
	//}

	//// RS关闭房间失败，直接下线玩家
	//if tmsg.GetErrcode() != "" {
	//	log.Info("房间[%d] 玩家[%d] GW通知RS玩家断开连接，处理报错，原因[%s]", roomid, userid, tmsg.GetErrcode())
	//	user.Logout()
	//}
}

// 消息转发
func on_RS2GW_MsgTransfer(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2GW_MsgTransfer)
	msg_type := pb.MessageType(tmsg.GetName())
	if msg_type == nil {
		log.Fatal("消息转发解析失败，找不到proto msg=%s" , tmsg.GetName())
		return
	}

	protomsg := reflect.New(msg_type.Elem()).Interface()
	err := pb.Unmarshal(tmsg.GetBuf(), protomsg.(pb.Message))
	if err != nil {
		log.Fatal("消息转发解析失败，Unmarshal失败 msg=%s" , tmsg.GetName())
		return
	}

	user := UserMgr().FindById(tmsg.GetUid())
	if user == nil { return }
	user.SendMsg(protomsg.(pb.Message))
}


