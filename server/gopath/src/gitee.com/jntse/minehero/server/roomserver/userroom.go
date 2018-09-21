package main
import (
	pb"github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/pbmsg"
)

func (u *RoomUser) Login() {
}

func (u *RoomUser) Logout() {
	u.ticker1s.Stop()
	u.ticker10ms.Stop()
	u.asynev.Shutdown()
	UserMgr().DelUser(u)
}

// 游戏开始
func (u *RoomUser) OnGameStart() {
}

// 游戏结束
func (u *RoomUser) OnGameOver() {
}

func (u *RoomUser) OnDestoryRoom() {
	u.Logout()
	msgdestory := &msg.RS2GW_PushRoomDestory{Roomid:pb.Int64(u.RoomId()), Userid:pb.Int64(u.Id()), Bin:u.PackBin()}
	u.SendMsg(msgdestory)
}

// 离开房间
func (u *RoomUser) OnLeaveRoom() {
	u.Logout()
	msgleave := &msg.RS2GW_UserLeaveRoom{Userid:pb.Int64(u.Id()), Bin:u.PackBin() }
	u.SendMsg(msgleave)
}

// 进入房间
func (u *RoomUser) OnEnterRoom() {
}

// 棋牌站起动作
func (u *RoomUser) UserStandUp() {
}

// 棋牌坐下动作
func (u *RoomUser) UserSitDown() {
}

