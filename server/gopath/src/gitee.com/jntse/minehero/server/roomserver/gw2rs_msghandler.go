package main
import (
	"fmt"
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	_"github.com/go-redis/redis"
)


//func init() {
//	log.Info("gw2rs_msghandler.init")
//	NewC2GWMsgHandler()
//}

type C2GWMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewC2GWMsgHandler() *C2GWMsgHandler {
	handler := &C2GWMsgHandler{}
	handler.Init()
	return handler
}

func (this* C2GWMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("GW2RS_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.GW2RS_RetRegist{}, on_GW2RS_RetRegist)
	this.msgparser.RegistProtoMsg(msg.GW2RS_UserDisconnect{}, on_GW2RS_UserDisconnect)
	this.msgparser.RegistProtoMsg(msg.GW2RS_MsgTransfer{}, on_GW2RS_MsgTransfer)
	this.msgparser.RegistProtoMsg(msg.GW2RS_UploadUserBin{}, on_GW2RS_UploadUserBin)
	this.msgparser.RegistProtoMsg(msg.BT_ReqEnterRoom{}, on_BT_ReqEnterRoom)
	this.msgparser.RegistProtoMsg(msg.BT_ReqLeaveRoom{}, on_BT_ReqLeaveRoom)
	this.msgparser.RegistProtoMsg(msg.C2GW_PlatformRechargeDone{}, on_C2GW_PlatformRechargeDone)
	this.msgparser.RegistProtoMsg(msg.C2GW_GoldExchange{}, on_C2GW_GoldExchange)
}

func on_GW2RS_RetRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_RetRegist)
	name, ip, port := tmsg.GetAgentname(), session.RemoteIp(), session.RemotePort()
	if tmsg.GetErrcode() != "" {
		log.Info("请求注册房间服[%s]到Gate[%s][%s:%d]失败: %s", RoomSvr().Name(), session.Name(), ip, port, tmsg.GetErrcode())
		panic(fmt.Sprintf("网关通知注册失败 原因:%s", tmsg.GetErrcode()))
		return
	}

	// TODO: 重复注册服务器为了第一时间发现问题使用了panic
	if GateMgr().IsRegisted(ip, port) == true {
		log.Fatal(fmt.Sprintf("已经注册过网关房间服务器 [%s:%d]", ip, port))
		return
	}

	// 添加gate
	GateMgr().AddNew(session, name, ip, port)
	log.Info("注册房间服[%s]到Gate[%s][%s:%d]成功", RoomSvr().Name(), session.Name(), ip, port)
}

func on_GW2RS_UserDisconnect(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_UserDisconnect)
	//log.Info(reflect.TypeOf(tmsg).String())

	rsend := &msg.RS2GW_RetUserDisconnect{ Roomid:tmsg.Roomid, Userid:tmsg.Userid, Errcode: pb.String("") }
	roomid, userid := tmsg.GetRoomid(), tmsg.GetUserid()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("GW2RS_UserDisconnect 游戏房间[%d]不存在 玩家[%d]", roomid, userid)
		rsend.Errcode = pb.String("找不到房间")
		session.SendCmd(rsend)
		return
	}
	room.UserDisconnect(userid)
	session.SendCmd(rsend)
}

func on_GW2RS_MsgTransfer(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_MsgTransfer)
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

	ClientMsgAgent().Handler(session, protomsg, tmsg.GetUid())
	//log.Info("msg=%v", protomsg)
}

func on_GW2RS_UploadUserBin(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_UploadUserBin)
	roomid := tmsg.GetRoomid()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("收到玩家信息，但游戏房间[%d]不存在", roomid)
		return
	}

	room.UserLoad(tmsg.GetBin(), session)
}

func on_BT_ReqEnterRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_ReqEnterRoom)
	roomid, userid  := tmsg.GetRoomid(), tmsg.GetUserid()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("BT_ReqEnterRoom 游戏房间[%d]不存在 玩家[%d]", roomid, userid)
		return
	}

	room.UserEnter(userid)
}

func on_BT_ReqLeaveRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_ReqLeaveRoom)
	roomid, userid := tmsg.GetRoomid(), tmsg.GetUserid()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("on_BT_ReqLeaveRoom 游戏房间[%d]不存在 玩家[%d]", roomid, userid)
		return
	}
	//room.UserLeave(userid, tmsg.GetGold())
	room.UserLeave(userid) 
}

func on_C2GW_PlatformRechargeDone(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_PlatformRechargeDone)
	user := UserMgr().FindUser(tmsg.GetUserid())
	if user == nil { 
		log.Error("C2GW_PlatformRechargeDone 玩家[%d]没有在Room中", tmsg.GetUserid())
		return 
	}

	//
	user.synbalance = true
	user.SynMidasBalance()
}

// 钻石兑换金币
func on_C2GW_GoldExchange(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_GoldExchange)
	user := UserMgr().FindUser(tmsg.GetUserid())
	if user == nil { 
		log.Error("C2GW_GoldExchange 玩家[%d]没有在Room中", tmsg.GetUserid())
		return 
	}

	//
	diamonds := tmsg.GetDiamonds()
	if diamonds < 0 {
		user.SendNotify("钻石数量不能是0")
		return
	}

	if user.GetDiamond() < diamonds {
		user.SendNotify("钻石不足")
		return
	}
	
	gold := uint32(tbl.Game.DiamondToCoins) * diamonds
	user.RemoveDiamond(diamonds, "钻石兑换金币", true)
	user.AddGold(gold, "钻石兑换金币", false)

	send := &msg.GW2C_RetGoldExchange{Gold:pb.Uint32(gold)}
	user.SendClientMsg(send)
}

