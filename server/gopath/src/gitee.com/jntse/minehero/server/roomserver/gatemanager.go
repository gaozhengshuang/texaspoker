package main
import (
	"fmt"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
	pb "github.com/gogo/protobuf/proto"
)

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type SliceGate []*GateAgent
func (s SliceGate) Len() int {
	return len(s)
}
func (s SliceGate) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}

// --------------------------------------------------------------------------
/// @brief GateServer
// --------------------------------------------------------------------------
type GateAgent struct {
	session	network.IBaseNetSession
	ip 		string
	port 	int
	host	string
	name	string
}

func NewGateAgent(s network.IBaseNetSession, name, ip string ,port int) *GateAgent {
	gate := &GateAgent{session:s, name:name, ip:ip, port:port}
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

func (g *GateAgent) SendMsg(msg pb.Message) bool {
	return g.session.SendCmd(msg)
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type GateManager struct {
	gates map[int]*GateAgent
	gatenames map[string]*GateAgent
}

func (g *GateManager) Init() {
	g.gates = make(map[int]*GateAgent)
	g.gatenames = make(map[string]*GateAgent)
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

func (g* GateManager) FindGateByName(n string) *GateAgent {
	agent, ok := g.gatenames[n]
	if ok == false {
		return nil
	}
	return agent
}


func (g *GateManager) IsRegisted(ip string, port int) bool {
	host := fmt.Sprintf("%s:%d", ip, port)
	for _,v := range g.gates {
		if v.Host() == host {
			return true
		}
	}
	return false
}

func (g *GateManager) OnClose(session network.IBaseNetSession) {
	//RoomSvr().Net().DelTcpConnector(session.Name())
	agent := g.FindGate(session.Id())
	if agent == nil { return }
	g.DelGate(session.Id())
	log.Info("网关离线 id=%d [%v] 当前总数:%d", session.Id(), agent.Host(), g.Num())
}

func (g *GateManager) AddNew(session network.IBaseNetSession, name, ip string ,port int) {
	agent := NewGateAgent(session, name, ip, port)
	g.AddGate(agent)
	log.Info("注册网关 id=%d [%s:%d] 当前总数:%d", agent.Id(), agent.ip, agent.port, g.Num())
}

