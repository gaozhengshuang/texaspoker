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

func (this *UserManager) Init() {
	this.ids = make(map[int64]*RoomUser)
}

func (this *UserManager) Amount() int {
	return len(this.ids)
}

func (this *UserManager) AddUser(u *RoomUser) {
	this.ids[u.Id()] = u
}

func (this *UserManager) FindUser(id int64) *RoomUser {
	u, _ := this.ids[id]
	return u
}

func (this *UserManager) DelUser(u *RoomUser) {
	delete(this.ids, u.Id())
}

func (this *UserManager) IsRegisted(id int64) bool {
	_, ok := this.ids[id]
	return ok
}

func (this *UserManager) Tick(now int64) {
}

func (this *UserManager) CreateRoomUser(roomid int64, bin *msg.Serialize, gate network.IBaseNetSession, gamekind int32) *RoomUser {
	u := NewRoomUser(roomid, bin, gate, gamekind)
	this.ids[u.Id()] = u
	return u
}

