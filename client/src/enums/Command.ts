class Command
{
    /**
    * 登录
    */
    public static readonly Login_login: string = "login";
    public static readonly Login_exchange: string = "exchange";
    public static readonly Login_auth: string = "auth";

    //--------------------------------------------------------------
    // System
    //--------------------------------------------------------------

    /**
     * 心跳
     */
    public static readonly C2GW_HeartBeat: string = "msg.C2GW_HeartBeat";
    /**
     * 请求服务器推送
     */
    public static readonly System_GetNotice_3004: string = "c3004";
    /**
     * 抢占登录
     */
    public static readonly System_Response_Login_2013: string = "c2013";
    /**
     * 0点定时重置通知
     */
    public static readonly System_Push_ResetTime0_2015: string = "c2015";
    /**
     * 获取角色信息
     */
    public static readonly Role_GetInfo_3000: string = "c3000";
    /**
     * 资产变更推送
     */
    public static readonly Role_Push_PropertyChange_2000: string = "c2000";
    /**
     * 请求购买房卡（测试专用）
     */
    public static readonly Req_BuyCard_3001: string = "c3001";
    /**
     * 请求上传头像
     */
    public static readonly Role_UploadHead_3683: string = "c3683";
    /**
     * 头像审核通过推送
     */
    public static readonly Role_Push_HeadReviewPass_2120: string = "c2120";

    //--------------------------------------------------------------
    // Hosted
    //--------------------------------------------------------------

    /**
     * 推送玩家托管状态
     */
    public static readonly Hosted_PushState_2024: string = "c2024";
    /**
     * 请求托管
     */
    public static readonly Hosted_Req_3022: string = "c3022";

    //--------------------------------------------------------------
    // Chat
    //--------------------------------------------------------------

    /**
     * 聊天消息推送
     */
    public static readonly Chat_PushMessage_2014: string = "c2014";
    /**
     * 发送聊天信息
     */
    public static readonly Chat_SendMessage_3019: string = "c3019";
    /**
     * 请求上传签名
     */
    public static readonly Chat_Record_Sgin_3018: string = "c3018";

    //--------------------------------------------------------------
    // Mail
    //--------------------------------------------------------------

    /**
     * 拉取邮件列表的请求
     */
    public static readonly Mail_GetList_3097: string = "c3097";
    /**
     * 请求领取邮件附件
     */
    public static readonly Mail_TakePrize_3098: string = "c3098";
    /**
     * 新邮件通知推送
     */
    public static readonly Mail_Push_New_2024 = "c2024";

    //--------------------------------------------------------------
    // Friend
    //--------------------------------------------------------------

    /**
     * 请求好友列表信息
    */
    public static readonly Friend_GetList_3156: string = "c3156";
    /**
     * 请求赠送好友金币
    */
    public static readonly Friend_GiveGold_3151: string = "c3151";
    /**
     * 好友赠送金币通知推送
     */
    public static readonly Friend_Push_GiveGold_2037 = "c2037";
    /**
     * 请求获取好友详细信息
     */
    public static readonly Friend_GetRoleInfo_3023: string = "c3023";
    /**
     * 请求领取好友赠送的金币
     */
    public static readonly Friend_ReceiveGift_3150: string = "c3150";
    /**
     * 请求好友请求列表
     */
    public static readonly Friend_RequestList_3157: string = "c3157";
    /**
     * 发送是否接受好友请求的请求
     */
    public static readonly Friend_Receive_3154: string = "c3154";
    /**
     * 发送搜索用户的请求
     */
    public static readonly Friend_SearchPlayer_3153: string = "c3153";
    /**
     * 发送删除好友的请求
     */
    public static readonly Friend_DelPlayer_3155: string = "c3155";
    /**
     * 发送添加用户为好友的请求
     */
    public static readonly Friend_AddPlayer_3152: string = "c3152";
    /**
     * 好友添加成功的通知推送
     */
    public static readonly Friend_Push_AddSuccess_2036 = "c2036";
    /**
     *被好友删除的通知推送
     */
    public static readonly Friend_Push_BeDel_2035 = "c2035";
    /**
     * 好友在线通知推送
     */
    public static readonly Friend_Push_OnlineState_2064 = "c2064";
    /**
     * 添加好友请求通知推送
     */
    public static readonly Friend_Push_RequestFriend_2038 = "c2038";
    /**
     * 被好友邀请推送
    */
    public static readonly Friend_Push_Invite_2111: string = "c2111";
    /**
     * 0点定时重置推送
    */
    public static readonly Friend_Push_Reset_2015: string = "c2015";

    //--------------------------------------------------------------
    // Award
    //--------------------------------------------------------------

    /**
     * 兑换奖励
     */
    public static readonly Award_Exchange_3113 = "c3113";
    /**
     * 拉取兑换信息
     */
    public static readonly Award_GetInfo_3112 = "c3112";
    /**
     * 拉取兑换记录
     */
    public static readonly Award_Record_3713 = "c3713";

    //--------------------------------------------------------------
    // Achievement
    //--------------------------------------------------------------

    /**
     * 推送成就更新
     */
    public static readonly Achievement_PushChange_2023: string = "c2023";
    /**
     * 拉取成就列表
     */
    public static readonly Achievement_GetList_3090 = "c3090";
    /**
     * 领取成就奖励
     */
    public static readonly Achievement_GetPrize_3088 = "c3088";

    //--------------------------------------------------------------
    // Activity
    //--------------------------------------------------------------

    /**
     * 拉取活动列表
     */
    public static readonly Activity_GetList_3233: string = "c3233";
    /**
     * 推送活动
     */
    public static readonly Activity_Push_2088: string = "c2088";
    /**
     * 请求领取活动奖励
     */
    public static readonly Activity_GetPrize_3202: string = "c3202";
    /**
     * 请求参与活动
    */
    public static readonly ActivityJoin_Req_3584: string = "c3584";
    /**
     * 请求活动公共数据
     */
    public static readonly ActivityPubJoin_Req_3234: string = "c3234";
    /**
     * 拉取活动操作记录
     */
    public static readonly ActivityActionRecord_Req_3235: string = "c3235";

    //--------------------------------------------------------------
    // 
    //--------------------------------------------------------------

    /**
     * 会员时间戳变更推送
     */
    public static readonly Vip_GetVipTime_2001: string = "c2001";
    /**
     * 推送玩家离线
     */
    public static readonly Role_Push_Offline_2026: string = "c2026";
    /**
     * 拉取分享好友列表
     */
    public static readonly Req_BindFriendList_3027: string = "c3027";

    /**
     * 设置角色基础信息
     */
    public static readonly Role_SetInfo_3609: string = "c3609";
    /**
     * 用户经验变更推送
     */
    public static readonly Role_Push_ExpChange_2028: string = "c2028";
    /**
     * 请求游戏场房间列表信息
     */
    public static readonly Req_RoomInfo_3002: string = "c3002";
    /**
     * 发送创建角色的请求
     */
    public static readonly Role_Create_3012: string = "c3012";
    /**
     * 发送存取金币的请求
     */
    public static readonly Req_saveORwithdraw_3014: string = "c3014";
    /**
     * 发送保险箱密码请求
    */
    public static readonly Req_safePwd_3017: string = "c3017";
    /**
     * 发送好友邀请
    */
    public static readonly Req_SendGameInvite_3608 = "c3608";
    /**
     * 拉取排行榜信息
     */
    public static readonly Req_RankList_3110 = "c3110";
    /**
     * 拉取物品列表
     */
    public static readonly Req_ItemList_3020: string = "c3020";
    /**
     * 物品增加的推送
     */
    public static readonly Rec_ItemListAdd_2002: string = "c2002";
    /**
     * 物品减少的推送
     */
    public static readonly Rec_ItemListReduce_2005: string = "c2005";
    /**
     * 使用物品请求
     */
    public static readonly Req_UseItem_3021: string = "c3021";
    /**
     * 创建私人房
    */
    public static readonly Req_CreatePersonalRoom_3610: string = "c3610";
    /**
     * 请求领取免费金币
     */
    public static readonly Req_GetFreeGold_3024: string = "c3024";

    //--------------------------------------------------------------
    // 行牌流程
    //--------------------------------------------------------------
    /**
     * 获取牌局信息
     */
    public static readonly EnterRoomInfo_Req_3600 = "c3600";
    /**
     * 请求下一局开始
     */
    public static readonly NextRound_Req_3601 = "c3601";
    /**
     * 请求说话
     */
    public static readonly Action_Req_3602 = "c3602";
    /**
     * 请求离开房间
     */
    public static readonly LeaveRoom_Req_3603 = "c3603";
    /**
     * 请求买入游戏
     */
    public static readonly BuyInGame_Req_3604 = "c3604";
    /**
     * 请求站起
     */
    public static readonly StandUp_Req_3605 = "c3605";
    /**
     * 请求亮牌
     */
    public static readonly BrightCard_Req_3606 = "c3606";
    /**
     * 请求增加金币
     */
    public static readonly AddCoin_Req_3607 = "c3607";
    /**
     * 1为重购，2为增购
     */
    public static readonly MTTRebuyOrAddon_3619 = "c3619";
    /**
     * 推送牌局结束
     */
    public static readonly OneRoundOver_Push_2106 = "c2106";
    /**
     * 推送下一局开始
     */
    public static readonly NextRoundStart_Push_2107 = "c2107";
    /**
     * 推送盲注前注变化
     */
    public static readonly BlindChange_Push_2100 = "c2100";
    /**
     * 推送底池变化
     */
    public static readonly PotChipsChange_Push_2101 = "c2101";
    /**
     * 推送一轮押注结束
     */
    public static readonly OneLoopOver_Push_2102 = "c2102";
    /**
     * 推送玩家坐下/站起
     */
    public static readonly SitOrStand_Push_2103 = "c2103";
    /**
     * 推送玩家状态变更
     */
    public static readonly PlayerStateChange_Push_2104 = "c2104";
    /**
     * 推送说话位置变更
     */
    public static readonly ActionPosChange_Push_2105 = "c2105";
    /**
     * 推送手牌
     */
    public static readonly HandCard_Push_2108 = "c2108";
    /**
     * 推送亮牌
     */
    public static readonly BrightCard_Push_2109 = "c2109";
    /**
     * 推送玩家筹码变化
     */
    public static readonly ChipsChange_Push_2110 = "c2110";
    /**
     * 推送等待操作的玩家列表
     */
    public static readonly PlayerListStateChange_Push_2113 = "c2113";
    /**
     *  推送进入托管
     */
    public static readonly InTrusteeship_Push_2119 = "c2119";
    /**
     * 请求牌局上局回顾数据
    */
    public static readonly ReviewInfo_Req_3707 = "c3707";
    //--------------------------------------------------------------
    // 行牌流程 end
    //--------------------------------------------------------------

    //--------------------------------------------------------------
    // 锦标赛
    //--------------------------------------------------------------
    /**
     * 拉取锦标赛赛事列表信息
    */
    public static readonly MTTList_Req_3611 = "c3611";
    /**
     * 拉取锦标赛已报名赛事列表信息
    */
    public static readonly JoinedMTTList_Req_3706 = "c3706";
    /**
     * 发送报名请求
    */
    public static readonly MTTRequestJoin_Req_3612 = "c3612";
    /**
     * 发送退赛请求
    */
    public static readonly MTTRequestWithdraw_Req_3613 = "c3613";
    /**
     * 拉取所在房间列表
    */
    public static readonly C2GW_ReqUserRoomInfo = "msg.C2GW_ReqUserRoomInfo";
    /**
     * 拉取最近赛况列表信息
    */
    public static readonly MTTRecordList_Req_3615 = "c3615";
    /**
     * 拉取最近赛况名次信息
    */
    public static readonly MTTRecentlyRankList_Req_3616 = "c3616";
    /**
     * 拉取当前赛况信息
    */
    public static readonly MTTOutsInfo_Req_3617 = "c3617";
    /**
     * 拉取当前赛况名次信息
    */
    public static readonly MTTRankInfo_Req_3618 = "c3618";
    /**
     * 推送赛事人数变更
    */
    public static readonly MTTJoinNumChange_Push_2114 = "c2114";
    /**
     * 推送赛事取消
    */
    public static readonly MTTCancel_Push_2115 = "c2115";
    /**
     * 推送赛事房间id
    */
    public static readonly MTTRoomId_Push_2116 = "c2116";
    /**
     * 推送赛事排名
     */
    public static readonly MTTRank_Push_2117 = "c2117";
    /**
     * 推送赛事结算
    */
    public static readonly MTTWeedOut_Push_2118 = "c2118";
    /**
     * 推送有新的赛事
    */
    public static readonly MTTNew_Push_2121 = "c2121";
    //--------------------------------------------------------------
    // 锦标赛 end
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    // 计时奖励
    //--------------------------------------------------------------
    /**
     * 拉取计时奖励信息
    */
    public static readonly TimeAwardInfo_Req_3620 = "c3620";
    /**
     * 领取计时奖励
    */
    public static readonly TimeAwardGet_Req_3621 = "c3621";
    /**
     * 时间更新推送
    */
    public static readonly TimeAwardRefresh_Push_2122 = "c2122";
    //--------------------------------------------------------------
    // 计时奖励 end
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    // 竞猜
    //--------------------------------------------------------------
    /**
     * 购买手牌竞猜
    */
    public static readonly GuessBuy_Req_3622 = "c3622";
    /**
     *获取本周榜单数据
    */
    public static readonly GuessCrunchies_Req_3623 = "c3623";
    /**
     *购买记录
    */
    public static readonly GuessRecord_Req_3624 = "c3624";
    //--------------------------------------------------------------
    // 竞猜 end
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    // 我的奖品
    //--------------------------------------------------------------
    /**
     * 拉取订单列表
    */
    public static readonly PrizeGetList_Req_3684 = "c3684";
    /**
     * 拉取订单详情
    */
    public static readonly PrizeGetDetails_Req_3685 = "c3685";
    /**
     * 保存收货信息
    */
    public static readonly PrizeSave_Req_3686 = "c3686";
    /**
     * 拉取收货信息
    */
    public static readonly PrizeGetTakeInfo_Req_3687 = "c3687";
    //--------------------------------------------------------------
    // 我的奖品 end
    //--------------------------------------------------------------
    /**
     * 手机号绑定
     */
    public static readonly PhoneBind_3688 = "c3688";
    /**
     * 获得手机验证码
    */
    public static readonly PhoneCode_Req_3689 = "c3689";
    /**
     * 设置引导步骤
    */
    public static readonly SetGuideStep_Req_3691 = "c3691";
    //---------------------账号绑定------------------------
    /**
     * 请求绑定账号
     */
    public static readonly Bind_Account_3597 = "c3597";
    /**
     * 拉取已绑定的渠道列表
     */
    public static readonly Bind_GetList_3705 = "c3705";

    //---------------------百人大战------------------------
    /**
     * 拉取某个角色信息（简单）
    */
    public static readonly SimpleUserInfo_Req_3025 = "c3025";
    /**
     * 拉取百人大战房间列表
    */
    public static readonly HWRoomInfo_Req_3692 = "c3692";
    /**
     * 请求进入百人大战
    */
    public static readonly EnterHW_Req_3693 = "c3693";
    /**
     * 请求下注
    */
    public static readonly HWBet_Req_3694 = "c3694";
    /**
     * 拉取奖池信息
    */
    public static readonly HWPoolInfo_Req_3695 = "c3695";
    /**
     * 拉取无座玩家列表
    */
    public static readonly HWNoSeatInfo_Req_3696 = "c3696";
    /**
     * 拉取胜负走势列表
    */
    public static readonly HWTrend_Req_3697 = "c3697";
    /**
     * 拉取庄家列表
    */
    public static readonly HWbanker_Req_3698 = "c3698";
    /**
     * 请求上庄
    */
    public static readonly HWKamisho_Req_3699 = "c3699";
    /**
     * 请求下庄
    */
    public static readonly HWShimosho_Req_3700 = "c3700";
    /**
     * 请求坐下
    */
    public static readonly HWSit_Req_3701 = "c3701";
    /**
     * 请求离开
    */
    public static readonly HWLeave_Req_3702 = "c3702";
    /**
     * 请求下一局开局
    */
    public static readonly HWNextRoundStart_Req_3703 = "c3703";
    /**
     * 请求站起
    */
    public static readonly HWStandUp_Req_3704 = "c3704";
    /**
     * 注池变更推送
    */
    public static readonly HWBetChange_Push_2123 = "c2123";
    /**
     * 牌推送
    */
    public static readonly HWCards_Push_2124 = "c2124";
    /**
     * 房间状态变更推送
    */
    public static readonly HWStateChange_Push_2126 = "c2126";
    /**
     * 位置变更推送
    */
    public static readonly HWSeatChange_Push_2127 = "c2127";
    /**
     * 退出房间推送
    */
    public static readonly OutRoom_Push_2128 = "c2128";
    /**
     * 兑换次数更新推送
    */
    public static readonly ExchangeTimeRefresh_Push_2031 = "c2031";
    //---------------------邀请------------------------
    /**
     * 绑定邀请码
    */
    public static readonly BindInviteCode_Req_3708 = "c3708";
    /**
     *拉取新人礼完成数据
    */
    public static readonly NewGiftFinish_Req_3709 = "c3709";
    /**
     *拉取绑定的充值数据
    */
    public static readonly BindPay_Req_3710 = "c3710";
    /**
     *领取新人礼金豆
    */
    public static readonly BringNewGiftGoldBean_Req_3711 = "c3711";
    /**
     *领取绑定充值金币
    */
    public static readonly BringBindGold_Req_3712 = "c3712";
    /**
     *拉取邀请奖励数据
    */
    public static readonly InviteAward_Req_3714 = "c3714";
    /**
     *分享成功
    */
    public static readonly ShareSuccess_Req_3715 = "c3715";
    /**
     * 赠送礼物
     */
    public static readonly SendGift_Req_3716 = "c3716"
}

