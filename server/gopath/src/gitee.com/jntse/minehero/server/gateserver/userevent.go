package main
import (
	//"time"
	//"strconv"
	//"strings"
	//"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"

	//"gitee.com/jntse/gotoolkit/util"
	//"gitee.com/jntse/gotoolkit/redis"
	//"gitee.com/jntse/gotoolkit/log"

	"gitee.com/jntse/minehero/pbmsg"
	//"gitee.com/jntse/minehero/server/def"
	//"gitee.com/jntse/minehero/server/tbl"
)


// 地图事件
type UserMapEvent struct {
	events map[uint64]*msg.MapEvent
	refreshtime uint32
	owner *GateUser
}

func (m *UserMapEvent) Init(u *GateUser) {
	m.owner = u
}

func (m *UserMapEvent) LoadBin(bin *msg.Serialize) {
	if bin.Base.Mapevent == nil {
		bin.Base.Mapevent = &msg.UserMapEvent{Events: make([]*msg.MapEvent, 0)}
	}
	uevent := bin.Base.GetMapevent()
	for _, v := range uevent.Events {
		m.events[v.GetId()] = v
	}
}

func (m *UserMapEvent) PackBin(bin *msg.Serialize) {
	bin.Base.Mapevent = m.PackEvent()
}

func (m *UserMapEvent) PackEvent() *msg.UserMapEvent {
	mapevent := &msg.UserMapEvent{Events: make([]*msg.MapEvent, 0)}
	mapevent.Tmrefresh = pb.Uint32(m.refreshtime)
	for _, v := range m.events {
		mapevent.Events = append(mapevent.Events, v)
	}
	return mapevent
}

// 发送玩家事件
func (m *UserMapEvent) SendEvents() {
	send := &msg.SendUserEvents{Event:m.PackEvent()}
	m.owner.SendMsg(send)
}

// 刷新玩家的时间列表
func (m *UserMapEvent) Refresh() {
	x, y := m.owner.GetUserPos()
}


