/**
 * 引导牌局结束处理
 */
class GuideGamblingOverStepProcess extends BaseGuideStepProcess
{
	public run()
	{
		super.run();
		this.oneRoundOver();
	}

	/**
 	* 推送一局结束
 	*/
	private oneRoundOver()
	{
		if (this.definition)
		{
			if (!GamblingManager.roundOverInfo)
			{
				GamblingManager.roundOverInfo = new RoundOverInfo();
			}
			let handCard: Array<CardInfo>;
			if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.handCard)
			{
				handCard = GamblingManager.roomInfo.handCard.concat();
			}
			GamblingManager.roundOverClear();
			GamblingManager.roundOverInfo.copyValueFrom(this.definition.stepParams);

			for (let potInfo of GamblingManager.roundOverInfo.potList)
			{
				for (let i: number = 0; i < potInfo.roleId.length; i++)
				{
					if (potInfo.roleId[i] == GuideGamblingProcess.self)
					{
						potInfo.roleId[i] = UserManager.userInfo.id; //引导奖励给自己
						break;
					}
				}
			}
			for (let cardInfo of GamblingManager.roundOverInfo.handCardList)
			{
				if (cardInfo.roleId == GuideGamblingProcess.self)
				{
					cardInfo.roleId = UserManager.userInfo.id;
					break;
				}
			}
			GamblingManager.RoundOverEvent.dispatch({ initbankRoll: 0, handCard: handCard });
			this.complete();
		}
	}

	public complete()
	{
		super.complete();
	}
}