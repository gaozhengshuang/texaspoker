/**
 * 破产补助通知处理
 */
class BankruptSubsidyNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.addListener(this.refresh, this);
        UserManager.propertyChangeEvent.addListener(this.refresh, this);
    }
    public get count(): number
    {
        if (ActivityManager.bankruptSubsidyHandler.isBankruptSubsidy)
        {
            return ActivityManager.bankruptSubsidyHandler.getLeftPrizeTimes();
        }
        else
        {
            return 0;
        }
    }
    private refresh()
    {
        this.dispatchNotify();
    }
    public destroy()
    {
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.removeListener(this.refresh, this);
    }
}