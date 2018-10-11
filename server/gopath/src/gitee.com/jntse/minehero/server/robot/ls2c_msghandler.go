package main
import (
	_"time"
	_"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
)


//func init() {
//	NewLS2CMsgHandler()
//}

type LS2CMsgHandler struct {
	//msgparser *network.ProtoParser
	msgparser network.IBaseParser
}

func NewLS2CMsgHandler() *LS2CMsgHandler {
	handler := &LS2CMsgHandler{}
	handler.Init()
	return handler
}

func (mh* LS2CMsgHandler) Init() {

	mh.msgparser = network.NewProtoParser("LS2C_MsgParser", tbl.ProtoMsgIndexGenerator)
	if mh.msgparser == nil {
		return
	}

	// 收
	mh.msgparser.RegistRecvMsg(msg.L2C_RetLogin{}, on_L2C_RetLogin)
	mh.msgparser.RegistRecvMsg(msg.L2C_RetRegistAccount{}, on_L2C_RetRegistAccount)
}

func on_L2C_RetLogin(session network.IBaseNetSession, message interface{}) {
	msg := message.(*msg.L2C_RetLogin)
	//log.Info(reflect.TypeOf(msg).String())
	switch {
	default:
		userdata := session.UserDefData()
		user, ok := userdata.(*User)
		if ok == false {
			log.Error("登陆失败，没有为LoginSession设置UserDefData")
			break
		}

		if msg.GetResult() != 1 {
			log.Info("登陆失败 [%s]", msg.GetReason())
			break
		}

		user.SetVerifykey(msg.GetVerifykey())
		log.Info("sid[%d] 账户%s 获得Verifykey[%s]", user.login.Id() , user.Account(), msg.GetVerifykey())


		// 登陆GateServer
		gate := msg.GetGatehost()
		conf , ok := RobotMgr().NetConf().FindWsConnectConf("GateConnector")
		if ok == false {
			panic("can't find WsConnectConf 'GateConnector' ")
			break
		}
		conf.Name = "GateConnector" + "_" + user.Account()		// 连接器名必须唯一
		conf.Host = network.NetHost{gate.GetIp(), int(gate.GetPort())}
		if user.Net().AddWsConnector(conf) == false {
			panic("AddGateConnector Fail")
			break
		}
		user.gatestat = kNetStatGateConnecting
	}

	// 删除Login连接
	session.Close()
}

func on_L2C_RetRegistAccount(session network.IBaseNetSession, message interface{}) {
	msg := message.(*msg.L2C_RetRegistAccount)
	if msg.GetErrcode() != "" {
		log.Error("账户注册失败, err:%s", msg.GetErrcode())
		return
	}
	log.Info("账户注册成功")
}


