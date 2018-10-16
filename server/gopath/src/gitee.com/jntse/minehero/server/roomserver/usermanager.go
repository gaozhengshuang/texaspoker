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

func (m *UserManager) Init() {
	m.ids = make(map[int64]*RoomUser)
}

func (m *UserManager) Amount() int {
	return len(m.ids)
}

func (m *UserManager) AddUser(u *RoomUser) {
	m.ids[u.Id()] = u
}

func (m *UserManager) FindUser(id int64) *RoomUser {
	u, _ := m.ids[id]
	return u
}

func (m *UserManager) DelUser(u *RoomUser) {
	delete(m.ids, u.Id())
}

func (m *UserManager) IsRegisted(id int64) bool {
	_, ok := m.ids[id]
	return ok
}

func (m *UserManager) Tick(now int64) {
}

func (m *UserManager) CreateRoomUser(roomid int64, bin *msg.Serialize, gate network.IBaseNetSession, gamekind int32) *RoomUser {
	u := NewRoomUser(roomid, gate, gamekind)
	u.DBLoad(bin)
	m.ids[u.Id()] = u
	return u
}

func (m *UserManager) CreateSimpleUser(userid int64) *RoomUser {
	u := NewSimpleUser(userid)
	m.ids[u.Id()] = u
	return u
}
