/**
 * 弃牌状态 后继状态----->亮牌|等待下一局|站起
 */
class GamblingHeadFoldState extends BaseGamblingHeadState
{
	public run(parms:any)
	{
		super.run(parms);
		if (this.context.bindData)
		{
			this.context.showMask(true);
			this.context.showBase();

			this.context.showHaveCardImg(false);
			this.context.showBankRoll();
			this.context.refreshState();
			//game.QinLog.log(this.context.bindData.userInfo.name + "已弃牌");
		}
	}
}