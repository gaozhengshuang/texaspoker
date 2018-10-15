package main

import (
	"time"
	"gitee.com/jntse/gotoolkit/util"
	_"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/server/tbl"
	//"gitee.com/jntse/minehero/server/tbl/excel"
)

type SysTimer struct {
	uid int32
	timeid int32
	subid int32

	startyear int
	startmonth int
	startday int
	starthour int
	startmin int
	startsec int

	endyear int
	endmonth int
	endday int
	endhour int
	endmin int
	endsec int

	timetype int32
}

func (st *SysTimer) GetStartTime() int64 {
	now := time.Now()
	year := st.startyear
	if year == 0 {
		year = now.Year()
	}
	month := st.startmonth
	if month == 0 {
		month = int(now.Month())
	}
	day := st.startday
	if day == 0 {
		day = now.Day()
	}
	hour := st.starthour
	if hour == 0 {
		hour = now.Hour()
	}
	min := st.startmin
	if min == 0 {
		min = now.Minute()
	}
	sec := st.startsec
	if sec == 0 {
		sec = now.Second()
	}
	start := time.Date(year, time.Month(month), day, hour, min, sec, 0, time.Local)
	return start.Unix()
}

/////////////////////////////////////////////////////////////////////////////////////////////

type SysTimerManager struct {
	timers []*SysTimer
	ticker1s *util.GameTicker
	starttimeid map[int32]int32
	endtimeid map[int32]int32
	maxsubid map[int32]int32
	timersmap map[int32]*SysTimer
}

func (stm *SysTimerManager) Init() bool{
	stm.timers = make([]*SysTimer, 0)
	stm.starttimeid = make(map[int32]int32)
	stm.endtimeid = make(map[int32]int32)
	stm.maxsubid = make(map[int32]int32)
	stm.timersmap = make(map[int32]*SysTimer)
	stm.ticker1s = util.NewGameTicker(time.Second, stm.Handler1sTick)
	stm.ticker1s.Start()
	stm.InitTimer()
	return true
}

func (stm *SysTimerManager) InitTimer() {
	for _, t := range tbl.TSystemTime.SystemTimeById {
		tmptime := &SysTimer{}
		tmptime.uid = t.Id
		tmptime.timeid = t.TimeId
		tmptime.subid = t.SubId
		if len(t.Start) == 7 {
			tmptime.startyear = int(t.Start[0])
			tmptime.startmonth = int(t.Start[1])
			tmptime.startday = int(t.Start[2])
			tmptime.starthour = int(t.Start[3])
			tmptime.startmin = int(t.Start[4])
			tmptime.startsec = int(t.Start[5])
			tmptime.timetype = t.Start[6]
		}
		if len(t.End) == 7 {
			tmptime.endyear = int(t.End[0])
			tmptime.endmonth = int(t.End[1])
			tmptime.endday = int(t.End[2])
			tmptime.endhour = int(t.End[3])
			tmptime.endmin = int(t.End[4])
			tmptime.endsec = int(t.End[5])
		}	
		stm.timers = append(stm.timers, tmptime)
		stm.timersmap[t.TimeId*100+t.SubId] = tmptime
		if _, ok := stm.maxsubid[t.Id]; ok {
			if stm.maxsubid[t.Id] < t.SubId {
				stm.maxsubid[t.Id] = t.SubId
			}
		}else{
			stm.maxsubid[t.Id] = t.SubId
		}
	}
}

func (stm *SysTimerManager) InStartTime(timeid int32) bool {
	if _, ok := stm.starttimeid[timeid]; ok {
		return true
	}
	return false
}

func (stm *SysTimerManager) InEndTime(timeid int32) bool {
	if _, ok := stm.endtimeid[timeid]; ok {
		return true
	}   
	return false
}

func (stm *SysTimerManager) Tick(now int64) {
	stm.ticker1s.Run(now)
}

func (stm *SysTimerManager) GetStartTimeByTimeId(timeid int32) int32 {
	if _, ok := stm.maxsubid[timeid]; !ok {
		return 0
	}
	now := time.Now().Unix() 
	for i := 1; i <= int(stm.maxsubid[timeid]); i++ {
		systimer , ok := stm.timersmap[timeid*100+int32(i)]
		if !ok {
			continue
		}
		start := systimer.GetStartTime() 
		if now < start {
			return int32(start)
		}
	}
	return 0
}

func (stm *SysTimerManager) Handler1sTick(now int64) {
	stm.starttimeid = make(map[int32]int32)
	stm.endtimeid = make(map[int32]int32)
	nowtime := time.Now()
	for _, t := range stm.timers {
		if t.startyear != 0 && t.startyear != nowtime.Year(){
			continue
		}
		if t.startmonth != 0 && t.startmonth != int(nowtime.Month()){
			continue
		}
		if t.startday != 0 && t.startyear != nowtime.Day(){
			continue
		}
		if t.starthour != 0 && t.startyear != nowtime.Hour(){
			continue
		}
		if t.startmin != 0 && t.startyear != nowtime.Minute(){
			continue
		}
		if t.startsec != 0 && t.startsec != nowtime.Second(){
			continue
		}
		stm.starttimeid[t.timeid] = t.timeid
		//log.Info("系统定时器 添加开始时间%d subid%d", t.timeid, t.subid)
	}
	for _, t := range stm.timers {
		if t.endyear != 0 && t.endyear != nowtime.Year(){
			continue
		}
		if t.endmonth != 0 && t.endmonth != int(nowtime.Month()){
			continue
		}
		if t.endday != 0 && t.endyear != nowtime.Day(){
			continue
		}
		if t.endhour != 0 && t.endyear != nowtime.Hour(){
			continue
		}
		if t.endmin != 0 && t.endyear != nowtime.Minute(){
			continue
		}
		if t.endsec != 0 && t.endsec != nowtime.Second(){
			continue
		}
		stm.endtimeid[t.timeid] = t.timeid
		//log.Info("系统定时器 添加结束时间%d subid%d", t.timeid, t.subid)
	}
}
