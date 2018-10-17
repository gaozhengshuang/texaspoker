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
		{ Id : 15, Name : "msg.GW2C_PushExchangeTimeRefresh" 	},
		{ Id : 16, Name : "msg.C2GW_ReqAwardGetInfo" 	},
		{ Id : 17, Name : "msg.GW2C_RetAwardGetInfo" 	},
		{ Id : 18, Name : "msg.C2GW_ReqAwardRecord" 	},
		{ Id : 19, Name : "msg.RetAwardRecord" 	},
		{ Id : 20, Name : "msg.GW2C_RetAwardRecord" 	},
		{ Id : 21, Name : "msg.AutoResetValue" 	},
		{ Id : 22, Name : "msg.AutoResetValues" 	},
		{ Id : 23, Name : "msg.C2RS_ReqMTTList" 	},
		{ Id : 24, Name : "msg.MTTInfo" 	},
		{ Id : 25, Name : "msg.RS2C_RetMTTList" 	},
		{ Id : 26, Name : "msg.C2RS_ReqMTTJoin" 	},
		{ Id : 27, Name : "msg.RS2C_RetMTTJoin" 	},
		{ Id : 28, Name : "msg.C2RS_ReqMTTQuit" 	},
		{ Id : 29, Name : "msg.C2RS_RetMTTQuit" 	},
		{ Id : 30, Name : "msg.C2RS_ReqJoinedMTTList" 	},
		{ Id : 31, Name : "msg.JoinedMTTInfo" 	},
		{ Id : 32, Name : "msg.RS2C_RetJoinedMTTList" 	},
		{ Id : 33, Name : "msg.C2RS_ReqInsideRoomInfoList" 	},
		{ Id : 34, Name : "msg.InsideRoomInfo" 	},
		{ Id : 35, Name : "msg.RS2C_RetInsideRoomInfoList" 	},
		{ Id : 36, Name : "msg.C2RS_ReqMTTRecordList" 	},
		{ Id : 37, Name : "msg.MTTRecordInfo" 	},
		{ Id : 38, Name : "msg.RS2C_RetMTTRecordList" 	},
		{ Id : 39, Name : "msg.C2RS_ReqMTTRecentlyRankList" 	},
		{ Id : 40, Name : "msg.MTTRecentlyRankInfo" 	},
		{ Id : 41, Name : "msg.RS2C_RetMTTRecentlyRankList" 	},
		{ Id : 42, Name : "msg.C2RS_ReqMTTOutsInfo" 	},
		{ Id : 43, Name : "msg.RS2C_RetMTTOutsInfo" 	},
		{ Id : 44, Name : "msg.C2RS_ReqMTTRankInfo" 	},
		{ Id : 45, Name : "msg.MTTRankInfo" 	},
		{ Id : 46, Name : "msg.RS2C_RetMTTRankInfo" 	},
		{ Id : 47, Name : "msg.C2RS_ReqMTTRebuyOrAddon" 	},
		{ Id : 48, Name : "msg.RS2C_RetMTTRebuyOrAddon" 	},
		{ Id : 49, Name : "msg.RS2C_PushMTTJoinNumChange" 	},
		{ Id : 50, Name : "msg.MMTJoinNum" 	},
		{ Id : 51, Name : "msg.RS2C_PushMTTRoomId" 	},
		{ Id : 52, Name : "msg.RS2C_PushMTTRank" 	},
		{ Id : 53, Name : "msg.RS2C_PushMTTWeedOut" 	},
		{ Id : 54, Name : "msg.RS2C_PushMTTNew" 	},
		{ Id : 55, Name : "msg.RS2C_PushMTTCancel" 	},
		{ Id : 56, Name : "msg.IpHost" 	},
		{ Id : 57, Name : "msg.PairNumItem" 	},
		{ Id : 58, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 59, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 60, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 61, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 62, Name : "msg.DeliveryGoods" 	},
		{ Id : 63, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 64, Name : "msg.GW2C_SendUserEvents" 	},
		{ Id : 65, Name : "msg.C2GW_ReqEnterEvents" 	},
		{ Id : 66, Name : "msg.GW2C_RemoveEvent" 	},
		{ Id : 67, Name : "msg.C2GW_LeaveEvent" 	},
		{ Id : 68, Name : "msg.GW2C_EnterGameEvent" 	},
		{ Id : 69, Name : "msg.FriendBrief" 	},
		{ Id : 70, Name : "msg.FriendData" 	},
		{ Id : 71, Name : "msg.C2GW_ReqFriendsList" 	},
		{ Id : 72, Name : "msg.GW2C_RetFriendsList" 	},
		{ Id : 73, Name : "msg.C2GW_ReqPresentToFriend" 	},
		{ Id : 74, Name : "msg.GW2C_RetPresentToFriend" 	},
		{ Id : 75, Name : "msg.GW2C_PushFriendPresent" 	},
		{ Id : 76, Name : "msg.C2GW_ReqGetFriendPresent" 	},
		{ Id : 77, Name : "msg.GW2C_RetGetFriendPresent" 	},
		{ Id : 78, Name : "msg.C2GW_ReqFriendRequestList" 	},
		{ Id : 79, Name : "msg.GW2C_RetFriendRequestList" 	},
		{ Id : 80, Name : "msg.C2GW_ReqRemoveFriend" 	},
		{ Id : 81, Name : "msg.GW2C_RetRemoveFriend" 	},
		{ Id : 82, Name : "msg.GW2C_PushRemoveFriend" 	},
		{ Id : 83, Name : "msg.C2GW_ReqAddFriend" 	},
		{ Id : 84, Name : "msg.GW2C_RetAddFriend" 	},
		{ Id : 85, Name : "msg.GW2C_PushFriendAddSuccess" 	},
		{ Id : 86, Name : "msg.GW2C_PushAddYouFriend" 	},
		{ Id : 87, Name : "msg.C2GW_ReqProcessFriendRequest" 	},
		{ Id : 88, Name : "msg.GW2C_RetProcessFriendRequest" 	},
		{ Id : 89, Name : "msg.C2GW_ReqFriendSearch" 	},
		{ Id : 90, Name : "msg.GW2C_RetFriendSearch" 	},
		{ Id : 91, Name : "msg.C2GW_ReqInviteFriendJoin" 	},
		{ Id : 92, Name : "msg.GW2C_RetInviteFriendJoin" 	},
		{ Id : 93, Name : "msg.GW2C_PushFriendInvitation" 	},
		{ Id : 94, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 95, Name : "msg.GW2C_PushPackageItemAdd" 	},
		{ Id : 96, Name : "msg.GW2C_PushPackageItemRemove" 	},
		{ Id : 97, Name : "msg.GW2C_PushGoldUpdate" 	},
		{ Id : 98, Name : "msg.GW2C_PushYuanBaoUpdate" 	},
		{ Id : 99, Name : "msg.GW2C_PushDiamondUpdate" 	},
		{ Id : 100, Name : "msg.GW2C_PushItemPosUpdate" 	},
		{ Id : 101, Name : "msg.C2GW_GoldExchange" 	},
		{ Id : 102, Name : "msg.C2GW_ReqUseBagItem" 	},
		{ Id : 103, Name : "msg.GW2C_RetGoldExchange" 	},
		{ Id : 104, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 105, Name : "msg.C2L_ReqLoginWechat" 	},
		{ Id : 106, Name : "msg.L2C_RetLogin" 	},
		{ Id : 107, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 108, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 109, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 110, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 111, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 112, Name : "msg.GW2C_PushUserInfo" 	},
		{ Id : 113, Name : "msg.C2GW_ReqHeartBeat" 	},
		{ Id : 114, Name : "msg.GW2C_RetHeartBeat" 	},
		{ Id : 115, Name : "msg.GW2C_PushUserOnline" 	},
		{ Id : 116, Name : "msg.GW2C_PushUserOffline" 	},
		{ Id : 117, Name : "msg.MailItem" 	},
		{ Id : 118, Name : "msg.MailDetail" 	},
		{ Id : 119, Name : "msg.C2GW_ReqMailList" 	},
		{ Id : 120, Name : "msg.GW2C_RetMailList" 	},
		{ Id : 121, Name : "msg.C2GW_ReqTakeMailItem" 	},
		{ Id : 122, Name : "msg.GW2C_RetTakeMailItem" 	},
		{ Id : 123, Name : "msg.GW2C_PushNewMail" 	},
		{ Id : 124, Name : "msg.GW2MS_PushNewMail" 	},
		{ Id : 125, Name : "msg.MS2GW_PushNewMail" 	},
		{ Id : 126, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 127, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 128, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 129, Name : "msg.GW2C_SendWechatInfo" 	},
		{ Id : 130, Name : "msg.C2GW_StartLuckyDraw" 	},
		{ Id : 131, Name : "msg.GW2C_LuckyDrawHit" 	},
		{ Id : 132, Name : "msg.GW2C_SendTaskList" 	},
		{ Id : 133, Name : "msg.GW2C_SendLuckyDrawRecord" 	},
		{ Id : 134, Name : "msg.C2GW_ReqTaskList" 	},
		{ Id : 135, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 136, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 137, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 138, Name : "msg.C2GW_ReqPlayerRoleInfo" 	},
		{ Id : 139, Name : "msg.GW2C_RetPlayerRoleInfo" 	},
		{ Id : 140, Name : "msg.C2RS_ReqFriendGetRoleInfo" 	},
		{ Id : 141, Name : "msg.RS2C_RetFriendGetRoleInfo" 	},
		{ Id : 142, Name : "msg.RS2C_RolePushPropertyChange" 	},
		{ Id : 143, Name : "msg.GW2C_PushMsgNotify" 	},
		{ Id : 144, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 145, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 146, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 147, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 148, Name : "msg.TanTanLeRoom" 	},
		{ Id : 149, Name : "msg.C2GW_ReqCreateRoom" 	},
		{ Id : 150, Name : "msg.GW2C_RetCreateRoom" 	},
		{ Id : 151, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 152, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 153, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 154, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 155, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 156, Name : "msg.GW2RS_UploadUserBin" 	},
		{ Id : 157, Name : "msg.C2GW_ReqEnterRoom" 	},
		{ Id : 158, Name : "msg.RS2GW_RetEnterRoom" 	},
		{ Id : 159, Name : "msg.C2GW_ReqLeaveRoom" 	},
		{ Id : 160, Name : "msg.GW2C_RetLeaveRoom" 	},
		{ Id : 161, Name : "msg.RS2GW_UserLeaveRoom" 	},
		{ Id : 162, Name : "msg.RS2GW_PushRoomDestory" 	},
		{ Id : 163, Name : "msg.GW2C_PushRoomDestory" 	},
		{ Id : 164, Name : "msg.EntityBase" 	},
		{ Id : 165, Name : "msg.SimpleCounter" 	},
		{ Id : 166, Name : "msg.FreePresentMoney" 	},
		{ Id : 167, Name : "msg.UserWechat" 	},
		{ Id : 168, Name : "msg.UserTask" 	},
		{ Id : 169, Name : "msg.TaskData" 	},
		{ Id : 170, Name : "msg.LuckyDrawItem" 	},
		{ Id : 171, Name : "msg.LuckyDrawRecord" 	},
		{ Id : 172, Name : "msg.MapEvent" 	},
		{ Id : 173, Name : "msg.UserMapEvent" 	},
		{ Id : 174, Name : "msg.UserSignIn" 	},
		{ Id : 175, Name : "msg.UserStatistics" 	},
		{ Id : 176, Name : "msg.UserVip" 	},
		{ Id : 177, Name : "msg.UserMiscData" 	},
		{ Id : 178, Name : "msg.AwardRecord" 	},
		{ Id : 179, Name : "msg.AwardGetInfo" 	},
		{ Id : 180, Name : "msg.UserBase" 	},
		{ Id : 181, Name : "msg.UserAddress" 	},
		{ Id : 182, Name : "msg.ItemData" 	},
		{ Id : 183, Name : "msg.ItemBin" 	},
		{ Id : 184, Name : "msg.Serialize" 	},
		{ Id : 185, Name : "msg.GateSerialize" 	},
		{ Id : 186, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 187, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 188, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 189, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 190, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 191, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 192, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 193, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 194, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 195, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 196, Name : "msg.GW2GW_MsgTransfer" 	},
		{ Id : 197, Name : "msg.C2MS_MsgTransfer" 	},
		{ Id : 198, Name : "msg.MS2GW_MsgTransfer" 	},
		{ Id : 199, Name : "msg.GW2MS_UserLoginState" 	},
		{ Id : 200, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 201, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 202, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 203, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 204, Name : "msg.GW2RS_UserOnline" 	},
		{ Id : 205, Name : "msg.C2RS_MsgTransfer" 	},
		{ Id : 206, Name : "msg.RS2GW_MsgTransfer" 	},
		{ Id : 207, Name : "msg.MTTRoomMember" 	},
		{ Id : 208, Name : "msg.RS2GW_MTTRoomMember" 	},
		{ Id : 209, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 210, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 211, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 212, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 213, Name : "msg.GateSimpleInfo" 	},
		{ Id : 214, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 215, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 216, Name : "msg.TexasRoomSimpleInfo" 	},
		{ Id : 217, Name : "msg.C2GW_ReqTexasRoomList" 	},
		{ Id : 218, Name : "msg.GW2C_RetTexasRoomList" 	},
		{ Id : 219, Name : "msg.TexasPersonalRoom" 	},
		{ Id : 220, Name : "msg.C2GW_ReqUserRoomInfo" 	},
		{ Id : 221, Name : "msg.GW2C_RetUserRoomInfo" 	},
		{ Id : 222, Name : "msg.TexasPlayer" 	},
		{ Id : 223, Name : "msg.RS2C_RetEnterRoom" 	},
		{ Id : 224, Name : "msg.C2RS_ReqTimeAwardInfo" 	},
		{ Id : 225, Name : "msg.RS2C_RetTimeAwardInfo" 	},
		{ Id : 226, Name : "msg.C2RS_ReqTimeAwardGet" 	},
		{ Id : 227, Name : "msg.RS2C_RetTimeAwardGet" 	},
		{ Id : 228, Name : "msg.C2RS_ReqBuyInGame" 	},
		{ Id : 229, Name : "msg.RS2C_RetBuyInGame" 	},
		{ Id : 230, Name : "msg.RS2C_PushSitOrStand" 	},
		{ Id : 231, Name : "msg.RS2C_PushTimeAwardRefresh" 	},
		{ Id : 232, Name : "msg.C2RS_ReqNextRound" 	},
		{ Id : 233, Name : "msg.RS2C_RetNextRound" 	},
		{ Id : 234, Name : "msg.RS2C_PushNextRoundStart" 	},
		{ Id : 235, Name : "msg.RS2C_PushChipsChange" 	},
		{ Id : 236, Name : "msg.RS2C_PushPlayerStateChange" 	},
		{ Id : 237, Name : "msg.RS2C_PushHandCard" 	},
		{ Id : 238, Name : "msg.RS2C_PushActionPosChange" 	},
		{ Id : 239, Name : "msg.RS2C_PushOneLoopOver" 	},
		{ Id : 240, Name : "msg.PotInfo" 	},
		{ Id : 241, Name : "msg.HandCardInfo" 	},
		{ Id : 242, Name : "msg.RS2C_PushOneRoundOver" 	},
		{ Id : 243, Name : "msg.C2RS_ReqAction" 	},
		{ Id : 244, Name : "msg.RS2C_RetAction" 	},
		{ Id : 245, Name : "msg.C2RS_ReqSitDown" 	},
		{ Id : 246, Name : "msg.RS2C_RetSitDown" 	},
		{ Id : 247, Name : "msg.C2RS_ReqStandUp" 	},
		{ Id : 248, Name : "msg.RS2C_RetStandUp" 	},
		{ Id : 249, Name : "msg.C2RS_ReqBrightCard" 	},
		{ Id : 250, Name : "msg.RS2C_RetBrightCard" 	},
		{ Id : 251, Name : "msg.C2RS_ReqBrightInTime" 	},
		{ Id : 252, Name : "msg.RS2C_RetBrightInTime" 	},
		{ Id : 253, Name : "msg.RS2C_PushBrightCard" 	},
		{ Id : 254, Name : "msg.C2RS_ReqAddCoin" 	},
		{ Id : 255, Name : "msg.RS2C_RetAddCoin" 	},
		{ Id : 256, Name : "msg.C2RS_ReqReviewInfo" 	},
		{ Id : 257, Name : "msg.UserOneRound" 	},
		{ Id : 258, Name : "msg.UserReviewInfo" 	},
		{ Id : 259, Name : "msg.RS2C_RetReviewInfo" 	},
		{ Id : 260, Name : "msg.RS2C_PushBlindChange" 	}
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

