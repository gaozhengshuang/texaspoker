package main
import (
	_"fmt"
	_"time"
	_"strings"
	_"strconv"
	"gitee.com/jntse/gotoolkit/log"
	_"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	//pb"github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	_"gitee.com/jntse/minehero/server/def"
)


// --------------------------------------------------------------------------
/// @brief TODO: 一个房间可以对应一个单独的协程
// --------------------------------------------------------------------------

type TexasRoom struct {
	RoomBase
	tconf *table.TexasRoomDefine
	ante int32
	passwd string
}

func (this *TexasRoom) Tick(now int64) { if this.owner != nil { this.owner.Tick(now) } }
func (this *TexasRoom) Init() string {
	tconf, ok := tbl.TexasRoomBase.TexasRoomById[this.tid]
	if ok == false {
		log.Error("[房间] not found room tconf[%d]", this.tid)
		return "找不到房间配置"
	}
	this.tconf = tconf
	return ""
}


// 游戏结束
func (this *TexasRoom) OnEnd(now int64) {
}

// 玩家进游戏，游戏开始
func (this *TexasRoom) OnStart() {
}

// 加载玩家
func (this *TexasRoom) UserLoad(bin *msg.Serialize, gate network.IBaseNetSession) {
}

// 玩家进房间，开始游戏
func (this *TexasRoom) UserEnter(userid int64) {
}

// 玩家正常离开
func (this *TexasRoom) UserLeave(userid int64) {
}

// 玩家断开连接
func (this *TexasRoom) UserDisconnect(userid int64) {
}

// 网关断开
func (this *TexasRoom) GateLeave(sid int) {
}

// 棋牌类站起
func (this *TexasRoom) UserStandUp(u *RoomUser) {
}

// 棋牌类坐下
func (this *TexasRoom) UserSitDown(u *RoomUser, userid int64) {
}

