package main
import (
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	//"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	//"github.com/go-redis/redis"
)


// --------------------------------------------------------------------------
/// @brief 转发客户端消息Handler
/// @return 
// --------------------------------------------------------------------------
type ClientMsgFunHandler func(session network.IBaseNetSession, message interface{}, uid int64)
type ClientMsgHandler struct {
	msghandler map[string]ClientMsgFunHandler
}

func NewClientMsgHandler() *ClientMsgHandler {
	h := new(ClientMsgHandler)
	h.Init()
	return h
}

func (mh *ClientMsgHandler) Init() {
	mh.msghandler = make(map[string]ClientMsgFunHandler)

	// 消息注册
}

func (mh *ClientMsgHandler) RegistProtoMsg(message interface{} , fn ClientMsgFunHandler) {
	msg_type := reflect.TypeOf(message)
	mh.msghandler[msg_type.String()] = fn
}

func (mh *ClientMsgHandler) Handler(session network.IBaseNetSession, message interface{}, uid int64) {
	pbmsg := message.(pb.Message)
	name := pb.MessageName(pbmsg)
	fn, ok := mh.msghandler[name]
	if ok == false {
		log.Error("ClientMsgHandler 未注册消息%s", name)
		return
	}

	fn(session, message, uid)
}

