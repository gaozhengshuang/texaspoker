/**
 * 胜利成就进度信息
 */
class WinProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        if (GamblingUtil.isWin(UserManager.userInfo.roleId) && InfoUtil.checkAvailable(GamblingManager.roomInfo) && PlayingFieldManager.isPatternRoom(GamblingManager.roomInfo.definition.Type))
        {
            this.process++;
        }
    }

    public destroy()
    {
        super.destroy();
    }
}