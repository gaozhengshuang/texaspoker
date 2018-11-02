package main
import (
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	//pb "github.com/gogo/protobuf/proto"
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

func (mh* GW2CMsgHandler) Init() {

	mh.msgparser = network.NewProtoParser("GW2C_MsgParser", tbl.ProtoMsgIndexGenerator)
	if mh.msgparser == nil {
		return
	}

	// 收Gate消息
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetLogin{}, on_GW2C_RetLogin)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushUserInfo{}, on_GW2C_PushUserInfo)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetHeartBeat{}, on_GW2C_RetHeartBeat)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushMsgNotify{}, on_GW2C_PushMsgNotify)
	mh.msgparser.RegistProtoMsg(msg.GW2C_MsgNotice{}, on_GW2C_MsgNotice)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushPackageItemAdd{}, on_GW2C_PushPackageItemAdd)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushPackageItemRemove{}, on_GW2C_PushPackageItemRemove)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushYuanBaoUpdate{}, on_GW2C_PushYuanBaoUpdate)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushGoldUpdate{}, on_GW2C_PushGoldUpdate)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushDiamondUpdate{}, on_GW2C_PushDiamondUpdate)
	mh.msgparser.RegistProtoMsg(msg.GW2C_Ret7DayReward{}, on_GW2C_Ret7DayReward)
	mh.msgparser.RegistProtoMsg(msg.GW2C_LuckyDrawHit{}, on_GW2C_LuckyDrawHit)
	mh.msgparser.RegistProtoMsg(msg.GW2C_SendDeliveryAddressList{}, on_GW2C_SendDeliveryAddressList)
	mh.msgparser.RegistProtoMsg(msg.GW2C_SendLuckyDrawRecord{}, on_GW2C_SendLuckyDrawRecord)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushItemList{}, on_GW2C_PushItemList)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushMessage{}, on_GW2C_PushMessage)


	// 房间
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetCreateRoom{}, on_GW2C_RetCreateRoom)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetTexasRoomList{}, on_GW2C_RetTexasRoomList)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetUserRoomInfo{}, on_GW2C_RetUserRoomInfo)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetLeaveRoom{}, on_GW2C_RetLeaveRoom)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetCurRoom{}, on_GW2C_RetCurRoom)

	mh.msgparser.RegistProtoMsg(msg.RS2C_RetSitDown{}, on_RS2C_RetSitDown)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetStandUp{}, on_RS2C_RetStandUp)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetEnterRoom{}, on_RS2C_RetEnterRoom)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetInsideRoomInfoList{}, on_RS2C_RetInsideRoomInfoList)

	// 邮件
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushNewMail{}, on_GW2C_PushNewMail)

	// 好友
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetFriendsList{}, on_GW2C_RetFriendsList)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetPresentToFriend{}, on_GW2C_RetPresentToFriend)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetGetFriendPresent{}, on_GW2C_RetGetFriendPresent)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushFriendPresent{}, on_GW2C_PushFriendPresent)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetFriendRequestList{}, on_GW2C_RetFriendRequestList)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetRemoveFriend{}, on_GW2C_RetRemoveFriend)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushRemoveFriend{}, on_GW2C_PushRemoveFriend)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetAddFriend{}, on_GW2C_RetAddFriend)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushFriendAddSuccess{}, on_GW2C_PushFriendAddSuccess)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushAddYouFriend{}, on_GW2C_PushAddYouFriend)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetProcessFriendRequest{}, on_GW2C_RetProcessFriendRequest)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetFriendSearch{}, on_GW2C_RetFriendSearch)
	//mh.msgparser.RegistProtoMsg(msg.GW2C_PushFriendLogin{}, on_GW2C_PushFriendLogin)
	//mh.msgparser.RegistProtoMsg(msg.GW2C_PushFriendInvitation{}, on_GW2C_PushFriendInvitation)
	mh.msgparser.RegistProtoMsg(msg.GW2C_PushFriendInvitation{}, on_GW2C_PushFriendInvitation)

	// 百人大战
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetTFRoomList{}, 		on_GW2C_RetTFRoomList)
	mh.msgparser.RegistProtoMsg(msg.GW2C_RetEnterTFRoom{}, 		on_GW2C_RetEnterTFRoom)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetTexasFightBet{}, 	on_RS2C_RetTexasFightBet)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetTFLastAwardPoolHit{}, on_RS2C_RetTFLastAwardPoolHit)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetTFStandPlayer{}, 	on_RS2C_RetTFStandPlayer)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetWinLoseTrend{},	 	on_RS2C_RetWinLoseTrend)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetTFBankerList{}, 	on_RS2C_RetTFBankerList)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetTFBecomeBanker{}, 	on_RS2C_RetTFBecomeBanker)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetTFQuitBanker{}, 	on_RS2C_RetTFQuitBanker)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetTFSitDown{}, 		on_RS2C_RetTFSitDown)
	mh.msgparser.RegistProtoMsg(msg.RS2C_ReqTFStandUp{}, 		on_RS2C_ReqTFStandUp)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetTFLeave{}, 			on_RS2C_RetTFLeave)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RetTFStart{}, 			on_RS2C_RetTFStart)
	mh.msgparser.RegistProtoMsg(msg.RS2C_PushBetPoolChange{}, 	on_RS2C_PushBetPoolChange)
	mh.msgparser.RegistProtoMsg(msg.RS2C_PushTFRoundOver{}, 	on_RS2C_PushTFRoundOver)
	mh.msgparser.RegistProtoMsg(msg.RS2C_PushTFStateChange{}, 	on_RS2C_PushTFStateChange)
	mh.msgparser.RegistProtoMsg(msg.RS2C_PushTFPosChange{}, 	on_RS2C_PushTFPosChange)
	mh.msgparser.RegistProtoMsg(msg.RS2C_PushTFPlayerKickOut{}, on_RS2C_PushTFPlayerKickOut)



	// 收room消息
	//mh.msgparser.RegistProtoMsg(msg.BT_GameInit{}, on_BT_GameInit)
	//mh.msgparser.RegistProtoMsg(msg.BT_GameStart{}, on_BT_GameStart)
	//mh.msgparser.RegistProtoMsg(msg.BT_GameOver{}, on_BT_GameOver)
	mh.msgparser.RegistProtoMsg(msg.RS2C_RolePushPropertyChange{}, on_RS2C_RolePushPropertyChange)
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

func on_GW2C_PushMsgNotify(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushMsgNotify)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%s", tmsg.GetText())
}

func on_GW2C_MsgNotice(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_MsgNotice)
	//log.Info(reflect.TypeOf(tmsg).String())
	//log.Info("%+v", tmsg)
}

func on_GW2C_RetHeartBeat(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_RetHeartBeat)
	//log.Info(reflect.TypeOf(tmsg).String())

	//client, ok := session.UserDefData().(*User)
	//if ok == false {
	//	panic("没有为Session设置UserDefData")
	//}
	//if client.Id() == 1000001 {
	//	log.Info("%s on_GW2C_RetHeartBeat", client.Name())	// for test
	//}
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

func on_GW2C_PushItemList(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.GW2C_PushItemList)
	//log.Info(reflect.TypeOf(tmsg).String())
	//log.Info("%#v", tmsg)
}

func on_GW2C_PushMessage(session network.IBaseNetSession, message interface{}) {
}

func on_GW2C_PushItemPosUpdate(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushItemPosUpdate)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_GW2C_RetTexasRoomList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetTexasRoomList)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_GW2C_RetUserRoomInfo(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetUserRoomInfo)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
	client, _ := session.UserDefData().(*User)
	client.roomid, client.roompwd = tmsg.GetRoomid(), tmsg.GetPasswd()
	if client.roomid != 0 {
		client.EnterRoom()
	}
}

func on_GW2C_RetLeaveRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetLeaveRoom)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
	client, _ := session.UserDefData().(*User)
	client.roomid = 0
	client.roompwd = ""
}

func on_GW2C_RetCurRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetCurRoom)
	//log.Info(reflect.TypeOf(tmsg).String())
	//log.Info("%+v", tmsg)

	//  进入百人大战
	if tmsg.GetRoomuid() != 0 {
		u, _ := session.UserDefData().(*User)
		u.ReqEnterTFRoom([]string{util.Ltoa(tmsg.GetRoomuid())})
	}
}


func on_RS2C_RetSitDown(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetSitDown)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_RS2C_RetStandUp(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetStandUp)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_RS2C_RetEnterRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetEnterRoom)
	//log.Info(reflect.TypeOf(tmsg).String())
	log.Info("%+v", tmsg)
}

func on_RS2C_RetInsideRoomInfoList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RetInsideRoomInfoList)
	log.Info("%+v", tmsg)
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
	client.EnterRoom()
	//client.ReqSitDown()

	log.Info("玩家[%s %d] 开启游戏成功，进入房间[%d]", name, id, roomid)

}

func on_GW2C_PushNewMail(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushNewMail)
	log.Info("%+v", tmsg)
}

func on_RS2C_RolePushPropertyChange(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.RS2C_RolePushPropertyChange)
	log.Info("%+v", tmsg)
}


