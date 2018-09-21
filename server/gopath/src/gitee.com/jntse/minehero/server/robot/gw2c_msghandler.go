package main
import (
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
)


//func init() {
//	NewGW2CMsgHandler()
//}

type GW2CMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewGW2CMsgHandler() *GW2CMsgHandler {
	handler := &GW2CMsgHandler{}
	handler.Init()
	return handler
}

func (this* GW2CMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("GW2C_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收Gate消息
	this.msgparser.RegistProtoMsg(msg.GW2C_RetLogin{}, on_GW2C_RetLogin)
	this.msgparser.RegistProtoMsg(msg.GW2C_PushUserInfo{}, on_GW2C_PushUserInfo)
	this.msgparser.RegistProtoMsg(msg.GW2C_HeartBeat{}, on_GW2C_HeartBeat)
	this.msgparser.RegistProtoMsg(msg.GW2C_MsgNotify{}, on_GW2C_MsgNotify)
	this.msgparser.RegistProtoMsg(msg.GW2C_MsgNotice{}, on_GW2C_MsgNotice)
	this.msgparser.RegistProtoMsg(msg.GW2C_RetCreateRoom{}, on_GW2C_RetCreateRoom)
	this.msgparser.RegistProtoMsg(msg.GW2C_PushPackageItemAdd{}, on_GW2C_PushPackageItemAdd)
	this.msgparser.RegistProtoMsg(msg.GW2C_PushPackageItemRemove{}, on_GW2C_PushPackageItemRemove)
	this.msgparser.RegistProtoMsg(msg.GW2C_PushYuanBaoUpdate{}, on_GW2C_PushYuanBaoUpdate)
	this.msgparser.RegistProtoMsg(msg.GW2C_PushGoldUpdate{}, on_GW2C_PushGoldUpdate)
	this.msgparser.RegistProtoMsg(msg.GW2C_PushDiamondUpdate{}, on_GW2C_PushDiamondUpdate)
	this.msgparser.RegistProtoMsg(msg.GW2C_Ret7DayReward{}, on_GW2C_Ret7DayReward)
	this.msgparser.RegistProtoMsg(msg.GW2C_LuckyDrawHit{}, on_GW2C_LuckyDrawHit)
	this.msgparser.RegistProtoMsg(msg.GW2C_SendDeliveryAddressList{}, on_GW2C_SendDeliveryAddressList)
	this.msgparser.RegistProtoMsg(msg.GW2C_SendLuckyDrawRecord{}, on_GW2C_SendLuckyDrawRecord)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqTexasRoomList{}, on_C2GW_ReqTexasRoomList)


	// 收room消息
	this.msgparser.RegistProtoMsg(msg.BT_GameInit{}, on_BT_GameInit)
	//this.msgparser.RegistProtoMsg(msg.BT_SendBattleUser{}, on_BT_SendBattleUser)
	this.msgparser.RegistProtoMsg(msg.BT_GameStart{}, on_BT_GameStart)
	this.msgparser.RegistProtoMsg(msg.BT_GameOver{}, on_BT_GameOver)
}

func on_GW2C_PushDiamondUpdate(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushDiamondUpdate)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_GW2C_PushYuanBaoUpdate(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushYuanBaoUpdate)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_GW2C_PushGoldUpdate(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushGoldUpdate)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_GW2C_PushPackageItemRemove(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushPackageItemRemove)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_GW2C_PushPackageItemAdd(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushPackageItemAdd)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_GW2C_MsgNotify(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_MsgNotify)
	//log.Info(reflect.TypeOf(tmsg).String())
	//log.Info("%v", tmsg)
}

func on_GW2C_MsgNotice(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_MsgNotice)
	//log.Info(reflect.TypeOf(tmsg).String())
	//log.Info("%+v", tmsg)
}

func on_GW2C_HeartBeat(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_HeartBeat)
	//log.Info(reflect.TypeOf(tmsg).String())

	//client, ok := session.UserDefData().(*User)
	//if ok == false {
	//	panic("没有为Session设置UserDefData")
	//}
	//if client.Id() == 1000001 {
	//	log.Info("%s on_GW2C_HeartBeat", client.Name())	// for test
	//}
}

func on_GW2C_RetCreateRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetCreateRoom)
	log.Info(reflect.TypeOf(tmsg).String())

	client, ok := session.UserDefData().(*User)
	if ok == false {
		panic("没有为Session设置UserDefData")
	}

	err, roomid, passwd := tmsg.GetErrcode(), tmsg.GetRoomid(), tmsg.GetPasswd()
	name, id := client.Name(), client.Id()
	if err != "" {
		log.Info("玩家[%s %d] 开始游戏失败 err: %s", name, id, err)
		return
	}
	client.roomid, client.roompwd = roomid, passwd

	sendmsg := &msg.C2GW_ReqEnterRoom{Roomid:pb.Int64(roomid),Passwd:pb.String(passwd) }
	session.SendCmd(sendmsg)
	log.Info("玩家[%s %d] 开启游戏成功，进入房间[%d]", name, id, roomid)

}

func on_GW2C_RetLogin(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetLogin)
	//log.Info(reflect.TypeOf(tmsg).String())
	sid := session.Id()
	client, ok := session.UserDefData().(*User)
	if ok == false {
		panic("登陆失败，没有为Session设置UserDefData")
	}

	account := client.Account()
	if tmsg.GetErrcode() != "" {
		log.Info("sid[%d] 账户[%s] 登录Gate失败 [%s]", sid, account, tmsg.GetErrcode())

		// 删除Gate连接
		//client.Net().DelWsConnector("GateConnector")

		// 重新连接loginserver
		//client.Net().AddWsConnector("LoginConnector")
		return
	}

	// 请求玩家游戏数据
	//send := &msg.C2GW_ReqUserInfo { Account : pb.String(account) }
	//session.SendCmd(send)
	//log.Info("sid[%d] 账户[%s] 登录Gate成功，请求玩家数据", sid, account)
}


// 构造玩家数据
func on_GW2C_PushUserInfo(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushUserInfo)
	//log.Info(reflect.TypeOf(tmsg).String())
	client, ok := session.UserDefData().(*User)
	if ok == false {
		panic("没有为Session设置UserDefData")
	}
	client.LoadUserData(tmsg)
	client.OnLoginGateOK()
}

func on_GW2C_Ret7DayReward(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_Ret7DayReward)
	//log.Info(reflect.TypeOf(tmsg).String())
}

func on_GW2C_LuckyDrawHit(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_LuckyDrawHit)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_GW2C_SendDeliveryAddressList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_SendDeliveryAddressList)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_GW2C_SendLuckyDrawRecord(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_SendLuckyDrawRecord)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%#v", tmsg)
}

func on_GW2C_PushItemPosUpdate(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushItemPosUpdate)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_C2GW_ReqTexasRoomList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqTexasRoomList)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

