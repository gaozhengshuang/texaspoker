/**
 * 牌局新手引导玩法状态
 */
class GamblingPanelGuidePlayWayState extends BaseGamblingPanelState
{
	public onAwake()
	{
		super.onAwake();
		this.createComponent(GamblingGuidePlayWayComponent, UIComponentSkinName.GamblingGuidePlayWayComponent, SlotLayerType.Up);
	}
	public run()
	{
		super.run();

		this.context.anteGroup.verticalCenter = 86;
		this.context.usualBlindGroup.verticalCenter = 86;
		this.context.potChipsGroup.verticalCenter = -350;
		this.addChild(this.context.guessCardBtn);
		this.addChild(this.context.guessCorrectlyGroup);
		this.addChild(this.context.achieveBtn);
		this.addChild(this.context.onlineAwardBtn);

		this.addChild(this.context.logoBg);
		this.addChild(this.context.chatBtn);
		this.addChild(this.context.buyBtn);
		this.addChild(this.context.currencyGroup);
		this.addChild(this.context.ordinaryRoomGroup);
		this.addChild(this.context.reviewBtn);

		this.removeChild(this.context.cardTypeGroup);
		this.removeChild(this.context.waitNextImg);
		this.removeChild(this.context.actionGroup);
		this.removeChild(this.context.cardTypeComp);
	}

	public showElements()
	{
		super.showElements();

		this.context.slotContainerDown.horizontalCenter = this.context.slotContainerDown.verticalCenter = 0;
		this.context.slotContainerUp.horizontalCenter = this.context.slotContainerUp.verticalCenter = 0;
	}
}
