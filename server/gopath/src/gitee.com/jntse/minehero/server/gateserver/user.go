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
/// @brief 玩家房间简单数据
// --------------------------------------------------------------------------
type UserRoomData struct {
	roomid     	int64
	sid_room   	int
	kind       	int32
	tm_closing 	int64 	// 房间关闭超时
	creating   	bool
	seatpos		int32	// 座位号
}

func (this *UserRoomData) Reset() {
	this.roomid = 0
	this.sid_room = 0
	this.kind = 0
	this.tm_closing = 0
	this.creating = false
}

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
	signreward     int32
	signtime       int32
	addrlist       []*msg.UserAddress
	wechatopenid   string
	presentcount   int32
	presentrecord  int64
	invitationcode string
	luckydraw      []*msg.LuckyDrawItem
	luckydrawtotal int64
	totalrecharge  int32 // 总充值
}

// --------------------------------------------------------------------------
/// @brief 玩家
// --------------------------------------------------------------------------
type UserBaseData struct {
	DBUserData
	client          network.IBaseNetSession
	account         string
	verifykey       string
	online          bool
	tickers         UserTicker
	bag             UserBag   // 背包
	cleanup         bool                    // 清理标记
	tm_disconnect   int64
	tm_heartbeat    int64                   // 心跳时间
	tm_asynsave     int64                   // 异步存盘超时
	asynev          eventque.AsynEventQueue // 异步事件处理
}

type GateUser struct {
	UserBaseData
	task            UserTask
	cartflag		bool
	roomdata        UserRoomData            // 房间信息
	token           string                  // token
	broadcastbuffer []int64                // 广播消息缓存
	synbalance      bool                    // 充值中
	events			UserMapEvent			// 地图事件
}

func NewGateUser(account, key, token string) *GateUser {
	u := &GateUser{}
	u.account = account
	u.verifykey = key
	u.bag.Init(u)
	u.task.Init(u)
	u.events.Init(u)
	u.tickers.Init(u.OnTicker10ms, u.OnTicker100ms, u.OnTicker1s, u.OnTicker5s, u.OnTicker1m)
	u.cleanup = false
	u.tm_disconnect = 0
	u.continuelogin = 1
	u.tm_asynsave = 0
	u.token = token
	u.broadcastbuffer = make([]int64, 0)
	u.roomdata.Reset()
	return u
}

func (this *GateUser) Account() string {
	return this.account
}

func (this *GateUser) EntityBase() *msg.EntityBase {
	return this.bin.GetEntity()
}

func (this *GateUser) UserBase() *msg.UserBase {
	return this.bin.GetBase()
}

func (this *GateUser) Name() string {
	return this.EntityBase().GetName()
}

func (this *GateUser) SetName(nickname string) bool {
	if nickname == "" {
		this.SendNotify("昵称不能为空")
		return false
	}

	if strings.Count(nickname, "")-1 > 8 {
		this.SendNotify("昵称长度不能大于8个字符")
		return false
	}

	if issp, _ := util.ContainsSpecialCharacter(nickname); issp == true {
		this.SendNotify("昵称不能含有标点和特殊字符")
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
		this.SendNotify("昵称重复")
		return false
	}
	//新名字加入集合
	_, erradd := Redis().SAdd(keynickname, nickname).Result()
	if erradd != nil{
		log.Error("改名保存全局新昵称 Redis错误:%s", erradd)
		return false	
	}
	
	//原名从集合中移除
	_, errrem := Redis().SRem(keynickname, this.Name()).Result()
	if errrem != nil {
		log.Error("改名移除玩家原来名字失败 oldname:%s , err: %s", this.Name(), errrem) 
	}

	this.EntityBase().Name = pb.String(nickname)
	log.Info("玩家[%d] 设置昵称[%s] 成功", this.Id(),nickname)
	return true
}

func (this *GateUser) Face() string {
	return this.EntityBase().GetFace()
}

func (this *GateUser) SetFace(f string, bsync bool)  {
	log.Info("玩家[%d] 设置头像 [%s]",this.Id(), f)
	this.EntityBase().Face = pb.String(f)
}

func (this *GateUser) Id() int64 {
	return this.EntityBase().GetId()
}

func (this *GateUser) Sex() int32 {
	return this.EntityBase().GetSex()
}

func (this *GateUser) SetSex(sex int32) {
	log.Info("玩家[%d] 设置性别 [%d]",this.Id(), sex)
	this.EntityBase().Sex = pb.Int32(sex)
}

func (this *GateUser) Sid() int {
	if this.client != nil {
		return this.client.Id()
	}
	return 0
}

func (this *GateUser) Level() int32 {
	return this.level
}

func (this *GateUser) AddLevel(num int32) {
	this.level += num
}

func (this *GateUser) Exp() int32 {
	return this.exp
}

func (this *GateUser) SetExp(exp int32) {
	this.exp = exp
}

func (this *GateUser) Token() string {
	return this.token
}

func (this *GateUser) SetToken(t string) {
	this.token = t
}

func (this *GateUser) GetDiamondCost() int64 {
	userbase := this.UserBase()
	return userbase.GetScounter().GetMoneyCost()
}

func (this *GateUser) GetDiamondCostReset() int64 {
	userbase := this.UserBase()
	return userbase.GetScounter().GetMoneyCostReset()
}

func (this *GateUser) SetDiamondCost(cost int64) {
	userbase := this.UserBase()
	userbase.GetScounter().MoneyCost = pb.Int64(cost)
}

func (this *GateUser) SetDiamondCostReset(reset int64) {
	userbase := this.UserBase()
	userbase.GetScounter().MoneyCostReset = pb.Int64(reset)
}

func (this *GateUser) GetDefaultAddress() *msg.UserAddress {
	if this.GetAddressSize() != 0 {
		return this.addrlist[0]
	}
	return nil
}

func (this *GateUser) SetDefaultAddress(index int32) {
	//this.address = addr
}

func (this *GateUser) AddAddress(receiver, phone, address string) {
	addr := &msg.UserAddress{Receiver: pb.String(receiver), Phone: pb.String(phone), Address: pb.String(address)}
	this.addrlist = append(this.addrlist, addr)
}

func (this *GateUser) ClearAddress() {
	this.addrlist = make([]*msg.UserAddress, 0)
}

func (this *GateUser) GetAddressSize() int32 {
	return int32(len(this.addrlist))
}

func (this *GateUser) SendAddress() {
	send := &msg.GW2C_SendDeliveryAddressList{List: make([]*msg.UserAddress, 0)}
	for _, v := range this.addrlist {
		send.List = append(send.List, v)
	}
	this.SendMsg(send)
}

func (this *GateUser) Verifykey() string {
	return this.verifykey
}

func (this *GateUser) IsOnline() bool {
	return this.online
}

func (this *GateUser) GameKind() int32 {
	return this.roomdata.kind
}

// 房间id
func (this *GateUser) RoomId() int64 {
	return this.roomdata.roomid
}

// 房间服务器 sid
func (this *GateUser) RoomSid() int {
	return this.roomdata.sid_room
}

// 是否有房间
func (this *GateUser) IsInRoom() bool {
	if this.RoomId() != 0 {
		return true
	}
	return false
}

// 正在创建房间
func (this *GateUser) IsRoomCreating() bool {
	return this.roomdata.creating
}

// 房间关闭中
func (this *GateUser) IsRoomClosing() bool {
	return this.roomdata.tm_closing != 0
}

// 关闭超时, 10秒
func (this *GateUser) IsRoomCloseTimeOut() bool {
	return util.CURTIMEMS() > (this.roomdata.tm_closing + 10000)
}

func (this *GateUser) SetOpenId(id string) {
	this.wechatopenid = id
}

func (this *GateUser) OpenId() string {
	return this.wechatopenid
}

// 自己邀请码
func (this *GateUser) MyInvitationCode() string {
	return fmt.Sprintf("TJ%d", this.Id())
}

// 邀请人邀请码
func (this *GateUser) InvitationCode() string {
	return this.invitationcode
}

// 邀请人
func (this *GateUser) Inviter() int64 {
	if code := this.InvitationCode(); len(code) > 2 {
		inviter, _ := strconv.ParseInt(code[2:], 10, 64)
		return inviter
	}
	return 0
}

func (this *GateUser) TotalRecharge() int32 {
	return this.totalrecharge
}

func (this *GateUser) SetTotalRecharge(r int32) {
	this.totalrecharge = r
}

func (this *GateUser) IsCleanUp() bool {
	return this.cleanup
}

func (this *GateUser) SendMsg(msg pb.Message) {
	if this.online == false {
		log.Info("账户[%s] [%d %s] 不在线", this.Account(), this.Id(), this.Name())
		return
	}
	this.client.SendCmd(msg)
}

// 广播缓存
func (this *GateUser) AddBroadCastMsg(uuid int64) {
	this.broadcastbuffer = append(this.broadcastbuffer, uuid)
}

// 玩家全部数据
func (this *GateUser) SendUserBase() {
	send := &msg.GW2C_SendUserInfo{}
	entity, base, item := this.bin.GetEntity(), this.bin.GetBase(), this.bin.GetItem()
	// clone类似c++的copyfrom
	send.Entity = pb.Clone(entity).(*msg.EntityBase)
	send.Base = pb.Clone(base).(*msg.UserBase)
	send.Item = pb.Clone(item).(*msg.ItemBin)
	this.SendMsg(send)
}

func (this *GateUser) IsLoadDB() bool {
	return this.bin != nil
}

func (this *GateUser) LoadDB() bool {
	key, info := fmt.Sprintf("accounts_%s", this.account), &msg.AccountInfo{}
	if err := utredis.GetProtoBin(Redis(), key, info); err != nil {
		log.Error("账户%s 获取账户数据失败，err: %s", this.account, err)
		return false
	}

	// 获取游戏数据
	this.bin = new(msg.Serialize)
	userkey := fmt.Sprintf("userbin_%d", info.GetUserid())
	if err := utredis.GetProtoBin(Redis(), userkey, this.bin); err != nil {
		log.Error("账户%s 获取玩家数据失败，err: %s", this.account, err)
		return false
	}

	this.OnLoadDB("登陆")
	return true
}

func (this *GateUser) OnLoadDB(way string) {
	log.Info("玩家数据: ==========")
	log.Info("账户%s 加载DB数据成功 方式[%s]", this.account, way)
	log.Info("%v", this.bin)
	log.Info("玩家数据: ==========")

	// 没有名字取个名字
	entity := this.bin.GetEntity()
	if entity == nil {
		this.bin.Entity = &msg.EntityBase{}
	}
	if entity.GetName() == "" {
		entity.Name = pb.String(fmt.Sprintf("%d_name", this.Id()))
	}

	// proto对象变量初始化
	if this.bin.Base == nil {
		this.bin.Base = &msg.UserBase{}
	}
	if this.bin.Base.Wechat == nil {
		this.bin.Base.Wechat = &msg.UserWechat{}
	}
	if this.bin.Item == nil {
		this.bin.Item = &msg.ItemBin{}
	}
	if this.bin.Base.Addrlist == nil {
		this.bin.Base.Addrlist = make([]*msg.UserAddress, 0)
	}
	if this.bin.Base.Task == nil {
		this.bin.Base.Task = &msg.UserTask{}
	}
	if this.bin.Base.Luckydraw == nil {
		this.bin.Base.Luckydraw = &msg.LuckyDrawRecord{Drawlist: make([]*msg.LuckyDrawItem, 0)}
	}
	//if this.bin.Base.Images == nil {
	//	this.bin.Base.Images = &msg.PersonalImage{Lists: make([]*msg.ImageData, 0)}
	//}

	// 加载二进制
	this.LoadBin()

	// 新用户回调
	if this.tm_login == 0 {
		this.OnCreateNew()
	}
}

// 打包数据到二进制结构
func (this *GateUser) PackBin() *msg.Serialize {
	bin := &msg.Serialize{}

	// 基础信息
	bin.Entity = pb.Clone(this.bin.GetEntity()).(*msg.EntityBase)

	// 玩家信息
	bin.Base = pb.Clone(this.bin.GetBase()).(*msg.UserBase)
	//bin.Base = &msg.UserBase{}
	//bin.Base.Scounter = &msg.SimpleCounter{}
	//bin.Base.Wechat = &msg.UserWechat{}
	//bin.Base.Addrlist = make([]*msg.UserAddress,0)

	userbase := bin.GetBase()
	userbase.Tmlogin = pb.Int64(this.tm_login)
	userbase.Tmlogout = pb.Int64(this.tm_logout)
	userbase.Gold = pb.Int32(this.gold)
	userbase.Diamond = pb.Int32(this.diamond)
	userbase.Yuanbao = pb.Int32(this.yuanbao)
	userbase.Level = pb.Int32(this.level)
	userbase.Exp = pb.Int32(this.exp)
	userbase.Continuelogin = pb.Int32(this.continuelogin)
	userbase.Nocountlogin = pb.Int32(this.nocountlogin)
	userbase.Signreward = pb.Int32(this.signreward)
	userbase.Signtime = pb.Int32(this.signtime)
	userbase.Addrlist = this.addrlist[:]
	userbase.Wechat.Openid = pb.String(this.wechatopenid)
	userbase.Invitationcode = pb.String(this.invitationcode)
	userbase.TotalRecharge = pb.Int32(this.totalrecharge)
	// 幸运抽奖
	userbase.Luckydraw.Drawlist = make([]*msg.LuckyDrawItem, 0)
	userbase.Luckydraw.Totalvalue = pb.Int64(this.luckydrawtotal)
	for _, v := range this.luckydraw {
		userbase.Luckydraw.Drawlist = append(userbase.Luckydraw.Drawlist, v)
	}

	// 道具信息
	this.bag.PackBin(bin)
	this.task.PackBin(bin)
	this.events.PackBin(bin)
	//this.image.PackBin(bin)

	//
	return bin
}

// 将二进制解析出来
func (this *GateUser) LoadBin() {

	// 基础信息

	// 玩家信息
	userbase := this.bin.GetBase()
	this.tm_login = userbase.GetTmlogin()
	this.tm_logout = userbase.GetTmlogout()
	this.gold = userbase.GetGold()
	this.diamond = userbase.GetDiamond()
	this.yuanbao = userbase.GetYuanbao()
	this.level = userbase.GetLevel()
	this.exp = userbase.GetExp()
	this.continuelogin = userbase.GetContinuelogin()
	this.nocountlogin = userbase.GetNocountlogin()
	this.signreward = userbase.GetSignreward()
	this.signtime = userbase.GetSigntime()
	this.addrlist = userbase.GetAddrlist()[:]
	this.wechatopenid = userbase.GetWechat().GetOpenid()
	this.invitationcode = userbase.GetInvitationcode()
	this.totalrecharge = userbase.GetTotalRecharge()
	// 幸运抽奖
	this.luckydraw = make([]*msg.LuckyDrawItem, 0)
	this.luckydrawtotal = userbase.Luckydraw.GetTotalvalue()
	for _, v := range userbase.Luckydraw.Drawlist {
		this.luckydraw = append(this.luckydraw, v)
	}

	// 道具信息
	this.bag.Clean()
	this.bag.LoadBin(this.bin)

	// 任务
	this.task.LoadBin(this.bin)

	// 事件
	this.events.LoadBin(this.bin)

	// 换装信息
	//this.image.Clean()
	//this.image.LoadBin(this.bin)
}

// TODO: 存盘可以单独协程
func (this *GateUser) Save() {
	key := fmt.Sprintf("userbin_%d", this.Id())
	if err := utredis.SetProtoBin(Redis(), key, this.PackBin()); err != nil {
		log.Error("保存玩家[%s %d]数据失败", this.Name(), this.Id())
		return
	}
	log.Info("保存玩家[%s %d]数据成功", this.Name(), this.Id())
}

// 异步存盘
func (this *GateUser) AsynSave() {
	log.Info("玩家[%s %d] 发起异步存盘", this.Name(), this.Id())
	event := NewUserSaveEvent(this.Save, this.AsynSaveFeedback)
	this.AsynEventInsert(event)
}

// 异步存盘完成回调
func (this *GateUser) AsynSaveFeedback() {
	log.Info("玩家[%s %d] 异步存盘完成", this.Name(), this.Id())
}

// 新用户回调
func (this *GateUser) OnCreateNew() {
}

// 上线回调，玩家数据在LoginOk中发送
func (this *GateUser) Online(session network.IBaseNetSession, way string) bool {

	if this.online == true {
		log.Error("Sid[%d] 账户[%s] 玩家[%d %s] Online失败，已经处于在线状态", this.Sid(), this.account, this.Id(), this.Name())
		return false
	}

	curtime := util.CURTIME()
	this.tickers.Start()
	this.asynev.Start(int64(this.Id()), 100)
	this.LoginStatistics()
	this.online = true
	this.client = session
	this.tm_login = curtime
	this.tm_disconnect = 0
	this.tm_heartbeat = util.CURTIMEMS()
	this.roomdata.Reset()
	log.Info("Sid[%d] 账户[%s] 玩家[%d] 名字[%s] 登录成功[%s]", this.Sid(), this.account, this.Id(), this.Name(), way)

	// 上线任务检查
	this.OnlineTaskCheck()
	this.events.Online()

	// 同步数据到客户端
	this.Syn()
	// 同步midas平台充值金额
	//this.SynMidasBalance()
	return true
}

func (this *GateUser) Syn() {
	this.SendUserBase()
	this.SendSign()
	this.CheckHaveCompensation()
	//this.QueryPlatformCoins()
	//this.TestItem()
}

func (this *GateUser) TestItem (){
	for k, _ := range tbl.ItemBase.ItemBaseDataById {
		this.AddItem(k, 100, "测试", true)
	}
}


// 断开连接回调
func (this *GateUser) OnDisconnect() {
	log.Info("sid[%d] 账户%s 玩家[%s %d] 断开连接", this.Sid(), this.account, this.Name(), this.Id())
	if this.online == false {
		return
	}
	this.online = false
	this.client = nil
	this.tm_disconnect = util.CURTIMEMS()
	if this.IsInRoom() == true {
		this.SendRsUserDisconnect()
	}
	this.AsynSave()
	//this.PlatformPushUserOnlineTime()
}

// 服务器下线玩家
func (this *GateUser) KickOut(way string) {
	log.Info("sid[%d] 账户[%s] [%d %s] KickOut 原因[%s]", this.Sid(), this.account, this.Id(), this.Name(), way)
	if this.online == false {
		return
	}
	this.online = false
	this.client.Close()
	this.client = nil
	this.tm_disconnect = util.CURTIMEMS()
	if this.IsInRoom() == true {
		this.SendRsUserDisconnect()
	}
	this.AsynSave()
	//this.PlatformPushUserOnlineTime()
}

// 检查下线存盘
func (this *GateUser) CheckDisconnectTimeOut(now int64) {
	if this.tm_disconnect == 0 {
		return
	}

	// 延迟清理离线玩家
	if !GateSvr().IsGracefulQuit() && (now < this.tm_disconnect+tbl.Global.Disconclean) {
		return
	}

	// 等待房间关闭
	if this.IsInRoom() && !this.IsRoomCloseTimeOut() {
		return
	}

	// 异步事件未处理完
	if this.asynev.EventSize() != 0 || this.asynev.FeedBackSize() != 0 {
		return
	}

	// 异步存盘，最大延迟1秒

	this.Logout()
}

// 真下线(存盘，从Gate清理玩家数据)
func (this *GateUser) Logout() {
	this.online = false
	this.tm_logout = util.CURTIME()
	this.cleanup = true
	this.Save()
	UnBindingAccountGateWay(this.account)
	this.asynev.Shutdown()

	//下线通知MatchServer
	//this.OnDisconnectMatchServer()
	log.Info("账户%s 玩家[%s %d] 存盘下线", this.account, this.Name(), this.Id())
}

// logout完成，做最后清理
func (this *GateUser) OnCleanUp() {
	this.tickers.Stop()
}

// 发送个人通知
func (this *GateUser) SendNotify(text string) {
	send := &msg.GW2C_MsgNotify{Text: pb.String(text)}
	this.SendMsg(send)
}

// 发送房间消息
func (this *GateUser) SendRoomMsg(msg pb.Message) {
	if this.IsInRoom() == false {
		log.Error("玩家[%s %d]没有房间信息", this.Name(), this.Id())
		return
	}
	RoomSvrMgr().SendMsg(this.roomdata.sid_room, msg)
}

// 回复客户端
func (this *GateUser) ReplyCreateRoom(err string, roomid int64) {
	send := &msg.GW2C_RetCreateRoom{Errcode: pb.String(err), Roomid: pb.Int64(roomid)}
	this.SendMsg(send)
	if err != "" {
		log.Info("玩家[%s %d] 开始游戏失败: roomid=%d errcode=%s", this.Name(), this.Id(), roomid, err)
	}
}

// 向match请求创建房间
func (this *GateUser) CreateRoomRemote(tmsg *msg.C2GW_ReqCreateRoom) (errcode string) {

	gamekind := tmsg.GetGamekind()
	if Match() == nil {
		log.Error("玩家[%s %d] 匹配服务器未连接", this.Name(), this.Id())
		errcode = "创建房间服务器不可用"
		return
	}

	//
	if RoomSvrMgr().Num() == 0 {
		log.Error("玩家[%s %d] 请求开房间，但是没有房间服务器", this.Name(), this.Id())
		errcode = "房间服务器不可用"
		return
	}

	// 创建中
	if this.IsRoomCreating() {
		log.Error("玩家[%s %d] 重复创建房间，正在创建房间中", this.Name(), this.Id())
		errcode = "正在创建房间中"
		return
	}

	// 有房间
	if this.IsInRoom() {
		log.Error("玩家[%s %d] 重复创建房间，已经有一个房间[%d]", this.Name(), this.Id(), this.RoomId())
		errcode = "重复创建房间"
		return
	}

	// 请求创建房间
	this.roomdata.kind = gamekind
	this.roomdata.creating = true

	//
	send := &msg.GW2MS_ReqCreateRoom{
		Userid:   pb.Int64(this.Id()),
		Gamekind: pb.Int32(gamekind),
		Texas: pb.Clone(tmsg.Texas).(*msg.TexasPersonalRoom),
	}
	Match().SendCmd(send)
	log.Info("玩家[%s %d] 请求创建房间类型:%d ts[%d]", this.Name(), this.Id(), gamekind, util.CURTIMEMS())
	return
}

// 开启游戏房间成功
func (this *GateUser) StartGameOk(servername string, roomid int64) {
	var agent *RoomAgent = RoomSvrMgr().FindByName(servername)
	if agent == nil {
		log.Error("玩家[%s %d] 开房间成功，但找不到RoomServer[%s]", this.Name(), this.Id(), servername)
		return
	}

	this.roomdata.roomid = roomid
	this.roomdata.sid_room = agent.Id()

	// TODO: 将个人信息上传到Room
	send := &msg.GW2RS_UploadUserBin{Roomid:pb.Int64(roomid), Bin:this.PackBin()}
	agent.SendMsg(send)

	log.Info("玩家[%s %d] 创建房间[%d]成功 向RS上传玩家个人数据 ts[%d]", this.Name(), this.Id(), roomid, util.CURTIMEMS())
}

// 开启游戏房间失败
func (this *GateUser) StartGameFail(err string) {
	this.roomdata.Reset()
}

// 房间关闭
func (this *GateUser) OnGameEnd(bin *msg.Serialize, reason string) {
	if this.IsOnline() { 
		this.SendMsg(&msg.BT_GameOver{Roomid:pb.Int64(this.RoomId())}) 
	}
	
	log.Info("玩家[%s %d] 房间关闭 房间[%d] 原因[%s]", this.Name(), this.Id(), this.RoomId(), reason)
	this.roomdata.Reset()

	// 加载玩家最新数据
	if bin != nil {
		this.bin = pb.Clone(bin).(*msg.Serialize)
		this.OnLoadDB("房间结束")
		if this.IsOnline() {
			this.SendUserBase()
		}
	}
}

// 通知RS 玩家已经断开连接了
func (this *GateUser) SendRsUserDisconnect() {
	if this.roomdata.tm_closing != 0 {
		return
	}
	this.roomdata.tm_closing = util.CURTIMEMS()
	msgclose := &msg.GW2RS_UserDisconnect{Roomid: pb.Int64(this.roomdata.roomid), Userid: pb.Int64(this.Id())}
	this.SendRoomMsg(msgclose)
	log.Info("玩家[%d %s] 通知RoomServer关闭房间", this.Id(), this.Name())
}

// 插入新异步事件
func (this *GateUser) AsynEventInsert(event eventque.IEvent) {
	this.asynev.Push(event)
}

// 上线任务检查
func (this *GateUser) OnlineTaskCheck() {
	// 自己注册任务
	if this.task.IsTaskFinish(int32(msg.TaskId_RegistAccount)) == false {
		this.task.TaskFinish(int32(msg.TaskId_RegistAccount))
	}

	// 被自己邀请人达成积分任务
	key_inviter := fmt.Sprintf("task_invitee_topscorefinish_%d", this.Id())
	sumfinish, _ := Redis().SCard(key_inviter).Result()
	if sumfinish != 0 && this.task.IsTaskFinish(int32(msg.TaskId_InviteeTopScore)) == false {
		this.task.TaskFinish(int32(msg.TaskId_InviteeTopScore))
	}

	// 邀请注册任务
	invite_count_key := fmt.Sprintf("user_%d_invite_regist_count", this.Id())
	invite_count, errget := Redis().Get(invite_count_key).Int64()
	if errget != nil && errget != redis.Nil {
		log.Error("玩家[%s %d] 上线获取邀请注册任务计数失败 redis err[%s]", this.Name(), this.Id(), errget)
	}
	if invite_count != 0 {
		this.task.SetTaskProgress(int32(msg.TaskId_InviteRegist), int32(invite_count))
	}

}


