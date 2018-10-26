/**
 * 顺子成就进度信息
 */
class StraightProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfCardType(this, CardType.Straight);
    }

    public destroy()
    {
        super.destroy();
    }
}