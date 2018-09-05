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
		{ Id : 11, Name : "msg.BT_GameRoomDestroy" 	},
		{ Id : 12, Name : "msg.BT_PickItem" 	},
		{ Id : 13, Name : "msg.BT_ReqLaunchBullet" 	},
		{ Id : 14, Name : "msg.BT_RetLaunchBullet" 	},
		{ Id : 15, Name : "msg.BT_StepOnBomb" 	},
		{ Id : 16, Name : "msg.BT_RetStepOnBomb" 	},
		{ Id : 17, Name : "msg.BT_BulletEarnMoney" 	},
		{ Id : 18, Name : "msg.BT_RetBulletEarnMoney" 	},
		{ Id : 19, Name : "msg.BT_UseUltimateSkil" 	},
		{ Id : 20, Name : "msg.BT_ReqCrushSuperBrick" 	},
		{ Id : 21, Name : "msg.BT_RetCrushSuperBrick" 	},
		{ Id : 22, Name : "msg.C2GW_ReqCarInfo" 	},
		{ Id : 23, Name : "msg.C2GW_ReqCarInfoById" 	},
		{ Id : 24, Name : "msg.GW2C_ResCarInfo" 	},
		{ Id : 25, Name : "msg.GW2C_ResCarInfoById" 	},
		{ Id : 26, Name : "msg.C2GW_ReqMyParkingInfo" 	},
		{ Id : 27, Name : "msg.C2GW_ReqParkingInfoByType" 	},
		{ Id : 28, Name : "msg.GW2C_ResParkingInfo" 	},
		{ Id : 29, Name : "msg.C2GW_ParkCar" 	},
		{ Id : 30, Name : "msg.GW2C_ParkCarResult" 	},
		{ Id : 31, Name : "msg.C2GW_TakeBackCar" 	},
		{ Id : 32, Name : "msg.GW2C_TakeBackCarResult" 	},
		{ Id : 33, Name : "msg.C2GW_TicketCar" 	},
		{ Id : 34, Name : "msg.GW2C_TicketCarResult" 	},
		{ Id : 35, Name : "msg.GW2C_SynParkingRecord" 	},
		{ Id : 36, Name : "msg.C2GW_ReqTakeCarAutoBackReward" 	},
		{ Id : 37, Name : "msg.GW2C_RetTakeCarAutoBackReward" 	},
		{ Id : 38, Name : "msg.GW2C_CarAutoBack" 	},
		{ Id : 39, Name : "msg.GW2C_UpdateCar" 	},
		{ Id : 40, Name : "msg.GW2C_AddNewCar" 	},
		{ Id : 41, Name : "msg.C2GW_CarPartLevelup" 	},
		{ Id : 42, Name : "msg.GW2C_RetCarPartLevelup" 	},
		{ Id : 43, Name : "msg.C2GW_CarStarup" 	},
		{ Id : 44, Name : "msg.GW2C_RetCarStarup" 	},
		{ Id : 45, Name : "msg.C2GW_ReqCarShopInfo" 	},
		{ Id : 46, Name : "msg.GW2C_SendCarShopInfo" 	},
		{ Id : 47, Name : "msg.C2GW_BuyCarFromShop" 	},
		{ Id : 48, Name : "msg.GW2C_UpdateCarShopProduct" 	},
		{ Id : 49, Name : "msg.IpHost" 	},
		{ Id : 50, Name : "msg.PairNumItem" 	},
		{ Id : 51, Name : "msg.PersonSocialInfo" 	},
		{ Id : 52, Name : "msg.CommonKeyValue" 	},
		{ Id : 53, Name : "msg.GW2C_SendUserEvents" 	},
		{ Id : 54, Name : "msg.C2GW_ReqEnterEvents" 	},
		{ Id : 55, Name : "msg.GW2C_RemoveEvent" 	},
		{ Id : 56, Name : "msg.C2GW_ReqHouseData" 	},
		{ Id : 57, Name : "msg.GW2C_AckHouseData" 	},
		{ Id : 58, Name : "msg.GW2C_UpdateHouseDataOne" 	},
		{ Id : 59, Name : "msg.GW2C_UpdateHouseVisitInfo" 	},
		{ Id : 60, Name : "msg.C2GW_ReqSetNewPlayerStep" 	},
		{ Id : 61, Name : "msg.GW2C_AckNewPlayerStep" 	},
		{ Id : 62, Name : "msg.C2GW_ReqHouseLevelUp" 	},
		{ Id : 63, Name : "msg.GW2C_AckHouseLevelUp" 	},
		{ Id : 64, Name : "msg.C2GW_ReqHouseCellLevelUp" 	},
		{ Id : 65, Name : "msg.GW2C_AckHouseCellLevelUp" 	},
		{ Id : 66, Name : "msg.C2GW_ReqTakeSelfHouseGold" 	},
		{ Id : 67, Name : "msg.GW2C_AckTakeSelfHouseGoldRet" 	},
		{ Id : 68, Name : "msg.C2GW_ReqTakeOtherHouseGold" 	},
		{ Id : 69, Name : "msg.GW2C_AckTakeOtherHouseGoldRet" 	},
		{ Id : 70, Name : "msg.C2GW_ReqRandHouseList" 	},
		{ Id : 71, Name : "msg.GW2C_AckRandHouseList" 	},
		{ Id : 72, Name : "msg.GW2C_NotifyRobCount" 	},
		{ Id : 73, Name : "msg.C2GW_ReqOtherUserHouseData" 	},
		{ Id : 74, Name : "msg.GW2C_AckOtherUserHouseData" 	},
		{ Id : 75, Name : "msg.GW2C_NotifyTimeStamp" 	},
		{ Id : 76, Name : "msg.C2GW_ReqResetRobCheckFlag" 	},
		{ Id : 77, Name : "msg.GW2C_NotifyAddRobCountTime" 	},
		{ Id : 78, Name : "msg.C2GW_ReqHouseDataByHouseId" 	},
		{ Id : 79, Name : "msg.GW2C_AckHouseDataByHouseId" 	},
		{ Id : 80, Name : "msg.C2GW_ReqBuyHouseFromBuilding" 	},
		{ Id : 81, Name : "msg.GW2C_AckBuyHouseFromBuilding" 	},
		{ Id : 82, Name : "msg.C2GW_ReqBuildingCanBuyInfo" 	},
		{ Id : 83, Name : "msg.CanBuyInfo" 	},
		{ Id : 84, Name : "msg.GW2C_AckBuildingCanBuyInfo" 	},
		{ Id : 85, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 86, Name : "msg.GW2C_AddPackageItem" 	},
		{ Id : 87, Name : "msg.GW2C_RemovePackageItem" 	},
		{ Id : 88, Name : "msg.GW2C_UpdateGold" 	},
		{ Id : 89, Name : "msg.GW2C_UpdateYuanbao" 	},
		{ Id : 90, Name : "msg.GW2C_UpdateDiamond" 	},
		{ Id : 91, Name : "msg.GW2C_UpdateFreeStep" 	},
		{ Id : 92, Name : "msg.DeliveryGoods" 	},
		{ Id : 93, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 94, Name : "msg.BigRewardItem" 	},
		{ Id : 95, Name : "msg.Sync_BigRewardPickNum" 	},
		{ Id : 96, Name : "msg.C2GW_UseBagItem" 	},
		{ Id : 97, Name : "msg.C2GW_SellBagItem" 	},
		{ Id : 98, Name : "msg.GW2C_UpdateItemPos" 	},
		{ Id : 99, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 100, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 101, Name : "msg.L2C_RetLogin" 	},
		{ Id : 102, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 103, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 104, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 105, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 106, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 107, Name : "msg.GW2C_SendUserInfo" 	},
		{ Id : 108, Name : "msg.GW2C_SendUserPlatformMoney" 	},
		{ Id : 109, Name : "msg.C2GW_HeartBeat" 	},
		{ Id : 110, Name : "msg.GW2C_HeartBeat" 	},
		{ Id : 111, Name : "msg.C2GW_ReqStartGame" 	},
		{ Id : 112, Name : "msg.GW2C_RetStartGame" 	},
		{ Id : 113, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 114, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 115, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 116, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 117, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 118, Name : "msg.C2GW_BuyClothes" 	},
		{ Id : 119, Name : "msg.C2GW_DressClothes" 	},
		{ Id : 120, Name : "msg.C2GW_UnDressClothes" 	},
		{ Id : 121, Name : "msg.GW2C_SendHouseMaidInfo" 	},
		{ Id : 122, Name : "msg.GW2C_SendUserMaidInfo" 	},
		{ Id : 123, Name : "msg.C2GW_MakeClothes" 	},
		{ Id : 124, Name : "msg.C2GW_MaidUpgrade" 	},
		{ Id : 125, Name : "msg.C2GW_TakeMaidEarning" 	},
		{ Id : 126, Name : "msg.C2GW_TakeRobMaidEarning" 	},
		{ Id : 127, Name : "msg.C2GW_RobMaid" 	},
		{ Id : 128, Name : "msg.GW2C_EnableMaidDropTo" 	},
		{ Id : 129, Name : "msg.C2GW_RobMaidToHouse" 	},
		{ Id : 130, Name : "msg.C2GW_TackBackMaid" 	},
		{ Id : 131, Name : "msg.C2GW_SendBackMaid" 	},
		{ Id : 132, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 133, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 134, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 135, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 136, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 137, Name : "msg.EntityBase" 	},
		{ Id : 138, Name : "msg.SimpleCounter" 	},
		{ Id : 139, Name : "msg.FreePresentMoney" 	},
		{ Id : 140, Name : "msg.UserWechat" 	},
		{ Id : 141, Name : "msg.UserTask" 	},
		{ Id : 142, Name : "msg.TaskData" 	},
		{ Id : 143, Name : "msg.LuckyDrawItem" 	},
		{ Id : 144, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 145, Name : "msg.ImageData" 	},
		{ Id : 146, Name : "msg.PersonalImage" 	},
		{ Id : 147, Name : "msg.HouseMaidData" 	},
		{ Id : 148, Name : "msg.MapEvent" 	},
		{ Id : 149, Name : "msg.UserMapEvent" 	},
		{ Id : 150, Name : "msg.UserBase" 	},
		{ Id : 151, Name : "msg.UserAddress" 	},
		{ Id : 152, Name : "msg.ItemData" 	},
		{ Id : 153, Name : "msg.ItemBin" 	},
		{ Id : 154, Name : "msg.Serialize" 	},
		{ Id : 155, Name : "msg.CarPartData" 	},
		{ Id : 156, Name : "msg.CarAttribute" 	},
		{ Id : 157, Name : "msg.CarPartPiece" 	},
		{ Id : 158, Name : "msg.CarReward" 	},
		{ Id : 159, Name : "msg.CarData" 	},
		{ Id : 160, Name : "msg.ParkingData" 	},
		{ Id : 161, Name : "msg.HouseCell" 	},
		{ Id : 162, Name : "msg.HouseVisitInfo" 	},
		{ Id : 163, Name : "msg.HouseData" 	},
		{ Id : 164, Name : "msg.CarProductData" 	},
		{ Id : 165, Name : "msg.BuidingSoldData" 	},
		{ Id : 166, Name : "msg.BuildingData" 	},
		{ Id : 167, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 168, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 169, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 170, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 171, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 172, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 173, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 174, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 175, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 176, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 177, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 178, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 179, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 180, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 181, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 182, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 183, Name : "msg.GW2RS_MsgTransfer" 	},
		{ Id : 184, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 185, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 186, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 187, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 188, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 189, Name : "msg.GateSimpleInfo" 	},
		{ Id : 190, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 191, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 192, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 193, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 194, Name : "msg.RS2MS_UpdateRewardPool" 	},
		{ Id : 195, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 196, Name : "msg.C2GW_StartThrow" 	},
		{ Id : 197, Name : "msg.GW2C_RetStartThrow" 	},
		{ Id : 198, Name : "msg.C2GW_TargetItem" 	},
		{ Id : 199, Name : "msg.GW2C_HitTarget" 	},
		{ Id : 200, Name : "msg.C2GW_ReqHouseTradeList" 	},
		{ Id : 201, Name : "msg.SimpleHouseTrade" 	},
		{ Id : 202, Name : "msg.GW2C_RetHouseTradeList" 	},
		{ Id : 203, Name : "msg.C2GW_TradeHouse" 	},
		{ Id : 204, Name : "msg.GW2C_RetTradeHouse" 	},
		{ Id : 205, Name : "msg.C2GW_BuyTradeHouse" 	},
		{ Id : 206, Name : "msg.GW2C_RetBuyTradeHouse" 	},
		{ Id : 207, Name : "msg.C2GW_ReqTradeHouseHistory" 	},
		{ Id : 208, Name : "msg.TradeHouseHistory" 	},
		{ Id : 209, Name : "msg.GW2C_RetTradeHouseHistory" 	},
		{ Id : 210, Name : "msg.C2GW_GetTradeHouseReward" 	},
		{ Id : 211, Name : "msg.GW2C_RetGetTradeHouseReward" 	},
		{ Id : 212, Name : "msg.C2GW_CancelTradeHouse" 	},
		{ Id : 213, Name : "msg.GW2C_RetCancelTradeHouse" 	},
		{ Id : 214, Name : "msg.C2GW_ReqCarTradeList" 	},
		{ Id : 215, Name : "msg.SimpleCarTrade" 	},
		{ Id : 216, Name : "msg.GW2C_RetCarTradeList" 	},
		{ Id : 217, Name : "msg.C2GW_TradeCar" 	},
		{ Id : 218, Name : "msg.C2GW_BuyTradeCar" 	},
		{ Id : 219, Name : "msg.C2GW_ReqTradeCarHistory" 	},
		{ Id : 220, Name : "msg.TradeCarHistory" 	},
		{ Id : 221, Name : "msg.GW2C_RetTradeCarHistory" 	},
		{ Id : 222, Name : "msg.C2GW_GetTradeCarReward" 	},
		{ Id : 223, Name : "msg.GW2C_RetGetTradeCarReward" 	},
		{ Id : 224, Name : "msg.C2GW_CancelTradeCar" 	},
		{ Id : 225, Name : "msg.C2GW_ReqItemTradeList" 	},
		{ Id : 226, Name : "msg.SimpleItemTrade" 	},
		{ Id : 227, Name : "msg.GW2C_RetItemTradeList" 	},
		{ Id : 228, Name : "msg.C2GW_TradeItem" 	},
		{ Id : 229, Name : "msg.GW2C_RetTradeItem" 	},
		{ Id : 230, Name : "msg.C2GW_BuyTradeItem" 	},
		{ Id : 231, Name : "msg.GW2C_RetBuyTradeItem" 	},
		{ Id : 232, Name : "msg.C2GW_ReqTradeItemHistory" 	},
		{ Id : 233, Name : "msg.TradeItemHistory" 	},
		{ Id : 234, Name : "msg.GW2C_RetTradeItemHistory" 	},
		{ Id : 235, Name : "msg.C2GW_GetTradeItemReward" 	},
		{ Id : 236, Name : "msg.GW2C_RetGetTradeItemReward" 	},
		{ Id : 237, Name : "msg.C2GW_CancelTradeItem" 	},
		{ Id : 238, Name : "msg.GW2C_RetCancelTradeItem" 	},
		{ Id : 239, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 240, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 241, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 242, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 243, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 244, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 245, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 246, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 247, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 248, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 249, Name : "msg.GW2C_FreePresentNotify" 	},
		{ Id : 250, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 251, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 252, Name : "msg.C2GW_ReqTaskList" 	},
		{ Id : 253, Name : "msg.C2GW_ReqNearUsers" 	},
		{ Id : 254, Name : "msg.GW2C_AckNearUsers" 	},
		{ Id : 255, Name : "msg.C2GW_ReqSetPos" 	},
		{ Id : 256, Name : "msg.C2GW_ReqSetUserSex" 	},
		{ Id : 257, Name : "msg.C2GW_ReqSetUserAge" 	},
		{ Id : 258, Name : "msg.C2GW_ReqSetUserConstellation" 	},
		{ Id : 259, Name : "msg.C2GW_ReqSetUserSign" 	},
		{ Id : 260, Name : "msg.GW2C_AckSetUserSign" 	},
		{ Id : 261, Name : "msg.C2GW_ReqSetFace" 	},
		{ Id : 262, Name : "msg.C2GW_ReqSetUserName" 	},
		{ Id : 263, Name : "msg.GW2C_AckSetUserName" 	},
		{ Id : 264, Name : "msg.C2GW_ReqSetBaseArea" 	},
		{ Id : 265, Name : "msg.C2GW_ReqPlayerCountByProvince" 	},
		{ Id : 266, Name : "msg.GW2C_AckPlayerCountByProvince" 	}
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

