enum LoginMode
{
	/// <summary>
	/// 游客登录
	/// </summary>
	Guest = 0,
	/// <summary>
	/// 账号登录
	/// </summary>
	Account = 1,
	/// <summary>
	/// token登录
	/// </summary>
	Token = 2,
	/// <summary>
	/// token调试登录
	/// </summary>
	TokenDebug = 3,
}
/**
 * 文本信息ID
 */
enum TextFixedId
{
	None = 0,
	/**
	 * 用户协议
	 */
	UserAngreement = 1,

	/**
	 * 手牌竞猜帮助
	*/
	GuessHelp = 3,

	/**
	 * 百人大战规则
	 */
	HundredWarRule = 4,
	/**
	 * 百人大战奖池说明
	 */
	HundredWarPrize = 5,
	/**
	 * 引导玩法
	 */
	GuidePlayWay = 7,
	/**
	* 玩法
	*/
	PlayWay = 2,
	/**
	 * 版本信息 
	 */
	Version = 201,
	/**
	 * 信息
	 */
	Info = 301,
	/**
	 * 论坛
	 */
	Forum = 302,
	/**
	 * QQ群
	 */
	QQ = 303,
	/**
	 * 客服电话
	 */
	CustomerService = 304,
	/**
	 * 欢乐豪礼说明
	 */
	HappyGiftHelp = 8,
}
enum FriendReceiveType
{
	/**
	* 拒绝
	*/
	Reject = 0,
	/**
	 * 接受
	*/
	Receive = 1,
}
/**
 * 道具固定id
 */
enum ItemFixedId
{
	/**
	 * 金币
	 */
	gold = 1,
	/**
	 * 钻石
	 */
	diamond = 2,
	/**
	 * vip经验
	 */
	vipExp = 3,
	/**
	 * 经验
	 */
	exp = 4,
	/**
	 * vip
	 */
	vip = 5,
	/**
	 * 年vip
	 */
	yearVip = 6,
	/**
	 * 金豆
	 */
	GoldenBean = 402,
}
enum FriendInfoType
{
	/**
	 * 接收好友申请
	 */
	Receive = 1,
	/**
	 * 发送好友申请
	 */
	Send = 2
}
enum CostType
{
	/**
	 * 消耗类型为金币
	*/
	Gold = 1,
	/**
	 * 消耗类型为钻石
	*/
	Diamond = 3,
	/**
	 * 消耗类型为台币
	*/
	NT$ = 10
}

enum SafeBoxOperateType
{
	/**
	 * 保险箱存入
	*/
	Save = 1,
	/**
	 * 保险箱取出
	*/
	Withdraw = 2
}

/**
 * 头像上传的系统类型
 */
class HeadUploadSystemType
{
	/**
	 * 浏览器
	 */
	public static readonly web: string = "web";
	/**
	 * 原生系统
	 */
	public static readonly native: string = "native";
}
/**
 * 自己在的房间类型枚举
*/
enum InsideRoomType
{
	/**
	 * 无
	 */
	None = 0,
	/**
	 * 游戏场
	*/
	Game = 1,
	/**
	 * 百人大战
	 */
	HundredWar = 2,
	/**
	 * 锦标赛
	 */
	Match = 3,
	/**
	 * 奥马哈
	 */
	Omaha = 4,
	/**
	 * 游戏场私人房
	 */
	GamePerson = 5,
	/**
	 * 奥马哈私人房
	 */
	OmahaPerson = 6,
}
/**
 * 系统时间类型
 */
enum SystemTimeType
{
    /**
     * 一大块的时间跨度
    */
	Normal = 1,
    /**
     * 每天
    */
	EveryDay = 2,
    /**
     * 星期的表现方式
    */
	Week = 3
}
/**
 * 比赛类型
*/
enum MatchType
{
	/**
	 * 锦标赛
	*/
	MTT = 1,
	/**
	 * 坐满即玩
	*/
	SNG = 2
}
/**
 * 支付状态
 */
class PayState
{
	/**
	 * 正常处理
	 */
	public static readonly Normal: number = 0;
	/**
	 * 全部混合使用
	 */
	public static readonly Mixed: number = 1;
	/**
	 * 只用第三方的
	 */
	public static readonly Third: number = 2;
	/**
	 * 关闭
	 */
	public static readonly Close: number = 3;
}
/**
 * 更多玩法
 */
enum MorePlay
{
	/**
	 * 奥马哈
	 */
	Omaha = 1,
	/**
	 * 百人大战
	 */
	HundredWar = 2,
}