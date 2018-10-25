package main
import (
	"fmt"
	//"gitee.com/jntse/minehero/pbmsg"
	//"gitee.com/jntse/gotoolkit/net"
	_"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/gotoolkit/util"
)

// --------------------------------------------------------------------------
/// @brief 玩家管理器
// --------------------------------------------------------------------------

const (
	AINone int32 = iota // value --> 0
	AIFoldCheck         // value --> 1
	AICall				// value --> 2
	AIRaise				// value --> 3
	AIAllIn				
)

type AIAction struct {
	actionper []int32
	sum int32
}

type AIUserManager struct {
	ids	map[int64]*RoomUser
	aiactions map[int32]*AIAction
}

func (this *AIUserManager) Init() {
	this.ids = make(map[int64]*RoomUser)
	this.aiactions = make(map[int32]*AIAction)
	this.LoadAIAction()
}

func (this *AIUserManager) LoadAIAction() {
	for _, v := range tbl.TexasFRC.TFRCById {
		key := v.Type * 100 + v.High
		action := make([]int32, 0)
		action = append(action, v.Fold)
		action = append(action, v.Call)
		action = append(action, v.Raise)
		action = append(action, v.AllIn)
		tmpsum := v.Fold + v.Call + v.Raise + v.AllIn  
		this.aiactions[key] = &AIAction{actionper : action, sum : tmpsum}
	}
}

func (this *AIUserManager) GetActionByLevel(level int32, high int32) int32 {
	key := level * 100 + high
	if _, ok := this.aiactions[key]; !ok {
		key = level * 100
		if  _, ok1 := this.aiactions[key]; !ok1 {
			return 1
		}
	}
	value := this.aiactions[key]
	per := util.RandBetween(1, value.sum)
	var tmp int32 = 0
	for k, v := range value.actionper {
		tmp += v
		if tmp >= per {
			return int32(k)+1
		}
	}
	return 1
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
	if RoomSvr().Name() != tbl.Room.PublicRoomServer {
		return
	}
	for _, v := range tbl.TexasAI.TAIById {
		user := NewRoomUserAI(int64(v.Id), v.Name, int32(util.RandBetween(1,2)))		
		if user != nil {
			this.AddUser(user)
			Redis().HSet(fmt.Sprintf("charbase_%d", v.Id), "name", v.Name)
			Redis().HSet(fmt.Sprintf("charbase_%d", v.Id), "head", "")
			Redis().HSet(fmt.Sprintf("charbase_%d", v.Id), "sex", user.Sex())
		}
	}
}

func (this *AIUserManager) GetUserByNum(num int32) []*RoomUser {
	tmpmap := make(map[int32]int32)
	for {
		id := util.RandBetween(1, int32(this.Amount()))
		tmpmap[id]=id
		if len(tmpmap) >= int(num){
			break
		}
	}
	users := make([]*RoomUser, 0)
	for k, _ := range tmpmap {
		user , ok := this.ids[int64(k)]
		if ok == true {
			users = append(users, user)
		}
	}
	return users
}

