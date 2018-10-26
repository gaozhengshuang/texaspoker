/**
 * 成就/任务组
 */
enum AchieveGroup
{
	/**
	 * 金币达人
	 */
	GoldGroup = 101,
	/**
	 * 好友达人
	 */
	FriendGroup = 121,
	/**
	 * 等级达人
	 */
	LevelGroup = 141,
	/**
	 * 对子达人
	 */
	OnePairGroup = 161,
	/**
	 * 两对达人
	 */
	TwoPairsGroup = 181,
	/**
	 * 三条达人
	 */
	ThreeOfAKindGroup = 201,
	/**
	 * 顺子达人
	 */
	StraightGroup = 221,
	/**
	 * 同花达人
	 */
	FlushGroup = 241,
	/**
	 * 葫芦达人
	 */
	FullhouseGroup = 261,
	/**
	 * 四条达人
	 */
	FourOfAKindGroup = 281,
	/**
	 * 同花顺达人
	 */
	StraightFlushGroup = 301,
	/**
	 * 皇家同花顺达人
	 */
	RoyalFlushGroup = 321,
	/**
	 * 初级场对局
	 */
	PrimaryPatternGroup = 1001,

	/**
	 * 中级场对局
	*/
	MiddlePatternGroup = 1021,
	/**
	 * 高级场对局
	*/
	HighPatternGroup = 1041,
	/**
	 * 成功参与MTT锦标赛
	 */
	JoinMTTGroup = 1061,
	/**
	 * 胜利
	 */
	WinGroup = 2001,
	/**
	 * 在MTT锦标赛内赢次冠军
	 */
	WinMTTGroup = 2021,
	/**
	 * 等级提升
	 */
	LevelUpGroup = 3001,
	/**
	 * 百人大战欢乐场对局
	 */
	HWFunPatternGroup = 1081,
	/**
	 * 百人大战富豪场对局
	 */
	HWRichPatternGroup = 1101,
	/**
	 * 百人大战胜利
	 */
	WinHWGroup = 2041,
	/**
	 * 幸运任务1
	 */
	LuckyGroup1 = 4001,
	/**
	 * 幸运任务2
	 */
	LuckyGroup2 = 4002,
	/**
	 * 幸运任务3
	 */
	LuckyGroup3 = 4003,
}

/**
 * 成就类型
 */
enum AchieveType
{
	/**
	 * 牌局结束
	 */
	PlayOver = 0,
	/**
	 * 金币
	 */
	Gold = 1,
	/**
	 * 好友
	 */
	Friend = 2,
	/**
	 * 等级
	 */
	Level = 3,
	/**
	 * 牌型
	 */
	CardType = 4,
	/**
	 * 注册并登录游戏
	 */
	Register = 5,
	/**
	 * 下载手机APP（使用APP登录）
	 */
	DownLoadApp = 6,
	/**
	 * 绑定邀请码额外获得，参数1：进度（前置任务数）参数2：前置任务
	 */
	BindInviteExtra = 7,
	/**
	 *  游戏场（初级场，中级场，高级场）
	 */
	PlayPattern = 101,
	/**
	 * mtt锦标赛成功参与
	 */
	PlayMtt = 102,
	/**
	 * 胜利
	 */
	Win = 201,
	/**
	 * mtt锦标赛获得冠军
	 */
	WinMtt = 202,
	/**
	 * 参与百人大战
	 */
	PlayHundredWar = 301,
	/**
	 * 百人大战胜利
	 */
	WinHundredWar = 303,
}
/**
 * 星期枚举
 */
enum WeekDay
{
	Sunday = 0,
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6
}
/**
 * 任务显示场次
 */
enum AchieveShowPattern
{
	/**
	 * 全部
	 */
	All = 0,
	/**
	 * 初级场
	*/
	PrimaryPattern = 1,
	/**
	 * 中级场
	*/
	MiddlePattern = 2,
	/**
	 * 高级场
	*/
	HighPattern = 3,
	/**
	 * 全部场
	 */
	AllPattern = 4,
	/**
	 * 比赛场
	 */
	Match = 21,
	/**
	 * 百人大战全部场
	 */
	HundredWarAll = 40,
	/**
	 * 百人大战欢乐场
	 */
	HundredWarFun = 41,
	/**
	 * 百人大战富豪场
	 */
	HundredWarRich = 42
}

enum AchieveTag
{
    /**
     * 成就
     */
	Achievement = 0,
    /**
     * 任务
     */
	Quest = 1
}
enum AchieveDailyType
{
    /**
     * 每日任务
     */
	Daily = 1,
    /**
     * 每周任务
     */
	Weekly = 2,
    /**
     * 成长任务
     */
	GrowUp = 3,
}

/**
 * 动态任务类型，可以动态接取
 */
enum DynamicTaskType
{
	/**
	 * 幸运任务
	 */
	Lucky = 1,
}