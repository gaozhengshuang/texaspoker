/**
 * 参加锦标赛进度信息
 */
class JoinMTTProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
        ChampionshipManager.OnMTTOverPushEvent.addListener(this.onProcessUpdate, this);
    }

    public onProcessUpdate(record: any)
    {
        super.onProcessUpdate(record);
        if (record.rank)
        {
            this.process++;
        }
    }
    public destroy()
    {
        super.destroy();
    }
}