package main
import (
	"fmt"
	"sync"
	"time"
	_"strconv"
	"runtime"
	"runtime/debug"
	"os"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/eventqueue"
	_"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
)


func SignalInt(signal os.Signal)    {
	log.Info("SignalInt");
	g_KeyBordInput.Push("quit")
}

func SignalTerm(signal os.Signal)   {
	log.Info("SignalTerm");
	g_KeyBordInput.Push("quit")
}

func SignalHup(signal os.Signal)    {
	log.Info("SignalHup");
	g_KeyBordInput.Push("quit")
}

func SignalCoreDump(signal os.Signal)   {
	log.Info("Signal[%d] Received", signal);
	g_KeyBordInput.Push("quit")
}


func init() {
	fmt.Println("loginserver.init()")
}

type MsgProcess struct {
}

type LoginServer struct {
	net				*network.NetWork
	netconf			*network.NetConf
	hredis      	*redis.Client
	gatemgr			GateManager
	checkinset		map[string]*CheckInAccount			// 正在登陆中的账户(不是在线)
	checkinlocker	sync.Mutex
	msghandlers		[]network.IBaseMsgHandler
	tblloader		*tbl.TblLoader
	runtimestamp    int64
	asynev      	eventque.AsynEventQueue 			// 异步事件处理
	ticker1ms    	*util.GameTicker
}

var g_LoginServer *LoginServer = nil
func NewLoginServer() *LoginServer {
	if g_LoginServer == nil {
		c := &LoginServer{}
		g_LoginServer = c
	}
	return g_LoginServer
}

func Login() *LoginServer {
	return g_LoginServer
}

//func UserMgr() *UserManager {
//	return &Login().usermgr
//}

func GateMgr() *GateManager {
	return &Login().gatemgr
}

func Redis() *redis.Client {
	return Login().hredis
}

func (l *LoginServer) DoInputCmd(cmd string) {
	switch cmd {
	case "gates":
		log.Info("show gates list")
	case "reload":
		l.tblloader.Reload()
	case "num":
		log.Info("num sessions=%d", l.net.SessionSize())
	case "gc":
		log.Info("Start Force GC...")
		runtime.GC()
	case "free":
		log.Info("Start FreeOSMemory...")
		debug.FreeOSMemory()        // 谨慎使用
	}
}


// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
func (l *LoginServer) OnClose(session network.IBaseNetSession) {
	sid := session.Id()
	//delete(l.sessions, sid)
	switch session.Name() {
	case "TaskClient":
		log.Info("和客户端连接断开 sid[%d]", sid)
		l.CheckInSetRemove(sid)
	case "TaskGate":
		log.Info("和GateServer连接断开 sid[%d]", sid)
		l.gatemgr.OnClose(sid)
	default:
		log.Error("OnClose error not regist session:%+v", sid)
	}
}


// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
func (l* LoginServer) OnConnect(session network.IBaseNetSession) {

	//_, findid := l.sessions[session.Id()]
	//if findid == true {
	//	panic(fmt.Sprintf("sid[%d] OnConnect 重复", session.Id()))
	//	return
	//}
	//l.sessions[session.Id()] = session

	switch session.Name() {
	case "TaskClient":
		//log.Info("OnConnect clientsession:%+v", session)
		//session.SetUserDefdata(l)
	case "TaskGate":
		//log.Trace("OnConnect gatesession:%+v", session)
		//session.SetUserDefdata(l)
	default:
		log.Error("not regist client OnConnect session:%+v", session)
		session.Close()
	}
}

func (l *LoginServer) SendMsg(id int, msg pb.Message) bool {
	//session, ok := l.sessions[id]
	//if ok == true {
	//	return session.SendCmd(msg)
	//}
	//return false
	return l.net.SendMsg(id, msg)
}


func (l *LoginServer) GetSession(id int) network.IBaseNetSession {
	//session, _ := l.sessions[id]
	//return session
	return l.net.FindSession(id)
}

func (l *LoginServer) InitMsgHandler() {
	if l.tblloader == nil { panic("should init 'tblloader' first") }
	network.InitGlobalSendMsgHandler(tbl.GetAllMsgIndex())
	l.msghandlers = append(l.msghandlers, NewGW2LMsgHandler())
	l.msghandlers = append(l.msghandlers, NewC2LSMsgHandler())
}

// 重新加载配置
func (l *LoginServer) Reload() {
	if l.tblloader != nil { l.tblloader.Reload() }
}

// 
func (l *LoginServer) Init(fileconf string) bool {

	// 服务器配置
	netconf := &network.NetConf{}
	jsonerr := util.JsonConfParser(fileconf, netconf)
	if jsonerr != nil || netconf == nil {
		log.Error("JsonParser Error or netconf is nil: '%s'", jsonerr)
		return false
	}
	l.netconf = netconf
	log.Info("加载服务器配置ok...")

	// 游戏配置
	l.tblloader = tbl.NewTblLoader(netconf.TblPath)

	// 消息handler
	l.InitMsgHandler()

	// 杂项
	l.ticker1ms = util.NewGameTicker(10 * time.Millisecond, l.Handler10msTick)
	l.ticker1ms.Start()
	l.gatemgr.Init()
	//l.sessions = make(map[int]network.IBaseNetSession)
	l.checkinset = make(map[string]*CheckInAccount)
	l.runtimestamp = 0
	l.asynev.Start(1, 1000000)

	return true
}


// 启动redis
func (l *LoginServer) StartRedis() bool {
	l.hredis = redis.NewClient(&redis.Options {
		Addr:     l.netconf.Redis.Host.String(), // "ip:host"
		Password: l.netconf.Redis.Passwd,        // no passwd 
		DB:       l.netconf.Redis.DB,            // 0: use default DB
	})

	_, err := l.hredis.Ping().Result()
	if err != nil {
		panic(err)
	}

	log.Info("连接Redis[%s]成功", l.netconf.Redis.Host.String())
	return true
}


// 启动网络
func (l* LoginServer) StartNetWork() bool {
	l.net = network.NewNetWork()
	if l.net == nil {
		return false
	}
	l.net.Init(l.netconf, l)
	l.net.SetHttpResponseHandler(HttpServerResponseCallBack)	// Http监听,需要设置处理回调
	if l.net.Start() == false {
		log.Info("初始化网络error...")
		return false
	}
	log.Info("初始化网络ok...")
	return true
}


// 启动完成
func (l *LoginServer) OnStart() {
	log.Info("开始执行OnStart")
	l.runtimestamp = util.CURTIMEMS()
	log.Info("结束执行OnStart")
}

// 程序退出最后清理
func (l *LoginServer) OnStop() {
	l.hredis.Close()
}

//  退出
func (l* LoginServer) Quit() {
	if l.net != nil {
		l.asynev.Shutdown()
		l.net.Shutdown()
	}
}


// 主循环
func (l* LoginServer) Run() {

	// TODO:每帧处理1000条
	now := util.CURTIMEMS()
	lastrun := now - l.runtimestamp
	l.net.Dispatch(network.KFrameDispatchNum * 2, 1000)
	tm_dispath := util.CURTIMEMS()

	// 测试日志
	doEventStatistics(l)
	l.ticker1ms.Run(now)
	l.gatemgr.Tick(now)
	tm_tick := util.CURTIMEMS()


	// 每帧统计耗时
	delay := tm_tick - now
	if lastrun + delay > 20 {
		log.Warn("统计帧耗时 lastrun[%d] total[%d] dispatch[%d] tick[%d]", lastrun, delay, tm_dispath-now, tm_tick-tm_dispath)
	}

	//
	l.runtimestamp = util.CURTIMEMS()
}

func (l *LoginServer) Handler10msTick(now int64) {
	l.CheckInSetTick(now)
	l.asynev.Dispatch()
}

// 添加正在登陆的账户
func (l *LoginServer) CheckInSetAdd(ac string, session network.IBaseNetSession)	{
	client := &CheckInAccount{session:session, account:ac, tm_login:util.CURTIMEMS()}
	l.checkinset[ac] = client
}

// 删除正在登陆的账户
func (l *LoginServer) CheckInSetRemove(sid int)	{
	for k, v := range l.checkinset {
		if v.session.Id() != sid { continue }
		delete(l.checkinset, k)
		return
	}
}

// 查找正在登陆的账户
func (l *LoginServer) CheckInSetFind(ac string) bool {
	_, ok := l.checkinset[ac];
	return ok
}

// 检查超时，客户端session长时间不断开会话或服务器没有收到断开
func (l *LoginServer) CheckInSetTick(now int64)	{
	var timeout int64 = 10000
	for k, v := range l.checkinset {
		if now > v.tm_login + timeout {		// 超过30秒
			log.Error("账户[%s] sid[%d] 长时间[%dms]与loginserver未断开，服务器主动断开", v.account, v.session.Id(), timeout)
			v.session.Close()
			delete(l.checkinset, k)
		}
	}
}

// 插入新异步事件
func (l *LoginServer) AsynEventInsert(event eventque.IEvent) {
	l.asynev.Push(event)
}

// 生成唯一userid
func GenerateUserId() (userid int64, errcode string ) {
	key := "genuserid"
	id, err := Redis().Incr(key).Result()
	var idstart int64 = 1000
	if err != nil {
		log.Error("生成userid redis报错, err: %s", err)
		return 0, "redis不可用"
	}

	return idstart + int64(id), ""
}


