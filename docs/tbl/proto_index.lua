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
		{ Id : 13, Name : "msg.C2GW_ReqAwardExchange" 	},
		{ Id : 14, Name : "msg.GW2C_RetAwardExchange" 	},
		{ Id : 15, Name : "msg.C2GW_ReqAwardGetInfo" 	},
		{ Id : 16, Name : "msg.GW2C_RetAwardGetInfo" 	},
		{ Id : 17, Name : "msg.C2GW_ReqAwardRecord" 	},
		{ Id : 18, Name : "msg.RetAwardRecord" 	},
		{ Id : 19, Name : "msg.GW2C_RetAwardRecord" 	},
		{ Id : 20, Name : "msg.AutoResetValue" 	},
		{ Id : 21, Name : "msg.AutoResetValues" 	},
		{ Id : 22, Name : "msg.IpHost" 	},
		{ Id : 23, Name : "msg.PairNumItem" 	},
		{ Id : 24, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 25, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 26, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 27, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 28, Name : "msg.DeliveryGoods" 	},
		{ Id : 29, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 30, Name : "msg.GW2C_SendUserEvents" 	},
		{ Id : 31, Name : "msg.C2GW_ReqEnterEvents" 	},
		{ Id : 32, Name : "msg.GW2C_RemoveEvent" 	},
		{ Id : 33, Name : "msg.C2GW_LeaveEvent" 	},
		{ Id : 34, Name : "msg.GW2C_EnterGameEvent" 	},
		{ Id : 35, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 36, Name : "msg.GW2C_PushPackageItemAdd" 	},
		{ Id : 37, Name : "msg.GW2C_PushPackageItemRemove" 	},
		{ Id : 38, Name : "msg.GW2C_PushGoldUpdate" 	},
		{ Id : 39, Name : "msg.GW2C_PushYuanBaoUpdate" 	},
		{ Id : 40, Name : "msg.GW2C_PushDiamondUpdate" 	},
		{ Id : 41, Name : "msg.GW2C_PushItemPosUpdate" 	},
		{ Id : 42, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 43, Name : "msg.C2GW_ReqUseBagItem" 	},
		{ Id : 44, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 45, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 46, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 47, Name : "msg.L2C_RetLogin" 	},
		{ Id : 48, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 49, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 50, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 51, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 52, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 53, Name : "msg.GW2C_PushUserInfo" 	},
		{ Id : 54, Name : "msg.C2GW_ReqHeartBeat" 	},
		{ Id : 55, Name : "msg.GW2C_RetHeartBeat" 	},
		{ Id : 56, Name : "msg.MailItem" 	},
		{ Id : 57, Name : "msg.MailDetail" 	},
		{ Id : 58, Name : "msg.C2GW_ReqMailList" 	},
		{ Id : 59, Name : "msg.GW2C_RetMailList" 	},
		{ Id : 60, Name : "msg.C2GW_ReqTakeMailItem" 	},
		{ Id : 61, Name : "msg.GW2C_RetTakeMailItem" 	},
		{ Id : 62, Name : "msg.GW2C_PushNewMail" 	},
		{ Id : 63, Name : "msg.GW2MS_PushNewMail" 	},
		{ Id : 64, Name : "msg.MS2GW_PushNewMail" 	},
		{ Id : 65, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 66, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 67, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 68, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 69, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 70, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 71, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 72, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 73, Name : "msg.C2GW_ReqTaskList" 	},
		{ Id : 74, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 75, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 76, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 77, Name : "msg.C2RS_ReqFriendGetRoleInfo" 	},
		{ Id : 78, Name : "msg.RS2C_RetFriendGetRoleInfo" 	},
		{ Id : 79, Name : "msg.RS2C_RolePushPropertyChange" 	},
		{ Id : 80, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 81, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 82, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 83, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 84, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 85, Name : "msg.TanTanLeRoom" 	},
		{ Id : 86, Name : "msg.C2GW_ReqCreateRoom" 	},
		{ Id : 87, Name : "msg.GW2C_RetCreateRoom" 	},
		{ Id : 88, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 89, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 90, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 91, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 92, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 93, Name : "msg.GW2RS_UploadUserBin" 	},
		{ Id : 94, Name : "msg.C2GW_ReqEnterRoom" 	},
		{ Id : 95, Name : "msg.RS2GW_RetEnterRoom" 	},
		{ Id : 96, Name : "msg.C2GW_ReqLeaveRoom" 	},
		{ Id : 97, Name : "msg.GW2C_RetLeaveRoom" 	},
		{ Id : 98, Name : "msg.RS2GW_UserLeaveRoom" 	},
		{ Id : 99, Name : "msg.RS2GW_PushRoomDestory" 	},
		{ Id : 100, Name : "msg.GW2C_PushRoomDestory" 	},
		{ Id : 101, Name : "msg.EntityBase" 	},
		{ Id : 102, Name : "msg.SimpleCounter" 	},
		{ Id : 103, Name : "msg.FreePresentMoney" 	},
		{ Id : 104, Name : "msg.UserWechat" 	},
		{ Id : 105, Name : "msg.UserTask" 	},
		{ Id : 106, Name : "msg.TaskData" 	},
		{ Id : 107, Name : "msg.LuckyDrawItem" 	},
		{ Id : 108, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 109, Name : "msg.MapEvent" 	},
		{ Id : 110, Name : "msg.UserMapEvent" 	},
		{ Id : 111, Name : "msg.UserSignIn" 	},
		{ Id : 112, Name : "msg.UserStatistics" 	},
		{ Id : 113, Name : "msg.UserMiscData" 	},
		{ Id : 114, Name : "msg.AwardRecord" 	},
		{ Id : 115, Name : "msg.AwardGetInfo" 	},
		{ Id : 116, Name : "msg.UserBase" 	},
		{ Id : 117, Name : "msg.UserAddress" 	},
		{ Id : 118, Name : "msg.ItemData" 	},
		{ Id : 119, Name : "msg.ItemBin" 	},
		{ Id : 120, Name : "msg.Serialize" 	},
		{ Id : 121, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 122, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 123, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 124, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 125, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 126, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 127, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 128, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 129, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 130, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 131, Name : "msg.GW2GW_MsgTransfer" 	},
		{ Id : 132, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 133, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 134, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 135, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 136, Name : "msg.GW2RS_UserOnline" 	},
		{ Id : 137, Name : "msg.C2RS_MsgTransfer" 	},
		{ Id : 138, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 139, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 140, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 141, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 142, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 143, Name : "msg.GateSimpleInfo" 	},
		{ Id : 144, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 145, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 146, Name : "msg.TexasRoomSimpleInfo" 	},
		{ Id : 147, Name : "msg.C2GW_ReqTexasRoomList" 	},
		{ Id : 148, Name : "msg.GW2C_RetTexasRoomList" 	},
		{ Id : 149, Name : "msg.TexasPersonalRoom" 	},
		{ Id : 150, Name : "msg.C2GW_ReqUserRoomInfo" 	},
		{ Id : 151, Name : "msg.GW2C_RetUserRoomInfo" 	},
		{ Id : 152, Name : "msg.TexasPlayer" 	},
		{ Id : 153, Name : "msg.RS2C_RetEnterRoom" 	},
		{ Id : 154, Name : "msg.C2RS_ReqTimeAwardInfo" 	},
		{ Id : 155, Name : "msg.RS2C_RetTimeAwardInfo" 	},
		{ Id : 156, Name : "msg.C2RS_ReqTimeAwardGet" 	},
		{ Id : 157, Name : "msg.RS2C_RetTimeAwardGet" 	},
		{ Id : 158, Name : "msg.C2RS_ReqBuyInGame" 	},
		{ Id : 159, Name : "msg.RS2C_RetBuyInGame" 	},
		{ Id : 160, Name : "msg.RS2C_PushSitOrStand" 	},
		{ Id : 161, Name : "msg.RS2C_PushTimeAwardRefresh" 	},
		{ Id : 162, Name : "msg.C2RS_ReqNextRound" 	},
		{ Id : 163, Name : "msg.RS2C_RetNextRound" 	},
		{ Id : 164, Name : "msg.RS2C_PushNextRoundStart" 	},
		{ Id : 165, Name : "msg.RS2C_PushChipsChange" 	},
		{ Id : 166, Name : "msg.RS2C_PushPlayerStateChange" 	},
		{ Id : 167, Name : "msg.RS2C_PushHandCard" 	},
		{ Id : 168, Name : "msg.RS2C_PushActionPosChange" 	},
		{ Id : 169, Name : "msg.RS2C_PushOneLoopOver" 	},
		{ Id : 170, Name : "msg.PotInfo" 	},
		{ Id : 171, Name : "msg.HandCardInfo" 	},
		{ Id : 172, Name : "msg.RS2C_PushOneRoundOver" 	},
		{ Id : 173, Name : "msg.C2RS_ReqAction" 	},
		{ Id : 174, Name : "msg.RS2C_RetAction" 	},
		{ Id : 175, Name : "msg.C2RS_ReqSitDown" 	},
		{ Id : 176, Name : "msg.RS2C_RetSitDown" 	},
		{ Id : 177, Name : "msg.C2RS_ReqStandUp" 	},
		{ Id : 178, Name : "msg.RS2C_RetStandUp" 	},
		{ Id : 179, Name : "msg.C2RS_ReqBrightCard" 	},
		{ Id : 180, Name : "msg.RS2C_RetBrightCard" 	},
		{ Id : 181, Name : "msg.C2RS_ReqBrightInTime" 	},
		{ Id : 182, Name : "msg.RS2C_RetBrightInTime" 	},
		{ Id : 183, Name : "msg.RS2C_PushBrightCard" 	},
		{ Id : 184, Name : "msg.C2RS_ReqAddCoin" 	},
		{ Id : 185, Name : "msg.RS2C_RetAddCoin" 	},
		{ Id : 186, Name : "msg.C2RS_ReqReviewInfo" 	},
		{ Id : 187, Name : "msg.RS2C_RetReviewInfo" 	},
		{ Id : 188, Name : "msg.ReviewInfoArr" 	}
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

