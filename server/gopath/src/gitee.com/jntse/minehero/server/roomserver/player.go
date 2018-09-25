package main

import (
		//"fmt"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/util"
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
	onebet int32
	isshowcard bool
	bankroll int32
	bettime int32
	isready bool
}

type TexasPlayers []*TexasPlayer

func NewTexasPlayer(user *RoomUser) *TexasPlayer{
	player := new(TexasPlayer)
	player.hand = GetHand()
	player.hole = make(Cards, 2, 2)
	player.owner = user
	return player
}

func (this *TexasPlayer)Init(){
	this.hand.Init()
	this.hole = nil
	this.curbet = 0
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
		this.bettime = 10
		send := &msg.RS2C_PushActionPosChange{}
		send.Pos = pb.Int32(this.pos)
		send.Postime = pb.Int32(this.bettime+int32(util.CURTIME()))
		this.room.BroadCastRoomMsg(send)
	}
}

func (this *TexasPlayer) Betting(num int32) {
	if num < 0 { // 弃牌
		this.hole = nil
		this.hand.Init()
		num = 0
		this.betover = true
		this.room.remain--
		this.ChangeState(GSFold)
	} else if num == 0 { // 让牌
		this.betover = true
		this.ChangeState(GSCheck)
	} else if num + this.curbet < this.room.curbet { // 跟注 或者 allin  table.Bet保持不变
		if num == this.GetBankRoll() {
			this.ChangeState(GSAllIn)
			this.room.allin++
		}else{
			this.Betting(-1)
			return
		}
		this.RemoveBankRoll(num)
		this.curbet += num
		this.betover = true
		this.room.chips[this.pos] += num
		this.ChangeState(GSCall)
	} else if num + this.curbet == this.room.curbet	{
		this.RemoveBankRoll(num)
		this.curbet += num
		this.betover = true
		this.room.chips[this.pos] += num
		this.ChangeState(GSCall)
	} else { // 加注
		this.RemoveBankRoll(num)
		this.curbet += num
		this.room.curbet = this.curbet
		this.room.chips[this.pos] += num
		this.room.ClearBetOver()//清除所有人的下注成功
		this.betover = true
		this.ChangeState(GSRaise)
	}
	if !this.room.AllBetOver() {
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
	for i := this.pos % this.room.PlayersNum(); i != this.pos-1; i = (i + 1) % this.room.PlayersNum() {
		if this.room.players[i] != nil && this.room.players[i].gamestate != 0 {
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

func (this *TexasPlayer)AddBankRoll(num int32){
	this.bankroll += num
	send := &msg.RS2C_PushChipsChange{}
	send.Roleid = pb.Int64(this.owner.Id())
	send.Bankroll = pb.Int32(this.bankroll)
	this.room.BroadCastRoomMsg(send)
}

func (this *TexasPlayer)RemoveBankRoll(num int32) bool{
	if num < this.bankroll {
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
	send := &msg.RS2C_RetNextRound{}
	this.owner.SendClientMsg(send)
}

func (this *TexasPlayer) BrightCard() {
	this.isshowcard = true
}

func (this *TexasPlayer) AddCoin() {
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
	send.Num = pb.Int32(this.onebet)
	this.room.BroadCastRoomMsg(send)
}

func (this *TexasPlayer) BuyInGame(rev *msg.C2RS_ReqBuyInGame) {
	strerr := ""
	if !this.room.CheckPos(rev.GetPos()-1) {
		strerr = "位置已经被占用"
		goto doerror
	}
	if !this.owner.RemoveGold(rev.GetNum(), "金币兑换筹码", true) {
		strerr = "金币不足"
		goto doerror
	}
	this.SitDown(rev.GetPos()-1)
	this.AddBankRoll(rev.GetNum())
	this.gamestate = GSFold
	{
		send := &msg.RS2C_PushSitOrStand{}
		send.Roleid = pb.Int64(this.owner.Id())
		send.Pos = pb.Int32(this.pos)
		send.State = pb.Int32(1)
		send.BankRoll = pb.Int32(this.GetBankRoll())
		this.room.BroadCastRoomMsg(send)

        send1 := &msg.RS2C_RetBuyInGame{}
		this.owner.SendClientMsg(send1)
	}
	doerror :
	{
		send := &msg.RS2C_RetBuyInGame{Errcode : pb.String(strerr)}
		this.owner.SendClientMsg(send)
	}
}

func (this *TexasPlayer) ReqUserInfo(rev *msg.C2RS_ReqFriendGetRoleInfo) {
	user := UserMgr().FindUser(rev.GetRoleid())
	if user != nil {
		send := user.ToRoleInfo()
		this.owner.SendClientMsg(send)
	}
}

func (this *TexasPlayer) ToProto() *msg.TexasPlayer {
	return &msg.TexasPlayer{
		Roleid : pb.Int64(this.owner.Id()),
		Bankroll : pb.Int32(this.bankroll),
		Pos : pb.Int32(this.pos),
		State : pb.Int32(this.gamestate),
		Num : pb.Int32(this.onebet),
		Initbankroll : pb.Int32(0),
		Totalnum : pb.Int32(this.curbet),
	}
}

func (this *TexasPlayer) ToHandCard() []int32{
	tmpcard := make([]int32, 0)
	for _, v := range this.hole {
		tmpcard = append(tmpcard, v.Suit+1)
		tmpcard = append(tmpcard, v.Value+2)
	}
	return tmpcard
}
