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


type EventHandler func(uid uint64) bool

// 地图事件
type UserMapEvent struct {
	events map[uint64]*msg.MapEvent
	hevents map[uint32]EventHandler
	refreshtime int64		// 上一次刷新时间，秒
	refreshactive int64		// 激活刷新，毫秒
	owner *GateUser
}

func (m *UserMapEvent) Init(u *GateUser) {
	m.owner = u
	m.refreshactive = 0
	m.events = make(map[uint64]*msg.MapEvent)
	m.hevents = make(map[uint32]EventHandler)
}

// 10毫秒tick
func (m *UserMapEvent) Tick(now int64) {
	if m.refreshactive == 0 || now < m.refreshactive {
		return
	}
	m.Refresh(now)
}

func (m *UserMapEvent) Online() {
	m.CheckRefresh()
}

// 读盘
func (m *UserMapEvent) LoadBin(bin *msg.Serialize) {
	if bin.Base.Mapevent == nil {
		bin.Base.Mapevent = &msg.UserMapEvent{Events: make([]*msg.MapEvent, 0)}
	}
	uevent := bin.Base.GetMapevent()
	m.refreshtime = uevent.GetTmrefresh()
	for _, v := range uevent.Events {
		m.events[v.GetId()] = v
	}
}

// 存盘
func (m *UserMapEvent) PackBin(bin *msg.Serialize) {
	//bin.Base.Mapevent = m.PackEvent()		// 测试代码
}

func (m *UserMapEvent) PackEvent() *msg.UserMapEvent {
	mapevent := &msg.UserMapEvent{Events: make([]*msg.MapEvent, 0)}
	mapevent.Tmrefresh = pb.Int64(m.refreshtime)
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

// 检查是否需要刷新(离线玩家)
func (m *UserMapEvent) CheckRefresh() {
	tmstart := util.GetDayStart()
	tmrefresh := tmstart + tbl.Game.MapEvent.TimeRefresh * util.HourSec
	if tmrefresh > m.refreshtime {
		m.Refresh(util.CURTIMEMS())
	}
}

// 激活刷新，给个随机值，避免同时刷新
func (m *UserMapEvent) RefreshActive() {
	m.refreshactive = util.CURTIMEMS() + int64(util.RandBetween(0,5000))	// 毫秒
}

// 刷新玩家的时间列表
func (m *UserMapEvent) Refresh(now int64) {

	//事件clean
	m.events = make(map[uint64]*msg.MapEvent)
	m.refreshtime = now / 1000
	m.refreshactive = 0
	eventuid := uint64(1)
	//x, y := m.owner.GetUserPos()		// 经纬度
	y, x := float32(31.1515941841), float32(121.3384963265)	// 测试代码
	int_longitude, int_latitude := int32(x * 1000000) , int32(y * 1000000)	// 米

	for _, v := range tbl.MapEventRefreshBase.TMapEventRefreshById {
		giftweight := make([]util.WeightOdds, 0)
		if m.ParseProString(&giftweight, v.TypeRand) == false { 
			continue
		}

		for i:=0; i < int(v.Num); i++ {
			index := util.SelectByWeightOdds(giftweight)
			if index < 0 || index >= int32(len(giftweight)) {
				log.Error("[地图事件] 权重获得产出事件失败")
				continue
			}
			uid := uint32(giftweight[index].Uid)
			lo, la := m.GetRandRangePos(int_longitude, int_latitude, v.RangeMin, v.RangeMax)
			event := &msg.MapEvent{Id:pb.Uint64(eventuid), Tid:pb.Uint32(uid), Longitude:pb.Int32(lo), Latitude:pb.Int32(la)}
			m.events[event.GetId()] = event
			eventuid++
		}
	}

	log.Trace("[地图事件] 玩家[%s %d] 刷新地图事件size[%d]", m.owner.Name(), m.owner.Id(), len(m.events))
}

// 解析配置
func (m *UserMapEvent) ParseProString(sliceweight* []util.WeightOdds, Pro []string) bool {
	for _ , strpro := range Pro {
		slicepro := strings.Split(strpro, "-")
		if len(slicepro) != 2 {
			log.Error("[地图事件] 解析事件生成概率配置异常 strpro=%s", strpro)
			return false
		}
		id    , _ := strconv.ParseInt(slicepro[0], 10, 32)
		weight, _ := strconv.ParseInt(slicepro[1], 10, 32)
		*sliceweight = append(*sliceweight, util.WeightOdds{Weight:int32(weight), Uid:int64(id), Num:int64(0)})
	}
	return true
}

// 传入经纬度和区间随机返回一个点
func (m *UserMapEvent) GetRandRangePos(lo, la int32, rangemin, rangemax uint32) (int32, int32) {
	difflo := util.RandBetween(int32(rangemin), int32(rangemax))
	if util.SelectPercent(50) { difflo *= -1 }
	longitude := lo + difflo

	diffla := util.RandBetween(int32(rangemin), int32(rangemax))
	if util.SelectPercent(50) { diffla *= -1 }
	latitude  := la + diffla
	return longitude, latitude
}

// 激活进入事件
func (m *UserMapEvent) EnterEvents(uid uint64) {
	event, find := m.events[uid]
	if event == nil || find == false {
		log.Error("玩家没有这个事件[%d]", uid)
		return
	}
}

