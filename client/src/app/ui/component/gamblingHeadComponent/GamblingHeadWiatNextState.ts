/**
 * 等待下一局 后继状态 -------> 一局开始状态|站起
 */
class GamblingHeadWiatNextState extends BaseGamblingHeadState
{
	public run(parms: any)
	{
		super.run(parms);
		if (this.context.bindData)
		{
			this.context.infoLabel.visible = true;
			//等待状态
			this.context.chipsLabel.text = PlayerInfo.getStateDes(this.context.bindData.state);
			this.context.showMask(true);
			this.context.chipsSingleShowComponent.visible = false;

			// this.context.showCardFace(false);
			// if (this.context.bindData.userInfo)
			// {
			// this.context.infoLabel.text = this.context.bindData.userInfo.name;
			//	game.QinLog.log("等待下一局显示筹码：" + this.context.bindData.bankRoll + this.context.bindData.userInfo.name);
			// }
			this.context.showStateGroup(false);
			this.context.showBankRoll();
			// this.context.chipsLabel.text = game.MathUtil.formatNum(this.context.bindData.bankRoll);
			//game.QinLog.log(this.context.bindData.userInfo.name + "等待下一局");
		}
	}
}