package main

import (
	"encoding/json"
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
	mh.msgparser.RegistProtoMsg(msg.C2GW_BuyItem{}, on_C2GW_BuyItem)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqDeliveryGoods{}, on_C2GW_ReqDeliveryGoods)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqUseBagItem{}, on_C2GW_ReqUseBagItem)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqRechargeMoney{}, on_C2GW_ReqRechargeMoney)
	mh.msgparser.RegistProtoMsg(msg.C2GW_PlatformRechargeDone{}, on_C2GW_PlatformRechargeDone)

	mh.msgparser.RegistProtoMsg(msg.C2GW_SendWechatAuthCode{}, on_C2GW_SendWechatAuthCode)
	mh.msgparser.RegistProtoMsg(msg.C2GW_StartLuckyDraw{}, on_C2GW_StartLuckyDraw)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqTaskList{}, on_C2GW_ReqTaskList)

	// 地图事件
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqEnterEvents{}, on_C2GW_ReqEnterEvents)
	mh.msgparser.RegistProtoMsg(msg.C2GW_LeaveEvent{}, on_C2GW_LeaveEvent)

	// 游戏房间
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqCreateRoom{}, on_C2GW_ReqCreateRoom)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqEnterRoom{}, on_C2GW_ReqEnterRoom)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqLeaveRoom{}, on_C2GW_ReqLeaveRoom)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqUserRoomInfo{}, on_C2GW_ReqUserRoomInfo)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqTexasRoomList{}, on_C2GW_ReqTexasRoomList)

	// 邮件
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqMailList{}, on_C2GW_ReqMailList)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqTakeMailItem{}, on_C2GW_ReqTakeMailItem)

	//活动
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqActivityInfo{}, on_C2GW_ReqActivityInfo)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqGetActivityReward{}, on_C2GW_ReqGetActivityReward)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqRankList{}, on_C2GW_ReqRankList)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqGetFreeGold{}, on_C2GW_ReqGetFreeGold)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqAwardExchange{}, on_C2GW_ReqAwardExchange)
	mh.msgparser.RegistProtoMsg(msg.C2GW_ReqAwardRecord{}, on_C2GW_ReqAwardRecord)
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

	if u.IsInRoom() == false {
		log.Warn("消息转发失败，玩家[%s %d]没有在任何房间中", u.Name(), u.Id())
		return
	}
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

	// 重新进入房间，不需要上传玩家二进制数据
	if u.RoomId() != roomid {
		u.SendUserBinToRoom(sid, roomid)
	}

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

// 购买道具
func on_C2GW_BuyItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_BuyItem)

	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if u.IsOnline() == false {
		log.Error("玩家[%s %d]没有登陆Gate成功", u.Name(), u.Id())
		session.Close()
		return
	}

	u.BuyItem(tmsg.GetProductid(), tmsg.GetNum())
}

func on_C2GW_ReqDeliveryGoods(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqDeliveryGoods)

	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if u.IsOnline() == false {
		log.Error("玩家[%s %d] 没有登陆Gate成功", u.Name(), u.Id())
		session.Close()
		return
	}

	// 发货
	if tbl.Global.IntranetFlag {
		u.SendNotify("本版本暂不可用")
		return
	} else {
		event := NewDeliveryGoodsEvent(tmsg.GetList(), tmsg.GetToken(), u.DeliveryGoods)
		u.AsynEventInsert(event)
	}
}

func on_C2GW_ReqUseBagItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqUseBagItem)

	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	u.UseItem(tmsg.GetItemid(), tmsg.GetNum())
}

func on_C2GW_ReqRechargeMoney(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqRechargeMoney)
	//log.Trace("%v", tmsg)

	//
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 充值
	event := NewUserRechargeEvent(u, u.Account(), tmsg.GetToken(), tmsg.GetAmount(), RequestRecharge)
	u.AsynEventInsert(event)
}

// 玩家充值完成(大厅和房间都自己获取金币返回)
func on_C2GW_PlatformRechargeDone(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_PlatformRechargeDone)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 游戏中
	//if u.IsInRoom() {
	//	u.SendRoomMsg(tmsg)
	//	return
	//}
	//log.Error("玩家[%s %d]收到充值完成通知但玩家不在房间中", u.Name(), u.Id())
	//u.SynMidasBalance()
}

// 绑定微信openid
func on_C2GW_SendWechatAuthCode(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_SendWechatAuthCode)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	log.Info("玩家[%d] 获取access_token 微信授权code[%s]", u.Id(), tmsg.GetCode())

	//获取用户access_token 和 openid
	appid, secret, code := tbl.Wechat.AppID, tbl.Wechat.AppSecret, tmsg.GetCode()
	url := fmt.Sprintf("https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code",
		appid, secret, code)
	resp, errcode := network.HttpGet(url)
	if errcode != nil || resp == nil {
		log.Error("玩家[%d] 获取access_token失败 HttpGet失败[%s]", u.Id(), errcode)
		return
	}

	type RespFail struct {
		Errcode int64
		Errmsg  string
	}
	var respfail RespFail
	unerror := json.Unmarshal(resp.Body, &respfail)
	if unerror != nil {
		log.Info("玩家[%d] 获取access_token失败 json.Unmarshal Object Fail[%s] ", u.Id(), unerror)
		return
	}

	if respfail.Errcode != 0 && respfail.Errmsg != "" {
		log.Error("玩家[%d] 获取access_token失败， resp.errcode=%d resp.errmsg=%s", u.Id(), respfail.Errcode, respfail.Errmsg)
		return
	}

	type RespOk struct {
		Access_token  string
		Expires_in    float64
		Refresh_token string
		Openid        string
		Scope         string
		Unionid       string
	}
	var respok RespOk
	unerror = json.Unmarshal(resp.Body, &respok)
	if unerror != nil {
		log.Info("玩家[%d] 获取access_token失败 json.Unmarshal Object Fail[%s] ", u.Id(), unerror)
		return
	}
	log.Info("玩家[%d] 获取access_token成功, respok=%#v", u.Id(), respok)

	//
	if u.OpenId() == "" {
		if _, errset := Redis().Set(fmt.Sprintf("user_%d_wechat_openid", u.Id()), respok.Openid, 0).Result(); errset != nil {
			log.Info("玩家[%d] 设置wechat openid到redis失败", u.Id())
			return
		}
		u.SetOpenId(respok.Openid)
		send := &msg.GW2C_SendWechatInfo{Openid: pb.String(respok.Openid)}
		u.SendMsg(send)

		// 转账给新用户
		//def.HttpWechatCompanyPay(respok.Openid, 1, "绑定微信奖励")

		// 完成任务
		log.Info("玩家[%d] 绑定wechat openid[%s]", u.Id(), respok.Openid)
	}
}

// 抽奖
func on_C2GW_StartLuckyDraw(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_StartLuckyDraw)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if u.IsInRoom() {
		//u.SendRoomMsg(tmsg)
		u.SendNotify("游戏中不能抽奖")
		return
	}

	u.LuckyDraw()
}

// --------------------------------------------------------------------------
/// @brief 前暂时只有一个收货地址，设置和修改都使用这个
/// @return
// --------------------------------------------------------------------------
func on_C2GW_ChangeDeliveryAddress(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ChangeDeliveryAddress)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	u.ClearAddress()
	Addr := tmsg.GetInfo()
	u.AddAddress(Addr.GetReceiver(), Addr.GetPhone(), Addr.GetAddress())
	u.SendAddress()
	u.SendNotify("设置成功")
	log.Info("玩家[%s %d] 修改收货地址，新地址[%s %s %s]", u.Name(), u.Id(), Addr.GetReceiver(), Addr.GetPhone(), Addr.GetAddress())
}

func on_C2GW_GoldExchange(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_GoldExchange)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	//if u.IsInRoom() {
	//	u.SendRoomMsg(tmsg)
	//	return
	//}

	// 兑换
	diamonds := tmsg.GetDiamonds()
	if diamonds < 0 {
		u.SendNotify("钻石数量不能是0")
		return
	}

	if u.GetDiamond() < diamonds {
		u.SendNotify("钻石不足")
		return
	}

	gold := int32(tbl.Game.DiamondToCoins) * diamonds
	u.RemoveDiamond(diamonds, "钻石兑换金币", true)
	u.AddGold(gold, "钻石兑换金币", false)

	send := &msg.GW2C_RetGoldExchange{Gold: pb.Int32(gold)}
	u.SendMsg(send)

}

// 请求激活事件
func on_C2GW_ReqEnterEvents(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqEnterEvents)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.events.EnterEvent(tmsg.GetUid())
}

// 请求激活事件
func on_C2GW_LeaveEvent(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_LeaveEvent)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	u.events.LeaveEvent(tmsg.GetUid())
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

func on_C2GW_ReqTaskList(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_ReqTaskList)
	u := ExtractSessionUser(session)
	if u == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	//if u.IsInRoom() {
	//	u.SendNotify("正在游戏中")
	//	return
	//}
	u.task.SendTaskList()
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
