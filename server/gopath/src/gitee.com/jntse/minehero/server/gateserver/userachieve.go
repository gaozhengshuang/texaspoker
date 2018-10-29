package main

import (
	"fmt"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"strconv"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"strings"
	"time"
)

const (
	AchieveGroup_Gold = 101		//拥有金币数
	AchieveGroup_Friend = 121 	//拥有好友数
	AchieveGroup_Level = 141	//等级
	AchieveGroup_OnePair = 161 	//以对子胜出牌局数
	AchieveGroup_TwoPairs = 181 //以两对胜出牌局数
	AchieveGroup_ThreeOfAKind = 201 //以三条胜出牌局数
	AchieveGroup_Straight = 221 //以顺子胜出牌局数
	AchieveGroup_Flush = 241 	//以同花胜出牌局数
	AchieveGroup_FullHouse = 261 //以葫芦胜出牌局数
	AchieveGroup_FourOfAKind = 281 //以四条胜出牌局数
	AchieveGroup_StraightFlush = 301 //以四条胜出牌局数
	AchieveGroup_RoyalFlush = 321 //以皇家同花顺胜出牌局数
	AchieveGroup_TexasPlay1 = 1001 //在德州扑克初级场对局数
	AchieveGroup_TexasPlay2 = 1021 //在德州扑克中级场对局数
	AchieveGroup_TexasPlay3 = 1041 //德州扑克高级场对局数
	AchieveGroup_MTTPlay = 1061 //锦标赛参与场数
	AchieveGroup_BaiRenPlay1 = 1081 //参与百人大战欢乐场数
	AchieveGroup_BaiRenPlay2 = 1101 //参与百人大战富豪场数
	AchieveGroup_TexasWin = 2001 //在德州扑克内赢局数
	AchieveGroup_MTTWin = 2021 	 //在MTT锦标赛夺冠数
	AchieveGroup_BaiRenWin = 2041 //百人大战胜利数
	AchieveGroup_LevelEx = 3001  //等级跟Level一样只是多了一份成就
)

func (u *GateUser) GetAchieveProcessMap (userid int64) map[int32]int32 {
	data := make(map[int32]int32)
	cmdmap, err := Redis().HGetAll(fmt.Sprintf("%s_%d", def.AchieveProcess, userid)).Result()
	if err == nil {
		for k,v := range cmdmap {
			groupid := util.Atoi(k)
			process := util.Atoi(v)
			data[groupid] = process
		}
	}
	return data
}

func (u *GateUser) GetAchieveTakenList(userid int64) []int32 {
	data := make([]int32, 0)
	cmdlist, err := Redis().SMembers(fmt.Sprintf("%s_%d", def.AchieveToken, userid)).Result()
	if err == nil && len(cmdlist) > 0 {
		for _, v := range cmdlist {
			taskid := util.Atoi(v)
			data = append(data, taskid)
		}
	}
	return data
}

func (u *GateUser) GetAchieveProcessByGroup (groupid int32) int64 {
	_, find := tbl.AchieveBase.AchieveById[groupid]
	if find == false {
		log.Error("玩家[%d %s] 获取成就组进度未找到配置 groupid:%d", u.Id(), u.Name(), groupid)
		return 0
	}
	strgroup := strconv.FormatInt(int64(groupid), 10)
	cmdval, err := Redis().HGet(fmt.Sprintf("%s_%d", def.AchieveProcess, u.Id()), strgroup).Result()
	if err == nil {
		return util.Atol(cmdval)
	}
	return 0
}

func (u *GateUser) SetAchieveProcessByGroup (groupid int32, process int64) bool {
	_, find := tbl.AchieveBase.AchieveById[groupid]
	if find == false {
		log.Error("玩家[%d %s] 设置成就组进度未找到配置 groupid:%d", u.Id(), u.Name(), groupid)
		return false
	}
	strgroup := strconv.FormatInt(int64(groupid), 10)
	strprocess := strconv.FormatInt(process, 10)
	Redis().HSet(fmt.Sprintf("%s_%d", def.AchieveProcess, u.Id()), strgroup, strprocess)	
	return true
}

//获取某项成就的领取状态
func (u *GateUser) GetAchieveTokenState (taskid int32) int32 {
	_, find := tbl.AchieveBase.AchieveById[taskid]
	if find == false {
		log.Error("玩家[%d %s] 获取成就领取状态未找到配置 taskid:%d", u.Id(), u.Name(), taskid)
		return 0
	}
	strtaskid := strconv.FormatInt(int64(taskid), 10)
	cmdbool, err := Redis().SIsMember(fmt.Sprintf("%s_%d", def.AchieveToken, u.Id()), strtaskid).Result()
	if err == nil && cmdbool == true{
		return 1
	} else {
		return 0
	}
}

//设置某项成就的状态为领取
func (u *GateUser) SetAchieveTokenState (taskid int32) bool {
	_, find := tbl.AchieveBase.AchieveById[taskid]
	if find == false {
		log.Error("玩家[%d %s] 设置成就领取标记未找到配置 taskid:%d", u.Id(), u.Name(), taskid)
		return false
	}
	strtaskid := strconv.FormatInt(int64(taskid), 10)
	_, erradd := Redis().SAdd(fmt.Sprintf("%s_%d", def.AchieveToken, u.Id()), strtaskid).Result()
	return erradd == nil
}


func (u *GateUser) OnAchieveProcessChanged(group int32) {
	process := u.GetAchieveProcessByGroup(group)
	if group == AchieveGroup_Gold {
		gold := u.GetGold()
		if gold > process {
			u.SetAchieveProcessByGroup(group, gold)
			Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "maxgold", gold)
		}
	} else if group == AchieveGroup_Friend {
		friendnum := u.friends.Size()
		if int64(friendnum) > process {
			u.SetAchieveProcessByGroup(group, int64(friendnum))
		}
		Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "friendnum", friendnum)
	} else if group == AchieveGroup_Level || group == AchieveGroup_LevelEx {
		level := u.Level()
		if int64(level) > process {
			u.SetAchieveProcessByGroup(int32(AchieveGroup_Level), int64(level))
			u.SetAchieveProcessByGroup(int32(AchieveGroup_LevelEx), int64(level))
		}
	} else {
		u.SetAchieveProcessByGroup(group, process + 1)
	}
}


//日常每日任务重置
func (u *GateUser) ResetAchieve(cleartype int32){
	processmap := u.GetAchieveProcessMap(u.Id())
	resetlist := make([]string, 0)
	for group, _ := range processmap {
		conf, find := tbl.AchieveBase.AchieveById[group]
		if find == true && conf.DailyQuest == cleartype {
			strtmp := strconv.FormatInt(int64(group), 10)
			resetlist = append(resetlist, strtmp)
		}
	}
	if len(resetlist) > 0 {
		Redis().HDel(fmt.Sprintf("%s_%d", def.AchieveProcess, u.Id()), resetlist...)
	}
	takelist := u.GetAchieveTakenList(u.Id())
	resetlist2 := make([]interface{}, 0)
	for _, taskid := range takelist {
		conf, find := tbl.AchieveBase.AchieveById[taskid]
		if find == true && conf.DailyQuest == cleartype {
			strtmp := strconv.FormatInt(int64(taskid), 10)
			resetlist2 = append(resetlist2, strtmp)
		}
	}
	if len(resetlist2) > 0 {
		Redis().SRem(fmt.Sprintf("%s_%d", def.AchieveToken, u.Id()), resetlist2...)
	}
}

//常每日任务重置
func (u *GateUser) DailyResetAchieve() {
	u.ResetAchieve(1)
	u.ResetDailyLuckyTask()
}

//周常每周任务重置
func (u *GateUser) WeekResetAchieve() {
	u.ResetAchieve(2)
}

//客户端拉取成就信息
func (u *GateUser) OnReqAhcieveInfo(roleid int64) {
	processmap := u.GetAchieveProcessMap(roleid)
	takelist := u.GetAchieveTakenList(roleid)
	send := &msg.GW2C_RetAchieveInfo{}
	for _, v := range takelist {
		tmp := &msg.AchieveList{}
		tmp.Id = pb.Int32(v)
		tmp.Istake = pb.Int32(1)
		send.Achievelist = append(send.Achievelist, tmp)
	}

	for k, v := range processmap {
		tmp := &msg.AchieveGroup{}
		tmp.Groupid = pb.Int32(k)
		tmp.Process = pb.Int32(v)
		send.Grouplist = append(send.Grouplist, tmp)
	}
	u.SendMsg(send)
}

//客户端请求成就领奖
func (u *GateUser) OnReqTakeAchieveAward(taskid int32) string {
	errcode := ""
	if u.GetAchieveTokenState(taskid) == 1 {
		//已经领过
		errcode = "已经领过"
	} else {
		conf, find := tbl.AchieveBase.AchieveById[taskid]
		if find == true {
			if u.GetAchieveProcessByGroup(conf.Group) >= int64(conf.Para1) {
				//这里设置领取状态并且发奖
				if u.SetAchieveTokenState(taskid) == true {
					if len(conf.RewardId) > 0 && len(conf.RewardId) == len(conf.RewardNum){
						i := 0
						for i < len(conf.RewardId){
							u.AddItem(conf.RewardId[int32(i)], int64(conf.RewardNum[int32(i)]), "任务成就领奖", true)
							i = i + 1
						}
					}
				}
			} else {
				errcode = "未达到目标"
			}
		} else {
			errcode = "未找到配置"
		}
	}
	return errcode
}

func (u *GateUser) OnReqPlayerRoleInfo(roleid int64) {
	send := &msg.GW2C_RetPlayerRoleInfo{}
	send.Roleid = pb.Int64(roleid)
	cmdmap, err := Redis().HGetAll(fmt.Sprintf("charbase_%d", roleid)).Result()
	if err == nil {
		for k, v := range cmdmap {

			switch k {
				case "diamond":
					send.Diamond = pb.Int32(util.Atoi(v))
				case "gold":
					send.Gold = pb.Int32(util.Atoi(v))
				case "name":
					send.Name = pb.String(v)
				case "head":
					send.Head = pb.String(v)
				case "sex":
					send.Sex = pb.Int32(util.Atoi(v))
				case "level":
					send.Level = pb.Int32(util.Atoi(v))
				case "exp":
					send.Exp = pb.Int32(util.Atoi(v))
				case "sign":
					send.Sign = pb.String(v)
				case "age":
					send.Age = pb.Int32(util.Atoi(v))
				default:
			}
		}
	}

	cmdmap2, err2 := Redis().HGetAll(fmt.Sprintf("charstate_%d", roleid)).Result()
	if err2 == nil {
		for k, v := range cmdmap2 {
			switch k {
				case "createdtime":
					send.Createdtime = pb.Int32(util.Atoi(v))
				case "maxgold":
					send.Maxgold = pb.Int32(util.Atoi(v))
				case "maxgoldonetimes":
					send.Maxgoldonetimes = pb.Int32(util.Atoi(v))
				case "friendnum":
					send.Friendnum = pb.Int32(util.Atoi(v))
				case "gametimes":
					send.Gametimes = pb.Int32(util.Atoi(v))
				case "wintimes":
					send.Wintimes = pb.Int32(util.Atoi(v))
				case "gametimes2":
					send.Gametimes2 = pb.Int32(util.Atoi(v))
				case "wintimes2":
					send.Wintimes2 = pb.Int32(util.Atoi(v))
				case "championtimes":
					send.Championtimes = pb.Int32(util.Atoi(v))
				case "mttjointimes":
					send.Mttjointimes = pb.Int32(util.Atoi(v))
				case "roomtype":
					send.Stateid = pb.Int32(util.Atoi(v))
				case "roomid":
					send.Stateconfid = pb.Int32(util.Atoi(v))
				case "entrytimes":
					send.Entrytimes = pb.Int32(util.Atoi(v))
				case "entrytimes2":	
					send.Entrytimes2 = pb.Int32(util.Atoi(v))
				case "showdowntimes": 
					send.Showdowntimes = pb.Int32(util.Atoi(v))
				case "showdowntimes2": 
					send.Showdowntimes2 = pb.Int32(util.Atoi(v))
				case "maxhand":
					maxhandstr := strings.Split(v, "|")
					for _, m := range maxhandstr {
						send.Maxhand = append(send.Maxhand, util.Atoi(m))
					}
				default:
			}
		}
	}
	u.SendMsg(send)
}

//检查幸运任务可接取 
func (u *GateUser) CheckTakeLuckyTask () int32 {
	if u.GetUserLuckyTask()	> 0 && u.IsTakeLuckyTaskToday() > 0 {
		return 0
	}
	conf1, find1 := tbl.LuckyTaskBase.LuckyTaskById[1]
	conf2, find2 := tbl.LuckyTaskBase.LuckyTaskById[2]
	conf3, find3 := tbl.LuckyTaskBase.LuckyTaskById[3]
	if find1 == false || find2 == false || find3 == false {
		return 0
	}
	nowClock, _, _ := time.Now().Clock()
	bTimeOk := false
	for _, v := range conf1.Time {
		if int32(nowClock) == v{
			bTimeOk = true
			break
		}
	}
	if bTimeOk == false {
		return 0
	}
	gold := u.GetGold()
	totalplay := u.GetTotalPlay()
	if gold >= int64(conf3.Gold[0]) {
		if u.GetNowLuckyTaskTakeCount(3) > conf3.MaxTake {
			return 0
		}
		if (totalplay < conf3.TotalPlay) || (conf3.YesterdayPlay > 0 && u.GetYesterdayPlay() < conf3.YesterdayPlay) || (conf3.ThreedayPlay > 0 && u.GetThreedayPlay() < conf3.ThreedayPlay) {
			return 0
		}
		u.TakeLuckyTask(3)
		return conf3.TaskId
	} else if gold >= int64(conf2.Gold[0]) && gold < int64(conf2.Gold[1]) {
		if u.GetNowLuckyTaskTakeCount(2) > conf2.MaxTake {
			return 0
		}
		if (totalplay < conf2.TotalPlay) || (conf2.YesterdayPlay > 0 && u.GetYesterdayPlay() < conf2.YesterdayPlay) || (conf2.ThreedayPlay > 0 && u.GetThreedayPlay() < conf2.ThreedayPlay) {
			return 0
		}
		u.TakeLuckyTask(2)
		return conf2.TaskId
	} else if gold >= int64(conf1.Gold[0]) && gold < int64(conf1.Gold[1]) {
		if u.GetNowLuckyTaskTakeCount(1) > conf1.MaxTake {
			return 0
		}
		if (totalplay < conf1.TotalPlay) || (conf1.YesterdayPlay > 0 && u.GetYesterdayPlay() < conf1.YesterdayPlay) || (conf1.ThreedayPlay > 0 && u.GetThreedayPlay() < conf1.ThreedayPlay) {
			return 0
		}
		u.TakeLuckyTask(1)
		return conf1.TaskId
	}
	return 0
}


//获取累计对局数
func (u *GateUser) GetTotalPlay() int32 {
	cmdval, err := Redis().HGet(fmt.Sprintf("charstate_%d", u.Id()), "gametimes").Result()
	if err == nil {
		return util.Atoi(cmdval)
	}
	return 0
}

//获取前一天对局数
func (u *GateUser) GetYesterdayPlay() int32 {
	nowTime := time.Now()
	yesTime := nowTime.AddDate(0,0,-1)
	yesdate := yesTime.Format("2006-01-02")
	cmdval, err := Redis().Get(fmt.Sprintf("charplay_%d_%s", u.Id(), yesdate)).Result()
	if err == nil {
		return util.Atoi(cmdval)
	}
	return 0
}

//获取前三天平局对局数
func (u *GateUser) GetThreedayPlay() int32 {
	nowTime := time.Now()
	var play int32
	time1 := nowTime.AddDate(0,0,-1)
	cmdval1, err1 := Redis().Get(fmt.Sprintf("charplay_%d_%s", u.Id(), time1.Format("2006-01-02"))).Result()
	if err1 == nil {
		play = play + util.Atoi(cmdval1)
	}
	time2 := nowTime.AddDate(0,0,-2)
	cmdval2, err2 := Redis().Get(fmt.Sprintf("charplay_%d_%s", u.Id(), time2.Format("2006-01-02"))).Result()
	if err2 == nil {
		play = play + util.Atoi(cmdval2)
	}
	time3 := nowTime.AddDate(0,0,-3)
	cmdval3, err3 := Redis().Get(fmt.Sprintf("charplay_%d_%s", u.Id(), time3.Format("2006-01-02"))).Result()
	if err3 == nil {
		play = play + util.Atoi(cmdval3)
	}

	return int32(play/3)
}

//获取当前时段幸运任务接取的人数
func (u *GateUser) GetNowLuckyTaskTakeCount (taskttype int32) int32 {
	nowTime := time.Now()
	datetime := nowTime.Format("2006-01-02")
	hour, _, _ := nowTime.Clock()
	cmdval, err := Redis().Get(fmt.Sprintf("luckytasknum_%s_%d_%d",  datetime, hour, taskttype)).Result()
	if err == nil {
		return util.Atoi(cmdval)
	}
	return 0
}

//接取幸运任务
func (u *GateUser) TakeLuckyTask(taskttype int32) {
	
	Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "curluckytask", taskttype)
	Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "isluckytaketoday", 1)
	conf, find := tbl.LuckyTaskBase.LuckyTaskById[taskttype]
	if find == true {
		strgroup := strconv.FormatInt(int64(conf.TaskId), 10)
		Redis().HSet(fmt.Sprintf("%s_%d", def.AchieveProcess, u.Id()), strgroup, 0)
	}
	//增加接取人数
	nowTime := time.Now()
	datetime := nowTime.Format("2006-01-02")
	hour, _, _ := nowTime.Clock()
	num, err := Redis().Incr(fmt.Sprintf("luckytasknum_%s_%d_%d",  datetime, hour, taskttype)).Result()
	if err == nil && num == 1 {
		Redis().Expire(fmt.Sprintf("luckytasknum_%s_%d_%d",  datetime, hour, taskttype), 3600*time.Second)
	}
}

//获取当前接的幸运任务
func (u *GateUser) GetUserLuckyTask() int32 {
	cmdval, err := Redis().HGet(fmt.Sprintf("charstate_%d", u.Id()), "curluckytask").Result()
	if err == nil {
		return util.Atoi(cmdval)
	}
	return 0
}

//今日是否接取过幸运任务
func (u *GateUser) IsTakeLuckyTaskToday() int32 {
	cmdval, err := Redis().HGet(fmt.Sprintf("charstate_%d", u.Id()), "isluckytaketoday").Result()
	if err == nil {
		return util.Atoi(cmdval)
	}
	return 0
}

//幸运任务每日重置
func (u *GateUser) ResetDailyLuckyTask() {
	Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "curluckytask", 0)
	Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "isluckytaketoday", 0)
}

