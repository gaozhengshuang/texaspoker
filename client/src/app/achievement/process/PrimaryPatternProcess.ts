/**
 * 初级场对局成就进度信息
 */
class PrimaryPatternProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfPlayField(this, AchieveShowPattern.PrimaryPattern);
    }

    public destroy()
    {
        super.destroy();
    }
}