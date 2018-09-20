/**
 * 红点通知类型
 */
enum NotifyType
{
	Null = 0,
	/**
	 * 有已报名的锦标赛
	 */
	Mtt_HaveJoinedList = 1,
	/**
	 * 有新邮件/有未领取邮件
	 */
	Mail_HaveNew = 2,
	/**
	 * 系统邮件
	 */
	Mail_HaveNewSystem = 3,
	/**
	 * 玩家邮件
	 */
	Mail_HaveNewPlayer = 4,
	/**
	 * 有未领取的每日任务
	 */
	Achieve_HaveDaily = 5,
	/**
	 * 有未领取的每周任务
	 */
	Achieve_HaveWeekly = 6,
	/**
	 * 有未领取的成长任务
	 */
	Achieve_HaveGrowUp = 7,
	/**
	 * 有未领取的任务
	 */
	Achieve_HaveNoTake = 8,
	/**
	 * 收到好友礼物
	 */
	Friend_ReceivePrize = 9,
	/**
	 * 有好友请求
	 */
	Friend_HaveNew = 10,
	/**
	 * 大厅好友按钮
	 */
	Friend_Hall = 11,
	/**
	 * 计时奖励按钮
	*/
	Gambling_TimeAward = 12,
	/**
	 * 有初级场未领取任务
	 */
	Achieve_PrimaryPattern = 13,
	/**
	 * 有中级场未领取任务
	 */
	Achieve_MiddlePattern = 14,
	/**
	 * 有高级场未领取任务
	 */
	Achieve_HighPattern = 15,
	/**
	 * 百人大战聊天按钮
	*/
	HundredWar_Chat = 16,
	/**
	 * 月卡按钮
	*/
	MonthCard = 17,
	/**
	 * 签到
	 */
	Signin = 18,
	/**
	 * 有可领取的破产补助
	 */
	BankruptSubsidy = 19,
	/**
	 * 活动红点
	 */
	ActivityRedPoint = 20,
	/**
	 * 有可领取的邀请活动的奖励
	 */
	Invite = 21,
	/**
	 * 有可领取的新人礼
	 */
	NewGift = 22,
	/**
	 * 有可用的分享抽奖次数
	 */
	Share = 23,
}