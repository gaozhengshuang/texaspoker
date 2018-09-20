/**
 * 基于初始点移动到某点
 */
class CardFaceMoveToPoint extends BaseAnimation<CardFaceComponent> {
	public target: CardFaceComponent;
	public nextAnimation: BaseAnimation<CardFaceComponent>;
	private _nextRotaion: number;
	private _nextY: number;
	private _timeId: number;
	private _nextDelay: number;
	private _moveToPoint: egret.Point;
	private _defaultMatrix: egret.Matrix;

	public reset()
	{
		super.reset();
		this.target.initElementsShow();
		this.target.matrix = this.target.initMatrix;
		if (!this._defaultMatrix)
		{
			this._defaultMatrix = new egret.Matrix();
		}
		this.target.backFace.matrix = this._defaultMatrix;
	}
	public run(point: egret.Point, initx: number = 0, delay: number = 0, rotation: number = 0, y: number = 0)
	{
		// if (this.nextAnimation)
		// {
		// 	this.runNext();
		// }
		// else
		// {
		// 	this.runOver();
		// }
		// return;
		super.run(point, delay, rotation, y);
		this._moveToPoint = point;
		this._nextDelay = delay;
		this._nextRotaion = rotation;
		this._nextY = y;
		this.target.x = initx;
		this.target.y = point.y;

		let moveTween: egret.Tween = egret.Tween.get(this.target);
		moveTween.to({ x: point.x, y: this.target.initMatrix.ty + point.y }, 100).wait(10).call(this.runOver, this);
		moveTween.play();
	}
	public runOver()
	{
		if (this.nextAnimation && this._nextDelay >= 0)
		{
			this._timeId = egret.setTimeout(this.runNext, this, this._nextDelay);
		}
		else
		{
			this.clear();
		}
	}
	private runNext()
	{
		this.clear();
		if (this.nextAnimation)
		{
			this.nextAnimation.run(this._nextRotaion, this._nextY);
		}
	}
	public clear()
	{
		super.clear();
		this._nextDelay = undefined;
		clearTimeout(this._timeId);
		this._moveToPoint = null;
	}
}