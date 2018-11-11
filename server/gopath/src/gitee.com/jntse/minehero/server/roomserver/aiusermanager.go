package main
import (
	"fmt"
	//"gitee.com/jntse/minehero/pbmsg"
	//"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
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
	//ids	map[int64]*RoomUser
	idlelist map[int64]*RoomUser	// 空闲列表
	busylist map[int64]*RoomUser	// 繁忙列表
	aiactions map[int32]*AIAction
}

func (this *AIUserManager) Init() {
	//this.ids = make(map[int64]*RoomUser)
	this.busylist = make(map[int64]*RoomUser)
	this.idlelist = make(map[int64]*RoomUser)
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

func (this *AIUserManager) Total() int32 {
	return this.IdleNum() + this.BusyNum()
}

func (this *AIUserManager) IdleNum() int32 {
	return int32(len(this.idlelist))
}

func (this *AIUserManager) BusyNum() int32 {
	return int32(len(this.busylist))
}

func (this *AIUserManager) AddNew(u *RoomUser) {
	this.idlelist[u.Id()] = u
}

func (this *AIUserManager) FindUser(id int64) *RoomUser {
	if u, ok := this.busylist[id]; ok == true {
		return u
	}
	if u, ok := this.idlelist[id]; ok == true {
		return u
	}
	return nil
}

func (this *AIUserManager) Tick(now int64) {
}

func (this *AIUserManager) CreateRoomAIUser() {
	if !(RoomSvr().Name() == tbl.Room.PublicRoomServer || RoomSvr().Name() == tbl.Room.TexasFightRoomName) {
		return
	}
	for _, v := range tbl.TexasAI.TAIById {
		user := NewRoomUserAI(int64(v.Id), v.Name, int32(util.RandBetween(1,2)))		
		if user != nil {
			this.AddNew(user)
			Redis().HSet(fmt.Sprintf("charbase_%d", v.Id), "name", v.Name)
			Redis().HSet(fmt.Sprintf("charbase_%d", v.Id), "head", "")
			Redis().HSet(fmt.Sprintf("charbase_%d", v.Id), "sex", user.Sex())
			log.Trace("[AI] 添加ai机器人 %d %s ", user.Id(), user.Name())
		}
	}
}

func (this *AIUserManager) GetRandomName() string {
	id := util.RandBetween(1, int32(this.Total()))
	user := this.FindUser(int64(id))
	if user != nil {
		return user.Name()
	}
	return "神秘人"
}


// 挑选一些机器人出来
func (this *AIUserManager) PickOutUser(num int32) []*RoomUser {
	users := make([]*RoomUser, 0)
	if this.IdleNum() == 0 || this.IdleNum() < num {
		return users
	}

	for _, u := range this.idlelist {
		users = append(users, u)
	}

	for _, u := range users {
		delete(this.idlelist, u.Id())
		this.busylist[u.Id()] = u
	}
	return users
}



//func (this *AIUserManager) GetUserByNum(num int32, usermap map[int64]int64) []*RoomUser {
//	tmpmap := make(map[int32]int32)
//	for {
//		id := util.RandBetween(1, int32(this.Amount()))
//		if _, ok := usermap[int64(id)]; !ok {
//			tmpmap[id]=id
//		}
//		if len(tmpmap) >= int(num) {
//			break
//		}
//	}
//	users := make([]*RoomUser, 0)
//	for k, _ := range tmpmap {
//		user , ok := this.ids[int64(k)]
//		if ok == true {
//			users = append(users, user)
//		}
//	}
//	return users
//}
//
