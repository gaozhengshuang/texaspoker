/**
 * 签到信息
 */
class SignInInfo extends BaseActivitySubInfo<SignInDefinition>
{
	protected trySetDefinition()
	{
		super.trySetDefinition();
		this._definition = SignInDefined.GetInstance().getSubDefinition(this._id, this._subId);
	}
}