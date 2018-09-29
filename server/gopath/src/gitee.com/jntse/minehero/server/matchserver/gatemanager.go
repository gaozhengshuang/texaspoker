package main
import "fmt"
import _"sort"
import "gitee.com/jntse/gotoolkit/net"
import "gitee.com/jntse/gotoolkit/log"
import "gitee.com/jntse/minehero/pbmsg"
import pb "github.com/gogo/protobuf/proto"

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
	session network.IBaseNetSession
	ip 		string
	port 	int
	usernum	int
	host	string
	name	string
}

func NewGateAgent(s network.IBaseNetSession, name, ip string ,port int) *GateAgent {
	gate := &GateAgent{session:s, name:name, ip:ip, port:port, usernum:0}
	gate.host = fmt.Sprintf("%s:%d", ip, port)
	return gate
}

func (g *GateAgent) Id() int {
	return g.session.Id()
}

func (g *GateAgent) Host() string {
	return g.host
}

func (g *GateAgent) Name() string {
	return g.name
}

func (g *GateAgent) HostKey() string {
	return g.Host()
}

func (g *GateAgent) TickNum(n int) {
	g.usernum += n
	if g.usernum <= 0 { g.usernum = 0 }
}

func (g *GateAgent) SendMsg(msg pb.Message) bool {
	return g.session.SendCmd(msg)
}

func (g *GateAgent) OnClose() {
	//UserMgr().GateClose(g.Id())
	GateSvrMgr().DelGate(g.Id())
	log.Info("网关离线 id=%d [%v] 当前总数:%d", g.Id(), g.Host(), GateSvrMgr().Num())
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type GateManager struct {
	gates map[int]*GateAgent
}

func (g *GateManager) Init() {
	g.gates = make(map[int]*GateAgent)
}

func (g *GateManager) Num() int {
	return len(g.gates)
}

func (g *GateManager) AddGate(agent *GateAgent) {
	id := agent.Id()
	g.gates[id] = agent
}

func (g* GateManager) DelGate(id int) {
	delete(g.gates, id)
}

func (g* GateManager) FindGate(id int) *GateAgent {
	agent, ok := g.gates[id]
	if ok == false {
		return nil
	}
	return agent
}

func (g *GateManager) IsRegisted(name, ip string, port int) bool {
	host := fmt.Sprintf("%s:%d", ip, port)
	for _,v := range g.gates {
		if v.Host() == host || v.Name() == name {
			return true
		}
	}
	return false
}

func (g *GateManager) OnClose(sid int) {
	agent := g.FindGate(sid)
	if agent == nil { return }
	agent.OnClose()
}

func (g *GateManager) AddNewSession(session network.IBaseNetSession, name, ip string ,port int) {
	agent := NewGateAgent(session, name, ip, port)
	g.AddGate(agent)
	log.Info("注册网关服 id=%d [%s][%s:%d] 当前总数:%d", agent.Id(), agent.Name(), agent.ip, agent.port, g.Num())

	// 将Gate信息通知所有Room
	RoomSvrMgr().NewGateOnline(agent)
}

func (g *GateManager) NewRoomOnline(room *RoomAgent) {
	send := &msg.MS2RS_GateInfo{Gates:make([]*msg.GateSimpleInfo, 0)}
	for _, gate := range g.gates {
		gateinfo := &msg.GateSimpleInfo{Name:pb.String(gate.Name()), Host:&msg.IpHost{Ip:pb.String(gate.ip), Port:pb.Int(gate.port)}}
		send.Gates = append(send.Gates, gateinfo)
	}
	room.SendMsg(send)
}

func (g *GateManager) Broadcast(msg pb.Message) {
	for _, gate := range g.gates {
		gate.SendMsg(msg)
	}
}

