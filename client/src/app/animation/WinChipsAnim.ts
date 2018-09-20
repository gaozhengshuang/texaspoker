/**
 * 赢取筹码动画
 */
class WinChipsAnim extends BaseAnimation<eui.Label>
{
	private _initV: number;
	public reset()
	{
		super.reset();
		if (this._initV == undefined)
		{
			this._initV = this.target.verticalCenter;
		}
		this.target.verticalCenter = this._initV;
		this.target.alpha = 1;
	}
	public run()
	{
		super.run();
		let tween: egret.Tween = egret.Tween.get(this.target);
		tween.to({ verticalCenter: this._initV - 60 }, 300, egret.Ease.backOut).wait(1000).to({ alpha: 0 }, 300).call(this.runOver, this);
		tween.play();
	}
	public runOver()
	{
		this.target.visible = false;
		super.runOver();
	}
}