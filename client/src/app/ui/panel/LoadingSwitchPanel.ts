/**
 * 场景加载切换面板
 */
class LoadingSwitchPanel extends BasePanel
{
	public textLabel: eui.Label;
	public loading: any;
	private _time: number;
	private _isOut: boolean;
	private _allowTimeout: boolean;
	private _mcFactory: egret.MovieClipDataFactory;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.LoadingSwitchPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		let randomId: number = game.MathUtil.getRandom(0, LoadingTextDefined.GetInstance().dataList.length - 1);
		let loadingTextDef: LoadingTextDefinition = LoadingTextDefined.GetInstance().getDefinition(randomId);
		if (loadingTextDef)
		{
			this.textLabel.text = loadingTextDef.des;
		}
		this.loading.play();

		this._allowTimeout = appendData as boolean;
		this._time = egret.getTimer();
		this._isOut = false;
	}

	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		if (this._allowTimeout)
		{
			game.Tick.addFrameInvoke(this.update, this);
		}
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.loading.pause();
		game.Tick.removeFrameInvoke(this.update, this);
	}
	private update(event: egret.Event)
	{
		if (this._allowTimeout && this._isOut == false)
		{
			let offsetTime = egret.getTimer() - this._time;
			if (offsetTime >= ProjectDefined.GetInstance().getValue(ProjectDefined.onTimeOut))
			{
				this._isOut = true;
				UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
				UIManager.dispatchEvent(UIModuleName.LoadingSwitchPanel, UIModuleEvent.OnTimeout);
			}
		}
	}
}