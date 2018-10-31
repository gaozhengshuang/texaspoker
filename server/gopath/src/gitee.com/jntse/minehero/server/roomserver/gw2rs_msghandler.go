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

func (mh* C2GWMsgHandler) Init() {

	mh.msgparser = network.NewProtoParser("GW2RS_MsgParser", tbl.ProtoMsgIndexGenerator)
	if mh.msgparser == nil {
		return
	}

	// 收
	mh.msgparser.RegistProtoMsg(msg.GW2RS_RetRegist{}, on_GW2RS_RetRegist)
	mh.msgparser.RegistProtoMsg(msg.GW2RS_UserDisconnect{}, on_GW2RS_UserDisconnect)
	mh.msgparser.RegistProtoMsg(msg.GW2RS_UploadUserBin{}, on_GW2RS_UploadUserBin)
	mh.msgparser.RegistProtoMsg(msg.GW2RS_UserOnline{}, on_GW2RS_UserOnline)
	mh.msgparser.RegistProtoMsg(msg.C2RS_MsgTransfer{}, on_C2RS_MsgTransfer)
	mh.msgparser.RegistProtoMsg(msg.C2MTT_MsgTransfer{}, on_C2MTT_MsgTransfer)
	mh.msgparser.RegistProtoMsg(msg.GW2RS_ChatInfo{}, on_GW2RS_ChatInfo)

	// 功能
	mh.msgparser.RegistProtoMsg(msg.C2GW_PlatformRechargeDone{}, on_C2GW_PlatformRechargeDone)
	mh.msgparser.RegistProtoMsg(msg.C2GW_GoldExchange{}, on_C2GW_GoldExchange)

	// 房间
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqEnterRoom{}, on_C2GW_ReqEnterRoom)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqLeaveRoom{}, on_C2GW_ReqLeaveRoom)

	// 百人大战
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqTFRoomList{}, on_C2GW_ReqTFRoomList)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqEnterTFRoom{}, on_C2GW_ReqEnterTFRoom)
}

func on_GW2RS_RetRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_RetRegist)
	name, ip, port := tmsg.GetAgentname(), session.RemoteIp(), session.RemotePort()
	if tmsg.GetErrcode() != "" {
		log.Info("请求注册房间服[%s]到Gate[%s][%s:%d]失败: %s", RoomSvr().Name(), session.Name(), ip, port, tmsg.GetErrcode())
		panic(fmt.Sprintf("网关通知注册失败 原因:%s", tmsg.GetErrcode()))
	}

	// 重复注册检查
	if GateMgr().IsRegisted(ip, port) == true {
		log.Fatal(fmt.Sprintf("已经注册过网关房间服务器 [%s:%d]", ip, port))
		return
	}

	// 添加gate
	GateMgr().AddNew(session, name, ip, port)
	log.Info("注册房间服[%s]到Gate[%s][%s:%d]成功", RoomSvr().Name(), name, ip, port)
}

func on_GW2RS_UserDisconnect(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_UserDisconnect)
	//log.Info(reflect.TypeOf(tmsg).String())

	rsend := &msg.RS2GW_RetUserDisconnect{ Userid:tmsg.Userid, Errcode: pb.String("") }
	userid := tmsg.GetUserid()
	u := UserMgr().FindUser(userid)
	if u == nil {
		log.Error("GW2RS_UserDisconnect 玩家[%d] 不在Room中", userid)
		rsend.Errcode = pb.String("找不到RoomUser")
		session.SendCmd(rsend)
		return
	}

	room := RoomMgr().Find(u.RoomId())
	if room == nil {
		log.Error("GW2RS_UserDisconnect 游戏房间[%d]不存在 玩家[%d]", u.RoomId(), userid)
		rsend.Errcode = pb.String("找不到房间")
		session.SendCmd(rsend)
		return
	}

	room.UserDisconnect(u)
	session.SendCmd(rsend)
}

func on_GW2RS_ChatInfo(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_ChatInfo)
	room := RoomMgr().Find(tmsg.GetRoomid())
	if room == nil {
		return
	}
	room.SendChat(tmsg)
}

func on_GW2RS_UserOnline(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_UserOnline)
	userid  := tmsg.GetUserid()
	u := UserMgr().FindUser(userid)
	if u == nil {
		log.Error("玩家[%d]上线，但是找不到玩家", userid)
		return
	}

	room := RoomMgr().Find(u.RoomId())
	if room == nil {
		log.Error("玩家[%s %d]上线，但房间不存在", userid, u.RoomId())
		return
	}

	u.CheckUpdateGateAgent(session)
}


func on_GW2RS_UploadUserBin(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2RS_UploadUserBin)
	//roomid := tmsg.GetRoomid()
	//room := RoomMgr().Find(roomid)
	//if room == nil {
	//	log.Error("收到玩家信息，但游戏房间[%d]不存在", roomid)
	//	return
	//}

	//room.UserLoad(tmsg, session)
}

func on_C2RS_MsgTransfer(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2RS_MsgTransfer)
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
}

func on_C2MTT_MsgTransfer(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2MTT_MsgTransfer)
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
}

func on_C2GW_ReqEnterRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqEnterRoom)
	roomid, userid  := tmsg.GetRoomid(), tmsg.GetUserid()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d] 请求进入房间[%d]，但房间不存在", userid, roomid)
		return
	}

	u := UserMgr().FindUser(userid)
	if u == nil {
		log.Error("玩家[%d] 请求进入房间[%d]，但没有玩家实例", userid, roomid)
		u = UserMgr().CreateSimpleUser(userid)
		if u == nil {
			log.Error("玩家[%d] 请求进入房间[%d], 玩家不存在", userid, roomid)
			return
		}
	}

	if room.Passwd() != tmsg.GetPasswd() {
		log.Error("玩家[%d] 请求进入房间[%d]，但密码不正确", userid, roomid)
		return
	}

	u.CheckUpdateGateAgent(session)
	room.UserEnter(u)
}

func on_C2GW_ReqLeaveRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqLeaveRoom)
	userid := tmsg.GetUserid()
	msgleave := &msg.RS2GW_UserLeaveRoom{Userid:pb.Int64(userid)}
	u := UserMgr().FindUser(userid)
	if u == nil {
		session.SendCmd(msgleave)
		log.Error("玩家[%d] 请求离开房间，但没有玩家实例", userid)
		return
	}

	roomid := u.RoomId()
	room := RoomMgr().Find(roomid)
	if room == nil {
		session.SendCmd(msgleave)
		log.Error("玩家[%d] 请求离开房间，找不到房间[%d]", userid, roomid)
		return
	}
	//u.DelRoomId(roomid)
	room.UserLeave(u) 
}

// --------------------------------------------------------------------------
/// @brief 百人大战列表
// --------------------------------------------------------------------------
func on_C2GW_ReqTFRoomList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqTFRoomList)
	SendTexasFightRoomList(session.Id(), tmsg.GetUid())
}

// --------------------------------------------------------------------------
/// @brief 进入百人大战
// --------------------------------------------------------------------------
func on_C2GW_ReqEnterTFRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqEnterTFRoom)
	userid, roomid := tmsg.GetUserid(), tmsg.GetId()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("[百人大战] 玩家[%d] 请求离开房间，找不到房间[%d]", userid, roomid)
		return
	}

	// 如果玩家不在RoomSever，创建实例
	u := UserMgr().FindUser(userid)
	if u == nil {
		u = UserMgr().CreateSimpleUser(userid)
	}

	u.CheckUpdateGateAgent(session)
	room.UserEnter(u)
}

func on_C2GW_PlatformRechargeDone(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_PlatformRechargeDone)
	//u := UserMgr().FindUser(tmsg.GetUserid())
	//if u == nil { 
	//	log.Error("C2GW_PlatformRechargeDone 玩家[%d]没有在Room中", tmsg.GetUserid())
	//	return 
	//}

	////
	//u.synbalance = true
	//u.SynMidasBalance()
}

// 钻石兑换金币
func on_C2GW_GoldExchange(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_GoldExchange)
	u := UserMgr().FindUser(tmsg.GetUserid())
	if u == nil { 
		log.Error("C2GW_GoldExchange 玩家[%d]没有在Room中", tmsg.GetUserid())
		return 
	}

	//
	diamonds := tmsg.GetDiamonds()
	if diamonds < 0 {
		u.SendNotify("钻石数量不能是0")
		return
	}

	if u.GetDiamond() < diamonds {
		u.SendNotify("钻石不足")
		return
	}
	
	gold := int64(tbl.Game.DiamondToCoins) * diamonds
	u.RemoveDiamond(diamonds, "钻石兑换金币", true)
	u.AddGold(gold, "钻石兑换金币", false)

	send := &msg.GW2C_RetGoldExchange{Gold:pb.Int64(gold)}
	u.SendClientMsg(send)
}




