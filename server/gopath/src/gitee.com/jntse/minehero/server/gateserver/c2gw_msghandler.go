package main

import (
	"encoding/json"
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	_ "github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	_ "reflect"
	_ "strconv"
)

//func init() {
//	log.Info("msg_msghandler.init")
//	NewC2GWMsgHandler()
//}

// 提取Session User指针
func ExtractSessionUser(session network.IBaseNetSession) *GateUser {
	user, ok := session.UserDefData().(*GateUser)
	if ok == false {
		log.Fatal("网络会话Sid[%d]中没有绑定User指针", session.Id())
		return nil
	}
	return user
}

type C2GWMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewC2GWMsgHandler() *C2GWMsgHandler {
	handler := &C2GWMsgHandler{}
	handler.Init()
	return handler
}

func (this *C2GWMsgHandler) Init() {

	this.msgparser = network.NewProtoParser("C2GW_MsgParser", tbl.ProtoMsgIndexGenerator)
	if this.msgparser == nil {
		return
	}

	// 收
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqLogin{}, on_C2GW_ReqLogin)
	this.msgparser.RegistProtoMsg(msg.C2GW_HeartBeat{}, on_C2GW_HeartBeat)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqStartGame{}, on_C2GW_ReqStartGame)
	this.msgparser.RegistProtoMsg(msg.C2GW_BuyItem{}, on_C2GW_BuyItem)
	this.msgparser.RegistProtoMsg(msg.C2GW_Get7DayReward{}, on_C2GW_Get7DayReward)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqDeliveryGoods{}, on_C2GW_ReqDeliveryGoods)
	this.msgparser.RegistProtoMsg(msg.C2GW_UseBagItem{}, on_C2GW_UseBagItem)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqRechargeMoney{}, on_C2GW_ReqRechargeMoney)
	this.msgparser.RegistProtoMsg(msg.C2GW_SellBagItem{}, on_C2GW_SellBagItem)
	//this.msgparser.RegistProtoMsg(msg.C2GW_ReqDeliveryDiamond{}, on_C2GW_ReqDeliveryDiamond)
	this.msgparser.RegistProtoMsg(msg.C2GW_PlatformRechargeDone{}, on_C2GW_PlatformRechargeDone)

	this.msgparser.RegistProtoMsg(msg.C2GW_SendWechatAuthCode{}, on_C2GW_SendWechatAuthCode)
	this.msgparser.RegistProtoMsg(msg.C2GW_StartLuckyDraw{}, on_C2GW_StartLuckyDraw)
	//this.msgparser.RegistProtoMsg(msg.C2GW_AddDeliveryAddress{}, on_C2GW_AddDeliveryAddress)
	//this.msgparser.RegistProtoMsg(msg.C2GW_DelDeliveryAddress{}, on_C2GW_DelDeliveryAddress)
	this.msgparser.RegistProtoMsg(msg.C2GW_ChangeDeliveryAddress{}, on_C2GW_ChangeDeliveryAddress)
	this.msgparser.RegistProtoMsg(msg.C2GW_GoldExchange{}, on_C2GW_GoldExchange)
	this.msgparser.RegistProtoMsg(msg.C2GW_BuyClothes{}, on_C2GW_BuyClothes)
	this.msgparser.RegistProtoMsg(msg.C2GW_DressClothes{}, on_C2GW_DressClothes)
	this.msgparser.RegistProtoMsg(msg.C2GW_UnDressClothes{}, on_C2GW_UnDressClothes)
	//this.msgparser.RegistProtoMsg(msg.C2GW_ChangeImageSex{}, on_C2GW_ChangeImageSex)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqTaskList{}, on_C2GW_ReqTaskList)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqSetNewPlayerStep{}, on_C2GW_ReqSetNewPlayerStep)

	//交易收
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqHouseTradeList{}, on_C2GW_ReqHouseTradeList)
	this.msgparser.RegistProtoMsg(msg.C2GW_TradeHouse{}, on_C2GW_TradeHouse)
	this.msgparser.RegistProtoMsg(msg.C2GW_BuyTradeHouse{}, on_C2GW_BuyTradeHouse)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqTradeHouseHistory{}, on_C2GW_ReqTradeHouseHistory)
	this.msgparser.RegistProtoMsg(msg.C2GW_GetTradeHouseReward{}, on_C2GW_GetTradeHouseReward)
	this.msgparser.RegistProtoMsg(msg.C2GW_CancelTradeHouse{}, on_C2GW_CancelTradeHouse)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqCarTradeList{}, on_C2GW_ReqCarTradeList)
	this.msgparser.RegistProtoMsg(msg.C2GW_TradeCar{}, on_C2GW_TradeCar)
	this.msgparser.RegistProtoMsg(msg.C2GW_BuyTradeCar{}, on_C2GW_BuyTradeCar)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqTradeCarHistory{}, on_C2GW_ReqTradeCarHistory)
	this.msgparser.RegistProtoMsg(msg.C2GW_GetTradeCarReward{}, on_C2GW_GetTradeCarReward)
	this.msgparser.RegistProtoMsg(msg.C2GW_CancelTradeCar{}, on_C2GW_CancelTradeCar)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqItemTradeList{}, on_C2GW_ReqItemTradeList)
	this.msgparser.RegistProtoMsg(msg.C2GW_TradeItem{}, on_C2GW_TradeItem)
	this.msgparser.RegistProtoMsg(msg.C2GW_BuyTradeItem{}, on_C2GW_BuyTradeItem)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqTradeItemHistory{}, on_C2GW_ReqTradeItemHistory)
	this.msgparser.RegistProtoMsg(msg.C2GW_GetTradeItemReward{}, on_C2GW_GetTradeItemReward)
	this.msgparser.RegistProtoMsg(msg.C2GW_CancelTradeItem{}, on_C2GW_CancelTradeItem)
	this.msgparser.RegistProtoMsg(msg.C2GW_StartThrow{}, on_C2GW_StartThrow)
	this.msgparser.RegistProtoMsg(msg.C2GW_TargetItem{}, on_C2GW_TargetItem)

	//房屋楼房
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqHouseData{}, on_C2GW_ReqHouseData)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqHouseLevelUp{}, on_C2GW_ReqHouseLevelUp)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqHouseCellLevelUp{}, on_C2GW_ReqHouseCellLevelUp)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqTakeSelfHouseGold{}, on_C2GW_ReqTakeSelfHouseGold)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqTakeOtherHouseGold{}, on_C2GW_ReqTakeOtherHouseGold)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqRandHouseList{}, on_C2GW_ReqRandHouseList)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqOtherUserHouseData{}, on_C2GW_ReqOtherUserHouseData)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqResetRobCheckFlag{}, on_C2GW_ReqResetRobCheckFlag)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqHouseDataByHouseId{}, on_C2GW_ReqHouseDataByHouseId)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqBuyHouseFromBuilding{}, on_C2GW_ReqBuyHouseFromBuilding)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqBuildingCanBuyInfo{}, on_C2GW_ReqBuildingCanBuyInfo)
	//位置
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqNearUsers{}, on_C2GW_ReqNearUsers)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqSetPos{}, on_C2GW_ReqSetPos)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqPlayerCountByProvince{}, on_C2GW_ReqPlayerCountByProvince)

	//个人信息
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqSetUserSex{}, on_C2GW_ReqSetUserSex)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqSetUserAge{}, on_C2GW_ReqSetUserAge)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqSetUserConstellation{}, on_C2GW_ReqSetUserConstellation)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqSetUserSign{}, on_C2GW_ReqSetUserSign)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqSetFace{}, on_C2GW_ReqSetFace)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqSetUserName{}, on_C2GW_ReqSetUserName)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqSetBaseArea{}, on_C2GW_ReqSetBaseArea)

	this.msgparser.RegistProtoMsg(msg.C2GW_ReqCarShopInfo{}, on_C2GW_ReqCarShopInfo)
	this.msgparser.RegistProtoMsg(msg.C2GW_BuyCarFromShop{}, on_C2GW_BuyCarFromShop)

	// 地图事件
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqEnterEvents{}, on_C2GW_ReqEnterEvents)
	this.msgparser.RegistProtoMsg(msg.C2GW_LeaveEvent{}, on_C2GW_LeaveEvent)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqMapStoreInfo{}, on_C2GW_ReqMapStoreInfo)
	this.msgparser.RegistProtoMsg(msg.C2GW_BuyFromMapStore{}, on_C2GW_BuyFromMapStore)


	// 女仆
	this.msgparser.RegistProtoMsg(msg.C2GW_MakeClothes{}, 		on_C2GW_MakeClothes)
	this.msgparser.RegistProtoMsg(msg.C2GW_MaidUpgrade{}, 		on_C2GW_MaidUpgrade)
	this.msgparser.RegistProtoMsg(msg.C2GW_TakeMaidEarning{}, 	on_C2GW_TakeMaidEarning)
	this.msgparser.RegistProtoMsg(msg.C2GW_RobMaid{}, 			on_C2GW_RobMaid)
	this.msgparser.RegistProtoMsg(msg.C2GW_TackBackMaid{}, 		on_C2GW_TackBackMaid)
	this.msgparser.RegistProtoMsg(msg.C2GW_SendBackMaid{}, 		on_C2GW_SendBackMaid)
	this.msgparser.RegistProtoMsg(msg.C2GW_TakeRobMaidEarning{},on_C2GW_TakeRobMaidEarning)

	this.msgparser.RegistProtoMsg(msg.C2GW_ReqCarInfo{}, on_C2GW_ReqCarInfo)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqCarInfoById{}, on_C2GW_ReqCarInfoById)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqMyParkingInfo{}, on_C2GW_ReqMyParkingInfo)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqParkingInfoByType{}, on_C2GW_ReqParkingInfoByType)
	this.msgparser.RegistProtoMsg(msg.C2GW_ParkCar{}, on_C2GW_ParkCar)
	this.msgparser.RegistProtoMsg(msg.C2GW_TakeBackCar{}, on_C2GW_TakeBackCar)
	this.msgparser.RegistProtoMsg(msg.C2GW_TicketCar{}, on_C2GW_TicketCar)
	this.msgparser.RegistProtoMsg(msg.C2GW_ReqTakeCarAutoBackReward{}, on_C2GW_ReqTakeCarAutoBackReward)
	this.msgparser.RegistProtoMsg(msg.C2GW_CarPartLevelup{},on_C2GW_CarPartLevelup)
	this.msgparser.RegistProtoMsg(msg.C2GW_CarStarup{},on_C2GW_CarStarup)
	this.msgparser.RegistProtoMsg(msg.C2GW_CarExpedition{},on_C2GW_CarExpedition)
	this.msgparser.RegistProtoMsg(msg.C2GW_CarActivate{},on_C2GW_CarActivate)
	this.msgparser.RegistProtoMsg(msg.C2GW_CarRetract{},on_C2GW_CarRetract)
	this.msgparser.RegistProtoMsg(msg.C2GW_CarSpeedup{},on_C2GW_CarSpeedup)

	// 收战场消息
	this.msgparser.RegistProtoMsg(msg.BT_ReqEnterRoom{}, on_BT_ReqEnterRoom)
	this.msgparser.RegistProtoMsg(msg.BT_ReqQuitGameRoom{}, on_BT_ReqQuitGameRoom)
	//this.msgparser.RegistProtoMsg(msg.BT_UpdateMoney{}, on_BT_UpdateMoney)
	this.msgparser.RegistProtoMsg(msg.BT_ReqLaunchBullet{}, on_BT_ReqLaunchBullet)
	this.msgparser.RegistProtoMsg(msg.BT_StepOnBomb{}, on_BT_StepOnBomb)
	this.msgparser.RegistProtoMsg(msg.BT_BulletEarnMoney{}, on_BT_BulletEarnMoney)
	this.msgparser.RegistProtoMsg(msg.BT_UseUltimateSkil{}, on_BT_UseUltimateSkil)
	this.msgparser.RegistProtoMsg(msg.BT_ReqCrushSuperBrick{}, on_BT_ReqCrushSuperBrick)

	// 发
	this.msgparser.RegistSendProto(msg.GW2C_HeartBeat{})
	this.msgparser.RegistSendProto(msg.GW2C_MsgNotice{})
	this.msgparser.RegistSendProto(msg.GW2C_MsgNotify{})
	this.msgparser.RegistSendProto(msg.GW2C_RetLogin{})
	this.msgparser.RegistSendProto(msg.GW2C_SendUserInfo{})
	this.msgparser.RegistSendProto(msg.GW2C_RetStartGame{})
	this.msgparser.RegistSendProto(msg.GW2C_AddPackageItem{})
	this.msgparser.RegistSendProto(msg.GW2C_RemovePackageItem{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateYuanbao{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateDiamond{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateGold{})
	this.msgparser.RegistSendProto(msg.GW2C_Ret7DayReward{})
	this.msgparser.RegistSendProto(msg.Sync_BigRewardPickNum{})
	this.msgparser.RegistSendProto(msg.GW2C_RetRechargeMoney{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateFreeStep{})
	this.msgparser.RegistSendProto(msg.GW2C_SendUserPlatformMoney{})
	//this.msgparser.RegistSendProto(msg.GW2C_RetDeliveryDiamond{})
	this.msgparser.RegistSendProto(msg.GW2C_SendLuckyDrawRecord{})
	//this.msgparser.RegistSendProto(msg.GW2C_SendShowImage{})
	this.msgparser.RegistSendProto(msg.GW2C_SendTaskList{})

	this.msgparser.RegistSendProto(msg.GW2C_SendWechatInfo{})
	this.msgparser.RegistSendProto(msg.GW2C_LuckyDrawHit{})
	this.msgparser.RegistSendProto(msg.GW2C_SendDeliveryAddressList{})
	this.msgparser.RegistSendProto(msg.GW2C_FreePresentNotify{})
	this.msgparser.RegistSendProto(msg.GW2C_RetGoldExchange{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateItemPos{})
	//this.msgparser.RegistSendProto(msg.GW2C_RetChangeImageSex{})
	this.msgparser.RegistSendProto(msg.GW2C_AckHouseData{})
	this.msgparser.RegistSendProto(msg.GW2C_AckNewPlayerStep{})
	this.msgparser.RegistSendProto(msg.GW2C_AckHouseLevelUp{})
	this.msgparser.RegistSendProto(msg.GW2C_AckHouseCellLevelUp{})
	this.msgparser.RegistSendProto(msg.GW2C_AckTakeSelfHouseGoldRet{})
	this.msgparser.RegistSendProto(msg.GW2C_AckTakeOtherHouseGoldRet{})
	this.msgparser.RegistSendProto(msg.GW2C_AckRandHouseList{})
	this.msgparser.RegistSendProto(msg.GW2C_NotifyRobCount{})
	this.msgparser.RegistSendProto(msg.GW2C_NotifyTimeStamp{})
	this.msgparser.RegistSendProto(msg.GW2C_AckOtherUserHouseData{})
	this.msgparser.RegistSendProto(msg.GW2C_NotifyAddRobCountTime{})
	this.msgparser.RegistSendProto(msg.GW2C_AckHouseDataByHouseId{})
	this.msgparser.RegistSendProto(msg.GW2C_AckBuyHouseFromBuilding{})
	this.msgparser.RegistSendProto(msg.GW2C_AckBuildingCanBuyInfo{})
	//个人设置
	this.msgparser.RegistSendProto(msg.GW2C_AckSetUserSign{})
	this.msgparser.RegistSendProto(msg.GW2C_AckSetUserName{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateUserDataByKey{})
	//位置附近的人
	this.msgparser.RegistSendProto(msg.GW2C_AckNearUsers{})
	this.msgparser.RegistSendProto(msg.GW2C_AckPlayerCountByProvince{})

	//交易发
	this.msgparser.RegistSendProto(msg.GW2C_RetHouseTradeList{})
	this.msgparser.RegistSendProto(msg.GW2C_RetTradeHouse{})
	this.msgparser.RegistSendProto(msg.GW2C_RetBuyTradeHouse{})
	this.msgparser.RegistSendProto(msg.GW2C_RetTradeHouseHistory{})
	this.msgparser.RegistSendProto(msg.GW2C_RetGetTradeHouseReward{})
	this.msgparser.RegistSendProto(msg.GW2C_RetCancelTradeHouse{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateHouseDataOne{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateCar{})
	this.msgparser.RegistSendProto(msg.GW2C_RetCarTradeList{})
	this.msgparser.RegistSendProto(msg.GW2C_RetTradeCarHistory{})
	this.msgparser.RegistSendProto(msg.GW2C_RetGetTradeCarReward{})
	this.msgparser.RegistSendProto(msg.GW2C_RetItemTradeList{})
	this.msgparser.RegistSendProto(msg.GW2C_RetTradeItem{})
	this.msgparser.RegistSendProto(msg.GW2C_RetBuyTradeItem{})
	this.msgparser.RegistSendProto(msg.GW2C_RetTradeItemHistory{})
	this.msgparser.RegistSendProto(msg.GW2C_RetGetTradeItemReward{})
	this.msgparser.RegistSendProto(msg.GW2C_RetCancelTradeItem{})
	this.msgparser.RegistSendProto(msg.GW2C_HitTarget{})
	this.msgparser.RegistSendProto(msg.GW2C_RetStartThrow{})


	this.msgparser.RegistSendProto(msg.GW2C_ResCarInfo{})
	this.msgparser.RegistSendProto(msg.GW2C_ResCarInfoById{})
	this.msgparser.RegistSendProto(msg.GW2C_ResParkingInfo{})
	this.msgparser.RegistSendProto(msg.GW2C_ParkCarResult{})
	this.msgparser.RegistSendProto(msg.GW2C_TakeBackCarResult{})
	this.msgparser.RegistSendProto(msg.GW2C_TicketCarResult{})
	this.msgparser.RegistSendProto(msg.GW2C_SynParkingRecord{})
	this.msgparser.RegistSendProto(msg.GW2C_TakeBackCarResult{})
	this.msgparser.RegistSendProto(msg.GW2C_RetTakeCarAutoBackReward{})
	this.msgparser.RegistSendProto(msg.GW2C_CarAutoBack{})
	this.msgparser.RegistSendProto(msg.GW2C_SendCarShopInfo{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateCarShopProduct{})
	this.msgparser.RegistSendProto(msg.GW2C_AddNewCar{})
	this.msgparser.RegistSendProto(msg.GW2C_RetCarPartLevelup{})
	this.msgparser.RegistSendProto(msg.GW2C_RetCarStarup{})
	this.msgparser.RegistSendProto(msg.GW2C_RetCarExpedition{})
	this.msgparser.RegistSendProto(msg.GW2C_RetCarActivate{})
	this.msgparser.RegistSendProto(msg.GW2C_RetCarRetract{})
	this.msgparser.RegistSendProto(msg.GW2C_RetCarSpeedup{})

	// 地图事件
	this.msgparser.RegistSendProto(msg.GW2C_SendUserEvents{})
	this.msgparser.RegistSendProto(msg.GW2C_RemoveEvent{})
	this.msgparser.RegistSendProto(msg.GW2C_SendMapStoreInfo{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateMapStoreProduct{})
	this.msgparser.RegistSendProto(msg.GW2C_EnterGameEvent{})

	// 女仆
	this.msgparser.RegistSendProto(msg.GW2C_SendHouseMaidInfo{})
	this.msgparser.RegistSendProto(msg.GW2C_SendUserMaidInfo{})
	this.msgparser.RegistSendProto(msg.GW2C_EnableMaidDropTo{})
	this.msgparser.RegistSendProto(msg.GW2C_UpdateHouseVisitInfo{})


	// Room
	this.msgparser.RegistSendProto(msg.BT_GameInit{})
	//this.msgparser.RegistSendProto(msg.BT_SendBattleUser{})
	this.msgparser.RegistSendProto(msg.BT_GameStart{})
	this.msgparser.RegistSendProto(msg.BT_GameOver{})
	this.msgparser.RegistSendProto(msg.BT_PickItem{})
	this.msgparser.RegistSendProto(msg.BT_RetLaunchBullet{})
	this.msgparser.RegistSendProto(msg.BT_RetStepOnBomb{})
	//this.msgparser.RegistSendProto(msg.BT_SynUserRechargeMoney{})
	this.msgparser.RegistSendProto(msg.BT_RetCrushSuperBrick{})
	this.msgparser.RegistSendProto(msg.BT_RetBulletEarnMoney{})
	this.msgparser.RegistSendProto(msg.BT_GameRoomDestroy{})
}

// 客户端心跳
func on_C2GW_HeartBeat(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_HeartBeat)
	//log.Info(reflect.TypeOf(tmsg).String())

	//account, ok := session.UserDefData().(string)
	//if ok == false {
	//	session.Close()
	//	return
	//}

	//user := UserMgr().FindByAccount(account)
	//if user == nil {
	//	log.Error("收到账户[%s]心跳，但玩家不在线", account)
	//	return
	//}

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.SetHeartBeat(util.CURTIMEMS())
	curtime := util.CURTIME()
	//log.Info("receive heart beat msg now=%d", curtime)
	user.SendMsg(&msg.GW2C_HeartBeat{
		Time: pb.Int64(curtime),
	})
}

func on_C2GW_Get7DayReward(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	user.GetSignReward()
}

func on_C2GW_ReqStartGame(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqStartGame)
	//log.Info(reflect.TypeOf(tmsg).String())
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	gamekind, eventuid := tmsg.GetGamekind(), tmsg.GetEventuid()
	errcode := user.ReqStartGameLocal(gamekind, eventuid)
	user.ReplyStartGame(errcode, 0)
}

func on_BT_ReqEnterRoom(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.BT_ReqEnterRoom)
	//log.Info(reflect.TypeOf(tmsg).String())
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if !user.IsInRoom() {
		user.SendNotify("房间不存在")
		return
	}

	// 进入游戏房间
	//log.Info("玩家[%d] 开始进入房间[%d] ts[%d]", user.Id(), user.RoomId(), util.CURTIMEMS())
	//tmsg.Roomid, tmsg.Userid = pb.Int64(user.RoomId()), pb.Uint64(user.Id())
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d ]找不到游戏房间[%d]", userid, roomid)
		return
	}
	room.UserEnter(userid, "")
}

func on_BT_ReqQuitGameRoom(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_ReqQuitGameRoom)
	//log.Info(reflect.TypeOf(tmsg).String())

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 离开游戏房间
	//tmsg.Roomid, tmsg.Userid = pb.Int64(user.RoomId()), pb.Uint64(user.Id())
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("BT_ReqQuitGameRoom 游戏房间[%d]不存在 玩家[%d]", roomid, userid)
		return
	}
	room.UserLeave(userid, tmsg.GetGold())
}

func on_C2GW_ReqLogin(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqLogin)
	reason, account, verifykey, token, face := "", tmsg.GetAccount(), tmsg.GetVerifykey(), tmsg.GetToken(), tmsg.GetFace()
	islogin := false

	switch {
	default:
		if UserMgr().FindByAccount(account) != nil {
			islogin, reason = true, "玩家已经登陆了"
			log.Info("账户%s 登录Gate失败，已经登陆了", account)
			break
		}

		wAccount := WaitPool().Find(account)
		if wAccount == nil {
			reason = "非法登陆网关"
			//log.Info("账户%s 登录Gate失败，没有注册信息", account)
			break
		}

		if wAccount.verifykey != verifykey {
			reason = "登陆网关校验失败"
			log.Info("账户%s 登陆Gate校验Key不正确 want:%s have:%s", account, wAccount.verifykey, verifykey)
			break
		}

		// 构造新GateUser
		user, newerr := UserMgr().CreateNewUser(session, account, verifykey, token, face)
		if newerr != "" || user == nil {
			reason = newerr
			log.Info("账户%s 创建新GateUser失败 原因[%s]", account, newerr)
			break
		}

		session.SetUserDefData(user) // TODO: 登陆成功才绑定账户到会话
		return
	}

	// 返回给客户端，失败才回
	if reason != "" {
		if !islogin {
			UnBindingAccountGateWay(account)
		}
		log.Error("sid[%d] 账户[%s] 登陆网关失败 reason[%s]", session.Id(), account, reason)
		send := &msg.GW2C_RetLogin{Errcode: pb.String(reason)}
		session.SendCmd(send)
		session.Close()
	}
}

//func on_C2GW_ReqUserInfo(session network.IBaseNetSession, message interface{}) {
//	//tmsg := message.(*msg.C2GW_ReqUserInfo)
//	user := ExtractSessionUser(session)
//	if user == nil {
//		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
//		session.Close()
//		return
//	}
//
//	if user.IsOnline() == false {
//		log.Error("账户%s 没有登陆Gate成功", account)
//		session.Close()
//		return
//	}
//
//	user.Syn()
//}

// 购买道具
func on_C2GW_BuyItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_BuyItem)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if user.IsOnline() == false {
		log.Error("玩家[%s %d]没有登陆Gate成功", user.Name(), user.Id())
		session.Close()
		return
	}

	user.BuyItem(tmsg.GetProductid(), tmsg.GetNum())
}

func on_C2GW_ReqDeliveryGoods(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqDeliveryGoods)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if user.IsOnline() == false {
		log.Error("玩家[%s %d] 没有登陆Gate成功", user.Name(), user.Id())
		session.Close()
		return
	}

	// 发货
	if tbl.Global.IntranetFlag {
		user.SendNotify("本版本暂不可用")
		return
	} else {
		event := NewDeliveryGoodsEvent(tmsg.GetList(), tmsg.GetToken(), user.DeliveryGoods)
		user.AsynEventInsert(event)
	}
}

//func on_C2GW_ReqDeliveryDiamond(session network.IBaseNetSession, message interface{}) {
//	tmsg := message.(*msg.C2GW_ReqDeliveryDiamond)
//
//	user := ExtractSessionUser(session)
//	if user == nil {
//		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
//		session.Close()
//		return
//	}
//
//	if user.IsOnline() == false {
//		log.Error("玩家[%s %d]没有登陆Gate成功", user.Name(), user.Id())
//		session.Close()
//		return
//	}
//
//	// 提钻石
//	if tbl.Global.IntranetFlag {
//		user.SendNotify("本版本暂不可用")
//		return
//	}else {
//		event := NewDeliveryGoodsEvent(tmsg.GetList(), tmsg.GetToken(), user.DeliveryDiamond)
//		user.AsynEventInsert(event)
//	}
//}

func on_C2GW_UseBagItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_UseBagItem)

	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	user.UseItem(tmsg.GetItemid(), tmsg.GetNum())
}

func on_C2GW_ReqRechargeMoney(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqRechargeMoney)
	//log.Trace("%v", tmsg)

	//
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 充值
	event := NewUserRechargeEvent(user, user.Account(), tmsg.GetToken(), tmsg.GetAmount(), RequestRecharge)
	user.AsynEventInsert(event)
}

func on_C2GW_SellBagItem(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_SellBagItem)
	//user := ExtractSessionUser(session)
	//if user == nil {
	//	log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
	//	session.Close()
	//	return
	//}

	//for _, v := range tmsg.GetList() {
	//	itemid, num := v.GetItemid(), v.GetNum()
	//	user.SellBagItem(itemid, num)
	//}
}

// 玩家充值完成(大厅和房间都自己获取金币返回)
func on_C2GW_PlatformRechargeDone(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_PlatformRechargeDone)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	// 游戏中
	//if user.IsInRoom() {
	//	user.SendRoomMsg(tmsg)
	//	return
	//}
	//log.Error("玩家[%s %d]收到充值完成通知但玩家不在房间中", user.Name(), user.Id())
	//user.SynMidasBalance()
}

// 绑定微信openid
func on_C2GW_SendWechatAuthCode(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_SendWechatAuthCode)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	log.Info("玩家[%d] 获取access_token 微信授权code[%s]", user.Id(), tmsg.GetCode())

	//获取用户access_token 和 openid
	appid, secret, code := tbl.Global.Wechat.AppID, tbl.Global.Wechat.AppSecret, tmsg.GetCode()
	url := fmt.Sprintf("https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code",
		appid, secret, code)
	resp, errcode := network.HttpGet(url)
	if errcode != nil || resp == nil {
		log.Error("玩家[%d] 获取access_token失败 HttpGet失败[%s]", user.Id(), errcode)
		return
	}

	type RespFail struct {
		Errcode int64
		Errmsg  string
	}
	var respfail RespFail
	unerror := json.Unmarshal(resp.Body, &respfail)
	if unerror != nil {
		log.Info("玩家[%d] 获取access_token失败 json.Unmarshal Object Fail[%s] ", user.Id(), unerror)
		return
	}

	if respfail.Errcode != 0 && respfail.Errmsg != "" {
		log.Error("玩家[%d] 获取access_token失败， resp.errcode=%d resp.errmsg=%s", user.Id(), respfail.Errcode, respfail.Errmsg)
		return
	}

	type RespOk struct {
		Access_token  string
		Expires_in    float64
		Refresh_token string
		Openid        string
		Scope         string
		Unionid       string
	}
	var respok RespOk
	unerror = json.Unmarshal(resp.Body, &respok)
	if unerror != nil {
		log.Info("玩家[%d] 获取access_token失败 json.Unmarshal Object Fail[%s] ", user.Id(), unerror)
		return
	}
	log.Info("玩家[%d] 获取access_token成功, respok=%#v", user.Id(), respok)

	//
	if user.OpenId() == "" {
		if _, errset := Redis().Set(fmt.Sprintf("user_%d_wechat_openid", user.Id()), respok.Openid, 0).Result(); errset != nil {
			log.Info("玩家[%d] 设置wechat openid到redis失败", user.Id())
			return
		}
		user.SetOpenId(respok.Openid)
		send := &msg.GW2C_SendWechatInfo{Openid: pb.String(respok.Openid)}
		user.SendMsg(send)

		// 转账给新用户
		def.HttpWechatCompanyPay(respok.Openid, 1, "绑定微信奖励")

		// 完成任务
		log.Info("玩家[%d] 绑定wechat openid[%s]", user.Id(), respok.Openid)
	}
}

// 抽奖
func on_C2GW_StartLuckyDraw(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_StartLuckyDraw)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if user.IsInRoom() {
		//user.SendRoomMsg(tmsg)
		user.SendNotify("游戏中不能抽奖")
		return
	}

	user.LuckyDraw()
}

// --------------------------------------------------------------------------
/// @brief 前暂时只有一个收货地址，设置和修改都使用这个
/// @return
// --------------------------------------------------------------------------
func on_C2GW_ChangeDeliveryAddress(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ChangeDeliveryAddress)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	user.ClearAddress()
	Addr := tmsg.GetInfo()
	user.AddAddress(Addr.GetReceiver(), Addr.GetPhone(), Addr.GetAddress())
	user.SendAddress()
	user.SendNotify("设置成功")
	log.Info("玩家[%s %d] 修改收货地址，新地址[%s %s %s]", user.Name(), user.Id(), Addr.GetReceiver(), Addr.GetPhone(), Addr.GetAddress())
}

//func on_BT_UpdateMoney(session network.IBaseNetSession, message interface{}) {
//	tmsg := message.(*msg.BT_UpdateMoney)
//	user := ExtractSessionUser(session)
//	if user == nil {
//		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
//		session.Close()
//		return
//	}
//	user.SendRoomMsg(tmsg)
//}

func on_BT_ReqLaunchBullet(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.BT_ReqLaunchBullet)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d ]找不到游戏房间[%d]", userid, roomid)
		return
	}
	if tantan, ok := room.(*TanTanLe); ok == true {
		tantan.ReqLaunchBullet()
	}

}

func on_BT_StepOnBomb(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.BT_StepOnBomb)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d ]找不到游戏房间[%d]", userid, roomid)
		return
	}

	if tantan, ok := room.(*TanTanLe); ok == true {
		tantan.StepOnBomb()
	}
}

func on_BT_BulletEarnMoney(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_BulletEarnMoney)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d]子弹死亡同步，找不到游戏房间[%d]", userid, roomid)
		return
	}

	if tantan, ok := room.(*TanTanLe); ok == true {
		tantan.BulletEarnMoney(tmsg.GetGold())
	}
}

func on_BT_UseUltimateSkil(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.BT_UseUltimateSkil)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d ]找不到游戏房间[%d]", userid, roomid)
		return
	}

	if tantan, ok := room.(*TanTanLe); ok == true {
		tantan.UseUltimateSkil(tmsg.GetGold())
	}
}

func on_BT_ReqCrushSuperBrick(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.BT_ReqCrushSuperBrick)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	//user.SendRoomMsg(tmsg)
	roomid, userid := user.RoomId(), user.Id()
	room := RoomMgr().Find(roomid)
	if room == nil {
		log.Error("玩家[%d ]找不到游戏房间[%d]", userid, roomid)
		return
	}

	if tantan, ok := room.(*TanTanLe); ok == true {
		tantan.CrushSuperBrick()
	}
}

func on_C2GW_GoldExchange(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_GoldExchange)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	//if user.IsInRoom() {
	//	user.SendRoomMsg(tmsg)
	//	return
	//}

	// 兑换
	diamonds := tmsg.GetDiamonds()
	if diamonds < 0 {
		user.SendNotify("钻石数量不能是0")
		return
	}

	if user.GetDiamond() < diamonds {
		user.SendNotify("钻石不足")
		return
	}

	gold := uint32(tbl.Game.DiamondToCoins) * diamonds
	user.RemoveDiamond(diamonds, "钻石兑换金币", true)
	user.AddGold(gold, "钻石兑换金币", false)

	send := &msg.GW2C_RetGoldExchange{Gold: pb.Uint32(gold)}
	user.SendMsg(send)

}

func on_C2GW_BuyClothes(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_BuyClothes)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	if user.IsInRoom() {
		//user.SendRoomMsg(tmsg)
		user.SendNotify("正在游戏中")
		return
	}

	user.BuyClothes(tmsg.ItemList)
}

func on_C2GW_DressClothes(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_DressClothes)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	//if user.IsInRoom() {
	//	//user.SendRoomMsg(tmsg)
	//	user.SendNotify("正在游戏中")
	//	return
	//}

	if def.IsValidEquipPos(tmsg.GetPos()) == false {
		user.SendNotify("无效的穿戴部位")
		return
	}

	// 获得女仆
	maid := MaidMgr().GetMaidsById(tmsg.GetId())
	if maid == nil {
		user.SendNotify("您没有任何女仆")
		return
	}

	// 套装
	if tmsg.GetPos() == int32(msg.ItemPos_Suit) || maid.IsHaveDressSuit() == true {
		maid.UnDressAll(user, false)
	} else if tmsg.GetPos() == int32(msg.ItemPos_LongClothes) { // 长衣/裙子
		maid.UnDressClothes(user, int32(msg.ItemPos_Clothes), false) // 脱掉上衣
		maid.UnDressClothes(user, int32(msg.ItemPos_Pants), false)   // 脱掉裤子
	} else if tmsg.GetPos() == int32(msg.ItemPos_Clothes) || tmsg.GetPos() == int32(msg.ItemPos_Pants) {
		maid.UnDressClothes(user, int32(msg.ItemPos_LongClothes), false) //  脱掉长衣/裙子
		maid.UnDressClothes(user, tmsg.GetPos(), false)
	} else if maid.GetClothesByPos(tmsg.GetPos()) != nil {
		maid.UnDressClothes(user, tmsg.GetPos(), false)
	}

	maid.DressClothes(user, tmsg.GetPos(), tmsg.GetItemid())
}

func on_C2GW_UnDressClothes(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_UnDressClothes)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	//if user.IsInRoom() {
	//	//user.SendRoomMsg(tmsg)
	//	user.SendNotify("正在游戏中")
	//	return
	//}

	// 获得女仆
	maid := MaidMgr().GetMaidsById(tmsg.GetId())
	if maid == nil {
		user.SendNotify("您没有任何女仆")
		return
	}
	maid.UnDressClothes(user, tmsg.GetPos(), true)
}

//func on_C2GW_ChangeImageSex(session network.IBaseNetSession, message interface{}) {
//	tmsg := message.(*msg.C2GW_ChangeImageSex)
//	user := ExtractSessionUser(session)
//	if user == nil {
//		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
//		session.Close()
//		return
//	}
//
//	if user.IsInRoom() {
//		//user.SendRoomMsg(tmsg)
//		user.SendNotify("正在游戏中")
//		return
//	}
//
//	if user.Sex() == tmsg.GetSex() {
//		user.SendNotify("和当前性别一致，无需切换")
//		return
//	}
//
//	user.SetSex(tmsg.GetSex())
//	send := &msg.GW2C_RetChangeImageSex{Sex: pb.Int32(user.Sex())}
//	user.SendMsg(send)
//
//	maid.SendShowImage()
//}

func on_C2GW_ReqCarShopInfo(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	Carshop().SendShopInfo(user)
}

func on_C2GW_BuyCarFromShop(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_BuyCarFromShop)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	Carshop().BuyCar(user, tmsg.GetShopid(), tmsg.GetPid())
}

// 请求激活事件
func on_C2GW_ReqEnterEvents(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqEnterEvents)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.events.EnterEvent(tmsg.GetUid())
}

// 请求激活事件
func on_C2GW_LeaveEvent(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_LeaveEvent)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.events.LeaveEvent(tmsg.GetUid())
}

// 请求打开地图商店，不通过事件
func on_C2GW_ReqMapStoreInfo(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqMapStoreInfo)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	Mapstore().SendStoreInfo(user, tmsg.GetShopid(), 0)
}

// 请求地图商店购买
func on_C2GW_BuyFromMapStore(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_BuyFromMapStore)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	Mapstore().BuyProduct(user, tmsg.GetShopid(), tmsg.GetPid(), tmsg.GetNum())
}


// 合成时装
func on_C2GW_MakeClothes(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_MakeClothes)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.MakeClothes(tmsg.GetDebris())
}

// 升级女仆
func on_C2GW_MaidUpgrade(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_MaidUpgrade)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	MaidMgr().UpgradeMaid(user, tmsg.GetId())
}

// 收取女仆收益
func on_C2GW_TakeMaidEarning(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_TakeMaidEarning)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	MaidMgr().TakeMaidEarning(user, tmsg.GetId())
}

// 掠夺女仆
func on_C2GW_RobMaid(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_RobMaid)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	MaidMgr().RobMaid(user, tmsg.GetId(), tmsg.GetDropto())
}

// 夺回自己的女仆
func on_C2GW_TackBackMaid(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_TackBackMaid)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	MaidMgr().TackBackMaid(user, tmsg.GetId())
}

// 送回夺取的女仆
func on_C2GW_SendBackMaid(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_SendBackMaid)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	MaidMgr().SendBackMaid(user, tmsg.GetId())
}

// 送回夺取的女仆
func on_C2GW_TakeRobMaidEarning(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_TakeRobMaidEarning)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	MaidMgr().TakeRobMaidEarning(user, tmsg.GetHouseid(), tmsg.GetId())
}

func on_C2GW_ReqTaskList(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_ReqTaskList)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	//if user.IsInRoom() {
	//	user.SendNotify("正在游戏中")
	//	return
	//}
	user.task.SendTaskList()
}

func on_C2GW_ReqSetNewPlayerStep(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqSetNewPlayerStep)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	step := tmsg.GetStep()
	index := tmsg.GetIndex()
	if user.SetNewPlayerStep(step, index) == true {
		send := &msg.GW2C_AckNewPlayerStep{Step: pb.Uint32(step)}
		user.SendMsg(send)
	}
}

func on_C2GW_ReqHouseData(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2GW_ReqHouseData)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.ReqMatchHouseData()
}

func on_C2GW_ReqHouseLevelUp(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqHouseLevelUp)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	houseid := tmsg.GetHouseid()
	user.HouseLevelUp(houseid)
}

func on_C2GW_ReqHouseCellLevelUp(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqHouseCellLevelUp)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	houseid := tmsg.GetHouseid()
	index := tmsg.GetIndex()
	user.HouseCellLevelUp(houseid, index)
}

func on_C2GW_ReqTakeSelfHouseGold(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqTakeSelfHouseGold)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	houseid := tmsg.GetHouseid()
	index := tmsg.GetIndex()
	user.TakeSelfHouseGold(houseid, index)
}

func on_C2GW_ReqTakeOtherHouseGold(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqTakeOtherHouseGold)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	houseid := tmsg.GetHouseid()
	index := tmsg.GetIndex()
	user.TakeOtherHouseGold(houseid, index)
}

func on_C2GW_ReqRandHouseList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqRandHouseList)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	carflag := tmsg.GetCarflag()
	buildingid := tmsg.GetBuildingid()
	bgetall := tmsg.GetBgetall()
	user.ReqRandHouseList(carflag, buildingid, bgetall)
}

func on_C2GW_ReqOtherUserHouseData(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqOtherUserHouseData)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	otherid := tmsg.GetUserid()
	user.ReqOtherUserHouse(otherid)
}

//请求车辆信息
func on_C2GW_ReqCarInfo(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	log.Info("on_C2GW_ReqCarInfo %d", user.Id())
	user.SynCarData()
}

//请求指定车辆信息 
func on_C2GW_ReqCarInfoById(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	log.Info("on_C2GW_ReqCarInfoById %d", user.Id())
	tmsg := message.(*msg.C2GW_ReqCarInfoById)
	cardata := CarMgr().GetCar(uint64(tmsg.GetCarid()))
	send := &msg.GW2C_ResCarInfoById{}
	send.Cardata = cardata.PackBin()
	user.SendMsg(send)
}
//请求我的车位信息
func on_C2GW_ReqMyParkingInfo(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	log.Info("on_C2GW_ReqMyParkingInfo %d", user.Id())
	user.SynParkingData()
}

//请求指定车位信息
func on_C2GW_ReqParkingInfoByType(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	tmsg := message.(*msg.C2GW_ReqParkingInfoByType)
	parkinginfo := CarMgr().GetParkingByCondition(uint32(tmsg.GetType()), uint64(tmsg.GetPlayerid()), tmsg.GetHouseids())
	send := &msg.GW2C_ResParkingInfo{}
	for _, v := range parkinginfo {
		tmp := v.PackBin()
		send.Parkingdatas = append(send.Parkingdatas, tmp)
	}
	user.SendMsg(send)
}

//请求停车
func on_C2GW_ParkCar(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	tmsg := message.(*msg.C2GW_ParkCar)
	cid := tmsg.GetCarid()
	pid := tmsg.GetParkingid()
	send := &msg.GW2C_ParkCarResult{}
	result := CarMgr().ParkingCar(user,cid, pid, user.Name())
	send.Result = pb.Int32(result)
	user.SendMsg(send)

}

//请求收回车辆 / 领取自动回收收益
func on_C2GW_TakeBackCar(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	tmsg := message.(*msg.C2GW_TakeBackCar)
	send := &msg.GW2C_TakeBackCarResult{}
	var result, reward uint32 = 0, 0
	car := CarMgr().GetCar(tmsg.GetCarid())
	if car == nil {
		result, reward = 1, 0
	} else {
		result, reward = CarMgr().TakeBackFromParking(user, car.data.GetParkingid(), uint32(msg.CarOperatorType_TakeBack))
	}
	send.Result = pb.Int32(int32(result))
	send.Reward = pb.Int32(int32(reward))
	user.SendMsg(send)
}

//请求贴条
func on_C2GW_TicketCar(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	tmsg := message.(*msg.C2GW_TicketCar)
	send := &msg.GW2C_TicketCarResult{}
	result, reward := CarMgr().TakeBackFromParking(user, tmsg.GetParkingid(), uint32(msg.CarOperatorType_Ticket))
	send.Result = pb.Int32(int32(result))
	send.Reward = pb.Int32(int32(reward))
	user.SendMsg(send)
}

// 请求领取自动收益
func on_C2GW_ReqTakeCarAutoBackReward(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqTakeCarAutoBackReward)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	send := &msg.GW2C_RetTakeCarAutoBackReward{}
	result, reward := CarMgr().TakeCarAutoBackReward(user, tmsg.GetCarid())
	send.Result = pb.Int32(int32(result))
	send.Reward = pb.Int32(int32(reward))
	user.SendMsg(send)
}

//请求升级部件
func on_C2GW_CarPartLevelup(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_CarPartLevelup)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	send := &msg.GW2C_RetCarPartLevelup{}
	result, data := CarMgr().CarPartLevelup(user, tmsg.GetCarid(), tmsg.GetParttype(),tmsg.Pieces)
	send.Result = pb.Uint32(result)
	send.Car = data
	user.SendMsg(send)
}

//请求升星
func on_C2GW_CarStarup(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_CarStarup)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	send := &msg.GW2C_RetCarStarup{}
	result, data := CarMgr().CarStarup(user, tmsg.GetCarid())
	send.Result = pb.Uint32(result)
	send.Car = data
	user.SendMsg(send)
}
//请求出征
func on_C2GW_CarExpedition(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_CarExpedition)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	send := &msg.GW2C_RetCarExpedition{}
	result, data := CarMgr().CarExpedition(user, tmsg)
	send.Result = pb.Uint32(result)
	send.Car = data
	user.SendMsg(send)
}
//请求激活
func on_C2GW_CarActivate(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_CarActivate)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	send := &msg.GW2C_RetCarActivate{}
	result, data := CarMgr().CarActivate(user, tmsg.GetCarid())
	send.Result = pb.Uint32(result)
	send.Car = data
	user.SendMsg(send)
}
//请求撤回 
func on_C2GW_CarRetract(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_CarRetract)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	send := &msg.GW2C_RetCarRetract{}
	result, data := CarMgr().CarRetract(user, tmsg.GetCarid())
	send.Result = pb.Uint32(result)
	send.Car = data
	user.SendMsg(send)
}
//请求加速
func on_C2GW_CarSpeedup(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_CarSpeedup)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}

	send := &msg.GW2C_RetCarSpeedup{}
	result, data := CarMgr().CarSpeedup(user, tmsg.GetCarid())
	send.Result = pb.Uint32(result)
	send.Car = data
	user.SendMsg(send)
}

func on_C2GW_ReqResetRobCheckFlag(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqResetRobCheckFlag)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	houseid := tmsg.GetHouseid()
	user.ResetRobCheckFlag(houseid)
}

func on_C2GW_ReqHouseDataByHouseId(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqHouseDataByHouseId)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	houseid := tmsg.GetHouseid()
	MaidMgr().SendHouseMaids(user, houseid)
	user.ReqHouseDataByHouseId(houseid)
}

func on_C2GW_ReqBuyHouseFromBuilding(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqBuyHouseFromBuilding)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	buildingid := tmsg.GetBuildingid()
	index := tmsg.GetIndex()
	user.BuyHouseFromBuilding(buildingid, index)
}

func on_C2GW_ReqBuildingCanBuyInfo(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqBuildingCanBuyInfo)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	buildingid := tmsg.GetBuildingid()
	user.ReqBuildingCanBuyInfo(buildingid)
}

func on_C2GW_StartThrow(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.StartThrow()
}

func on_C2GW_TargetItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_TargetItem)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.TargetItem(tmsg.GetItemid())
}

//交易消息
func on_C2GW_ReqHouseTradeList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqHouseTradeList)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.ReqTradeHouseList(tmsg)
}

func on_C2GW_TradeHouse(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_TradeHouse)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.TradeHouse(tmsg.GetHouseuid(), tmsg.GetPrice())
}

func on_C2GW_BuyTradeHouse(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_BuyTradeHouse)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.BuyTradeHouse(tmsg.GetTradeuid(), tmsg.GetHouseuid())
}

func on_C2GW_ReqTradeHouseHistory(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.ReqTradeHouseHistory()
}

func on_C2GW_CancelTradeHouse(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_CancelTradeHouse)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.CancelTradeHouse(tmsg.GetHouseuid())
}

func on_C2GW_GetTradeHouseReward(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_GetTradeHouseReward)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.GetTradeHouseReward(tmsg.GetTradeuid())
}

func on_C2GW_ReqCarTradeList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqCarTradeList)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.ReqTradeCarList(tmsg)
}

func on_C2GW_TradeCar(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_TradeCar)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.TradeCar(tmsg.GetCaruid(), tmsg.GetPrice())
}

func on_C2GW_BuyTradeCar(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_BuyTradeCar)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.BuyTradeCar(tmsg.GetTradeuid(), tmsg.GetCaruid())
}

func on_C2GW_ReqTradeCarHistory(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.ReqTradeCarHistory()
}

func on_C2GW_CancelTradeCar(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_CancelTradeCar)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.CancelTradeCar(tmsg.GetCaruid())
}

func on_C2GW_GetTradeCarReward(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_GetTradeCarReward)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.GetTradeCarReward(tmsg.GetTradeuid())
}

func on_C2GW_ReqItemTradeList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqItemTradeList)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.ReqTradeItemList(tmsg)
}

func on_C2GW_TradeItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_TradeItem)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.TradeItem(tmsg.GetItemid(), tmsg.GetItemnum(), tmsg.GetPrice())
}

func on_C2GW_BuyTradeItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_BuyTradeItem)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.BuyTradeItem(tmsg.GetTradeuid(), tmsg.GetUserid())
}

func on_C2GW_ReqTradeItemHistory(session network.IBaseNetSession, message interface{}) {
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.ReqTradeItemHistory()
}

func on_C2GW_CancelTradeItem(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_CancelTradeItem)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.CancelTradeItem(tmsg.GetTradeuid())
}

func on_C2GW_GetTradeItemReward(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_GetTradeItemReward)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	user.GetTradeItemReward(tmsg.GetTradeuid())
}

func on_C2GW_ReqNearUsers (session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqNearUsers)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	x := tmsg.GetLng()
	y := tmsg.GetLat()
	user.AckNearUsersData(x, y)
}

func on_C2GW_ReqSetPos (session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqSetPos)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	province := tmsg.GetProvince()
	city := tmsg.GetCity()
	user.SetUserPos(tmsg.GetLng(), tmsg.GetLat(), province, city)
	user.events.CheckRefresh()
}

func on_C2GW_ReqSetUserSex (session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqSetUserSex)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	sex := tmsg.GetSex()
	user.SetSex(sex)
}

func on_C2GW_ReqSetUserAge (session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqSetUserAge)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	age := tmsg.GetAge()
	user.SetAge(age)
}

func on_C2GW_ReqSetUserConstellation (session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqSetUserConstellation)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	constellation := tmsg.GetConstellation()
	user.SetConstellation(constellation)
}

func on_C2GW_ReqSetUserName (session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqSetUserName)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	name := tmsg.GetName()
	send := &msg.GW2C_AckSetUserName{}
	if user.SetName(name) == true {
		send.Ret = pb.Uint32(0)
	} else {
		send.Ret = pb.Uint32(1)
	}
	user.SendMsg(send)
}

func on_C2GW_ReqSetUserSign (session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqSetUserSign)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	sign := tmsg.GetSign()
	send := &msg.GW2C_AckSetUserSign{}
	if user.SetSign(sign) == true {
		send.Ret = pb.Uint32(0)
	} else {
		send.Ret = pb.Uint32(1)
	}
	user.SendMsg(send)
}

func on_C2GW_ReqSetFace (session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqSetFace)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	face := tmsg.GetFace()
	user.SetFace(face, true)
}

func on_C2GW_ReqPlayerCountByProvince (session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqPlayerCountByProvince)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	province := tmsg.GetProvince()
	data := UserMgr().GetUserCountByProvince(province)
	send := &msg.GW2C_AckPlayerCountByProvince{}
	send.Province = pb.Uint32(province)
	for k, v := range data {
		tmp := &msg.CommonKeyValue{}
		tmp.Key = pb.Uint32(uint32(k))
		tmp.Value = pb.Uint32(uint32(v))
		send.Data = append(send.Data, tmp)
	}
	user.SendMsg(send)
}

func on_C2GW_ReqSetBaseArea (session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2GW_ReqSetBaseArea)
	user := ExtractSessionUser(session)
	if user == nil {
		log.Fatal(fmt.Sprintf("sid:%d 没有绑定用户", session.Id()))
		session.Close()
		return
	}
	province := tmsg.GetProvince()
	city := tmsg.GetCity()
	user.SetBaseArea(province, city)
}
