package main

import (
		//"fmt"
)

const (
	GSNone int32 = iota
	GSWaitNext
	GSGame
	GSFold
	GSAllIn
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

func (this *TexasPlayer) GetChip() int32{
	return 0
}

func (this *TexasPlayer) BetStart() {
	//发送开始压注消息
}

func (this *TexasPlayer) Betting(num int32) {
	if num < 0 { // 弃牌
		this.hole = nil
		this.hand.Init()
		num = 0
		this.betover = true
		this.gamestate = GSFold
	} else if num == 0 { // 让牌
		this.betover = true
	} else if num + this.curbet < this.room.curbet {
		//钱不够 allin
		this.RemoveChip(num)
		this.curbet += num
		this.betover = true
		this.room.chips[this.pos] += num
	} else if num + this.curbet == this.room.curbet { // 跟注 或者 allin  table.Bet保持不变
		//扣钱
		this.RemoveChip(num)
		this.curbet += num
		this.betover = true
		this.room.chips[this.pos] += num
	} else { // 加注
		this.RemoveChip(num)
		this.curbet += num
		this.room.curbet = this.curbet
		this.room.chips[this.pos] += num
		this.room.ClearBetOver()//清除所有人的下注成功
		this.betover = true
	}
	if this.GetChip() == 0 {
		this.gamestate = GSAllIn
	}
	return
}

func (this *TexasPlayer) BetOver() bool {
	if this.IsFold() || this.betover{
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

func (this *TexasPlayer)AddChip(num int32){
	//this.owner.AddYuanbao(num)
}

func (this *TexasPlayer)RemoveChip(num int32){
}

func (this *TexasPlayer)Tick(){
}

