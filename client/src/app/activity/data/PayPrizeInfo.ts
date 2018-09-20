/**
 * 充值信息
 */
class PayPrizeInfo extends BaseActivitySubInfo<ActivityPayPrizeDefintion>
{
    protected trySetDefinition()
    {
        super.trySetDefinition();
        this._definition = ActivityPayPrizeDefined.GetInstance().getSubDefinition(this._id, this._subId);
    }
}