package main

import (
	"strconv"
	"fmt"
	"time"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/log"
	"github.com/go-redis/redis"
	"gitee.com/jntse/gotoolkit/redis"
)

const (
	CSNone int32 = 0		//无
	CSGoing int32 = 1       //进行中
	CSDel int32 = 2			//删除
	CSOver int32 = 3		//结束
)

//锦标赛玩家结构
type CSPlayer struct {
	roomuid int64			//所在房间uid
	bankroll int64			//身上筹码
	rebuy int32				//rebuy次数
	addon int32				//addon次数
	joinway int32			//参加方式
	name string				//名字
	face string				//头像
	sex int32				//性别
	isout bool				//是否出局
	outtime int32			//出局时间
}

//锦标赛结构
type ChampionShip struct {
	tconf *table.ChampionshipDefine			//锦标赛配置
	rconf *table.TexasRoomDefine			//德州房间配置
	tid int32								//表id
	uid int32								//唯一id
	members map[int64]*CSPlayer				//玩家信息
	starttime int32							//开始时间
	endtime int32							//结束时间
	roommember map[int64]map[int64]int64	//房间包含玩家
	ticker1s *util.GameTicker
	state int32								//锦标赛状态
	minroomnum	int32						//最小人数房间
	bconf *table.ChampionshipBlindDefine	//盲注配置
	blindtick int32							//盲注计时
	blindtype int32							//盲注大类
	blindlevel int32						//盲注等级
	overblind bool							//盲注结束
	maxuser int32							//最大玩家数
	sumbankroll int64						//总筹码
	curmembernum int32						//当前总人数
	finalrank []int64						//最终排名
}

//初始化
func (cs *ChampionShip) Init() bool {
	cs.members = make(map[int64]*CSPlayer)
	cs.roommember = make(map[int64]map[int64]int64)
	cs.finalrank = make([]int64, 0)
	tconf, ok := tbl.TChampionship.ChampionshipById[cs.tid]
	if ok == false {
		log.Error("[锦标赛] not found Championship tconf[%d]", cs.tid)
		return false
	}
	cs.tconf = tconf
	rconf, ok := tbl.TexasRoomBase.TexasRoomById[cs.tconf.RoomId]
	if ok == false {
		log.Error("[房间] not found room tconf[%d]", cs.tid)
		return false
	}
	cs.rconf = rconf
	cs.ticker1s = util.NewGameTicker(time.Second, cs.Handler1sTick)
	cs.ticker1s.Start()
	for _, data := range tbl.TChampionshipBlind.ChampionshipBlindById {
		if tconf.BlindType == data.BlindId && data.Level == 1 {
			cs.bconf = data
			cs.blindtype = data.BlindId
			cs.blindlevel = data.Level
			log.Info("锦标赛%d 盲注%d 等级%d", cs.uid, cs.blindtype, cs.blindlevel)
		}
	}
	return true
}

//盲注计时
func (cs *ChampionShip) BlindTick() {
	if cs.overblind {
		return
	}
	cs.blindtick++
	if cs.blindtick > cs.bconf.UpTime {
		cs.blindlevel++
		for _, data := range tbl.TChampionshipBlind.ChampionshipBlindById {
			if cs.tconf.BlindType == data.BlindId && data.Level == cs.blindlevel {
				cs.bconf = data
				cs.blindtype = data.BlindId
				cs.blindlevel = data.Level
				if data.UpTime == 0 {
					cs.overblind = true
				}
			}
		}
		cs.blindtick = 0
		cs.NotifyUserBlind(cs.roommember)
		cs.SetRoomBlind()
	}
}

//获取升注时间
func (cs *ChampionShip) GetBlindUpTime() int32 {
	if cs.blindtick < cs.bconf.UpTime {
		return int32(util.CURTIME()) + cs.bconf.UpTime - cs.blindtick
	} else {
		return int32(util.CURTIME())
	}
}

//设置房间盲注
func (cs *ChampionShip) SetRoomBlind() {
	for key, _ := range cs.roommember {
		room := RoomMgr().FindTexas(key)
		if room == nil {
			continue
		}
		room.bigblindnum = cs.bconf.BBlind
		room.smallblindnum = cs.bconf.SBlind
		room.preblindnum = cs.bconf.PreBet
	}
}

func (cs *ChampionShip) Handler1sTick(now int64) {
	if cs.IsNone() {
		//log.Info("锦标赛%d 开始时间%d 当前时间%d", cs.uid, cs.starttime, util.CURTIME())
		if cs.tconf.Type == 1{
			if int32(util.CURTIME()) > cs.starttime {
				log.Info("锦标赛[%d] 开始创建房间 开始时间[%d]", cs.uid, cs.starttime)
				if !cs.StartMatch() {
					cs.Refund()
					cs.CancelMatch()
					cs.state = CSDel
				} else {
					cs.state = CSGoing
				}
				start := SysTimerMgr().GetStartTimeByTimeId(cs.tconf.TimeId, cs.tconf.Type)
				ChampionMgr().CreateChampionShip(cs.tid, start)
			}
		} else if cs.tconf.Type == 2 {
			if int32(len(cs.members)) >= cs.tconf.SNum {
				if !cs.StartMatch() {
					cs.Refund()
					cs.CancelMatch()
					cs.state = CSDel
				} else {
					cs.state = CSGoing
				}
				start := SysTimerMgr().GetStartTimeByTimeId(cs.tconf.TimeId, cs.tconf.Type)
				ChampionMgr().CreateChampionShip(cs.tid, start)
			}
		}
	}
	if cs.IsStart() {
		cs.BlindTick()
	}
}

//比赛未开启退款
func (cs *ChampionShip) Refund() {
	for uid, _ := range cs.members {
		AddUserGold(0, uid, cs.tconf.SignCost+cs.tconf.ServeCost, "锦标赛未开启")
	}
}

//取消比赛
func (cs *ChampionShip) CancelMatch() {
	send := &msg.RS2GW_MTTCancel{}
	send.Recordid = pb.Int32(cs.uid)
	for uid, _ := range cs.members {
		send.Members = append(send.Members, uid)
	}
	GateMgr().Broadcast(send)
}

//获取玩家房间
func (cs *ChampionShip) GetUserRoom(userid int64) int64 {
	if member, ok := cs.members[userid]; ok {
		return member.roomuid
	}
	return 0
}

//锦标赛状态 无
func (cs *ChampionShip) IsNone() bool {
	if cs.state == CSNone {
		return true
	}
	return false
}

//锦标赛状态 结束
func (cs *ChampionShip) IsOver() bool {
	if cs.state == CSOver {
		return true
	}
	return false
}

//锦标赛状态 开始
func (cs *ChampionShip) IsStart() bool {
	if cs.state == CSGoing {
		return true
	}
	return false
}

//锦标赛状态 删除
func (cs *ChampionShip) IsDel() bool {
	if cs.state == CSDel {
		return true
	}
	return false
}

//锦标赛不能进入
func (cs *ChampionShip) IsOutJoin() bool {
	if cs.starttime + cs.tconf.DelaySign <= int32(util.CURTIME()) {
		return true
	}
	return false
}

func (cs *ChampionShip) Tick(now int64) {
	cs.ticker1s.Run(now)
}

//能否显示锦标赛
func (cs *ChampionShip) CanShow() bool {
	if cs.starttime == 0 {
		return false
	}
	if cs.starttime < int32(util.CURTIME()) + cs.tconf.DisplayTime {
		return true
	}
	return false
}

//是否是竞标赛成员
func (cs *ChampionShip) IsMember(uid int64) bool {
	_, ok := cs.members[uid]
	if ok {
		return true
	}
	return false
}

//是否是淘汰成员
func (cs *ChampionShip) IsOutMember(uid int64) bool {
	member, ok := cs.members[uid]
	if !ok {
		return false
	}
	if member.isout {
		return true
	}
	return false
}

//设置玩家淘汰
func (cs *ChampionShip) SetMemberOut(uid int64) {
	member, ok := cs.members[uid]
	if !ok {
		return 
	}
	member.isout = true
	member.outtime = int32(util.CURTIME())
	cs.curmembernum--
	if room, ok := cs.roommember[member.roomuid]; ok {
		delete(room, uid)
		cs.SetMinRoom()
	}
	cs.finalrank = append(cs.finalrank, uid)
	cs.UserGameOver(uid)
	if cs.curmembernum == 1 {
		for key, member := range cs.members {
			if member.isout {
				continue
			}else {
				cs.finalrank = append(cs.finalrank, key)
				cs.UserGameOver(key)
			}
		}
		cs.GameOver()
	}
}

//添加锦标赛成员
func (cs *ChampionShip) AddMember(uid int64, join int32) {
	member := &CSPlayer{}
	key := fmt.Sprintf("charbase_%d", uid)
	member.name = Redis().HGet(key, "name").Val()
	member.face = Redis().HGet(key, "face").Val()
	member.sex = util.Atoi(Redis().HGet(key, "sex").Val())
	member.bankroll = int64(cs.tconf.InitialChips)
	member.joinway = join
	cs.members[uid] = member
	cs.AddUserRank(uid)
	cs.maxuser++
	cs.sumbankroll += member.bankroll
	cs.curmembernum++
	if cs.IsStart() {
		cs.JoinHalfWay(uid)	
	}
}

//删除锦标赛成员
func (cs *ChampionShip) DelMember(uid int64) {
	delete(cs.members, uid)
	cs.DelUserRank(uid)
}

//开始锦标赛
func (cs *ChampionShip) StartMatch() bool {
	if int32(len(cs.members)) < cs.tconf.SNum {
		log.Info("锦标赛[%d] 由于人数不足不能开启", cs.uid)
		return false
	}
	seatnum := cs.rconf.Seat
	sumnum := int32(len(cs.members))
	var curnum int32 = 0
	for {
		if curnum >= sumnum{
			break
		}else{
			curnum += seatnum
			cs.CreateRoom()
		}
	}
	cs.DispatchRoom()
	cs.NotifyUserRoom(cs.roommember)
	cs.state = CSGoing

	//start := SysTimerMgr().GetStartTimeByTimeId(cs.tconf.TimeId, cs.tconf.Type)
	//ChampionMgr().CreateChampionShip(cs.tid, start)
	log.Info("锦标赛[%d] tid[%d] 开启", cs.uid, cs.tid)
	return true
}

//创建锦标赛桌子
func (cs *ChampionShip) CreateRoom() int64{
	roomuid := RoomMgr().CreatTexasRoomForChampion(cs.tconf.RoomId, cs)
	if roomuid != 0 {
		if _, ok := cs.roommember[roomuid]; !ok {
			roomuser := make(map[int64]int64)
			cs.roommember[roomuid] = roomuser
			log.Info("锦标赛[%d] 创建房间[%d]", cs.uid, roomuid)
			return roomuid
		}
	}else{
		log.Info("锦标赛[%d] 创建房间失败", cs.uid)
	}
	return 0
}

//分配玩家到每张桌子上
func (cs *ChampionShip) DispatchRoom() {
	dispatched := make(map[int64]int64)
	for uid, _ := range cs.members {
		for key, room := range cs.roommember {
			if _, ok := dispatched[key]; ok {
				continue
			}
			if int32(len(room)) >= cs.rconf.Seat {
				continue
			}
			dispatched[key] = key
			cs.JoinOneMatch(uid, key)
			break
		}
		if len(dispatched) == len(cs.roommember){
			dispatched = make(map[int64]int64)
		}
	}
	cs.SetMinRoom()
}

//中途加入玩家
func (cs *ChampionShip) JoinHalfWay(userid int64) {
	var joinok bool = false
	var ruid int64 = 0
	for key, room := range cs.roommember {
		if int32(len(room)) >= cs.rconf.Seat {
			continue
		}
		cs.JoinOneMatch(userid, key)
		joinok = true
		ruid = key
		break
	}
	if !joinok {
		roomuid := cs.CreateRoom()
		if roomuid != 0 {
			cs.JoinOneMatch(userid, roomuid)
			joinok = true
			ruid = roomuid
		}
	}
	if joinok {
		tmproommember := make(map[int64]map[int64]int64)
		tmpmap := make(map[int64]int64)
		tmproommember[ruid] = tmpmap
		tmproommember[ruid][userid] = userid
		cs.NotifyUserRoom(tmproommember)
	}
}

//加入一场桌子比赛
func (cs *ChampionShip) JoinOneMatch(userid int64, roomid int64) {
	texas := RoomMgr().FindTexas(roomid)
	if texas != nil {
		u := UserMgr().FindUser(userid)
		if u == nil {
			u = UserMgr().CreateSimpleUser(userid)
		}
		if u == nil {
			return
		}
		cs.roommember[roomid][userid] = userid
		cs.members[userid].roomuid = roomid
		texas.MTTUserEnter(u)
		texas.SetPlayerBankRoll(userid, cs.GetUserBankRoll(userid))
		texas.NotifySitStand(userid, userid)
		log.Info("锦标赛[%d] 房间[%d] 玩家[%d] 分配房间", cs.uid, roomid, userid)
	}
}

//跟新玩家筹码
func (cs *ChampionShip) UpdateUserBankRoll(userid int64, num int64) {
	if member, ok := cs.members[userid]; ok {
		cs.sumbankroll -= member.bankroll
		member.bankroll = num
		cs.sumbankroll += num
		log.Info("锦标赛[%d] 玩家[%d] 更新筹码[%d]", cs.uid, userid, num)
	}
}

//获取玩家筹码
func (cs *ChampionShip) GetUserBankRoll(userid int64) int64 {
	if member, ok := cs.members[userid]; ok {
		return member.bankroll
	}
	return 0
}

//获取玩家加入锦标赛方式
func (cs *ChampionShip) GetUserJoinWay(userid int64) int32 {
	if member, ok := cs.members[userid]; ok {
		return member.joinway
	}
	return 0
}

//获取玩家淘汰时间
func (cs *ChampionShip) GetUserOutTime(userid int64) int32 {
	if member, ok := cs.members[userid]; ok {
		return member.outtime
	}
	return 0
}

//获取平均筹码
func (cs *ChampionShip) GetAvgChips() int64 {
	if cs.curmembernum != 0 {
		return cs.sumbankroll/int64(cs.curmembernum)
	}else{
		return cs.sumbankroll
	}
}

//玩家游戏结束
func (cs *ChampionShip) UserGameOver(userid int64) {
	if member, ok := cs.members[userid]; ok {
		send := &msg.RS2C_PushMTTWeedOut{}
		send.Rank = pb.Int32(cs.GetFinalRank(userid))
		send.Join = pb.Int32(cs.maxuser)
		send.Maxrank = pb.Int32(0)
		send.Recordid = pb.Int32(cs.uid)
		send.Id = pb.Int32(cs.tid)
		u := UserMgr().FindUser(userid)
		if u != nil && u.RoomId() == member.roomuid{
			u.SendClientMsg(send)
		}
	}
}

//找到最小人数房间
func (cs *ChampionShip) SetMinRoom() {
	//找到最小人数房间
	cs.minroomnum = 0
	for _, room := range cs.roommember {
		if cs.minroomnum == 0 {
			cs.minroomnum = int32(len(room))
			continue
		}
		if cs.minroomnum > int32(len(room)) {
			cs.minroomnum = int32(len(room))
		}   
	}  
}

//拆桌子 重新分配该桌子的玩家
func (cs *ChampionShip) ReDispatchRoom(roomuid int64) bool {
	room, ok := cs.roommember[roomuid]
	if !ok {
		return false
	}
	if len(cs.roommember) <= 1 {
		return false
	}
	//if int32(len(room)) > cs.minroomnum {
	//	return false
	//}
	var leftseat int32 = 0
	for k, r := range cs.roommember {
		if k == roomuid {
			continue
		} 
		if int32(len(r)) < cs.rconf.Seat {
			leftseat += cs.rconf.Seat - int32(len(r))
		}
	}
	if leftseat >= int32(len(room)) {
		tmpmember := make(map[int64]int64)
		for _, m := range room {
			tmpmember[m] = m
		}
		delete(cs.roommember, roomuid)
		dispatched := make(map[int64]int64)
		tmproommember := make(map[int64]map[int64]int64)
		for _, m := range tmpmember {
			for key, tmproom := range cs.roommember {
				if _, ok := dispatched[key]; ok {
					continue
				}
				if int32(len(tmproom)) >= cs.rconf.Seat {
					continue
				}
				dispatched[key] = key
				if _, ok := tmproommember[key]; !ok {
					tmpmap := make(map[int64]int64)
					tmproommember[key] = tmpmap
					tmproommember[key][m] = m
				} else {
					tmproommember[key][m] = m
				}
				cs.JoinOneMatch(m, key)
			}
			if len(dispatched) == len(cs.roommember){
				dispatched = make(map[int64]int64)
			}
		}
		cs.NotifyUserRoom(tmproommember)
		texas := RoomMgr().FindTexas(roomuid)
		if texas != nil {
			texas.Destory(0)
		}
		log.Info("锦标赛[%d] 拆散桌子删除房间[%d]", cs.uid, roomuid)
		return true
	}
	return false
}

//通知玩家进房间
func (cs *ChampionShip) NotifyUserRoom(roommember map[int64]map[int64]int64) {
	send := &msg.RS2GW_MTTRoomMember{}
	for key, room := range roommember {
		mttroom := &msg.MTTRoomMember{}
		mttroom.Mttuid = pb.Int32(cs.uid)
		mttroom.Roomuid = pb.Int64(key)
		for _, member := range room {
			mttroom.Members = append(mttroom.Members, member)
		}
		send.Rooms = append(send.Rooms, mttroom)
	}
	GateMgr().Broadcast(send)
}

//通知玩家涨盲
func (cs *ChampionShip) NotifyUserBlind(roommember map[int64]map[int64]int64) {
	send := &msg.RS2C_PushBlindChange{}
	send.Sblind = pb.Int64(cs.bconf.SBlind)
	send.Bblind = pb.Int64(cs.bconf.BBlind)
	send.Ante = pb.Int64(cs.bconf.PreBet)
	send.Blindlevel = pb.Int32(cs.blindlevel)
	for key, room := range roommember {
		for _, member := range room {
			u := UserMgr().FindUser(member)
			if u != nil && u.RoomId() == key{
				u.SendClientMsg(send)
			}
		}
	}
}

//获得最终排名
func (cs *ChampionShip) GetFinalRank(uid int64) int32{
	for k, v := range cs.finalrank {
		if v == uid {
			return cs.maxuser - int32(k)
		}
	}
	return 0
}

//添加玩家实时排名
func (cs *ChampionShip) AddUserRank(userid int64) {
	zMem := redis.Z{Score: float64(cs.GetUserBankRoll(userid)), Member: userid}
	Redis().ZAdd(fmt.Sprintf("csrank_%d", cs.uid), zMem)
	log.Info("锦标赛[%d] 玩家[%d] 更新比分[%d]", cs.uid, userid, cs.GetUserBankRoll(userid))
}

//删除玩家排名
func (cs *ChampionShip) DelUserRank(userid int64) {
	Redis().ZRem(fmt.Sprintf("csrank_%d", cs.uid), fmt.Sprintf("%d", userid))
}

//获取玩家实时排名
func (cs *ChampionShip) GetUserRank(userid int64) int32{
	rank := Redis().ZRevRank(fmt.Sprintf("csrank_%d", cs.uid), fmt.Sprintf("%d", userid)).Val()
	return int32(rank) + 1
}

//计算玩家实时排名
func (cs *ChampionShip) CalcRank(roomuid int64) {
	room, ok := cs.roommember[roomuid]
	if !ok {
		return
	}
	for _, member := range room {
		cs.AddUserRank(member)
	}
	log.Info("锦标赛[%d], 房间[%d], 结算排行", cs.uid, roomuid)
}

//锦标赛结束
func (cs *ChampionShip) GameOver() {
	cs.RewardAll()
	cs.SaveData()
	//cs.DestoryRoom()
	cs.state = CSDel
	log.Info("锦标赛[%d] 比赛结束", cs.uid)
}

//根据排名获得奖励id
func (cs *ChampionShip) GetAwardByRank (rank int32) int32 {
	for _, v := range tbl.TChampionshipPrize.ChampionshipPrizeById {
		if cs.tconf.Prize == v.PrizeId && v.Start <= rank && rank <= v.End {
			return v.AwardId
		}
	}
	return 0	
}

//冠军通知
func (cs *ChampionShip) ChampionNotify(name string, tid int32, aid int32) {
	txt := fmt.Sprintf("{\"0\":\"%s\",\"1\":%d,\"2\":%d}", name, tid, aid)
	send := &msg.RS2GW_ChatInfo{}
	send.Chat = def.MakeChatInfo(def.ChatAll, txt, 0, "", def.MTTMsg, def.MsgShowAll)
	GateMgr().Broadcast(send)
}

//分配奖励
func (cs *ChampionShip) RewardAll() {
	var rank int32 = 1
	for i := len(cs.finalrank)-1; i >= 0; i-- {
		awardid := cs.GetAwardByRank(rank)
		if awardid == 0 {
			continue
		}
		memberid := cs.finalrank[i]
		detail := def.MakeMTTMail(Redis(), memberid, cs.tid, rank, awardid)
		transmsg := &msg.RS2MS_PushNewMail{Receiver:pb.Int64(cs.finalrank[i]), Mail:detail}
		Match().SendCmd(transmsg)
		log.Info("锦标赛[%d] 玩家[%d] 排名[%d] 获得奖励[%d]", cs.uid, memberid, rank, awardid)
		if rank == 1 {
			member := cs.GetMemberById(memberid)
			if member != nil {
				cs.ChampionNotify(member.name, cs.tid, awardid)
			}
		}
		//进入锦标赛奖励圈
		Redis().HIncrBy(fmt.Sprintf("charstate_%d", memberid), "mttprizetimes", 1)
		if rank == 1 {
			//锦标赛夺冠
			Redis().HIncrBy(fmt.Sprintf("charstate_%d", memberid), "championtimes", 1)
			strgroup := strconv.FormatInt(int64(AchieveGroup_MTTChampion), 10)
			Redis().HIncrBy(fmt.Sprintf("charstate_%d", memberid), strgroup, 1)
		}
		rank++
	}
}

//销毁桌子
func (cs *ChampionShip) DestoryRoom() {
	for ruid, _ := range cs.roommember {
		texas := RoomMgr().FindTexas(ruid)
		if texas != nil {
			texas.Destory(1)
		}
	}
}

//存储比赛数据
func (cs *ChampionShip) SaveData() {
	pipe := Redis().Pipeline()
	defer pipe.Close()
	struid := fmt.Sprintf("%d", cs.uid)
	for _, member := range cs.finalrank {
		key := fmt.Sprintf("usercsrecord_%d", member)
		pipe.LPush(key, struid)
	}
	_, err := pipe.Exec()
	if err != nil {
		log.Info("锦标赛[%d] 写入玩家记录失败", cs.uid)
	}
	srecord := &msg.MTTRecordInfo{}
	first := cs.GetFirstMember()
	if first != nil {
		srecord.Id = pb.Int32(cs.tid)
		srecord.Starttime = pb.Int32(cs.starttime)
		srecord.Name = pb.String(first.name)
		srecord.Head = pb.String(first.face)
		srecord.Sex = pb.Int32(first.sex)
		srecord.Recordid = pb.Int32(cs.uid)
		skey := fmt.Sprintf("cssimplerecord_%d", cs.uid)
		if err := utredis.SetProtoBin(Redis(), skey, srecord); err != nil {
			log.Info("锦标赛[%d] 写入简单记录失败", cs.uid)
		}
	}
	drecord := &msg.RS2C_RetMTTRecentlyRankList{}
	count := 1
	for i :=len(cs.finalrank)-1; i >= 0; i-- {
		if count >= 10 {
			break
		}
		uid := cs.finalrank[i]
		member := cs.GetMemberById(uid)
		if member == nil {
			continue
		}
		data := &msg.MTTRecentlyRankInfo{}
		data.Rank = pb.Int32(int32(count))
		data.Name = pb.String(member.name)
		data.Head = pb.String(member.face)
		data.Sex = pb.Int32(member.sex)
		data.Roleid = pb.Int64(uid)
		drecord.Ranklist = append(drecord.Ranklist, data)
		count++
	}
	dkey := fmt.Sprintf("csdetailrecord_%d", cs.uid)
	if err := utredis.SetProtoBin(Redis(), dkey, drecord); err != nil {
		log.Info("锦标赛[%d] 写入详细记录失败", cs.uid)
	}
}

//通过id查找成员
func (cs *ChampionShip) GetMemberById(uid int64) *CSPlayer {
	if member, ok := cs.members[uid]; ok {
		return member
	}
	return nil
}

//获得排名第一的成员
func (cs *ChampionShip) GetFirstMember() *CSPlayer {
	if len(cs.finalrank) == 0 {
		return nil
	}
	uid := cs.finalrank[len(cs.finalrank)-1]
	if member, ok := cs.members[uid]; ok {
		return member
	}
	return nil
}

//通过成员id获得实时排名
func (cs *ChampionShip) GetRankById(uid int64) int32 {
	rank := Redis().ZRevRank(fmt.Sprintf("csrank_%d", cs.uid), fmt.Sprintf("%d", uid))
	if rank.Err() == nil {
		return int32(rank.Val())+1
	}else {
		return 0
	}
}

//是否可以重购
func (cs *ChampionShip) CanRebuy(uid int64) bool {
	if !cs.IsMember(uid) {
		return false
	}
	if cs.bconf.Rebuy != 1 {
		return false
	}
	if cs.members[uid].rebuy >= cs.tconf.Rebuy {
		return false
	}
	return true
}

//增加重构次数
func (cs *ChampionShip) AddRebuy(uid int64) {
	cs.members[uid].rebuy++
}

//获取玩家重构次数
func (cs *ChampionShip) GetUserRebuy(uid int64) int32 {
	if member, ok := cs.members[uid]; ok {
		return member.rebuy
	}
	return 0
}

//是否可以增购
func (cs *ChampionShip) CanAddon(uid int64) bool {
	if !cs.IsMember(uid) {
		return false
	}
	if cs.bconf.Addon != 1 {
		return false
	}
	if cs.members[uid].addon >= cs.tconf.Addon {
		return false
	}
	return true
}

//增加增购
func (cs *ChampionShip) AddAddon(uid int64) {
	cs.members[uid].addon++
}

//获取玩家增购次数
func (cs *ChampionShip) GetUserAddon(uid int64) int32 {
	if member, ok := cs.members[uid]; ok {
		return member.addon
	}
	return 0
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

//锦标赛管理器
type ChampionManager struct {
	championships map[int32]*ChampionShip
	ticker1s *util.GameTicker
	championovers map[int32]*ChampionShip
	lastinittime int32
}

//初始化
func (cm *ChampionManager) Init() bool {
	cm.championships = make(map[int32]*ChampionShip)
	cm.championovers = make(map[int32]*ChampionShip)
	cm.ticker1s = util.NewGameTicker(time.Second, cm.Handler1sTick)
	cm.ticker1s.Start()
	cm.lastinittime = int32(util.CURTIME())
	//cm.InitChampionShip()
	return true
}

//创建锦标赛
func (cm *ChampionManager) InitChampionShip() {
	if RoomSvr().Name() != tbl.Room.MTTRoomServer {
		return
	}
	for _, data := range tbl.TChampionship.ChampionshipById {
		start := SysTimerMgr().GetStartTimeByTimeId(data.TimeId, data.Type)
		cm.CreateChampionShip(data.Id, start)
	}
}

//重新创建锦标赛 0点调用
func (cm *ChampionManager) ReInitChampionShip() {
	if RoomSvr().Name() != tbl.Room.MTTRoomServer {
		return
	}
	for _, data := range tbl.TChampionship.ChampionshipById {
		if data.Type == 2 {
			continue
		}
		start := SysTimerMgr().GetStartTimeByTimeId(data.TimeId, data.Type)
		cm.CreateChampionShip(data.Id, start)
	}
}

//创建一场锦标赛
func (cm *ChampionManager) CreateChampionShip(tid int32, start int32) {
	if start == 0 {
		return
	}
	cs := &ChampionShip{}
	cs.tid = tid
	uuid , _ := def.GenerateMatchId(Redis())
	cs.uid = int32(uuid)
	cs.Init()
	cs.starttime = start
	cm.championships[cs.uid] = cs
	log.Info("创建锦标赛[%d] uid[%d] 开始时间[%d]" , tid, cs.uid, start)
}

func (cm *ChampionManager) Handler1sTick(now int64) {
	if !util.IsSameDay(int64(cm.lastinittime), util.CURTIME()) {
		cm.ReInitChampionShip()
		cm.lastinittime = int32(util.CURTIME())
	}
}

func (cm *ChampionManager) Tick(now int64) {
	cm.ticker1s.Run(now)
	for key, cs := range cm.championships {
		cs.Tick(now)
		if cs.IsDel() {
			delete(cm.championships, key)
			log.Info("锦标赛[%d] 未开启删除", key)
		}
		if cs.IsOver() {
			//cm.championovers[key] = cs
			delete(cm.championships, key)
			log.Info("锦标赛[%d] 正常结束", key)
		}
	}
}

//通过ID获取锦标赛
func (cm *ChampionManager) FindCShipById(uid int32) *ChampionShip {
	if cs, ok := cm.championships[uid]; ok {
		return cs
	}
	return nil
}

////////////////////////////////////////////////////////////消息处理/////////////////////////////////////////////////////////////////////////

func (cm *ChampionManager) ReqMTTList(gid int, uid int64) {
	send := &msg.RS2C_RetMTTList{}
	for _, cs := range cm.championships {
		if !cs.CanShow() {
			continue
		}
		mtt := &msg.MTTInfo{}
		mtt.Id = pb.Int32(cs.tconf.Id)
		mtt.Starttime = pb.Int32(cs.starttime)
		mtt.Join = pb.Int32(int32(len(cs.members)))
		mtt.Recordid = pb.Int32(cs.uid)
		mtt.Joinway = pb.Int32(cs.GetUserJoinWay(uid))
		mtt.Leftjoin = pb.Int32(cs.curmembernum)
		//mtt.Roomuid = pb.Int64(cs.GetUserRoom(uid))
		send.Mttlist = append(send.Mttlist, mtt)
	}
	/*for _, cs := range cm.championovers {
		mtt := &msg.MTTInfo{}
		mtt.Id = pb.Int32(cs.tconf.Id)
		mtt.Starttime = pb.Int32(cs.starttime)
		mtt.Join = pb.Int32(int32(len(cs.members)))
		mtt.Recordid = pb.Int32(cs.uid)
		mtt.Joinway = pb.Int32(cs.GetUserJoinWay(uid))
		mtt.Endtime = pb.Int32(cs.endtime)
		mtt.Outtime = pb.Int32(cs.GetUserOutTime(uid))
		send.Mttlist = append(send.Mttlist, mtt)
	}*/
	RoomSvr().SendClientMsg(gid, uid, send)
}

func (cm *ChampionManager) ReqMTTJoin(gid int, uid int64, rev *msg.C2RS_ReqMTTJoin) {
	send := &msg.RS2C_RetMTTJoin{}
	cs := cm.FindCShipById(rev.GetRecordid())
	if cs == nil {
		send.Errcode = pb.String("比赛不存在")
		RoomSvr().SendClientMsg(gid, uid, send)
		return
	}
	if cs.IsMember(uid) {
		send.Errcode = pb.String("已经报名该比赛")
		RoomSvr().SendClientMsg(gid, uid, send)
		return
	}
	if !RemoveUserGold(gid, uid, cs.tconf.SignCost+cs.tconf.ServeCost, "报名参加锦标赛") {
		send.Errcode = pb.String("金币不足")
		RoomSvr().SendClientMsg(gid, uid, send)
		return
	}
	if !cs.CanShow() {
		send.Errcode = pb.String("未到报名时间")
		RoomSvr().SendClientMsg(gid, uid, send)
		return
	}
	if cs.IsOutJoin() {
		send.Errcode = pb.String("停止报名")
		RoomSvr().SendClientMsg(gid, uid, send)
		return
	}
	cs.AddMember(uid, rev.GetJoinway())
	send.Recordid = pb.Int32(cs.uid)
	RoomSvr().SendClientMsg(gid, uid, send)
	log.Info("玩家[%d] 报名参加竞标赛[%d]", uid, cs.uid)
	Redis().HIncrBy(fmt.Sprintf("charstate_%d", uid), "mttjointimes", 1)
}

func (cm *ChampionManager) ReqMTTQuit(gid int, uid int64, rev *msg.C2RS_ReqMTTQuit) {
	send := &msg.RS2C_RetMTTQuit{}
	cs := cm.FindCShipById(rev.GetRecordid())
	if cs == nil {
		send.Errcode = pb.String("比赛不存在")
		RoomSvr().SendClientMsg(gid, uid, send)
		return
	}
	if !cs.IsMember(uid) {
		send.Errcode = pb.String("没有报名该比赛")
		RoomSvr().SendClientMsg(gid, uid, send)
		return
	}
	cs.DelMember(uid)
	AddUserGold(gid, uid, cs.tconf.SignCost, "锦标赛退赛")
	RoomSvr().SendClientMsg(gid, uid, send)
	log.Info("玩家[%d] 退出竞标赛[%d]", uid, cs.uid)
}

func (cm *ChampionManager) ReqJoinedMTTList(gid int, uid int64, rev *msg.C2RS_ReqJoinedMTTList) {
	send := &msg.RS2C_RetJoinedMTTList{}
	for _, cs := range cm.championships {
		if !cs.CanShow() {
			continue
		}
		if !cs.IsMember(uid) {
			continue
		}
		if cs.IsOutMember(uid) {
			continue
		}
		mtt := &msg.JoinedMTTInfo{}
		mtt.Id = pb.Int32(cs.tconf.Id)
		mtt.Starttime = pb.Int32(cs.starttime)
		mtt.Join = pb.Int32(int32(len(cs.members)))
		mtt.Recordid = pb.Int32(cs.uid)
		mtt.Joinway = pb.Int32(cs.GetUserJoinWay(uid))
		mtt.Rank = pb.Int32(cs.GetUserRank(uid))
		//mtt.Roomuid = pb.Int64(cs.GetUserRoom(uid))
		send.Mttlist = append(send.Mttlist, mtt)
	}
	RoomSvr().SendClientMsg(gid, uid, send)
}

func (cm *ChampionManager) ReqInsideRoomInfoList(gid int, uid int64) {
	send := &msg.RS2C_RetInsideRoomInfoList{}
	for _, cs := range cm.championships {
		if !cs.IsStart() {
			continue
		}
		if !cs.IsMember(uid) {
			continue
		}
		mtt := &msg.InsideRoomInfo{}
		mtt.Mttid = pb.Int32(cs.uid)
		mtt.Id = pb.Int64(cs.GetUserRoom(uid))
		send.Roomlist = append(send.Roomlist, mtt)
	}
	RoomSvr().SendClientMsg(gid, uid, send)
	//log.Info("玩家[%d] gateid[%d] 请求房间列表", uid, gid)
}

func (cm *ChampionManager) ReqMTTRecordList(gid int, uid int64) {
	send := &msg.RS2C_RetMTTRecordList{}
	key := fmt.Sprintf("usercsrecord_%d", uid)
	rlist, err := Redis().LRange(key, 0, 10).Result()
	if err != nil {
		log.Info("玩家[%d] 请求最近列表失败", uid)
		//return
	}
	for _, v := range rlist {
		key, record := fmt.Sprintf("cssimplerecord_%s", v), &msg.MTTRecordInfo{}
		if err := utredis.GetProtoBin(Redis(), key, record); err != nil {
			continue
		}
		send.Recordlist	= append(send.Recordlist, record)
	}
	RoomSvr().SendClientMsg(gid, uid, send)
}

func (cm *ChampionManager) ReqMTTRecentlyRankList(gid int, uid int64, rev *msg.C2RS_ReqMTTRecentlyRankList) {
	send := &msg.RS2C_RetMTTRecentlyRankList{}
	key := fmt.Sprintf("csdetailrecord_%d", rev.GetRecordid())
	if err := utredis.GetProtoBin(Redis(), key, send); err != nil {
		log.Info("锦标赛[%d] 请求详细列表失败", rev.GetRecordid())
	}
	RoomSvr().SendClientMsg(gid, uid, send)
}

func (cm *ChampionManager) ReqMTTOutsInfo(gid int, uid int64, rev *msg.C2RS_ReqMTTOutsInfo) {
	cs := cm.FindCShipById(rev.GetRecordid())
	if cs == nil {
		return
	}
	send := &msg.RS2C_RetMTTOutsInfo{}
	send.Blindlevel = pb.Int32(cs.blindlevel)
	send.Blindtime = pb.Int32(cs.GetBlindUpTime())
	send.Rank = pb.Int32(cs.GetRankById(uid))
	RoomSvr().SendClientMsg(gid, uid, send)
}

func (cm *ChampionManager) ReqMTTRankInfo(gid int, uid int64, rev *msg.C2RS_ReqMTTRankInfo) {
	cs := cm.FindCShipById(rev.GetRecordid())
	if cs == nil {
		return
	}
	picklist, err := Redis().ZRevRangeWithScores(fmt.Sprintf("csrank_%d", cs.uid), int64(rev.GetStartrank()), int64(rev.GetCount())).Result()
	if err != nil {
		return
	}
	send := &msg.RS2C_RetMTTRankInfo{}
	for k, v := range picklist {
		uidstr := v.Member.(string)
		userid,_ := strconv.ParseInt(uidstr, 10, 64)
		member := cs.GetMemberById(userid)
		if member == nil {
			continue
		}
		data := &msg.MTTRankInfo{}
		data.Roleid = pb.Int64(userid)
		data.Chips = pb.Int32(int32(v.Score))
		data.Rank = pb.Int32(int32(k + 1))
		data.Name = pb.String(member.name)
		data.Sex = pb.Int32(member.sex)
		data.Head = pb.String(member.face)
		send.Ranklist = append(send.Ranklist, data)
	}
	RoomSvr().SendClientMsg(gid, uid, send)
}

func (cm *ChampionManager) ReqMTTRebuyOrAddon(gid int, uid int64, rev *msg.C2RS_ReqMTTRebuyOrAddon) {
	u := UserMgr().FindUser(uid) 
	if u == nil {
		return
	}
	texas := RoomMgr().FindTexas(u.RoomId())
	if texas == nil {
		return
	}
	cs := texas.mtt
	if cs == nil {
		return
	}
	send := &msg.RS2C_RetMTTRebuyOrAddon{}
	if rev.GetType() == 1{
		if cs.CanRebuy(uid) {
			texas.AddRebuy(uid, cs.tconf.InitialChips, cs.tconf.RebuyCost)
		}else {
			send.Errcode = pb.String("不能Rebuy")
		}
	}else if rev.GetType() == 2{
		if cs.CanAddon(uid) {
			texas.AddAddon(uid, cs.tconf.AddonChips, cs.tconf.AddonCost)
		}else{
			send.Errcode = pb.String("不能Addon")
		}
	}else {
		texas.ReqStandUp(uid)
	}

	log.Info("锦标赛[%d] 玩家[%d] 发起重购 类型[%d]", cs.uid, uid, rev.GetType())
	RoomSvr().SendClientMsg(gid, uid, send)
}

