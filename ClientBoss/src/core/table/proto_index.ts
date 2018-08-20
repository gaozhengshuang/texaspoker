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
		{ Id : 21, Name : "msg.GW2C_ResCarInfo" 	},
		{ Id : 22, Name : "msg.C2GW_ReqMyParkingInfo" 	},
		{ Id : 23, Name : "msg.C2GW_ReqParkingInfoByType" 	},
		{ Id : 24, Name : "msg.GW2C_ResParkingInfo" 	},
		{ Id : 25, Name : "msg.C2GW_ParkCar" 	},
		{ Id : 26, Name : "msg.GW2C_ParkCarResult" 	},
		{ Id : 27, Name : "msg.C2GW_TakeBackCar" 	},
		{ Id : 28, Name : "msg.GW2C_TakeBackCarResult" 	},
		{ Id : 29, Name : "msg.C2GW_TicketCar" 	},
		{ Id : 30, Name : "msg.GW2C_TicketCarResult" 	},
		{ Id : 31, Name : "msg.GW2C_SynParkingRecord" 	},
		{ Id : 32, Name : "msg.IpHost" 	},
		{ Id : 33, Name : "msg.PairNumItem" 	},
		{ Id : 34, Name : "msg.C2GW_ReqHouseData" 	},
		{ Id : 35, Name : "msg.GW2C_AckHouseData" 	},
		{ Id : 36, Name : "msg.C2GW_ReqSetNewPlayerStep" 	},
		{ Id : 37, Name : "msg.GW2C_AckNewPlayerStep" 	},
		{ Id : 38, Name : "msg.C2GW_ReqHouseLevelUp" 	},
		{ Id : 39, Name : "msg.GW2C_AckHouseLevelUp" 	},
		{ Id : 40, Name : "msg.C2GW_ReqHouseCellLevelUp" 	},
		{ Id : 41, Name : "msg.GW2C_AckHouseCellLevelUp" 	},
		{ Id : 42, Name : "msg.C2GW_ReqTakeSelfHouseGold" 	},
		{ Id : 43, Name : "msg.GW2C_AckTakeSelfHouseGoldRet" 	},
		{ Id : 44, Name : "msg.C2GW_ReqTakeOtherHouseGold" 	},
		{ Id : 45, Name : "msg.GW2C_AckTakeOtherHouseGoldRet" 	},
		{ Id : 46, Name : "msg.C2GW_ReqRandHouseList" 	},
		{ Id : 47, Name : "msg.GW2C_AckRandHouseList" 	},
		{ Id : 48, Name : "msg.GW2C_NotifyRobCount" 	},
		{ Id : 49, Name : "msg.C2GW_ReqOtherUserHouseData" 	},
		{ Id : 50, Name : "msg.GW2C_AckOtherUserHouseData" 	},
		{ Id : 51, Name : "msg.GW2C_NotifyTimeStamp" 	},
		{ Id : 52, Name : "msg.C2GW_ReqResetRobCheckFlag" 	},
		{ Id : 53, Name : "msg.GW2C_NotifyAddRobCountTime" 	},
		{ Id : 54, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 55, Name : "msg.GW2C_AddPackageItem" 	},
		{ Id : 56, Name : "msg.GW2C_RemovePackageItem" 	},
		{ Id : 57, Name : "msg.GW2C_UpdateGold" 	},
		{ Id : 58, Name : "msg.GW2C_UpdateYuanbao" 	},
		{ Id : 59, Name : "msg.GW2C_UpdateDiamond" 	},
		{ Id : 60, Name : "msg.GW2C_UpdateFreeStep" 	},
		{ Id : 61, Name : "msg.DeliveryGoods" 	},
		{ Id : 62, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 63, Name : "msg.BigRewardItem" 	},
		{ Id : 64, Name : "msg.Sync_BigRewardPickNum" 	},
		{ Id : 65, Name : "msg.C2GW_UseBagItem" 	},
		{ Id : 66, Name : "msg.C2GW_SellBagItem" 	},
		{ Id : 67, Name : "msg.C2GW_BuyClothes" 	},
		{ Id : 68, Name : "msg.C2GW_DressClothes" 	},
		{ Id : 69, Name : "msg.C2GW_UnDressClothes" 	},
		{ Id : 70, Name : "msg.GW2C_UpdateItemPos" 	},
		{ Id : 71, Name : "msg.GW2C_SendShowImage" 	},
		{ Id : 72, Name : "msg.C2GW_ChangeImageSex" 	},
		{ Id : 73, Name : "msg.GW2C_RetChangeImageSex" 	},
		{ Id : 74, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 75, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 76, Name : "msg.L2C_RetLogin" 	},
		{ Id : 77, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 78, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 79, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 80, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 81, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 82, Name : "msg.GW2C_SendUserInfo" 	},
		{ Id : 83, Name : "msg.GW2C_SendUserPlatformMoney" 	},
		{ Id : 84, Name : "msg.C2GW_HeartBeat" 	},
		{ Id : 85, Name : "msg.GW2C_HeartBeat" 	},
		{ Id : 86, Name : "msg.C2GW_ReqStartGame" 	},
		{ Id : 87, Name : "msg.GW2C_RetStartGame" 	},
		{ Id : 88, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 89, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 90, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 91, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 92, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 93, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 94, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 95, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 96, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 97, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 98, Name : "msg.EntityBase" 	},
		{ Id : 99, Name : "msg.SimpleCounter" 	},
		{ Id : 100, Name : "msg.FreePresentMoney" 	},
		{ Id : 101, Name : "msg.UserWechat" 	},
		{ Id : 102, Name : "msg.UserTask" 	},
		{ Id : 103, Name : "msg.TaskData" 	},
		{ Id : 104, Name : "msg.LuckyDrawItem" 	},
		{ Id : 105, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 106, Name : "msg.ImageData" 	},
		{ Id : 107, Name : "msg.PersonalImage" 	},
		{ Id : 108, Name : "msg.UserBase" 	},
		{ Id : 109, Name : "msg.UserAddress" 	},
		{ Id : 110, Name : "msg.ItemData" 	},
		{ Id : 111, Name : "msg.ItemBin" 	},
		{ Id : 112, Name : "msg.Serialize" 	},
		{ Id : 113, Name : "msg.HouseCell" 	},
		{ Id : 114, Name : "msg.HouseVisitInfo" 	},
		{ Id : 115, Name : "msg.HouseData" 	},
		{ Id : 116, Name : "msg.CarData" 	},
		{ Id : 117, Name : "msg.ParkingData" 	},
		{ Id : 118, Name : "msg.ParkingRecordData" 	},
		{ Id : 119, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 120, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 121, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 122, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 123, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 124, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 125, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 126, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 127, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 128, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 129, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 130, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 131, Name : "msg.GW2MS_UserOnlineState" 	},
		{ Id : 132, Name : "msg.GW2MS_ReqCreateHouse" 	},
		{ Id : 133, Name : "msg.MS2GW_AckCreateHouse" 	},
		{ Id : 134, Name : "msg.GW2MS_ReqUserHouse" 	},
		{ Id : 135, Name : "msg.MS2GW_AckUserHouse" 	},
		{ Id : 136, Name : "msg.GW2MS_ReqHouseLevelUp" 	},
		{ Id : 137, Name : "msg.MS2GW_AckHouseLevelUp" 	},
		{ Id : 138, Name : "msg.GW2MS_ReqHouseCellLevelUp" 	},
		{ Id : 139, Name : "msg.MS2GW_AckHouseCellLevelUp" 	},
		{ Id : 140, Name : "msg.GW2MS_ReqTakeSelfHouseGold" 	},
		{ Id : 141, Name : "msg.MS2GW_AckTakeSelfHouseGoldRet" 	},
		{ Id : 142, Name : "msg.GW2MS_ReqTakeOtherHouseGold" 	},
		{ Id : 143, Name : "msg.MS2GW_AckTakeOtherHouseGoldRet" 	},
<<<<<<< HEAD
		{ Id : 144, Name : "msg.GW2MS_ReqCreateCar" 	},
		{ Id : 145, Name : "msg.MS2GW_AckCreateCar" 	},
		{ Id : 146, Name : "msg.GW2MS_ReqCarInfo" 	},
		{ Id : 147, Name : "msg.MS2GW_AckCarInfo" 	},
		{ Id : 148, Name : "msg.GW2MS_ReqCreateParking" 	},
		{ Id : 149, Name : "msg.MS2GW_AckCreateParking" 	},
		{ Id : 150, Name : "msg.GW2MS_ReqMyParkingInfo" 	},
		{ Id : 151, Name : "msg.GW2MS_ReqParkingInfoByType" 	},
		{ Id : 152, Name : "msg.MS2GW_ResParkingInfo" 	},
		{ Id : 153, Name : "msg.GW2MS_ParkCar" 	},
		{ Id : 154, Name : "msg.MS2GW_ParkCarResult" 	},
		{ Id : 155, Name : "msg.GW2MS_TakeBackCar" 	},
		{ Id : 156, Name : "msg.MS2GW_TakeBackCarResult" 	},
		{ Id : 157, Name : "msg.GW2MS_TicketCar" 	},
		{ Id : 158, Name : "msg.MS2GW_TicketCarResult" 	},
		{ Id : 159, Name : "msg.GW2MS_ReqRecordData" 	},
		{ Id : 160, Name : "msg.MS2GW_AckRecordData" 	},
		{ Id : 161, Name : "msg.GW2MS_ReqRandHouseList" 	},
		{ Id : 162, Name : "msg.MS2GW_AckRandHouseList" 	},
		{ Id : 163, Name : "msg.GW2MS_ReqOtherUserHouseData" 	},
		{ Id : 164, Name : "msg.MS2GW_AckOtherUserHouseData" 	},
		{ Id : 165, Name : "msg.GW2MS_ReqResetRobCheckFlag" 	},
		{ Id : 166, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 167, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 168, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 169, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 170, Name : "msg.GW2RS_MsgTransfer" 	},
		{ Id : 171, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 172, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 173, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 174, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 175, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 176, Name : "msg.GateSimpleInfo" 	},
		{ Id : 177, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 178, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 179, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 180, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 181, Name : "msg.RS2MS_UpdateRewardPool" 	},
		{ Id : 182, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 183, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 184, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 185, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 186, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 187, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 188, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 189, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 190, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 191, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 192, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 193, Name : "msg.GW2C_FreePresentNotify" 	},
		{ Id : 194, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 195, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 196, Name : "msg.C2GW_ReqTaskList" 	}
=======
		{ Id : 144, Name : "msg.GW2MS_ReqRandHouseList" 	},
		{ Id : 145, Name : "msg.MS2GW_AckRandHouseList" 	},
		{ Id : 146, Name : "msg.GW2MS_ReqOtherUserHouseData" 	},
		{ Id : 147, Name : "msg.MS2GW_AckOtherUserHouseData" 	},
		{ Id : 148, Name : "msg.GW2MS_ReqResetRobCheckFlag" 	},
		{ Id : 149, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 150, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 151, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 152, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 153, Name : "msg.GW2RS_MsgTransfer" 	},
		{ Id : 154, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 155, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 156, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 157, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 158, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 159, Name : "msg.GateSimpleInfo" 	},
		{ Id : 160, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 161, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 162, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 163, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 164, Name : "msg.RS2MS_UpdateRewardPool" 	},
		{ Id : 165, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 166, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 167, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 168, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 169, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 170, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 171, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 172, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 173, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 174, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 175, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 176, Name : "msg.GW2C_FreePresentNotify" 	},
		{ Id : 177, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 178, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 179, Name : "msg.C2GW_ReqTaskList" 	}
>>>>>>> dev_liu
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

