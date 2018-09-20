/**
 * 月卡消息通知处理
 */
class MonthCardNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        AwardManager.getExChangeInfoEa.addListener(this.refresh, this);
        AwardManager.OnAwardValueChanged.addListener(this.refresh, this);
    }
    public get count(): number
    {
        if (VipManager.isActiveMonthCard())
        {
            if (VipManager.isBringMonthCardAward())
            {
                return 0;
            } else
            {
                return 1;
            }
        } else
        {
            if (UserManager.isFirstLoginToday)
            {
                return 1;
            } else
            {
                return 0;
            }
        }
    }
    private refresh()
    {
        this.dispatchNotify();
    }
    public destroy()
    {
        AwardManager.getExChangeInfoEa.removeListener(this.refresh, this);
        AwardManager.OnAwardValueChanged.removeListener(this.refresh, this);
    }
}