/**
 * 同花成就进度信息
 */
class FlushProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfCardType(this, CardType.Flush);
    }

    public destroy()
    {
        super.destroy();
    }
}