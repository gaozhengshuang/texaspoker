/**
 * 发牌
 */
class GuideFlopCardStepProcess extends BaseGuideStepProcess
{
	public run()
	{
		super.run();
		this.flopCard();
	}
	private flopCard()
	{
		if (this.definition)
		{
			if (!GamblingManager.roomInfo.handCard)
			{
				GamblingManager.roomInfo.handCard = new Array<CardInfo>();
			}
			GamblingManager.roomInfo.handCard.length = 0;

			GamblingUtil.cardArr2CardInfoList(this.definition.stepParams["card"], GamblingManager.roomInfo.handCard);
			let cardList: Array<CardInfo>;
			if (GamblingManager.roomInfo.handCard)
			{
				cardList = GamblingManager.roomInfo.handCard.concat();
			}
			GamblingManager.HandCardComeEvent.dispatch(cardList);
			GuideGamblingProcess.acitionPosChange(this.definition);
		}
		this.complete();
	}
	public complete()
	{
		super.complete();
	}
}