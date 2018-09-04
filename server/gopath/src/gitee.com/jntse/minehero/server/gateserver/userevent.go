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
	//x, y := m.owner.GetUserPos()		// 经纬度
	//intx, inty := uint32(x * 1000) , uint32(y * 1000)

	/*
	ParseProString := func (sliceweight* []util.WeightOdds, Pro []string) (bool) {
		for _ , strpro := range Pro {
			slicepro := strings.Split(strpro, "-")
			if len(slicepro) != 3 {
				log.Error("[地图事件] 解析道具产出概率配置异常 strpro=%s", strpro)
				return false
			}
			id    , _ := strconv.ParseInt(slicepro[0], 10, 32)
			weight, _ := strconv.ParseInt(slicepro[1], 10, 32)
			num,    _ := strconv.ParseInt(slicepro[2], 10, 32)
			*sliceweight = append(*sliceweight, util.WeightOdds{Weight:int32(weight), Uid:int64(id), Num:int64(num)})
		}
		return true
	}

	giftweight := make([]util.WeightOdds, 0)
	levelbase, ok := tbl.LevelMaidBase.TLevelMaidById[uint32(maid.Level())]
	if ok == false {
		log.Error("[女仆] 找不到女仆等级配置")
		return
	}

	if ParseProString(&giftweight, levelbase.ProduceItem) == false { 
		log.Error("[女仆] 解析道具产出配置失败")
		return
	}

	index := util.SelectByWeightOdds(giftweight)
	if index < 0 || index >= int32(len(giftweight)) {
		log.Error("[女仆] 权重获得产出道具失败")
		return
	}

	uid, num := giftweight[index].Uid, giftweight[index].Num
	*/
}


