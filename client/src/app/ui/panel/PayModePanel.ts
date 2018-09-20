/**
 * 支付混合面板（appendData为ShopInfo）
 */
class PayModePanel extends BasePanel
{
	public appStoreGroup: eui.Group;
	public weiXinGroup: eui.Group;
	public aliPayGroup: eui.Group;

	public moneyLabel: eui.Label;
	public goldLabel: eui.Label;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.PayModePanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0.3;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		let awardDef = AwardDefined.GetInstance().getDefinition(appendData.awardId);
		if (awardDef)
		{
			this.goldLabel.text = awardDef.name;
			for (let def of awardDef.costList)
			{
				if (def.type == CostType.RMB)
				{
					this.moneyLabel.text = def.count / 100 + "元";
				}
			}
		}
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}

	private onClick(event: egret.TouchEvent)
	{
		switch (event.target)
		{
			case this.appStoreGroup:
				this.panelData["payState"] = PayState.Normal;
				ChannelManager.OnPayModelSelectEvent.dispatch(this.panelData);
				break;
			case this.weiXinGroup:
			case this.aliPayGroup:
				this.panelData["payState"] = PayState.Third;
				ChannelManager.OnPayModelSelectEvent.dispatch(this.panelData);
				break;
		}
	}
}