package main

import (
	"fmt"
	//"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	//"gitee.com/jntse/minehero/server/def"
	//"gitee.com/jntse/minehero/server/tbl"
	//"gitee.com/jntse/minehero/server/tbl/excel"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	//"strconv"
	//"strings"
	"time"
)

func NewSimpleUser(uid int64) *RoomUser {
	user := &RoomUser{aiflag:false, entity:UserEntity{roleid:uid}}
	return user
}

func NewRoomUserAI(id int64, name string, sex int32) *RoomUser {
	user := &RoomUser{aiflag:true, entity:UserEntity{roleid:id, name:name, sex:sex} }
	return user
}

type UserEntity struct {
	roleid  int64
	name    string
	head    string
	sex     int32
	account string
	level   int32
	exp     int32
	age     int32

	dirty	bool
}

func (u *UserEntity) Id() int64 { return u.roleid }
func (u *UserEntity) Name() string { return u.name }
func (u *UserEntity) Head() string { return u.head }
func (u *UserEntity) Sex() int32 { return u.sex }
func (u *UserEntity) Account() string { return u.account }
func (u *UserEntity) Level() int32 { return u.level }
func (u *UserEntity) Exp() int32 { return u.exp }
func (u *UserEntity) Age() int32 { return u.age }
func (u *UserEntity) SetLevel(l int32)  { u.level = l;  u.dirty = true }
func (u *UserEntity) SetExp(exp int32) { u.exp = exp;  u.dirty = true }
func (u *UserEntity) Init() { }
func (u *UserEntity) DBLoad() {
	uid := u.roleid
	cmdmap, err := Redis().HGetAll(fmt.Sprintf("charbase_%d", uid)).Result()
	if err != nil {
		log.Error("玩家[%d] 获取玩家Charbase失败 RedisError[%s]", u.Id(), err)
		return
	}

	for k, v := range cmdmap {
		vt := util.NewVarType(v)
		switch k {
			case "name":		u.name = vt.String()
			case "face":        u.head = vt.String()
			case "account":		u.account = vt.String()
			//case "level":       u.level = vt.Int32()
			case "sex":         u.sex = vt.Int32()
			//case "exp":         u.exp = vt.Int32()
			case "age":         u.age = vt.Int32()
		}
	}
}
func (u *UserEntity) DBSave() {
	if u.dirty == false {
		return
	}

	pipe := Redis().Pipeline()
	defer pipe.Close()
	u.dirty = false

	// charbase 部分基础数据
	uid := u.roleid
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "name",  u.Name())
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "face",  u.Head())
	//pipe.HSet(fmt.Sprintf("charbase_%d", uid), "account",  u.Account())
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "sex",   u.Sex())
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "level", u.Level())
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "exp", u.Exp())
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "age", u.Age())

	_, err := pipe.Exec()
	if err != nil {
		log.Error("玩家[%s %d] 保存charbase失败 RedisError[%s]", u.Name(), u.Id(), err)
		return
	}
	log.Info("玩家[%s %d] 保存charbase成功", u.Name(), u.Id())
}


type RoomUser struct {
	entity		UserEntity
	bag			UserBag
	agentid		int
	agentname	string
	ticker1s    *util.GameTicker
	ticker10ms  *util.GameTicker

	roomid		int64
	roomlist 	map[int64]int64
	aiflag    	bool
}

func (u *RoomUser) RoomId() int64 { return u.roomid }
func (u *RoomUser) SetRoomId(uid int64) { u.roomid = uid; u.roomlist[uid] = uid }
func (u *RoomUser) DelRoomId(uid int64) {	 delete(u.roomlist, uid) }
func (u *RoomUser) RoomList() map[int64]int64 { return u.roomlist }
func (u *RoomUser) RoomNum() int32 { return int32(len(u.roomlist)) }
func (u *RoomUser) Id() int64 { return u.entity.Id() }
func (u *RoomUser) Name() string { return u.entity.Name() }
func (u *RoomUser) Face() string { return u.entity.Head() }
func (u *RoomUser) Head() string { return u.entity.Head() }
func (u *RoomUser) Sex() int32 { return u.entity.Sex() }
func (u *RoomUser) Age() int32 { return u.entity.Age() }
func (u *RoomUser) Level() int32 { return u.entity.Level() }
func (u *RoomUser) Exp() int32 { return u.entity.Exp() }
func (u *RoomUser) MaxEnergy() int64 { return 0 }
func (u *RoomUser) AgentId() int { return u.agentid }
func (u *RoomUser) AgentName() string { return u.agentname }

func (u *RoomUser) Init() {
	u.ticker1s = util.NewGameTicker(1*time.Second, u.Handler1sTick)
	u.ticker10ms = util.NewGameTicker(10*time.Millisecond, u.Handler10msTick)
	u.ticker1s.Start()
	u.ticker10ms.Start()
	u.roomlist = make(map[int64]int64)

	if u.aiflag == false {
		//u.bag.Init(u)
		u.entity.Init()
	}
}

func (u *RoomUser) DBLoad() {
	//u.bag.DBLoad()
	u.entity.DBLoad()
}

func (u *RoomUser) DBSave() {
	//u.bag.DBSave()
	//u.entity.DBSave()
	log.Info("玩家[%s %d] 存盘完毕", u.Name(), u.Id())
}

func (u *RoomUser) Logout() {
	u.DBSave()
	u.ticker1s.Stop()
	u.ticker10ms.Stop()
	UserMgr().DelUser(u)
	log.Info("玩家[%s %d] 完全退出RoomServer", u.Name(), u.Id())
}

//func (u *RoomUser) KickOut() {
//	u.DBSave()
//	u.ticker1s.Stop()
//	u.ticker10ms.Stop()
//	UserMgr().DelUser(u)
//}

func (u *RoomUser) SendNotify(text string) {
	send := &msg.GW2C_PushMsgNotify{Userid: pb.Int64(u.Id()), Text: pb.String(text)}
	u.SendMsg(send)
}

func (u *RoomUser) SendMsg(m pb.Message) bool {
	if u.aiflag == true {
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
	if u.aiflag == true {
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


func (u *RoomUser) CheckUpdateGateAgent(agent network.IBaseNetSession) {
	if agent.Id() == u.AgentId() {
		return
	}
	u.agentid = agent.Id()
	u.agentname = agent.Name()
	log.Info("玩家[%s %d] 更新GateAgent信息[%s %d]", u.Name(), u.Id(), agent.Name(), agent.Id())
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

//同步玩家金币到redis排行榜
func (u *RoomUser) SyncGoldRankRedis() {
	//机器人不参与排行榜
	if u.aiflag == true {
		return
	}
	zMem := redis.Z{Score: float64(u.GetGold()), Member: u.Id()}
	Redis().ZAdd("zGoldRank", zMem)
}

//同步玩家等级到redis排行榜
func (u *RoomUser) SyncLevelRankRedis() {
	if u.aiflag == true {
		return
	}
	score := u.Level() * 1000000 + u.Exp()
	zMem := redis.Z{Score: float64(score), Member: u.Id()}
	Redis().ZAdd("zLevelRank", zMem)
}

func (u *RoomUser) Tick(now int64) {
	if u.ticker10ms.Run(now) {
		u.ticker1s.Run(now)
	}
}

func (u *RoomUser) Handler10msTick(now int64) {
}

func (u *RoomUser) Handler1sTick(now int64) {
}

func RemoveUserGold(gid int, uid int64, gold int32, reason string) bool {
	goldsrc := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", uid), "gold").Val())
	if goldsrc >= gold {
		newgold := goldsrc - gold
		Redis().HSet(fmt.Sprintf("charbase_%d", uid), "gold", newgold)
		send := &msg.RS2C_RolePushPropertyChange{}
		send.Gold = pb.Int32(newgold)
		RoomSvr().SendClientMsg(gid, uid, send)
		log.Info("玩家[%d] 扣除金币[%d] 库存[%d] 原因[%s]", uid, gold, newgold, reason)
		return true
	}
	log.Info("玩家[%d] 扣除金币失败[%d] 原因[%s]", uid, gold, reason)
	return false
}

func AddUserGold(gid int, uid int64, gold int32, reason string) bool {
	goldsrc := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", uid), "gold").Val())
	newgold := goldsrc + gold
	Redis().HSet(fmt.Sprintf("charbase_%d", uid), "gold", newgold)
	send := &msg.RS2C_RolePushPropertyChange{}
	send.Gold = pb.Int32(newgold)
	RoomSvr().SendClientMsg(gid, uid, send)
	log.Info("玩家[%d] 添加金币[%d] 原因[%s]", uid, gold, reason)
	return false
}


/*
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
	asynev         eventque.AsynEventQueue // 异步事件处理
	invitationcode string
	synbalance     bool
	bulletid       int64
	energy         int64
	save_amt       int64
	maxenergy      int64
	gamekind       int32
	roomid         int64 // 房间id
	aiflag           bool
	arvalues		def.AutoResetValues
	roomlist		map[int64]int64
}

func NewRoomUser(rid int64, gate network.IBaseNetSession, gamekind int32) *RoomUser {
	user := &RoomUser{roomid: rid, bin: nil, agentid: gate.Id(), agentname: gate.Name(), gamekind: gamekind}
	user.ticker1s = util.NewGameTicker(1*time.Second, user.Handler1sTick)
	user.ticker10ms = util.NewGameTicker(10*time.Millisecond, user.Handler10msTick)
	user.ticker1s.Start()
	user.ticker10ms.Start()
	user.bag.Init(user)
	user.task.Init(user)
	user.asynev.Start(int64(user.Id()), 10)
	user.maxenergy = tbl.Game.MaxEnergy
	user.arvalues.Init()
	user.roomlist = make(map[int64]int64) 
	return user
}

func NewSimpleUser(id int64) *RoomUser {
	user := &RoomUser{}
	user.bin = new(msg.Serialize)
	user.bin.Entity = &msg.EntityBase{Roleid: pb.Int64(id)}
	user.bin.Base = &msg.UserBase{}
	user.bin.Base.Misc = &msg.UserMiscData{}
	user.bin.Base.Statics = &msg.UserStatistics{}
	user.bin.Base.Sign = &msg.UserSignIn{}
	user.bin.Base.Wechat = &msg.UserWechat{}
	user.bin.Item = &msg.ItemBin{}
	user.bin.Base.Addrlist = make([]*msg.UserAddress, 0)
	user.bin.Base.Task = &msg.UserTask{}
	user.bin.Base.Luckydraw = &msg.LuckyDrawRecord{Drawlist: make([]*msg.LuckyDrawItem, 0)}
	user.arvalues.Init()
	user.ticker1s = util.NewGameTicker(1*time.Second, user.Handler1sTick)
	user.ticker10ms = util.NewGameTicker(10*time.Millisecond, user.Handler10msTick)
	user.ticker1s.Start()
	user.ticker10ms.Start()
	user.roomlist = make(map[int64]int64)
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
	user.aiflag = true
	user.arvalues.Init()
	user.ticker1s = util.NewGameTicker(1*time.Second, user.Handler1sTick)
	user.ticker10ms = util.NewGameTicker(10*time.Millisecond, user.Handler10msTick)
	user.ticker1s.Start()
	user.ticker10ms.Start()
	user.roomlist = make(map[int64]int64)
	return user
}

func (u *RoomUser) DBLoad(b *msg.Serialize) {
	u.bin = b
	//u.bag.LoadBin(b)
	u.bag.DBLoad()
	u.task.LoadBin(b)
	u.arvalues.LoadBin(b.Base.Arvalues)
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
	newlevel := u.Level() + num
	u.Entity().Level = pb.Int32(int32(newlevel))
	u.OnAchieveProcessChanged(int32(AchieveGroup_Level))
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "level", newlevel)
}

func (u *RoomUser) Exp() int32 {
	return u.Entity().GetExp()
}

func (u *RoomUser) SetExp(num int32) {
	u.Entity().Exp = pb.Int32(num)
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "exp", num)
}

// 添加经验
func (u *RoomUser) AddExp(num int32, reason string, syn bool) {
	old, exp := u.Level(), u.Exp()+num
	for {
		lvlbase, ok := tbl.LevelBasee.ExpById[u.Level() + 1]
		if ok == false {
			break
		}

		// 下一级需要经验
		if exp < int32(lvlbase.Exp) || lvlbase.Exp == 0 {
			break
		}

		exp = exp - int32(lvlbase.Exp)
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
	//u.bag.PackBin(bin)
	u.bag.DBSave()

	//
	u.task.PackBin(bin)
	//u.image.PackBin(bin)
	u.PackAutoResetValues(bin)

	return bin
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
*/
