package main
import (
	"fmt"
	"runtime"
	"runtime/debug"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/gotoolkit/util"
)


func init() {
	fmt.Println("robot.init()")
}

var g_RobotAccount string = "robot"

type Robot struct {
	netconf         *network.NetConf
	//net           *network.NetWork
	tblloader		*tbl.TblLoader
	msghandlers 	[]network.IBaseMsgHandler
	clients 		map[string] *User
	sids			map[int] *User
}

//func (r *Robot) Net() *network.NetWork {
//	return r.net
//}

func (r *Robot) NetConf() *network.NetConf {
	return r.netconf
}

func (r *Robot) InitMsgHandler() {
	network.InitGlobalSendMsgHandler(tbl.GetAllMsgIndex())
	r.msghandlers = append(r.msghandlers, NewGW2CMsgHandler())
	r.msghandlers = append(r.msghandlers, NewLS2CMsgHandler())
}

func (r *Robot) Start() {
	for _, client := range r.clients {
		go client.Run()
	}
}

func (r *Robot) Quit() {
	for _, client := range r.clients {
		client.Quit()
	}
}

func (r *Robot) Init() {

	// 机器人配置
	netconf := &network.NetConf{}
	jsonerr := util.JsonConfParser(g_ConfName, netconf)
	if jsonerr != nil || netconf == nil {
		log.Error("JsonParser Error: '%s'", jsonerr)
		return 
	}
	r.netconf = netconf
	r.tblloader = tbl.NewTblLoader(netconf.TblPath)
	log.Info("加载机器人配置ok...")


	// MsgHandler
	r.InitMsgHandler()


	// 初始化机器人
	r.clients = make(map[string] *User)
	for i := g_AccountStart; i < g_RobotNum + g_AccountStart; i++ {
		passwd, account := "12345", fmt.Sprintf("%s_%d", g_RobotAccount, i)
		client := NewUser()

		if client.Init(account, passwd) == false {
			panic("初始机器人失败")
		}

		if client.StartNetWork(netconf) == false {
			panic("机器人起到网络失败")
		}

		r.clients[account] = client
	}

}

func (r *Robot) Run(now int64) {
}

func (r *Robot) DoInputCmd(cmd string) {
	switch cmd {
	case "gc":
		log.Info("Start Force GC...")
		runtime.GC()
	case "free":
		log.Info("Start FreeOSMemory...")
		debug.FreeOSMemory()        // 谨慎使用
	default:
		r.BroadCastCmd(cmd)
	}
}

func (r *Robot) BroadCastCmd(cmd string) {
	for _, client := range r.clients {
		client.ch_cmd <- cmd
	}
}

//// --------------------------------------------------------------------------
///// @brief TODO: session is nil
//// --------------------------------------------------------------------------
//func (r *Robot) OnClose(session network.IBaseNetSession) {
//	panic("Robot.OnClose callback should't be used")
//}
//
//// --------------------------------------------------------------------------
///// @brief 
//// --------------------------------------------------------------------------
//func (r *Robot) OnConnect(session network.IBaseNetSession)	{
//	panic("Robot.OnConnect callback should't be used")
//}

