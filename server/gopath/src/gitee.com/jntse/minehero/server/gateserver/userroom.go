package main
import (
	"fmt"
	"github.com/go-redis/redis"

	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

// --------------------------------------------------------------------------
/// @brief 玩家房间简单数据
// --------------------------------------------------------------------------
type UserRoomData struct {
	roomid     	int64
	seatpos		int32	// 座位号,0观战
	sid_room   	int
	kind       	int32
	tm_closing 	int64 	// 房间关闭超时
	creating   	bool
}

func (this *UserRoomData) Reset() {
	this.roomid = 0
	this.sid_room = 0
	this.kind = 0
	this.tm_closing = 0
	this.creating = false
}

func (this *UserRoomData) Online() {
	;
}

func (this *GateUser) GameKind() int32 {
	return this.roomdata.kind
}

// 房间id
func (this *GateUser) RoomId() int64 {
	return this.roomdata.roomid
}

// 房间服务器 sid
func (this *GateUser) RoomSid() int {
	return this.roomdata.sid_room
}

// 是否有房间
func (this *GateUser) IsInRoom() bool {
	if this.RoomId() != 0 {
		return true
	}
	return false
}

// 正在创建房间
func (this *GateUser) IsRoomCreating() bool {
	return this.roomdata.creating
}

// 房间关闭中
func (this *GateUser) IsRoomClosing() bool {
	return this.roomdata.tm_closing != 0
}

// 关闭超时, 10秒
func (this *GateUser) IsRoomCloseTimeOut() bool {
	return util.CURTIMEMS() > (this.roomdata.tm_closing + 10000)
}

// 发送房间消息
func (this *GateUser) SendRoomMsg(msg pb.Message) {
	if this.IsInRoom() == false {
		log.Error("玩家[%s %d]没有房间信息", this.Name(), this.Id())
		return
	}
	RoomSvrMgr().SendMsg(this.roomdata.sid_room, msg)
}

// 回复客户端
func (this *GateUser) ReplyCreateRoom(err string, roomid int64) {
	send := &msg.GW2C_RetCreateRoom{Errcode: pb.String(err), Roomid: pb.Int64(roomid)}
	this.SendMsg(send)
	if err != "" {
		log.Info("玩家[%s %d] 开始游戏失败: roomid=%d errcode=%s", this.Name(), this.Id(), roomid, err)
	}
}

// 向match请求创建房间
func (this *GateUser) CreateRoomRemote(tmsg *msg.C2GW_ReqCreateRoom) (errcode string) {

	gamekind := tmsg.GetGamekind()
	if Match() == nil {
		log.Error("玩家[%s %d] 匹配服务器未连接", this.Name(), this.Id())
		errcode = "创建房间服务器不可用"
		return
	}

	//
	if RoomSvrMgr().Num() == 0 {
		log.Error("玩家[%s %d] 请求开房间，但是没有房间服务器", this.Name(), this.Id())
		errcode = "房间服务器不可用"
		return
	}

	// 创建中
	if this.IsRoomCreating() {
		log.Error("玩家[%s %d] 重复创建房间，正在创建房间中", this.Name(), this.Id())
		errcode = "正在创建房间中"
		return
	}

	// 有房间
	if this.IsInRoom() {
		log.Error("玩家[%s %d] 重复创建房间，已经有一个房间[%d]", this.Name(), this.Id(), this.RoomId())
		errcode = "重复创建房间"
		return
	}

	// 请求创建房间
	this.roomdata.kind = gamekind
	this.roomdata.creating = true

	//
	send := &msg.GW2MS_ReqCreateRoom{
		Userid:   pb.Int64(this.Id()),
		Gamekind: pb.Int32(gamekind),
		Texas: pb.Clone(tmsg.Texas).(*msg.TexasPersonalRoom),
	}
	Match().SendCmd(send)
	log.Info("玩家[%s %d] 请求创建房间类型:%d ts[%d]", this.Name(), this.Id(), gamekind, util.CURTIMEMS())
	return
}

// 开启游戏房间成功
func (this *GateUser) StartGameOk(servername string, roomid int64) {
	var agent *RoomAgent = RoomSvrMgr().FindByName(servername)
	if agent == nil {
		log.Error("玩家[%s %d] 开房间成功，但找不到RoomServer[%s]", this.Name(), this.Id(), servername)
		return
	}

	this.roomdata.roomid = roomid
	this.roomdata.sid_room = agent.Id()

	// TODO: 将个人信息上传到Room
	send := &msg.GW2RS_UploadUserBin{Roomid:pb.Int64(roomid), Bin:this.PackBin()}
	agent.SendMsg(send)

	log.Info("玩家[%s %d] 创建房间[%d]成功 向RS上传玩家个人数据 ts[%d]", this.Name(), this.Id(), roomid, util.CURTIMEMS())
}

// 开启游戏房间失败
func (this *GateUser) StartGameFail(err string) {
	this.roomdata.Reset()
}

// 房间关闭
func (this *GateUser) OnGameEnd(bin *msg.Serialize, reason string) {
	if this.IsOnline() { 
		this.SendMsg(&msg.BT_GameOver{Roomid:pb.Int64(this.RoomId())}) 
	}
	
	log.Info("玩家[%s %d] 房间关闭 房间[%d] 原因[%s]", this.Name(), this.Id(), this.RoomId(), reason)
	this.roomdata.Reset()

	// 加载玩家最新数据
	if bin != nil {
		this.bin = pb.Clone(bin).(*msg.Serialize)
		this.OnLoadDB("房间结束")
		if this.IsOnline() {
			this.SendUserBase()
		}
	}
}

// 发送德州房间列表
func (this *GateUser) SendTexasRoomList(rtype int32) {
	key := fmt.Sprintf("roomlist_kind_%d_sub_%d", int32(msg.RoomKind_TexasPoker), rtype)
	list, err := Redis().SMembers(key).Result()
	if err == redis.Nil {
		return
	}
	if err != nil {
		log.Error("[房间] 加载所有房间列表失败 %s", err)
		return
	}

	pipe := Redis().Pipeline()
	for _, id := range list {
		key := fmt.Sprintf("roomcache_%s", id)
		pipe.HGetAll(key)
	}
	cmds, err := pipe.Exec()
	if err != nil {
		log.Error("[房间] 获取房间详细信息失败 %s", err)
		return
	}

	send := &msg.GW2C_RetTexasRoomList{List:make([]*msg.TexasRoomSimpleInfo, 0)}
	for _, cmd := range cmds {
		info := &msg.TexasRoomSimpleInfo{}
		sscmd := cmd.(*redis.StringStringMapCmd)
		for k, v := range sscmd.Val() {
			vt := util.NewVarType(v)
			switch k {
			case "uid": info.Id = pb.Int64(vt.Int64())
			case "tid": info.RoomId = pb.Int32(vt.Int32())
			case "members": info.Player = pb.Int32(vt.Int32())
			case "passwd": if vt.String() != "" { info.HasPwd = pb.Bool(true) }
			}
		}
		send.List = append(send.List, info)
	}
	this.SendMsg(send)
}


