/**
 * 葫芦成就进度信息
 */
class FullhouseProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfCardType(this, CardType.Fullhouse);
    }

    public destroy()
    {
        super.destroy();
    }
}