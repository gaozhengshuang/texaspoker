// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var ProtoId : table.IProtoIdDefine[] = [
		{ Id : 1, Name : "msg.AccountInfo" 	},
		{ Id : 2, Name : "msg.AccountGateInfo" 	},
		{ Id : 3, Name : "msg.GridItem" 	},
		{ Id : 4, Name : "msg.BT_UploadGameUser" 	},
		{ Id : 5, Name : "msg.BT_ReqEnterRoom" 	},
		{ Id : 6, Name : "msg.BT_GameInit" 	},
		{ Id : 7, Name : "msg.BT_GameStart" 	},
		{ Id : 8, Name : "msg.BT_GameEnd" 	},
		{ Id : 9, Name : "msg.BT_GameOver" 	},
		{ Id : 10, Name : "msg.BT_ReqQuitGameRoom" 	},
		{ Id : 11, Name : "msg.BT_PickItem" 	},
		{ Id : 12, Name : "msg.BT_ReqLaunchBullet" 	},
		{ Id : 13, Name : "msg.BT_RetLaunchBullet" 	},
		{ Id : 14, Name : "msg.BT_StepOnBomb" 	},
		{ Id : 15, Name : "msg.BT_RetStepOnBomb" 	},
		{ Id : 16, Name : "msg.BT_BulletEarnMoney" 	},
		{ Id : 17, Name : "msg.BT_UseUltimateSkil" 	},
		{ Id : 18, Name : "msg.BT_ReqCrushSuperBrick" 	},
		{ Id : 19, Name : "msg.BT_RetCrushSuperBrick" 	},
		{ Id : 20, Name : "msg.C2GW_ReqCarInfo" 	},
		{ Id : 21, Name : "msg.GW2C_ResCarInfo{" 	},
		{ Id : 22, Name : "msg.C2GW_ReqMyParkingInfo{" 	},
		{ Id : 23, Name : "msg.C2GW_ReqParkingInfoByType{" 	},
		{ Id : 24, Name : "msg.GW2C_ResParkingInfo{" 	},
		{ Id : 25, Name : "msg.C2GW_ParkCar{" 	},
		{ Id : 26, Name : "msg.GW2C_ParkCarResult" 	},
		{ Id : 27, Name : "msg.C2GW_TakeBackCar" 	},
		{ Id : 28, Name : "msg.GW2C_TakeBackCarResult" 	},
		{ Id : 29, Name : "msg.C2GW_TicketCar" 	},
		{ Id : 30, Name : "msg.GW2C_TicketCarResult" 	},
		{ Id : 31, Name : "msg.IpHost" 	},
		{ Id : 32, Name : "msg.PairNumItem" 	},
		{ Id : 33, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 34, Name : "msg.GW2C_AddPackageItem" 	},
		{ Id : 35, Name : "msg.GW2C_RemovePackageItem" 	},
		{ Id : 36, Name : "msg.GW2C_UpdateGold" 	},
		{ Id : 37, Name : "msg.GW2C_UpdateYuanbao" 	},
		{ Id : 38, Name : "msg.GW2C_UpdateDiamond" 	},
		{ Id : 39, Name : "msg.GW2C_UpdateFreeStep" 	},
		{ Id : 40, Name : "msg.DeliveryGoods" 	},
		{ Id : 41, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 42, Name : "msg.BigRewardItem" 	},
		{ Id : 43, Name : "msg.Sync_BigRewardPickNum" 	},
		{ Id : 44, Name : "msg.C2GW_UseBagItem" 	},
		{ Id : 45, Name : "msg.C2GW_SellBagItem" 	},
		{ Id : 46, Name : "msg.C2GW_BuyClothes" 	},
		{ Id : 47, Name : "msg.C2GW_DressClothes" 	},
		{ Id : 48, Name : "msg.C2GW_UnDressClothes" 	},
		{ Id : 49, Name : "msg.GW2C_UpdateItemPos" 	},
		{ Id : 50, Name : "msg.GW2C_SendShowImage" 	},
		{ Id : 51, Name : "msg.C2GW_ChangeImageSex" 	},
		{ Id : 52, Name : "msg.GW2C_RetChangeImageSex" 	},
		{ Id : 53, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 54, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 55, Name : "msg.L2C_RetLogin" 	},
		{ Id : 56, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 57, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 58, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 59, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 60, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 61, Name : "msg.GW2C_SendUserInfo" 	},
		{ Id : 62, Name : "msg.GW2C_SendUserPlatformMoney" 	},
		{ Id : 63, Name : "msg.C2GW_HeartBeat" 	},
		{ Id : 64, Name : "msg.GW2C_HeartBeat" 	},
		{ Id : 65, Name : "msg.C2GW_ReqStartGame" 	},
		{ Id : 66, Name : "msg.GW2C_RetStartGame" 	},
		{ Id : 67, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 68, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 69, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 70, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 71, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 72, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 73, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 74, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 75, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 76, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 77, Name : "msg.EntityBase" 	},
		{ Id : 78, Name : "msg.SimpleCounter" 	},
		{ Id : 79, Name : "msg.FreePresentMoney" 	},
		{ Id : 80, Name : "msg.UserWechat" 	},
		{ Id : 81, Name : "msg.UserTask" 	},
		{ Id : 82, Name : "msg.TaskData" 	},
		{ Id : 83, Name : "msg.LuckyDrawItem" 	},
		{ Id : 84, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 85, Name : "msg.ImageData" 	},
		{ Id : 86, Name : "msg.PersonalImage" 	},
		{ Id : 87, Name : "msg.UserBase" 	},
		{ Id : 88, Name : "msg.UserAddress" 	},
		{ Id : 89, Name : "msg.ItemData" 	},
		{ Id : 90, Name : "msg.ItemBin" 	},
		{ Id : 91, Name : "msg.Serialize" 	},
		{ Id : 92, Name : "msg.HouseCell" 	},
		{ Id : 93, Name : "msg.HouseVisitInfo" 	},
		{ Id : 94, Name : "msg.HouseData" 	},
		{ Id : 95, Name : "msg.CarData" 	},
		{ Id : 96, Name : "msg.ParkingData{" 	},
		{ Id : 97, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 98, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 99, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 100, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 101, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 102, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 103, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 104, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 105, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 106, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 107, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 108, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 109, Name : "msg.GW2MS_UserOnlineState" 	},
		{ Id : 110, Name : "msg.GW2MS_ReqCreateHouse" 	},
		{ Id : 111, Name : "msg.MS2GW_AckCreateHouse" 	},
		{ Id : 112, Name : "msg.GW2MS_ReqUserHouse" 	},
		{ Id : 113, Name : "msg.MS2GW_AckUserHouse" 	},
		{ Id : 114, Name : "msg.GW2MS_ReqHouseLevelUp" 	},
		{ Id : 115, Name : "msg.MS2GW_AckHouseLevelUp" 	},
		{ Id : 116, Name : "msg.GW2MS_ReqHouseCellLevelUp" 	},
		{ Id : 117, Name : "msg.MS2GW_AckHouseCellLevelUp" 	},
		{ Id : 118, Name : "msg.GW2MS_ReqTakeSelfHouseGold" 	},
		{ Id : 119, Name : "msg.MS2GW_AckTakeSelfHouseGoldRet" 	},
		{ Id : 120, Name : "msg.GW2MS_ReqTakeOtherHouseGold" 	},
		{ Id : 121, Name : "msg.MS2GW_AckTakeOtherHouseGoldRet" 	},
<<<<<<< HEAD
		{ Id : 122, Name : "msg.GW2MS_ReqCarInfo" 	},
		{ Id : 123, Name : "msg.MS2GW_AckCarInfo{" 	},
		{ Id : 124, Name : "msg.GW2MS_ReqMyParkingInfo{" 	},
		{ Id : 125, Name : "msg.GW2MS_ReqParkingInfoByType{" 	},
		{ Id : 126, Name : "msg.MS2GW_ResParkingInfo{" 	},
		{ Id : 127, Name : "msg.GW2MS_ParkCar{" 	},
		{ Id : 128, Name : "msg.MS2GW_ParkCarResult" 	},
		{ Id : 129, Name : "msg.GW2MS_TakeBackCar" 	},
		{ Id : 130, Name : "msg.MS2GW_TakeBackCarResult" 	},
		{ Id : 131, Name : "msg.GW2MS_TicketCar" 	},
		{ Id : 132, Name : "msg.MS2GW_TicketCarResult" 	},
		{ Id : 133, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 134, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 135, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 136, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 137, Name : "msg.GW2RS_MsgTransfer" 	},
		{ Id : 138, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 139, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 140, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 141, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 142, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 143, Name : "msg.GateSimpleInfo" 	},
		{ Id : 144, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 145, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 146, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 147, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 148, Name : "msg.RS2MS_UpdateRewardPool" 	},
		{ Id : 149, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 150, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 151, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 152, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 153, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 154, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 155, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 156, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 157, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 158, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 159, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 160, Name : "msg.GW2C_FreePresentNotify" 	},
		{ Id : 161, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 162, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 163, Name : "msg.C2GW_ReqTaskList" 	},
		{ Id : 164, Name : "msg.C2GW_ReqHouseData" 	},
		{ Id : 165, Name : "msg.GW2C_AckHouseData" 	},
		{ Id : 166, Name : "msg.C2GW_ReqSetNewPlayerStep" 	},
		{ Id : 167, Name : "msg.GW2C_AckNewPlayerStep" 	},
		{ Id : 168, Name : "msg.C2GW_ReqHouseLevelUp" 	},
		{ Id : 169, Name : "msg.GW2C_AckHouseLevelUp" 	},
		{ Id : 170, Name : "msg.C2GW_ReqHouseCellLevelUp" 	},
		{ Id : 171, Name : "msg.GW2C_AckHouseCellLevelUp" 	},
		{ Id : 172, Name : "msg.C2GW_ReqTakeSelfHouseGold" 	},
		{ Id : 173, Name : "msg.GW2C_AckTakeSelfHouseGoldRet" 	},
		{ Id : 174, Name : "msg.C2GW_ReqTakeOtherHouseGold" 	},
		{ Id : 175, Name : "msg.GW2C_AckTakeOtherHouseGoldRet" 	}
=======
		{ Id : 122, Name : "msg.GW2MS_ReqRandHouseList" 	},
		{ Id : 123, Name : "msg.MS2GW_AckRandHouseList" 	},
		{ Id : 124, Name : "msg.GW2MS_ReqOtherUserHouseData" 	},
		{ Id : 125, Name : "msg.MS2GW_AckOtherUserHouseData" 	},
		{ Id : 126, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 127, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 128, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 129, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 130, Name : "msg.GW2RS_MsgTransfer" 	},
		{ Id : 131, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 132, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 133, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 134, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 135, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 136, Name : "msg.GateSimpleInfo" 	},
		{ Id : 137, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 138, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 139, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 140, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 141, Name : "msg.RS2MS_UpdateRewardPool" 	},
		{ Id : 142, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 143, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 144, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 145, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 146, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 147, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 148, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 149, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 150, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 151, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 152, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 153, Name : "msg.GW2C_FreePresentNotify" 	},
		{ Id : 154, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 155, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 156, Name : "msg.C2GW_ReqTaskList" 	},
		{ Id : 157, Name : "msg.C2GW_ReqHouseData" 	},
		{ Id : 158, Name : "msg.GW2C_AckHouseData" 	},
		{ Id : 159, Name : "msg.C2GW_ReqSetNewPlayerStep" 	},
		{ Id : 160, Name : "msg.GW2C_AckNewPlayerStep" 	},
		{ Id : 161, Name : "msg.C2GW_ReqHouseLevelUp" 	},
		{ Id : 162, Name : "msg.GW2C_AckHouseLevelUp" 	},
		{ Id : 163, Name : "msg.C2GW_ReqHouseCellLevelUp" 	},
		{ Id : 164, Name : "msg.GW2C_AckHouseCellLevelUp" 	},
		{ Id : 165, Name : "msg.C2GW_ReqTakeSelfHouseGold" 	},
		{ Id : 166, Name : "msg.GW2C_AckTakeSelfHouseGoldRet" 	},
		{ Id : 167, Name : "msg.C2GW_ReqTakeOtherHouseGold" 	},
		{ Id : 168, Name : "msg.GW2C_AckTakeOtherHouseGoldRet" 	},
		{ Id : 169, Name : "msg.C2GW_ReqRandHouseList" 	},
		{ Id : 170, Name : "msg.GW2C_AckRandHouseList" 	},
		{ Id : 171, Name : "msg.GW2C_NotifyRobCount" 	},
		{ Id : 172, Name : "msg.C2GW_ReqOtherUserHouseData" 	},
		{ Id : 173, Name : "msg.GW2C_AckOtherUserHouseData" 	},
		{ Id : 174, Name : "msg.GW2C_NotifyTimeStamp" 	}
>>>>>>> bab768de55de473bb8aa551a8291c3921066fc4a
	]


// Id
export var ProtoIdById : game.Dictionary<table.IProtoIdDefine> = {}
function readProtoIdById(){
  for(let rec of ProtoId) {
    ProtoIdById[rec.Id] = rec; 
  }
}
readProtoIdById();

// Name
export var ProtoIdByName : game.Dictionary<table.IProtoIdDefine> = {}
function readProtoIdByName(){
  for(let rec of ProtoId) {
    ProtoIdByName[rec.Name] = rec; 
  }
}
readProtoIdByName();
}

