/**
 * 牌局模式
*/
enum GamblingPattern
{

	/**
	 * 快速出牌模式
	*/
	Fast = 1,
	/**
	 * 前注模式
	*/
	Ante = 2,
	/**
	 * 无上限模式
	*/
	NoUpperLimit = 3,
	/**
	 * 私人房模式
	*/
	Personal = 4,
	/**
	 * 全下/弃牌模式
	*/
	AllIn = 5
}
/**
 * 房间场次类型 对应room.json里面的type
 */
enum PlayingFieldType
{
	/**
	 * 初级场
	*/
	Primary = 1,
	/**
	 * 中级场
	*/
	Middle = 2,
	/**
	 * 高级场
	*/
	High = 3,
	/**
	 * 奥马哈初级场
	*/
	OmahaPrimary = 4,
	/**
	 * 奥马哈中级场
	*/
	OmahaMiddle = 5,
	/**
	 * 奥马哈高级场
	*/
	OmahaHigh = 6,
	/**
	 * 游戏场私人房
	 */
	PlayFieldPersonal = 11,
	/**
	 * 奥马哈私人房
	 */
	OmahaPersonal = 12,
	/**
	 * 锦标赛
	 */
	Mtt = 21,
	/**
	 * 坐满即玩
	 */
	Sng = 22,
	/**
	 * 新手引导
	 */
	Guide = 31,
	/**
	 * 新手引导玩法
	 */
	GuidePlayWay = 32,
}
/**
 * 牌型
 */
enum CardType
{
	/**
	 * 无
	 */
	None = 0,
	/**
	 * 高牌
	 */
	HighCard = 1,
	/**
	 * 一对
	 */
	OnePair = 2,
	/**
	 * 两对
	 */
	TwoPairs = 3,
	/**
	 * 3条
	 */
	ThreeOfAKind = 4,
	/**
	 * 顺子
	 */
	Straight = 5,
	/**
	 * 同花
	 */
	Flush = 6,
	/**
	 * 葫芦
	 */
	Fullhouse = 7,
	/**
	 * 4条(金刚)
	 */
	FourOfAKind = 8,
	/**
	 * 同花顺
	 */
	StraightFlush = 9,
	/**
	 * 皇家同花顺
	 */
	RoyalFlush = 10,
}
/**
 * 花色枚举
 */
enum FlushType
{
	/**
	 * 方块
	 */
	Diamonds = 1,
	/**
	 * 红桃
	 */
	Hearts = 2,
	/**
	 * 黑桃
	 */
	Spades = 3,
	/**
	 * 草花
	 */
	Clubs = 4,
}
/**
 * 破产购买枚举
*/
enum GoBrokeBuyType
{
	/**
	 * 20万金币
	*/
	GoldScale = 2,
}
/**
 * 牌局面板显示状态
 */
enum GamblingPanelStateIndex
{
	/**
	 * 无
	 */
	Null = 0,
	/**
	 * 常规
	 */
	Normal = 1,
	/**
	 * 比赛等待
	 */
	MatchWait = 2,
	/**
	 * 比赛
	 */
	Match = 3,
	/**
	 * 引导
	 */
	Guide = 4,
	/**
	 * 引导玩法
	 */
	GuidePlayWay = 5,
	/**
	 * 奥马哈
	 */
	Omaha = 8,
}
/**
 * 买入游戏状态
 */
enum BuyInGameState
{
	/**
	 * 坐下
	 */
	Sit = 1,
	/**
	 * 站起
	 */
	Stand = 2,
}
/**
 * 座位模式
 */
enum SeatMode
{
	/**
	 * 3人模式
	 */
	Three = 3,
	/**
	 * 5人模式
	 */
	Five = 5,
	/**
	 * 6人模式
	*/
	Six = 6,
	/**
	 * 9人模式
	 */
	Nine = 9,
}
/**
 * 筹码显示状态
 */
enum ChipsShowState
{
	/**
	 * 左
	 */
	Left = 1,
	/**
	 * 右
	 */
	Right = 2,
	/**
	 * 左下
	 */
	LeftDown = 3,
	/**
	 * 右下
	 */
	RightDown = 4,
	/**
	 * 上
	 */
	Top = 5,
}
/**
 * 插槽层级类型
 */
enum SlotLayerType
{
	None = 0,
	/**
	 * 正常牌局组下面
	 */
	Down = 1,
	/**
	 * 正常牌局组上面
	 */
	Up = 2,
}
/**
 * 玩家状态
 */
enum PlayerState
{
	/**
	 * 等待下一局
	 */
	WaitNext = 0,
	/**
	 * 弃牌
	 */
	Fold = 1,
	/**
	 * 过牌
	 */
	Check = 2,
	/**
	 * 加注
	 */
	Raise = 3,
	/**
	 * allin
	 */
	AllIn = 4,
	/**
	 * 跟注
	 */
	Call = 5,
	/**
	 * 盲注
	 */
	Blind = 6,
	/**
	 * 等待说话
	 */
	WaitAction = 7,
	/**
     * 取消托管
     */
	Trusteeship = 8,
	/**
     * 房间ID
    */
	RoomId = 20,
    /**
     *  玩家和POS
    */
	ThePos = 21,
    /**
     * 庄家POS
    */
	ButtonPos = 22,
    /**
     * 手牌
    */
	HandCard = 23,
    /**
     * 操作POS
    */
	SetPos = 24,
    /**
     * 公共牌
    */
	PubCard = 25,
    /**
     * 池赢得 num1 为池，num2 赢得
    */
	PoolWon = 26,
    /**
     * 亮牌
    */
	ShowCard = 27,
	/**
	 * 站起
	*/
	StandUp = 28,
	/**
	 * 正在说话 仅限客户端
	 */
	Action = 100,
	/**
	 * 空状态 仅限客户端
	 */
	Empty = 104,
}
/**
 * 上局回顾玩家位置类型
*/
enum PlayerPosType
{
    /**
     * 小盲位
    */
	Sblind = 1,
    /**
     * 大盲位
    */
	Bblind = 2,
    /**
     * 庄家位
    */
	Banker = 3,
}
/**
 * 牌局类型
 */
class GamblingType
{
	/**
	 * 普通房间
	 */
	public static readonly Common = 1;
	/**
	 * 比赛房间
	 */
	public static readonly Match = 2;
	/**
	 * 游戏场私人房间
	 */
	public static readonly PlayFieldPersonal = 3;
	/**
	 * 奥马哈私人房间
	 */
	public static readonly OmahaPersonal = 4;
    /**
     * 引导
     */
	public static readonly Guide = 5;
    /**
     * 引导玩法
     */
	public static readonly GuidePlayWay = 6;
    /**
     * 奥马哈
     */
	public static readonly Omaha = 7;
	/**
	 * 根据room表 类型获取房间类型
	 */
	public static getType(t: number): number 
	{
		switch (t) 
		{
			case PlayingFieldType.Primary:
			case PlayingFieldType.Middle:
			case PlayingFieldType.High:
				return GamblingType.Common;
			case PlayingFieldType.PlayFieldPersonal:
				return GamblingType.PlayFieldPersonal;
			case PlayingFieldType.OmahaPersonal:
				return GamblingType.OmahaPersonal;
			case PlayingFieldType.Mtt:
			case PlayingFieldType.Sng:
				return GamblingType.Match;
			case PlayingFieldType.Guide:
				return GamblingType.Guide;
			case PlayingFieldType.GuidePlayWay:
				return GamblingType.GuidePlayWay;
			case PlayingFieldType.OmahaPrimary:
			case PlayingFieldType.OmahaMiddle:
			case PlayingFieldType.OmahaHigh:
				return GamblingType.Omaha;
		}
		return GamblingType.Common;
	}
}
/**
 * 玩法类型枚举
*/
enum PlayWayType
{
	/**
	 * 游戏场
	*/
	PlayField = 1,
	/**
	 * 奥马哈
	*/
	Omaha = 2,
}