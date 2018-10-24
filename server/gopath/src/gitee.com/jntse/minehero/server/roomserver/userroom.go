package main
import (
	"fmt"
	pb"github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
)

// 游戏开始
func (u *RoomUser) OnGameStart() {
}

// 游戏结束
func (u *RoomUser) OnGameOver() {
}

func (u *RoomUser) OnDestoryRoom() {
	if u.RoomNum() == 0  {
		u.Logout()
	}
	Redis().Del(fmt.Sprintf("userinroom_%d", u.Id()))
	u.ClearUserRoomState()
	msgdestory := &msg.RS2GW_PushRoomDestory{Roomid:pb.Int64(u.RoomId()), Userid:pb.Int64(u.Id())}
	u.SendMsg(msgdestory)
	u.SetRoomId(0)
	log.Trace("[房间] 玩家[%s %d] 回传个人数据，房间销毁[%d]", u.Name(), u.Id(), u.RoomId())
}

// 离开房间
func (u *RoomUser) OnLeaveRoom() {
	u.ClearUserRoomState()
	if u.RoomNum() == 0  {
		u.Logout()
	}
	Redis().Del(fmt.Sprintf("userinroom_%d", u.Id()))
	msgleave := &msg.RS2GW_UserLeaveRoom{Userid:pb.Int64(u.Id())}
	u.SendMsg(msgleave)
	u.SetRoomId(0)
	log.Trace("[房间] 玩家[%s %d] 回传个人数据，离开房间[%d]", u.Name(), u.Id(), u.RoomId()) 
}

// 被踢出房间，暂时使用Leave逻辑
func (u *RoomUser) OnKickOutRoom() {
	u.OnLeaveRoom()
}

// 进房间之前
func (u *RoomUser) OnPreEnterRoom() {
}

// 进入房间
func (u *RoomUser) OnEnterRoom(room IRoomBase) {
	u.SetRoomId(room.Id())
	Redis().Set(fmt.Sprintf("userinroom_%d", u.Id()), u.RoomId(), 0)
	u.SetUserRoomState(room)
	send := &msg.RS2GW_RetEnterRoom{
		Userid:pb.Int64(u.Id()), 
		Kind:pb.Int32(room.Kind()),
		Roomid:pb.Int64(room.Id()), 
		Roomtid:pb.Int32(room.Tid()),
		Passwd:pb.String(room.Passwd()),
		Errcode:pb.String(""),
	}
	u.SendMsg(send)
}

// 棋牌站起动作
func (u *RoomUser) OnStandUp() {
	//send := &msg.RS2C_RetStandUp{}
	//u.SendClientMsg(send)
	//u.seatpos = 0
}

// 棋牌坐下动作
func (u *RoomUser) OnSitDown(seat int32, errmsg string) {
	//u.SendClientMsg(&msg.RS2C_RetSitDown{Errcode:pb.String(errmsg)})
	//if errmsg != "" {
	//	log.Info("[房间] 玩家[%s %d] 坐下房间[%d] 位置[%d] 错误[%s] ", u.Name(), u.Id(), u.RoomId(), seat, errmsg)
	//	return
	//}
	//u.seatpos = seat
}

func (u *RoomUser) SetUserRoomState(room IRoomBase) {
	if room.Kind() == int32(msg.RoomKind_TexasPoker) {
		if 	room.SubKind() == int32(msg.PlayingFieldType_Primary) || 
			room.SubKind() == int32(msg.PlayingFieldType_Middle) || 
			room.SubKind() == int32(msg.PlayingFieldType_High) {
			Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "roomtype", 1)
			Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "roomid", room.Id())
		} else if room.SubKind() == int32(msg.PlayingFieldType_Mtt) {
			Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "roomtype", 3)
			Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "roomid", room.Id())
		}
	} else if room.Kind() == int32(msg.RoomKind_TexasFight) {
		Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "roomtype", 2)
		Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "roomid", room.Id())
	}
}

func (u *RoomUser) ClearUserRoomState() {
	Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "roomtype", 0)
	Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "roomid", 0)
}
