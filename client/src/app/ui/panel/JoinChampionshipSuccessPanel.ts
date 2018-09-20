/**
 * 锦标赛报名成功面板
 */
class JoinChampionshipSuccessPanel extends BasePanel
{
    /**
     * 赛事名称
    */
    public nameLabel: eui.Label;
    /**
     * 比赛时间
    */
    public timeLabel: eui.Label;
    /**
     * 参赛人数
    */
    public numLabel: eui.Label;
    /**
     * 初始筹码
    */
    public chipLabel: eui.Label;
    /**
     * 确定按钮
    */
    public closeBtn: eui.Button;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.JoinChampionshipSuccessPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
    }
    public init(appendData: any)
    {
        super.init(appendData);
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.nameLabel.text = this.panelData.name;
        let date: Date = new Date(this.panelData.time * 1000);
        if (this.panelData.time - TimeManager.GetServerUtcTimestamp() > 3600 * 24)  //大于一天
        {
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate() + + qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(" ")[1];
        } else  // 少于一天
        {
            this.timeLabel.text = "今日" + qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(" ")[1];
        }
        this.numLabel.text = this.panelData.applyNum + "/" + this.panelData.bNum;
        this.chipLabel.text = this.panelData.chip;
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
    }
    /**
     * 关闭面板
    */
    private closePanel(event: TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        UIManager.closePanel(UIModuleName.JoinChampionshipSuccessPanel);
    }
}