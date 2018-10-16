package main
import (
	//"fmt"
	"time"
	//_"strings"
	//_"strconv"
	"gitee.com/jntse/gotoolkit/log"
	//_"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	//pb"github.com/gogo/protobuf/proto"
	//"gitee.com/jntse/minehero/server/tbl"
	//"gitee.com/jntse/minehero/server/tbl/excel"
	"gitee.com/jntse/minehero/server/def"
)

// 房间销毁
func (this *TexasPokerRoom) OnDestory(now int64) {
	this.ticker1s.Stop()

	// 更新房间数量
	loadkey := def.RoomAgentLoadRedisKey(RoomSvr().Name())
	Redis().SRem(loadkey, this.Id())

	// 回传玩家信息，通知网关房间销毁
	for _, u := range this.members {
		u.OnDestoryRoom()
	}

	// 删除缓存
	this.RmCache()

	// 等待房间信息回传网关
	time.Sleep(time.Millisecond*10)
	log.Info("[房间] 销毁房间[%d]", this.Id())
}

// 单局游戏开始
func (this *TexasPokerRoom) OnGameStart() {
}

// 单局游戏结束
func (this *TexasPokerRoom) OnGameOver() {
}

// 玩家进入房间，首次/断线重进
func (this *TexasPokerRoom) UserEnter(u *RoomUser) {
	log.Info("[房间] 玩家[%s %d] 进入房间[%d]", u.Name(), u.Id(), this.Id())
	u.OnEnterRoom(this)
	player := this.FindAllByID(u.Id())
	if player != nil {
		this.SendRoomInfo(player)
		return
	}
	this.members[u.Id()] = u
	player = NewTexasPlayer(u, this, false)
	player.Init()
	if this.IsChampionShip() {
		player.SitDown(this.GetEmptySeat())
	}else{
		this.AddWatcher(player)
	}
	this.SendRoomInfo(player)
	u.SendPropertyChange()
}

// 玩家离开房间
func (this *TexasPokerRoom) UserLeave(u *RoomUser) {
	log.Info("[房间]离开")
	player := this.FindAllByID(u.Id())
	if player == nil {
		return
	}
	if this.InGame(player) {
		player.StandUp()
	}
	this.DelWatcher(player)

	delete(this.members, u.Id())
	//delete(this.watchmembers, u.Id())
	//Redis().HSet(fmt.Sprintf("roombrief_%d", this.Id()), "members", this.PlayersNum())
	u.OnLeaveRoom()
	//log.Info("[房间] 玩家[%s %d] 离开房间[%d]", u.Name(), u.Id(), this.Id())

	// 如果是私人房间，全部人离开解散
	if IsTexasRoomPrivateType(this.SubKind()) && len(this.members) == 0 {
		this.Destory(0)
	}
}

// 棋牌类站起
//func (this *TexasPokerRoom) UserStandUp(u *RoomUser) {
//	delete(this.members, u.Id())
//	this.watchmembers[u.Id()] = u
//	u.OnStandUp()
//	Redis().HSet(fmt.Sprintf("roombrief_%d", this.Id()), "members", this.PlayersNum())
//	log.Info("[房间] 玩家[%s %d] 站起观战[%d]", u.Name(), u.Id(), this.Id())
//}

// 棋牌类坐下
//func (this *TexasPokerRoom) UserSitDown(u *RoomUser, pos int32) {
//	delete(this.watchmembers, u.Id())
//	this.members[u.Id()] = u
//
//	// 检查位置是否有效
//
//	// 检查座位是否空着
//	for _, u := range this.members {
//		if u.Seat() == pos {
//			u.OnSitDown(0, "座位已经有人了")
//			return
//		}
//	}
//
//	//
//	u.OnSitDown(pos, "")
//
//	// 更新房间人数
//	Redis().HSet(fmt.Sprintf("roombrief_%d", this.Id()), "members", this.PlayersNum())
//	log.Info("[房间] 玩家[%s %d] 坐下房间[%d] 位置[%d] 等待下一局", u.Name(), u.Id(), this.Id(), pos)
//}


// 加载玩家
func (this *TexasPokerRoom) UserLoad(tmsg *msg.GW2RS_UploadUserBin, gate network.IBaseNetSession) {
	u := UserMgr().FindUser(tmsg.GetUserid())
	if u != nil {
		log.Error("[房间] 玩家[%s %d] 个人信息已经存在了", u.Name(), u.Id())
		return
	}

	u = UserMgr().CreateRoomUser(this.Id(), tmsg.Bin, gate, this.Kind())
	u.OnPreEnterRoom()
	//this.watchmembers[u.Id()]= u
	log.Info("[房间] 玩家[%s %d] 上传个人数据到房间[%d]", u.Name(), u.Id(), this.Id())
}

func (this *TexasPokerRoom) Tick(now int64) {
	this.ticker1s.Run(now)
}

// 玩家断开连接(托管/踢掉)
func (this *TexasPokerRoom) UserDisconnect(u *RoomUser) {
	log.Info("[房间] 玩家[%s %d] 网络断开 房间[%d]", u.Name(), u.Id(), this.Id())
}

// 网关断开
func (this *TexasPokerRoom) GateLeave(sid int) {
}



