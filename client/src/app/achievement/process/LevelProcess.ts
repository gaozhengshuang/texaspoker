/**
 * 等级成就进度信息
 */
class LevelProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        if (UserManager.userInfo.level > this.process)
        {
            super.init(UserManager.userInfo.level);
        }
    }

    public destroy()
    {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        super.destroy();
    }
}