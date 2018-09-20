/**
 * 同花顺成就进度信息
 */
class StraightFlushProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfCardType(this, CardType.StraightFlush);
    }

    public destroy()
    {
        super.destroy();
    }
}