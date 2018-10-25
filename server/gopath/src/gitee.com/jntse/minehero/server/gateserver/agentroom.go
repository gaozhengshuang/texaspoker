package main

import (
	_"fmt"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
	_"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/server/tbl"
)

// --------------------------------------------------------------------------
/// @brief RoomServer
// --------------------------------------------------------------------------
type RoomAgent struct {
	session network.IBaseNetSession
	name	string
}

func NewRoomAgent(session network.IBaseNetSession, name string) *RoomAgent {
	gate := &RoomAgent{session, name}
	return gate
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

func (r *RoomAgent) Tick(now int64) {
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type RoomSvrManager struct {
	rooms map[int]*RoomAgent		// 房间服务器
}

func (r *RoomSvrManager) Init() {
	r.rooms = make(map[int]*RoomAgent)
}

func (r *RoomSvrManager) Num() int {
	return len(r.rooms)
}

func (r *RoomSvrManager) AddRoom(agent *RoomAgent) {
	id := agent.Id()
	r.rooms[id] = agent
}

func (r* RoomSvrManager) DelRoom(id int) {
	delete(r.rooms, id)
}

func (r* RoomSvrManager) FindRoom(id int) *RoomAgent {
	agent, _ := r.rooms[id]
	return agent
}

func (r *RoomSvrManager) FindByName(name string) *RoomAgent {
	for _,v := range r.rooms {
		if v.Name() == name {
			return v
		}
	}
	return nil
}

func (r *RoomSvrManager) IsRegisted(name string) bool {
	for _,v := range r.rooms {
		if v.Name() == name {
			return true
		}
	}
	return false
}

func (r *RoomSvrManager) Tick(now int64) {
	for _, v := range r.rooms {
		v.Tick(now)
	}
}

func (r *RoomSvrManager) BroadCast(msg pb.Message) {
	for _, v := range r.rooms {
		v.SendMsg(msg)
	}
}

func (r *RoomSvrManager) SendMTTMsg(msg pb.Message) {
	agent := RoomSvrMgr().FindByName(tbl.Room.MTTRoomServer)
	if agent == nil {
		log.Error("[竞标赛] 获取竞标赛RoomServer失败")
		return
	}
	agent.SendMsg(msg)
}

func (r *RoomSvrManager) SendMsg(sid int, msg pb.Message) {
	if agent := r.FindRoom(sid); agent != nil {
		agent.SendMsg(msg)
	}
}

func (r *RoomSvrManager) OnClose(sid int) {
	agent := r.FindRoom(sid)
	if agent == nil {return }
	r.DelRoom(sid)
	UserMgr().OnRoomServerClose(sid)
	log.Info("房间服离线 id=%d [%s] 当前总数:%d", sid, agent.Name(), r.Num())
}

func (r *RoomSvrManager) AddNew(session network.IBaseNetSession, name string) {
	agent := NewRoomAgent(session, name)
	r.AddRoom(agent)
	log.Info("注册房间服 id=%d [%s] 当前总数:%d", agent.Id(), agent.Name(), RoomSvrMgr().Num())
}

