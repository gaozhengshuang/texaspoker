/**
 * 奥马哈本家手牌4动画
 */
class OmahaSelfCard4Appear extends BaseAnimation<CardFaceComponent>
{
    public target: CardFaceComponent;
    private tsfMatrix: egret.Matrix;

    private _isSound: boolean;
    public reset()
    {
        super.reset();
        this.tsfMatrix = new egret.Matrix(0.27, -0.36, 0.037, 0.177, GamblingPanelSetting.handCardMatrix6.tx, GamblingPanelSetting.handCardMatrix6.ty);
        this.target.matrix = this.tsfMatrix;
    }
    public run(isSound: boolean = false)
    {
        super.run();
        this._isSound = isSound;
        game.Tick.AddTimeoutInvoke(this.delayRun, 600, this);
    }
    private delayRun()
    {
        this.target.visible = true; //设置本家手牌4显示
        game.Console.log("显示本家手牌4");
        let tween: egret.Tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });

        tween.to({ a: GamblingPanelSetting.handCardMatrix6.a, b: GamblingPanelSetting.handCardMatrix6.b, c: GamblingPanelSetting.handCardMatrix6.c, d: GamblingPanelSetting.handCardMatrix6.d }, 300).call(this.runOver, this);
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
        game.Tick.RemoveTimeoutInvoke(this.delayRun, this);
        super.clear();
    }
}