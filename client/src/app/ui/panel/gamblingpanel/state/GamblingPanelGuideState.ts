/**
 * 牌局新手引导状态
 */
class GamblingPanelGuideState extends BaseGamblingPanelState
{
	public onAwake()
	{
		super.onAwake();
		this.createComponent(GamblingGuideComponent, UIComponentSkinName.GamblingGuideComponent, SlotLayerType.Up);
	}
	public run()
	{
		super.run();

		this.context.anteGroup.verticalCenter = 86;
		this.context.usualBlindGroup.verticalCenter = 86;
		this.context.potChipsGroup.verticalCenter = -290;

		this.addChild(this.context.logoBg);
		this.addChild(this.context.currencyGroup);
		this.addChild(this.context.ordinaryRoomGroup);
		//
		this.addChild(this.context.actionGroup);
		this.context.tryAddChildActionGroup();

		this.removeChild(this.context.guessCardBtn);
		this.removeChild(this.context.guessCorrectlyGroup);
		this.removeChild(this.context.achieveBtn);
		this.removeChild(this.context.onlineAwardBtn);
		this.removeChild(this.context.chatBtn);
		this.removeChild(this.context.buyBtn);
		this.removeChild(this.context.reviewBtn);
		this.removeChild(this.context.cardTypeComp);

		this.removeChild(this.context.cardTypeGroup);
		this.removeChild(this.context.waitNextImg);

		this.removeChild(this.context.actionGroup.preActionGroup);
	}

	public showElements()
	{
		super.showElements();

		this.context.slotContainerDown.horizontalCenter = 0;
		this.context.slotContainerDown.top = 0;
		this.context.slotContainerUp.horizontalCenter = 0;
		this.context.slotContainerUp.top = 0;
	}
}