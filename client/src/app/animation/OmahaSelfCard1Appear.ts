/**
 * 奥马哈本家手牌1动画
 */
class OmahaSelfCard1Appear extends BaseAnimation<CardFaceComponent>
{
	public target: CardFaceComponent;
	private tsfMatrix: egret.Matrix;
	public reset()
	{
		super.reset();
		this.tsfMatrix = new egret.Matrix(0.0465, -0.0617, 0.0156, 0.075, GamblingPanelSetting.handCardMatrix3.tx, GamblingPanelSetting.handCardMatrix3.ty);
		this.target.matrix = this.tsfMatrix;
	}
	public run(isSound: boolean = false)
	{
		super.run();
		if (isSound)
		{
			SoundManager.playEffect(MusicAction.light_card);
		}
		this.target.visible = true; //设置本家手牌1显示
		qin.Console.log("显示本家手牌1");
		let tween: egret.Tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });
		tween.to({ a: GamblingPanelSetting.handCardMatrix3.a, b: GamblingPanelSetting.handCardMatrix3.b, c: GamblingPanelSetting.handCardMatrix3.c, d: GamblingPanelSetting.handCardMatrix3.d }, 300).call(this.runOver, this);
		tween.play();
	}
	private change()
	{
		this.target.matrix = this.tsfMatrix;
	}
}