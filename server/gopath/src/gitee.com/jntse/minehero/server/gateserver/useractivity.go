package main

import (
	"encoding/json"
	_ "fmt"
	"gitee.com/jntse/gotoolkit/log"
	_ "gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	_ "gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	_ "net/http"
	"strconv"
	_ "strings"
	_ "time"
)

//处理活动信息请求
func (u *GateUser) OnReqActivityInfo(id int32) {
	send := &msg.GW2C_RetActivityInfo{}
	if id == 0 {
		u.DailySignInfoToMsg(send)
	} else {
		if id == int32(msg.ActivityType_DailySign) {
			u.DailySignInfoToMsg(send)
		}
	}
	u.SendMsg(send)
}

//处理活动领奖请求
func (u *GateUser) OnReqGetActivityReward(id, subid int32) {
	send := &msg.GW2C_RetGetActivityReward{}
	send.Id = pb.Int32(id)
	send.Subid = pb.Int32(subid)
	ret := ""
	if id == int32(msg.ActivityType_DailySign) {
		ret = u.DailySign()
	} else {
		ret = "未定义的活动id"
	}
	send.Errcode = pb.String(ret)
	u.SendMsg(send)
}

//检查某项活动是否在开启时间之内
func (u *GateUser) CheckActivityTimeEnable(activityid int32) bool {
	return true
}

//兑换活动奖励
func (u *GateUser) GetActivityAwardByAwardId(awardid int32, reason string) bool {
	config, ok := tbl.AwardBase.AwardById[awardid]
	if !ok {
		log.Error("玩家[%d %s] 领取活动奖励失败，未找到奖励配置 %d", u.Id(), u.Name(), awardid)
		return false
	}
	items := config.RewardId
	num := config.RewardNum
	if len(items) != len(num) {
		log.Error("玩家[%d %s] 领取活动奖励失败，奖励物品配置不匹配 %d", u.Id(), u.Name(), awardid)
		return false
	}

	for i := 0; i < len(items); i++ {
		u.AddItem(items[i], num[i], reason, true)
	}
	return true
}

//签到
func (u *GateUser) DailySign() string {
	errcode := ""
	if !u.CheckActivityTimeEnable(int32(msg.ActivityType_DailySign)) {
		log.Error("玩家[%d %s] 签到失败 不在活动开启时间", u.Id(), u.Name())
		errcode = "不在活动开启时间"
		return errcode
	}
	if util.IsSameDay(int64(u.signtime), util.CURTIME()) {
		//u.SendNotify("今日已经签到过")
		errcode = "今日已经签到过"
		return errcode
	}

	for _, v := range tbl.Activity_signinBase.Activity_signinById {
		if v.ActivityId == 3 && v.Day == int32(u.signdays+1) {
			awardId := v.AwardId
			awardExId := v.PilePrize
			if u.GetActivityAwardByAwardId(awardId, "日常签到") {
				if awardExId > 0 {
					u.GetActivityAwardByAwardId(awardExId, "日常签到累计")
				}
				u.signdays = u.signdays + 1
				u.signtime = int32(util.CURTIME())
				return errcode
			}
			errcode = "签到领取奖励异常"
			return errcode
		}
	}
	//u.SendNotify("签到配置出错")
	log.Error("玩家[%d %s] 签到失败 签到配置出错 第%d天", u.Id(), u.Name(), u.signdays+1)
	errcode = "签到配置出错"
	return errcode
}

//签到重置
func (u *GateUser) ResetDailySign() {
	u.signdays = 0
}

//签到信息封装消息
func (u *GateUser) DailySignInfoToMsg(bin *msg.GW2C_RetActivityInfo) {
	data := make(map[string]string)
	data["SignTime"] = strconv.Itoa(int(u.signtime))
	jsonbody, jsonerr := json.Marshal(data)
	if jsonerr != nil {
		log.Error("DailySignInfoToMsg json.Marshal err[%s]", jsonerr)
		return
	}

	info := &msg.ActivityInfo{}
	//info.Type = pb.String("")
	info.Id = pb.Int32(int32(msg.ActivityType_DailySign))
	info.Step = pb.Int32(u.signdays)
	//info.Gotjson = pb.String("")
	info.Json = pb.String(util.BytesToString(jsonbody))
	bin.Array = append(bin.Array, info)
}

//跨天重置的活动
func (u *GateUser) ActivityResetByDay() {

}

//跨周重置的活动
func (u *GateUser) ActivityResetByWeek() {
	//签到
	u.ResetDailySign()
}

//领取系统周期奖励金币
func (u *GateUser) GetFreeGold() {
	now := util.CURTIME()
	if int32(now)-u.lastgoldtime >= 1800 {
		u.lastgoldtime = int32(now)
		u.AddGold(500, "领取系统免费金币", true)
		send := &msg.GW2C_RetGetFreeGold{}
		send.Lastgoldtime = pb.Int32(u.lastgoldtime)
		u.SendMsg(send)
	}
}
