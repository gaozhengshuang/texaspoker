/**
 * 快捷加注按钮动画消失
 */
class OneKeyButtonDisappear extends BaseAnimation<egret.DisplayObject>
{
	private _parent: egret.DisplayObjectContainer;
	public isRunOver: boolean = true;
	public reset()
	{
		super.reset();
		this.target.alpha = 1;
		this.target.scaleX = 1;
		this.target.scaleY = 1;
		this.target.visible = true;
	}
	public run(time: number, parent: egret.DisplayObjectContainer)
	{
		if (this.isRunOver == true)
		{
			super.run();
			this._parent = parent;
			let tween: egret.Tween = egret.Tween.get(this.target);
			tween.wait(time).to({ alpha: 0, scaleX: 0.1, scaleY: 0.1 }, 250).call(this.runOver, this);
			this.target.touchEnabled = false;
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