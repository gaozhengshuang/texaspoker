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
	"github.com/go-redis/redis"

	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	//"gitee.com/jntse/gotoolkit/net"

	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
)

func (tf *TexasFightRoom) DBLoad() {
	key := fmt.Sprintf("%s_%d",TF_RedisTotalAwardPool, tf.SubKind())
	awardpool, err := Redis().Get(key).Int64()
	if err != nil {
		log.Error("[百人大战] 房间[%d %d] 加载redis数据失败 Key[%s] RedisError[%s]", tf.Id(), tf.Round(), TF_RedisTotalAwardPool, err)
	}

	key = fmt.Sprintf("%s_%d",TF_RedisAIBankerWinGold, tf.SubKind())
	wingold, err := Redis().Get(key).Int64()
	if err != nil {
		log.Error("[百人大战] 房间[%d %d] 加载redis数据失败 Key[%s] RedisError[%s]", tf.Id(), tf.Round(), TF_RedisAIBankerWinGold, err)
	}


	key = fmt.Sprintf("%s_%d",TF_RedisAIBankerLossGold, tf.SubKind())
	lossgold, err := Redis().Get(key).Int64()
	if err != nil {
		log.Error("[百人大战] 房间[%d %d] 加载redis数据失败 Key[%s] RedisError[%s]", tf.Id(), tf.Round(), TF_RedisAIBankerLossGold, err)
	}


	key = fmt.Sprintf("%s_%d",TF_RedisAIAwardPool, tf.SubKind())
	aiawardpool, err := Redis().Get(key).Int64()
	if err != nil {
		log.Error("[百人大战] 房间[%d %d] 加载redis数据失败 Key[%s] RedisError[%s]", tf.Id(), tf.Round(), TF_RedisAIAwardPool, err)
	}


	key = fmt.Sprintf("%s_%d",TF_RedisPlayerBankerWinGold, tf.SubKind())
	pwingold, err := Redis().Get(key).Int64()
	if err != nil {
		log.Error("[百人大战] 房间[%d %d] 加载redis数据失败 Key[%s] RedisError[%s]", tf.Id(), tf.Round(), TF_RedisPlayerBankerWinGold, err)
	}

	tf.totalawardpool = awardpool
	tf.aibankerwingold = wingold
	tf.aibankerlossgold = lossgold
	tf.aiawardpool.Reset()
	tf.aiawardpool.size = aiawardpool
	tf.playerbankerwingold = pwingold

	log.Info("[百人大战] 房间[%d %d] 子类型[%d] 读盘[%s]=%d", tf.Id(), tf.Round(), tf.SubKind(), TF_RedisTotalAwardPool, tf.totalawardpool)
	log.Info("[百人大战] 房间[%d %d] 子类型[%d] 读盘[%s]=%d", tf.Id(), tf.Round(), tf.SubKind(), TF_RedisAIBankerWinGold, tf.aibankerwingold)
	log.Info("[百人大战] 房间[%d %d] 子类型[%d] 读盘[%s]=%d", tf.Id(), tf.Round(), tf.SubKind(), TF_RedisAIBankerLossGold, tf.aibankerlossgold)
	log.Info("[百人大战] 房间[%d %d] 子类型[%d] 读盘[%s]=%d", tf.Id(), tf.Round(), tf.SubKind(), TF_RedisAIAwardPool, tf.aiawardpool.size)
	log.Info("[百人大战] 房间[%d %d] 子类型[%d] 读盘[%s]=%d", tf.Id(), tf.Round(), tf.SubKind(), TF_RedisPlayerBankerWinGold, tf.playerbankerwingold)
}

func (tf *TexasFightRoom) DBSave() {
	pipe := Redis().Pipeline()
	key := fmt.Sprintf("%s_%d",TF_RedisTotalAwardPool, tf.SubKind())
	pipe.Set(key, tf.totalawardpool, 0)

	key = fmt.Sprintf("%s_%d",TF_RedisAIBankerWinGold, tf.SubKind())
	pipe.Set(key, tf.aibankerwingold, 0)

	key = fmt.Sprintf("%s_%d",TF_RedisAIBankerLossGold, tf.SubKind())
	pipe.Set(key, tf.aibankerlossgold, 0)

	key = fmt.Sprintf("%s_%d",TF_RedisAIAwardPool, tf.SubKind())
	pipe.Set(key, tf.aiawardpool.size, 0)

	key = fmt.Sprintf("%s_%d",TF_RedisPlayerBankerWinGold, tf.SubKind())
	pipe.Set(key, tf.playerbankerwingold, 0)

	_, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("[百人大战] 房间[%d %d] 子类型[%d] 存盘失败 RedisError[%s]", tf.Id(), tf.Round(), tf.SubKind(), err)
	}
	pipe.Close()

	log.Info("[百人大战] 房间[%d %d] 子类型[%d] 存盘[%s]=%d", tf.Id(), tf.Round(), tf.SubKind(), TF_RedisTotalAwardPool, tf.totalawardpool)
	log.Info("[百人大战] 房间[%d %d] 子类型[%d] 存盘[%s]=%d", tf.Id(), tf.Round(), tf.SubKind(), TF_RedisAIBankerWinGold, tf.aibankerwingold)
	log.Info("[百人大战] 房间[%d %d] 子类型[%d] 存盘[%s]=%d", tf.Id(), tf.Round(), tf.SubKind(), TF_RedisAIBankerLossGold, tf.aibankerlossgold)
	log.Info("[百人大战] 房间[%d %d] 子类型[%d] 存盘[%s]=%d", tf.Id(), tf.Round(), tf.SubKind(), TF_RedisAIAwardPool, tf.aiawardpool.size)
	log.Info("[百人大战] 房间[%d %d] 子类型[%d] 存盘[%s]=%d", tf.Id(), tf.Round(), tf.SubKind(), TF_RedisPlayerBankerWinGold, tf.playerbankerwingold)
}
 
// AI 初始化
func (tf *TexasFightRoom) InitAIPlayers() {
	users := AIUserMgr().PickOutUser(int32(tbl.TexasFight.AIUserAmount))
	for _, u := range users {
		// AI携带的金币数量
		//rand := util.RandBetweenInt64(tbl.TexasFight.AIBankerMoneyRate[0], tbl.TexasFight.AIBankerMoneyRate[1])
		//gold := rand * tf.tconf.BankerGold / 100
		//u.AddGold(gold, "初始AI金币", false)
		tf.UserEnter(u)
	}
}

func (tf *TexasFightRoom) Handler1sTick(now int64) {

	switch tf.stat {
	case kStatWaitNextRound:
		if tf.IsStateTimeOut(now/1000) { tf.ChangeToBettingStat(now) }
		break
	case kStatBetting:
		tf.TickAIBet(now)
		if tf.IsStateTimeOut(now/1000) { tf.ChangeToWaitNextRoundStat(now) }
		break
	}

	// 下注池变更推送
	tf.SynBetPoolChange()
}

func (tf *TexasFightRoom) Handler5sTick(now int64) {
}

func (tf *TexasFightRoom) Handler100msTick(now int64) {
}

// 定时检查AI BetTrigger
func (tf *TexasFightRoom) TickAIBet(now int64) {
	if tf.stat != kStatBetting {
		return
	}

	for _, p := range tf.aiplayers {
		p.TickAIBetTrigger(now, tf)
	}
}

// 执行剩下的全部AI Bet Trigger，避免因为时间未到没有执行
func (tf *TexasFightRoom) ExecLastAIBetTrigger() {
	if tf.stat != kStatBetting {
		return
	}

	log.Trace("[百人大战] 房间[%d %d] 执行全部剩余 AIBetTrigger", tf.Id(), tf.Round())
	for _, p := range tf.aiplayers {
		p.ExecBetTrigger(tf)
	}
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

	// 检查是否需要AI进入上庄列表
	tf.SelectAIEnterBankerQueue()

	// 下一个玩家成为庄家
	tf.PlayerBankerAppointCheck()

	// 切换回系统庄家
	tf.SystemBankerBackCheck()

	//
	log.Info("[百人大战] 房间[%d %d] 本轮庄家[%s %d]", tf.Id(), tf.Round(), tf.banker.Name(), tf.banker.Id())
}

// 检查玩家庄家是否还能继续坐庄
func (tf *TexasFightRoom) PlayerBankerKeepCheck() {
	if  true == tf.banker.IsSystem() {
		return
	}

	p := tf.banker
	if p.BankerStat() == kPlayerBankerQuit {
		log.Info("[百人大战] 房间[%d %d] 玩家[%s %d] 主动下庄", tf.Id(), tf.Round(), p.Name(), p.Id())
	}else if p.Gold() < tf.tconf.BankerMinGold {
		log.Info("[百人大战] 房间[%d %d] 玩家[%s %d] 金币不足[%d] 不能继续坐庄", tf.Id(), tf.Round(), p.Name(), p.Id(), tf.tconf.BankerMinGold)
		p.SetBankerStat(kPlayerBankerNotSatisfied)
	} else if p.BankerRound() > tf.tconf.BankerRound {
		p.SetBankerStat(kPlayerBankerNotSatisfied)
		log.Info("[百人大战] 房间[%d %d] 玩家[%s %d] 坐庄达到最大轮数[%d] 不能继续坐庄", tf.Id(), tf.Round(), p.Name(), p.Id(), tf.tconf.BankerRound)
	}

	// 玩家离开庄位
	if tf.banker.BankerStat() != kPlayerBankerNormal {
		tf.banker.QuitBanker(tf)

		// TODO: 下庄这个推送可以省掉
		//posmsg := &msg.RS2C_PushTFPosChange{Bankergold:pb.Int64(0), Player:&msg.TFPlayer{}}
		//posmsg.Player = p.FillPlayerInfo()
		//posmsg.Player.Pos = pb.Int32(0)
		//posmsg.Player.Roleid = pb.Int64(0)
		//tf.BroadCastMemberMsg(posmsg)
	}
}

// 任命玩家庄家检查
func (tf *TexasFightRoom) PlayerBankerAppointCheck() {
	if tf.bankerqueue.Len() == 0 {
		return
	}

	if false == tf.banker.IsSystem() && tf.banker.BankerStat() == kPlayerBankerNormal {
		return
	}

	// 在座位上先离开座位
	elem := tf.bankerqueue.Front()
	p := elem.Value.(*TexasFightPlayer)
	if p.Seat() != -1 {
		tf.UserStandUp(p.owner)
	}

	// 新庄家上位
	p.BecomeBanker(tf)

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

	if tf.banker.BankerStat() == kPlayerBankerNormal {
		return
	}

	// 系统庄家上位
	tf.bankersys.BecomeBanker(tf)

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
func (tf *TexasFightRoom) AddNewPlayer(u *RoomUser) *TexasFightPlayer {
	p := NewTexasFightPlayer(u, false)
	tf.players[u.Id()] = p
	if u.IsAI() == true {
		tf.aiplayers[u.Id()] = p
	}
	return p
}


// 切换等待下一局状态
func (tf *TexasFightRoom) ChangeToWaitNextRoundStat(now int64) {

	// AI奖池回收
	tf.AIAwardPoolPumpRecycle()

	// 剩余的所有AI下注执行
	tf.ExecLastAIBetTrigger()

	tf.stat = kStatWaitNextRound
	tf.statstart = now / 1000
	tf.stattimeout = tf.statstart + int64(tf.tconf.TimeOut)
	tf.aibankerpumpflag = false

	// 发牌
	//tf.CardDeal()

	// 房间状态变更推送
	statmsg := &msg.RS2C_PushTFStateChange{State:pb.Int32(tf.stat), Statetime:pb.Int64(tf.statstart)}
	tf.BroadCastMemberMsg(statmsg)

	// 回合结束
	tf.RoundOver()

	if tf.PlayersNum() != 0 {
		log.Info("[百人大战] 房间[%d %d] 切换到等待下一局状态", tf.Id(), tf.Round())
	}

	// 每轮结束，存盘一下
	tf.DBSave()
}


// 切换到下注状态
func (tf *TexasFightRoom) ChangeToBettingStat(now int64) {
	tf.stat = kStatBetting
	tf.statstart = now / 1000
	tf.stattimeout = tf.statstart + int64(tf.tconf.BetTime)
	tf.round += 1
	tf.banker.AddBankerRound(1)

	if tf.PlayersNum() != 0 {
		log.Info("[百人大战] 房间[%d %d] 切换到下注状态", tf.Id(), tf.Round())
	}


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

	// 发牌
	tf.CardDeal()

	// AI闲家下注
	tf.AIPlayerBet()
}


// 回合结束
func (tf *TexasFightRoom) RoundOver() {

	// 结算
	tf.RoundSettle()
}

// 回合结算
func (tf *TexasFightRoom) RoundSettle() {

	// 各注池结算和奖池结算
	tf.BetPoolSettle()

	// 玩家结算
	old_awardpool, old_aiawardpool := tf.TotalAwardPool(), tf.AIAwardPool()
	tf.PlayerSettle()

	// 庄家结算
	tf.BankerSettle()

	// 推送结算消息
	tf.SendRoundOverMsg()

	// 奖池日志
	if tf.PlayersNum() != 0 {
	log.Info("[百人大战] 房间[%d %d] 本轮结算完成，奖池增加[%d] 奖池剩余[%d] AI奖池增加[%d] AI奖池剩余[%d]", tf.Id(), tf.Round(), 
		tf.TotalAwardPool()-old_awardpool, tf.TotalAwardPool(), tf.AIAwardPool()-old_aiawardpool ,tf.AIAwardPool())
	}

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
			log.Trace("[百人大战] 房间[%d %d] 注池[%d] 结算完成，总注[%d] AI下注[%d] 胜负平[%d] 牌等级[%d] 牌力[%d]", 
				tf.Id(), tf.Round(), pool.Pos(), pool.BetNum(), pool.AIBetNum(), pool.Result(), pool.CardLevel(), pool.CardValue())
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
			if tf.IsInBankerQueue(player.Id()) == false && player.IsAI() == false {
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
			if tf.banker.IsAI() == false && tf.banker.IsSystem() == false {
				tf.IncPlayerBankerWinGold(win)
			}
			profit := win
			taxrate, pumprate := float64(tf.tconf.TaxRate), float64(tbl.TexasFight.SystemPumpRate) / 100.0
			deduct := float64(win) * ( taxrate + pumprate)
			if deduct != 0 {
				tax := deduct * taxrate / (taxrate + pumprate)
				tf.IncAwardPool(int64(tax))
				if tf.banker.IsAI() == true { tf.IncAIAwardPool(int64(tax)) }
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
	old_awardpool, old_aiawardpool := tf.TotalAwardPool(), tf.AIAwardPool()

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
			log.Info("[百人大战] 房间[%d %d] 注池[%d] 获得奖池比例[%.2f] 奖池[%d] 瓜分金额[%.2f]", tf.Id(), tf.Round(), pool.Pos(), conf.PoolOdds, 
				tf.TotalAwardPool(), total)
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
			if p.IsAI() == true {
				tf.DecAIAwardPool(award)
			}
		}
	}

	log.Info("[百人大战] 房间[%d %d] 奖池分割完毕，奖池扣除[%d] 奖池剩余[%d] AI奖池扣除[%d] AI奖池剩余[%d]", tf.Id(), tf.Round(), 
		old_awardpool-tf.TotalAwardPool(), tf.TotalAwardPool(), old_aiawardpool-tf.AIAwardPool() ,tf.AIAwardPool())
}

// 玩家超过N轮未下注被踢出
func (tf *TexasFightRoom) OnPlayerKickOut(p *TexasFightPlayer) {
	log.Info("[百人大战] 房间[%d %d] 玩家[%s %d] 超过%d轮未下注，被踢出房间", tf.Id(), tf.Round(), p.Name(), p.Id(), tf.tconf.Kick)
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

// 同花顺
func MakeStraightFlushCards() []*Card {
	straightflush := make([]*Card, 0)
	for i:=int32(0);  i < 5; i++  {
		straightflush = append(straightflush, NewCard(0, i))
	}
	return straightflush
}

// 皇家同花顺
func MakeRoyalFlushCards() []*Card {
	royalflush := make([]*Card, 0)
	for i:=int32(8);  i < int32(CARDRANK); i++  {
		royalflush = append(royalflush, NewCard(0, i))
	}
	return royalflush
}

// 4条
func MakeFourKindCards() []*Card {
	fourkind := []*Card{NewCard(0, 2)}
	for i:=int32(0); i < 4; i++ {
		fourkind = append(fourkind, NewCard(i, 5))
	}
	return fourkind
}


// 发牌
func (tf *TexasFightRoom) CardDeal() {
	//TODO: 特殊牌测试
	begin, end := 0, 5
	for _, pool := range tf.betpool {
		cards := tf.cards[begin:end]
		begin, end = begin+5, end+5

		// TODO: 测试代码
		if pool.Pos() == 1 && util.SelectPercent(50) {
			cards = MakeFourKindCards()
		}
		//if pool.Pos() == 4 {
		//	cards = MakeRoyalFlushCards()
		//}

		pool.InsertCards(cards)

		// 房间没有任何人押注,不打日志
		if pool.BetNum() != 0 {
			log.Trace("[百人大战] 房间[%d %d] 注池[%d] 牌型[%v %v %v %v %v]", tf.Id(), tf.Round(), pool.Pos(), cards[0], cards[1], cards[2], cards[3], cards[4])
		}
	}

	// AI坐庄抽水机制
	//tf.AIBankerPumpCheck()
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

	if u.IsAI() == false {
		if num > u.GetGold() {
			log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 请求下注失败，身上没有足够的钱下注", u.Name(), u.Id(), tf.Id(), tf.Round())
			return
		}

		// 下注的总金额不得大于身上携带金额的七分之一
		betlimit, bettotal := u.GetGold() / 7, player.TotalBet() + num
		if bettotal > betlimit {
			log.Warn("[百人大战] 玩家[%s %d] 房间[%d %d] 下注总额超过携带金额七分之一", u.Name(), u.Id(), tf.Id(), tf.Round())
			resp := &msg.RS2C_RetTexasFightBet{Errcode:pb.String("下注总额超过携带金额七分之一")}
			u.SendClientMsg(resp)
			return
		}
	}

	// 所有玩家下注不能超过庄家金额的七分之一，系统庄家例外
	if tf.banker.IsSystem() == false && tf.IsBankerCanAfford(num) == false {
		resp := &msg.RS2C_RetTexasFightBet{Errcode:pb.String("下注金额超过庄家赔付能力")}
		u.SendClientMsg(resp)
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 请求下注失败，超过庄家赔付能力", u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}


	// 开始下注
	tf.betpool[pos].IncBet(num)
	tf.betpool[0].IncBet(num)
	if u.IsAI() == false {
		tf.betpool[pos].IncPlayerBet(num)
	}
	player.Bet(pos, num)
	if tf.banker.IsSystem() == false {
		tf.banker.owner.RemoveGold(num, "坐庄跟注", true)
	}
	resp := &msg.RS2C_RetTexasFightBet{}
	u.SendClientMsg(resp)

	// 下注池临时统计
	tf.betstat.Collect(player, pos, num)

	// AI坐庄抽水机制和AI奖池回收
	if tf.banker.IsAI() && !u.IsAI() && !tf.banker.IsSystem() && tf.aibankerpumpflag == false {

		// AI坐庄抽水换牌，规则4
		act := tf.AIBankerPumpCheck()

		// AI坐庄抽水回收AI奖池，规则6
		if act == TF_AIBankerDoNothing { tf.CalcAIAwardPoolPumpRate() }
	}

	log.Trace("[百人大战] 玩家[%s %d] 房间[%d %d] 下注[%d]成功，金额[%d]", u.Name(), u.Id(), tf.Id(), tf.Round(), pos, num)
}

// 庄家最大赔付能力检查
func (tf *TexasFightRoom) IsBankerCanAfford(gold int64) bool {

	// 闲家总下注
	var totalbet int64 = gold
	for k, pool := range tf.betpool {
		if k == 0 { continue }
		totalbet += pool.BetNum()
	}

	// 庄家财产
	bankerbet := tf.betpool[0].BetNum()
	havegold := tf.banker.Gold() + bankerbet

	//
	if totalbet <= havegold / 7  {
		return true
	}

	return false
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
func (tf *TexasFightRoom) RequestEnterBankerQueue(u *RoomUser) bool {
	if u.GetGold() < tf.tconf.BankerGold {
		u.SendNotify("上庄金币不足")
		return false
	}

	// player 指针
	player := tf.FindPlayer(u.Id())
	if player == nil {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 找不到玩家Player", u.Name(), u.Id(), tf.Id(), tf.Round())
		return false
	}

	// 已经是庄家
	if player.IsBanker() {
		log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 已经是庄家", u.Name(), u.Id(), tf.Id(), tf.Round())
		return false
	}

	for elem := tf.bankerqueue.Front(); elem != nil; elem = elem.Next() {
		p := elem.Value.(*TexasFightPlayer)
		if p.Id() == u.Id() {
			log.Error("[百人大战] 玩家[%s %d] 房间[%d %d] 已经在庄家列表了", u.Name(), u.Id(), tf.Id(), tf.Round())
			return false
		}
	}

	tf.bankerqueue.PushBack(player)
	send := &msg.RS2C_RetTFBecomeBanker{}
	u.SendClientMsg(send)

	// 有玩家上庄所有AI下庄，在庄AI下一局退出
	if player.IsAI() == false {
		tf.AIQuitBanker()
	}

	log.Info("[百人大战] 玩家[%s %d] 房间[%d %d] 请求上庄成功",  u.Name(), u.Id(), tf.Id(), tf.Round())
	return true
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
	if player.IsBanker() == false {
		tf.BankerQueueRemoveElem(u.Id()) 		// 从上庄列表移除
		log.Info("[百人大战] 玩家[%s %d] 房间[%d %d] 请求下庄成功",  u.Name(), u.Id(), tf.Id(), tf.Round())
		return
	}

	player.SetBankerStat(kPlayerBankerQuit)	// 标记庄家，本轮结束退出
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

// 上庄列表是否有玩家
func (tf *TexasFightRoom) IsUserInBankerQueue() bool {
	for elem := tf.bankerqueue.Front(); elem != nil; elem = elem.Next() {
		p := elem.Value.(*TexasFightPlayer)
		if p.IsAI() == false {
			return true
		}
	}
	return false
}

// 上庄列表AI数量
func (tf *TexasFightRoom) BankerQueueAINum() int32 {
	count := 0
	for elem := tf.bankerqueue.Front(); elem != nil; elem = elem.Next() {
		p := elem.Value.(*TexasFightPlayer)
		if p.IsAI() == true {
			count++
		}
	}
	return int32(count)
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

// 随机挑选AI上庄
func (tf *TexasFightRoom) SelectAIEnterBankerQueue() {

	// 有玩家在上庄列表
	if tf.IsUserInBankerQueue() == true {
		return 
	}

	// 上庄列表已经有足够多的AI了
	if tf.BankerQueueAINum() >= int32(tbl.TexasFight.BankerQueueMaxAINum) {
		return
	}

	ailist := make([]*TexasFightPlayer, 0)
	for _, p := range tf.aiplayers {
		if tf.IsInBankerQueue(p.Id()) == true || p.IsBanker() {
			continue 
		}
		//if p.Gold() < tf.tconf.BankerGold {
		//	continue
		//}
		ailist = append(ailist, p)
	}

	if len(ailist) == 0 {
		log.Error("[百人大战] 没有可用的AI上庄 房间AI数量[%d]", len(tf.aiplayers))
		return
	}

	rand.Shuffle(len(ailist), func(i, j int) {
		ailist[i], ailist[j] = ailist[j], ailist[i]
	})


	// AI上庄携带的金币数量
	randrate := util.RandBetweenInt64(tbl.TexasFight.AIBankerMoneyRate[0], tbl.TexasFight.AIBankerMoneyRate[1])
	gold := randrate * tf.tconf.BankerGold / 100
	p := ailist[0]
	p.owner.SetAIGold(gold)

	log.Info("[百人大战] 房间[%d %d] ===没有玩家上庄，AI触发上庄，携带金币[%d]===", tf.Id(), tf.Round(), gold)
	tf.RequestEnterBankerQueue(p.owner)
}

// 所有AI下庄
func (tf *TexasFightRoom) AIQuitBanker() {
	ailist := make([]*TexasFightPlayer, 0)
	for elem := tf.bankerqueue.Front(); elem != nil; elem = elem.Next() {
		p := elem.Value.(*TexasFightPlayer)
		if p.IsAI() == true {
			ailist = append(ailist, p)
			continue
		}
	}

	log.Info("[百人大战] 房间[%d %d] ===有玩家上庄，所有AI触发下庄===", tf.Id(), tf.Round())
	for _, p := range ailist {
		tf.RequestQuitBanker(p.owner)
	}
}

// AI上庄抽水放水检查
func (tf *TexasFightRoom) AIBankerPumpAction() int32 {
	if tf.banker.IsAI() == false {
		return TF_AIBankerDoNothing
	}

	if tf.AIBankerWinGold() == 0 || tf.AIBankerLossGold() == 0 {	// 除0检查
		return TF_AIBankerDoNothing	// 抽水
	}

	diff := tf.AIBankerWinGold() - tf.AIBankerLossGold()
	rate := float64(diff) / float64(tf.AIBankerWinGold())
	if rate > float64(tbl.TexasFight.AIProfitLossHistoryRate.Max) / float64(100) {
		return TF_AIBankerDump		// 放水
	}
	if rate < float64(tbl.TexasFight.AIProfitLossHistoryRate.Min) / float64(100) {
		return TF_AIBankerPump		// 抽水
	}
	return TF_AIBankerDoNothing
}

// AI坐庄抽水机制，至少有一个玩家参与才触发
func (tf *TexasFightRoom) AIBankerPumpCheck() int32 {
	tf.aibankerpumpflag = true
	act := tf.AIBankerPumpAction()
	if act == TF_AIBankerDoNothing {
		return act
	}

	// 牌排序
	sortpool := make([]*TexasFightBetPool, 0)
	for _, pool := range tf.betpool { 
		sortpool = append(sortpool, pool) 
	}

	// 降序
	SortDESC := func() {
		sort.Slice(sortpool, func(i, j int) bool {
			cmp := sortpool[i].Compare(sortpool[j])
			if cmp == kBetResultWin || cmp == kBetResultTie { return true }
			return false
		})
	}

	// 升序
	SortASC := func() {
		sort.Slice(sortpool, func(i, j int) bool {
			cmp := sortpool[i].Compare(sortpool[j])
			if cmp == kBetResultWin || cmp == kBetResultTie { return false }
			return true
		})
	}

	// 1. TF_AIBankerPump 触发抽水，将庄家的牌替换成5副牌中最大的牌
	// 2. TF_AIBankerDump 触发放水，将庄家的牌替换成5副牌中最小的牌
	if act == TF_AIBankerPump {
		SortDESC()
		log.Info("[百人大战] 房间[%d %d] ===AI坐庄盈率过低触发抽水换牌===", tf.Id(), tf.Round())
	}else if act == TF_AIBankerDump {
		SortASC()
		log.Info("[百人大战] 房间[%d %d] ===AI坐庄盈率过高触发放水换牌===", tf.Id(), tf.Round())
	}

	bankerpool := tf.betpool[0]
	cardpool := sortpool[0]
	if bankerpool.Pos() == cardpool.Pos() {		// 不需要交换
		return act
	}

	tmpcards := bankerpool.Cards()
	bankerpool.Reset()
	bankerpool.InsertCards(cardpool.Cards())

	cardpool.Reset()
	cardpool.InsertCards(tmpcards)
	return act
}

func (tf *TexasFightRoom) AIPlayerBet() {

	var winrate float64 = 0
	if tf.AIBankerLossGold() != 0 && tf.AIBankerWinGold() != 0 {
		winrate = float64(tf.AIBankerWinGold() - tf.AIBankerLossGold()) / float64(tf.AIBankerWinGold())
	}
	log.Trace("[百人大战] 房间[%d %d] AI庄家对玩家历史盈利[%d] AI庄家对玩家历史亏损[%d] 比率[%.4f] 玩家庄家历史赢钱[%d]", tf.Id(), tf.Round(), 
		tf.AIBankerWinGold(), tf.AIBankerLossGold(), winrate, tf.PlayerBankerWinGold())

	log.Info("[百人大战] 房间[%d %d] ===AI闲家押注机制检查===", tf.Id(), tf.Round())
	if tf.banker.IsAI() == true {	// 庄家坐庄
		tf.AIPlayerPlayWithAIBanker()
	}else if tf.banker.IsAI() == false && tf.banker.IsSystem() == false {	// 玩家坐庄
		tf.AIPlayerPlayWithUserBanker()
	}
}

func (tf *TexasFightRoom) SelectBetAI(num int64) []*TexasFightPlayer {
	aishuffle := make([]*TexasFightPlayer, 0)
	for _, p := range tf.aiplayers {
		if p.IsBanker() { continue }
		aishuffle = append(aishuffle, p)
	}

	rand.Shuffle(len(aishuffle), func(i, j int) {
		aishuffle[i], aishuffle[j] = aishuffle[j], aishuffle[i]
	})

	if num < int64(len(aishuffle)) {
		aishuffle = aishuffle[0:num]
	}

	return aishuffle
}

// AI闲家押注对AI庄家
func (tf *TexasFightRoom) AIPlayerPlayWithAIBanker() {
	// 随机下注金额
	betlimit := int64(tf.banker.Gold() / 7)
	randrate := util.RandBetweenInt64(tbl.TexasFight.AIBetRandRate[0], tbl.TexasFight.AIBetRandRate[1])
	if randrate > 100 {
		log.Error("[百人大战] 房间[%d %d] AI下注配置超过 庄家赔付上限了 配置[%v]", tf.Id(), tf.Round(), tbl.TexasFight.AIBetRandRate)
		return
	}
	bettotal := betlimit * randrate / 100
	if bettotal == 0 {
		log.Info("[百人大战] 房间[%d %d] 本轮AI不下注", tf.Id(), tf.Round())
		return
	}


	// 随机下注次数(AI参与人数)
	joinbet := util.RandBetweenInt64(tbl.TexasFight.AIJoinBetRandNum[0], tbl.TexasFight.AIJoinBetRandNum[1])
	if joinbet == 0 {
		log.Error("[百人大战] 房间[%d %d] AI下注次数为0", tf.Id(), tf.Round())
		return
	}

	aishuffle := tf.SelectBetAI(joinbet)
	realbet := tf.AIShuffleBet(aishuffle, bettotal, -1, tf.aiawardpool.poolpos)	// 不要AI奖池抽水，会由单独机制下注
	log.Info("[百人大战] 房间[%d %d] AI做庄 押注上限[%d] AI计划押注[%d] AI实际押注[%d] 参与AI[%d]", 
		tf.Id(), tf.Round(), betlimit, bettotal, realbet, len(aishuffle))
}

// AI闲家押注对玩家庄家
func (tf *TexasFightRoom) AIPlayerPlayWithUserBanker() {	
	if tf.banker.IsAI() == true || tf.banker.IsSystem() == true { 
		return
	}

	if tf.PlayerBankerWinGold() < tbl.TexasFight.AIPumpWaterLevel {
		tf.AIPlayerPlayWithAIBanker()
		return
	}

	// 先随机抽水百分比和放水百分比
	log.Info("[百人大战] 房间[%d %d] 玩家做庄 玩家历史赢钱[%d] 大于抽水阀值[%d]", tf.Id(), tf.Round(), 
		tf.PlayerBankerWinGold(), tbl.TexasFight.AIPumpWaterLevel)
	pumprate := util.RandBetweenInt64(tbl.TexasFight.AIPumpRandRate[0], tbl.TexasFight.AIPumpRandRate[1])
	dumprate := util.RandBetweenInt64(tbl.TexasFight.AIDumpRandRate[0], tbl.TexasFight.AIDumpRandRate[1])
	pumpgold := pumprate * tbl.TexasFight.AIPumpWaterLevel / 100
	dumpgold := dumprate * tbl.TexasFight.AIPumpWaterLevel / 100
	diffpump := pumpgold - dumpgold

	// 抽水大于放水
	if diffpump > 0 {
		tf.DecPlayerBankerWinGold(diffpump)
	}else if diffpump < 0 {
		tf.IncPlayerBankerWinGold(diffpump)
	}
	log.Info("[百人大战] 房间[%d %d] 玩家做庄 AI抽水[%d] AI放水[%d] 玩家历史赢钱[%d]", tf.Id(), tf.Round(),
		pumpgold, dumpgold, tf.PlayerBankerWinGold())

	// 区分出赢的闲家牌和输的闲家牌，赢的用来抽水用，输的用来放水用
	winpool, losspool := make([]*TexasFightBetPool, 0), make([]*TexasFightBetPool, 0)
	bankerpool := tf.betpool[0]
	for k, pool := range tf.betpool {
		if k == 0 { continue }
		cmp := pool.Compare(bankerpool)
		if cmp == kBetResultWin || cmp == kBetResultTie { 
			winpool = append(winpool, pool)
		}else if cmp == kBetResultLose {
			losspool = append(losspool, pool)
		}else if cmp == kBetResultTie {
			// do noting
		}
	}

	// 随机抽水人数
	joinbet := util.RandBetweenInt64(tbl.TexasFight.AIJoinBetRandNum[0], tbl.TexasFight.AIJoinBetRandNum[1])
	aishuffle := tf.SelectBetAI(joinbet)
	if joinbet == 0 || len(aishuffle) == 0 {
		log.Error("[百人大战] 房间[%d %d] 没有可用的AI闲家下注抽水", tf.Id(), tf.Round())
		return
	}
	tf.AIBetForPump(winpool, pumpgold, aishuffle)


	// 随机放水人数
	joinbet = util.RandBetweenInt64(tbl.TexasFight.AIJoinBetRandNum[0], tbl.TexasFight.AIJoinBetRandNum[1])
	aishuffle = tf.SelectBetAI(joinbet)
	if joinbet == 0 || len(aishuffle) == 0 {
		log.Error("[百人大战] 房间[%d %d] 没有可用的AI闲家下注抽水", tf.Id(), tf.Round())
		return
	}
	tf.AIBetForDump(losspool, dumpgold, aishuffle)
}

func (tf *TexasFightRoom) AIBetGoldFix(n int64) int64 {
	if tf.SubKind() == int32(kTexasFightHappyMode) {
		n = util.FloorByBase(n, 100)	// 抹去零头，100整数倍
	}else {
		n = util.FloorByBase(n, 1000)	// 抹去零头，1000整数倍
	}
	return n
}

func (tf *TexasFightRoom) AIBetForPump (winpool []*TexasFightBetPool, pumpgold int64, aishuffle []*TexasFightPlayer) {
	winnum := int64(len(winpool))
	if winnum == 0 || len(aishuffle) == 0 {
		return
	}

	log.Info("[百人大战] 房间[%d %d] 玩家做庄时AI押注机制，抽水总额[%d] 参与AI[%d]", tf.Id(), tf.Round(), pumpgold, len(aishuffle))
	for _, pool := range winpool {
		if winnum == 1 {
			tf.AIShuffleBet(aishuffle, pumpgold, pool.Pos(), -1)
		}else {
			average := pumpgold / winnum
			randaverage := util.RandBetweenInt64(0, 2*average)
			if pool.WinOdds() != 0 {
				betgold := randaverage / pool.WinOdds()	// 根据牌型可赢的倍率算出实际下注金额
				tf.AIShuffleBet(aishuffle, betgold, pool.Pos(), -1)
			}
			pumpgold -= randaverage 
			if pumpgold == 0 { break }
		}
		if winnum -= 1; winnum == 0 { break }
	}
}

func (tf *TexasFightRoom) AIBetForDump (losspool []*TexasFightBetPool, dumpgold int64, aishuffle []*TexasFightPlayer) {
	lossnum := int64(len(losspool))
	if lossnum == 0 {
		return
	}

	log.Info("[百人大战] 房间[%d %d] 玩家做庄时AI押注机制，放水总额[%d] 参与AI[%d]", tf.Id(), tf.Round(), dumpgold, len(aishuffle))
	bankerpool := tf.betpool[0]
	for _, pool := range losspool {
		if lossnum == 1 {
			tf.AIShuffleBet(aishuffle, dumpgold, pool.Pos(), -1)
		}else {
			average := dumpgold /lossnum 
			randaverage := util.RandBetweenInt64(0, 2*average)
			if bankerpool.WinOdds() != 0 {
				betgold := randaverage / bankerpool.WinOdds()	// 根据牌型可赢的倍率算出实际下注金额
				tf.AIShuffleBet(aishuffle, betgold, pool.Pos(), -1)
			}
			dumpgold -= randaverage 
		}
		if lossnum -= 1; lossnum == 0 || dumpgold == 0 { 
			break 
		}
	}
}

// AI贡献奖池抽水，计算爆奖池位的押注权重(其实就是分奖池的权重)
func (tf *TexasFightRoom) CalcAIAwardPoolPumpRate() {
	if tf.banker.IsAI() == false {
		return
	}

	tf.aiawardpool.Reset()

	if tf.TotalAwardPool() == 0 {
		log.Info("[百人大战] 房间[%d %d] AI奖池抽水 当前奖池为0", tf.Id(), tf.Round())
		return
	}

	// 牌排序，忽略庄家位置
	sortpool := make([]*TexasFightBetPool, 0)
	for k, pool := range tf.betpool { 
		if k == 0 { continue }
		sortpool = append(sortpool, pool) 
	}

	// 降序
	func() {
		sort.Slice(sortpool, func(i, j int) bool {
			cmp := sortpool[i].Compare(sortpool[j])
			if cmp == kBetResultWin || cmp == kBetResultTie { return true }
			return false
		})
	}()

	// 闲家最大牌型位置是否可以爆奖池
	pool := sortpool[0]
	if pool.tconf.PoolOdds <= 0 {
		log.Info("[百人大战] 房间[%d %d] AI奖池抽水 本轮闲家位没有符合爆奖池的牌", tf.Id(), tf.Round())
		return
	}

	// 计算爆奖池位的押注权重(其实就是分奖池的权重)
	rate := float64(tf.AIAwardPool()) / float64(tf.TotalAwardPool()) * float64(pool.tconf.PoolOdds)
	rate = util.Min(rate, float64(tbl.TexasFight.AIAwardPoolPumpRate)/100)	// 最大90%
	tf.aiawardpool.pumprate = rate
	tf.aiawardpool.poolpos = pool.Pos()
	log.Info("[百人大战] 房间[%d %d] AI奖池抽水检查 本轮AI抽水比例[%.4f] 抽水闲家位编号[%d]", tf.Id(), tf.Round(), rate, pool.Pos())
}

// AI坐庄时，AI贡献奖池抽水回收(现在改为最后时刻押注)
func (tf *TexasFightRoom) AIAwardPoolPumpRecycle() {
	if tf.banker.IsAI() == false {
		log.Info("[百人大战] 房间[%d %d] 本轮不触发AI奖池抽水，非AI庄家", tf.Id(), tf.Round())
		return
	}

	if tf.aiawardpool.pumprate <= 0 || tf.aiawardpool.poolpos <= 0 {
		log.Info("[百人大战] 房间[%d %d] 本轮不触发AI奖池抽水 rate[%.4f] pos[%d]", tf.Id(), tf.Round(), tf.aiawardpool.pumprate, tf.aiawardpool.poolpos)
		return
	}

	if tf.aiawardpool.poolpos > kBetPoolNum - 1 {
		log.Error("[百人大战] 房间[%d %d] AI贡献奖池抽水位置无效[%d]", tf.Id(), tf.Round(), tf.aiawardpool.poolpos)
		return
	}

	pool := tf.betpool[tf.aiawardpool.poolpos]
	playerbet := pool.PlayerBetNum() - tf.aiawardpool.usedgold
	if playerbet <= 0 {		// 没有新的下注投入
		log.Info("[百人大战] 房间[%d %d] 没有玩家投注闲家位置[%d]，本轮AI奖池回收不触发", tf.Id(), tf.Round(), tf.aiawardpool.poolpos)
		return
	}
	tf.aiawardpool.usedgold += playerbet


	// 计算AI 下注量
	aibet := float64(playerbet) * tf.aiawardpool.pumprate / (1 - tf.aiawardpool.pumprate)
	pumpgold := int64(aibet)
	if tf.SubKind() == int32(kTexasFightHappyMode) {
		if pumpgold < 100 	{ pumpgold = 100 }		// AI至少压最小注
	}else {
		if pumpgold < 1000 	{ pumpgold = 1000 }		// AI至少压最小注
	}


	// 随机下注次数(AI参与人数)
	joinbet := util.RandBetweenInt64(tbl.TexasFight.AIJoinBetRandNum[0], tbl.TexasFight.AIJoinBetRandNum[1])
	if joinbet == 0 {
		log.Error("[百人大战] 房间[%d %d] AI下注次数为0", tf.Id(), tf.Round())
		return
	}

	aishuffle := tf.SelectBetAI(joinbet)
	realbet := tf.AIShuffleBet(aishuffle, pumpgold, tf.aiawardpool.poolpos, -1)
	log.Info("[百人大战] 房间[%d %d] AI奖池抽水回收执行 玩家下注[%d] AI期望占比[%.4f] AI计划押注[%d] AI实际押注[%d] 参与AI[%d]", 
		tf.Id(), tf.Round(), playerbet, tf.aiawardpool.pumprate, pumpgold, realbet, len(aishuffle))
}

// AI下注采用抢红包方式
func (tf *TexasFightRoom) AIShuffleBet(aishuffle []*TexasFightPlayer, totalbet int64, betpos int32, exclude int32) int64 {
	realbet, num, statleft, randpos := int64(0), len(aishuffle), tf.stattimeout - util.CURTIME(), false
	if statleft < 0 {	statleft = 0 } 		// 下注状态剩余时间0秒
	if betpos == -1 {	randpos = true }	// 每次随机下注位置
	if num == 0 	{
		log.Error("[百人大战] 房间[%d %d] 参与AI闲家下注人数是0", tf.Id(), tf.Round())
		return 0 
	}

	availablepos := make([]int32, 0)
	for i:=int32(1); i < kBetPoolNum; i++ {
		if exclude == i { continue }
		availablepos = append(availablepos, i)
	}
	len_availablepos := int32(len(availablepos))


	for _, p := range aishuffle {
		average, betgold, betdelay := totalbet / int64(num), int64(0), util.RandBetweenInt64(0, statleft)
		if randpos == true {
			index  := util.RandBetween(0, len_availablepos-1)
			betpos = availablepos[index]
		}
		if num == 1 { 
			betgold = totalbet
		}else {
			betgold = util.RandBetweenInt64(0, 2*average)
		}

		betgold   = tf.AIBetGoldFix(betgold)
		if betgold != 0 {
			totalbet -= betgold
			realbet  += betgold
			p.AddAIBetTrigger(betpos, betgold, int32(betdelay))
			//log.Trace("[百人大战] 房间[%d %d] AI[%s %d]下注[%d] 时间[%d]", tf.Id(), tf.Round(), p.Name(), p.Id(), betgold, betdelay)
		}
		if num -= 1; num == 0 || totalbet == 0 {
			break
		}
	}
	return realbet
}


