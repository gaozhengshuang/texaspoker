/**
 * 性别
 */
enum Sex
{
	/**
	 * 未知
	 */
    Unknown = 0,
	/**
	 * 男性
	 */
    Male = 1,
	/**
	 * 女性
	 */
    Female = 2
}

enum VipType
{
    /**
     * 无会员
     */
    NoVip = 0,
    /**
     * 普通会员
     */
    Vip = 1,
    /**
     * 年费会员
     */
    YearVip = 2,
}

/**
 * 玩家状态
 */
enum UserState
{
	/**
	 * 离线
	 */
    Offline = 0,
	/**
	 * 在大厅
	 */
    InGamehall = 1,
	/**
	 * 在游戏场
	 */
    InGame = 2,
	/**
	 * 在比赛场
	 */
    InMatch = 3,
	/**
	 * 在百人大战
	 */
    InHundredWar = 4,
	/**
	 * 在奥马哈
	 */
    InOmaha = 5,
	/**
	 * 在游戏场私人房
	 */
    InGamePerson = 6,
	/**
	 * 在奥马哈私人房
	 */
    InOmahaPerson = 7,
}