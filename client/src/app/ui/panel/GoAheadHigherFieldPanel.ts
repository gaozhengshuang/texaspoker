/**
 * 直通车面板
 */
class GoAheadHigherFieldPanel extends BasePanel
{
	public titleImg: eui.Image;
	public itemGroup: eui.Group;
	public pattern1: GoAheadHigherfieldItemComponent;
	public pattern2: GoAheadHigherfieldItemComponent;
	public buyNowBtn: eui.Button;

	private _type: BusinessType;

	private _selectPattern: GoAheadHigherfieldItemComponent;

	/**
	 * 直通车数据
	 */
	private _goaheadData1: GoAheadHigherfieldItemData;
	private _goaheadData2: GoAheadHigherfieldItemData;
	/**
	 * 重返巅峰数据
	 */
	private _peakednessData: GoAheadHigherfieldItemData;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.GoAheadHigherFieldPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.pattern1.touchChildren = this.pattern2.touchChildren = false;
		this._peakednessData = { title: "重返巅峰", awardId: AwardFixedId.GoAheadPattern2, selected: true, necessary:true};
		this._goaheadData1 = { title: "直通初级场", awardId: AwardFixedId.GoAheadPattern1};
		this._goaheadData2 = { title: "直通高级场", awardId: AwardFixedId.GoAheadPattern2, selected: true, necessary:true};
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this._type = appendData;
		switch (this._type)
		{
			case BusinessType.GoAheadHighField: //直通车
				this.displayGoAheadHighField();
				this.changePattern(this.pattern2)
				break;
			case BusinessType.ReturnPeakedness: //重返巅峰
				this.displayReturnPeakedness();
				break;
			default:
				game.Console.log("直通车类型错误！", this._type);
				break;
		}
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelClick, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelClick, this);
	}
	private onPanelClick(event: egret.TouchEvent)
	{
		let target = event.target;
		switch (target)
		{
			case this.pattern1:
			case this.pattern2:
				if (target != this._selectPattern)
				{
					this.changePattern(target);
				}
				break;
			case this.buyNowBtn:
				AwardManager.Exchange(this._selectPattern.bindData.awardId);
				break;
		}
	}
	private changePattern(target: GoAheadHigherfieldItemComponent)
	{
		if (this._selectPattern)
		{
			this._selectPattern.selected = false;
		}
		this._selectPattern = target;
		this._selectPattern.selected = true;
	}
	/**
	 * 显示直通车
	 */
	private displayGoAheadHighField()
	{
		if (!this.pattern1.parent)
		{
			this.itemGroup.addChild(this.pattern1)
			this.pattern1.init(this._goaheadData1);
			this.pattern2.init(this._goaheadData2);
		}
	}
	/**
	 * 显示重返巅峰
	 */
	private displayReturnPeakedness()
	{
		if (this.pattern1.parent)
		{
			this.pattern1.parent.removeChild(this.pattern1)
			this.pattern2.init(this._peakednessData);
		}
	}
}