/**
 * 两对成就进度信息
 */
class TwoPairsProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfCardType(this, CardType.TwoPairs);
    }

    public destroy()
    {
        super.destroy();
    }
}