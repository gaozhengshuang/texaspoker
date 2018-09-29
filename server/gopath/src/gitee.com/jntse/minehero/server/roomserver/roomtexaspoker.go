
package main

import (
	"sort"
	"fmt"
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
	cdtime int32
	cards Cards							//52张牌
	topCardIndex int32					//当前牌顶
	initilized bool						//是否已经初始化
	players TexasPlayers				//参与玩家
	watchers TexasPlayers				//观察者
	state int32							//状态
	dealerpos int32						//庄家位置
	bblindpos int32						//大盲位
	sblindpos int32						//小盲位
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
	bettime int32						//当前下注时间
	maxplayer int32
	overflag bool
	playerstate []int32
	waittime int32						//无人的时间
	raisecount int32					//加注人数
}

func (this *TexasPokerRoom) Id() int64 { return this.id }
func (this *TexasPokerRoom) Kind() int32 { return this.gamekind }

func (this *TexasPokerRoom) PlayersNum() int32{
	var count int32 = 0
	for _, p := range this.players {
		if p != nil {
			count++
		}
	}
	return count
}

func (this *TexasPokerRoom) CheckPos(pos int32) bool {
	if pos > int32(len(this.players)) {
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
	this.maxplayer = tconf.Seat
	this.ante = tconf.Tax
	this.cdtime = tconf.Cd
	this.players = make([]*TexasPlayer, this.maxplayer, this.maxplayer)
	this.chips = make([]int32, this.maxplayer, this.maxplayer)
	this.playerstate = make([]int32, this.maxplayer, this.maxplayer)
	this.topCardIndex = 0
	this.initilized = true
	this.bigblindnum = tconf.BBlind
	this.smallblindnum = tconf.SBlind
	this.restarttime = 5
	this.ticker1s = util.NewGameTicker(1 * time.Second, this.Handler1sTick)
	this.ticker1s.Start()
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

//从start开始 比赛过程中使用
func (this *TexasPokerRoom) ForEachPlayer(start int32, f func(p *TexasPlayer) bool) {
	end := (this.maxplayer + start - 1) % this.maxplayer
	i := start % this.maxplayer
	for ; i != end; i = (i + 1) % this.maxplayer {
		if this.players[i] != nil && !this.players[i].IsFold()&& 
			!this.players[i].IsWait() && 
			!f(this.players[i]) {
			return
		}
	}
	// end
	if this.players[i] != nil && !this.players[i].IsFold() && 
		!this.players[i].IsWait() { 
		f(this.players[i])
	}
}

//开始游戏使用
func (this *TexasPokerRoom) ForStartPlayer(start int32, f func(p *TexasPlayer) bool) {
	end := (this.maxplayer + start - 1) % this.maxplayer
	i := start % this.maxplayer
	for ; i != end; i = (i + 1) % this.maxplayer {
		if this.players[i] != nil && this.players[i].IsWait() &&
		!f(this.players[i]) {
			return
		}
	}
	// end
	if this.players[i] != nil && this.players[i].IsWait() {
		f(this.players[i])
	}
}

func (this *TexasPokerRoom) CanStart() bool {
	count := 0
	for _, p := range this.players {
		if p != nil && p.isready == true {
			count++
		}   
	}
	if count >= 2 {
		return true
	}else{
		if this.HasRealPlayer() {
			this.waittime++
		}
		return false
	}
}

func (this *TexasPokerRoom) StartGame() int32 {
	if this.waittime >= 4 {
		freenum := this.GetFreeNum()
		if freenum != 0 {
			this.CreateAI(util.RandBetween(1, freenum))
		}
	}
	if !this.CanStart() {
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
	this.starttime = int32(util.CURTIME())
	this.SendStartGame()
	this.ForStartPlayer(0, func(p *TexasPlayer) bool {
		p.RemoveBankRoll(this.ante)
		if p == this.bigblinder {
			p.BlindBet(this.bigblindnum, true)
		}else if p == this.smallblinder {
			p.BlindBet(this.smallblindnum, false)
		}else {
			p.ChangeState(GSWaitAction)
		}
		this.remain++
		return true
	})
	this.Shuffle()
	this.SetHoleCard()
	this.BetStart(this.bblindpos+1)
	log.Info("房间%d 开始游戏", this.Id())
	return TPPreFlopBet
}

func (this *TexasPokerRoom) SendStartGame() {
	send := &msg.RS2C_PushNextRoundStart{}
	send.Buttonpos = pb.Int32(this.dealerpos+1)
	send.Sblindpos = pb.Int32(this.sblindpos+1)
	send.Bblindpos = pb.Int32(this.bblindpos+1)
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
	this.bigblinder = this.smallblinder.NextForStart()
	if this.bigblinder != nil {
		this.bblindpos = this.bigblinder.pos
		return true
	}
	return false
}

func (this *TexasPokerRoom) SetSmallBlind() bool {
	if this.PlayersNum() == 2 { // one-to-one
		this.smallblinder = this.dealer
	}else{
		this.smallblinder = this.dealer.NextForStart()
	}
	if this.smallblinder != nil {
		this.sblindpos = this.smallblinder.pos
		return true
	}
	return false
}

func (this *TexasPokerRoom) SetDealer() bool {
	this.ForStartPlayer(this.dealerpos, func(p *TexasPlayer) bool {
		this.dealerpos = p.pos
		this.dealer = p
		log.Info("房间%d 庄家位%d", this.Id(), this.dealerpos)
		return false
	})
	if this.dealer != nil {
		return true
	}
	return false
}

func (this *TexasPokerRoom) SetHoleCard() {
	this.ForEachPlayer(this.sblindpos, func(p *TexasPlayer) bool {
		p.SetHole(this.Deal(), this.Deal())
		return true
	})
}

func (this *TexasPokerRoom) BetStart(pos int32){
	if this.allin + 1 >= this.remain {
		log.Info("房间%d allin人数足够 不在下注", this.Id())
		return
	}
	if this.remain <= 1 {
		log.Info("房间%d remain人数足够 不在下注", this.Id())
		return
	}
	this.raisecount = 0
	this.ForEachPlayer(pos, func(player *TexasPlayer) bool {
		if player.IsAllIn() {
			return true
		}
		player.BetStart()
		return false
	})
}

func (this *TexasPokerRoom) OneLoopOver() {
	send := &msg.RS2C_PushOneLoopOver{}
	send.Card = this.publiccard
	send.Potchips = this.pot
	this.BroadCastRoomMsg(send)
	this.publiccard = make([]int32, 0)
}

func (this *TexasPokerRoom) PreFlopBet() int32{
	if this.remain <= 1 {
		log.Info("房间%d人数1人 直接结束比赛", this.Id())
		this.overflag = true
		return TPShowDown
	}
	if this.AllBetOver() {
		this.CalcGambPool()
		log.Info("房间%d Flop阶段", this.Id())
		return TPFlop
	}
	//log.Info("房间%d PreFlopBet阶段 房间人数%d", this.Id(), this.remain)
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
	this.OneLoopOver()
	this.ForEachPlayer(this.sblindpos, func(p *TexasPlayer) bool {
		p.SetFlop(card1, card2, card3)
		return true
	})
	this.ClearBetOver(true)
	this.BetStart(this.sblindpos)
	log.Info("房间%d Flop阶段", this.Id())
	if this.allin + 1 >= this.remain {
		return TPTurn
	}
	return TPFlopBet
}

func (this *TexasPokerRoom) FlopBet() int32{
	if this.remain <= 1 {
		//log.Info("房间%d人数1人 直接结束比赛", this.Id())
		return TPShowDown
	}
	if this.AllBetOver() {
		this.CalcGambPool()
		log.Info("房间%d Turn阶段", this.Id())
		return TPTurn
	}
	//log.Info("房间%d FlopBet阶段", this.Id())
	return TPFlopBet
}

func (this *TexasPokerRoom) Turn() int32{
	card := this.Deal()
	this.publiccard = append(this.publiccard, card.Suit+1)
	this.publiccard = append(this.publiccard, card.Value+2)
	this.OneLoopOver()
	this.ForEachPlayer(this.sblindpos, func(p *TexasPlayer) bool {
		p.SetTurn(card)
		return true
	})
	this.ClearBetOver(true)
	this.BetStart(this.sblindpos)
	log.Info("房间%d Turn阶段", this.Id())
	if this.allin + 1 >= this.remain {
		return TPRiver
	}
	return TPTurnBet
}

func (this *TexasPokerRoom) TurnBet() int32{
	if this.remain <= 1 {
		return TPShowDown
	}
	if this.AllBetOver() {
		this.CalcGambPool()
		log.Info("房间%d River阶段", this.Id())
		return TPRiver
	}
	//log.Info("房间%d TurnBet阶段", this.Id())
	return TPTurnBet
}

func (this *TexasPokerRoom) River() int32{
	card := this.Deal()
	this.publiccard = append(this.publiccard, card.Suit+1)
	this.publiccard = append(this.publiccard, card.Value+2)
	this.OneLoopOver()
	this.ForEachPlayer(this.sblindpos, func(p *TexasPlayer) bool {
		p.SetRiver(card)
		return true
	})
	this.ClearBetOver(true)
	this.BetStart(this.sblindpos)
	log.Info("房间%d River阶段", this.Id())
	if this.allin + 1 >= this.remain {
		return TPShowDown
	}
	return TPRiverBet
}

func (this *TexasPokerRoom) RiverBet() int32{
	if this.remain <= 1 {
		return TPShowDown
	}
	if this.AllBetOver() {
		//this.CalcGambPool()
		log.Info("房间%d ShowDown阶段", this.Id())
		return TPShowDown
	}
	//log.Info("房间%d RiverBet阶段", this.Id())
	return TPRiverBet
}

func (this *TexasPokerRoom) ClearBetOver(flag bool) {
	this.ForEachPlayer(0, func(player *TexasPlayer) bool {
		player.betover = false
		if flag == true {
			player.curbet = 0
		}
		return true
	})
	if flag == true {
		this.curbet = 0
	}
}

func (this *TexasPokerRoom) AllBetOver() bool{
	var tmpcount int32 = 0
	this.ForEachPlayer(0, func(player *TexasPlayer) bool {
		if player.BetOver() {
			tmpcount++
		}
		return true
	})
	if tmpcount == this.remain {
		return true
	}
	return false
}

func (this *TexasPokerRoom) ShowDown() int32{
	pots := this.CalcGambPool()
	for i := range this.chips {
		this.chips[i] = 0
	}
	var timecount int32 = 0
	this.ForEachPlayer(0, func(player *TexasPlayer) bool {
		player.hand.AnalyseHand()
		player.isshowcard = true
		timecount++
		return true
	})
	
	this.restarttime = 3 + timecount
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
			log.Info("房间%d  没有赢家", this.Id())
			return TPRestart
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
			log.Info("房间%d 玩家%d 获得筹码%d 手牌%v 等级%d 牌力%d", this.Id(), this.players[i].owner.Id(), this.chips[i], this.players[i].hand.ToAllCard(), this.players[i].hand.level, this.players[i].hand.finalvalue)
		}
	}

	for _, player := range this.players {
		if player == nil {
			continue
		}
		if player.isshowcard == false {
			continue
		}
		send.Handcardlist = append(send.Handcardlist, &msg.HandCardInfo{
			Roleid : pb.Int64(player.owner.Id()),
			Card : player.ToHandCard(),
		})
	}
	this.BroadCastRoomMsg(send)
	return TPRestart
}

func (this *TexasPokerRoom) RestartGame() int32{
	if this.restarttime > 0 {
		this.restarttime--
	}
	if this.restarttime != 0 {
		return TPRestart
	}else{
		tmppos := this.dealerpos+1
		this.dealerpos = tmppos % this.maxplayer
		this.dealer = nil
		this.bigblinder = nil
		this.smallblinder = nil
		this.curbet = 0
		this.pot = make([]int32, 0)
		this.chips = make([]int32, this.maxplayer, this.maxplayer)
		this.playerstate = make([]int32, this.maxplayer, this.maxplayer)
		this.allin = 0
		this.remain = 0
		this.overflag = false
		this.waittime = 0
		this.raisecount = 0
		for _, p := range this.players {
			if p != nil {
				p.AddBankRollNext()
				if p.CheckLeave() {
					continue
				}
				p.Init()
				if p.isai {
					p.readytime = 2
				}
			}
		}
		return TPWait 
	}
}

func (this *TexasPokerRoom) PlayerTick() {
	for _ , p := range this.players {
		if p != nil {
			p.Tick()
		}
	}
}

func (this *TexasPokerRoom) ShutDown() {
}

// 计算奖池
func (this *TexasPokerRoom) CalcGambPool() []handPot {
	obs := make([]handBet,0)
	pots := make([]handPot,0)

	for i, bet := range this.chips{
		if bet > 0 {
			obs = append(obs, handBet{Pos: i, Bet: int(bet)})
		}
	}
	sort.Sort(handBets(obs))

	var tmpsum int = 0
	for i, ob := range obs {
		if this.playerstate[ob.Pos] == GSFold {
			tmpsum += ob.Bet
			continue
		}
		if ob.Bet > 0 {
			s := obs[i:]
			hpot := handPot{Pot: ob.Bet * len(s) + tmpsum}
			tmpsum = 0
			for j := range s {
				s[j].Bet -= ob.Bet
				hpot.OPos = append(hpot.OPos, s[j].Pos)
			}
			pots = append(pots, hpot)
		}
	}
	this.pot = make([]int32, 0) 
	for _, pot := range pots {
		this.pot = append(this.pot, int32(pot.Pot))
	}
	log.Info("房间%d 奖池%v", this.Id(), this.pot)
	return pots
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
		if player != nil && player.owner.Id() == userid {
			return player
		}
	}
	for _, player := range this.watchers {
		if player != nil && player.owner.Id() == userid {
			return player
		}
	}
	return nil
}

func (this *TexasPokerRoom) FindPlayerByID(userid int64) *TexasPlayer {
	for _, player := range this.players {
		if player != nil && player.owner.Id() == userid {
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
	send := &msg.RS2C_RetEnterRoom{}
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
		if p == nil {
			continue
		}
		send.Playerlist = append(send.Playerlist, p.ToProto())
	}
	send.Isshowcard = pb.Bool(player.isshowcard)
	send.Handcard = player.ToHandCard()
	player.owner.SendClientMsg(send)
}

func (this *TexasPokerRoom) UpdateMember() {
	Redis().HSet(fmt.Sprintf("roombrief_%d", this.Id()), "members", this.PlayersNum())
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
		player.AddCoin(rev)
	}
}

func (this *TexasPokerRoom) BrightCardInTime(uid int64) {
	player := this.FindAllByID(uid)
	if player != nil {
		player.BrightCardInTime()
	}
}

func (this *TexasPokerRoom) ReqTimeAwardInfo(uid int64, rev *msg.C2RS_ReqTimeAwardInfo) {
	player := this.FindAllByID(uid)
	if player != nil {
		player.ReqTimeAwardInfo(rev)
	}
}

func (this *TexasPokerRoom) ReqStandUp(uid int64) {
	player := this.FindAllByID(uid)
	if player != nil {
		player.ReqStandUp()
	}
}

func (this *TexasPokerRoom) HasRealPlayer() bool {
	for _, p := range this.players {
		if p != nil && !p.isai {
			return true
		}
	}
	return false
}

func (this *TexasPokerRoom) GetFreeNum() int32 {
	var count int32 = 0
	for _, p := range this.players {
		if p == nil {
			count++
		}   
	}
	return count
}

func (this *TexasPokerRoom) GetFreePos() int32 {
	frees := make([]int32, 0)
	for k, p := range this.players {
		if p == nil {
			frees = append(frees, int32(k)) 
		}
	}
	pos := util.RandBetween(0, int32(len(frees)-1))
	return frees[pos]
}

func (this *TexasPokerRoom) CreateAI(num int32) {
	users := AIUserMgr().GetUserByNum(num)
	if len(users) != int(num) {
		return
	}
	for i := 0; i < int(num); i++ {
		player := NewTexasPlayer(users[i], this,  true)
		player.Init()
		rev := &msg.C2RS_ReqBuyInGame{Num:pb.Int32(1000), Isautobuy:pb.Bool(true), Pos:pb.Int32(this.GetFreePos()+1)}
		player.BuyInGame(rev)
		player.readytime = 3
		log.Info("房间%d AI%d 位置%d 参加游戏", this.Id(), player.owner.Id(), rev.GetPos())
	}	
}

