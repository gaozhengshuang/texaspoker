package main
import (
	//"sort"
	"fmt"
	"time"
	//"errors"
	//"math/rand"

	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	//"gitee.com/jntse/gotoolkit/net"

	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
)

const (
	kBetPoolNum = 5		// 下注池数量，(0庄家，从左到右1-4)
	kHandCardNum = 5	// 手牌数量
	kBankerPos = 0		// 庄家位置
	kMaxCardNum = 52	// 最大牌数量
)

// 下注池位置
const (
	kBetPoolPosBanker = 0
	kBetPoolPosP1 = 1
	kBetPoolPosP2 = 2
	kBetPoolPosP3 = 3
	kBetPoolPosP4 = 4
)

// 房间状态
const (
	kStatWaitNextRound = 0	// 等待下一局
	kStatBetting = 1		// 下注阶段
)

// 胜负平枚举
const (
	kBetResultLose = 0
	kBetResultWin = 1
	kBetResultTie = 2
)


// --------------------------------------------------------------------------
/// @brief 百人大战玩家
///
///
// --------------------------------------------------------------------------
type TFPlayerBet struct {
	pos int32	// 下注位置
	num int32	// 下注数量
}
func (b *TFPlayerBet) Pos() int32 { return b.pos }
func (b *TFPlayerBet) Num() int32 { return b.num }

type TexasFightPlayer struct {
	sysflag bool		// 系统庄家
	owner *RoomUser	//
	seat int32		// 坐下位置，0是庄家位置，-1表示站起没有位置
	totalbet int32 	// 总下注额
	betlist	[kBetPoolNum]*TFPlayerBet	// 下注列表
	bankerround int32	// 玩家坐庄轮数
}

func NewTexasFightPlayer(u *RoomUser, sysflag bool) *TexasFightPlayer {
	p := &TexasFightPlayer{sysflag:sysflag, owner:u, seat:-1, bankerround:0 }
	return p
}

func (p *TexasFightPlayer) Reset() {
	p.betlist = [kBetPoolNum]*TFPlayerBet{}
}

func (p *TexasFightPlayer) IsSystem() bool {
	return p.sysflag
}

func(p *TexasFightPlayer) IsBanker() bool {
	return p.seat == 0
}

func (p *TexasFightPlayer) Id() int64 {
	if p.IsSystem() { return 1 }
	return p.owner.Id()
}

func (p *TexasFightPlayer) Name() string {
	if p.IsSystem() { return "萌萌" }
	return p.owner.Name()
}

func (p *TexasFightPlayer) Head() string {
	if p.IsSystem() { return "default" }
	return p.owner.Head()
}

func (p *TexasFightPlayer) Sex() int32 {
	if p.IsSystem() { return 2 }
	return p.owner.Sex()
}

func (p *TexasFightPlayer) Gold() int32 {
	if p.IsSystem() { return 88888888 }
	return p.owner.GetGold()
}

func (p *TexasFightPlayer) TotalBet() int32 {
	return p.totalbet
}

func (p *TexasFightPlayer) Seat() int32 {
	return p.seat
}

func (p *TexasFightPlayer) Sit(seat int32) {
	p.seat = seat
}

func (p *TexasFightPlayer) BeBankerRound() int32 {
	return p.bankerround
}

func (p *TexasFightPlayer) AddBankerRound(n int32) {
	p.bankerround += n
}

func (p *TexasFightPlayer) ResetBankerRound() {
	p.bankerround = 0
}

func (p *TexasFightPlayer) BetInfo() [kBetPoolNum]*TFPlayerBet {
	return p.betlist
}

func (p *TexasFightPlayer) Bet(pos, num int32) {
	if pos >= int32(len(p.betlist)) || pos < 0  {
		return
	}
	if p.betlist[pos] == nil {
		p.betlist[pos] = &TFPlayerBet{pos:pos, num:num}
	}else {
		p.betlist[pos].num += num
	}
	p.totalbet += num
}

func (p *TexasFightPlayer) FillPlayerInfo() *msg.TFPlayer {
	info := &msg.TFPlayer{}
	info.Roleid = pb.Int64(p.Id())
	info.Name = pb.String(p.Name())
	info.Head = pb.String(p.Head())
	info.Sex = pb.Int32(p.Sex())
	info.Gold = pb.Int32(p.Gold())
	info.Pos = pb.Int32(p.Seat())
	return info
}

func (p *TexasFightPlayer) FillRankPlayerInfo() *msg.TFRankPlayer {
	info := &msg.TFRankPlayer{}
	info.Roleid = pb.Int64(p.Id())
	info.Head = pb.String(p.Head())
	return info
}

// --------------------------------------------------------------------------
/// @brief 百人大战下注池
///
///
// --------------------------------------------------------------------------
type TexasFightBetPool struct {
	total int32
	pos int32
	cards [kHandCardNum]*Card
	//players map[int64]*TexasFightPlayer
	result int32	// 胜负平结果
	hand Hand
}

func (t *TexasFightBetPool) Init(pos int32) {
	t.total = 0
	t.pos = pos
	t.cards = [kHandCardNum]*Card{}
	//t.players = make(map[int64]*TexasFightPlayer)
	t.hand.Init()
}

func (t* TexasFightBetPool) Total() int32 { return t.total }
func (t *TexasFightBetPool) Pos() int32 { return t.pos }
func (t *TexasFightBetPool) Result() int32 { return t.result }
func (t *TexasFightBetPool) SetResult(r int32) { t.result = r }

func (t *TexasFightBetPool) Reset() {
	t.total = 0
	t.result = 0
	t.cards = [kHandCardNum]*Card{}
	//t.players = make(map[int64]*TexasFightPlayer)
	t.hand.ClearAnalyse()
}

func (t *TexasFightBetPool) InsertCards(cards []*Card) {
	if len(cards) != len(t.cards) {
		return
	}

	for k, card := range cards {
		t.cards[k] = card
		t.hand.SetCard(card, false)
	}

	t.hand.AnalyseHand()
}

func (t *TexasFightBetPool) GetCardValue() int32 {
	return t.hand.GetFightValue()
}

func (t *TexasFightBetPool) GetCardLevel() int32 {
	return t.hand.GetFightLevel()
}

func (t *TexasFightBetPool) FillBetPoolInfo() *msg.TFBetPoolInfo {
	info := &msg.TFBetPoolInfo{Bet:pb.Int32(t.total), Pos:pb.Int32(t.pos)}
	for _, card := range t.cards {
		info.Cards = append(info.Cards, card.Suit)
		info.Cards = append(info.Cards, card.Value)
	}
	return info
}


// --------------------------------------------------------------------------
/// @brief 下注池临时统计
/// 
/// 
// --------------------------------------------------------------------------
type SitPlayerBetInfo struct {
	seat int32
	poolbet [kBetPoolNum]int32	// 注池下注额
}
type BetPoolTempStat struct {
	seats []*SitPlayerBetInfo	// 坐下玩家下注统计
	maxseat int32
	dirty bool
}
func (s *BetPoolTempStat) Dirty() bool { return s.dirty }
func (s *BetPoolTempStat) MarkDirty() { s.dirty = true }
func (s *BetPoolTempStat) Init(maxseat int32) {
	s.maxseat = maxseat
	s.seats = make([]*SitPlayerBetInfo, s.maxseat)
	s.dirty = false
}
func (s *BetPoolTempStat) Reset() {
	s.seats = make([]*SitPlayerBetInfo, s.maxseat)
	s.dirty = false
}


// --------------------------------------------------------------------------
/// @brief 奖池命中记录
/// 
/// 
// --------------------------------------------------------------------------
type AwardPoolHitRecord struct {
	cards [kHandCardNum]*Card
	gold int32
	time int64
	players []*msg.TFPlayer		//TODO: 可优化，人数很多时数据块可能会很大
}

func (a *AwardPoolHitRecord) Init() {
	a.cards = [kHandCardNum]*Card{}
	a.players = make([]*msg.TFPlayer, 0)
}


// 胜负走势记录
type WinLoseRecord struct {
	results [4]int32		// 下注池胜负结果 0负， 1胜，2平
}

func (w *WinLoseRecord) Init() {
	w.results = [4]int32{}
}

func (w *WinLoseRecord) FillWinLoseTrend() *msg.TFWinLoseTrend {
	info := &msg.TFWinLoseTrend{}
	info.P1 = pb.Int32(w.results[0])
	info.P2 = pb.Int32(w.results[1])
	info.P3 = pb.Int32(w.results[2])
	info.P4 = pb.Int32(w.results[3])
	return info
}


// --------------------------------------------------------------------------
/// @brief 百人大战核心逻辑
///
///
// --------------------------------------------------------------------------
type TexasFightRoom struct {
	RoomBase
	tconf *table.HundredWarDefine
	ticker1s *util.GameTicker
	ticker100ms *util.GameTicker
	stat int32			// 状态
	statstart int64		// 状态开始时间
	stattimeout int64	// 状态超时时间

	players map[int64]*TexasFightPlayer	// 所有玩家
	sitplayers []*TexasFightPlayer		// 坐下玩家列表

	bankerqueue []*TexasFightPlayer		// 做庄排队列表
	banker *TexasFightPlayer			// 庄家
	bankersys *TexasFightPlayer			// 系统庄家

	awardpoolsize int32					// 奖池大小
	betpool [kBetPoolNum]*TexasFightBetPool		// 押注池，0庄家，闲家从左到右1-4
	cards [kMaxCardNum]*Card			// 52张牌
	betstat BetPoolTempStat				// 下注池临时统计
	poolhit AwardPoolHitRecord			// 奖池命中记录
	winloserecord []*WinLoseRecord		// 胜负走势列表
}

func (tf *TexasFightRoom) Stat() int32 { return tf.stat }
func (tf *TexasFightRoom) StatStartTime() int64 { return tf.statstart }
func (tf *TexasFightRoom) IsStateTimeOut(now int64) bool { return now >= tf.stattimeout }
func (tf *TexasFightRoom) AwardPoolSize() int32 { return tf.awardpoolsize }
func (tf *TexasFightRoom) PlayersNum() int32 { return tf.MembersNum() }



// --------------------------------------------------------------------------
/// @brief 初始化
///
/// @param 
// --------------------------------------------------------------------------
func (tf *TexasFightRoom) Init() string {
	tconf, ok := tbl.HundredWarBase.HundredWarById[tf.tid]
	if ok == false {
		log.Error("[百人大战] not found room tconf[%d]", tf.tid)
		return "找不到房间配置"
	}
	tf.tconf = tconf
	tf.subkind = tconf.Type
	tf.stat = kStatWaitNextRound
	tf.statstart = util.CURTIME()
	tf.stattimeout = tf.statstart + int64(tf.tconf.TimeOut)
	Redis().SAdd(def.RoomAgentLoadRedisKey(RoomSvr().Name()), tf.Id())

	tf.ticker1s = util.NewGameTicker(1 * time.Second, tf.Handler1sTick)
	tf.ticker100ms = util.NewGameTicker(100 * time.Millisecond, tf.Handler100msTick)
	tf.ticker1s.Start()
	tf.ticker100ms.Start()
	
	tf.sitplayers = make([]*TexasFightPlayer, tconf.Seat+1)	// +1 庄家位
	tf.players = make(map[int64]*TexasFightPlayer)

	tf.bankerqueue = make([]*TexasFightPlayer, 0)
	tf.bankersys = NewTexasFightPlayer(nil, true)
	tf.banker = tf.bankersys

	tf.awardpoolsize = 0
	tf.betstat.Init(tconf.Seat+1)	// +1 庄家位
	tf.poolhit.Init()
	tf.winloserecord = make([]*WinLoseRecord, 0)


	// 初始下注池
	tf.betpool = [kBetPoolNum]*TexasFightBetPool{}
	for i := int32(0); i < kBetPoolNum; i++ {
		betpool := &TexasFightBetPool{}
		betpool.Init(i)
		tf.betpool[i] = betpool
	}

	// 初始52张牌
	cards, index := [kMaxCardNum]*Card{}, 0
	for i := int32(0); i < int32(SUITSIZE); i++{
		for j := int32(0); j < int32(CARDRANK); j++{
			cards[index] = NewCard(i, j)
			index++
		}
	}
	tf.cards = cards

	//
	log.Info("[百人大战] 百人大战初始化成功 Id[%d] 子类型[%d] Tid[%d]", tf.Id(), tf.SubKind(), tf.Tid())
	return ""
}


// 房间销毁
func (tf *TexasFightRoom) OnDestory(now int64) {
	tf.ticker1s.Stop()
	tf.ticker100ms.Stop()
}


// 单局游戏开始
func (tf *TexasFightRoom) OnGameStart() {
}


// 单局游戏结束
func (tf *TexasFightRoom) OnGameOver() {
}


// 玩家进入房间，首次/断线重进
func (tf *TexasFightRoom) UserEnter(u *RoomUser) {
	player := tf.FindPlayer(u.Id())
	if player == nil {
		player = tf.AddPlayer(u)
	}

	// 执行玩家进房间事件
	u.OnEnterRoom(tf)

	//
	infomsg := &msg.GW2C_RetEnterTFRoom{Playerlist:make([]*msg.TFPlayerPos,0) }
	infomsg.State = pb.Int32(tf.Stat())
	infomsg.Statetime = pb.Int64(tf.StatStartTime())
	infomsg.Pool = pb.Int32(tf.AwardPoolSize())
	infomsg.Hwid = pb.Int32(tf.Tid())
	infomsg.Bankergold = pb.Int32(0)
	infomsg.Mybet = make([]int32, kBetPoolNum)
	infomsg.Betlist = make([]*msg.TFBetPoolInfo, 0)

	// 坐下玩家列表
	for k, p := range tf.sitplayers {
		if k == 0 { continue }
		if p == nil { continue }
		situser := &msg.TFPlayerPos{Roleid:pb.Int64(p.Id()), Pos:pb.Int32(p.Seat())}
		infomsg.Playerlist = append(infomsg.Playerlist, situser)
	}

	// 注池信息，只发闲家4个池
	for k, pool := range tf.betpool {
		if k == 0 { continue }
		info := pool.FillBetPoolInfo()
		infomsg.Betlist = append(infomsg.Betlist, info)
	}

	// 自己下注列表
	for k, bet := range player.BetInfo() {
		if bet == nil { continue }
		infomsg.Mybet[k] = bet.Num()
	}

	u.SendClientMsg(infomsg)
	Redis().HSet(fmt.Sprintf("roombrief_%d", tf.Id()), "members", tf.PlayersNum())
	log.Info("[百人大战] 玩家[%s %d] 进入房间[%d]", u.Name(), u.Id(), tf.Id())
}


// 玩家离开房间
func (tf *TexasFightRoom) UserLeave(u *RoomUser) {
	log.Info("[百人大战] 玩家[%s %d] 离开房间[%d] ")

	player := tf.players[u.Id()]
	if player == nil {
		log.Error("[百人大战] 玩家[%s %d] 请求离开房间[%d]，但找不到玩家", u.Name(), u.Id(), tf.Id())
		return
	}

	// 庄家
	if player.Id() == tf.banker.Id() {
		log.Info("[百人大战] 玩家[%s %d] 请求离开房间[%d]，庄家先下庄才能离开", u.Name(), u.Id(), tf.Id())
		return
	}

	if tf.stat == kStatBetting && player.TotalBet() != 0 {
		log.Warn("[百人大战] 玩家[%s %d] 请求离开房间[%d]，下注中不能离开", u.Name(), u.Id(), tf.Id())
		return
	}

	// 座位玩家
	if player.Seat() != -1 {
		posmsg := &msg.RS2C_PushTFPosChange{Pos:pb.Int32(player.Seat()), Roleid:pb.Int64(0), Bankergold:pb.Int32(0) }
		tf.BroadCastMemberMsg(posmsg)
	}

	// 离开上庄排队
	qsize := len(tf.bankerqueue)
	for i:=0; i < qsize; i++ {
		if tf.bankerqueue[i].Id() != u.Id() { continue }
		if i == qsize - 1 { tf.bankerqueue = tf.bankerqueue[:qsize-1]; break }
		tf.bankerqueue = append(tf.bankerqueue[:i], tf.bankerqueue[i+1:]...)
		break
	}

	tf.sitplayers[player.Seat()] = nil
	resp := &msg.RS2C_RetTFLeave{}
	u.SendClientMsg(resp)

	delete(tf.members, u.Id())
	delete(tf.players, u.Id())
	u.OnLeaveRoom()
}


// 棋牌类站起
func (tf *TexasFightRoom) UserStandUp(u *RoomUser) {
	player := tf.players[u.Id()]
	if player == nil {
		log.Error("[百人大战] 玩家[%s %d] 从房间[%d]站起，但找不到玩家", u.Name(), u.Id(), tf.Id())
		return
	}

	if player.Seat() == -1 {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 没有坐下位置[%d]", u.Name(), u.Id(), tf.Id(), player.Seat())
		return
	}

	if player.Seat() == 0 {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 庄家需要先下庄才能站起 ", u.Name(), u.Id(), tf.Id())
		return
	}

	// 座位玩家
	posmsg := &msg.RS2C_PushTFPosChange{Pos:pb.Int32(player.Seat()), Roleid:pb.Int64(0), Bankergold:pb.Int32(0) }
	tf.BroadCastMemberMsg(posmsg)

	//
	tf.sitplayers[player.Seat()] = nil
	player.Sit(-1)

	//u.OnStandUp()
	log.Info("[百人大战] 玩家[%s %d] 房间[%d] 离开位置[%d]", u.Name(), u.Id(), tf.Id(), player.Seat())
}


// 棋牌类坐下
func (tf *TexasFightRoom) UserSitDown(u *RoomUser, seat int32) {
	// 检查位置是否有效
	if seat > int32(len(tf.sitplayers)) || seat < 0 {
		log.Error("[百人大战] 玩家[%s %d] 请求坐下无效的位置seat[%d]", u.Name(), u.Id(), seat)
		return
	}

	if seat == 0 {
		log.Error("[百人大战] 玩家[%s %d] 庄家位置只能上庄", u.Name(), u.Id())
		return
	}

	// 检查座位是否空着
	if tf.sitplayers[seat] != nil {
		u.SendNotify("这个位置已经有人了")
		return
	}

	if u.GetGold() < tf.tconf.SeatGold {
		u.SendNotify("不满足入座最少需要金币")
		return
	}

	// player 指针
	player := tf.FindPlayer(u.Id())
	if player == nil {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 找不到玩家Player", u.Name(), u.Id(), tf.Id())
		return
	}

	player.Sit(seat)
	tf.sitplayers[seat] = player

	resp := &msg.RS2C_RetTFSitDown{}
	u.SendClientMsg(resp)
	//u.OnSitDown(seat, "")
	log.Info("[百人大战] 玩家[%s %d] 坐下房间[%d] 位置[%d]", u.Name(), u.Id(), tf.Id(), seat)
}


// 加载玩家
//func (tf *TexasFightRoom) UserLoad(tmsg *msg.GW2RS_UploadUserBin, gate network.IBaseNetSession) {
//	u := UserMgr().FindUser(tmsg.GetUserid())
//	if u != nil {
//		log.Error("[百人大战] 玩家[%s %d] 个人信息已经存在了", u.Name(), u.Id())
//		return
//	}
//
//	u = UserMgr().CreateRoomUser(tf.Id(), tmsg.Bin, gate, tf.Kind())
//	u.OnPreEnterRoom()
//	log.Info("[百人大战] 玩家[%s %d] 上传个人数据到房间[%d]", u.Name(), u.Id(), tf.Id())
//}


func (tf *TexasFightRoom) Tick(now int64) {
	tf.ticker1s.Run(now)
}


// 玩家断开连接(托管/踢掉)
func (tf *TexasFightRoom) UserDisconnect(u *RoomUser) {
	log.Info("[百人大战] 玩家[%s %d] 网络断开 房间[%d]", u.Name(), u.Id(), tf.Id())
}


// 网关断开
func (tf *TexasFightRoom) GateLeave(sid int) {
}


