/**
 * 操作按钮的动画
 */
class ActionButtonAppear extends BaseAnimation<egret.DisplayObject>
{
	public isRunOver:boolean = true;
	public reset()
	{
		super.reset();
		this.target.scaleX = this.target.scaleY = 0.1;
		this.target.rotation = -90;
		this.target.alpha = 0;
		this.target.visible = true;
	}
	public run(startPoint: egret.Point, targetPoint: egret.Point)
	{
		if (this.isRunOver)
		{
			super.run(startPoint, targetPoint);
			let tween: egret.Tween = egret.Tween.get(this.target);
			this.target.x = startPoint.x;
			this.target.y = startPoint.y;
			this.target.touchEnabled = false;
			this.isRunOver = false;
			tween.to({ alpha: 0.9, rotation: 10, x: targetPoint.x, y: targetPoint.y, scaleX: 1.05, scaleY: 1.05 }, 200).to({ rotation: 0, alpha: 1, scaleX: 1, scaleY: 1 }, 50).call(this.runOver, this);
		}
	}
	public runOver()
	{
		super.runOver();
		this.target.touchEnabled = true;
		this.isRunOver = true;
	}
	public clear()
	{
		super.clear();
	}
}