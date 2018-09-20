package main

import (
	"encoding/json"
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	_ "github.com/gogo/protobuf/proto"
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

func (this *MS2GWMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("MS2GW_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.MS2GW_RetRegist{}, on_MS2GW_RetRegist)
	this.msgparser.RegistProtoMsg(msg.MS2GW_HeartBeat{}, on_MS2GW_HeartBeat)
	this.msgparser.RegistProtoMsg(msg.MS2GW_MsgNotice{}, on_MS2GW_MsgNotice)
	//this.msgparser.RegistProtoMsg(msg.MS2GW_RetStartMatch{}, on_MS2GW_RetStartMatch)
	//this.msgparser.RegistProtoMsg(msg.MS2GW_RetCancelMatch{}, on_MS2GW_RetCancelMatch)
	//this.msgparser.RegistProtoMsg(msg.MS2GW_MatchOk{}, on_MS2GW_MatchOk)
	this.msgparser.RegistProtoMsg(msg.MS2GW_RetCreateRoom{}, on_MS2GW_RetCreateRoom)
	this.msgparser.RegistProtoMsg(msg.MS2Server_BroadCast{}, on_MS2Server_BroadCast)
}

func on_MS2GW_RetRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_RetRegist)
	if tmsg.GetErrcode() != "" {
		panic(fmt.Sprintf("Matach服务器通知注册失败 原因：%s", tmsg.GetErrcode()))
		return
	}

	log.Info("注册网关[%v]到Match成功", tmsg.GetHost())
}

func on_MS2GW_HeartBeat(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_HeartBeat)
	log.Info(reflect.TypeOf(tmsg).String())
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

	if err == "" {
		user.StartGameOk(roomagent, roomid)
	} else {
		user.StartGameFail(err)
	}

	user.CreateRoomResponse(err)
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
