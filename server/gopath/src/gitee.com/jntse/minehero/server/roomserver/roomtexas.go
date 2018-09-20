package main
import (
	"fmt"
	//_"time"
	//_"strings"
	//_"strconv"
	"gitee.com/jntse/gotoolkit/log"
	//_"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	////pb"github.com/gogo/protobuf/proto"
	//"gitee.com/jntse/minehero/server/tbl"
	//"gitee.com/jntse/minehero/server/tbl/excel"
	//_"gitee.com/jntse/minehero/server/def"
)

// 房间销毁
func (this *TexasPokerRoom) OnDestory(now int64) {
}

// 单局游戏开始
func (this *TexasPokerRoom) OnGameStart() {
}

// 单局游戏结束
func (this *TexasPokerRoom) OnGameOver() {
}


func (this *TexasPokerRoom) UserEnter(u *RoomUser) {
	log.Info("[房间] 玩家[%s %d] 进入房间[%d]", u.Name(), u.Id(), this.Id())

	// 检查之前是坐下还是站起的
}

// 玩家离开房间
func (this *TexasPokerRoom) UserLeave(u *RoomUser) {
	delete(this.members, u.Id())
	delete(this.watchers, u.Id())
	log.Info("[房间] 玩家[%s %d] 离开房间[%d]", u.Name(), u.Id(), this.Id())
}

// 棋牌类站起
func (this *TexasPokerRoom) UserStandUp(u *RoomUser) {
	delete(this.members, u.Id())
	this.watchers[u.Id()] = u
	Redis().HSet(fmt.Sprintf("roombrief_%d", this.Id()), "members", this.NumMembers())
	log.Info("[房间] 玩家[%s %d] 站起观战[%d]", u.Name(), u.Id(), this.Id())
}

// 棋牌类坐下
func (this *TexasPokerRoom) UserSitDown(u *RoomUser, pos int32) {
	delete(this.watchers, u.Id())
	this.members[u.Id()] = u

	// 更新房间人数
	Redis().HSet(fmt.Sprintf("roombrief_%d", this.Id()), "members", this.NumMembers())
	log.Info("[房间] 玩家[%s %d] 坐下位置[%d] 等待下一局[%d]", u.Name(), u.Id(), pos, this.Id())
}


// 加载玩家
func (this *TexasPokerRoom) UserLoad(tmsg *msg.GW2RS_UploadUserBin, gate network.IBaseNetSession) {
	user := UserMgr().FindUser(tmsg.GetUserid())
	if user != nil {
		log.Error("[房间] 玩家[%s %d] 个人信息已经存在了", user.Name(), user.Id())
		return
	}

	user = UserMgr().CreateRoomUser(this.Id(), tmsg.Bin, gate, this.Kind())
	this.watchers[user.Id()]= user
	log.Info("[房间] 玩家[%s %d] 上传个人数据到房间[%d]", user.Name(), user.Id(), this.Id())
}

func (this *TexasPokerRoom) Tick(now int64) {
}

// 玩家断开连接
func (this *TexasPokerRoom) UserDisconnect(userid int64) {
	log.Info("[房间] 玩家[%d] 网络断开 房间[%d]", userid, this.Id())
}

// 网关断开
func (this *TexasPokerRoom) GateLeave(sid int) {
}



