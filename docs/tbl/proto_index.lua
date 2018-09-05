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
		{ Id : 55, Name : "msg.C2GW_ReqHouseData" 	},
		{ Id : 56, Name : "msg.GW2C_AckHouseData" 	},
		{ Id : 57, Name : "msg.GW2C_UpdateHouseDataOne" 	},
		{ Id : 58, Name : "msg.GW2C_UpdateHouseVisitInfo" 	},
		{ Id : 59, Name : "msg.C2GW_ReqSetNewPlayerStep" 	},
		{ Id : 60, Name : "msg.GW2C_AckNewPlayerStep" 	},
		{ Id : 61, Name : "msg.C2GW_ReqHouseLevelUp" 	},
		{ Id : 62, Name : "msg.GW2C_AckHouseLevelUp" 	},
		{ Id : 63, Name : "msg.C2GW_ReqHouseCellLevelUp" 	},
		{ Id : 64, Name : "msg.GW2C_AckHouseCellLevelUp" 	},
		{ Id : 65, Name : "msg.C2GW_ReqTakeSelfHouseGold" 	},
		{ Id : 66, Name : "msg.GW2C_AckTakeSelfHouseGoldRet" 	},
		{ Id : 67, Name : "msg.C2GW_ReqTakeOtherHouseGold" 	},
		{ Id : 68, Name : "msg.GW2C_AckTakeOtherHouseGoldRet" 	},
		{ Id : 69, Name : "msg.C2GW_ReqRandHouseList" 	},
		{ Id : 70, Name : "msg.GW2C_AckRandHouseList" 	},
		{ Id : 71, Name : "msg.GW2C_NotifyRobCount" 	},
		{ Id : 72, Name : "msg.C2GW_ReqOtherUserHouseData" 	},
		{ Id : 73, Name : "msg.GW2C_AckOtherUserHouseData" 	},
		{ Id : 74, Name : "msg.GW2C_NotifyTimeStamp" 	},
		{ Id : 75, Name : "msg.C2GW_ReqResetRobCheckFlag" 	},
		{ Id : 76, Name : "msg.GW2C_NotifyAddRobCountTime" 	},
		{ Id : 77, Name : "msg.C2GW_ReqHouseDataByHouseId" 	},
		{ Id : 78, Name : "msg.GW2C_AckHouseDataByHouseId" 	},
		{ Id : 79, Name : "msg.C2GW_ReqBuyHouseFromBuilding" 	},
		{ Id : 80, Name : "msg.GW2C_AckBuyHouseFromBuilding" 	},
		{ Id : 81, Name : "msg.C2GW_ReqBuildingCanBuyInfo" 	},
		{ Id : 82, Name : "msg.CanBuyInfo" 	},
		{ Id : 83, Name : "msg.GW2C_AckBuildingCanBuyInfo" 	},
		{ Id : 84, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 85, Name : "msg.GW2C_AddPackageItem" 	},
		{ Id : 86, Name : "msg.GW2C_RemovePackageItem" 	},
		{ Id : 87, Name : "msg.GW2C_UpdateGold" 	},
		{ Id : 88, Name : "msg.GW2C_UpdateYuanbao" 	},
		{ Id : 89, Name : "msg.GW2C_UpdateDiamond" 	},
		{ Id : 90, Name : "msg.GW2C_UpdateFreeStep" 	},
		{ Id : 91, Name : "msg.DeliveryGoods" 	},
		{ Id : 92, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 93, Name : "msg.BigRewardItem" 	},
		{ Id : 94, Name : "msg.Sync_BigRewardPickNum" 	},
		{ Id : 95, Name : "msg.C2GW_UseBagItem" 	},
		{ Id : 96, Name : "msg.C2GW_SellBagItem" 	},
		{ Id : 97, Name : "msg.GW2C_UpdateItemPos" 	},
		{ Id : 98, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 99, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 100, Name : "msg.L2C_RetLogin" 	},
		{ Id : 101, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 102, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 103, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 104, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 105, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 106, Name : "msg.GW2C_SendUserInfo" 	},
		{ Id : 107, Name : "msg.GW2C_SendUserPlatformMoney" 	},
		{ Id : 108, Name : "msg.C2GW_HeartBeat" 	},
		{ Id : 109, Name : "msg.GW2C_HeartBeat" 	},
		{ Id : 110, Name : "msg.C2GW_ReqStartGame" 	},
		{ Id : 111, Name : "msg.GW2C_RetStartGame" 	},
		{ Id : 112, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 113, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 114, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 115, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 116, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 117, Name : "msg.C2GW_BuyClothes" 	},
		{ Id : 118, Name : "msg.C2GW_DressClothes" 	},
		{ Id : 119, Name : "msg.C2GW_UnDressClothes" 	},
		{ Id : 120, Name : "msg.GW2C_SendHouseMaidInfo" 	},
		{ Id : 121, Name : "msg.GW2C_SendUserMaidInfo" 	},
		{ Id : 122, Name : "msg.C2GW_MakeClothes" 	},
		{ Id : 123, Name : "msg.C2GW_MaidUpgrade" 	},
		{ Id : 124, Name : "msg.C2GW_TakeMaidEarning" 	},
		{ Id : 125, Name : "msg.C2GW_TakeRobMaidEarning" 	},
		{ Id : 126, Name : "msg.C2GW_RobMaid" 	},
		{ Id : 127, Name : "msg.GW2C_EnableMaidDropTo" 	},
		{ Id : 128, Name : "msg.C2GW_RobMaidToHouse" 	},
		{ Id : 129, Name : "msg.C2GW_TackBackMaid" 	},
		{ Id : 130, Name : "msg.C2GW_SendBackMaid" 	},
		{ Id : 131, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 132, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 133, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 134, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 135, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 136, Name : "msg.EntityBase" 	},
		{ Id : 137, Name : "msg.SimpleCounter" 	},
		{ Id : 138, Name : "msg.FreePresentMoney" 	},
		{ Id : 139, Name : "msg.UserWechat" 	},
		{ Id : 140, Name : "msg.UserTask" 	},
		{ Id : 141, Name : "msg.TaskData" 	},
		{ Id : 142, Name : "msg.LuckyDrawItem" 	},
		{ Id : 143, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 144, Name : "msg.ImageData" 	},
		{ Id : 145, Name : "msg.PersonalImage" 	},
		{ Id : 146, Name : "msg.HouseMaidData" 	},
		{ Id : 147, Name : "msg.MapEvent" 	},
		{ Id : 148, Name : "msg.UserMapEvent" 	},
		{ Id : 149, Name : "msg.UserBase" 	},
		{ Id : 150, Name : "msg.UserAddress" 	},
		{ Id : 151, Name : "msg.ItemData" 	},
		{ Id : 152, Name : "msg.ItemBin" 	},
		{ Id : 153, Name : "msg.Serialize" 	},
		{ Id : 154, Name : "msg.CarPartData" 	},
		{ Id : 155, Name : "msg.CarAttribute" 	},
		{ Id : 156, Name : "msg.CarPartPiece" 	},
		{ Id : 157, Name : "msg.CarReward" 	},
		{ Id : 158, Name : "msg.CarData" 	},
		{ Id : 159, Name : "msg.ParkingData" 	},
		{ Id : 160, Name : "msg.HouseCell" 	},
		{ Id : 161, Name : "msg.HouseVisitInfo" 	},
		{ Id : 162, Name : "msg.HouseData" 	},
		{ Id : 163, Name : "msg.CarProductData" 	},
		{ Id : 164, Name : "msg.BuidingSoldData" 	},
		{ Id : 165, Name : "msg.BuildingData" 	},
		{ Id : 166, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 167, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 168, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 169, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 170, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 171, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 172, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 173, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 174, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 175, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 176, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 177, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 178, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 179, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 180, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 181, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 182, Name : "msg.GW2RS_MsgTransfer" 	},
		{ Id : 183, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 184, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 185, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 186, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 187, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 188, Name : "msg.GateSimpleInfo" 	},
		{ Id : 189, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 190, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 191, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 192, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 193, Name : "msg.RS2MS_UpdateRewardPool" 	},
		{ Id : 194, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 195, Name : "msg.C2GW_StartThrow" 	},
		{ Id : 196, Name : "msg.GW2C_RetStartThrow" 	},
		{ Id : 197, Name : "msg.C2GW_TargetItem" 	},
		{ Id : 198, Name : "msg.GW2C_HitTarget" 	},
		{ Id : 199, Name : "msg.C2GW_ReqHouseTradeList" 	},
		{ Id : 200, Name : "msg.SimpleHouseTrade" 	},
		{ Id : 201, Name : "msg.GW2C_RetHouseTradeList" 	},
		{ Id : 202, Name : "msg.C2GW_TradeHouse" 	},
		{ Id : 203, Name : "msg.GW2C_RetTradeHouse" 	},
		{ Id : 204, Name : "msg.C2GW_BuyTradeHouse" 	},
		{ Id : 205, Name : "msg.GW2C_RetBuyTradeHouse" 	},
		{ Id : 206, Name : "msg.C2GW_ReqTradeHouseHistory" 	},
		{ Id : 207, Name : "msg.TradeHouseHistory" 	},
		{ Id : 208, Name : "msg.GW2C_RetTradeHouseHistory" 	},
		{ Id : 209, Name : "msg.C2GW_GetTradeHouseReward" 	},
		{ Id : 210, Name : "msg.GW2C_RetGetTradeHouseReward" 	},
		{ Id : 211, Name : "msg.C2GW_CancelTradeHouse" 	},
		{ Id : 212, Name : "msg.GW2C_RetCancelTradeHouse" 	},
		{ Id : 213, Name : "msg.C2GW_ReqCarTradeList" 	},
		{ Id : 214, Name : "msg.SimpleCarTrade" 	},
		{ Id : 215, Name : "msg.GW2C_RetCarTradeList" 	},
		{ Id : 216, Name : "msg.C2GW_TradeCar" 	},
		{ Id : 217, Name : "msg.C2GW_BuyTradeCar" 	},
		{ Id : 218, Name : "msg.C2GW_ReqTradeCarHistory" 	},
		{ Id : 219, Name : "msg.TradeCarHistory" 	},
		{ Id : 220, Name : "msg.GW2C_RetTradeCarHistory" 	},
		{ Id : 221, Name : "msg.C2GW_GetTradeCarReward" 	},
		{ Id : 222, Name : "msg.GW2C_RetGetTradeCarReward" 	},
		{ Id : 223, Name : "msg.C2GW_CancelTradeCar" 	},
		{ Id : 224, Name : "msg.C2GW_ReqItemTradeList" 	},
		{ Id : 225, Name : "msg.SimpleItemTrade" 	},
		{ Id : 226, Name : "msg.GW2C_RetItemTradeList" 	},
		{ Id : 227, Name : "msg.C2GW_TradeItem" 	},
		{ Id : 228, Name : "msg.GW2C_RetTradeItem" 	},
		{ Id : 229, Name : "msg.C2GW_BuyTradeItem" 	},
		{ Id : 230, Name : "msg.GW2C_RetBuyTradeItem" 	},
		{ Id : 231, Name : "msg.C2GW_ReqTradeItemHistory" 	},
		{ Id : 232, Name : "msg.TradeItemHistory" 	},
		{ Id : 233, Name : "msg.GW2C_RetTradeItemHistory" 	},
		{ Id : 234, Name : "msg.C2GW_GetTradeItemReward" 	},
		{ Id : 235, Name : "msg.GW2C_RetGetTradeItemReward" 	},
		{ Id : 236, Name : "msg.C2GW_CancelTradeItem" 	},
		{ Id : 237, Name : "msg.GW2C_RetCancelTradeItem" 	},
		{ Id : 238, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 239, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 240, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 241, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 242, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 243, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 244, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 245, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 246, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 247, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 248, Name : "msg.GW2C_FreePresentNotify" 	},
		{ Id : 249, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 250, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 251, Name : "msg.C2GW_ReqTaskList" 	},
		{ Id : 252, Name : "msg.C2GW_ReqNearUsers" 	},
		{ Id : 253, Name : "msg.GW2C_AckNearUsers" 	},
		{ Id : 254, Name : "msg.C2GW_ReqSetPos" 	},
		{ Id : 255, Name : "msg.C2GW_ReqSetUserSex" 	},
		{ Id : 256, Name : "msg.C2GW_ReqSetUserAge" 	},
		{ Id : 257, Name : "msg.C2GW_ReqSetUserConstellation" 	},
		{ Id : 258, Name : "msg.C2GW_ReqSetUserSign" 	},
		{ Id : 259, Name : "msg.C2GW_ReqSetFace" 	},
		{ Id : 260, Name : "msg.C2GW_ReqPlayerCountByProvince" 	},
		{ Id : 261, Name : "msg.GW2C_AckPlayerCountByProvince" 	}
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

