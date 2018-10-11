/**
 * 破产补助面板
 */
class BankruptSubsidyPanel extends BaseActivityPanel
{
    public resizeScroller: eui.Scroller;
    public desLabel: eui.Label;
    public resizeGroup: eui.Group;

    public leftTimeLabel: eui.Label;
    public takePrizeBtn: eui.Button;
    public goldLimitLabel: eui.Label;

    private _subInfo: BankruptSubsidyInfo;

    private _anime: PanelAnime;
    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.BankruptSubsidyPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.resizeScroller.viewport = this.resizeGroup;
        UIManager.pushResizeScroller(this.resizeScroller, 1200);
        this.resizeScroller.scrollPolicyH = eui.ScrollPolicy.OFF;

    }

    public init(appendData: any)
    {
        super.init(appendData);
        if (!this._subInfo)
        {
            this._subInfo = this.activityInfo.subList[0] as BankruptSubsidyInfo;
        }
        this.resizeScroller.viewport.scrollV = 0;
        this.refresh();
    }

    private refresh()
    { 
        if (InfoUtil.checkAvailable(this.activityInfo))
        { // s
            this.leftTimeLabel.text = ActivityManager.bankruptSubsidyHandler.getLeftPrizeTimes().toString();
            if (this._subInfo)
            {
                this.goldLimitLabel.text = this._subInfo.definition.LimitGold.toString();
            }
            this.takePrizeBtn.enabled = ActivityManager.bankruptSubsidyHandler.isBankruptSubsidy;
        }
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this._anime.onEnable();
        this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakePrize, this);
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.addListener(this.refresh, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this._anime.onDisable();
        this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakePrize, this);
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.removeListener(this.refresh, this);
    }

    private onTakePrize(event: egret.TouchEvent)
    {
        if (this._subInfo && UserManager.userInfo.gold > this._subInfo.definition.LimitGold)
        {
            AlertManager.showAlert("您当前拥有的金币大于1000，暂时不可领取救助金！");
            return;
        }
        if (ActivityManager.bankruptSubsidyHandler.getLeftPrizeTimes() > 0)
        {
            ActivityManager.ReqGetActivityAward(this.activityInfo.id, 1);
        }
        else
        {
            game.Console.log("领取次数已用尽");
        }
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }
}