package main

import (
	"fmt"
	"os"
	"runtime"
	"runtime/debug"
	"strings"
	"time"
	//"database/sql"

	pb "github.com/gogo/protobuf/proto"
	"github.com/go-redis/redis"

	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/mysql"

	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"

)

func SignalInt(signal os.Signal) {
	log.Info("SignalInt")
	g_KeyBordInput.Push("gracefulquit")
}

func SignalTerm(signal os.Signal) {
	log.Info("SignalTerm")
	g_KeyBordInput.Push("gracefulquit")
}

func SignalHup(signal os.Signal) {
	log.Info("SignalHup")
	g_KeyBordInput.Push("gracefulquit")
}

func SignalCoreDump(signal os.Signal) {
	log.Info("Signal[%d] Received", signal)
	g_KeyBordInput.Push("gracefulquit")
}

func init() {
	fmt.Println("gateserver.init()")
}

type StatDispatch struct {
	count int32
}

func (d *StatDispatch) Inc(n int32) {
	d.count += n
}

func (d *StatDispatch) Output(server *GateServer) {
	if g_CmdArgs.EventStat == true {
		if size := server.net.EventQueueSize(); size != 0 {
			log.Info("netevent chansize[%d] dispatchsize[%d]", size, d.count)
		}else {
			log.Info("netevent chansize[0] dispatchsize[%d]", d.count)
		}
	}
	d.count = 0
}

type GateServer struct {
	netconf      	*network.NetConf
	net          	*network.NetWork
	loginsvr     	network.IBaseNetSession
	matchsvr     	network.IBaseNetSession
	hredis       	*redis.Client
	usermgr      	UserManager
	waitpool     	LoginWaitPool
	roomsvrmgr   	RoomSvrManager
	msghandlers  	[]network.IBaseMsgHandler
	tblloader    	*tbl.TblLoader
	rcounter     	util.RedisCounter
	tickers      	[]*util.GameTicker
	gracefulquit 	bool
	runtimestamp 	int64
	hourmonitor  	*util.IntHourMonitorPool
	sf				util.StatFunctionTimeConsume
	sdispatch		StatDispatch
	dbsql      		*mysql.MysqlDriver
	rankmgr      	RankManager
	statisticsmgr 	StatisticsManager
	bimgr 			BiDataManager
}

var g_GateServer *GateServer = nil

func NewGateServer() *GateServer {
	if g_GateServer == nil {
		g_GateServer = &GateServer{}
	}
	return g_GateServer
}

func GateSvr() *GateServer {
	return g_GateServer
}

func Match() network.IBaseNetSession {
	return GateSvr().matchsvr
}

func UserMgr() *UserManager {
	return &GateSvr().usermgr
}

func RankMge() *RankManager {
	return &GateSvr().rankmgr
}

func DB() *mysql.MysqlDriver {
	return GateSvr().dbsql
}

func WaitPool() *LoginWaitPool {
	return &GateSvr().waitpool
}

func RoomSvrMgr() *RoomSvrManager {
	return &GateSvr().roomsvrmgr
}

func StatisticsMgr() *StatisticsManager {
	return &GateSvr().statisticsmgr
}

func BiMgr() *BiDataManager {
	return &GateSvr().bimgr
}

func RCounter() *util.RedisCounter {
	return &GateSvr().rcounter
}

func Redis() *redis.Client {
	return GateSvr().hredis
}

func (g *GateServer) Name() string {
	return g.netconf.Name
}

func (g *GateServer) DoInputCmd(cmd string) {
	subcmd := strings.Split(cmd, " ")
	switch subcmd[0] {
	case "gracefulquit":
		g.QuitGraceful()
	case "gates":
		log.Info("show gates list")
	case "reload":
		g.tblloader.Reload()
	case "num":
		log.Info("user registed in gate num=%d", g.usermgr.Amount())
	case "online":
		log.Info("user online num=%d", g.usermgr.AmountOnline())
	case "post":
		TestHttpPostRedPacketPlatform(subcmd)
	case "gc":
		log.Info("Start Force GC...")
		runtime.GC()
	case "free":
		log.Info("Start FreeOSMemory...")
		debug.FreeOSMemory() // 谨慎使用
	case "mail":
		if len(subcmd) < 2 { return }

		// 金币钻石
		items := make([]*msg.MailItem,0)
		items = append(items, &msg.MailItem{Id:pb.Int32(int32(msg.ItemId_Gold)), Num:pb.Int32(100)})
		items = append(items, &msg.MailItem{Id:pb.Int32(int32(msg.ItemId_Diamond)), Num:pb.Int32(200)})
		SendMail(util.Atol(subcmd[1]), 1002, "1002", 1, items)

		// 单个奖励
		items = make([]*msg.MailItem,0)
		items = append(items, &msg.MailItem{Id:pb.Int32(int32(101)), Num:pb.Int32(1)})
		SendMail(util.Atol(subcmd[1]), 1002, "1002", 101, items)

		// 无奖励
		SendMail(util.Atol(subcmd[1]), 1002, "1002", 124, nil)

		// 多个奖励
		items = make([]*msg.MailItem,0)
		items = append(items, &msg.MailItem{Id:pb.Int32(int32(201)), Num:pb.Int32(1)})
		items = append(items, &msg.MailItem{Id:pb.Int32(int32(202)), Num:pb.Int32(1)})
		items = append(items, &msg.MailItem{Id:pb.Int32(int32(203)), Num:pb.Int32(1)})
		SendMail(util.Atol(subcmd[1]), 0, "", 141, items, "jakcy", 1002)

		//
		items = make([]*msg.MailItem,0)
		items = append(items, &msg.MailItem{Id:pb.Int32(int32(110)), Num:pb.Int32(1)})
		SendMail(util.Atol(subcmd[1]), 0, "", 161, items, "jacky")

		//
		items = make([]*msg.MailItem,0)
		items = append(items, &msg.MailItem{Id:pb.Int32(int32(111)), Num:pb.Int32(1)})
		SendMail(util.Atol(subcmd[1]), 0, "", 164, items, "jacky")


	default:
		log.Error("Input Cmd Invalid cmd[%s]", cmd)
	}
}

func (g *GateServer) OnClose(session network.IBaseNetSession) {
	sid := session.Id()
	switch session.Name() {
	case "LoginConnector":
		g.loginsvr = nil
		log.Info("sid[%d] 和LoginServer连接断开", sid)
	case "MatchConnector":
		g.matchsvr = nil
		log.Info("sid[%d] 和MatchServer连接断开", sid)
		g.usermgr.OnMatchServerClose()
	case "TaskRoom":
		log.Info("sid[%d] 和RoomServer连接断开", sid)
		g.roomsvrmgr.OnClose(sid)
		break
	case "TaskClient":
		log.Info("sid[%d] 和客户端连接断开", sid)
		user := ExtractSessionUser(session)
		if user != nil {
			user.OnDisconnect()
		}
	default:
		log.Error("OnClose error not regist session:%+v", sid)
	}
}

func (g *GateServer) OnConnect(session network.IBaseNetSession) {
	//log.Trace("OnConnect session:%+v", session)
	switch session.Name() {
	case "TaskClient":
		break
	case "TaskRoom":
		break
	case "LoginConnector":
		g.loginsvr = session.(network.IBaseNetSession)
		g.RegistToLoginServer()
	case "MatchConnector":
		g.matchsvr = session.(network.IBaseNetSession)
		g.RegistToMatchServer()
		break
	default:
		log.Error("OnConnect error not regist session:%+v", session)
		session.Close()
	}
}

func (g *GateServer) Reload() {
	if g.tblloader != nil {
		g.tblloader.Reload()
	}
}

//
func (g *GateServer) Init(fileconf string) bool {
	// 服务器配置
	netconf := &network.NetConf{}
	jsonerr := util.JsonConfParser(fileconf, netconf)
	if jsonerr != nil || netconf == nil {
		log.Error("JsonParser Error or netconf is nil: '%s'", jsonerr)
		return false
	}
	g.netconf = netconf
	log.Info("加载[%s]服务器配置ok...", netconf.Name)

	// 游戏配置
	g.tblloader = tbl.NewTblLoader(netconf.TblPath)

	// 消息handler
	g.InitMsgHandler()

	// 整点回调
	hourmonitor := util.NewIntHourMonitorPool()
	hourmonitor.Init()
	hourmonitor.Regist(0, ZeroHourClockCallback)
	for i := 1; i < 24; i++ {
		hourmonitor.Regist(int64(i), IntHourClockCallback)
	}
	g.hourmonitor = hourmonitor

	if g.InitMySql() == false {
		log.Error("初始化mysql失败")
		return false
	}

	//
	g.usermgr.Init()
	g.waitpool.Init()
	g.roomsvrmgr.Init()
	g.statisticsmgr.Init()
	g.bimgr.Init()
	//g.countmgr.Init()
	//g.gamemgr.Init()
	g.tickers = append(g.tickers, util.NewGameTicker(60*time.Second, g.Handler1mTick))
	g.tickers = append(g.tickers, util.NewGameTicker(01*time.Second, g.Handler1sTick))
	g.tickers = append(g.tickers, util.NewGameTicker(100*time.Millisecond, g.Handler100msTick))
	for _, t := range g.tickers {
		t.Start()
	}

	g.runtimestamp = 0
	g.sf.Init(10)
	return true
}

func (g *GateServer) InitMySql() bool {
	mysqlconf := &mysql.MysqlConf{}
	jsonerr := util.JsonConfParser("../conf/mysql.json", mysqlconf)
	if jsonerr != nil || mysqlconf == nil {
		log.Error("解析Mysql配置失败[%s]", jsonerr)
		return false
	}
	log.Info("加载mysql配置ok...")

	g.dbsql = &mysql.MysqlDriver{}
	g.dbsql.Init(mysqlconf)
	if err := g.dbsql.Open(); err != nil {
		log.Info("连接Mysql数据库失败[%#v] 原因[%s]", mysqlconf, err)
		return false
	}

	log.Info("连接Mysql数据库成功[%#v]", mysqlconf)
	return true
}

func (g *GateServer) Handler1mTick(now int64) {
	g.rcounter.BatchSave(20)
	g.bimgr.OnTick1m()

}

func (g *GateServer) Handler1sTick(now int64) {
	g.rankmgr.Tick()
	g.sdispatch.Output(g)
}

func (g *GateServer) Handler100msTick(now int64) {
	g.waitpool.Tick(now)

	// 所有玩家下线存盘
	if g.gracefulquit && g.usermgr.Amount() == 0 {
		g_KeyBordInput.Push("quit")
	}
}

func (g *GateServer) InitMsgHandler() {
	if g.tblloader == nil {
		panic("should init 'tblloader' first")
	}
	network.InitGlobalSendMsgHandler(tbl.GetAllMsgIndex())
	g.msghandlers = append(g.msghandlers, NewC2GWMsgHandler())
	g.msghandlers = append(g.msghandlers, NewLS2GMsgHandler())
	g.msghandlers = append(g.msghandlers, NewMS2GWMsgHandler())
	g.msghandlers = append(g.msghandlers, NewRS2GWMsgHandler())

}

// 启动redis
func (g *GateServer) StartRedis() bool {
	g.hredis = redis.NewClient(&redis.Options{
		Addr:     g.netconf.Redis.Host.String(), // "ip:host"
		Password: g.netconf.Redis.Passwd,        // no passwd
		DB:       g.netconf.Redis.DB,            // 0: use default DB
	})

	_, err := g.hredis.Ping().Result()
	if err != nil {
		panic(err)
	}

	log.Info("连接Redis[%s]成功", g.netconf.Redis.Host.String())
	return true
}

// 启动网络
func (g *GateServer) StartNetWork() bool {

	// tcp network
	g.net = network.NewNetWork()
	if g.net == nil {
		return false
	}
	g.net.Init(g.netconf, g)
	g.net.SetHttpResponseHandler(HttpServerResponseCallBack) // Http监听,需要设置处理回调
	if g.net.Start() == false {
		log.Info("初始化网络error...")
		return false
	}
	log.Info("初始化网络ok...")
	return true
}

//  退出
func (g *GateServer) Quit() {
	log.Info("服务器 QuitForce")
	if g.net != nil {
		g.net.Shutdown()
	}
}

// 优雅退出
func (g *GateServer) QuitGraceful() {
	log.Info("服务器 QuitGraceful")
	g.gracefulquit = true
	UserMgr().OnServerClose()
}

func (g *GateServer) IsGracefulQuit() bool {
	return g.gracefulquit
}

// 启动完成
func (g *GateServer) OnStart() {
	log.Info("开始执行OnStart")

	// 清除Gate上的账户信息
	clientconf := g.ClientListenerConf()
	ClearGateAccounts(clientconf.Host.Ip, clientconf.Host.Port)

	//
	g.rcounter.Init(Redis())
	g.rankmgr.Init()
	//
	g.runtimestamp = util.CURTIMEMS()
	log.Info("结束执行OnStart")
}

// 程序退出最后清理
func (g *GateServer) OnStop() {
	for _, t := range g.tickers {
		t.Stop()
	}

	if g.hredis != nil {
		g.hredis.Close()
	}

	if g.dbsql != nil {
		g.dbsql.Close()
	}
}

func (g *GateServer) ClientListenerConf() *network.WsListenConf {
	conf, findok := g.netconf.FindWsListenConf("ClientListener")
	if findok == false {
		panic("not found ClientListener")
	}
	return &conf
}

// 主循环
func (g *GateServer) Run() {

	// TODO:每帧处理1000条
	now := util.CURTIMEMS() // 毫秒
	lastrun := now - g.runtimestamp
	g.sf.Record(now)
	dispatched := g.net.Dispatch(network.KFrameDispatchNum)
	g.sdispatch.Inc(int32(dispatched))
	g.sf.Record(util.CURTIMEMS())

	//
	g.usermgr.Tick(now)
	g.sf.Record(util.CURTIMEMS())

	//
	g.hourmonitor.Run(now / 1000) // 秒
	for _, t := range g.tickers {
		t.Run(now)
	}
	g.sf.Record(util.CURTIMEMS())

	// 每帧统计耗时
	if delay := g.sf.Total(); lastrun + delay > 20 { // 40毫秒
		log.Warn("统计帧耗时 lastrun[%d] total[%d] dispatch[%d] userticker[%d] svrticker[%d]",
			lastrun, delay, g.sf.Diff(0, 1), g.sf.Diff(1,2), g.sf.Diff(2,3))
	}

	//
	g.runtimestamp = util.CURTIMEMS()
	g.sf.Reset()
}

// 注册到Login
func (g *GateServer) RegistToLoginServer() {
	if g.loginsvr == nil {
		return
	}
	conf := g.ClientListenerConf()
	send := &msg.GW2L_ReqRegist{
		Account: pb.String("gate_account_123"),
		Passwd:  pb.String("gate_passwd_123"),
		Host: &msg.IpHost{
			Ip:   pb.String(conf.Host.Ip),
			Port: pb.Int(conf.Host.Port)},
		Name: pb.String(g.Name()),
	}
	g.loginsvr.SendCmd(send)
	log.Info("请求注册网关'%s'到Login", conf.Host.String())
}

func (g *GateServer) RegistToMatchServer() {
	if g.matchsvr == nil {
		return
	}

	conf, findok := g.netconf.FindTcpListenConf("RoomListener")
	if findok == false {
		log.Error("not found conf 'ClientListener'")
		return
	}

	send := &msg.GW2MS_ReqRegist{
		Account:   pb.String("gate_account_123"),
		Passwd:    pb.String("gate_passwd_123"),
		Agentname: pb.String(g.Name()),
		Host: &msg.IpHost{
			Ip:   pb.String(conf.Host.Ip),
			Port: pb.Int(conf.Host.Port),
		},
	}
	g.matchsvr.SendCmd(send)
	log.Info("请求注册网关'%s'到Match", conf.Host.String())
}

func (g *GateServer) RegistRoomServer(agent *RoomAgent) {
	g.roomsvrmgr.AddRoom(agent)
	log.Info("注册房间服 id=%d [%s] 当前总数:%d", agent.Id(), agent.name, g.roomsvrmgr.Num())
}

// --------------------------------------------------------------------------
/// @brief 
///
/// @param agent 非0指定网关(0其他所有网关)
/// @param pb.Message
// --------------------------------------------------------------------------
func (g *GateServer) SendGateMsg(agent int64, m pb.Message) bool {
	name := pb.MessageName(m)
	if name == "" {
		log.Fatal("SendGateMsg 获取proto名字失败[%s]", m)
		return false
	}
	msgbuf, err := pb.Marshal(m)
	if err != nil {
		log.Fatal("SendGateMsg 序列化proto失败[%s][%s]", name, err)
		return false
	}

	send := &msg.GW2GW_MsgTransfer{ Uid:pb.Int64(agent), Name:pb.String(name), Buf:msgbuf }
	return g.matchsvr.SendCmd(send)
}

// 通用公告
func (g *GateServer) SendNotice(face string, ty msg.NoticeType, subtext ...string) {
	noticemsg := &msg.GW2C_MsgNotice{Userid: pb.Int64(0), Name: pb.String(""), Head: pb.String(face), Type: pb.Int32(int32(ty))}
	noticemsg.Text = pb.String(strings.Join(subtext, ""))

	send := &msg.GW2MS_MsgNotice{Notice: noticemsg}
	Match().SendCmd(send)
}

// 重启服务器清理服务器上账户信息
func ClearGateAccounts(ip string, port int) error {
	key := fmt.Sprintf("%s_%s:%d", def.RedisKeyGateAccounts, ip, port)
	err := Redis().Del(key).Err()
	if err == nil {
		log.Info("Del Redis Key[%s] Ok", key)
	}
	return err
}

// Redis移除账户网关记录
func UnBindingAccountGateWay(account string) {

	// 解除绑定账户的GateWay信息
	key := fmt.Sprintf("%s_%s", def.RedisKeyAccountGate, account)
	Redis().Del(key)

	// GateWay移除账户信息
	clientconf := GateSvr().ClientListenerConf()
	ip, port := clientconf.Host.Ip, clientconf.Host.Port
	key = fmt.Sprintf("%s_%s:%d", def.RedisKeyGateAccounts, ip, port)
	Redis().SRem(key, account)
}

// now 秒
func ZeroHourClockCallback(now int64) {
	log.Info("==========零点回调开始===========")
	//UserMgr().GiveFreeStep(now)
	UserMgr().ZeroHourClockCallback(now)
	log.Info("==========零点回调结束===========")
}

// now 秒
func IntHourClockCallback(now int64) {
	log.Info("==========整点回调开始===========")
	//UserMgr().GiveFreeStep(now)
	UserMgr().IntHourClockCallback(now)
	log.Info("==========整点点回调结束===========")
}


