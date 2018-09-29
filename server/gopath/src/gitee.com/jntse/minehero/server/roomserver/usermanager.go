package main
import (
	_"fmt"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/gotoolkit/net"
	_"gitee.com/jntse/gotoolkit/log"
)

// --------------------------------------------------------------------------
/// @brief 玩家管理器
// --------------------------------------------------------------------------
type UserManager struct {
	ids	map[int64]*RoomUser
}

func (um *UserManager) Init() {
	um.ids = make(map[int64]*RoomUser)
}

func (um *UserManager) Amount() int {
	return len(um.ids)
}

func (um *UserManager) AddUser(u *RoomUser) {
	um.ids[u.Id()] = u
}

func (um *UserManager) FindUser(id int64) *RoomUser {
	u, _ := um.ids[id]
	return u
}

func (um *UserManager) DelUser(u *RoomUser) {
	delete(um.ids, u.Id())
}

func (um *UserManager) IsRegisted(id int64) bool {
	_, ok := um.ids[id]
	return ok
}

func (um *UserManager) Tick(now int64) {
}

func (um *UserManager) CreateRoomUser(roomid int64, bin *msg.Serialize, gate network.IBaseNetSession, gamekind int32) *RoomUser {
	u := NewRoomUser(roomid, bin, gate, gamekind)
	um.ids[u.Id()] = u
	return u
}

