/**
 * 牌局移动面板
 */
class GamblingGameGroupMove extends BaseAnimation<egret.DisplayObject>
{
	public reset()
	{
		super.reset();
	}
	public run(x: number, callBack: Function, thisObject: any)
	{
		super.run(x);
		if (callBack)
		{
			this.callBack = qin.Delegate.getOut(callBack, thisObject);
		}
		let tween: egret.Tween = egret.Tween.get(this.target);
		tween.to({ x: x }, 200, egret.Ease.sineIn).call(this.runOver, this);
		tween.play();
	}

	public runOver()
	{
		super.runOver();
		if (this.callBack)
		{
			this.callBack.invoke();
			qin.Delegate.putIn(this.callBack);
		}
		this.callBack = null;
	}
}