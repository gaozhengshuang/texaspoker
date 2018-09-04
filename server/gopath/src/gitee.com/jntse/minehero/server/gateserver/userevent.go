package main
import (
	//"time"
	"strconv"
	"strings"
	//"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	//"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/log"

	"gitee.com/jntse/minehero/pbmsg"
	//"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
)


// 地图事件
type UserMapEvent struct {
	events map[uint64]*msg.MapEvent
	refreshtime uint32
	owner *GateUser
}

func (m *UserMapEvent) Init(u *GateUser) {
	m.owner = u
	m.events = make(map[uint64]*msg.MapEvent)
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
	send := &msg.GW2C_SendUserEvents{Event:m.PackEvent()}
	m.owner.SendMsg(send)
}

// 刷新玩家的时间列表
func (m *UserMapEvent) Refresh() {

	//事件clean
	m.events = make(map[uint64]*msg.MapEvent)
	eventuid := uint64(1)
	x, y := m.owner.GetUserPos()		// 经纬度
	int_longitude, int_latitude := uint32(x * 1000000) , uint32(y * 1000000)	// 米

	for _, v := range tbl.MapEventRefreshBase.TMapEventRefreshById {
		giftweight := make([]util.WeightOdds, 0)
		if m.ParseProString(&giftweight, v.TypeRand) == false { 
			continue
		}

		for i:=0; i < int(v.Num); i++ {
			index := util.SelectByWeightOdds(giftweight)
			if index < 0 || index >= int32(len(giftweight)) {
				log.Error("[地图事件] 权重获得产出事件失败")
				return
			}

			uid := uint32(giftweight[index].Uid)
			event := &msg.MapEvent{Id:pb.Uint64(eventuid), Tid:pb.Uint32(uid)}
			lo, la := m.GetRandRangePos(int_longitude, int_latitude, v.RangeMin, v.RangeMax)
			event.Longitude, event.Latitude = pb.Uint32(lo), pb.Uint32(la)
			m.events[event.GetId()] = event
			eventuid++
		}
	}

}

func (m *UserMapEvent) ParseProString(sliceweight* []util.WeightOdds, Pro []string) bool {
	for _ , strpro := range Pro {
		slicepro := strings.Split(strpro, "-")
		if len(slicepro) != 3 {
			log.Error("[地图事件] 解析事件生成概率配置异常 strpro=%s", strpro)
			return false
		}
		id    , _ := strconv.ParseInt(slicepro[0], 10, 32)
		weight, _ := strconv.ParseInt(slicepro[1], 10, 32)
		*sliceweight = append(*sliceweight, util.WeightOdds{Weight:int32(weight), Uid:int64(id), Num:int64(0)})
	}
	return true
}

func (m *UserMapEvent) GetRandRangePos(lo, la, rangemin, rangemax uint32) (uint32, uint32) {
	longitude := lo + uint32(util.RandBetween(int32(rangemin), int32(rangemax)))
	latitude  := la + uint32(util.RandBetween(int32(rangemin), int32(rangemax)))
	return longitude, latitude
}


