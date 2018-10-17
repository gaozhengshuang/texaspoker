package main
import (
	//"sort"
	//"fmt"
	//"time"
	//"errors"
	"math/rand"

	pb "github.com/gogo/protobuf/proto"

	//"gitee.com/jntse/gotoolkit/util"
	//"gitee.com/jntse/gotoolkit/log"
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

func (tf *TexasFightRoom) IsStateTimeOut(now int64) bool {
	return now >= tf.stattimeout
}

func (tf *TexasFightRoom) AwardPoolSize() int32 {
	return tf.awardpool
}

// 切换状态
func (tf *TexasFightRoom) ChangeToWaitNextRoundStat(now int64) {
	tf.stat = kStatWaitNextRound
	tf.stattimeout = now + int64(tf.tconf.TimeOut)
	tf.CardDeal()

	// 房间状态变更推送
	statmsg := &msg.RS2C_PushTFStateChange{State:pb.Int32(tf.stat), Statetime:pb.Int64(tf.stattimeout)}
	tf.BroadCastMemberMsg(statmsg)
}

func (tf *TexasFightRoom) ChangeToBettingStat(now int64) {
	tf.stat = kStatBetting
	tf.stattimeout = now + int64(tf.tconf.BetTime)
	tf.CardShuffle()
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

// 请求房间列表
func SendTexasFightRoomList(agent int, userid int64) {
	send := &msg.GW2C_RetTFRoomList{Array:make([]*msg.TexasFightRoom,0)}
	for _, room := range RoomMgr().TexasFightRoomList() {
		tf := room.(*TexasFightRoom)
		info := &msg.TexasFightRoom{}
		info.Id = pb.Int64(tf.Id())
		info.Hwid = pb.Int32(tf.Tid())
		info.Join = pb.Int32(tf.MembersNum())
		info.Pool = pb.Int32(tf.AwardPoolSize())
		send.Array = append(send.Array, info)
	}
	RoomSvr().SendClientMsg(agent, userid, send)
}


