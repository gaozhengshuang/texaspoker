/**
 * UI层枚举
 */
enum UILayerType
{
	// 无
	None = 0,
	// 内容层
	GameContent = 1,
	// 主UI层
	MainUI = 2,
	// 面板模块层
	Module = 3,
	// tips层
	Tips = 4,
	// 引导层
	Guide = 5,
	// 警告层
	Warn = 6,
}
/**
 * 面板对齐方式
 * */
enum PanelAlignType
{
	/*空*/
	None = 0,
	/*中上*/
	Center_Top = 1,
	/*中中*/
	Center_Center = 2,
	/*中下*/
	Center_Bottom = 3,
	/*左上*/
	Left_Top = 4,
	/*左中*/
	Left_Center = 5,
	/*左下*/
	Left_Bottom = 6,
	/*右下*/
	Right_Top = 7,
	/*右中*/
	Right_Center = 8,
	/*右下*/
	Right_Bottom = 9,
}
/**
 * 滚动方向
 */
enum ScrollViewDirection
{
	None = 0,
	/**
	 * 水平 从左向右
	 */
	Horizontal_L_R = 1,
	/**
	 * 垂直从上到下
	 */
	Vertical_T_D = 2
}
/**
 * 面板名枚举 
 */
class UIModuleName
{
	/**
    * 无面板(特殊枚举,不代表面板)
    */
	public static None = "None";
	public static NetworkPanel = "NetworkPanel";
	/**
	 * 文本tips面板
	 */
	public static TextTipsPanel = "TextTipsPanel";
	/**
	 * 获得金币面板
	 */
	public static GetCoinTipsPanel = "GetCoinTipsPanel";
	/**
	 * 获得道具面板
	 */
	public static GetItemTipsPanel = "GetItemTipsPanel";
	/**
	 * 提示框
	 */
	public static AlertInfoPanel = "AlertInfoPanel";
	/**
	 * 好友消息界面
	*/
	public static FriendMsgPanel = "FriendMsgPanel";
	/**
	 * 加载界面
	 */
	public static LoadingPanel = "LoadingPanel";
	/**
	 * 登录界面
	 */
	public static LoginPanel = "LoginPanel";
	/**
	 * 用户协议界面
	 */
	public static UserAngreementPanel = "UserAngreementPanel";
	/**
	 * 游戏大厅界面
	 */
	public static GameHallPanel = "GameHallPanel";
	/**
	 * 跑马灯
	 */
	public static MarqueePanel = "MarqueePanel";
	/**
	 * 充值面板
	 */
	public static PayPanel = "PayPanel";
	/**
	 * 文本信息面板 如规则面板
	 */
	public static TextInfoPanel = "TextInfoPanel";
	/**
	 * 注册面板
	 */
	public static RegisterPanel = "RegisterPanel";
	/**
	 * 本地登录面板
	 */
	public static LoginLocalPanel = "LoginLocalPanel";
	/**
	 * 登录场景面板
	 */
	public static LoginBar = "LoginBar";
	/**
	 * 场景加载切换面板
	 */
	public static LoadingSwitchPanel = "LoadingSwitchPanel";
	/**
	 * 用户信息面板
	 */
	public static UserInfoPanel = "UserInfoPanel";
	/**
	 * 登录场景背景界面
	 */
	public static LoginSceneBgPanel = "LoginSceneBgPanel";
	/**
	 *游戏分享面板
	 */
	public static ShareGamePromptPanel = "ShareGamePromptPanel";
    /**
	 * 正在录音面板
	 */
	public static AudioRecordingPanel = "AudioRecordingPanel";
	/**
	* 会员面板
	*/
	public static VipPanel = "VipPanel"
	/**
	* 创建角色面板
	*/
	public static CreateRolePanel = "CreateRolePanel";
	/**
	 * 编辑资料面板
	 */
	public static EditUserInfoPanel = "EditUserInfoPanel";
	/**
	 * 修改昵称面板
	 */
	public static ChangeUserNamePanel = "ChangeUserNamePanel";
	/**
	 * 商城面板
	 */
	public static ShoppingPanel = "ShoppingPanel";
	/**
	 * 游戏场面板
	 */
	public static PlayingFieldPanel = "PlayingFieldPanel";
	/**
	 * 键盘面板
	 */
	public static KeyBoardPanel = "KeyBoardPanel";
	/**
	 * 进入私人房输入密码面板
	 */
	public static EnterRoomPwdPanel = "EnterRoomPwdPanel";

	/**
	 * 设置面板
	 */
	public static SetPanel = "SetPanel";
	/**
	 * 玩法面板
	 */
	public static GameRulePanel = "GameRulePanel";
	/**
	 *  创建私人房输入密码面板
	 */
	public static CreateRoomPwdPanel = "CreateRoomPwdPanel";
	/**
	 * 保险箱面板
	*/
	public static SafeBoxPanel = "SafeBoxPanel";
	/**
    * 保险箱创建面板
    */
	public static SafeCreatePanel = "SafeCreatePanel";
	/**
	 * 好友面板
	*/
	public static FriendPanel = "FriendPanel";
	/**
	 * 邮件面板
	 */
	public static MailPanel = "MailPanel";
	/**
	 * 聊天面板
	 */
	public static ChatPanel = "ChatPanel";
	/**
	 * 我的奖品面板
	 */
	public static PrizePanel = "PrizePanel";
	/**
	 * 锦标赛面板
	*/
	public static ChampionshipPanel = "ChampionshipPanel";
	/**
	 * 成就信息面板
	 */
	public static AchievementItemPanel = "AchievementItemPanel";
	/**
	 * 邀请好友面板
	*/
	public static InviteFriendPanel = "InviteFriendPanel"
	/**
	 * 排行榜面板
	 */
	public static RankPanel = "RankPanel";
	/**
	 *邀请信息面板
	*/
	public static InviteMsgPanel = "InviteMsgPanel";
	/**
	 * 任务面板
	*/
	public static AssignmentPanel = "AssignmentPanel";
	/**
	 * 战局中的任务面板
	 */
	public static AchievementInGamePanel = "AchievementInGamePanel";
	/**
	 *锦标赛报名成功面板
	*/
	public static JoinChampionshipSuccessPanel = "JoinChampionshipSuccessPanel";
	/**
	 * 加注面板
	*/
	public static AddChipsPanel = "AddChipsPanel";
	/**
	 * 牌局面板
	 */
	public static GamblingPanel = "GamblingPanel";
	/**
	 * 锦标赛赛事详情信息面板
	*/
	public static ChampionshipInfoPanel = "ChampionshipInfoPanel";
	/**
	 * 买入游戏面板
	*/
	public static BuyAccessGamePanel = "BuyAccessGamePanel";
	/**
     * 重购/增购面板
     */
	public static ChampionshipBuyChipsPanel = "ChampionshipBuyChipsPanel";
	/**
	 * 活动中心面板
	 */
	public static ActivityPanel = "ActivityPanel";
	/**
	 * 活动页面（只有一张图片）
	 */
	public static SimplePicturePanel = "SimplePicturePanel";
	/**
	 * 活动页面（具有图文内容的活动）
	 */
	public static NormalActivityPanel = "NormalActivityPanel";
	/**
	 * 首充活动面板
	 */
	public static FirstPayPanel = "FirstPayPanel";
	/**
	 * 赛事1分钟开始提醒面板
	*/
	public static MinuteRemindPanel = "MinuteRemindPanel";
	/**
	 * 赛事20秒开始提醒面板
	*/
	public static SecondRemindPanel = "SecondRemindPanel";
	/**
	 * 签到面板
	*/
	public static SignInPanel = "SignInPanel";
	/**
	 * 计时奖励面板
	*/
	public static TimeAwardPanel = "TimeAwardPanel";
	/**
	 * 计时奖励可领取奖励提醒面板
	*/
	public static GetTimeAwardRemindPanel = "GetTimeAwardRemindPanel";
	/**
	 * MTT结束结算面板
	*/
	public static MTTOverPanel = "MTTOverPanel";
	/**
	 * 手牌竞猜面板
	*/
	public static GuessPanel = "GuessPanel";
	/**
	 * 我的奖品订单确定面板
	*/
	public static PrizeOrderSurePanel = "PrizeOrderSurePanel";
	/**
	 * 横幅提醒面板
	*/
	public static ThreeMinRemindPanel = "ThreeMinRemindPanel";
	/**
	 * 金币不足面板
	 */
	public static GoldShortagePanel = "GoldShortagePanel";
	/**
	 * 订购详情面板
	 */
	public static OrderDetailPanel = "OrderDetailPanel";
	/**
	 * 手机号注册面板
	 */
	public static RegisterTelPanel = "RegisterTelPanel";
	/**
	 * 手机号登录面板
	 */
	public static LoginTelPanel = "LoginTelPanel";
	/**
	 * 绑定账号面板
	 */
	public static BindAccountPanel = "BindAccountPanel";
	/**
	 * 绑定手机面板
	 */
	public static BindPhonePanel = "BindPhonePanel";
	/**
 	 * 账号找回密码面板
  	*/
	public static AccountRetrievePwdPanel = "AccountRetrievePwdPanel";
	/**
 	 * 保险箱找回密码面板
  	*/
	public static SafeBoxRetrievePwdPanel = "SafeBoxRetrievePwdPanel";
	/**
 	 * 游戏介绍面板
  	*/
	public static GuideGameDescriptionPanel = "GuideGameDescriptionPanel";
	/**
 	 * 游戏牌型面板
  	*/
	public static GuideCardTypeIntroPanel = "GuideCardTypeIntroPanel";
	/**
 	 * 游戏引导选择面板
  	*/
	public static GuideChoosePanel = "GuideChoosePanel";
	/**
 	 * 游戏引导领取金币面板
  	*/
	public static GuideBringGoldPanel = "GuideBringGoldPanel";
	/**
 	 * 游戏引导问答面板
  	*/
	public static GuideQuestionPanel = "GuideQuestionPanel";
	/**
 	 * 游戏引导答题答错面板
  	*/
	public static GuideAnswerErrorPanel = "GuideAnswerErrorPanel";
	/**
 	 * 百人大战面板
  	*/
	public static HundredWarPanel = "HundredWarPanel";
	/**
 	 * 百人大战结算面板
  	*/
	public static HundredWarOverPanel = "HundredWarOverPanel";
	/**
 	 * 百人大战无座玩家面板
  	*/
	public static HundredWarNoSeatPlayerPanel = "HundredWarNoSeatPlayerPanel";
	/**
 	 * 百人大战进入面板
  	*/
	public static HundredWarRoomPanel = "HundredWarRoomPanel";
	/**
	 * 百人大战胜负走势面板
	 */
	public static HundredWarTrendPanel = "HundredWarTrendPanel";
	/**
	 * 百人大战帮助面板
	 */
	public static HundredWarHelpPanel = "HundredWarHelpPanel";
	/**
	 * 百人大战庄家列表面板
	 */
	public static HundredWarBankerListPanel = "HundredWarBankerListPanel";
	/**
	 * 百人大战任务面板
	 */
	public static AchievementInHundredWarPanel = "AchievementInHundredWarPanel";
	/**
	 * 百人大战奖池面板
	 */
	public static HundredWarPoolInfoPanel = "HundredWarPoolInfoPanel";
	/**
	 * 公告面板
	 */
	public static ImgNotifyPanel = "ImgNotifyPanel";
	/**
	 * 德州转转转活动面板
	 */
	public static ShimTaeYoonPanel = "ShimTaeYoonPanel";
	/**
	 * 欢乐豪礼
	 */
	public static HappyGiftPanel = "HappyGiftPanel";
	/**
	 * 德州转转转活动帮助面板
	 */
	public static ShimTaeYoonHelpPanel = "ShimTaeYoonHelpPanel";
	/**
	 * 德州转转转活动排行面板
	 */
	public static ShimTaeYoonRankPanel = "ShimTaeYoonRankPanel";
	/**
	 * 德州转转转活动排行面板
	 */
	public static ShimTaeYoonResultPanel = "ShimTaeYoonResultPanel";
	/**
	 * 月卡活动面板
	 */
	public static MonthCardPanel = "MonthCardPanel";
	/**
	 * 自动登录面板面板
	 */
	public static AutoLoginPanel = "AutoLoginPanel";
	/**
	 * 支付遮罩面板
	 */
	public static PayMaskPanel = "PayMaskPanel";
	/**
	 * 支付混合面板
	 */
	public static PayModePanel = "PayModePanel";
	/**
	 * 绑定手机账号面板
	 */
	public static BindPhoneAccountPanel = "BindPhoneAccountPanel";
	/**
	 * 牌局上局回顾面板
	 */
	public static GamblingReviewPanel = "GamblingReviewPanel";
	/**
	 *坐满即玩开赛提醒面板
	 */
	public static SitAndPlayStartRemindPanel = "SitAndPlayStartRemindPanel";
	/**
	 * 破产补助活动面板
	 */
	public static BankruptSubsidyPanel = "BankruptSubsidyPanel";
	/**
	 * 坐满即玩结束面板
	 */
	public static SitAndPlayOverPanel = "SitAndPlayOverPanel";
	/**
	 * 游戏中破产补助界面
	 */
	public static BankruptSubsidyInGamePanel = "BankruptSubsidyInGamePanel";
	/**
	 * 更多玩法面板
	 */
	public static MorePlayPanel = "MorePlayPanel";
	/**
	 * 奥马哈牌型面板
	 */
	public static OmahaCardTypePanel = "OmahaCardTypePanel";
	/**
	 * 绑定手机奖励面板
	 */
	public static BindPhoneAwardPanel = "BindPhoneAwardPanel";
	/**
	 * 邀请活动面板
	 */
	public static InvitePanel = "InvitePanel";
	/**
	 * 礼物信息面板
	 */
	public static GiftItemPanel = "GiftItemPanel";
	/**
	 * 新人礼面板
	 */
	public static NewGiftPanel = "NewGiftPanel";
	/**
	 * 分享抽奖活动面板
	 */
	public static ShareLuckDrawPanel = "ShareLuckDrawPanel";
	/**
	 * 新人充值礼面板
	 */
	public static NewPayGiftPanel = "NewPayGiftPanel";
	/**
	 * 微信分享选择面板
	 */
	public static ChooseShareWayPanel = "ChooseShareWayPanel";
	/**
	 *奖励领取面板
	 */
	public static BringAwardComPanel = "BringAwardComPanel";
	/**
	 * 礼物商店面板
	 */
	public static GiftShopPanel = "GiftShopPanel";
	/**
	 * 兑奖面板
	 */
	public static AwardsPanel = "AwardsPanel";
	
	//---------------运营活动move todo------------------
	/**
	 * 高级破产
	 */
	public static BankrupHighSubsidyPanel:string = "BankrupHighSubsidyPanel";
	/**
	 * 直通车&重返巅峰
	 */
	public static GoAheadHigherFieldPanel:string = "GoAheadHigherFieldPanel";
	/**
	 * 幸运任务
	 */
	public static LuckyTaskPanel:string = "LuckyTaskPanel";

	//--------------运营优化------------------------
	/**
	 * 普通场次选择面板
	 */
	public static CommonPatternPanel:string = "CommonPatternPanel";
}
/**
 * 选项卡按钮类型
 */
enum TabButtonType
{
	/**
	 * 小号两项的选项卡
	 */
	SmallOf2 = 1,
	/**
	 * 小号三项的选项卡
	 */
	SmallOf3 = 2,
	/**
	 * 大号两项的选项卡
	 */
	BigOf2 = 3,
	/**
	 * 大号三项的选项卡
	 */
	BigOf3 = 4,
	/**
	 * 大号四项的选项卡
	 */
	BigOf4 = 5,
	/**
	 * 副选项两项的选项卡
	 */
	SubOf2 = 6,
	/**
	 * 小号五项的选项卡
	 */
	SmallOf5 = 7,
	/**
	 * 手牌竞猜小号五项的选项卡
	 */
	XSmallOf5 = 8,
	/**
	 * 副选项四项的选项卡
	 */
	SubOf4 = 9,
	/**
	 * 欢乐豪礼四项选项卡
	 */
	HappyGiftOf4 = 10,
	/**
 	* 欢乐豪礼两项选项卡
 	*/
	HappyGiftOf2 = 11,
	/**
 	* 拉霸2项选项卡
 	*/
	LaBa2 = 12,
	/**
	 * 锦标赛副选项卡3项
	*/
	SubOf3 = 13,
	/**
  	* 小号四项的选项卡
  	*/
	SmallOf4 = 14,
	/**
  	* 邀请选项卡3项
  	*/
	InviteSmallOf3 = 15,
	/**
  	* 邀请选项卡4项
  	*/
	InviteSmallOf4 = 16,
}

/**
 * 项皮肤枚举
 * */
class UIRendererSkinName
{
	private static readonly ROOT_PATH: string = 'resource/skins/renderer/';
	/**
	 * 充值面板项渲染
	 */
	public static PayPanelItemRenderer = UIRendererSkinName.ROOT_PATH + "PayPanelItemRenderer.exml";
	/**
	 * 创建房间面板项渲染
	 */
	public static CreateRoomPanelRenderer = UIRendererSkinName.ROOT_PATH + "CreateRoomPanelRenderer.exml";
	/**
	 * 文本项
	 */
	public static TextRenderer = UIRendererSkinName.ROOT_PATH + "TextRenderer.exml";
	/**
	 * 我的奖品项
	 */
	public static MyAwardPanelItemRenderer = UIRendererSkinName.ROOT_PATH + "MyAwardPanelItemRenderer.exml";
	/**
	 * 商城金币项
	 */
	public static GoldItemComponent = UIRendererSkinName.ROOT_PATH + "GoldItemComponent.exml";
	/**
	 * 商城钻石项
	 */
	public static DiamondItemComponent = UIRendererSkinName.ROOT_PATH + "DiamondItemComponent.exml";
	/**
	 * 商城金币渲染项
	 */
	public static ShopGoldItemRenderer = UIRendererSkinName.ROOT_PATH + "ShopGoldItemRenderer.exml";
	/**
	 * 商城钻石渲染项
	 */
	public static ShopDiamondItemRenderer = UIRendererSkinName.ROOT_PATH + "ShopDiamondItemRenderer.exml";
	/**
	 * vip列表项
	 */
	public static VipListItemRenderer = UIRendererSkinName.ROOT_PATH + "VipListItemRenderer.exml";
	/**
	 * 房间列表项
	 */
	public static PlayingFieldItemRenderer = UIRendererSkinName.ROOT_PATH + "PlayingFieldItemRenderer.exml";
	/**
	 * 好友列表项
	 */
	public static FriendItemRenderer = UIRendererSkinName.ROOT_PATH + "FriendItemRenderer.exml";
	/**
	 * 成就项
	 */
	public static AchievementItemRenderer = UIRendererSkinName.ROOT_PATH + "AchievementItemRenderer.exml";
	/**
	 * 邮件项
	 */
	public static MailItemRenderer = UIRendererSkinName.ROOT_PATH + "MailItemRenderer.exml";
	/**
	 * 礼物项
	 */
	public static GiftItemRenderer = UIRendererSkinName.ROOT_PATH + "GiftItemRenderer.exml";
	/**
	 * 好友请求项
	 */
	public static FriendRequestItemRenderer = UIRendererSkinName.ROOT_PATH + "FriendRequestItemRenderer.exml";
	/**
	 * 添加好友项
	 */
	public static AddFriendItemRenderer = UIRendererSkinName.ROOT_PATH + "AddFriendItemRenderer.exml";
	/**
	 * 聊天项
	 */
	public static ChatItemRenderer = UIRendererSkinName.ROOT_PATH + "ChatItemRenderer.exml";
	/**
	 * 表情项
	 */
	public static FaceItemRenderer = UIRendererSkinName.ROOT_PATH + "FaceItemRenderer.exml";
	/**
	 * 快捷输入项
	 */
	public static FastChatItemRenderer = UIRendererSkinName.ROOT_PATH + "FastChatItemRenderer.exml";
	/**
	 * 锦标赛赛事列表项
	 */
	public static ChampionshipItemRenderer = UIRendererSkinName.ROOT_PATH + "ChampionshipItemRenderer.exml";
	/**
	 * 锦标赛已结束赛事列表项
	 */
	public static ChampionshipOutItemRenderer = UIRendererSkinName.ROOT_PATH + "ChampionshipOutItemRenderer.exml";
	/**
	 * 邀请好友列表项
	 */
	public static InviteFriendItemRenderer = UIRendererSkinName.ROOT_PATH + "InviteFriendItemRenderer.exml";
	/**
	 * 排行榜渲染项
	 */
	public static RankItemRenderer = UIRendererSkinName.ROOT_PATH + "RankItemRenderer.exml";
	/**
	 * 我的门票项
	 */
	public static MyTicketItemRenderer = UIRendererSkinName.ROOT_PATH + "MyTicketItemRenderer.exml";
	/**
	 * 最近赛况项
	 */
	public static OutsItemRenderer = UIRendererSkinName.ROOT_PATH + "OutsItemRenderer.exml";
	/**
	 * 最近赛况折叠项
	 */
	public static OutsChildItemRenderer = UIRendererSkinName.ROOT_PATH + "OutsChildItemRenderer.exml";
	/**
	 * 任务项
	 */
	public static AssignmentItemRenderer = UIRendererSkinName.ROOT_PATH + "AssignmentItemRenderer.exml";
	/**
	 * 游戏场里的任务项
	 */
	public static AchieveInGameItemRenderer = UIRendererSkinName.ROOT_PATH + "AchieveInGameItemRenderer.exml";
	/**
	 * 锦标赛赛事信息排名项
	 */
	public static ChampionshipRankItemRenderer = UIRendererSkinName.ROOT_PATH + "ChampionshipRankItemRenderer.exml";
	/**
	 * 锦标赛赛事信息盲注项
	 */
	public static BlindItemRenderer = UIRendererSkinName.ROOT_PATH + "BlindItemRenderer.exml";
	/**
	 * 锦标赛赛事信息奖励项
	 */
	public static AwardItemRenderer = UIRendererSkinName.ROOT_PATH + "AwardItemRenderer.exml";
	/**
	 * 签到项
	*/
	public static SignInGoldItemRenderer = UIRendererSkinName.ROOT_PATH + "SignInGoldItemRenderer.exml";

	/**
	 * 活动列表渲染项
	 */
	public static ActivityItemRenderer = UIRendererSkinName.ROOT_PATH + "ActivityItemRenderer.exml";
	/**
	 * 活动奖励渲染项
	 */
	public static ActivityAwardItemRenderer = UIRendererSkinName.ROOT_PATH + "ActivityAwardItemRenderer.exml";
	/**
	 * 计时奖励渲染项
	 */
	public static TimeAwardItemRenderer = UIRendererSkinName.ROOT_PATH + "TimeAwardItemRenderer.exml";
	/**
	 * 手牌竞猜购买渲染项
	 */
	public static GuessBuyItemRenderer = UIRendererSkinName.ROOT_PATH + "GuessBuyItemRenderer.exml";
	/**
	 * 手牌竞猜本周榜单渲染项
	 */
	public static GuessWeekItemRenderer = UIRendererSkinName.ROOT_PATH + "GuessWeekItemRenderer.exml";
	/**
	 * 手牌竞猜开奖结果渲染项
	 */
	public static GuessResultItemRenderer = UIRendererSkinName.ROOT_PATH + "GuessResultItemRenderer.exml";
	/**
	 * 手牌竞猜购买记录渲染项
	 */
	public static GuessRecordItemRenderer = UIRendererSkinName.ROOT_PATH + "GuessRecordItemRenderer.exml";
	/**
	 * 引导答案渲染项
	 */
	public static GuideQuestionItemRenderer = UIRendererSkinName.ROOT_PATH + "GuideQuestionItemRenderer.exml";
	/**
	 * 百人大战渲染项
	 */
	public static HundredWarItemRenderer = UIRendererSkinName.ROOT_PATH + "HundredWarItemRenderer.exml";
	/**
	 * 百人大战无座玩家渲染项
	 */
	public static HundredWarNoSeatItemRenderer = UIRendererSkinName.ROOT_PATH + "HundredWarNoSeatItemRenderer.exml";
	/**
	 * 引导回答错误渲染项
	 */
	public static GuideAnswerErrorItemRenderer = UIRendererSkinName.ROOT_PATH + "GuideAnswerErrorItemRenderer.exml";
	/**
	 *  百人大战胜负走势渲染项
	 */
	public static HundredWarTrendItemRenderer = UIRendererSkinName.ROOT_PATH + "HundredWarTrendItemRenderer.exml";
	/**
	 * 百人大战庄家列表渲染项
	 */
	public static HundredWarBankerItemRenderer = UIRendererSkinName.ROOT_PATH + "HundredWarBankerItemRenderer.exml";
	/**
	 * 百人大战任务渲染项
	 */
	public static AchieveInHundredWarItemRenderer = UIRendererSkinName.ROOT_PATH + "AchieveInHundredWarItemRenderer.exml";
	/**
	 * 百人大战注数渲染项
	 */
	public static HWBetItemRenderer = UIRendererSkinName.ROOT_PATH + "HWBetItemRenderer.exml";
	/**
	 * 百人大战奖池中奖列表项
	 */
	public static HundredWarPoolPrizeItemRenderer = UIRendererSkinName.ROOT_PATH + "HundredWarPoolPrizeItemRenderer.exml";
	/**
	 * 德州转转转活动列表项
	 */
	public static ShimTaeYoonItemRenderer = UIRendererSkinName.ROOT_PATH + "ShimTaeYoonItemRenderer.exml";
	/**
	 * 欢乐豪礼商品项
	 */
	public static HappyGiftItemRenderer = UIRendererSkinName.ROOT_PATH + "HappyGiftItemRenderer.exml";
	/**
	 * 欢乐豪礼排行项
	 */
	public static HappyGiftRankRenderer = UIRendererSkinName.ROOT_PATH + "HappyGiftRankRenderer.exml";
	/**
	 * 欢乐豪礼兑换使用项
	 */
	public static HappyGiftUseRenderer = UIRendererSkinName.ROOT_PATH + "HappyGiftUseRenderer.exml";
	/**
	 * 德州转转转活动帮助列表项
	 */
	public static ShimTaeYoonHelpItemRenderer = UIRendererSkinName.ROOT_PATH + "ShimTaeYoonHelpItemRenderer.exml";
	/**
	 * 德州转转转活动排名列表项
	 */
	public static ShimTaeYoonRankItemRenderer = UIRendererSkinName.ROOT_PATH + "ShimTaeYoonRankItemRenderer.exml";
	/**
	 * 月卡列表项
	 */
	public static MonthCardItemRenderer = UIRendererSkinName.ROOT_PATH + "MonthCardItemRenderer.exml";
	/**
	 * 牌局上局回顾列表项
	 */
	public static GamblingReviewItemRenderer = UIRendererSkinName.ROOT_PATH + "GamblingReviewItemRenderer.exml";
	/**
	 * 更多玩法项
	 */
	public static MorePlayItemRenderer = UIRendererSkinName.ROOT_PATH + "MorePlayItemRenderer.exml";
	/**
	 * 绑定手机奖励项
	 */
	public static BindPhoneAwardItemRenderer = UIRendererSkinName.ROOT_PATH + "BindPhoneAwardItemRenderer.exml";
	/**
	 * 邀请活动分享id项
	 */
	public static InviteItemRenderer = UIRendererSkinName.ROOT_PATH + "InviteItemRenderer.exml";
	/**
	 * 邀请活动领取金豆项
	 */
	public static InviteImazamoxItemRenderer = UIRendererSkinName.ROOT_PATH + "InviteImazamoxItemRenderer.exml";
	/**
	 * 邀请活动领取金币项
	 */
	public static InviteGoldItemRenderer = UIRendererSkinName.ROOT_PATH + "InviteGoldItemRenderer.exml";
	/**
	 * 新人礼项
	 */
	public static NewGiftItemRenderer = UIRendererSkinName.ROOT_PATH + "NewGiftItemRenderer.exml";
	/**
	 * 分享中奖信息项
	 */
	public static ShareLuckDrawItemRenderer = UIRendererSkinName.ROOT_PATH + "ShareLuckDrawItemRenderer.exml";
	/**
	 * 兑换奖品项
	 */
	public static GoldenBeanAwardItemRenderer = UIRendererSkinName.ROOT_PATH + "GoldenBeanAwardItemRenderer.exml";
	/**
	 * 兑换记录项
	 */
	public static GoldenBeanRecordItemRenderer = UIRendererSkinName.ROOT_PATH + "GoldenBeanRecordItemRenderer.exml";
	/**
	 * 礼物商店物品项
	 */
	public static GiftShopItemRenderer = UIRendererSkinName.ROOT_PATH + "GiftShopItemRenderer.exml";
	/**
	 * 服务器选择项
	 */
	public static ServerSelectItemRenderer = UIRendererSkinName.ROOT_PATH + "ServerSelectItemRenderer.exml";
}

/**
 * 组件皮肤枚举
 */
class UIComponentSkinName
{
	private static readonly ROOT_PATH: string = 'resource/skins/component/';
	/**
	 * 输入数字组件
	 */
	public static NumComponent: string = UIComponentSkinName.ROOT_PATH + "NumComponent.exml";
	/**
	 * 成就数字组件
	 */
	public static ImageNumComponent: string = UIComponentSkinName.ROOT_PATH + "ImageNumComponent.exml";
	/**
	* 小选项卡按钮-3
	*/
	public static tabComponentButton3: string = UIComponentSkinName.ROOT_PATH + "tabComponentButton3.exml";
	/**
	* 小选项卡按钮-4
	*/
	public static tabComponentButton4: string = UIComponentSkinName.ROOT_PATH + "tabComponentButton4.exml";
	/**
	 * 小选项卡按钮-2
	 */
	public static tabComponentButton2: string = UIComponentSkinName.ROOT_PATH + "tabComponentButton2.exml";
	/**
	 * 小选项卡按钮-5
	 */
	public static TabComponentButton5: string = UIComponentSkinName.ROOT_PATH + "tabComponentButton5.exml";
	/**
	 * 手牌竞猜小选项卡按钮-5
	 */
	public static TabComponentButtonSm5: string = UIComponentSkinName.ROOT_PATH + "tabComponentButtonSm5.exml";
	/**
	 * 排行榜副选项卡按钮-2
	 */
	public static rankTabComponentButton2: string = UIComponentSkinName.ROOT_PATH + "rankTabComponentButton2.exml";
	/**
	 * 锦标赛副选项卡按钮-3
	 */
	public static tabComponentSubBtn3: string = UIComponentSkinName.ROOT_PATH + "tabComponentSubBtn3.exml";
	/**
	 * 拉霸副选项卡按钮-4
	 */
	public static laBaRankTabComponentBtn4: string = UIComponentSkinName.ROOT_PATH + "laba/laBaRankTabComponentBtn4.exml";
	/**
	 * 拉霸选项卡按钮-2
	 */
	public static laBaTabCompontBtn2: string = UIComponentSkinName.ROOT_PATH + "laba/laBaTabCompontBtn2.exml";
	/**
	 * 大选项卡按钮-2
	 */
	public static tabComponentButtonBig2: string = UIComponentSkinName.ROOT_PATH + "tabComponentButtonBig2.exml";
	/**
	 * 大选项卡按钮-3
	 */
	public static tabComponentButtonBig3: string = UIComponentSkinName.ROOT_PATH + "tabComponentButtonBig3.exml";
	/**
	 * 大选项卡按钮-4
	 */
	public static tabComponentButtonBig4: string = UIComponentSkinName.ROOT_PATH + "tabComponentButtonBig4.exml";
	/**
	 * 手牌竞猜注数单选
	 */
	public static guessAnteToggleSwitchSkin: string = UIComponentSkinName.ROOT_PATH + "guess/guessAnteToggleSwitchSkin.exml";
	/**
	 * 手牌竞猜购买局数单选
	 */
	public static guessAnteBuyRadioButtonSkin: string = UIComponentSkinName.ROOT_PATH + "guess/guessAnteBuyRadioButtonSkin.exml";
	/**
 	* 获得道具组件
 	*/
	public static GetItemComponent = UIComponentSkinName.ROOT_PATH + "item/GetItemComponent.exml";
	/**
	 * 欢乐豪礼活动四项选项卡
	 */
	public static happyGiftTabtButton4 = UIComponentSkinName.ROOT_PATH + "happyGiftTabtButton4.exml";
	/**
	 * 欢乐豪礼活动两项选项卡
	 */
	public static happyGiftTabtButton2 = UIComponentSkinName.ROOT_PATH + "happyGiftTabtButton2.exml";
	/**
	 *邀请三项选项卡
	 */
	public static tabComponentInviteBtn3 = UIComponentSkinName.ROOT_PATH + "tabComponentInviteBtn3.exml";
	/**
	 *邀请四项选项卡
	 */
	public static tabComponentInviteBtn4 = UIComponentSkinName.ROOT_PATH + "tabComponentInviteBtn4.exml";
	//===========================================================
	// cardface
	//===========================================================
	/**
	 * 操作CD组件
	 */
	public static GamblingCdComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/GamblingCdComponent.exml";
	/**
	 * 牌局玩家头像组件
	 */
	public static GamblingHeadComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/GamblingHeadComponent.exml";
	/**
     * 牌局玩家坐下效果
    */
	public static DownEfffectComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/DownEfffectComponent.exml";
	/**
	 * 牌面显示组件
	 */
	public static CardFaceComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/CardFaceComponent.exml";
	/**
	 * 筹码显示组件
	 */
	public static ChipsShowComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/ChipsShowComponent.exml";
	/**
	 * 单图片筹码显示组件
	 */
	public static ChipsSingleShowComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/ChipsSingleShowComponent.exml";
	/**
	 * 操作组件
	 */
	public static GamblingActionComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/GamblingActionComponent.exml";
	/**
	 * 锦标赛等待
	 */
	public static GamblingMatchWaitComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/GamblingMatchWaitComponent.exml";
	/**
	 * 牌局训练营引导组件
	 */
	public static GamblingGuideComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/GamblingGuideComponent.exml";
	/**
	 * 牌局引导玩法组件
	 */
	public static GamblingGuidePlayWayComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/GamblingGuidePlayWayComponent.exml";
	/**
	 * 牌局锦标赛组件1
	 */
	public static GamblingMatchComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/GamblingMatchComponent.exml";
	/**
	 * 牌局锦标赛组件2
	 */
	public static GamblingMatchBlindComponent: string = UIComponentSkinName.ROOT_PATH + "gambling/GamblingMatchBlindComponent.exml";
	/**
	 * 红点通知组件
	 */
	public static NotifyComponent: string = UIComponentSkinName.ROOT_PATH + "NotifyComponent.exml";
	/**
     * 6位密码组件
     */
	public static PwdComponent: string = UIComponentSkinName.ROOT_PATH + "PwdComponent.exml";
	/**
	 * 等待下一局组件
	 */
	public static WaitNextRoundComponent: string = UIComponentSkinName.ROOT_PATH + "WaitNextRoundComponent.exml";
	/**
	 * 正在请求组件
	 */
	public static ReqScrollerbotton: string = UIComponentSkinName.ROOT_PATH + "ReqScrollerbotton.exml";
	/**
	 * 引导文字说明组件
	 */
	public static GuideTipsComponent: string = UIComponentSkinName.ROOT_PATH + "guide/GuideTipsComponent.exml"
	/**
	 * 引导提示组件
	 */
	public static GuidePromptComponent: string = UIComponentSkinName.ROOT_PATH + "guide/GuidePromptComponent.exml";
	/**
	 * 百人大战数字组件
	 */
	public static HundredWarNumComponent: string = UIComponentSkinName.ROOT_PATH + "hundredWar/HundredWarNumComponent.exml";
	/**
	 * 首充活动项
	 */
	public static FirstPayItemComponent = UIComponentSkinName.ROOT_PATH + "FirstPayItemComponent.exml";
	/**
	 * 奥马哈牌型按钮组件
	 */
	public static OmahaCardTypeBtnComponent = UIComponentSkinName.ROOT_PATH + "gambling/OmahaCardTypeBtnComponent.exml";
}