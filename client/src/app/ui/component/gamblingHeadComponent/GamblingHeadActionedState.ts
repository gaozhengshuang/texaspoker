/**
 * 已经说过话的状态不包括弃牌 后继状态 ----> 等待说话|弃牌|比牌|站起
 */
class GamblingHeadActionedState extends BaseGamblingHeadState
{
	public run(parms: any)
	{
		super.run(parms);
		if (this.context.bindData)
		{
			this.context.showBase();
			this.context.showMask(false);

			// if (this.context.bindData.state == PlayerState.Blind && this.context.bindData.userInfo)
			// {
			// 	this.context.infoLabel.text = this.context.bindData.userInfo.name;
			// }
			this.context.refreshState();
			this.context.showBankRoll();
			//qin.QinLog.log(this.context.bindData.userInfo.name + "已说话" + this.context.infoLabel.text);
		}
	}
}