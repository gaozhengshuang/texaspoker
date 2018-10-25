package main

import (
	"fmt"
	//"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	//"gitee.com/jntse/minehero/server/def"
	//"gitee.com/jntse/minehero/server/tbl"
	//"gitee.com/jntse/minehero/server/tbl/excel"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	//"strconv"
	//"strings"
	"time"
)

func NewSimpleUser(uid int64) *RoomUser {
	user := &RoomUser{aiflag:false, entity:&UserEntity{roleid:uid}, bag:&UserBag{}}
	return user
}

func NewRoomUserAI(id int64, name string, sex int32) *RoomUser {
	user := &RoomUser{aiflag:true, entity:&UserEntity{roleid:id, name:name, sex:sex}, bag:&UserBag{}}
	return user
}

type RoomUser struct {
	entity		*UserEntity
	bag			*UserBag
	agentid		int
	agentname	string
	ticker1s    *util.GameTicker
	ticker10ms  *util.GameTicker

	roomid		int64
	roomlist 	map[int64]int64
	aiflag    	bool
}

func (u *RoomUser) EntityBase() *UserEntity { return u.entity }
func (u *RoomUser) RoomId() int64 { return u.roomid }
func (u *RoomUser) SetRoomId(uid int64) { u.roomid = uid; u.roomlist[uid] = uid }
func (u *RoomUser) DelRoomId(uid int64) {	 delete(u.roomlist, uid) }
func (u *RoomUser) RoomList() map[int64]int64 { return u.roomlist }
func (u *RoomUser) RoomNum() int32 { return int32(len(u.roomlist)) }
func (u *RoomUser) Id() int64 { return u.entity.Id() }
func (u *RoomUser) Name() string { return u.entity.Name() }
func (u *RoomUser) Face() string { return u.entity.Head() }
func (u *RoomUser) Head() string { return u.entity.Head() }
func (u *RoomUser) Sex() int32 { return u.entity.Sex() }
func (u *RoomUser) Age() int32 { return u.entity.Age() }
func (u *RoomUser) Level() int32 { return u.entity.Level() }
func (u *RoomUser) Exp() int32 { return u.entity.Exp() }
func (u *RoomUser) MaxEnergy() int64 { return 0 }
func (u *RoomUser) AgentId() int { return u.agentid }
func (u *RoomUser) AgentName() string { return u.agentname }

func (u *RoomUser) Init() {
	u.ticker1s = util.NewGameTicker(1*time.Second, u.Handler1sTick)
	u.ticker10ms = util.NewGameTicker(10*time.Millisecond, u.Handler10msTick)
	u.ticker1s.Start()
	u.ticker10ms.Start()
	u.roomlist = make(map[int64]int64)

	if u.aiflag == false {
		//u.bag.Init(u)
	}
}

func (u *RoomUser) DBLoad() {
	//u.bag.DBLoad()
	u.entity.DBLoad()
}

func (u *RoomUser) DBSave() {
	//u.bag.DBSave()
	//u.entity.DBSave()
	log.Info("玩家[%s %d] 存盘完毕", u.Name(), u.Id())
}

func (u *RoomUser) Logout() {
	u.DBSave()
	u.ticker1s.Stop()
	u.ticker10ms.Stop()
	UserMgr().DelUser(u)
	log.Info("玩家[%s %d] 完全退出RoomServer", u.Name(), u.Id())
}

//func (u *RoomUser) KickOut() {
//	u.DBSave()
//	u.ticker1s.Stop()
//	u.ticker10ms.Stop()
//	UserMgr().DelUser(u)
//}

func (u *RoomUser) SendNotify(text string) {
	send := &msg.GW2C_PushMsgNotify{Userid: pb.Int64(u.Id()), Text: pb.String(text)}
	u.SendMsg(send)
}

func (u *RoomUser) SendMsg(m pb.Message) bool {
	if u.aiflag == true {
		return false
	}
	if u.agentid == 0 {
		log.Fatal("玩家[%s %d] 没有网关agentid，不能发送消息", u.Name(), u.Id())
		return false
	}
	return RoomSvr().SendMsg(u.agentid, m)
}

// 转发消息到gate
func (u *RoomUser) SendClientMsg(m pb.Message) bool {
	if u.aiflag == true {
		return false
	}
	name := pb.MessageName(m)
	if name == "" {
		log.Fatal("SendClientMsg 获取proto名字失败[%s]", m)
		return false
	}
	msgbuf, err := pb.Marshal(m)
	if err != nil {
		log.Fatal("SendClientMsg 序列化proto失败[%s][%s]", name, err)
		return false
	}

	send := &msg.RS2GW_MsgTransfer{Uid: pb.Int64(u.Id()), Name: pb.String(name), Buf: msgbuf}
	return u.SendMsg(send)
}


func (u *RoomUser) CheckUpdateGateAgent(agent network.IBaseNetSession) {
	if agent.Id() == u.AgentId() {
		return
	}
	u.agentid = agent.Id()
	u.agentname = agent.Name()
	log.Info("玩家[%s %d] 更新GateAgent信息[%s %d]", u.Name(), u.Id(), agent.Name(), agent.Id())
}


func (u *RoomUser) ToRoleInfo() *msg.RS2C_RetFriendGetRoleInfo {
	return &msg.RS2C_RetFriendGetRoleInfo{
		Diamond: pb.Int32(0),
		Gold:    pb.Int32(0),
		Roleid:  pb.Int64(u.Id()),
		Name:    pb.String(u.Name()),
		Head:    pb.String(""),
		Sex:     pb.Int32(u.Sex()),
	}
}

//同步玩家金币到redis排行榜
func (u *RoomUser) SyncGoldRankRedis() {
	//机器人不参与排行榜
	if u.aiflag == true {
		return
	}
	zMem := redis.Z{Score: float64(u.GetGold()), Member: u.Id()}
	Redis().ZAdd("zGoldRank", zMem)
}

//同步玩家等级到redis排行榜
func (u *RoomUser) SyncLevelRankRedis() {
	if u.aiflag == true {
		return
	}
	score := u.Level() * 1000000 + u.Exp()
	zMem := redis.Z{Score: float64(score), Member: u.Id()}
	Redis().ZAdd("zLevelRank", zMem)
}

func (u *RoomUser) Tick(now int64) {
	if u.ticker10ms.Run(now) {
		u.ticker1s.Run(now)
	}
}

func (u *RoomUser) Handler10msTick(now int64) {
}

func (u *RoomUser) Handler1sTick(now int64) {
}

func RemoveUserGold(gid int, uid int64, gold int32, reason string) bool {
	goldsrc := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", uid), "gold").Val())
	if goldsrc >= gold {
		newgold := goldsrc - gold
		Redis().HSet(fmt.Sprintf("charbase_%d", uid), "gold", newgold)
		send := &msg.RS2C_RolePushPropertyChange{}
		send.Gold = pb.Int32(newgold)
		RoomSvr().SendClientMsg(gid, uid, send)
		log.Info("玩家[%d] 扣除金币[%d] 库存[%d] 原因[%s]", uid, gold, newgold, reason)
		return true
	}
	log.Info("玩家[%d] 扣除金币失败[%d] 原因[%s]", uid, gold, reason)
	return false
}

func AddUserGold(gid int, uid int64, gold int32, reason string) bool {
	goldsrc := util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", uid), "gold").Val())
	newgold := goldsrc + gold
	Redis().HSet(fmt.Sprintf("charbase_%d", uid), "gold", newgold)
	send := &msg.RS2C_RolePushPropertyChange{}
	send.Gold = pb.Int32(newgold)
	RoomSvr().SendClientMsg(gid, uid, send)
	log.Info("玩家[%d] 添加金币[%d] 原因[%s]", uid, gold, reason)
	return false
}

