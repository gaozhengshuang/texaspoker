/**
 * 支付遮罩面板
 */
class PayMaskPanel extends BasePanel
{
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.PayMaskPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0.5;
	}
}