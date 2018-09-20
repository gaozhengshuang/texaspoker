/**
 * 翻牌
 */
class CardFaceTurnToFace extends BaseAnimation<CardFaceComponent>{
	private _backFaceMatrix: egret.Matrix;
	private _frontFaceMatrix: egret.Matrix;
	public scale: number = 1;
	public time: number = 120;
	public callback: qin.Delegate;

	/**
	 * 动画是否显示音效
	 */
	public isSound: boolean = false;

	public reset()
	{
		super.reset();
		this.target.visible = true

		this._backFaceMatrix = new egret.Matrix(1, 0, 0, 1);
		this._frontFaceMatrix = new egret.Matrix(0.122, 0.047);
		this.target.initElementsShow();
		this.target.backFace.matrix = this.target.frontFaceImg.matrix = new egret.Matrix();
	}
	public run(scale: number)
	{
		// this.runOver();
		// return;
		super.run();
		this.target.scaleX = this.target.scaleY = this.scale;
		let backFaceTween: egret.Tween = egret.Tween.get(this._backFaceMatrix, { onChange: this.onBackFaceChange.bind(this) });
		backFaceTween.to({ a: 0.0243, b: -0.023 }, this.time).wait(10).call(this.onBackFaceChangeOver, this);
		backFaceTween.play();
		if (this.isSound)
		{
			SoundManager.playEffect(MusicAction.light_card);
		}
	}
	private onBackFaceChange()
	{
		this.target.backFace.matrix = this._backFaceMatrix;
	}
	private onBackFaceChangeOver()
	{
		this.target.backFace.visible = false;
		this.target.frontFaceImg.matrix = this._frontFaceMatrix;
		this.target.frontFaceImg.visible = true;

		let frontFaceTween: egret.Tween = egret.Tween.get(this._frontFaceMatrix, { onChange: this.onFrontFaceChange.bind(this) });
		frontFaceTween.to({ a: 0.9, b: 0.1 }, this.time - 20).wait(10).call(this.runOver, this);
		frontFaceTween.play();
	}
	private onFrontFaceChange()
	{
		this.target.frontFaceImg.matrix = this._frontFaceMatrix;
	}
	public runOver()
	{
		super.runOver();
		this.target.frontFaceImg.visible = false;
		this.target.cardGroup.visible = true;
		if (this.callback)
		{
			this.callback.invoke();
		}
	}
	public clear()
	{
		if (this._frontFaceMatrix)
		{
			egret.Tween.removeTweens(this._frontFaceMatrix);
		}
		if (this._backFaceMatrix)
		{
			egret.Tween.removeTweens(this._backFaceMatrix);
		}
	}
}