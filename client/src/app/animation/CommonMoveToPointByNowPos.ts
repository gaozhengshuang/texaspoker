/**
 * 基于当前位置移动到某点(通用)
 */
class CommonMoveToPointByNowPos extends BaseAnimation<egret.DisplayObject>
{
	public run(x: number, y: number, callBack: Function, thisObj: any)
	{
		super.run(x, y, callBack, thisObj);
		this.callBack = game.Delegate.getOut(callBack, thisObj);
		let tween: egret.Tween = egret.Tween.get(this.target);
		let dis: number = egret.Point.distance(new egret.Point(x, y), new egret.Point(this.target.x, this.target.y));
		tween.to({ x: x, y: y }, dis * 1.2, egret.Ease.circOut).call(this.runOver, this);
		tween.play();
	}
	public runOver()
	{
		super.runOver();
		if (this.callBack)
		{
			this.callBack.invoke();
			game.Delegate.putIn(this.callBack);
		}
		this.callBack = null;
	}
}