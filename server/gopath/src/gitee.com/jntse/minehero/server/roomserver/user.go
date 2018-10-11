package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	_ "gitee.com/jntse/minehero/server/tbl/excel"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	"strconv"
	_ "strings"
	"time"
)

// --------------------------------------------------------------------------
/// @brief 玩家信息
// --------------------------------------------------------------------------
type RoomUser struct {
	agentname      string
	agentid        int
	bin            *msg.Serialize
	bag            UserBag
	task           UserTask
	token          string
	ticker1s       *util.GameTicker
	ticker10ms     *util.GameTicker
	asynev         eventque.AsynEventQueue // 异步事件处理
	invitationcode string
	synbalance     bool
	bulletid       int64
	energy         int64
	save_amt       int64
	maxenergy      int64
	gamekind       int32
	roomid         int64 // 房间id
	isai           bool
	arvalues		def.AutoResetValues
}

func NewRoomUser(rid int64, b *msg.Serialize, gate network.IBaseNetSession, gamekind int32) *RoomUser {
	user := &RoomUser{roomid: rid, bin: b, agentid: gate.Id(), agentname: gate.Name(), gamekind: gamekind}
	user.ticker1s = util.NewGameTicker(1*time.Second, user.Handler1sTick)
	user.ticker10ms = util.NewGameTicker(10*time.Millisecond, user.Handler10msTick)
	user.ticker1s.Start()
	user.ticker10ms.Start()
	user.bag.Init(user)
	user.task.Init(user)
	user.bag.LoadBin(b)
	user.task.LoadBin(b)
	user.asynev.Start(int64(user.Id()), 10)
	user.maxenergy = tbl.Game.MaxEnergy
	user.arvalues.Init()
	user.arvalues.LoadBin(user.bin.Base.Arvalues)
	return user
}

func NewRoomUserAI(id int64, name string, sex int32) *RoomUser {
	user := &RoomUser{}
	user.bin = new(msg.Serialize)
	user.bin.Entity = &msg.EntityBase{Roleid: pb.Int64(id),
		Name: pb.String(name),
		Sex:  pb.Int32(sex),
		Gold: pb.Int32(100000),
		Head: pb.String(""),
	}
	user.bin.Base = &msg.UserBase{}
	user.bin.Base.Misc = &msg.UserMiscData{}
	user.bin.Base.Statics = &msg.UserStatistics{}
	user.bin.Base.Sign = &msg.UserSignIn{}
	user.bin.Base.Wechat = &msg.UserWechat{}
	user.bin.Item = &msg.ItemBin{}
	user.bin.Base.Addrlist = make([]*msg.UserAddress, 0)
	user.bin.Base.Task = &msg.UserTask{}
	user.bin.Base.Luckydraw = &msg.LuckyDrawRecord{Drawlist: make([]*msg.LuckyDrawItem, 0)}
	user.isai = true
	user.arvalues.Init()
	return user
}

func (u *RoomUser) Entity() *msg.EntityBase {
	return u.bin.GetEntity()
}

func (u *RoomUser) UserBase() *msg.UserBase {
	return u.bin.GetBase()
}

func (u *RoomUser) Id() int64 {
	return u.Entity().GetRoleid()
}

func (u *RoomUser) Name() string {
	return u.Entity().GetName()
}

func (u *RoomUser) Face() string {
	return u.Entity().GetHead()
}

func (u *RoomUser) Account() string {
	return u.Entity().GetAccount()
}

func (u *RoomUser) Head() string {
	return u.Entity().GetHead()
}

func (u *RoomUser) Sex() int32 {
	return u.Entity().GetSex()
}

func (u *RoomUser) SetSex(sex int32) {
	u.Entity().Sex = pb.Int32(sex)
}

func (u *RoomUser) MaxEnergy() int64 {
	return u.maxenergy
}

func (u *RoomUser) RoomId() int64 {
	return u.roomid
}

func (u *RoomUser) OpenId() string {
	userbase := u.UserBase()
	return userbase.GetWechat().GetOpenid()
}

func (u *RoomUser) TotalRecharge() int32 {
	userbase := u.UserBase()
	return userbase.Statics.GetTotalrecharge()
}

func (u *RoomUser) SetTotalRecharge(r int32) {
	userbase := u.UserBase()
	userbase.Statics.Totalrecharge = pb.Int32(r)
}

// 邀请人邀请码
func (u *RoomUser) InvitationCode() string {
	userbase := u.UserBase()
	return userbase.Misc.GetInvitationcode()
}

// 邀请人
func (u *RoomUser) Inviter() int64 {
	if code := u.InvitationCode(); len(code) > 2 {
		inviter, _ := strconv.ParseInt(code[2:], 10, 64)
		return inviter
	}
	return 0
}

func (u *RoomUser) Token() string {
	return u.token
}

func (u *RoomUser) UpdateToken(t string) {
	u.token = t
}

func (u *RoomUser) Level() int32 {
	return u.Entity().GetLevel()
}

func (u *RoomUser) AddLevel(num int32) {
	u.Entity().Level = pb.Int32(u.Level() + num)
}

func (u *RoomUser) Exp() int32 {
	return u.Entity().GetExp()
}

func (u *RoomUser) SetExp(num int32) {
	u.Entity().Exp = pb.Int32(num)
}

// 添加经验
func (u *RoomUser) AddExp(num int32, reason string, syn bool) {
	old, exp := u.Level(), u.Exp()+num
	for {
		lvlbase, ok := tbl.LevelBasee.TLevelById[u.Level()]
		if ok == false {
			break
		}

		// 下一级需要经验
		if exp < int32(lvlbase.ExpNums) || lvlbase.ExpNums == 0 {
			break
		}

		exp = exp - int32(lvlbase.ExpNums)
		u.OnLevelUp()
	}
	u.SetExp(exp)
	//if syn == true { u.SendBattleUser() }
	u.SyncLevelRankRedis()
	log.Info("玩家[%d] 添加经验[%d] 老等级[%d] 新等级[%d] 经验[%d] 原因[%s]", u.Id(), num, old, u.Level(), u.Exp(), reason)
}

// 升级
func (u *RoomUser) OnLevelUp() {
	u.AddLevel(1)

	//升级拿元宝
	lvlbase, ok := tbl.LevelBasee.TLevelById[u.Level()-1]
	if ok == true {
		u.AddYuanbao(int32(lvlbase.Reward), "升级奖元宝")
	}
}

// 打包二进制数据
func (u *RoomUser) PackBin() *msg.Serialize {
	bin := &msg.Serialize{}

	// 基础信息
	//bin.Entity = pb.Clone(u.bin.GetEntity()).(*msg.EntityBase)
	bin.Entity = u.bin.GetEntity()

	// 玩家信息
	//bin.Base = pb.Clone(u.bin.GetBase()).(*msg.UserBase)
	bin.Base = u.bin.GetBase()

	// 背包
	u.bag.PackBin(bin)
	u.task.PackBin(bin)
	//u.image.PackBin(bin)
	u.PackAutoResetValues(bin)

	return bin
}

func (u *RoomUser) SendMsg(m pb.Message) bool {
	if u.isai == true {
		return false
	}
	if u.agentid == 0 {
		log.Fatal("玩家[%s %d] 没有网关agentid，不能发送消息", u.Name(), u.Id())
		return false
	}
	return RoomSvr().SendMsg(u.agentid, m)
}

// 转发消息到gate
func (u *RoomUser) SendClientMsg(m pb.Message) bool {
	if u.isai == true {
		return false
	}
	name := pb.MessageName(m)
	if name == "" {
		log.Fatal("SendClientMsg 获取proto名字失败[%s]", m)
		return false
	}
	msgbuf, err := pb.Marshal(m)
	if err != nil {
		log.Fatal("SendClientMsg 序列化proto失败[%s][%s]", name, err)
		return false
	}

	send := &msg.RS2GW_MsgTransfer{Uid: pb.Int64(u.Id()), Name: pb.String(name), Buf: msgbuf}
	return u.SendMsg(send)
}

func (u *RoomUser) AgentId() int {
	return u.agentid
}

func (u *RoomUser) AgentName() string {
	return u.agentname
}

func (u *RoomUser) UpdateGateAgent(agent network.IBaseNetSession) {
	u.agentid = agent.Id()
	u.agentname = agent.Name()
	log.Info("玩家[%s %d] 上线更新GateAgent信息[%s %d]", u.Name(), u.Id(), agent.Name(), agent.Id())
}

func (u *RoomUser) GetGold() int32 {
	return u.Entity().GetGold()
}

func (u *RoomUser) RemoveGold(gold int32, reason string, syn bool) bool {
	if u.GetGold() >= gold {
		entity := u.Entity()
		entity.Gold = pb.Int32(u.GetGold() - gold)
		if syn {
			u.SendPropertyChange()
		}
		log.Info("玩家[%d] 扣除金币[%d] 库存[%d] 原因[%s]", u.Id(), gold, u.GetGold(), reason)

		RCounter().IncrByDate("item_remove", int32(msg.ItemId_Gold), gold)
		u.SyncGoldRankRedis()
		return true
	}
	log.Info("玩家[%d] 扣除金币失败[%d] 原因[%s]", u.Id(), gold, reason)
	return false
}

func (u *RoomUser) AddGold(gold int32, reason string, syn bool) {
	entity := u.Entity()
	entity.Gold = pb.Int32(u.GetGold() + gold)
	if syn {
		u.SendPropertyChange()
	}
	u.SyncGoldRankRedis()
	log.Info("玩家[%d] 添加金币[%d] 库存[%d] 原因[%s]", u.Id(), gold, u.GetGold(), reason)
}

func (u *RoomUser) SetGold(gold int32, reason string, syn bool) {
	entity := u.Entity()
	entity.Gold = pb.Int32(gold)
	if syn {
		u.SendPropertyChange()
	}
	u.SyncGoldRankRedis()
	log.Info("玩家[%d] 设置金币[%d] 库存[%d] 原因[%s]", u.Id(), gold, u.GetGold(), reason)
}

//同步玩家金币到redis排行榜
func (u *RoomUser) SyncGoldRankRedis() {
	//机器人不参与排行榜
	if u.isai == true {
		return
	}
	zMem := redis.Z{Score: float64(u.GetGold()), Member: u.Id()}
	Redis().ZAdd("zGoldRank", zMem)
}

//同步玩家等级到redis排行榜
func (u *RoomUser) SyncLevelRankRedis() {
	if u.isai == true {
		return
	}
	score := u.Level() * 1000000 + u.Exp()
	zMem := redis.Z{Score: float64(score), Member: u.Id()}
	Redis().ZAdd("zLevelRank", zMem)
}

func (u *RoomUser) SendGold() {
	send := &msg.GW2C_PushGoldUpdate{Num: pb.Int32(u.GetGold())}
	u.SendClientMsg(send)
}

func (u *RoomUser) SendDiamond() {
	send := &msg.GW2C_PushDiamondUpdate{Num: pb.Int32(u.GetDiamond())}
	u.SendClientMsg(send)
}

// 元宝
func (u *RoomUser) GetYuanbao() int32 {
	return u.Entity().GetYuanbao()
}

func (u *RoomUser) AddYuanbao(yuanbao int32, reason string) {
	entity := u.Entity()
	entity.Yuanbao = pb.Int32(entity.GetYuanbao() + yuanbao)
	RCounter().IncrByDate("room_output", int32(u.gamekind), yuanbao)
	//u.PlatformPushLootMoney(float32(yuanbao))
	log.Info("玩家[%d] 添加元宝[%d] 库存[%d] 原因[%s]", u.Id(), yuanbao, entity.GetYuanbao(), reason)
}

func (u *RoomUser) RemoveYuanbao(yuanbao int32, reason string) bool {
	if u.GetYuanbao() >= yuanbao {
		entity := u.Entity()
		entity.Yuanbao = pb.Int32(u.GetYuanbao() - yuanbao)
		RCounter().IncrByDate("item_remove", int32(msg.ItemId_YuanBao), yuanbao)
		RCounter().IncrByDate("room_income", int32(u.gamekind), yuanbao)
		//u.PlatformPushConsumeMoney(float32(yuanbao))
		log.Info("玩家[%d] 扣除元宝[%d] 库存[%d] 原因[%s]", u.Id(), yuanbao, u.GetYuanbao(), reason)
		return true
	}
	log.Info("玩家[%d] 扣除元宝[%d]失败 库存[%d] 原因[%s]", u.Id(), yuanbao, u.GetYuanbao(), reason)
	return false
}

func (u *RoomUser) GetDiamond() int32 {
	return u.Entity().GetDiamond()
}

// 移除金卷
func (u *RoomUser) RemoveDiamond(num int32, reason string, syn bool) bool {
	entity := u.Entity()
	if entity.GetDiamond() >= num {
		entity.Diamond = pb.Int32(entity.GetDiamond() - num)
		if syn {
			u.SendPropertyChange()
		}
		log.Info("玩家[%d] 扣除金卷[%d] 库存[%d] 原因[%s]", u.Id(), num, entity.GetDiamond(), reason)
		RCounter().IncrByDate("item_remove", int32(msg.ItemId_Diamond), num)
		return true
	}
	log.Info("玩家[%d] 扣除金卷[%d]失败 库存[%d] 原因[%s]", u.Id(), num, entity.GetDiamond(), reason)
	return false
}

// 添加金卷
func (u *RoomUser) AddDiamond(num int32, reason string, syn bool) {
	entity := u.Entity()
	entity.Diamond = pb.Int32(entity.GetDiamond() + num)
	//u.SynAddMidsMoney(int64(num), reason)
	if syn {
		u.SendPropertyChange()
	}
	log.Info("玩家[%d] 添加钻石[%d] 库存[%d] 原因[%s]", u.Id(), num, entity.GetDiamond(), reason)
}

func (u *RoomUser) SendPropertyChange() {
	send := &msg.RS2C_RolePushPropertyChange{}
	send.Diamond = pb.Int32(u.Entity().GetDiamond())
	send.Gold = pb.Int32(u.Entity().GetGold())
	send.Safegold = pb.Int32(0)
	u.SendClientMsg(send)
}

// 添加道具
func (u *RoomUser) AddItem(item int32, num int32, reason string, syn bool) {

	if item == int32(msg.ItemId_YuanBao) {
		u.AddYuanbao(num, reason)
	} else if item == int32(msg.ItemId_Gold) {
		u.AddGold(num, reason, syn)
	} else if item == int32(msg.ItemId_Diamond) {
		u.AddDiamond(num, reason, syn)
	} else {
		u.bag.AddItem(item, num, reason)
	}
	RCounter().IncrByDate("item_add", item, num)

}

// 扣除道具
func (u *RoomUser) RemoveItem(item int32, num int32, reason string) bool {
	return u.bag.RemoveItem(item, num, reason)
}

func (u *RoomUser) SendNotify(text string) {
	send := &msg.GW2C_MsgNotify{Userid: pb.Int64(u.Id()), Text: pb.String(text)}
	u.SendMsg(send)
}

func (u *RoomUser) Tick(now int64) {
	if u.ticker10ms.Run(now) {
		u.ticker1s.Run(now)
	}
}

func (u *RoomUser) Handler10msTick(now int64) {
	u.asynev.Dispatch()
}

func (u *RoomUser) Handler1sTick(now int64) {

	// 不用我们的充值 2018年 05月 17日 星期四 19:34:03 CST
	//u.CheckRechargeOrders()

	// 充值，异步事件队列
	//event := NewRechargeCheckEvent(u, u.HaveRechargeOrders, u.CheckRechargeOrders)
	//u.AsynEventInsert(event)
}

func (u *RoomUser) ToRoleInfo() *msg.RS2C_RetFriendGetRoleInfo {
	return &msg.RS2C_RetFriendGetRoleInfo{
		Diamond: pb.Int32(0),
		Gold:    pb.Int32(0),
		Roleid:  pb.Int64(u.Id()),
		Name:    pb.String(u.Name()),
		Head:    pb.String(""),
		Sex:     pb.Int32(u.Sex()),
	}
}

// 检查是否有充值订单
func (u *RoomUser) HaveRechargeOrders() bool {
	//log.Info("HaveRechargeOrders")
	keyorder := fmt.Sprintf("%d_verified_recharge_orders", u.Id())
	amount, err := Redis().SCard(keyorder).Result()
	if err == redis.Nil || amount == 0 {
		return false
	} else if err != nil {
		log.Error("[充值] 从Redis SCard 订单失败 err:%s", err)
		return false
	}

	return true
}

// 插入新异步事件
func (u *RoomUser) AsynEventInsert(event eventque.IEvent) {
	u.asynev.Push(event)
}

func (u *RoomUser) PackAutoResetValues(bin *msg.Serialize) {
	u.bin.Base.Arvalues = u.arvalues.PackBin()
}
