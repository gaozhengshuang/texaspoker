/**
 * 游戏按钮
 */
class GameButton extends eui.Button
{
	public isLoadComplete: boolean;
	private btnProxy: any;
	private _isTweenOver: boolean;
	private _initX: number;
	private _initY: number;
	private _initSx: number;
	private _initSy: number;
	private readonly _offset: number = 0.05;
	public constructor()
	{
		super();
		this.btnProxy = this;
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onEnable, this);
	}
	protected createChildren()
	{
		super.createChildren();
		this._isTweenOver = true;
		this._initSx = this.scaleX;
		this._initSy = this.scaleY;
		this._initX = this.x;
		this._initY = this.y;

		this.btnProxy.x = this._initX + this.btnProxy.width / 2;
		this.btnProxy.y = this._initY + this.btnProxy.height / 2;
		this.btnProxy.anchorOffsetX = this.btnProxy.width / 2;
		this.btnProxy.anchorOffsetY = this.btnProxy.height / 2; //居中按钮
	}
	protected onTouchBegin(event: egret.TouchEvent)
	{
		super.onTouchBegin(event);
		this._isTweenOver = false;
		egret.Tween.removeTweens(this.btnProxy);
		let tween: egret.Tween = egret.Tween.get(this.btnProxy);
		tween.to({ scaleX: this._initSx + this._offset, scaleY: this._initSy + this._offset }, 255).call(this.tweenComplete.bind(this));
		UIUtil.setGlowerFilter(this.btnProxy);
	}
	private tweenComplete()
	{
		this._isTweenOver = true;
	}
	protected onTouchCancle(event: egret.TouchEvent)
	{
		super.onTouchCancle(event);
		this.buttonReleased();
	}
	protected buttonReleased()
	{
		egret.Tween.removeTweens(this.btnProxy);
		let tween: egret.Tween = egret.Tween.get(this.btnProxy);
		tween.to({ scaleX: this._initSx, scaleY: this._initSy }, 255);
		UIUtil.clearFilters(this.btnProxy);
	}
	protected onEnable(event: egret.Event)
	{
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
		this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
	}
	protected onDisable(event: egret.Event)
	{
		this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
		this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
		// this.btnProxy.x = this.btnProxy.y = 0;
		// this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
}