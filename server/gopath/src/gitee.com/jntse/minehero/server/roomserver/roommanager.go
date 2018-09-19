package main
import (
	//pb"github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/def"
)


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type RoomManager struct {
	rooms map[int64]IRoomBase
}

func (this *RoomManager) Init() bool {
	this.rooms = make(map[int64]IRoomBase)
	this.InitTexas()
	return true
}

func (this *RoomManager) InitTexas() bool {
	for _, tconf := range tbl.TexasRoomBase.TexasRoomById {
		roomid, errcode := def.GenerateRoomId(Redis())
		if errcode != "" {
			log.Error("初始化德州公共房间失败[%s]", errcode)
			return false
		}
		room := NewTexasRoom(roomid, 0, tconf.Id, 0, "")
		room.Init()
		this.Add(room)
	}
	return true
}

func (this *RoomManager) Num() int {
	return len(this.rooms)
}

func (this *RoomManager) Add(room IRoomBase) {
	id := room.Id()
	this.rooms[id] = room
	log.Info("添加房间[%d]--当前房间数[%d]", id, len(this.rooms))
}

func (this* RoomManager) Del(id int64) {
	delete(this.rooms, id)
	log.Info("删除房间[%d]--当前房间数[%d]", id, len(this.rooms))
}

func (this* RoomManager) Find(id int64) IRoomBase {
	room, ok := this.rooms[id]
	if ok == false {
		return nil
	}
	return room
}

func (this *RoomManager) Tick(now int64) {
	for id, room := range this.rooms {
		if room.IsEnd(now) == true {
			room.OnEnd(now)
			this.Del(id)
			continue
		}
		room.Tick(now)
	}
}

func (this *RoomManager) OnGateClose(sid int) {
	//for _, v := range this.rooms {
	//	if v.owner == nil { continue; }
	//	if v.owner.SidGate() == sid {
	//		v.GateLeave(sid)
	//	}
	//}
}

func (this *RoomManager) Shutdown() {
	//for id, room := range this.rooms {
	//	room.OnEnd(util.CURTIMEMS())
	//}
	//this.rooms = make(map[int64]*IRoomBase)
}

func NewTanTanLeRoom(ownerid, uid int64) *TanTanLe {
	room := &TanTanLe{}
	room.id = uid
	room.tm_create = util.CURTIME()
	room.tm_start = 0
	room.gamekind = int32(msg.RoomKind_TanTanLe)
	room.owner = nil
	room.ownerid = ownerid
	return room
}

func NewTexasRoom(ownerid, uid int64, tid int32, ante int32, pwd string) *TexasRoom {
	room := &TexasRoom{}
	room.id = uid
	room.tm_create = util.CURTIME()
	room.tm_start = 0
	room.gamekind = int32(msg.RoomKind_TexasPoker)
	room.owner = nil
	room.ownerid = ownerid
	room.tid = tid
	room.ante = ante
	room.passwd = pwd
	return room
}

