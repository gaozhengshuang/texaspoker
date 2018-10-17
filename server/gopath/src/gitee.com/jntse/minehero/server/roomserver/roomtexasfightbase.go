package main
import (
	//"sort"
	//"fmt"
	"time"
	//"errors"
	//"math/rand"

	//pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	//"gitee.com/jntse/gotoolkit/net"

	"gitee.com/jntse/minehero/server/def"
	//"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
)

const (
	kBetPoolNum = 5		// 下注池数量
	kHandCardNum = 5	// 手牌数量
	kBankerPos = 0		// 下注池庄家位置
	kMaxCardNum = 52	// 最大牌数量
)

const (
	kStatWaitNextRound = 0	// 等待下一局
	kStatBetting = 1		// 下注阶段
)

// 百人大招玩家
type TexasFightPlayer struct {
	owner *RoomUser
	sitpos int32		// 坐下位置
	betpos int32		// 押注位置
	betmoney int32		// 押注金额
}

// 百人大战下注池
type TexasFightBetPool struct {
	total int32
	betpos int32
	cards [kHandCardNum]*Card
	players []*TexasFightPlayer
	hand *Hand
}

func (t *TexasFightBetPool) Init() {
	t.Reset()
}

func (t* TexasFightBetPool) Total() int32 {
	return t.total
}

func (t *TexasFightBetPool) Reset() {
	t.total = 0
	t.cards = [kHandCardNum]*Card{}
	t.players = make([]*TexasFightPlayer,0)
	t.hand = &Hand{}
	t.hand.Init()
}

func (t *TexasFightBetPool) InsertCards(cards []*Card) {
	if len(cards) != len(t.cards) {
		return
	}

	for k, card := range t.cards {
		t.cards[k] = cards[k]
		t.hand.SetCard(card, false)
	}

	t.hand.AnalyseHand()
}

func (t *TexasFightBetPool) GetCardFightValue() int32 {
	return t.hand.GetFightValue()
}


// 百人大战
type TexasFightRoom struct {
	RoomBase
	tconf *table.HundredWarDefine
	ticker1s *util.GameTicker
	ticker100ms *util.GameTicker
	stat int32		// 状态
	stattimeout int64	// 状态超时
	sitplayers []*TexasFightPlayer				// 坐下玩家列表
	standplayers map[int64]*TexasFightPlayer	// 站起玩家列表

	awardpool int32	// 奖池
	betpool [kBetPoolNum]*TexasFightBetPool		// 押注池，0庄家，闲家从左到右1-4
	cards [kMaxCardNum]*Card
}

func (tf *TexasFightRoom) Init() string {
	tconf, ok := tbl.HundredWarBase.HundredWarById[tf.tid]
	if ok == false {
		log.Error("[百人大战] not found room tconf[%d]", tf.tid)
		return "找不到房间配置"
	}
	tf.tconf = tconf
	tf.subkind = tconf.Type
	tf.stat = kStatWaitNextRound
	tf.stattimeout = util.CURTIME() + int64(tf.tconf.TimeOut)
	Redis().SAdd(def.RoomAgentLoadRedisKey(RoomSvr().Name()), tf.Id())

	tf.ticker1s = util.NewGameTicker(1 * time.Second, tf.Handler1sTick)
	tf.ticker100ms = util.NewGameTicker(100 * time.Millisecond, tf.Handler100msTick)
	tf.ticker1s.Start()
	tf.ticker100ms.Start()
	
	tf.sitplayers = make([]*TexasFightPlayer, tconf.Seat)
	tf.standplayers = make(map[int64]*TexasFightPlayer)
	tf.awardpool = 0

	// 初始下注池
	tf.betpool = [kBetPoolNum]*TexasFightBetPool{}
	for i := int32(0); i < kBetPoolNum; i++ {
		betpool := &TexasFightBetPool{betpos:i}
		betpool.Init()
		tf.betpool[i] = betpool
	}

	// 初始52张牌
	cards, index := [kMaxCardNum]*Card{}, 0
	for i := int32(0); i < int32(SUITSIZE); i++{
		for j := int32(0); j < int32(CARDRANK); j++{
			cards[index] = NewCard(i, j)
			index++
		}
	}
	tf.cards = cards

	//
	log.Info("[百人大战] 百人大战初始化成功 Id[%d] 子类型[%d] Tid[%d]", tf.Id(), tf.SubKind(), tf.Tid())
	return ""
}

// 房间销毁
func (tf *TexasFightRoom) OnDestory(now int64) {
	tf.ticker1s.Stop()
}

// 单局游戏开始
func (tf *TexasFightRoom) OnGameStart() {
}

// 单局游戏结束
func (tf *TexasFightRoom) OnGameOver() {
}

// 玩家进入房间，首次/断线重进
func (tf *TexasFightRoom) UserEnter(u *RoomUser) {
	log.Info("[百人大战] 玩家[%s %d] 进入房间[%d]", u.Name(), u.Id(), tf.Id())
	u.OnPreEnterRoom()
	u.OnEnterRoom(tf)
}

// 玩家离开房间
func (tf *TexasFightRoom) UserLeave(u *RoomUser) {
	log.Info("[百人大战] 玩家[%s %d] 离开房间[%d] ")
	delete(tf.members, u.Id())
	u.OnLeaveRoom()
}

// 棋牌类站起
func (tf *TexasFightRoom) UserStandUp(u *RoomUser) {
	//delete(tf.members, u.Id())
	//tf.watchmembers[u.Id()] = u
	//u.OnStandUp()
	//Redis().HSet(fmt.Sprintf("roombrief_%d", tf.Id()), "members", tf.PlayersNum())
	//log.Info("[百人大战] 玩家[%s %d] 站起观战[%d]", u.Name(), u.Id(), tf.Id())
}

// 棋牌类坐下
func (tf *TexasFightRoom) UserSitDown(u *RoomUser, pos int32) {
	//delete(tf.watchmembers, u.Id())
	//tf.members[u.Id()] = u

	//// 检查位置是否有效

	//// 检查座位是否空着
	//for _, u := range tf.members {
	//	if u.Seat() == pos {
	//		u.OnSitDown(0, "座位已经有人了")
	//		return
	//	}
	//}

	////
	//u.OnSitDown(pos, "")

	//// 更新房间人数
	//Redis().HSet(fmt.Sprintf("roombrief_%d", tf.Id()), "members", tf.PlayersNum())
	//log.Info("[百人大战] 玩家[%s %d] 坐下房间[%d] 位置[%d] 等待下一局", u.Name(), u.Id(), tf.Id(), pos)
}


// 加载玩家
//func (tf *TexasFightRoom) UserLoad(tmsg *msg.GW2RS_UploadUserBin, gate network.IBaseNetSession) {
//	u := UserMgr().FindUser(tmsg.GetUserid())
//	if u != nil {
//		log.Error("[百人大战] 玩家[%s %d] 个人信息已经存在了", u.Name(), u.Id())
//		return
//	}
//
//	u = UserMgr().CreateRoomUser(tf.Id(), tmsg.Bin, gate, tf.Kind())
//	u.OnPreEnterRoom()
//	log.Info("[百人大战] 玩家[%s %d] 上传个人数据到房间[%d]", u.Name(), u.Id(), tf.Id())
//}

func (tf *TexasFightRoom) Tick(now int64) {
	tf.ticker1s.Run(now)
}

// 玩家断开连接(托管/踢掉)
func (tf *TexasFightRoom) UserDisconnect(u *RoomUser) {
	log.Info("[百人大战] 玩家[%s %d] 网络断开 房间[%d]", u.Name(), u.Id(), tf.Id())
}

// 网关断开
func (tf *TexasFightRoom) GateLeave(sid int) {
}


