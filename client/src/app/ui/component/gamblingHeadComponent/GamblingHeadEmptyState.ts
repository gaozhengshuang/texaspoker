/**
 * 空状态 后继状态 --->坐下
 */
class GamblingHeadEmptyState extends BaseGamblingHeadState
{
	public run(parms: any)
	{
		super.run(parms);
		if (this.context.bindData)
		{
			game.Console.log(this.context.bindData.userInfo.name + "已站起");
		}
		this.context.showMask(true);
		this.context.setEmpty();
	}
}