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
		{ Id : 20, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 21, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 22, Name : "msg.GW2C_SendUserInfo" 	},
		{ Id : 23, Name : "msg.GW2C_SendUserPlatformMoney" 	},
		{ Id : 24, Name : "msg.C2GW_HeartBeat" 	},
		{ Id : 25, Name : "msg.GW2C_HeartBeat" 	},
		{ Id : 26, Name : "msg.C2GW_ReqStartGame" 	},
		{ Id : 27, Name : "msg.GW2C_RetStartGame" 	},
		{ Id : 28, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 29, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 30, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 31, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 32, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 33, Name : "msg.L2C_RetLogin" 	},
		{ Id : 34, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 35, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 36, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 37, Name : "msg.IpHost" 	},
		{ Id : 38, Name : "msg.PairNumItem" 	},
		{ Id : 39, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 40, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 41, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 42, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 43, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 44, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 45, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 46, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 47, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 48, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 49, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 50, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 51, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 52, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 53, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 54, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 55, Name : "msg.GW2RS_MsgTransfer" 	},
		{ Id : 56, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 57, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 58, Name : "msg.GW2C_AddPackageItem" 	},
		{ Id : 59, Name : "msg.GW2C_RemovePackageItem" 	},
		{ Id : 60, Name : "msg.GW2C_UpdateGold" 	},
		{ Id : 61, Name : "msg.GW2C_UpdateYuanbao" 	},
		{ Id : 62, Name : "msg.GW2C_UpdateDiamond" 	},
		{ Id : 63, Name : "msg.GW2C_UpdateFreeStep" 	},
		{ Id : 64, Name : "msg.DeliveryGoods" 	},
		{ Id : 65, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 66, Name : "msg.BigRewardItem" 	},
		{ Id : 67, Name : "msg.Sync_BigRewardPickNum" 	},
		{ Id : 68, Name : "msg.C2GW_UseBagItem" 	},
		{ Id : 69, Name : "msg.C2GW_SellBagItem" 	},
		{ Id : 70, Name : "msg.C2GW_BuyClothes" 	},
		{ Id : 71, Name : "msg.C2GW_DressClothes" 	},
		{ Id : 72, Name : "msg.C2GW_UnDressClothes" 	},
		{ Id : 73, Name : "msg.GW2C_UpdateItemPos" 	},
		{ Id : 74, Name : "msg.GW2C_SendShowImage" 	},
		{ Id : 75, Name : "msg.C2GW_ChangeImageSex" 	},
		{ Id : 76, Name : "msg.GW2C_RetChangeImageSex" 	},
		{ Id : 77, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 78, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 79, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 80, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 81, Name : "msg.GateSimpleInfo" 	},
		{ Id : 82, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 83, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 84, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 85, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 86, Name : "msg.RS2MS_UpdateRewardPool" 	},
		{ Id : 87, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 88, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 89, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 90, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 91, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 92, Name : "msg.EntityBase" 	},
		{ Id : 93, Name : "msg.SimpleCounter" 	},
		{ Id : 94, Name : "msg.FreePresentMoney" 	},
		{ Id : 95, Name : "msg.UserWechat" 	},
		{ Id : 96, Name : "msg.UserTask" 	},
		{ Id : 97, Name : "msg.TaskData" 	},
		{ Id : 98, Name : "msg.LuckyDrawItem" 	},
		{ Id : 99, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 100, Name : "msg.ImageData" 	},
		{ Id : 101, Name : "msg.PersonalImage" 	},
		{ Id : 102, Name : "msg.UserBase" 	},
		{ Id : 103, Name : "msg.UserAddress" 	},
		{ Id : 104, Name : "msg.ItemData" 	},
		{ Id : 105, Name : "msg.ItemBin" 	},
		{ Id : 106, Name : "msg.Serialize" 	},
		{ Id : 107, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 108, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 109, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 110, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 111, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 112, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 113, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 114, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 115, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 116, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 117, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 118, Name : "msg.GW2C_FreePresentNotify" 	},
		{ Id : 119, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 120, Name : "msg.GW2C_SendLuckyDrawRecord" 	}
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

