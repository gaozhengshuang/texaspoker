/**
 * 签到信息
 */
class SignInInfo extends BaseActivitySubInfo<table.IActivity_signinDefine>
{
	protected trySetDefinition()
	{
		super.trySetDefinition();
		this._definition = SignInDefined.GetInstance().getSubDefinition(this._id, this._subId, table.Activity_signin);
	}
}