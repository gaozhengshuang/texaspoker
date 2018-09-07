package main
import (
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/util"
)

const (
	kQuotaNil = iota		// 没有配额
	kQuotaUnused			// 配额未使用
	kQuotaUsed				// 配额已使用
)

// GirdItem类型
const (
	kGridTypeDefault = 0		// 默认道具
	kGridTypeBigReward = 1		// 大奖
	kGridTypeMiddleYuanbao = 2	// 高级元宝1
	kGridTypeBigYuanbao = 3		// 高级元宝2
	kGridTypeDiamondParts = 4	// 钻石碎片
	kGridTypeDiamondL1 = 5		// 钻石1
	kGridTypeDiamondL2 = 6		// 钻石2
	kGridTypeDiamondL3 = 7		// 钻石3
)

// 钻石等级
const (
	kDiamondGrade1 = 1
	kDiamondGrade2 = 2
	kDiamondGrade3 = 3
)

// --------------------------------------------------------------------------
/// @brief room接口，各种room从这里派生
// --------------------------------------------------------------------------
type IRoomBase interface {
	Id() int64
	Init() string
	Kind() int32
	Tick(now int64)
	SendMsg(msg pb.Message)
	IsStart() bool
	IsEnd(now int64) bool
	OnEnd(now int64)
	UserLoad(user *GateUser)
	UserEnter(userid uint64, token string)
	UserLeave(userid uint64, money uint32)
	UserDisconnect(userid uint64)
}


// --------------------------------------------------------------------------
/// @brief 房间基础数据
// --------------------------------------------------------------------------
type RoomBase struct {
	id				int64
	tm_create		int64
	tm_start		int64
	tm_end			int64
	roomkind		int32
	owner			*GateUser
	ownerid			uint64
	close_reason	string	// 正常关闭房间的原因
	eventuid 		uint64	// 事件uid
}

func NewGameRoom(ownerid uint64, id int64, roomkind int32, eventuid uint64) IRoomBase {
	switch roomkind {
	case 0:		// 弹弹乐
		room := &TanTanLe{}
		room.id = id
		room.tm_create = util.CURTIME()
		room.tm_start = 0
		room.roomkind = roomkind
		room.owner = nil
		room.ownerid = ownerid
		room.eventuid = eventuid
		return room
	default:
		return nil
	}
}

