package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	_ "gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	"os"
	"runtime/debug"
	_ "strconv"
	"sync"
	_ "time"
)

func SignalInt(signal os.Signal) {
	log.Info("SignalInt")
	g_KeyBordInput.Push("quit")
}

func SignalTerm(signal os.Signal) {
	log.Info("SignalTerm")
	g_KeyBordInput.Push("quit")
}

func SignalHup(signal os.Signal) {
	log.Info("SignalHup")
	g_KeyBordInput.Push("quit")
}

func SignalCoreDump(signal os.Signal) {
	log.Info("Signal[%d] Received", signal)
	g_KeyBordInput.Push("quit")
}

func init() {
	fmt.Println("loginserver.init()")
}

type MsgProcess struct {
}

type MatchServer struct {
	net     *network.NetWork
	netconf *network.NetConf
	//sessions		map[int]network.IBaseNetSession		// 及时删除，没有任何地方引用golang才会GC
	hredis  *redis.Client
	mutex   sync.Mutex
	gatemgr GateManager
	//usermgr		UserManager
	systimermgr  SysTimerManager
	championmgr  ChampionManager
	roomsvrmgr   RoomSvrManager
	authens      map[string]int
	msghandlers  []network.IBaseMsgHandler
	tblloader    *tbl.TblLoader
	runtimestamp int64
	clienthandler *ClientMsgHandler
}

var g_MatchServer *MatchServer = nil

func NewMatchServer() *MatchServer {
	if g_MatchServer == nil {
		c := &MatchServer{}
		g_MatchServer = c
	}
	return g_MatchServer
}

func Match() *MatchServer {
	return g_MatchServer
}

//func UserMgr() *UserManager {
//	return &Match().usermgr
//}

func GateSvrMgr() *GateManager {
	return &Match().gatemgr
}

func RoomSvrMgr() *RoomSvrManager {
	return &Match().roomsvrmgr
}

func Redis() *redis.Client {
	return Match().hredis
}

func SysTimerMgr() *SysTimerManager {
	return &Match().systimermgr
}

func ChampionMgr() *ChampionManager {
	return &Match().championmgr
}

func ClientMsgAgent() *ClientMsgHandler {
	return Match().clienthandler
}

func (ma *MatchServer) DoInputCmd(cmd string) {
	switch cmd {
	case "gates":
		log.Info("show gates list")
	case "free":
		log.Info("Start FreeOSMemory...")
		debug.FreeOSMemory() // 谨慎使用
	case "notice1":
		log.Info("Notice Suspension Test!")
		noticemsg := &msg.GW2C_MsgNotice{Userid: pb.Int64(0), Name: pb.String("玩家名字"), Head: pb.String("")}
		text := def.MakeNoticeText("玩家名字", "#ffffff", 26) + def.MakeNoticeText("获得", "#fffc00", 30) + def.MakeNoticeText("道具名字", "#ffffff", 26)
		noticemsg.Text = pb.String(text)
		noticemsg.Type = pb.Int32(int32(msg.NoticeType_Suspension))
		send := &msg.MS2GW_MsgNotice{Notice: noticemsg}
		ma.BroadcastGateMsg(send)
	case "notice2":
		log.Info("Notice Marquee  Test!")
		noticemsg := &msg.GW2C_MsgNotice{Userid: pb.Int64(0), Name: pb.String("玩家名字"), Head: pb.String(""), Type: pb.Int32(0)}
		text := def.MakeNoticeText("玩家名字", "#ffffff", 26) + def.MakeNoticeText("获得", "#fffc00", 30) + def.MakeNoticeText("道具名字", "#ffffff", 26)
		noticemsg.Text = pb.String(text)
		noticemsg.Type = pb.Int32(int32(msg.NoticeType_Marquee))
		send := &msg.MS2GW_MsgNotice{Notice: noticemsg}
		ma.BroadcastGateMsg(send)
	}
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
func (ma *MatchServer) OnClose(session network.IBaseNetSession) {
	sid := session.Id()
	//delete(ma.sessions, sid)
	switch session.Name() {
	case "TaskGate":
		log.Info("和Gate连接断开 sid[%d]", sid)
		ma.gatemgr.OnClose(sid)
	case "TaskRoom":
		log.Info("和Room连接断开 sid[%d]", sid)
		ma.roomsvrmgr.OnClose(sid)
	default:
		log.Error("OnClose error not regist session:%+v", sid)
	}
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
func (ma *MatchServer) OnConnect(session network.IBaseNetSession) {

	//ma.sessions[session.Id()] = session
	switch session.Name() {
	case "TaskClient":
		//log.Trace("OnConnect clientsession:%+v", session)
		//session.SetUserDefdata(ma)
	case "TaskGate":
		//log.Trace("OnConnect gatesession:%+v", session)
		//session.SetUserDefdata(ma)
	case "TaskRoom":
		//
	default:
		log.Error("not regist client OnConnect session:%+v", session)
		session.Close()
	}
}

func (ma *MatchServer) SendMsg(id int, msg pb.Message) bool {
	//session, ok := ma.sessions[id]
	//if ok == true {
	//	return session.SendCmd(msg)
	//}
	//return false
	return ma.net.SendMsg(id, msg)
}

func (ma *MatchServer) GetSession(id int) network.IBaseNetSession {
	//session, _ := ma.sessions[id]
	//return session
	return ma.net.FindSession(id)
}

//
func (ma *MatchServer) Init(fileconf string) bool {
	// 服务器配置
	netconf := &network.NetConf{}
	jsonerr := util.JsonConfParser(fileconf, netconf)
	if jsonerr != nil || netconf == nil {
		log.Error("JsonParser Error or netconf is nil: '%s'", jsonerr)
		return false
	}
	ma.netconf = netconf
	log.Info("加载服务器配置ok...")

	// 游戏配置
	ma.tblloader = tbl.NewTblLoader(netconf.TblPath)

	// 消息handler
	ma.InitMsgHandler()

	// 杂项
	ma.gatemgr.Init()
	//ma.usermgr.Init()
	ma.roomsvrmgr.Init()
	ma.systimermgr.Init()
	ma.championmgr.Init()
	//ma.sessions = make(map[int]network.IBaseNetSession)
	ma.authens = make(map[string]int)
	ma.runtimestamp = 0

	return true
}

func (ma *MatchServer) InitMsgHandler() {
	if ma.tblloader == nil {
		panic("should init 'tblloader' first")
	}
	network.InitGlobalSendMsgHandler(tbl.GetAllMsgIndex())
	ma.msghandlers = append(ma.msghandlers, NewGW2MSMsgHandler())
	ma.msghandlers = append(ma.msghandlers, NewRS2MSMsgHandler())
	ma.clienthandler = NewClientMsgHandler()
}

// 启动redis
func (ma *MatchServer) StartRedis() bool {
	ma.hredis = redis.NewClient(&redis.Options{
		Addr:     ma.netconf.Redis.Host.String(), // "ip:host"
		Password: ma.netconf.Redis.Passwd,        // no passwd
		DB:       ma.netconf.Redis.DB,            // 0: use default DB
	})

	_, err := ma.hredis.Ping().Result()
	if err != nil {
		panic(err)
	}

	log.Info("连接Redis[%s]成功", ma.netconf.Redis.Host.String())
	return true
}

// 启动网络
func (ma *MatchServer) StartNetWork() bool {
	ma.net = network.NewNetWork()
	if ma.net == nil {
		return false
	}
	ma.net.Init(ma.netconf, ma)
	ma.net.SetHttpResponseHandler(HttpServerResponseCallBack) // Http监听,需要设置处理回调
	if ma.net.Start() == false {
		log.Info("初始化网络error...")
		return false
	}
	log.Info("初始化网络ok...")
	return true
}

// 启动完成
func (ma *MatchServer) OnStart() {
	log.Info("开始执行OnStart")
	ma.runtimestamp = util.CURTIMEMS()
	log.Info("结束执行OnStart")
}

// 程序退出最后清理
func (ma *MatchServer) OnStop() {
	ma.hredis.Close()
}

//  退出
func (ma *MatchServer) Quit() {
	if ma.net != nil {
		ma.net.Shutdown()
	}
}

// 主循环
func (ma *MatchServer) Run() {

	// TODO:每帧处理2000条
	now := util.CURTIMEMS()
	lastrun := now - ma.runtimestamp
	ma.net.Dispatch(network.KFrameDispatchNum * 2)
	tm_dispath := util.CURTIMEMS()

	//
	ma.roomsvrmgr.Tick(now)
	ma.systimermgr.Tick(now)
	ma.championmgr.Tick(now)
	tm_roomtick := util.CURTIMEMS()
	//
	delay := tm_roomtick - now
	if lastrun+delay > 20 {
		log.Warn("统计帧耗时 lastrun[%d] total[%d] dispatch[%d] roomtick[%d]", lastrun, delay, tm_dispath-now, tm_roomtick-tm_dispath)
	}

	//
	ma.runtimestamp = util.CURTIMEMS()
}

// 公告
func (ma *MatchServer) BroadcastGateMsg(msg pb.Message) {
	ma.gatemgr.Broadcast(msg)
}

func (ma *MatchServer) Reload() {
	if ma.tblloader != nil {
		ma.tblloader.Reload()
	}
}
