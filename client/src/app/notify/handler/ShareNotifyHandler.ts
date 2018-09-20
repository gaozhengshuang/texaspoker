/**
 * 分享有可用的抽奖次数消息通知处理
 */
class ShareNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        ActivityManager.onReqSingleActivityEvent.addListener(this.refresh, this);
    }
    public get count(): number
    {
        let info: ActivityInfo = ActivityManager.getOpenAchivityByType(ActivityType.Share);
        if (info && info.step > 0 && !(info.gotJsonObj.length && info.gotJsonObj.length > 0)) 
        {
            return 1;
        } else
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
        ActivityManager.onReqSingleActivityEvent.removeListener(this.refresh, this);
    }
}