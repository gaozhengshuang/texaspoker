/**
 * 中级场对局成就进度信息
 */
class MiddlePatternProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onWinOfPlayField(this, AchieveShowPattern.MiddlePattern);
    }

    public destroy()
    {
        super.destroy();
    }
}