/**
 * 通用基于当前相对位置移动
 */
class CommonMoveToRelativelyPos extends BaseAnimation<egret.DisplayObject>
{
	public run(x: number, y: number, callBack: Function, thisObj: any)
	{
		super.run(x, y, callBack, thisObj);
		this.callBack = null;
		if (callBack)
		{
			this.callBack = game.Delegate.getOut(callBack, thisObj);
		}
		let tween: egret.Tween = egret.Tween.get(this.target);
		tween.to({ x: x, y: y }, 300, egret.Ease.sineIn).call(this.runOver, this);
		tween.play();
	}
	public runOver()
	{
		super.runOver();
		if (this.callBack)
		{
			this.callBack.invoke();
		}
	}
}