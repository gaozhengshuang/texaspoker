/**
 * 计时奖励可领取提醒面板
 */
class GetTimeAwardRemindPanel extends BasePanel
{
    public anmGroup: eui.Group;
    /**
     * 描述信息
    */
    public desLabel: eui.Label;
    /**
     * 领取金币数量
    */
    public awardNumLabel: eui.Label;
    /**
     * 下次领奖时间group
    */
    public nextTimeGroup: eui.Group;
    /**
     * 下次领奖时间
    */
    public nextTimeLabel: eui.Label;

    public timer;
    public countDownNum: number;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.GetTimeAwardRemindPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.anmGroup.touchEnabled = false;
        this.layer = UILayerType.Tips;
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.enterAnime();
        this.countDownNum = 5;
        let round = this.panelData.round + 1;
        if (round < TimeAwardDefined.GetInstance().dataList.length)
        {
            this.nextTimeGroup.visible = true;
            let timeawardDef: TimeAwardDefinition = TimeAwardDefined.GetInstance().getDefinition(round + 1);
            if (timeawardDef)
            {
                this.nextTimeLabel.text = Math.round(timeawardDef.time / 60) + "分钟";
            }
        } else
        {
            this.nextTimeGroup.visible = false;
        }
        if (this.panelData.num)
        {
            this.awardNumLabel.text = this.panelData.num.toString() + "金币";
        }
        this.desLabel.text = "您完成了计时奖励第" + round + "轮";
        game.Tick.AddSecondsInvoke(this.countDown, this);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getTimeAward, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.removeTweens();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getTimeAward, this);
        game.Tick.RemoveSecondsInvoke(this.countDown, this);
    }

    /**
     * 移除动画
    */
    private removeTweens()
    {
        if (this.anmGroup)
        {
            egret.Tween.removeTweens(this.anmGroup);
        }
    }
    /**
     * 入场动画
    */
    private enterAnime()
    {
        egret.Tween.removeTweens(this.anmGroup);
        let enter: egret.Tween = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = -100;
        enter.to({ y: 0 }, 200);
    }
    /**
     * 退场动画
    */
    private outAnime()
    {
        let enter: egret.Tween = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = 0;
        enter.to({ y: -100 }, 200).call(this.onCloseAnmComplete, this);
    }
    private onCloseAnmComplete()
    {
        game.Tick.RemoveTimeoutInvoke(this.outAnime, this);
        UIManager.closePanel(UIModuleName.GetTimeAwardRemindPanel);
    }
    /**
     * 领取
    */
    private getTimeAward(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        PropertyManager.OpenGet();
        GamblingManager.timeAwardHandler.reqGetTimeAward(this.panelData.pattern);
        this.outAnime();
        game.Tick.RemoveSecondsInvoke(this.countDown, this);
    }
    /**
	 * 倒计时
	*/
    private countDown()
    {
        this.countDownNum--;
        if (this.countDownNum <= 0)
        {
            game.Tick.RemoveSecondsInvoke(this.countDown, this);
            game.Tick.AddTimeoutInvoke(this.outAnime, 0.5, this);
        }
    }
}