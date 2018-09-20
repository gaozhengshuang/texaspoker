/**
* alpha动画渐变
*/
class AlphaChangeAnimation extends BaseAnimation<egret.DisplayObject>
{
	public reset()
	{
		super.reset();
	}
	public run(initAlpha: number, toalpha: number, delay: number = 0, time: number = 1000, callBack?: Function, thisObj?: any)
	{
		super.run(initAlpha, toalpha, delay, time, callBack, thisObj);
		this.callBack = null;
		if (callBack)
		{
			this.callBack = qin.Delegate.getOut(callBack, thisObj);
		}

		this.target.alpha = initAlpha;

		let tween: egret.Tween = egret.Tween.get(this.target);
		tween.wait(delay).to({ alpha: toalpha }, time, egret.Ease.sineIn).call(this.runOver, this);
	}
	public runOver()
	{
		super.runOver();
		if (this.callBack)
		{
			this.callBack.invoke();
		}
		qin.Delegate.putIn(this.callBack);
		this.callBack = null;

	}
}