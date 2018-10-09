package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/def"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	"strconv"
	"strings"
	_ "time"
)

//const (
//	StayHall = 1		// 待在大厅
//	RoomCreating = 2	// 创建房间中
//	RoomCreateFail  = 3	// 失败
//	GamePlaying  = 4	// 游戏中
//	)

// --------------------------------------------------------------------------
/// @brief db数据管理
// --------------------------------------------------------------------------
type DBUserData struct {
	bin            *msg.Serialize // db二进制数据
	tm_login       int64
	tm_logout      int64
	gold           int32
	diamond        int32
	yuanbao        int32
	level          int32
	exp            int32
	continuelogin  int32
	nocountlogin   int32
	signdays       int32
	signtime       int32
	addrlist       []*msg.UserAddress
	wechatopenid   string
	presentcount   int32
	presentrecord  int64
	invitationcode string
	luckydraw      []*msg.LuckyDrawItem
	luckydrawtotal int64
	totalrecharge  int32 // 总充值
	lastgoldtime   int32 // 上次领取系统金币的时间
}

// --------------------------------------------------------------------------
/// @brief 玩家
// --------------------------------------------------------------------------
type UserBaseData struct {
	DBUserData
	client        network.IBaseNetSession
	account       string
	verifykey     string
	online        bool
	tickers       UserTicker
	bag           UserBag // 背包
	cleanup       bool    // 清理标记
	tm_disconnect int64
	tm_heartbeat  int64                   // 心跳时间
	tm_asynsave   int64                   // 异步存盘超时
	asynev        eventque.AsynEventQueue // 异步事件处理
}

type GateUser struct {
	UserBaseData
	task            UserTask
	cartflag        bool
	roomdata        UserRoomData // 房间信息
	token           string       // token
	broadcastbuffer []int64      // 广播消息缓存
	synbalance      bool         // 充值中
	events          UserMapEvent // 地图事件
	mailbox         MailBox      // 邮箱
	friends			Friends		 // 好友
	arvalues        def.AutoResetValues
}

func NewGateUser(account, key, token string) *GateUser {
	u := &GateUser{}
	u.account = account
	u.verifykey = key
	u.bag.Init(u)
	u.task.Init(u)
	u.events.Init(u)
	u.mailbox.Init(u)
	u.friends.Init(u)
	u.arvalues.Init()
	u.tickers.Init()
	u.cleanup = false
	u.tm_disconnect = 0
	u.continuelogin = 1
	u.tm_asynsave = 0
	u.token = token
	u.broadcastbuffer = make([]int64, 0)
	return u
}

func (u *GateUser) Account() string {
	return u.account
}

func (u *GateUser) EntityBase() *msg.EntityBase {
	return u.bin.GetEntity()
}

func (u *GateUser) UserBase() *msg.UserBase {
	return u.bin.GetBase()
}

func (u *GateUser) Name() string {
	return u.EntityBase().GetName()
}

func (u *GateUser) SetName(nickname string) bool {
	if nickname == "" {
		u.SendNotify("昵称不能为空")
		return false
	}

	if strings.Count(nickname, "")-1 > 8 {
		u.SendNotify("昵称长度不能大于8个字符")
		return false
	}

	if issp, _ := util.ContainsSpecialCharacter(nickname); issp == true {
		u.SendNotify("昵称不能含有标点和特殊字符")
		return false
	}

	// 昵称是否重复
	keynickname := fmt.Sprintf("accounts_nickname")
	keyvalue, err := Redis().SIsMember(keynickname, nickname).Result()
	if err != nil && err != redis.Nil {
		//errcode = "redis暂时不可用"
		log.Error("检查昵称是否重复 Redis错误:%s", err)
		return false
	}
	if keyvalue == true {
		//errcode = "昵称重复"
		u.SendNotify("昵称重复")
		return false
	}
	//新名字加入集合
	_, erradd := Redis().SAdd(keynickname, nickname).Result()
	if erradd != nil {
		log.Error("改名保存全局新昵称 Redis错误:%s", erradd)
		return false
	}

	//原名从集合中移除
	_, errrem := Redis().SRem(keynickname, u.Name()).Result()
	if errrem != nil {
		log.Error("改名移除玩家原来名字失败 oldname:%s , err: %s", u.Name(), errrem)
	}

	u.EntityBase().Name = pb.String(nickname)
	log.Info("玩家[%d] 设置昵称[%s] 成功", u.Id(), nickname)
	return true
}

func (u *GateUser) Head() string {
	return u.EntityBase().GetHead()
}

func (u *GateUser) SetHead(f string, bsync bool) {
	log.Info("玩家[%d] 设置头像 [%s]", u.Id(), f)
	u.EntityBase().Head = pb.String(f)
}

func (u *GateUser) Id() int64 {
	return u.EntityBase().GetRoleid()
}

func (u *GateUser) Sex() int32 {
	return u.EntityBase().GetSex()
}

func (u *GateUser) SetSex(sex int32) {
	log.Info("玩家[%d] 设置性别 [%d]", u.Id(), sex)
	u.EntityBase().Sex = pb.Int32(sex)
}

func (u *GateUser) Sid() int {
	if u.client != nil {
		return u.client.Id()
	}
	return 0
}

func (u *GateUser) Level() int32 {
	return u.level
}

func (u *GateUser) AddLevel(num int32) {
	u.level += num
}

func (u *GateUser) Exp() int32 {
	return u.exp
}

func (u *GateUser) SetExp(exp int32) {
	u.exp = exp
}

func (u *GateUser) Token() string {
	return u.token
}

func (u *GateUser) SetToken(t string) {
	u.token = t
}

func (u *GateUser) GetDiamondCost() int64 {
	userbase := u.UserBase()
	return userbase.GetScounter().GetMoneyCost()
}

func (u *GateUser) GetDiamondCostReset() int64 {
	userbase := u.UserBase()
	return userbase.GetScounter().GetMoneyCostReset()
}

func (u *GateUser) SetDiamondCost(cost int64) {
	userbase := u.UserBase()
	userbase.GetScounter().MoneyCost = pb.Int64(cost)
}

func (u *GateUser) SetDiamondCostReset(reset int64) {
	userbase := u.UserBase()
	userbase.GetScounter().MoneyCostReset = pb.Int64(reset)
}

func (u *GateUser) GetDefaultAddress() *msg.UserAddress {
	if u.GetAddressSize() != 0 {
		return u.addrlist[0]
	}
	return nil
}

func (u *GateUser) SetDefaultAddress(index int32) {
	//u.address = addr
}

func (u *GateUser) AddAddress(receiver, phone, address string) {
	addr := &msg.UserAddress{Receiver: pb.String(receiver), Phone: pb.String(phone), Address: pb.String(address)}
	u.addrlist = append(u.addrlist, addr)
}

func (u *GateUser) ClearAddress() {
	u.addrlist = make([]*msg.UserAddress, 0)
}

func (u *GateUser) GetAddressSize() int32 {
	return int32(len(u.addrlist))
}

func (u *GateUser) SendAddress() {
	send := &msg.GW2C_SendDeliveryAddressList{List: make([]*msg.UserAddress, 0)}
	for _, v := range u.addrlist {
		send.List = append(send.List, v)
	}
	u.SendMsg(send)
}

func (u *GateUser) Verifykey() string {
	return u.verifykey
}

func (u *GateUser) IsOnline() bool {
	return u.online
}

func (u *GateUser) SetOpenId(id string) {
	u.wechatopenid = id
}

func (u *GateUser) OpenId() string {
	return u.wechatopenid
}

// 自己邀请码
func (u *GateUser) MyInvitationCode() string {
	return fmt.Sprintf("TJ%d", u.Id())
}

// 邀请人邀请码
func (u *GateUser) InvitationCode() string {
	return u.invitationcode
}

// 邀请人
func (u *GateUser) Inviter() int64 {
	if code := u.InvitationCode(); len(code) > 2 {
		inviter, _ := strconv.ParseInt(code[2:], 10, 64)
		return inviter
	}
	return 0
}

func (u *GateUser) TotalRecharge() int32 {
	return u.totalrecharge
}

func (u *GateUser) SetTotalRecharge(r int32) {
	u.totalrecharge = r
}

func (u *GateUser) IsCleanUp() bool {
	return u.cleanup
}

func (u *GateUser) GetUserPos() (float32, float32) {
	return 0, 0
}

func (u *GateUser) SendMsg(msg pb.Message) {
	if u.online == false {
		log.Info("账户[%s] [%d %s] 不在线", u.Account(), u.Id(), u.Name())
		return
	}
	u.client.SendCmd(msg)
}

// 广播缓存
func (u *GateUser) AddBroadCastMsg(uuid int64) {
	u.broadcastbuffer = append(u.broadcastbuffer, uuid)
}

// 玩家全部数据
func (u *GateUser) SendUserBase() {
	send := &msg.GW2C_PushUserInfo{}
	entity, base, item := u.bin.GetEntity(), u.bin.GetBase(), u.bin.GetItem()
	// clone类似c++的copyfrom
	send.Entity = pb.Clone(entity).(*msg.EntityBase)
	send.Base = pb.Clone(base).(*msg.UserBase)
	send.Item = pb.Clone(item).(*msg.ItemBin)
	u.SendMsg(send)
}

func (u *GateUser) IsDBLoad() bool {
	return u.bin != nil
}

func (u *GateUser) DBLoad() bool {
	key, info := fmt.Sprintf("accounts_%s", u.account), &msg.AccountInfo{}
	if err := utredis.GetProtoBin(Redis(), key, info); err != nil {
		log.Error("账户%s 获取账户数据失败，err: %s", u.account, err)
		return false
	}

	// 获取游戏数据
	u.bin = new(msg.Serialize)
	userkey := fmt.Sprintf("userbin_%d", info.GetUserid())
	if err := utredis.GetProtoBin(Redis(), userkey, u.bin); err != nil {
		log.Error("账户%s 获取玩家数据失败，err: %s", u.account, err)
		return false
	}

	u.OnDBLoad("登陆")
	return true
}

func (u *GateUser) OnDBLoad(way string) {
	log.Info("玩家数据: ==========")
	log.Info("账户%s 加载DB数据成功 方式[%s]", u.account, way)
	log.Info("%v", u.bin)
	log.Info("玩家数据: ==========")

	// 没有名字取个名字
	entity := u.bin.GetEntity()
	if entity == nil {
		u.bin.Entity = &msg.EntityBase{}
	}
	if entity.GetName() == "" {
		entity.Name = pb.String(fmt.Sprintf("%d_name", u.Id()))
	}

	// proto对象变量初始化
	if u.bin.Base == nil { u.bin.Base = &msg.UserBase{} }
	if u.bin.Base.Misc == nil { u.bin.Base.Misc = &msg.UserMiscData{} }
	if u.bin.Base.Statics == nil { u.bin.Base.Statics = &msg.UserStatistics{} }
	if u.bin.Base.Sign == nil { u.bin.Base.Sign = &msg.UserSignIn{} }
	if u.bin.Base.Wechat == nil { u.bin.Base.Wechat = &msg.UserWechat{} }
	if u.bin.Item == nil { u.bin.Item = &msg.ItemBin{} }
	if u.bin.Base.Addrlist == nil { u.bin.Base.Addrlist = make([]*msg.UserAddress, 0) }
	if u.bin.Base.Task == nil { u.bin.Base.Task = &msg.UserTask{} }
	if u.bin.Base.Luckydraw == nil { u.bin.Base.Luckydraw = &msg.LuckyDrawRecord{Drawlist: make([]*msg.LuckyDrawItem, 0)} }
	if u.bin.Base.Arvalues == nil { u.bin.Base.Arvalues = &msg.AutoResetValues{Values: make([]*msg.AutoResetValue, 0)} }
	//if u.bin.Base.Images == nil { u.bin.Base.Images = &msg.PersonalImage{Lists: make([]*msg.ImageData, 0)} }

	// 加载二进制
	u.LoadBin()

	// 新用户回调
	if u.tm_login == 0 {
		u.OnCreateNew()
	}
}

// 打包数据到二进制结构
func (u *GateUser) PackBin() *msg.Serialize {
	bin := &msg.Serialize{}

	// 基础信息
	bin.Entity = pb.Clone(u.bin.GetEntity()).(*msg.EntityBase)

	// 玩家信息
	bin.Base = pb.Clone(u.bin.GetBase()).(*msg.UserBase)
	//bin.Base = &msg.UserBase{}
	//bin.Base.Scounter = &msg.SimpleCounter{}
	//bin.Base.Wechat = &msg.UserWechat{}
	//bin.Base.Addrlist = make([]*msg.UserAddress,0)

	entity := bin.Entity
	entity.Gold = pb.Int32(u.gold)
	entity.Diamond = pb.Int32(u.diamond)
	entity.Yuanbao = pb.Int32(u.yuanbao)
	entity.Level = pb.Int32(u.level)
	entity.Exp = pb.Int32(u.exp)

	userbase := bin.GetBase()
	userbase.Statics.Tmlogin = pb.Int64(u.tm_login)
	userbase.Statics.Tmlogout = pb.Int64(u.tm_logout)
	userbase.Statics.Continuelogin = pb.Int32(u.continuelogin)
	userbase.Statics.Nocountlogin = pb.Int32(u.nocountlogin)
	userbase.Statics.Totalrecharge = pb.Int32(u.totalrecharge)
	userbase.Sign.Signdays = pb.Int32(u.signdays)
	userbase.Sign.Signtime = pb.Int32(u.signtime)
	userbase.Misc.Invitationcode = pb.String(u.invitationcode)
	userbase.Misc.Lastgoldtime = pb.Int32(u.lastgoldtime)

	userbase.Addrlist = u.addrlist[:]
	userbase.Wechat.Openid = pb.String(u.wechatopenid)
	// 幸运抽奖
	userbase.Luckydraw.Drawlist = make([]*msg.LuckyDrawItem, 0)
	userbase.Luckydraw.Totalvalue = pb.Int64(u.luckydrawtotal)
	for _, v := range u.luckydraw {
		userbase.Luckydraw.Drawlist = append(userbase.Luckydraw.Drawlist, v)
	}

	// 道具信息
	u.bag.PackBin(bin)
	u.task.PackBin(bin)
	u.events.PackBin(bin)
	u.PackAutoResetValues(bin)
	//u.image.PackBin(bin)

	//
	return bin
}

// 将二进制解析出来
func (u *GateUser) LoadBin() {

	// 基础信息

	// 玩家信息
	userbase, entity := u.bin.GetBase(), u.bin.GetEntity()
	u.gold = entity.GetGold()
	u.diamond = entity.GetDiamond()
	u.yuanbao = entity.GetYuanbao()
	u.level = entity.GetLevel()
	u.exp = entity.GetExp()

	u.tm_login = userbase.Statics.GetTmlogin()
	u.tm_logout = userbase.Statics.GetTmlogout()
	u.continuelogin = userbase.Statics.GetContinuelogin()
	u.nocountlogin = userbase.Statics.GetNocountlogin()
	u.totalrecharge = userbase.Statics.GetTotalrecharge()

	u.signdays = userbase.Sign.GetSigndays()
	u.signtime = userbase.Sign.GetSigntime()
	u.invitationcode = userbase.Misc.GetInvitationcode()
	u.lastgoldtime = userbase.Misc.GetLastgoldtime()

	u.addrlist = userbase.GetAddrlist()[:]
	u.wechatopenid = userbase.GetWechat().GetOpenid()
	// 幸运抽奖
	u.luckydraw = make([]*msg.LuckyDrawItem, 0)
	u.luckydrawtotal = userbase.Luckydraw.GetTotalvalue()
	for _, v := range userbase.Luckydraw.Drawlist {
		u.luckydraw = append(u.luckydraw, v)
	}

	// 道具信息
	u.bag.Clean()
	u.bag.LoadBin(u.bin)

	// 任务
	u.task.LoadBin(u.bin)

	// 邮件
	u.mailbox.DBLoad()

	// 好友
	u.friends.DBLoad()

	// 自动重置变量
	u.arvalues.LoadBin(u.bin.Base.Arvalues)

	// 事件
	u.events.LoadBin(u.bin)

	// 换装信息
	//u.image.Clean()
	//u.image.LoadBin(u.bin)
}

// TODO: 存盘可以单独协程
func (u *GateUser) DBSave() {
	u.mailbox.DBSave()
	u.friends.DBSave()
	key := fmt.Sprintf("userbin_%d", u.Id())
	if err := utredis.SetProtoBin(Redis(), key, u.PackBin()); err != nil {
		log.Error("玩家[%s %d] 数据存盘失败", u.Name(), u.Id())
		return
	}
	log.Info("玩家[%s %d] 数据存盘成功", u.Name(), u.Id())
}

// 异步存盘
func (u *GateUser) AsynSave() {
	log.Info("玩家[%s %d] 发起异步存盘", u.Name(), u.Id())
	event := NewUserSaveEvent(u.DBSave, u.AsynSaveFeedback)
	u.AsynEventInsert(event)
}

// 异步存盘完成回调
func (u *GateUser) AsynSaveFeedback() {
	log.Info("玩家[%s %d] 完成异步存盘", u.Name(), u.Id())
}

// 新用户回调
func (u *GateUser) OnCreateNew() {
}

// 上线回调，玩家数据在LoginOk中发送
func (u *GateUser) Online(session network.IBaseNetSession, way string) bool {

	if u.online == true {
		log.Error("Sid[%d] 账户[%s] 玩家[%d %s] Online失败，已经处于在线状态", u.Sid(), u.account, u.Id(), u.Name())
		return false
	}

	curtime := util.CURTIME()
	u.RegistTicker()
	u.tickers.Start()
	u.asynev.Start(int64(u.Id()), 100)
	u.LoginStatistics()
	u.online = true
	u.client = session
	u.tm_login = curtime
	u.tm_disconnect = 0
	u.tm_heartbeat = util.CURTIMEMS()
	u.roomdata.Online(u)
	log.Info("Sid[%d] 账户[%s] 玩家[%d] 名字[%s] 登录成功[%s]", u.Sid(), u.account, u.Id(), u.Name(), way)

	// 上线任务检查
	u.OnlineTaskCheck()
	u.events.Online()

	// 同步数据到客户端
	u.Syn()
	// 同步midas平台充值金额
	//u.SynMidasBalance()
	return true
}

func (u *GateUser) Syn() {
	u.SendUserBase()
	u.SendSign()
	u.CheckHaveCompensation()
	//u.QueryPlatformCoins()
	//u.TestItem()
}

func (u *GateUser) TestItem() {
	for k, _ := range tbl.ItemBase.ItemBaseDataById {
		u.AddItem(k, 100, "测试", true)
	}
}

// 断开连接回调
func (u *GateUser) OnDisconnect() {
	log.Info("sid[%d] 账户%s 玩家[%s %d] 断开连接", u.Sid(), u.account, u.Name(), u.Id())
	if u.online == false {
		return
	}
	u.online = false
	u.client = nil
	u.tm_disconnect = util.CURTIMEMS()
	u.SendRsUserDisconnect()
	u.AsynSave()
	//u.PlatformPushUserOnlineTime()
}

// 服务器下线玩家
func (u *GateUser) KickOut(way string) {
	log.Info("sid[%d] 账户[%s] [%d %s] KickOut 原因[%s]", u.Sid(), u.account, u.Id(), u.Name(), way)
	if u.online == false {
		return
	}
	u.online = false
	u.client.Close()
	u.client = nil
	u.tm_disconnect = util.CURTIMEMS()
	u.SendRsUserDisconnect()
	u.AsynSave()
	//u.PlatformPushUserOnlineTime()
}

// 检查下线存盘
func (u *GateUser) CheckDisconnectTimeOut(now int64) {
	if u.tm_disconnect == 0 {
		return
	}

	// 延迟清理离线玩家
	if !GateSvr().IsGracefulQuit() && (now < u.tm_disconnect+tbl.Global.DisconClean) {
		return
	}

	//// 等待房间关闭
	//if u.IsInRoom() && !u.IsRoomCloseTimeOut() {
	//	return
	//}


	// 异步事件未处理完
	if u.asynev.EventSize() != 0 || u.asynev.FeedBackSize() != 0 {
		return
	}

	u.Logout()
}

// 真下线，清理玩家数据
func (u *GateUser) Logout() {
	u.online = false
	u.tm_logout = util.CURTIME()
	u.cleanup = true
	//u.DBSave()
	UnBindingAccountGateWay(u.account)
	u.asynev.Shutdown()

	//下线通知MatchServer
	//u.OnDisconnectMatchServer()
	log.Info("玩家[%s %d] 账户[%s] 清理下线", u.Name(), u.Id(), u.Account())
}

// logout完成，做最后清理
func (u *GateUser) OnCleanUp() {
	u.tickers.Stop()
}

// 发送个人通知
func (u *GateUser) SendNotify(text string) {
	send := &msg.GW2C_MsgNotify{Text: pb.String(text)}
	u.SendMsg(send)
}

// 插入新异步事件
func (u *GateUser) AsynEventInsert(event eventque.IEvent) {
	u.asynev.Push(event)
}

// 上线任务检查
func (u *GateUser) OnlineTaskCheck() {
	// 自己注册任务
	if u.task.IsTaskFinish(int32(msg.TaskId_RegistAccount)) == false {
		u.task.TaskFinish(int32(msg.TaskId_RegistAccount))
	}

	// 被自己邀请人达成积分任务
	key_inviter := fmt.Sprintf("task_invitee_topscorefinish_%d", u.Id())
	sumfinish, _ := Redis().SCard(key_inviter).Result()
	if sumfinish != 0 && u.task.IsTaskFinish(int32(msg.TaskId_InviteeTopScore)) == false {
		u.task.TaskFinish(int32(msg.TaskId_InviteeTopScore))
	}

	// 邀请注册任务
	invite_count_key := fmt.Sprintf("user_%d_invite_regist_count", u.Id())
	invite_count, errget := Redis().Get(invite_count_key).Int64()
	if errget != nil && errget != redis.Nil {
		log.Error("玩家[%s %d] 上线获取邀请注册任务计数失败 redis err[%s]", u.Name(), u.Id(), errget)
	}
	if invite_count != 0 {
		u.task.SetTaskProgress(int32(msg.TaskId_InviteRegist), int32(invite_count))
	}

}

func (u *GateUser) PackAutoResetValues(bin *msg.Serialize) {
	u.bin.Base.Arvalues = u.arvalues.PackBin()
}


