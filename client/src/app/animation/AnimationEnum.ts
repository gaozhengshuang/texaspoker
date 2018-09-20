/**
 * 动画类型
 */
enum AnimationType
{
	/**
	 * 公共牌出现
	 */
	CardFaceBoardAppear = 1,
	/**
	 * 卡牌亮牌
	 */
	CardFaceBright = 2,
	/**
	 * 卡牌移动到某点
	 */
	CardFaceMoveToPoint = 3,
	/**
	 * 卡牌翻牌
	 */
	CardFaceTurnToFace = 4,
	/**
	 * 本家手牌动画1
	 */
	SelfCard1Appear = 5,
	/**
	 * 本家手牌动画2
	 */
	SelfCard2Appear = 6,
	/**
	 * 奥马哈本家手牌动画1
	 */
	OmahaSelfCard1Appear = 7,
	/**
	 * 奥马哈本家手牌动画2
	 */
	OmahaSelfCard2Appear = 8,
	/**
	 * 奥马哈本家手牌动画3
	 */
	OmahaSelfCard3Appear = 9,
	/**
	 * 奥马哈本家手牌动画4
	 */
	OmahaSelfCard4Appear = 10,
	/**
	 * 发牌/弃牌 动画
	 */
	FlopCard = 50,
	/**
	 * 牌局面板移动
	 */
	GamblingGameGroupMove = 100,
	/**
	 * 通用基于当前位置移动到某点
	 */
	CommonMoveToPointByNowPos = 101,
	/**
	 * 通用基于相对位置移动
	 */
	CommonMoveToRelativelyPos = 102,
	/**
	 * 赢取筹码
	 */
	WinChips = 103,
	/**
	 * 弃牌动画
	 */
	FoldCard = 104,
	/**
	 * 透明度渐变
	 */
	Alpha = 105,


	/**********粒子特效**********/
	/**
	 * 获得金币
	 */
	GetCoin = 301,
	/**
	 * 赢牌
	 */
	WinCard = 302,
	/**
	 * allin
	 */
	Allin0 = 303,
	Allin1 = 304,
	/**
	 * 百人大战玩家结算
	 */
	HundredWarPlayer = 305,
	/**
	 * 百人大战庄家结算
	 */
	HundredWarBanker = 306,
	/**
	 * 百人大战奖池
	 */
	HundredWarPool = 307,
	/**
	 * 百人大战爆奖池
	 */
	HundredWarPoolDes = 308,
	/**
	 * 赢牌2
	 */
	WinCard2 = 309,
	WinCard3 = 310,
	WinCard4 = 311,
}
/**
 * 极速动画名
 */
class BoneAnimeName
{
	/**
	 * 流光
	 */
	public static HallLiuGuang = "liuguang";
}