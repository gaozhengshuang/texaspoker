package main
import (
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/server/def"
)

// 获取平台金币
func (this *GateUser) SynMidasBalance() {
	event := NewQueryPlatformCoinsEvent(this.DoSynMidasBalance, this.DoSynMidasBalanceResult)
	this.AsynEventInsert(event)
}

// 同步midas余额
func (this *GateUser) DoSynMidasBalance() (balance, amt_save int64, errmsg string) {
	return def.HttpWechatMiniGameGetBalance(Redis(), this.OpenId())
}

// 同步midas余额
func (this *GateUser) DoSynMidasBalanceResult(balance, amt_save int64, errmsg string) {
	this.synbalance = false
	if errmsg != "" {
		log.Error("玩家[%s %d %s] 同步midas余额失败,errmsg:%s", this.Name(), this.Id(), this.OpenId(), errmsg)
		return
	}

	log.Info("玩家[%s %d] 同步midas支付数据成功 当前充值[%d] 累计充值[%d]", this.Name(), this.Id(), this.TotalRecharge(), amt_save)

	// 同步客户端本次充值金额,增量
	//this.SetTotalRecharge(0)
	if uint32(amt_save) > this.TotalRecharge() {
		recharge := uint32(amt_save) - this.TotalRecharge()
		this.SetTotalRecharge(uint32(amt_save))
		this.AddDiamond(recharge, "充值获得", true)
	}
}

// 从midas服务器扣除金币
func (this *GateUser) SynRemoveMidsMoney(amount int64, reason string) {
	event := NewRemovePlatformCoinsEvent(amount, this.DoRemoveMidasMoney, this.DoRemoveMidasMoneyResult)
	this.AsynEventInsert(event)
	log.Info("玩家[%s %d] 推送同步扣除midas金币 amount:%d reason:%s", this.Name(), this.Id(), amount, reason)
}

func (this *GateUser) DoRemoveMidasMoney(amount int64) (balance int64, errmsg string) {
	return def.HttpWechatMiniGamePayMoney(Redis(), this.OpenId(), amount)
}

func (this *GateUser) DoRemoveMidasMoneyResult(balance int64, errmsg string, amount int64) {
	if errmsg != "" {
		log.Error("玩家[%s %d] midas扣钱返回失败 errmsg:%s", this.Name(), this.Id(), errmsg)
	}
}

// 从midas服务器添加金币
func (this *GateUser) SynAddMidsMoney(amount int64, reason string) {
	event := NewAddPlatformCoinsEvent(amount, this.DoAddMidasMoney, this.DoAddMidasMoneyResult)
	this.AsynEventInsert(event)
	log.Info("玩家[%s %d] 推送同步添加midas金币 amount:%d reason:%s", this.Name(), this.Id(), amount, reason)
}

func (this *GateUser) DoAddMidasMoney(amount int64) (balance int64, errmsg string) {
	return def.HttpWechatMiniGamePresentMoney(Redis(), this.OpenId(), amount)
}

func (this *GateUser) DoAddMidasMoneyResult(balance int64, errmsg string, amount int64) {
	if errmsg != "" {
		log.Error("玩家[%s %d] midas加钱返回失败 errmsg:%s", this.Name(), this.Id(), errmsg)
	}
}

