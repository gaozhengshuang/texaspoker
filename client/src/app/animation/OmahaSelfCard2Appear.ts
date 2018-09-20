/**
 * 奥马哈本家手牌2动画
 */
class OmahaSelfCard2Appear extends BaseAnimation<CardFaceComponent>
{
    public target: CardFaceComponent;
    private tsfMatrix: egret.Matrix;

    private _isSound: boolean;
    public reset()
    {
        super.reset();
        this.tsfMatrix = new egret.Matrix(0.27, -0.36, 0.037, 0.177, GamblingPanelSetting.handCardMatrix4.tx, GamblingPanelSetting.handCardMatrix4.ty);
        this.target.matrix = this.tsfMatrix;
    }
    public run(isSound: boolean = false)
    {
        super.run();
        this._isSound = isSound;
        qin.Tick.AddTimeoutInvoke(this.delayRun, 200, this);
    }
    private delayRun()
    {
        this.target.visible = true; //设置本家手牌2显示
        qin.Console.log("显示本家手牌2");
        let tween: egret.Tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });

        tween.to({ a: GamblingPanelSetting.handCardMatrix4.a, b: GamblingPanelSetting.handCardMatrix4.b, c: GamblingPanelSetting.handCardMatrix4.c, d: GamblingPanelSetting.handCardMatrix4.d }, 300).call(this.runOver, this);
        tween.play();
        if (this._isSound)
        {
            SoundManager.playEffect(MusicAction.light_card);
        }
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