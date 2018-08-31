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
		{ Id : 51, Name : "msg.C2GW_ReqHouseData" 	},
		{ Id : 52, Name : "msg.GW2C_AckHouseData" 	},
		{ Id : 53, Name : "msg.GW2C_UpdateHouseDataOne" 	},
		{ Id : 54, Name : "msg.C2GW_ReqSetNewPlayerStep" 	},
		{ Id : 55, Name : "msg.GW2C_AckNewPlayerStep" 	},
		{ Id : 56, Name : "msg.C2GW_ReqHouseLevelUp" 	},
		{ Id : 57, Name : "msg.GW2C_AckHouseLevelUp" 	},
		{ Id : 58, Name : "msg.C2GW_ReqHouseCellLevelUp" 	},
		{ Id : 59, Name : "msg.GW2C_AckHouseCellLevelUp" 	},
		{ Id : 60, Name : "msg.C2GW_ReqTakeSelfHouseGold" 	},
		{ Id : 61, Name : "msg.GW2C_AckTakeSelfHouseGoldRet" 	},
		{ Id : 62, Name : "msg.C2GW_ReqTakeOtherHouseGold" 	},
		{ Id : 63, Name : "msg.GW2C_AckTakeOtherHouseGoldRet" 	},
		{ Id : 64, Name : "msg.C2GW_ReqRandHouseList" 	},
		{ Id : 65, Name : "msg.GW2C_AckRandHouseList" 	},
		{ Id : 66, Name : "msg.GW2C_NotifyRobCount" 	},
		{ Id : 67, Name : "msg.C2GW_ReqOtherUserHouseData" 	},
		{ Id : 68, Name : "msg.GW2C_AckOtherUserHouseData" 	},
		{ Id : 69, Name : "msg.GW2C_NotifyTimeStamp" 	},
		{ Id : 70, Name : "msg.C2GW_ReqResetRobCheckFlag" 	},
		{ Id : 71, Name : "msg.GW2C_NotifyAddRobCountTime" 	},
		{ Id : 72, Name : "msg.C2GW_ReqHouseDataByHouseId" 	},
		{ Id : 73, Name : "msg.GW2C_AckHouseDataByHouseId" 	},
		{ Id : 74, Name : "msg.C2GW_ReqBuyHouseFromBuilding" 	},
		{ Id : 75, Name : "msg.GW2C_AckBuyHouseFromBuilding" 	},
		{ Id : 76, Name : "msg.C2GW_ReqBuildingCanBuyInfo" 	},
		{ Id : 77, Name : "msg.CanBuyInfo" 	},
		{ Id : 78, Name : "msg.GW2C_AckBuildingCanBuyInfo" 	},
		{ Id : 79, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 80, Name : "msg.GW2C_AddPackageItem" 	},
		{ Id : 81, Name : "msg.GW2C_RemovePackageItem" 	},
		{ Id : 82, Name : "msg.GW2C_UpdateGold" 	},
		{ Id : 83, Name : "msg.GW2C_UpdateYuanbao" 	},
		{ Id : 84, Name : "msg.GW2C_UpdateDiamond" 	},
		{ Id : 85, Name : "msg.GW2C_UpdateFreeStep" 	},
		{ Id : 86, Name : "msg.DeliveryGoods" 	},
		{ Id : 87, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 88, Name : "msg.BigRewardItem" 	},
		{ Id : 89, Name : "msg.Sync_BigRewardPickNum" 	},
		{ Id : 90, Name : "msg.C2GW_UseBagItem" 	},
		{ Id : 91, Name : "msg.C2GW_SellBagItem" 	},
		{ Id : 92, Name : "msg.GW2C_UpdateItemPos" 	},
		{ Id : 93, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 94, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 95, Name : "msg.L2C_RetLogin" 	},
		{ Id : 96, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 97, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 98, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 99, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 100, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 101, Name : "msg.GW2C_SendUserInfo" 	},
		{ Id : 102, Name : "msg.GW2C_SendUserPlatformMoney" 	},
		{ Id : 103, Name : "msg.C2GW_HeartBeat" 	},
		{ Id : 104, Name : "msg.GW2C_HeartBeat" 	},
		{ Id : 105, Name : "msg.C2GW_ReqStartGame" 	},
		{ Id : 106, Name : "msg.GW2C_RetStartGame" 	},
		{ Id : 107, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 108, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 109, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 110, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 111, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 112, Name : "msg.C2GW_BuyClothes" 	},
		{ Id : 113, Name : "msg.C2GW_DressClothes" 	},
		{ Id : 114, Name : "msg.C2GW_UnDressClothes" 	},
		{ Id : 115, Name : "msg.GW2C_SendHouseMaidInfo" 	},
		{ Id : 116, Name : "msg.GW2C_SendUserMaidInfo" 	},
		{ Id : 117, Name : "msg.C2GW_MakeClothes" 	},
		{ Id : 118, Name : "msg.C2GW_MaidUpgrade" 	},
		{ Id : 119, Name : "msg.C2GW_TakeMaidEarning" 	},
		{ Id : 120, Name : "msg.C2GW_RobMaid" 	},
		{ Id : 121, Name : "msg.GW2C_EnableMaidDropTo" 	},
		{ Id : 122, Name : "msg.C2GW_RobMaidToHouse" 	},
		{ Id : 123, Name : "msg.C2GW_TackBackMaid" 	},
		{ Id : 124, Name : "msg.C2GW_SendBackMaid" 	},
		{ Id : 125, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 126, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 127, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 128, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 129, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 130, Name : "msg.EntityBase" 	},
		{ Id : 131, Name : "msg.SimpleCounter" 	},
		{ Id : 132, Name : "msg.FreePresentMoney" 	},
		{ Id : 133, Name : "msg.UserWechat" 	},
		{ Id : 134, Name : "msg.UserTask" 	},
		{ Id : 135, Name : "msg.TaskData" 	},
		{ Id : 136, Name : "msg.LuckyDrawItem" 	},
		{ Id : 137, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 138, Name : "msg.ImageData" 	},
		{ Id : 139, Name : "msg.PersonalImage" 	},
		{ Id : 140, Name : "msg.HouseMaidData" 	},
		{ Id : 141, Name : "msg.UserBase" 	},
		{ Id : 142, Name : "msg.UserAddress" 	},
		{ Id : 143, Name : "msg.ItemData" 	},
		{ Id : 144, Name : "msg.ItemBin" 	},
		{ Id : 145, Name : "msg.Serialize" 	},
		{ Id : 146, Name : "msg.CarPartData" 	},
		{ Id : 147, Name : "msg.CarAttribute" 	},
		{ Id : 148, Name : "msg.CarPartPiece" 	},
		{ Id : 149, Name : "msg.CarReward" 	},
		{ Id : 150, Name : "msg.CarData" 	},
		{ Id : 151, Name : "msg.ParkingData" 	},
		{ Id : 152, Name : "msg.HouseCell" 	},
		{ Id : 153, Name : "msg.HouseVisitInfo" 	},
		{ Id : 154, Name : "msg.HouseData" 	},
		{ Id : 155, Name : "msg.CarProductData" 	},
		{ Id : 156, Name : "msg.BuidingSoldData" 	},
		{ Id : 157, Name : "msg.BuildingData" 	},
		{ Id : 158, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 159, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 160, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 161, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 162, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 163, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 164, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 165, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 166, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 167, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 168, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 169, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 170, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 171, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 172, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 173, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 174, Name : "msg.GW2RS_MsgTransfer" 	},
		{ Id : 175, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 176, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 177, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 178, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 179, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 180, Name : "msg.GateSimpleInfo" 	},
		{ Id : 181, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 182, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 183, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 184, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 185, Name : "msg.RS2MS_UpdateRewardPool" 	},
		{ Id : 186, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 187, Name : "msg.C2GW_ReqHouseTradeList" 	},
		{ Id : 188, Name : "msg.SimpleHouseTrade" 	},
		{ Id : 189, Name : "msg.GW2C_RetHouseTradeList" 	},
		{ Id : 190, Name : "msg.C2GW_TradeHouse" 	},
		{ Id : 191, Name : "msg.GW2C_RetTradeHouse" 	},
		{ Id : 192, Name : "msg.C2GW_BuyTradeHouse" 	},
		{ Id : 193, Name : "msg.GW2C_RetBuyTradeHouse" 	},
		{ Id : 194, Name : "msg.C2GW_ReqTradeHouseHistory" 	},
		{ Id : 195, Name : "msg.TradeHouseHistory" 	},
		{ Id : 196, Name : "msg.GW2C_RetTradeHouseHistory" 	},
		{ Id : 197, Name : "msg.C2GW_GetTradeHouseReward" 	},
		{ Id : 198, Name : "msg.GW2C_RetGetTradeHouseReward" 	},
		{ Id : 199, Name : "msg.C2GW_CancelTradeHouse" 	},
		{ Id : 200, Name : "msg.GW2C_RetCancelTradeHouse" 	},
		{ Id : 201, Name : "msg.C2GW_ReqCarTradeList" 	},
		{ Id : 202, Name : "msg.SimpleCarTrade" 	},
		{ Id : 203, Name : "msg.GW2C_RetCarTradeList" 	},
		{ Id : 204, Name : "msg.C2GW_TradeCar" 	},
		{ Id : 205, Name : "msg.C2GW_BuyTradeCar" 	},
		{ Id : 206, Name : "msg.C2GW_ReqTradeCarHistory" 	},
		{ Id : 207, Name : "msg.TradeCarHistory" 	},
		{ Id : 208, Name : "msg.GW2C_RetTradeCarHistory" 	},
		{ Id : 209, Name : "msg.C2GW_GetTradeCarReward" 	},
		{ Id : 210, Name : "msg.GW2C_RetGetTradeCarReward" 	},
		{ Id : 211, Name : "msg.C2GW_CancelTradeCar" 	},
		{ Id : 212, Name : "msg.C2GW_ReqItemTradeList" 	},
		{ Id : 213, Name : "msg.SimpleItemTrade" 	},
		{ Id : 214, Name : "msg.GW2C_RetItemTradeList" 	},
		{ Id : 215, Name : "msg.C2GW_TradeItem" 	},
		{ Id : 216, Name : "msg.C2GW_BuyTradeItem" 	},
		{ Id : 217, Name : "msg.C2GW_ReqTradeItemHistory" 	},
		{ Id : 218, Name : "msg.TradeItemHistory" 	},
		{ Id : 219, Name : "msg.GW2C_RetTradeItemHistory" 	},
		{ Id : 220, Name : "msg.C2GW_GetTradeItemReward" 	},
		{ Id : 221, Name : "msg.GW2C_RetGetTradeItemReward" 	},
		{ Id : 222, Name : "msg.C2GW_CancelTradeItem" 	},
		{ Id : 223, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 224, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 225, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 226, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 227, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 228, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 229, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 230, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 231, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 232, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 233, Name : "msg.GW2C_FreePresentNotify" 	},
		{ Id : 234, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 235, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 236, Name : "msg.C2GW_ReqTaskList" 	}
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

