package main
import (
	//"sort"
	//"fmt"
	"time"
	//"errors"
	//"math/rand"

	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	//"gitee.com/jntse/gotoolkit/net"

	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
)

const (
	kBetPoolNum = 4		// 下注池数量
	kHandCardNum = 5	// 手牌数量
	kBankerPos = 0		// 庄家位置
	kMaxCardNum = 52	// 最大牌数量
)

// 下注池位置
const (
	kBetPoolPosBanker = 0
	kBetPoolPosP1 = 1
	kBetPoolPosP2 = 2
	kBetPoolPosP3 = 3
	kBetPoolPosP4 = 4
)

// 房间状态
const (
	kStatWaitNextRound = 0	// 等待下一局
	kStatBetting = 1		// 下注阶段
)


// --------------------------------------------------------------------------
/// @brief 百人大战玩家
// --------------------------------------------------------------------------
type TFPlayerBet struct {
	pos int32
	bet int32
}
func (b *TFPlayerBet) Pos() int32 { return b.pos }
func (b *TFPlayerBet) Bet() int32 { return b.bet }

type TexasFightPlayer struct {
	owner *RoomUser
	sitpos int32		// 坐下位置，0是庄家位置，-1表示站起没有位置
	betlist	[kBetPoolNum]*TFPlayerBet	// 下注列表，闲家从左到右1-4
}

func NewTexasFightPlayer(u *RoomUser) *TexasFightPlayer {
	p := &TexasFightPlayer{owner:u, sitpos:-1}
	return p
}

func (p *TexasFightPlayer) Id() int64 {
	return p.owner.Id()
}

func (p *TexasFightPlayer) Name() string {
	return p.owner.Name()
}

func (p *TexasFightPlayer) SitPos() int32 {
	return p.sitpos
}

func (p *TexasFightPlayer) BetInfo() [kBetPoolNum]*TFPlayerBet {
	return p.betlist
}

func (p *TexasFightPlayer) FillPlayerInfo() *msg.TFPlayer {
	info := &msg.TFPlayer{}
	info.Roleid = pb.Int64(p.owner.Id())
	info.Name = pb.String(p.owner.Name())
	info.Head = pb.String(p.owner.Head())
	info.Sex = pb.Int32(p.owner.Sex())
	info.Gold = pb.Int32(p.owner.GetGold())
	info.Pos = pb.Int32(p.SitPos())
	return info
}


// --------------------------------------------------------------------------
/// @brief 百人大战下注池
// --------------------------------------------------------------------------
type TexasFightBetPool struct {
	total int32
	pos int32
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

func (t *TexasFightBetPool) FillBetPoolInfo() *msg.TFBetPoolInfo {
	info := &msg.TFBetPoolInfo{Bet:pb.Int32(t.total), Pos:pb.Int32(t.pos)}
	for _, card := range t.cards {
		info.Cards = append(info.Cards, card.Suit)
		info.Cards = append(info.Cards, card.Value)
	}
	return info
}


// --------------------------------------------------------------------------
/// @brief 百人大战核心逻辑
// --------------------------------------------------------------------------
type TexasFightRoom struct {
	RoomBase
	tconf *table.HundredWarDefine
	ticker1s *util.GameTicker
	ticker100ms *util.GameTicker
	stat int32			// 状态
	statstart int64		// 状态开始时间
	stattimeout int64	// 状态超时时间

	players map[int64]*TexasFightPlayer	// 所有玩家
	sitplayers []*TexasFightPlayer		// 坐下玩家列表
	bankerplayers []*TexasFightPlayer	// 庄家列表

	awardpoolsize int32	// 奖池大小
	betpool [kBetPoolNum]*TexasFightBetPool		// 押注池，0庄家，闲家从左到右1-4
	cards [kMaxCardNum]*Card
}

func (tf *TexasFightRoom) Stat() int32 { return tf.stat }
func (tf *TexasFightRoom) StatStartTime() int64 { return tf.statstart }
func (tf *TexasFightRoom) IsStateTimeOut(now int64) bool { return now >= tf.stattimeout }
func (tf *TexasFightRoom) AwardPoolSize() int32 { return tf.awardpoolsize }



// --------------------------------------------------------------------------
/// @brief 初始化
///
/// @param 
// --------------------------------------------------------------------------
func (tf *TexasFightRoom) Init() string {
	tconf, ok := tbl.HundredWarBase.HundredWarById[tf.tid]
	if ok == false {
		log.Error("[百人大战] not found room tconf[%d]", tf.tid)
		return "找不到房间配置"
	}
	tf.tconf = tconf
	tf.subkind = tconf.Type
	tf.stat = kStatWaitNextRound
	tf.statstart = util.CURTIME()
	tf.stattimeout = tf.statstart + int64(tf.tconf.TimeOut)
	Redis().SAdd(def.RoomAgentLoadRedisKey(RoomSvr().Name()), tf.Id())

	tf.ticker1s = util.NewGameTicker(1 * time.Second, tf.Handler1sTick)
	tf.ticker100ms = util.NewGameTicker(100 * time.Millisecond, tf.Handler100msTick)
	tf.ticker1s.Start()
	tf.ticker100ms.Start()
	
	tf.sitplayers = make([]*TexasFightPlayer, tconf.Seat)
	tf.players = make(map[int64]*TexasFightPlayer)
	tf.bankerplayers = make([]*TexasFightPlayer, 0)
	tf.awardpoolsize = 0

	// 初始下注池
	tf.betpool = [kBetPoolNum]*TexasFightBetPool{}
	for i := int32(0); i < kBetPoolNum; i++ {
		betpool := &TexasFightBetPool{pos:i}
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
	tf.ticker100ms.Stop()
}


// 单局游戏开始
func (tf *TexasFightRoom) OnGameStart() {
}


// 单局游戏结束
func (tf *TexasFightRoom) OnGameOver() {
}


// 玩家进入房间，首次/断线重进
func (tf *TexasFightRoom) UserEnter(u *RoomUser) {
	player := tf.FindPlayer(u.Id())
	if player == nil {
		player = tf.AddPlayer(u)
	}

	// 执行玩家进房间事件
	u.OnPreEnterRoom()
	u.OnEnterRoom(tf)

	//
	infomsg := &msg.GW2C_RetEnterTFRoom{Playerlist:make([]*msg.TFPlayerPos,0), Betlist:make([]*msg.TFBetPoolInfo,0)}
	infomsg.State = pb.Int32(tf.Stat())
	infomsg.Statetime = pb.Int64(tf.StatStartTime())
	infomsg.Pool = pb.Int32(tf.AwardPoolSize())
	infomsg.Hwid = pb.Int32(tf.Tid())
	infomsg.Bankergold = pb.Int32(0)

	// 坐下玩家列表
	for _, p := range tf.sitplayers {
		situser := &msg.TFPlayerPos{Roleid:pb.Int64(p.Id()), Pos:pb.Int32(p.SitPos())}
		infomsg.Playerlist = append(infomsg.Playerlist, situser)
	}

	// 注池信息
	for _, pool := range tf.betpool {
		info := pool.FillBetPoolInfo()
		infomsg.Betlist = append(infomsg.Betlist, info)
	}

	// 自己下注列表
	for _, bet := range player.BetInfo() {
		if bet == nil { continue }
		infomsg.Mybet = append(infomsg.Mybet, bet.Bet())
	}

	u.SendClientMsg(infomsg)

	log.Info("[百人大战] 玩家[%s %d] 进入房间[%d]", u.Name(), u.Id(), tf.Id())
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


