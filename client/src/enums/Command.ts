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
    public static readonly C2GW_ReqHeartBeat: string = "msg.C2GW_ReqHeartBeat";
    /**
     * 请求服务器推送
     */
    public static readonly System_GetNotice_3004: string = "c3004";
    /**
     * 服务器推送消息提示
     */
    public static readonly GW2C_PushMsgNotify: string = "msg.GW2C_PushMsgNotify";
    /**
     * 抢占登录
     */
    public static readonly System_Response_Login_2013: string = "c2013";
    /**
     * 0点定时重置通知
     */
    public static readonly C2GW_PushZeroClock: string = "msg.C2GW_PushZeroClock";
    /**
     * 获取角色信息 move todo 已被 msg.GW2C_PushUserInfo代替
     */
    public static readonly Role_GetInfo_3000: string = "c3000";
    /**
     * 资产变更推送
     */
    public static readonly RS2C_RolePushPropertyChange: string = "msg.RS2C_RolePushPropertyChange";
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
    /**
     * 请求当前所在的房间
     */
    public static readonly C2GW_ReqCurRoom:string = "msg.C2GW_ReqCurRoom";
    //--------------------------------------------------------------
    // Hosted
    //--------------------------------------------------------------

    /**
     * 推送玩家托管状态
     */
    public static readonly Hosted_PushState_2024: string = "c2024";

    //--------------------------------------------------------------
    // Chat
    //--------------------------------------------------------------

    /**
     * 聊天消息推送
     */
    public static readonly GW2C_PushMessage: string = "msg.GW2C_PushMessage";
    /**
     * 发送聊天信息
     */
    public static readonly C2GW_ReqSendMessage: string = "msg.C2GW_ReqSendMessage";
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
    public static readonly C2GW_ReqMailList: string = "msg.C2GW_ReqMailList";
    /**
     * 请求领取邮件附件
     */
    public static readonly C2GW_ReqTakeMailItem: string = "msg.C2GW_ReqTakeMailItem";
    /**
     * 新邮件通知推送
     */
    public static readonly GW2C_PushNewMail = "msg.GW2C_PushNewMail";

    //--------------------------------------------------------------
    // Friend
    //--------------------------------------------------------------

    /**
     * 请求好友列表信息
    */
    public static readonly C2GW_ReqFriendsList: string = "msg.C2GW_ReqFriendsList";
    /**
     * 请求赠送好友金币
    */
    public static readonly C2GW_ReqPresentToFriend: string = "msg.C2GW_ReqPresentToFriend";
    /**
     * 好友赠送金币通知推送
     */
    public static readonly GW2C_PushFriendPresent = "msg.GW2C_PushFriendPresent";
    /**
     * 请求获取用户详细信息
     */
    public static readonly C2GW_ReqPlayerRoleInfo: string = "msg.C2GW_ReqPlayerRoleInfo";
    /**
     * 请求领取好友赠送的金币
     */
    public static readonly C2GW_ReqGetFriendPresent: string = "msg.C2GW_ReqGetFriendPresent";
    /**
     * 请求好友请求列表
     */
    public static readonly C2GW_ReqFriendRequestList: string = "msg.C2GW_ReqFriendRequestList";
    /**
     * 发送是否接受好友请求的请求
     */
    public static readonly C2GW_ReqProcessFriendRequest: string = "msg.C2GW_ReqProcessFriendRequest";
    /**
     * 发送搜索用户的请求
     */
    public static readonly C2GW_ReqFriendSearch: string = "msg.C2GW_ReqFriendSearch";
    /**
     * 发送删除好友的请求
     */
    public static readonly C2GW_ReqRemoveFriend: string = "msg.C2GW_ReqRemoveFriend";
    /**
     * 发送添加用户为好友的请求
     */
    public static readonly C2GW_ReqAddFriend: string = "msg.C2GW_ReqAddFriend";
    /**
     * 好友添加成功的通知推送
     */
    public static readonly GW2C_PushFriendAddSuccess = "msg.GW2C_PushFriendAddSuccess";
    /**
     *被好友删除的通知推送
     */
    public static readonly GW2C_PushRemoveFriend = "msg.GW2C_PushRemoveFriend";
    /**
     * 好友在线通知推送 (已废弃 改为每次切标签拉信息列表)
     */
    public static readonly GW2C_PushFriendLogin = "msg.GW2C_PushFriendLogin";
    /**
     * 添加好友请求通知推送
     */
    public static readonly GW2C_PushAddYouFriend = "msg.GW2C_PushAddYouFriend";
    /**
     * 被好友邀请推送
    */
    public static readonly GW2C_PushFriendInvitation: string = "msg.GW2C_PushFriendInvitation";
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
    public static readonly C2GW_ReqAwardExchange = "msg.C2GW_ReqAwardExchange";
    /**
     * 拉取兑换信息
     */
    public static readonly C2GW_ReqAwardGetInfo = "msg.C2GW_ReqAwardGetInfo";
    /**
     * 拉取兑换记录
     */
    public static readonly C2GW_ReqAwardRecord = "msg.C2GW_ReqAwardRecord";

    //--------------------------------------------------------------
    // Achievement
    //--------------------------------------------------------------

    /**
     * 拉取成就列表
     */
    public static readonly C2GW_ReqAchieveInfo = "msg.C2GW_ReqAchieveInfo";
    /**
     * 领取成就奖励
     */
    public static readonly C2GW_ReqTakeAchieveAward = "msg.C2GW_ReqTakeAchieveAward";

    //--------------------------------------------------------------
    // Activity
    //--------------------------------------------------------------

    /**
     * 拉取活动列表
     */
    public static readonly C2GW_ReqActivityInfo: string = "msg.C2GW_ReqActivityInfo";
    /**
     * 推送活动
     */
    public static readonly Activity_Push_2088: string = "c2088";
    /**
     * 请求领取活动奖励
     */
    public static readonly C2GW_ReqGetActivityReward: string = "msg.C2GW_ReqGetActivityReward";
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
    public static readonly C2GW_PushVipTime: string = "msg.C2GW_PushVipTime";
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
    public static readonly C2GW_ReqTexasRoomList: string = "msg.C2GW_ReqTexasRoomList";
    /**
     * 发送创建角色的请求
     */
    public static readonly Role_Create_3012: string = "c3012";
    /**
     * 发送保险箱存取金币的请求
     */
    public static readonly Req_saveORwithdraw_3014: string = "c3014";
    /**
     * 发送保险箱密码请求
    */
    public static readonly Req_safePwd_3017: string = "c3017";
    /**
     * 发送好友邀请
    */
    public static readonly C2GW_ReqInviteFriendJoin = "msg.C2GW_ReqInviteFriendJoin";
    /**
     * 拉取排行榜信息
     */
    public static readonly C2GW_ReqRankList = "msg.C2GW_ReqRankList";
    /**
     * 物品上线推送
     */
    public static readonly GW2C_PushItemList: string = "msg.GW2C_PushItemList";
    /**
     * 物品数量变更的推送
     */
    public static readonly GW2C_PushUpdateItem: string = "msg.GW2C_PushUpdateItem";
    /**
     * 使用物品请求
     */
    public static readonly Req_UseItem_3021: string = "c3021";
    /**
     * 创建私人房
    */
    public static readonly C2GW_ReqCreateRoom: string = "msg.C2GW_ReqCreateRoom";
    /**
     * 请求领取免费金币
     */
    public static readonly C2GW_ReqGetFreeGold: string = "msg.C2GW_ReqGetFreeGold";

    //--------------------------------------------------------------
    // 行牌流程
    //--------------------------------------------------------------
    /**
     * 获取牌局信息
     */
    public static readonly C2GW_ReqEnterRoom = "msg.C2GW_ReqEnterRoom";
    /**
     * 请求下一局开始
     */
    public static readonly C2RS_ReqNextRound = "msg.C2RS_ReqNextRound";
    /**
     * 请求说话
     */
    public static readonly C2RS_ReqAction = "msg.C2RS_ReqAction";
    /**
     * 请求离开房间
     */
    public static readonly C2GW_ReqLeaveRoom = "msg.C2GW_ReqLeaveRoom";
    /**
     * 请求买入游戏
     */
    public static readonly C2RS_ReqBuyInGame = "msg.C2RS_ReqBuyInGame";
    /**
     * 请求站起
     */
    public static readonly C2RS_ReqStandUp = "msg.C2RS_ReqStandUp";
    /**
     * 请求亮牌
     */
    public static readonly C2RS_ReqBrightCard = "msg.C2RS_ReqBrightCard";
    /**
     * 请求增加金币
     */
    public static readonly C2RS_ReqAddCoin = "msg.C2RS_ReqAddCoin";
    /**
     * 1为重购，2为增购
     */
    public static readonly C2RS_ReqMTTRebuyOrAddon = "msg.C2RS_ReqMTTRebuyOrAddon";
    /**
     * 推送牌局结束
     */
    public static readonly RS2C_PushOneRoundOver = "msg.RS2C_PushOneRoundOver";
    /**
     * 推送下一局开始
     */
    public static readonly RS2C_PushNextRoundStart = "msg.RS2C_PushNextRoundStart";
    /**
     * 推送盲注前注变化
     */
    public static readonly RS2C_PushBlindChange = "msg.RS2C_PushBlindChange";
    /**
     * 推送一轮押注结束
     */
    public static readonly RS2C_PushOneLoopOver = "msg.RS2C_PushOneLoopOver";
    /**
     * 推送玩家坐下/站起
     */
    public static readonly RS2C_PushSitOrStand = "msg.RS2C_PushSitOrStand";
    /**
     * 推送玩家状态变更
     */
    public static readonly RS2C_PushPlayerStateChange = "msg.RS2C_PushPlayerStateChange";
    /**
     * 推送说话位置变更
     */
    public static readonly RS2C_PushActionPosChange = "msg.RS2C_PushActionPosChange";
    /**
     * 推送手牌
     */
    public static readonly RS2C_PushHandCard = "msg.RS2C_PushHandCard";
    /**
     * 请求立即亮牌
     */
    public static readonly C2RS_ReqBrightInTime = "msg.C2RS_ReqBrightInTime";
    /**
     * 推送亮牌
     */
    public static readonly RS2C_PushBrightCard = "msg.RS2C_PushBrightCard";
    /**
     * 推送玩家筹码变化
     */
    public static readonly RS2C_PushChipsChange = "msg.RS2C_PushChipsChange";
    /**
     *  推送进入托管
     */
    public static readonly InTrusteeship_Push_2119 = "c2119";
    /**
     * 请求牌局上局回顾数据
    */
    public static readonly C2RS_ReqReviewInfo = "msg.C2RS_ReqReviewInfo";
    //--------------------------------------------------------------
    // 行牌流程 end
    //--------------------------------------------------------------

    //--------------------------------------------------------------
    // 锦标赛
    //--------------------------------------------------------------
    /**
     * 拉取锦标赛赛事列表信息
    */
    public static readonly C2RS_ReqMTTList = "msg.C2RS_ReqMTTList";
    /**
     * 拉取锦标赛已报名赛事列表信息
    */
    public static readonly C2RS_ReqJoinedMTTList = "msg.C2RS_ReqJoinedMTTList";
    /**
     * 发送报名请求
    */
    public static readonly C2RS_ReqMTTJoin = "msg.C2RS_ReqMTTJoin";
    /**
     * 发送退赛请求
    */
    public static readonly C2RS_ReqMTTQuit = "msg.C2RS_ReqMTTQuit";
    /**
     * 拉取所在房间列表
    */
    public static readonly C2RS_ReqInsideRoomInfoList = "msg.C2RS_ReqInsideRoomInfoList";
    /**
     * 拉取最近赛况列表信息
    */
    public static readonly C2RS_ReqMTTRecordList = "msg.C2RS_ReqMTTRecordList";
    /**
     * 拉取最近赛况名次信息
    */
    public static readonly C2RS_ReqMTTRecentlyRankList = "msg.C2RS_ReqMTTRecentlyRankList";
    /**
     * 拉取当前赛况信息
    */
    public static readonly C2RS_ReqMTTOutsInfo = "msg.C2RS_ReqMTTOutsInfo";
    /**
     * 拉取当前赛况名次信息
    */
    public static readonly C2RS_ReqMTTRankInfo = "msg.C2RS_ReqMTTRankInfo";
    /**
     * 推送赛事人数变更
    */
    public static readonly RS2C_PushMTTJoinNumChange = "msg.RS2C_PushMTTJoinNumChange";
    /**
     * 推送赛事取消
    */
    public static readonly RS2C_PushMTTCancel = "msg.RS2C_PushMTTCancel";
    /**
     * 推送赛事房间id
    */
    public static readonly RS2C_PushMTTRoomId = "msg.RS2C_PushMTTRoomId";
    /**
     * 推送赛事排名
     */
    public static readonly RS2C_PushMTTRank = "msg.RS2C_PushMTTRank";
    /**
     * 推送赛事结算
    */
    public static readonly RS2C_PushMTTWeedOut = "msg.RS2C_PushMTTWeedOut";
    /**
     * 推送有新的赛事
    */
    public static readonly RS2C_PushMTTNew = "msg.RS2C_PushMTTNew";
    //--------------------------------------------------------------
    // 锦标赛 end
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    // 计时奖励
    //--------------------------------------------------------------
    /**
     * 拉取计时奖励信息
    */
    public static readonly C2RS_ReqTimeAwardInfo = "msg.C2RS_ReqTimeAwardInfo";
    /**
     * 领取计时奖励
    */
    public static readonly C2RS_ReqTimeAwardGet = "msg.C2RS_ReqTimeAwardGet";
    /**
     * 时间更新推送
    */
    public static readonly RS2C_PushTimeAwardRefresh = "msg.RS2C_PushTimeAwardRefresh";
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
    // public static readonly SimpleUserInfo_Req_3025 = "c3025";
    /**
     * 拉取百人大战房间列表
    */
    public static readonly C2GW_ReqTFRoomList = "msg.C2GW_ReqTFRoomList";
    /**
     * 请求进入百人大战
    */
    public static readonly C2GW_ReqEnterTFRoom = "msg.C2GW_ReqEnterTFRoom";
    /**
     * 请求下注
    */
    public static readonly C2RS_ReqTexasFightBet = "msg.C2RS_ReqTexasFightBet";
    /**
     * 拉取奖池信息
    */
    public static readonly C2RS_ReqTFLastAwardPoolHit = "msg.C2RS_ReqTFLastAwardPoolHit";
    /**
     * 拉取无座玩家列表
    */
    public static readonly C2RS_ReqTFStandPlayer = "msg.C2RS_ReqTFStandPlayer";
    /**
     * 拉取胜负走势列表
    */
    public static readonly C2RS_ReqWinLoseTrend = "msg.C2RS_ReqWinLoseTrend";
    /**
     * 拉取庄家列表
    */
    public static readonly C2RS_ReqTFBankerList = "msg.C2RS_ReqTFBankerList";
    /**
     * 请求上庄
    */
    public static readonly C2RS_ReqTFBecomeBanker = "msg.C2RS_ReqTFBecomeBanker";
    /**
     * 请求下庄
    */
    public static readonly C2RS_ReqTFQuitBanker = "msg.C2RS_ReqTFQuitBanker";
    /**
     * 请求坐下
    */
    public static readonly C2RS_ReqTFSitDown = "msg.C2RS_ReqTFSitDown";
    /**
     * 请求离开
    */
    public static readonly C2RS_ReqTFLeave = "msg.C2RS_ReqTFLeave";
    /**
     * 请求下一局开局
    */
    public static readonly C2RS_ReqTFStart = "msg.C2RS_ReqTFStart";
    /**
     * 请求站起
    */
    public static readonly C2RS_ReqTFStandUp = "msg.C2RS_ReqTFStandUp";
    /**
     * 注池变更推送
    */
    public static readonly RS2C_PushBetPoolChange = "msg.RS2C_PushBetPoolChange";
    /**
     * 牌推送
    */
    public static readonly RS2C_PushTFRoundOver = "msg.RS2C_PushTFRoundOver";
    /**
     * 房间状态变更推送
    */
    public static readonly RS2C_PushTFStateChange = "msg.RS2C_PushTFStateChange";
    /**
     * 位置变更推送
    */
    public static readonly RS2C_PushTFPosChange = "msg.RS2C_PushTFPosChange";
    /**
     * 退出房间推送
    */
    public static readonly RS2C_PushTFPlayerKickOut = "msg.RS2C_PushTFPlayerKickOut";
    /**
     * 兑换次数更新推送
    */
    public static readonly GW2C_PushExchangeTimeRefresh = "msg.GW2C_PushExchangeTimeRefresh";
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
    public static readonly SendGift_Req_3716 = "c3716";
    //-------------------------client消息转发到Room-------------------------
    /**
     * client消息转发到Room
     */
    public static readonly C2RS_MsgTransfer = "msg.C2RS_MsgTransfer";
    /**
     * client消息转发到mtt
     */
    public static readonly C2MTT_MsgTransfer = "msg.C2MTT_MsgTransfer";
    //------------------------运营活动----------------------
    /**
     * 充值弹窗相关信息
     */
    public static readonly C2GW_ReqPayRecommend = "msg.C2GW_ReqPayRecommend";
    /**
     * 接取任务
     */
    public static readonly C2GW_ReqTakeOtherTask = "msg.C2GW_ReqTakeOtherTask";
}

