/**
 * 坐下状态  后继状态------->发牌|等待下一局|等待操作|说话|站起
 */
class GamblingHeadSitDownState extends BaseGamblingHeadState
{
	public run(parms: any)
	{
		super.run(parms);

		if (this.context.bindData)
		{
			this.context.showMask(true);
			this.context.showBase();
			this.context.chipsSingleShowComponent.visible = false;

			// if (this.context.bindData.userInfo)
			// {
			// 	this.context.infoLabel.text = this.context.bindData.userInfo.name;
			// }
			// this.context.chipsLabel.text = game.MathUtil.formatNum(this.context.bindData.bankRoll);
			this.context.chipsLabel.text = PlayerInfo.getStateDes(this.context.bindData.state); //坐下等待
			this.context.showStateGroup(false);
			//game.QinLog.log(this.context.bindData.userInfo.name + "刚坐下");
			//	game.QinLog.log("坐下显示筹码：" + this.context.bindData.bankRoll + this.context.bindData.userInfo.name);
		}
	}
}