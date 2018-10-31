package main

import (
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/util"
	"fmt"
	"strings"
	"time"
)

type UserStatistics struct {
	tm_login       			int64
	tm_logout      			int64
	continuelogin  			int32
	nocountlogin   			int32
	totalrecharge  			int32 		//总充值
	createdtime				int64		//创建时间
	maxgold					int64		//最高拥有金币
	maxgoldonetimes			int32		//一把最高赢取金币
	friendnum				int32		//好友数量
	gametimes 				int32 		//游戏总局数
	wintimes				int32		//游戏胜局
	entrytimes				int32		//入局次数
	showdowntimes			int32		//摊牌次数
	gametimes2				int32		//比赛总局数
	wintimes2				int32		//比赛胜局
	entrytimes2				int32 		//比赛入局次数
	showdowntimes2			int32 		//比赛摊牌次数
	mttjointimes			int32		//锦标赛参与次数
	mttprizetimes			int32		//锦标赛奖励次数
	championtimes			int32 		//竞标赛夺冠次数
	maxhand					[]int32		//最大手牌
	isoffline				int32		//是否离线
	stateid					int32		//房间号
	stateconfid				int32 		//房间id
}

func (this *UserStatistics) LoadBin(bin *msg.Serialize) {
	userBaseBin := bin.GetBase()
	if userBaseBin == nil { return }
	userStatisticsBin := userBaseBin.GetStatics()
	if userStatisticsBin == nil { return }
	this.tm_login = userStatisticsBin.GetTmlogin()
	this.tm_logout = userStatisticsBin.GetTmlogout()
	this.continuelogin = userStatisticsBin.GetContinuelogin()
	this.nocountlogin = userStatisticsBin.GetNocountlogin()
	this.totalrecharge = userStatisticsBin.GetTotalrecharge()
	this.createdtime = userStatisticsBin.GetCreatedtime()
	this.maxgold = userStatisticsBin.GetMaxgold()
	this.maxgoldonetimes = userStatisticsBin.GetMaxgoldonetimes()
	this.friendnum = userStatisticsBin.GetFriendnum()
	this.gametimes = userStatisticsBin.GetGametimes()
	this.wintimes = userStatisticsBin.GetWintimes()
	this.entrytimes = userStatisticsBin.GetEntrytimes()
	this.showdowntimes = userStatisticsBin.GetShowdowntimes()
	this.gametimes2 = userStatisticsBin.GetGametimes2()
	this.wintimes2 = userStatisticsBin.GetWintimes2()
	this.entrytimes2 = userStatisticsBin.GetEntrytimes2()
	this.showdowntimes2 = userStatisticsBin.GetShowdowntimes2()
	this.mttjointimes = userStatisticsBin.GetMttjointimes()
	this.mttprizetimes = userStatisticsBin.GetMttprizetimes()
	this.championtimes = userStatisticsBin.GetChampiontimes()
	this.maxhand = make([]int32, 0)
	for _, v := range userStatisticsBin.GetMaxhand() {
		this.maxhand = append(this.maxhand, v)
	}
	this.isoffline = userStatisticsBin.GetIsoffline()
	this.stateid = userStatisticsBin.GetStateid()
	this.stateconfid = userStatisticsBin.GetStateconfid()
}

func (this *UserStatistics) PackBin() *msg.UserStatistics {
	msg := &msg.UserStatistics{}
	msg.Tmlogin = pb.Int64(this.tm_login)
	msg.Tmlogout = pb.Int64(this.tm_logout)
	msg.Continuelogin = pb.Int32(this.continuelogin)
	msg.Nocountlogin = pb.Int32(this.nocountlogin)
	msg.Totalrecharge = pb.Int32(this.totalrecharge)
	msg.Createdtime = pb.Int64(this.createdtime)
	msg.Maxgold = pb.Int64(this.maxgold)
	msg.Maxgoldonetimes = pb.Int32(this.maxgoldonetimes)
	msg.Friendnum = pb.Int32(this.friendnum)
	msg.Gametimes = pb.Int32(this.gametimes)
	msg.Wintimes = pb.Int32(this.wintimes)
	msg.Entrytimes = pb.Int32(this.entrytimes)
	msg.Showdowntimes = pb.Int32(this.showdowntimes)
	msg.Gametimes2 = pb.Int32(this.gametimes2)
	msg.Wintimes2 = pb.Int32(this.wintimes2)
	msg.Entrytimes2 = pb.Int32(this.entrytimes2)
	msg.Showdowntimes2 = pb.Int32(this.showdowntimes2)
	msg.Mttjointimes = pb.Int32(this.mttjointimes)
	msg.Mttprizetimes = pb.Int32(this.mttprizetimes)
	msg.Championtimes = pb.Int32(this.championtimes)
	msg.Maxhand = make([]int32,0)
	for _, v := range this.maxhand {
		msg.Maxhand = append(msg.Maxhand, v)
	}
	msg.Isoffline = pb.Int32(this.isoffline)
	msg.Stateid = pb.Int32(this.stateid)
	msg.Stateconfid = pb.Int32(this.stateconfid)
	return msg
}

func (this *GateUser) TotalRecharge() int32 {
	return this.statistics.totalrecharge
}

func (this *GateUser) SetTotalRecharge(r int32) {
	this.statistics.totalrecharge = r
}

func (u *GateUser) FillUserStatistics(bin *msg.UserStatistics) {
	cmdmap, err := Redis().HGetAll(fmt.Sprintf("charstate_%d", u.Id())).Result()
	if err == nil {
		for k, v := range cmdmap {
			switch k {
				case "maxgold":
					bin.Maxgold = pb.Int64(util.Atol(v))
				case "maxgoldonetimes":
					bin.Maxgoldonetimes = pb.Int32(util.Atoi(v))
				case "friendnum":
					bin.Friendnum = pb.Int32(util.Atoi(v))
				case "gametimes":
					bin.Gametimes = pb.Int32(util.Atoi(v))
				case "wintimes":
					bin.Wintimes = pb.Int32(util.Atoi(v))
				case "gametimes2":
					bin.Gametimes2 = pb.Int32(util.Atoi(v))
				case "wintimes2":
					bin.Wintimes2 = pb.Int32(util.Atoi(v))
				case "championtimes":
					bin.Championtimes = pb.Int32(util.Atoi(v))
				case "mttjointimes":
					bin.Mttjointimes = pb.Int32(util.Atoi(v))
				case "createdtime":
					bin.Createdtime = pb.Int64(util.Atol(v))
				case "roomtype":
					bin.Stateid = pb.Int32(util.Atoi(v))
				case "roomid":
					bin.Stateconfid = pb.Int32(util.Atoi(v))
				case "entrytimes":
					bin.Entrytimes = pb.Int32(util.Atoi(v))
				case "entrytimes2":	
					bin.Entrytimes2 = pb.Int32(util.Atoi(v))
				case "showdowntimes": 
					bin.Showdowntimes = pb.Int32(util.Atoi(v))
				case "showdowntimes2": 
					bin.Showdowntimes2 = pb.Int32(util.Atoi(v))
				case "maxhand":
					maxhandstr := strings.Split(v, "|")
					for _, m := range maxhandstr {
						bin.Maxhand = append(bin.Maxhand, util.Atoi(m))
					}
				default:

			}
		}
	}
}


// 统计登陆
func (u *GateUser) LoginStatistics() {
	datetime := time.Now().Format("2006-01-02")
	if u.statistics.tm_login == 0 {
		key := fmt.Sprintf("%s_create", datetime)
		Redis().Incr(key)
		key = fmt.Sprintf("%s_loginsum", datetime)
		Redis().Incr(key)
		u.statistics.continuelogin = 1
		return
	}
	diffday := false
	if util.IsNextDay(u.statistics.tm_login, util.CURTIME()) {
		u.statistics.continuelogin += 1
		if u.statistics.nocountlogin == 0 {
			key := fmt.Sprintf("%s_login_%d", datetime, u.statistics.continuelogin)
			Redis().Incr(key)
		}
		key2 := fmt.Sprintf("%s_loginsum", datetime)
		Redis().Incr(key2)
		diffday = true
	} else {
		if !util.IsSameDay(u.statistics.tm_login, util.CURTIME()) {
			u.statistics.continuelogin = 1
			u.statistics.nocountlogin = 1
			key := fmt.Sprintf("%s_loginsum", datetime)
			Redis().Incr(key)
			diffday = true
		}
	}

	if diffday {
		u.UserDailyReset()
	}

	if !util.IsSameWeek(u.statistics.tm_login, util.CURTIME()) {
		u.ActivityResetByWeek()
		u.WeekResetAchieve()
	}
}

