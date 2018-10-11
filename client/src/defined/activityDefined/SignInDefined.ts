/**
 * 签到选项的定义
 * */
class SignInDefined extends BaseActivitySubDefined<table.IActivity_signinDefine>
{
	private static _instance: SignInDefined;

	public static GetInstance(): SignInDefined
	{
		if (!SignInDefined._instance)
		{
			SignInDefined._instance = new SignInDefined();
		}
		return SignInDefined._instance;
	}

	public getDefinitionbyAwardId(awardId: number)
	{
		for (let def of table.Activity_signin)
		{
			if (def.AwardId == awardId)
			{
				return def;
			}
		}
		return null;
	}

	public getDefinitionbySubId(subId: number)
	{
		for (let def of table.Activity_signin)
		{
			if (def.SubId == subId)
			{
				return def;
			}
		}
		return null;
	}
}