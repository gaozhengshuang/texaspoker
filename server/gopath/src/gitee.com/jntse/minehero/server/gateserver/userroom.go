package main
import (
	"fmt"
	_"strconv"
	"github.com/go-redis/redis"

	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

func GetRoomSid(roomid int64) int {
	if roomid == 0 {
		return 0
	}
	keybrief  := fmt.Sprintf("roombrief_%d", roomid)
	agentname := Redis().HGet(keybrief, "agentname").Val()
	var agent *RoomAgent = RoomSvrMgr().FindByName(agentname)
	if agent == nil {
		return 0
	}
	return agent.Id()
}

// --------------------------------------------------------------------------
/// @brief 玩家房间简单数据
// --------------------------------------------------------------------------
type UserRoomData struct {
	roomid     	int64	// 房间uid
	seatpos		int32	// 座位号,0观战
	passwd		string	// 房间密码
	roomsid   	int
	roomtid		int32	// 房间配置id
	kind      	int32
	creating   	bool
	//tm_closing 	int64 	// 房间关闭超时
}

func (this *UserRoomData) Reset(u *GateUser) {
	this.roomid = 0
	this.roomsid = 0
	this.kind = 0
	//this.tm_closing = 0
	this.creating = false
	this.passwd = ""
	this.roomtid = 0
	Redis().Del(fmt.Sprintf("userinroom_%d", u.Id()))
	log.Error("[房间] 玩家[%s %d] 重置房间数据", u.Name(), u.Id())
}

func (this *UserRoomData) Online(u *GateUser) {
	roomid, _	:= Redis().Get(fmt.Sprintf("userinroom_%d", u.Id())).Int64()
	if roomid == 0 {
		this.Reset(u)
		return
	}

	// 检查房间是否存在
	keybrief := fmt.Sprintf("roombrief_%d", roomid)
	//if Redis().Exists(keybrief).Val() == 0 {
	//	this.Reset(u)
	//	log.Error("[房间] 玩家[%s %d] 房间[%d]已经销毁", u.Name(), u.Id(), this.roomid)
	//	return
	//}
	agentname := Redis().HGet(keybrief, "agentname").Val()
	var agent *RoomAgent = RoomSvrMgr().FindByName(agentname)
	if agent == nil {
		log.Error("[房间] 玩家[%s %d] 房间服务器[%s]未开启", u.Name(), u.Id(), agentname)
		this.Reset(u)
		return
	}

	this.roomid  = roomid
	this.roomsid = agent.Id()
	this.kind 	 = util.Atoi(Redis().HGet(keybrief, "kind").Val())
	this.roomtid = util.Atoi(Redis().HGet(keybrief, "tid").Val())
	this.passwd  = Redis().HGet(keybrief, "passwd").Val()
	log.Info("[房间] 玩家[%s %d] 获取房间信息[%v]", u.Name(), u.Id(), *this)

	// 对应RoomUser更新Gate SessionInfo(Gate重启/家重连)
	msgonline := &msg.GW2RS_UserOnline{Userid:pb.Int64(u.Id())}
	this.SendRoomMsg(msgonline)
}

func (this *GateUser) GameKind() int32 	{ return this.roomdata.kind }
func (this *GateUser) RoomId() int64 	{ return this.roomdata.roomid }
func (this *GateUser) RoomSid() int 	{ return this.roomdata.roomsid }
func (this *GateUser) RoomPwd() string 	{ return this.roomdata.passwd }
func (this *GateUser) RoomTid() int32 	{ return this.roomdata.roomtid }
func (this *GateUser) IsInRoom() bool 	{ return this.RoomId() != 0 }
func (this *GateUser) IsRoomCreating() bool { return this.roomdata.creating }

// 房间关闭中
//func (this *GateUser) IsRoomClosing() bool { return this.roomdata.tm_closing != 0 }
//func (this *GateUser) IsRoomCloseTimeOut() bool { return util.CURTIMEMS() > (this.roomdata.tm_closing+10000) }

// 通知RS 玩家已经断开连接了
func (this *GateUser) SendRsUserDisconnect() {
	//if this.roomdata.tm_closing != 0 { return  }
	//this.roomdata.tm_closing = util.CURTIMEMS()
	if this.IsInRoom() == false {
		return 
	}

	msgclose := &msg.GW2RS_UserDisconnect{Userid: pb.Int64(this.Id())}
	this.SendRoomMsg(msgclose)
	log.Info("[房间] 玩家[%d %s] 通知RoomServer关闭房间", this.Id(), this.Name())
}

// 发送房间消息
func (this *GateUser) SendRoomMsg(msg pb.Message) {
	if this.IsInRoom() == false {
		log.Error("[房间] 玩家[%s %d]没有房间信息", this.Name(), this.Id())
		return
	}
	RoomSvrMgr().SendMsg(this.roomdata.roomsid, msg)
}

// TODO: 将个人信息上传到Room
func (this *GateUser) SendUserBinToRoom(roomsid int, roomid int64) {
	send := &msg.GW2RS_UploadUserBin{Roomid:pb.Int64(roomid), Userid:pb.Int64(this.Id()), Bin:this.PackBin()}
	RoomSvrMgr().SendMsg(roomsid, send)
}

// 回复客户端
func (this *GateUser) CreateRoomResponse(err string) {
	send := &msg.GW2C_RetCreateRoom{Errcode: pb.String(err), Roomid: pb.Int64(this.RoomId()), Passwd:pb.String(this.RoomPwd())}
	this.SendMsg(send)
	if err != "" {
		log.Info("[房间] 玩家[%s %d] 开始游戏失败[%s]", this.Name(), this.Id(), err)
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
	if gamekind == int32(msg.RoomKind_TexasPoker) {
		this.roomdata.passwd = tmsg.Texas.GetPwd() 
		this.roomdata.roomtid = tmsg.Texas.GetRoomId()
	}

	//
	send := &msg.GW2MS_ReqCreateRoom{
		Userid:   pb.Int64(this.Id()),
		Gamekind: pb.Int32(gamekind),
		Texas: pb.Clone(tmsg.Texas).(*msg.TexasPersonalRoom),
	}
	Match().SendCmd(send)
	log.Info("[房间] 玩家[%s %d] 请求创建房间类型:%d ts[%d]", this.Name(), this.Id(), gamekind, util.CURTIMEMS())
	return
}

// 创建房间完成
func (this *GateUser) OnCreateRoom(errmsg, agentname string, roomid int64) {
	if errmsg != "" {
		this.roomdata.Reset(this)
	}else {
		var agent *RoomAgent = RoomSvrMgr().FindByName(agentname)
		if agent == nil {
			log.Error("[房间] 玩家[%s %d] 创建房间成功，但找不到RoomServer[%s]", this.Name(), this.Id(), agentname)
			return
		}

		this.roomdata.roomid = roomid
		this.roomdata.roomsid = agent.Id()
		this.roomdata.creating = false
		this.SendUserBinToRoom(agent.Id(), roomid)
		log.Info("[房间] 玩家[%s %d] 创建房间[%d]成功 ts[%d]", this.Name(), this.Id(), roomid, util.CURTIMEMS())
	}
	this.CreateRoomResponse(errmsg)
}

// 离开房间返回
func (this *GateUser) OnLeaveRoom(bin *msg.Serialize) {
	log.Info("玩家[%s %d] 离开房间[%d] 回传房间个人数据", this.Name(), this.Id(), this.RoomId())
	this.roomdata.Reset(this)
	this.bin = pb.Clone(bin).(*msg.Serialize)		// 加载最新玩家数据
	this.OnLoadDB("离开房间")
	if this.IsOnline() {
		this.SendMsg(&msg.GW2C_RetLeaveRoom{})
		this.SendUserBase()
	}
}

// 房间销毁
func (this *GateUser) OnDestoryRoom(bin *msg.Serialize) {
	log.Info("玩家[%s %d] 销毁房间[%d] 回传房间个人数据", this.Name(), this.Id(), this.RoomId())
	this.roomdata.Reset(this)
	this.bin = pb.Clone(bin).(*msg.Serialize)		// 加载最新玩家数据
	this.OnLoadDB("房间销毁")
	if this.IsOnline() {
		this.SendMsg(&msg.GW2C_RetLeaveRoom{})
		this.SendUserBase()
	}
}

//// 房间关闭
//func (this *GateUser) OnGameEnd(bin *msg.Serialize, reason string) {
//	log.Info("玩家[%s %d] 房间关闭 房间[%d] 原因[%s]", this.Name(), this.Id(), this.RoomId(), reason)
//	if this.IsOnline() { 
//		this.SendMsg(&msg.BT_GameOver{Roomid:pb.Int64(this.RoomId())}) 
//	}
//	this.roomdata.Reset(this)
//	if bin != nil {
//		this.bin = pb.Clone(bin).(*msg.Serialize)
//		this.OnLoadDB("房间结束")
//		if this.IsOnline() { this.SendUserBase() }
//	}
//}


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
		key := fmt.Sprintf("roombrief_%s", id)
		pipe.HGetAll(key)
	}
	cmds, err := pipe.Exec()
	if err != nil {
		log.Error("[房间] 获取房间详细信息失败 %s", err)
		return
	}
	pipe.Close()

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


