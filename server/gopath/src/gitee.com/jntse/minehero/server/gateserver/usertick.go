package main

import (
	_"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl"
	_"github.com/go-redis/redis"
	_"strconv"
	_"strings"
	"time"
)

// --------------------------------------------------------------------------
/// @brief
// --------------------------------------------------------------------------
type UserTicker struct {
	//ticker1s	*util.GameTicker
	//ticker5s	*util.GameTicker
	//ticker1m	*util.GameTicker
	//ticker10ms *util.GameTicker
	//ticker100ms *util.GameTicker
	tickers []*util.GameTicker
}

func (t *UserTicker) Init(handler10ms, handler100ms, handler1s, handler5s, handler1m util.TickerCallbackHandle) {
	t.tickers = make([]*util.GameTicker, 0)

	//ticker10ms := util.NewGameTicker(10*time.Millisecond, handler10ms)
	//ticker100ms := util.NewGameTicker(100*time.Millisecond, handler100ms)
	//ticker1s := util.NewGameTicker(1*time.Second, handler1s)
	//ticker5s := util.NewGameTicker(5*time.Second, handler5s)
	//ticker1m := util.NewGameTicker(1*time.Minute, handler1m)
	//t.tickers = append(t.tickers, ticker10ms)
	//t.tickers = append(t.tickers, ticker100ms)
	//t.tickers = append(t.tickers, ticker1s)
	//t.tickers = append(t.tickers, ticker5s)
	//t.tickers = append(t.tickers, ticker1m)
}

func (t *UserTicker) Regist(d time.Duration, handler util.TickerCallbackHandle) {
	ticker := util.NewGameTicker(d, handler)
	t.tickers = append(t.tickers, ticker)
}

func (t *UserTicker) Start() {
	for _, t := range t.tickers {
		t.Start()
	}

	//t.ticker10ms.Start()
	//t.ticker100ms.Start()
	//t.ticker1s.Start()
	//t.ticker5s.Start()
	//t.ticker1m.Start()
}

func (t *UserTicker) Stop() {
	for _, t := range t.tickers {
		t.Stop()
	}

	//t.ticker10ms.Stop()
	//t.ticker100ms.Stop()
	//t.ticker1s.Stop()
	//t.ticker5s.Stop()
	//t.ticker1m.Stop()
}

func (u *UserTicker) Run(now int64) {
	for _, t := range u.tickers {
		t.Run(now)
	}

	// 嵌套节省
	//u.ticker10ms.Run(now)
	//u.ticker100ms.Run(now)
	//if u.ticker1s.Run(now) {
	//	if u.ticker5s.Run(now) { u.ticker1m.Run(now) }
	//}
}

func (u *GateUser) RegistTicker() {
	u.tickers.Regist(10*time.Millisecond,  u.OnTicker10ms)
	u.tickers.Regist(100*time.Millisecond, u.OnTicker100ms)
	u.tickers.Regist(1*time.Second, u.OnTicker1s)
	u.tickers.Regist(5*time.Second, u.OnTicker5s)
	u.tickers.Regist(1*time.Minute, u.OnTicker1m)
	u.tickers.Regist(5*time.Minute, u.OnTicker5m)
}

func (u *GateUser) OnTicker10ms(now int64) {
	u.asynev.Dispatch()
}

func (u *GateUser) OnTicker100ms(now int64) {
	if len(u.broadcastbuffer) != 0 {
		uuid := u.broadcastbuffer[0]
		msg := UserMgr().PickBroadcastMsg(uuid)
		if msg != nil {
			u.SendMsg(msg)
		}
		u.broadcastbuffer = u.broadcastbuffer[1:]
	}
	u.CheckOffline(now)
	u.CheckDisconnectTimeOut(now)
	u.events.Tick(now)
}

func (u *GateUser) OnTicker1s(now int64) {
}

func (u *GateUser) OnTicker5s(now int64) {
	//u.CheckRechargeOrders()		// 不用我们的充值 2018年 05月 17日 星期四 19:34:03 CST
}

func (u *GateUser) OnTicker1m(now int64) {
	u.mailbox.Tick(now)
}

func (u *GateUser) OnTicker5m(now int64) {
}

func (u *GateUser) Tick(now int64) {
	u.tickers.Run(now)
}

// 处理充值订单
//func (u *GateUser) CheckRechargeOrders() {
//	if u.IsInRoom() == true {
//		return
//	}
//	keyorder := fmt.Sprintf("%d_verified_recharge_orders", u.Id())
//	order_amount, err := Redis().SPop(keyorder).Result()
//	if err == redis.Nil {
//		return
//	} else if err != nil {
//		log.Error("[充值] 从Redis Spop 验证订单失败 err:%s", err)
//		return
//	}
//
//	// 字符串格式 recharge_order_userid_timestamp_amount_number
//	orderparts := strings.Split(order_amount, "_")
//	if len(orderparts) != 5 {
//		log.Error("[充值] amount订单格式解析失败 [%s]", order_amount)
//		return
//	}
//
//	amount, perr := strconv.ParseInt(orderparts[4], 10, 32)
//	if perr != nil {
//		log.Error("[充值] amount订单格式解析失败 [%s]", order_amount)
//		return
//	}
//
//	u.AddYuanbao(int32(amount), "充值获得", true)
//}

// 心跳,毫秒
func (u *GateUser) SetHeartBeat(now int64) {
	tm_last := u.tm_heartbeat
	tm_delay := now - tm_last
	u.tm_heartbeat = now
	if tm_delay < 1000 {
		//log.Warn("玩家[%s %d] 心跳太过频繁[%d ms]", u.Name(), u.Id(), tm_delay)
	} else if tm_delay > 6000 {
		log.Warn("玩家[%s %d] 心跳延迟了[%d ms]，网络不好?", u.Name(), u.Id(), tm_delay)
	}
}

// 检查心跳，毫秒
func (u *GateUser) CheckOffline(now int64) {
	if u.online == false {
		return
	}
	tm_delay := now - u.tm_heartbeat
	if tm_delay > tbl.Global.HearBeat.Timeout {
		log.Warn("玩家[%s %d] 心跳延迟达到[%d ms]，清理离线Session", u.Name(), u.Id(), tm_delay)
		u.KickOut("心跳超时")
	}
}
