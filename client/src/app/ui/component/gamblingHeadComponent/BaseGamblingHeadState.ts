/**
 * 头像组件状态执行接口 大部分的状态都可以直接切换到站起状态
 */
abstract class BaseGamblingHeadState
{
	public context: GamblingHeadComponent;
	public constructor(context: GamblingHeadComponent)
	{
		this.context = context;
	}
	public run(parms:any)
	{
		this.context.hideAll();
	}
}
/**
 * 行牌流程头像状态枚举
 */
enum GamblingHeadStateType
{
	/**
	 * 空状态 无人的
	 */
	Empty = 0,
	/**
	 * 坐下
	 */
	SitDown = 1,
	/**
	 * 等待下一局
	 */
	WaitNext = 2,
	/**
	 * 牌局开始
	 */
	RoundStart = 3,
	/**
	 * 等待说话
	 */
	WaitAction = 4,
	/**
	 * 说话中
	 */
	OnAction = 5,
	/**
	 * 已说话(不包括弃牌)
	 */
	Actioned = 6,
	/**
	 * 弃牌
	 */
	FoldCard = 7,
	/**
	 * 比牌
	 */
	ThanTheCard = 8,
}