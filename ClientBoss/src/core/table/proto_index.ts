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
		{ Id : 23, Name : "msg.GW2C_ResCarInfo" 	},
		{ Id : 24, Name : "msg.C2GW_ReqMyParkingInfo" 	},
		{ Id : 25, Name : "msg.C2GW_ReqParkingInfoByType" 	},
		{ Id : 26, Name : "msg.GW2C_ResParkingInfo" 	},
		{ Id : 27, Name : "msg.C2GW_ParkCar" 	},
		{ Id : 28, Name : "msg.GW2C_ParkCarResult" 	},
		{ Id : 29, Name : "msg.C2GW_TakeBackCar" 	},
		{ Id : 30, Name : "msg.GW2C_TakeBackCarResult" 	},
		{ Id : 31, Name : "msg.C2GW_TicketCar" 	},
		{ Id : 32, Name : "msg.GW2C_TicketCarResult" 	},
		{ Id : 33, Name : "msg.GW2C_SynParkingRecord" 	},
		{ Id : 34, Name : "msg.C2GW_ReqTakeCarAutoBackReward" 	},
		{ Id : 35, Name : "msg.GW2C_RetTakeCarAutoBackReward" 	},
		{ Id : 36, Name : "msg.GW2C_CarAutoBack" 	},
		{ Id : 37, Name : "msg.GW2C_AddNewCar" 	},
		{ Id : 38, Name : "msg.C2GW_CarPartLevelup" 	},
		{ Id : 39, Name : "msg.GW2C_RetCarPartLevelup" 	},
		{ Id : 40, Name : "msg.C2GW_ReqCarShopInfo" 	},
		{ Id : 41, Name : "msg.GW2C_SendCarShopInfo" 	},
		{ Id : 42, Name : "msg.C2GW_BuyCarFromShop" 	},
		{ Id : 43, Name : "msg.GW2C_UpdateCarShopProduct" 	},
		{ Id : 44, Name : "msg.IpHost" 	},
		{ Id : 45, Name : "msg.PairNumItem" 	},
		{ Id : 46, Name : "msg.C2GW_ReqHouseData" 	},
		{ Id : 47, Name : "msg.GW2C_AckHouseData" 	},
		{ Id : 48, Name : "msg.C2GW_ReqSetNewPlayerStep" 	},
		{ Id : 49, Name : "msg.GW2C_AckNewPlayerStep" 	},
		{ Id : 50, Name : "msg.C2GW_ReqHouseLevelUp" 	},
		{ Id : 51, Name : "msg.GW2C_AckHouseLevelUp" 	},
		{ Id : 52, Name : "msg.C2GW_ReqHouseCellLevelUp" 	},
		{ Id : 53, Name : "msg.GW2C_AckHouseCellLevelUp" 	},
		{ Id : 54, Name : "msg.C2GW_ReqTakeSelfHouseGold" 	},
		{ Id : 55, Name : "msg.GW2C_AckTakeSelfHouseGoldRet" 	},
		{ Id : 56, Name : "msg.C2GW_ReqTakeOtherHouseGold" 	},
		{ Id : 57, Name : "msg.GW2C_AckTakeOtherHouseGoldRet" 	},
		{ Id : 58, Name : "msg.C2GW_ReqRandHouseList" 	},
		{ Id : 59, Name : "msg.GW2C_AckRandHouseList" 	},
		{ Id : 60, Name : "msg.GW2C_NotifyRobCount" 	},
		{ Id : 61, Name : "msg.C2GW_ReqOtherUserHouseData" 	},
		{ Id : 62, Name : "msg.GW2C_AckOtherUserHouseData" 	},
		{ Id : 63, Name : "msg.GW2C_NotifyTimeStamp" 	},
		{ Id : 64, Name : "msg.C2GW_ReqResetRobCheckFlag" 	},
		{ Id : 65, Name : "msg.GW2C_NotifyAddRobCountTime" 	},
		{ Id : 66, Name : "msg.C2GW_ReqHouseDataByHouseId" 	},
		{ Id : 67, Name : "msg.GW2C_AckHouseDataByHouseId" 	},
		{ Id : 68, Name : "msg.C2GW_ReqBuyHouseFromBuilding" 	},
		{ Id : 69, Name : "msg.GW2C_AckBuyHouseFromBuilding" 	},
		{ Id : 70, Name : "msg.C2GW_ReqBuildingCanBuyInfo" 	},
		{ Id : 71, Name : "msg.CanBuyInfo" 	},
		{ Id : 72, Name : "msg.GW2C_AckBuildingCanBuyInfo" 	},
		{ Id : 73, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 74, Name : "msg.GW2C_AddPackageItem" 	},
		{ Id : 75, Name : "msg.GW2C_RemovePackageItem" 	},
		{ Id : 76, Name : "msg.GW2C_UpdateGold" 	},
		{ Id : 77, Name : "msg.GW2C_UpdateYuanbao" 	},
		{ Id : 78, Name : "msg.GW2C_UpdateDiamond" 	},
		{ Id : 79, Name : "msg.GW2C_UpdateFreeStep" 	},
		{ Id : 80, Name : "msg.DeliveryGoods" 	},
		{ Id : 81, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 82, Name : "msg.BigRewardItem" 	},
		{ Id : 83, Name : "msg.Sync_BigRewardPickNum" 	},
		{ Id : 84, Name : "msg.C2GW_UseBagItem" 	},
		{ Id : 85, Name : "msg.C2GW_SellBagItem" 	},
		{ Id : 86, Name : "msg.GW2C_UpdateItemPos" 	},
		{ Id : 87, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 88, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 89, Name : "msg.L2C_RetLogin" 	},
		{ Id : 90, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 91, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 92, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 93, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 94, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 95, Name : "msg.GW2C_SendUserInfo" 	},
		{ Id : 96, Name : "msg.GW2C_SendUserPlatformMoney" 	},
		{ Id : 97, Name : "msg.C2GW_HeartBeat" 	},
		{ Id : 98, Name : "msg.GW2C_HeartBeat" 	},
		{ Id : 99, Name : "msg.C2GW_ReqStartGame" 	},
		{ Id : 100, Name : "msg.GW2C_RetStartGame" 	},
		{ Id : 101, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 102, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 103, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 104, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 105, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 106, Name : "msg.C2GW_BuyClothes" 	},
		{ Id : 107, Name : "msg.C2GW_DressClothes" 	},
		{ Id : 108, Name : "msg.C2GW_UnDressClothes" 	},
		{ Id : 109, Name : "msg.GW2C_SendHouseMaidInfo" 	},
		{ Id : 110, Name : "msg.GW2C_SendUserMaidInfo" 	},
		{ Id : 111, Name : "msg.C2GW_MakeClothes" 	},
		{ Id : 112, Name : "msg.C2GW_MaidUpgrade" 	},
		{ Id : 113, Name : "msg.C2GW_TakeMaidEarning" 	},
		{ Id : 114, Name : "msg.C2GW_RobMaid" 	},
		{ Id : 115, Name : "msg.C2GW_EnableMaidDropTo" 	},
		{ Id : 116, Name : "msg.C2GW_RobMaidToHouse" 	},
		{ Id : 117, Name : "msg.C2GW_TackBackMaid" 	},
		{ Id : 118, Name : "msg.C2GW_SendBackMaid" 	},
		{ Id : 119, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 120, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 121, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 122, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 123, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 124, Name : "msg.EntityBase" 	},
		{ Id : 125, Name : "msg.SimpleCounter" 	},
		{ Id : 126, Name : "msg.FreePresentMoney" 	},
		{ Id : 127, Name : "msg.UserWechat" 	},
		{ Id : 128, Name : "msg.UserTask" 	},
		{ Id : 129, Name : "msg.TaskData" 	},
		{ Id : 130, Name : "msg.LuckyDrawItem" 	},
		{ Id : 131, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 132, Name : "msg.ImageData" 	},
		{ Id : 133, Name : "msg.PersonalImage" 	},
		{ Id : 134, Name : "msg.HouseMaidData" 	},
		{ Id : 135, Name : "msg.UserBase" 	},
		{ Id : 136, Name : "msg.UserAddress" 	},
		{ Id : 137, Name : "msg.ItemData" 	},
		{ Id : 138, Name : "msg.ItemBin" 	},
		{ Id : 139, Name : "msg.Serialize" 	},
		{ Id : 140, Name : "msg.CarPartData" 	},
		{ Id : 141, Name : "msg.CarAttribute" 	},
		{ Id : 142, Name : "msg.CarPartPiece" 	},
		{ Id : 143, Name : "msg.CarReward" 	},
		{ Id : 144, Name : "msg.CarData" 	},
		{ Id : 145, Name : "msg.ParkingData" 	},
		{ Id : 146, Name : "msg.HouseCell" 	},
		{ Id : 147, Name : "msg.HouseVisitInfo" 	},
		{ Id : 148, Name : "msg.HouseData" 	},
		{ Id : 149, Name : "msg.CarProductData" 	},
		{ Id : 150, Name : "msg.BuidingSoldData" 	},
		{ Id : 151, Name : "msg.BuildingData" 	},
		{ Id : 152, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 153, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 154, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 155, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 156, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 157, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 158, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 159, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 160, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 161, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 162, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 163, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 164, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 165, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 166, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 167, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 168, Name : "msg.GW2RS_MsgTransfer" 	},
		{ Id : 169, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 170, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 171, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 172, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 173, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 174, Name : "msg.GateSimpleInfo" 	},
		{ Id : 175, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 176, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 177, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 178, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 179, Name : "msg.RS2MS_UpdateRewardPool" 	},
		{ Id : 180, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 181, Name : "msg.C2GW_ReqHouseTradeList" 	},
		{ Id : 182, Name : "msg.SimpleHouseTrade" 	},
		{ Id : 183, Name : "msg.GW2C_RetHouseTradeList" 	},
		{ Id : 184, Name : "msg.C2GW_TradeHouse" 	},
		{ Id : 185, Name : "msg.C2GW_RetTradeHouse" 	},
		{ Id : 186, Name : "msg.C2GW_BuyTradeHouse" 	},
		{ Id : 187, Name : "msg.GW2C_RetBuyTradeHouse" 	},
		{ Id : 188, Name : "msg.C2GW_ReqTradeHouseHistory" 	},
		{ Id : 189, Name : "msg.TradeHouseHistory" 	},
		{ Id : 190, Name : "msg.GW2C_RetTradeHouseHistory" 	},
		{ Id : 191, Name : "msg.C2GW_GetTradeHouseReward" 	},
		{ Id : 192, Name : "msg.GW2C_RetGetTradeHouseReward" 	},
		{ Id : 193, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 194, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 195, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 196, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 197, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 198, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 199, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 200, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 201, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 202, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 203, Name : "msg.GW2C_FreePresentNotify" 	},
		{ Id : 204, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 205, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 206, Name : "msg.C2GW_ReqTaskList" 	}
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

