// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var ProtoId : table.IProtoIdDefine[] = [
		{ Id : 1, Name : "msg.AccountInfo" 	},
		{ Id : 2, Name : "msg.AccountGateInfo" 	},
		{ Id : 3, Name : "msg.C2GW_ReqActivityInfo" 	},
		{ Id : 4, Name : "msg.ActivityInfo" 	},
		{ Id : 5, Name : "msg.GW2C_RetActivityInfo" 	},
		{ Id : 6, Name : "msg.C2GW_ReqGetActivityReward" 	},
		{ Id : 7, Name : "msg.GW2C_RetGetActivityReward" 	},
		{ Id : 8, Name : "msg.C2GW_ReqRankList" 	},
		{ Id : 9, Name : "msg.RankInfo" 	},
		{ Id : 10, Name : "msg.GW2C_RetRankList" 	},
		{ Id : 11, Name : "msg.C2GW_ReqGetFreeGold" 	},
		{ Id : 12, Name : "msg.GW2C_RetGetFreeGold" 	},
		{ Id : 13, Name : "msg.IpHost" 	},
		{ Id : 14, Name : "msg.PairNumItem" 	},
		{ Id : 15, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 16, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 17, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 18, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 19, Name : "msg.DeliveryGoods" 	},
		{ Id : 20, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 21, Name : "msg.GW2C_SendUserEvents" 	},
		{ Id : 22, Name : "msg.C2GW_ReqEnterEvents" 	},
		{ Id : 23, Name : "msg.GW2C_RemoveEvent" 	},
		{ Id : 24, Name : "msg.C2GW_LeaveEvent" 	},
		{ Id : 25, Name : "msg.GW2C_EnterGameEvent" 	},
		{ Id : 26, Name : "msg.InthourAutoResetValue" 	},
		{ Id : 27, Name : "msg.InthourAutoResetManager" 	},
		{ Id : 28, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 29, Name : "msg.GW2C_PushPackageItemAdd" 	},
		{ Id : 30, Name : "msg.GW2C_PushPackageItemRemove" 	},
		{ Id : 31, Name : "msg.GW2C_PushGoldUpdate" 	},
		{ Id : 32, Name : "msg.GW2C_PushYuanBaoUpdate" 	},
		{ Id : 33, Name : "msg.GW2C_PushDiamondUpdate" 	},
		{ Id : 34, Name : "msg.GW2C_PushItemPosUpdate" 	},
		{ Id : 35, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 36, Name : "msg.C2GW_ReqUseBagItem" 	},
		{ Id : 37, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 38, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 39, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 40, Name : "msg.L2C_RetLogin" 	},
		{ Id : 41, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 42, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 43, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 44, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 45, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 46, Name : "msg.GW2C_PushUserInfo" 	},
		{ Id : 47, Name : "msg.C2GW_ReqHeartBeat" 	},
		{ Id : 48, Name : "msg.GW2C_RetHeartBeat" 	},
		{ Id : 49, Name : "msg.MailItem" 	},
		{ Id : 50, Name : "msg.MailDetail" 	},
		{ Id : 51, Name : "msg.C2GW_ReqMailList" 	},
		{ Id : 52, Name : "msg.GW2C_RetMailList" 	},
		{ Id : 53, Name : "msg.C2GW_ReqTakeMailItem" 	},
		{ Id : 54, Name : "msg.GW2C_RetTakeMailItem" 	},
		{ Id : 55, Name : "msg.GW2C_PushNewMail" 	},
		{ Id : 56, Name : "msg.GW2MS_PushNewMail" 	},
		{ Id : 57, Name : "msg.MS2GW_PushNewMail" 	},
		{ Id : 58, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 59, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 60, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 61, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 62, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 63, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 64, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 65, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 66, Name : "msg.C2GW_ReqTaskList" 	},
		{ Id : 67, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 68, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 69, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 70, Name : "msg.C2RS_ReqFriendGetRoleInfo" 	},
		{ Id : 71, Name : "msg.RS2C_RetFriendGetRoleInfo" 	},
		{ Id : 72, Name : "msg.RS2C_RolePushPropertyChange" 	},
		{ Id : 73, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 74, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 75, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 76, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 77, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 78, Name : "msg.TanTanLeRoom" 	},
		{ Id : 79, Name : "msg.C2GW_ReqCreateRoom" 	},
		{ Id : 80, Name : "msg.GW2C_RetCreateRoom" 	},
		{ Id : 81, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 82, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 83, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 84, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 85, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 86, Name : "msg.GW2RS_UploadUserBin" 	},
		{ Id : 87, Name : "msg.C2GW_ReqEnterRoom" 	},
		{ Id : 88, Name : "msg.RS2GW_RetEnterRoom" 	},
		{ Id : 89, Name : "msg.C2GW_ReqLeaveRoom" 	},
		{ Id : 90, Name : "msg.GW2C_RetLeaveRoom" 	},
		{ Id : 91, Name : "msg.RS2GW_UserLeaveRoom" 	},
		{ Id : 92, Name : "msg.RS2GW_PushRoomDestory" 	},
		{ Id : 93, Name : "msg.GW2C_PushRoomDestory" 	},
		{ Id : 94, Name : "msg.EntityBase" 	},
		{ Id : 95, Name : "msg.SimpleCounter" 	},
		{ Id : 96, Name : "msg.FreePresentMoney" 	},
		{ Id : 97, Name : "msg.UserWechat" 	},
		{ Id : 98, Name : "msg.UserTask" 	},
		{ Id : 99, Name : "msg.TaskData" 	},
		{ Id : 100, Name : "msg.LuckyDrawItem" 	},
		{ Id : 101, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 102, Name : "msg.MapEvent" 	},
		{ Id : 103, Name : "msg.UserMapEvent" 	},
		{ Id : 104, Name : "msg.UserSignIn" 	},
		{ Id : 105, Name : "msg.UserStatistics" 	},
		{ Id : 106, Name : "msg.UserMiscData" 	},
		{ Id : 107, Name : "msg.UserBase" 	},
		{ Id : 108, Name : "msg.UserAddress" 	},
		{ Id : 109, Name : "msg.ItemData" 	},
		{ Id : 110, Name : "msg.ItemBin" 	},
		{ Id : 111, Name : "msg.Serialize" 	},
		{ Id : 112, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 113, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 114, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 115, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 116, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 117, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 118, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 119, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 120, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 121, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 122, Name : "msg.GW2GW_MsgTransfer" 	},
		{ Id : 123, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 124, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 125, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 126, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 127, Name : "msg.GW2RS_UserOnline" 	},
		{ Id : 128, Name : "msg.C2RS_MsgTransfer" 	},
		{ Id : 129, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 130, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 131, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 132, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 133, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 134, Name : "msg.GateSimpleInfo" 	},
		{ Id : 135, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 136, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 137, Name : "msg.TexasRoomSimpleInfo" 	},
		{ Id : 138, Name : "msg.C2GW_ReqTexasRoomList" 	},
		{ Id : 139, Name : "msg.GW2C_RetTexasRoomList" 	},
		{ Id : 140, Name : "msg.TexasPersonalRoom" 	},
		{ Id : 141, Name : "msg.C2GW_ReqUserRoomInfo" 	},
		{ Id : 142, Name : "msg.GW2C_RetUserRoomInfo" 	},
		{ Id : 143, Name : "msg.TexasPlayer" 	},
		{ Id : 144, Name : "msg.RS2C_RetEnterRoom" 	},
		{ Id : 145, Name : "msg.C2RS_ReqTimeAwardInfo" 	},
		{ Id : 146, Name : "msg.RS2C_RetTimeAwardInfo" 	},
		{ Id : 147, Name : "msg.C2RS_ReqBuyInGame" 	},
		{ Id : 148, Name : "msg.RS2C_RetBuyInGame" 	},
		{ Id : 149, Name : "msg.RS2C_PushSitOrStand" 	},
		{ Id : 150, Name : "msg.RS2C_PushTimeAwardRefresh" 	},
		{ Id : 151, Name : "msg.C2RS_ReqNextRound" 	},
		{ Id : 152, Name : "msg.RS2C_RetNextRound" 	},
		{ Id : 153, Name : "msg.RS2C_PushNextRoundStart" 	},
		{ Id : 154, Name : "msg.RS2C_PushChipsChange" 	},
		{ Id : 155, Name : "msg.RS2C_PushPlayerStateChange" 	},
		{ Id : 156, Name : "msg.RS2C_PushHandCard" 	},
		{ Id : 157, Name : "msg.RS2C_PushActionPosChange" 	},
		{ Id : 158, Name : "msg.RS2C_PushOneLoopOver" 	},
		{ Id : 159, Name : "msg.PotInfo" 	},
		{ Id : 160, Name : "msg.HandCardInfo" 	},
		{ Id : 161, Name : "msg.RS2C_PushOneRoundOver" 	},
		{ Id : 162, Name : "msg.C2RS_ReqAction" 	},
		{ Id : 163, Name : "msg.RS2C_RetAction" 	},
		{ Id : 164, Name : "msg.C2RS_ReqSitDown" 	},
		{ Id : 165, Name : "msg.RS2C_RetSitDown" 	},
		{ Id : 166, Name : "msg.C2RS_ReqStandUp" 	},
		{ Id : 167, Name : "msg.RS2C_RetStandUp" 	},
		{ Id : 168, Name : "msg.C2RS_ReqBrightCard" 	},
		{ Id : 169, Name : "msg.RS2C_RetBrightCard" 	},
		{ Id : 170, Name : "msg.C2RS_ReqBrightInTime" 	},
		{ Id : 171, Name : "msg.RS2C_RetBrightInTime" 	},
		{ Id : 172, Name : "msg.RS2C_PushBrightCard" 	},
		{ Id : 173, Name : "msg.C2RS_ReqAddCoin" 	},
		{ Id : 174, Name : "msg.RS2C_RetAddCoin" 	}
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

