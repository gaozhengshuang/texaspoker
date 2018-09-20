/**
 * 文本tips面板
 */
class TextTipsPanel extends BasePanel
{
	public label: eui.Label;
	public bgImage: eui.Image;

	public constructor()
	{
		super();
		this.layer = UILayerType.Tips;


		this.setSkinName(UIModuleName.TextTipsPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.setTouchChildren(false);
		this.setTouchEnable(false);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		if (this.panelData)
		{
			this.label.text = this.panelData;
			this.bgImage.width = this.label.width + 60;
			this.bgImage.height = this.label.height + 30;
			this.removeTweenEvents();
			this.createTween();
		}
	}
	private createTween()
	{
		this.removeTweenEvents();
		this.alpha = 1;
		egret.Tween.get(this).wait(1500).to({ alpha: 0 }, 500, egret.Ease.quadOut).call(this.onPlayOver, this);
	}
	private onPlayOver(thisObject: any)
	{
		this.onCloseBtnClickHandler(null);
	}
	private removeTweenEvents()
	{
		egret.Tween.removeTweens(this);
	}
}