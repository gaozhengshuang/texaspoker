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

func (t *TanTanLe) MembersNum() int32 { return int32(len(t.members)) }

func (t *TanTanLe) Tick(now int64) { if t.owner != nil { t.owner.Tick(now) } }
func (t *TanTanLe) SendMsg(userid int64, msg pb.Message) {
	t.owner.SendMsg(msg)
}

func (t *TanTanLe) SendClientMsg(userid int64, msg pb.Message) {
	t.owner.SendClientMsg(msg)
}

// 房间参数初始化
func (t *TanTanLe) Init() string {
	// 更新房间数量到redis
	loadkey := def.RoomAgentLoadRedisKey(RoomSvr().Name())
	Redis().SAdd(loadkey, t.id)
	log.Info("玩家[%d] 创建房间[%d]完成 类型[%d]", t.ownerid, t.id, t.gamekind)
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
func (t *TanTanLe) CanStart() bool {
	if t.IsGameStart() == true {
		return false
	}
	return true
}

func (t *TanTanLe) IsGameStart() bool {
	if ( t.tm_start == 0 ) {
		return false
	}
	return true
}

// 是否销毁房间
func (t *TanTanLe) IsDestory(now int64) bool {

	// 超过10秒还未开始游戏
	if ( t.tm_start == 0 && (now/1000) > t.tm_create + 10) {
		t.close_reason = "玩家超时未进房间"
		log.Info("房间[%d] 准备删除房间，玩家10秒内未进游戏", t.id)
		return true
	}

	if ( t.tm_destory != 0 && now >= t.tm_destory)	{
		log.Info("房间[%d] 准备删除房间，玩家[%d]", t.id, t.ownerid)
		return true
	}

	return false
}


// 房间销毁
func (t *TanTanLe) OnDestory(now int64) {
	//log.Info("房间[%d] 游戏结束，模式[%d]", t.Id(), t.Kind())

	//// 序列化玩家个人数据
	//if t.owner != nil { 
	//	t.owner.OnGameOver() 
	//}

	//// 通知Gate删除房间，回传个人数据
	//msgend := &msg.BT_GameEnd { Roomid:pb.Int64(t.Id()) ,Ownerid:pb.Int64(t.ownerid), Reason:pb.String(t.close_reason)}
	//if t.owner != nil { msgend.Bin = t.owner.PackBin() }
	//t.SendMsg(0, msgend)


	//// 更新房间数量到redis
	//loadkey := def.RoomAgentLoadRedisKey(RoomSvr().Name())
	//Redis().SRem(loadkey, t.Id())
	//log.Info("服务器房间数量[%d]", Redis().SCard(loadkey).Val())
}


// 玩家进游戏，游戏开始
func (t *TanTanLe) OnGameStart() {
	//if t.owner == nil {
	//	log.Error("房间[%d] Owner[%d] OnStart 玩家不在房间中", t.id, t.ownerid)
	//	return
	//}

	//log.Info("房间[%d] 游戏开始，模式[%d] 玩家金币[%d]", t.Id(), t.Kind(), t.owner.GetGold())
	//t.tm_start = util.CURTIME()


	//// 游戏初始化
	//msginit := &msg.BT_GameInit {
	//	Roomid:pb.Int64(t.Id()), 
	//	Ownerid:pb.Int64(t.ownerid),
	//	Gamekind:pb.Int32(t.Kind()), 
	//}
	//t.SendClientMsg(0, msginit)

	//// 游戏开始
	//msgstart := &msg.BT_GameStart{Roomid:pb.Int64(t.Id()), Ownerid:pb.Int64(t.ownerid)}
	//t.SendClientMsg(0, msgstart)
}

// 游戏结束
func (t *TanTanLe) OnGameOver() {
}


// 加载玩家
func (t *TanTanLe) UserLoad(tmsg *msg.GW2RS_UploadUserBin, gate network.IBaseNetSession) {
	if t.owner != nil {
		log.Error("房间[%d] 玩家[%s %d]个人数据已经在房间了", t.id, t.owner.Id(), t.owner.Name())
		return
	}

	// 
	user := UserMgr().CreateRoomUser(t.id, tmsg.Bin, gate, t.gamekind)
	t.owner = user

	// 
	log.Info("房间[%d] 玩家[%s %d] 加载个人数据，最大能量%d", t.id, user.Name(), user.Id(), user.MaxEnergy())
}

// 玩家进房间，开始游戏
func (t *TanTanLe) UserEnter(u *RoomUser) {
	if t.IsGameStart() == true {
		log.Error("房间[%d] 玩家[%d] 游戏已经开始了，不要重复进入", t.id, u.Id())
		return
	}

	if t.owner == nil {
		log.Error("房间[%d] Owner[%d] UserEnter 玩家不在房间中", t.id, t.ownerid)
		return
	}

	log.Info("房间[%d] 玩家[%d]进入游戏 ts[%d]", t.id, u.Id(), util.CURTIMEMS())
	t.OnGameStart()
}

// 玩家正常离开
func (t *TanTanLe) UserLeave(u *RoomUser) {
	t.Destory(0)
	t.close_reason = "玩家退出房间"
	log.Info("房间[%d] 玩家[%d]退出房间，同步money[%d]，准备删除房间", t.id, u.Id(), 0)
}

// 玩家断开连接
func (t *TanTanLe) UserDisconnect(u *RoomUser) {
	t.Destory(0)
	t.close_reason = "玩家断开连接"
	log.Info("房间[%d] 玩家[%d]断开连接，准备删除房间", t.id, u.Id())
}

// 网关断开
func (t *TanTanLe) GateLeave(sid int) {
	t.Destory(0)
	log.Info("房间[%d] Owner[%d] 网关断开连接Sid[%d]", t.id, t.ownerid, sid)
}

