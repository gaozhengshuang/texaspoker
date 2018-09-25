/**
 * 胜利成就进度信息
 */
class WinProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        if (GamblingUtil.isWin(UserManager.userInfo.id) && InfoUtil.checkAvailable(GamblingManager.roomInfo) && PlayingFieldManager.isPatternRoom(GamblingManager.roomInfo.definition.Type))
        {
            this.process++;
        }
    }

    public destroy()
    {
        super.destroy();
    }
}