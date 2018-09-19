package main
import (
	//_"fmt"
	//_"time"
	//_"strings"
	//_"strconv"
	//"gitee.com/jntse/gotoolkit/log"
	//_"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	////pb"github.com/gogo/protobuf/proto"
	//"gitee.com/jntse/minehero/server/tbl"
	//"gitee.com/jntse/minehero/server/tbl/excel"
	//_"gitee.com/jntse/minehero/server/def"
)

func (this *TexasPokerRoom) UserEnter(userid int64) {
}

// 玩家离开房间
func (this *TexasPokerRoom) UserLeave(userid int64) {
	delete(this.members, userid)
}

// 棋牌类站起
func (this *TexasPokerRoom) UserStandUp(u *RoomUser) {
}

// 棋牌类坐下
func (this *TexasPokerRoom) UserSitDown(u *RoomUser, pos int32) {
}

// 游戏结束
func (this *TexasPokerRoom) OnEnd(now int64) {
}

// 玩家进游戏，游戏开始
func (this *TexasPokerRoom) OnStart() {
}

// 加载玩家
func (this *TexasPokerRoom) UserLoad(bin *msg.Serialize, gate network.IBaseNetSession) {
}

func (this *TexasPokerRoom) Tick(now int64) {
}

// 玩家断开连接
func (this *TexasPokerRoom) UserDisconnect(userid int64) {
}

// 网关断开
func (this *TexasPokerRoom) GateLeave(sid int) {
}



