/**
 * 对子成就进度信息
 */
class OnePairProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfCardType(this, CardType.OnePair);
    }

    public destroy()
    {
        super.destroy();
    }
}