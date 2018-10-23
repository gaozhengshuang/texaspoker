package main
import (
	"sort"
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

	synbetmsg := &msg.RS2C_PushBetPoolChange{Posbetlist:make([]*msg.TFBetPoolChange, 0), Bet:make([]int32, 0)}
	for _, pool := range tf.betpool {
		synbetmsg.Bet = append(synbetmsg.Bet, pool.Size())
	}
	for _, bs := range tf.betstat.seats {
		if bs == nil { continue }
		info := &msg.TFBetPoolChange{Pos:pb.Int32(bs.seat), Bet:make([]int32,0)}
		for _, bet := range bs.poolbet { 
			info.Bet = append(info.Bet, bet) 
		}
		synbetmsg.Posbetlist = append(synbetmsg.Posbetlist, info)
	}
	tf.BroadCastMemberMsg(synbetmsg)

	// 重置
	tf.betstat.Reset()
}

// 检查玩家上庄和下庄
func (tf *TexasFightRoom) PlayerBankerCheck() {

	if tf.banker.IsSystem()  { 
		tf.banker.AddBankerRound(1)
	}

	//  检查玩家庄家是否还能继续坐庄
	if false == tf.banker.IsSystem() {
		kickbanker, p := false, tf.banker
		if tf.banker.QuitBankerFlag() == true {
			log.Info("[百人大战] 玩家[%s %d] 主动下庄", p.Name(), p.Id(), tf.tconf.BankerMinGold)
			kickbanker = true
		}else if tf.banker.Gold() < tf.tconf.BankerMinGold {
			log.Info("[百人大战] 玩家[%s %d] 金币不足[%d] 不能继续坐庄", p.Name(), p.Id(), tf.tconf.BankerMinGold)
			kickbanker = true 
		} else if p.BeBankerRound() < tf.tconf.BankerRound {
			kickbanker = true
			log.Info("[百人大战] 玩家[%s %d] 坐庄达到最大轮数[%d] 不能继续坐庄", p.Name(), p.Id(), tf.tconf.BankerRound)
		}

		// 玩家离开庄位
		if kickbanker == true {
			tf.bankerqueue = tf.bankerqueue[1:]
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

	// 发牌
	tf.CardDeal()

	// 房间状态变更推送
	statmsg := &msg.RS2C_PushTFStateChange{State:pb.Int32(tf.stat), Statetime:pb.Int64(tf.stattimeout)}
	tf.BroadCastMemberMsg(statmsg)

	// 回合结束
	tf.RoundOver()

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


// 回合结束
func (tf *TexasFightRoom) RoundOver() {

	// 结算
	tf.RoundSettle()

	// 检查玩家庄家
	tf.PlayerBankerCheck()
}

// 回合结算
func (tf *TexasFightRoom) RoundSettle() {

	// 计算下注池胜负
	bankerpool := tf.betpool[0]
	winrecord := &WinLoseRecord{}
	hitlist := make(SortTexasFightBetPool, 0)
	for k, pool := range tf.betpool {
		if k >= 1  {
			var result int32 = kBetResultLose
			if pool.GetCardValue() < bankerpool.GetCardValue() { 
				result = kBetResultLose
			}else if pool.GetCardValue() > bankerpool.GetCardValue() {
				result = kBetResultWin
			}else if pool.GetCardValue() == bankerpool.GetCardValue() { 
				result = kBetResultTie
			}
			pool.SetResult(result) 
			winrecord.results[k-1] = result
		}

		if pool.tconf.PoolOdds != 0 {
			hitlist = append(hitlist, pool)
		}
	}

	//  胜负历史记录
	tf.winloserecord = append(tf.winloserecord, winrecord)


	// 瓜分奖池
	tf.CarveUpAwardPool(&hitlist)


	// 玩家利润结算
	kicklist := make([]*TexasFightPlayer, 0)
	for _, player := range tf.players {
		if player.IsSystem() { continue }
		if player.IsBanker() { continue }
		if player.TotalBet() == 0 {
			player.SetWatchCount(player.WatchCount() + 1)
			if player.WatchCount() >= tf.tconf.Kick {
				kicklist = append(kicklist, player)
			}
			continue
		}
		player.Settle(tf)
	}

	// 连续观战计数，大于一定次数踢出房间
	for _, p := range kicklist {
		tf.OnPlayerKickOut(p)
	}

	// 推送结算消息
	tf.SendRoundOverMsg()
}

// 瓜分奖池
func (tf *TexasFightRoom) CarveUpAwardPool(hitlist *SortTexasFightBetPool) {
	pools := *hitlist
	sort.Sort(pools)
	for _, pool := range pools {
		if pool.Pos() == 0 {
		}
	}

}

// 玩家超过N轮未下注被踢出
func (tf *TexasFightRoom) OnPlayerKickOut(p *TexasFightPlayer) {
	log.Info("[百人大战] 玩家[%s %d] 超过%d轮未下注，被踢出房间[%d]", p.Name(), p.Id(), tf.tconf.Kick, tf.Id())
	// 坐下玩家
	if p.Seat() != -1 {
		tf.UserStandUp(p.owner)
	}

	//
	p.OnKickOut()
	p.owner.OnKickOutRoom()

	// 清理上庄列表
	tf.BankerQueueRemove(p.Id())
	delete(tf.players, p.Id())
	delete(tf.members, p.Id())
}

// 推送结算消息
func (tf *TexasFightRoom) SendRoundOverMsg() {
	roundmsg := &msg.RS2C_PushTFRoundOver{Betlist:make([]*msg.TFBetPool,0), Ranklist:make([]*msg.TFRankPlayer,0)}
	roundmsg.Pool = pb.Int32(tf.AwardPoolSize())
	roundmsg.Bankergold = pb.Int32(tf.banker.Gold())

	// 下注池信息
	for k, pool := range tf.betpool {
		if k == 0 { continue }
		info := &msg.TFBetPool{Pos:pb.Int32(pool.Pos()), Win:pb.Int32(pool.Result()), Cards:make([]int32,0)}
		for _, card := range pool.cards {
			info.Cards = append(info.Cards, card.Suit)
			info.Cards = append(info.Cards, card.Value)
		}
		roundmsg.Betlist = append(roundmsg.Betlist, info)
	}

	// 赢钱玩家列表
	for _, player := range tf.players {
		if player.TotalProfit() <= 0 { continue }
		roundmsg.Ranklist = append(roundmsg.Ranklist, player.FillRankPlayerInfo())
	}

	// 坐下玩家信息
	for _, player := range tf.sitplayers {
		if player == nil { continue }
		roundmsg.Sitplayers = append(roundmsg.Sitplayers, player.FillPlayerInfo())
	}

	// 个人信息
	for _, player := range tf.players {
		roundmsg.Gold = pb.Int32(player.TotalProfit())
		roundmsg.Iswin = pb.Bool(player.TotalProfit() >= 0)
		player.owner.SendClientMsg(roundmsg)
	}
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
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 请求下注失败，非下注状态中", u.Name(), u.Id(), tf.Id())
		return
	}

	if pos == 0 {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 请求下注失败，不能下注庄家注池", u.Name(), u.Id(), tf.Id())
		return
	}

	bfind := false
	for _, bet := range tf.tconf.Bet {
		if bet == num { bfind = true }
	}
	if bfind == false {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 请求下注失败，无效的注码[%d]", u.Name(), u.Id(), tf.Id(), num)
		return
	}

	if num > u.GetGold() {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d] 请求下注失败，身上没有足够的钱下注", u.Name(), u.Id(), tf.Id())
		return
	}

	// 下注的总金额不得大于身上携带金额的七分之一
	betlimit, bettotal := u.GetGold() / 7, player.TotalBet() + num
	if bettotal > betlimit {
		u.SendNotify("下注总额超过携带金额七分之一")
		return
	}

	// 所有玩家下注不能超过庄家金额的七分之一，系统庄家例外
	if tf.banker.IsSystem() == false {
		var totalbet int32 = 0
		for _, pool := range tf.betpool {
			totalbet += pool.Size()
		}
		if totalbet > tf.banker.Gold() / 7  {
			resp := &msg.RS2C_RetTexasFightBet{Errcode:pb.String("下注金额超过庄家赔付能力")}
			u.SendClientMsg(resp)
			return
		}
	}

	// 开始下注
	tf.betpool[pos].Inc(num)
	player.Bet(pos, num)
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
	if tf.poolhit.time == 0 {
		log.Warn("[百人大战] 玩家[%s %d] 房间[%d] 没有奖池信息击中历史信息", u.Name(), u.Id(), tf.Id())
		return
	}

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
		player.SetQuitBankerFlag()		// 标记庄家，本轮结束退出
	}else {
		tf.BankerQueueRemove(u.Id())	// 上庄列表
	}

	send := &msg.C2RS_ReqTFQuitBanker{}
	u.SendClientMsg(send)

	log.Info("[百人大战] 玩家[%s %d] 房间[%d] 请求下庄",  u.Name(), u.Id(), tf.Id())
}

func (tf *TexasFightRoom) BankerQueueRemove(uid int64) {
	qsize := len(tf.bankerqueue)
	for i:=0; i < qsize; i++ {
		if tf.bankerqueue[i].Id() != uid { 
			continue 
		}

		if i == qsize - 1 { 
			tf.bankerqueue = tf.bankerqueue[:qsize-1]; 
			break 
		}

		tf.bankerqueue = append(tf.bankerqueue[:i], tf.bankerqueue[i+1:]...)
		break
	}
}

// 请求站起玩家列表 TODO:玩家列表使用的HashMap，需要使用固定顺序列表才能支持分段拉取
func (tf *TexasFightRoom) SendStandPlayerList(u *RoomUser, start, count int32) {

	//TODO: 列表大量数据时，每次排序消耗会很大
	sortlist := make(SortFightPlayer, 0)
	for _, p := range tf.players {
		if p.Seat() != -1 { continue } 
		sortlist = append(sortlist, p)
	}
	sort.Sort(sortlist)

	send := &msg.RS2C_RetTFStandPlayer{Playerlist:make([]*msg.TFPlayer,0)}
	for _, p := range sortlist {
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
	for _, record := range tf.winloserecord {
		send.Trendlist = append(send.Trendlist, record.FillWinLoseTrend())
	}
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


