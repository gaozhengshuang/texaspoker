package main
import (
	_"fmt"
	_"time"
	_"strings"
	"strconv"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
	_"gitee.com/jntse/minehero/server/tbl"
	_"gitee.com/jntse/minehero/server/tbl/excel"
	"gitee.com/jntse/minehero/server/def"
)

// --------------------------------------------------------------------------
/// @brief 房间格子道具管理
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
/// @brief TODO: 一个房间可以对应一个单独的协程
// --------------------------------------------------------------------------
type TanTanLe struct {
	RoomBase
	totalcost	int64	// 本局游戏总消耗
}

func (this *TanTanLe) Tick(now int64) { if this.owner != nil { this.owner.Tick(now) } }
func (this *TanTanLe) SendMsg(userid int64, msg pb.Message) {
	this.owner.SendMsg(msg)
}

func (this *TanTanLe) SendClientMsg(userid int64, msg pb.Message) {
	this.owner.SendClientMsg(msg)
}

// 房间参数初始化
func (this *TanTanLe) Init() string {
	// 更新房间数量到redis
	loadkey := def.RoomAgentLoadRedisKey(RoomSvr().Name())
	Redis().SAdd(loadkey, this.id)
	log.Info("玩家[%d] 创建房间[%d]完成 类型[%d]", this.ownerid, this.id, this.gamekind)
	return ""
}

// 大奖公告
func PickItemNotice(user *RoomUser, itemname string) {
	RoomSvr().SendNotice(user.Head(), msg.NoticeType_Suspension, 
		def.MakeNoticeText("恭喜", "#ffffff", 26),
		def.MakeNoticeText(user.Name(), "#ffffff", 26),
		def.MakeNoticeText("获得", "#fffc00", 26), 
		def.MakeNoticeText(itemname, "#ffffff", 26),
	);

}

// 元宝公告
func PickNumItemNotice(user *RoomUser, itemname string, num int64) {
	strnum := strconv.FormatInt(num, 10)
	RoomSvr().SendNotice(user.Head(), msg.NoticeType_Suspension, 
		def.MakeNoticeText("恭喜", "#ffffff", 26),
		def.MakeNoticeText(user.Name(), "#ffffff", 26),
		def.MakeNoticeText("获得", "#fffc00", 26),  
		def.MakeNoticeText(strnum, "#ffffff", 26), 
		def.MakeNoticeText(itemname, "#ffffff", 26),
	);
}

//
func (this *TanTanLe) CanStart() bool {
	if this.IsGameStart() == true {
		return false
	}
	return true
}

func (this *TanTanLe) IsGameStart() bool {
	if ( this.tm_start == 0 ) {
		return false
	}
	return true
}

// 是否销毁房间
func (this *TanTanLe) IsDestory(now int64) bool {

	// 超过10秒还未开始游戏
	if ( this.tm_start == 0 && (now/1000) > this.tm_create + 10) {
		this.close_reason = "玩家超时未进房间"
		log.Info("房间[%d] 准备删除房间，玩家10秒内未进游戏", this.id)
		return true
	}

	if ( this.tm_destory != 0 && now >= this.tm_destory)	{
		log.Info("房间[%d] 准备删除房间，玩家[%d]", this.id, this.ownerid)
		return true
	}

	return false
}


// 房间销毁
func (this *TanTanLe) OnDestory(now int64) {
	//log.Info("房间[%d] 游戏结束，模式[%d]", this.Id(), this.Kind())

	//// 序列化玩家个人数据
	//if this.owner != nil { 
	//	this.owner.OnGameOver() 
	//}

	//// 通知Gate删除房间，回传个人数据
	//msgend := &msg.BT_GameEnd { Roomid:pb.Int64(this.Id()) ,Ownerid:pb.Int64(this.ownerid), Reason:pb.String(this.close_reason)}
	//if this.owner != nil { msgend.Bin = this.owner.PackBin() }
	//this.SendMsg(0, msgend)


	//// 更新房间数量到redis
	//loadkey := def.RoomAgentLoadRedisKey(RoomSvr().Name())
	//Redis().SRem(loadkey, this.Id())
	//log.Info("服务器房间数量[%d]", Redis().SCard(loadkey).Val())
}


// 玩家进游戏，游戏开始
func (this *TanTanLe) OnGameStart() {
	//if this.owner == nil {
	//	log.Error("房间[%d] Owner[%d] OnStart 玩家不在房间中", this.id, this.ownerid)
	//	return
	//}

	//log.Info("房间[%d] 游戏开始，模式[%d] 玩家金币[%d]", this.Id(), this.Kind(), this.owner.GetGold())
	//this.tm_start = util.CURTIME()


	//// 游戏初始化
	//msginit := &msg.BT_GameInit {
	//	Roomid:pb.Int64(this.Id()), 
	//	Ownerid:pb.Int64(this.ownerid),
	//	Gamekind:pb.Int32(this.Kind()), 
	//}
	//this.SendClientMsg(0, msginit)

	//// 游戏开始
	//msgstart := &msg.BT_GameStart{Roomid:pb.Int64(this.Id()), Ownerid:pb.Int64(this.ownerid)}
	//this.SendClientMsg(0, msgstart)
}

// 游戏结束
func (this *TanTanLe) OnGameOver() {
}


// 加载玩家
func (this *TanTanLe) UserLoad(tmsg *msg.GW2RS_UploadUserBin, gate network.IBaseNetSession) {
	if this.owner != nil {
		log.Error("房间[%d] 玩家[%s %d]个人数据已经在房间了", this.id, this.owner.Id(), this.owner.Name())
		return
	}

	// 
	user := UserMgr().CreateRoomUser(this.id, tmsg.Bin, gate, this.gamekind)
	this.owner = user

	// 
	log.Info("房间[%d] 玩家[%s %d] 加载个人数据，最大能量%d", this.id, user.Name(), user.Id(), user.MaxEnergy())
}

// 玩家进房间，开始游戏
func (this *TanTanLe) UserEnter(u *RoomUser) {
	if this.IsGameStart() == true {
		log.Error("房间[%d] 玩家[%d] 游戏已经开始了，不要重复进入", this.id, u.Id())
		return
	}

	if this.owner == nil {
		log.Error("房间[%d] Owner[%d] UserEnter 玩家不在房间中", this.id, this.ownerid)
		return
	}

	log.Info("房间[%d] 玩家[%d]进入游戏 ts[%d]", this.id, u.Id(), util.CURTIMEMS())
	this.OnGameStart()
}

// 玩家正常离开
func (this *TanTanLe) UserLeave(u *RoomUser) {
	this.Destory(0)
	this.close_reason = "玩家退出房间"
	log.Info("房间[%d] 玩家[%d]退出房间，同步money[%d]，准备删除房间", this.id, u.Id(), 0)
}

// 玩家断开连接
func (this *TanTanLe) UserDisconnect(userid int64) {
	this.Destory(0)
	this.close_reason = "玩家断开连接"
	log.Info("房间[%d] 玩家[%d]断开连接，准备删除房间", this.id, userid)
}

// 网关断开
func (this *TanTanLe) GateLeave(sid int) {
	this.Destory(0)
	log.Info("房间[%d] Owner[%d] 网关断开连接Sid[%d]", this.id, this.ownerid, sid)
}

