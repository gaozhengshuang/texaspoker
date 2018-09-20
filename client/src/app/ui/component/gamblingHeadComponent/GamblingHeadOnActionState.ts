/**
 * 正在说话状态 后继状态 -----> 已说话|弃牌|站起
 */
class GamblingHeadOnActionState extends BaseGamblingHeadState
{
	private _timeId: number;
	public run(parms: any)
	{
		super.run(parms);
		if (this.context.bindData)
		{
			this.context.showMask(false);

			this.context.showStateGroup(false);
			if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.pos == this.context.bindData.pos)
			{
				// if (GamblingManager.roomInfo.posTime > 0)
				// {
				// 	let offsetTime: number = TimeManager.GetServerUtcTimestamp() - GamblingManager.roomInfo.posTime;
				// 	this._timeId = egret.setTimeout(this.actionTimeOut, this, offsetTime * 1000000);
				// 	// game.Tick.getInstance().AddTimeoutInvoke(this.actionTimeOut, offsetTime * 10000, this);
				// }
				// else
				// {
				// 	// game.Tick.getInstance().AddTimeoutInvoke(this.actionTimeOut, GamblingManager.roomInfo.definition.cd * 10000, this);
				// 	this._timeId = egret.setTimeout(this.actionTimeOut, this, GamblingManager.roomInfo.definition.cd * 1000000);
				// }
				let index: number = this.context.playerGroup.getChildIndex(this.context.haveCard1.parent);
				this.context.playerGroup.addChildAt(this.context.cdComponent, index);
				
				this.context.cdComponent.init(GamblingManager.roomInfo.definition.clientCd);
				this.context.cdComponent.start(GamblingManager.roomInfo.posTime, parms);

				this.context.showBase();
				if (this.context.bindData)
				{
					// this.context.infoLabel.text = PlayerInfo.getStateDes(PlayerState.Action);
					this.context.chipsLabel.text = game.MathUtil.formatNum(this.context.bindData.bankRoll);
					if (this.context.bindData.userInfo)
					{
						game.Console.log("说话状态显示筹码：" + this.context.bindData.bankRoll + this.context.bindData.userInfo.name);
					}
				}
			}
			if (this.context.bindData && this.context.bindData.roleId == UserManager.userInfo.roleId)
			{
				if (this.context.cardFace1.visible == false || this.context.cardFace2.visible == false)
				{
					game.Console.log("异常处理说话状态自己还看不到手牌");
					//this.context.showCardFace(true);
				}
			}
			//	game.QinLog.log(this.context.bindData.userInfo.name + "在说话");
		}
	}
}