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

func (ev *RechargeCheckEvent) Process(ch_fback chan eventque.IEvent) {
	if ev.handler() == true {
		ch_fback <- ev
	}
}

func (ev *RechargeCheckEvent) Feedback() {
	ev.feedback()
}


// --------------------------------------------------------------------------
/// @brief 扣除平台金币
///
/// @param 
/// @param 
/// @param string
/// @param int64
///
/// @return 
// --------------------------------------------------------------------------
type RemovePlatformCoinsEventHandle func(amount int64) (balance int64, errmsg string)
type RemovePlatformCoinsFeedback func(balance int64, errmsg string, amount int64)
type RemovePlatformCoinsEvent struct {
	handler RemovePlatformCoinsEventHandle
	amount int64

	feedback RemovePlatformCoinsFeedback
	balance int64
	errmsg string
}

func NewRemovePlatformCoinsEvent(amount int64, h RemovePlatformCoinsEventHandle, fb RemovePlatformCoinsFeedback) *RemovePlatformCoinsEvent {
	return &RemovePlatformCoinsEvent{h, amount, fb, 0, ""}
}

func (ev *RemovePlatformCoinsEvent) Process(ch_fback chan eventque.IEvent) {
	tm1 := util.CURTIMEMS()
	ev.balance, ev.errmsg = ev.handler(ev.amount)
	ch_fback <- ev
	log.Trace("[异步事件] QueryPlatformCoinsEvent 本次消耗 %dms", util.CURTIMEMS() - tm1)
}

func (ev *RemovePlatformCoinsEvent) Feedback() {
	if ev.feedback != nil { ev.feedback(ev.balance, ev.errmsg, ev.amount) }
}


// --------------------------------------------------------------------------
/// @brief 同步平台金币
///
/// @param 
/// @param 
/// @param string
///
/// @return 
// --------------------------------------------------------------------------
type QueryPlatformCoinsEventHandle func() (balance, amt_save int64, errmsg string)
type QueryPlatformCoinsFeedback func(balance, amt_save int64, errmsg string)
type QueryPlatformCoinsEvent struct {
	handler QueryPlatformCoinsEventHandle
	feedback QueryPlatformCoinsFeedback
	balance int64
	amt_save int64
	errmsg string
}

func NewQueryPlatformCoinsEvent(handler QueryPlatformCoinsEventHandle, feedback QueryPlatformCoinsFeedback) *QueryPlatformCoinsEvent {
	return &QueryPlatformCoinsEvent{handler:handler, feedback:feedback}
}

func (ev *QueryPlatformCoinsEvent) Process(ch_fback chan eventque.IEvent) {
	tm1 := util.CURTIMEMS()
	ev.balance, ev.amt_save,  ev.errmsg = ev.handler()
	ch_fback <- ev
	log.Trace("[异步事件] QueryPlatformCoinsEvent 本次消耗 %dms", util.CURTIMEMS() - tm1)
}

func (ev *QueryPlatformCoinsEvent) Feedback() {
	if ev.feedback != nil { ev.feedback(ev.balance, ev.amt_save, ev.errmsg) }
}


// --------------------------------------------------------------------------
/// @brief 添加平台金币
// --------------------------------------------------------------------------
type AddPlatformCoinsEventHandle func(amount int64) (balance int64, errmsg string)
type AddPlatformCoinsFeedback func(balance int64, errmsg string, amount int64)
type AddPlatformCoinsEvent struct {
	handler AddPlatformCoinsEventHandle
	amount int64

	feedback AddPlatformCoinsFeedback
	balance int64
	errmsg string
}

func NewAddPlatformCoinsEvent(amount int64, h AddPlatformCoinsEventHandle, fb AddPlatformCoinsFeedback) *AddPlatformCoinsEvent {
	return &AddPlatformCoinsEvent{h, amount, fb, 0, ""}
}

func (ev *AddPlatformCoinsEvent) Process(ch_fback chan eventque.IEvent) {
	tm1 := util.CURTIMEMS()
	ev.balance, ev.errmsg = ev.handler(ev.amount)
	ch_fback <- ev
	log.Trace("[异步事件] QueryPlatformCoinsEvent 本次消耗 %dms", util.CURTIMEMS() - tm1)
}

func (ev *AddPlatformCoinsEvent) Feedback() {
	if ev.feedback != nil { ev.feedback(ev.balance, ev.errmsg, ev.amount) }
}

