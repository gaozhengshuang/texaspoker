package main

import (
	"encoding/json"
	"fmt"
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

const(
	SILVER_MONTHCARD int32 = 827
	GOLD_MONTHCARD int32 = 828
)

//处理活动信息请求
func (u *GateUser) OnReqActivityInfo(id int32) {
	send := &msg.GW2C_RetActivityInfo{}
	if id == 0 {
		u.DailySignInfoToMsg(send)
		u.BankruptcySubsidyInfoToMsg(send)
	} else {
		if id == int32(msg.ActivityType_DailySign) {
			u.DailySignInfoToMsg(send)
		} else if id == int32(msg.ActivityType_BankruptcySubsidy) {
			u.BankruptcySubsidyInfoToMsg(send)
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
	} else if id == int32(msg.ActivityType_BankruptcySubsidy){
		ret = u.TakeBankruptcySubsidy(subid)
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

//发奖励表中的奖励
func (u *GateUser) GetActivityAwardByAwardId(awardid int32, reason string) bool {
	config, ok := tbl.AwardBase.AwardById[awardid]
	if !ok {
		log.Error("玩家[%d %s] 领取活动奖励失败，未找到奖励配置 %d", u.Id(), u.Name(), awardid)
		return false
	}
	
	if config.PayPushId > 0 {
		cmdval, err := Redis().Get(fmt.Sprintf("paypush_%d_%d", u.Id(), config.PayPushId)).Result()
		if err == nil && util.Atoi(cmdval) != 1{
			return false
		}
	}

	if config.PreId == SILVER_MONTHCARD {
		if int32(util.CURTIME()) > u.silvercardtime {
			log.Error("玩家[%d %s] 领取白银月卡奖励失败，白银月卡已过期 %d", u.Id(), u.Name(), awardid)
			return false
		}
		if u.silvercardawardstate > 0 {
			log.Error("玩家[%d %s] 领取白银月卡奖励失败，本日已经领取过 %d", u.Id(), u.Name(), awardid)
			return false
		}
		u.silvercardawardstate = 1
	} else if config.PreId == GOLD_MONTHCARD {
		if int32(util.CURTIME()) > u.goldcardtime {
			log.Error("玩家[%d %s] 领取黄金月卡奖励失败，黄金月卡已过期 %d", u.Id(), u.Name(), awardid)
			return false
		}
		if u.goldcardawardstate > 0 {
			log.Error("玩家[%d %s] 领取黄金月卡奖励失败，本日已经领取过 %d", u.Id(), u.Name(), awardid)
			return false
		}
		u.goldcardawardstate = 1
	}
	items := config.RewardId
	num := config.RewardNum
	if len(items) != len(num) {
		log.Error("玩家[%d %s] 领取活动奖励失败，奖励物品配置不匹配 %d", u.Id(), u.Name(), awardid)
		return false
	}
	costid := config.CostId
	costnum := config.CostNum
	if len(costid) > 0 && len(costid) != len(costnum) {
		log.Error("玩家[%d %s] 领取活动奖励失败，花费物品配置不匹配 %d", u.Id(), u.Name(), awardid)
		return false
	}
	if len(costid) > 0 {
		for i := 0; i < len(costid); i++ {
			if u.CheckEnoughItem(costid[i], costnum[i]) == false {
				log.Error("玩家[%d %s] 领取活动奖励失败，所需花费不足 %d", u.Id(), u.Name(), awardid)
				return false
			}
		}
	}
	//月卡
	if awardid == SILVER_MONTHCARD {
		addtime := 60*60*24*30
		u.AddSilverCardTime(int32(addtime))
	}else if awardid == GOLD_MONTHCARD {
		addtime := 60*60*24*30
		u.AddGoldCardTime(int32(addtime))
	}

	if len(costid) > 0 {
		for i := 0; i < len(costid); i++ {
			u.RemoveItem(costid[i], costnum[i], "兑换奖励花费")
		}
	}
	for i := 0; i < len(items); i++ {
		u.AddItem(items[i], num[i], reason, true)
	}

	if config.PayPushId > 0 {
		Redis().Set(fmt.Sprintf("paypush_%d_%d", u.Id(), config.PayPushId), 2, 0)
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
	log.Error("玩家[%d %s] 签到失败 签到配置出错 第%d天", u.Id(), u.Name(), u.signdays+1)
	errcode = "签到配置出错"
	return errcode
}

//签到重置
func (u *GateUser) ResetDailySign() {
	u.signdays = 0
}

//破产补助重置
func (u *GateUser) ResetBankruptCount() {
	u.bankruptcount = 0
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
	u.ResetBankruptCount()
	u.ResetCardRewardState()
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


//根据logid获取兑换记录
func (u *GateUser) GetRewardRecordByLogid (logid, startid, count int32) {
	if startid <= 0 {
		return
	}
	send := &msg.GW2C_RetAwardRecord{}
	tmp := make([]*msg.AwardRecord,0)
	len1 := len(u.awardrecord)
	for len1 > 0 {
		len1 = len1 - 1
		if u.awardrecord[len1].GetLogid() == logid {
			tmp = append(tmp, u.awardrecord[len1])
		}
	}
	len2 := len(tmp)
	num := 0
	for int32(len2) >= startid && int32(num) < count{
		num = num + 1
		data := &msg.RetAwardRecord{}
		data.Id = pb.Int32(startid)
		data.Time = pb.Int32(tmp[startid-1].GetTime())
		data.Awardid = pb.Int32(tmp[startid-1].GetAwardid())
		send.Loglist = append(send.Loglist, data)
		startid = startid + 1
	}
	u.SendMsg(send)
}

//玩家客户端申请兑换奖励
func (u *GateUser) ReqAwardExchange (id, count int32) {
	config, ok := tbl.AwardBase.AwardById[id]
	if !ok {
		log.Error("玩家[%d %s] 兑换奖励失败，未找到奖励配置 %d", u.Id(), u.Name(), id)
		return
	}
	if config.Nacr > 0 {
		log.Error("玩家[%d %s] 兑换奖励失败，本奖励不允许客户端发起领奖 %d", u.Id(), u.Name(), id)
		return
	}
	
	for _, v := range config.CostType {
		if v == 10 {
			log.Error("玩家[%d %s] 兑换奖励失败，本奖励涉及充值 不能直接兑换 %d", u.Id(), u.Name(), id)
			return
		}
	}
	if u.GetActivityAwardByAwardId(id, "玩家兑换奖励") == false {
		return
	}
	if config.LogId > 0 {
		tmp := &msg.AwardRecord{}
		tmp.Logid = pb.Int32(int32(config.LogId))
		tmp.Time = pb.Int32(int32(util.CURTIME()))
		tmp.Awardid = pb.Int32(id)
		u.awardrecord = append(u.awardrecord, tmp)
	}
	if config.Limit > 0 {
		//限购的
		for _, v := range u.awardgetinfo {
			if v.GetId() == id && v.GetCount() >= config.Limit {
				return
			}
		}
	}

	send1 := &msg.GW2C_PushExchangeTimeRefresh{}
	send1.Id = pb.Int32(id)
	got := false
	num := 0
	for _, v := range u.awardgetinfo {
		if v.GetId() == id {
			num = int(v.GetCount()) + 1
			v.Count = pb.Int32(int32(num))
			v.Time = pb.Int32(int32(util.CURTIME()))
			got = true
		}
	}
	if got == false {
		num = 1
		tmp := &msg.AwardGetInfo{}
		tmp.Id = pb.Int32(id)
		tmp.Count = pb.Int32(int32(num))
		tmp.Time = pb.Int32(int32(util.CURTIME()))
		u.awardgetinfo = append(u.awardgetinfo, tmp)
	}
	send1.Count = pb.Int32(int32(num))
	send1.Time = pb.Int32(int32(util.CURTIME()))
	u.SendMsg(send1)
	send2 := &msg.GW2C_RetAwardExchange{}
	u.SendMsg(send2)
}

//返回玩家兑换信息
func (u *GateUser) GetAwardGetInfo () {
	send := &msg.GW2C_RetAwardGetInfo{}
	send.Datalist = u.awardgetinfo[:]
	u.SendMsg(send)
}


//领破产补助
func (u *GateUser) TakeBankruptcySubsidy(subid int32) string {
	errcode := ""
    for _,v := range tbl.BankruptBase.Activity_bankruptSubsidyById {
    	if v.SubId == subid {
    		awardid := v.AwardId
    		limitgold := v.LimitGold
    		times := v.Times
    		if u.bankruptcount >= times {
    			errcode = "本日破产补助领取次数已达上限"
    			return errcode
    		}
    		if u.GetGold() >= limitgold {
    			errcode = "尚未破产 无法领取"
    			return errcode
    		}
    		if u.GetActivityAwardByAwardId(awardid, "破产补助") == true {
    			u.bankruptcount = u.bankruptcount + 1
    		} else {
    			errcode = "领取失败"
    			return errcode
    		}
    		return errcode
    	}
	}
	errcode = "没找到配置"
	return errcode
}


//破产补助信息封装消息
func (u *GateUser) BankruptcySubsidyInfoToMsg(bin *msg.GW2C_RetActivityInfo) {
	info := &msg.ActivityInfo{}
	//info.Type = pb.String("")
	info.Id = pb.Int32(int32(msg.ActivityType_BankruptcySubsidy))
	info.Step = pb.Int32(u.bankruptcount)
	//info.Gotjson = pb.String("")
	//info.Json = pb.String("")
	bin.Array = append(bin.Array, info)
}


//增加白银卡时间 单位秒 例如月卡 60*60*24*30
func (u *GateUser) AddSilverCardTime (addtime int32) {
	now := util.CURTIME()
	if int32(now) >= u.silvercardtime {
		u.silvercardtime = int32(now) + addtime
	} else {
		u.silvercardtime = u.silvercardtime + addtime
	}
	u.SendPropertyChange()
}

//增加黄金卡时间 单位秒 例如月卡 60*60*24*30
func (u *GateUser) AddGoldCardTime (addtime int32) {
	now := util.CURTIME()
	if int32(now) >= u.goldcardtime {
		u.goldcardtime = int32(now) + addtime
	} else {
		u.goldcardtime = u.goldcardtime + addtime
	}
	u.SendPropertyChange()
}

//月卡每日领取重置
func (u *GateUser) ResetCardRewardState () {
	u.silvercardawardstate = 0
	u.goldcardawardstate = 0
}

