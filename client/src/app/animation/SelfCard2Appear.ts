/**
 * 本家手牌2动画
 */
class SelfCard2Appear extends BaseAnimation<CardFaceComponent>
{
	public target: CardFaceComponent;
	private tsfMatrix: egret.Matrix;

	private _isSound: boolean;
	public reset()
	{
		super.reset();
		this.tsfMatrix = new egret.Matrix(0.27, -0.36, 0.037, 0.177, GamblingPanelSetting.handCardMatrix2.tx, GamblingPanelSetting.handCardMatrix2.ty);
		this.target.matrix = this.tsfMatrix;
	}
	public run(isSound: boolean = false)
	{
		// this.runOver();
		// return;
		super.run();
		this._isSound = isSound;
		qin.Tick.AddTimeoutInvoke(this.delayRun, 200, this);
	}
	private delayRun()
	{
		this.target.visible = true; //设置本家手牌2显示
		qin.Console.log("显示本家手牌2");
		let tween: egret.Tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });

		tween.to({ a: GamblingPanelSetting.handCardMatrix2.a, b: GamblingPanelSetting.handCardMatrix2.b, c: GamblingPanelSetting.handCardMatrix2.c, d: GamblingPanelSetting.handCardMatrix2.d }, 300).call(this.runOver, this);
		tween.play();
		if (this._isSound)
		{
			SoundManager.playEffect(MusicAction.light_card);
		}
	}
	public runOver()
	{
		if (this.callBack)
		{
			this.callBack.invoke();
		}
		super.runOver();
	}
	private change()
	{
		this.target.matrix = this.tsfMatrix;
	}
	public clear()
	{
		qin.Tick.RemoveTimeoutInvoke(this.delayRun, this);
		super.clear();
	}
}