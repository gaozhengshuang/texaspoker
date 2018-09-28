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
type AIUserManager struct {
	ids	map[int64]*RoomUser
}

func (this *AIUserManager) Init() {
	this.ids = make(map[int64]*RoomUser)
}

func (this *AIUserManager) Amount() int {
	return len(this.ids)
}

func (this *AIUserManager) AddUser(u *RoomUser) {
	this.ids[u.Id()] = u
}

func (this *AIUserManager) FindUser(id int64) *RoomUser {
	u, _ := this.ids[id]
	return u
}

func (this *AIUserManager) DelUser(u *RoomUser) {
	delete(this.ids, u.Id())
}

func (this *AIUserManager) IsRegisted(id int64) bool {
	_, ok := this.ids[id]
	return ok
}

func (this *AIUserManager) Tick(now int64) {
}

func (this *AIUserManager) CreateRoomAIUser() {
	for _, v := range tbl.TexasAI.TexasAIById {
		user := NewRoomUserAI(v.Id, v.Name, int32(util.RandBetween(1,2)))		
		if user != nil {
			this.AddUser(u)
		}
	}
}

func (this *AIUserManager) GetUserByNum(num int32) []*RoomUser {
	tmpmap := make([int64]int64)
	for {
		id := util.RandBetween(1, this.Amount())
		tmpmap[id]=id
		if len(tmpmap) >= int(num){
			break
		}
	}
	users := make([]*RoomUser, 0)
	for k, _ := range tmpmap {
		user , ok := this.ids[k]
		if ok == true {
			users = append(users, user)
		}
	}
	return users
}

