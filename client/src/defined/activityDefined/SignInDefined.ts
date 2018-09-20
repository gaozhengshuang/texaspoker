/**
 * 签到选项的定义
 * */
class SignInDefined extends BaseActivitySubDefined<SignInDefinition>
{
	private static readonly config: string = "activity_signin";
	private static _instance: SignInDefined;

	public static GetInstance(): SignInDefined
	{
		if (!SignInDefined._instance)
		{
			SignInDefined._instance = new SignInDefined();
		}
		if (DefinedManager.IsParsed(SignInDefined.config) == false)
		{
			SignInDefined._instance.initialize();
		}
		return SignInDefined._instance;
	}
	public initialize()
	{
		this.dataList = DefinedManager.GetData(SignInDefined.config) as Array<SignInDefinition>;
	}

	public getDefinitionbyAwardId(awardId: number): SignInDefinition
	{
		for (let def of this.dataList)
		{
			if (def.awardId == awardId)
			{
				return def;
			}
		}
		return null;
	}

	public getDefinitionbySubId(subId: number)
	{
		for (let def of this.dataList)
		{
			if (def.subId == subId)
			{
				return def;
			}
		}
		return null;
	}
}

/**
 * 签到选项的定义
 * */
class SignInDefinition extends BaseActivitySubDefnition
{
	/**
	 * 签到天数
	 */
	public day: number;
	/**
	 * 奖励id
	 */
	public awardId: number;
	/**
	 * 累积天数奖励id
	 */
	public pilePrize: number;
}