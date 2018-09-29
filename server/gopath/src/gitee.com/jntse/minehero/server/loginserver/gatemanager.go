package main
import (
	"sort"
	"fmt"
	"math"
	"time"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/eventqueue"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/server/def"
)

// --------------------------------------------------------------------------
/// @brief 按人数排序GateAgent
// --------------------------------------------------------------------------
type SliceGate []*GateAgent
func (s SliceGate) Len() int {
	return len(s)
}
func (s SliceGate) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}
func (s SliceGate) Less(i, j int) bool {
	return s[i].usernum < s[j].usernum
}

// --------------------------------------------------------------------------
/// @brief GateServer
// --------------------------------------------------------------------------
type GateAgent struct {
	//sid	int
	session	network.IBaseNetSession
	ip 		string
	port 	int
	usernum	int64
	host	string
	name 	string
	asynev  eventque.AsynEventQueue
	ticker10ms  *util.GameTicker
}

func NewGateAgent(s network.IBaseNetSession, name, ip string ,port int) *GateAgent {
	gate := &GateAgent{session:s, ip:ip, port:port, name:name, usernum:0}
	gate.host = fmt.Sprintf("%s:%d", ip, port)
	return gate
}

func (g *GateAgent) Init() {
	g.ticker10ms = util.NewGameTicker(10 * time.Millisecond, g.Handler10msTick)
	g.ticker10ms.Start()
	g.asynev.Start(int64(g.Id()), 1000)
}

func (g *GateAgent) Id() int {
	return g.session.Id()
}

func (g *GateAgent) Name() string {
	//return g.session.Name()
	return g.name
}

//func (g *GateAgent) AddUserNum(n int) {
//	g.usernum += n
//	if g.usernum <= 0 { g.usernum = 0 }
//}

func (g *GateAgent) SendMsg(msg pb.Message) bool {
	return g.session.SendCmd(msg)
}

func (g *GateAgent) Host() string {
	return g.host
}

func (g *GateAgent) Ip() string {
	return g.ip
}

func (g *GateAgent) Port() int {
	return g.port
}

func (g *GateAgent) OnEnd() {
	g.asynev.Shutdown()
}

func (g *GateAgent) Tick(now int64) {
	g.ticker10ms.Run(now)
}

func (g *GateAgent) Handler10msTick(now int64) {
	g.asynev.Dispatch()
}

func (g *GateAgent) DoCalcAccountAmount(argu []interface{}) []interface{} {
	key := fmt.Sprintf("%s_%s:%d", def.RedisKeyGateAccounts, g.ip, g.port)
	size, err := Redis().SCard(key).Result()
	if err != nil {
		log.Error("SCard[%s] 获取Gate账户失败 err: %s", key, err)
		g.usernum = math.MaxInt32
	}
	g.usernum = size
	return nil
}

func (g *GateAgent) AsynEventInsert(event eventque.IEvent) {
	g.asynev.Push(event)
}

func (g *GateAgent) AsynCalcAccountAmount() {
	if g.asynev.IsFull() { return }
	arglist := []interface{}{}
	event := eventque.NewCommonEvent(arglist, g.DoCalcAccountAmount, nil)
	g.AsynEventInsert(event)
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type GateManager struct {
	gates map[int]*GateAgent
	tm_lastcalculate int64
}

func (g *GateManager) Init() {
	g.gates = make(map[int]*GateAgent)
}

func (g *GateManager) Tick(now int64) {
	for _ ,v := range g.gates {
		v.Tick(now)
	}
}

func (g *GateManager) Num() int {
	return len(g.gates)
}

func (g *GateManager) AddGate(agent *GateAgent) {
	id := agent.Id()
	g.gates[id] = agent
}

func (g* GateManager) DelGate(id int) {
	//log.Info("反注册网关 gate=%v", agent)
	delete(g.gates, id)
}

func (g* GateManager) FindGate(id int) *GateAgent {
	agent, ok := g.gates[id]
	if ok == false {
		return nil
	}
	return agent
}

// TODO: 获取一个低负荷Gate
func (g *GateManager) FindLowLoadGate() *GateAgent {
	if len(g.gates) == 0 {
		return nil
	}

	now := util.CURTIMEMS()
	sortGates := make(SliceGate, 0)
	for _, v := range g.gates {
		if now >= g.tm_lastcalculate + 10 {	// 间隔计算
			v.AsynCalcAccountAmount()		// 多Gate下，异步计数Gate在线人数效率提升明显
		}
		sortGates = append(sortGates, v)
	}

	if len(sortGates) == 0 {
		return nil
	}

	g.tm_lastcalculate = now
	sort.Sort(sortGates)
	return sortGates[0]
}

func (g *GateManager) FindGateByHost(host string) *GateAgent {
	for _ ,v := range g.gates {
		if v.Host() == host {
			return v
		}
	}
	return nil
}

func (g *GateManager) IsRegisted(ip string, port int) bool {
	host := fmt.Sprintf("%s:%d", ip, port)
	for _, v := range g.gates {
		if v.Host() == host {
			return true
		}
	}
	return false
}

func (g *GateManager) IsRegistedByName(name string) bool {
	for _, v := range g.gates {
		if v.Name() == name { 
			return true 
		}
	}
	return false
}

func (g *GateManager) OnClose(sid int) {
	agent := g.FindGate(sid)
	if agent == nil { return }
	agent.OnEnd()
	g.DelGate(sid)
	log.Info("网关离线 id=%d [%v] 当前总数:%d", sid, agent.Host(), g.Num())
}

func (g *GateManager) AddNew(session network.IBaseNetSession, name, ip string ,port int) {
	agent := NewGateAgent(session, name, ip, port)
	agent.Init()
	g.AddGate(agent)
	log.Info("注册网关 id=%d [%s][%s:%d] 当前总数:%d", agent.Id(), agent.Name(), agent.ip, agent.port, g.Num())
}


