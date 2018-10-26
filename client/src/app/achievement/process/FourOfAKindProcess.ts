/**
 * 四条成就进度信息
 */
class FourOfAKindProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfCardType(this, CardType.FourOfAKind);
    }

    public destroy()
    {
        super.destroy();
    }
}