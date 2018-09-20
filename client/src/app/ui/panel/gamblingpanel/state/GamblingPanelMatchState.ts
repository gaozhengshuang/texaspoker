/**
 * 牌局比赛状态
 */
class GamblingPanelMatchState extends BaseGamblingPanelState
{
	public onAwake()
	{
		super.onAwake();
		this.createComponent(GamblingMatchComponent, UIComponentSkinName.GamblingMatchComponent, SlotLayerType.Down);
		this.createComponent(GamblingMatchBlindComponent, UIComponentSkinName.GamblingMatchBlindComponent, SlotLayerType.Up);
	}
	public run()
	{
		super.run();

		this.context.anteGroup.verticalCenter = 110;
		this.context.usualBlindGroup.verticalCenter = 110;
		this.context.potChipsGroup.verticalCenter = -290;
		this.addChild(this.context.chatBtn);
		this.addChild(this.context.buyBtn);
		this.addChild(this.context.currencyGroup);
		this.addChild(this.context.reviewBtn);

		this.addChild(this.context.cardTypeGroup);
		this.addChild(this.context.waitNextImg);
		//
		this.context.tryAddChildActionGroup();

		this.removeChild(this.context.logoBg);
		this.removeChild(this.context.guessCardBtn);
		this.removeChild(this.context.guessCorrectlyGroup);
		this.removeChild(this.context.achieveBtn);
		this.removeChild(this.context.onlineAwardBtn);
		this.removeChild(this.context.cardTypeComp);
	}
	public showElements()
	{
		super.showElements();

		this.context.slotContainerUp.horizontalCenter = this.context.slotContainerUp.verticalCenter = 0;
		this.context.slotContainerDown.horizontalCenter = this.context.slotContainerDown.verticalCenter = 0;
	}
}