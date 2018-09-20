/**
 * 奥马哈本家手牌3动画
 */
class OmahaSelfCard3Appear extends BaseAnimation<CardFaceComponent>
{
    public target: CardFaceComponent;
    private tsfMatrix: egret.Matrix;

    private _isSound: boolean;
    public reset()
    {
        super.reset();
        this.tsfMatrix = new egret.Matrix(0.27, -0.36, 0.037, 0.177, GamblingPanelSetting.handCardMatrix5.tx, GamblingPanelSetting.handCardMatrix5.ty);
        this.target.matrix = this.tsfMatrix;
    }
    public run(isSound: boolean = false)
    {
        super.run();
        this._isSound = isSound;
        game.Tick.AddTimeoutInvoke(this.delayRun, 400, this);
    }
    private delayRun()
    {
        this.target.visible = true; //设置本家手牌3显示
        game.Console.log("显示本家手牌3");
        let tween: egret.Tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });

        tween.to({ a: GamblingPanelSetting.handCardMatrix5.a, b: GamblingPanelSetting.handCardMatrix5.b, c: GamblingPanelSetting.handCardMatrix5.c, d: GamblingPanelSetting.handCardMatrix5.d }, 300).call(this.runOver, this);
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
        game.Tick.RemoveTimeoutInvoke(this.delayRun, this);
        super.clear();
    }
}