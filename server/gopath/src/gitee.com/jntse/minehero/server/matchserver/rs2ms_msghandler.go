package main
import (
	"fmt"
	_"time"
	_"strings"
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl"
	_"gitee.com/jntse/minehero/server/tbl/excel"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/pbmsg"
	_"github.com/go-redis/redis"
)


//func init() {
//	NewRS2MSMsgHandler()
//}

type RS2MSMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewRS2MSMsgHandler() *RS2MSMsgHandler {
	handler := &RS2MSMsgHandler{}
	handler.Init()
	return handler
}

func (this* RS2MSMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("RS2MS_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.RS2MS_ReqRegist{}, on_RS2MS_ReqRegist)
	this.msgparser.RegistProtoMsg(msg.RS2MS_HeartBeat{}, on_RS2MS_HeartBeat)
	this.msgparser.RegistProtoMsg(msg.RS2MS_RetCreateRoom{}, on_RS2MS_RetCreateRoom)
	this.msgparser.RegistProtoMsg(msg.RS2MS_MsgNotice{}, on_RS2MS_MsgNotice)

	//// 发
	//this.msgparser.RegistSendProto(msg.MS2RS_RetRegist{})
	//this.msgparser.RegistSendProto(msg.MS2RS_HeartBeat{})
	//this.msgparser.RegistSendProto(msg.MS2RS_GateInfo{})
	//this.msgparser.RegistSendProto(msg.MS2RS_CreateRoom{})
	//this.msgparser.RegistSendProto(msg.MS2Server_BroadCast{})

}

func on_RS2MS_ReqRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2MS_ReqRegist)
	name := tmsg.GetName()
	if tmsg.GetAccount() != "room_account_123" || tmsg.GetPasswd() != "room_passwd_123" {
		log.Info("Room[%s]验证失败，断开", name)
		session.Close()
		return
	}

	// TODO: 重复注册服务器为了第一时间发现问题使用了panic
	if RoomSvrMgr().IsRegisted(name) == true {
		log.Fatal(fmt.Sprintf("重复注册房间服务器 %s", name))
		session.SendCmd(&msg.MS2RS_RetRegist{Errcode:pb.String("重复注册房间服务器")})
		return
	}
	session.SendCmd(&msg.MS2RS_RetRegist{})

	// 添加Room
	RoomSvrMgr().AddNewSession(session, name)
}

func on_RS2MS_HeartBeat(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2MS_HeartBeat)
	log.Info(reflect.TypeOf(tmsg).String())
}

func on_RS2MS_MsgNotice(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2MS_MsgNotice)
	//log.Info(reflect.TypeOf(tmsg).String())
	send := &msg.MS2GW_MsgNotice{ Notice : tmsg.GetNotice()}
	Match().BroadcastGateMsg(send)
}

func on_RS2MS_RetCreateRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2MS_RetCreateRoom)
	//log.Info(reflect.TypeOf(tmsg).String())

	roomid, userid, sid_gate, errcode := tmsg.GetRoomid(), tmsg.GetUserid(), tmsg.GetSidgate(), tmsg.GetErrcode()
	agent, agentname := RoomSvrMgr().FindRoomAgent(session.Id()), ""
	if agent == nil {
		errcode = fmt.Sprintf("创建房间[%d]返回，但找不到RoomAgent[%d] RoomErrcode[%s] ", roomid, session.Id(), errcode)
	} else {
		agentname = agent.Name()
	}

	rsend := &msg.MS2GW_RetCreateRoom  { 
		Userid : pb.Int64(userid),
		Errcode : pb.String(errcode),
		Roomid : pb.Int64(roomid),
		Roomagent : pb.String(agentname),
	}
	Match().SendMsg(int(sid_gate), rsend)

	if errcode == "" {
		log.Error("RS返回 创建房间成功[%d] 玩家[%d] ts[%d]", roomid, userid, util.CURTIMEMS())
	} else {
		log.Error("RS返回 创建房间失败[%d] 玩家[%d] errcode: %s", roomid, userid, errcode)
	}
}

