package main
import (
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/server/def"
)

// 获取平台金币
func (u *GateUser) SynMidasBalance() {
	event := NewQueryPlatformCoinsEvent(u.DoSynMidasBalance, u.DoSynMidasBalanceResult)
	u.AsynEventInsert(event)
}

// 同步midas余额
func (u *GateUser) DoSynMidasBalance() (balance, amt_save int64, errmsg string) {
	return def.HttpWechatMiniGameGetBalance(Redis(), u.OpenId())
}

// 同步midas余额
func (u *GateUser) DoSynMidasBalanceResult(balance, amt_save int64, errmsg string) {
	u.synbalance = false
	if errmsg != "" {
		log.Error("玩家[%s %d %s] 同步midas余额失败,errmsg:%s", u.Name(), u.Id(), u.OpenId(), errmsg)
		return
	}

	log.Info("玩家[%s %d] 同步midas支付数据成功 当前充值[%d] 累计充值[%d]", u.Name(), u.Id(), u.TotalRecharge(), amt_save)

	// 同步客户端本次充值金额,增量
	//u.SetTotalRecharge(0)
	if int32(amt_save) > u.TotalRecharge() {
		recharge := int32(amt_save) - u.TotalRecharge()
		u.SetTotalRecharge(int32(amt_save))
		u.AddDiamond(recharge, "充值获得", true)
	}
}

// 从midas服务器扣除金币
func (u *GateUser) SynRemoveMidsMoney(amount int64, reason string) {
	event := NewRemovePlatformCoinsEvent(amount, u.DoRemoveMidasMoney, u.DoRemoveMidasMoneyResult)
	u.AsynEventInsert(event)
	log.Info("玩家[%s %d] 推送同步扣除midas金币 amount:%d reason:%s", u.Name(), u.Id(), amount, reason)
}

func (u *GateUser) DoRemoveMidasMoney(amount int64) (balance int64, errmsg string) {
	return def.HttpWechatMiniGamePayMoney(Redis(), u.OpenId(), amount)
}

func (u *GateUser) DoRemoveMidasMoneyResult(balance int64, errmsg string, amount int64) {
	if errmsg != "" {
		log.Error("玩家[%s %d] midas扣钱返回失败 errmsg:%s", u.Name(), u.Id(), errmsg)
	}
}

// 从midas服务器添加金币
func (u *GateUser) SynAddMidsMoney(amount int64, reason string) {
	event := NewAddPlatformCoinsEvent(amount, u.DoAddMidasMoney, u.DoAddMidasMoneyResult)
	u.AsynEventInsert(event)
	log.Info("玩家[%s %d] 推送同步添加midas金币 amount:%d reason:%s", u.Name(), u.Id(), amount, reason)
}

func (u *GateUser) DoAddMidasMoney(amount int64) (balance int64, errmsg string) {
	return def.HttpWechatMiniGamePresentMoney(Redis(), u.OpenId(), amount)
}

func (u *GateUser) DoAddMidasMoneyResult(balance int64, errmsg string, amount int64) {
	if errmsg != "" {
		log.Error("玩家[%s %d] midas加钱返回失败 errmsg:%s", u.Name(), u.Id(), errmsg)
	}
}

