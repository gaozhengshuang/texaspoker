package main
import (
	"fmt"
	"time"
	_"strings"
	"strconv"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	_"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/server/tbl"
	_"gitee.com/jntse/minehero/server/tbl/excel"
	"gitee.com/jntse/minehero/server/def"
	"github.com/go-redis/redis"
)

// --------------------------------------------------------------------------
/// @brief TODO: 一个房间可以对应一个单独的协程
// --------------------------------------------------------------------------
type TanTanLe struct {
	RoomBase
	bulletid    int64
	energy      int64
	save_amt    int64
	topscore    int64
	freebullet	uint32
}
func (this *TanTanLe) Tick(now int64) { if this.owner != nil { this.owner.Tick(now) } }
func (this *TanTanLe) Id() int64 { return this.id }
func (this *TanTanLe) Kind() int32 { return this.roomkind }

func (this *TanTanLe) SendMsg(msg pb.Message) {
	if this.owner == nil {
		log.Error("房间[%d] Owner数据未初始化", this.id)
		return
	}
	this.owner.SendMsg(msg)
}

func (this *TanTanLe) SendClientMsg(msg pb.Message) {
	if this.owner == nil {
		log.Error("房间[%d] Owner数据未初始化", this.id)
		return
	}
	this.owner.SendMsg(msg)
}

// 房间参数初始化
func (this *TanTanLe) Init() (errcode string) {
	key := def.RedisKeyGateRooms(GateSvr().Name())	// 更新房间数量到redis
	_, err := Redis().SAdd(key, this.id).Result()
	if err != nil {
		errcode = fmt.Sprintf("更新房间数量到redis失败 key:%s , err: %s", key, err)
		return errcode
	}
	log.Info("玩家[%d] 创建房间[%d]完成 类型[%d]", this.ownerid, this.id, this.roomkind)
	return ""
}

// 大奖公告
func PickItemNotice(user *GateUser, itemname string) {
	GateSvr().SendNotice(user.Face(), msg.NoticeType_Suspension, 
		def.MakeNoticeText("恭喜", "#ffffff", 26),
		def.MakeNoticeText(user.Name(), "#ffffff", 26),
		def.MakeNoticeText("获得", "#fffc00", 26), 
		def.MakeNoticeText(itemname, "#ffffff", 26),
	);
}

// 元宝公告
func PickNumItemNotice(user *GateUser, itemname string, num int64) {
	strnum := strconv.FormatInt(num, 10)
	GateSvr().SendNotice(user.Face(), msg.NoticeType_Suspension, 
		def.MakeNoticeText("恭喜", "#ffffff", 26),
		def.MakeNoticeText(user.Name(), "#ffffff", 26),
		def.MakeNoticeText("获得", "#fffc00", 26),  
		def.MakeNoticeText(strnum, "#ffffff", 26), 
		def.MakeNoticeText(itemname, "#ffffff", 26),
	);
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
		log.Info("房间[%d] 准备删除，玩家[%d]", this.id, this.ownerid)
		return true
	}

	return false
}


// 游戏结束
func (this *TanTanLe) OnEnd(now int64) {
	log.Info("房间[%d] 游戏结束，玩家[%d] 模式[%d]", this.Id(), this.ownerid, this.Kind())

	// 单局日排行榜
	zMem := redis.Z{ float64(this.topscore), this.ownerid }
	rKey := fmt.Sprintf("rank_topscore_day_%s", time.Now().Format("20060102"))
	score, _ := Redis().ZScore(rKey, strconv.FormatUint(this.ownerid, 10)).Result()
	if score < float64(this.topscore) { Redis().ZAdd(rKey, zMem) }

	// 序列化玩家个人数据
	if this.owner != nil { 
		this.owner.OnGameEnd(nil, this.close_reason)
	}

	// 通知Gate删除房间，回传个人数据
	//msgend := &msg.BT_OnGameEnd { Roomid:pb.Int64(this.Id()) ,Ownerid:pb.Uint64(this.ownerid), Reason:pb.String(this.close_reason)}
	//if this.owner != nil { msgend.Bin = this.owner.PackBin() }
	//this.SendMsg(msgend)


	// 更新房间数量到redis
	key := def.RedisKeyGateRooms(GateSvr().Name())
	_, err := Redis().SRem(key, this.id).Result()
	if err != nil { log.Error("更新房间数量到redis失败 key:%s , err: %s", key, err) }
	log.Info("SCard Redis[%s] Amount[%d]", key, Redis().SCard(key).Val())

	// 如果通过事件打开，移除事件
	this.owner.events.RemoveProcessingEvent(uint32(msg.MapEventId_GameTanTanLe))
}

// 玩家进游戏，游戏开始
func (this *TanTanLe) OnStart() {
	if this.owner == nil {
		log.Error("房间[%d] Owner[%d] OnStart 玩家不在房间中", this.id, this.ownerid)
		return
	}

	log.Info("房间[%d] 游戏开始，模式[%d] 玩家金币[%d]", this.Id(), this.Kind(), this.owner.GetGold())
	this.tm_start = util.CURTIME()
	this.freebullet = uint32(tbl.Game.MapEvent.TantanleFreeBullet)


	// 游戏初始化
	msginit := &msg.BT_GameInit {
		Roomid:pb.Int64(this.Id()), 
		Ownerid:pb.Uint64(this.ownerid),
		Gamekind:pb.Int32(this.Kind()), 
		Gold:pb.Uint32(this.owner.GetGold()),
		Diamond:pb.Uint32(this.owner.GetDiamond()),
		Freebullet:pb.Uint32(this.Freebullet()),
	}
	this.SendClientMsg(msginit)


	// 同步玩家数据
	//this.owner.SendBattleUser()

	// 游戏开始
	msgstart := &msg.BT_GameStart{Roomid:pb.Int64(this.Id()), Ownerid:pb.Uint64(this.ownerid)}
	this.SendClientMsg(msgstart)
}

// 加载玩家
func (this *TanTanLe) UserLoad(user *GateUser) {
	this.owner = user
	this.owner.roomdata.room = this
}

//func (this *TanTanLe) UserLoad(bin *msg.Serialize, gate network.IBaseNetSession) {
//	if this.owner != nil {
//		log.Error("房间[%d] 玩家[%s %d]个人数据已经在房间了", this.id, this.owner.Id(), this.owner.Name())
//		return
//	}
//
//	// 
//	user := UserMgr().CreateRoomUser(this.id, bin, gate, this.roomkind)
//	this.owner = user
//
//	// 
//	log.Info("房间[%d] 玩家[%s %d] 加载个人数据 Step:%d", this.id, user.Name(), user.Id(), this.totalcost)
//}

// 玩家进房间，开始游戏
func (this *TanTanLe) UserEnter(userid uint64, token string) {
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
func (this *TanTanLe) UserLeave(userid uint64, money uint32) {
	this.tm_end = util.CURTIME()
	this.close_reason = "玩家退出房间"

	if owner := this.owner; owner != nil {
		if money > owner.GetGold() + 10000 {
			log.Warn("[玩家[%s %d] 退出房间同步金币差距过大 old[%d] new[%d]", owner.Name(), owner.Id(), owner.GetGold(), money)
		}else {
			if owner.GetGold() < money {
				addmoney := money - owner.GetGold()
				owner.AddGold(addmoney, "退出房间同步", false)
			}
		}
	}

	log.Info("房间[%d] 玩家[%d]退出房间，同步money[%d]，准备删除房间", this.id, userid, money)
}

// 玩家断开连接
func (this *TanTanLe) UserDisconnect(userid uint64) {
	this.tm_end = util.CURTIME()
	this.close_reason = "玩家断开连接"
	log.Info("房间[%d] 玩家[%d]断开连接，准备删除房间", this.id, userid)
}


// --------------------------------------------------------------------------
/// @brief 下面是弹弹乐特有接口
// --------------------------------------------------------------------------
// 请求发送子弹
func (this *TanTanLe) ReqLaunchBullet() {
	bulletid, errmsg := int64(0), ""
	switch {
	default:
		if false {
			if uint32(tbl.Game.BulletPrice) > this.owner.GetGold() {	// 检查余额
				errmsg = "金币不足"
				break
			}
			this.owner.RemoveGold(uint32(tbl.Game.BulletPrice), "发射子弹", false)		// 不同步
		}else {
			if this.Freebullet() <= 0 {
				errmsg = "免费炮弹不足"
				break
			}
			this.RemoveFreebullet(1)
		}

		bulletid = this.bulletid + 1
		this.bulletid += 1
		if this.energy < tbl.Game.MaxEnergy { this.energy += 1 }
		log.Info("玩家[%s %d] 发射子弹[%d]成功 当前能量值[%d]", this.owner.Name(), this.owner.Id(), this.bulletid, this.energy)
	}

	// 
	send := &msg.BT_RetLaunchBullet{ 
		Bulletid:pb.Int64(bulletid), 
		Errmsg:pb.String(errmsg), 
		Energy:pb.Int64(this.energy), 
		Freebullet:pb.Uint32(this.Freebullet()),
	}
	this.SendClientMsg(send)
}

func (this *TanTanLe) AddTopScore(score uint32) {
	this.topscore += int64(score)
}

func (this *TanTanLe) StepOnBomb() {
	this.owner.RemoveGold(uint32(tbl.Game.BombDeductMoney), "踩到炸弹", false)
	send := &msg.BT_RetStepOnBomb{}
	this.owner.SendMsg(send)
}

func (this *TanTanLe) BulletEarnMoney(gold uint32) {
	user := this.owner
	if gold > 1000 {
		log.Warn("玩家[%s %d] 子弹获得金币过多警告[%d]", user.Name(), user.Id(), gold)
	}

	user.AddGold(gold, "子弹获得金币", false)
	this.AddTopScore(gold)

	// 检查任务
	taskid := int32(msg.TaskId_RegisterTopScore)
	task, find := tbl.TaskBase.TTaskById[uint32(taskid)]
	if user.task.IsTaskFinish(taskid) == false && find && user.GetGold() >= uint32(task.Count) {
		user.task.TaskFinish(taskid)
		inviter := user.Inviter()
		if inviter != 0 { Redis().SAdd(fmt.Sprintf("task_invitee_topscorefinish_%d", inviter), user.Id()) }
	}

	send := &msg.BT_RetBulletEarnMoney{}
	this.SendMsg(send)
}

func (this *TanTanLe) UseUltimateSkil(gold uint32) {
	if this.energy < tbl.Game.MaxEnergy {
		log.Error("玩家[%s %d]使用大招能量未满 %d", this.energy)
		return
	}

	this.energy = 0
	this.owner.AddGold(gold, "使用大招", true)
}

func (this *TanTanLe) CrushSuperBrick() {
	this.owner.AddGold(uint32(tbl.Game.SuperBrickReward), "超级砖块奖励", false)
	send := &msg.BT_RetCrushSuperBrick{Errmsg:pb.String("")}
	this.owner.SendMsg(send)
}

func (this *TanTanLe) RemoveFreebullet(n uint32) {
	if this.freebullet > n {
		this.freebullet -= n
		log.Info("玩家[%s %d] 扣除免费炮弹，当前剩余[%d]", this.owner.Name(), this.owner.Id(), this.Freebullet())
	}
}

func (this *TanTanLe) Freebullet() uint32 {
	return this.freebullet
}

func (this *TanTanLe) AddFreebullet(n uint32) {
	this.freebullet += n
}
