/**
 * 亮牌
 */
class CardFaceBright extends BaseAnimation<CardFaceComponent>{
	public target: CardFaceComponent;

	public reset()
	{
		super.reset();
		this.target.initElementsShow2();
		this.target.scaleX = 2;
		this.target.scaleY = 2;
		this.target.rotation = 0;
		this.target.alpha = 0.3;
		this.target.y = this.target.initMatrix.ty + 250;
	}
	public run(rotation: number, initOffsetX: number, x: number, y: number, callBack: Function, thisObj: any)
	{
		super.run(rotation, y);
		this.target.x = this.target.initMatrix.tx - initOffsetX;
		let tween: egret.Tween = egret.Tween.get(this.target);
		this.callBack = new game.Delegate(callBack, thisObj);
		this.target.visible = true;

		tween.to({ x: this.target.initMatrix.tx + x, y: this.target.initMatrix.ty + y, scaleX: 1, scaleY: 1, alpha: 1 }, 300).wait(20).to({ rotation: rotation, y: this.target.initMatrix.ty + y - 25 }, 100).call(this.runOver, this);
		tween.play();
		// let preR: number;
		// if (rotation > 0)
		// {
		// 	preR = 3;
		// }
		// else
		// {
		// 	preR = -2;
		// }

		// let cardTween: egret.Tween = egret.Tween.get(this.target);
		// cardTween.to({ rotation: preR }, 300).wait(10).to({ x: this.target.initMatrix.tx + x, y: this.target.initMatrix.ty + y, rotation: rotation}, 100).call(this.runOver, this);
		// cardTween.play();
	}
	public runOver()
	{
		super.runOver();
		if (this.callBack)
		{
			this.callBack.invoke();
		}
	}
	public clear()
	{
		super.clear();
		if (this.target.cardGroup)
		{
			egret.Tween.removeTweens(this.target.cardGroup);
		}
	}
}