package main
import (
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	_"gitee.com/jntse/minehero/server/tbl/excel"
	_"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/eventqueue"
	pb "github.com/gogo/protobuf/proto"
	"fmt"
	_"strings"
	"strconv"
	"github.com/go-redis/redis"
	"time"
)

// --------------------------------------------------------------------------
/// @brief 玩家信息
// --------------------------------------------------------------------------
type RoomUser struct {
	gamekind  	int32
	roomid    	int64
	sid_gate  	int
	bin 		*msg.Serialize
	bag 		UserBag
	task       	UserTask
	token		string
	ticker1s  	*util.GameTicker
	ticker10ms  *util.GameTicker
	asynev      eventque.AsynEventQueue // 异步事件处理
	invitationcode string
	synbalance	bool
	bulletid 	int64
	energy		int64
	save_amt	int64
	maxenergy	int64
}

func NewRoomUser(rid int64, b *msg.Serialize, gate network.IBaseNetSession, gamekind int32) *RoomUser {
	user := &RoomUser{roomid:rid, bin:b, sid_gate:gate.Id(), gamekind:gamekind}
	user.ticker1s = util.NewGameTicker(1 * time.Second, user.Handler1sTick)
	user.ticker10ms = util.NewGameTicker(10 * time.Millisecond, user.Handler10msTick)
	user.ticker1s.Start()
	user.ticker10ms.Start()
	user.bag.Init(user)
	user.task.Init(user)
	user.bag.LoadBin(b)
	user.task.LoadBin(b)
	user.asynev.Start(int64(user.Id()), 10)
	user.maxenergy = tbl.Game.MaxEnergy
	return user
}

func (this *RoomUser) Entity() *msg.EntityBase {
	return this.bin.GetEntity()
}

func (this *RoomUser) UserBase() *msg.UserBase {
	return this.bin.GetBase()
}

func (this *RoomUser) Id() int64 {
	return this.Entity().GetId()
}

func (this *RoomUser) Name() string {
	return this.Entity().GetName()
}

func (this *RoomUser) Account() string {
	return this.Entity().GetAccount()
}

func (this *RoomUser) Head() string {
	return this.Entity().GetHead()
}

func (this *RoomUser) Sex() int32 {
	return this.Entity().GetSex()
}

func (this *RoomUser) SetSex(sex int32) {
	this.Entity().Sex = pb.Int32(sex)
}

func (this *RoomUser) MaxEnergy() int64 {
	return this.maxenergy
}

func (this *RoomUser) RoomId() int64 {
	return this.roomid
}

func (this *RoomUser) OpenId() string {
	userbase := this.UserBase()
	return userbase.GetWechat().GetOpenid()
}

func (this *RoomUser) TotalRecharge() int32 {
	userbase := this.UserBase()
	return userbase.Statics.GetTotalrecharge()
}

func (this *RoomUser) SetTotalRecharge(r int32) {
	userbase := this.UserBase()
	userbase.Statics.Totalrecharge = pb.Int32(r)
}


// 邀请人邀请码
func (this *RoomUser) InvitationCode() string {
	userbase := this.UserBase()
	return userbase.Misc.GetInvitationcode()
}

// 邀请人
func (this *RoomUser) Inviter() int64 {
	if code := this.InvitationCode(); len(code) > 2 {
		inviter , _ := strconv.ParseInt(code[2:], 10, 64)
		return inviter
	}
	return 0
}

func (this *RoomUser) Token() string {
	return this.token
}

func (this *RoomUser) UpdateToken(t string) {
	this.token = t
}

func (this *RoomUser) Level() int32 {
	return this.Entity().GetLevel()
}

func (this *RoomUser) AddLevel(num int32) {
	this.Entity().Level = pb.Int32(this.Level() + num)
}

func (this *RoomUser) Exp() int32 {
	return this.Entity().GetExp()
}

func (this *RoomUser) SetExp(num int32) {
	this.Entity().Exp = pb.Int32(num)
}

// 添加经验
func (this *RoomUser) AddExp(num int32, reason string, syn bool) {
	old, exp := this.Level(), this.Exp() + num
	for {
		lvlbase, ok := tbl.LevelBasee.TLevelById[this.Level()]
		if ok == false {
			break
		}

		// 下一级需要经验
		if exp < int32(lvlbase.ExpNums) || lvlbase.ExpNums == 0 {
			break
		}

		exp = exp - int32(lvlbase.ExpNums)
		this.OnLevelUp()
	}
	this.SetExp(exp)
	//if syn == true { this.SendBattleUser() }

	log.Info("玩家[%d] 添加经验[%d] 老等级[%d] 新等级[%d] 经验[%d] 原因[%s]", this.Id(), num, old, this.Level(), this.Exp(), reason)
}

// 升级
func (this *RoomUser) OnLevelUp() {
	this.AddLevel(1)
	
	//升级拿元宝
	lvlbase, ok := tbl.LevelBasee.TLevelById[this.Level()-1]
	if ok == true { this.AddYuanbao(int32(lvlbase.Reward), "升级奖元宝") }

	// 临时
	//arglist := []interface{}{this.Account(), this.Token(), int64(this.Id()), int32(this.Level())}
	//event := eventque.NewCommonEvent(arglist, def.HttpRequestUserLevelArglist, nil)
	//this.AsynEventInsert(event)
}

// 打包二进制数据
func (this *RoomUser) PackBin() *msg.Serialize {
	bin := &msg.Serialize{}

	// 基础信息
	//bin.Entity = pb.Clone(this.bin.GetEntity()).(*msg.EntityBase)
	bin.Entity = this.bin.GetEntity()

	// 玩家信息
	//bin.Base = pb.Clone(this.bin.GetBase()).(*msg.UserBase)
	bin.Base = this.bin.GetBase()

	// 背包
	this.bag.PackBin(bin)
	this.task.PackBin(bin)
	//this.image.PackBin(bin)


	return bin
}

func (this *RoomUser) SendMsg(m pb.Message) bool {
	return RoomSvr().SendMsg(this.sid_gate , m)
}

// 转发消息到gate
func (this *RoomUser) SendClientMsg(m pb.Message) bool {
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

	send := &msg.RS2GW_MsgTransfer{ Uid:pb.Int64(this.Id()), Name:pb.String(name), Buf:msgbuf }
	return this.SendMsg(send)
}

func (this *RoomUser) SidGate() int {
	return this.sid_gate
}

func (this *RoomUser) GetGold() int32 {
	return this.Entity().GetGold()
}

func (this *RoomUser) RemoveGold(gold int32, reason string, syn bool) bool {
	if this.GetGold() >= gold {
		entity := this.Entity()
		entity.Gold = pb.Int32(this.GetGold() - gold)
		if syn { this.SendGold() }
		log.Info("玩家[%d] 扣除金币[%d] 库存[%d] 原因[%s]", this.Id(), gold, this.GetGold(), reason)

		RCounter().IncrByDate("item_remove", int32(msg.ItemId_Gold), gold)
		return true
	}
	log.Info("玩家[%d] 扣除金币失败[%d] 原因[%s]", this.Id(), gold, reason)
	return false
}

func (this *RoomUser) AddGold(gold int32, reason string, syn bool) {
	entity := this.Entity()
	entity.Gold = pb.Int32(this.GetGold() + gold)
	if syn { this.SendGold() }
	log.Info("玩家[%d] 添加金币[%d] 库存[%d] 原因[%s]", this.Id(), gold, this.GetGold(), reason)
}

func (this *RoomUser) SetGold(gold int32, reason string, syn bool) {
	entity := this.Entity()
	entity.Gold = pb.Int32(gold)
	if syn { this.SendGold() }
	log.Info("玩家[%d] 设置金币[%d] 库存[%d] 原因[%s]", this.Id(), gold, this.GetGold(), reason)
}

func (this *RoomUser) SendGold() {
	send := &msg.GW2C_PushGoldUpdate{Num:pb.Int32(this.GetGold())}
	this.SendClientMsg(send)
}

func (this *RoomUser) SendDiamond() {
	send := &msg.GW2C_PushDiamondUpdate{Num:pb.Int32(this.GetDiamond())}
	this.SendClientMsg(send)
}


// 元宝
func (this *RoomUser) GetYuanbao() int32 {
	return this.Entity().GetYuanbao()
}

func (this *RoomUser) AddYuanbao(yuanbao int32, reason string) {
	entity := this.Entity()
	entity.Yuanbao = pb.Int32(entity.GetYuanbao() + yuanbao)
	RCounter().IncrByDate("room_output", int32(this.gamekind), yuanbao)
	//this.PlatformPushLootMoney(float32(yuanbao))
	log.Info("玩家[%d] 添加元宝[%d] 库存[%d] 原因[%s]", this.Id(), yuanbao, entity.GetYuanbao(), reason) 
}

func (this *RoomUser) RemoveYuanbao(yuanbao int32, reason string) bool {
	if this.GetYuanbao() >= yuanbao {
		entity:= this.Entity()
		entity.Yuanbao = pb.Int32(this.GetYuanbao() - yuanbao)
		RCounter().IncrByDate("item_remove", int32(msg.ItemId_YuanBao), yuanbao)
		RCounter().IncrByDate("room_income", int32(this.gamekind), yuanbao)
		//this.PlatformPushConsumeMoney(float32(yuanbao))
		log.Info("玩家[%d] 扣除元宝[%d] 库存[%d] 原因[%s]", this.Id(), yuanbao, this.GetYuanbao(), reason)
		return true
	}
	log.Info("玩家[%d] 扣除元宝[%d]失败 库存[%d] 原因[%s]", this.Id(), yuanbao, this.GetYuanbao(), reason)
	return false
}

func (this *RoomUser) GetDiamond() int32 {
	return this.Entity().GetDiamond()
}

// 移除金卷
func (this *RoomUser) RemoveDiamond(num int32, reason string, syn bool) bool {
	entity := this.Entity()
	if ( entity.GetDiamond() >= num ) {
		entity.Diamond = pb.Int32(entity.GetDiamond() - num)
		if syn { this.SendDiamond() }
		log.Info("玩家[%d] 扣除金卷[%d] 库存[%d] 原因[%s]", this.Id(), num, entity.GetDiamond(), reason)
		RCounter().IncrByDate("item_remove", int32(msg.ItemId_Diamond), num)
		return true
	}
	log.Info("玩家[%d] 扣除金卷[%d]失败 库存[%d] 原因[%s]", this.Id(), num, entity.GetDiamond(), reason)
	return false
}

// 添加金卷
func (this *RoomUser) AddDiamond(num int32, reason string, syn bool) {
	entity := this.Entity()
	entity.Diamond = pb.Int32(entity.GetDiamond() + num)
	//this.SynAddMidsMoney(int64(num), reason)
	if syn { this.SendDiamond() }
	log.Info("玩家[%d] 添加钻石[%d] 库存[%d] 原因[%s]", this.Id(), num, entity.GetDiamond(), reason)
}

// 添加道具
func (this *RoomUser) AddItem(item int32, num int32, reason string, syn bool) {

    if item == int32(msg.ItemId_YuanBao) {
        this.AddYuanbao(num, reason)
    }else if item == int32(msg.ItemId_Gold) {
        this.AddGold(num, reason, syn)
    }else if item == int32(msg.ItemId_Diamond) {
		this.AddDiamond(num, reason, syn)
	}else{
		this.bag.AddItem(item, num, reason)
	}
	RCounter().IncrByDate("item_add", item, num)

}

// 扣除道具
func (this *RoomUser) RemoveItem(item int32, num int32, reason string) bool{
	return this.bag.RemoveItem(item, num, reason)
}

func (this *RoomUser) SendNotify(text string) {
	send := &msg.GW2C_MsgNotify{Userid:pb.Int64(this.Id()), Text:pb.String(text)}
	this.SendMsg(send)
}

func (this *RoomUser) Tick(now int64) {
	if this.ticker10ms.Run(now) {
		this.ticker1s.Run(now)
	}
}

func (this *RoomUser) Handler10msTick(now int64) {
	this.asynev.Dispatch()
}

func (this *RoomUser) Handler1sTick(now int64) {

	// 不用我们的充值 2018年 05月 17日 星期四 19:34:03 CST
	//this.CheckRechargeOrders()

	// 充值，异步事件队列
	//event := NewRechargeCheckEvent(this, this.HaveRechargeOrders, this.CheckRechargeOrders)
	//this.AsynEventInsert(event)
}

// 检查是否有充值订单
func (this *RoomUser) HaveRechargeOrders() bool {
	//log.Info("HaveRechargeOrders")
	keyorder := fmt.Sprintf("%d_verified_recharge_orders", this.Id())
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
func (this *RoomUser) AsynEventInsert(event eventque.IEvent) {
	this.asynev.Push(event)
}

