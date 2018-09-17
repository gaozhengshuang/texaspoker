package main
import (
	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/net"

	"gitee.com/jntse/minehero/pbmsg"
)

// --------------------------------------------------------------------------
/// @brief room接口，各种room从这里派生
// --------------------------------------------------------------------------
type IRoomBase interface {
	Id() int64
	Init() string
	Kind() int32
	Tick(now int64)
	SendUserMsg(userid uint64, msg pb.Message)
	SendGateMsg(userid uint64, msg pb.Message)
	BroadCastUserMsg(msg pb.Message, except ...uint64)
	BroadCastGateMsg(msg pb.Message, except ...uint64)
	IsStart() bool
	IsEnd(now int64) bool
	OnEnd(now int64)
	UserLoad(bin *msg.Serialize, session network.IBaseNetSession)
	UserEnter(userid uint64)
	UserLeave(userid uint64)
	UserDisconnect(userid uint64)
	UserStandUp(userid uint64)		// 棋牌类站起
	UserSitDown(userid uint64)		// 棋牌类坐下
}


// --------------------------------------------------------------------------
/// @brief 房间基础数据
// --------------------------------------------------------------------------
type RoomBase struct {
	id				int64
	tm_create		int64
	tm_start		int64
	tm_end			int64
	roomkind		int32
	owner			*RoomUser
	ownerid			uint64
	members			map[uint64]*RoomUser
	close_reason	string	// 正常关闭房间的原因
}

func (r *RoomBase) Id() int64 {
	return r.id
}

func (r *RoomBase) Kind() int32 {
	return r.roomkind
}

func (r *RoomBase) SendGateMsg(userid uint64, m pb.Message) {
	if u, find := r.members[userid]; find == true {
		u.SendMsg(m)
	}
}

func (r *RoomBase) SendUserMsg(userid uint64, m pb.Message) {
	if u, find := r.members[userid]; find == true {
		u.SendClientMsg(m)
	}
}

func (r *RoomBase) BroadCastGateMsg(m pb.Message, except ...uint64) {
	memloop:
	for id, u := range r.members {
		for _, exc := range except {
			if id == exc { continue memloop }
		}
		u.SendMsg(m)
	}
}

func (r *RoomBase) BroadCastUserMsg(m pb.Message, except ...uint64) {
	memloop:
	for id, u := range r.members {
		for _, exc := range except {
			if id == exc { continue memloop }
		}
		u.SendClientMsg(m)
	}
}

func NewGameRoom(ownerid uint64, id int64, roomkind int32) IRoomBase {
	switch msg.RoomKind(roomkind) {
	case msg.RoomKind_TanTanLe:		// 弹弹乐
		room := &TanTanLe{}
		room.id = id
		room.tm_create = util.CURTIME()
		room.tm_start = 0
		room.roomkind = roomkind
		room.owner = nil
		room.ownerid = ownerid
		return room
	case msg.RoomKind_TexasPoker:
		return nil
	default:
		return nil
	}
}

