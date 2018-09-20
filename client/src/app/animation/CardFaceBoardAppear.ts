/**
 * 公共牌出现
 */
class CardFaceBoardAppear extends BaseAnimation<CardFaceComponent>{
	public target: CardFaceComponent;
	public nextAnimation: BaseAnimation<CardFaceComponent>;
	private _nextDelay: number;
	private _timeId: number;
	private _moveToPoint: egret.Point;

	private _initH: number;
	private _initV: number;

	public reset()
	{
		super.reset();
		this.target.alpha = 0.1;
		this.target.visible = true;
		this.target.initElementsShow();
		this.target.backFace.matrix = this.target.frontFaceImg.matrix = new egret.Matrix();

		this.target.scaleX = this.target.scaleY = 0.1;
		if (this._initH == undefined)
		{
			this._initH = GamblingPanelSetting.BoardCardPoint.x;
			this._initV = GamblingPanelSetting.BoardCardPoint.y;
		}
		this.target.horizontalCenter = this._initH;
		this.target.verticalCenter = this._initV;
	}
	public run(point: egret.Point, delay: number = 0)
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
		super.run(point, delay);
		this._nextDelay = delay;
		this._moveToPoint = point;
		let moveTween: egret.Tween = egret.Tween.get(this.target);
		moveTween.to({ horizontalCenter: point.x, verticalCenter: point.y, alpha: 1, scaleX: 1.23, scaleY: 1.23 }, 300, egret.Ease.circOut).wait(10).call(this.runOver, this);
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
			this.nextAnimation.run();
		}
	}
	public clear()
	{
		super.clear();
		this._nextDelay = undefined;
		this._moveToPoint = null;
		clearTimeout(this._timeId);
	}
}