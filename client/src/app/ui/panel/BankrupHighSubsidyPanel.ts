/**
 * 高级破产面板
 */
class BankrupHighSubsidyPanel extends BasePanel
{
	public buyNowBtn: eui.Button;
	public costLabel: eui.Label;
	public awardLabel: eui.Label;

	public itemImg: eui.Image;

	private _def:table.ITPayBagDefine;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.BankrupHighSubsidyPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this._def = appendData;
		if (this._def)
		{
			this.awardLabel.text = AwardManager.getAwardDesDigital(this._def.AwardId[0], game.StringConstants.Empty);
			this.costLabel.text = AwardManager.getCostDesDigital(this._def.AwardId[0], game.StringConstants.Empty);
		}
		else
		{
			this.costLabel.text = this.awardLabel.text = game.StringConstants.Empty;
		}
	}

	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		AwardManager.OnExchanged.addListener(this.refresh, this);
		this.buyNowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyNowClik, this);
	}

	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		AwardManager.OnExchanged.removeListener(this.refresh, this);
		this.buyNowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyNowClik, this);
	}
	private refresh(id: number)
	{
		if (id == this._def.AwardId[0])
		{
			UIManager.showFloatTips("购买成功！");
			this.onCloseBtnClickHandler(null);
		}
	}
	private onBuyNowClik(event: egret.TouchEvent)
	{
		AwardManager.Exchange(this._def.AwardId[0]);
	}
}