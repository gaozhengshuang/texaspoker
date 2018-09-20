/**
 * 奥马哈牌型按钮组件
 */
class OmahaCardTypeBtnComponent extends BaseComponent<CardType>
{
	public cardTypeLabel: eui.Label;

	public typeNumLabel: eui.Label;

	public typeNumGroup: eui.Group;

	public init(data: CardType)
	{
		super.init(data);
		this.refresh(this.bindData);
	}
	protected createChildren()
	{
		super.createChildren();
		this.refresh(this.bindData);
	}

	protected onEnable(event: eui.UIEvent)
	{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
	}

	protected onDisable(event: eui.UIEvent)
	{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
	}

	private refresh(cardType: CardType)
	{
		if (this.bindData && this.bindData != 0)
		{
			this.typeNumGroup.visible = true;
			this.cardTypeLabel.visible = true;
			this.cardTypeLabel.text = CardTypeMatchUtil.getCardDes(this.bindData);
			this.typeNumLabel.text = this.bindData.toString();
		}
		else
		{
			this.typeNumGroup.visible = false;
			this.cardTypeLabel.visible = false;
		}
	}

	private onTap(event: egret.TouchEvent)
	{
		if (GamblingManager.isInSeat && GamblingManager.roomInfo && GamblingManager.roomInfo.publicCard && GamblingManager.roomInfo.publicCard.length > 0)
		{
			JumpUtil.JumpToOmahaCardTypePanel(CardTypeMatchUtil.cardType);
		}
		else
		{
			JumpUtil.JumpToOmahaCardTypePanel(CardType.None);
		}
	}
}