/**
 * 等待说话状态 后继状态------>站起|说话
 */
class GamblingHeadWaitActionState extends BaseGamblingHeadState
{
	public run(parms: any)
	{
		super.run(parms);
		if (this.context.bindData) //本家不显示有牌状态图片
		{
			this.context.showMask(false);
			this.context.showBase();
			this.context.showStateGroupAuto();
			// this.context.showHaveCardImg(false);
			//	game.QinLog.log(this.context.bindData.userInfo.name + "等待说话！");
		}
		// if (this.context.bindData && this.context.bindData.userInfo)
		// {
		// 	this.context.infoLabel.text = this.context.bindData.userInfo.name;
		// }
		this.context.showBankRoll();
	}
}