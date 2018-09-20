/**
 * 高级场对局成就进度信息
 */
class HighPatternProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfPlayField(this, AchieveShowPattern.HighPattern);
    }

    public destroy()
    {
        super.destroy();
    }
}