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

func (this *RoomManager) Init() bool {
	this.rooms = make(map[int64]IRoomBase)
	this.texasrooms = make(map[int32][]IRoomBase)
	this.ticker1s = util.NewGameTicker(time.Second, this.Handler1sTick)
	this.ticker1s.Start()

	this.CleanCache()
	this.InitPublicTexas()
	return true
}

// 初始德州公共房间
func (this *RoomManager) InitPublicTexas() bool {
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
	this.ticker1s.Run(now)
	for id, room := range this.rooms {
		if room.IsDestory(now) == true {
			room.OnDestory(now)
			this.Del(id)
			continue
		}
		room.Tick(now)
	}
}

func (this *RoomManager) Handler1sTick(now int64) {
	this.TexasRoomAmountCheck()
}

func (this *RoomManager) Cache(room IRoomBase) {
	pipe := Redis().Pipeline()
	key := fmt.Sprintf("roombrief_%d", room.Id())
	pipe.HSet(key, "uid", room.Id())
	pipe.HSet(key, "ownerid", room.OwnerId())
	pipe.HSet(key, "tid", room.Tid())
	pipe.HSet(key, "members", room.NumMembers())
	pipe.HSet(key, "passwd", room.Passwd())
	pipe.HSet(key, "agentname", RoomSvr().Name())
	pipe.SAdd("roomlist", room.Id())
	pipe.SAdd(fmt.Sprintf("roomlist_kind_%d_sub_%d", room.Kind(), room.SubKind()), room.Id())
	if _, err := pipe.Exec(); err != nil {
		log.Error("[房间] 缓存房间信息失败 %s", err)
	}
	pipe.Close()
}

func (this *RoomManager) DelCache(id int64) {
	key := fmt.Sprintf("roombrief_%d", id)
	Redis().Del(key)
}

func (this *RoomManager) CleanCache() {
	tkey := fmt.Sprintf("roomlist_kind_%d_sub_%d", int32(msg.RoomKind_TanTanLe), 0)
	Redis().Del(tkey)
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
		key := fmt.Sprintf("roombrief_%s", id)
		pipe.Del(key)
	}
	if _, err := pipe.Exec(); err != nil {
		log.Error("[房间] 删除roombrief失败 %s", err)
	}

	//
	Redis().Del("roomlist")
	log.Info("[房间] 清除所有缓存房间列表")
}

// 自动增加房间
func (this *RoomManager) TexasRoomAmountCheck() {
	for subtype, subrooms := range this.texasrooms {
		if IsTexasRoomBaseType(subtype) == false { continue }
		notfullamount := 0
		for _, r := range subrooms {
			if r.IsFull() == false { notfullamount += 1 }
		}
		if notfullamount <= 0 {
			this.AutoIncTexasRoomAmount(subtype)
		}
	}
}

func (this *RoomManager) AutoIncTexasRoomAmount(subtype int32) bool {
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
		this.Add(room)
		log.Info("[房间] 自动创建德州新房间[%d] 子类型[%d]", room.Id(), subtype)
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
	this.ticker1s.Stop()
	log.Info("[房间] 服务器准备关闭，即将销毁所有房间数量[%d]", this.Num())
	for _, room := range this.rooms {
		room.Destory(0)
	}
	//this.rooms = make(map[int64]IRoomBase)
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
	room.watchmembers = make(map[int64]*RoomUser)
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
	room.watchmembers = make(map[int64]*RoomUser)
	return room
}

