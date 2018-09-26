/**
 * 首充活动面板
 */
class FirstPayPanel extends BaseActivityPanel
{
	public deslabel1: eui.Label;
	public deslabel2: eui.Label;

	public itemGroup: eui.Group;
	public prizeBtn: eui.Button;
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.FirstPayPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		if (InfoUtil.checkAvailable(this.activityInfo) && this.itemGroup.numChildren == 0)
		{
			let subItem: ActivityPayPrizeDefintion = this.activityInfo.subList[0].definition as ActivityPayPrizeDefintion;
			if (subItem)
			{
				let awardDef: table.IAwardDefine = table.AwardById[subItem.awardId];
				if (awardDef && awardDef.RewardId)
				{
					let list = AwardManager.getAwardInfoDefinitionList(awardDef.Id);
					for (let itemInfo of list)
					{
						let itemComp: FirstPayItemComponent = new FirstPayItemComponent(UIComponentSkinName.FirstPayItemComponent);
						itemComp.init(itemInfo);
						if (this.itemGroup)
						{
							this.itemGroup.addChild(itemComp);
						}
					}
				}
				this.deslabel2.text = subItem.des;
			}
			this.deslabel1.textFlow = game.TextUtil.parse(this.activityInfo.definition.des);
		}
	}

	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.prizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeBtnClick, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.prizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeBtnClick, this);
	}
	private onPrizeBtnClick(event: egret.TouchEvent)
	{
		JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.GameHallPanel);
		UIManager.closePanel(this);
		UIManager.closePanel(UIModuleName.GameHallPanel);
	}
}