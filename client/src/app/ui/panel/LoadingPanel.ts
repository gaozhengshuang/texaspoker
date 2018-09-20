/// <summary>
/// 转圈loading
/// </summary>
class LoadingPanel extends BasePanel
{
	public image: eui.Image;
	private _time: number;
	private _isOut: boolean;
	private _allowTimeout: boolean;
	public container: eui.Group;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.LoadingPanel);
	}

	protected onAwake(event: eui.UIEvent)
	{
		this.isTween = false;
		super.onAwake(event)
		this.maskAlpha = 0.01;
		if (this.container.parent)
		{
			this.container.parent.removeChild(this.container);
		}
	}

	public init(appendData: any)
	{
		this._allowTimeout = true;
		if (appendData)
		{
			this._allowTimeout = appendData as boolean;
		}
		this._time = egret.getTimer();
		this._isOut = false;
		if (this.container.parent)
		{
			this.container.parent.removeChild(this.container);
		}
		qin.Tick.AddTimeoutInvoke(this.delayShowContainer, 1000, this);
	}
	private delayShowContainer()
	{
		this.addChild(this.container);
	}
	protected onEnable(event: eui.UIEvent)
	{
		super.onEnable(event);
		this.setAnime();
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	protected onDisable(event: eui.UIEvent)
	{
		super.onDisable(event);
		this.removeAnime();
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		qin.Tick.RemoveTimeoutInvoke(this.delayShowContainer, this);
	}
	private update(event: egret.Event)
	{
		if (this._allowTimeout && this._isOut == false && this.container.parent)
		{
			let offsetTime = egret.getTimer() - this._time;
			if (offsetTime >= ProjectDefined.GetInstance().getValue(ProjectDefined.onTimeOut))
			{
				this._isOut = true;
				UIManager.closePanel(UIModuleName.LoadingPanel);
				UIManager.dispatchEvent(UIModuleName.LoadingPanel, UIModuleEvent.OnTimeout);
			}
		}
	}

	private setAnime()
	{
		egret.Tween.get(this.image, { loop: true })
			.set({ rotation: 0 })
			.to({ rotation: 360 }, 1000);
	}
	private removeAnime()
	{
		egret.Tween.removeTweens(this.image);
	}
}