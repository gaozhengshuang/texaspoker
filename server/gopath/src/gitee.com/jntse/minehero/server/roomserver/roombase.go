package main
import (
	pb "github.com/gogo/protobuf/proto"

	_"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/net"

	"gitee.com/jntse/minehero/pbmsg"
)

// --------------------------------------------------------------------------
/// @brief room接口，各种room从这里派生
// --------------------------------------------------------------------------
type IRoomBase interface {
	Id() int64
	Tid() int32
	Init() string
	Kind() int32
	Tick(now int64)
	Owner() *RoomUser
	OwnerId() int64
	NumMembers() int32
	Passwd() string
	SubKind() int32
	IsFull() bool
	SendUserMsg(userid int64, msg pb.Message)
	SendGateMsg(userid int64, msg pb.Message)
	BroadCastUserMsg(msg pb.Message, except ...int64)
	BroadCastGateMsg(msg pb.Message, except ...int64)
	IsStart() bool
	IsEnd(now int64) bool
	OnEnd(now int64)
	UserLoad(bin *msg.Serialize, session network.IBaseNetSession)
	UserEnter(userid int64)
	UserLeave(userid int64)
	UserDisconnect(userid int64)
	UserStandUp(u *RoomUser)				// 棋牌类站起
	UserSitDown(u *RoomUser, seat int32)	// 棋牌类坐下
}


// --------------------------------------------------------------------------
/// @brief 房间基础数据
// --------------------------------------------------------------------------
type RoomBase struct {
	id				int64		// 房间uid
	tid				int32		// 房间配置tid
	tm_create		int64		// 创建时间戳
	tm_start		int64		// 开始时间戳
	tm_end			int64		// 结束时间戳
	gamekind		int32		// 游戏类型
	owner			*RoomUser	// 房主
	ownerid			int64		// 房主
	members			map[int64]*RoomUser		// 房间成员
	passwd			string		// 房间密码
	subkind			int32		// 房间子类型
	close_reason	string		// 关闭房间的原因
}

func (r *RoomBase) Id() int64 { return r.id }
func (r *RoomBase) Tid() int32 { return r.tid }
func (r *RoomBase) Kind() int32 { return r.gamekind }
func (r *RoomBase) IsStart() bool { return r.tm_start != 0 }
func (r *RoomBase) IsEnd(now int64) bool { return r.tm_end != 0  }
func (r *RoomBase) Owner() *RoomUser { return r.owner }
func (r *RoomBase) OwnerId() int64 { return r.ownerid }
func (r *RoomBase) NumMembers() int32 { return int32(len(r.members)) }
func (r *RoomBase) Passwd() string { return r.passwd }
func (r *RoomBase) SubKind() int32 { return r.subkind }
func (r *RoomBase) IsFull() bool { return false }
func (r *RoomBase) UserStandUp(u *RoomUser)	 {}
func (r *RoomBase) UserSitDown(u *RoomUser, seat int32)	{}


func (r *RoomBase) SendGateMsg(userid int64, m pb.Message) {
	if u, find := r.members[userid]; find == true {
		u.SendMsg(m)
	}
}

func (r *RoomBase) SendUserMsg(userid int64, m pb.Message) {
	if u, find := r.members[userid]; find == true {
		u.SendClientMsg(m)
	}
}

func (r *RoomBase) BroadCastGateMsg(m pb.Message, except ...int64) {
	memloop:
	for id, u := range r.members {
		for _, exc := range except {
			if id == exc { continue memloop }
		}
		u.SendMsg(m)
	}
}

func (r *RoomBase) BroadCastUserMsg(m pb.Message, except ...int64) {
	memloop:
	for id, u := range r.members {
		for _, exc := range except {
			if id == exc { continue memloop }
		}
		u.SendClientMsg(m)
	}
}

