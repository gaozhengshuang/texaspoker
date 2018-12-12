
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
	TPNone int32 = iota			//无状态
	TPWait						//等待开始
	TPPreFlopBet				//preFlop压注		
	TPFlop						//
	TPFlopBet
	TPTurn
	TPTurnBet
	TPRiver
	TPRiverBet
	TPShowDown					//结算比赛
	TPRestart					//重新开始
	TPShutDown					//关闭房间
)

//德州扑克房间
type TexasPokerRoom struct {
	RoomBase
	tconf *table.TexasRoomDefine
	ante int64							//台费
	cdtime int32						//思考时间
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
	bigblindnum int64					//大盲钱
	smallblindnum int64					//小盲钱
	preblindnum int64					//前盲
	ticker1s *util.GameTicker
	curbet int64						//当前总压注
	restarttime int32					//重新开始时间	
	pot []int64							// 奖池筹码数, 第一项为主池，其他项(若存在)为边池
	chips []int64						// 玩家最终下注筹码，摊牌时为玩家最终获得筹码
	remain	int32						// 剩余人
	allin int32							// allin人数
	publiccard []int32					// 每轮公共牌
	allcard []int32						// 所有公共牌
	curactpos int32						// 当前行动位置
	curacttime int32					// 当前行动时间
	starttime int32						// 游戏开始时间
	bettime int32						//当前下注时间
	maxplayer int32						// 最大玩家数
	overflag bool						// 结束标示
	playerstate []int32					// 玩家状态
	waittime int32						//无人的时间
	raisecount int32					//加注人数
	raisebet int64						//加注数
	publichand *Hand					//公共区域计算牌力
	hasbright bool						//是否亮牌
	currecord []*msg.UserReviewInfo		//当前记录
	lastrecord []*msg.UserReviewInfo	//上一局记录
	posfold map[int32]int32				//弃牌位置
	recordstep int32					//记录步奏
	mtt *ChampionShip					//锦标赛
	mttwait int32						//锦标赛等待时间
	haveai bool							//比赛中是否创建ai
}

func (this *TexasPokerRoom) Id() int64 { return this.id }
func (this *TexasPokerRoom) Kind() int32 { return this.gamekind }

//玩家人数
func (this *TexasPokerRoom) PlayersNum() int32{
	var count int32 = 0
	for _, p := range this.players {
		if p != nil {
			count++
		}
	}
	return count
}

//是否是竞标赛
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

//检测这个位置上是否有人
func (this *TexasPokerRoom) CheckPos(pos int32) bool {
	if pos > int32(len(this.players)) {
		return false
	}
	if this.players[pos] != nil {
		return false
	}
	return true
}

//是否满员
func (this *TexasPokerRoom) IsFullPlayer() bool {
	if this.PlayersNum() == this.tconf.Seat {
		return true
	}
	return false
}

//获取一个空位置
func (this *TexasPokerRoom) GetEmptySeat() int32 {
	for k, p := range this.players {
		if p == nil {
			return int32(k)
		}
	}
	return 0
}

//设置玩家筹码
func (this *TexasPokerRoom) SetPlayerBankRoll(userid int64, num int64) {
	player := this.FindPlayerByID(userid)
	if player == nil {
		return
	}
	player.bankroll = num
}

//是否在比赛中
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
	this.chips = make([]int64, this.maxplayer, this.maxplayer)
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
	if len(this.tconf.Ante) > 0 {
		this.preblindnum = this.tconf.Ante[0]
	}
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

//交换牌
func (this *TexasPokerRoom) SwapCard(a int32, b int32){
	tmp := this.cards[a]
	this.cards[a] = this.cards[b]
	this.cards[b] = tmp
}

//AllIn亮牌处理
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
				//log.Info("房间%d 玩家%d allin亮牌", this.Id(), p.owner.Id())
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

//玩家循环操作 -- 游戏过程中使用
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

//玩家循环操作 -- 开始游戏使用
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

//能否开始比赛
func (this *TexasPokerRoom) CanStart() bool {
	readycount := 0
	bankcount := 0
	for _, p := range this.players {
		if p != nil {
			p.AddBankRollNext()
			if p.isready == true {
				readycount++
				//log.Info("玩家%d 等待开启", p.owner.Id())
			}
			if p.HasBankRoll() {
				bankcount++
			}
		}
	}
	if readycount >= 1 && bankcount >=2 {
		return true
	}
	if this.IsChampionShip() && this.mttwait >= 3{
		readycount = 0
		for _, p := range this.players {
			if p != nil && p.HasBankRoll(){
				readycount++
			}
		}
		if readycount >= 2 {
			return true
		}
	}
	this.mttwait++
	return false
}

//是否需要AI
func (this *TexasPokerRoom) NeedAI() {
	if this.tconf.Rbt != 0 {
		return
	}
	if this.IsChampionShip() {
		return
	}
	if this.haveai {
		return
	}
	if this.tconf.Type == 3 {
		return
	}
	if this.tconf.SBlind >= 500 {
		return
	}
	if this.waittime >= 3{
		freenum := this.GetFreeNum()
		if freenum >=2 {
			this.CreateAI(util.RandBetween(1, 2))
			this.haveai = true
		} else if freenum == 1{
			this.CreateAI(1)
			this.haveai = true
		}
	}else{
		if this.HasRealPlayer() {
			this.waittime++
		}
	}
}

//开始游戏
func (this *TexasPokerRoom) StartGame() int32 {
	if this.IsChampionShip() && this.PlayersNum() == 1{
		if this.mtt.ReDispatchRoom(this.Id()) {
			return TPShutDown
		}
	}
	this.NeedAI()
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
		if this.preblindnum != 0 {
			p.PreBet(this.preblindnum)
		}
		p.RemoveBankRoll(this.ante, "台费扣除")
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
		record.Bankroll = pb.Int64(0)
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
	//如果这个时候大家都是allin 则立即结算
	if this.allin == this.remain {
		return TPFlop
	}
	this.BetStart(this.bblindpos+1, false)
	log.Info("房间[%d] 开始游戏", this.Id())
	return TPPreFlopBet
}

//推送开始信息
func (this *TexasPokerRoom) SendStartGame() {
	send := &msg.RS2C_PushNextRoundStart{}
	send.Buttonpos = pb.Int32(this.dealerpos+1)
	send.Sblindpos = pb.Int32(this.sblindpos+1)
	send.Bblindpos = pb.Int32(this.bblindpos+1)
	send.Sblind = pb.Int64(this.smallblindnum)
	send.Bblind = pb.Int64(this.bigblindnum)
	this.BroadCastRoomMsg(send)
}

//设置大盲位
func (this *TexasPokerRoom) SetBigBlind() bool {
	this.bigblinder = this.smallblinder.NextForStart()
	if this.bigblinder != nil {
		this.bblindpos = this.bigblinder.pos
		return true
	}
	return false
}

//设置小盲位
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

//设置庄家位
func (this *TexasPokerRoom) SetDealer() bool {
	this.ForStartPlayer(this.dealerpos, func(p *TexasPlayer) bool {
		this.dealerpos = p.pos
		this.dealer = p
		//log.Info("房间%d 庄家位%d", this.Id(), this.dealerpos)
		return false
	})
	if this.dealer != nil {
		return true
	}
	return false
}

//分配二张底牌
func (this *TexasPokerRoom) SetHoleCard() {
	this.ForEachPlayer(this.sblindpos, func(p *TexasPlayer) bool {
		p.SetHole(this.Deal(), this.Deal())
		return true
	})
}

//压住开始
func (this *TexasPokerRoom) BetStart(pos int32, nostart bool){
	if nostart {
		if this.allin + 1 >= this.remain {
			//log.Info("房间%d allin人数足够 不在下注", this.Id())
			return
		}
	} else {
		if this.allin + 1 >= this.remain {
			if this.smallblinder.IsAllIn() {
				this.bigblinder.betover = true
				this.bigblinder.ChangeState(GSCheck)
				this.bettime = 0
			}
		}
	}
	if this.remain <= 1 {
		//log.Info("房间%d remain人数足够 不在下注", this.Id())
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

//一轮结束
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

//设置离开记录
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
		round.Bet = pb.Int64(player.curbet)
		round.Cards = this.publiccard
		record.Round = append(record.Round, round)
		record.Bankroll = pb.Int64(record.GetBankroll() - player.curbet)
	}
}

//设置PreFlop记录
func (this *TexasPokerRoom) SetPreFlopRecord() {
	for _, record := range this.currecord {
		player := this.FindPlayerByID(record.GetRoleid())
		if player == nil {
			continue
		}
		round := &msg.UserOneRound{}
		round.State = pb.Int32(player.gamestate)
		round.Bet = pb.Int64(player.curbet)
		round.Cards = player.ToHandCard()
		record.Round = append(record.Round, round)
		record.Bankroll = pb.Int64(record.GetBankroll() - player.curbet)
	}
}

//PreFlop压注
func (this *TexasPokerRoom) PreFlopBet() int32{
	if this.remain <= 1 {
		return TPShowDown
	}
	if this.AllBetOver() {
		this.CalcGambPool()
		//log.Info("房间%d Flop阶段", this.Id())
		return TPFlop
	}
	//log.Info("房间%d PreFlopBet阶段 房间人数%d", this.Id(), this.remain)
	return TPPreFlopBet
}

//添加公共卡牌
func (this *TexasPokerRoom) AddPublicCard(card *Card) {
	this.publiccard = append(this.publiccard, card.Suit+1)
	this.publiccard = append(this.publiccard, card.Value+2)
	this.allcard = append(this.allcard, card.Suit+1)
	this.allcard = append(this.allcard, card.Value+2)
}

//Flop阶段
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
	//log.Info("房间%d Flop阶段", this.Id())
	if this.allin + 1 >= this.remain {
		return TPTurn
	}
	return TPFlopBet
}

//该位置是否弃牌
func (this *TexasPokerRoom) HasPosFold(pos int32) bool {
	if _ , ok := this.posfold[pos]; ok {
		return true
	}
	return false
}

//设置该位置弃牌
func (this *TexasPokerRoom) SetPosFold(pos int32) {
	this.posfold[pos] = pos
}

//设置其他记录
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
		round.Bet = pb.Int64(player.curbet)
		round.Cards = this.publiccard
		record.Round = append(record.Round, round)
		record.Bankroll = pb.Int64(record.GetBankroll() - player.curbet)
	}
}

//Flop压注
func (this *TexasPokerRoom) FlopBet() int32{
	if this.remain <= 1 {
		//log.Info("房间%d人数1人 直接结束比赛", this.Id())
		return TPShowDown
	}
	if this.AllBetOver() {
		this.CalcGambPool()
		//log.Info("房间%d Turn阶段", this.Id())
		return TPTurn
	}
	//log.Info("房间%d FlopBet阶段", this.Id())
	return TPFlopBet
}

//Turn牌阶段
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
	//log.Info("房间%d Turn阶段", this.Id())
	if this.allin + 1 >= this.remain {
		return TPRiver
	}
	return TPTurnBet
}

//Turn压注
func (this *TexasPokerRoom) TurnBet() int32{
	if this.remain <= 1 {
		return TPShowDown
	}
	if this.AllBetOver() {
		this.CalcGambPool()
		//log.Info("房间%d River阶段", this.Id())
		return TPRiver
	}
	//log.Info("房间%d TurnBet阶段", this.Id())
	return TPTurnBet
}

//River阶段
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
	//log.Info("房间%d River阶段", this.Id())
	if this.allin + 1 >= this.remain {
		return TPShowDown
	}
	return TPRiverBet
}

//River压注
func (this *TexasPokerRoom) RiverBet() int32{
	if this.remain <= 1 {
		return TPShowDown
	}
	if this.AllBetOver() {
		//this.CalcGambPool()
		//log.Info("房间%d ShowDown阶段", this.Id())
		return TPShowDown
	}
	//log.Info("房间%d RiverBet阶段", this.Id())
	return TPRiverBet
}

//清除玩家压注状态
func (this *TexasPokerRoom) ClearBetOver(flag bool) {
	this.ForEachPlayer(0, func(player *TexasPlayer) bool {
		player.betover = false
		player.bettime = 0
		if flag == true {
			player.curbet = 0
		}
		return true
	})
	if flag == true {
		this.curbet = 0
	}
}

//判断压注是否结束
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

//游戏结算
func (this *TexasPokerRoom) ShowDown() int32{
	//结算时就把位置清理掉
	this.curactpos = -1
	this.curacttime = 0
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
			for _, record := range this.currecord {
				if record.GetRoleid() == player.owner.Id() {
					record.Showcard = pb.Bool(true)
				}
			}
			return true
		})
	}
	
	//计算每个池子奖励的归宿
	this.restarttime = timecount*15/10 + 3
	send := &msg.RS2C_PushOneRoundOver{}
	for k, pot := range pots { // 遍历奖池
		var maxhandlevel int32 = -1
		var maxhandfinalvalue int32 = -1
		// 计算该池子最大牌型和牌值
		for _, pos := range pot.OPos {
			p := this.players[pos]
			if p != nil && !p.IsFold() && !p.IsWait(){
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
			if p != nil && !p.IsFold() && !p.IsWait(){
				if p.hand.level == maxhandlevel && p.hand.finalvalue == maxhandfinalvalue {
					winners = append(winners, pos)
				}
			}
		}
		if len(winners) == 0 {
			log.Info("房间[%d]  没有赢家", this.Id())
			return TPRestart
		}
		var onepot int64 = 0
		potplayer := make([]int64, 0)
		for _, winner := range winners {
			onepot = pot.Pot / int64(len(winners))
			this.chips[winner] += onepot
			player := this.players[winner]
			if player != nil {
				potplayer = append(potplayer, player.owner.Id())
				player.owner.OnAchieveWinPoker(this.Kind(), this.SubKind(), player.hand.level, this.chips[winner])
			}
		}
		send.Potlist = append(send.Potlist, &msg.PotInfo{
			Num : pb.Int64(pot.Pot / int64(len(winners))),
			Type : pb.Int32(int32(k)),
			Roleid : potplayer,
		})

	}

	//最终瓜分奖励
	for i := range this.chips {
		if this.players[i] != nil {
			this.players[i].AddBankRoll(this.chips[i], "每局结算获得")
			this.players[i].AddExp(50, "每局结算", true)
			log.Info("房间[%d] 玩家[%d] 获得筹码[%d] 手牌[%v] 等级[%d] 牌力[%d]", this.Id(), this.players[i].owner.Id(), this.chips[i], this.players[i].hand.ToAllCard(), this.players[i].hand.level, this.players[i].hand.finalvalue)
			this.WinNotify(this.players[i].owner.Name(), this.players[i].hand.level, this.chips[i])
			for _, record := range this.currecord {
				if record.GetRoleid() == this.players[i].owner.Id() {
					record.Bankroll = pb.Int64(record.GetBankroll() + this.chips[i])
				}
			}
		}
	}

	for _, player := range this.players {
		if player == nil {
			continue
		}
		if player.IsWait() {
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
		player.OnCheckBankrupt(this.Kind(), this.SubKind())
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

//重新开始游戏
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
		this.pot = make([]int64, 0)
		this.chips = make([]int64, this.maxplayer, this.maxplayer)
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
		var needoneai bool = false
		for _, p := range this.players {
			if p != nil {
				p.AddBankRollNext()
				if p.CheckLeave() {
					continue
				}
				p.Init()
				if p.isai {
					p.readytime = 2
					//ai钱赚够了离场
					if p.GetBankRoll() >= this.tconf.BBuyin * 5 {
						p.StandUp()
						this.haveai = false
						needoneai = true
					}
				}else{
					playercount++
				}
			}
		}
		if this.IsChampionShip() {
			if this.mtt.ReDispatchRoom(this.Id()) {
				return TPShutDown
			}
		}

		//如果有玩家观看 机器人离开
		//if len(this.watchers) > 0 && this.IsFullPlayer() {
		//	count := 0
		//	for _, p := range this.players {
		//		if count >= len(this.watchers) {
		//			break
		//		}
		//		if p != nil && p.isai {
		//			p.StandUp()
		//			count++
		//		}
		//	}
		//}
		//如果玩家全部离开 机器人离开
		if playercount == 0 && this.tconf.Rbt == 0{
			for _, p := range this.players {
				if p != nil && p.isai {
					p.StandUp()
				}
			}
			this.haveai = false
		}
		//如果是全场ai的房间
		if this.tconf.Rbt == this.tconf.Seat && !this.IsFullPlayer() {
			this.CreateAI(this.tconf.Seat - this.PlayersNum())
		}
		if needoneai && !this.IsFullPlayer() {
			this.CreateAI(1)
		}
		return TPWait 
	}
}

//赢牌通知
func (this *TexasPokerRoom) WinNotify(name string, level int32, reward int64) {
	if level < 5 || reward <= 0{
		return
	}
	if this.IsChampionShip() {
		return 
	}
	txt := fmt.Sprintf("{\"0\":\"%s\",\"1\":%d,\"2\":%d,\"3\":%d}", name, this.tconf.Type ,level , reward)
	send := &msg.RS2GW_ChatInfo{}
	send.Chat = def.MakeChatInfo(def.ChatAll, txt, 0, "", def.TexasMsg, def.MsgShowAll)
	GateMgr().Broadcast(send)
}

//玩家定时器
func (this *TexasPokerRoom) PlayerTick() {
	for _ , p := range this.players {
		if p != nil {
			p.Tick()
		}
	}
}

//房间关闭
func (this *TexasPokerRoom) ShutDown() int32 {
	log.Info("房间[%d] 即将关闭", this.Id())
	return TPNone
}

// 计算奖池
func (this *TexasPokerRoom) CalcGambPool() []handPot {
	obs := make([]handBet,0)
	pots := make([]handPot,0)

	for i, bet := range this.chips{
		if bet > 0 {
			obs = append(obs, handBet{Pos: i, Bet: int64(bet)})
		}
	}
	sort.Sort(handBets(obs))

	var tmpsum int64 = 0
	for i, ob := range obs {
		if this.playerstate[ob.Pos] == GSFold {
			tmpsum += ob.Bet
			continue
		}
		if ob.Bet > 0 {
			s := obs[i:]
			hpot := handPot{Pot: ob.Bet * int64(len(s)) + tmpsum}
			tmpsum = 0
			for j := range s {
				s[j].Bet -= ob.Bet
				hpot.OPos = append(hpot.OPos, s[j].Pos)
			}
			pots = append(pots, hpot)
		}
	}
	this.pot = make([]int64, 0) 
	for _, pot := range pots {
		this.pot = append(this.pot, pot.Pot)
	}
	//log.Info("房间%d 奖池%v", this.Id(), this.pot)
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

//通过id查找玩家 （坐下玩家和观战玩家）
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

//通过id查找玩家 坐下玩家
func (this *TexasPokerRoom) FindPlayerByID(userid int64) *TexasPlayer {
	for _, player := range this.players {
		if player != nil && player.owner.Id() == userid {
			return player
		}
	}
	return nil
}

//添加坐下玩家
func (this *TexasPokerRoom) AddPlayer(pos int32, player *TexasPlayer) bool {
	if this.players[pos] != nil {
		return false
	}
	this.players[pos] = player
	return true
}

//删除坐下玩家
func (this *TexasPokerRoom) DelPlayer(pos int32) {
	this.players[pos] = nil
	//log.Info("房间%d, 位置%d设置空", this.Id(), pos)
}

//添加观战玩家
func (this *TexasPokerRoom) AddWatcher(player *TexasPlayer ) {
	for _, v := range this.watchers {
		if v == player {
			return
		}
	}
	this.watchers = append(this.watchers, player)
}

//删除观战玩家
func (this *TexasPokerRoom) DelWatcher(player *TexasPlayer) {
	for k, v := range this.watchers {
		if v == player {
			this.watchers = append(this.watchers[:k], this.watchers[k+1:]...)
			return
		}
	}
}

//竞标赛添加重购
func (this *TexasPokerRoom) AddRebuy(uid int64, num int64, cost int64) {
	player := this.FindAllByID(uid)
	if player == nil {
		return
	}
	player.AddRebuy(num, cost)
}

//锦标赛添加Addon
func (this *TexasPokerRoom) AddAddon(uid int64, num int64, cost int64) {
	player := this.FindAllByID(uid)
	if player == nil {
		return
	}   
	player.AddAddon(num, cost)
}

//通知其他玩家站起or坐下
func (this *TexasPokerRoom) NotifySitStand(userid int64, except ...int64) {
	player := this.FindPlayerByID(userid)
	if player == nil {
		return
	}
	send := &msg.RS2C_PushSitOrStand{}
	send.Roleid = pb.Int64(userid)
	send.Pos = pb.Int32(player.pos+1)
	send.State = pb.Int32(1)
	send.Bankroll = pb.Int64(player.GetBankRoll())
	this.BroadCastRoomMsg(send, except...)
}

//是否有真实玩家
func (this *TexasPokerRoom) HasRealPlayer() bool {
	for _, p := range this.players {
		if p != nil && !p.isai {
			return true
		}
	}
	return false
}

//获取剩余空位置数
func (this *TexasPokerRoom) GetFreeNum() int32 {
	var count int32 = 0
	for _, p := range this.players {
		if p == nil {
			count++
		}   
	}
	return count
}

//获取一个空位置
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

//创造AI
func (this *TexasPokerRoom) CreateAI(num int32) {
	if this.IsChampionShip() {
		return
	}
	//usermap := make(map[int64]int64)
	//for _, p := range this.players{
	//	if p != nil {
	//		usermap[p.owner.Id()] = p.owner.Id()
	//	}
	//}
	//users := AIUserMgr().GetUserByNum(num, usermap)
	//if len(users) != int(num) {
	//	return
	//}

	users := AIUserMgr().PickOutUser(num)
	if len(users) == 0 {
		return
	}

	for i := 0; i < int(num); i++ {
		player := NewTexasPlayer(users[i], this,  true)
		player.Init()
		bankroll := this.tconf.SBuyin * int64(util.RandBetween(5, 10))
		rev := &msg.C2RS_ReqBuyInGame{Num:pb.Int64(bankroll), Isautobuy:pb.Bool(true), Pos:pb.Int32(this.GetFreePos()+1)}
		player.BuyInGame(rev)
		player.readytime = 3
		log.Info("房间[%d] AI[%d] 位置[%d] 参加游戏", this.Id(), player.owner.Id(), rev.GetPos())
	}	
}

/////////////////////////////////////////消息处理/////////////////////////////////////////

func (this *TexasPokerRoom) SendRoomInfo(player *TexasPlayer) {
	send := &msg.RS2C_RetEnterRoom{}
	send.Id = pb.Int64(this.Id())
	send.Buttonpos = pb.Int32(this.dealerpos+1)
	send.Potchips = this.pot
	send.Roomid = pb.Int32(this.Tid())
	send.Ante = pb.Int64(this.preblindnum)
	send.Sblind = pb.Int64(this.smallblindnum)
	send.Bblind = pb.Int64(this.bigblindnum)
	send.Pos = pb.Int32(this.curactpos+1)
	send.Postime = pb.Int32(this.curacttime)
	send.Starttime = pb.Int32(this.starttime)
	send.Publiccard = this.allcard
	send.Maxante = pb.Int64(this.curbet)
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
		send.Addbuy = pb.Int64(player.addrebuy+player.addaddon);
		send.Rank = pb.Int32(this.mtt.GetUserRank(player.owner.Id()));
		send.Avgchips = pb.Int64(this.mtt.GetAvgChips());
		send.Join = pb.Int32(this.mtt.curmembernum);
		log.Info("锦标赛[%d] 房间[%d] 玩家[%d]进入房间 Rank[%d] Avg[%d]", this.mtt.uid, this.Id(), player.owner.Id(), send.GetRank(), send.GetAvgchips())
	}
	if player.trusteeship != 0 {
		send.Istrusteeship = pb.Bool(true)
	}else{
		send.Istrusteeship = pb.Bool(false)
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
		if rev.GetState() == GSTrusteeShip {
			player.trusteeship = 0
			player.timeout = 0
			send := &msg.RS2C_RetAction{}
			player.owner.SendClientMsg(send)
		} else {
			player.Betting(rev.GetNum())
		}
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

func (this *TexasPokerRoom) GuessBuy(uid int64, rev *msg.C2RS_ReqGuessBuy) {
	player := this.FindAllByID(uid)
	if player == nil {
		return
	}
	player.GuessBuy(rev)
}

