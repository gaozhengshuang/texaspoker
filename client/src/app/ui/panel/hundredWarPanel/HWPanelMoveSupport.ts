/**
 * 百人大战牌局面板移动支持
 */
class HWPanelMoveSupport extends BaseHWPanelSupport
{
	private readonly toNum = 265;
	private _isMove: boolean = false;
	private _lastStageX: number;
	private _lastBeginStageX: number;

	private _moveHandler: GamblingGameGroupMove;
	private _initMatrix: egret.Matrix;
	private _marqueePanel: MarqueePanel;

	public initialize()
	{
		super.initialize();
		this.target.dragGroup.touchEnabled = true;
		this._isMove = false;
		if (!this._initMatrix)
		{
			this._initMatrix = this.target.gameGroup.matrix
		}
		if (!this._moveHandler)
		{
			this._moveHandler = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.GamblingGameGroupMove);
			this._moveHandler.setTarget(this.target.gameGroup);
		}
		if (!this._marqueePanel)
		{
			this.getMarqueePanel();
		}
		this._lastStageX = -1;
		this._initMatrix.tx = 0;
		this.target.gameGroup.matrix = this._initMatrix;
	}
	public move()
	{
		this._lastStageX = -1;
		if (this.target.gameGroup.x > 0)
		{
			this.toLeft();
		}
		else
		{
			this.toRight();
		}
	}
	public onEnable()
	{
		this.target.optionsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionsTapHandler, this);
		this.target.dragGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.target.dragGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this.target.dragGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.target.dragGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSideRelease, this);
		UIManager.onPanelOpenEvent.addListener(this.onMarqueePanelOpen, this);
	}
	public onDisable()
	{
		this.target.optionsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.optionsTapHandler, this);
		this.target.dragGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.target.dragGroup.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this.target.dragGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.target.dragGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.outSideRelease, this);
		UIManager.onPanelOpenEvent.removeListener(this.onMarqueePanelOpen, this)
	}
	/**
	 * 跑马灯面板打开
	*/
	private onMarqueePanelOpen(panelName: string)
	{
		if (panelName == UIModuleName.MarqueePanel && !this._marqueePanel)
		{
			this.getMarqueePanel();
		}
	}
	/**
	 * 获得marquee面板
	*/
	private getMarqueePanel()
	{
		this._marqueePanel = UIManager.panelDict.getValue(UIModuleName.MarqueePanel) as MarqueePanel;
	}
	public onTouchEnd(e: egret.TouchEvent, outTouch?: boolean)
	{
		if (outTouch || e.target == this.target.dragGroup)
		{
			if (this._lastBeginStageX == e.stageX)
			{
				this.toLeft();
			}
			else
			{
				this.stop();
			}
		}
	}
	private onTouchMove(e: egret.TouchEvent)
	{
		if (e.target == this.target.dragGroup)
		{
			// this.target.leftGroup.visible = true;
			let offsetX: number = 0;
			if (this._lastStageX != -1)
			{
				offsetX = e.stageX - this._lastStageX;
				this._lastStageX = e.stageX;
			}
			else
			{
				this._lastStageX = e.stageX;
			}

			this._initMatrix.tx += offsetX;

			if (this._initMatrix.tx > this.toNum)
			{
				this._initMatrix.tx = this.toNum;
			}
			if (this._initMatrix.tx < 0)
			{
				this._initMatrix.tx = 0;
				// this.target.leftGroup.visible = false;
			}
			this.target.gameGroup.matrix = this._initMatrix;
			this._isMove = true;
			if (this._marqueePanel)
			{
				this._marqueePanel.onMoveing(this._initMatrix.tx);
			}
		}
	}
	private stop()
	{
		if (this._isMove) 
		{
			this._isMove = false;
			if (this.target.gameGroup.x > this.toNum / 2)
			{
				this.toRight();
			}
			else
			{
				this.toLeft();
			}
		}
	}
	public toRight(showAnimate: boolean = true)
	{
		this._initMatrix.tx = this.toNum;
		if (showAnimate)
		{
			this._moveHandler.run(this.toNum, null, null);
		}
		else
		{
			this.target.gameGroup.x = this.toNum;
		}
		if (this._marqueePanel)
		{
			this._marqueePanel.onMoveEnd({ num: this.toNum, showAnimate: showAnimate });
		}
		this.clearPosFlag();
	}
	private toLeft()
	{
		this._initMatrix.tx = 0;
		if (this._marqueePanel)
		{
			this._marqueePanel.onMoveEnd({ num: 0, showAnimate: true });
		}
		// this.target.leftGroup.visible = true;
		this._moveHandler.run(0, this.moveFinish, this);
		this.clearPosFlag();
	}
	private moveFinish()
	{
		// this.target.leftGroup.visible = false;
	}
	private optionsTapHandler(event: egret.TouchEvent)
	{
		this.move();
	}
	public onTouchBegin(event: egret.TouchEvent)
	{
		if (this.target.gameGroup.x > 0)
		{
			this._lastBeginStageX = event.stageX;
		}
	}
	private outSideRelease(event: egret.TouchEvent)
	{
		this.stop();
	}
	private clearPosFlag()
	{
		this._lastBeginStageX = -1;
		this._lastStageX = -1;
	}
}