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
	this.msgparser.RegistProtoMsg(msg.GW2RS_UploadUserBin{}, on_GW2RS_UploadUserBin)
	this.msgparser.RegistProtoMsg(msg.C2RS_MsgTransfer{}, on_C2RS_MsgTransfer)

	// 功能
	this.msgparser.RegistProtoMsg(msg.C2GW_PlatformRechargeDone{}, on_C2GW_PlatformRechargeDone)
	this.msgparser.RegistProtoMsg(msg.C2GW_GoldExchange{}, on_C2GW_GoldExchange)

	//房间
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqEnterRoom{}, on_C2GW_ReqEnterRoom)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqLeaveRoom{}, on_C2GW_ReqLeaveRoom)

	//德州房间内消息
	this.msgparser.RegistProtoMsg(msg.C2RS_ReqTimeAwardInfo{}, on_C2RS_ReqTimeAwardInfo)
	this.msgparser.RegistProtoMsg(msg.C2RS_ReqBuyInGame{}, on_C2RS_ReqBuyInGame)
	this.msgparser.RegistProtoMsg(msg.C2RS_ReqFriendGetRoleInfo{}, on_C2RS_ReqFriendGetRoleInfo)
	this.msgparser.RegistProtoMsg(msg.C2RS_ReqNextRound{}, on_C2RS_ReqNextRound)
	this.msgparser.RegistProtoMsg(msg.C2RS_ReqAction{}, on_C2RS_ReqAction)
	this.msgparser.RegistProtoMsg(msg.C2RS_ReqBrightCard{}, on_C2RS_ReqBrightCard)
	this.msgparser.RegistProtoMsg(msg.C2RS_ReqAddCoin{}, on_C2RS_ReqAddCoin)
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

func on_GW2RS_UploadUserBin(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2RS_UploadUserBin)
	roomid := tmsg.GetRoomid()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("收到玩家信息，但游戏房间[%d]不存在", roomid)
		return
	}

	room.UserLoad(tmsg, session)
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


func on_C2GW_ReqEnterRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqEnterRoom)
	roomid, userid  := tmsg.GetRoomid(), tmsg.GetUserid()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d] 请求进入房间[%d]，但房间不存在", userid, roomid)
		return
	}

	user := UserMgr().FindUser(userid)
	if user == nil {
		log.Error("玩家[%d] 请求进入房间[%d]，但没有玩家实例", userid, roomid)
		return
	}

	if room.Passwd() != tmsg.GetPasswd() {
		log.Error("玩家[%d] 请求进入房间[%d]，但密码不正确", userid, roomid)
		return
	}

	room.UserEnter(user)
}

func on_C2GW_ReqLeaveRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqLeaveRoom)
	userid := tmsg.GetUserid()
	user := UserMgr().FindUser(userid)
	if user == nil {
		log.Error("玩家[%d] 请求离开房间，但没有玩家实例", userid)
		return
	}

	roomid := user.RoomId()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d] 请求离开房间，找不到房间[%d]", userid, roomid)
		return
	}

	room.UserLeave(user) 
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
	
	gold := int32(tbl.Game.DiamondToCoins) * diamonds
	user.RemoveDiamond(diamonds, "钻石兑换金币", true)
	user.AddGold(gold, "钻石兑换金币", false)

	send := &msg.GW2C_RetGoldExchange{Gold:pb.Int32(gold)}
	user.SendClientMsg(send)
}

func on_C2RS_ReqTimeAwardInfo(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2RS_ReqTimeAwardInfo)
	//uid := tmsg.GetUserid()
	//u := UserMgr().FindUser(uid)
	//if u == nil {
	//	log.Error("[房间] 玩家[%d] 无效", uid)
	//	return
	//}

	//roomid := u.RoomId()
	//room := RoomMgr().Find(roomid)
	//if room == nil {
	//	log.Error("[房间] 玩家[%d] 房间无效 [%d]", uid, roomid)
	//	return
	//}
	

}

func on_C2RS_ReqBuyInGame(session network.IBaseNetSession, message interface{}) {
}

func on_C2RS_ReqFriendGetRoleInfo(session network.IBaseNetSession, message interface{}) {
}

func on_C2RS_ReqNextRound(session network.IBaseNetSession, message interface{}) {
}

func on_C2RS_ReqAction(session network.IBaseNetSession, message interface{}) {
}

func on_C2RS_ReqBrightCard(session network.IBaseNetSession, message interface{}) {
}

func on_C2RS_ReqAddCoin(session network.IBaseNetSession, message interface{}) {
}



