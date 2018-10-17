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
)

type ChampionShip struct {
	tconf *table.ChampionshipDefine
	rconf *table.TexasRoomDefine
	tid int32
	uid int32
	memberroom map[int64]int64				//玩家对应房间
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
	memberbankroll map[int64]int32			//玩家筹码
	maxuser int32
	sumbankroll int32						//总筹码
	curmembernum int32						//当前总人数
	finalrank []int64						//最终排名
	memberrebuy map[int64]int32				//重购次数
	memberaddon map[int64]int32				//
}

func (cs *ChampionShip) Init() bool {
	cs.memberroom = make(map[int64]int64)
	cs.roommember = make(map[int64]map[int64]int64)
	cs.memberbankroll = make(map[int64]int32)
	cs.memberrebuy = make(map[int64]int32)
	cs.memberaddon = make(map[int64]int32)
	cs.finalrank = make([]int64, 0)
	tconf, ok := tbl.TChampionship.ChampionshipById[cs.tid]
	if ok == false {
		log.Error("[锦标赛] not found Championship tconf[%d]", cs.tid)
		return false
	}
	cs.tconf = tconf
	rconf, ok := tbl.TexasRoomBase.TexasRoomById[cs.tid]
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
		room.bigblindnum = cs.bconf.SBlind
		room.smallblindnum = cs.bconf.BBlind
		room.preblindnum = cs.bconf.PreBet
	}
}

func (cs *ChampionShip) Handler1sTick(now int64) {
	if !cs.IsStart() {
		if int32(util.CURTIME()) > cs.starttime {
			if !cs.StartMatch() {
				cs.state = CSDel
			} else {
				cs.state = CSGoing
			}
		}
	} else {
		cs.BlindTick()
	}
}

func (cs *ChampionShip) GetUserRoom(userid int64) int64 {
	if room, ok := cs.memberroom[userid]; ok {
		return room
	}
	return 0
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
	_, ok := cs.memberroom[uid]
	if ok {
		return true
	}
	return false
}

func (cs *ChampionShip) AddMember(uid int64) {
	cs.memberroom[uid] = 0
	cs.memberbankroll[uid] = cs.tconf.InitialChips
	cs.memberrebuy[uid] = 0
	cs.memberaddon[uid] = 0
}

func (cs *ChampionShip) DelMember(uid int64) {
	if roomuid, ok := cs.memberroom[uid]; ok {
		if room, ok1 := cs.roommember[roomuid]; ok1 {
			delete(room, uid)
			cs.SetMinRoom()
		}
	}
	delete(cs.memberroom, uid)
	delete(cs.memberbankroll, uid)
	delete(cs.memberrebuy, uid)
	delete(cs.memberaddon, uid)
	if cs.IsStart() {
		cs.finalrank = append(cs.finalrank, uid)
		if len(cs.memberroom) == 1 {
			cs.GameOver()
		}
	}
}

func (cs *ChampionShip) StartMatch() bool {
	if int32(len(cs.memberroom)) < cs.tconf.SNum {
		log.Info("锦标赛%d 由于人数不足不能开启", cs.uid)
		return false
	}
	seatnum := cs.rconf.Seat
	sumnum := int32(len(cs.memberroom))
	var curnum int32 = 0
	for {
		if curnum > sumnum{
			break
		}else{
			curnum += seatnum
			cs.CreateRoom()
		}
	}
	cs.DispatchRoom()
	cs.NotifyUserRoom(cs.roommember)
	cs.state = CSGoing

	start := SysTimerMgr().GetStartTimeByTimeId(cs.tconf.TimeId)
	ChampionMgr().CreateChampionShip(cs.tid, start)
	return true
}

func (cs *ChampionShip) CreateRoom() {
	roomuid := RoomMgr().CreatTexasRoomForChampion(cs.tconf.RoomId, cs)
	if roomuid != 0 {
		if _, ok := cs.roommember[roomuid]; !ok {
			roomuser := make(map[int64]int64)
			cs.roommember[roomuid] = roomuser
		}
	}
}

func (cs *ChampionShip) DispatchRoom() {
	dispatched := make(map[int64]int64)
	for member, _ := range cs.memberroom {
		for key, room := range cs.roommember {
			if _, ok := dispatched[key]; ok {
				continue
			}
			if int32(len(room)) >= cs.rconf.Seat {
				continue
			}
			cs.memberroom[member] = key
			room[member] = member
			dispatched[key] = key
			cs.maxuser++
			cs.sumbankroll += cs.memberbankroll[member] 
			cs.curmembernum++ 
			cs.JoinOneMatch(member, key)
			cs.AddUserRank(member)
			break
		}
		if len(dispatched) == len(cs.roommember){
			dispatched = make(map[int64]int64)
		}
	}
	cs.SetMinRoom()
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
		texas.UserEnter(u)
		texas.SetPlayerBankRoll(userid, cs.memberbankroll[userid])
	}
}

func (cs *ChampionShip) UpdateUserBankRoll(userid int64, num int32) {
	cs.memberbankroll[userid] = num
}

func (cs *ChampionShip) UserGameOver(userid int64) {
	send := &msg.RS2C_PushMTTWeedOut{}
	send.Rank = pb.Int32(cs.GetFinalRank(userid))
	send.Join = pb.Int32(cs.maxuser)
	send.Maxrank = pb.Int32(0)
	send.Recordid = pb.Int32(cs.uid)
	send.Id = pb.Int32(0)
	u := UserMgr().FindUser(userid)
	if u != nil {
		u.SendClientMsg(send)
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

func (cs *ChampionShip) ReDispatchRoom(roomuid int64) {
	room, ok := cs.roommember[roomuid]
	if !ok {
		return
	}
	if int32(len(room)) > cs.minroomnum {
		return
	}
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
		var tmproommember map[int64]map[int64]int64
		for _, m := range tmpmember {
			for key, tmproom := range cs.roommember {
				if _, ok := dispatched[key]; ok {
					continue
				}
				if int32(len(tmproom)) >= cs.rconf.Seat {
					continue
				}
				tmproom[m] = m
				cs.memberroom[m] = key
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
			cs.NotifyUserRoom(tmproommember)
		}
	}
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
	for _, room := range roommember {
		for _, member := range room {
			u := UserMgr().FindUser(member)
			if u != nil {
				u.SendClientMsg(send)
			}
		}
	}
}

func (cs *ChampionShip) GetFinalRank(uid int64) int32{
	for k, v := range cs.finalrank {
		if v == uid {
			return int32(len(cs.finalrank) - k)
		}
	}
	return 0
}

func (cs *ChampionShip) AddUserRank(userid int64) {
	bankroll, ok := cs.memberbankroll[userid]
	if !ok {
		return
	}
	zMem := redis.Z{Score: float64(bankroll), Member: userid}
	Redis().ZAdd(fmt.Sprintf("csrank_%d", cs.uid), zMem)
}

func (cs *ChampionShip) CalcRank(roomuid int64) {
	room, ok := cs.roommember[roomuid]
	if !ok {
		return
	}
	for _, member := range room {
		cs.AddUserRank(member)
	}
}

func (cs *ChampionShip) GameOver() {
	cs.RewardAll()
	cs.SaveData()
	cs.state = CSDel
}

func (cs *ChampionShip) RewardAll() {
}

func (cs *ChampionShip) SaveData() {
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
	if cs.memberrebuy[uid] >= cs.tconf.Rebuy {
		return false
	}
	return true
}

func (cs *ChampionShip) AddRebuy(uid int64) {
	cs.memberrebuy[uid] = cs.memberrebuy[uid]+1
}

func (cs *ChampionShip) CanAddon(uid int64) bool {
	if !cs.IsMember(uid) {
		return false
	}
	if cs.bconf.Addon != 1 {
		return false
	}
	if cs.memberaddon[uid] >= cs.tconf.Addon {
		return false
	}
	return true
}

func (cs *ChampionShip) AddAddon(uid int64) {
	cs.memberaddon[uid] = cs.memberaddon[uid]+1
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

type ChampionManager struct {
	championships map[int32]*ChampionShip
	ticker1s *util.GameTicker
}

func (cm *ChampionManager) Init() bool {
	cm.championships = make(map[int32]*ChampionShip)
	cm.ticker1s = util.NewGameTicker(time.Second, cm.Handler1sTick)
	cm.ticker1s.Start()
	cm.InitChampionShip()
	return true
}

func (cm *ChampionManager) InitChampionShip() {
	for _, data := range tbl.TChampionship.ChampionshipById {
		start := SysTimerMgr().GetStartTimeByTimeId(data.TimeId)
		cm.CreateChampionShip(data.Id, start)
	}
}

func (cm *ChampionManager) CreateChampionShip(tid int32, start int32) {
	if start == 0 {
		return
	}
	cs := &ChampionShip{}
	cs.tid = tid
	cs.Init()
	uuid , _ := def.GenerateMatchId(Redis())
	cs.uid = int32(uuid)
	cs.starttime = start
	cm.championships[cs.uid] = cs
}

func (cm *ChampionManager) Handler1sTick(now int64) {
}

func (cm *ChampionManager) Tick(now int64) {
	cm.ticker1s.Run(now)
	for key, cs := range cm.championships {
		cs.Tick(now)
		if cs.IsDel() {
			delete(cm.championships, key)
		}
	}
}

func (cm *ChampionManager) FindCShipById(uid int32) *ChampionShip {
	if cs, ok := cm.championships[uid]; ok {
		return cs
	}
	return nil
}

func (cm *ChampionManager) ReqMMTList(gid int, uid int64) {
	send := &msg.RS2C_RetMTTList{}
	for _, cs := range cm.championships {
		if !cs.CanShow() {
			continue
		}
		mmt := &msg.MTTInfo{}
		mmt.Id = pb.Int32(cs.tconf.Id)
		mmt.Starttime = pb.Int32(cs.starttime)
		mmt.Join = pb.Int32(int32(len(cs.memberroom)))
		mmt.Recordid = pb.Int32(cs.uid)
		send.Mttlist = append(send.Mttlist, mmt)
	}
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
	cs.AddMember(uid)
	send.Recordid = pb.Int32(cs.uid)
	RoomSvr().SendClientMsg(gid, uid, send)
	log.Info("玩家%d 报名参加竞标赛%d", uid, cs.uid)
}

func (cm *ChampionManager) ReqMTTQuit(gid int, uid int64, rev *msg.C2RS_ReqMTTQuit) {
	send := &msg.RS2C_RetMTTJoin{}
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
		mmt := &msg.JoinedMTTInfo{}
		mmt.Id = pb.Int32(cs.tconf.Id)
		mmt.Starttime = pb.Int32(cs.starttime)
		mmt.Join = pb.Int32(int32(len(cs.memberroom)))
		mmt.Recordid = pb.Int32(cs.uid)
		send.Mttlist = append(send.Mttlist, mmt)
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
	log.Info("玩家%d gid%d 请求房间列表", uid, gid)
}

func (cm *ChampionManager) ReqMTTRecordList(gid int, uid int64) {
	send := &msg.RS2C_RetMTTRecordList{}
	key := fmt.Sprintf("usercsrecord_%d", uid)
	rlist, err := Redis().LRange(key, 0, 10).Result()
	if err != nil {
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
		return
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
	} else {
		if cs.CanAddon(uid) {
			texas.AddAddon(uid, cs.tconf.AddonChips, cs.tconf.AddonCost)
		}else{
			send.Errcode = pb.String("不能Addon")
		}
	}
	RoomSvr().SendClientMsg(gid, uid, send)
}

