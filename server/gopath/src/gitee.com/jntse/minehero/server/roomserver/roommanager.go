package main
import (
	"fmt"
	"github.com/go-redis/redis"
	//pb"github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"

	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/def"
)


// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
type RoomManager struct {
	rooms map[int64]IRoomBase			// 所有房间
	texasrooms map[int32][]IRoomBase	// 德州房间
}

func (this *RoomManager) Init() bool {
	this.rooms = make(map[int64]IRoomBase)
	this.texasrooms = make(map[int32][]IRoomBase)
	this.CleanCache()
	this.InitPublicTexas()
	return true
}

func (this *RoomManager) InitPublicTexas() bool {
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
	this.Cache(room)
	if room.Kind() == int32(msg.RoomKind_TexasPoker) {
		subkind := room.SubKind()
		if this.texasrooms[subkind] == nil { this.texasrooms[subkind] = make([]IRoomBase, 0) }
		this.texasrooms[subkind] = append(this.texasrooms[subkind], room)
	}
	log.Info("添加房间[%d]--当前房间数[%d]", id, len(this.rooms))
}

func (this* RoomManager) Del(id int64) {
	delete(this.rooms, id)
	this.DelCache(id)
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

func (this *RoomManager) Cache(room IRoomBase) {
	pipe := Redis().Pipeline()
	key := fmt.Sprintf("roomcache_%d", room.Id())
	pipe.HSet(key, "uid", room.Id())
	pipe.HSet(key, "ownerid", room.OwnerId())
	pipe.HSet(key, "tid", room.Tid())
	pipe.HSet(key, "members", room.NumMembers())
	pipe.HSet(key, "passwd", room.Passwd())
	pipe.SAdd("roomlist", room.Id())
	pipe.SAdd(fmt.Sprintf("roomlist_kind_%d_sub_%d", room.Kind(), room.SubKind()), room.Id())
	if _, err := pipe.Exec(); err != nil {
		log.Error("[房间] 缓存房间信息失败 %s", err)
	}
	pipe.Close()
}

func (this *RoomManager) DelCache(id int64) {
	key := fmt.Sprintf("roomcache_%d", id)
	Redis().Del(key)
}

func (this *RoomManager) CleanCache() {
	Redis().Del(fmt.Sprintf("roomlist_kind_%d_sub_%d", int32(msg.RoomKind_TanTanLe), 0))
	for _, v := range msg.PlayingFieldType_value {
		Redis().Del(fmt.Sprintf("roomlist_kind_%d_sub_%d", int32(msg.RoomKind_TexasPoker), v))
	}

	list, err := Redis().SMembers("roomlist").Result()
	if err == redis.Nil {
		return
	}
	if err != nil {
		log.Error("[房间] 加载所有房间列表失败 %s", err)
	}

	pipe := Redis().Pipeline()
	for _, id := range list {
		key := fmt.Sprintf("roomcache_%s", id)
		pipe.Del(key)
	}
	pipe.Exec()
}

// 自动增加房间
func (this *RoomManager) RoomAmountCheck() {
	for subtype, subrooms := range this.texasrooms {
		if subtype == int32(msg.PlayingFieldType_PlayFieldPersonal) { continue }
		notfullamount := 0
		for _, r := range subrooms {
			if r.IsFull() == false { notfullamount += 1 }
		}
		if notfullamount <= 1 {
			this.AutoIncRoomAmount(subtype)
		}
	}
}

func (this *RoomManager) AutoIncRoomAmount(subtype int32) bool {
	for _, tconf := range tbl.TexasRoomBase.TexasRoomById {
		if tconf.Type != subtype { continue }
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

func NewTexasRoom(ownerid, uid int64, tid int32, ante int32, pwd string) *TexasPokerRoom {
	room := &TexasPokerRoom{}
	room.id = uid
	room.tm_create = util.CURTIME()
	room.tm_start = 0
	room.gamekind = int32(msg.RoomKind_TexasPoker)
	room.owner = nil
	room.ownerid = ownerid
	room.tid = tid
	room.passwd = pwd
	return room
}

