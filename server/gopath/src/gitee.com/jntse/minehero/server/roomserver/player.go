package main

import (
		//"fmt"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
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
)

type TexasPlayer struct{
	hand *Hand
	hole Cards
	owner *RoomUser
	room *TexasPokerRoom
	pos int32
	gamestate int32
	playstate int32
	curbet int32
	betover bool
	isshowcard bool
	bankroll int32
	bettime int32
	isready bool
	autobuy int32
	addcoin int32
}

type TexasPlayers []*TexasPlayer

func NewTexasPlayer(user *RoomUser, room *TexasPokerRoom) *TexasPlayer{
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
	return player
}

func (this *TexasPlayer)Init(){
	this.hand.Init()
	this.hole = make(Cards, 2, 2)
	this.curbet = 0
	this.betover = false
	this.isshowcard = false
	this.bettime = 0
	this.isready = false
	this.gamestate = GSWaitNext
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
		this.bettime = 15
		send := &msg.RS2C_PushActionPosChange{}
		send.Pos = pb.Int32(this.pos+1)
		send.Postime = pb.Int32(this.bettime+int32(util.CURTIME()))
		this.room.BroadCastRoomMsg(send)
		this.room.curactpos = this.pos
		log.Info("玩家%d 开始下注 pos%d", this.owner.Id(), this.pos)
	}
}

func (this *TexasPlayer) BlindBet(num int32, big bool) {
	this.RemoveBankRoll(num)
    this.curbet += num
	this.room.chips[this.pos] += num
	this.ChangeState(GSBlind)
	if big == true {
		this.room.curbet = this.curbet
	}
}

func (this *TexasPlayer) Betting(num int32) {
	send := &msg.RS2C_RetAction{}
	if this.room.curactpos != this.pos {
		send.Errcode = pb.String("还没轮到你操作")
		this.owner.SendClientMsg(send)
		return
	}
	this.bettime = 0
	if num < 0 { // 弃牌
		this.hole = nil
		this.hand.Init()
		num = 0
		this.betover = true
		this.room.remain--
		this.ChangeState(GSFold)
		log.Info("玩家%d 弃牌 房间人数%d", this.owner.Id(), this.room.remain)
	} else if num == 0 { // 让牌
		this.betover = true
		this.ChangeState(GSCheck)
	} else if num + this.curbet < this.room.curbet { // 跟注 或者 allin  table.Bet保持不变
		if !this.RemoveBankRoll(num) {
			send.Errcode = pb.String("筹码不足")
			this.owner.SendClientMsg(send)
			return
		}
		this.curbet += num
		this.betover = true
		this.room.chips[this.pos] += num
		if this.GetBankRoll() == 0 {
			this.ChangeState(GSAllIn)
			this.room.allin++
		} else {
			this.ChangeState(GSCall)
		}
	} else if num + this.curbet == this.room.curbet	{
		if !this.RemoveBankRoll(num) {
			send.Errcode = pb.String("筹码不足")
			this.owner.SendClientMsg(send)
			return
		}
		this.curbet += num
		this.betover = true
		this.room.chips[this.pos] += num
		if this.GetBankRoll() == 0 {
			this.ChangeState(GSAllIn)
			this.room.allin++
		} else {
			this.ChangeState(GSCall)
		}
	} else { // 加注
		if !this.RemoveBankRoll(num) {
			send.Errcode = pb.String("筹码不足")
			this.owner.SendClientMsg(send)
			return
		}
		this.curbet += num
		this.room.curbet = this.curbet
		this.room.chips[this.pos] += num
		if this.GetBankRoll() == 0 {
			this.ChangeState(GSAllIn)
			this.room.allin++
		} else {
			this.ChangeState(GSRaise)
		}
		this.room.ClearBetOver(false)//清除所有人的下注成功
		this.betover = true
	}
	this.owner.SendClientMsg(send)
	if !this.room.AllBetOver() && this.room.remain != 1{
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
		if this.room.players[i] != nil && this.room.players[i].isready { 
			return this.room.players[i]
		}
	}
	return nil
}

func (this *TexasPlayer)SetHole(c1 *Card, c2 *Card){
	this.hole[0] = c1
	this.hole[1] = c2
	this.hand.SetCard(c1)
	this.hand.SetCard(c2)
	send := &msg.RS2C_PushHandCard{}
	send.Card = this.ToHandCard()
	this.owner.SendClientMsg(send)
}

func (this *TexasPlayer)SetFlop(c1 *Card, c2 *Card, c3 *Card){
	this.hand.SetCard(c1)
	this.hand.SetCard(c2)
	this.hand.SetCard(c3)
}

func (this *TexasPlayer)SetTurn(c1 *Card){
	this.hand.SetCard(c1)
}

func (this *TexasPlayer)SetRiver(c1 *Card){
	this.hand.SetCard(c1)
}

func (this *TexasPlayer) GetBankRoll() int32{
	return this.bankroll
}

func (this *TexasPlayer) AddBankRoll(num int32){
	this.bankroll += num
	send := &msg.RS2C_PushChipsChange{}
	send.Roleid = pb.Int64(this.owner.Id())
	send.Bankroll = pb.Int32(this.bankroll)
	this.room.BroadCastRoomMsg(send)
}

func (this *TexasPlayer) ReqTimeAwardInfo(rev *msg.C2RS_ReqTimeAwardInfo) {
	send := &msg.RS2C_RetTimeAwardInfo{}
	this.owner.SendClientMsg(send)
}

func (this *TexasPlayer)RemoveBankRoll(num int32) bool{
	if num > this.bankroll {
		return false
	}
	this.bankroll -= num
	send := &msg.RS2C_PushChipsChange{}
	send.Roleid = pb.Int64(this.owner.Id())
	send.Bankroll = pb.Int32(this.bankroll)
	this.room.BroadCastRoomMsg(send)
	return true
}

func (this *TexasPlayer) Tick (){
	if this.bettime > 0 {
		this.bettime--
		if this.bettime == 0 {
			if this.curbet >= this.room.curbet {
				this.Betting(0)
			} else {
				this.Betting(-1)
			}
		}
	}
}

func (this *TexasPlayer) SitDown(pos int32) {
	if this.room.AddPlayer(pos, this) {
		this.pos = pos
		this.room.DelWatcher(this)
		if this.room.IsGameStart() {
			this.gamestate = GSWaitNext
		}  
	}
}

func (this *TexasPlayer) NextRound(rev *msg.C2RS_ReqNextRound) {
	this.isready = true
	log.Info("玩家%d 准备好了", this.owner.Id())
	send := &msg.RS2C_RetNextRound{}
	this.owner.SendClientMsg(send)
}

func (this *TexasPlayer) BrightCard() {
	this.isshowcard = true
	send := &msg.RS2C_RetBrightCard{}
	this.owner.SendClientMsg(send)
}

func (this *TexasPlayer) AddCoin(rev *msg.C2RS_ReqAddCoin) {
	this.addcoin = rev.GetNum()
	send := &msg.RS2C_RetAddCoin{}
	this.owner.SendClientMsg(send)
}

func (this *TexasPlayer) AutoCoin() {
	if this.addcoin == 0 {
		return
	}
	if !this.owner.RemoveGold(this.addcoin, "金币兑换筹码", true) {
		return
	}
	this.AddBankRoll(this.addcoin)
	this.addcoin = 0
}

func (this *TexasPlayer) AddBankRollNext() {
	this.AutoBuy()
	this.AutoCoin()
}

func (this *TexasPlayer) AntePay(num int32) {
	this.RemoveBankRoll(num)
}

func (this *TexasPlayer) BlindPay(num int32) {
	this.RemoveBankRoll(num)
}

func (this *TexasPlayer) ChangeState(state int32) {
	this.gamestate = state
	send := &msg.RS2C_PushPlayerStateChange{}
	send.Roleid = pb.Int64(this.owner.Id())
	send.State = pb.Int32(this.gamestate)
	send.Num = pb.Int32(this.curbet)
	this.room.BroadCastRoomMsg(send)
}

func (this *TexasPlayer) AutoBuy() {
	if this.GetBankRoll() != 0 {
		return
	}
	if this.autobuy == 0 {
		return
	}
	if !this.owner.RemoveGold(this.autobuy, "金币兑换筹码", true) {
		return
	}
	this.AddBankRoll(this.autobuy)
}

func (this *TexasPlayer) BuyInGame(rev *msg.C2RS_ReqBuyInGame) bool {
	strerr := ""
	switch {
	default:
		if !this.room.CheckPos(rev.GetPos()-1) {
			strerr = "位置已经被占用"
			break
		}
		if !this.owner.RemoveGold(rev.GetNum(), "金币兑换筹码", true) {
			strerr = "金币不足"
			break
		}
		if rev.GetIsautobuy() == true {
			this.autobuy = rev.GetNum()
		}
		this.SitDown(rev.GetPos()-1)
		this.AddBankRoll(rev.GetNum())
		this.gamestate = GSWaitNext

		send := &msg.RS2C_PushSitOrStand{}
		send.Roleid = pb.Int64(this.owner.Id())
		send.Pos = pb.Int32(this.pos+1)
		send.State = pb.Int32(1)
		send.Bankroll = pb.Int32(this.GetBankRoll())
		this.room.BroadCastRoomMsg(send)

		send1 := &msg.RS2C_RetBuyInGame{}
		this.owner.SendClientMsg(send1)
		log.Info("玩家坐下成功")
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
	}
}

func (this *TexasPlayer) BrightCardInTime() {
	send := &msg.RS2C_RetBrightInTime{}
	this.owner.SendClientMsg(send)

	send1 := &msg.RS2C_PushBrightCard{}
	send1.Roleid = pb.Int64(this.owner.Id())
	send1.Card = this.ToHandCard()
	this.room.BroadCastRoomMsg(send1)
}

func (this *TexasPlayer) CheckLeave() bool{
	if this.GetBankRoll() == 0 {
		this.StandUp()
		return true
	}
	return false
}

func (this *TexasPlayer) StandUp() bool {
	if this.room.InGame(this) {
		this.room.DelPlayer(this.pos)
		this.Init()
		this.room.AddWatcher(this)
		send1 := &msg.RS2C_PushSitOrStand{}
		send1.Roleid = pb.Int64(this.owner.Id())
		send1.State = pb.Int32(2)
		this.room.BroadCastRoomMsg(send1)
		return true
	}
	return false
}

func (this *TexasPlayer) ReqStandUp() bool{
	send := &msg.RS2C_RetStandUp{}
	this.owner.SendClientMsg(send)
	return this.StandUp()
}

func (this *TexasPlayer) LeaveRoom() {
	this.owner.AddGold(this.bankroll, "离开房间", true)
}

func (this *TexasPlayer) ToProto() *msg.TexasPlayer {
	return &msg.TexasPlayer{
		Roleid : pb.Int64(this.owner.Id()),
		Bankroll : pb.Int32(this.bankroll),
		Pos : pb.Int32(this.pos+1),
		State : pb.Int32(this.gamestate),
		Num : pb.Int32(this.curbet),
		Initbankroll : pb.Int32(this.bankroll),
		Totalnum : pb.Int32(this.curbet),
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
