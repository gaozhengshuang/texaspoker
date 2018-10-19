package main
import (
	"fmt"
	"time"
	"runtime/debug"
	"strings"
	"os"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	"gitee.com/jntse/minehero/server/def"
	pb "github.com/gogo/protobuf/proto"
	"github.com/go-redis/redis"
)

func SignalInt(signal os.Signal)    {
	log.Info("SignalInt");
	g_KeyBordInput.Push("gracefulquit")
}

func SignalTerm(signal os.Signal)   {
	log.Info("SignalTerm");
	g_KeyBordInput.Push("gracefulquit")
}

func SignalHup(signal os.Signal)    {
	log.Info("SignalHup");
	g_KeyBordInput.Push("gracefulquit")
}

func SignalCoreDump(signal os.Signal)   {
	log.Info("Signal[%d] Received", signal);
	g_KeyBordInput.Push("gracefulquit")
}


func init() {
	fmt.Println("roomserver.init()")
}

type RoomServer struct {
	netconf			*network.NetConf
	net				*network.NetWork
	matchsvr		network.IBaseNetSession
	hredis			*redis.Client
	gatemgr			GateManager
	roommgr			RoomManager
	usermgr			UserManager
	aiusermgr		AIUserManager
	systimermgr		SysTimerManager
	championmgr		ChampionManager
	//sessions		map[int]network.IBaseNetSession     // 及时删除，没有任何地方引用golang才会GC
	msghandlers		[]network.IBaseMsgHandler
	clienthandler	*ClientMsgHandler
	tblloader		*tbl.TblLoader
	//countmgr		  CountManager
	rcounter		util.RedisCounter
	ticker1m		*util.GameTicker
	ticker5s		*util.GameTicker
	ticker100ms		*util.GameTicker
	runtimestamp 	int64
	gracefulquit 	bool
	noticerepeat 	[]*msg.RS2MS_MsgNotice
	noticepause 	int64
	itembase		[]*table.ItemBaseDataDefine
	namebase		[]*table.TNameDefine
}

var g_RoomServer *RoomServer = nil
func RoomServerIns() *RoomServer {
	if g_RoomServer == nil { g_RoomServer = &RoomServer{} }
	return g_RoomServer
}

func RoomSvr() *RoomServer {
	return g_RoomServer
}

func Match() network.IBaseNetSession {
	return RoomSvr().matchsvr
}

func GateMgr() *GateManager {
	return &RoomSvr().gatemgr
}

func RoomMgr() *RoomManager {
	return &RoomSvr().roommgr
}

func UserMgr() *UserManager {
	return &RoomSvr().usermgr
}

func AIUserMgr() *AIUserManager {
	return &RoomSvr().aiusermgr
}

func Redis() *redis.Client {
	return RoomSvr().hredis
}

func SysTimerMgr() *SysTimerManager {
	return &RoomSvr().systimermgr
}

func ChampionMgr() *ChampionManager {
	return &RoomSvr().championmgr
}

func ClientMsgAgent() *ClientMsgHandler {
	return RoomSvr().clienthandler
}

//func CountMgr() *CountManager {
//	return &RoomSvr().countmgr
//}

func RCounter() *util.RedisCounter {
	return &RoomSvr().rcounter
}

func (rs *RoomServer) DoInputCmd(cmd string) {
	switch cmd {
	case "gracefulquit":
		rs.QuitGraceful()
	case "gates":
		log.Info("show gates list")
	case "free":
		debug.FreeOSMemory()        // 谨慎使用
	case "reload":
		rs.Reload()
	}
}

func (rs *RoomServer) OnClose(session network.IBaseNetSession) {
	sid := session.Id()
	//delete(rs.sessions, sid)
	subname := strings.Split(session.Name(), "_")
	switch subname[0] {
	case "GateConnector":
		log.Info("和GateServer连接断开 sid[%d]", sid)
		rs.gatemgr.OnClose(session)
		rs.roommgr.OnGateClose(sid)
	case "MatchConnector":
		rs.matchsvr = nil
		log.Info("和MatchServer连接断开 sid[%d]", sid)
	default:
		log.Error("OnClose error not regist session:%+v", sid)
	}
}

func (rs *RoomServer) OnConnect(session network.IBaseNetSession) {
	//rs.sessions[session.Id()] = session
	//log.Trace("OnConnect session:%+v", session)
	subname := strings.Split(session.Name(), "_")
	switch subname[0] {
	case "GateConnector":
		rs.RegistToGateServer(session)
		break
	case "MatchConnector":
		rs.matchsvr = session
		rs.RegistToMatchServer()
		break
	default:
		log.Error("OnConnect error not regist session:%+v", session)
		session.Close()
	}
}

func (rs *RoomServer) SendMsg(id int, msg pb.Message) bool {
	//session, ok := rs.sessions[id]
	//if ok == true {
	//	return session.SendCmd(msg)
	//}
	//return false
	return rs.net.SendMsg(id, msg)
}

func (rs *RoomServer) SendClientMsg(gateid int, uid int64, m pb.Message) bool {
	name := pb.MessageName(m)
	if name == "" {
		log.Fatal("SendClientMsg 获取proto名字失败[%s]", m)
		return false
	}
	msgbuf, err := pb.Marshal(m)
	if err != nil {
		log.Fatal("SendClientMsg 序列化proto失败[%s][%s]", name, err)
		return false
	}

	send := &msg.RS2GW_MsgTransfer{Uid: pb.Int64(uid), Name: pb.String(name), Buf: msgbuf}
	if gateid != 0 {
		return rs.net.SendMsg(gateid, send)
	} else {
		GateMgr().Broadcast(send) 
		return true
	}
}


func (rs *RoomServer) GetSession(id int) network.IBaseNetSession {
	//session, _ := rs.sessions[id]
	//return session
	return rs.net.FindSession(id)
}

// 
func (rs *RoomServer) Init(fileconf string) bool {

	//加载服务器配置
	netconf := &network.NetConf{}
	jsonerr := util.JsonConfParser(fileconf, netconf)
	if jsonerr != nil || netconf == nil {
		log.Error("JsonParser Error or netconf is nil: '%s'", jsonerr)
		return false
	}
	rs.netconf = netconf
	log.Info("加载[%s]服务器配置ok...", netconf.Name)

	// 游戏配置
	rs.tblloader = tbl.NewTblLoader(netconf.TblPath)

	// 消息handler
	rs.InitMsgHandler()

	//
	//rs.sessions = make(map[int]network.IBaseNetSession)
	rs.gatemgr.Init()
	rs.usermgr.Init()
	rs.aiusermgr.Init()
	rs.systimermgr.Init()
	rs.championmgr.Init()

	//rs.countmgr.Init()
	rs.ticker1m = util.NewGameTicker(60 * time.Second, rs.Handler1mTick)
	rs.ticker5s = util.NewGameTicker(05 * time.Second, rs.Handler5sTick)
	rs.ticker100ms = util.NewGameTicker(100 * time.Millisecond, rs.Handler100msTick)

	rs.ticker1m.Start()
	rs.ticker5s.Start()
	rs.ticker100ms.Start()

	//初始道具和名字slice
	rs.itembase = make([]*table.ItemBaseDataDefine,0)
	for _, v := range tbl.ItemBase.ItemBaseDataById { if v.Type != 1 && v.Type != 10 && v.Type != 6 { rs.itembase = append(rs.itembase, v) } }
	rs.namebase = make([]*table.TNameDefine,0)
	for _, v := range tbl.NameBase.TNameById { rs.namebase = append(rs.namebase, v) }

	//
	rs.runtimestamp = 0
	return true
}

func (rs *RoomServer) Handler1mTick(now int64) {
	//log.Trace("开始批量统计")
	rs.rcounter.BatchSave(10)
}

func (rs *RoomServer) Handler5sTick(now int64) {
	//rs.TickCacheNotice(now)
}

func (rs *RoomServer) Handler100msTick(now int64) {
	if rs.gracefulquit && rs.roommgr.Num() == 0 {
		g_KeyBordInput.Push("quit")
	}
}

func (rs *RoomServer) InitMsgHandler() {
	if rs.tblloader == nil { panic("should init 'tblloader' first") }
	network.InitGlobalSendMsgHandler(tbl.GetAllMsgIndex())
	rs.msghandlers = append(rs.msghandlers, NewC2GWMsgHandler())
	rs.msghandlers = append(rs.msghandlers, NewMS2RSMsgHandler())
	rs.clienthandler = NewClientMsgHandler()
}

// 启动redis
func (rs *RoomServer) StartRedis() bool {
	rs.hredis = redis.NewClient(&redis.Options {
		Addr:     rs.netconf.Redis.Host.String(),	// "ip:host"
		Password: rs.netconf.Redis.Passwd,		// no passwd 
		DB:       rs.netconf.Redis.DB,  			// 0: use default DB
	})

	_, err := rs.hredis.Ping().Result()
	if err != nil {
		panic(err)
	}

	log.Info("连接Redis[%s]成功", rs.netconf.Redis.Host.String())
	return true
}


// 启动网络
func (rs *RoomServer) StartNetWork() bool {
	// tcp network
	rs.net = network.NewNetWork()
	if rs.net == nil {
		return false
	}
	rs.net.Init(rs.netconf, rs)
	rs.net.SetHttpResponseHandler(HttpServerResponseCallBack) // Http监听,需要设置处理回调
	if rs.net.Start() == false {
		log.Info("初始化网络error...")
		return false
	}
	log.Info("初始化网络ok...")
	return true
}

// 启动完成
func (rs *RoomServer) OnStart() {
	log.Info("开始执行OnStart")

	rs.runtimestamp = util.CURTIMEMS()
	rs.cleanRoom()	// 删除房间
	rs.rcounter.Init(Redis())	// 计数器
	rs.roommgr.Init()
	rs.championmgr.InitChampionShip()
	rs.aiusermgr.CreateRoomAIUser()

	log.Info("结束执行OnStart")
}

// 程序退出最后清理
func (rs *RoomServer) OnStop() {
	rs.ticker1m.Stop()
	rs.ticker5s.Stop()
	rs.ticker100ms.Stop()
	rs.hredis.Close()
}

// 优雅退出
func (rs *RoomServer) QuitGraceful() {
	rs.gracefulquit = true
	rs.roommgr.Shutdown()
	RCounter().Save()
	log.Info("服务器 QuitGraceful")
}       


//  强制退出
func (rs *RoomServer) Quit() {
	log.Info("服务器 QuitForce")
	if rs.net != nil {
		rs.net.Shutdown()
	}       
}       


// 主循环
func (rs *RoomServer) Run() {

	// TODO:每帧处理2000条
	now := util.CURTIMEMS()
	lastrun := now - rs.runtimestamp
	rs.net.Dispatch(network.KFrameDispatchNum * 2)
	tm_dispath := util.CURTIMEMS()

	// 测试日志
	doEventStatistics(rs)

	//
	rs.roommgr.Tick(now)
	rs.usermgr.Tick(now)
	rs.championmgr.Tick(now)
	tm_roomticker := util.CURTIMEMS()

	//
	rs.ticker1m.Run(now)
	rs.ticker5s.Run(now)
	rs.ticker100ms.Run(now)
	tm_svrticker := util.CURTIMEMS()

	// 每帧统计耗时
	delay := tm_svrticker - now
	if lastrun + delay > 20 {
		log.Warn("统计帧耗时 lastrun[%d] total[%d] dispatch[%d] roomticker[%d] svrticker[%d]",
			lastrun, delay, tm_dispath - now, tm_roomticker - tm_dispath, tm_svrticker - tm_roomticker)
	}

	//
	rs.runtimestamp = util.CURTIMEMS()
}

func (rs *RoomServer) Net() *network.NetWork {
	return rs.net
}

func (rs *RoomServer) Name() string {
	return rs.netconf.Name
}

func (rs *RoomServer) RegistToMatchServer() {
	if rs.matchsvr == nil {
		return
	}

	send := &msg.RS2MS_ReqRegist{
		Account : pb.String("roomagent"),
		Passwd : pb.String("roomagentpwd"),
		Name : pb.String(rs.Name()),
	}
	rs.matchsvr.SendCmd(send)
	log.Info("请求注册Room[%s]到Match",rs.Name())
}

func (rs *RoomServer) RegistToGateServer(session network.IBaseNetSession) {
	send := &msg.RS2GW_ReqRegist {
		Account : pb.String("roomagent"),
		Passwd : pb.String("roomagentpwd"),
		Agentname : pb.String(rs.Name()),
	}
	session.SendCmd(send)
	log.Info("请求注册Room[%s]到Gate[%s]",rs.Name(), session.Name())
}

func (rs *RoomServer) cleanRoom() {
	key := def.RoomAgentLoadRedisKey(rs.Name())
	_, err := Redis().Del(key).Result()
	log.Info("del key:%s result:%v", key, err)
}

// 通用公告
func (rs *RoomServer) SendNotice(face string, ty msg.NoticeType, subtext ...string) {
	noticemsg := &msg.GW2C_MsgNotice{Userid:pb.Int64(0), Name:pb.String(""), Head:pb.String(face), Type:pb.Int32(int32(ty))}
	noticemsg.Text = pb.String(strings.Join(subtext, ""))
	send := &msg.RS2MS_MsgNotice{ Notice: noticemsg}
	Match().SendCmd(send)

	rs.noticepause = util.CURTIMEMS() + 10000	// 临时暂停重复公告
	rs.CacheNotice(send)
}

func (rs *RoomServer) SendNoticeByMsg(notice *msg.RS2MS_MsgNotice) {
	Match().SendCmd(notice)
}

// 重新加载配置
func (rs *RoomServer) Reload() {
	if rs.tblloader != nil { rs.tblloader.Reload() }
}

func (rs *RoomServer) CacheNotice(notice *msg.RS2MS_MsgNotice) {
	rs.noticerepeat = append(rs.noticerepeat, notice)
}

// 随机重复公告
//func (rs *RoomServer) TickCacheNotice(now int64) {
//	if now < rs.noticepause || Match() == nil { 
//		return 
//	}
//
//	amount := int32(len(rs.noticerepeat))
//	if amount < 100 || util.SelectPercent(50) == true {
//		// 头像
//		noticemsg := &msg.GW2C_MsgNotice{Userid:pb.Int64(0), Name:pb.String(""), Head:pb.String(""), Type:pb.Int32(int32(msg.NoticeType_Suspension))}
//		imageindex := util.RandBetween(0, 1200)
//		faceurl := fmt.Sprintf("http://jump.cdn.giantfun.cn/cdn/jumphead/tx (%d).jpg",imageindex)
//
//		itemname, username := "钻石", rs.GetRandNickName()
//		if util.SelectPercent(50) == true { itemname = rs.GetRandItemName() }
//		if itemname == "" || username == "" { return }
//		subtext := []string	{
//			def.MakeNoticeText("恭喜","#ffffff", 26), def.MakeNoticeText(username,"#ffffff", 26),
//			def.MakeNoticeText("获得","#fffc00", 26), def.MakeNoticeText(itemname,"#ffffff", 26),
//		}
//
//		noticemsg.Head, noticemsg.Text = pb.String(faceurl), pb.String(strings.Join(subtext, ""))
//		send := &msg.RS2MS_MsgNotice{ Notice:noticemsg }
//		rs.SendNoticeByMsg(send)
//		return
//	}
//
//	randnotice := util.RandBetween(0, amount-1)
//	if randnotice >= 0 && randnotice < amount {
//		rs.SendNoticeByMsg(rs.noticerepeat[randnotice])
//	}
//}

func (rs *RoomServer) GetRandItemName() string {
	lenlist := int32(len(rs.itembase))
	if lenlist <= 0 {
		return ""
	}

	rnd := util.RandBetween(0, lenlist-1)
	if rnd >= 0 && rnd < lenlist {
		return rs.itembase[rnd].Name
	}

	return ""
}

func (rs *RoomServer) GetRandNickName() string {
	lenlist := int32(len(rs.namebase))
	if lenlist <= 0 {
		return ""
	}

	rnd := util.RandBetween(0, lenlist-1)
	if rnd >= 0 && rnd < lenlist {
		return rs.namebase[rnd].Name
	}

	return ""
}


