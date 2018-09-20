/**
 * 横幅提醒
 */
class BaseBannerRemindPanel extends BasePanel
{
    public anmGroup: eui.Group;
    public desLabel: eui.Label;
    public des: string;
    protected countDownNum: number;
    private openPanelName: string;

    public constructor()
    {
        super();
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.layer = UILayerType.Guide;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        if (appendData)
        {
            this.des = appendData;
        }
        this.countDownNum = 3;
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.setRemindInfo();
        this.enterAnime();
        this.countDown();
        game.Tick.AddSecondsInvoke(this.countDown, this);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        game.Tick.RemoveSecondsInvoke(this.countDown, this);
    }

    /**
     * 设置提示信息
    */
    protected setRemindInfo()
    {
        this.desLabel.text = this.des;
    }
    /**
     * 入场动画
    */
    protected enterAnime()
    {
        egret.Tween.removeTweens(this.anmGroup);
        let enter: egret.Tween = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = -100;
        enter.to({ y: 0 }, 200);
    }
    /**
     * 退场动画
    */
    protected outAnime()
    {
        let enter: egret.Tween = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = 0;
        enter.to({ y: -100 }, 200).call(this.onCloseAnmComplete, this);
    }
    protected onCloseAnmComplete()
    {
        UIManager.closePanel(this);
    }
    /**
     * 关闭按钮点击事件
    */
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        ChampionshipManager.mttRemindStartHandler.ResetThreeMinFlagEvent.dispatch();
        this.outAnime();
    }
    /**
	 * 倒计时
	*/
    protected countDown()
    {
        this.countDownNum--;
        if (this.countDownNum <= 0)
        {
            game.Tick.RemoveSecondsInvoke(this.countDown, this);
            ChampionshipManager.mttRemindStartHandler.ResetThreeMinFlagEvent.dispatch();
            this.outAnime();
        }
    }
}