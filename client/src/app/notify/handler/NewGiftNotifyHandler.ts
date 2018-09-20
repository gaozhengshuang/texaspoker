/**
 * 新人礼通知处理
 */
class NewGiftNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.addListener(this.refresh, this);
    }
    public get count(): number
    {
        let activityInfo = ActivityManager.pilePrizeHandler.getInfoBySubType(ActivitySubType.NewGift);
        if (activityInfo)
        {
            return ActivityManager.pilePrizeHandler.isHavePrize(activityInfo.id) ? 1 : 0;
        }
        return 0;
    }
    private refresh()
    {
        this.dispatchNotify();
    }
    public destroy()
    {
        ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.removeListener(this.refresh, this);
    }
}