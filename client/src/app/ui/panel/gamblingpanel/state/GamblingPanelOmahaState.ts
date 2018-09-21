/**
 * 牌局奥马哈状态
 */
class GamblingPanelOmahaState extends BaseGamblingPanelState
{
	public initialize()
	{
		let len: number = this.supportList.length;
		let spt: BaseGamblingPanelSupport;
		for (let i: number = 0; i < len; i++)
		{
			spt = this.supportList[i];
			spt.initialize();
			if (this.context.panelData && spt instanceof GamblingPanelMoveSupport)
			{
				spt.toRight(false);
			}
		}
		this.context.logoBg.source = SheetSubName.Gambling_Bg_Omaha;
	}
	public run()
	{
		super.run();

		this.context.anteGroup.verticalCenter = 86;
		this.context.usualBlindGroup.verticalCenter = 86;
		this.context.potChipsGroup.verticalCenter = -290;
		this.removeChild(this.context.guessCardBtn);
		this.removeChild(this.context.guessCorrectlyGroup);
		this.removeChild(this.context.onlineAwardBtn);
		this.removeChild(this.context.reviewBtn);

		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.definition.Type == PlayingFieldType.OmahaPersonal)
		{
			this.removeChild(this.context.achieveBtn);
		}
		else
		{
			this.addChild(this.context.achieveBtn);
		}

		this.addChild(this.context.logoBg);
		this.addChild(this.context.chatBtn);
		this.addChild(this.context.buyBtn);
		this.addChild(this.context.currencyGroup);
		this.addChild(this.context.ordinaryRoomGroup);
		this.addChild(this.context.cardTypeGroup);
		this.addChild(this.context.waitNextImg);
		this.addChild(this.context.cardTypeComp);
		//
		this.context.tryAddChildActionGroup();
	}
}