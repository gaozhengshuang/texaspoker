/**
 * 百人大战聊天消息通知处理
 */
class HundredWarChatNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        ChatManager.onRefreshChatRedPointEvent.addListener(this.refresh, this);
    }
    public get count(): number
    {
        if (ChatManager.isHaveNewChatMsg)
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
        ChatManager.onRefreshChatRedPointEvent.removeListener(this.refresh, this);
    }
}