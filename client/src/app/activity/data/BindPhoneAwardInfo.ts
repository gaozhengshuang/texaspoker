/**
 * 绑定大礼包信息
 */
class BindPhoneAwardInfo extends BaseActivitySubInfo<ActivityPhoneDefintion>
{
    protected trySetDefinition()
    {
        super.trySetDefinition();
        this._definition = ActivityPhoneDefined.GetInstance().getSubDefinition(this._id, this._subId);
    }
}