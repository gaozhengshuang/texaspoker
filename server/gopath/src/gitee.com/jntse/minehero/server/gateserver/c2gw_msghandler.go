package main

import (
	"encoding/json"
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
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
	user, ok := session.UserDefData().(*GateUser)
	if ok == false {
		log.Fatal("网络会话Sid[%d]中没有绑定User指针", session.Id())
		return nil
	}
	return user
}

type C2GWMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewC2GWMsgHandler() *C2GWMsgHandler {
	handler := &C2GWMsgHandler{}
	handler.Init()
	return handler
}

func (this *C2GWMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("C2GW_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqLogin{}, on_C2GW_ReqLogin)
	this.msgparser.RegistProtoMsg(msg.C2GW_HeartBeat{}, on_C2GW_HeartBeat)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqStartGame{}, on_C2GW_ReqStartGame)
	this.msgparser.RegistProtoMsg(msg.C2GW_BuyItem{}, on_C2GW_BuyItem)
	this.msgparser.RegistProtoMsg(msg.C2GW_Get7DayReward{}, on_C2GW_Get7DayReward)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqDeliveryGoods{}, on_C2GW_ReqDeliveryGoods)
	this.msgparser.RegistProtoMsg(msg.C2GW_UseBagItem{}, on_C2GW_UseBagItem)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqRechargeMoney{}, on_C2GW_ReqRechargeMoney)
	this.msgparser.RegistProtoMsg(msg.C2GW_SellBagItem{}, on_C2GW_SellBagItem)
	this.msgparser.RegistProtoMsg(msg.C2GW_PlatformRechargeDone{}, on_C2GW_PlatformRechargeDone)

	this.msgparser.RegistProtoMsg(msg.C2GW_SendWechatAuthCode{}, on_C2GW_SendWechatAuthCode)
	this.msgparser.RegistProtoMsg(msg.C2GW_StartLuckyDraw{}, on_C2GW_StartLuckyDraw)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqTaskList{}, on_C2GW_ReqTaskList)

	// 地图事件
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqEnterEvents{}, on_C2GW_ReqEnterEvents)
	this.msgparser.RegistProtoMsg(msg.C2GW_LeaveEvent{}, on_C2GW_LeaveEvent)

	// 收战场消息
	this.msgparser.RegistProtoMsg(msg.BT_ReqEnterRoom{}, on_BT_ReqEnterRoom)
	this.msgparser.RegistProtoMsg(msg.BT_ReqQuitGameRoom{}, on_BT_ReqQuitGameRoom)
	this.msgparser.RegistProtoMsg(msg.BT_ReqLaunchBullet{}, on_BT_ReqLaunchBullet)
	this.msgparser.RegistProtoMsg(msg.BT_StepOnBomb{}, on_BT_StepOnBomb)
	this.msgparser.RegistProtoMsg(msg.BT_BulletEarnMoney{}, on_BT_BulletEarnMoney)
	this.msgparser.RegistProtoMsg(msg.BT_UseUltimateSkil{}, on_BT_UseUltimateSkil)
	this.msgparser.RegistProtoMsg(msg.BT_ReqCrushSuperBrick{}, on_BT_ReqCrushSuperBrick)

	// 发
	this.msgparser.RegistSendProto(msg.GW2C_HeartBeat{})
	this.msgparser.RegistSendProto(msg.GW2C_MsgNotice{})
	this.msgparser.RegistSendProto(msg.GW2C_MsgNotify{})
	this.msgparser.RegistSendProto(msg.GW2C_RetLogin{})
	this.msgparser.RegistSendProto(msg.GW2C_SendUserInfo{})
	this.msgparser.RegistSendProto(msg.GW2C_RetStartGame{})
	this.msgparser.RegistSendProto(msg.GW2C_AddPackageItem{})
	this.msgparser.RegistSendProto(msg.GW2C_RemovePackageItem{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateYuanbao{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateDiamond{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateGold{})
	this.msgparser.RegistSendProto(msg.GW2C_Ret7DayReward{})
	this.msgparser.RegistSendProto(msg.Sync_BigRewardPickNum{})
	this.msgparser.RegistSendProto(msg.GW2C_RetRechargeMoney{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateFreeStep{})
	this.msgparser.RegistSendProto(msg.GW2C_SendUserPlatformMoney{})
	this.msgparser.RegistSendProto(msg.GW2C_SendLuckyDrawRecord{})
	this.msgparser.RegistSendProto(msg.GW2C_SendTaskList{})

	this.msgparser.RegistSendProto(msg.GW2C_SendWechatInfo{})
	this.msgparser.RegistSendProto(msg.GW2C_LuckyDrawHit{})
	this.msgparser.RegistSendProto(msg.GW2C_SendDeliveryAddressList{})
	this.msgparser.RegistSendProto(msg.GW2C_RetGoldExchange{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateItemPos{})

	// 地图事件
	this.msgparser.RegistSendProto(msg.GW2C_SendUserEvents{})
	this.msgparser.RegistSendProto(msg.GW2C_RemoveEvent{})
	this.msgparser.RegistSendProto(msg.GW2C_EnterGameEvent{})

	// Room
	this.msgparser.RegistSendProto(msg.BT_GameInit{})
	//this.msgparser.RegistSendProto(msg.BT_SendBattleUser{})
	this.msgparser.RegistSendProto(msg.BT_GameStart{})
	this.msgparser.RegistSendProto(msg.BT_GameOver{})
	this.msgparser.RegistSendProto(msg.BT_PickItem{})
	this.msgparser.RegistSendProto(msg.BT_RetLaunchBullet{})
	this.msgparser.RegistSendProto(msg.BT_RetStepOnBomb{})
	//this.msgparser.RegistSendProto(msg.BT_SynUserRechargeMoney{})
	this.msgparser.RegistSendProto(msg.BT_RetCrushSuperBrick{})
	this.msgparser.RegistSendProto(msg.BT_RetBulletEarnMoney{})
	this.msgparser.RegistSendProto(msg.BT_GameRoomDestroy{})
}

// 客户端心跳
func on_C2GW_HeartBeat(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_HeartBeat)
	//log.Info(reflect.TypeOf(tmsg).String())

	//account, ok := session.UserDefData().(string)
	//if ok == false {
	//	session.Close()
	//	return
	//}

	//user := UserMgr().FindByAccount(account)
	//if user == nil {
	//	log.Error("收到账户[%s]心跳，但玩家不在线", account)
	//	return
	//}

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.SetHeartBeat(util.CURTIMEMS())
	curtime := util.CURTIME()
	//log.Info("receive heart beat msg now=%d", curtime)
	user.SendMsg(&msg.GW2C_HeartBeat{
		Time: pb.Int64(curtime),
	})
}

func on_C2GW_Get7DayReward(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	user.GetSignReward()
}

func on_C2GW_ReqStartGame(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqStartGame)
	//log.Info(reflect.TypeOf(tmsg).String())
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	gamekind, eventuid := tmsg.GetGamekind(), tmsg.GetEventuid()
	errcode := user.ReqStartGameLocal(gamekind, eventuid)
	user.ReplyStartGame(errcode, 0)
}

func on_BT_ReqEnterRoom(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.BT_ReqEnterRoom)
	//log.Info(reflect.TypeOf(tmsg).String())
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if !user.IsInRoom() {
		user.SendNotify("房间不存在")
		return
	}

	// 进入游戏房间
	//log.Info("玩家[%d] 开始进入房间[%d] ts[%d]", user.Id(), user.RoomId(), util.CURTIMEMS())
	//tmsg.Roomid, tmsg.Userid = pb.Int64(user.RoomId()), pb.Uint64(user.Id())
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d ]找不到游戏房间[%d]", userid, roomid)
		return
	}
	room.UserEnter(userid, "")
}

func on_BT_ReqQuitGameRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_ReqQuitGameRoom)
	//log.Info(reflect.TypeOf(tmsg).String())

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 离开游戏房间
	//tmsg.Roomid, tmsg.Userid = pb.Int64(user.RoomId()), pb.Uint64(user.Id())
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("BT_ReqQuitGameRoom 游戏房间[%d]不存在 玩家[%d]", roomid, userid)
		return
	}
	room.UserLeave(userid, tmsg.GetGold())
}

func on_C2GW_ReqLogin(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqLogin)
	reason, account, verifykey, token, face := "", tmsg.GetAccount(), tmsg.GetVerifykey(), tmsg.GetToken(), tmsg.GetFace()
	islogin := false

	switch {
	default:
		if UserMgr().FindByAccount(account) != nil {
			islogin, reason = true, "玩家已经登陆了"
			log.Info("账户%s 登录Gate失败，已经登陆了", account)
			break
		}

		wAccount := WaitPool().Find(account)
		if wAccount == nil {
			reason = "非法登陆网关"
			//log.Info("账户%s 登录Gate失败，没有注册信息", account)
			break
		}

		if wAccount.verifykey != verifykey {
			reason = "登陆网关校验失败"
			log.Info("账户%s 登陆Gate校验Key不正确 want:%s have:%s", account, wAccount.verifykey, verifykey)
			break
		}

		// 构造新GateUser
		user, newerr := UserMgr().CreateNewUser(session, account, verifykey, token, face)
		if newerr != "" || user == nil {
			reason = newerr
			log.Info("账户%s 创建新GateUser失败 原因[%s]", account, newerr)
			break
		}

		session.SetUserDefData(user) // TODO: 登陆成功才绑定账户到会话
		return
	}

	// 返回给客户端，失败才回
	if reason != "" {
		if !islogin {
			UnBindingAccountGateWay(account)
		}
		log.Error("sid[%d] 账户[%s] 登陆网关失败 reason[%s]", session.Id(), account, reason)
		send := &msg.GW2C_RetLogin{Errcode: pb.String(reason)}
		session.SendCmd(send)
		session.Close()
	}
}

//func on_C2GW_ReqUserInfo(session network.IBaseNetSession, message interface{}) {
//	//tmsg := message.(*msg.C2GW_ReqUserInfo)
//	user := ExtractSessionUser(session)
//	if user == nil {
//		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
//		session.Close()
//		return
//	}
//
//	if user.IsOnline() == false {
//		log.Error("账户%s 没有登陆Gate成功", account)
//		session.Close()
//		return
//	}
//
//	user.Syn()
//}

// 购买道具
func on_C2GW_BuyItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_BuyItem)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if user.IsOnline() == false {
		log.Error("玩家[%s %d]没有登陆Gate成功", user.Name(), user.Id())
		session.Close()
		return
	}

	user.BuyItem(tmsg.GetProductid(), tmsg.GetNum())
}

func on_C2GW_ReqDeliveryGoods(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqDeliveryGoods)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if user.IsOnline() == false {
		log.Error("玩家[%s %d] 没有登陆Gate成功", user.Name(), user.Id())
		session.Close()
		return
	}

	// 发货
	if tbl.Global.IntranetFlag {
		user.SendNotify("本版本暂不可用")
		return
	} else {
		event := NewDeliveryGoodsEvent(tmsg.GetList(), tmsg.GetToken(), user.DeliveryGoods)
		user.AsynEventInsert(event)
	}
}

//func on_C2GW_ReqDeliveryDiamond(session network.IBaseNetSession, message interface{}) {
//	tmsg := message.(*msg.C2GW_ReqDeliveryDiamond)
//
//	user := ExtractSessionUser(session)
//	if user == nil {
//		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
//		session.Close()
//		return
//	}
//
//	if user.IsOnline() == false {
//		log.Error("玩家[%s %d]没有登陆Gate成功", user.Name(), user.Id())
//		session.Close()
//		return
//	}
//
//	// 提钻石
//	if tbl.Global.IntranetFlag {
//		user.SendNotify("本版本暂不可用")
//		return
//	}else {
//		event := NewDeliveryGoodsEvent(tmsg.GetList(), tmsg.GetToken(), user.DeliveryDiamond)
//		user.AsynEventInsert(event)
//	}
//}

func on_C2GW_UseBagItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_UseBagItem)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	user.UseItem(tmsg.GetItemid(), tmsg.GetNum())
}

func on_C2GW_ReqRechargeMoney(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqRechargeMoney)
	//log.Trace("%v", tmsg)

	//
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 充值
	event := NewUserRechargeEvent(user, user.Account(), tmsg.GetToken(), tmsg.GetAmount(), RequestRecharge)
	user.AsynEventInsert(event)
}

func on_C2GW_SellBagItem(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_SellBagItem)
	//user := ExtractSessionUser(session)
	//if user == nil {
	//	log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
	//	session.Close()
	//	return
	//}

	//for _, v := range tmsg.GetList() {
	//	itemid, num := v.GetItemid(), v.GetNum()
	//	user.SellBagItem(itemid, num)
	//}
}

// 玩家充值完成(大厅和房间都自己获取金币返回)
func on_C2GW_PlatformRechargeDone(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_PlatformRechargeDone)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 游戏中
	//if user.IsInRoom() {
	//	user.SendRoomMsg(tmsg)
	//	return
	//}
	//log.Error("玩家[%s %d]收到充值完成通知但玩家不在房间中", user.Name(), user.Id())
	//user.SynMidasBalance()
}

// 绑定微信openid
func on_C2GW_SendWechatAuthCode(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_SendWechatAuthCode)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	log.Info("玩家[%d] 获取access_token 微信授权code[%s]", user.Id(), tmsg.GetCode())

	//获取用户access_token 和 openid
	appid, secret, code := tbl.Global.Wechat.AppID, tbl.Global.Wechat.AppSecret, tmsg.GetCode()
	url := fmt.Sprintf("https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code",
		appid, secret, code)
	resp, errcode := network.HttpGet(url)
	if errcode != nil || resp == nil {
		log.Error("玩家[%d] 获取access_token失败 HttpGet失败[%s]", user.Id(), errcode)
		return
	}

	type RespFail struct {
		Errcode int64
		Errmsg  string
	}
	var respfail RespFail
	unerror := json.Unmarshal(resp.Body, &respfail)
	if unerror != nil {
		log.Info("玩家[%d] 获取access_token失败 json.Unmarshal Object Fail[%s] ", user.Id(), unerror)
		return
	}

	if respfail.Errcode != 0 && respfail.Errmsg != "" {
		log.Error("玩家[%d] 获取access_token失败， resp.errcode=%d resp.errmsg=%s", user.Id(), respfail.Errcode, respfail.Errmsg)
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
		log.Info("玩家[%d] 获取access_token失败 json.Unmarshal Object Fail[%s] ", user.Id(), unerror)
		return
	}
	log.Info("玩家[%d] 获取access_token成功, respok=%#v", user.Id(), respok)

	//
	if user.OpenId() == "" {
		if _, errset := Redis().Set(fmt.Sprintf("user_%d_wechat_openid", user.Id()), respok.Openid, 0).Result(); errset != nil {
			log.Info("玩家[%d] 设置wechat openid到redis失败", user.Id())
			return
		}
		user.SetOpenId(respok.Openid)
		send := &msg.GW2C_SendWechatInfo{Openid: pb.String(respok.Openid)}
		user.SendMsg(send)

		// 转账给新用户
		def.HttpWechatCompanyPay(respok.Openid, 1, "绑定微信奖励")

		// 完成任务
		log.Info("玩家[%d] 绑定wechat openid[%s]", user.Id(), respok.Openid)
	}
}

// 抽奖
func on_C2GW_StartLuckyDraw(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_StartLuckyDraw)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if user.IsInRoom() {
		//user.SendRoomMsg(tmsg)
		user.SendNotify("游戏中不能抽奖")
		return
	}

	user.LuckyDraw()
}

// --------------------------------------------------------------------------
/// @brief 前暂时只有一个收货地址，设置和修改都使用这个
/// @return
// --------------------------------------------------------------------------
func on_C2GW_ChangeDeliveryAddress(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ChangeDeliveryAddress)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	user.ClearAddress()
	Addr := tmsg.GetInfo()
	user.AddAddress(Addr.GetReceiver(), Addr.GetPhone(), Addr.GetAddress())
	user.SendAddress()
	user.SendNotify("设置成功")
	log.Info("玩家[%s %d] 修改收货地址，新地址[%s %s %s]", user.Name(), user.Id(), Addr.GetReceiver(), Addr.GetPhone(), Addr.GetAddress())
}

//func on_BT_UpdateMoney(session network.IBaseNetSession, message interface{}) {
//	tmsg := message.(*msg.BT_UpdateMoney)
//	user := ExtractSessionUser(session)
//	if user == nil {
//		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
//		session.Close()
//		return
//	}
//	user.SendRoomMsg(tmsg)
//}

func on_BT_ReqLaunchBullet(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.BT_ReqLaunchBullet)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d ]找不到游戏房间[%d]", userid, roomid)
		return
	}
	if tantan, ok := room.(*TanTanLe); ok == true {
		tantan.ReqLaunchBullet()
	}

}

func on_BT_StepOnBomb(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.BT_StepOnBomb)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d ]找不到游戏房间[%d]", userid, roomid)
		return
	}

	if tantan, ok := room.(*TanTanLe); ok == true {
		tantan.StepOnBomb()
	}
}

func on_BT_BulletEarnMoney(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_BulletEarnMoney)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d]子弹死亡同步，找不到游戏房间[%d]", userid, roomid)
		return
	}

	if tantan, ok := room.(*TanTanLe); ok == true {
		tantan.BulletEarnMoney(tmsg.GetGold())
	}
}

func on_BT_UseUltimateSkil(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_UseUltimateSkil)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d ]找不到游戏房间[%d]", userid, roomid)
		return
	}

	if tantan, ok := room.(*TanTanLe); ok == true {
		tantan.UseUltimateSkil(tmsg.GetGold())
	}
}

func on_BT_ReqCrushSuperBrick(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.BT_ReqCrushSuperBrick)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d ]找不到游戏房间[%d]", userid, roomid)
		return
	}

	if tantan, ok := room.(*TanTanLe); ok == true {
		tantan.CrushSuperBrick()
	}
}

func on_C2GW_GoldExchange(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_GoldExchange)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	//if user.IsInRoom() {
	//	user.SendRoomMsg(tmsg)
	//	return
	//}

	// 兑换
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

	send := &msg.GW2C_RetGoldExchange{Gold: pb.Uint32(gold)}
	user.SendMsg(send)

}

// 请求激活事件
func on_C2GW_ReqEnterEvents(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqEnterEvents)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.events.EnterEvent(tmsg.GetUid())
}

// 请求激活事件
func on_C2GW_LeaveEvent(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_LeaveEvent)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.events.LeaveEvent(tmsg.GetUid())
}

func on_C2GW_ReqTaskList(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_ReqTaskList)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	//if user.IsInRoom() {
	//	user.SendNotify("正在游戏中")
	//	return
	//}
	user.task.SendTaskList()
}
