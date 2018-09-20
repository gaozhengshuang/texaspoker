var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * UI层枚举
 */
var UILayerType;
(function (UILayerType) {
    // 无
    UILayerType[UILayerType["None"] = 0] = "None";
    // 内容层
    UILayerType[UILayerType["GameContent"] = 1] = "GameContent";
    // 主UI层
    UILayerType[UILayerType["MainUI"] = 2] = "MainUI";
    // 面板模块层
    UILayerType[UILayerType["Module"] = 3] = "Module";
    // tips层
    UILayerType[UILayerType["Tips"] = 4] = "Tips";
    // 引导层
    UILayerType[UILayerType["Guide"] = 5] = "Guide";
    // 警告层
    UILayerType[UILayerType["Warn"] = 6] = "Warn";
})(UILayerType || (UILayerType = {}));
/**
 * 面板对齐方式
 * */
var PanelAlignType;
(function (PanelAlignType) {
    /*空*/
    PanelAlignType[PanelAlignType["None"] = 0] = "None";
    /*中上*/
    PanelAlignType[PanelAlignType["Center_Top"] = 1] = "Center_Top";
    /*中中*/
    PanelAlignType[PanelAlignType["Center_Center"] = 2] = "Center_Center";
    /*中下*/
    PanelAlignType[PanelAlignType["Center_Bottom"] = 3] = "Center_Bottom";
    /*左上*/
    PanelAlignType[PanelAlignType["Left_Top"] = 4] = "Left_Top";
    /*左中*/
    PanelAlignType[PanelAlignType["Left_Center"] = 5] = "Left_Center";
    /*左下*/
    PanelAlignType[PanelAlignType["Left_Bottom"] = 6] = "Left_Bottom";
    /*右下*/
    PanelAlignType[PanelAlignType["Right_Top"] = 7] = "Right_Top";
    /*右中*/
    PanelAlignType[PanelAlignType["Right_Center"] = 8] = "Right_Center";
    /*右下*/
    PanelAlignType[PanelAlignType["Right_Bottom"] = 9] = "Right_Bottom";
})(PanelAlignType || (PanelAlignType = {}));
/**
 * 滚动方向
 */
var ScrollViewDirection;
(function (ScrollViewDirection) {
    ScrollViewDirection[ScrollViewDirection["None"] = 0] = "None";
    /**
     * 水平 从左向右
     */
    ScrollViewDirection[ScrollViewDirection["Horizontal_L_R"] = 1] = "Horizontal_L_R";
    /**
     * 垂直从上到下
     */
    ScrollViewDirection[ScrollViewDirection["Vertical_T_D"] = 2] = "Vertical_T_D";
})(ScrollViewDirection || (ScrollViewDirection = {}));
/**
 * 面板名枚举
 */
var UIModuleName = (function () {
    function UIModuleName() {
    }
    /**
    * 无面板(特殊枚举,不代表面板)
    */
    UIModuleName.None = "None";
    UIModuleName.NetworkPanel = "NetworkPanel";
    /**
     * 文本tips面板
     */
    UIModuleName.TextTipsPanel = "TextTipsPanel";
    /**
     * 获得金币面板
     */
    UIModuleName.GetCoinTipsPanel = "GetCoinTipsPanel";
    /**
     * 获得道具面板
     */
    UIModuleName.GetItemTipsPanel = "GetItemTipsPanel";
    /**
     * 提示框
     */
    UIModuleName.AlertInfoPanel = "AlertInfoPanel";
    /**
     * 好友消息界面
    */
    UIModuleName.FriendMsgPanel = "FriendMsgPanel";
    /**
     * 加载界面
     */
    UIModuleName.LoadingPanel = "LoadingPanel";
    /**
     * 登录界面
     */
    UIModuleName.LoginPanel = "LoginPanel";
    /**
     * 用户协议界面
     */
    UIModuleName.UserAngreementPanel = "UserAngreementPanel";
    /**
     * 游戏大厅界面
     */
    UIModuleName.GameHallPanel = "GameHallPanel";
    /**
     * 跑马灯
     */
    UIModuleName.MarqueePanel = "MarqueePanel";
    /**
     * 充值面板
     */
    UIModuleName.PayPanel = "PayPanel";
    /**
     * 文本信息面板 如规则面板
     */
    UIModuleName.TextInfoPanel = "TextInfoPanel";
    /**
     * 注册面板
     */
    UIModuleName.RegisterPanel = "RegisterPanel";
    /**
     * 本地登录面板
     */
    UIModuleName.LoginLocalPanel = "LoginLocalPanel";
    /**
     * 登录场景面板
     */
    UIModuleName.LoginBar = "LoginBar";
    /**
     * 场景加载切换面板
     */
    UIModuleName.LoadingSwitchPanel = "LoadingSwitchPanel";
    /**
     * 用户信息面板
     */
    UIModuleName.UserInfoPanel = "UserInfoPanel";
    /**
     * 登录场景背景界面
     */
    UIModuleName.LoginSceneBgPanel = "LoginSceneBgPanel";
    /**
     *游戏分享面板
     */
    UIModuleName.ShareGamePromptPanel = "ShareGamePromptPanel";
    /**
     * 正在录音面板
     */
    UIModuleName.AudioRecordingPanel = "AudioRecordingPanel";
    /**
    * 会员面板
    */
    UIModuleName.VipPanel = "VipPanel";
    /**
    * 创建角色面板
    */
    UIModuleName.CreateRolePanel = "CreateRolePanel";
    /**
     * 编辑资料面板
     */
    UIModuleName.EditUserInfoPanel = "EditUserInfoPanel";
    /**
     * 修改昵称面板
     */
    UIModuleName.ChangeUserNamePanel = "ChangeUserNamePanel";
    /**
     * 商城面板
     */
    UIModuleName.ShoppingPanel = "ShoppingPanel";
    /**
     * 游戏场面板
     */
    UIModuleName.PlayingFieldPanel = "PlayingFieldPanel";
    /**
     * 键盘面板
     */
    UIModuleName.KeyBoardPanel = "KeyBoardPanel";
    /**
     * 进入私人房输入密码面板
     */
    UIModuleName.EnterRoomPwdPanel = "EnterRoomPwdPanel";
    /**
     * 设置面板
     */
    UIModuleName.SetPanel = "SetPanel";
    /**
     * 玩法面板
     */
    UIModuleName.GameRulePanel = "GameRulePanel";
    /**
     *  创建私人房输入密码面板
     */
    UIModuleName.CreateRoomPwdPanel = "CreateRoomPwdPanel";
    /**
     * 保险箱面板
    */
    UIModuleName.SafeBoxPanel = "SafeBoxPanel";
    /**
    * 保险箱创建面板
    */
    UIModuleName.SafeCreatePanel = "SafeCreatePanel";
    /**
     * 好友面板
    */
    UIModuleName.FriendPanel = "FriendPanel";
    /**
     * 邮件面板
     */
    UIModuleName.MailPanel = "MailPanel";
    /**
     * 聊天面板
     */
    UIModuleName.ChatPanel = "ChatPanel";
    /**
     * 我的奖品面板
     */
    UIModuleName.PrizePanel = "PrizePanel";
    /**
     * 锦标赛面板
    */
    UIModuleName.ChampionshipPanel = "ChampionshipPanel";
    /**
     * 成就信息面板
     */
    UIModuleName.AchievementItemPanel = "AchievementItemPanel";
    /**
     * 邀请好友面板
    */
    UIModuleName.InviteFriendPanel = "InviteFriendPanel";
    /**
     * 排行榜面板
     */
    UIModuleName.RankPanel = "RankPanel";
    /**
     *邀请信息面板
    */
    UIModuleName.InviteMsgPanel = "InviteMsgPanel";
    /**
     * 任务面板
    */
    UIModuleName.AssignmentPanel = "AssignmentPanel";
    /**
     * 战局中的任务面板
     */
    UIModuleName.AchievementInGamePanel = "AchievementInGamePanel";
    /**
     *锦标赛报名成功面板
    */
    UIModuleName.JoinChampionshipSuccessPanel = "JoinChampionshipSuccessPanel";
    /**
     * 加注面板
    */
    UIModuleName.AddChipsPanel = "AddChipsPanel";
    /**
     * 牌局面板
     */
    UIModuleName.GamblingPanel = "GamblingPanel";
    /**
     * 锦标赛赛事详情信息面板
    */
    UIModuleName.ChampionshipInfoPanel = "ChampionshipInfoPanel";
    /**
     * 买入游戏面板
    */
    UIModuleName.BuyAccessGamePanel = "BuyAccessGamePanel";
    /**
     * 重购/增购面板
     */
    UIModuleName.ChampionshipBuyChipsPanel = "ChampionshipBuyChipsPanel";
    /**
     * 活动中心面板
     */
    UIModuleName.ActivityPanel = "ActivityPanel";
    /**
     * 活动页面（只有一张图片）
     */
    UIModuleName.SimplePicturePanel = "SimplePicturePanel";
    /**
     * 活动页面（具有图文内容的活动）
     */
    UIModuleName.NormalActivityPanel = "NormalActivityPanel";
    /**
     * 首充活动面板
     */
    UIModuleName.FirstPayPanel = "FirstPayPanel";
    /**
     * 赛事1分钟开始提醒面板
    */
    UIModuleName.MinuteRemindPanel = "MinuteRemindPanel";
    /**
     * 赛事20秒开始提醒面板
    */
    UIModuleName.SecondRemindPanel = "SecondRemindPanel";
    /**
     * 签到面板
    */
    UIModuleName.SignInPanel = "SignInPanel";
    /**
     * 计时奖励面板
    */
    UIModuleName.TimeAwardPanel = "TimeAwardPanel";
    /**
     * 计时奖励可领取奖励提醒面板
    */
    UIModuleName.GetTimeAwardRemindPanel = "GetTimeAwardRemindPanel";
    /**
     * MTT结束结算面板
    */
    UIModuleName.MTTOverPanel = "MTTOverPanel";
    /**
     * 手牌竞猜面板
    */
    UIModuleName.GuessPanel = "GuessPanel";
    /**
     * 我的奖品订单确定面板
    */
    UIModuleName.PrizeOrderSurePanel = "PrizeOrderSurePanel";
    /**
     * 横幅提醒面板
    */
    UIModuleName.ThreeMinRemindPanel = "ThreeMinRemindPanel";
    /**
     * 金币不足面板
     */
    UIModuleName.GoldShortagePanel = "GoldShortagePanel";
    /**
     * 订购详情面板
     */
    UIModuleName.OrderDetailPanel = "OrderDetailPanel";
    /**
     * 手机号注册面板
     */
    UIModuleName.RegisterTelPanel = "RegisterTelPanel";
    /**
     * 手机号登录面板
     */
    UIModuleName.LoginTelPanel = "LoginTelPanel";
    /**
     * 绑定账号面板
     */
    UIModuleName.BindAccountPanel = "BindAccountPanel";
    /**
     * 绑定手机面板
     */
    UIModuleName.BindPhonePanel = "BindPhonePanel";
    /**
     * 账号找回密码面板
    */
    UIModuleName.AccountRetrievePwdPanel = "AccountRetrievePwdPanel";
    /**
     * 保险箱找回密码面板
    */
    UIModuleName.SafeBoxRetrievePwdPanel = "SafeBoxRetrievePwdPanel";
    /**
     * 游戏介绍面板
    */
    UIModuleName.GuideGameDescriptionPanel = "GuideGameDescriptionPanel";
    /**
     * 游戏牌型面板
    */
    UIModuleName.GuideCardTypeIntroPanel = "GuideCardTypeIntroPanel";
    /**
     * 游戏引导选择面板
    */
    UIModuleName.GuideChoosePanel = "GuideChoosePanel";
    /**
     * 游戏引导领取金币面板
    */
    UIModuleName.GuideBringGoldPanel = "GuideBringGoldPanel";
    /**
     * 游戏引导问答面板
    */
    UIModuleName.GuideQuestionPanel = "GuideQuestionPanel";
    /**
     * 游戏引导答题答错面板
    */
    UIModuleName.GuideAnswerErrorPanel = "GuideAnswerErrorPanel";
    /**
     * 百人大战面板
    */
    UIModuleName.HundredWarPanel = "HundredWarPanel";
    /**
     * 百人大战结算面板
    */
    UIModuleName.HundredWarOverPanel = "HundredWarOverPanel";
    /**
     * 百人大战无座玩家面板
    */
    UIModuleName.HundredWarNoSeatPlayerPanel = "HundredWarNoSeatPlayerPanel";
    /**
     * 百人大战进入面板
    */
    UIModuleName.HundredWarRoomPanel = "HundredWarRoomPanel";
    /**
     * 百人大战胜负走势面板
     */
    UIModuleName.HundredWarTrendPanel = "HundredWarTrendPanel";
    /**
     * 百人大战帮助面板
     */
    UIModuleName.HundredWarHelpPanel = "HundredWarHelpPanel";
    /**
     * 百人大战庄家列表面板
     */
    UIModuleName.HundredWarBankerListPanel = "HundredWarBankerListPanel";
    /**
     * 百人大战任务面板
     */
    UIModuleName.AchievementInHundredWarPanel = "AchievementInHundredWarPanel";
    /**
     * 百人大战奖池面板
     */
    UIModuleName.HundredWarPoolInfoPanel = "HundredWarPoolInfoPanel";
    /**
     * 公告面板
     */
    UIModuleName.ImgNotifyPanel = "ImgNotifyPanel";
    /**
     * 德州转转转活动面板
     */
    UIModuleName.ShimTaeYoonPanel = "ShimTaeYoonPanel";
    /**
     * 欢乐豪礼
     */
    UIModuleName.HappyGiftPanel = "HappyGiftPanel";
    /**
     * 德州转转转活动帮助面板
     */
    UIModuleName.ShimTaeYoonHelpPanel = "ShimTaeYoonHelpPanel";
    /**
     * 德州转转转活动排行面板
     */
    UIModuleName.ShimTaeYoonRankPanel = "ShimTaeYoonRankPanel";
    /**
     * 德州转转转活动排行面板
     */
    UIModuleName.ShimTaeYoonResultPanel = "ShimTaeYoonResultPanel";
    /**
     * 月卡活动面板
     */
    UIModuleName.MonthCardPanel = "MonthCardPanel";
    /**
     * 自动登录面板面板
     */
    UIModuleName.AutoLoginPanel = "AutoLoginPanel";
    /**
     * 支付遮罩面板
     */
    UIModuleName.PayMaskPanel = "PayMaskPanel";
    /**
     * 支付混合面板
     */
    UIModuleName.PayModePanel = "PayModePanel";
    /**
     * 绑定手机账号面板
     */
    UIModuleName.BindPhoneAccountPanel = "BindPhoneAccountPanel";
    /**
     * 牌局上局回顾面板
     */
    UIModuleName.GamblingReviewPanel = "GamblingReviewPanel";
    /**
     *坐满即玩开赛提醒面板
     */
    UIModuleName.SitAndPlayStartRemindPanel = "SitAndPlayStartRemindPanel";
    /**
     * 破产补助活动面板
     */
    UIModuleName.BankruptSubsidyPanel = "BankruptSubsidyPanel";
    /**
     * 坐满即玩结束面板
     */
    UIModuleName.SitAndPlayOverPanel = "SitAndPlayOverPanel";
    /**
     * 游戏中破产补助界面
     */
    UIModuleName.BankruptSubsidyInGamePanel = "BankruptSubsidyInGamePanel";
    /**
     * 更多玩法面板
     */
    UIModuleName.MorePlayPanel = "MorePlayPanel";
    /**
     * 奥马哈牌型面板
     */
    UIModuleName.OmahaCardTypePanel = "OmahaCardTypePanel";
    /**
     * 绑定手机奖励面板
     */
    UIModuleName.BindPhoneAwardPanel = "BindPhoneAwardPanel";
    /**
     * 邀请活动面板
     */
    UIModuleName.InvitePanel = "InvitePanel";
    /**
     * 礼物信息面板
     */
    UIModuleName.GiftItemPanel = "GiftItemPanel";
    /**
     * 新人礼面板
     */
    UIModuleName.NewGiftPanel = "NewGiftPanel";
    /**
     * 分享抽奖活动面板
     */
    UIModuleName.ShareLuckDrawPanel = "ShareLuckDrawPanel";
    /**
     * 新人充值礼面板
     */
    UIModuleName.NewPayGiftPanel = "NewPayGiftPanel";
    /**
     * 微信分享选择面板
     */
    UIModuleName.ChooseShareWayPanel = "ChooseShareWayPanel";
    /**
     *奖励领取面板
     */
    UIModuleName.BringAwardComPanel = "BringAwardComPanel";
    /**
     * 礼物商店面板
     */
    UIModuleName.GiftShopPanel = "GiftShopPanel";
    /**
     * 兑奖面板
     */
    UIModuleName.AwardsPanel = "AwardsPanel";
    return UIModuleName;
}());
__reflect(UIModuleName.prototype, "UIModuleName");
/**
 * 选项卡按钮类型
 */
var TabButtonType;
(function (TabButtonType) {
    /**
     * 小号两项的选项卡
     */
    TabButtonType[TabButtonType["SmallOf2"] = 1] = "SmallOf2";
    /**
     * 小号三项的选项卡
     */
    TabButtonType[TabButtonType["SmallOf3"] = 2] = "SmallOf3";
    /**
     * 大号两项的选项卡
     */
    TabButtonType[TabButtonType["BigOf2"] = 3] = "BigOf2";
    /**
     * 大号三项的选项卡
     */
    TabButtonType[TabButtonType["BigOf3"] = 4] = "BigOf3";
    /**
     * 大号四项的选项卡
     */
    TabButtonType[TabButtonType["BigOf4"] = 5] = "BigOf4";
    /**
     * 副选项两项的选项卡
     */
    TabButtonType[TabButtonType["SubOf2"] = 6] = "SubOf2";
    /**
     * 小号五项的选项卡
     */
    TabButtonType[TabButtonType["SmallOf5"] = 7] = "SmallOf5";
    /**
     * 手牌竞猜小号五项的选项卡
     */
    TabButtonType[TabButtonType["XSmallOf5"] = 8] = "XSmallOf5";
    /**
     * 副选项四项的选项卡
     */
    TabButtonType[TabButtonType["SubOf4"] = 9] = "SubOf4";
    /**
     * 欢乐豪礼四项选项卡
     */
    TabButtonType[TabButtonType["HappyGiftOf4"] = 10] = "HappyGiftOf4";
    /**
    * 欢乐豪礼两项选项卡
    */
    TabButtonType[TabButtonType["HappyGiftOf2"] = 11] = "HappyGiftOf2";
    /**
    * 拉霸2项选项卡
    */
    TabButtonType[TabButtonType["LaBa2"] = 12] = "LaBa2";
    /**
     * 锦标赛副选项卡3项
    */
    TabButtonType[TabButtonType["SubOf3"] = 13] = "SubOf3";
    /**
    * 小号四项的选项卡
    */
    TabButtonType[TabButtonType["SmallOf4"] = 14] = "SmallOf4";
    /**
    * 邀请选项卡3项
    */
    TabButtonType[TabButtonType["InviteSmallOf3"] = 15] = "InviteSmallOf3";
    /**
    * 邀请选项卡4项
    */
    TabButtonType[TabButtonType["InviteSmallOf4"] = 16] = "InviteSmallOf4";
})(TabButtonType || (TabButtonType = {}));
/**
 * 项皮肤枚举
 * */
var UIRendererSkinName = (function () {
    function UIRendererSkinName() {
    }
    UIRendererSkinName.ROOT_PATH = 'resource/skins/renderer/';
    /**
     * 充值面板项渲染
     */
    UIRendererSkinName.PayPanelItemRenderer = UIRendererSkinName.ROOT_PATH + "PayPanelItemRenderer.exml";
    /**
     * 创建房间面板项渲染
     */
    UIRendererSkinName.CreateRoomPanelRenderer = UIRendererSkinName.ROOT_PATH + "CreateRoomPanelRenderer.exml";
    /**
     * 文本项
     */
    UIRendererSkinName.TextRenderer = UIRendererSkinName.ROOT_PATH + "TextRenderer.exml";
    /**
     * 我的奖品项
     */
    UIRendererSkinName.MyAwardPanelItemRenderer = UIRendererSkinName.ROOT_PATH + "MyAwardPanelItemRenderer.exml";
    /**
     * 商城金币项
     */
    UIRendererSkinName.GoldItemComponent = UIRendererSkinName.ROOT_PATH + "GoldItemComponent.exml";
    /**
     * 商城钻石项
     */
    UIRendererSkinName.DiamondItemComponent = UIRendererSkinName.ROOT_PATH + "DiamondItemComponent.exml";
    /**
     * 商城金币渲染项
     */
    UIRendererSkinName.ShopGoldItemRenderer = UIRendererSkinName.ROOT_PATH + "ShopGoldItemRenderer.exml";
    /**
     * 商城钻石渲染项
     */
    UIRendererSkinName.ShopDiamondItemRenderer = UIRendererSkinName.ROOT_PATH + "ShopDiamondItemRenderer.exml";
    /**
     * vip列表项
     */
    UIRendererSkinName.VipListItemRenderer = UIRendererSkinName.ROOT_PATH + "VipListItemRenderer.exml";
    /**
     * 房间列表项
     */
    UIRendererSkinName.PlayingFieldItemRenderer = UIRendererSkinName.ROOT_PATH + "PlayingFieldItemRenderer.exml";
    /**
     * 好友列表项
     */
    UIRendererSkinName.FriendItemRenderer = UIRendererSkinName.ROOT_PATH + "FriendItemRenderer.exml";
    /**
     * 成就项
     */
    UIRendererSkinName.AchievementItemRenderer = UIRendererSkinName.ROOT_PATH + "AchievementItemRenderer.exml";
    /**
     * 邮件项
     */
    UIRendererSkinName.MailItemRenderer = UIRendererSkinName.ROOT_PATH + "MailItemRenderer.exml";
    /**
     * 礼物项
     */
    UIRendererSkinName.GiftItemRenderer = UIRendererSkinName.ROOT_PATH + "GiftItemRenderer.exml";
    /**
     * 好友请求项
     */
    UIRendererSkinName.FriendRequestItemRenderer = UIRendererSkinName.ROOT_PATH + "FriendRequestItemRenderer.exml";
    /**
     * 添加好友项
     */
    UIRendererSkinName.AddFriendItemRenderer = UIRendererSkinName.ROOT_PATH + "AddFriendItemRenderer.exml";
    /**
     * 聊天项
     */
    UIRendererSkinName.ChatItemRenderer = UIRendererSkinName.ROOT_PATH + "ChatItemRenderer.exml";
    /**
     * 表情项
     */
    UIRendererSkinName.FaceItemRenderer = UIRendererSkinName.ROOT_PATH + "FaceItemRenderer.exml";
    /**
     * 快捷输入项
     */
    UIRendererSkinName.FastChatItemRenderer = UIRendererSkinName.ROOT_PATH + "FastChatItemRenderer.exml";
    /**
     * 锦标赛赛事列表项
     */
    UIRendererSkinName.ChampionshipItemRenderer = UIRendererSkinName.ROOT_PATH + "ChampionshipItemRenderer.exml";
    /**
     * 锦标赛已结束赛事列表项
     */
    UIRendererSkinName.ChampionshipOutItemRenderer = UIRendererSkinName.ROOT_PATH + "ChampionshipOutItemRenderer.exml";
    /**
     * 邀请好友列表项
     */
    UIRendererSkinName.InviteFriendItemRenderer = UIRendererSkinName.ROOT_PATH + "InviteFriendItemRenderer.exml";
    /**
     * 排行榜渲染项
     */
    UIRendererSkinName.RankItemRenderer = UIRendererSkinName.ROOT_PATH + "RankItemRenderer.exml";
    /**
     * 我的门票项
     */
    UIRendererSkinName.MyTicketItemRenderer = UIRendererSkinName.ROOT_PATH + "MyTicketItemRenderer.exml";
    /**
     * 最近赛况项
     */
    UIRendererSkinName.OutsItemRenderer = UIRendererSkinName.ROOT_PATH + "OutsItemRenderer.exml";
    /**
     * 最近赛况折叠项
     */
    UIRendererSkinName.OutsChildItemRenderer = UIRendererSkinName.ROOT_PATH + "OutsChildItemRenderer.exml";
    /**
     * 任务项
     */
    UIRendererSkinName.AssignmentItemRenderer = UIRendererSkinName.ROOT_PATH + "AssignmentItemRenderer.exml";
    /**
     * 游戏场里的任务项
     */
    UIRendererSkinName.AchieveInGameItemRenderer = UIRendererSkinName.ROOT_PATH + "AchieveInGameItemRenderer.exml";
    /**
     * 锦标赛赛事信息排名项
     */
    UIRendererSkinName.ChampionshipRankItemRenderer = UIRendererSkinName.ROOT_PATH + "ChampionshipRankItemRenderer.exml";
    /**
     * 锦标赛赛事信息盲注项
     */
    UIRendererSkinName.BlindItemRenderer = UIRendererSkinName.ROOT_PATH + "BlindItemRenderer.exml";
    /**
     * 锦标赛赛事信息奖励项
     */
    UIRendererSkinName.AwardItemRenderer = UIRendererSkinName.ROOT_PATH + "AwardItemRenderer.exml";
    /**
     * 签到项
    */
    UIRendererSkinName.SignInGoldItemRenderer = UIRendererSkinName.ROOT_PATH + "SignInGoldItemRenderer.exml";
    /**
     * 活动列表渲染项
     */
    UIRendererSkinName.ActivityItemRenderer = UIRendererSkinName.ROOT_PATH + "ActivityItemRenderer.exml";
    /**
     * 活动奖励渲染项
     */
    UIRendererSkinName.ActivityAwardItemRenderer = UIRendererSkinName.ROOT_PATH + "ActivityAwardItemRenderer.exml";
    /**
     * 计时奖励渲染项
     */
    UIRendererSkinName.TimeAwardItemRenderer = UIRendererSkinName.ROOT_PATH + "TimeAwardItemRenderer.exml";
    /**
     * 手牌竞猜购买渲染项
     */
    UIRendererSkinName.GuessBuyItemRenderer = UIRendererSkinName.ROOT_PATH + "GuessBuyItemRenderer.exml";
    /**
     * 手牌竞猜本周榜单渲染项
     */
    UIRendererSkinName.GuessWeekItemRenderer = UIRendererSkinName.ROOT_PATH + "GuessWeekItemRenderer.exml";
    /**
     * 手牌竞猜开奖结果渲染项
     */
    UIRendererSkinName.GuessResultItemRenderer = UIRendererSkinName.ROOT_PATH + "GuessResultItemRenderer.exml";
    /**
     * 手牌竞猜购买记录渲染项
     */
    UIRendererSkinName.GuessRecordItemRenderer = UIRendererSkinName.ROOT_PATH + "GuessRecordItemRenderer.exml";
    /**
     * 引导答案渲染项
     */
    UIRendererSkinName.GuideQuestionItemRenderer = UIRendererSkinName.ROOT_PATH + "GuideQuestionItemRenderer.exml";
    /**
     * 百人大战渲染项
     */
    UIRendererSkinName.HundredWarItemRenderer = UIRendererSkinName.ROOT_PATH + "HundredWarItemRenderer.exml";
    /**
     * 百人大战无座玩家渲染项
     */
    UIRendererSkinName.HundredWarNoSeatItemRenderer = UIRendererSkinName.ROOT_PATH + "HundredWarNoSeatItemRenderer.exml";
    /**
     * 引导回答错误渲染项
     */
    UIRendererSkinName.GuideAnswerErrorItemRenderer = UIRendererSkinName.ROOT_PATH + "GuideAnswerErrorItemRenderer.exml";
    /**
     *  百人大战胜负走势渲染项
     */
    UIRendererSkinName.HundredWarTrendItemRenderer = UIRendererSkinName.ROOT_PATH + "HundredWarTrendItemRenderer.exml";
    /**
     * 百人大战庄家列表渲染项
     */
    UIRendererSkinName.HundredWarBankerItemRenderer = UIRendererSkinName.ROOT_PATH + "HundredWarBankerItemRenderer.exml";
    /**
     * 百人大战任务渲染项
     */
    UIRendererSkinName.AchieveInHundredWarItemRenderer = UIRendererSkinName.ROOT_PATH + "AchieveInHundredWarItemRenderer.exml";
    /**
     * 百人大战注数渲染项
     */
    UIRendererSkinName.HWBetItemRenderer = UIRendererSkinName.ROOT_PATH + "HWBetItemRenderer.exml";
    /**
     * 百人大战奖池中奖列表项
     */
    UIRendererSkinName.HundredWarPoolPrizeItemRenderer = UIRendererSkinName.ROOT_PATH + "HundredWarPoolPrizeItemRenderer.exml";
    /**
     * 德州转转转活动列表项
     */
    UIRendererSkinName.ShimTaeYoonItemRenderer = UIRendererSkinName.ROOT_PATH + "ShimTaeYoonItemRenderer.exml";
    /**
     * 欢乐豪礼商品项
     */
    UIRendererSkinName.HappyGiftItemRenderer = UIRendererSkinName.ROOT_PATH + "HappyGiftItemRenderer.exml";
    /**
     * 欢乐豪礼排行项
     */
    UIRendererSkinName.HappyGiftRankRenderer = UIRendererSkinName.ROOT_PATH + "HappyGiftRankRenderer.exml";
    /**
     * 欢乐豪礼兑换使用项
     */
    UIRendererSkinName.HappyGiftUseRenderer = UIRendererSkinName.ROOT_PATH + "HappyGiftUseRenderer.exml";
    /**
     * 德州转转转活动帮助列表项
     */
    UIRendererSkinName.ShimTaeYoonHelpItemRenderer = UIRendererSkinName.ROOT_PATH + "ShimTaeYoonHelpItemRenderer.exml";
    /**
     * 德州转转转活动排名列表项
     */
    UIRendererSkinName.ShimTaeYoonRankItemRenderer = UIRendererSkinName.ROOT_PATH + "ShimTaeYoonRankItemRenderer.exml";
    /**
     * 月卡列表项
     */
    UIRendererSkinName.MonthCardItemRenderer = UIRendererSkinName.ROOT_PATH + "MonthCardItemRenderer.exml";
    /**
     * 牌局上局回顾列表项
     */
    UIRendererSkinName.GamblingReviewItemRenderer = UIRendererSkinName.ROOT_PATH + "GamblingReviewItemRenderer.exml";
    /**
     * 更多玩法项
     */
    UIRendererSkinName.MorePlayItemRenderer = UIRendererSkinName.ROOT_PATH + "MorePlayItemRenderer.exml";
    /**
     * 绑定手机奖励项
     */
    UIRendererSkinName.BindPhoneAwardItemRenderer = UIRendererSkinName.ROOT_PATH + "BindPhoneAwardItemRenderer.exml";
    /**
     * 邀请活动分享id项
     */
    UIRendererSkinName.InviteItemRenderer = UIRendererSkinName.ROOT_PATH + "InviteItemRenderer.exml";
    /**
     * 邀请活动领取金豆项
     */
    UIRendererSkinName.InviteImazamoxItemRenderer = UIRendererSkinName.ROOT_PATH + "InviteImazamoxItemRenderer.exml";
    /**
     * 邀请活动领取金币项
     */
    UIRendererSkinName.InviteGoldItemRenderer = UIRendererSkinName.ROOT_PATH + "InviteGoldItemRenderer.exml";
    /**
     * 新人礼项
     */
    UIRendererSkinName.NewGiftItemRenderer = UIRendererSkinName.ROOT_PATH + "NewGiftItemRenderer.exml";
    /**
     * 分享中奖信息项
     */
    UIRendererSkinName.ShareLuckDrawItemRenderer = UIRendererSkinName.ROOT_PATH + "ShareLuckDrawItemRenderer.exml";
    /**
     * 兑换奖品项
     */
    UIRendererSkinName.GoldenBeanAwardItemRenderer = UIRendererSkinName.ROOT_PATH + "GoldenBeanAwardItemRenderer.exml";
    /**
     * 兑换记录项
     */
    UIRendererSkinName.GoldenBeanRecordItemRenderer = UIRendererSkinName.ROOT_PATH + "GoldenBeanRecordItemRenderer.exml";
    /**
     * 礼物商店物品项
     */
    UIRendererSkinName.GiftShopItemRenderer = UIRendererSkinName.ROOT_PATH + "GiftShopItemRenderer.exml";
    return UIRendererSkinName;
}());
__reflect(UIRendererSkinName.prototype, "UIRendererSkinName");
/**
 * 组件皮肤枚举
 */
var UIComponentSkinName = (function () {
    function UIComponentSkinName() {
    }
    UIComponentSkinName.ROOT_PATH = 'resource/skins/component/';
    /**
     * 输入数字组件
     */
    UIComponentSkinName.NumComponent = UIComponentSkinName.ROOT_PATH + "NumComponent.exml";
    /**
     * 成就数字组件
     */
    UIComponentSkinName.ImageNumComponent = UIComponentSkinName.ROOT_PATH + "ImageNumComponent.exml";
    /**
    * 小选项卡按钮-3
    */
    UIComponentSkinName.tabComponentButton3 = UIComponentSkinName.ROOT_PATH + "tabComponentButton3.exml";
    /**
    * 小选项卡按钮-4
    */
    UIComponentSkinName.tabComponentButton4 = UIComponentSkinName.ROOT_PATH + "tabComponentButton4.exml";
    /**
     * 小选项卡按钮-2
     */
    UIComponentSkinName.tabComponentButton2 = UIComponentSkinName.ROOT_PATH + "tabComponentButton2.exml";
    /**
     * 小选项卡按钮-5
     */
    UIComponentSkinName.TabComponentButton5 = UIComponentSkinName.ROOT_PATH + "tabComponentButton5.exml";
    /**
     * 手牌竞猜小选项卡按钮-5
     */
    UIComponentSkinName.TabComponentButtonSm5 = UIComponentSkinName.ROOT_PATH + "tabComponentButtonSm5.exml";
    /**
     * 排行榜副选项卡按钮-2
     */
    UIComponentSkinName.rankTabComponentButton2 = UIComponentSkinName.ROOT_PATH + "rankTabComponentButton2.exml";
    /**
     * 锦标赛副选项卡按钮-3
     */
    UIComponentSkinName.tabComponentSubBtn3 = UIComponentSkinName.ROOT_PATH + "tabComponentSubBtn3.exml";
    /**
     * 拉霸副选项卡按钮-4
     */
    UIComponentSkinName.laBaRankTabComponentBtn4 = UIComponentSkinName.ROOT_PATH + "laba/laBaRankTabComponentBtn4.exml";
    /**
     * 拉霸选项卡按钮-2
     */
    UIComponentSkinName.laBaTabCompontBtn2 = UIComponentSkinName.ROOT_PATH + "laba/laBaTabCompontBtn2.exml";
    /**
     * 大选项卡按钮-2
     */
    UIComponentSkinName.tabComponentButtonBig2 = UIComponentSkinName.ROOT_PATH + "tabComponentButtonBig2.exml";
    /**
     * 大选项卡按钮-3
     */
    UIComponentSkinName.tabComponentButtonBig3 = UIComponentSkinName.ROOT_PATH + "tabComponentButtonBig3.exml";
    /**
     * 大选项卡按钮-4
     */
    UIComponentSkinName.tabComponentButtonBig4 = UIComponentSkinName.ROOT_PATH + "tabComponentButtonBig4.exml";
    /**
     * 手牌竞猜注数单选
     */
    UIComponentSkinName.guessAnteToggleSwitchSkin = UIComponentSkinName.ROOT_PATH + "guess/guessAnteToggleSwitchSkin.exml";
    /**
     * 手牌竞猜购买局数单选
     */
    UIComponentSkinName.guessAnteBuyRadioButtonSkin = UIComponentSkinName.ROOT_PATH + "guess/guessAnteBuyRadioButtonSkin.exml";
    /**
    * 获得道具组件
    */
    UIComponentSkinName.GetItemComponent = UIComponentSkinName.ROOT_PATH + "item/GetItemComponent.exml";
    /**
     * 欢乐豪礼活动四项选项卡
     */
    UIComponentSkinName.happyGiftTabtButton4 = UIComponentSkinName.ROOT_PATH + "happyGiftTabtButton4.exml";
    /**
     * 欢乐豪礼活动两项选项卡
     */
    UIComponentSkinName.happyGiftTabtButton2 = UIComponentSkinName.ROOT_PATH + "happyGiftTabtButton2.exml";
    /**
     *邀请三项选项卡
     */
    UIComponentSkinName.tabComponentInviteBtn3 = UIComponentSkinName.ROOT_PATH + "tabComponentInviteBtn3.exml";
    /**
     *邀请四项选项卡
     */
    UIComponentSkinName.tabComponentInviteBtn4 = UIComponentSkinName.ROOT_PATH + "tabComponentInviteBtn4.exml";
    //===========================================================
    // cardface
    //===========================================================
    /**
     * 操作CD组件
     */
    UIComponentSkinName.GamblingCdComponent = UIComponentSkinName.ROOT_PATH + "gambling/GamblingCdComponent.exml";
    /**
     * 牌局玩家头像组件
     */
    UIComponentSkinName.GamblingHeadComponent = UIComponentSkinName.ROOT_PATH + "gambling/GamblingHeadComponent.exml";
    /**
     * 牌局玩家坐下效果
    */
    UIComponentSkinName.DownEfffectComponent = UIComponentSkinName.ROOT_PATH + "gambling/DownEfffectComponent.exml";
    /**
     * 牌面显示组件
     */
    UIComponentSkinName.CardFaceComponent = UIComponentSkinName.ROOT_PATH + "gambling/CardFaceComponent.exml";
    /**
     * 筹码显示组件
     */
    UIComponentSkinName.ChipsShowComponent = UIComponentSkinName.ROOT_PATH + "gambling/ChipsShowComponent.exml";
    /**
     * 单图片筹码显示组件
     */
    UIComponentSkinName.ChipsSingleShowComponent = UIComponentSkinName.ROOT_PATH + "gambling/ChipsSingleShowComponent.exml";
    /**
     * 操作组件
     */
    UIComponentSkinName.GamblingActionComponent = UIComponentSkinName.ROOT_PATH + "gambling/GamblingActionComponent.exml";
    /**
     * 锦标赛等待
     */
    UIComponentSkinName.GamblingMatchWaitComponent = UIComponentSkinName.ROOT_PATH + "gambling/GamblingMatchWaitComponent.exml";
    /**
     * 牌局训练营引导组件
     */
    UIComponentSkinName.GamblingGuideComponent = UIComponentSkinName.ROOT_PATH + "gambling/GamblingGuideComponent.exml";
    /**
     * 牌局引导玩法组件
     */
    UIComponentSkinName.GamblingGuidePlayWayComponent = UIComponentSkinName.ROOT_PATH + "gambling/GamblingGuidePlayWayComponent.exml";
    /**
     * 牌局锦标赛组件1
     */
    UIComponentSkinName.GamblingMatchComponent = UIComponentSkinName.ROOT_PATH + "gambling/GamblingMatchComponent.exml";
    /**
     * 牌局锦标赛组件2
     */
    UIComponentSkinName.GamblingMatchBlindComponent = UIComponentSkinName.ROOT_PATH + "gambling/GamblingMatchBlindComponent.exml";
    /**
     * 红点通知组件
     */
    UIComponentSkinName.NotifyComponent = UIComponentSkinName.ROOT_PATH + "NotifyComponent.exml";
    /**
     * 6位密码组件
     */
    UIComponentSkinName.PwdComponent = UIComponentSkinName.ROOT_PATH + "PwdComponent.exml";
    /**
     * 等待下一局组件
     */
    UIComponentSkinName.WaitNextRoundComponent = UIComponentSkinName.ROOT_PATH + "WaitNextRoundComponent.exml";
    /**
     * 正在请求组件
     */
    UIComponentSkinName.ReqScrollerbotton = UIComponentSkinName.ROOT_PATH + "ReqScrollerbotton.exml";
    /**
     * 引导文字说明组件
     */
    UIComponentSkinName.GuideTipsComponent = UIComponentSkinName.ROOT_PATH + "guide/GuideTipsComponent.exml";
    /**
     * 引导提示组件
     */
    UIComponentSkinName.GuidePromptComponent = UIComponentSkinName.ROOT_PATH + "guide/GuidePromptComponent.exml";
    /**
     * 百人大战数字组件
     */
    UIComponentSkinName.HundredWarNumComponent = UIComponentSkinName.ROOT_PATH + "hundredWar/HundredWarNumComponent.exml";
    /**
     * 首充活动项
     */
    UIComponentSkinName.FirstPayItemComponent = UIComponentSkinName.ROOT_PATH + "FirstPayItemComponent.exml";
    /**
     * 奥马哈牌型按钮组件
     */
    UIComponentSkinName.OmahaCardTypeBtnComponent = UIComponentSkinName.ROOT_PATH + "gambling/OmahaCardTypeBtnComponent.exml";
    return UIComponentSkinName;
}());
__reflect(UIComponentSkinName.prototype, "UIComponentSkinName");
//# sourceMappingURL=UIEnum.js.map