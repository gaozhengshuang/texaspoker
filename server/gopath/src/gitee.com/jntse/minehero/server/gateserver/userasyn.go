package main
import (
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
)
// --------------------------------------------------------------------------
/// @brief 玩家异步事件
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
/// @brief 获取充值页面
// --------------------------------------------------------------------------
type RechargeEventHandle func(tvmid string, token string, user *GateUser, amount int32)
type UserRechargeEvent struct {
	user *GateUser
	tvmid string
	token string
	amount int32
	handler RechargeEventHandle
}

func NewUserRechargeEvent(user *GateUser, tvmid, token string, amount int32, handler RechargeEventHandle) *UserRechargeEvent {
	return &UserRechargeEvent{tvmid:tvmid,token:token,user:user,amount:amount,handler:handler}
}

func (ev *UserRechargeEvent) Process(ch_fback chan eventque.IEvent) {
	ev.handler(ev.tvmid, ev.token, ev.user, ev.amount)
}

func (ev *UserRechargeEvent) Feedback() {
}


// --------------------------------------------------------------------------
/// @brief  玩家存盘
// --------------------------------------------------------------------------
type UserSaveEventHandle func()
type UserSaveEventFeedbackHandle func()
type UserSaveEvent struct {
	handler  UserSaveEventHandle
	feedback UserSaveEventFeedbackHandle
}

func NewUserSaveEvent(handler UserSaveEventHandle, feedback UserSaveEventFeedbackHandle) *UserSaveEvent {
	return &UserSaveEvent{handler:handler, feedback:feedback}
}

func (ev *UserSaveEvent) Process(ch_fback chan eventque.IEvent) {
	ev.handler()
	ch_fback <- ev
}

func (ev *UserSaveEvent) Feedback() {
	if ev.feedback != nil { ev.feedback() }
}


// --------------------------------------------------------------------------
/// @brief 玩家发货
// --------------------------------------------------------------------------
type DeliveryGoodsHandle func(list []*msg.DeliveryGoods, token string)
type DeliveryGoodsEvent struct {
	list []*msg.DeliveryGoods
	token string
	handler DeliveryGoodsHandle
}

func NewDeliveryGoodsEvent(list []*msg.DeliveryGoods, token string, handler DeliveryGoodsHandle) *DeliveryGoodsEvent {
	return &DeliveryGoodsEvent{list:list, token:token, handler:handler}
}

func (ev *DeliveryGoodsEvent) Process(ch_fback chan eventque.IEvent) {
	tm1 := util.CURTIMEMS()
	ev.handler(ev.list, ev.token)
	log.Trace("[异步事件] DeliveryGoodsEvent 本次消耗 %dms", util.CURTIMEMS() - tm1)
}

func (ev *DeliveryGoodsEvent) Feedback() {
}


// --------------------------------------------------------------------------
/// @brief 整点给玩家免费步数
// --------------------------------------------------------------------------
type GiveFreeStepHandle func(now int64, reason string)
type GiveFreeStepEvent struct {
	now int64
	reason string
	handler GiveFreeStepHandle
}

func NewGiveFreeStepEvent(now int64, reason string, handler GiveFreeStepHandle) *GiveFreeStepEvent { 
	return &GiveFreeStepEvent{now:now,reason:reason,handler:handler}
}

func (ev *GiveFreeStepEvent) Process(ch_fback chan eventque.IEvent) {
	ev.handler(ev.now, ev.reason)
}

func (ev *GiveFreeStepEvent) Feedback() {
}

// --------------------------------------------------------------------------
/// @brief 同步平台金币
// --------------------------------------------------------------------------
type QueryPlatformCoinsEventHandle func() (balance, save_amt int64, errmsg string)
type QueryPlatformCoinsFeedback func(balance, save_amt int64, errmsg string)
type QueryPlatformCoinsEvent struct {
	handler QueryPlatformCoinsEventHandle
	feedback QueryPlatformCoinsFeedback
	balance int64
	save_amt int64
	errmsg string
}

func NewQueryPlatformCoinsEvent(handler QueryPlatformCoinsEventHandle, feedback QueryPlatformCoinsFeedback) *QueryPlatformCoinsEvent {
	return &QueryPlatformCoinsEvent{handler:handler, feedback:feedback}
}

func (ev *QueryPlatformCoinsEvent) Process(ch_fback chan eventque.IEvent) {
	tm1 := util.CURTIMEMS()
	ev.balance, ev.save_amt, ev.errmsg = ev.handler()
	ch_fback <- ev
	log.Trace("[异步事件] QueryPlatformCoinsEvent 本次消耗 %dms", util.CURTIMEMS() - tm1)
}

func (ev *QueryPlatformCoinsEvent) Feedback() {
	if ev.feedback != nil { ev.feedback(ev.balance, ev.save_amt, ev.errmsg) }
}

// --------------------------------------------------------------------------
/// @brief 扣除平台金币
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


