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
func (this *GateUser) OnReqActivityInfo(id int32) {
	send := &msg.GW2C_RetActivityInfo{}
	if id == 0 {
		this.DailySignInfoToMsg(send)
	} else {
		if id == int32(msg.ActivityType_DailySign) {
			this.DailySignInfoToMsg(send)
		}
	}
	this.SendMsg(send)
}

//处理活动领奖请求
func (this *GateUser) OnReqGetActivityReward(id, subid int32) {
	send := &msg.GW2C_RetGetActivityReward{}
	send.Id = pb.Int32(id)
	send.Subid = pb.Int32(subid)
	ret := ""
	if id == int32(msg.ActivityType_DailySign) {
		ret = this.DailySign()
	} else {
		ret = "未定义的活动id"
	}
	send.Errcode = pb.String(ret)
	this.SendMsg(send)
}

//检查某项活动是否在开启时间之内
func (this *GateUser) CheckActivityTimeEnable(activityid int32) bool {
	return true
}

//兑换活动奖励
func (this *GateUser) GetActivityAwardByAwardId(awardid int32, reason string) bool {
	config, ok := tbl.AwardBase.AwardById[awardid]
	if !ok {
		log.Error("玩家[%d %s] 领取活动奖励失败，未找到奖励配置 %d", this.Id(), this.Name(), awardid)
		return false
	}
	items := config.RewardId
	num := config.RewardNum
	if len(items) != len(num) {
		log.Error("玩家[%d %s] 领取活动奖励失败，奖励物品配置不匹配 %d", this.Id(), this.Name(), awardid)
		return false
	}

	for i := 0; i < len(items); i++ {
		this.AddItem(items[i], num[i], reason, true)
	}
	return true
}

//签到
func (this *GateUser) DailySign() string {
	errcode := ""
	if !this.CheckActivityTimeEnable(int32(msg.ActivityType_DailySign)) {
		log.Error("玩家[%d %s] 签到失败 不在活动开启时间", this.Id(), this.Name())
		errcode = "不在活动开启时间"
		return errcode
	}
	if util.IsSameDay(int64(this.signtime), util.CURTIME()) {
		//this.SendNotify("今日已经签到过")
		errcode = "今日已经签到过"
		return errcode
	}

	for _, v := range tbl.Activity_signinBase.Activity_signinById {
		if v.ActivityId == 3 && v.Day == int32(this.signdays+1) {
			awardId := v.AwardId
			awardExId := v.PilePrize
			if this.GetActivityAwardByAwardId(awardId, "日常签到") {
				if awardExId > 0 {
					this.GetActivityAwardByAwardId(awardExId, "日常签到累计")
				}
				this.signdays = this.signdays + 1
				this.signtime = int32(util.CURTIME())
				return errcode
			}
			errcode = "签到领取奖励异常"
			return errcode
		}
	}
	//this.SendNotify("签到配置出错")
	log.Error("玩家[%d %s] 签到失败 签到配置出错 第%d天", this.Id(), this.Name(), this.signdays+1)
	errcode = "签到配置出错"
	return errcode
}

//签到重置
func (this *GateUser) ResetDailySign() {
	this.signdays = 0
}

//签到信息封装消息
func (this *GateUser) DailySignInfoToMsg(bin *msg.GW2C_RetActivityInfo) {
	data := make(map[string]string)
	data["SignTime"] = strconv.Itoa(int(this.signtime))
	jsonbody, jsonerr := json.Marshal(data)
	if jsonerr != nil {
		log.Error("DailySignInfoToMsg json.Marshal err[%s]", jsonerr)
		return
	}

	info := &msg.ActivityInfo{}
	//info.Type = pb.String("")
	info.Id = pb.Int32(int32(msg.ActivityType_DailySign))
	info.Step = pb.Int32(this.signdays)
	//info.Gotjson = pb.String("")
	info.Json = pb.String(util.BytesToString(jsonbody))
	bin.Array = append(bin.Array, info)
}

//跨天重置的活动
func (this *GateUser) ActivityResetByDay() {

}

//跨周重置的活动
func (this *GateUser) ActivityResetByWeek() {
	//签到
	this.ResetDailySign()
}
