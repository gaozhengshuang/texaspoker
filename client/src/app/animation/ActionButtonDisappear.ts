/**
 * 操作按钮的消失动画
 */
class ActionButtonDisappear extends BaseAnimation<egret.DisplayObject>
{
	private _parent: egret.DisplayObjectContainer;
	public isRunOver: boolean = true;
	public reset()
	{
		super.reset();
		this.target.alpha = 1;
		this.target.rotation = 0;
	}
	public run(startPoint: egret.Point, targetPoint: egret.Point, parent: egret.DisplayObjectContainer)
	{
		if (this.isRunOver == true)
		{
			super.run(targetPoint);
			let tween: egret.Tween = egret.Tween.get(this.target);
			this.target.x = startPoint.x;
			this.target.y = startPoint.y;

			this._parent = parent;

			this.target.touchEnabled = false;
			tween.to({ rotation: -90, alpha: 0, x: targetPoint.x, y: targetPoint.y, scaleX: 0.1, scaleY: 0.1 }, 250).call(this.runOver, this); //to({ rotation: 5, x: phase1X }, 550).
			this.isRunOver = false;
		}
	}
	public runOver()
	{
		super.runOver();
		this.target.visible = false;
		this.target.touchEnabled = true;
		if (this._parent)
		{
			this._parent.visible = false;
		}
		this.isRunOver = true;
	}
	public clear()
	{
		super.clear();
	}
}