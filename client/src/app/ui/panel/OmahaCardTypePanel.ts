/**
 * 奥马哈牌型面板
 */
class OmahaCardTypePanel extends BasePanel
{
	public scrollGroup: eui.Group;
	public scroller: eui.Scroller;
	public lightGroup: eui.Group;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.OmahaCardTypePanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.isMaskClickClose = true;
		this.maskAlpha = 0;
		this.scroller.viewport = this.scrollGroup;
		UIManager.pushResizeScroller(this.scrollGroup, 886);
	}
	public init(appendData: CardType)
	{
		super.init(appendData);
		if (appendData != null)
		{
			this.setLight(appendData);
		}
	}
	public setLight(type: number)
	{
		for (let i: number = 0; i < this.lightGroup.numChildren; i++)
		{
			this.lightGroup.getChildAt(i).visible = (i == this.lightGroup.numChildren - type);
		}
	}
}