
/**
 * 排行榜类型
 */
enum RankType
{
	/**
	 * 财富
	 */
	Gold = 1,
	/**
	 * 好友财富
	 */
	FriendGold = 2,
	/**
	 * 等级
	 */
	Level = 3,
	/**
	 * 好友等级
	 */
	FriendLevel = 4,
	/**
	 * Vip
	 */
	Vip = 5,
	/**
	 * 活动排行榜
	*/
	Activity = 100,
}
/**
 * 欢乐豪礼排行子类型
 */
enum HappyGiftRankSubType
{
	/**
	 * 总榜
	 */
	All = 1,
	/**
	 * 好友榜
	 */
	Friend = 2,
}
/**
 * 德州转转转活动子类型
 */
enum ShimTaeYoonRankType
{
	/**
	 * 今天
	 */
	Today = 0,
	/**
	 * 昨天
	 */
	Yesterday = 1,
}

enum RankName
{
    /**
     * 冠军
     */
	Champion = 1,
    /**
     * 亚军
     */
	Runnerup = 2,
    /**
     * 季军
     */
	Third = 3
}

enum RankChange
{
    /**
     * 不变
     */
	NoChange = 1,
    /**
     * 上升
     */
	Up = 2,
    /**
     * 下降
     */
	Down = 3
}
