package main
import (
	//"time"
	//"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	//"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/log"

	"gitee.com/jntse/minehero/pbmsg"
	//"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
)


func NewMapEvent(ty uint32, bin *msg.MapEvent) IMapEvent {
	switch ty {
	case uint32(msg.MapEventType_Game):
		return &GameMapEvent{BaseMapEvent{bin:bin}}
	case uint32(msg.MapEventType_Bonus):
		return &BonusMapEvent{BaseMapEvent{bin:bin}}
	case uint32(msg.MapEventType_Building):
		return &BuildingMapEvent{BaseMapEvent{bin:bin}}
	default:
		log.Error("[地图事件] 创建无效的地图事件类型[%d]", ty)
	}
	return nil
}

func GetMapEventTypeByTid(tid uint32) uint32 {
	return uint32(tid / 1000)
}

// 事件接口
type IMapEvent interface {
	Uid() uint64
	Tid() uint32
	Process(u *GateUser) bool
	Bin() *msg.MapEvent
	ProcessCheck(u *GateUser, tconf *table.TMapEventDefine) bool
	OnStart(u *GateUser)
	OnEnd(u *GateUser) 
	IsProcessing() bool
	SetProcessing(b bool)
}

// 事件基础数据
type BaseMapEvent struct {
	bin *msg.MapEvent
	processing bool		// 正在处理事件
}
func (e *BaseMapEvent) Uid() uint64 { return e.bin.GetId() }
func (e *BaseMapEvent) Tid() uint32 { return e.bin.GetTid() }
func (e *BaseMapEvent) Bin() *msg.MapEvent { return e.bin }
func (e *BaseMapEvent) Process(u *GateUser) bool { return false }
func (e *BaseMapEvent) IsProcessing() bool { return e.processing }
func (e *BaseMapEvent) SetProcessing(b bool) { e.processing = b}
func (e *BaseMapEvent) OnStart(u *GateUser) { }
func (e *BaseMapEvent) OnEnd(u *GateUser) {
	send := &msg.GW2C_RemoveEvent{Uid:pb.Uint64(e.bin.GetId())}
	u.SendMsg(send)
}
func (e *BaseMapEvent) ProcessCheck(u *GateUser, tconf *table.TMapEventDefine) bool {
	switch msg.MoneyType(tconf.MoneyType) {
	case msg.MoneyType__Gold:
		if u.GetGold() < tconf.Price { 
			u.SendNotify("金币不足") 
			return false
		}
		u.RemoveGold(tconf.Price, "激活事件", true)
	case msg.MoneyType__Diamond:
		if u.GetDiamond() < tconf.Price { 
			u.SendNotify("钻石不足") 
			return false
		}
		u.RemoveDiamond(tconf.Price, "激活事件", true)
	case msg.MoneyType__Strength:
		if u.GetStrength() < tconf.Price { 
			u.SendNotify("体力不足") 
			return false
		}
		u.RemoveStrength(tconf.Price, "激活事件", true)
	default:
		if u.bag.GetItemNum(tconf.MoneyType) < tconf.Price {
			u.SendNotify("道具不足")
			return false
		}
		u.RemoveItem(tconf.MoneyType, tconf.Price, "激活事件")
	}
	return true
}

// 游戏事件
type GameMapEvent struct {
	BaseMapEvent
}

func (e *GameMapEvent) Process(u *GateUser) bool {
	tid, uid := e.bin.GetTid(), e.bin.GetId()
	tconf, find := tbl.MapEventBase.TMapEventById[tid]
	if find == false {
		log.Error("[地图事件] 玩家[%s %d] 激活未定义的tid事件[%d]", tid)
		return false
	}

	if e.ProcessCheck(u, tconf) == false {
		log.Error("[地图事件] 玩家[%s %d] 激活事件[%d %d]失败", tid, uid)
		return false
	}

	// 通知到客户端进入指定游戏
	e.SetProcessing(true)
	send := &msg.GW2C_EnterGameEvent{Uid:pb.Uint64(uid)}
	u.SendMsg(send)
	return true
}

// 奖励事件
type BonusMapEvent struct {
	BaseMapEvent
}

func (e *BonusMapEvent) Process(u *GateUser) bool {
	tid, uid := e.bin.GetTid(), e.bin.GetId()
	tconf, find := tbl.MapEventBase.TMapEventById[tid]
	if find == false {
		log.Error("[地图事件] 玩家[%s %d] 激活未定义的tid事件[%d]", tid)
		return false
	}

	if e.ProcessCheck(u, tconf) == false {
		log.Error("[地图事件] 玩家[%s %d] 激活事件[%d %d]失败", tid, uid)
		return false
	}

	rewards := util.SplitIntString(tconf.Reward, "-")
	for _, v := range rewards {
		if v.Len() < 2 { 
			log.Error("[地图事件] 玩家[%s %d] 解析事件tid[%d]奖励配置失败 ObjSplit=%#v", u.Name(), u.Id(), tid, v)
			return false
		}
		id, num := uint32(v.Value(0)), uint32(v.Value(1))
		u.AddItem(id, num, "地图奖励事件", true)
	}

	log.Info("[地图事件] 玩家[%s %d] 激活事件成功[%d %d]", u.Name(), u.Id(), tid, uid)
	e.SetProcessing(true)
	u.events.RemoveEvent(e)
	return true
}

// 建筑事件
type BuildingMapEvent struct {
	BaseMapEvent
}

func (e *BuildingMapEvent) Process(u *GateUser) bool {
	switch e.bin.GetTid() {
	case uint32(msg.MapEventId_BuildingMaidShop):
	case uint32(msg.MapEventId_BuildingCarShop):
	case uint32(msg.MapEventId_BuildingHouseShop):
	default:
		log.Error("[地图事件] 玩家[%s %d] 未定义的事件[%d]", e.bin.GetTid())
		return false
	}

	tid, uid := e.bin.GetTid(), e.bin.GetId()
	tconf, find := tbl.MapEventBase.TMapEventById[tid]
	if find == false {
		log.Error("[地图事件] 玩家[%s %d] 激活未定义的tid事件[%d]", tid)
		return false
	}

	if e.ProcessCheck(u, tconf) == false {
		log.Error("[地图事件] 玩家[%s %d] 激活事件[%d %d]失败", tid, uid)
		return false
	}

	e.SetProcessing(true)
	Mapstore().SendStoreInfo(u, tid, uid)
	return true
}


// --------------------------------------------------------------------------
/// @brief 玩家地图事件
// --------------------------------------------------------------------------
type UserMapEvent struct {
	events map[uint64]IMapEvent
	refreshtime int64		// 上一次刷新时间，秒
	refreshactive int64		// 激活刷新，毫秒
	owner *GateUser
}

func (m *UserMapEvent) Init(u *GateUser) {
	m.owner = u
	m.refreshactive = 0
	m.events = make(map[uint64]IMapEvent)
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

	// 打印事件点
	for _, v := range m.events {
		log.Trace("[地图事件] 玩家[%s %d] 事件点[%v]", m.owner.Name(), m.owner.Id(), v.Bin())
	}

}

// 读盘
func (m *UserMapEvent) LoadBin(bin *msg.Serialize) {
	if bin.Base.Mapevent == nil {
		bin.Base.Mapevent = &msg.UserMapEvent{Events: make([]*msg.MapEvent, 0)}
	}
	uevent := bin.Base.GetMapevent()
	m.refreshtime = uevent.GetTmrefresh()
	for _, v := range uevent.Events {
		event := NewMapEvent(GetMapEventTypeByTid(v.GetTid()), v)
		if event == nil {
			log.Error("[地图事件] 玩家[%s %d] 加载了无效的地图事件[%d]", m.owner.Name(), m.owner.Id(), v.GetTid())
			continue
		}
		m.events[v.GetId()] = event
	}
}

// 存盘
func (m *UserMapEvent) PackBin(bin *msg.Serialize) {
	//bin.Base.Mapevent = m.PackEvent()
	bin.Base.Mapevent = nil		// 测试代码，暂不保存
}

func (m *UserMapEvent) PackEvent() *msg.UserMapEvent {
	mapevent := &msg.UserMapEvent{Events: make([]*msg.MapEvent, 0)}
	mapevent.Tmrefresh = pb.Int64(m.refreshtime)
	for _, v := range m.events {
		mapevent.Events = append(mapevent.Events, v.Bin())
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
	m.events = make(map[uint64]IMapEvent)
	m.refreshtime = now / 1000			// 秒
	m.refreshactive = 0
	eventuid := uint64(1)
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
			tid := uint32(giftweight[index].Uid)
			m.AddEvent(eventuid, tid, v.RangeMin, v.RangeMax)
			eventuid++
		}
	}

	log.Trace("[地图事件] 玩家[%s %d] 刷新地图事件size[%d]", m.owner.Name(), m.owner.Id(), len(m.events))
}

// 解析配置
func (m *UserMapEvent) ParseProString(sliceweight* []util.WeightOdds, Pro []string) bool {
	ProObj := util.SplitIntString(Pro, "-")
	for _, v := range ProObj {
		if v.Len() != 2 {
			log.Error("[地图事件] 解析事件生成概率配置异常 ObjSplit=%#v", v)
			return false
		}
		id , weight := v.Value(0), v.Value(1)
		*sliceweight = append(*sliceweight, util.WeightOdds{Weight:int32(weight), Uid:int64(id), Num:int64(0)})
	}
	return true
}

// 传入经纬度和区间随机返回一个点
func (m *UserMapEvent) GetRandRangePos(lo, la int32, rangemin, rangemax uint32) (int32, int32) {

	if util.SelectPercent(50) {
		difflo := util.RandBetween(int32(rangemin), int32(rangemax))
		if util.SelectPercent(50) { difflo *= -1 }
		longitude := lo + difflo

		diffla := util.RandBetween(-int32(rangemax), int32(rangemax))
		latitude := la + diffla

		log.Trace("[地图事件] 原点[%d %d] 生成点[%d %d] 范围[%d %d] Rand[%d %d]", lo, la, longitude, latitude, rangemin, rangemax, difflo, diffla)
		return longitude, latitude
	}

	diffla := util.RandBetween(int32(rangemin), int32(rangemax))
	if util.SelectPercent(50) { diffla *= -1 }
	latitude  := la + diffla

	difflo := util.RandBetween(-int32(rangemax), int32(rangemax))
	longitude := lo + difflo
	log.Trace("[地图事件] 原点[%d %d] 生成点[%d %d] 范围[%d %d] Rand[%d %d]", lo, la, longitude, latitude, rangemin, rangemax, difflo, diffla)
	return longitude, latitude
}

// 激活进入事件
func (m *UserMapEvent) EnterEvent(uid uint64) {
	event, find := m.events[uid]
	if event == nil || find == false {
		log.Error("玩家没有这个事件[%d]", uid)
		return
	}

	event.Process(m.owner)
}

// 主动离开事件
func (m *UserMapEvent) LeaveEvent(uid uint64) {
	event, find := m.events[uid]
	if event == nil || find == false {
		log.Error("玩家没有这个事件[%d]", uid)
		return
	}
	m.RemoveEvent(event)
}

func (m *UserMapEvent) RemoveProcessingEvent(tid uint32) {
	for _, v := range m.events {
		if v.Tid() != tid { continue }
		if false == v.IsProcessing() { continue }
		m.RemoveEvent(v)
	}
}

func (m *UserMapEvent) RemoveEvent(event IMapEvent) {
	event.SetProcessing(false)
	event.OnEnd(m.owner)
	delete(m.events, event.Uid())
}

func (m *UserMapEvent) AddEvent(uid uint64, tid, rmin, rmax uint32) {
	//x, y := m.owner.GetUserPos()		// 经纬度
	//if x == 0 || y == 0 {
	//	log.Error("[地图事件] 玩家[%s %d]经纬度信息无效", m.owner.Name(), m.owner.Id())
	//	return
	//}
	y, x := float32(31.11325), float32(121.38206)	// 测试代码
	int_longitude, int_latitude := int32(x * 100000) , int32(y * 100000)	// 米

	lo, la := m.GetRandRangePos(int_longitude, int_latitude, rmin, rmax)
	eventbin := &msg.MapEvent{Id:pb.Uint64(uid), Tid:pb.Uint32(tid), Longitude:pb.Int32(lo), Latitude:pb.Int32(la)}
	m.events[uid] = NewMapEvent(GetMapEventTypeByTid(tid), eventbin)
}


