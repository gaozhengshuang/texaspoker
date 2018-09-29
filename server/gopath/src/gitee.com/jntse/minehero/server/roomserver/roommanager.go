package main
import (
	"fmt"
	"time"
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
	ticker1s *util.GameTicker
}

func (rm *RoomManager) Init() bool {
	rm.rooms = make(map[int64]IRoomBase)
	rm.texasrooms = make(map[int32][]IRoomBase)
	rm.ticker1s = util.NewGameTicker(time.Second, rm.Handler1sTick)
	rm.ticker1s.Start()

	rm.CleanCache()
	rm.InitPublicTexas()
	return true
}

// 初始德州公共房间
func (rm *RoomManager) InitPublicTexas() bool {
	for _, tconf := range tbl.TexasRoomBase.TexasRoomById {
		if IsTexasRoomBaseType(tconf.Type) == false {
			continue
		}
		roomid, errcode := def.GenerateRoomId(Redis())
		if errcode != "" {
			log.Error("初始化德州公共房间失败[%s]", errcode)
			return false
		}
		room := NewTexasRoom(0, roomid, tconf.Id, 0, "")
		room.Init()
		rm.Add(room)
	}
	return true
}

func (rm *RoomManager) Num() int {
	return len(rm.rooms)
}

func (rm *RoomManager) Add(room IRoomBase) {
	id := room.Id()
	rm.rooms[id] = room
	room.InitCache()
	if room.Kind() == int32(msg.RoomKind_TexasPoker) {
		subkind := room.SubKind()
		if rm.texasrooms[subkind] == nil { rm.texasrooms[subkind] = make([]IRoomBase, 0) }
		rm.texasrooms[subkind] = append(rm.texasrooms[subkind], room)
	}
	log.Info("[房间] 添加房间[%d]----------当前房间数[%d]", id, len(rm.rooms))
}

func (rm* RoomManager) Del(id int64) {
	delete(rm.rooms, id)
	log.Info("[房间] 删除房间[%d]----------当前房间数[%d]", id, len(rm.rooms))
}

func (rm* RoomManager) Find(id int64) IRoomBase {
	room, ok := rm.rooms[id]
	if ok == false {
		return nil
	}
	return room
}

func (rm* RoomManager) FindTexas(id int64) *TexasPokerRoom {
	room, ok := rm.rooms[id]
	if ok == false {
		return nil
	}
	ptr, ok := room.(*TexasPokerRoom)
	if ok == false {
		return nil
	}
	return ptr
}


func (rm *RoomManager) Tick(now int64) {
	rm.ticker1s.Run(now)
	for id, room := range rm.rooms {
		if room.IsDestory(now) == true {
			room.OnDestory(now)
			rm.Del(id)
			continue
		}
		room.Tick(now)
	}
}

func (rm *RoomManager) Handler1sTick(now int64) {
	rm.TexasRoomAmountCheck()
}

func (rm *RoomManager) CleanCache() {
	//
	pipe := Redis().Pipeline()
	tkey := fmt.Sprintf("roomlist_kind_%d_sub_%d", int32(msg.RoomKind_TanTanLe), 0)
	pipe.Del(tkey)
	for _, v := range msg.PlayingFieldType_value {
		pipe.Del(fmt.Sprintf("roomlist_kind_%d_sub_%d", int32(msg.RoomKind_TexasPoker), v))
	}
	if _, err := pipe.Exec(); err != nil {
		log.Error("[房间] 删除roomlist类型列表失败 %s", err)
	}
	pipe.Close()

	//
	list, err := Redis().SMembers("roomlist").Result()
	if err == redis.Nil {
		return
	}
	if err != nil {
		log.Error("[房间] 加载所有房间列表失败 %s", err)
		return
	}

	//
	pipe = Redis().Pipeline()
	for _, id := range list {
		key := fmt.Sprintf("roombrief_%s", id)
		pipe.Del(key)
	}
	if _, err := pipe.Exec(); err != nil {
		log.Error("[房间] 删除roombrief失败 %s", err)
	}
	pipe.Close()

	//
	Redis().Del("roomlist")
	log.Info("[房间] 清除所有缓存房间列表")
}

// 自动增加房间
func (rm *RoomManager) TexasRoomAmountCheck() {
	for subtype, subrooms := range rm.texasrooms {
		if IsTexasRoomBaseType(subtype) == false { continue }
		notfullamount := 0
		for _, r := range subrooms {
			if r.IsFull() == false { notfullamount += 1 }
		}
		if notfullamount <= 0 {
			rm.AutoIncTexasRoomAmount(subtype)
		}
	}
}

func (rm *RoomManager) AutoIncTexasRoomAmount(subtype int32) bool {
	for _, tconf := range tbl.TexasRoomBase.TexasRoomById {
		if IsTexasRoomBaseType(tconf.Type) == false {
			continue
		}
		roomid, errcode := def.GenerateRoomId(Redis())
		if errcode != "" {
			log.Error("初始化德州公共房间失败[%s]", errcode)
			return false
		}
		room := NewTexasRoom(0, roomid, tconf.Id, 0, "")
		room.Init()
		rm.Add(room)
		log.Info("[房间] 自动创建德州新房间[%d] 子类型[%d]", room.Id(), subtype)
	}
	return true
}

func (rm *RoomManager) OnGateClose(sid int) {
	//for _, v := range rm.rooms {
	//	if v.owner == nil { continue; }
	//	if v.owner.AgentId() == sid {
	//		v.GateLeave(sid)
	//	}
	//}
}

func (rm *RoomManager) Shutdown() {
	rm.ticker1s.Stop()
	log.Info("[房间] 服务器准备关闭，即将销毁所有房间数量[%d]", rm.Num())
	for _, room := range rm.rooms {
		room.Destory(0)
	}
	//rm.rooms = make(map[int64]IRoomBase)
}

func NewTanTanLeRoom(ownerid, uid int64) *TanTanLe {
	room := &TanTanLe{}
	room.id = uid
	room.tm_create = util.CURTIME()
	room.tm_start = 0
	room.gamekind = int32(msg.RoomKind_TanTanLe)
	room.owner = nil
	room.ownerid = ownerid
	room.members = make(map[int64]*RoomUser)
	//room.watchmembers = make(map[int64]*RoomUser)
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
	room.members = make(map[int64]*RoomUser)
	//room.watchmembers = make(map[int64]*RoomUser)
	return room
}

