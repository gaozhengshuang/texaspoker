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
	AchieveGroup_MTTChampion = 2021 	 //在MTT锦标赛夺冠数
	AchieveGroup_BaiRenWin = 2041 //百人大战胜利数
	AchieveGroup_LevelEx = 3001  //等级跟Level一样只是多了一份成就
)


func (u *RoomUser) GetAchieveProcessMap (userid int64) map[int32]int32 {
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

func (u *RoomUser) GetAchieveTakenList(userid int64) []int32 {
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

func (u *RoomUser) GetAchieveProcessByGroup (groupid int32) int32 {
	_, find := tbl.AchieveBase.AchieveById[groupid]
	if find == false {
		log.Error("玩家[%d %s] 获取成就组进度未找到配置 groupid:%d", u.Id(), u.Name(), groupid)
		return 0
	}
	strgroup := strconv.FormatInt(int64(groupid), 10)
	cmdval, err := Redis().HGet(fmt.Sprintf("%s_%d", def.AchieveProcess, u.Id()), strgroup).Result()
	if err == nil {
		return util.Atoi(cmdval)
	}
	return 0
}

func (u *RoomUser) SetAchieveProcessByGroup (groupid, process int32) bool {
	_, find := tbl.AchieveBase.AchieveById[groupid]
	if find == false {
		log.Error("玩家[%d %s] 设置成就组进度未找到配置 groupid:%d", u.Id(), u.Name(), groupid)
		return false
	}
	strgroup := strconv.FormatInt(int64(groupid), 10)
	strprocess := strconv.FormatInt(int64(process), 10)
	Redis().HSet(fmt.Sprintf("%s_%d", def.AchieveProcess, u.Id()), strgroup, strprocess)	
	return true
}

//获取某项成就的领取状态
func (u *RoomUser) GetAchieveTokenState (taskid int32) int32 {
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
func (u *RoomUser) SetAchieveTokenState (taskid int32) bool {
	_, find := tbl.AchieveBase.AchieveById[taskid]
	if find == false {
		log.Error("玩家[%d %s] 设置成就领取标记未找到配置 taskid:%d", u.Id(), u.Name(), taskid)
		return false
	}
	strtaskid := strconv.FormatInt(int64(taskid), 10)
	_, erradd := Redis().SAdd(fmt.Sprintf("%s_%d", def.AchieveToken, u.Id()), strtaskid).Result()
	return erradd == nil
}

func (u *RoomUser) OnAchieveWinPoker (kind, subkind, hand, wingold int32 ) {
	group := u.GetAchieveGroupIdByHand(hand)
	if group > 0 {
		u.OnAchieveProcessChanged(group)
	}
	if kind == int32(msg.RoomKind_TexasFight) {
		u.OnAchieveProcessChanged(int32(AchieveGroup_BaiRenWin))
	} else if kind == int32(msg.RoomKind_TexasPoker) {
		if subkind == int32(msg.PlayingFieldType_Primary) || subkind == int32(msg.PlayingFieldType_Middle) || subkind == int32(msg.PlayingFieldType_High) {
			u.OnAchieveProcessChanged(int32(AchieveGroup_TexasWin))
			Redis().HIncrBy(fmt.Sprintf("charstate_%d", u.Id()), "wintimes", 1)
		} else if subkind == int32(msg.PlayingFieldType_Mtt) {
			Redis().HIncrBy(fmt.Sprintf("charstate_%d", u.Id()), "wintimes2", 1)
		}
	}
	var goldmaxwin int32
	cmdval, err := Redis().HGet(fmt.Sprintf("charstate_%d", u.Id()), "maxgoldonetimes").Result()
	if err == nil {
		goldmaxwin = util.Atoi(cmdval)
	}
	if wingold > goldmaxwin {
		Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "maxgoldonetimes", wingold)
	}
	
}

func (u *RoomUser) GetAchieveGroupIdByHand(hand int32) int32 {
	tmp := []int{0, 0, AchieveGroup_OnePair, AchieveGroup_TwoPairs, AchieveGroup_ThreeOfAKind, AchieveGroup_Straight, 
	AchieveGroup_Flush, AchieveGroup_FullHouse, AchieveGroup_FourOfAKind, AchieveGroup_StraightFlush, AchieveGroup_RoyalFlush}
	if hand >= 0 && hand <= 10 {
		return int32(tmp[hand])
	}
	return 0
}

func (u *RoomUser) OnAchievePlayPoker (kind int32, subkind int32, hand *Hand) {
	if kind == int32(msg.RoomKind_TexasFight) {
		if subkind == int32(kTexasFightHappyMode) {
			u.OnAchieveProcessChanged(int32(AchieveGroup_BaiRenPlay1))
		}else if subkind == int32(kTexasFightRichMode) {
			u.OnAchieveProcessChanged(int32(AchieveGroup_BaiRenPlay2))
		}
	} else if kind == int32(msg.RoomKind_TexasPoker) {
		if subkind == int32(msg.PlayingFieldType_Primary) {
			u.OnAchieveProcessChanged(int32(AchieveGroup_TexasPlay1))
			Redis().HIncrBy(fmt.Sprintf("charstate_%d", u.Id()), "gametimes", 1)
		} else if subkind == int32(msg.PlayingFieldType_Middle) {
			u.OnAchieveProcessChanged(int32(AchieveGroup_TexasPlay2))
			Redis().HIncrBy(fmt.Sprintf("charstate_%d", u.Id()), "gametimes", 1)
		} else if subkind == int32(msg.PlayingFieldType_High) {
			u.OnAchieveProcessChanged(int32(AchieveGroup_TexasPlay3))
			Redis().HIncrBy(fmt.Sprintf("charstate_%d", u.Id()), "gametimes", 1)
		} else if subkind == int32(msg.PlayingFieldType_Mtt) {
			u.OnAchieveProcessChanged(int32(AchieveGroup_MTTPlay))
			Redis().HIncrBy(fmt.Sprintf("charstate_%d", u.Id()), "gametimes2", 1)
		}
	}
	handlevel := hand.level
	handfinalvalue := hand.finalvalue
	//弃牌不记录弃牌是负值
	if handlevel > 0 {
		handpower := int64(handlevel) << 32 + int64(handfinalvalue)
		oldpower := util.Atol(Redis().HGet(fmt.Sprintf("charstate_%d", u.Id()), "handpower").Val())
		//log.Info("OnAchievePlayPoker----->%d, handlevel:%d, handpower:%d, oldpower:%d",u.Id(), handlevel, handpower, oldpower)
		if handpower > 0 && handpower > oldpower {
			u.SaveMaxCard(handpower, hand)
		}
	}
	//Redis().HIncrBy(fmt.Sprintf("charstate_%d", u.Id()), "totalplay", 1)
}

func (u *RoomUser) SaveMaxCard(maxpower int64, hand *Hand) {
	if hand == nil {
		return
	}
	tmp := hand.ToAllCard()
	if len(tmp) != 14 {
		return
	}
	//同花的时候处理一下 其他时候取前五张牌
	if hand.level == 6 {
		maptmp := make(map[int32][]int32)
		i := 0
		for i < len(tmp) {
			if _, ok := maptmp[tmp[i]]; ok {
				maptmp[tmp[i]] = append(maptmp[tmp[i]], tmp[i])
				maptmp[tmp[i]] = append(maptmp[tmp[i]], tmp[i + 1])

			} else {
				maptmp[tmp[i]] = make([]int32,0)
				maptmp[tmp[i]] = append(maptmp[tmp[i]], tmp[i])
				maptmp[tmp[i]] = append(maptmp[tmp[i]], tmp[i + 1])
			}
			i = i + 2
		}
		maxlen := 0
		var maxindex int32
		for k, v := range maptmp {
			if len(v) > maxlen { 
				maxlen = len(v)
				maxindex = k
			}
		}
		if len(maptmp[maxindex]) >= 10 {
			tmp = maptmp[maxindex][:]
		} else {
			return 
		}
	}

	strmaxcard := ""
	i := 0
	for i < 10 {
		if i == 0 {
			strmaxcard = util.Itoa(tmp[i])
		}else {
			strmaxcard = strmaxcard + "|" + util.Itoa(tmp[i])
		}
		i = i + 1 
	}
	Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "maxhand", strmaxcard)
	Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "handpower", maxpower)
}

func (u *RoomUser) OnAchieveProcessChanged(group int32) {
	process := u.GetAchieveProcessByGroup(group)
	if group == AchieveGroup_Gold {
		gold := u.GetGold()
		if gold > process {
			u.SetAchieveProcessByGroup(group, gold)
			Redis().HSet(fmt.Sprintf("charstate_%d", u.Id()), "maxgold", gold)
		}
	} else if group == AchieveGroup_Friend {
			
	} else if group == AchieveGroup_Level || group == AchieveGroup_LevelEx {
		level := u.Level()
		if level > process {
			u.SetAchieveProcessByGroup(int32(AchieveGroup_Level), level)
			u.SetAchieveProcessByGroup(int32(AchieveGroup_LevelEx), level)
		}
	} else {
		u.SetAchieveProcessByGroup(group, process + 1)
	}
}


//日常每日任务重置
func (u *RoomUser) ResetAchieve(cleartype int32){
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
func (u *RoomUser) DailyResetAchieve() {
	u.ResetAchieve(1)
}

//周常每周任务重置
func (u *RoomUser) WeekResetAchieve() {
	u.ResetAchieve(2)
}

//客户端拉取成就信息
func (u *RoomUser) OnReqAhcieveInfo(roleid int64) {
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
func (u *RoomUser) OnReqTakeAchieveAward(taskid int32) string {
	errcode := ""
	if u.GetAchieveTokenState(taskid) == 1 {
		//已经领过
		errcode = "已经领过"
	} else {
		conf, find := tbl.AchieveBase.AchieveById[taskid]
		if find == true {
			if u.GetAchieveProcessByGroup(conf.Group) >= conf.Para1 {
				//这里设置领取状态并且发奖
				if u.SetAchieveTokenState(taskid) == true {
					if len(conf.RewardId) > 0 && len(conf.RewardId) == len(conf.RewardNum){
						i := 0
						for i < len(conf.RewardId){
							u.AddItem(conf.RewardId[int32(i)], conf.RewardNum[int32(i)], "任务成就领奖", true)
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

//进入入局阶段
func (u *RoomUser) OnFlop(subkind int32) {
	if subkind == int32(msg.PlayingFieldType_Primary) || subkind == int32(msg.PlayingFieldType_Middle) || subkind == int32(msg.PlayingFieldType_High) {
		Redis().HIncrBy(fmt.Sprintf("charstate_%d", u.Id()), "entrytimes", 1)
	} else if subkind == int32(msg.PlayingFieldType_Mtt) {
		Redis().HIncrBy(fmt.Sprintf("charstate_%d", u.Id()), "entrytimes2", 1)
	}
}

//进入摊牌阶段
func (u *RoomUser) OnShowDown (subkind int32) {
	if subkind == int32(msg.PlayingFieldType_Primary) || subkind == int32(msg.PlayingFieldType_Middle) || subkind == int32(msg.PlayingFieldType_High) {
		Redis().HIncrBy(fmt.Sprintf("charstate_%d", u.Id()), "showdowntimes", 1)
	} else if subkind == int32(msg.PlayingFieldType_Mtt) {
		Redis().HIncrBy(fmt.Sprintf("charstate_%d", u.Id()), "showdowntimes2", 1)
	}
}
