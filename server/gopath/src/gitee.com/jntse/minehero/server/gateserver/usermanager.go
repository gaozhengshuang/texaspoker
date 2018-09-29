package main

import (
	_ "fmt"
	_ "gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	pb "github.com/gogo/protobuf/proto"
	"time"

	_ "gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	_ "reflect"
)

// --------------------------------------------------------------------------
/// @brief 账户登陆等待池
// --------------------------------------------------------------------------
type stAccountLogin struct {
	account   string
	tm_expire int64
	verifykey string
}

type LoginWaitPool struct {
	pool map[string]*stAccountLogin
}

func (l *LoginWaitPool) Init() {
	l.pool = make(map[string]*stAccountLogin)
}

func (l *LoginWaitPool) IsFind(acc string) bool {
	_, ok := l.pool[acc]
	return ok
}

func (l *LoginWaitPool) Find(acc string) *stAccountLogin {
	if a, ok := l.pool[acc]; ok {
		return a
	}
	return nil
}

func (l *LoginWaitPool) Insert(acc, key string, expire int64) {
	l.pool[acc] = &stAccountLogin{acc, expire, key}
}

func (l *LoginWaitPool) Remove(acc string) {
	delete(l.pool, acc)
}

func (l *LoginWaitPool) Clear() {
	l.pool = make(map[string]*stAccountLogin)
}

func (l *LoginWaitPool) Tick(now int64) {
	for _, v := range l.pool {
		if now >= v.tm_expire {
			UnBindingAccountGateWay(v.account)
			log.Info("账户:%s 超时还未登录Gate，删除注册信息", v.account)
			delete(l.pool, v.account)
		}
	}
}

type BufferMsg struct {
	msg        pb.Message
	tm_timeout int64
}

// --------------------------------------------------------------------------
/// @brief 玩家管理器
// --------------------------------------------------------------------------
type UserManager struct {
	accounts  map[string]*GateUser
	ids       map[int64]*GateUser
	names     map[string]*GateUser
	msgbuffer map[int64]*BufferMsg
	posmap	  map[int32]map[int32]map[int64]*GateUser //经度参数|维度参数|uid|*GateUser
	canton 	  map[int32]map[int32]int32 //省|市|人数 市级行政区的在线人数
	bigcanton map[int32]int32 //省|人数 省级在线数
}

func (um *UserManager) Init() {
	um.accounts = make(map[string]*GateUser)
	um.names = make(map[string]*GateUser)
	um.ids = make(map[int64]*GateUser)
	um.msgbuffer = make(map[int64]*BufferMsg)
	um.posmap = make(map[int32]map[int32]map[int64]*GateUser)
	um.canton = make(map[int32]map[int32]int32)
	um.bigcanton = make(map[int32]int32)
}

func (um *UserManager) CreateNewUser(session network.IBaseNetSession, account, key, token, face string) (*GateUser, string) {
	user := NewGateUser(account, key, token)
	if user.DBLoad() == false {
		return nil, "加载玩家DB数据失败"
	}
	//玩家自己设置不从第三方带入头像
	//user.SetHead(face, false)

	if user.Online(session, "使用DB登陆") == false {
		return nil, "Online失败"
	}

	WaitPool().Remove(account)
	um.AddUser(user)
	log.Info("当前在线人数:%d", um.AmountOnline())
	return user, ""
}

// 从缓存登陆
func (um *UserManager) LoginByCache(session network.IBaseNetSession, user *GateUser) string {
	if user.Online(session, "使用缓存登陆") == false {
		return "Online失败"
	}
	log.Info("当前在线人数:%d", um.AmountOnline())
	return ""
}

func (um *UserManager) Amount() int {
	return len(um.accounts)
}

func (um *UserManager) AmountOnline() int {
	count := 0
	for _, user := range um.accounts {
		if user.IsOnline() {
			count++
		}
	}
	return count
}

//func (um *UserManager) AddAccount(user *GateUser) {
//	um.accounts[user.Account()] = user
//}

func (um *UserManager) AddUser(user *GateUser) {
	um.accounts[user.Account()] = user
	um.ids[user.Id()] = user
	um.names[user.Name()] = user
}

func (um *UserManager) IsRegisted(acc string) bool {
	_, ok := um.accounts[acc]
	return ok
}

func (um *UserManager) FindByAccount(acc string) *GateUser {
	u, _ := um.accounts[acc]
	return u
}

func (um *UserManager) FindByName(name string) *GateUser {
	user, _ := um.names[name]
	return user
}

func (um *UserManager) FindById(id int64) *GateUser {
	user, _ := um.ids[id]
	return user
}

func (um *UserManager) DelUser(user *GateUser) {
	delete(um.accounts, user.Account())
	delete(um.names, user.Name())
	delete(um.ids, user.Id())
	log.Info("当前在线人数:%d", len(um.accounts))
}

func (um *UserManager) Tick(now int64) {

	// faster broadcast
	for k, v := range um.msgbuffer {
		if now > v.tm_timeout {
			delete(um.msgbuffer, k)
		}
	}

	// user
	for _, user := range um.accounts {
		if um.IsRemove(user, now) {
			continue
		}
		user.Tick(now)
	}
}

func (um *UserManager) IsRemove(user *GateUser, now int64) bool {
	if user.IsCleanUp() {
		user.OnCleanUp()
		um.DelUser(user)
		return true
	}
	return false
}

func (um *UserManager) OnMatchServerClose() {
}

// 房间服务器断开
func (um *UserManager) OnRoomServerClose(sid int) {
	for _, user := range um.accounts {
		if sid == user.RoomSid() {
			//user.SendMsg(&msg.BT_GameOver{Roomid:pb.Int64(user.RoomId())})
			//user.OnGameEnd(nil , "房间服务器断开")
		}
	}
}

// 本服务器退出
func (um *UserManager) OnServerClose() {
	for _, user := range um.accounts {
		user.KickOut("服务器Shutdown")
	}
}

// 广播消息
func (um *UserManager) BroadcastMsg(msg pb.Message) {
	t1 := util.CURTIMEUS()
	for _, user := range um.accounts {
		user.SendMsg(msg)
	}
	log.Trace("BroadcastMsg Amount[%d] 耗时[%d]us", len(um.accounts), util.CURTIMEUS()-t1)
}

// 通过buffer广播消息
func (um *UserManager) BroadcastMsgFaster(msg pb.Message) {
	t1, uuid := util.CURTIMEUS(), util.UUID()
	um.msgbuffer[uuid] = &BufferMsg{msg: msg, tm_timeout: util.CURTIMEMS() + 10000}
	for _, user := range um.accounts {
		user.AddBroadCastMsg(uuid)
	}
	log.Trace("BroadcastMsgFaster Amount[%d] 耗时[%d]us", len(um.accounts), util.CURTIMEUS()-t1)
}

func (um *UserManager) PickBroadcastMsg(uid int64) pb.Message {
	buffermsg, ok := um.msgbuffer[uid]
	if ok == false {
		return nil
	}
	return buffermsg.msg
}

// 异步广播消息
//func (um *UserManager) BroadcastMsgAsyn(msg pb.Message) {
//	arglist := []interface{}{msg}
//	eventque.NewCommonEvent(arglist, um.DoBroadcastMsgAsyn, nil)
//}
//
//func (um *UserManager) DoBroadcastMsgAsyn(arglist []interface{}) []interface{} {
//	if len(arglist) != 1 {
//		log.Fatal("DoBroadcastMsgAsyn 参数数量错误")
//		return nil
//	}
//	msg, ok := arglist[0].(pb.Message)
//	if ok == false {
//		log.Fatal("DoBroadcastMsgAsyn 类型转换错误 argu真实类型是：%s", reflect.TypeOf(arglist[0]).String());
//		return nil
//	}
//
//	// copy lock
//	locker.lock()
//	accounts_tmp := make(map[string]*GateUser)
//	for k, v := range um.accounts { accounts_tmp[k] = v }
//	locker.unlock()
//	for _, user := range accounts_tmp {
//		user.SendMsg(msg)
//	}
//
//	return nil
//}

//now秒，整点回调
func (um *UserManager) IntHourClockCallback(now int64) {

	// 地图事件刷新
	inthour := time.Unix(now, 0).Hour()
	if tbl.Game.MapEvent.TimeRefresh == int64(inthour) {
	}
	log.Info("当前整点[%d]点", inthour)
}


