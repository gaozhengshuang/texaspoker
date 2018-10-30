package main

import (
	"fmt"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	//"gitee.com/jntse/minehero/server/def"
)

const (
	GSWaitNext int32 = 0	//等待下一局
	GSFold int32 = 1		//弃牌
	GSCheck int32 = 2		//过牌
	GSRaise int32 = 3		//加注
	GSAllIn int32 = 4		//AllIn
	GSCall int32 = 5		//跟注
	GSBlind int32 = 6		//盲注
	GSWaitAction int32 = 7	//等待说话
	GSTrusteeShip int32 = 8	//托管
)

type TexasPlayer struct{
	hand *Hand
	hole Cards
	owner *RoomUser
	room *TexasPokerRoom
	pos int32
	gamestate int32
	playstate int32
	curbet int64
	betover bool
	isshowcard bool
	bankroll int64
	bettime int32
	isready bool
	autobuy int64
	addcoin int64
	addrebuy int64
	addaddon int64
	isai bool
	aiacttime int32
	readytime int32
	rewardtime int32
	rewardround int32
	isallinshow bool
	delaystandup int32
	mttranktime int32
	rankinfo *msg.RS2C_PushMTTRank
	timeout int32
	trusteeship int32
}

type TexasPlayers []*TexasPlayer

func NewTexasPlayer(user *RoomUser, room *TexasPokerRoom, isai bool) *TexasPlayer{
	player := new(TexasPlayer)
	player.hand = GetHand()
	player.hole = make(Cards, 2, 2)
	player.owner = user
	player.room = room
	player.curbet = 0
	player.betover = false
	player.isshowcard = false
	player.bettime = 0
	player.isready = false
	player.gamestate = GSWaitNext
	player.isai = isai
	player.InitTimeReward()
	player.rankinfo = &msg.RS2C_PushMTTRank{}
	return player
}

func (this *TexasPlayer)Init(){
	this.hand.Init()
	this.hole = make(Cards, 2, 2)
	this.curbet = 0
	this.betover = false
	this.isshowcard = false
	this.bettime = 0
	//this.isready = false
	this.gamestate = GSWaitNext
	this.aiacttime = 0
	this.isallinshow = false
	//this.timeout = 0
}

func (this *TexasPlayer) InitTimeReward() {
	var tmpsec, tmpround int64
	//var err error
	lasttime, _ := Redis().Get(fmt.Sprintf("trtime%d_%d", this.room.GetRoomType(), this.owner.Id())).Int64()
	if util.IsSameDay(lasttime, util.CURTIME()) {
		tmpround, _ = Redis().Get(fmt.Sprintf("trround%d_%d", this.room.GetRoomType(), this.owner.Id())).Int64()
		tmpsec, _ = Redis().Get(fmt.Sprintf("trtick%d_%d", this.room.GetRoomType(), this.owner.Id())).Int64()   
	}else{
		tmpsec = 0
		tmpround = 0
	}
	this.rewardtime = int32(tmpsec)
	this.rewardround = int32(tmpround)+1
	log.Info("房间[%d] 玩家[%d] 计时奖励轮数[%d] 时间[%d]", this.room.Id(), this.owner.Id(), this.rewardround, this.rewardtime)
}

func (this *TexasPlayer) SetOwner(u *RoomUser) {
	this.owner = u
}

func (this *TexasPlayer) SetTimeReward() {
	lasttime, _ := Redis().Get(fmt.Sprintf("trtime%d_%d", this.room.GetRoomType(), this.owner.Id())).Int64()
	if !util.IsSameDay(lasttime, util.CURTIME()) {
		this.rewardtime = 0
		this.rewardround = 0
		Redis().Set(fmt.Sprintf("trtime%d_%d", this.room.GetRoomType(), this.owner.Id()), util.CURTIME(), 0)
	}
	Redis().Set(fmt.Sprintf("trround%d_%d", this.room.GetRoomType(), this.owner.Id()), this.rewardround, 0)
	Redis().Set(fmt.Sprintf("trtick%d_%d", this.room.GetRoomType(), this.owner.Id()), this.rewardtime, 0)
}

func (this *TexasPlayer) IsRaise() bool{
	if this.gamestate == GSRaise {
		return true
	}
	return false
}

func (this *TexasPlayer) IsCall() bool{
	if this.gamestate == GSCall {
		return true
	}
	return false
}

func (this *TexasPlayer) IsWait() bool{
	if this.gamestate == GSWaitNext {
		return true
	}
	return false
}

func (this *TexasPlayer) IsFold() bool{
	if this.gamestate == GSFold {
		return true
	}
	return false
}

func (this *TexasPlayer) IsAllIn() bool {
	if this.gamestate == GSAllIn {
		return true
	}
	return false
}

func (this *TexasPlayer) IsReady() bool {
	return this.isready
}

func (this *TexasPlayer) SetReady(flag bool) {
	this.isready = flag
}

func (this *TexasPlayer) BetStart() {
	//发送开始压注消息
	if this.bettime == 0 {
		if this.trusteeship != 0 {
			this.bettime = this.trusteeship
		}else{
			if this.isai {
				this.bettime = this.room.tconf.ClientCd
			}else {
				this.bettime = this.room.tconf.Cd
			}
		}
		this.aiacttime = this.room.tconf.ClientCd - util.RandBetween(2, 5)
		send := &msg.RS2C_PushActionPosChange{}
		send.Pos = pb.Int32(this.pos+1)
		send.Postime = pb.Int32(int32(util.CURTIME()))
		this.room.BroadCastRoomMsg(send)
		this.room.curactpos = this.pos
		this.room.curacttime = int32(util.CURTIME())
		//log.Info("玩家%d 开始下注 pos%d", this.owner.Id(), this.pos)
	}
}

func (this *TexasPlayer) PreBet(num int64) {
	if num >= this.GetBankRoll() {
		num = this.GetBankRoll()
		this.RemoveBankRoll(num, "前注扣除")
		this.curbet += num
		this.room.chips[this.pos] += num
		this.ChangeState(GSAllIn)
	}else{
		this.RemoveBankRoll(num, "前注扣除")
		this.curbet += num
		this.room.chips[this.pos] += num
		//this.ChangeState(GSBlind)
	}
	//log.Info("房间%d 玩家%d 开始前注%d", this.room.Id(), this.owner.Id(), num)
}

func (this *TexasPlayer) BlindBet(num int64, big bool) {
	if this.GetBankRoll() == 0 {
		return
	}
	if num >= this.GetBankRoll() {
		num = this.GetBankRoll()
		this.RemoveBankRoll(num, "盲注扣除")
		this.curbet += num
		this.room.chips[this.pos] += num
		this.ChangeState(GSAllIn)
	}else{
		this.RemoveBankRoll(num, "盲注扣除")
		this.curbet += num
		this.room.chips[this.pos] += num
		this.ChangeState(GSBlind)
	}
	if big == true {
		this.room.curbet = this.curbet
	}
	//log.Info("房间%d 玩家%d 开始盲注%d", this.room.Id(), this.owner.Id(), num)
}

func (this *TexasPlayer) Betting(num int64) {
	send := &msg.RS2C_RetAction{}
	if this.room.curactpos != this.pos {
		send.Errcode = pb.String("还没轮到你操作")
		this.owner.SendClientMsg(send)
		return
	}
	this.bettime = 0
	if num < 0 { // 弃牌
		if this.room.remain == 1 {
			this.owner.SendClientMsg(send)
			return
		}
		//this.hole = nil
		this.hand.Init()
		num = 0
		this.betover = true
		this.room.remain--
		this.room.playerstate[this.pos] = GSFold
		this.ChangeState(GSFold)
		log.Info("房间[%d] 玩家[%d] 弃牌 筹码[%d] 房间人数[%d]", this.room.Id(), this.owner.Id(), this.GetBankRoll(),this.room.remain)
	} else if num == 0 { // 让牌
		if num + this.curbet < this.room.curbet {
			this.Betting(this.room.curbet - this.curbet)
		}else{
			this.betover = true
			this.ChangeState(GSCheck)
			//log.Info("房间[%d] 玩家[%d] 让牌 筹码[%d] 房间人数[%d]", this.room.Id(), this.owner.Id(), this.GetBankRoll(),this.room.remain)
		}
	} else if num + this.curbet < this.room.curbet { // 跟注 或者 allin  table.Bet保持不变
		if this.GetBankRoll() != num {
			this.Betting(-1)
			return
		}
		if !this.RemoveBankRoll(num, "Allin扣除") {
			send.Errcode = pb.String("筹码不足")
			this.owner.SendClientMsg(send)
			return
		}
		this.curbet += num
		this.betover = true
		this.room.chips[this.pos] += num
		if this.GetBankRoll() == 0 {
			this.ChangeState(GSAllIn)
			//log.Info("房间[%d] 玩家[%d] 全压[%d] 筹码[%d] 房间人数[%d]", this.room.Id(), this.owner.Id(), this.curbet, this.GetBankRoll(),this.room.remain)
		}
	} else if num + this.curbet == this.room.curbet	{
		if this.GetBankRoll() < num {
			num = this.GetBankRoll()
		}
		if !this.RemoveBankRoll(num, "跟注扣除") {
			send.Errcode = pb.String("筹码不足")
			this.owner.SendClientMsg(send)
			return
		}
		this.curbet += num
		this.betover = true
		this.room.chips[this.pos] += num
		if this.GetBankRoll() == 0 {
			this.ChangeState(GSAllIn)
			//log.Info("房间[%d] 玩家[%d] 全压[%d] 筹码[%d] 房间人数[%d]",this.room.Id(), this.owner.Id(), this.curbet, this.GetBankRoll(),this.room.remain)
		} else {
			this.ChangeState(GSCall)
			//log.Info("房间[%d] 玩家[%d] 跟注[%d] 筹码[%d] 房间人数[%d]",this.room.Id(), this.owner.Id(), this.curbet, this.GetBankRoll(),this.room.remain)
		}
	} else { // 加注
		if this.GetBankRoll() < num {
			num = this.GetBankRoll()
		}
		if !this.RemoveBankRoll(num, "加注扣除") {
			send.Errcode = pb.String("筹码不足")
			this.owner.SendClientMsg(send)
			return
		}
		this.curbet += num
		this.room.curbet = this.curbet
		this.room.chips[this.pos] += num
		this.room.raisebet = num
		if this.GetBankRoll() == 0 {
			this.ChangeState(GSAllIn)
			//log.Info("房间[%d] 玩家[%d] 全压[%d] 筹码[%d] 房间人数[%d]",this.room.Id(), this.owner.Id(), this.curbet, this.GetBankRoll(),this.room.remain)
		} else {
			this.ChangeState(GSRaise)
			//log.Info("房间[%d] 玩家[%d] 加注[%d] 筹码[%d] 房间人数[%d]",this.room.Id(), this.owner.Id(), this.curbet, this.GetBankRoll(),this.room.remain)
		}
		this.room.ClearBetOver(false)//清除所有人的下注成功
		this.room.raisecount++
		this.betover = true
	}
	if this.InRoom() {
		this.owner.SendClientMsg(send)
	}
	if this.room.remain <= 1 {
		return
	}
	if !this.room.AllBetOver(){
		player := this.Next()
		if player != nil {
			player.BetStart()
		}
	}
	return
}

func (this *TexasPlayer) BetOver() bool {
	if this.IsFold() || this.IsAllIn() || this.betover{
		return true
	}
	return false
}

func (this *TexasPlayer) Next() *TexasPlayer {
	if this.room == nil {
		return nil
	}
	for i := (this.pos+1) % this.room.maxplayer; i != this.pos; i = (i + 1) % this.room.maxplayer {
		if this.room.players[i] != nil && !this.room.players[i].IsWait() && 
			!this.room.players[i].IsFold() && 
			!this.room.players[i].IsAllIn() {
			return this.room.players[i]
		}
	}
	return nil
}

func (this *TexasPlayer) NextForStart() *TexasPlayer {
	if this.room == nil {
		return nil
	}
	for i := (this.pos+1) % this.room.maxplayer; i != this.pos; i = (i + 1) % this.room.maxplayer {
		if this.room.players[i] != nil && this.room.players[i].IsWait() { 
			return this.room.players[i]
		}
	}
	return nil
}

func (this *TexasPlayer) InRoom() bool {
	if this.owner.RoomId() == this.room.Id() {
		return true
	}
	return false
}

func (this *TexasPlayer)SetHole(c1 *Card, c2 *Card){
	this.hole[0] = c1
	this.hole[1] = c2
	this.hand.SetCard(c1, true)
	this.hand.SetCard(c2, true)
	this.hand.AnalyseHand()
	if this.InRoom() {
		send := &msg.RS2C_PushHandCard{}
		send.Card = this.ToHandCard()
		this.owner.SendClientMsg(send)
	}
}

func (this *TexasPlayer)SetFlop(c1 *Card, c2 *Card, c3 *Card){
	this.hand.SetCard(c1, false)
	this.hand.SetCard(c2, false)
	this.hand.SetCard(c3, false)
	if this.IsFold() == false && this.IsWait() == false {
		this.owner.OnFlop(this.room.subkind)
	}
	this.hand.AnalyseHand()
}

func (this *TexasPlayer)SetTurn(c1 *Card){
	this.hand.SetCard(c1, false)
	this.hand.AnalyseHand()
}

func (this *TexasPlayer)SetRiver(c1 *Card){
	this.hand.SetCard(c1, false)
	this.hand.AnalyseHand()
}

func (this *TexasPlayer) GetBankRoll() int64{
	return this.bankroll
}

func (this *TexasPlayer) HasBankRoll() bool {
	if this.bankroll == 0 || this.bankroll < int64(this.room.ante){
		return false
	}
	return true
}

func (this *TexasPlayer) AddBankRoll(num int64, reason string){
	this.bankroll += num
	send := &msg.RS2C_PushChipsChange{}
	send.Roleid = pb.Int64(this.owner.Id())
	send.Bankroll = pb.Int64(this.bankroll)
	this.room.BroadCastRoomMsg(send)
	if this.room.IsChampionShip() {
		this.room.mtt.UpdateUserBankRoll(this.owner.Id(), this.bankroll)
	}
	if this.owner.Id() > 200 {
		log.Info("房间[%d] 玩家[%d] 原因[%s] 增加筹码[%d] 总筹码[%d]", this.room.Id(), this.owner.Id(), reason, num, this.bankroll)
	}
}

func (this *TexasPlayer) AddExp(exp int32, reason string, syn bool) {
	if this.owner != nil && this.owner.aiflag == false {
		this.owner.AddExp(exp, reason, syn)
	}
}

func (this *TexasPlayer) ReqTimeAwardInfo(rev *msg.C2RS_ReqTimeAwardInfo) {
	send := &msg.RS2C_RetTimeAwardInfo{}
	send.Round = pb.Int32(this.rewardround-1)
	send.Sectime = pb.Int32(this.rewardtime)
	this.owner.SendClientMsg(send)
}

func (this *TexasPlayer) ReqTimeAwardGet() {
	send := &msg.RS2C_RetTimeAwardGet{}
	endtime := RoomMgr().GetRewardTime(this.rewardround)
	if endtime > this.rewardtime || endtime == 0 {
		send.Errcode = pb.String("还不能领奖")
		this.owner.SendClientMsg(send)
		//log.Info("房间%d 玩家%d 计时奖励轮数%d end%d now%d", this.room.Id(), this.owner.Id(), this.rewardround, endtime,this.rewardtime)
		return
	}else{
		gold := RoomMgr().GetRewardGold(this.rewardround, this.room.GetRoomType())
		this.owner.AddGold(int64(gold), "领取计时奖励", true)
		this.rewardround++
		this.rewardtime = 0
		this.owner.SendClientMsg(send)
		this.SetTimeReward()
	}
}

func (this *TexasPlayer) SendTimeAward(start bool) {
	send := &msg.RS2C_PushTimeAwardRefresh{}
	//endtime := RoomMgr().GetRewardTime(this.rewardround-1)
	//if endtime > this.rewardtime {
	send.Sectime = pb.Int32(this.rewardtime)
	if start {
		send.Starttime = pb.Int32(int32(util.CURTIME()))
	}
	this.owner.SendClientMsg(send)
}

func (this *TexasPlayer)RemoveBankRoll(num int64, reason string) bool{
	if num == 0 {
		return true
	}
	if num > this.bankroll {
		return false
	}
	this.bankroll -= num
	send := &msg.RS2C_PushChipsChange{}
	send.Roleid = pb.Int64(this.owner.Id())
	send.Bankroll = pb.Int64(this.bankroll)
	this.room.BroadCastRoomMsg(send)
	if this.room.IsChampionShip() {
		this.room.mtt.UpdateUserBankRoll(this.owner.Id(), this.bankroll)
	}
	if this.owner.Id() > 200 {
		log.Info("房间[%d] 玩家[%d] 原因[%s] 扣除筹码[%d] 总筹码[%d]", this.room.Id(), this.owner.Id(), reason, num, this.bankroll)
	}
	return true
}

func (this *TexasPlayer) AIAction(action int32) {
	this.aiacttime = 0
	//log.Info("AI%d手牌分析 等级%d", this.owner.Id(), this.hand.level)
	if action == AINone {
		if this.room.PublicLevel() == this.hand.level {
			//if this.room.PublicValue() == this.hand.finalvalue {
			action = AIUserMgr().GetActionByLevel(1, this.hand.highvalue+2)
			//}else{
			//	action = AIUserMgr().GetActionByLevel(this.hand.level, this.hand.highvalue+2)
			//}
		} else {
			action = AIUserMgr().GetActionByLevel(this.hand.level, this.hand.highvalue+2)
		}
		if this.room.raisecount >= 2 && action == AIRaise{
			action = AICall
		}
		if this.GetBankRoll() >= int64(this.room.bigblindnum) * 10 && this.room.curbet >= this.GetBankRoll() && this.room.state != TPPreFlopBet{
			if this.hand.level <= 1 || (this.hand.level == 2 && this.hand.highvalue <= 7) {
				action = AIFoldCheck
			}
		}
		if this.hand.level <= 1 && this.room.state == TPRiverBet {
			action = AIFoldCheck
		}
		if this.room.state == TPPreFlopBet && action == AIAllIn {
			action = AIRaise
		}
	}
	//log.Info("房间%d AI%d手牌分析%v 等级%d 最高价值%d 行为%d", this.room.Id(), this.owner.Id(), this.ToHandCard(), this.hand.level, this.hand.highvalue, action)
	switch action {
	case AIFoldCheck://弃牌或过牌
		if this.curbet < this.room.curbet {
			this.Betting(-1)
		}else{
			this.Betting(0)
		}
	case AICall://跟注
		if this.curbet >= this.room.curbet {
			this.Betting(0)
		}else{
			this.Betting(this.room.curbet-this.curbet)
		}
	case AIRaise://加注
		if this.GetBankRoll() + this.curbet >= this.room.curbet {
			call := this.room.curbet-this.curbet
			if this.room.curbet <= this.GetBankRoll() - call {
				if this.room.raisebet != 0 {
					this.Betting(this.room.raisebet*2 + call)
				}else {
					this.Betting(this.room.bigblindnum*int64(util.RandBetween(2, 5)) + call)
				}
			}else{
				this.Betting(this.GetBankRoll())
			}
		}else{
			this.Betting(this.GetBankRoll())
		}
	case AIAllIn://AllIn	
		this.Betting(this.GetBankRoll())
	}
}

func (this *TexasPlayer) Tick (){
	if this.readytime > 0 {
		this.readytime--
		if this.readytime == 0 {
			this.isready = true
		}
	}
	if this.timeout >= this.room.tconf.Timeout {
		if this.room.IsChampionShip() {
			this.trusteeship = 5
		}else {
			this.StandUp()
			return
		}
	}

	if this.bettime > 0 {
		this.bettime--
		if this.isai == true {
			if this.bettime == this.aiacttime {
				this.AIAction(0)
			}
		}else{
			if this.bettime == 0 {
				if this.curbet >= this.room.curbet {
					this.Betting(0)
				} else {
					this.Betting(-1)
				}
				this.timeout++
			}
		}
	}

	if !this.IsWait() {
		this.AddRewardTime()
	}
	if this.delaystandup > 0 {
		this.delaystandup--
		if this.delaystandup == 0 {
			this.StandUp()
			return
		}
	}
	if this.mttranktime >= 5 {
		this.SendMttRank()
		this.mttranktime = 0
	}else{
		if this.room.IsChampionShip() {
			this.mttranktime++
		}
	}
}

func (this *TexasPlayer) SendMttRank() {
	if !this.room.IsChampionShip() || this.owner.RoomId() != this.room.Id(){
		return 
	}
	if this.GetBankRoll() == 0 {
		this.rankinfo.Rank = pb.Int32(this.room.mtt.curmembernum)
	}else {
		this.rankinfo.Rank = pb.Int32(this.room.mtt.GetUserRank(this.owner.Id()))
	}
	this.rankinfo.Join = pb.Int32(this.room.mtt.curmembernum)
	this.rankinfo.Avgchips = pb.Int64(this.room.mtt.GetAvgChips())
	this.rankinfo.Recordid = pb.Int32(this.room.mtt.uid)
	this.owner.SendClientMsg(this.rankinfo)
}

func (this *TexasPlayer) AddRewardTime() {
	if this.isai {
		return
	}
	if this.rewardround > RoomMgr().maxrewardround {
		return
	}
	this.rewardtime++
	//log.Info("房间%d 玩家%d 计时%d", this.room.Id(), this.owner.Id(), this.rewardtime)
}

func (this *TexasPlayer) SitDown(pos int32) {
	if this.room.AddPlayer(pos, this) {
		this.pos = pos
		this.room.DelWatcher(this)
		this.gamestate = GSWaitNext
		this.room.UpdateMember()
		//log.Info("玩家%d坐下成功", this.owner.Id())
		this.ResetBankrupt()
	}
}

func (this *TexasPlayer) NextRound(rev *msg.C2RS_ReqNextRound) {
	this.isready = true
	//log.Info("房间%d 玩家%d 准备好了", this.room.Id(), this.owner.Id())
	send := &msg.RS2C_RetNextRound{}
	this.owner.SendClientMsg(send)
}

func (this *TexasPlayer) BrightCard() {
	this.isshowcard = true
	send := &msg.RS2C_RetBrightCard{}
	this.owner.SendClientMsg(send)
	//log.Info("房间%d 玩家%d 结束时亮牌", this.room.Id(), this.owner.Id())
}

func (this *TexasPlayer) AddCoin(rev *msg.C2RS_ReqAddCoin) {
	send := &msg.RS2C_RetAddCoin{}
	if !this.owner.RemoveGold(this.addcoin, "金币兑换筹码", true) {
		send.Errcode = pb.String("金币不足")
	}else{
		this.addcoin = rev.GetNum()
	}
	this.owner.SendClientMsg(send)
	log.Info("房间[%d] 玩家[%d] 下次添加金币[%d]", this.room.Id(), this.owner.Id(), this.addcoin)
}

func (this *TexasPlayer) AutoCoin() {
	if this.addcoin == 0 {
		return
	}
	this.AddBankRoll(this.addcoin, "自动购买筹码")
	this.addcoin = 0
}

func (this *TexasPlayer) AddRebuy(num int64, cost int64) {
	if this.owner.RemoveGold(cost, "金币兑换筹码", true) {
		this.addrebuy = num
		this.delaystandup = 0
		log.Info("房间[%d] 玩家[%d] Rebuy下次添加金币[%d]", this.room.Id(), this.owner.Id(), this.addrebuy)
	}
}

func (this *TexasPlayer) AutoRebuy() {
	if this.addrebuy == 0 {
		return
	}
	this.AddBankRoll(this.addrebuy, "rebuy筹码")
	this.addrebuy = 0
}

func (this *TexasPlayer) AddAddon(num int64, cost int64){
	if this.owner.RemoveGold(cost, "金币兑换筹码", true) {
		this.addaddon = num
		this.delaystandup = 0
		log.Info("房间[%d] 玩家[%d] Addon下次添加金币[%d]", this.room.Id(), this.owner.Id(), this.addaddon)
	}
}

func (this *TexasPlayer) AutoAddon() {
	if this.addaddon == 0 {
		return
	}
	this.AddBankRoll(this.addaddon, "addon筹码")
	this.addaddon = 0
}

func (this *TexasPlayer) AddBankRollNext() {
	this.AutoBuy()
	this.AutoCoin()
	this.AutoRebuy()
	this.AutoAddon()
}

func (this *TexasPlayer) ChangeState(state int32) {
	this.gamestate = state
	send := &msg.RS2C_PushPlayerStateChange{}
	send.Roleid = pb.Int64(this.owner.Id())
	send.State = pb.Int32(this.gamestate)
	send.Num = pb.Int64(this.curbet)
	this.room.BroadCastRoomMsg(send)
	if state == GSAllIn {
		this.isshowcard = true
		this.room.allin++
	}
	//log.Info("房间%d 玩家%d 改变状态%d", this.room.Id(), this.owner.Id(), this.gamestate)
}

func (this *TexasPlayer) AutoBuy() {
	if this.GetBankRoll() >= this.room.ante * 2 {
		return
	}
	if this.autobuy == 0 {
		return
	}
	var buy int64 = 0
	if this.owner.aiflag == false && this.autobuy > this.owner.GetGold() {
		buy = this.owner.GetGold()
	}else {
		buy = this.autobuy
	}
	if !this.owner.RemoveGold(buy, "金币兑换筹码", true) {
		return
	}
	this.AddBankRoll(int64(buy), "购买筹码")
}

func (this *TexasPlayer) BuyInGame(rev *msg.C2RS_ReqBuyInGame) bool {
	strerr := ""
	switch {
	default:
		if !this.room.CheckPos(rev.GetPos()-1) {
			if this.room.IsFullPlayer() {
				strerr = "位置已经被占用"
				break
			}else{
				rev.Pos = pb.Int32(this.room.GetEmptySeat()+1)
			}
		}
		if !this.owner.RemoveGold(rev.GetNum(), "金币兑换筹码", true) {
			strerr = "金币不足"
			break
		}
		if rev.GetIsautobuy() == true {
			this.autobuy = rev.GetNum()
		}
		this.AddBankRoll(rev.GetNum(), "坐下时购买筹码")
		this.SitDown(rev.GetPos()-1)
		this.room.NotifySitStand(this.owner.Id())

		send1 := &msg.RS2C_RetBuyInGame{}
		this.owner.SendClientMsg(send1)
		return true
	}

	send := &msg.RS2C_RetBuyInGame{Errcode : pb.String(strerr)}
	this.owner.SendClientMsg(send)
	return false
}

func (this *TexasPlayer) ReqUserInfo(rev *msg.C2RS_ReqFriendGetRoleInfo) {
	user := UserMgr().FindUser(rev.GetRoleid())
	if user != nil {
		send := user.ToRoleInfo()
		this.owner.SendClientMsg(send)
	} else {
		user = AIUserMgr().FindUser(rev.GetRoleid())
		if user != nil {
			send := user.ToRoleInfo()
			this.owner.SendClientMsg(send)
		}
	}
}

func (this *TexasPlayer) BrightCardInTime() {
	send := &msg.RS2C_RetBrightInTime{}
	this.owner.SendClientMsg(send)
	this.isshowcard = true
	send1 := &msg.RS2C_PushBrightCard{}
	send1.Roleid = pb.Int64(this.owner.Id())
	send1.Card = this.ToHandCard()
	send1.Allin = pb.Bool(false)
	this.room.BroadCastRoomMsg(send1)
}

func (this *TexasPlayer) CheckLeave() bool{
	if !this.HasBankRoll() {
		if !this.room.IsChampionShip() {
			this.StandUp()
			return true
		}else{
			if this.room.mtt.tconf.Type == 2 {
				this.StandUp()
				return true
			}else {
				this.delaystandup = 20
			}
		}
	}
	return false
}

func (this *TexasPlayer) EnterRoom() {
	this.timeout = 0
}

func (this *TexasPlayer) StandUp() bool {
	if this.room.InGame(this) {
		if !this.room.IsChampionShip() {
			this.owner.AddGold(this.bankroll, "离开房间", true)
			this.bankroll = 0
		}
		if !this.IsWait() {
			this.room.remain--
			this.room.playerstate[this.pos] = GSFold
			if this.room.curactpos == this.pos {
				this.Betting(-1)
			}
			log.Info("房间[%d] 玩家[%d] 在游戏中站起 参加人数-1", this.room.Id(), this.owner.Id())
			this.room.SetLeaveRecord(this.owner.Id())
		}
		log.Info("房间[%d] 玩家[%d] 站起", this.room.Id(), this.owner.Id())
		this.room.DelPlayer(this.pos)
		if !this.isai {
			if this.room.IsChampionShip() {
				this.room.mtt.SetMemberOut(this.owner.Id())
			}
			this.Init()
			this.room.AddWatcher(this)
			this.SetTimeReward()
		}
		send := &msg.RS2C_PushSitOrStand{}
		send.Roleid = pb.Int64(this.owner.Id())
		send.State = pb.Int32(2)
		this.room.BroadCastRoomMsg(send)
		this.room.UpdateMember()
		return true
	}
	return false
}

func (this *TexasPlayer) ReqStandUp() bool{
	send := &msg.RS2C_RetStandUp{}
	this.owner.SendClientMsg(send)
	return this.StandUp()
}

func (this *TexasPlayer) ToProto() *msg.TexasPlayer {
	return &msg.TexasPlayer{
		Roleid : pb.Int64(this.owner.Id()),
		Bankroll : pb.Int64(this.bankroll),
		Pos : pb.Int32(this.pos+1),
		State : pb.Int32(this.gamestate),
		Num : pb.Int64(this.curbet),
		Initbankroll : pb.Int64(this.bankroll),
		Totalnum : pb.Int64(this.curbet),
	}
}

func (this *TexasPlayer) ToHandCard() []int32{
	tmpcard := make([]int32, 0)
	for _, v := range this.hole {
		if v == nil {
			continue
		}
		tmpcard = append(tmpcard, v.Suit+1)
		tmpcard = append(tmpcard, v.Value+2)
	}
	return tmpcard
}

//一局牌结束真实玩家处理破产相关内容
func (this *TexasPlayer) OnCheckBankrupt(gamekind, subkind int32) {
	if this.isai == true {
		return
	}
	if gamekind == int32(msg.RoomKind_TexasPoker) {
		if subkind == int32(msg.PlayingFieldType_High) {
			if this.bankroll == 0 && this.owner.GetGold() == 0 {
				Redis().HSet(fmt.Sprintf("bankrupt_%d", this.owner.Id()), "time", util.CURTIME())
			}
		}
		if subkind == int32(msg.PlayingFieldType_Primary) || subkind == int32(msg.PlayingFieldType_Middle) {
			cmdval, err := Redis().HGet(fmt.Sprintf("bankrupt_%d", this.owner.Id()), "time").Result()
			if err == nil {
				time := util.Atol(cmdval)
				if util.CURTIME() - time < 60*60*24 {
					Redis().HIncrBy(fmt.Sprintf("bankrupt_%d", this.owner.Id()), "play", 1)
				}
				if this.bankroll == 0 && this.owner.GetGold() == 0 && util.CURTIME() - time < 60*60*24*3 {
					Redis().HIncrBy(fmt.Sprintf("bankrupt_%d", this.owner.Id()), "count", 1)
				}
			}
		}
	}
}

//玩高级场重置破产相关信息
func (this *TexasPlayer) ResetBankrupt() {
	if this.isai == true {
		return
	}
	if this.room.Kind() ==int32(msg.RoomKind_TexasPoker) && this.room.SubKind() == int32(msg.PlayingFieldType_High) {
		Redis().Del(fmt.Sprintf("bankrupt_%d", this.owner.Id()))
	}
}
