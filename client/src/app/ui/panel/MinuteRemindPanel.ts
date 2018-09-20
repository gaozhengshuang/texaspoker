/**
 * 比赛1分钟开始倒计时提醒面板
 */
class MinuteRemindPanel extends BaseBannerRemindPanel
{
	/**
	 * 按钮
	*/
    public enterBtn: eui.Button;

    private recordId: number;
    private timer;
    private _isClick: boolean;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.MinuteRemindPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this._isClick = false;
        if (appendData)
        {
            this.countDownNum = appendData.countDownNum;
            this.recordId = appendData.recordId;

        }
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMacth, this);
        ChampionshipManager.OnWithdrawEvent.addListener(this.outAnime, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMacth, this);
        ChampionshipManager.OnWithdrawEvent.removeListener(this.outAnime, this);
        game.Tick.RemoveTimeoutInvoke(this.palyOutAnime, this);
    }

    /**
     * 设置提示信息
    */
    protected setRemindInfo()
    {
        this.desLabel.text = "您报名的比赛将于00:60秒后开始！";
    }
    /**
     * 退赛关闭横幅
    */
    private withdrawClose(data: any)
    {
        if (data.recordId == this.recordId)
        {
            this.outAnime();
        }
    }
    protected onCloseAnmComplete()
    {
        if (!this._isClick)
        {
            UIManager.closePanel(UIModuleName.MinuteRemindPanel);
        }
    }
    /**
     * 立即进入
    */
    private enterMacth(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        let info: MatchRoomInfo = ChampionshipManager.getMathInfoByRecordId(this.recordId);
        if (info)
        {
            ChampionshipManager.enterMttHandler.enterMatch(info, UIModuleName.MinuteRemindPanel);
            this._isClick = true;
        }
    }
    /**
	 * 倒计时
	*/
    protected countDown()
    {
        this.countDownNum--;
        this.desLabel.text = "您报名的比赛将于" + game.DateTimeUtil.countDownFormat(this.countDownNum, false) + "秒后开始！";
        if (this.countDownNum <= 0)
        {
            this.desLabel.text = "比赛即将开始";
            game.Tick.RemoveSecondsInvoke(this.countDown, this);
            game.Tick.AddTimeoutInvoke(this.palyOutAnime, 500, this);
        }
    }
    private palyOutAnime()
    {
        game.Tick.RemoveTimeoutInvoke(this.palyOutAnime, this);
        this.outAnime();
    }
}