/**
 * 弃牌动画
 */
class FoldCardAnimation extends BaseAnimation<egret.DisplayObject>
{
	public target: egret.DisplayObject;
	private _initMatrix: egret.Matrix;

	private _initH: number;
	private _initV: number;

	private _angleVec: qin.Vector2D;
	private readonly _runTime: number = 400;


	public constructor()
	{
		super();
		this._angleVec = new qin.Vector2D(0, 0);
	}
	public reset()
	{
		super.reset();
		let img: eui.Image = this.target as eui.Image;
		if (!this._initMatrix)
		{
			this.target.scaleX = this.target.scaleY = 0.5;
			this._initMatrix = this.target.matrix;
		}
		this.target.alpha = 1;
		this.target.matrix = this._initMatrix;
	}
	public run(point: egret.Point)
	{
		super.run(point);
		let parent:GamblingHeadComponent = this.target.parent.parent as GamblingHeadComponent; 
		this._angleVec.x = point.x - parent.x;
		this._angleVec.y = point.y - parent.y;

		let angle: number = this._angleVec.angle;
		angle = angle * qin.MathUtil.Radian2Angle;
		let tween: egret.Tween = egret.Tween.get(this.target);

		this.target.visible = true;
		tween.to({ x: this._angleVec.x, y: this._angleVec.y, scaleX: 0.4, scaleY: 0.4, alpha: 0.3, rotation: angle }, this._runTime, egret.Ease.circOut).call(this.runOver, this);
		tween.play();
	}
	public runOver()
	{
		super.runOver();
		this.target.visible = false;
	}
}