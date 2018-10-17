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
	passwd		string	// 房间密码
	roomsid   	int
	roomtid		int32	// 房间配置id
	kind      	int32
	creating   	bool
	//tm_closing 	int64 	// 房间关闭超时
}

func (r *UserRoomData) Reset(u *GateUser) {
	r.roomid = 0
	r.roomsid = 0
	r.kind = 0
	//r.tm_closing = 0
	r.creating = false
	r.passwd = ""
	r.roomtid = 0
	Redis().Del(fmt.Sprintf("userinroom_%d", u.Id()))
	log.Error("[房间] 玩家[%s %d] 重置房间数据", u.Name(), u.Id())
}

func (r *UserRoomData) Online(u *GateUser) {
	roomid, _	:= Redis().Get(fmt.Sprintf("userinroom_%d", u.Id())).Int64()
	if roomid == 0 {
		r.Reset(u)
		return
	}

	// 检查房间是否存在
	keybrief := fmt.Sprintf("roombrief_%d", roomid)
	//if Redis().Exists(keybrief).Val() == 0 {
	//	r.Reset(u)
	//	log.Error("[房间] 玩家[%s %d] 房间[%d]已经销毁", u.Name(), u.Id(), r.roomid)
	//	return
	//}
	agentname := Redis().HGet(keybrief, "agentname").Val()
	var agent *RoomAgent = RoomSvrMgr().FindByName(agentname)
	if agent == nil {
		log.Error("[房间] 玩家[%s %d] 房间服务器[%s]未开启", u.Name(), u.Id(), agentname)
		r.Reset(u)
		return
	}

	r.roomid  = roomid
	r.roomsid = agent.Id()
	r.kind 	 = util.Atoi(Redis().HGet(keybrief, "kind").Val())
	r.roomtid = util.Atoi(Redis().HGet(keybrief, "tid").Val())
	r.passwd  = Redis().HGet(keybrief, "passwd").Val()
	log.Info("[房间] 玩家[%s %d] 获取房间信息[%v]", u.Name(), u.Id(), *r)

	// 对应RoomUser更新Gate SessionInfo(Gate重启/家重连)
	msgonline := &msg.GW2RS_UserOnline{Userid:pb.Int64(u.Id())}
	u.SendRoomMsg(msgonline)
}

func (u *GateUser) GameKind() int32 	{ return u.roomdata.kind }
func (u *GateUser) RoomId() int64 	{ return u.roomdata.roomid }
func (u *GateUser) RoomSid() int 	{ return u.roomdata.roomsid }
func (u *GateUser) RoomPwd() string 	{ return u.roomdata.passwd }
func (u *GateUser) RoomTid() int32 	{ return u.roomdata.roomtid }
func (u *GateUser) IsInRoom() bool 	{ return u.RoomId() != 0 }
func (u *GateUser) IsRoomCreating() bool { return u.roomdata.creating }

// 房间关闭中
//func (u *GateUser) IsRoomClosing() bool { return u.roomdata.tm_closing != 0 }
//func (u *GateUser) IsRoomCloseTimeOut() bool { return util.CURTIMEMS() > (u.roomdata.tm_closing+10000) }

// 通知RS 玩家已经断开连接了
func (u *GateUser) SendRsUserDisconnect() {
	//if u.roomdata.tm_closing != 0 { return  }
	//u.roomdata.tm_closing = util.CURTIMEMS()
	if u.IsInRoom() == false {
		return 
	}

	msgclose := &msg.GW2RS_UserDisconnect{Userid: pb.Int64(u.Id())}
	u.SendRoomMsg(msgclose)
	log.Info("[房间] 玩家[%d %s] 通知RoomServer关闭房间", u.Id(), u.Name())
}

// 发送房间消息
func (u *GateUser) SendRoomMsg(msg pb.Message) {
	//if u.IsInRoom() == false {
	//	log.Error("[房间] 玩家[%s %d]没有房间，发送房间消息失败", u.Name(), u.Id())
	//	return
	//}
	RoomSvrMgr().SendMsg(u.roomdata.roomsid, msg)
}

// TODO: 将个人信息上传到Room
func (u *GateUser) SendUserBinToRoom(roomsid int, roomid int64) {
	send := &msg.GW2RS_UploadUserBin{Roomid:pb.Int64(roomid), Userid:pb.Int64(u.Id()), Bin:u.PackBin()}
	RoomSvrMgr().SendMsg(roomsid, send)
}

// 回复客户端
func (u *GateUser) CreateRoomResponse(err string) {
	send := &msg.GW2C_RetCreateRoom{Errcode: pb.String(err), Roomid: pb.Int64(u.RoomId()), Passwd:pb.String(u.RoomPwd())}
	u.SendMsg(send)
	if err != "" {
		log.Info("[房间] 玩家[%s %d] 开始游戏失败[%s]", u.Name(), u.Id(), err)
	}
}

// 向match请求创建房间
func (u *GateUser) CreateRoomRemote(tmsg *msg.C2GW_ReqCreateRoom) (errcode string) {

	gamekind := tmsg.GetGamekind()
	if Match() == nil {
		log.Error("玩家[%s %d] 匹配服务器未连接", u.Name(), u.Id())
		errcode = "创建房间服务器不可用"
		return
	}

	//
	if RoomSvrMgr().Num() == 0 {
		log.Error("玩家[%s %d] 请求开房间，但是没有房间服务器", u.Name(), u.Id())
		errcode = "房间服务器不可用"
		return
	}

	// 创建中
	if u.IsRoomCreating() {
		log.Error("玩家[%s %d] 重复创建房间，正在创建房间中", u.Name(), u.Id())
		errcode = "正在创建房间中"
		return
	}

	// 有房间
	if u.IsInRoom() {
		log.Error("玩家[%s %d] 重复创建房间，已经有一个房间[%d]", u.Name(), u.Id(), u.RoomId())
		errcode = "重复创建房间"
		return
	}

	// 请求创建房间
	u.roomdata.kind = gamekind
	u.roomdata.creating = true
	if gamekind == int32(msg.RoomKind_TexasPoker) {
		u.roomdata.passwd = tmsg.Texas.GetPwd() 
		u.roomdata.roomtid = tmsg.Texas.GetRoomId()
	}

	//
	send := &msg.GW2MS_ReqCreateRoom{
		Userid:   pb.Int64(u.Id()),
		Gamekind: pb.Int32(gamekind),
		Texas: pb.Clone(tmsg.Texas).(*msg.TexasPersonalRoom),
	}
	Match().SendCmd(send)
	log.Info("[房间] 玩家[%s %d] 请求创建房间类型:%d ts[%d]", u.Name(), u.Id(), gamekind, util.CURTIMEMS())
	return
}

// 创建房间完成
func (u *GateUser) OnCreateRoom(errmsg, agentname string, roomid int64) {
	if errmsg != "" {
		u.roomdata.Reset(u)
	}else {
		var agent *RoomAgent = RoomSvrMgr().FindByName(agentname)
		if agent == nil {
			log.Error("[房间] 玩家[%s %d] 创建房间成功，但找不到RoomServer[%s]", u.Name(), u.Id(), agentname)
			return
		}

		u.roomdata.roomid = roomid
		u.roomdata.roomsid = agent.Id()
		u.roomdata.creating = false
		//u.SendUserBinToRoom(agent.Id(), roomid)
		log.Info("[房间] 玩家[%s %d] 创建房间[%d]成功 ts[%d]", u.Name(), u.Id(), roomid, util.CURTIMEMS())
	}
	u.CreateRoomResponse(errmsg)
}

// 离开房间返回
func (u *GateUser) OnLeaveRoom(bin *msg.Serialize) {
	log.Info("[房间] 玩家[%s %d] 离开房间[%d] 回传房间个人数据", u.Name(), u.Id(), u.RoomId())
	u.roomdata.Reset(u)
	u.bin = pb.Clone(bin).(*msg.Serialize)		// 加载最新玩家数据
	u.OnDBLoad("离开房间")
	if u.IsOnline() {
		u.SendMsg(&msg.GW2C_RetLeaveRoom{})
		u.SendUserBase()
	}
}

// 进入房间
func (u *GateUser) OnEnterRoom(agentid int, tmsg *msg.RS2GW_RetEnterRoom) {
	u.roomdata.kind 	= tmsg.GetKind()
	u.roomdata.roomid 	= tmsg.GetRoomid()
	u.roomdata.roomsid 	= agentid
	u.roomdata.roomtid 	= tmsg.GetRoomtid()
	u.roomdata.passwd 	= tmsg.GetPasswd()
	log.Info("[房间] 玩家[%s %d] 进入房间[%d]成功", u.Name(), u.Id(), u.RoomId())
}

// 房间销毁
func (u *GateUser) OnDestoryRoom(bin *msg.Serialize) {
	log.Info("[房间] 玩家[%s %d] 销毁房间[%d] 回传房间个人数据", u.Name(), u.Id(), u.RoomId())
	u.roomdata.Reset(u)
	u.bin = pb.Clone(bin).(*msg.Serialize)		// 加载最新玩家数据
	u.OnDBLoad("房间销毁")
	if u.IsOnline() {
		u.SendMsg(&msg.GW2C_RetLeaveRoom{})
		u.SendUserBase()
	}
}

//// 房间关闭
//func (u *GateUser) OnGameEnd(bin *msg.Serialize, reason string) {
//	log.Info("玩家[%s %d] 房间关闭 房间[%d] 原因[%s]", u.Name(), u.Id(), u.RoomId(), reason)
//	if u.IsOnline() { 
//		u.SendMsg(&msg.BT_GameOver{Roomid:pb.Int64(u.RoomId())}) 
//	}
//	u.roomdata.Reset(u)
//	if bin != nil {
//		u.bin = pb.Clone(bin).(*msg.Serialize)
//		u.OnLoadDB("房间结束")
//		if u.IsOnline() { u.SendUserBase() }
//	}
//}


// 发送德州房间列表
func (u *GateUser) SendTexasRoomList(rtype int32) {
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
	u.SendMsg(send)
}

// 邀请好友进入房间
func (u *GateUser) InviteFriendsJoin(ruid int64, friends []int64) {
	if u.IsInRoom() == false {
		u.SendNotify("你不在房间中")
		return
	}
	resp := &msg.GW2C_RetInviteFriendJoin{}
	u.SendMsg(resp)

	pushmsg := &msg.GW2C_PushFriendInvitation{
		Handler:make([]int64, 0),
		Id:pb.Int64(u.RoomId()),
		Roleid:pb.Int64(u.Id()),
		Pwd:pb.String(u.RoomPwd()),
		Roomid:pb.Int32(u.RoomTid()),
	}

	// 通知本服好友
	for _, fid := range friends {
		if fu := UserMgr().FindById(fid); fu != nil {
			fu.SendMsg(pushmsg)
		}else {
			pushmsg.Handler = append(pushmsg.Handler, fid)
		}
	}

	// 跨服通知好友
	if len(pushmsg.Handler) != 0 {
		GateSvr().SendGateMsg(0, pushmsg)
	}
}

