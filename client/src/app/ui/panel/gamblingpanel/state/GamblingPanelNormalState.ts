/**
 * 牌局常规桌状态
 */
class GamblingPanelNormalState extends BaseGamblingPanelState
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
		this.context.logoBg.source = SheetSubName.Gambling_Bg_TexasPoker;
	}
	public run()
	{
		super.run();

		this.context.anteGroup.verticalCenter = 86;
		this.context.usualBlindGroup.verticalCenter = 86;
		this.context.potChipsGroup.verticalCenter = -290;
		this.removeChild(this.context.cardTypeComp);
		this.addChild(this.context.guessCardBtn);
		this.addChild(this.context.guessCorrectlyGroup);

		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.definition.type == PlayingFieldType.PlayFieldPersonal)
		{
			this.removeChild(this.context.guessCardBtn);
			this.removeChild(this.context.guessCorrectlyGroup);
			this.removeChild(this.context.achieveBtn);
			this.removeChild(this.context.onlineAwardBtn);
		}
		else
		{
			this.addChild(this.context.guessCardBtn);
			this.addChild(this.context.guessCorrectlyGroup);
			this.addChild(this.context.achieveBtn);
			this.addChild(this.context.onlineAwardBtn);
		}
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.definition.type == PlayingFieldType.Primary)
		{
			this.removeChild(this.context.guessCardBtn);
			this.removeChild(this.context.guessCorrectlyGroup);
		}

		this.addChild(this.context.logoBg);
		this.addChild(this.context.chatBtn);
		this.addChild(this.context.reviewBtn);
		this.addChild(this.context.buyBtn);
		this.addChild(this.context.currencyGroup);
		this.addChild(this.context.ordinaryRoomGroup);
		this.addChild(this.context.cardTypeGroup);
		this.addChild(this.context.waitNextImg);
		//
		this.context.tryAddChildActionGroup();
	}
}