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

type CSPlayer struct {
	roomuid int64
	bankroll int32
	rebuy int32
	addon int32
	joinway int32
	name string
	face string
	sex int32
	isout bool
	outtime int32
}

type ChampionShip struct {
	tconf *table.ChampionshipDefine
	rconf *table.TexasRoomDefine
	tid int32
	uid int32
	members map[int64]*CSPlayer				//玩家信息
	starttime int32
	endtime int32
	blindnum int32
	roommember map[int64]map[int64]int64	//房间包含玩家
	ticker1s *util.GameTicker
	state int32
	minroomnum	int32							//最小人数房间
	bconf *table.ChampionshipBlindDefine
	blindtick int32
	blindtype int32
	blindlevel int32
	overblind bool
	maxuser int32
	sumbankroll int32						//总筹码
	curmembernum int32						//当前总人数
	finalrank []int64						//最终排名
}

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

func (cs *ChampionShip) GetBlindUpTime() int32 {
	if cs.blindtick < cs.bconf.UpTime {
		return int32(util.CURTIME()) + cs.bconf.UpTime - cs.blindtick
	} else {
		return int32(util.CURTIME())
	}
}

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
				log.Info("锦标赛%d 开始创建房间 开始时间%d", cs.uid, cs.starttime)
				if !cs.StartMatch() {
					cs.Refund()
					cs.CancelMatch()
					cs.state = CSDel
				} else {
					cs.state = CSGoing
				}
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
			}
		}
	}
	if cs.IsStart() {
		cs.BlindTick()
	}
}

func (cs *ChampionShip) Refund() {
	for uid, _ := range cs.members {
		AddUserGold(0, uid, cs.tconf.SignCost+cs.tconf.ServeCost, "锦标赛未开启")
	}
}

func (cs *ChampionShip) CancelMatch() {
	send := &msg.RS2GW_MTTCancel{}
	send.Recordid = pb.Int32(cs.uid)
	for uid, _ := range cs.members {
		send.Members = append(send.Members, uid)
	}
	GateMgr().Broadcast(send)
}

func (cs *ChampionShip) GetUserRoom(userid int64) int64 {
	if member, ok := cs.members[userid]; ok {
		return member.roomuid
	}
	return 0
}

func (cs *ChampionShip) IsNone() bool {
	if cs.state == CSNone {
		return true
	}
	return false
}

func (cs *ChampionShip) IsOver() bool {
	if cs.state == CSOver {
		return true
	}
	return false
}

func (cs *ChampionShip) IsStart() bool {
	if cs.state == CSGoing {
		return true
	}
	return false
}

func (cs *ChampionShip) IsDel() bool {
	if cs.state == CSDel {
		return true
	}
	return false
}

func (cs *ChampionShip) IsOutJoin() bool {
	if cs.starttime + cs.tconf.DelaySign <= int32(util.CURTIME()) {
		return true
	}
	return false
}

func (cs *ChampionShip) Tick(now int64) {
	cs.ticker1s.Run(now)
}

func (cs *ChampionShip) CanShow() bool {
	if cs.starttime == 0 {
		return false
	}
	if cs.starttime < int32(util.CURTIME()) + cs.tconf.DisplayTime {
		return true
	}
	return false
}

func (cs *ChampionShip) IsMember(uid int64) bool {
	_, ok := cs.members[uid]
	if ok {
		return true
	}
	return false
}

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

func (cs *ChampionShip) AddMember(uid int64, join int32) {
	member := &CSPlayer{}
	key := fmt.Sprintf("charbase_%d", uid)
	member.name = Redis().HGet(key, "name").Val()
	member.face = Redis().HGet(key, "face").Val()
	member.sex = util.Atoi(Redis().HGet(key, "sex").Val())
	member.bankroll = cs.tconf.InitialChips
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

func (cs *ChampionShip) DelMember(uid int64) {
	delete(cs.members, uid)
	cs.DelUserRank(uid)
}

func (cs *ChampionShip) StartMatch() bool {
	if int32(len(cs.members)) < cs.tconf.SNum {
		log.Info("锦标赛%d 由于人数不足不能开启", cs.uid)
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

	start := SysTimerMgr().GetStartTimeByTimeId(cs.tconf.TimeId, cs.tconf.Type)
	ChampionMgr().CreateChampionShip(cs.tid, start)
	log.Info("锦标赛%d tid%d开启", cs.uid, cs.tid)
	return true
}

func (cs *ChampionShip) CreateRoom() int64{
	roomuid := RoomMgr().CreatTexasRoomForChampion(cs.tconf.RoomId, cs)
	if roomuid != 0 {
		if _, ok := cs.roommember[roomuid]; !ok {
			roomuser := make(map[int64]int64)
			cs.roommember[roomuid] = roomuser
			log.Info("锦标赛%d 创建房间%d", cs.uid, roomuid)
			return roomuid
		}
	}else{
		log.Info("锦标赛%d 创建房间失败", cs.uid)
	}
	return 0
}

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
		log.Info("锦标赛%d 房间%d 玩家%d 分配房间", cs.uid, roomid, userid)
	}
}

func (cs *ChampionShip) UpdateUserBankRoll(userid int64, num int32) {
	if member, ok := cs.members[userid]; ok {
		cs.sumbankroll -= member.bankroll
		member.bankroll = num
		cs.sumbankroll += num
		log.Info("锦标赛%d 玩家%d 更新筹码%d", cs.uid, userid, num)
	}
}

func (cs *ChampionShip) GetUserBankRoll(userid int64) int32 {
	if member, ok := cs.members[userid]; ok {
		return member.bankroll
	}
	return 0
}

func (cs *ChampionShip) GetUserJoinWay(userid int64) int32 {
	if member, ok := cs.members[userid]; ok {
		return member.joinway
	}
	return 0
}

func (cs *ChampionShip) GetUserOutTime(userid int64) int32 {
	if member, ok := cs.members[userid]; ok {
		return member.outtime
	}
	return 0
}

func (cs *ChampionShip) GetAvgChips() int32 {
	if cs.curmembernum != 0 {
		return cs.sumbankroll/cs.curmembernum
	}else{
		return cs.sumbankroll
	}
}

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
		log.Info("锦标赛%d 拆散桌子删除房间%d", cs.uid, roomuid)
		return true
	}
	return false
}

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

func (cs *ChampionShip) NotifyUserBlind(roommember map[int64]map[int64]int64) {
	send := &msg.RS2C_PushBlindChange{}
	send.Sblind = pb.Int32(cs.bconf.SBlind)
	send.Bblind = pb.Int32(cs.bconf.BBlind)
	send.Ante = pb.Int32(cs.bconf.PreBet)
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

func (cs *ChampionShip) GetFinalRank(uid int64) int32{
	for k, v := range cs.finalrank {
		if v == uid {
			return cs.maxuser - int32(k)
		}
	}
	return 0
}

func (cs *ChampionShip) AddUserRank(userid int64) {
	zMem := redis.Z{Score: float64(cs.GetUserBankRoll(userid)), Member: userid}
	Redis().ZAdd(fmt.Sprintf("csrank_%d", cs.uid), zMem)
	log.Info("锦标赛%d 玩家%d 更新比分%d", cs.uid, userid, cs.GetUserBankRoll(userid))
}

func (cs *ChampionShip) DelUserRank(userid int64) {
	Redis().ZRem(fmt.Sprintf("csrank_%d", cs.uid), fmt.Sprintf("%d", userid))
}

func (cs *ChampionShip) GetUserRank(userid int64) int32{
	rank := Redis().ZRevRank(fmt.Sprintf("csrank_%d", cs.uid), fmt.Sprintf("%d", userid)).Val()
	return int32(rank) + 1
}

func (cs *ChampionShip) CalcRank(roomuid int64) {
	room, ok := cs.roommember[roomuid]
	if !ok {
		return
	}
	for _, member := range room {
		cs.AddUserRank(member)
	}
	log.Info("锦标赛%d, 房间%d, 结算排行", cs.uid, roomuid)
}

func (cs *ChampionShip) GameOver() {
	cs.RewardAll()
	cs.SaveData()
	//cs.DestoryRoom()
	cs.state = CSDel
	log.Info("锦标赛%d 结束", cs.uid)
}

func (cs *ChampionShip) GetAwardByRank (rank int32) int32 {
	for _, v := range tbl.TChampionshipPrize.ChampionshipPrizeById {
		if cs.tconf.Prize == v.PrizeId && v.Start >= rank && rank <= v.End {
			return v.AwardId
		}
	}
	return 0	
}

func (cs *ChampionShip) ChampionNotify(name string, tid int32, aid int32) {
	txt := fmt.Sprintf("{\"0\":\"%s\",\"1\":%d,\"2\":%d,}", name, tid, aid)
	send := &msg.RS2GW_ChatInfo{}
	send.Chat = def.MakeChatInfo(def.ChatAll, txt, 0, "", def.MTTMsg, def.MsgShowAll)
	GateMgr().Broadcast(send)
}

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

func (cs *ChampionShip) DestoryRoom() {
	for ruid, _ := range cs.roommember {
		texas := RoomMgr().FindTexas(ruid)
		if texas != nil {
			texas.Destory(1)
		}
	}
}

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
		log.Info("锦标赛%d 写入玩家记录失败", cs.uid)
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
			log.Info("锦标赛%d 写入简单记录失败", cs.uid)
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
		log.Info("锦标赛%d 写入详细记录失败", cs.uid)
	}
}

func (cs *ChampionShip) GetMemberById(uid int64) *CSPlayer {
	if member, ok := cs.members[uid]; ok {
		return member
	}
	return nil
}

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

func (cs *ChampionShip) GetRankById(uid int64) int32 {
	rank := Redis().ZRevRank(fmt.Sprintf("csrank_%d", cs.uid), fmt.Sprintf("%d", uid))
	if rank.Err() == nil {
		return int32(rank.Val())+1
	}else {
		return 0
	}
}

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

func (cs *ChampionShip) AddRebuy(uid int64) {
	cs.members[uid].rebuy++
}

func (cs *ChampionShip) GetUserRebuy(uid int64) int32 {
	if member, ok := cs.members[uid]; ok {
		return member.rebuy
	}
	return 0
}

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

func (cs *ChampionShip) AddAddon(uid int64) {
	cs.members[uid].addon++
}

func (cs *ChampionShip) GetUserAddon(uid int64) int32 {
	if member, ok := cs.members[uid]; ok {
		return member.addon
	}
	return 0
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

type ChampionManager struct {
	championships map[int32]*ChampionShip
	ticker1s *util.GameTicker
	championovers map[int32]*ChampionShip
	lastinittime int32
}

func (cm *ChampionManager) Init() bool {
	cm.championships = make(map[int32]*ChampionShip)
	cm.championovers = make(map[int32]*ChampionShip)
	cm.ticker1s = util.NewGameTicker(time.Second, cm.Handler1sTick)
	cm.ticker1s.Start()
	cm.lastinittime = int32(util.CURTIME())
	//cm.InitChampionShip()
	return true
}

func (cm *ChampionManager) InitChampionShip() {
	if RoomSvr().Name() != tbl.Room.MTTRoomServer {
		return
	}
	for _, data := range tbl.TChampionship.ChampionshipById {
		start := SysTimerMgr().GetStartTimeByTimeId(data.TimeId, data.Type)
		cm.CreateChampionShip(data.Id, start)
	}
}

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
	log.Info("创建锦标赛%d %d 开始时间%d" , tid, cs.uid, start)
}

func (cm *ChampionManager) Handler1sTick(now int64) {
	if !util.IsSameDay(int64(cm.lastinittime), util.CURTIME()) {
		cm.InitChampionShip()
		cm.lastinittime = int32(util.CURTIME())
	}
}

func (cm *ChampionManager) Tick(now int64) {
	cm.ticker1s.Run(now)
	for key, cs := range cm.championships {
		cs.Tick(now)
		if cs.IsDel() {
			delete(cm.championships, key)
			log.Info("锦标赛%d 未开启删除", key)
		}
		if cs.IsOver() {
			//cm.championovers[key] = cs
			delete(cm.championships, key)
			log.Info("锦标赛%d 正常结束", key)
		}
	}
}

func (cm *ChampionManager) FindCShipById(uid int32) *ChampionShip {
	if cs, ok := cm.championships[uid]; ok {
		return cs
	}
	return nil
}

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
	log.Info("玩家%d 报名参加竞标赛%d", uid, cs.uid)
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
	log.Info("玩家%d 退出竞标赛%d", uid, cs.uid)
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
	lastroom, _ := Redis().Get(fmt.Sprintf("userinroom_%d", uid)).Int64()
	send.Lastid = pb.Int64(lastroom)
	RoomSvr().SendClientMsg(gid, uid, send)
	//log.Info("玩家[%d] gateid[%d] 请求房间列表", uid, gid)
}

func (cm *ChampionManager) ReqMTTRecordList(gid int, uid int64) {
	send := &msg.RS2C_RetMTTRecordList{}
	key := fmt.Sprintf("usercsrecord_%d", uid)
	rlist, err := Redis().LRange(key, 0, 10).Result()
	if err != nil {
		log.Info("玩家%d 请求最近列表失败", uid)
		return
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
		log.Info("锦标赛%d 请求详细列表失败", rev.GetRecordid())
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
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for k, v := range picklist {
		data := &msg.MTTRankInfo{}
		uidstr := v.Member.(string)
		userid,_ := strconv.ParseInt(uidstr, 10, 64)
		data.Roleid = pb.Int64(userid)
		data.Chips = pb.Int32(int32(v.Score))
		data.Rank = pb.Int32(int32(k + 1))
		send.Ranklist = append(send.Ranklist, data)
		key := fmt.Sprintf("charbase_%d", userid)
		pipe.HMGet(key, "name", "face", "sex")
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("批量读取玩家信息 redis 出错:%s", err)
		return
	}
	for k, v := range cmds {
		if v.Err() != nil && v.Err() == redis.Nil {
			log.Error("读取单个玩家信息 redis 出错:%s", v.Err())
			continue
		}
		vals, err2 := v.(*redis.SliceCmd).Result()
		if err2 != nil && err == redis.Nil {
			log.Error("读取单个玩家信息 redis 出错:%s", err2)
			continue
		}
		if len(vals) < 3 {
			log.Error("读取单个玩家信息 字段个数不对")
			continue
		}
		if name, ok := vals[0].(string); ok {
			send.Ranklist[k].Name = pb.String(name)
		}

		if head, ok := vals[1].(string); ok {
			send.Ranklist[k].Head = pb.String(head)
		}

		if sexstr, ok := vals[2].(string); ok {
			sex, _ := strconv.ParseInt(sexstr, 10, 32)
			send.Ranklist[k].Sex = pb.Int32(int32(sex))
		}
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

	log.Info("锦标赛%d 玩家%d 重购%d", cs.uid, uid, rev.GetType())
	RoomSvr().SendClientMsg(gid, uid, send)
}

