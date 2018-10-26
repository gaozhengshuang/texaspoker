/**
 * 升级任务进度信息
 */
class LevelUpProcess extends BaseAchieveProcess 
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
            this.process = UserManager.userInfo.level;
        }
    }

    public destroy()
    {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        super.destroy();
    }
}