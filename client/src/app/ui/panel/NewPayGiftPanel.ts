/**
 * 新人充值礼面板
 */
class NewPayGiftPanel extends BaseActivityPanel
{
	public desLabel: eui.Label;
	public firstPayComp: FirstPayItemComponent;
	public payBtn: eui.Button;

	private _subInfo: PayPrizeInfo;
	private _isOpen: boolean = false;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.NewPayGiftPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
	}

	public init(appendData: any)
	{
		super.init(appendData);
		if (InfoUtil.checkAvailable(this.activityInfo) && !this._isOpen)
		{
			this._isOpen = true;
			this.desLabel.text = this.activityInfo.definition.des;
			let subInfo: PayPrizeInfo = this.activityInfo.subList[0] as PayPrizeInfo;
			if (InfoUtil.checkAvailable(subInfo))
			{
				this._subInfo = subInfo;
				let awardDef: AwardDefinition = AwardDefined.GetInstance().getDefinition(subInfo.definition.awardId);
				if (awardDef && awardDef.rewardList)
				{
					this.firstPayComp.init(awardDef.rewardList[0]);
				}
			}
		}
		this.refresh();
	}

	private refresh()
	{
		if (this.activityInfo.step > 0)
		{
			this.payBtn.label = "领取";
		}
		else
		{
			if (this._subInfo)
			{
				this.payBtn.label = qin.StringUtil.format("充值{0}元领取", this._subInfo.definition.payNum / 100);
			}
		}
	}

	private onPayBtnClick(event: egret.TouchEvent)
	{
		if (this.activityInfo.step > 0)
		{
			ActivityManager.ReqGetActivityAward(this.activityInfo.id, 1);
		}
		else
		{
			JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.GameHallPanel);
			UIManager.closePanel(this);
			UIManager.closePanel(UIModuleName.GameHallPanel);
		}
	}

	private onTakePrize(id: number)
	{
		if (id == this.activityInfo.id)
		{
			this.onCloseBtnClickHandler(null);
		}
	}

	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.payBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPayBtnClick, this);
		ActivityManager.payPrizeHandler.onGetAwardCompleteEvent.addListener(this.onTakePrize, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.payBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPayBtnClick, this);
		ActivityManager.payPrizeHandler.onGetAwardCompleteEvent.removeListener(this.onTakePrize, this);
	}
}