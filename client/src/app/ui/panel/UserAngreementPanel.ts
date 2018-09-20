/**
 * 用户协议面板
 */
class UserAngreementPanel extends BasePanel
{
	public agreeBtn: eui.Button;
	public infoTxt: eui.Label;
	public txtGroup: eui.Group;
	private _txtScroller: eui.Scroller;

	public textInput: eui.TextInput;

	private _timeId: number;
	private _showIndex: number = 0;
	private _speed: number = 50;
	private _angreeText: string;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.UserAngreementPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.isMaskClickClose = true;
		this.maskAlpha = 0.5;

		this._txtScroller = new eui.Scroller();
		this._txtScroller.width = 600;
		this._txtScroller.height = 600;
		this._txtScroller.viewport = this.txtGroup;
		this._txtScroller.x = 34;
		this._txtScroller.y = 130;
		this.tweenGroup.addChild(this._txtScroller);
	}
	public init(appendData: any)
	{
		super.init(appendData);
	}


	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this._txtScroller.stopAnimation();

		this.agreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeBtnClickHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		if (this.isOver == false) //未显示完毕就关掉重新开始
		{
			this.infoTxt.text = game.StringConstants.Empty;
			this._showIndex = 0;
		}
		egret.clearInterval(this._timeId);
		this.agreeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeBtnClickHandler, this);
	}
	private tryClearInterval()
	{
		if (this._angreeText && this.isOver)
		{
			egret.clearInterval(this._timeId);
		}
	}
	private get isOver()
	{
		let len: number;
		if (this._angreeText)
		{
			len = this._angreeText.length;
		}
		return this._showIndex * this._speed + this._speed >= len;
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		//需要在scroller添加到舞台上面之后再访问verticalScrollBar
		UIUtil.hideScrollerBar(this._txtScroller);
		this._txtScroller.viewport.scrollV = 0;
		UIUtil.hideScrollerBar(this._txtScroller, true);
		if (!this._angreeText || (this._angreeText && this.isOver == false))
		{
			UIManager.showPanel(UIModuleName.LoadingPanel);
			RES.getResByUrl(ProjectDefined.GetInstance().userAgreementUrl + "?" + Date.now().toString() + Math.random().toString(), this.setUserAgreeInfo, this, RES.ResourceItem.TYPE_TEXT);
		}
	}
	private setUserAgreeInfo(text: string)
	{
		UIManager.closePanel(UIModuleName.LoadingPanel);
		if (text)
		{
			let reg: RegExp = /\\n/g;
			this._angreeText = text.replace(reg, "\n");
			if (this._angreeText && this.isOver == false)
			{
				this._timeId = egret.setInterval(() =>
				{
					this.infoTxt.text += this._angreeText.substr(this._showIndex * this._speed, this._speed);
					this.tryClearInterval();
					this._showIndex++;
				}, this, 500);
			}
		}
	}
	private agreeBtnClickHandler(event: egret.TouchEvent)
	{
		GameSetting.IsAgreeUserAgreement = true;
		UIManager.dispatchEvent(UIModuleName.UserAngreementPanel, UIModuleEvent.CHANGE);
		super.onCloseBtnClickHandler(event);
	}
}