package main
import (
	"fmt"
	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	//"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"

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
	MembersNum() int32			// 所有玩家
	Passwd() string
	SubKind() int32
	IsFull() bool

	SendUserMsg(userid int64, msg pb.Message)
	SendGateMsg(userid int64, msg pb.Message)
	BroadCastMemberGateMsg(msg pb.Message, except ...int64)
	BroadCastMemberMsg(msg pb.Message, except ...int64)
	//BroadCastWatcherMsg(msg pb.Message, except ...int64)
	BroadCastRoomMsg(msg pb.Message, except ...int64)

	InitCache()
	RmCache()
	Destory(delay int64)
	IsDestory(now int64) bool
	OnDestory(now int64)
	IsGameStart() bool
	IsGameOver() bool
	OnGameStart()
	OnGameOver()
	SendChat(rev *msg.GW2RS_ChatInfo)

	//UserLoad(tmsg *msg.GW2RS_UploadUserBin, session network.IBaseNetSession)
	UserEnter(u *RoomUser)
	UserLeave(u *RoomUser)
	UserDisconnect(u *RoomUser)
	UserStandUp(u *RoomUser)				// 棋牌类站起
	UserSitDown(u *RoomUser, seat int32)	// 棋牌类坐下
}


// --------------------------------------------------------------------------
/// @brief 房间基础数据
// --------------------------------------------------------------------------
type RoomBase struct {
	id				int64		// 房间uid
	tid				int32		// 房间配置tid
	tm_create		int64		// 房间创建时间戳
	tm_destory		int64		// 房间销毁时间戳
	tm_start		int64		// 单局开始时间戳
	tm_end			int64		// 单局结束时间戳
	gamekind		int32		// 游戏类型
	owner			*RoomUser	// 房主
	ownerid			int64		// 房主
	members			map[int64]*RoomUser		// 所有房间内玩家
	//watchmembers	map[int64]*RoomUser		// 观战，未坐下
	passwd			string		// 房间密码
	subkind			int32		// 房间子类型
	close_reason	string		// 关闭房间的原因
}

func (r *RoomBase) Id() int64 { return r.id }
func (r *RoomBase) Tid() int32 { return r.tid }
func (r *RoomBase) Kind() int32 { return r.gamekind }
func (r *RoomBase) IsGameStart() bool 	{ return r.tm_start != 0 }
func (r *RoomBase) IsGameOver() bool 	{ return true }
func (r *RoomBase) IsDestory(now int64) bool { return (r.tm_destory != 0 && now >= r.tm_destory) }
func (r *RoomBase) Destory(delay int64) { r.tm_destory = util.CURTIME() + delay }
func (r *RoomBase) Owner() *RoomUser { return r.owner }
func (r *RoomBase) OwnerId() int64 { return r.ownerid }
func (r *RoomBase) MembersNum() int32 { return int32(len(r.members)) }
func (r *RoomBase) Passwd() string { return r.passwd }
func (r *RoomBase) SubKind() int32 { return r.subkind }
func (r *RoomBase) IsFull() bool { return false }
func (r *RoomBase) UserStandUp(u *RoomUser)	 {}
func (r *RoomBase) UserSitDown(u *RoomUser, seat int32)	{}
func (r *RoomBase) SendChat(rev *msg.GW2RS_ChatInfo) {
	r.BroadCastMemberMsg(rev.Chat)
}

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

func (r *RoomBase) BroadCastMemberGateMsg(m pb.Message, except ...int64) {
	memloop:
	for id, u := range r.members {
		for _, exc := range except {
			if id == exc { continue memloop }
		}
		u.SendMsg(m)
	}
}

func (r *RoomBase) BroadCastMemberMsg(m pb.Message, except ...int64) {
	memloop:
	for id, u := range r.members {
		if u.RoomId() != r.Id() {
			//log.Info("玩家%d 房间%d不匹配%d 不发消息", u.Id(), u.RoomId(), r.Id())
			continue
		}
		for _, exc := range except {
			if id == exc { continue memloop }
		}
		u.SendClientMsg(m)
	}
}

//func (r *RoomBase) BroadCastWatcherMsg(m pb.Message, except ...int64) {
//	memloop:
//	for id, u := range r.watchmembers {
//		for _, exc := range except {
//			if id == exc { continue memloop }
//		}
//		u.SendClientMsg(m)
//	}
//}

func (r *RoomBase) BroadCastRoomMsg(msg pb.Message, except ...int64) {
	r.BroadCastMemberMsg(msg, except...)
	//r.BroadCastWatcherMsg(msg, except...)
}

// 缓存
func (room *RoomBase) InitCache() {
	pipe := Redis().Pipeline()
	key := fmt.Sprintf("roombrief_%d", room.Id())
	pipe.HSet(key, "uid", room.Id())
	pipe.HSet(key, "ownerid", room.OwnerId())
	pipe.HSet(key, "tid", room.Tid())
	pipe.HSet(key, "members", 0)
	pipe.HSet(key, "passwd", room.Passwd())
	pipe.HSet(key, "agentname", RoomSvr().Name())
	if room.Kind() == int32(msg.RoomKind_TexasFight) {
		pipe.SAdd("tf_roomlist", room.Id())
	}else {
		pipe.SAdd("pb_roomlist", room.Id())
	}
	pipe.SAdd(fmt.Sprintf("roomlist_kind_%d_sub_%d", room.Kind(), room.SubKind()), room.Id())
	if _, err := pipe.Exec(); err != nil {
		log.Error("[房间] 缓存房间[%d]信息失败 %s", room.Id(), err)
	}
	pipe.Close()
}

// 删除缓存
func (room *RoomBase) RmCache() {
	pipe := Redis().Pipeline()
	pipe.Del(fmt.Sprintf("roombrief_%d", room.Id()))
	if room.Kind() == int32(msg.RoomKind_TexasFight) {
		pipe.SRem("tf_roomlist", room.Id())
	}else {
		pipe.SRem("pb_roomlist", room.Id())
	}
	pipe.SRem(fmt.Sprintf("roomlist_kind_%d_sub_%d", room.Kind(), room.SubKind()), room.Id())
	if _, err := pipe.Exec(); err != nil {
		log.Error("[房间] 删除房间[%d]缓存信息失败 %s", room.Id(), err)
	}
	pipe.Close()
}


func IsTexasRoomBaseType(subkind int32) bool {
	switch msg.PlayingFieldType(subkind) {
	case msg.PlayingFieldType_Primary:	return true
	case msg.PlayingFieldType_Middle:	return true
	case msg.PlayingFieldType_High:		return true
	}
	return false
}

func IsTexasRoomPrivateType(subkind int32) bool {
	return subkind == int32(msg.PlayingFieldType_PlayFieldPersonal)
}

