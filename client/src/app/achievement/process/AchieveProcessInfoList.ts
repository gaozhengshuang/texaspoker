/**
 * 监听特定类型的进度组
 */
class AchieveProcessInfoList
{
    public list: Array<BaseAchieveProcess> = new Array<BaseAchieveProcess>();
    public type: AchieveType;
    constructor(type: AchieveType)
    {
        this.type = type;
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    }

    private onProcessUpdate()
    {
        for (let processInfo of this.list)
        {
            processInfo.onProcessUpdate();
        }
    }
    public clear()
    {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        this.list = [];
    }
}