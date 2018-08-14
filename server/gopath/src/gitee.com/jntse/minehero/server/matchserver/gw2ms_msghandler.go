package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	"reflect"
	"time"
)

//func init() {
//	NewGW2MSMsgHandler()
//}

type GW2MSMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewGW2MSMsgHandler() *GW2MSMsgHandler {
	handler := &GW2MSMsgHandler{}
	handler.Init()
	return handler
}

func (this *GW2MSMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("GW2MS_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.GW2MS_ReqRegist{}, on_GW2MS_ReqRegist)
	this.msgparser.RegistProtoMsg(msg.GW2MS_HeartBeat{}, on_GW2MS_HeartBeat)
	//this.msgparser.RegistProtoMsg(msg.GW2MS_ReqStartMatch{}, on_GW2MS_ReqStartMatch)
	//this.msgparser.RegistProtoMsg(msg.GW2MS_ReqCancelMatch{}, on_GW2MS_ReqCancelMatch)
	this.msgparser.RegistProtoMsg(msg.GW2MS_ReqCreateRoom{}, on_GW2MS_ReqCreateRoom)
	this.msgparser.RegistProtoMsg(msg.GW2MS_MsgNotice{}, on_GW2MS_MsgNotice)
	this.msgparser.RegistProtoMsg(msg.GW2MS_UserOnlineState{}, on_GW2MS_UserOnlineState)
	this.msgparser.RegistProtoMsg(msg.GW2MS_ReqCreateHouse{}, on_GW2MS_ReqCreateHouse)
	this.msgparser.RegistProtoMsg(msg.GW2MS_ReqUserHouse{}, on_GW2MS_ReqUserHouse)
	this.msgparser.RegistProtoMsg(msg.GW2MS_ReqCarInfo{}, on_GW2MS_ReqCarInfo)
	this.msgparser.RegistProtoMsg(msg.GW2MS_ReqMyParkingInfo{}, on_GW2MS_ReqMyParkingInfo)
	this.msgparser.RegistProtoMsg(msg.GW2MS_ReqParkingInfoByType{}, on_GW2MS_ReqParkingInfoByType)
	this.msgparser.RegistProtoMsg(msg.GW2MS_ParkCar{}, on_GW2MS_ParkCar)
	this.msgparser.RegistProtoMsg(msg.GW2MS_TakeBackCar{}, on_GW2MS_TakeBackCar)
	this.msgparser.RegistProtoMsg(msg.GW2MS_TicketCar{}, on_GW2MS_TicketCar)

	// 发
	this.msgparser.RegistSendProto(msg.MS2GW_RetRegist{})
	this.msgparser.RegistSendProto(msg.MS2GW_HeartBeat{})
	this.msgparser.RegistSendProto(msg.MS2GW_MsgNotice{})
	//this.msgparser.RegistSendProto(msg.MS2GW_RetStartMatch{})
	//this.msgparser.RegistSendProto(msg.MS2GW_RetCancelMatch{})
	//this.msgparser.RegistSendProto(msg.MS2GW_MatchOk{})
	this.msgparser.RegistSendProto(msg.MS2GW_RetCreateRoom{})
	this.msgparser.RegistSendProto(msg.MS2Server_BroadCast{})
	this.msgparser.RegistSendProto(msg.MS2GW_AckUserHouse{})

	this.msgparser.RegistSendProto(msg.MS2GW_AckHouseLevelUp{})
	this.msgparser.RegistSendProto(msg.MS2GW_AckHouseCellLevelUp{})
	this.msgparser.RegistSendProto(msg.MS2GW_AckTakeSelfHouseGoldRet{})
	this.msgparser.RegistSendProto(msg.MS2GW_AckTakeOtherHouseGoldRet{})

	this.msgparser.RegistSendProto(msg.MS2GW_AckCarInfo{})
	this.msgparser.RegistSendProto(msg.MS2GW_ResParkingInfo{})
	this.msgparser.RegistSendProto(msg.MS2GW_ParkCarResult{})
	this.msgparser.RegistSendProto(msg.MS2GW_TakeBackCarResult{})
	this.msgparser.RegistSendProto(msg.MS2GW_TicketCarResult{})
}

func on_GW2MS_ReqCreateRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_ReqCreateRoom)
	//log.Info(reflect.TypeOf(tmsg).String())

	userid := tmsg.GetUserid()
	log.Info("收到玩家[%d] 创建房间请求 ts[%d]", userid, util.CURTIMEMS())
	doCreateRoomReply := func(id uint64, err string) {
		send := &msg.MS2GW_RetCreateRoom{
			Userid:  pb.Uint64(id),
			Errcode: pb.String(err),
			Roomid:  pb.Int64(0),
		}
		session.SendCmd(send)
		if err != "" {
			log.Error("玩家[%d] 创建房间失败: %s", id, err)
		}
	}

	if RoomSvrMgr().Num() == 0 {
		doCreateRoomReply(userid, "没有可用的房间服务器")
		return
	}

	// 创建房间信息
	errcode := RoomSvrMgr().CreateGameRoom(tmsg.GetGamekind(), time.Now().Unix(), session.Id(), userid)
	if errcode != "" {
		doCreateRoomReply(userid, errcode)
		return
	}
}

func on_GW2MS_ReqRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_ReqRegist)
	host := tmsg.GetHost()
	if host == nil {
		log.Fatal("Gate注册IP端口失败, Host is nil")
		return
	}

	name, ip, port := tmsg.GetAgentname(), host.GetIp(), int(host.GetPort())
	if tmsg.GetAccount() != "gate_account_123" || tmsg.GetPasswd() != "gate_passwd_123" {
		log.Info("Gate[%s:%d]验证失败，断开", ip, port)
		session.Close()
		return
	}

	if GateSvrMgr().IsRegisted(name, ip, port) == true {
		log.Fatal(fmt.Sprintf("重复注册网关服务器 [%s] [%s:%d]", name, ip, port))
		session.SendCmd(&msg.MS2GW_RetRegist{Errcode: pb.String("重复注册网关服务器")})
		return
	}
	session.SendCmd(&msg.MS2GW_RetRegist{Host: tmsg.Host})

	// 添加gate
	GateSvrMgr().AddNewSession(session, name, ip, port)
}

func on_GW2MS_HeartBeat(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_HeartBeat)
	log.Info(reflect.TypeOf(tmsg).String())
}

func on_GW2MS_MsgNotice(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_MsgNotice)
	//log.Info(reflect.TypeOf(tmsg).String())
	send := &msg.MS2GW_MsgNotice{Notice: tmsg.GetNotice()}
	Match().BroadcastGateMsg(send)
}

func on_GW2MS_UserOnlineState(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_UserOnlineState)
	uid := tmsg.GetUserid()
	state := tmsg.GetState()
	HouseSvrMgr().OnSyncUserOnlineState(uid, state, session.Id())
}

func on_GW2MS_ReqCreateHouse(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_ReqCreateHouse)
	uid := tmsg.GetUserid()
	housetid := tmsg.GetHousetid()
	HouseSvrMgr().CreateNewHouse(uid, housetid)
}

func on_GW2MS_ReqUserHouse(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_ReqUserHouse)
	uid := tmsg.GetUserid()

	log.Info("on_GW2MS_ReqUserHouse %d", uid)
	send := &msg.MS2GW_AckUserHouse{}
	send.Userid = pb.Uint64(uid)
	datas := send.GetData()

	info := HouseSvrMgr().GetHousesByUser(uid)
	for _, v := range info {
		tmp := v.PackBin()
		datas = append(datas, tmp)
	}
	session.SendCmd(send)
}

func on_GW2MS_ReqHouseLevelUp(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_ReqHouseLevelUp)
	uid := tmsg.GetUserid()
	log.Info("on_GW2MS_ReqHouseLevelUp %d", uid)
}

func on_GW2MS_ReqHouseCellLevelUp(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_ReqHouseCellLevelUp)
	uid := tmsg.GetUserid()
	log.Info("on_GW2MS_ReqHouseCellLevelUp %d", uid)
}

func on_GW2MS_ReqTakeSelfHouseGold(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_ReqTakeSelfHouseGold)
	uid := tmsg.GetUserid()
	log.Info("on_GW2MS_ReqTakeSelfHouseGold %d", uid)
}

func on_GW2MS_ReqTakeOtherHouseGold(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2MS_ReqTakeOtherHouseGold)
	uid := tmsg.GetUserid()
	log.Info("on_GW2MS_ReqTakeSelfHouseGold %d", uid)
}

func on_GW2MS_ReqCarInfo(session network.IBaseNetSession,message interface{}){
	tmsg := message.(*msg.GW2MS_ReqCarInfo)
	uid := tmsg.GetUserid()

	log.Info("on_GW2MS_ReqCarInfo %d", uid)
	send := &msg.MS2GW_AckCarInfo {}
	send.Userid = pb.Uint64(uid)
	cardatas := send.GetCardatas()

	carinfo := CarSvrMgr().GetCarByUser(uid)
	carids := make([]uint64,0)
	for _, v := range carinfo {
		tmp := v.PackBin()
		cardatas = append(cardatas, tmp)
		if v.parkingid != 0 {
			carids = append(carids,v.parkingid)
		}
	}

	parkinginfo := CarSvrMgr().GetParkingById(carids)
	parkingdatas := send.GetParkingdatas()
	for _, v := range parkinginfo {
		tmp := v.PackBin()
		parkingdatas = append(parkingdatas,tmp)
	}
	session.SendCmd(send)
}

func on_GW2MS_ReqMyParkingInfo(session network.IBaseNetSession,message interface{}){
	tmsg := message.(*msg.GW2MS_ReqMyParkingInfo)
	uid := tmsg.GetUserid()

	log.Info("on_GW2MS_ReqMyParkingInfo %d", uid)
	send := &msg.MS2GW_ResParkingInfo {}
	send.Userid = pb.Uint64(uid)
	parkinginfo := CarSvrMgr().GetParkingByUser(uid)
	parkingdatas := send.GetParkingdatas()
	for _, v := range parkinginfo {
		tmp := v.PackBin()
		parkingdatas = append(parkingdatas,tmp)
	}
	session.SendCmd(send)
}

func on_GW2MS_ReqParkingInfoByType(session network.IBaseNetSession,message interface{}){
	tmsg := message.(*msg.GW2MS_ReqParkingInfoByType)
	uid := tmsg.GetUserid()
	parkingtype := tmsg.GetType()
	log.Info("on_GW2MS_ReqParkingInfoByType %d", uid)
	send := &msg.MS2GW_ResParkingInfo {}
	send.Userid = pb.Uint64(uid)
	parkinginfo := CarSvrMgr().GetParkingByType(uint32(parkingtype))
	parkingdatas := send.GetParkingdatas()
	for _, v := range parkinginfo {
		tmp := v.PackBin()
		parkingdatas = append(parkingdatas,tmp)
	}
	session.SendCmd(send)
}

func on_GW2MS_ParkCar(session network.IBaseNetSession,message interface{}){
	tmsg := message.(*msg.GW2MS_ParkCar)
	uid := tmsg.GetUserid()
	uname := tmsg.GetUsername()
	cid := tmsg.GetCarid()
	pid := tmsg.GEtParkingid()
	log.Info("on_GW2MS_ParkCar %d", uid)
	send := &msg.MS2GW_ParkCarResult {}
	send.Userid = pb.Uint64(uid)
	send.Result = pb.Int32(CarSvrMgr().ParkingCar(cid,pid,uname))
	session.SendCmd(send)
}

func on_GW2MS_TakeBackCar(session network.IBaseNetSession,message interface{}){
	tmsg := message.(*msg.GW2MS_TakeBackCar)
	uid := tmsg.GetUserid()
	cid := tmsg.GetCarid()
	log.Info("on_GW2MS_TakeBackCar %d", uid)
	send := &msg.MS2GW_TakeBackCarResult {}
	send.Userid = pb.Uint64(uid)
	result,reward := CarSvrMgr().TakeBackCar(cid)
	send.Result = pb.Int32(result)
	send.Reward = pb.Int32(reward)
	session.SendCmd(send)
}

func on_GW2MS_TicketCar(session network.IBaseNetSession,message interface{}){
	tmsg := message.(*msg.GW2MS_TicketCar)
	uid := tmsg.GetUserid()
	pid := tmsg.GetParkingid()
	log.Info("on_GW2MS_TicketCar %d", uid)
	send := &msg.MS2GW_TicketCarResult {}
	send.Userid = pb.Uint64(uid)
	result,reward := CarSvrMgr().TakeBackFromParking(pid)
	send.Result = pb.Int32(result)
	send.Reward = pb.Int32(reward)
	session.SendCmd(send)
}
