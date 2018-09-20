/**
 * 发牌动画
 */
class FlopCardAnimation extends BaseAnimation<egret.DisplayObject>{
	public target: egret.DisplayObject;
	private _initMatrix: egret.Matrix;

	private _initH: number;
	private _initV: number;

	private _angleVec: qin.Vector2D;
	private _params: any;
	private _runStart: number;
	private readonly _runTime: number = 400;

	private _isCallBackIsRuned: boolean = false;

	public constructor()
	{
		super();
		this._angleVec = new qin.Vector2D(0, 0);
	}
	private _verticalCenter: number;
	public reset()
	{
		super.reset();
		if (!this._initMatrix)
		{
			this._initMatrix = this.target.matrix;
		}
		this.target.alpha = 1;
		this.target.matrix = this._initMatrix;
		this.target.y = GameManager.stage.stageHeight / 2 + GamblingPanelSetting.FlopCardVerticalCenter; //计算相对布局 -57.5为初始的verticalcenter属性
	}
	//发牌轨迹向上弯曲角度
	private _flopAngle: number = 18;
	public run(point: egret.Point, callBack: Function, thisObj: any, params: any)
	{
		// this.callBack = new qin.Delegate(callBack, thisObj);
		// this._params = params;
		// this.runOver();
		// return;
		super.run(point);
		this._angleVec.x = point.x - this._initMatrix.tx;
		this._angleVec.y = point.y - this.target.y;
		this._params = params;
		this.callBack = new qin.Delegate(callBack, thisObj);

		let angle: number = this._angleVec.angle;
		angle = angle * qin.MathUtil.Radian2Angle;
		angle += 270;

		this._p0.x = this.target.x;
		this._p0.y = this.target.y;

		this._vecotr.x = point.x - this.target.x;
		this._vecotr.y = point.y - this.target.y;
		this._vecotr = this._vecotr.multiply(0.5);
		let oppLen: number = Math.tan(this._flopAngle * qin.MathUtil.Angle2Radian) * Math.sqrt(this._vecotr.lengthSQ);
		let len: number = Math.sqrt(this._vecotr.lengthSQ + oppLen * oppLen);
		this._vecotr.distance = len;
		this._vecotr.angle = this._vecotr.angle - this._flopAngle * qin.MathUtil.Angle2Radian;

		this._p1.x = this._vecotr.x + GameManager.stage.stageWidth / GameSetting.StageWidth * this._initMatrix.tx;
		this._p1.y = this._vecotr.y + GameManager.stage.stageHeight / GameSetting.StageHeight * this._initMatrix.ty;

		this._p2.x = point.x;
		this._p2.y = point.y;

		let tween: egret.Tween = egret.Tween.get(this.target);
		tween.to({ scaleX: 0.5, scaleY: 0.5, alpha: 0.5, rotation: angle }, this._runTime).call(this.runOver, this);

		this._factor = 0;
		tween = egret.Tween.get(this);
		tween.to({ factor: 1 }, this._runTime); //, egret.Ease.circOut

		this._runStart = egret.getTimer();
		this.target.visible = true;
		this._isCallBackIsRuned = false;
		this.runNext();
		qin.Tick.addFrameInvoke(this.runNext, this);
		tween.play();
	}

	private _movePoint: egret.Point = new egret.Point();
	private _p0: egret.Point = new egret.Point();
	private _p1: egret.Point = new egret.Point();
	private _p2: egret.Point = new egret.Point();
	private _vecotr: qin.Vector2D = new qin.Vector2D(0, 0);
	private _factor:number;
	private get factor():number
	{
		return this._factor;
	}
	private set factor(value: number)
	{
		this._factor = value;
		qin.MathUtil.besselPoint(this._factor, this._p0, this._p1, this._p2, this._movePoint);
		this.target.x = this._movePoint.x;
		this.target.y = this._movePoint.y;
	}
	private runNext()
	{
		if (egret.getTimer() - this._runStart > this._runTime / 2 + 30 && this.callBack)
		{
			this.callBack.invoke(this._params);
			this._isCallBackIsRuned = true;
			qin.Tick.removeFrameInvoke(this.runNext, this);
			this.callBack = null;
		}
	}
	public runOver()
	{
		super.runOver();
		this.target.visible = false;
		egret.Tween.removeTweens(this);
		if (this._isCallBackIsRuned == false && this.callBack)
		{
			this.callBack.invoke(this._params);
		}
		this.callBack = null;
	}
	public clear()
	{
		super.clear();
	}
}