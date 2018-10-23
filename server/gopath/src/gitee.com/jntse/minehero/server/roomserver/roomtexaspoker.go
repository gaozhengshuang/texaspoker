
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
	TPNone int32 = iota
	TPWait 
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
	preblindnum int32					//前盲
	ticker1s *util.GameTicker
	curbet int32						//当前总压注
	restarttime int32	
	pot []int32							// 奖池筹码数, 第一项为主池，其他项(若存在)为边池
	chips []int32						// 玩家最终下注筹码，摊牌时为玩家最终获得筹码
	remain	int32						// 剩余人
	allin int32							// allin人数
	publiccard []int32					// 每轮公共牌
	allcard []int32						// 所有公共牌
	curactpos int32
	curacttime int32
	starttime int32
	bettime int32						//当前下注时间
	maxplayer int32
	overflag bool
	playerstate []int32
	waittime int32						//无人的时间
	raisecount int32					//加注人数
	raisebet int32						//加注数
	publichand *Hand					//公共区域计算牌力
	hasbright bool
	currecord []*msg.UserReviewInfo		//当前记录
	lastrecord []*msg.UserReviewInfo	//上一局记录
	posfold map[int32]int32
	recordstep int32
	mtt *ChampionShip
	mttwait int32
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

func (this *TexasPokerRoom) IsChampionShip() bool {
	if this.mtt != nil {
		return true
	}
	return false
}

func (this *TexasPokerRoom) GetRoomType() int32 {
	return this.tconf.Type
}

func (this *TexasPokerRoom) PublicLevel() int32 {
	return this.publichand.level
}

func (this *TexasPokerRoom) PublicValue() int32 {
	return this.publichand.finalvalue
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

func (this *TexasPokerRoom) GetEmptySeat() int32 {
	for k, p := range this.players {
		if p == nil {
			return int32(k)
		}
	}
	return 0
}

func (this *TexasPokerRoom) SetPlayerBankRoll(userid int64, num int32) {
	player := this.FindPlayerByID(userid)
	if player == nil {
		return
	}
	player.bankroll = num
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
	this.publichand = GetHand()
	this.publichand.Init()
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
	this.posfold = make(map[int32]int32)
	this.lastrecord = make([]*msg.UserReviewInfo, 0)
	this.currecord = make([]*msg.UserReviewInfo, 0)
	this.allcard = make([]int32, 0)
	this.publiccard = make([]int32, 0)
	this.curactpos = -1
	this.state = TPWait
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

func (this *TexasPokerRoom) AllInBrightCard() {
	if this.hasbright == true {
		return
	}
	if this.allin + 1 >= this.remain{
		for _, p := range this.players {
			if p != nil && (p.IsAllIn() || p.IsCall() || p.IsRaise()) {
				send := &msg.RS2C_PushBrightCard{}
				send.Roleid = pb.Int64(p.owner.Id())
				send.Card = p.ToHandCard()
				send.Allin = pb.Bool(true)
				this.BroadCastRoomMsg(send)
				p.isallinshow = true
				log.Info("房间%d 玩家%d allin亮牌", this.Id(), p.owner.Id())
			}
		}
		this.hasbright = true
	}
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

func (this *TexasPokerRoom) ForStatePlayer(start int32, f func(p *TexasPlayer) bool) {
	end := (this.maxplayer + start - 1) % this.maxplayer
	i := start % this.maxplayer
	for ; i != end; i = (i + 1) % this.maxplayer {
		if this.players[i] != nil && !this.players[i].IsFold()&&
		!this.players[i].IsWait() &&
		!this.players[i].IsAllIn() &&
		!f(this.players[i]) {
			return
		}
	}
	// end
	if this.players[i] != nil && !this.players[i].IsFold() &&
	!this.players[i].IsWait() &&
	!this.players[i].IsAllIn() {
		f(this.players[i])
	}
}

//开始游戏使用
func (this *TexasPokerRoom) ForStartPlayer(start int32, f func(p *TexasPlayer) bool) {
	end := (this.maxplayer + start - 1) % this.maxplayer
	i := start % this.maxplayer
	for ; i != end; i = (i + 1) % this.maxplayer {
		if this.players[i] != nil && this.players[i].IsWait() &&
		this.players[i].HasBankRoll() &&
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
		if p != nil {
			p.AddBankRollNext()
			if p.isready == true && p.HasBankRoll(){
				count++
				//log.Info("玩家%d 等待开启", p.owner.Id())
			}   
		}
	}
	if count >= 2 {
		return true
	}
	if this.IsChampionShip() && this.mttwait >= 3{
		count = 0
		for _, p := range this.players {
			if p.HasBankRoll(){
				count++
			}
		}
		if count >= 2 {
			return true
		}
	}
	this.mttwait++
	return false
}

func (this *TexasPokerRoom) StartGame() int32 {
	if this.waittime >= 4{
		freenum := this.GetFreeNum()
		if freenum >=2 {
			this.CreateAI(util.RandBetween(1, 2))
		} else if freenum == 1{
			this.CreateAI(1)
		}
	}else{
		if !this.IsChampionShip() && this.HasRealPlayer() {
			this.waittime++
		}
	}
	if this.IsChampionShip() && this.PlayersNum() == 1{
		if this.mtt.ReDispatchRoom(this.Id()) {
			return TPShutDown
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
		record := &msg.UserReviewInfo{}
		record.Roleid = pb.Int64(p.owner.Id())
		record.Name = pb.String(p.owner.Name())
		record.Face = pb.String(p.owner.Face())
		record.Sex = pb.Int32(p.owner.Sex())
		//log.Info("机器人数据%d 名字%s 头像%s 性别%d", p.owner.Id(), p.owner.Name(), p.owner.Face(), p.owner.Sex())
		record.Seatpos = pb.Int32(p.pos+1)
		if this.IsChampionShip() {
			p.BlindBet(this.mtt.bconf.PreBet, true)
		}
		p.RemoveBankRoll(this.ante)
		if p == this.bigblinder {
			p.BlindBet(this.bigblindnum, true)
			record.Specialpos = pb.Int32(3)
		}else if p == this.smallblinder {
			p.BlindBet(this.smallblindnum, false)
			record.Specialpos = pb.Int32(2)
		}else {
			p.ChangeState(GSWaitAction)
			if p == this.dealer {
				record.Specialpos = pb.Int32(1)
			}else{
				record.Specialpos = pb.Int32(0)
			}
		}
		record.Showcard = pb.Bool(false)
		record.Bankroll = pb.Int32(0)
		this.currecord = append(this.currecord, record)
		if !this.IsChampionShip() {
			p.SendTimeAward(true)
		}
		p.isready = false
		this.remain++
		return true
	})
	this.Shuffle()
	this.SetHoleCard()
	this.BetStart(this.bblindpos+1, false)
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

func (this *TexasPokerRoom) BetStart(pos int32, start bool){
	if this.allin + 1 >= this.remain && start {
		log.Info("房间%d allin人数足够 不在下注", this.Id())
		return
	}
	if this.remain <= 1 {
		log.Info("房间%d remain人数足够 不在下注", this.Id())
		return
	}
	this.raisecount = 0
	this.raisebet = 0
	this.ForEachPlayer(pos, func(player *TexasPlayer) bool {
		if player.IsAllIn() {
			return true
		}
		player.BetStart()
		return false
	})
}

func (this *TexasPokerRoom) OneLoopOver() {
	this.ForStatePlayer(0, func(player *TexasPlayer) bool {
		player.ChangeState(GSWaitAction)
		return true
	})
	send := &msg.RS2C_PushOneLoopOver{}
	send.Card = this.publiccard
	send.Potchips = this.pot
	this.BroadCastRoomMsg(send)
}

func (this *TexasPokerRoom) SetLeaveRecord(id int64){
	for _, record := range this.currecord {
		if record.GetRoleid() != id {
			continue
		}
		player := this.FindPlayerByID(record.GetRoleid())
		if player == nil {
			continue
		}
		round := &msg.UserOneRound{}
		round.State = pb.Int32(GSFold)
		round.Bet = pb.Int32(player.curbet)
		round.Cards = this.publiccard
		record.Round = append(record.Round, round)
		record.Bankroll = pb.Int32(record.GetBankroll() - player.curbet)
	}
}

func (this *TexasPokerRoom) SetPreFlopRecord() {
	for _, record := range this.currecord {
		player := this.FindPlayerByID(record.GetRoleid())
		if player == nil {
			continue
		}
		round := &msg.UserOneRound{}
		round.State = pb.Int32(player.gamestate)
		round.Bet = pb.Int32(player.curbet)
		round.Cards = player.ToHandCard()
		record.Round = append(record.Round, round)
		record.Bankroll = pb.Int32(record.GetBankroll() - player.curbet)
	}
}

func (this *TexasPokerRoom) PreFlopBet() int32{
	if this.remain <= 1 {
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

func (this *TexasPokerRoom) AddPublicCard(card *Card) {
	this.publiccard = append(this.publiccard, card.Suit+1)
	this.publiccard = append(this.publiccard, card.Value+2)
	this.allcard = append(this.allcard, card.Suit+1)
	this.allcard = append(this.allcard, card.Value+2)
}

func (this *TexasPokerRoom) Flop() int32{
	this.SetPreFlopRecord()
	card1 := this.Deal()
	card2 := this.Deal()
	card3 := this.Deal()
	this.publiccard = make([]int32, 0)
	this.AddPublicCard(card1)
	this.AddPublicCard(card2)
	this.AddPublicCard(card3)
	this.publichand.SetCard(card1,false)
	this.publichand.SetCard(card2,false)
	this.publichand.SetCard(card3,false)
	this.publichand.ClearAnalyse()
	this.publichand.AnalyseHand()
	this.OneLoopOver()
	this.ForEachPlayer(this.sblindpos, func(p *TexasPlayer) bool {
		p.SetFlop(card1, card2, card3)
		return true
	})
	this.ClearBetOver(true)
	this.BetStart(this.sblindpos, true)
	log.Info("房间%d Flop阶段", this.Id())
	if this.allin + 1 >= this.remain {
		return TPTurn
	}
	return TPFlopBet
}

func (this *TexasPokerRoom) HasPosFold(pos int32) bool {
	if _ , ok := this.posfold[pos]; ok {
		return true
	}
	return false
}

func (this *TexasPokerRoom) SetPosFold(pos int32) {
	this.posfold[pos] = pos
}

func (this *TexasPokerRoom) SetOtherRecord() {
	for _, record := range this.currecord {
		player := this.FindPlayerByID(record.GetRoleid())
		if player == nil {
			continue
		}
		if player.IsFold() {
			continue
		}
		round := &msg.UserOneRound{}
		round.State = pb.Int32(player.gamestate)
		round.Bet = pb.Int32(player.curbet)
		round.Cards = this.publiccard
		record.Round = append(record.Round, round)
		record.Bankroll = pb.Int32(record.GetBankroll() - player.curbet)
	}
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
	this.SetOtherRecord()
	card := this.Deal()
	this.publiccard = make([]int32, 0)
	this.AddPublicCard(card)
	this.publichand.ClearAnalyse()
	this.publichand.AnalyseHand()
	this.publichand.SetCard(card,false)
	this.OneLoopOver()
	this.ForEachPlayer(this.sblindpos, func(p *TexasPlayer) bool {
		p.SetTurn(card)
		return true
	})
	this.ClearBetOver(true)
	this.BetStart(this.sblindpos, true)
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
	this.SetOtherRecord()
	card := this.Deal()
	this.publiccard = make([]int32, 0)
	this.AddPublicCard(card)
	this.publichand.SetCard(card,false)
	this.publichand.ClearAnalyse()
	this.publichand.AnalyseHand()
	this.OneLoopOver()
	this.ForEachPlayer(this.sblindpos, func(p *TexasPlayer) bool {
		p.SetRiver(card)
		return true
	})
	this.ClearBetOver(true)
	this.BetStart(this.sblindpos, true)
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
	if tmpcount >= this.remain {
		this.AllInBrightCard()
		return true
	}
	return false
}

func (this *TexasPokerRoom) ShowDown() int32{
	this.SetOtherRecord()
	pots := this.CalcGambPool()
	for i := range this.chips {
		this.chips[i] = 0
	}
	var timecount int32 = 0
	if this.remain > 1 {
		this.ForEachPlayer(0, func(player *TexasPlayer) bool {
			player.hand.AnalyseHand()
			player.isshowcard = true
			timecount++
			return true
		})
	}
	
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
				player.owner.OnAchieveWinPoker(this.Kind(), this.SubKind(), player.hand.level, this.chips[winner])
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
			this.players[i].AddExp(5, "每局结算", true)
			log.Info("房间%d 玩家%d 获得筹码%d 手牌%v 等级%d 牌力%d", this.Id(), this.players[i].owner.Id(), this.chips[i], this.players[i].hand.ToAllCard(), this.players[i].hand.level, this.players[i].hand.finalvalue)
			for _, record := range this.currecord {
				if record.GetRoleid() == this.players[i].owner.Id() {
					record.Bankroll = pb.Int32(record.GetBankroll() + this.chips[i])
				}
			}
		}
	}

	for _, player := range this.players {
		if player == nil {
			continue
		}
		if player.IsWait() || player.isallinshow{
			continue
		}
		if player.isshowcard == true {
			send.Handcardlist = append(send.Handcardlist, &msg.HandCardInfo{
				Roleid : pb.Int64(player.owner.Id()),
				Card : player.ToHandCard(),
			})
			//log.Info("房间%d 玩家%d 显示手牌", this.Id(), player.owner.Id())
			for _,record := range this.currecord {
				if record.GetRoleid() == player.owner.Id() {
					record.Showcard = pb.Bool(true)
					record.Cardtype = pb.Int32(player.hand.level)
				}   
			}
		}
	}
	this.BroadCastRoomMsg(send)
	for _, player := range this.players {
		if player == nil || player.IsWait(){
			continue
		}
		player.SendTimeAward(false)
		player.owner.OnAchievePlayPoker(this.Kind(), this.SubKind(), player.hand)
		if player.IsFold() == false {
			player.owner.OnShowDown(this.SubKind())
		}
	}
	if this.IsChampionShip() {
		this.mtt.CalcRank(this.Id())
	}
	return TPRestart
}

func (this *TexasPokerRoom) RestartGame() int32{
	if this.restarttime > 0 {
		this.restarttime--
	}
	if this.restarttime != 0 {
		return TPRestart
	}else{
		if this.IsChampionShip() {
			if this.mtt.ReDispatchRoom(this.Id()) {
				return TPShutDown
			}
		}

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
		this.raisebet = 0
		this.hasbright = false
		this.publichand.Init()
		this.posfold = make(map[int32]int32)
		this.lastrecord = make([]*msg.UserReviewInfo, 0)
		this.recordstep = 0
		this.publiccard = make([]int32, 0)
		this.allcard = make([]int32, 0)
		this.mttwait = 0
		this.curactpos = -1
		this.curacttime = 0
		for _, v := range this.currecord {
			this.lastrecord = append(this.lastrecord, v)
		}
		this.currecord = make([]*msg.UserReviewInfo, 0)
		var playercount int32 = 0
		for _, p := range this.players {
			if p != nil {
				p.AddBankRollNext()
				if p.CheckLeave() {
					continue
				}
				p.Init()
				if p.isai {
					p.readytime = 2
				}else{
					playercount++
				}
			}
		}
		if playercount == 0 {
			for _, p := range this.players {
				if p != nil && p.isai {
					p.StandUp()
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

func (this *TexasPokerRoom) ShutDown() int32 {
	log.Info("房间%d 即将关闭", this.Id())
	return TPNone
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
		this.state = this.ShutDown()
	case TPNone:
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
	log.Info("房间%d, 位置%d设置空", this.Id(), pos)
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

func (this *TexasPokerRoom) AddRebuy(uid int64, num int32, cost int32) {
	player := this.FindAllByID(uid)
	if player == nil {
		return
	}
	player.AddRebuy(num, cost)
}

func (this *TexasPokerRoom) AddAddon(uid int64, num int32, cost int32) {
	player := this.FindAllByID(uid)
	if player == nil {
		return
	}   
	player.AddAddon(num, cost)
}

func (this *TexasPokerRoom) NotifySitStand(userid int64) {
	player := this.FindPlayerByID(userid)
	if player == nil {
		return
	}
	send := &msg.RS2C_PushSitOrStand{}
	send.Roleid = pb.Int64(userid)
	send.Pos = pb.Int32(player.pos+1)
	send.State = pb.Int32(1)
	send.Bankroll = pb.Int32(player.GetBankRoll())
	this.BroadCastRoomMsg(send)
}

/////////////////////////////////////////消息处理/////////////////////////////////////////

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
	send.Postime = pb.Int32(this.curacttime)
	send.Starttime = pb.Int32(this.starttime)
	send.Publiccard = this.allcard
	for _, p := range this.players {
		if p == nil {
			continue
		}
		send.Playerlist = append(send.Playerlist, p.ToProto())
	}
	send.Isshowcard = pb.Bool(player.isshowcard)
	send.Handcard = player.ToHandCard()
	if this.IsChampionShip() {
		send.Blindlevel = pb.Int32(this.mtt.blindlevel);
		send.Blindtime = pb.Int32(this.mtt.GetBlindUpTime());
		send.Rebuytimes = pb.Int32(this.mtt.GetUserRebuy(this.Id()));
		send.Addontimes = pb.Int32(this.mtt.GetUserAddon(this.Id()));
		send.Addbuy = pb.Int32(player.addrebuy+player.addaddon);
		send.Rank = pb.Int32(this.mtt.GetUserRank(player.owner.Id()));
		send.Avgchips = pb.Int32(this.mtt.GetAvgChips());
		send.Join = pb.Int32(this.mtt.curmembernum);
		log.Info("锦标赛%d 玩家%d进入房间 Rank%d Avg%d", this.mtt.uid, player.owner.Id(), send.GetRank(), send.GetAvgchips())
	}

	player.owner.SendClientMsg(send)
	player.SendMttRank()
}

func (this *TexasPokerRoom) UpdateMember() {
	Redis().HSet(fmt.Sprintf("roombrief_%d", this.Id()), "members", this.PlayersNum())
}

func (this *TexasPokerRoom) BuyInGame(uid int64, rev *msg.C2RS_ReqBuyInGame){
	if this.IsChampionShip() {
		return
	}
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
	if this.IsChampionShip() {
		return
	}
	player := this.FindAllByID(uid)
	if player != nil {
		player.ReqTimeAwardInfo(rev)
	}
}

func (this *TexasPokerRoom) ReqTimeAwardGet(uid int64) {
	if this.IsChampionShip() {
		return
	}
	player := this.FindAllByID(uid)
	if player != nil {
		player.ReqTimeAwardGet()
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
	if this.IsChampionShip() {
		return
	}
	users := AIUserMgr().GetUserByNum(num)
	if len(users) != int(num) {
		return
	}
	for i := 0; i < int(num); i++ {
		player := NewTexasPlayer(users[i], this,  true)
		player.Init()
		rev := &msg.C2RS_ReqBuyInGame{Num:pb.Int32(this.tconf.SBuyin), Isautobuy:pb.Bool(true), Pos:pb.Int32(this.GetFreePos()+1)}
		player.BuyInGame(rev)
		player.readytime = 3
		log.Info("房间%d AI%d 位置%d 参加游戏", this.Id(), player.owner.Id(), rev.GetPos())
	}	
}

func (this *TexasPokerRoom) ReqReviewInfo(uid int64) {
	player := this.FindAllByID(uid)
	if player != nil {
		send := &msg.RS2C_RetReviewInfo{}
		send.Array = this.lastrecord
		player.owner.SendClientMsg(send)
		//for _, record := range this.lastrecord {
		//	log.Info("记录数据 %v", record)
		//}
	}
}
