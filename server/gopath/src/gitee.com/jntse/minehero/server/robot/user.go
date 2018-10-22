package main
import (
	"fmt"
	"time"
	"reflect"
	"strings"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)


func init() {
	fmt.Println("init()")
}

// 玩家连接状态切换
const (
	kNetStatLoginDisconnect = iota + 1
	kNetStatLoginConnecting
	kNetStatLoginConnected

	kNetStatGateDisConnect
	kNetStatGateConnecting
	kNetStatGateConnected
)

// 玩家网络
type UserNet struct {
	net			*network.NetWork
	login		network.IBaseNetSession
	gate		network.IBaseNetSession
	ch_cmd		chan string
	loginstat	int32
	gatestat	int32
}

// 玩家
type User struct {
	UserNet
	UserBase
	do_heart	bool
	do_jump		bool
	ticker1s   	*util.GameTicker
	ticker5s   	*util.GameTicker
	ticker100ms *util.GameTicker
	roomid		int64
	roompwd		string
}

func NewUser() *User {
	return &User{}
}

func (u *User) Init(account string, passwd string) bool {

	// ticker
	u.ticker1s  = util.NewGameTicker(1 * time.Second, u.OnTicker1s)
	u.ticker5s  = util.NewGameTicker(5 * time.Second, u.OnTicker5s)
	u.ticker100ms = util.NewGameTicker(100 * time.Millisecond, u.OnTicker100ms)
	u.ticker1s.Start()
	u.ticker5s.Start()
	u.ticker100ms.Start()
	u.do_heart = true
	u.do_jump = false
	u.loginstat = kNetStatLoginDisconnect
	u.gatestat = kNetStatGateDisConnect
	u.ch_cmd = make(chan string, 10)
	u.roomid = 0

	//
	u.UserBase.Init(account, passwd, "13681626939", "510722")
	return true
}

func (u *User) Net() *network.NetWork {
	return u.net
}

func (u *User) StartNetWork(netconf *network.NetConf) bool {
	// 初始化网络
	u.net = network.NewNetWork()
	u.net.Init(netconf, u)
	if u.net.Start() == false {
		log.Info("初始网络失败...")
		return false
	}
	log.Info("初始网络ok...")
	return true
}

// --------------------------------------------------------------------------
/// @brief TODO: 
// --------------------------------------------------------------------------
func (u *User) OnClose(session network.IBaseNetSession) {
	sid := session.Id()
	subname := strings.Split(session.Name(), "_")
	switch subname[0] {
	case "LoginConnector":
		log.Info("和LoginServer连接断开 sid[%d]", sid)
		u.SetLoginSession(nil)
	case "GateConnector":
		log.Info("和GateServer连接断开 sid[%d]", sid)
		u.SetGateSession(nil)
	default:
		log.Error("not regist client OnConnect session:%+v", sid)
	}
}

// --------------------------------------------------------------------------
/// @brief 
// --------------------------------------------------------------------------
func (u *User) OnConnect(session network.IBaseNetSession)	{
	subname := strings.Split(session.Name(), "_")
	switch subname[0] {
	case "LoginConnector":
		//log.Trace("OnConnect loginsession:%+v", session)
		session.SetUserDefData(u)
		u.SetLoginSession(session)
		u.SendLogin()
		//u.RegistAccount()
	case "GateConnector":
		//log.Trace("OnConnect gatesession:%+v", session)
		session.SetUserDefData(u)
		u.SetGateSession(session)
		u.SendGateMsg(u.NewReqLoginGateMsg())
	default:
		log.Error("not regist client OnConnect session:%+v", session)
	}
}

// 连接LoginServer
func (u *User) LoginConnect() {
	if u.loginstat != kNetStatLoginDisconnect || u.gatestat != kNetStatGateDisConnect {
		return
	}

	conf , ok := RobotMgr().NetConf().FindWsConnectConf("LoginConnector")
	if ok == false {
		panic("can't find WsConnectConf 'LoginConnector' ")
		return
	}

	conf.Name = "LoginConnector" + "_" + u.Account()		// 连接器名必须唯一
	if u.net.AddWsConnector(conf) == false {
		//panic("AddGateConnector Fail")
		return
	}

	u.loginstat = kNetStatLoginConnecting
}

// --------------------------------------------------------------------------
/// @brief
// --------------------------------------------------------------------------
func (u *User) SetLoginSession(s network.IBaseNetSession) {
	u.login = s
	if s == nil { u.loginstat = kNetStatLoginDisconnect }
	if s != nil { u.loginstat = kNetStatLoginConnected }
}

func (u *User) SetGateSession(s network.IBaseNetSession) {
	u.gate = s
	if s == nil { u.gatestat = kNetStatGateDisConnect }
	if s != nil { u.gatestat = kNetStatGateConnected }
}

func (u *User) SendLoginMsg(msg pb.Message) bool {
	if u.login == nil || reflect.ValueOf(u.login).IsNil() {
		panic("User login session is nil")
		return false
	}
	return u.login.SendCmd(msg)
}

func (u *User) SendGateMsg(msg pb.Message) bool {
	if u.gate == nil || reflect.ValueOf(u.gate).IsNil() {
		panic("User gatesession is nil")
	}
	return u.gate.SendCmd(msg)
}

func (u *User) SendRoomMsg(m pb.Message) bool {
	if u.gate == nil || reflect.ValueOf(u.gate).IsNil() {
		panic("User gatesession is nil")
	}

	name := pb.MessageName(m)
	if name == "" {
		log.Fatal("SendRoomMsg 获取proto名字失败[%s]", m)
		return false
	}
	msgbuf, err := pb.Marshal(m)
	if err != nil {
		log.Fatal("SendRoomMsg 序列化proto失败[%s][%s]", name, err)
		return false
	}

	send := &msg.C2RS_MsgTransfer{ Uid:pb.Int64(u.Id()), Name:pb.String(name), Buf:msgbuf }
	return u.gate.SendCmd(send)
}


//  退出
func (u *User) Quit() {
	//u.ch_cmd <- "quit"
	close(u.ch_cmd)
}

func (u *User) Shutdown() {
	if u.net == nil { return }
	u.net.Shutdown()
	u.net = nil
	log.Info("User[%s] Shutdown", u.Account())
}

// run coroutine
func (u *User) Run() {
	for {
		time.Sleep(time.Millisecond * 10)
		select {
		case cmd, open := <-u.ch_cmd:
			if cmd == "quit" || open == false {
				u.Shutdown()
				break
			}
			u.DoInputCmd(cmd)
		default:
		}

		if u.net == nil {
			break
		}

		// 每帧处理1000条
		u.net.Dispatch(1000)

		now := util.CURTIMEMS()
		u.ticker100ms.Run(now)
		u.ticker1s.Run(now)
		u.ticker5s.Run(now)
	}
	log.Info("User[%s] RunLoop quit done!", u.Account())
}

func (u *User) OnTicker100ms(now int64) { 
	u.LoginConnect()
}

func (u *User) OnTicker1s(now int64) {
	if u.gate != nil  && u.do_heart {
		heartmsg := &msg.C2GW_ReqHeartBeat{ Uid: pb.Int64(0), Time: pb.Int64(util.CURTIMEUS()) }
		//for i:=0; i < 42; i++ { heartmsg.Test = append(heartmsg.Test, "u is heart msg test") }	// 大约1024字节 测试
		u.SendGateMsg(heartmsg)
	}

	// 随机跳跳
	if u.gate != nil && u.do_jump {
		if util.SelectPercent(10) == true {
			//u.JumpStep()
		}
	}
}

func (u *User) OnTicker5s(now int64) {
}


// 注册用户
func (u *User) RegistAccount() {
	u.SendLoginMsg(u.NewRegistAccountMsg())
}

// 请求登陆验证
func (u *User) SendLogin() {
	//u.SendLoginMsg(u.NewReqLoginMsg())
	u.SendLoginMsg(u.NewReqLoginWechatMsg())
}

// 请求登陆验证
func (u *User) HttpWetchatLogin() {

	//
	url := "http://192.168.30.203:7003"
	//url := "http://210.73.214.68:7003"
	body := fmt.Sprintf(`{"gmcmd":"wx_login", "tempauthcode":"%s"}`, u.Account())
	resp, err := network.HttpPost(url, body)

	//url := "https://tantanle-service7003.giantfun.cn/"
	//body := fmt.Sprintf(`{"gmcmd":"wx_login", "tempauthcode":"%s"}`, u.Account())
	//caCert := "../cert/wechat/cacert.pem"
	//certFile := "../cert/https/https-server-214801457430415.pem"
	//certKey := "../cert/https/https-server-214801457430415.key"
	//resp, err := network.HttpsPost(url, caCert, certFile, certKey, body)

	if err != nil {
		log.Error("HttpWetchatLogin 接口返回报错 err[%s]", err)
		return
	}

	log.Info("HttpWetchatLogin 服务器返回信息Code[%d] Body[%s]", resp.Code, resp.Body)
}


func (u *User) CreateRoom() {
	send := &msg.C2GW_ReqCreateRoom{Gamekind:pb.Int32(int32(msg.RoomKind_TexasPoker))}
	send.Texas = &msg.TexasPersonalRoom{RoomId:pb.Int32(11001), Ante:pb.Int32(100), Pwd:pb.String("12345") }
	u.SendGateMsg(send)
}

func (u *User) EnterRoom() {
	u.SendGateMsg(&msg.C2GW_ReqEnterRoom{Roomid:pb.Int64(u.roomid), Userid:pb.Int64(u.Id()), Passwd:pb.String(u.roompwd)})
	//u.SendGateMsg(&msg.C2GW_ReqEnterRoom{Roomid:pb.Int64(463), Userid:pb.Int64(u.Id()), Passwd:pb.String(u.roompwd)})
}

func (u *User) LeaveRoom() {
	u.SendGateMsg(&msg.C2GW_ReqLeaveRoom{Userid:pb.Int64(u.Id())})
}

func (u *User) ReqUserRoom() {
	u.SendGateMsg(&msg.C2GW_ReqUserRoomInfo{})
}

func (u *User) ReqSitDown() {
	//sitdown := &msg.C2RS_ReqSitDown{Userid:pb.Int64(u.Id()), Seat:pb.Int32(1)}
	sitdown := &msg.C2RS_ReqBuyInGame{Num:pb.Int32(u.GetGold()), Isautobuy:pb.Bool(true), Pos:pb.Int32(1)}
	u.SendRoomMsg(sitdown)
}

func (u *User) ReqStandUp() {
	stand := &msg.C2RS_ReqStandUp{}
	u.SendRoomMsg(stand)
}

//func (u *User) JumpStep() {
//	u.SendGateMsg(&msg.BT_JumpPreCheck{})
//}

func (u *User) BuyItem() {
	u.SendGateMsg(&msg.C2GW_BuyItem{Productid:pb.Int32(7), Num:pb.Int32(1)})
}

func (u *User) DeliveryGoods() {
	send := &msg.C2GW_ReqDeliveryGoods{}
	send.List = append(send.List, &msg.DeliveryGoods{Itemid:pb.Int32(7001), Num:pb.Int32(1)})
	send.List = append(send.List, &msg.DeliveryGoods{Itemid:pb.Int32(7002), Num:pb.Int32(2)})
	send.List = append(send.List, &msg.DeliveryGoods{Itemid:pb.Int32(7003), Num:pb.Int32(3)})
	u.SendGateMsg(send)
}

func (u *User) Recharge() {
	send := &msg.C2GW_ReqRechargeMoney{Amount:pb.Int32(10)}
	u.SendGateMsg(send)
}

func (u *User) RechargeDone() {
	send := &msg.C2GW_PlatformRechargeDone{ Userid:pb.Int64(u.Id())}
	u.SendGateMsg(send)
}

// 抽奖
func (u *User) LuckyDraw() {
	send := &msg.C2GW_StartLuckyDraw{ Userid:pb.Int64(u.Id())}
	u.SendGateMsg(send)
}

// 设置抽奖地址
func (u *User) ChangeDeliveryAddress() {
	addr := &msg.UserAddress{Receiver:pb.String("机器人"), Phone:pb.String("188888888"), Address:pb.String("中国上海闵行区新龙路1333弄28号31栋901")}
	send := &msg.C2GW_ChangeDeliveryAddress{ Index:pb.Int32(0), Info:addr }
	u.SendGateMsg(send)
}

// 进入事件
func (u *User) EnterEvent(uid int64) {
	send := &msg.C2GW_ReqEnterEvents{Uid:pb.Int64(uid)}
	u.SendGateMsg(send)
}

func (u *User) ReqRoomList() {
	send := &msg.C2GW_ReqTexasRoomList{Type:pb.Int32(util.RandBetween(1,3))}
	u.SendGateMsg(send)
}

func (u *User) DoInputCmd(cmd string) {
	subcmd := strings.Split(cmd, " ")
	switch subcmd[0] {
	case "reg":
		u.RegistAccount()
	case "wxlogin":
		u.HttpWetchatLogin()
	case "login":
		u.SendLogin()
	case "create":
		u.CreateRoom()
	case "enter":
		u.EnterRoom()
	case "leave":
		u.LeaveRoom()
	case "myroom":
		u.ReqUserRoom()
	case "jump":
		u.do_jump = !u.do_jump
	case "buy":
		u.BuyItem()
	case "tihuo":
		u.DeliveryGoods()
	case "recharge":
		u.Recharge()
	case "heart":
		u.do_heart = !u.do_heart
	case "luckydraw":
		u.LuckyDraw()
	case "address":
		u.ChangeDeliveryAddress()
	case "rechargedone":
		u.RechargeDone()
	case "event":
		u.EnterEvent(5)
		u.EnterEvent(16)
		//u.EnterEvent(26)
	case "list":
		u.ReqRoomList()
	case "friend":
		u.DoFriendCmd(subcmd[1:])
	case "tfight":
		u.DoTexasFightCmd(subcmd[1:])
	}
}

func (u *User) OnLoginGateOK() {

	// 请求自己房间列表
	roommsg := &msg.C2RS_ReqInsideRoomInfoList{}
	u.SendRoomMsg(roommsg)
}
