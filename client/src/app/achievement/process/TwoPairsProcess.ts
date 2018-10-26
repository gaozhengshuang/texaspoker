/**
 * 两对成就进度信息
 */
class TwoPairsProcess extends BaseAchieveProcess 
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