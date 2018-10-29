package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	_ "gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	_ "github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	_ "reflect"
	_ "strconv"
)

//func init() {
//	log.Info("msg_msghandler.init")
//	NewC2GWMsgHandler()
//}

// 提取Session User指针
func ExtractSessionUser(session network.IBaseNetSession) *GateUser {
	u, ok := session.UserDefData().(*GateUser)
	if ok == false {
		log.Fatal("网络会话Sid[%d]中没有绑定User指针", session.Id())
		return nil
	}
	return u
}

type C2GWMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewC2GWMsgHandler() *C2GWMsgHandler {
	handler := &C2GWMsgHandler{}
	handler.Init()
	return handler
}

func (mh *C2GWMsgHandler) Init() {

	mh.msgparser = network.NewProtoParser("C2GW_MsgParser", tbl.ProtoMsgIndexGenerator)
	if mh.msgparser == nil {
		return
	}

	// 收
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqLogin{}, on_C2GW_ReqLogin)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqHeartBeat{}, on_C2GW_ReqHeartBeat)
	mh.msgparser.RegistProtoMsg(msg.C2RS_MsgTransfer{}, on_C2RS_MsgTransfer)
	mh.msgparser.RegistProtoMsg(msg.C2MS_MsgTransfer{}, on_C2MS_MsgTransfer)
	mh.msgparser.RegistProtoMsg(msg.C2MTT_MsgTransfer{}, on_C2MTT_MsgTransfer)

	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqPlayerRoleInfo{}, on_C2GW_ReqPlayerRoleInfo)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqSendMessage{}, on_C2GW_ReqSendMessage)

	// 游戏房间
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqCreateRoom{}, on_C2GW_ReqCreateRoom)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqEnterRoom{}, on_C2GW_ReqEnterRoom)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqLeaveRoom{}, on_C2GW_ReqLeaveRoom)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqUserRoomInfo{}, on_C2GW_ReqUserRoomInfo)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqTexasRoomList{}, on_C2GW_ReqTexasRoomList)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqCurRoom{}, on_C2GW_ReqCurRoom)

	// 邮件
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqMailList{}, on_C2GW_ReqMailList)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqTakeMailItem{}, on_C2GW_ReqTakeMailItem)

	// 好友
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqFriendsList{}, on_C2GW_ReqFriendsList)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqAddFriend{}, on_C2GW_ReqAddFriend)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqRemoveFriend{}, on_C2GW_ReqRemoveFriend)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqFriendRequestList{}, on_C2GW_ReqFriendRequestList)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqProcessFriendRequest{}, on_C2GW_ReqProcessFriendRequest)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqPresentToFriend{}, on_C2GW_ReqPresentToFriend)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqGetFriendPresent{}, on_C2GW_ReqGetFriendPresent)
	//mh.msgparser.RegistProtoMsg(msg.C2GW_ReqFriendDetail{}, on_C2GW_ReqFriendDetail)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqFriendSearch{}, on_C2GW_ReqFriendSearch)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqInviteFriendJoin{}, on_C2GW_ReqInviteFriendJoin)

	// 百人大战
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqTFRoomList{}, on_C2GW_ReqTFRoomList)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqEnterTFRoom{}, on_C2GW_ReqEnterTFRoom)

	//活动
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqActivityInfo{}, on_C2GW_ReqActivityInfo)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqGetActivityReward{}, on_C2GW_ReqGetActivityReward)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqRankList{}, on_C2GW_ReqRankList)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqGetFreeGold{}, on_C2GW_ReqGetFreeGold)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqAwardExchange{}, on_C2GW_ReqAwardExchange)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqAwardRecord{}, on_C2GW_ReqAwardRecord)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqAwardGetInfo{}, on_C2GW_ReqAwardGetInfo)
	//成就任务
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqAchieveInfo{}, on_C2GW_ReqAchieveInfo)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqTakeAchieveAward{}, on_C2GW_ReqTakeAchieveAward)
	//其他任务
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqTakeOtherTask{}, on_C2GW_ReqTakeOtherTask)

	//高级场破产弹窗
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqPayRecommend{}, on_C2GW_ReqPayRecommend)
}

// 客户端心跳
func on_C2GW_ReqHeartBeat(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_ReqHeartBeat)
	//log.Info(reflect.TypeOf(tmsg).String())

	//account, ok := session.UserDefData().(string)
	//if ok == false {
	//	session.Close()
	//	return
	//}

	//u := UserMgr().FindByAccount(account)
	//if u == nil {
	//	log.Error("收到账户[%s]心跳，但玩家不在线", account)
	//	return
	//}

	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.SetHeartBeat(util.CURTIMEMS())
	curtime := util.CURTIME()
	//log.Info("receive heart beat msg now=%d", curtime)
	u.SendMsg(&msg.GW2C_RetHeartBeat{
		Time: pb.Int64(curtime),
	})
}

func on_C2MS_MsgTransfer(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2MS_MsgTransfer)
	u := ExtractSessionUser(session)
	if u == nil {
		return
	}
	if u.Id() != tmsg.GetUid() {
		log.Error("玩家[%s %d] 消息转发只能带自己的玩家Id", u.Name(), u.Id())
		return
	}
	Match().SendCmd(tmsg)
}

func on_C2MTT_MsgTransfer(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2MTT_MsgTransfer)
	u := ExtractSessionUser(session)
	if u == nil {
		return
	}
	if u.Id() != tmsg.GetUid() {
		log.Error("玩家[%s %d] 消息转发只能带自己的玩家Id", u.Name(), u.Id())
		return
	}
	RoomSvrMgr().SendMTTMsg(tmsg)
}

func on_C2RS_MsgTransfer(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2RS_MsgTransfer)
	//msg_type := pb.MessageType(tmsg.GetName())
	//if msg_type == nil {
	//	log.Fatal("消息转发解析失败，找不到proto msg=%s" , tmsg.GetName())
	//	return
	//}

	//protomsg := reflect.New(msg_type.Elem()).Interface()
	//err := pb.Unmarshal(tmsg.GetBuf(), protomsg.(pb.Message))
	//if err != nil {
	//	log.Fatal("消息转发解析失败，Unmarshal失败 msg=%s" , tmsg.GetName())
	//	return
	//}

	//u := UserMgr().FindById(tmsg.GetUid())
	//if u == nil { return }
	//if u.IsInRoom() == false {
	//	log.Warn("消息转发失败，玩家[%s %d]没有在任何房间中", u.Name(), u.Id())
	//	return
	//}
	//u.SendRoomMsg(protomsg.(pb.Message))
	u := ExtractSessionUser(session)
	// 不做解析转发到RoomServer
	if u == nil {
		return
	}
	if u.Id() != tmsg.GetUid() {
		log.Error("玩家[%s %d] 消息转发只能带自己的玩家Id", u.Name(), u.Id())
		return
	}

	//if u.IsInRoom() == false {
	//	log.Warn("消息转发失败，玩家[%s %d]没有在任何房间中", u.Name(), u.Id())
	//	return
	//}
	u.SendRoomMsg(tmsg)
}

func on_C2GW_ReqCreateRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqCreateRoom)
	//log.Info(reflect.TypeOf(tmsg).String())
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	if errcode := u.CreateRoomRemote(tmsg); errcode != "" {
		u.CreateRoomResponse(errcode)
	}
}

func on_C2GW_ReqEnterRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqEnterRoom)
	//log.Info(reflect.TypeOf(tmsg).String())
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if u.Id() != tmsg.GetUserid() {
		log.Error("[房间] 玩家[%s %d]请求进入房间，使用错误的id[%d]", u.Name(), u.Id(), tmsg.GetUserid())
		return
	}

	roomid := tmsg.GetRoomid()
	if roomid == 0 {
		log.Error("[房间] 玩家[%s %d]请求进入无效的房间[%d]", u.Name(), u.Id(), roomid)
		return
	}

	sid := GetRoomSid(roomid)
	if sid == 0 {
		log.Error("[房间] 玩家[%s %d]请求进入的房间[%d]已经销毁", u.Name(), u.Id(), roomid)
		return
	}

	// 背包立即同步DB
	u.bag.DBSave()


	// 重新进入房间，不需要上传玩家二进制数据
	//if u.RoomId() != roomid {
	//	u.SendUserBinToRoom(sid, roomid)
	//}

	// 进入游戏房间
	log.Info("玩家[%s %d] 请求进入房间[%d] ts[%d]", u.Name(), u.Id(), tmsg.GetRoomid(), util.CURTIMEMS())
	RoomSvrMgr().SendMsg(sid, tmsg)
}

func on_C2GW_ReqLeaveRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqLeaveRoom)
	//log.Info(reflect.TypeOf(tmsg).String())

	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if u.Id() != tmsg.GetUserid() {
		log.Error("[房间] 玩家[%s %d]请求离开房间，使用错误的id[%d]", u.Name(), u.Id(), tmsg.GetUserid())
		return
	}

	// 离开游戏房间
	u.SendRoomMsg(tmsg)
}

func on_C2GW_ReqUserRoomInfo(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_ReqUserRoomInfo)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 通知客户端房间信息
	send := &msg.GW2C_RetUserRoomInfo{Roomid: pb.Int64(u.RoomId()), Tid: pb.Int32(u.RoomTid()), Passwd: pb.String(u.RoomPwd())}
	u.SendMsg(send)
}

func on_C2GW_ReqTexasRoomList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqTexasRoomList)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.SendTexasRoomList(tmsg.GetType())
}

func on_C2GW_ReqCurRoom(session network.IBaseNetSession, message interface{}) {
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	send := &msg.GW2C_RetCurRoom{}
    lastroom, _ := Redis().Get(fmt.Sprintf("userinroom_%d", u.Id())).Int64()
	send.Roomuid = pb.Int64(lastroom)
	u.SendMsg(send)
}

func on_C2GW_ReqLogin(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqLogin)
	errmsg, account, verifykey, token, face := "", tmsg.GetAccount(), tmsg.GetVerifykey(), tmsg.GetToken(), tmsg.GetHead()
	islogin := false

	switch {
	default:
		u := UserMgr().FindByAccount(account)
		if u != nil {
			if u.IsOnline() {
				islogin, errmsg = true, "玩家已经登陆了"
				break
			}

			if errmsg = UserMgr().LoginByCache(session, u); errmsg != "" {
				break
			}
		} else {
			wAccount := WaitPool().Find(account)
			if wAccount == nil {
				errmsg = "非法登陆网关"
				break
			}

			if wAccount.verifykey != verifykey {
				errmsg = "登陆网关校验失败"
				log.Info("账户%s 登陆Gate校验Key不正确 want:%s have:%s", account, wAccount.verifykey, verifykey)
				break
			}

			u, errmsg = UserMgr().CreateNewUser(session, account, verifykey, token, face) // 构造u指针 from redis db
			if errmsg != "" || u == nil {
				break
			}
		}

		session.SetUserDefData(u) // TODO: 登陆成功才绑定账户到会话
		return
	}

	// 返回给客户端，失败才回
	if errmsg != "" {
		if !islogin {
			UnBindingAccountGateWay(account)
		}
		log.Error("sid[%d] 账户[%s] 登陆网关失败 errmsg[%s]", session.Id(), account, errmsg)
		send := &msg.GW2C_RetLogin{Errcode: pb.String(errmsg)}
		session.SendCmd(send)
		session.Close()
	}
}

// 个人邮件列表
func on_C2GW_ReqMailList(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_ReqMailList)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.mailbox.SendMailList()
}

func on_C2GW_ReqTakeMailItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqTakeMailItem)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.mailbox.TakeMailItem(tmsg.GetUid())
}

// --------------------------------------------------------------------------
/// @brief 好友
// --------------------------------------------------------------------------
func on_C2GW_ReqFriendsList(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_ReqFriendsList)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.friends.SendFriendList()
}

func on_C2GW_ReqRemoveFriend(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqRemoveFriend)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.friends.RequestRemoveFriend(tmsg.GetRoleid())
}

func on_C2GW_ReqAddFriend(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqAddFriend)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.friends.RequestAddFriend(tmsg.GetRoleid())
}

func on_C2GW_ReqFriendRequestList(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_ReqFriendRequestList)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.friends.SendFriendRequestList()
}

func on_C2GW_ReqProcessFriendRequest(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqProcessFriendRequest)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.friends.ProcessFriendRequest(tmsg.GetRoleid(), tmsg.GetIsaccept())
}

func on_C2GW_ReqPresentToFriend(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqPresentToFriend)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.friends.RequestPresentToFriend(tmsg.GetRoleid())
}

func on_C2GW_ReqGetFriendPresent(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqGetFriendPresent)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.friends.RequestGetFriendPresent(tmsg.GetRoleid())
}

//func on_C2GW_ReqFriendDetail(session network.IBaseNetSession, message interface{}) {
//	tmsg := message.(*msg.C2GW_ReqFriendDetail)
//	u := ExtractSessionUser(session)
//	if u == nil {
//		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
//		session.Close()
//		return
//	}
//	u.friends.SendFriendDetail(tmsg.GetRoleid())
//}

func on_C2GW_ReqFriendSearch(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqFriendSearch)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.SearchUser(tmsg.GetVal())
}

func on_C2GW_ReqInviteFriendJoin(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqInviteFriendJoin)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.InviteFriendsJoin(tmsg.GetId(), tmsg.Roleid)
}

func on_C2GW_ReqTFRoomList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqTFRoomList)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	agent := RoomSvrMgr().FindByName(tbl.Room.TexasFightRoomName)
	if agent == nil {
		log.Error("[百人大战] 玩家[%s %d]请求百人大战房间列表失败，找不到RoomServer", u.Name(), u.Id())
		return
	}

	tmsg.Uid = pb.Int64(u.Id())
	agent.SendMsg(tmsg)
}

func on_C2GW_ReqEnterTFRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqEnterTFRoom)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if u.Id() != tmsg.GetUserid() {
		log.Error("[百人大战] 玩家[%s %d]请求进入房间，使用错误的id[%d]", u.Name(), u.Id(), tmsg.GetUserid())
		return
	}

	roomid := tmsg.GetId()
	if roomid == 0 {
		log.Error("[百人大战] 玩家[%s %d]请求进入无效的房间[%d]", u.Name(), u.Id(), roomid)
		return
	}

	sid := GetRoomSid(roomid)
	if sid == 0 {
		log.Error("[百人大战] 玩家[%s %d]请求进入的房间[%d]已经销毁", u.Name(), u.Id(), roomid)
		return
	}

	// 背包立即同步DB
	u.bag.DBSave()

	// 进入游戏房间
	log.Info("玩家[%s %d] 请求进入百人大战房间[%d] ts[%d]", u.Name(), u.Id(), roomid, util.CURTIMEMS())
	RoomSvrMgr().SendMsg(sid, tmsg)
}

func on_C2GW_ReqPlayerRoleInfo(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqPlayerRoleInfo)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.OnReqPlayerRoleInfo(tmsg.GetRoleid())
}

func on_C2GW_ReqActivityInfo(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqActivityInfo)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	id := tmsg.GetId()
	u.OnReqActivityInfo(id)
}

func on_C2GW_ReqGetActivityReward(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqGetActivityReward)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	id := tmsg.GetId()
	subid := tmsg.GetSubid()
	u.OnReqGetActivityReward(id, subid)
}

func on_C2GW_ReqRankList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqRankList)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	_type := tmsg.GetType()
	_rank := tmsg.GetRank()
	u.ReqRankListByType(_type, _rank)
}

func on_C2GW_ReqGetFreeGold(session network.IBaseNetSession, message interface{}) {
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.GetFreeGold()
}

func on_C2GW_ReqSendMessage(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqSendMessage)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.SendChat(tmsg)
}

func on_C2GW_ReqAwardExchange(session network.IBaseNetSession, message interface{}) {
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	tmsg := message.(*msg.C2GW_ReqAwardExchange)
	id := tmsg.GetId()
	count := tmsg.GetCount()
	u.ReqAwardExchange(id, count)
}

func on_C2GW_ReqAwardRecord(session network.IBaseNetSession, message interface{}) {
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	tmsg := message.(*msg.C2GW_ReqAwardRecord)
	logid := tmsg.GetLogid()
	startid := tmsg.GetStartid()
	count := tmsg.GetCount()
	u.GetRewardRecordByLogid(logid,startid,count)
}

func on_C2GW_ReqAwardGetInfo(session network.IBaseNetSession, message interface{}) {
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.GetAwardGetInfo()
}

func on_C2GW_ReqAchieveInfo(session network.IBaseNetSession, message interface{}) {
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	tmsg := message.(*msg.C2GW_ReqAchieveInfo)
	roleid := tmsg.GetRoleid()
	u.OnReqAhcieveInfo(roleid)
}

func on_C2GW_ReqTakeAchieveAward(session network.IBaseNetSession, message interface{}) {
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	tmsg := message.(*msg.C2GW_ReqTakeAchieveAward)
	taskid := tmsg.GetId()
	send := &msg.GW2C_RetTakeAchieveAward{}
	send.Id = pb.Int32(taskid)
	err := u.OnReqTakeAchieveAward(taskid)
	send.Errcode = pb.String(err)
	u.SendMsg(send)
}

func on_C2GW_ReqPayRecommend(session network.IBaseNetSession, message interface{}) {
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	tmsg := message.(*msg.C2GW_ReqPayRecommend)
	param := tmsg.GetParam()
	u.CheckPayPush(param)
}

func on_C2GW_ReqTakeOtherTask(session network.IBaseNetSession, message interface{}) {
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	tmsg := message.(*msg.C2GW_ReqTakeOtherTask)
	tasktype := tmsg.GetTasktype()
	send := &msg.GW2C_RetTakeOtherTask{}
	send.Tasktype = pb.Int32(tasktype)
	if tasktype == 1 {
		taskid := u.CheckTakeLuckyTask()
		send.Taskid = pb.Int32(taskid)
	}
	u.SendMsg(send)
}
