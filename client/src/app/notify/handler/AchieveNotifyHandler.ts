/**
 * 有未领取的任务红点通知处理
 */
class AchieveNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        AchievementManager.getAchievementPrizeEvent.addListener(this.refresh, this);
        AchieveProcessManager.processUpdateEvent.addListener(this.refresh, this);
    }
    public get count(): number
    {
        switch (this.type)
        {
            case NotifyType.Achieve_HaveDaily:
                return AchievementManager.isHaveNoTakeByType(AchieveDailyType.Daily) ? 1 : 0;
            case NotifyType.Achieve_HaveWeekly:
                return AchievementManager.isHaveNoTakeByType(AchieveDailyType.Weekly) ? 1 : 0;
            case NotifyType.Achieve_HaveGrowUp:
                return AchievementManager.isHaveNoTakeByType(AchieveDailyType.GrowUp) ? 1 : 0;
            case NotifyType.Achieve_PrimaryPattern:
                return AchievementManager.isHaveNoTakeByPlayType(AchieveShowPattern.PrimaryPattern) ? 1 : 0;
            case NotifyType.Achieve_MiddlePattern:
                return AchievementManager.isHaveNoTakeByPlayType(AchieveShowPattern.MiddlePattern) ? 1 : 0;
            case NotifyType.Achieve_HighPattern:
                return AchievementManager.isHaveNoTakeByPlayType(AchieveShowPattern.HighPattern) ? 1 : 0;
        }
    }
    private refresh()
    {
        this.dispatchNotify();
    }
    public destroy()
    {
        AchievementManager.getAchievementPrizeEvent.removeListener(this.refresh, this);
        AchieveProcessManager.processUpdateEvent.removeListener(this.refresh, this);
    }
}