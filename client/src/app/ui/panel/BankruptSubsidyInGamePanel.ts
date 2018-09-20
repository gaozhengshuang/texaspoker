/**
 * 破产补助面板
 */
class BankruptSubsidyInGamePanel extends BaseActivityPanel
{
    public goldLimitLabel: eui.Label;
    public leftTimeLabel: eui.Label;
    public takePrizeBtn: eui.Button;

    private _subInfo: BankruptSubsidyInfo;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.BankruptSubsidyInGamePanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
    }

    public init(appendData: any)
    {
        super.init(appendData);
        if (!this._subInfo)
        {
            this._subInfo = this.activityInfo.subList[0] as BankruptSubsidyInfo;

        }
        this.refresh();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakePrize, this);
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.addListener(this.onTakeOver, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakePrize, this);
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.removeListener(this.onTakeOver, this);

    }

    private onTakeOver()
    {
        this.refresh();
        this.onCloseBtnClickHandler(null);
    }

    private refresh()
    {
        if (InfoUtil.checkAvailable(this.activityInfo))
        {
            this.leftTimeLabel.text = ActivityManager.bankruptSubsidyHandler.getLeftPrizeTimes().toString();
            if (this._subInfo)
            {
                this.goldLimitLabel.text = this._subInfo.definition.limitGold.toString();
            }
            this.takePrizeBtn.enabled = ActivityManager.bankruptSubsidyHandler.isBankruptSubsidy;
        }

    }

    private onTakePrize(event: egret.TouchEvent)
    {
        if (this._subInfo && UserManager.userInfo.gold > this._subInfo.definition.limitGold)
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
}