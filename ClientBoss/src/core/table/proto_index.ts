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
		{ Id : 20, Name : "msg.IpHost" 	},
		{ Id : 21, Name : "msg.PairNumItem" 	},
		{ Id : 22, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 23, Name : "msg.GW2C_AddPackageItem" 	},
		{ Id : 24, Name : "msg.GW2C_RemovePackageItem" 	},
		{ Id : 25, Name : "msg.GW2C_UpdateGold" 	},
		{ Id : 26, Name : "msg.GW2C_UpdateYuanbao" 	},
		{ Id : 27, Name : "msg.GW2C_UpdateDiamond" 	},
		{ Id : 28, Name : "msg.GW2C_UpdateFreeStep" 	},
		{ Id : 29, Name : "msg.DeliveryGoods" 	},
		{ Id : 30, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 31, Name : "msg.BigRewardItem" 	},
		{ Id : 32, Name : "msg.Sync_BigRewardPickNum" 	},
		{ Id : 33, Name : "msg.C2GW_UseBagItem" 	},
		{ Id : 34, Name : "msg.C2GW_SellBagItem" 	},
		{ Id : 35, Name : "msg.C2GW_BuyClothes" 	},
		{ Id : 36, Name : "msg.C2GW_DressClothes" 	},
		{ Id : 37, Name : "msg.C2GW_UnDressClothes" 	},
		{ Id : 38, Name : "msg.GW2C_UpdateItemPos" 	},
		{ Id : 39, Name : "msg.GW2C_SendShowImage" 	},
		{ Id : 40, Name : "msg.C2GW_ChangeImageSex" 	},
		{ Id : 41, Name : "msg.GW2C_RetChangeImageSex" 	},
		{ Id : 42, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 43, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 44, Name : "msg.L2C_RetLogin" 	},
		{ Id : 45, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 46, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 47, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 48, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 49, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 50, Name : "msg.GW2C_SendUserInfo" 	},
		{ Id : 51, Name : "msg.GW2C_SendUserPlatformMoney" 	},
		{ Id : 52, Name : "msg.C2GW_HeartBeat" 	},
		{ Id : 53, Name : "msg.GW2C_HeartBeat" 	},
		{ Id : 54, Name : "msg.C2GW_ReqStartGame" 	},
		{ Id : 55, Name : "msg.GW2C_RetStartGame" 	},
		{ Id : 56, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 57, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 58, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 59, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 60, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 61, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 62, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 63, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 64, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 65, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 66, Name : "msg.EntityBase" 	},
		{ Id : 67, Name : "msg.SimpleCounter" 	},
		{ Id : 68, Name : "msg.FreePresentMoney" 	},
		{ Id : 69, Name : "msg.UserWechat" 	},
		{ Id : 70, Name : "msg.UserTask" 	},
		{ Id : 71, Name : "msg.TaskData" 	},
		{ Id : 72, Name : "msg.LuckyDrawItem" 	},
		{ Id : 73, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 74, Name : "msg.ImageData" 	},
		{ Id : 75, Name : "msg.PersonalImage" 	},
		{ Id : 76, Name : "msg.UserBase" 	},
		{ Id : 77, Name : "msg.UserAddress" 	},
		{ Id : 78, Name : "msg.ItemData" 	},
		{ Id : 79, Name : "msg.ItemBin" 	},
		{ Id : 80, Name : "msg.Serialize" 	},
		{ Id : 81, Name : "msg.HouseCell" 	},
		{ Id : 82, Name : "msg.HouseVisitInfo" 	},
		{ Id : 83, Name : "msg.HouseData" 	},
		{ Id : 84, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 85, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 86, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 87, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 88, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 89, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 90, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 91, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 92, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 93, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 94, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 95, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 96, Name : "msg.GW2MS_UserOnlineState" 	},
		{ Id : 97, Name : "msg.GW2MS_ReqCreateHouse" 	},
		{ Id : 98, Name : "msg.MS2GW_AckCreateHouse" 	},
		{ Id : 99, Name : "msg.GW2MS_ReqUserHouse" 	},
		{ Id : 100, Name : "msg.MS2GW_AckUserHouse" 	},
		{ Id : 101, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 102, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 103, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 104, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 105, Name : "msg.GW2RS_MsgTransfer" 	},
		{ Id : 106, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 107, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 108, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 109, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 110, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 111, Name : "msg.GateSimpleInfo" 	},
		{ Id : 112, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 113, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 114, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 115, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 116, Name : "msg.RS2MS_UpdateRewardPool" 	},
		{ Id : 117, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 118, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 119, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 120, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 121, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 122, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 123, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 124, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 125, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 126, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 127, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 128, Name : "msg.GW2C_FreePresentNotify" 	},
		{ Id : 129, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 130, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 131, Name : "msg.C2GW_ReqTaskList" 	},
		{ Id : 132, Name : "msg.C2GW_ReqHouseData" 	},
		{ Id : 133, Name : "msg.GW2C_AckHouseData" 	}
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

