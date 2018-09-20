/**
 * 加注面板
 */
class AddChipsPanel extends BasePanel
{
	public addChipsVs: eui.VSlider;
	public countLabel: eui.Label;
	public countGroup: eui.Group;

	private _posX: number;
	private _posY: number;
	private _isPosChanged: boolean;
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.AddChipsPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.isMaskClickClose = true;
		this.maskAlpha = 0.5;
		UIUtil.setCircleBorderButtonFilter(this.addChipsVs.thumb as eui.Button, 0xfce14c);

		this.addChipsVs.maximum = 100;


		this.addChipsVs.addChild(this.countGroup);
		this.countGroup.x = -125;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		//设置存入滑动条进度
		// this.addChipsVs.value = appendData.minChips;

		let initV: number = appendData.minChips / appendData.maxChips * 100;
		if (initV > 100)
		{
			initV = 100;
		}
		//每次滚动最小刻度数
		this.addChipsVs.snapInterval = 100 / (appendData.maxChips / appendData.minChips);
		if (this.addChipsVs.snapInterval > 1)
		{
			this.addChipsVs.snapInterval = 1;
		}

		this.addChipsVs.minimum = this.addChipsVs.value = initV;
		this.addChipsHandle();
		if (appendData.guideValue != undefined) //引导处理
		{
			this.isMaskClickClose = false;
			this.grayMask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
		}
		else
		{
			this.isMaskClickClose = true;
			this.grayMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClickHandler, this);
		}
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.addChipsVs.addEventListener(egret.Event.CHANGE, this.addChipsHandle, this);
		this.addChipsVs.thumb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.confirmAddChips, this);
		this.addChipsVs.thumb.addEventListener(egret.TouchEvent.TOUCH_END, this.confirmAddChips, this);
		GamblingManager.ActionOverEvent.addListener(this.actionOverHandler, this);
		qin.Tick.addFrameInvoke(this.update, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.addChipsVs.removeEventListener(egret.Event.CHANGE, this.addChipsHandle, this);
		this.addChipsVs.thumb.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.confirmAddChips, this);
		this.addChipsVs.thumb.removeEventListener(egret.TouchEvent.TOUCH_END, this.confirmAddChips, this);
		GamblingManager.ActionOverEvent.removeListener(this.actionOverHandler, this);
		qin.Tick.removeFrameInvoke(this.update, this);
		this._isPosChanged = false;
	}
	/**
	 * 加注变化
	*/
	private addChipsHandle()
	{
		this._isPosChanged = true;
		let readChips: number = this.getRealChips();
		if (this.addChipsVs.maximum == this.addChipsVs.value && GamblingManager.self && readChips >= GamblingManager.self.bankRoll)
		{
			this.countLabel.text = "AllIn";
		}
		else
		{
			this.countLabel.text = qin.MathUtil.formatNum(readChips);
		}
		SoundManager.playEffect(MusicAction.bet_slider);
	}
	/**
	 * 更新
	 */
	private update()
	{
		if (this._isPosChanged)
		{
			this._isPosChanged = false;
			this.countGroup.y = this.addChipsVs.thumb.y;
		}
	}
	/**
	 * 确定加注
	*/
	private confirmAddChips(event: egret.TouchEvent)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		switch (event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				this._posX = event.stageX;
				this._posY = event.stageY;
				break;
			case egret.TouchEvent.TOUCH_END:
				if (event.stageX == this._posX && event.stageY == this._posY)
				{
					let readChips: number = this.getRealChips();
					if (this.panelData.guideValue == undefined && readChips > 0 && GamblingManager.self) //处理引导进行加注
					{
						if (GamblingManager.self.bankRoll + GamblingManager.self.num > readChips)
						{
							GamblingManager.reqAction(PlayerState.Raise, readChips - this.panelData.value);
						}
						else
						{
							GamblingManager.reqAction(PlayerState.AllIn, readChips - this.panelData.value);
						}
					}
				}
				break;
		}
	}
	private actionOverHandler()
	{
		this.onCloseBtnClickHandler(null);
	}
	private getRealChips(): number
	{
		let realChips: number = this.addChipsVs.value / 100 * this.panelData.maxChips;
		let bBlind: number = Math.floor(realChips / this.panelData.bBlind);
		let result: number = bBlind * this.panelData.bBlind;
		result = Math.max(result, this.panelData.minChips); //限制下限不超过最小
		result = Math.min(result, this.panelData.maxChips); //限制上限不超过最大
		if(this.addChipsVs.value == 100)
		{
			result = this.panelData.maxChips;
		}
		return result;
	}
}