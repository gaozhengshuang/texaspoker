/**
 * 邀请有奖励可领取消息通知处理
 */
class InviteNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        InviteManager.OnInviteAwardEvent.addListener(this.refresh, this);
    }
    public get count(): number
    {
        if (InviteManager.isCanBring) 
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
        InviteManager.OnInviteAwardEvent.removeListener(this.refresh, this);
    }
}