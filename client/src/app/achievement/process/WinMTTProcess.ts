/**
 * 赢得锦标赛冠军进度信息
 */
class WinMTTProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
        ChampionshipManager.OnMTTOverPushEvent.addListener(this.onProcessUpdate, this);
    }

    public onProcessUpdate(record: any)
    {
        super.onProcessUpdate(record);
        if (record.rank && record.rank == 1)
        {
            this.process++;
        }
    }
    public destroy()
    {
        super.destroy();
    }
}