
package main

import (
	"time"
	"errors"
	"math/rand"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	//"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
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
	watchers TexasPlayers				//观察者
	state int32							//状态
	winlist TexasPlayers				//赢家列表
	dealerpos int32						//庄家位置
	dealer *TexasPlayer					//庄家
	bigblinder *TexasPlayer				//大盲
	smallblinder *TexasPlayer			//小盲
	bigblindnum int32					//大盲钱
	smallblindnum int32					//小盲钱
	ticker1s *util.GameTicker
	curbet int32						//当前总压注
	restarttime int32	
	pot []int32							// 奖池筹码数, 第一项为主池，其他项(若存在)为边池
	chips []int32						// 玩家最终下注筹码，摊牌时为玩家最终获得筹码
	remain	int32						// 剩余人
	allin int32							// allin人数
	publiccard []int32					// 公共牌
	curactpos int32
	starttime int32
	betpos int32						//当前下注位置
	bettime int32						//当前下注时间
}

func (this *TexasPokerRoom) Id() int64 { return this.id }
func (this *TexasPokerRoom) Kind() int32 { return this.gamekind }

func (this *TexasPokerRoom) PlayersNum() int32{
	return int32(len(this.players))
}

func (this *TexasPokerRoom) CheckPos(pos int32) bool {
	if pos >= this.PlayersNum() {
		return false
	}
	if this.players[pos] != nil {
		return false
	}
	return true
}

func (this *TexasPokerRoom) InGame(player *TexasPlayer) bool {
	for _, p := range this.players {
		if p == player {
			return true
		}
	}
	return false
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
	this.subkind = tconf.Type
	Redis().SAdd(def.RoomAgentLoadRedisKey(RoomSvr().Name()), this.Id())
	this.cards = make(Cards, 0, SUITSIZE * CARDRANK)
	for i := 0; i < SUITSIZE; i++{
		for j := 0; j < CARDRANK; j++{
			c := new(Card)
			c.Suit = int32(i)
			c.Value = int32(j)
			this.cards = append(this.cards, c)
		}
	}
	this.players = make([]*TexasPlayer, 5, 5)
	this.chips = make([]int32, 5, 5)
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
	this.ForEachPlayer(0, func(p *TexasPlayer) bool {
		this.remain++
		return true
	})
	this.SendStartGame()
	this.AnteBet()
	this.BlindBet()
	this.Shuffle()
	this.SetHoleCard()
	this.BetStart(this.bigblinder.pos+1)
	return TPPreFlopBet
}

func (this *TexasPokerRoom) SendStartGame() {
	send := &msg.RS2C_PushNextRoundStart{}
	send.Buttonpos = pb.Int32(this.dealer.pos)
	send.Sblindpos = pb.Int32(this.smallblinder.pos)
	send.Bblindpos = pb.Int32(this.bigblinder.pos)
	send.Sblind = pb.Int32(this.smallblindnum)
	send.Bblind = pb.Int32(this.bigblindnum)
	this.BroadCastRoomMsg(send)
}

func (this *TexasPokerRoom) AnteBet() {
	this.ForEachPlayer(0, func(p *TexasPlayer) bool {
		p.RemoveBankRoll(this.ante)
		return true
	})
}

func (this *TexasPokerRoom) BlindBet() {
	this.smallblinder.Betting(this.smallblindnum)
	this.smallblinder.ChangeState(GSBlind)
	this.bigblinder.Betting(this.bigblindnum)
	this.bigblinder.ChangeState(GSBlind)
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

func (this *TexasPokerRoom) BetStart(pos int32){
	this.ForEachPlayer(pos, func(player *TexasPlayer) bool {
		player.BetStart()
		return false
	})
}

func (this *TexasPokerRoom) OneLoopOver() {
	send := &msg.RS2C_PushOneLoopOver{}
	send.Card = this.publiccard
	send.Potchips = this.pot
	this.BroadCastRoomMsg(send)
}

func (this *TexasPokerRoom) PreFlopBet() int32{
	if this.allin + 1 >= this.remain {
		return TPPreFlopBet
	}
	if this.remain <= 1 {
		return TPShowDown
	}
	if this.AllBetOver() {
		this.CalcGambPool()
		this.OneLoopOver()
		return TPFlop
	}
	return TPPreFlopBet
}

func (this *TexasPokerRoom) Flop() int32{
	card1 := this.Deal()
	card2 := this.Deal()
	card3 := this.Deal()
	this.publiccard = append(this.publiccard, card1.Suit+1)
	this.publiccard = append(this.publiccard, card1.Value+2)
	this.publiccard = append(this.publiccard, card2.Suit+1)
	this.publiccard = append(this.publiccard, card2.Value+2)
	this.publiccard = append(this.publiccard, card3.Suit+1)
	this.publiccard = append(this.publiccard, card3.Value+2)
	this.ForEachPlayer(this.smallblinder.pos, func(p *TexasPlayer) bool {
		p.SetFlop(card1, card2, card3)
		return true
	})
	this.ClearBetOver()
	this.BetStart(this.smallblinder.pos)
	return TPFlopBet
}

func (this *TexasPokerRoom) FlopBet() int32{
	if this.allin + 1 >= this.remain {
		return TPFlopBet
	}
	if this.remain <= 1 {
		return TPShowDown
	}
	if this.AllBetOver() {
		this.CalcGambPool()
		this.OneLoopOver()
		return TPTurn
	}
	return TPFlopBet
}

func (this *TexasPokerRoom) Turn() int32{
	card := this.Deal()
	this.publiccard = append(this.publiccard, card.Suit+1)
	this.publiccard = append(this.publiccard, card.Value+2)
	this.ForEachPlayer(this.smallblinder.pos, func(p *TexasPlayer) bool {
		p.SetTurn(card)
		return true
	})
	this.ClearBetOver()
	this.BetStart(this.smallblinder.pos)
	return TPTurnBet
}

func (this *TexasPokerRoom) TurnBet() int32{
	if this.allin + 1 >= this.remain {
		return TPTurnBet
	}
	if this.remain <= 1 {
		return TPShowDown
	}
	if this.AllBetOver() {
		this.CalcGambPool()
		this.OneLoopOver()
		return TPRiver
	}
	return TPTurnBet
}

func (this *TexasPokerRoom) River() int32{
	card := this.Deal()
	this.publiccard = append(this.publiccard, card.Suit+1)
	this.publiccard = append(this.publiccard, card.Value+2)
	this.ForEachPlayer(this.smallblinder.pos, func(p *TexasPlayer) bool {
		p.SetRiver(card)
		return true
	})
	this.ClearBetOver()
	this.BetStart(this.smallblinder.pos)
	return TPRiverBet
}

func (this *TexasPokerRoom) RiverBet() int32{
	if this.remain <= 1 {
		return TPShowDown
	}
	if this.AllBetOver() {
		//this.CalcGambPool()
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

func (this *TexasPokerRoom) ShowDown() int32{
	this.ForEachPlayer(0, func(player *TexasPlayer) bool {
		player.hand.AnalyseHand()
		return true
	})

	this.restarttime = 3
	pots := this.CalcGambPool()
	this.OneLoopOver()

	for i := range this.chips {
		this.chips[i] = 0
	}

	send := &msg.RS2C_PushOneRoundOver{}
	for k, pot := range pots { // 遍历奖池
		var maxhandlevel int32 = -1
		var maxhandfinalvalue int32 = -1
		// 计算该池子最大牌型和牌值
		for _, pos := range pot.OPos {
			p := this.players[pos]
			if p != nil {
				if p.hand.level > maxhandlevel {
					maxhandlevel = p.hand.level
					maxhandfinalvalue = p.hand.finalvalue
				} else if p.hand.level == maxhandlevel && p.hand.finalvalue > maxhandfinalvalue {
					maxhandfinalvalue = p.hand.finalvalue
				}
			}
		}
		var winners []int
		for _, pos := range pot.OPos {
			p := this.players[pos]
			if p != nil && len(p.hole) > 0 {
				if p.hand.level == maxhandlevel && p.hand.finalvalue == maxhandfinalvalue {
					winners = append(winners, pos)
				}
			}
		}
		if len(winners) == 0 {
			//fmt.Println("!!!no winners!!!")
			return TPShutDown
		}
		var onepot int32 = 0
		potplayer := make([]int64, 0)
		for _, winner := range winners {
			onepot = int32(pot.Pot / len(winners))
			this.chips[winner] += onepot
			player := this.players[winner]
			if player != nil {
				potplayer = append(potplayer, player.owner.Id())
			}

		}
		send.Potlist = append(send.Potlist, &msg.PotInfo{
			Num : pb.Int32(int32(pot.Pot / len(winners))),
			Type : pb.Int32(int32(k)),
			Roleid : potplayer,
		})

	}

	//最终瓜分奖励
	for i := range this.chips {
		if this.players[i] != nil {
			this.players[i].AddBankRoll(this.chips[i])
		}
	}

	for _, player := range this.players {
		send.Handcardlist = append(send.Handcardlist, &msg.HandCardInfo{
			Roleid : pb.Int64(player.owner.Id()),
			Card : player.ToHandCard(),
		})
	}
	this.BroadCastRoomMsg(send)
	return TPRestart
}

func (this *TexasPokerRoom) RestartGame() int32{
	this.restarttime--
	if this.restarttime != 0 {
		return TPRestart
	}
	this.winlist = nil
	this.dealerpos++
	this.dealer = nil
	this.bigblinder = nil
	this.smallblinder = nil
	this.curbet = 0
	this.restarttime = 3
	this.pot = nil
	this.chips = nil
	this.winlist = nil
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
	pots = CalcPot(this.chips)
	this.pot = nil
	for _, pot := range pots {
		this.pot = append(this.pot, int32(pot.Pot))
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

func (this *TexasPokerRoom) FindAllByID(userid int64) *TexasPlayer {
	for _, player := range this.players {
		if player.owner.Id() == userid {
			return player
		}
	}
	for _, player := range this.watchers {
		if player.owner.Id() == userid {
			return player
		}
	}
	return nil
}

func (this *TexasPokerRoom) FindPlayerByID(userid int64) *TexasPlayer {
	for _, player := range this.players {
		if player.owner.Id() == userid {
			return player
		}
	}
	return nil
}

func (this *TexasPokerRoom) AddPlayer(pos int32, player *TexasPlayer) bool {
	if this.players[pos] != nil {
		return false
	}
	this.players[pos] = player
	return true
}

func (this *TexasPokerRoom) DelPlayer(pos int32) {
	this.players[pos] = nil
}

func (this *TexasPokerRoom) AddWatcher(player *TexasPlayer ) {
	for _, v := range this.watchers {
		if v == player {
			return
		}
	}
	this.watchers = append(this.watchers, player)
}

func (this *TexasPokerRoom) DelWatcher(player *TexasPlayer) {
	for k, v := range this.watchers {
		if v == player {
			this.watchers = append(this.watchers[:k], this.watchers[k+1:]...)
			return
		}
	}
}

func (this *TexasPokerRoom) SendRoomInfo(player *TexasPlayer) {
	send := &msg.RS2C_RetEnterRoomInfo{}
	send.Id = pb.Int64(this.Id())
	send.Buttonpos = pb.Int32(this.dealerpos+1)
	send.Potchips = this.pot
	send.Roomid = pb.Int32(this.Tid())
	send.Ante = pb.Int32(0)
	send.Sblind = pb.Int32(this.smallblindnum)
	send.Bblind = pb.Int32(this.bigblindnum)
	send.Pos = pb.Int32(this.curactpos+1)
	send.Postime = pb.Int32(10)
	send.Starttime = pb.Int32(this.starttime)
	send.Publiccard = this.publiccard
	for _, p := range this.players {
		send.Playerlist = append(send.Playerlist, p.ToProto())
	}
	send.Isshowcard = pb.Bool(player.isshowcard)
	send.Handcard = player.ToHandCard()
	player.owner.SendClientMsg(send)
}

func (this *TexasPokerRoom) BuyInGame(uid int64, rev *msg.C2RS_ReqBuyInGame){
	player := this.FindAllByID(uid)
	if player != nil {
		player.BuyInGame(rev)
	}
}

func (this *TexasPokerRoom) ReqFriendGetRoleInfo(uid int64, rev *msg.C2RS_ReqFriendGetRoleInfo){
	player := this.FindAllByID(uid)
	if player != nil {
		player.ReqUserInfo(rev)
	}
}

func (this *TexasPokerRoom) ReqNextRound(uid int64, rev *msg.C2RS_ReqNextRound) {
	player := this.FindAllByID(uid)
	if player != nil {
		player.NextRound(rev)
	}
}

func (this *TexasPokerRoom) ReqAction(uid int64, rev *msg.C2RS_ReqAction) {
	player := this.FindAllByID(uid)
	if player != nil {
		player.Betting(rev.GetNum())
	}
}

func (this *TexasPokerRoom) ReqBrightCard(uid int64, rev *msg.C2RS_ReqBrightCard) {
	player := this.FindAllByID(uid)
	if player != nil {
		player.BrightCard()
	}
}

func (this *TexasPokerRoom) ReqAddCoin(uid int64, rev *msg.C2RS_ReqAddCoin) {
	player := this.FindAllByID(uid)
	if player != nil {
		player.AddCoin()
	}
}


