/**
 * 分享面板
 */
class ShareGamePromptPanel extends BasePanel
{
	public constructor()
	{
		super();
		this.isTween = false;
		this.setSkinName(UIModuleName.ShareGamePromptPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0.7;
		this.isMaskClickClose = true;
	}
	public init(appendData: any)
	{
		super.init(appendData);
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
	}
}