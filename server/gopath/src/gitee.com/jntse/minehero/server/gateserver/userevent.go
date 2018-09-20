package main
import (
	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"

	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
)


func NewMapEvent(ty int32, bin *msg.MapEvent) IMapEvent {
	switch ty {
	case int32(msg.MapEventType_Game):
		return &GameMapEvent{BaseMapEvent{bin:bin}}
	case int32(msg.MapEventType_Bonus):
		return &BonusMapEvent{BaseMapEvent{bin:bin}}
	case int32(msg.MapEventType_Building):
		return &BuildingMapEvent{BaseMapEvent{bin:bin}}
	default:
		log.Error("[地图事件] 创建无效的地图事件类型[%d]", ty)
	}
	return nil
}

func GetMapEventTypeByTid(tid int32) int32 {
	return int32(tid / 1000)
}

// 事件接口
type IMapEvent interface {
	Uid() int64
	Tid() int32
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
func (e *BaseMapEvent) Uid() int64 { return e.bin.GetId() }
func (e *BaseMapEvent) Tid() int32 { return e.bin.GetTid() }
func (e *BaseMapEvent) Bin() *msg.MapEvent { return e.bin }
func (e *BaseMapEvent) Process(u *GateUser) bool { return false }
func (e *BaseMapEvent) IsProcessing() bool { return e.processing }
func (e *BaseMapEvent) SetProcessing(b bool) { e.processing = b}
func (e *BaseMapEvent) OnStart(u *GateUser) { }
func (e *BaseMapEvent) OnEnd(u *GateUser) {
	send := &msg.GW2C_RemoveEvent{Uid:pb.Int64(e.bin.GetId())}
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
			return false
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
		log.Error("[地图事件] 玩家[%s %d] 激活未定义的tid事件[%d]", u.Name(), u.Id(), tid)
		return false
	}

	if e.ProcessCheck(u, tconf) == false {
		log.Error("[地图事件] 玩家[%s %d] 激活事件[%d %d]失败", u.Name(), u.Id(), tid, uid)
		return false
	}

	// 通知到客户端进入指定游戏
	e.SetProcessing(true)
	send := &msg.GW2C_EnterGameEvent{Uid:pb.Int64(uid)}
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
		log.Error("[地图事件] 玩家[%s %d] 激活未定义的tid事件[%d]", u.Name(), u.Id(), tid)
		return false
	}

	if e.ProcessCheck(u, tconf) == false {
		log.Error("[地图事件] 玩家[%s %d] 激活事件[%d %d]失败", u.Name(), u.Id(), tid, uid)
		return false
	}

	rewards := util.SplitIntString(tconf.Reward, "-")
	for _, v := range rewards {
		if v.Len() < 2 { 
			log.Error("[地图事件] 玩家[%s %d] 解析事件tid[%d]奖励配置失败 ObjSplit=%#v", u.Name(), u.Id(), tid, v)
			return false
		}
		id, num := int32(v.Value(0)), int32(v.Value(1))
		u.AddItem(id, num, "地图奖励事件", true)
	}

	log.Info("[地图事件] 玩家[%s %d] 激活事件成功[%d %d]", u.Name(), u.Id(), tid, uid)
	e.SetProcessing(true)
	u.events.RemoveEvent(e, "处理完成")
	return true
}

// 建筑事件
type BuildingMapEvent struct {
	BaseMapEvent
}

func (e *BuildingMapEvent) Process(u *GateUser) bool {
	switch e.bin.GetTid() {
	case int32(msg.MapEventId_BuildingMaidShop):
	case int32(msg.MapEventId_BuildingCarShop):
	case int32(msg.MapEventId_BuildingHouseShop):
	default:
		log.Error("[地图事件] 玩家[%s %d] 未定义的事件[%d]", u.Name(), u.Id(), e.bin.GetTid())
		return false
	}

	tid, uid := e.bin.GetTid(), e.bin.GetId()
	tconf, find := tbl.MapEventBase.TMapEventById[tid]
	if find == false {
		log.Error("[地图事件] 玩家[%s %d] 激活未定义的tid事件[%d]", u.Name(), u.Id(), tid)
		return false
	}

	if e.ProcessCheck(u, tconf) == false {
		log.Error("[地图事件] 玩家[%s %d] 激活事件[%d %d]失败", u.Name(), u.Id(), tid, uid)
		return false
	}

	e.SetProcessing(true)
	return true
}


// --------------------------------------------------------------------------
/// @brief 玩家地图事件
// --------------------------------------------------------------------------
type UserMapEvent struct {
	events map[int64]IMapEvent
	refreshtime int64		// 上一次刷新时间，秒
	refreshactive int64		// 激活刷新，毫秒
	owner *GateUser
	eventsdoing map[int64]IMapEvent	// 正在做的事件
}

func (m *UserMapEvent) Init(u *GateUser) {
	m.owner = u
	m.refreshactive = 0
	m.events = make(map[int64]IMapEvent)
	m.eventsdoing = make(map[int64]IMapEvent)
}

// 10毫秒tick
func (m *UserMapEvent) Tick(now int64) {
	if m.refreshactive == 0 || now < m.refreshactive {
		return
	}
	m.Refresh(now)
}

// 依赖个人坐标才会刷新事件点
func (m *UserMapEvent) Online() {
	m.CheckRefresh()
	if len(m.events) != 0 {
		m.SendEvents()
	}
	// 打印事件点
	//for _, v := range m.events {
	//	log.Trace("[地图事件] 玩家[%s %d] 事件点[%v]", m.owner.Name(), m.owner.Id(), v.Bin())
	//}
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

	// 清除bin上面的事件点(通过SendEvents通知客户端刷新事件点)
	bin.Base.Mapevent = nil
}

// 存盘
func (m *UserMapEvent) PackBin(bin *msg.Serialize) {
	bin.Base.Mapevent = m.PackEvent()
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
		if m.Refresh(util.CURTIMEMS()) {
			m.SendEvents()
		}
	}
}

// 激活刷新，给个随机值，避免同时刷新
func (m *UserMapEvent) RefreshActive() {
	m.refreshactive = util.CURTIMEMS() + int64(util.RandBetween(0,5000))	// 毫秒
}

// 刷新玩家的时间列表
func (m *UserMapEvent) Refresh(now int64) bool {

	//事件clean
	m.events = make(map[int64]IMapEvent)
	longitude, latitude := m.owner.GetUserPos()
	//longitude, latitude := float32(121.38206), float32(31.11325) // 测试代码
	if longitude == 0 || latitude == 0 {
		log.Warn("[地图事件] 玩家[%s %d] 刷新事件点但个人坐标无效", m.owner.Name(), m.owner.Id())
		return false
	}

	m.refreshtime = now / 1000			// 秒
	m.refreshactive = 0
	eventuid := int64(1)
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
			tid := int32(giftweight[index].Uid)
			m.AddEvent(eventuid, tid, v.RangeMin, v.RangeMax)
			eventuid++
		}
	}

	log.Trace("[地图事件] 玩家[%s %d] 刷新地图事件size[%d]", m.owner.Name(), m.owner.Id(), len(m.events))
	return true
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
func (m *UserMapEvent) GetRandRangePos(lo, la int32, rangemin, rangemax int32) (int32, int32) {

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
	//log.Trace("[地图事件] 原点[%d %d] 生成点[%d %d] 范围[%d %d] Rand[%d %d]", lo, la, longitude, latitude, rangemin, rangemax, difflo, diffla)
	return longitude, latitude
}

// 激活进入事件
func (m *UserMapEvent) EnterEvent(uid int64) {
	event, find := m.events[uid]
	if event == nil || find == false {
		log.Error("玩家没有这个事件[%d]", uid)
		return
	}

	event.Process(m.owner)
}

// 主动离开事件
func (m *UserMapEvent) LeaveEvent(uid int64) {
	event, find := m.events[uid]
	if event == nil || find == false {
		log.Error("玩家没有这个事件[%d]", uid)
		return
	}
	m.RemoveEvent(event, "玩家主动关闭")
}

func (m *UserMapEvent) RemoveProcessingEvent(tid int32) {
	for _, v := range m.events {
		if v.Tid() != tid { continue }
		if false == v.IsProcessing() { continue }
		m.RemoveEvent(v, "移除正在处理的事件")
	}
}

func (m *UserMapEvent) RemoveEvent(event IMapEvent, reason string) {
	event.SetProcessing(false)
	event.OnEnd(m.owner)
	delete(m.events, event.Uid())
	log.Info("[玩家事件] 玩家[%s %d] 移除事件%d 原因[%s]", m.owner.Name(), m.owner.Id(), event.Uid(), reason)
}

func (m *UserMapEvent) RemoveEventById(uid int64, reason string) {
	event, ok := m.events[uid]
	if !ok { 
		log.Error("[玩家事件] 玩家[%s %d] 移除不存在的事件[%d]", m.owner.Name(), m.owner.Id(), uid)
		return
	}
	m.RemoveEvent(event, reason)
}

func (m *UserMapEvent) AddEvent(uid int64, tid, rmin, rmax int32) {
	longitude, latitude := m.owner.GetUserPos()		// 经纬度
	//longitude, latitude := float32(121.38206), float32(31.11325) // 测试代码
	int_longitude, int_latitude := int32(longitude * 100000) , int32(latitude * 100000)	// 米

	lo, la := m.GetRandRangePos(int_longitude, int_latitude, rmin, rmax)
	eventbin := &msg.MapEvent{Id:pb.Int64(uid), Tid:pb.Int32(tid), Longitude:pb.Int32(lo), Latitude:pb.Int32(la)}
	m.events[uid] = NewMapEvent(GetMapEventTypeByTid(tid), eventbin)
}


