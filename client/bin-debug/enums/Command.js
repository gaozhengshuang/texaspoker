var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Command = (function () {
    function Command() {
    }
    /**
    * 登录
    */
    Command.Login_login = "login";
    Command.Login_exchange = "exchange";
    Command.Login_auth = "auth";
    //--------------------------------------------------------------
    // System
    //--------------------------------------------------------------
    /**
     * 心跳
     */
    Command.System_Heartbeat_3016 = "c3016";
    /**
     * 请求服务器推送
     */
    Command.System_GetNotice_3004 = "c3004";
    /**
     * 抢占登录
     */
    Command.System_Response_Login_2013 = "c2013";
    /**
     * 0点定时重置通知
     */
    Command.System_Push_ResetTime0_2015 = "c2015";
    /**
     * 获取角色信息
     */
    Command.Role_GetInfo_3000 = "c3000";
    /**
     * 资产变更推送
     */
    Command.Role_Push_PropertyChange_2000 = "c2000";
    /**
     * 请求购买房卡（测试专用）
     */
    Command.Req_BuyCard_3001 = "c3001";
    /**
     * 请求上传头像
     */
    Command.Role_UploadHead_3683 = "c3683";
    /**
     * 头像审核通过推送
     */
    Command.Role_Push_HeadReviewPass_2120 = "c2120";
    //--------------------------------------------------------------
    // Hosted
    //--------------------------------------------------------------
    /**
     * 推送玩家托管状态
     */
    Command.Hosted_PushState_2024 = "c2024";
    /**
     * 请求托管
     */
    Command.Hosted_Req_3022 = "c3022";
    //--------------------------------------------------------------
    // Chat
    //--------------------------------------------------------------
    /**
     * 聊天消息推送
     */
    Command.Chat_PushMessage_2014 = "c2014";
    /**
     * 发送聊天信息
     */
    Command.Chat_SendMessage_3019 = "c3019";
    /**
     * 请求上传签名
     */
    Command.Chat_Record_Sgin_3018 = "c3018";
    //--------------------------------------------------------------
    // Mail
    //--------------------------------------------------------------
    /**
     * 拉取邮件列表的请求
     */
    Command.Mail_GetList_3097 = "c3097";
    /**
     * 请求领取邮件附件
     */
    Command.Mail_TakePrize_3098 = "c3098";
    /**
     * 新邮件通知推送
     */
    Command.Mail_Push_New_2024 = "c2024";
    //--------------------------------------------------------------
    // Friend
    //--------------------------------------------------------------
    /**
     * 请求好友列表信息
    */
    Command.Friend_GetList_3156 = "c3156";
    /**
     * 请求赠送好友金币
    */
    Command.Friend_GiveGold_3151 = "c3151";
    /**
     * 好友赠送金币通知推送
     */
    Command.Friend_Push_GiveGold_2037 = "c2037";
    /**
     * 请求获取好友详细信息
     */
    Command.Friend_GetRoleInfo_3023 = "c3023";
    /**
     * 请求领取好友赠送的金币
     */
    Command.Friend_ReceiveGift_3150 = "c3150";
    /**
     * 请求好友请求列表
     */
    Command.Friend_RequestList_3157 = "c3157";
    /**
     * 发送是否接受好友请求的请求
     */
    Command.Friend_Receive_3154 = "c3154";
    /**
     * 发送搜索用户的请求
     */
    Command.Friend_SearchPlayer_3153 = "c3153";
    /**
     * 发送删除好友的请求
     */
    Command.Friend_DelPlayer_3155 = "c3155";
    /**
     * 发送添加用户为好友的请求
     */
    Command.Friend_AddPlayer_3152 = "c3152";
    /**
     * 好友添加成功的通知推送
     */
    Command.Friend_Push_AddSuccess_2036 = "c2036";
    /**
     *被好友删除的通知推送
     */
    Command.Friend_Push_BeDel_2035 = "c2035";
    /**
     * 好友在线通知推送
     */
    Command.Friend_Push_OnlineState_2064 = "c2064";
    /**
     * 添加好友请求通知推送
     */
    Command.Friend_Push_RequestFriend_2038 = "c2038";
    /**
     * 被好友邀请推送
    */
    Command.Friend_Push_Invite_2111 = "c2111";
    /**
     * 0点定时重置推送
    */
    Command.Friend_Push_Reset_2015 = "c2015";
    //--------------------------------------------------------------
    // Award
    //--------------------------------------------------------------
    /**
     * 兑换奖励
     */
    Command.Award_Exchange_3113 = "c3113";
    /**
     * 拉取兑换信息
     */
    Command.Award_GetInfo_3112 = "c3112";
    /**
     * 拉取兑换记录
     */
    Command.Award_Record_3713 = "c3713";
    //--------------------------------------------------------------
    // Achievement
    //--------------------------------------------------------------
    /**
     * 推送成就更新
     */
    Command.Achievement_PushChange_2023 = "c2023";
    /**
     * 拉取成就列表
     */
    Command.Achievement_GetList_3090 = "c3090";
    /**
     * 领取成就奖励
     */
    Command.Achievement_GetPrize_3088 = "c3088";
    //--------------------------------------------------------------
    // Activity
    //--------------------------------------------------------------
    /**
     * 拉取活动列表
     */
    Command.Activity_GetList_3233 = "c3233";
    /**
     * 推送活动
     */
    Command.Activity_Push_2088 = "c2088";
    /**
     * 请求领取活动奖励
     */
    Command.Activity_GetPrize_3202 = "c3202";
    /**
     * 请求参与活动
    */
    Command.ActivityJoin_Req_3584 = "c3584";
    /**
     * 请求活动公共数据
     */
    Command.ActivityPubJoin_Req_3234 = "c3234";
    /**
     * 拉取活动操作记录
     */
    Command.ActivityActionRecord_Req_3235 = "c3235";
    //--------------------------------------------------------------
    // 
    //--------------------------------------------------------------
    /**
     * 会员时间戳变更推送
     */
    Command.Vip_GetVipTime_2001 = "c2001";
    /**
     * 推送玩家离线
     */
    Command.Role_Push_Offline_2026 = "c2026";
    /**
     * 拉取分享好友列表
     */
    Command.Req_BindFriendList_3027 = "c3027";
    /**
     * 设置角色基础信息
     */
    Command.Role_SetInfo_3609 = "c3609";
    /**
     * 用户经验变更推送
     */
    Command.Role_Push_ExpChange_2028 = "c2028";
    /**
     * 请求游戏场房间列表信息
     */
    Command.Req_RoomInfo_3002 = "c3002";
    /**
     * 发送创建角色的请求
     */
    Command.Role_Create_3012 = "c3012";
    /**
     * 发送存取金币的请求
     */
    Command.Req_saveORwithdraw_3014 = "c3014";
    /**
     * 发送保险箱密码请求
    */
    Command.Req_safePwd_3017 = "c3017";
    /**
     * 发送好友邀请
    */
    Command.Req_SendGameInvite_3608 = "c3608";
    /**
     * 拉取排行榜信息
     */
    Command.Req_RankList_3110 = "c3110";
    /**
     * 拉取物品列表
     */
    Command.Req_ItemList_3020 = "c3020";
    /**
     * 物品增加的推送
     */
    Command.Rec_ItemListAdd_2002 = "c2002";
    /**
     * 物品减少的推送
     */
    Command.Rec_ItemListReduce_2005 = "c2005";
    /**
     * 使用物品请求
     */
    Command.Req_UseItem_3021 = "c3021";
    /**
     * 创建私人房
    */
    Command.Req_CreatePersonalRoom_3610 = "c3610";
    /**
     * 请求领取免费金币
     */
    Command.Req_GetFreeGold_3024 = "c3024";
    //--------------------------------------------------------------
    // 行牌流程
    //--------------------------------------------------------------
    /**
     * 获取牌局信息
     */
    Command.EnterRoomInfo_Req_3600 = "c3600";
    /**
     * 请求下一局开始
     */
    Command.NextRound_Req_3601 = "c3601";
    /**
     * 请求说话
     */
    Command.Action_Req_3602 = "c3602";
    /**
     * 请求离开房间
     */
    Command.LeaveRoom_Req_3603 = "c3603";
    /**
     * 请求买入游戏
     */
    Command.BuyInGame_Req_3604 = "c3604";
    /**
     * 请求站起
     */
    Command.StandUp_Req_3605 = "c3605";
    /**
     * 请求亮牌
     */
    Command.BrightCard_Req_3606 = "c3606";
    /**
     * 请求增加金币
     */
    Command.AddCoin_Req_3607 = "c3607";
    /**
     * 1为重购，2为增购
     */
    Command.MTTRebuyOrAddon_3619 = "c3619";
    /**
     * 推送牌局结束
     */
    Command.OneRoundOver_Push_2106 = "c2106";
    /**
     * 推送下一局开始
     */
    Command.NextRoundStart_Push_2107 = "c2107";
    /**
     * 推送盲注前注变化
     */
    Command.BlindChange_Push_2100 = "c2100";
    /**
     * 推送底池变化
     */
    Command.PotChipsChange_Push_2101 = "c2101";
    /**
     * 推送一轮押注结束
     */
    Command.OneLoopOver_Push_2102 = "c2102";
    /**
     * 推送玩家坐下/站起
     */
    Command.SitOrStand_Push_2103 = "c2103";
    /**
     * 推送玩家状态变更
     */
    Command.PlayerStateChange_Push_2104 = "c2104";
    /**
     * 推送说话位置变更
     */
    Command.ActionPosChange_Push_2105 = "c2105";
    /**
     * 推送手牌
     */
    Command.HandCard_Push_2108 = "c2108";
    /**
     * 推送亮牌
     */
    Command.BrightCard_Push_2109 = "c2109";
    /**
     * 推送玩家筹码变化
     */
    Command.ChipsChange_Push_2110 = "c2110";
    /**
     * 推送等待操作的玩家列表
     */
    Command.PlayerListStateChange_Push_2113 = "c2113";
    /**
     *  推送进入托管
     */
    Command.InTrusteeship_Push_2119 = "c2119";
    /**
     * 请求牌局上局回顾数据
    */
    Command.ReviewInfo_Req_3707 = "c3707";
    //--------------------------------------------------------------
    // 行牌流程 end
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    // 锦标赛
    //--------------------------------------------------------------
    /**
     * 拉取锦标赛赛事列表信息
    */
    Command.MTTList_Req_3611 = "c3611";
    /**
     * 拉取锦标赛已报名赛事列表信息
    */
    Command.JoinedMTTList_Req_3706 = "c3706";
    /**
     * 发送报名请求
    */
    Command.MTTRequestJoin_Req_3612 = "c3612";
    /**
     * 发送退赛请求
    */
    Command.MTTRequestWithdraw_Req_3613 = "c3613";
    /**
     * 拉取所在房间列表
    */
    Command.InsideRoomInfoList_Req_3614 = "c3614";
    /**
     * 拉取最近赛况列表信息
    */
    Command.MTTRecordList_Req_3615 = "c3615";
    /**
     * 拉取最近赛况名次信息
    */
    Command.MTTRecentlyRankList_Req_3616 = "c3616";
    /**
     * 拉取当前赛况信息
    */
    Command.MTTOutsInfo_Req_3617 = "c3617";
    /**
     * 拉取当前赛况名次信息
    */
    Command.MTTRankInfo_Req_3618 = "c3618";
    /**
     * 推送赛事人数变更
    */
    Command.MTTJoinNumChange_Push_2114 = "c2114";
    /**
     * 推送赛事取消
    */
    Command.MTTCancel_Push_2115 = "c2115";
    /**
     * 推送赛事房间id
    */
    Command.MTTRoomId_Push_2116 = "c2116";
    /**
     * 推送赛事排名
     */
    Command.MTTRank_Push_2117 = "c2117";
    /**
     * 推送赛事结算
    */
    Command.MTTWeedOut_Push_2118 = "c2118";
    /**
     * 推送有新的赛事
    */
    Command.MTTNew_Push_2121 = "c2121";
    //--------------------------------------------------------------
    // 锦标赛 end
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    // 计时奖励
    //--------------------------------------------------------------
    /**
     * 拉取计时奖励信息
    */
    Command.TimeAwardInfo_Req_3620 = "c3620";
    /**
     * 领取计时奖励
    */
    Command.TimeAwardGet_Req_3621 = "c3621";
    /**
     * 时间更新推送
    */
    Command.TimeAwardRefresh_Push_2122 = "c2122";
    //--------------------------------------------------------------
    // 计时奖励 end
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    // 竞猜
    //--------------------------------------------------------------
    /**
     * 购买手牌竞猜
    */
    Command.GuessBuy_Req_3622 = "c3622";
    /**
     *获取本周榜单数据
    */
    Command.GuessCrunchies_Req_3623 = "c3623";
    /**
     *购买记录
    */
    Command.GuessRecord_Req_3624 = "c3624";
    //--------------------------------------------------------------
    // 竞猜 end
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    // 我的奖品
    //--------------------------------------------------------------
    /**
     * 拉取订单列表
    */
    Command.PrizeGetList_Req_3684 = "c3684";
    /**
     * 拉取订单详情
    */
    Command.PrizeGetDetails_Req_3685 = "c3685";
    /**
     * 保存收货信息
    */
    Command.PrizeSave_Req_3686 = "c3686";
    /**
     * 拉取收货信息
    */
    Command.PrizeGetTakeInfo_Req_3687 = "c3687";
    //--------------------------------------------------------------
    // 我的奖品 end
    //--------------------------------------------------------------
    /**
     * 手机号绑定
     */
    Command.PhoneBind_3688 = "c3688";
    /**
     * 获得手机验证码
    */
    Command.PhoneCode_Req_3689 = "c3689";
    /**
     * 设置引导步骤
    */
    Command.SetGuideStep_Req_3691 = "c3691";
    //---------------------账号绑定------------------------
    /**
     * 请求绑定账号
     */
    Command.Bind_Account_3597 = "c3597";
    /**
     * 拉取已绑定的渠道列表
     */
    Command.Bind_GetList_3705 = "c3705";
    //---------------------百人大战------------------------
    /**
     * 拉取某个角色信息（简单）
    */
    Command.SimpleUserInfo_Req_3025 = "c3025";
    /**
     * 拉取百人大战房间列表
    */
    Command.HWRoomInfo_Req_3692 = "c3692";
    /**
     * 请求进入百人大战
    */
    Command.EnterHW_Req_3693 = "c3693";
    /**
     * 请求下注
    */
    Command.HWBet_Req_3694 = "c3694";
    /**
     * 拉取奖池信息
    */
    Command.HWPoolInfo_Req_3695 = "c3695";
    /**
     * 拉取无座玩家列表
    */
    Command.HWNoSeatInfo_Req_3696 = "c3696";
    /**
     * 拉取胜负走势列表
    */
    Command.HWTrend_Req_3697 = "c3697";
    /**
     * 拉取庄家列表
    */
    Command.HWbanker_Req_3698 = "c3698";
    /**
     * 请求上庄
    */
    Command.HWKamisho_Req_3699 = "c3699";
    /**
     * 请求下庄
    */
    Command.HWShimosho_Req_3700 = "c3700";
    /**
     * 请求坐下
    */
    Command.HWSit_Req_3701 = "c3701";
    /**
     * 请求离开
    */
    Command.HWLeave_Req_3702 = "c3702";
    /**
     * 请求下一局开局
    */
    Command.HWNextRoundStart_Req_3703 = "c3703";
    /**
     * 请求站起
    */
    Command.HWStandUp_Req_3704 = "c3704";
    /**
     * 注池变更推送
    */
    Command.HWBetChange_Push_2123 = "c2123";
    /**
     * 牌推送
    */
    Command.HWCards_Push_2124 = "c2124";
    /**
     * 房间状态变更推送
    */
    Command.HWStateChange_Push_2126 = "c2126";
    /**
     * 位置变更推送
    */
    Command.HWSeatChange_Push_2127 = "c2127";
    /**
     * 退出房间推送
    */
    Command.OutRoom_Push_2128 = "c2128";
    /**
     * 兑换次数更新推送
    */
    Command.ExchangeTimeRefresh_Push_2031 = "c2031";
    //---------------------邀请------------------------
    /**
     * 绑定邀请码
    */
    Command.BindInviteCode_Req_3708 = "c3708";
    /**
     *拉取新人礼完成数据
    */
    Command.NewGiftFinish_Req_3709 = "c3709";
    /**
     *拉取绑定的充值数据
    */
    Command.BindPay_Req_3710 = "c3710";
    /**
     *领取新人礼金豆
    */
    Command.BringNewGiftGoldBean_Req_3711 = "c3711";
    /**
     *领取绑定充值金币
    */
    Command.BringBindGold_Req_3712 = "c3712";
    /**
     *拉取邀请奖励数据
    */
    Command.InviteAward_Req_3714 = "c3714";
    /**
     *分享成功
    */
    Command.ShareSuccess_Req_3715 = "c3715";
    /**
     * 赠送礼物
     */
    Command.SendGift_Req_3716 = "c3716";
    return Command;
}());
__reflect(Command.prototype, "Command");
//# sourceMappingURL=Command.js.map