package main
import (
	"fmt"
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
func (this *TanTanLe) SendMsg(userid uint64, msg pb.Message) {
	this.owner.SendMsg(msg)
}

func (this *TanTanLe) SendClientMsg(userid uint64, msg pb.Message) {
	this.owner.SendClientMsg(msg)
}

// 房间参数初始化
func (this *TanTanLe) Init() (errcode string) {
	switch{
	default:
		// 更新房间数量到redis
		key := RoomSizeKey()
		_, err := Redis().SAdd(key, this.id).Result()
		if err != nil {
			errcode = fmt.Sprintf("更新房间数量到redis失败 key:%s , err: %s", key, err)
			break
		}
		log.Info("玩家[%d] 创建房间[%d]完成 类型[%d]", this.ownerid, this.id, this.roomkind)
		return ""
	}

	return
}

// 大奖公告
func PickItemNotice(user *RoomUser, itemname string) {
	RoomSvr().SendNotice(user.Face(), msg.NoticeType_Suspension, 
		def.MakeNoticeText("恭喜", "#ffffff", 26),
		def.MakeNoticeText(user.Name(), "#ffffff", 26),
		def.MakeNoticeText("获得", "#fffc00", 26), 
		def.MakeNoticeText(itemname, "#ffffff", 26),
	);

}

// 元宝公告
func PickNumItemNotice(user *RoomUser, itemname string, num int64) {
	strnum := strconv.FormatInt(num, 10)
	RoomSvr().SendNotice(user.Face(), msg.NoticeType_Suspension, 
		def.MakeNoticeText("恭喜", "#ffffff", 26),
		def.MakeNoticeText(user.Name(), "#ffffff", 26),
		def.MakeNoticeText("获得", "#fffc00", 26),  
		def.MakeNoticeText(strnum, "#ffffff", 26), 
		def.MakeNoticeText(itemname, "#ffffff", 26),
	);
}

//
func (this *TanTanLe) CanStart() bool {
	if this.IsStart() == true {
		return false
	}
	return true
}

func (this *TanTanLe) IsStart() bool {
	if ( this.tm_start == 0 ) {
		return false
	}
	return true
}

//
func (this *TanTanLe) IsEnd(now int64) bool {

	// 超过10秒还未开始游戏
	if ( this.tm_start == 0 && (now/1000) > this.tm_create + 10) {
		this.close_reason = "玩家超时未进房间"
		log.Info("房间[%d] 准备删除房间，玩家10秒内未进游戏", this.id)
		return true
	}

	if ( this.tm_end != 0)	{
		log.Info("房间[%d] 准备删除房间，玩家[%d]", this.id, this.ownerid)
		return true
	}

	return false
}


// 游戏结束
func (this *TanTanLe) OnEnd(now int64) {
	log.Info("房间[%d] 游戏结束，模式[%d]", this.Id(), this.Kind())

	// 序列化玩家个人数据
	if this.owner != nil { 
		this.owner.OnEnd(now) 
	}

	// 通知Gate删除房间，回传个人数据
	msgend := &msg.BT_GameEnd { Roomid:pb.Int64(this.Id()) ,Ownerid:pb.Uint64(this.ownerid), Reason:pb.String(this.close_reason)}
	if this.owner != nil { msgend.Bin = this.owner.PackBin() }
	this.SendMsg(0, msgend)


	// 更新房间数量到redis
	key := RoomSizeKey()
	_, err := Redis().SRem(key, this.id).Result()
	if err != nil { log.Error("更新房间数量到redis失败 key:%s , err: %s", key, err) }
	log.Info("SCard Redis[%s] Amount[%d]", key, Redis().SCard(key).Val())

}

// 玩家进游戏，游戏开始
func (this *TanTanLe) OnStart() {
	if this.owner == nil {
		log.Error("房间[%d] Owner[%d] OnStart 玩家不在房间中", this.id, this.ownerid)
		return
	}

	log.Info("房间[%d] 游戏开始，模式[%d] 玩家金币[%d]", this.Id(), this.Kind(), this.owner.GetGold())
	this.tm_start = util.CURTIME()


	// 游戏初始化
	msginit := &msg.BT_GameInit {
		Roomid:pb.Int64(this.Id()), 
		Ownerid:pb.Uint64(this.ownerid),
		Gamekind:pb.Int32(this.Kind()), 
	}
	this.SendClientMsg(0, msginit)


	// 同步玩家数据
	//this.owner.SendBattleUser()

	// 游戏开始
	msgstart := &msg.BT_GameStart{Roomid:pb.Int64(this.Id()), Ownerid:pb.Uint64(this.ownerid)}
	this.SendClientMsg(0, msgstart)
}

// 加载玩家
func (this *TanTanLe) UserLoad(bin *msg.Serialize, gate network.IBaseNetSession) {
	if this.owner != nil {
		log.Error("房间[%d] 玩家[%s %d]个人数据已经在房间了", this.id, this.owner.Id(), this.owner.Name())
		return
	}

	// 
	user := UserMgr().CreateRoomUser(this.id, bin, gate, this.roomkind)
	this.owner = user

	// 
	log.Info("房间[%d] 玩家[%s %d] 加载个人数据，最大能量%d", this.id, user.Name(), user.Id(), user.MaxEnergy())
}

// 玩家进房间，开始游戏
func (this *TanTanLe) UserEnter(userid uint64) {
	if this.IsStart() == true {
		log.Error("房间[%d] 玩家[%d] 游戏已经开始了，不要重复进入", this.id, userid)
		return
	}

	if this.owner == nil {
		log.Error("房间[%d] Owner[%d] UserEnter 玩家不在房间中", this.id, this.ownerid)
		return
	}

	log.Info("房间[%d] 玩家[%d]进入游戏 ts[%d]", this.id, userid, util.CURTIMEMS())
	//this.owner.UpdateToken(token)
	this.OnStart()
}

// 玩家正常离开
func (this *TanTanLe) UserLeave(userid uint64) {
	this.tm_end = util.CURTIME()
	this.close_reason = "玩家退出房间"
	//if owner := this.owner; owner != nil {
	//	if money > owner.GetGold() + 10000 {
	//		log.Warn("[玩家[%s %d] 退出房间同步金币差距过大 old[%d] new[%d]", owner.Name(), owner.Id(), owner.GetGold(), money)
	//	}else {
	//		if owner.GetGold() < money {
	//			addmoney := money - owner.GetGold()
	//			owner.AddGold(addmoney, "退出房间同步", false)
	//		}
	//	}
	//}
	log.Info("房间[%d] 玩家[%d]退出房间，同步money[%d]，准备删除房间", this.id, userid , 0)
}

// 玩家断开连接
func (this *TanTanLe) UserDisconnect(userid uint64) {
	this.tm_end = util.CURTIME()
	this.close_reason = "玩家断开连接"
	log.Info("房间[%d] 玩家[%d]断开连接，准备删除房间", this.id, userid)
}

// 网关断开
func (this *TanTanLe) GateLeave(sid int) {
	this.tm_end = util.CURTIME()
	log.Info("房间[%d] Owner[%d] 网关断开连接Sid[%d]", this.id, this.ownerid, sid)
}

// 棋牌类站起
func (this *TanTanLe) UserStandUp(userid uint64) {
}

// 棋牌类坐下
func (this *TanTanLe) UserSitDown(userid uint64) {
}

