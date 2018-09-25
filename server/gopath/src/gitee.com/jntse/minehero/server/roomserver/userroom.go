package main
import (
	"fmt"
	pb"github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/log"
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
	Redis().Del(fmt.Sprintf("userinroom_%d", u.Id()))
	msgdestory := &msg.RS2GW_PushRoomDestory{Roomid:pb.Int64(u.RoomId()), Userid:pb.Int64(u.Id()), Bin:u.PackBin()}
	u.SendMsg(msgdestory)
	log.Trace("[房间] 销毁房间[%d] 回传玩家[%s %d]个人数据", u.RoomId(), u.Name(), u.Id()) 
}

// 离开房间
func (u *RoomUser) OnLeaveRoom() {
	u.Logout()
	Redis().Del(fmt.Sprintf("userinroom_%d", u.Id()))
	msgleave := &msg.RS2GW_UserLeaveRoom{Userid:pb.Int64(u.Id()), Bin:u.PackBin() }
	u.SendMsg(msgleave)
	log.Trace("[房间] 离开房间[%d] 回传玩家[%s %d]个人数据", u.RoomId(), u.Name(), u.Id()) 
}

// 进房间之前
func (u *RoomUser) OnPreEnterRoom() {
	Redis().Set(fmt.Sprintf("userinroom_%d", u.Id()), u.RoomId(), 0)
}

// 进入房间
func (u *RoomUser) OnEnterRoom() {
}

// 棋牌站起动作
func (u *RoomUser) OnStandUp() {
	send := &msg.RS2C_RetStandUp{}
	u.SendClientMsg(send)
	u.seatpos = 0
}

// 棋牌坐下动作
func (u *RoomUser) OnSitDown(seat int32, errmsg string) {
	u.SendClientMsg(&msg.RS2C_RetSitDown{Errmsg:pb.String(errmsg)})
	if errmsg != "" {
		log.Info("[房间] 玩家[%s %d] 坐下房间[%d] 位置[%d] 错误[%s] ", u.Name(), u.Id(), u.RoomId(), seat, errmsg)
		return
	}

	u.seatpos = seat
}

