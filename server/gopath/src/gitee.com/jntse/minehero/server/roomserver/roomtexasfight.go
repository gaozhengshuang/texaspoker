package main
import (
	"encoding/json"
	"sort"
	"fmt"
	//"time"
	//"errors"
	"math/rand"
	"strconv"
	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	//"gitee.com/jntse/gotoolkit/net"

	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
)

func (tf *TexasFightRoom) Handler1sTick(now int64) {
	switch tf.stat {
	case kStatWaitNextRound:
		if tf.IsStateTimeOut(now/1000) { tf.ChangeToBettingStat(now) }
		break
	case kStatBetting:
		if tf.IsStateTimeOut(now/1000) { tf.ChangeToWaitNextRoundStat(now) }
		break
	}

	// 下注池变更推送
	tf.SynBetPoolChange()
}

func (tf *TexasFightRoom) Handler100msTick(now int64) {
}

// 下注池变更推送
func (tf *TexasFightRoom) SynBetPoolChange() {
	if tf.betstat.Dirty() == false {
		return
	}

	synbetmsg := &msg.RS2C_PushBetPoolChange{Posbetlist:make([]*msg.TFBetPoolChange, 0), Bet:make([]*msg.TFBetPoolBetInfo, 0)}
	for _, pool := range tf.betpool {
		if pool.Pos() == 0 { continue }
		info := &msg.TFBetPoolBetInfo{Bet:pb.Int64(pool.BetNum()), Roles:make([]int64,0)}
		for _, pid := range tf.betstat.poolroles[pool.Pos()] {
			info.Roles = append(info.Roles, pid)
		}
		synbetmsg.Bet = append(synbetmsg.Bet, info)
	}

	for _, bs := range tf.betstat.seats {
		if bs == nil { continue }
		info := &msg.TFBetPoolChange{Pos:pb.Int32(bs.seat), Bet:make([]int64,0)}
		for pos, bet := range bs.poolbet { 
			if pos == 0 { continue }
			info.Bet = append(info.Bet, bet) 
		}
		synbetmsg.Posbetlist = append(synbetmsg.Posbetlist, info)
	}
	tf.BroadCastMemberMsg(synbetmsg)

	// 重置
	tf.betstat.Reset()
}

// 检查是否跟换庄家
func (tf *TexasFightRoom) BankerCheck() {

	//  检查玩家庄家是否还能继续坐庄
	tf.PlayerBankerKeepCheck()

	// 下一个玩家成为庄家
	tf.PlayerBankerAppointCheck()

	// 切换回系统庄家
	tf.SystemBankerBackCheck()
}

// 检查玩家庄家是否还能继续坐庄
func (tf *TexasFightRoom) PlayerBankerKeepCheck() {
	if  true == tf.banker.IsSystem() {
		return
	}

	p := tf.banker
	p.AddBankerRound(1)
	if p.BankerFlag() == kPlayerBankerQuit {
		log.Info("[百人大战] 玩家[%s %d] 主动下庄", p.Name(), p.Id())
	}else if p.Gold() < tf.tconf.BankerMinGold {
		log.Info("[百人大战] 玩家[%s %d] 金币不足[%d] 不能继续坐庄", p.Name(), p.Id(), tf.tconf.BankerMinGold)
		p.SetBankerFlag(kPlayerBankerNotSatisfied)
	} else if p.BankerRound() > tf.tconf.BankerRound {
		p.SetBankerFlag(kPlayerBankerNotSatisfied)
		log.Info("[百人大战] 玩家[%s %d] 坐庄达到最大轮数[%d] 不能继续坐庄", p.Name(), p.Id(), tf.tconf.BankerRound)
	}

	// 玩家离开庄位
	if tf.banker.BankerFlag() != kPlayerBankerNormal {
		tf.bankerqueue.Remove(tf.bankerqueue.Front())
		tf.banker.Sit(-1)
		tf.banker.ResetBankerRound()

		// TODO: 下庄这个推送可以省掉
		posmsg := &msg.RS2C_PushTFPosChange{Bankergold:pb.Int64(0), Player:&msg.TFPlayer{}}
		posmsg.Player = p.FillPlayerInfo()
		posmsg.Player.Pos = pb.Int32(0)
		posmsg.Player.Roleid = pb.Int64(0)
		tf.BroadCastMemberMsg(posmsg)
	}
}

// 任命玩家庄家检查
func (tf *TexasFightRoom) PlayerBankerAppointCheck() {
	if tf.bankerqueue.Len() == 0 {
		return
	}

	if false == tf.banker.IsSystem() && tf.banker.BankerFlag() == kPlayerBankerNormal {
		return
	}

	// 在座位上先离开座位
	elem := tf.bankerqueue.Front()
	p := elem.Value.(*TexasFightPlayer)
	if p.Seat() != -1 {
		tf.UserStandUp(p.owner)
	}

	p.BecomeBanker()
	p.AddBankerRound(1)
	tf.banker = p
	tf.sitplayers[0] = tf.banker

	posmsg := &msg.RS2C_PushTFPosChange{Bankergold:pb.Int64(tf.banker.Gold()), Player:&msg.TFPlayer{}}
	posmsg.Player = p.FillPlayerInfo()
	tf.BroadCastMemberMsg(posmsg)
	log.Info("[百人大战] 玩家[%s %d] 房间[%d %d] 成为正式庄家", tf.banker.Name(), tf.banker.Id(), tf.Id(), tf.Round())
	return
}

// 切换系统庄家检查
func (tf *TexasFightRoom) SystemBankerBackCheck() {
	if tf.banker.IsSystem() == true {
		return
	}

	if tf.banker.BankerFlag() == kPlayerBankerNormal {
		return
	}

	tf.bankersys.BecomeBanker()
	tf.banker = tf.bankersys
	tf.sitplayers[0] = tf.banker

	posmsg := &msg.RS2C_PushTFPosChange{Bankergold:pb.Int64(tf.banker.Gold()), Player:&msg.TFPlayer{}}
	posmsg.Player = tf.banker.FillPlayerInfo()
	tf.BroadCastMemberMsg(posmsg)
	log.Info("[百人大战] 房间[%d %d] 切换回系统庄家", tf.Id(), tf.Round())
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
	tf.statstart = now / 1000
	tf.stattimeout = tf.statstart + int64(tf.tconf.TimeOut)

	// 发牌
	tf.CardDeal()

	// 房间状态变更推送
	statmsg := &msg.RS2C_PushTFStateChange{State:pb.Int32(tf.stat), Statetime:pb.Int64(tf.statstart)}
	tf.BroadCastMemberMsg(statmsg)

	// 回合结束
	tf.RoundOver()

	if tf.PlayersNum() != 0 {
		log.Info("[百人大战] 房间[%d %d] 切换到等待下一局状态", tf.Id(), tf.Round())
	}
}


// 切换到下注状态
func (tf *TexasFightRoom) ChangeToBettingStat(now int64) {


	tf.stat = kStatBetting
	tf.statstart = now / 1000
	tf.stattimeout = tf.statstart + int64(tf.tconf.BetTime)
	tf.round += 1

	// 检查庄家
	tf.BankerCheck()

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

	// 庄家重置
	tf.banker.Reset()

	// 坐下玩家下注统计
	tf.betstat.Reset()

	// 房间状态变更推送
	statmsg := &msg.RS2C_PushTFStateChange{State:pb.Int32(tf.stat), Statetime:pb.Int64(tf.statstart)}
	tf.BroadCastMemberMsg(statmsg)

	//
	if tf.PlayersNum() != 0 {
		log.Info("[百人大战] 房间[%d %d] 切换到下注状态", tf.Id(), tf.Round())
	}
}


// 回合结束
func (tf *TexasFightRoom) RoundOver() {

	// 结算
	tf.RoundSettle()

	// 奖池
	if tf.PlayersNum() != 0 {
		log.Trace("[百人大战] 房间[%d %d] 本轮结算完成，奖池余额[%d]", tf.Id(), tf.Round(), tf.TotalAwardPool())
	}
}

// 回合结算
func (tf *TexasFightRoom) RoundSettle() {

	// 各注池结算
	tf.BetPoolSettle()

	// 玩家结算
	tf.PlayerSettle()

	// 庄家结算
	tf.BankerSettle()

	// 推送结算消息
	tf.SendRoundOverMsg()
}

// 注池结算
func (tf *TexasFightRoom) BetPoolSettle() {
	bankerpool := tf.betpool[0]
	winrecord := &WinLoseRecord{}
	levelgroups := make(map[int32][]*TexasFightBetPool, 0)
	for k, pool := range tf.betpool {
		if k != 0 {
			result := pool.Compare(bankerpool)
			pool.SetResult(result) 
			winrecord.results[k-1] = result
		}

		// 注池至少有一个人押注，才能参与分割奖池
		if level := pool.CardLevel(); pool.tconf.PoolOdds > 0 && pool.BetNum() != 0 {
			if levelgroups[level] == nil { levelgroups[level] = make([]*TexasFightBetPool,0) }
			levelgroups[level] = append(levelgroups[level], pool)
		}

		// 房间没有任何人押注,不打日志
		if bankerpool.BetNum() != 0 {
			log.Trace("[百人大战] 房间[%d %d] 注池[%d] 结算完成，总注[%d] 胜负平[%d] 牌等级[%d] 牌力[%d]", 
				tf.Id(), tf.Round(), pool.Pos(), pool.BetNum(), pool.Result(), pool.CardLevel(), pool.CardValue())
		}
	}

	//  胜负历史记录，最多记录30条
	if tf.history.Len() >= 30 {
		tf.history.Remove(tf.history.Back())
	}
	tf.history.PushFront(winrecord)

	// 开始瓜分奖池
	tf.AwardPoolSettle(levelgroups)
}

// 玩家结算
func (tf *TexasFightRoom) PlayerSettle() {
	kicklist := make([]*TexasFightPlayer, 0)
	pipe := Redis().Pipeline()
	for _, player := range tf.players {

		// 庄家单独结算
		if player.IsSystem() || player.IsBanker() { 
			continue 
		}

		// 如果在上庄列表中，不受旁观2轮限制
		if player.TotalBet() == 0 {
			if tf.IsInBankerQueue(player.Id()) == false {
				player.SetWatchCount(player.WatchCount() + 1)
				if player.WatchCount() >= tf.tconf.Kick {
					kicklist = append(kicklist, player)
				}
			}
			continue
		}

		//
		player.Settle(tf)
		if player.TotalProfit() > 0 {
			strgroup := strconv.FormatInt(int64(AchieveGroup_BaiRenWin), 10)
			pipe.HIncrBy(fmt.Sprintf("%s_%d", def.AchieveProcess, player.Id()), strgroup, 1)
		}
		if tf.SubKind() == int32(kTexasFightHappyMode) {
			strgroup := strconv.FormatInt(int64(AchieveGroup_BaiRenPlay1), 10)
			pipe.HIncrBy(fmt.Sprintf("%s_%d", def.AchieveProcess, player.Id()), strgroup, 1)
		} else if tf.SubKind() == int32(kTexasFightRichMode) {
			strgroup := strconv.FormatInt(int64(AchieveGroup_BaiRenPlay2), 10)
			pipe.HIncrBy(fmt.Sprintf("%s_%d", def.AchieveProcess, player.Id()), strgroup, 1)
		}

	}
	if _, err := pipe.Exec(); err != nil {
		log.Error("百人大战结算成就出错 %s", err)
	}
	pipe.Close()
	// 连续观战计数，大于一定次数踢出房间
	for _, p := range kicklist {
		tf.OnPlayerKickOut(p)
	}
}

// 庄家结算(必须在玩家结算后调用)
func (tf *TexasFightRoom) BankerSettle() {

	// 庄家对应每个注池，要么全赢要么全输或者平
	bankerpool := tf.betpool[0]
	var win, lose int64 = 0, 0 
	for k, pool := range tf.betpool {

		// 归还庄家的下注
		if k == 0 {
			if tf.banker.owner != nil && pool.BetNum() != 0 {
				tf.banker.owner.AddGold(pool.BetNum(), "归还坐庄跟注", true)
			}
			continue
		}

		if pool.BetNum() == 0 {
			continue
		}

		// 赢钱要扣税
		if pool.Result() == kBetResultLose {
			win  = bankerpool.WinOdds() * pool.BetNum()
			profit := win
			taxrate, pumprate := float64(tf.tconf.TaxRate), float64(tbl.TexasFight.SystemPumpRate) / 100.0
			deduct := float64(win) * ( taxrate + pumprate)
			if deduct != 0 {
				tax := deduct * taxrate / (taxrate + pumprate)
				tf.IncAwardPool(int64(tax))
				profit = profit - int64(deduct)
			}
			tf.banker.IncTotalProfit(profit)
			if tf.banker.owner != nil {
				tf.banker.owner.AddGold(profit, "百人大战庄家获胜", false)
			}
		}else if pool.Result() == kBetResultWin {
			lose = pool.WinOdds() * pool.BetNum()
			tf.banker.IncTotalProfit(-lose)
			if tf.banker.owner != nil {
				tf.banker.owner.RemoveGold(lose, "百人大战庄家失败", false)
			}
		}
	}

	// 同步金币到客户端
	if tf.banker.owner != nil {
		tf.banker.owner.SendPropertyChange()
	}
}

// 瓜分奖池(思路：注池按牌力顺序分割奖池，玩家按押注权重瓜分注池)
func (tf *TexasFightRoom) AwardPoolSettle(groups map[int32][]*TexasFightBetPool) {
	if tf.TotalAwardPool() == 0 || len(groups) == 0 {
		return
	}

	// 注池按配置比例获得奖池奖金
	sortconfs := make([]*table.HundredWarCardTypeDefine, 0)
	for _, conf := range  tbl.HundredWarCardTypeBase.HundredWarCardTypeById {
		if conf.PoolOdds <= 0 {
			continue
		}
		sortconfs = append(sortconfs, conf)
	}

	// 注池牌力等级高优先分奖池
	sort.Slice(sortconfs, func(i, j int) bool {
		return sortconfs[i].Id > sortconfs[j].Id
	})

	//
	var hitpool *TexasFightBetPool = nil
	for _, conf := range sortconfs {
		pools, bfind := groups[conf.Id]
		if bfind == false || len(pools) == 0 {
			continue
		}
	
		total := float64(tf.TotalAwardPool()) * float64(conf.PoolOdds)
		tf.DecAwardPool(int64(total))
		single := int64(total) / int64(len(pools))
		for _, pool := range pools {
			if hitpool == nil { 
				hitpool = pool 	// 记录奖池命中信息，只记录本轮最高等级
			}
			pool.SetAwardPool(single)
			log.Info("[百人大战] 房间[%d %d] 注池[%d] 获得奖池比例[%.2f] 金额[%.2f]", tf.Id(), tf.Round(), pool.Pos(), conf.PoolOdds, total)
		}
	}

	// 奖池命中信息记录
	if hitpool != nil {
		tf.awardhit.Replace(hitpool, tf)
	}

	// 玩家按押注权重瓜分注池
	for _, pool := range tf.betpool {
		// 注池没中奖池或没人押注
		if pool.AwardPool() == 0 || pool.BetNum() == 0 {
			continue
		}

		// 爆奖池公告
		tf.HitRewadPoolNotify(tf.tconf.Id, pool.AwardPool())

		if pool.Pos() == 0 { 
			if tf.banker.IsSystem() == false && tf.banker.owner != nil {
				tf.banker.owner.AddGold(pool.AwardPool(), "百人大战奖池奖励", true)
			}
			continue
		}

		// 押中的玩家，按权重分配奖励
		for _, p := range tf.players {
			if p.betlist[pool.Pos()] == nil { continue }
			userbet := p.betlist[pool.Pos()].Num()
			award := pool.AwardPool() * userbet / pool.BetNum()
			p.owner.AddGold(award, "百人大战奖池奖励", true)
		}
	}

	log.Info("[百人大战] 房间[%d %d] 奖池分割完毕，奖池余额[%d]", tf.Id(), tf.Round(), tf.TotalAwardPool())
}

// 玩家超过N轮未下注被踢出
func (tf *TexasFightRoom) OnPlayerKickOut(p *TexasFightPlayer) {
	log.Info("[百人大战] 玩家[%s %d] 超过%d轮未下注，被踢出房间[%d %d]", p.Name(), p.Id(), tf.tconf.Kick, tf.Id(), tf.Round())
	// 坐下玩家
	if p.Seat() != -1 {
		tf.UserStandUp(p.owner)
	}

	//
	p.OnKickOut()
	p.owner.OnKickOutRoom()

	// 清理上庄列表
	tf.BankerQueueRemoveElem(p.Id())
	delete(tf.players, p.Id())
	delete(tf.members, p.Id())
}

// 推送结算消息
func (tf *TexasFightRoom) SendRoundOverMsg() {
	roundmsg := &msg.RS2C_PushTFRoundOver{Betlist:make([]*msg.TFBetPool,0), Ranklist:make([]*msg.TFRankPlayer,0)}
	roundmsg.Pool = pb.Int64(tf.TotalAwardPool())
	roundmsg.Bankergold = pb.Int64(tf.banker.Gold())

	// 下注池信息
	for _, pool := range tf.betpool {
		info := &msg.TFBetPool{Pos:pb.Int32(pool.Pos()), Win:pb.Int32(pool.Result()), Cards:make([]int32,0)}
		for _, card := range pool.cards {
			info.Cards = append(info.Cards, card.Suit + 1)		// 客户端颜色从1开始
			info.Cards = append(info.Cards, card.Value + 2)		// 客户端数值从2开始
		}
		roundmsg.Betlist = append(roundmsg.Betlist, info)
	}

	// 赢钱玩家列表（系统庄家也要发）
	for _, player := range tf.players {
		if player.TotalProfit() <= 0 { continue }
		roundmsg.Ranklist = append(roundmsg.Ranklist, player.FillRankPlayerInfo())
	}
	if tf.banker.IsSystem() && tf.banker.TotalProfit() > 0 {
		roundmsg.Ranklist = append(roundmsg.Ranklist, tf.banker.FillRankPlayerInfo())
	}

	// 坐下玩家信息
	for _, player := range tf.sitplayers {
		if player == nil { continue }
		roundmsg.Sitplayers = append(roundmsg.Sitplayers, player.FillPlayerInfo())
	}

	// 个人信息
	for _, player := range tf.players {
		roundmsg.Gold = pb.Int64(player.TotalProfit())
		//roundmsg.Iswin = pb.Bool(player.TotalProfit() > 0)
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

	// 同花顺
	//straightflush := make([]*Card, 0)
	//for i:=int32(0);  i < 5; i++  {
	//	straightflush = append(straightflush, NewCard(0, i))
	//}

	//// 皇家同花顺
	//royalflush := make([]*Card, 0)
	//for i:=int32(8);  i < int32(CARDRANK); i++  {
	//	royalflush = append(royalflush, NewCard(0, i))
	//}

	//// 4条
	//fourkind := []*Card{NewCard(0, 2)}
	//for i:=int32(0); i < 4; i++ {
	//	fourkind = append(fourkind, NewCard(i, 5))
	//}

	//TODO: 特殊牌测试
	begin, end := 0, 5
	for _, pool := range tf.betpool {
		cards := tf.cards[begin:end]
		begin, end = begin+5, end+5
		//if k == 0 {
		//	tf.betpool[k].InsertCards(fourkind)
		//	continue
		//}else if k == 1 {
		//	tf.betpool[k].InsertCards(straightflush)
		//	continue
		//}else if k == 2 {
		//	tf.betpool[k].InsertCards(royalflush)
		//	continue
		//}else {
		 	pool.InsertCards(cards)
		//}
		// 房间没有任何人押注,不打日志
		if tf.betpool[0].BetNum() != 0 {
			log.Trace("[百人大战] 房间[%d %d] 注池[%d] 牌型[%v %v %v %v %v]", tf.Id(), tf.Round(), pool.Pos(), cards[0], cards[1], cards[2], cards[3], cards[4])
		}
	}
}


// 请求下一局开局
func (tf *TexasFightRoom) RequestGameStart(u *RoomUser) {
	//log.Trace("[百人大战] 玩家[%s %d] 房间[%d %d] 收到立即开始下一局请求", u.Name(), u.Id(), tf.Id(), tf.Round())
	send := &msg.RS2C_RetTFStart{}
	u.SendClientMsg(send)

	// 只有一个玩家，信任该玩家请求
	if _, find := tf.players[u.Id()]; find == true && len(tf.players) == 1 {
		tf.ChangeToBettingStat(util.CURTIMEMS())
		return
	}

	// 发牌后超过等待事件收到开始，允许开始
	now , waittimeout := util.CURTIME(), tf.statstart + int64(tf.tconf.WaitTime)
	if tf.stat == kStatWaitNextRound && now >= waittimeout {
		tf.ChangeToBettingStat(util.CURTIMEMS())
		return
	}
}


// 请求下注
func (tf *TexasFightRoom) RequestBet(u *RoomUser, pos int32, num int64) {
	player := tf.FindPlayer(u.Id())
	if player == nil {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 请求下注找不到玩家Player", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	if player.Seat() == 0 {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 庄家不需要下注", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	if tf.stat != kStatBetting {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 请求下注失败，非下注状态中", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	if pos == 0 {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 请求下注失败，不能下注庄家注池", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	// 重复上一局下注功能的注码，可能不在配置里
	//bfind := false
	//for _, bet := range tf.tconf.Bet {
	//	if bet == num { bfind = true }
	//}
	//if bfind == false {
	//	log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 请求下注失败，无效的注码[%d]", u.Name(), u.Id(), tf.Id(), tf.Round(), num)
	//	return
	//}

	if num > u.GetGold() {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 请求下注失败，身上没有足够的钱下注", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	// 下注的总金额不得大于身上携带金额的七分之一
	betlimit, bettotal := u.GetGold() / 7, player.TotalBet() + num
	if bettotal > betlimit {
		resp := &msg.RS2C_RetTexasFightBet{Errcode:pb.String("下注总额超过携带金额七分之一")}
		u.SendClientMsg(resp)
		return
	}

	// 所有玩家下注不能超过庄家金额的七分之一，系统庄家例外
	if tf.banker.IsSystem() == false {
		var totalbet int64 = num
		for _, pool := range tf.betpool {
			totalbet += pool.BetNum()
		}

		if totalbet > tf.banker.Gold() / 7  {
			resp := &msg.RS2C_RetTexasFightBet{Errcode:pb.String("下注金额超过庄家赔付能力")}
			u.SendClientMsg(resp)
			log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 请求下注失败，超过庄家赔付能力", u.Name(), u.Id(), tf.Id(), tf.Round())
			return
		}
	}

	// 开始下注
	tf.betpool[pos].IncBet(num)
	tf.betpool[0].IncBet(num)
	player.Bet(pos, num)
	if tf.banker.IsSystem() == false {
		tf.banker.owner.RemoveGold(num, "坐庄跟注", true)
	}
	resp := &msg.RS2C_RetTexasFightBet{}
	u.SendClientMsg(resp)

	// 下注池临时统计
	tf.betstat.Collect(player, pos, num)

	log.Trace("[百人大战] 玩家[%s %d] 房间[%d %d] 下注[%d]成功，金额[%d]", u.Name(), u.Id(), tf.Id(), tf.Round(), pos, num)
}


// 拉取上次奖池信息击中信息
func (tf *TexasFightRoom) RequestLastAwardPoolHit(u *RoomUser) {
	//if tf.awardhit.time == 0 {
	//	log.Warn("[百人大战] 玩家[%s %d] 房间[%d %d] 没有历史奖池击中信息", u.Name(), u.Id(), tf.Id(), tf.Round())
	//	return
	//}

	send := &msg.RS2C_RetTFLastAwardPoolHit{Cards:make([]int32,0,10)}
	send.Gold = pb.Int64(tf.awardhit.gold)
	send.Time = pb.Int64(tf.awardhit.time)
	if tf.awardhit.time != 0 {
		for _, card := range tf.awardhit.cards {
			send.Cards = append(send.Cards, card.Suit + 1)	// 客户端颜色从1开始
			send.Cards = append(send.Cards, card.Value + 2)	// 客户端数值从2开始
		}
		for _, p := range tf.awardhit.players {
			send.Prizelist = append(send.Prizelist, p)
		}
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
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 找不到玩家Player", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	// 已经是庄家
	if tf.banker.Id() == u.Id() {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 已经是庄家", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	for elem := tf.bankerqueue.Front(); elem != nil; elem = elem.Next() {
		p := elem.Value.(*TexasFightPlayer)
		if p.Id() == u.Id() {
			log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 已经在庄家列表了", u.Name(), u.Id(), tf.Id(), tf.Round())
			return
		}
	}

	tf.bankerqueue.PushBack(player)
	send := &msg.RS2C_RetTFBecomeBanker{}
	u.SendClientMsg(send)

	log.Info("[百人大战] 玩家[%s %d] 房间[%d %d] 请求上庄成功",  u.Name(), u.Id(), tf.Id(), tf.Round())
}


// 请求下庄
func (tf *TexasFightRoom) RequestQuitBanker(u *RoomUser) {
	send := &msg.RS2C_RetTFQuitBanker{}
	u.SendClientMsg(send)

	player := tf.FindPlayer(u.Id())
	if player == nil {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 找不到玩家Player", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}


	bfind := false
	for elem := tf.bankerqueue.Front(); elem != nil; elem = elem.Next() {
		p := elem.Value.(*TexasFightPlayer)
		if p.Id() == u.Id() {
			bfind = true
			break
		}
	}
	if bfind == false {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 请求下注失败，不在庄家列表中", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	// 上庄列表中非正式庄家，无条件下庄
	if tf.banker.Id() != u.Id() {
		tf.BankerQueueRemoveElem(u.Id()) 		// 从上庄列表移除
		log.Info("[百人大战] 玩家[%s %d] 房间[%d %d] 请求下庄成功",  u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	// 庄家
	//if tf.stat == kStatBetting {
	//	log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 下注中不能下庄", u.Name(), u.Id(), tf.Id(), tf.Round())
	//	return
	//}
	player.SetBankerFlag(kPlayerBankerQuit)	// 标记庄家，本轮结束退出
	log.Info("[百人大战] 玩家[%s %d] 房间[%d %d] 处理下庄请求成功，本轮结束下庄",  u.Name(), u.Id(), tf.Id(), tf.Round())
}

func (tf *TexasFightRoom) BankerQueueRemoveElem(uid int64) {
	for elem := tf.bankerqueue.Front(); elem != nil; elem = elem.Next() {
		p := elem.Value.(*TexasFightPlayer)
		if p.Id() == uid {
			tf.bankerqueue.Remove(elem)
			return
		}
	}
}

// 是否在上庄列表中
func (tf *TexasFightRoom) IsInBankerQueue(uid int64) bool {
	for elem := tf.bankerqueue.Front(); elem != nil; elem = elem.Next() {
		p := elem.Value.(*TexasFightPlayer)
		if p.Id() == uid {
			return true
		}
	}
	return false
}

// 爆奖池公告
func (tf *TexasFightRoom) HitRewadPoolNotify(id int32, num int64) {
	mapjson := map[string]interface{}{"0": id, "1": num}
	jsontxt, _ := json.Marshal(mapjson)
	txt := util.BytesToString(jsontxt)
	send := &msg.RS2GW_ChatInfo{}
	send.Chat = def.MakeChatInfo(def.ChatAll, txt, 0, "", def.HWarMsg, def.MsgShowAll)
	GateMgr().Broadcast(send)
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

	// 坐下玩家数量(排除系统庄家)
	var sitnum int32 = 0
	for _, p := range tf.sitplayers {
		if p == nil { continue }
		if p.IsSystem() { continue }
		sitnum += 1
	}

	standnum := tf.PlayersNum() - sitnum
	send := &msg.RS2C_RetTFStandPlayer{Playerlist:make([]*msg.TFPlayer,0), Total:pb.Int32(standnum) }
	var num int32 = 0
	for k, p := range sortlist {
		if int32(k) < start { continue }
		if num >= count  { break }

		info := p.FillPlayerInfo()
		send.Playerlist = append(send.Playerlist, info)
		num++
	}
	u.SendClientMsg(send)
}


// 拉取庄家列表
func (tf *TexasFightRoom) SendBankerList(u *RoomUser) {
	send := &msg.RS2C_RetTFBankerList{Bankerlist:make([]*msg.TFPlayer, 0)}
	for elem := tf.bankerqueue.Front(); elem != nil; elem = elem.Next() {
		p := elem.Value.(*TexasFightPlayer)
		send.Bankerlist = append(send.Bankerlist, p.FillPlayerInfo())
	}
	u.SendClientMsg(send)
}


// 拉取胜负走势列表
func (tf *TexasFightRoom) SendWinLoseTrend(u *RoomUser) {
	send := &msg.RS2C_RetWinLoseTrend{Trendlist:make([]*msg.TFWinLoseTrend, 0)}
	for e := tf.history.Front(); e != nil; e = e.Next() {
		record, _ := e.Value.(*WinLoseRecord)
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
		info.Pool = pb.Int64(tf.TotalAwardPool())
		send.Array = append(send.Array, info)
	}
	RoomSvr().SendClientMsg(agent, userid, send)
}


