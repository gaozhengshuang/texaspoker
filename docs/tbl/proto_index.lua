// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var ProtoId : table.IProtoIdDefine[] = [
		{ Id : 1, Name : "msg.AccountInfo" 	},
		{ Id : 2, Name : "msg.AccountGateInfo" 	},
		{ Id : 3, Name : "msg.BT_UploadGameUser" 	},
		{ Id : 4, Name : "msg.BT_ReqEnterRoom" 	},
		{ Id : 5, Name : "msg.BT_GameInit" 	},
		{ Id : 6, Name : "msg.BT_RoomUser" 	},
		{ Id : 7, Name : "msg.BT_NewUserInRoom" 	},
		{ Id : 8, Name : "msg.BT_SendRoomUser" 	},
		{ Id : 9, Name : "msg.BT_GameStart" 	},
		{ Id : 10, Name : "msg.BT_GameEnd" 	},
		{ Id : 11, Name : "msg.BT_GameOver" 	},
		{ Id : 12, Name : "msg.BT_ReqLeaveGameRoom" 	},
		{ Id : 13, Name : "msg.BT_ReqStandUpFromSeat" 	},
		{ Id : 14, Name : "msg.IpHost" 	},
		{ Id : 15, Name : "msg.PairNumItem" 	},
		{ Id : 16, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 17, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 18, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 19, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 20, Name : "msg.DeliveryGoods" 	},
		{ Id : 21, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 22, Name : "msg.GW2C_SendUserEvents" 	},
		{ Id : 23, Name : "msg.C2GW_ReqEnterEvents" 	},
		{ Id : 24, Name : "msg.GW2C_RemoveEvent" 	},
		{ Id : 25, Name : "msg.C2GW_LeaveEvent" 	},
		{ Id : 26, Name : "msg.GW2C_EnterGameEvent" 	},
		{ Id : 27, Name : "msg.InthourAutoResetValue" 	},
		{ Id : 28, Name : "msg.InthourAutoResetManager" 	},
		{ Id : 29, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 30, Name : "msg.GW2C_AddPackageItem" 	},
		{ Id : 31, Name : "msg.GW2C_RemovePackageItem" 	},
		{ Id : 32, Name : "msg.GW2C_UpdateGold" 	},
		{ Id : 33, Name : "msg.GW2C_UpdateYuanbao" 	},
		{ Id : 34, Name : "msg.GW2C_UpdateDiamond" 	},
		{ Id : 35, Name : "msg.C2GW_UseBagItem" 	},
		{ Id : 36, Name : "msg.GW2C_UpdateItemPos" 	},
		{ Id : 37, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 38, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 39, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 40, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 41, Name : "msg.L2C_RetLogin" 	},
		{ Id : 42, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 43, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 44, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 45, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 46, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 47, Name : "msg.GW2C_SendUserInfo" 	},
		{ Id : 48, Name : "msg.GW2C_SendUserPlatformMoney" 	},
		{ Id : 49, Name : "msg.C2GW_HeartBeat" 	},
		{ Id : 50, Name : "msg.GW2C_HeartBeat" 	},
		{ Id : 51, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 52, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 53, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 54, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 55, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 56, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 57, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 58, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 59, Name : "msg.C2GW_ReqTaskList" 	},
		{ Id : 60, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 61, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 62, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 63, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 64, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 65, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 66, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 67, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 68, Name : "msg.C2GW_ReqCreateRoom" 	},
		{ Id : 69, Name : "msg.GW2C_RetCreateRoom" 	},
		{ Id : 70, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 71, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 72, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 73, Name : "msg.EntityBase" 	},
		{ Id : 74, Name : "msg.SimpleCounter" 	},
		{ Id : 75, Name : "msg.FreePresentMoney" 	},
		{ Id : 76, Name : "msg.UserWechat" 	},
		{ Id : 77, Name : "msg.UserTask" 	},
		{ Id : 78, Name : "msg.TaskData" 	},
		{ Id : 79, Name : "msg.LuckyDrawItem" 	},
		{ Id : 80, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 81, Name : "msg.MapEvent" 	},
		{ Id : 82, Name : "msg.UserMapEvent" 	},
		{ Id : 83, Name : "msg.UserBase" 	},
		{ Id : 84, Name : "msg.UserAddress" 	},
		{ Id : 85, Name : "msg.ItemData" 	},
		{ Id : 86, Name : "msg.ItemBin" 	},
		{ Id : 87, Name : "msg.Serialize" 	},
		{ Id : 88, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 89, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 90, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 91, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 92, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 93, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 94, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 95, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 96, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 97, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 98, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 99, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 100, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 101, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 102, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 103, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 104, Name : "msg.GW2RS_MsgTransfer" 	},
		{ Id : 105, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 106, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 107, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 108, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 109, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 110, Name : "msg.GateSimpleInfo" 	},
		{ Id : 111, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 112, Name : "msg.MS2Server_BroadCast" 	}
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

