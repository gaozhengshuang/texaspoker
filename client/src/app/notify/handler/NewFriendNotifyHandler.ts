/**
 * 好友申请红点通知处理
 */
class NewFriendNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        FriendManager.onRefreshInfoEvent.addListener(this.refresh, this);
        FriendManager.onReceiveFriendRequestEvent.addListener(this.refresh, this);
    }
    public get count(): number
    {
        if (FriendManager.requestFriendList && FriendManager.requestFriendList.length > 0)
        {
            return 1;
        }
        return 0;
    }
    private refresh()
    {
        this.dispatchNotify();
    }
    public destroy()
    {
        FriendManager.onRefreshInfoEvent.removeListener(this.refresh, this);
        FriendManager.onReceiveFriendRequestEvent.removeListener(this.refresh, this);
    }
}