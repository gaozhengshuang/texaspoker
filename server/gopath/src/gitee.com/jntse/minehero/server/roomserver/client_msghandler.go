package main
import (
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	//"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	_"github.com/go-redis/redis"
)


// --------------------------------------------------------------------------
/// @brief 转发客户端消息Handler
/// @return 
// --------------------------------------------------------------------------
type ClientMsgFunHandler func(session network.IBaseNetSession, message interface{}, uid int64)
type ClientMsgHandler struct {
	msghandler map[string]ClientMsgFunHandler
}

func NewClientMsgHandler() *ClientMsgHandler {
	h := new(ClientMsgHandler)
	h.Init()
	return h
}

func (mh *ClientMsgHandler) Init() {
	mh.msghandler = make(map[string]ClientMsgFunHandler)

	// 消息注册
	//mh.RegistProtoMsg(msg.C2GW_StartLuckyDraw{}, on_C2GW_StartLuckyDraw)
	//mh.RegistProtoMsg(msg.C2RS_ReqSitDown{}, on_C2RS_ReqSitDown)
	//mh.RegistProtoMsg(msg.C2RS_ReqStandUp{}, on_C2RS_ReqStandUp)

	//德州房间内消息
	mh.RegistProtoMsg(msg.C2RS_ReqTimeAwardInfo{}, on_C2RS_ReqTimeAwardInfo)
	mh.RegistProtoMsg(msg.C2RS_ReqBuyInGame{}, on_C2RS_ReqBuyInGame)
	mh.RegistProtoMsg(msg.C2RS_ReqFriendGetRoleInfo{}, on_C2RS_ReqFriendGetRoleInfo)
	mh.RegistProtoMsg(msg.C2RS_ReqNextRound{}, on_C2RS_ReqNextRound)
	mh.RegistProtoMsg(msg.C2RS_ReqAction{}, on_C2RS_ReqAction)
	mh.RegistProtoMsg(msg.C2RS_ReqBrightCard{}, on_C2RS_ReqBrightCard)
	mh.RegistProtoMsg(msg.C2RS_ReqAddCoin{}, on_C2RS_ReqAddCoin)
	mh.RegistProtoMsg(msg.C2RS_ReqBrightInTime{}, on_C2RS_ReqBrightInTime)
	mh.RegistProtoMsg(msg.C2RS_ReqStandUp{}, on_C2RS_ReqStandUp)
	mh.RegistProtoMsg(msg.C2RS_ReqTimeAwardGet{}, on_C2RS_ReqTimeAwardGet)
	mh.RegistProtoMsg(msg.C2RS_ReqReviewInfo{}, on_C2RS_ReqReviewInfo)

	//百人大战


	//锦标赛消息
	mh.RegistProtoMsg(msg.C2RS_ReqMTTList{}, on_C2RS_ReqMTTList)
	mh.RegistProtoMsg(msg.C2RS_ReqMTTJoin{}, on_C2RS_ReqMTTJoin)
	mh.RegistProtoMsg(msg.C2RS_ReqMTTQuit{}, on_C2RS_ReqMTTQuit)
	mh.RegistProtoMsg(msg.C2RS_ReqJoinedMTTList{}, on_C2RS_ReqJoinedMTTList)
	mh.RegistProtoMsg(msg.C2RS_ReqInsideRoomInfoList{}, on_C2RS_ReqInsideRoomInfoList)
	mh.RegistProtoMsg(msg.C2RS_ReqMTTRecordList{}, on_C2RS_ReqMTTRecordList)
	mh.RegistProtoMsg(msg.C2RS_ReqMTTRecentlyRankList{}, on_C2RS_ReqMTTRecentlyRankList)
	mh.RegistProtoMsg(msg.C2RS_ReqMTTOutsInfo{}, on_C2RS_ReqMTTOutsInfo)
	mh.RegistProtoMsg(msg.C2RS_ReqMTTRankInfo{}, on_C2RS_ReqMTTRankInfo)
	mh.RegistProtoMsg(msg.C2RS_ReqMTTRebuyOrAddon{}, on_C2RS_ReqMTTRebuyOrAddon)
}

func (mh *ClientMsgHandler) RegistProtoMsg(message interface{} , fn ClientMsgFunHandler) {
	msg_type := reflect.TypeOf(message)
	mh.msghandler[msg_type.String()] = fn
}

func (mh *ClientMsgHandler) Handler(session network.IBaseNetSession, message interface{}, uid int64) {
	pbmsg := message.(pb.Message)
	name := pb.MessageName(pbmsg)
	fn, ok := mh.msghandler[name]
	if ok == false {
		log.Error("ClientMsgHandler 未注册消息%s", name)
		return
	}

	//u := UserMgr().FindUser(uid)
	//if u == nil { 
	//	log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
	//	return 
	//}

	fn(session, message, uid)
}

//func on_C2GW_StartLuckyDraw(session network.IBaseNetSession, message interface{}, uid int64) {
//	//tmsg := message.(*msg.C2GW_StartLuckyDraw)
//	user := UserMgr().FindUser(uid)
//	if user == nil { 
//		log.Error("C2GW_StartLuckyDraw 玩家[%d]没有在Room中", uid)
//		return 
//	}
//	user.LuckyDraw()
//}

// 坐下
//func on_C2RS_ReqSitDown(session network.IBaseNetSession, message interface{}, u *RoomUser) {
//	tmsg := message.(*msg.C2RS_ReqSitDown)
//	roomid := u.RoomId()
//	room := RoomMgr().Find(roomid)
//	if room == nil {
//		log.Error("[房间] 玩家[%s %d] 请求坐下到无效的房间中 房间[%d]", u.Name(), u.Id(), roomid)
//		return
//	}
//
//	room.UserSitDown(u, tmsg.GetSeat())
//}

// 站起
//func on_C2RS_ReqStandUp(session network.IBaseNetSession, message interface{}, u *RoomUser) {
//	//tmsg := message.(*msg.C2RS_ReqStandUp)
//	roomid := u.RoomId()
//	room := RoomMgr().Find(roomid)
//	if room == nil {
//		log.Error("[房间] 玩家[%s %d] 请求坐下到无效的房间中 房间[%d]", u.Name(), u.Id(), roomid)
//		return
//	}
//
//	room.UserStandUp(u)
//}

func on_C2RS_ReqBrightInTime(session network.IBaseNetSession, message interface{}, uid int64) {
	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return 
	}
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.BrightCardInTime(u.Id())
}

func on_C2RS_ReqTimeAwardInfo(session network.IBaseNetSession, message interface{}, uid int64) {
	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return
	}
	tmsg := message.(*msg.C2RS_ReqTimeAwardInfo)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqTimeAwardInfo(u.Id(), tmsg)
}

func on_C2RS_ReqBuyInGame(session network.IBaseNetSession, message interface{}, uid int64) {
	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return
	}
	tmsg := message.(*msg.C2RS_ReqBuyInGame)
	log.Info("[房间] 玩家[%s %d] 买入游戏1", u.Name(), u.Id())
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.BuyInGame(u.Id(), tmsg)
	log.Info("[房间] 玩家[%s %d] 买入游戏", u.Name(), u.Id())
}

func on_C2RS_ReqFriendGetRoleInfo(session network.IBaseNetSession, message interface{}, uid int64) {
	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return
	}
	tmsg := message.(*msg.C2RS_ReqFriendGetRoleInfo)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqFriendGetRoleInfo(u.Id(), tmsg)
}

func on_C2RS_ReqNextRound(session network.IBaseNetSession, message interface{}, uid int64) {
	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return
	}
	tmsg := message.(*msg.C2RS_ReqNextRound)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqNextRound(u.Id(), tmsg)
}

func on_C2RS_ReqAction(session network.IBaseNetSession, message interface{}, uid int64) {
	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return
	}
	tmsg := message.(*msg.C2RS_ReqAction)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqAction(u.Id(), tmsg)
}

func on_C2RS_ReqBrightCard(session network.IBaseNetSession, message interface{}, uid int64) {
	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return
	}
	tmsg := message.(*msg.C2RS_ReqBrightCard)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqBrightCard(u.Id(), tmsg)
}

func on_C2RS_ReqAddCoin(session network.IBaseNetSession, message interface{}, uid int64) {
	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return
	}
	tmsg := message.(*msg.C2RS_ReqAddCoin)
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqAddCoin(u.Id(), tmsg)
}

func on_C2RS_ReqStandUp(session network.IBaseNetSession, message interface{}, uid int64) {
	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return
	}
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqStandUp(u.Id())
}

func on_C2RS_ReqTimeAwardGet(session network.IBaseNetSession, message interface{}, uid int64) {
	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return
	}
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqTimeAwardGet(u.Id())
}

func on_C2RS_ReqReviewInfo(session network.IBaseNetSession, message interface{}, uid int64) {
	u := UserMgr().FindUser(uid)
	if u == nil { 
		log.Error("[房间] 玩家[%d] 在RoomServer中不存在", uid)
		return
	}
	room := RoomMgr().FindTexas(u.RoomId())
	if room == nil {
		log.Error("[房间] 玩家[%s %d] 无效房间 房间[%d]", u.Name(), u.Id(), u.RoomId())
		return
	}
	room.ReqReviewInfo(u.Id())
}

func on_C2RS_ReqMTTList(session network.IBaseNetSession, message interface{}, uid int64) {
	ChampionMgr().ReqMTTList(session.Id(), uid)
}

func on_C2RS_ReqMTTJoin(session network.IBaseNetSession, message interface{}, uid int64) {
	tmsg := message.(*msg.C2RS_ReqMTTJoin)
	ChampionMgr().ReqMTTJoin(session.Id(), uid, tmsg)
}

func on_C2RS_ReqMTTQuit(session network.IBaseNetSession, message interface{}, uid int64) {
	tmsg := message.(*msg.C2RS_ReqMTTQuit)
	ChampionMgr().ReqMTTQuit(session.Id(), uid, tmsg)
}

func on_C2RS_ReqJoinedMTTList(session network.IBaseNetSession, message interface{}, uid int64) {
	tmsg := message.(*msg.C2RS_ReqJoinedMTTList)
	ChampionMgr().ReqJoinedMTTList(session.Id(), uid, tmsg)
}

func on_C2RS_ReqInsideRoomInfoList(session network.IBaseNetSession, message interface{}, uid int64) {
	ChampionMgr().ReqInsideRoomInfoList(session.Id(), uid)
}

func on_C2RS_ReqMTTRecordList(session network.IBaseNetSession, message interface{}, uid int64) {
	ChampionMgr().ReqMTTRecordList(session.Id(), uid)
}

func on_C2RS_ReqMTTRecentlyRankList(session network.IBaseNetSession, message interface{}, uid int64) {
	tmsg := message.(*msg.C2RS_ReqMTTRecentlyRankList)
	ChampionMgr().ReqMTTRecentlyRankList(session.Id(), uid, tmsg)
}

func on_C2RS_ReqMTTOutsInfo(session network.IBaseNetSession, message interface{}, uid int64) {
	tmsg := message.(*msg.C2RS_ReqMTTOutsInfo)
	ChampionMgr().ReqMTTOutsInfo(session.Id(), uid, tmsg)
}

func on_C2RS_ReqMTTRankInfo(session network.IBaseNetSession, message interface{}, uid int64) {
	tmsg := message.(*msg.C2RS_ReqMTTRankInfo)
	ChampionMgr().ReqMTTRankInfo(session.Id(), uid, tmsg)
}

func on_C2RS_ReqMTTRebuyOrAddon(session network.IBaseNetSession, message interface{}, uid int64) {
	tmsg := message.(*msg.C2RS_ReqMTTRebuyOrAddon)
	ChampionMgr().ReqMTTRebuyOrAddon(session.Id(), uid, tmsg)
}




