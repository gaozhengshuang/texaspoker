package main

import (
	"time"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	"gitee.com/jntse/gotoolkit/util"
	//"gitee.com/jntse/gotoolkit/log"
)

type ChampionShip struct {
	tconf *table.ChampionshipDefine
	uid int32
	member[]int64
	starttime int32
	endtime int32
	blindnum int32
	roommember map[int64]map[int64]int64
	ticker1s *util.GameTicker
}

func (cs *ChampionShip) Init() bool {
	cs.roommember = make(map[int64]map[int64]int64)
	cs.ticker1s = util.NewGameTicker(time.Second, cs.Handler1sTick)
	cs.ticker1s.Start()
	return true
}

func (cs *ChampionShip) Handler1sTick(now int64) {

}

func (cs *ChampionShip) Tick(now int64) {
	cs.ticker1s.Run(now)
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
		if start == 0 {
			continue
		}
		cs := &ChampionShip{}
		cs.tconf = data
		uuid , _ := def.GenerateMatchId(Redis())
		cs.uid = int32(uuid)
		cs.starttime = SysTimerMgr().GetStartTimeByTimeId(data.TimeId)
		cm.championships[cs.uid] = cs
	}
}

func (cm *ChampionManager) Handler1sTick(now int64) {
}

func (cm *ChampionManager) Tick(now int64) {
	cm.ticker1s.Run(now)
	for _, cs := range cm.championships {
		cs.Tick(now)
	}
}

func (cm *ChampionManager) ReqMMTList() {
}

