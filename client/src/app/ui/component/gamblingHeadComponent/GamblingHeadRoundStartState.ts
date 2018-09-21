/**
 * 一局开始状态 后继状态-------->发牌|站起
 */
class GamblingHeadRoundStartState extends BaseGamblingHeadState
{
	public run(parms: any)
	{
		super.run(parms);
		if (this.context.bindData)
		{
			// this.context.infoLabel.visible = true;
			// this.context.chipsLabel.visible = true;
			this.context.showMask(false);
			this.context.chipsSingleShowComponent.visible = false;

			this.context.chipsLabel.text = game.MathUtil.formatNum(this.context.bindData.bankRoll);
			this.context.showCardTypeBgFilter(0);
			// if (this.context.bindData.userInfo)
			// {
			// 	this.context.infoLabel.text = this.context.bindData.userInfo.name;
			// }
			this.context.showBankRoll();
			// this.context.chipsLabel.text = game.MathUtil.formatNum(this.context.bindData.bankRoll);
			// game.QinLog.log("一局开始显示筹码：" + this.context.bindData.bankRoll + this.context.bindData.userInfo.name);
			//	game.QinLog.log(this.context.bindData.userInfo.name + "一局开始");
		}
	}
}