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
	if tf.IsStateTimeOut(now) == false {
		return 
	}

	switch tf.stat {
	case kStatWaitNextRound:
		tf.ChangeToBettingStat(now)
		break
	case kStatBetting:
		tf.ChangeToWaitNextRoundStat(now)
		break
	}
}

func (tf *TexasFightRoom) Handler100msTick(now int64) {
}

func (tf *TexasFightRoom) FindPlayer(uid int64) *TexasFightPlayer {
	p, _ := tf.players[uid]
	return p
}

func (tf *TexasFightRoom) AddPlayer(u *RoomUser) *TexasFightPlayer {
	p := NewTexasFightPlayer(u)
	tf.players[u.Id()] = p
	return p
}

// 切换状态
func (tf *TexasFightRoom) ChangeToWaitNextRoundStat(now int64) {
	tf.stat = kStatWaitNextRound
	tf.statstart = now
	tf.stattimeout = now + int64(tf.tconf.TimeOut)
	tf.CardDeal()

	// 房间状态变更推送
	statmsg := &msg.RS2C_PushTFStateChange{State:pb.Int32(tf.stat), Statetime:pb.Int64(tf.stattimeout)}
	tf.BroadCastMemberMsg(statmsg)

	//
	log.Info("[百人大战] 房间[%d] 切换到等待下一局状态", tf.Id())
}

func (tf *TexasFightRoom) ChangeToBettingStat(now int64) {
	tf.stat = kStatBetting
	tf.statstart = now
	tf.stattimeout = now + int64(tf.tconf.BetTime)

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
	
}

// 请求站起玩家列表
func (tf *TexasFightRoom) SendStandPlayerList(u *RoomUser, start, count int32) {
	send := &msg.RS2C_RetTFStandPlayer{Playerlist:make([]*msg.TFPlayer,0)}
	for _, p := range tf.players {
		info := p.FillPlayerInfo()
		send.Playerlist = append(send.Playerlist, info)
	}
	u.SendClientMsg(send)
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
	log.Trace("[百人大战] 玩家[%s %d] 房间[%d] 下注[%d]成功，金额[%d]", u.Name(), u.Id(), tf.Id(), pos, num)
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


