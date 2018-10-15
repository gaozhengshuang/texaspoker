package main

import (
	"time"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/log"
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
}

func (cs *ChampionShip) Init() bool {
	cs.memberroom = make(map[int64]int64)
	cs.roommember = make(map[int64]map[int64]int64)
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
	return true
}

func (cs *ChampionShip) Handler1sTick(now int64) {
	if !cs.IsStart() && int32(util.CURTIME()) > cs.starttime {
		if !cs.StartMatch() {
			cs.state = CSDel
		}
	}
}

func (cs *ChampionShip) IsStart() bool {
	if cs.state == CSGoing {
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
}

func (cs *ChampionShip) DelMember(uid int64) {
	if roomuid, ok := cs.memberroom[uid]; ok {
		if room, ok1 := cs.roommember[roomuid]; ok1 {
			delete(room, uid)
			cs.SetMinRoom()
		}
	}
	delete(cs.memberroom, uid)
}

func (cs *ChampionShip) GetRankById(uid int64) int32 {
	return 0
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
	cs.NotifyUser(cs.roommember)
	cs.state = CSGoing

	start := SysTimerMgr().GetStartTimeByTimeId(cs.tconf.TimeId)
	ChampionMgr().CreateChampionShip(cs.tid, start)
	return true
}

func (cs *ChampionShip) CreateRoom() {
	roomuid := RoomMgr().CreatTexasRoom(cs.tconf.RoomId, cs.uid)
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
			break
		}
		if len(dispatched) == len(cs.roommember){
			dispatched = make(map[int64]int64)
		}
	}
	cs.SetMinRoom()
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
			}
			if len(dispatched) == len(cs.roommember){
				dispatched = make(map[int64]int64)
			}
			cs.NotifyUser(tmproommember)
		}
	}
}

func (cs *ChampionShip) NotifyUser(roommember map[int64]map[int64]int64) {
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
	for _, cs := range cm.championships {
		cs.Tick(now)
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
	//Match().SendClientMsg(gid, uid, send)
}

func (cm *ChampionManager) ReqMTTJoin(gid int, uid int64, rev *msg.C2RS_ReqMTTJoin) {
	send := &msg.RS2C_RetMTTJoin{}
	cs, ok := cm.championships[rev.GetRecordid()]
	if !ok {
		send.Errcode = pb.String("比赛不存在")
		//Match().SendClientMsg(gid, uid, send)
		return
	}		
	if cs.IsMember(uid) {
		send.Errcode = pb.String("已经报名该比赛")
		//Match().SendClientMsg(gid, uid, send)
		return
	}
	cs.AddMember(uid)
	send.Recordid = pb.Int32(cs.uid)
	//Match().SendClientMsg(gid, uid, send)
	log.Info("玩家%d 报名参加竞标赛%d", uid, cs.uid)
}

func (cm *ChampionManager) ReqMTTQuit(gid int, uid int64, rev *msg.C2RS_ReqMTTQuit) {
	send := &msg.RS2C_RetMTTJoin{}
	cs, ok := cm.championships[rev.GetRecordid()]
	if !ok {
		send.Errcode = pb.String("比赛不存在")
		//Match().SendClientMsg(gid, uid, send)
		return
	}
	if !cs.IsMember(uid) {
		send.Errcode = pb.String("没有报名该比赛")
		//Match().SendClientMsg(gid, uid, send)
		return
	}
	cs.DelMember(uid)
	//Match().SendClientMsg(gid, uid, send)
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
	//Match().SendClientMsg(gid, uid, send)
}

func (cm *ChampionManager) ReqMTTRecordList(gid int, uid int64, rev *msg.C2RS_ReqMTTRecordList) {
}

