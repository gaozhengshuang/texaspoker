/**
 * 三条成就进度信息
 */
class ThreeOfAKindProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfCardType(this, CardType.ThreeOfAKind);
    }

    public destroy()
    {
        super.destroy();
    }
}