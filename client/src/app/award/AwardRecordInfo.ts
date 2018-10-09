/**
 * 奖励记录信息
 */
class AwardRecordInfo extends BaseServerValueInfo
{
    public id: number;
    public time: number;
    public awardId: number;
    public costJson: string;
    public rewardJson: string;

    public reset()
    {
        this.id = 0;
        this.time = 0;
        this.awardId = 0;
        this.costJson = game.StringConstants.Empty;
        this.rewardJson = game.StringConstants.Empty;
    }
}