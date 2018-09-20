/**
 * 牌局比赛赛等待状态
 */
class GamblingPanelMatchWaitState extends BaseGamblingPanelState
{
	public onAwake()
	{
		super.onAwake();
		this.createComponent(GamblingMatchWaitComponent, UIComponentSkinName.GamblingMatchWaitComponent, SlotLayerType.Down);
	}
	public run()
	{
		super.run();
		this.context.anteGroup.verticalCenter = 110;
		this.context.usualBlindGroup.verticalCenter = 110;
		this.context.potChipsGroup.verticalCenter = -290;
		this.context.sptCreater.championshipWaitSpt.setWaitInfo();

		this.removeChild(this.context.cardTypeGroup);
		this.removeChild(this.context.waitNextImg);
		this.removeChild(this.context.chatBtn);
		this.removeChild(this.context.buyBtn);
		this.removeChild(this.context.currencyGroup);

		this.removeChild(this.context.logoBg);
		this.removeChild(this.context.guessCardBtn);
		this.removeChild(this.context.guessCorrectlyGroup);
		this.removeChild(this.context.achieveBtn);
		this.removeChild(this.context.onlineAwardBtn);
		this.removeChild(this.context.reviewBtn);
		this.removeChild(this.context.cardTypeComp);
	}
	public showElements()
	{
		super.showElements();

		this.context.slotContainerUp.horizontalCenter = this.context.slotContainerUp.verticalCenter = 0;
		this.context.slotContainerDown.horizontalCenter = this.context.slotContainerDown.verticalCenter = 0;
	}

}