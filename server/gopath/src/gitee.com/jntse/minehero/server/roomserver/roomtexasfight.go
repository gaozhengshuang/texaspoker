package main
import (
	//"sort"
	//"fmt"
	//"time"
	//"errors"
	"math/rand"

	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	//"gitee.com/jntse/gotoolkit/net"

	//"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/pbmsg"
	//"gitee.com/jntse/minehero/server/tbl"
	//"gitee.com/jntse/minehero/server/tbl/excel"
)

func (tf *TexasFightRoom) Handler1sTick(now int64) {
	switch tf.stat {
	case kStatWaitNextRound:
		if tf.IsStateTimeOut(now) { tf.ChangeToBettingStat(now) }
		break
	case kStatBetting:
		tf.SynBetPoolChange()
		if tf.IsStateTimeOut(now) { tf.ChangeToWaitNextRoundStat(now) }
		break
	}
}

func (tf *TexasFightRoom) Handler100msTick(now int64) {
}

// 下注池变更推送
func (tf *TexasFightRoom) SynBetPoolChange() {
	if tf.betstat.Dirty() == false {
		return
	}

	synbetmsg := &msg.RS2C_PushBetPoolChange{Posbetlist:make([]*msg.TFBetPoolChange, 0)}
	for k, pool := range tf.betpool {
		synbetmsg.Bet[k] = pool.Total()
	}
	for _, bs := range tf.betstat.seats {
		if bs == nil { continue }
		info := &msg.TFBetPoolChange{Pos:pb.Int32(bs.seat), Bet:make([]int32,0)}
		for _, bet := range bs.poolbet { info.Bet = append(info.Bet, bet) }
		synbetmsg.Posbetlist = append(synbetmsg.Posbetlist, info)
	}
	tf.BroadCastMemberMsg(synbetmsg)

	// 重置
	tf.betstat.Reset()
}

// 检查玩家上庄和下庄
func (tf *TexasFightRoom) CheckPlayerBanker() {

	//  检查玩家庄家是否还能继续坐庄
	if false == tf.banker.IsSystem() {
		kickbanker, p := false, tf.banker
		if tf.banker.Gold() < tf.tconf.BankerMinGold {
			log.Info("[百人大战] 玩家[%s %d] 金币不足[%d] 不能继续坐庄", p.Name(), p.Id(), tf.tconf.BankerMinGold)
			kickbanker = true 
		} else if p.BeBankerRound() < tf.tconf.BankerRound {
			kickbanker = true
			log.Info("[百人大战] 玩家[%s %d] 坐庄达到最大轮数[%d] 不能继续坐庄", p.Name(), p.Id(), tf.tconf.BankerRound)
		}

		// 玩家庄家下庄
		if kickbanker == true {
			tf.banker.Sit(-1)
			tf.banker.ResetBankerRound()
			posmsg := &msg.RS2C_PushTFPosChange{ Pos:pb.Int32(0), Roleid:pb.Int64(0), Bankergold:pb.Int32(0) }
			tf.BroadCastMemberMsg(posmsg)	// TODO: 下庄这个推送可以省掉
		}

		tf.banker = nil
	}


	// 下一个玩家庄家
	if len(tf.bankerqueue) != 0 {
		p := tf.bankerqueue[0]
		if p.Seat() != -1 {	// 在座位上先离开座位
			tf.UserStandUp(p.owner)
		}

		tf.banker = p
		tf.banker.Sit(0)
		tf.banker.ResetBankerRound()
		tf.bankerqueue = tf.bankerqueue[1:]
		posmsg := &msg.RS2C_PushTFPosChange{Pos:pb.Int32(0), Roleid:pb.Int64(tf.banker.Id()), Bankergold:pb.Int32(tf.banker.Gold()) }
		tf.BroadCastMemberMsg(posmsg)
		log.Info("[百人大战] 玩家[%s %d] 成为正式庄家", tf.banker.Name(), tf.banker.Id())
		return
	}


	//系统庄家回归
	if tf.banker == nil {
		tf.banker = tf.bankersys
		tf.banker.Sit(0)
		posmsg := &msg.RS2C_PushTFPosChange{Pos:pb.Int32(0), Roleid:pb.Int64(tf.banker.Id()), Bankergold:pb.Int32(tf.banker.Gold()) }
		tf.BroadCastMemberMsg(posmsg)
		log.Info("[百人大战] 切换到系统庄家")
	}

}

//
func (tf *TexasFightRoom) FindPlayer(uid int64) *TexasFightPlayer {
	p, _ := tf.players[uid]
	return p
}

//
func (tf *TexasFightRoom) AddPlayer(u *RoomUser) *TexasFightPlayer {
	p := NewTexasFightPlayer(u, false)
	tf.players[u.Id()] = p
	return p
}


// 切换等待下一局状态
func (tf *TexasFightRoom) ChangeToWaitNextRoundStat(now int64) {
	tf.stat = kStatWaitNextRound
	tf.statstart = now
	tf.stattimeout = now + int64(tf.tconf.TimeOut) * 1000
	tf.CardDeal()

	// 房间状态变更推送
	statmsg := &msg.RS2C_PushTFStateChange{State:pb.Int32(tf.stat), Statetime:pb.Int64(tf.stattimeout)}
	tf.BroadCastMemberMsg(statmsg)

	//
	log.Info("[百人大战] 房间[%d] 切换到等待下一局状态", tf.Id())
}


// 切换到下注状态
func (tf *TexasFightRoom) ChangeToBettingStat(now int64) {
	tf.stat = kStatBetting
	tf.statstart = now
	tf.stattimeout = now + int64(tf.tconf.BetTime) * 1000

	// 洗牌
	tf.CardShuffle()

	// 重置押注池
	for _, pool := range  tf.betpool {
		pool.Reset()
	}
	
	// 重置玩家数据
	for _, p := range tf.players {
		p.Reset()
	}

	// 坐下玩家下注统计
	tf.betstat.Reset()

	// 房间状态变更推送
	statmsg := &msg.RS2C_PushTFStateChange{State:pb.Int32(tf.stat), Statetime:pb.Int64(tf.stattimeout)}
	tf.BroadCastMemberMsg(statmsg)

	//
	log.Info("[百人大战] 房间[%d] 切换到下注状态", tf.Id())
}


// 洗牌
func (tf *TexasFightRoom) CardShuffle() {
	rand.Shuffle(len(tf.cards), func(i, j int) {
		tf.cards[i], tf.cards[j] = tf.cards[j], tf.cards[i]
	})
}


// 发牌
func (tf *TexasFightRoom) CardDeal() {
	begin, end := 0, 5
	for _, pool := range tf.betpool {
		pool.InsertCards(tf.cards[begin:end])
		begin += 5
		end += 5
	}
}


// 请求下一局开局
func (tf *TexasFightRoom) RequestGameStart(u *RoomUser) {
	// 只有自己一个人
	if _, find := tf.players[u.Id()]; find == true && len(tf.players) == 1 {
		tf.ChangeToBettingStat(util.CURTIME())
		return
	}
}


// 请求下注
func (tf *TexasFightRoom) RequestBet(u *RoomUser, pos int32, num int32) {
	player := tf.FindPlayer(u.Id())
	if player == nil {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 请求下注找不到玩家Player", u.Name(), u.Id(), tf.Id())
		return
	}

	if player.Seat() == 0 {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 庄家不需要下注", u.Name(), u.Id(), tf.Id())
		return
	}

	if tf.stat != kStatBetting {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 请求下注失败，当前不在下注状态中", u.Name(), u.Id(), tf.Id())
		return
	}

	// 下注的总金额不得大于身上携带金额的七分之一
	betlimit, bettotal := u.GetGold() / 7, player.TotalBet() + num
	if bettotal > betlimit {
		u.SendNotify("下注总额超过携带金额七分之一")
		return
	}

	//
	player.Bet(pos, num)

	//
	resp := &msg.RS2C_RetTexasFightBet{}
	u.SendClientMsg(resp)

	// 下注池临时统计
	tf.betstat.MarkDirty()
	if seat := player.Seat(); seat != -1 {
		if tf.betstat.seats[seat] == nil { tf.betstat.seats[seat] = &SitPlayerBetInfo{} }
		tf.betstat.seats[seat].seat = seat
		tf.betstat.seats[seat].poolbet[pos] += num
	}

	log.Trace("[百人大战] 玩家[%s %d] 房间[%d] 下注[%d]成功，金额[%d]", u.Name(), u.Id(), tf.Id(), pos, num)
}


// 拉取上次奖池信息击中信息
func (tf *TexasFightRoom) RequestLastAwardPoolHit(u *RoomUser) {
	send := &msg.RS2C_RetTFLastAwardPoolHit{Cards:make([]int32,0,10)}
	send.Gold = pb.Int32(tf.poolhit.gold)
	send.Time = pb.Int64(tf.poolhit.time)
	for _, card := range tf.poolhit.cards {
		send.Cards = append(send.Cards, card.Suit)
		send.Cards = append(send.Cards, card.Value)
	}
	for _, p := range tf.poolhit.players {
		send.Prizelist = append(send.Prizelist, p)
	}
	u.SendClientMsg(send)
}


// 请求上庄
func (tf *TexasFightRoom) RequestBecomeBanker(u *RoomUser) {
	if u.GetGold() < tf.tconf.BankerGold {
		u.SendNotify("上庄金币不足")
		return
	}

	// player 指针
	player := tf.FindPlayer(u.Id())
	if player == nil {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 找不到玩家Player", u.Name(), u.Id(), tf.Id())
		return
	}

	// TODO: 已经是庄家
	if false {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 已经是庄家", u.Name(), u.Id(), tf.Id())
		return
	}

	for _, p := range tf.bankerqueue {
		if p.Id() == u.Id() {
			log.Error("[百人大战] 玩家[%s %d] 房间[%d] 已经在庄家列表了", u.Name(), u.Id(), tf.Id())
			return
		}
	}


	tf.bankerqueue = append(tf.bankerqueue, player)
	send := &msg.RS2C_RetTFBecomeBanker{}
	u.SendClientMsg(send)

	log.Info("[百人大战] 玩家[%s %d] 房间[%d] 请求上庄",  u.Name(), u.Id(), tf.Id())
}


// 请求下庄
func (tf *TexasFightRoom) RequestQuitBanker(u *RoomUser) {
	player := tf.FindPlayer(u.Id())
	if player == nil {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 找不到玩家Player", u.Name(), u.Id(), tf.Id())
		return
	}

	if tf.stat == kStatBetting {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 下注中不能下庄", u.Name(), u.Id(), tf.Id())
		return
	}

	// TODO: 庄家
	if player.Id() == tf.banker.Id() {
	}

	// 上庄列表
	qsize := len(tf.bankerqueue)
	for i:=0; i < qsize; i++ {
		if tf.bankerqueue[i].Id() != u.Id() { continue }
		if i == qsize - 1 { tf.bankerqueue = tf.bankerqueue[:qsize-1]; break }
		tf.bankerqueue = append(tf.bankerqueue[:i], tf.bankerqueue[i+1:]...)
		break
	}

	send := &msg.C2RS_ReqTFQuitBanker{}
	u.SendClientMsg(send)

	log.Info("[百人大战] 玩家[%s %d] 房间[%d] 请求下庄",  u.Name(), u.Id(), tf.Id())
}


// 请求站起玩家列表
func (tf *TexasFightRoom) SendStandPlayerList(u *RoomUser, start, count int32) {
	send := &msg.RS2C_RetTFStandPlayer{Playerlist:make([]*msg.TFPlayer,0)}
	for _, p := range tf.players {
		if p.Seat() != -1 { continue } 
		info := p.FillPlayerInfo()
		send.Playerlist = append(send.Playerlist, info)
	}
	u.SendClientMsg(send)
}


// 拉取庄家列表
func (tf *TexasFightRoom) SendBankerList(u *RoomUser) {
	send := &msg.RS2C_RetTFBankerList{Bankerlist:make([]*msg.TFPlayer, 0)}
	for _, p := range tf.bankerqueue {
		send.Bankerlist = append(send.Bankerlist, p.FillPlayerInfo())
	}
	u.SendClientMsg(send)
}


// 拉取胜负走势列表
func (tf *TexasFightRoom) SendWinLoseTrend(u *RoomUser) {
	send := &msg.RS2C_RetWinLoseTrend{Trendlist:make([]*msg.TFWinLoseTrend, 0)}
	info := &msg.TFWinLoseTrend{}
	send.Trendlist = append(send.Trendlist, info)
	u.SendClientMsg(send)
}


// 请求房间列表
func SendTexasFightRoomList(agent int, userid int64) {
	send := &msg.GW2C_RetTFRoomList{Array:make([]*msg.TexasFightRoom,0)}
	for _, room := range RoomMgr().TexasFightRoomList() {
		tf := room.(*TexasFightRoom)
		info := &msg.TexasFightRoom{}
		info.Id = pb.Int64(tf.Id())
		info.Hwid = pb.Int32(tf.Tid())
		info.Join = pb.Int32(tf.PlayersNum())
		info.Pool = pb.Int32(tf.AwardPoolSize())
		send.Array = append(send.Array, info)
	}
	RoomSvr().SendClientMsg(agent, userid, send)
}


