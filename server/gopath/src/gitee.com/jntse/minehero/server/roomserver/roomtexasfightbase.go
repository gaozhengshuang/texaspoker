package main
import (
	//"sort"
	"fmt"
	"time"
	//"errors"
	//"math/rand"
	"container/list"

	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	//"gitee.com/jntse/gotoolkit/net"

	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
)

// 百人大战重启数据恢复
const (
	TF_RedisTotalAwardPool 		= "TF_TotalAwardPool"		// 总奖池
	TF_RedisAIBankerWinGold		= "TF_AIBankerWinGold"		// AI历史盈利值
	TF_RedisAIBankerLossGold	= "TF_AIBankerLossGold"		// AI历史亏损值
	TF_RedisAIAwardPool 		= "TF_AIAwardPool"			// AI贡献奖池
	TF_RedisPlayerBankerWinGold	= "TF_PlayerBankerWinGold"	// 玩家闲奖池
)

// AI上庄抽水机制
const (
	TF_AIBankerDoNothing = 0	// 什么都不做
	TF_AIBankerPump = 1			// 抽水
	TF_AIBankerDump = 2			// 放水
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
	kBetResultLose = 0	// 负
	kBetResultWin = 1	// 胜
	kBetResultTie = 2	// 平
)


// 百人大战子类型
const (
	kTexasFightHappyMode = 1	// 欢乐场
	kTexasFightRichMode = 2		// 富豪场
)

// 玩家庄家下庄类型
const (
	kPlayerBankerNormal = 0		// 默认状态
	kPlayerBankerQuit = 1			// 主动退出
	kPlayerBankerNotSatisfied = 2	// 条件不满足,钱不够/次数上限
)

// --------------------------------------------------------------------------
/// @brief 百人大战玩家
///
///
// --------------------------------------------------------------------------
type TFPlayerBet struct {
	pos int32		// 下注位置
	num int64		// 下注数量
	profit int64	// 池利润，大于0盈利，小于0亏损
}
func (b *TFPlayerBet) Pos() int32 { return b.pos }
func (b *TFPlayerBet) Num() int64 { return b.num }
func (b *TFPlayerBet) Profit() int64 { return b.profit }
func (b *TFPlayerBet) SetProfit(n int64) { b.profit = n }

type SortFightPlayer []*TexasFightPlayer
func (a SortFightPlayer) Len() int { return len(a) }
func (a SortFightPlayer) Swap(i, j int) { a[i], a[j] = a[j], a[i] }
func (a SortFightPlayer) Less(i, j int) bool { return a[i].TimeCreate() < a[j].TimeCreate() }

type AIPlayerBetTrigger struct {
	aibetnum int64
	aibetpos int32
	aibettime int64
}

func (t *AIPlayerBetTrigger) Stop() {
	t.aibetnum  = 0
	t.aibetpos  = -1
	t.aibettime = 0
}

func (t *AIPlayerBetTrigger) IsValid() bool {
	return t.aibettime != 0 
}

func (t *AIPlayerBetTrigger) IsTimeOut(now int64) bool {
	return now >= t.aibettime * 1000
}

type TexasFightPlayer struct {
	sysflag bool		// 系统庄家
	tmcreate int64		// 创建时间戳
	owner *RoomUser		// 系统庄家时为nil
	seat int32			// 坐下位置，0是庄家位置，-1表示站起没有位置
	totalbet int64 		// 总下注额，0未下任何注
	betlist	[kBetPoolNum]*TFPlayerBet	// 下注列表
	totalprofit int64 	// 本轮总利润,大于0盈利，小于0亏损
	watchcount	int32	// 连续观战计数，大于一定次数踢出房间

	bankerround int32	// 玩家坐庄轮数
	bankerstat int32 	// 庄家标志 0默认状态，1主动退出，2条件不满足退出

	aibettrigger []*AIPlayerBetTrigger	// AI闲家下注触发器，分散下注
}

func NewTexasFightPlayer(u *RoomUser, sysflag bool) *TexasFightPlayer {
	p := &TexasFightPlayer{}
	p.sysflag = sysflag
	p.tmcreate = util.CURTIME()
	p.owner = u
	p.seat = -1
	p.watchcount = 0

	p.bankerround = 0
	p.bankerstat = kPlayerBankerNormal
	return p
}

func (p *TexasFightPlayer) Reset() {
	p.betlist = [kBetPoolNum]*TFPlayerBet{}
	p.totalbet = 0
	p.totalprofit = 0
	if p.IsAI() == true {
		p.ClearAIBetTrigger()
	}
}

func (p *TexasFightPlayer) TimeCreate() int64 { return p.tmcreate }
func (p *TexasFightPlayer) IsSystem() bool { return p.sysflag }
func (p *TexasFightPlayer) Seat() int32 { return p.seat }
func (p *TexasFightPlayer) Sit(seat int32) { p.seat = seat }
func (p *TexasFightPlayer) BankerRound() int32 { return p.bankerround }
func (p *TexasFightPlayer) AddBankerRound(n int32) { p.bankerround += n }
func (p *TexasFightPlayer) ResetBankerRound() { p.bankerround = 0 }
func (p *TexasFightPlayer) BetInfo() [kBetPoolNum]*TFPlayerBet { return p.betlist }
func (p *TexasFightPlayer) TotalBet() int64 { return p.totalbet }
func (p *TexasFightPlayer) TotalProfit() int64 { return p.totalprofit }
func (p *TexasFightPlayer) IncTotalProfit(n int64) { p.totalprofit += n }
func (p *TexasFightPlayer) WatchCount() int32 { return p.watchcount }
func (p *TexasFightPlayer) SetWatchCount(n int32) { p.watchcount = n }
func (p *TexasFightPlayer) SetBankerStat(f int32) { p.bankerstat = f }
func (p *TexasFightPlayer) BankerStat() int32 { return p.bankerstat }
func (p *TexasFightPlayer) IsBanker() bool { return p.seat == 0 }
func (p *TexasFightPlayer) IsAI() bool { return p.owner.IsAI() }


func (p *TexasFightPlayer) Id() int64 {
	if p.IsSystem() { return 1 }
	return p.owner.Id()
}

func (p *TexasFightPlayer) Name() string {
	if p.IsSystem() { return "萌萌" }
	return p.owner.Name()
}

func (p *TexasFightPlayer) Head() string {
	if p.IsSystem() { return "" }
	return p.owner.Head()
}

func (p *TexasFightPlayer) Sex() int32 {
	if p.IsSystem() { return 2 }
	return p.owner.Sex()
}

func (p *TexasFightPlayer) Gold() int64 {
	if p.IsSystem() { return 88888888 }
	return p.owner.GetGold()
}

func (p *TexasFightPlayer) Bet(pos int32, num int64) {
	if pos >= int32(len(p.betlist)) || pos < 0  {
		return
	}
	if p.betlist[pos] == nil {
		p.betlist[pos] = &TFPlayerBet{pos:pos, num:num}
	}else {
		p.betlist[pos].num += num
	}
	p.SetWatchCount(0)
	p.totalbet += num
	p.owner.RemoveGold(num, "百人大战下注", true)
}

func (p *TexasFightPlayer) AddAIBetTrigger(pos int32, num int64, delay int32) {
	trigger := &AIPlayerBetTrigger{aibetnum : num, aibetpos: pos, aibettime: util.CURTIME() + int64(delay)}
	p.aibettrigger = append(p.aibettrigger, trigger)
}

func (p *TexasFightPlayer) ClearAIBetTrigger() {
	p.aibettrigger = make([]*AIPlayerBetTrigger, 0)
}

func (p *TexasFightPlayer) TickAIBetTrigger(now int64, tf *TexasFightRoom) {
	for _, t := range p.aibettrigger {
		if t.IsValid() == false || t.IsTimeOut(now) == false {
			continue
		}

		if tf.IsBankerCanAfford(t.aibetnum) == false {
			log.Trace("[百人大战] 房间[%d %d] AI[%s %d] 执行AIBetTrigger失败，庄家支付不起", tf.Id(), tf.Round(), p.Name(), p.Id())
			t.Stop()
			continue
		}

		tf.RequestBet(p.owner, t.aibetpos, t.aibetnum)
		t.Stop()
	}
}

func (p *TexasFightPlayer) ExecBetTrigger(tf *TexasFightRoom) {
	for _, t := range p.aibettrigger {
		if t.IsValid() == false {
			continue
		}

		if tf.IsBankerCanAfford(t.aibetnum) == false {
			//log.Trace("[百人大战] 房间[%d %d] AI[%s %d] 执行AIBetTrigger失败，庄家支付不起", tf.Id(), tf.Round(), p.Name(), p.Id())
			t.Stop()
			continue
		}

		tf.RequestBet(p.owner, t.aibetpos, t.aibetnum)
		t.Stop()
	}
}


// 成为庄家
func (p *TexasFightPlayer) BecomeBanker(tf *TexasFightRoom) {
	p.Sit(0)
	p.ResetBankerRound()
	p.SetBankerStat(kPlayerBankerNormal)
	tf.banker = p
	tf.sitplayers[0] = tf.banker
	p.AddBankerRound(1)
}

// 离开庄家
func (p *TexasFightPlayer) QuitBanker(tf *TexasFightRoom) {
	p.Sit(-1)
	p.ResetBankerRound()
	if elem := tf.bankerqueue.Front(); elem != nil && !p.IsSystem() {
		tf.bankerqueue.Remove(elem)
	}
}

// 输赢结算
func (p *TexasFightPlayer) Settle(tf *TexasFightRoom) {

	// 玩家庄家在BankerSettle中结算
	if p.IsBanker() {
		return
	}

	bankerpool := tf.betpool[0]			// 庄家池
	for k, bet := range p.betlist {
		if k == 0 || bet == nil { continue }
		pool, profit := tf.betpool[k], int64(0)
		switch pool.Result() {
			case kBetResultLose:	profit = bankerpool.WinOdds() * bet.Num()
			case kBetResultWin:		profit = pool.WinOdds() * bet.Num()
			case kBetResultTie:		profit = 0
		}

		// 赢钱要扣税
		if profit != 0 {
			if pool.Result() == kBetResultLose {
				bet.SetProfit(profit)
				p.totalprofit -= profit
				if tf.banker.IsAI() == true && p.IsAI() == false {
					tf.IncAIBankerWinGold(profit)
				}
			}else {
				taxrate, pumprate := float64(tf.tconf.TaxRate), float64(tbl.TexasFight.SystemPumpRate) / 100.0
				srcprofit := profit
				deduct := float64(profit) * ( taxrate + pumprate)
				if deduct != 0 {
					tax := deduct * taxrate / (taxrate + pumprate)
					tf.IncAwardPool(int64(tax))
					if tf.banker.IsAI() == true { tf.IncAIAwardPool(int64(tax)) }
					profit -= int64(deduct)
				}
				bet.SetProfit(profit)
				p.totalprofit += profit
				if tf.banker.IsAI() == true && p.IsAI() == false {
					tf.IncAIBankerLossGold(srcprofit)
				}
			}
		}

		// TODO: 将押注筹码归还玩家
		p.owner.AddGold(bet.Num(), "百人大战押注归还", false)
	}

	//
	if p.totalprofit > 0 {
		p.owner.AddGold(p.totalprofit, "百人大战玩家获胜", false)
	}else if p.totalprofit < 0 {
		p.owner.RemoveGold(p.totalprofit * -1, "百人大战玩家失败", false)
	}

	// 同步金币到客户端
	p.owner.SendPropertyChange()
}


func (p *TexasFightPlayer) FillPlayerInfo() *msg.TFPlayer {
	info := &msg.TFPlayer{}
	info.Roleid = pb.Int64(p.Id())
	info.Name = pb.String(p.Name())
	info.Head = pb.String(p.Head())
	info.Sex = pb.Int32(p.Sex())
	info.Gold = pb.Int64(p.Gold())
	info.Pos = pb.Int32(p.Seat())
	return info
}

func (p *TexasFightPlayer) FillRankPlayerInfo() *msg.TFRankPlayer {
	info := &msg.TFRankPlayer{}
	info.Num = pb.Int64(p.TotalProfit())
	info.Roleid = pb.Int64(p.Id())
	info.Head = pb.String(p.Head())
	return info
}

//  被踢出房间
func (p *TexasFightPlayer) OnKickOut() {
	send := &msg.RS2C_PushTFPlayerKickOut{Id:pb.Int64(p.Id())}
	p.owner.SendClientMsg(send)
}

// --------------------------------------------------------------------------
/// @brief 百人大战下注池
///
///
// --------------------------------------------------------------------------
//type SortTexasFightBetPool []*TexasFightBetPool
//func (a SortTexasFightBetPool) Len() int { return len(a) }
//func (a SortTexasFightBetPool) Swap(i, j int) { a[i], a[j] = a[j], a[i] }
//func (a SortTexasFightBetPool) Less(i, j int) bool { 
//	return a[i].CardLevel() >= a[j].CardLevel() 
//}

type TexasFightBetPool struct {
	tconf *table.HundredWarCardTypeDefine
	cards [kHandCardNum]*Card	// 牌信息
	hand Hand		// 手牌分析
	total int64		// 总下注额
	playerbet int64	// 玩家下注额，排除AI下注
	pos int32		// 注池位置
	result int32	// 胜负平结果
	awardpool int64	// 本次获得奖池金额
}

func (t *TexasFightBetPool) Init(pos int32) {
	t.total = 0
	t.playerbet = 0
	t.pos = pos
	t.cards = [kHandCardNum]*Card{}
	//t.players = make(map[int64]*TexasFightPlayer)
	t.hand.Init()
	t.tconf = nil
}

func (t *TexasFightBetPool) IncBet(n int64) { t.total += n }
func (t *TexasFightBetPool) IncPlayerBet(n int64) { t.playerbet += n }
func (t *TexasFightBetPool) BetNum() int64 { return t.total }
func (t *TexasFightBetPool) PlayerBetNum() int64 { return t.playerbet }
func (t *TexasFightBetPool) AIBetNum() int64 { return t.total - t.playerbet }
func (t *TexasFightBetPool) Pos() int32 { return t.pos }
func (t *TexasFightBetPool) Result() int32 { return t.result }
func (t *TexasFightBetPool) SetResult(r int32) { t.result = r }
func (t *TexasFightBetPool) CardValue() int32 { return t.hand.GetFightValue() }
func (t *TexasFightBetPool) CardLevel() int32 { return t.hand.GetFightLevel() }
func (t *TexasFightBetPool) SetAwardPool(n int64) { t.awardpool = n }
func (t *TexasFightBetPool) AwardPool() int64 { return t.awardpool }


func (t *TexasFightBetPool) Reset() {
	t.total = 0
	t.playerbet = 0
	t.result = 0
	t.awardpool = 0
	t.cards  = [kHandCardNum]*Card{}
	t.hand.Init()
}

func (t *TexasFightBetPool) Cards() []*Card {
	tmp := make([]*Card, len(t.cards))
	for i, card := range t.cards {
		tmp[i] = card
	}
	return tmp
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

	//
	conf, ok := tbl.HundredWarCardTypeBase.HundredWarCardTypeById[t.CardLevel()]
	if ok == false {
		log.Error("[百人大战] 牌力[%d] 倍率配置查找失败", t.CardLevel())
		return
	}
	t.tconf = conf
}

// 胜利倍率
func (t *TexasFightBetPool) WinOdds() int64 { 
	if t.tconf != nil { 
		return int64(t.tconf.Odds)
	} 
	return 0
}

func (t *TexasFightBetPool) FillBetPoolInfo() *msg.TFBetPoolInfo {
	info := &msg.TFBetPoolInfo{Bet:pb.Int64(t.total), Pos:pb.Int32(t.pos), Cards:make([]int32, 0)}
	for _, card := range t.cards {
		if card == nil { continue }		// 还没有发牌
		info.Cards = append(info.Cards, card.Suit+1)	// 客户端颜色从1开始
		info.Cards = append(info.Cards, card.Value+2)	// 客户端数值从2开始
	}
	return info
}

// 大小比较
func (t *TexasFightBetPool) Compare(pool *TexasFightBetPool) int32 {
	if t.CardLevel() > pool.CardLevel() {
		return kBetResultWin
	}else if t.CardLevel() < pool.CardLevel() {
		return kBetResultLose
	}else {
		if t.CardValue() > pool.CardValue() {
			return kBetResultWin
		}else if t.CardValue() < pool.CardValue() {
			return kBetResultLose
		}
	}
	return kBetResultTie
}



// --------------------------------------------------------------------------
/// @brief 坐下玩家下注池临时统计
/// 
/// 
// --------------------------------------------------------------------------
type SitPlayerBetInfo struct {
	seat int32					// 座位号
	poolbet [kBetPoolNum]int64	// 注池下注额
}
type BetPoolTempStat struct {
	seats []*SitPlayerBetInfo	// 坐下玩家下注统计
	poolroles [kBetPoolNum]map[int64]int64		// 下注玩家列表
	maxseat int32
	dirty bool
}
func (s *BetPoolTempStat) Dirty() bool { return s.dirty }
func (s *BetPoolTempStat) Mark() { s.dirty = true }
func (s *BetPoolTempStat) Init(maxseat int32) {
	s.maxseat = maxseat
	s.seats = make([]*SitPlayerBetInfo, s.maxseat)
	s.poolroles = [kBetPoolNum]map[int64]int64{}
	s.dirty = false
}
func (s *BetPoolTempStat) Reset() {
	s.seats = make([]*SitPlayerBetInfo, s.maxseat)
	s.poolroles = [kBetPoolNum]map[int64]int64{}
	s.dirty = false
}
func (s *BetPoolTempStat) Collect(p *TexasFightPlayer, betpos int32, num int64) {
	if p == nil || betpos >= kBetPoolNum || betpos < 0 {
		return
	}

	s.Mark()
	if s.poolroles[betpos] == nil { s.poolroles[betpos] = make(map[int64]int64) }
	s.poolroles[betpos][p.Id()] = p.Id()

	if seat := p.Seat(); seat != -1 {
		if s.seats[seat] == nil { s.seats[seat] = &SitPlayerBetInfo{} }
		s.seats[seat].seat = seat
		s.seats[seat].poolbet[betpos] += num
	}
}

// --------------------------------------------------------------------------
/// @brief 奖池命中记录
/// 
/// 
// --------------------------------------------------------------------------
type AwardPoolHitRecord struct {
	cards [kHandCardNum]*Card
	gold int64
	time int64
	players []*msg.TFPlayer		//TODO: 可优化，人数很多时数据块可能会很大
}

func (a *AwardPoolHitRecord) Init() {
	a.cards = [kHandCardNum]*Card{}
	a.gold = 0
	a.time = 0
	a.players = make([]*msg.TFPlayer, 0)
}

func (a *AwardPoolHitRecord) Replace(pool *TexasFightBetPool, tf *TexasFightRoom) {
	a.Init()
	for k, card := range pool.cards {
		a.cards[k] = card
	}
	a.gold = pool.AwardPool()		// 从奖池拿走金额
	a.time = util.CURTIME()

	// 庄家
	if pool.Pos() == 0 {
		a.players = append(a.players, tf.banker.FillPlayerInfo())
		return
	}

	// 非庄家
	for _, p := range tf.players {
		if p.betlist[pool.Pos()] == nil { 
			continue
		}
		a.players = append(a.players, p.FillPlayerInfo())
	}
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

// AI奖池抽水
type AIAwardPoolPump struct {
	size int64				// AI贡献奖池
	poolpos int32			// AI贡献奖池 本轮抽水位置
	pumprate float64		// AI贡献奖池 本轮抽水比
	usedgold int64			// AI本轮已经使用的玩家下注量
}

func (a *AIAwardPoolPump) Reset() {
	a.poolpos = -1
	a.pumprate = 0
	a.usedgold = 0
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
	statstart int64		// 状态开始时间，秒
	stattimeout int64	// 状态超时时间，秒
	round int64			// 回合计数

	players map[int64]*TexasFightPlayer		// 所有玩家
	sitplayers []*TexasFightPlayer			// 坐下玩家列表
	aiplayers map[int64]*TexasFightPlayer	// ai玩家

	//bankerqueue []*TexasFightPlayer	// 做庄排队列表
	bankerqueue *list.List 				// 做庄排队列表
	banker *TexasFightPlayer			// 庄家
	bankersys *TexasFightPlayer			// 系统庄家

	totalawardpool int64				// 总奖池大小
	betpool [kBetPoolNum]*TexasFightBetPool		// 押注池，0庄家，闲家从左到右1-4
	cards [kMaxCardNum]*Card			// 52张牌
	betstat BetPoolTempStat				// 下注池临时统计
	awardhit AwardPoolHitRecord			// 奖池命中记录
	history *list.List					// 胜负历史记录列表

	// AI 规则
	aibankerpumpflag bool				// AI banker 抽水机制
	aibankerwingold int64				// AI banker 历史盈利值(不计亏损)
	aibankerlossgold int64				// AI banker 历史亏损值(不计盈利)
	playerbankerwingold int64			// 玩家banker 历史盈利值(不计亏损)
	aiawardpool AIAwardPoolPump			// AI 贡献奖池
}

func (tf *TexasFightRoom) Stat() int32 { return tf.stat }
func (tf *TexasFightRoom) IsStateTimeOut(now int64) bool { return now >= tf.stattimeout }
func (tf *TexasFightRoom) TotalAwardPool() int64 { return tf.totalawardpool }
func (tf *TexasFightRoom) IncAwardPool(n int64) { tf.totalawardpool += n }
func (tf *TexasFightRoom) DecAwardPool(n int64) { tf.totalawardpool -= n }
func (tf *TexasFightRoom) PlayersNum() int32 { return tf.MembersNum() }
func (tf *TexasFightRoom) Round() int64 { return tf.round }

func (tf *TexasFightRoom) AIBankerWinGold() int64 { return tf.aibankerwingold }
func (tf *TexasFightRoom) AIBankerLossGold() int64 { return tf.aibankerlossgold }
func (tf *TexasFightRoom) IncAIBankerWinGold(n int64) { tf.aibankerwingold += n }
func (tf *TexasFightRoom) IncAIBankerLossGold(n int64) { tf.aibankerlossgold += n }

func (tf *TexasFightRoom) PlayerBankerWinGold() int64 { return tf.playerbankerwingold }
func (tf *TexasFightRoom) IncPlayerBankerWinGold(n int64) { tf.playerbankerwingold += n }
func (tf *TexasFightRoom) DecPlayerBankerWinGold(n int64) { tf.playerbankerwingold = util.MaxInt64(tf.playerbankerwingold - n, 0) }

func (tf *TexasFightRoom) AIAwardPool() int64 { return tf.aiawardpool.size }
func (tf *TexasFightRoom) IncAIAwardPool(n int64) { tf.aiawardpool.size += n }
func (tf *TexasFightRoom) DecAIAwardPool(n int64) { tf.aiawardpool.size = util.MaxInt64(tf.aiawardpool.size - n, 0) }


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
	
	tf.sitplayers 	= make([]*TexasFightPlayer, tconf.Seat+1)	// +1 庄家位
	tf.players 		= make(map[int64]*TexasFightPlayer)
	tf.aiplayers 	= make(map[int64]*TexasFightPlayer)


	//tf.bankerqueue = make([]*TexasFightPlayer, 0)
	tf.bankerqueue = list.New()
	tf.bankersys = NewTexasFightPlayer(nil, true)
	tf.bankersys.Sit(0)
	tf.banker = tf.bankersys
	tf.sitplayers[0] = tf.banker

	tf.totalawardpool = 0
	tf.betstat.Init(tconf.Seat+1)	// +1 庄家位
	tf.awardhit.Init()
	//tf.history = make([]*WinLoseRecord, 0)
	tf.history = list.New()


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

	// AI 加入房间
	tf.InitAIPlayers()
	tf.aibankerpumpflag = false

	// 加载持久化数据
	tf.DBLoad()

	// AI 进入上庄列表
	tf.SelectAIEnterBankerQueue()
	tf.banker.QuitBanker(tf)
	tf.PlayerBankerAppointCheck()

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
		player = tf.AddNewPlayer(u)
		tf.members[u.Id()] = u
	}

	// 执行玩家进房间事件
	u.OnEnterRoom(tf)

	//
	infomsg := &msg.GW2C_RetEnterTFRoom{Playerlist:make([]*msg.TFPlayer,0) }
	infomsg.State = pb.Int32(tf.Stat())
	infomsg.Statetime = pb.Int64(tf.statstart)
	infomsg.Pool = pb.Int64(tf.TotalAwardPool())
	infomsg.Hwid = pb.Int32(tf.Tid())
	infomsg.Bankergold = pb.Int64(0)
	infomsg.Mybet = make([]int64, kBetPoolNum)
	infomsg.Betlist = make([]*msg.TFBetPoolInfo, 0)

	// 坐下玩家列表
	for _, p := range tf.sitplayers {
		if p == nil { continue }
		//situser := &msg.TFPlayerPos{Roleid:pb.Int64(p.Id()), Pos:pb.Int32(p.Seat())}
		//infomsg.Playerlist = append(infomsg.Playerlist, situser)
		infomsg.Playerlist = append(infomsg.Playerlist, p.FillPlayerInfo())
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
	log.Info("[百人大战] 玩家[%s %d] 进入房间[%d %d]", u.Name(), u.Id(), tf.Id(), tf.Round())
}


// 玩家离开房间
func (tf *TexasFightRoom) UserLeave(u *RoomUser) {
	log.Info("[百人大战] 玩家[%s %d] 离开房间[%d %d] ", u.Name(), u.Id(), tf.Id(), tf.Round())

	player := tf.players[u.Id()]
	if player == nil {
		log.Error("[百人大战] 玩家[%s %d] 请求离开房间[%d %d]，但找不到玩家", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	// 庄家
	if player.IsBanker() {
		log.Info("[百人大战] 玩家[%s %d] 请求离开房间[%d %d]，庄家先下庄才能离开", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	if tf.stat == kStatBetting && player.TotalBet() != 0 {
		log.Warn("[百人大战] 玩家[%s %d] 请求离开房间[%d %d]，下注中不能离开", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	// 座位玩家先站起
	if player.Seat() != -1 {
		tf.UserStandUp(u)
	}

	// 离开上庄排队
	tf.BankerQueueRemoveElem(u.Id())

	//
	resp := &msg.RS2C_RetTFLeave{}
	u.SendClientMsg(resp)
	delete(tf.members, u.Id())
	delete(tf.players, u.Id())

	//
	u.OnLeaveRoom()
}


// 棋牌类站起
func (tf *TexasFightRoom) UserStandUp(u *RoomUser) {
	player := tf.players[u.Id()]
	if player == nil {
		log.Error("[百人大战] 玩家[%s %d] 从房间[%d %d]站起，但找不到玩家", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	seat := player.Seat()
	if seat == -1 {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 没有坐下不需要站起", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	if seat == 0 {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 庄家不能站起，只能下庄", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	//
	tf.sitplayers[player.Seat()] = nil
	player.Sit(-1)
	u.SendClientMsg(&msg.RS2C_ReqTFStandUp{})

	// 座位玩家
	posmsg := &msg.RS2C_PushTFPosChange{Bankergold:pb.Int64(0), Player:&msg.TFPlayer{}}
	posmsg.Player = player.FillPlayerInfo()
	posmsg.Player.Pos = pb.Int32(seat)
	posmsg.Player.Roleid = pb.Int64(0)
	tf.BroadCastMemberMsg(posmsg)

	//u.OnStandUp()
	log.Info("[百人大战] 玩家[%s %d] 房间[%d %d] 离开位置[%d]", u.Name(), u.Id(), tf.Id(), tf.Round(), seat)
}


// 棋牌类坐下
func (tf *TexasFightRoom) UserSitDown(u *RoomUser, seat int32) {
	// 检查位置是否有效
	maxseat := int32(len(tf.sitplayers))
	if seat >= maxseat || seat < 0 {
		log.Error("[百人大战] 玩家[%s %d] 请求坐下无效的位置seat[%d]", u.Name(), u.Id(), seat)
		return
	}

	if seat == 0 {
		log.Error("[百人大战] 玩家[%s %d] 庄家位只能通过上庄坐下", u.Name(), u.Id())
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
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 找不到玩家Player", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	if player.IsBanker() {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 正在坐庄中", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	if player.Seat() != -1 {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 已经有座位了", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	player.Sit(seat)
	tf.sitplayers[seat] = player
	u.SendClientMsg(&msg.RS2C_RetTFSitDown{})

	posmsg := &msg.RS2C_PushTFPosChange{Bankergold:pb.Int64(0), Player:&msg.TFPlayer{}}
	posmsg.Player = player.FillPlayerInfo()
	tf.BroadCastMemberMsg(posmsg)

	//u.OnSitDown(seat, "")
	log.Info("[百人大战] 玩家[%s %d] 房间[%d %d] 坐下位置[%d]", u.Name(), u.Id(), tf.Id(), tf.Round(), seat)
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
//	log.Info("[百人大战] 玩家[%s %d] 上传个人数据到房间[%d %d]", u.Name(), u.Id(), tf.Id(), tf.Round())
//}


func (tf *TexasFightRoom) Tick(now int64) {
	tf.ticker1s.Run(now)
}


// 玩家断开连接(托管/踢掉)
func (tf *TexasFightRoom) UserDisconnect(u *RoomUser) {
	log.Info("[百人大战] 玩家[%s %d] 网络断开 房间[%d %d]", u.Name(), u.Id(), tf.Id(), tf.Round())
}


// 网关断开
func (tf *TexasFightRoom) GateLeave(sid int) {
}


