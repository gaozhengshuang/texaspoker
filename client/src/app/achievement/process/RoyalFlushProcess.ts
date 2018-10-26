/**
 * 皇家同花顺成就进度信息
 */
class RoyalFlushProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfCardType(this, CardType.RoyalFlush);
    }

    public destroy()
    {
        super.destroy();
    }
}