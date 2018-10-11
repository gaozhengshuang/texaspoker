/**
 * 坐满即玩开赛提示面板
 */
class SitAndPlayStartRemindPanel extends BasePanel
{
	/**
	 * 描述信息
	*/
    public desLabel: eui.Label;
	/**
	 * 确定按钮
	*/
    public confirmBtn: eui.Button;

    private _startMatch: MatchRoomInfo;
    private _countDownNum: number;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.SitAndPlayStartRemindPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        if (appendData)
        {
            this._countDownNum = appendData.countDownNum;
            this._startMatch = appendData.startMatch;
            this.desLabel.textFlow = game.TextUtil.parse(
                '您报名的坐满即玩' +
                '<font color="#F3C655" size="24">' + this._startMatch.definition.Name + '</font>' +
                '马上就要开赛，是否立即进入？' + '（' + game.DateTimeUtil.countDownFormat(this._countDownNum, false) + '）'
            );
            game.Tick.AddSecondsInvoke(this.countDown, this);
        }
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
        game.Tick.RemoveSecondsInvoke(this.countDown, this);
    }

    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        ChampionshipManager.mttRemindStartHandler.remindWaitMTT();
        super.onCloseBtnClickHandler(event);
    }
	/**
	 * 立即进入
	*/
    private enterMatch(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (this._startMatch)
        {
            ChampionshipManager.enterMttHandler.enterMatch(this._startMatch, UIModuleName.SecondRemindPanel);
        }
    }
	/**
	 * 倒计时
	*/
    private countDown()
    {
        this._countDownNum--;
        this.desLabel.textFlow = game.TextUtil.parse(
            '您报名的坐满即玩' +
            '<font color="#F3C655" size="24">' + this._startMatch.definition.Name + '</font>' +
            '马上就要开赛，是否立即进入？' + '（' + game.DateTimeUtil.countDownFormat(this._countDownNum, false) + '）'
        );
        if (this._countDownNum <= 0)
        {
            this.desLabel.text = "比赛即将开始";
            game.Tick.RemoveSecondsInvoke(this.countDown, this);
            this.onCloseBtnClickHandler(null);
        }
    }
}