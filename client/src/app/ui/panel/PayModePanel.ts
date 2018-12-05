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
		let awardDef: table.IAwardDefine = table.AwardById[appendData.awardId];
		if (awardDef)
		{
			this.goldLabel.text = awardDef.Name;
			for (let i: number = 0; i < awardDef.CostType.length; i++)
			{
				if (awardDef.CostType[i] == CostType.NT$)
				{
					this.moneyLabel.text = "NT$" + game.longToNumber(awardDef.CostNum[i]) / 100;
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