/**
 * 签到红点通知处理
 */
class SignInNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        ActivityManager.signInHandler.signInCompleteEvent.addListener(this.refresh, this);
    }
    public get count(): number
    {
        if (ActivityManager.signInHandler.isSignToday())
        {
            return 0;
        }
        return 1;
    }
    private refresh()
    {
        this.dispatchNotify();
    }
    public destroy()
    {
        ActivityManager.signInHandler.signInCompleteEvent.removeListener(this.refresh, this);
    }
}