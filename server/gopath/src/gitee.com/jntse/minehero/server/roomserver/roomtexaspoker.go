package main

import (
	"time"
	"errors"
	"math/rand"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	//"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	//"gitee.com/jntse/gotoolkit/net"
)

const (
	TPWait int32 = iota
	TPPreFlopBet                     
	TPFlop
	TPFlopBet
	TPTurn
	TPTurnBet
	TPRiver
	TPRiverBet
	TPShowDown
	TPRestart
	TPShutDown
)


type TexasPokerRoom struct {
	RoomBase
	tconf *table.TexasRoomDefine
	ante int32
	cards Cards							//52张牌
	topCardIndex int32					//当前牌顶
	initilized bool						//是否已经初始化
	players TexasPlayers				//参与玩家
	gambpool int32						//总奖池
	state int32							//状态
	winlist TexasPlayers				//赢家列表
	maxhandlevel int32					//最大牌型
	maxhandfinalvalue int32				//最大价值
	dealerpos int32						//庄家位置
	dealer *TexasPlayer					//庄家
	bigblinder *TexasPlayer				//大盲
	smallblinder *TexasPlayer			//小盲
	bigblindnum int32					//大盲钱
	smallblindnum int32					//小盲钱
	ticker1s *util.GameTicker
	curbet int32						//当前总压注
	restarttime int32	
	Pot []int32							// 奖池筹码数, 第一项为主池，其他项(若存在)为边池
	PotList PotDetails					// 奖池 详细信息
	Chips []int32						// 玩家最终下注筹码，摊牌时为玩家最终获得筹码		
}

func (this *TexasPokerRoom) Id() int64 { return this.id }
func (this *TexasPokerRoom) Kind() int32 { return this.gamekind }

func (this *TexasPokerRoom) PlayersNum() int32{
	return int32(len(this.players))
}

/*
初始化牌组
对于花色：0代表黑桃、1代表红桃、2代表梅花、3代表方块，详见card包
对于值：0代表two，1代表three .. 12代表A
*/
func (this *TexasPokerRoom) Init() string {
	tconf, ok := tbl.TexasRoomBase.TexasRoomById[this.tid]
	if ok == false {
		log.Error("[房间] not found room tconf[%d]", this.tid)
		return "找不到房间配置"
	}
	this.tconf = tconf
	this.cards = make(Cards, 0, SUITSIZE * CARDRANK)
	for i := 0; i < SUITSIZE; i++{
		for j := 0; j < CARDRANK; j++{
			c := new(Card)
			c.Suit = int32(i)
			c.Value = int32(j)
			this.cards = append(this.cards, c)
		}
	}
	this.topCardIndex = 0
	this.initilized = true
	this.bigblindnum = 20
	this.smallblindnum = 10
	this.restarttime = 3
	this.ticker1s = util.NewGameTicker(1 * time.Second, this.Handler1sTick)
	return ""
}

/*
洗牌！！游戏每次开始时候调用，允许多次调用。
随机序列生成的逻辑是这样的：
从后往前，N个数为例。
先生成一0~~N-1的随机数i，然后置换i和N之间的位置
同理处理N-1....
*/
func (this *TexasPokerRoom) Shuffle() error{
	if this.initilized == false{
		return errors.New("you must init DealMachine first")
	}
	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)
	for i := len(this.cards)-1; i >0 ; i--{
		index := r.Int()%i
		this.SwapCard(int32(i), int32(index))
	}
	this.topCardIndex = 0;
	return nil
}


/*
调用此函数发一张牌
*/
func (this *TexasPokerRoom) Deal() *Card{
	c := this.cards[this.topCardIndex]
	this.topCardIndex++
	if int(this.topCardIndex) == len(this.cards){
		this.Shuffle()
	}
	res := new(Card)
	res.Suit = c.Suit
	res.Value = c.Value
	return res
}

func (this *TexasPokerRoom) SwapCard(a int32, b int32){
	tmp := this.cards[a]
	this.cards[a] = this.cards[b]
	this.cards[b] = tmp
}

//从start开始
func (this *TexasPokerRoom) ForEachPlayer(start int32, f func(p *TexasPlayer) bool) {
	end := (this.PlayersNum() + start - 1) % this.PlayersNum()
	i := start
	for ; i != end; i = (i + 1) % this.PlayersNum() {
		if this.players[i] != nil && !this.players[i].IsFold() && !this.players[i].IsWait() && !f(this.players[i]) {
			return
		}
	}
	// end
	if this.players[i] != nil && !this.players[i].IsFold() && !this.players[i].IsWait(){
		f(this.players[i])
	}
}

func (this *TexasPokerRoom) StartGame() int32 {
	if this.PlayersNum() < 2 {
		return TPWait
	}
	if !this.SetDealer() {
		return TPWait
	}
	if !this.SetSmallBlind() {
		return TPWait
	}
	if !this.SetBigBlind() {
		return TPWait
	}
	this.BlindBet()
	this.Shuffle()
	this.SetHoleCard()
	return TPPreFlopBet
}

func (this *TexasPokerRoom) BlindBet() {
	this.smallblinder.Betting(this.smallblindnum)
	this.bigblinder.Betting(this.bigblindnum)
}

func (this *TexasPokerRoom) SetBigBlind() bool {
	this.bigblinder = this.smallblinder.Next()
	if this.bigblinder != nil {
		return true
	}
	return false
}

func (this *TexasPokerRoom) SetSmallBlind() bool {
	if this.PlayersNum() == 2 { // one-to-one
		this.smallblinder = this.dealer
	}else{
		this.smallblinder = this.dealer.Next()
	}
	if this.smallblinder != nil {
		return true
	}
	return false
}

func (this *TexasPokerRoom) SetDealer() bool {
	this.ForEachPlayer(this.dealerpos, func(p *TexasPlayer) bool {
		this.dealerpos = p.pos
		this.dealer = p
		return false
	})
	if this.dealer != nil {
		return true
	}
	return false
}

func (this *TexasPokerRoom) SetHoleCard() {
	this.ForEachPlayer(this.smallblinder.pos, func(p *TexasPlayer) bool {
		p.SetHole(this.Deal(), this.Deal())
		return true
	})
	this.ClearBetOver()
}

func (this *TexasPokerRoom) PreFlopBet() int32{
	this.ForEachPlayer(this.bigblinder.pos+1, func(player *TexasPlayer) bool {
		player.BetStart()
		if player.BetOver() {
			return true
		}else{
			return false
		}
	})
	if this.AllBetOver() {
		return TPFlop
	}
	return TPPreFlopBet
}

func (this *TexasPokerRoom) Flop() int32{
	this.ForEachPlayer(this.smallblinder.pos, func(p *TexasPlayer) bool {
		p.SetFlop(this.Deal(), this.Deal(), this.Deal())
		return true
	})
	this.ClearBetOver()
	return TPFlopBet
}

func (this *TexasPokerRoom) FlopBet() int32{
	this.ForEachPlayer(this.smallblinder.pos, func(player *TexasPlayer) bool {
		player.BetStart()
		if player.BetOver() {
			return true
		}else{
			return false
		}
	})
	if this.AllBetOver() {
		return TPTurn
	}
	return TPFlopBet
}

func (this *TexasPokerRoom) Turn() int32{
	this.ForEachPlayer(this.smallblinder.pos, func(p *TexasPlayer) bool {
		p.SetTurn(this.Deal())
		return true
	})
	this.ClearBetOver()
	return TPTurnBet
}

func (this *TexasPokerRoom) TurnBet() int32{
	this.ForEachPlayer(this.smallblinder.pos, func(player *TexasPlayer) bool {
		player.BetStart()
		if player.BetOver() {
			return true
		}else{
			return false
		}
	})
	if this.AllBetOver() {
		return TPRiver
	}
	return TPTurnBet
}

func (this *TexasPokerRoom) River() int32{
	this.ForEachPlayer(this.smallblinder.pos, func(p *TexasPlayer) bool {
		p.SetRiver(this.Deal())
		return true
	})
	this.ClearBetOver()
	return TPRiverBet
}

func (this *TexasPokerRoom) RiverBet() int32{
	this.ForEachPlayer(this.smallblinder.pos, func(player *TexasPlayer) bool {
		player.BetStart()
		if player.BetOver() {
			return true
		}else{
			return false
		}
	})
	if this.AllBetOver() {
		return TPShowDown
	}
	return TPRiverBet
}

func (this *TexasPokerRoom) ClearBetOver() {
	this.ForEachPlayer(0, func(player *TexasPlayer) bool {
		player.betover = false
		player.curbet = 0
		return true
	})
	this.curbet = 0
}

func (this *TexasPokerRoom) AllBetOver() bool{
	var tmpcount int32 = 0
	this.ForEachPlayer(0, func(player *TexasPlayer) bool {
		if player.BetOver() {
			tmpcount++
		}
		return true
	})
	if tmpcount == this.PlayersNum() {
		return true
	}
	return false
}

func (this *TexasPokerRoom) AnalyseCard() {
	this.ForEachPlayer(0, func(player *TexasPlayer) bool {
		player.hand.AnalyseHand()
		return true
	})
}

func (this *TexasPokerRoom) ShowDown() int32{
	this.AnalyseCard()
	this.restarttime = 3
	if len(this.winlist) == 0 {
		return TPRestart
	}
	reward := this.gambpool / int32(len(this.winlist))
	for _, player := range this.winlist {
		player.AddChip(reward)
	}
	pots := this.calc()

	for i := range this.chips {
		this.chips[i] = 0
	}

	this.potList = nil

	for _, pot := range pots { // 遍历奖池

		maxHandLevel := -1
		maxHandFinalValue := -1

		// 计算该池子最大牌型和牌值
		for _, pos := range pot.OPos {
			p := t.Players[pos-1]
			if p != nil {
				if p.Hand.Level > maxHandLevel {
					maxHandLevel = p.Hand.Level
					maxHandFinalValue = p.Hand.FinalValue
				} else if p.Hand.Level == maxHandLevel && p.Hand.FinalValue > maxHandFinalValue {
					maxHandFinalValue = p.Hand.FinalValue
				}
			}
		}

		var winners []int

		for _, pos := range pot.OPos {
			p := t.Players[pos-1]
			if p != nil && len(p.Cards) > 0 {
				if p.Hand.Level == maxHandLevel && p.Hand.FinalValue == maxHandFinalValue {
					winners = append(winners, pos)
				}
			}
		}

		if len(winners) == 0 {
			fmt.Println("!!!no winners!!!")
			return
		}
		potDetail := &PotDetail{
			Pot: pot.Pot,
			Ps:  make([]int32, len(t.Chips)),
		}
		for _, winner := range winners {
			potDetail.Ps[winner-1] += int32(pot.Pot / len(winners))
			t.Chips[winner-1] += int32(pot.Pot / len(winners))
			t.gambling.Players[winner-1].Win += pot.Pot / len(winners)
		}
		potDetail.Ps[winners[0]-1] += int32(pot.Pot % len(winners)) // odd chips
		t.Chips[winners[0]-1] += int32(pot.Pot % len(winners))      // odd chips
		t.gambling.Players[winners[0]-1].Win += pot.Pot % len(winners)

		t.PotList = append(t.PotList, potDetail)
	}

	for i := range t.Chips {
		if t.Players[i] != nil {
			t.Players[i].Chips += int(t.Chips[i])
			if t.Players[i].Chips <= t.BigBlind { // 补筹码
				carry := t.MaxCarry/2 - t.Players[i].Chips
				if t.Players[i].CurrChips >= carry {
					t.Players[i].Chips += carry
					t.Players[i].CurrChips -= carry
				} else {
					t.Players[i].Chips += t.Players[i].CurrChips
					t.Players[i].CurrChips = 0
				}
			}
		}

		if t.gambling.Players[i] != nil && t.gambling.Players[i].Id > 0 {
			t.gambling.Players[i].CurrentChips = t.gambling.Players[i].FormerChips + t.gambling.Players[i].Win - t.gambling.Players[i].Bet
		}
	}

	return TPRestart
}

func (this *TexasPokerRoom) RestartGame() int32{
	this.restarttime--
	if this.restarttime != 0 {
		return TPRestart
	}
	this.winlist = nil
	this.gambpool = 0
	this.maxhandlevel = 0
	this.maxhandfinalvalue = 0
	this.dealerpos++
	this.dealer = nil
	this.bigblinder = nil
	this.smallblinder = nil
	this.curbet = 0
	this.restarttime = 3
	this.ForEachPlayer(0, func(player *TexasPlayer) bool {
		player.Init()
		return true
	})
	if this.PlayersNum() >= 2 {
		return TPWait
	}
	return TPShutDown
}

func (this *TexasPokerRoom) PlayerTick() {
	this.ForEachPlayer(0, func(player *TexasPlayer) bool {
		player.Tick()
		return true
	})
}

func (this *TexasPokerRoom) ShutDown() {
}

// 计算奖池
func (this *TexasPokerRoom) CalcGambPool() (pots []handPot) {
	pots = CalcPot(this.Chips)
	this.Pot = nil
	for _, pot := range pots {
		this.Pot = append(this.Pot, int32(pot.Pot))
	}
	return
}

//主循环逻辑
func (this *TexasPokerRoom) Handler1sTick(now int64) {
	this.PlayerTick()
	switch(this.state){
	case TPWait:
		this.state = this.StartGame()
	case TPPreFlopBet:
		this.state = this.PreFlopBet()
	case TPFlop:
		this.state = this.Flop()
	case TPFlopBet:
		this.state = this.FlopBet()
	case TPTurn:
		this.state = this.Turn()
	case TPTurnBet:
		this.state = this.TurnBet()
	case TPRiver:
		this.state = this.River()
	case TPRiverBet:
		this.state = this.RiverBet()
	case TPShowDown:
		this.state = this.ShowDown()
	case TPRestart:
		this.state = this.RestartGame()
	case TPShutDown:
		this.ShutDown()
	}
}


