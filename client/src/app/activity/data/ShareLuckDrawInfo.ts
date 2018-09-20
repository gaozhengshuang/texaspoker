/**
 * 分享抽奖信息
 */
class ShareLuckDrawInfo extends BaseActivitySubInfo<ActivityShareDefintion>
{
    protected trySetDefinition()
    {
        super.trySetDefinition();
        this._definition = ActivityShareDefined.GetInstance().getSubDefinition(this._id, this._subId);
    }
}