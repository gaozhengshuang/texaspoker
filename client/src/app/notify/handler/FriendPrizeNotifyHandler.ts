/**
 * 好友礼物红点通知处理
 */
class FriendPrizeNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        FriendManager.onRefreshInfoEvent.addListener(this.refresh, this);
        FriendManager.onReceiveGiftEvent.addListener(this.refresh, this);
    }
    public get count(): number
    {
        if (FriendManager.giftList && FriendManager.giftList.length > 0)
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
        FriendManager.onReceiveGiftEvent.removeListener(this.refresh, this);
    }
}