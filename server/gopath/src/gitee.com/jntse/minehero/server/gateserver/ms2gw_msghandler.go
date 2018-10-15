package main

import (
	"encoding/json"
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	"reflect"
)

//func init() {
//	log.Info("ms2gw_msghandler.init")
//	NewMS2GWMsgHandler()
//}

type MS2GWMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewMS2GWMsgHandler() *MS2GWMsgHandler {
	handler := &MS2GWMsgHandler{}
	handler.Init()
	return handler
}

func (mh *MS2GWMsgHandler) Init() {

	mh.msgparser = network.NewProtoParser("MS2GW_MsgParser", tbl.ProtoMsgIndexGenerator)
	if mh.msgparser == nil {
		return
	}

	// 收
	mh.msgparser.RegistProtoMsg(msg.MS2GW_RetRegist{}, on_MS2GW_RetRegist)
	mh.msgparser.RegistProtoMsg(msg.MS2GW_HeartBeat{}, on_MS2GW_HeartBeat)
	mh.msgparser.RegistProtoMsg(msg.MS2GW_MsgNotice{}, on_MS2GW_MsgNotice)
	mh.msgparser.RegistProtoMsg(msg.MS2GW_MsgTransfer{}, on_MS2GW_MsgTransfer)
	//mh.msgparser.RegistProtoMsg(msg.MS2GW_RetStartMatch{}, on_MS2GW_RetStartMatch)
	//mh.msgparser.RegistProtoMsg(msg.MS2GW_RetCancelMatch{}, on_MS2GW_RetCancelMatch)
	//mh.msgparser.RegistProtoMsg(msg.MS2GW_MatchOk{}, on_MS2GW_MatchOk)
	mh.msgparser.RegistProtoMsg(msg.MS2GW_RetCreateRoom{}, on_MS2GW_RetCreateRoom)
	mh.msgparser.RegistProtoMsg(msg.MS2Server_BroadCast{}, on_MS2Server_BroadCast)
	mh.msgparser.RegistProtoMsg(msg.MS2GW_PushNewMail{}, on_MS2GW_PushNewMail)

	// GW2GW
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushAddYouFriend{}, on_GW2C_PushAddYouFriend)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushFriendAddSuccess{}, on_GW2C_PushFriendAddSuccess)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushRemoveFriend{}, on_GW2C_PushRemoveFriend)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushFriendPresent{}, on_GW2C_PushFriendPresent)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushUserOnline{}, on_GW2C_PushUserOnline)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushFriendInvitation{}, on_GW2C_PushFriendInvitation)
}

func on_MS2GW_RetRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_RetRegist)
	if tmsg.GetErrcode() != "" {
		panic(fmt.Sprintf("Matach服务器返回注册失败 原因：%s", tmsg.GetErrcode()))
	}

	log.Info("注册网关[%v]到Match成功", tmsg.GetHost())
}

func on_MS2GW_HeartBeat(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_HeartBeat)
	log.Info(reflect.TypeOf(tmsg).String())
}

// 消息转发
func on_MS2GW_MsgTransfer(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_MsgTransfer)
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

// 公告
func on_MS2GW_MsgNotice(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_MsgNotice)
	//log.Info(reflect.TypeOf(tmsg).String())
	//UserMgr().BroadcastMsg(tmsg.GetNotice())
	UserMgr().BroadcastMsgFaster(tmsg.GetNotice())
}

func on_MS2GW_RetCreateRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_RetCreateRoom)
	err, userid, roomid, roomagent := tmsg.GetErrcode(), tmsg.GetUserid(), tmsg.GetRoomid(), tmsg.GetRoomagent()
	user := UserMgr().FindById(userid)
	if user == nil {
		log.Error("玩家:%d 请求创建房间返回，但找不到玩家", userid)
		return
	}

	user.OnCreateRoom(err, roomagent, roomid)
}

func on_MS2Server_BroadCast(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2Server_BroadCast)
	cmdfull := tmsg.GetCmd()

	cmdmap := make(map[string]interface{})
	unerr := json.Unmarshal(util.StringToBytes(cmdfull), &cmdmap)
	if unerr != nil {
		log.Error("on_MS2Server_BroadCast json.Unmarshal err[%s]", unerr)
		return
	}

	// GM指令
	if _, ok := cmdmap["gmcmd"]; ok {
		gmcommands := make(map[string]*util.VarType)
		for k, v := range cmdmap {
			gmcommands[k] = util.NewVarType(v.(string))
		}
		DoGMCmd(gmcommands)
	}
}

func DoGMCmd(cmd map[string]*util.VarType) {
	value, ok := cmd["gmcmd"]
	if !ok {
		log.Error("找不到gmcmd字段")
		return
	}

	switch value.String() {
	case "reload":
		GateSvr().Reload()
		break
	}
}

func on_MS2GW_PushNewMail(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_PushNewMail)
	receiver := UserMgr().FindById(tmsg.GetReceiver())
	if receiver == nil {
		return
	}
	receiver.mailbox.ReceiveNewMail(tmsg.GetMail())
}

func on_GW2C_PushAddYouFriend(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushAddYouFriend)
	receiver := UserMgr().FindById(tmsg.GetHandler())
	if receiver == nil {
		return
	}
	receiver.friends.OnFriendRequestRecv(tmsg)
}

func on_GW2C_PushFriendAddSuccess(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushFriendAddSuccess)
	receiver := UserMgr().FindById(tmsg.GetHandler())
	if receiver == nil {
		return
	}
	receiver.friends.OnFriendRequestPass(tmsg)
}

func on_GW2C_PushRemoveFriend(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushRemoveFriend)
	receiver := UserMgr().FindById(tmsg.GetHandler())
	if receiver == nil {
		return
	}
	receiver.friends.OnFriendRemove(tmsg)
}

func on_GW2C_PushFriendPresent(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushFriendPresent)
	receiver := UserMgr().FindById(tmsg.GetHandler())
	if receiver == nil {
		return
	}
	receiver.friends.OnFriendPresent(tmsg)
}

func on_GW2C_PushUserOnline(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_PushUserOnline)
}

func on_GW2C_PushFriendInvitation(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushFriendInvitation)
	UserMgr().OnInviteJoinRoom(tmsg)
}


