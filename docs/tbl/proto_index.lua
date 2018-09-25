// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var ProtoId : table.IProtoIdDefine[] = [
		{ Id : 1, Name : "msg.AccountInfo" 	},
		{ Id : 2, Name : "msg.AccountGateInfo" 	},
		{ Id : 3, Name : "msg.IpHost" 	},
		{ Id : 4, Name : "msg.PairNumItem" 	},
		{ Id : 5, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 6, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 7, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 8, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 9, Name : "msg.DeliveryGoods" 	},
		{ Id : 10, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 11, Name : "msg.GW2C_SendUserEvents" 	},
		{ Id : 12, Name : "msg.C2GW_ReqEnterEvents" 	},
		{ Id : 13, Name : "msg.GW2C_RemoveEvent" 	},
		{ Id : 14, Name : "msg.C2GW_LeaveEvent" 	},
		{ Id : 15, Name : "msg.GW2C_EnterGameEvent" 	},
		{ Id : 16, Name : "msg.InthourAutoResetValue" 	},
		{ Id : 17, Name : "msg.InthourAutoResetManager" 	},
		{ Id : 18, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 19, Name : "msg.GW2C_PushPackageItemAdd" 	},
		{ Id : 20, Name : "msg.GW2C_PushPackageItemRemove" 	},
		{ Id : 21, Name : "msg.GW2C_PushGoldUpdate" 	},
		{ Id : 22, Name : "msg.GW2C_PushYuanBaoUpdate" 	},
		{ Id : 23, Name : "msg.GW2C_PushDiamondUpdate" 	},
		{ Id : 24, Name : "msg.GW2C_PushItemPosUpdate" 	},
		{ Id : 25, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 26, Name : "msg.C2GW_ReqUseBagItem" 	},
		{ Id : 27, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 28, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 29, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 30, Name : "msg.L2C_RetLogin" 	},
		{ Id : 31, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 32, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 33, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 34, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 35, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 36, Name : "msg.GW2C_PushUserInfo" 	},
		{ Id : 37, Name : "msg.C2GW_ReqHeartBeat" 	},
		{ Id : 38, Name : "msg.GW2C_RetHeartBeat" 	},
		{ Id : 39, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 40, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 41, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 42, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 43, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 44, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 45, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 46, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 47, Name : "msg.C2GW_ReqTaskList" 	},
		{ Id : 48, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 49, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 50, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 51, Name : "msg.C2RS_ReqFriendGetRoleInfo" 	},
		{ Id : 52, Name : "msg.RS2C_RetFriendGetRoleInfo" 	},
		{ Id : 53, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 54, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 55, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 56, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 57, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 58, Name : "msg.TanTanLeRoom" 	},
		{ Id : 59, Name : "msg.C2GW_ReqCreateRoom" 	},
		{ Id : 60, Name : "msg.GW2C_RetCreateRoom" 	},
		{ Id : 61, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 62, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 63, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 64, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 65, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 66, Name : "msg.GW2RS_UploadUserBin" 	},
		{ Id : 67, Name : "msg.RS2GW_UserLeaveRoom" 	},
		{ Id : 68, Name : "msg.C2GW_ReqEnterRoom" 	},
		{ Id : 69, Name : "msg.C2GW_ReqLeaveRoom" 	},
		{ Id : 70, Name : "msg.GW2C_RetLeaveRoom" 	},
		{ Id : 71, Name : "msg.RS2GW_PushRoomDestory" 	},
		{ Id : 72, Name : "msg.GW2C_PushRoomDestory" 	},
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
		{ Id : 83, Name : "msg.UserSignIn" 	},
		{ Id : 84, Name : "msg.UserStatistics" 	},
		{ Id : 85, Name : "msg.UserMiscData" 	},
		{ Id : 86, Name : "msg.UserBase" 	},
		{ Id : 87, Name : "msg.UserAddress" 	},
		{ Id : 88, Name : "msg.ItemData" 	},
		{ Id : 89, Name : "msg.ItemBin" 	},
		{ Id : 90, Name : "msg.Serialize" 	},
		{ Id : 91, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 92, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 93, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 94, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 95, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 96, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 97, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 98, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 99, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 100, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 101, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 102, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 103, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 104, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 105, Name : "msg.GW2RS_UserOnline" 	},
		{ Id : 106, Name : "msg.C2RS_MsgTransfer" 	},
		{ Id : 107, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 108, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 109, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 110, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 111, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 112, Name : "msg.GateSimpleInfo" 	},
		{ Id : 113, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 114, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 115, Name : "msg.TexasRoomSimpleInfo" 	},
		{ Id : 116, Name : "msg.C2GW_ReqTexasRoomList" 	},
		{ Id : 117, Name : "msg.GW2C_RetTexasRoomList" 	},
		{ Id : 118, Name : "msg.TexasPersonalRoom" 	},
		{ Id : 119, Name : "msg.C2GW_ReqUserRoomInfo" 	},
		{ Id : 120, Name : "msg.GW2C_RetUserRoomInfo" 	},
		{ Id : 121, Name : "msg.TexasPlayer" 	},
		{ Id : 122, Name : "msg.RS2C_RetEnterRoomInfo" 	},
		{ Id : 123, Name : "msg.C2RS_ReqTimeAwardInfo" 	},
		{ Id : 124, Name : "msg.RS2C_RetTimeAwardInfo" 	},
		{ Id : 125, Name : "msg.C2RS_ReqBuyInGame" 	},
		{ Id : 126, Name : "msg.RS2C_RetBuyInGame" 	},
		{ Id : 127, Name : "msg.RS2C_RolePushPropertyChange" 	},
		{ Id : 128, Name : "msg.RS2C_PushSitOrStand" 	},
		{ Id : 129, Name : "msg.RS2C_PushTimeAwardRefresh" 	},
		{ Id : 130, Name : "msg.C2RS_ReqNextRound" 	},
		{ Id : 131, Name : "msg.RS2C_RetNextRound" 	},
		{ Id : 132, Name : "msg.RS2C_PushNextRoundStart" 	},
		{ Id : 133, Name : "msg.RS2C_PushChipsChange" 	},
		{ Id : 134, Name : "msg.RS2C_PushPlayerStateChange" 	},
		{ Id : 135, Name : "msg.RS2C_PushHandCard" 	},
		{ Id : 136, Name : "msg.RS2C_PushActionPosChange" 	},
		{ Id : 137, Name : "msg.RS2C_PushOneLoopOver" 	},
		{ Id : 138, Name : "msg.PotInfo" 	},
		{ Id : 139, Name : "msg.HandCardInfo" 	},
		{ Id : 140, Name : "msg.RS2C_PushOneRoundOver" 	},
		{ Id : 141, Name : "msg.C2RS_ReqAction" 	},
		{ Id : 142, Name : "msg.RS2C_RetAction" 	},
		{ Id : 143, Name : "msg.C2RS_ReqSitDown" 	},
		{ Id : 144, Name : "msg.RS2C_RetSitDown" 	},
		{ Id : 145, Name : "msg.C2RS_ReqStandUp" 	},
		{ Id : 146, Name : "msg.RS2C_RetStandUp" 	},
		{ Id : 147, Name : "msg.C2RS_ReqBrightCard" 	},
		{ Id : 148, Name : "msg.RS2C_RetBrightCard" 	},
		{ Id : 149, Name : "msg.C2RS_ReqAddCoin" 	},
		{ Id : 150, Name : "msg.RS2C_RetAddCoin" 	}
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

