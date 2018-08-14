package main

import (
	"encoding/json"
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	"reflect"
)

//func init() {
//	log.Info("ms2gw_msghandler.init")
//	NewMS2GWMsgHandler()
//}

type MS2GWMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewMS2GWMsgHandler() *MS2GWMsgHandler {
	handler := &MS2GWMsgHandler{}
	handler.Init()
	return handler
}

func (this *MS2GWMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("MS2GW_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.MS2GW_RetRegist{}, on_MS2GW_RetRegist)
	this.msgparser.RegistProtoMsg(msg.MS2GW_HeartBeat{}, on_MS2GW_HeartBeat)
	this.msgparser.RegistProtoMsg(msg.MS2GW_MsgNotice{}, on_MS2GW_MsgNotice)
	//this.msgparser.RegistProtoMsg(msg.MS2GW_RetStartMatch{}, on_MS2GW_RetStartMatch)
	//this.msgparser.RegistProtoMsg(msg.MS2GW_RetCancelMatch{}, on_MS2GW_RetCancelMatch)
	//this.msgparser.RegistProtoMsg(msg.MS2GW_MatchOk{}, on_MS2GW_MatchOk)
	this.msgparser.RegistProtoMsg(msg.MS2GW_RetCreateRoom{}, on_MS2GW_RetCreateRoom)
	this.msgparser.RegistProtoMsg(msg.MS2Server_BroadCast{}, on_MS2Server_BroadCast)
	this.msgparser.RegistProtoMsg(msg.MS2GW_AckUserHouse{}, on_MS2Server_AckUserHouse)

	this.msgparser.RegistProtoMsg(msg.MS2GW_AckHouseLevelUp{}, on_MS2GW_AckHouseLevelUp)
	this.msgparser.RegistProtoMsg(msg.MS2GW_AckHouseCellLevelUp{}, on_MS2GW_AckHouseCellLevelUp)
	this.msgparser.RegistProtoMsg(msg.MS2GW_AckTakeSelfHouseGoldRet{}, on_MS2GW_AckTakeSelfHouseGoldRet)
	this.msgparser.RegistProtoMsg(msg.MS2GW_AckTakeOtherHouseGoldRet{}, on_MS2GW_AckTakeOtherHouseGoldRet)
	this.msgparser.RegistProtoMsg(msg.MS2GW_AckRandHouseList{}, on_MS2GW_AckRandHouseList)
	this.msgparser.RegistProtoMsg(msg.MS2GW_AckOtherUserHouseData{}, on_MS2GW_AckOtherUserHouseData)

	this.msgparser.RegistProtoMsg(msg.MS2GW_AckCreateCar{}, on_MS2GW_AckCreateCar)
	this.msgparser.RegistProtoMsg(msg.MS2GW_AckCarInfo{}, on_MS2GW_AckCarInfo)
	this.msgparser.RegistProtoMsg(msg.MS2GW_AckCreateParking{}, on_MS2GW_AckCreateParking)
	this.msgparser.RegistProtoMsg(msg.MS2GW_ResParkingInfo{}, on_MS2GW_ResParkingInfo)
	this.msgparser.RegistProtoMsg(msg.MS2GW_ParkCarResult{}, on_MS2GW_ParkCarResult)
	this.msgparser.RegistProtoMsg(msg.MS2GW_TakeBackCarResult{}, on_MS2GW_TakeBackCarResult)
	this.msgparser.RegistProtoMsg(msg.MS2GW_TicketCarResult{}, on_MS2GW_TicketCarResult)

	// 发
	this.msgparser.RegistSendProto(msg.GW2MS_ReqRegist{})
	this.msgparser.RegistSendProto(msg.GW2MS_HeartBeat{})
	//this.msgparser.RegistSendProto(msg.GW2MS_ReqStartMatch{})
	//this.msgparser.RegistSendProto(msg.GW2MS_ReqCancelMatch{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqCreateRoom{})
	this.msgparser.RegistSendProto(msg.GW2MS_MsgNotice{})
	this.msgparser.RegistSendProto(msg.GW2MS_UserOnlineState{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqCreateHouse{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqUserHouse{})

	this.msgparser.RegistSendProto(msg.GW2MS_ReqHouseLevelUp{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqHouseCellLevelUp{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqTakeSelfHouseGold{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqTakeOtherHouseGold{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqRandHouseList{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqOtherUserHouseData{})

	this.msgparser.RegistSendProto(msg.GW2MS_ReqCreateCar{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqCarInfo{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqCreateParking{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqMyParkingInfo{})
	this.msgparser.RegistSendProto(msg.GW2MS_ReqParkingInfoByType{})
	this.msgparser.RegistSendProto(msg.GW2MS_ParkCar{})
	this.msgparser.RegistSendProto(msg.GW2MS_TakeBackCar{})
	this.msgparser.RegistSendProto(msg.GW2MS_TicketCar{})
}

func on_MS2GW_RetRegist(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_RetRegist)
	if tmsg.GetErrcode() != "" {
		panic(fmt.Sprintf("Matach服务器通知注册失败 原因：%s", tmsg.GetErrcode()))
		return
	}

	log.Info("注册网关[%v]到Match成功", tmsg.GetHost())
}

func on_MS2GW_HeartBeat(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_HeartBeat)
	log.Info(reflect.TypeOf(tmsg).String())
}

// 公告
func on_MS2GW_MsgNotice(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_MsgNotice)
	//log.Info(reflect.TypeOf(tmsg).String())
	//UserMgr().BroadcastMsg(tmsg.GetNotice())
	UserMgr().BroadcastMsgFaster(tmsg.GetNotice())
}

func on_MS2GW_RetCreateRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_RetCreateRoom)
	err, userid, roomid, roomagent := tmsg.GetErrcode(), tmsg.GetUserid(), tmsg.GetRoomid(), tmsg.GetRoomagent()
	user := UserMgr().FindById(userid)
	if user == nil {
		log.Error("玩家:%d 请求创建房间返回，但找不到玩家", userid)
		return
	}

	if err == "" {
		user.StartGameOk(roomagent, roomid)
	} else {
		user.StartGameFail(err)
	}

	user.ReplyStartGame(err, roomid)
}

func on_MS2Server_BroadCast(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2Server_BroadCast)
	cmdfull := tmsg.GetCmd()

	cmdmap := make(map[string]interface{})
	unerr := json.Unmarshal(util.StringToBytes(cmdfull), &cmdmap)
	if unerr != nil {
		log.Error("on_MS2Server_BroadCast json.Unmarshal err[%s]", unerr)
		return
	}

	// GM指令
	if _, ok := cmdmap["gmcmd"]; ok {
		gmcommands := make(map[string]string)
		for k, v := range cmdmap {
			gmcommands[k] = v.(string)
		}
		DoGMCmd(gmcommands)
	}
}

func on_MS2Server_AckUserHouse(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_AckUserHouse)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	log.Info("on_MS2Server_AckUserHouse  uid:%d", uid)
	if user == nil {
		log.Error("玩家:%d 请求创建房间返回，但找不到玩家", uid)
		return
	}
	user.UpdateHouseData(tmsg.GetData())
}

func on_MS2GW_AckHouseLevelUp(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_AckHouseLevelUp)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 升级房屋返回，但找不到玩家", uid)
		return
	}
	send := &msg.GW2C_AckHouseLevelUp{}
	send.Houseid = pb.Uint64(tmsg.GetHouseid())
	send.Ret = pb.Uint32(tmsg.GetRet())
	send.Data = tmsg.GetData()
	user.SendMsg(send)
}

func on_MS2GW_AckHouseCellLevelUp(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_AckHouseCellLevelUp)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 升级房屋房间Cell返回，但找不到玩家", uid)
		return
	}
	send := &msg.GW2C_AckHouseCellLevelUp{}
	send.Houseid = pb.Uint64(tmsg.GetHouseid())
	send.Index = pb.Uint32(tmsg.GetIndex())
	send.Ret = pb.Uint32(tmsg.GetRet())
	send.Data = tmsg.GetData()
	user.SendMsg(send)
}

func on_MS2GW_AckTakeSelfHouseGoldRet(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_AckTakeSelfHouseGoldRet)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 收获金币返回，但找不到玩家", uid)
		return
	}

	gold := tmsg.GetGold()

	if gold > 0 {
		user.AddGold(gold, "收取自己房屋产出金币", true)
	}

	send := &msg.GW2C_AckTakeSelfHouseGoldRet{}
	send.Houseid = pb.Uint64(tmsg.GetHouseid())
	send.Index = pb.Uint32(tmsg.GetIndex())
	send.Gold = pb.Uint32(gold)
	send.Data = tmsg.GetData()
	user.SendMsg(send)
}

func on_MS2GW_AckTakeOtherHouseGoldRet(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_AckTakeOtherHouseGoldRet)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 抢夺金币返回，但找不到玩家", uid)
		return
	}
	gold := tmsg.GetGold()
	if gold > 0 {
		user.AddGold(gold, "抢夺其他玩家房屋产出金币", true)
		user.SetRobCount(user.GetRobCount() - 1)
	}

	send := &msg.GW2C_AckTakeOtherHouseGoldRet{}
	send.Houseid = pb.Uint64(tmsg.GetHouseid())
	send.Index = pb.Uint32(tmsg.GetIndex())
	send.Gold = pb.Uint32(tmsg.GetGold())
	send.Data = tmsg.GetData()
	user.SendMsg(send)
}

func on_MS2GW_AckRandHouseList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_AckRandHouseList)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 申请查看随机房屋列表返回，但找不到玩家", uid)
		return
	}

	send := &msg.GW2C_AckRandHouseList{}
	send.Datas = tmsg.GetDatas()
	user.SendMsg(send)
}

func on_MS2GW_AckOtherUserHouseData(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_AckOtherUserHouseData)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 申请查看其他玩家房屋信息返回，但找不到玩家", uid)
		return
	}

	send := &msg.GW2C_AckOtherUserHouseData{}
	send.Datas = tmsg.GetDatas()
	user.SendMsg(send)
}

//创建车辆回调
func on_MS2GW_AckCreateCar(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_AckCreateCar)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 请求车辆数据，但找不到玩家", uid)
		return
	}
	log.Info("on_MS2GW_AckCreateCar  uid:%d", uid)
	send := &msg.GW2C_ResCarInfo{}
	cardatas := send.GetCardatas()
	cardatas = append(cardatas, tmsg.GetCardata())
	user.SendMsg(send)
}

//返回车辆信息
func on_MS2GW_AckCarInfo(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_AckCarInfo)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 请求车辆数据，但找不到玩家", uid)
		return
	}

	send := &msg.GW2C_ResCarInfo{}
	send.Cardatas = tmsg.GetCardatas()
	send.Parkingdatas = tmsg.GetParkingdatas()
	user.SendMsg(send)
}
func on_MS2GW_AckCreateParking(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_AckCreateParking)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 请求车辆数据，但找不到玩家", uid)
		return
	}

	send := &msg.GW2C_ResParkingInfo{}
	parkingdatas := send.GetParkingdatas()
	parkingdatas = append(parkingdatas, tmsg.GetParkdata())
	user.SendMsg(send)
}

//返回车位信息
func on_MS2GW_ResParkingInfo(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_ResParkingInfo)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 请求车辆数据，但找不到玩家", uid)
		return
	}

	send := &msg.GW2C_ResParkingInfo{}
	send.Parkingdatas = tmsg.GetParkingdatas()
	user.SendMsg(send)
}

//返回停车结果
func on_MS2GW_ParkCarResult(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_ParkCarResult)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 请求车辆数据，但找不到玩家", uid)
		return
	}

	send := &msg.GW2C_ParkCarResult{}
	send.Result = pb.Int32(tmsg.GetResult())
	user.SendMsg(send)
}

//返回收回结果
func on_MS2GW_TakeBackCarResult(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_TakeBackCarResult)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 请求车辆数据，但找不到玩家", uid)
		return
	}
	send := &msg.GW2C_TakeBackCarResult{}
	send.Result = pb.Int32(tmsg.GetResult())
	send.Reward = pb.Int32(tmsg.GetReward())
	if send.GetResult() == 0 && send.GetReward() > 0 {
		user.AddGold(uint32(send.GetReward()), "收取抢车位产出金币", true)
	}
	user.SendMsg(send)
}

//返回贴条结果
func on_MS2GW_TicketCarResult(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.MS2GW_TicketCarResult)
	uid := tmsg.GetUserid()
	user := UserMgr().FindById(uid)
	if user == nil {
		log.Error("玩家:%d 请求车辆数据，但找不到玩家", uid)
		return
	}
	send := &msg.GW2C_TicketCarResult{}
	send.Result = pb.Int32(tmsg.GetResult())
	send.Reward = pb.Int32(tmsg.GetReward())
	if send.GetResult() == 0 && send.GetReward() > 0 {
		user.AddGold(uint32(send.GetReward()), "贴条产出金币", true)
	}
	user.SendMsg(send)
}

func DoGMCmd(cmd map[string]string) {
	value, ok := cmd["gmcmd"]
	if !ok {
		log.Error("找不到gmcmd字段")
		return
	}

	switch value {
	case "reload":
		GateSvr().Reload()
		break
	}
}
