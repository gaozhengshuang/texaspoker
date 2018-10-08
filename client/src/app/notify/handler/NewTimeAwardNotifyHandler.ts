/**
 * 计时奖励红点通知处理
 */
class NewTimeAwardNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        GamblingManager.timeAwardHandler.BringTimeAwardEvent.addListener(this.refresh, this);
        GamblingManager.timeAwardHandler.TimeAwardInfoEvent.addListener(this.refresh, this);
        GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.addListener(this.refresh, this);
    }
    public get count(): number
    {
        let len: number = table.TimeAward.length;
        if ((GamblingManager.timeAwardHandler.round < len && GamblingManager.timeAwardHandler.time > 0) || GamblingManager.timeAwardHandler.round == len || GamblingManager.timeAwardHandler.round == undefined)
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
        GamblingManager.timeAwardHandler.BringTimeAwardEvent.removeListener(this.refresh, this);
        GamblingManager.timeAwardHandler.TimeAwardInfoEvent.removeListener(this.refresh, this);
        GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.removeListener(this.refresh, this);
    }
}