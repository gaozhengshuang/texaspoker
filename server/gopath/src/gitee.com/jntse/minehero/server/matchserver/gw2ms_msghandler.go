package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	"reflect"
	"time"
)

//func init() {
//	NewGW2MSMsgHandler()
//}

type GW2MSMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewGW2MSMsgHandler() *GW2MSMsgHandler {
	handler := &GW2MSMsgHandler{}
	handler.Init()
	return handler
}

func (this *GW2MSMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("GW2MS_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.GW2MS_ReqRegist{}, on_GW2MS_ReqRegist)
	this.msgparser.RegistProtoMsg(msg.GW2MS_HeartBeat{}, on_GW2MS_HeartBeat)
	this.msgparser.RegistProtoMsg(msg.GW2MS_ReqCreateRoom{}, on_GW2MS_ReqCreateRoom)
	this.msgparser.RegistProtoMsg(msg.GW2MS_MsgNotice{}, on_GW2MS_MsgNotice)
	this.msgparser.RegistProtoMsg(msg.GW2GW_MsgTransfer{}, on_GW2GW_MsgTransfer)
	this.msgparser.RegistProtoMsg(msg.GW2MS_PushNewMail{}, on_GW2MS_PushNewMail)

	//// 发
	//this.msgparser.RegistSendProto(msg.MS2GW_RetRegist{})
	//this.msgparser.RegistSendProto(msg.MS2GW_HeartBeat{})
	//this.msgparser.RegistSendProto(msg.MS2GW_MsgNotice{})
	//this.msgparser.RegistSendProto(msg.MS2GW_RetCreateRoom{})
	//this.msgparser.RegistSendProto(msg.MS2Server_BroadCast{})

}

func on_GW2MS_ReqCreateRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_ReqCreateRoom)
	//log.Info(reflect.TypeOf(tmsg).String())

	userid := tmsg.GetUserid()
	log.Info("收到玩家[%d] 创建房间请求 ts[%d]", userid, util.CURTIMEMS())
	doCreateRoomReply := func(id int64, err string) {
		send := &msg.MS2GW_RetCreateRoom{
			Userid:  pb.Int64(id),
			Errcode: pb.String(err),
			Roomid:  pb.Int64(0),
		}
		session.SendCmd(send)
		if err != "" {
			log.Error("玩家[%d] 创建房间失败: %s", id, err)
		}
	}

	if RoomSvrMgr().Num() == 0 {
		doCreateRoomReply(userid, "没有可用的房间服务器")
		return
	}

	// 创建房间信息
	errcode := RoomSvrMgr().CreateGameRoom(tmsg, time.Now().Unix(), session.Id(), userid)
	if errcode != "" {
		doCreateRoomReply(userid, errcode)
		return
	}
}

func on_GW2MS_ReqRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_ReqRegist)
	host := tmsg.GetHost()
	if host == nil {
		log.Fatal("Gate注册IP端口失败, Host is nil")
		return
	}

	name, ip, port := tmsg.GetAgentname(), host.GetIp(), int(host.GetPort())
	if tmsg.GetAccount() != "gate_account_123" || tmsg.GetPasswd() != "gate_passwd_123" {
		log.Info("Gate[%s:%d]验证失败，断开", ip, port)
		session.Close()
		return
	}

	if GateSvrMgr().IsRegisted(name, ip, port) == true {
		log.Fatal(fmt.Sprintf("重复注册网关服务器 [%s] [%s:%d]", name, ip, port))
		session.SendCmd(&msg.MS2GW_RetRegist{Errcode: pb.String("重复注册网关服务器")})
		return
	}
	session.SendCmd(&msg.MS2GW_RetRegist{Host: tmsg.Host})

	// 添加gate
	GateSvrMgr().AddNewSession(session, name, ip, port)
}

func on_GW2MS_HeartBeat(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_HeartBeat)
	log.Info(reflect.TypeOf(tmsg).String())
}

func on_GW2MS_MsgNotice(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_MsgNotice)
	//log.Info(reflect.TypeOf(tmsg).String())
	send := &msg.MS2GW_MsgNotice{Notice: tmsg.GetNotice()}
	Match().BroadcastGateMsg(send)
}

// Gate间消息转发
func on_GW2GW_MsgTransfer(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2GW_MsgTransfer)
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

	agent := GateSvrMgr().FindGate(int(tmsg.GetUid()))
	if agent == nil { return }
	agent.SendMsg(protomsg.(pb.Message))
}


func on_GW2MS_PushNewMail(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_PushNewMail)
	send := &msg.MS2GW_PushNewMail{Receiver:tmsg.Receiver, Mail:tmsg.Mail}
	Match().BroadcastGateMsg(send)
}
