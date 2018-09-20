/**
 * 快捷加注按钮动画出现
 */
class OneKeyButtonAppear extends BaseAnimation<egret.DisplayObject>
{
	public reset()
	{
		super.reset();
		this.target.scaleX = this.target.scaleY = 0.1;
		this.target.alpha = 0;
		this.target.visible = true;
	}
	public run(time: number)
	{
		super.run();
		let tween: egret.Tween = egret.Tween.get(this.target);
		tween.wait(time).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.backIn).call(this.runOver, this);
		this.target.touchEnabled = false;
	}

	public runOver()
	{
		super.runOver();
		this.target.touchEnabled = true;
	}
	public clear()
	{
		super.clear();
	}
}