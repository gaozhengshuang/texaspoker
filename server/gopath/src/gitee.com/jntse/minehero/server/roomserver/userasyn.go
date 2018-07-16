package main
import (
	"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
)
// --------------------------------------------------------------------------
/// @brief 玩家异步事件
// --------------------------------------------------------------------------


// 获取充值页面
type RechargeCheckEventHandle func() bool
type RechargeCheckEventFeedback func()
type RechargeCheckEvent struct {
	user *RoomUser
	handler RechargeCheckEventHandle
	feedback RechargeCheckEventFeedback
}

func NewRechargeCheckEvent(user *RoomUser, handler RechargeCheckEventHandle, feedback RechargeCheckEventFeedback) * RechargeCheckEvent{
	return &RechargeCheckEvent{user, handler, feedback}
}

func (this *RechargeCheckEvent) Process(ch_fback chan eventque.IEvent) {
	if this.handler() == true {
		ch_fback <- this
	}
}

func (this *RechargeCheckEvent) Feedback() {
	this.feedback()
}


// 扣除平台金币
type RemovePlatformCoinsEventHandle func(amount int64) (balance int64, errmsg string)
type RemovePlatformCoinsFeedback func(balance int64, errmsg string, amount int64)
type RemovePlatformCoinsEvent struct {
	handler RemovePlatformCoinsEventHandle
	room *GameRoom
	amount int64

	feedback RemovePlatformCoinsFeedback
	balance int64
	errmsg string
}

func NewRemovePlatformCoinsEvent(room *GameRoom, 
								 amount int64,
								 handler RemovePlatformCoinsEventHandle, 
								 feedback RemovePlatformCoinsFeedback) *RemovePlatformCoinsEvent {
	return &RemovePlatformCoinsEvent{handler, room, amount, feedback, 0, ""}
}

func (this *RemovePlatformCoinsEvent) Process(ch_fback chan eventque.IEvent) {
	tm1 := util.CURTIMEMS()
	this.balance, this.errmsg = this.handler(this.amount)
	ch_fback <- this
	log.Trace("[异步事件] 房间[%d] 玩家[%d] QueryPlatformCoinsEvent 本次消耗 %dms", this.room.Id(), this.room.ownerid, util.CURTIMEMS() - tm1)
}

func (this *RemovePlatformCoinsEvent) Feedback() {
	if this.feedback != nil { this.feedback(this.balance, this.errmsg, this.amount) }
}

// 同步平台金币
type QueryPlatformCoinsEventHandle func() (balance int64, errmsg string)
type QueryPlatformCoinsFeedback func(balance int64, errmsg string)
type QueryPlatformCoinsEvent struct {
	handler QueryPlatformCoinsEventHandle
	feedback QueryPlatformCoinsFeedback
	balance int64
	errmsg string
}

func NewQueryPlatformCoinsEvent(handler QueryPlatformCoinsEventHandle, feedback QueryPlatformCoinsFeedback) *QueryPlatformCoinsEvent {
	return &QueryPlatformCoinsEvent{handler:handler, feedback:feedback}
}

func (this *QueryPlatformCoinsEvent) Process(ch_fback chan eventque.IEvent) {
	tm1 := util.CURTIMEMS()
	this.balance, this.errmsg = this.handler()
	ch_fback <- this
	log.Trace("[异步事件] QueryPlatformCoinsEvent 本次消耗 %dms", util.CURTIMEMS() - tm1)
}

func (this *QueryPlatformCoinsEvent) Feedback() {
	if this.feedback != nil { this.feedback(this.balance, this.errmsg) }
}


