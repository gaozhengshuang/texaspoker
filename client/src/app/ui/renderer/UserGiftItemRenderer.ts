/**
 * 礼物renderer
 */
class UserGiftItemRenderer extends BaseItemRenderer<any>
{
	public giftComp: CommonIcon;
	public giftNameLabel: eui.Label;
	public wearingLabel: eui.Label;
	public leftTimeLabel: eui.Label;
	public constructor()
	{
		super();
		this.skinName = UIRendererSkinName.AchievementItemRenderer;
	}
	protected dataChanged()
	{
		super.dataChanged();
		if (this.bindData)
		{
			this.refreshiUI();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
	}

	private refreshiUI()
	{

	}
	private onClick(event: egret.TouchEvent)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		UIManager.showPanel(UIModuleName.GiftItemPanel, this.bindData);
	}
	public onDisable(event: egret.Event)
	{
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
}