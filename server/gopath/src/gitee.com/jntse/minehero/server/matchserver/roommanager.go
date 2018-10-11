package main
import (
	"sort"
	_"fmt"
	"time"
	"math"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	pb"github.com/gogo/protobuf/proto"
	_"github.com/go-redis/redis"
)

// --------------------------------------------------------------------------
/// @brief 自定义排序，按人数排序RoomAgent
// --------------------------------------------------------------------------
type SliceRoom []*RoomAgent
func (s SliceRoom) Len() int {
	return len(s)
}
func (s SliceRoom) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}
func (s SliceRoom) Less(i, j int) bool {
	return s[i].RoomSize() < s[j].RoomSize()
}

// --------------------------------------------------------------------------
/// @brief RoomServer
// --------------------------------------------------------------------------
type RoomAgent struct {
	session network.IBaseNetSession
	name	string
	roomsize int64			// 房间数，FindLowLoadRoom 时计算
	ticker10ms  *util.GameTicker
	asynev  eventque.AsynEventQueue
}

func NewRoomAgent(s network.IBaseNetSession, name string) *RoomAgent {
	agent := &RoomAgent{session:s, name:name} 
	return agent
}

func (r *RoomAgent) Init() {
	r.ticker10ms = util.NewGameTicker(10 * time.Millisecond, r.Handler10msTick)
	r.ticker10ms.Start()
	r.asynev.Start(int64(r.Id()), 10000)
}

func (r *RoomAgent) Tick(now int64) {
	r.ticker10ms.Run(now)
}

func (r *RoomAgent) Handler10msTick(now int64) {
	r.asynev.Dispatch()
}

func (r *RoomAgent) OnEnd() {
	r.asynev.Shutdown()
}

func (r *RoomAgent) AsynEventInsert(event eventque.IEvent) {
	r.asynev.Push(event)
}

func (r *RoomAgent) Id() int {
	return r.session.Id()
}

func (r *RoomAgent) SendMsg(msg pb.Message) bool {
	return r.session.SendCmd(msg)
}

func (r *RoomAgent) Name() string {
	return r.name
}

func (r *RoomAgent) Addr() string {
	return r.session.LocalIp();
}

func (r *RoomAgent) RoomSize() int64 {
	return r.roomsize
}

func (r *RoomAgent) DoCalcRoomSize(argu []interface{}) []interface{} {
	key := def.RoomAgentLoadRedisKey(r.Name())
	size, err := Redis().SCard(key).Result()
	if err != nil {
		log.Error("获取%s房间数失败 err: %s", key, err)
		r.roomsize = math.MaxInt32
	}
	r.roomsize = size
	return nil
}

func (r *RoomAgent) AsynCalcRoomAmount() {
	if r.asynev.IsFull() { return }
	arglist := []interface{}{}
	event := eventque.NewCommonEvent(arglist, r.DoCalcRoomSize, nil)
	r.AsynEventInsert(event)
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type RoomSvrManager struct {
	agents map[int]*RoomAgent
	tm_lastcalculate int64
}

func (r *RoomSvrManager) Init() {
	r.agents = make(map[int]*RoomAgent)
}

func (r *RoomSvrManager) Num() int {
	return len(r.agents)
}

func (r *RoomSvrManager) Tick(now int64) {
	for _, v := range r.agents {
		v.Tick(now)
	}
}

func (r *RoomSvrManager) AddRoomAgent(agent *RoomAgent) {
	id := agent.Id()
	r.agents[id] = agent
}

func (r* RoomSvrManager) DelRoomAgent(id int) {
	delete(r.agents, id)
}

func (r* RoomSvrManager) FindRoomAgent(id int) *RoomAgent {
	agent, ok := r.agents[id]
	if ok == false {
		return nil
	}
	return agent
}

func (r *RoomSvrManager) IsRegisted(name string) bool {
	for _,v := range r.agents {
		if v.Name() == name {
			return true
		}
	}
	return false
}

// 获取一个低负荷Room
func (r *RoomSvrManager) FindLowLoadRoom() *RoomAgent {
	sortRooms := make(SliceRoom, 0)
	now := util.CURTIMEMS()
	for _, v := range r.agents {
		if now >= r.tm_lastcalculate + 1 {	// 间隔计算
			v.AsynCalcRoomAmount()       // 多Gate下，异步计数Gate在线人数效率提升明显
		}
		//v.DoCalcRoomSize(nil)
		sortRooms = append(sortRooms, v)
	}

	if len(sortRooms) == 0 {
		return nil
	}

	r.tm_lastcalculate = now
	sort.Sort(sortRooms)
	return sortRooms[0]
}

func (r *RoomSvrManager) BroadCast(msg pb.Message) {
	for _, v := range r.agents {
		v.SendMsg(msg)
	}
}

func (r *RoomSvrManager) OnClose(sid int) {
	agent := r.FindRoomAgent(sid)
	if agent == nil {return }
	r.DelRoomAgent(sid)
	log.Info("房间服离线 id=%d [%s] 当前总数:%d", sid, agent.Name(), r.Num())
}

func (r *RoomSvrManager) AddNewSession(session network.IBaseNetSession, name string) {
	agent := NewRoomAgent(session, name)
	agent.Init()
	r.AddRoomAgent(agent)
	log.Info("注册房间服 id=%d [%s][%s] 当前总数:%d", agent.Id(), agent.name, agent.Addr(), RoomSvrMgr().Num())

	//将已经连接的Gate通知这个Room
	GateSvrMgr().NewRoomOnline(agent)
}

func (r *RoomSvrManager) NewGateOnline(gate *GateAgent) {
	send := &msg.MS2RS_GateInfo{Gates:make([]*msg.GateSimpleInfo, 0)}
	gateinfo := &msg.GateSimpleInfo{Name:pb.String(gate.Name()), Host:&msg.IpHost{Ip:pb.String(gate.ip), Port:pb.Int(gate.port)}}
	send.Gates = append(send.Gates, gateinfo)
	r.BroadCast(send)
}

func (r *RoomSvrManager) CreateGameRoom(tmsg *msg.GW2MS_ReqCreateRoom, now int64, sid_gate int, userid int64) (string) {

	kind, tm1 := tmsg.GetGamekind(), util.CURTIMEUS()
	agent := r.FindLowLoadRoom()
	if agent == nil {
		return "找不到合适的房间服务器"
	}

	roomid, errcode := def.GenerateRoomId(Redis())
	if errcode != "" {
		return errcode
	}

	rmsg := &msg.MS2RS_CreateRoom { 
		Roomid : pb.Int64(roomid), 
		Gamekind: pb.Int32(kind), 
		Sidgate: pb.Int(sid_gate), 
		Userid: pb.Int64(userid),
		Texas: pb.Clone(tmsg.Texas).(*msg.TexasPersonalRoom),
	}
	agent.SendMsg(rmsg)
	tm2 := util.CURTIMEUS()
	log.Info("向RS请求创建房间[%d]，玩家[%d] 模式[%d] 创建耗时[%dus] ts[%d]", roomid, userid, kind, tm2-tm1, util.CURTIMEMS())
	return ""
}

