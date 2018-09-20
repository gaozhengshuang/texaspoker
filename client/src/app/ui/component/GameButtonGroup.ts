/**
 * 有按钮效果的组
 */
class GameButtonGroup extends eui.Group
{
	public isLoadComplete: boolean;
	private _isTweenOver: boolean;
	private _initW: number;
	private _initH: number;
	private _initSx: number;
	private _initSy: number;
	public btnGroup: eui.Group;
	public constructor()
	{
		super();
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onEnable, this);
	}
	protected createChildren()
	{
		this._isTweenOver = true;
		this._initSx = this.scaleX;
		this._initSy = this.scaleY;
		if (this.numChildren > 0)
		{
			this.btnGroup = this.getChildAt(0) as eui.Group;
		}
	}
	protected onTouchBegin(event: egret.TouchEvent)
	{
		this._isTweenOver = false;
		egret.Tween.removeTweens(this.btnGroup);
		let tween: egret.Tween = egret.Tween.get(this.btnGroup, { onChange: this.update.bind(this) });
		tween.to({ scaleX: 1.05, scaleY: 1.05 }, 255).call(this.tweenComplete.bind(this));
		let component: eui.UIComponent;
		for (let i: number = 0; i < this.btnGroup.numChildren; i++)
		{
			component = this.btnGroup.getChildAt(i) as eui.UIComponent;
			if (component instanceof eui.Button) //按钮不做发光处理，会闪
			{
				continue;
			}
			UIUtil.setGlowerFilter(component);
		}
		UIUtil.setGlowerFilter(this.btnGroup);
	}
	private tweenComplete()
	{
		this._isTweenOver = true;
	}
	protected onTouchCancle(event: egret.TouchEvent)
	{
		this.buttonReleased(event);
	}
	protected buttonReleased(event: egret.TouchEvent)
	{
		egret.Tween.removeTweens(this.btnGroup);
		let tween: egret.Tween = egret.Tween.get(this.btnGroup, { onChange: this.update.bind(this) });
		tween.to({ scaleX: 1, scaleY: 1 }, 255);
		for (let i: number = 0; i < this.btnGroup.numChildren; i++)
		{
			UIUtil.clearFilters(this.btnGroup.getChildAt(i) as eui.UIComponent);
		}
		UIUtil.clearFilters(this.btnGroup);
	}
	private update()
	{
		if (this._initW != undefined && this._initH != undefined)
		{
			let nowW: number = this.btnGroup.scaleX * this._initW;
			let nowH: number = this.btnGroup.scaleY * this._initH;
			let nowX: number = -(nowW - this._initW) / 2;
			let nowY: number = -(nowH - this._initH) / 2;
			this.btnGroup.x = nowX;
			this.btnGroup.y = nowY;
			// game.QinLog.log(this._initW, nowW, nowX, nowY);
		}
	}
	protected rendererStart(event: egret.Event)
	{
		this._initW = this.btnGroup.width;
		this._initH = this.btnGroup.height;
		this.removeEventListener(egret.Event.RENDER, this.rendererStart, this);
	}
	private onEnable(event: egret.Event)
	{
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
		this.addEventListener(egret.Event.RENDER, this.rendererStart, this);
		this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.buttonReleased, this);
	}
	private onDisable(event: egret.Event)
	{
		this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
		this.removeEventListener(egret.Event.RENDER, this.rendererStart, this);
		this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.buttonReleased, this);
		if (this.btnGroup)
		{
			this.btnGroup.x = this.btnGroup.y = 0;
		}
		// this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
}