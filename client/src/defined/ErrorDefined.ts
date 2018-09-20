/**
 * 错误的定义
 * */
class ErrorDefined extends BaseDefined<ErrorDefinition>
{
	private static readonly errorConfig: string = "error";
	private static _instance: ErrorDefined;
	public static GetInstance(): ErrorDefined
	{
		if (ErrorDefined._instance == null)
		{
			ErrorDefined._instance = new ErrorDefined();
		}
		if (DefinedManager.IsParsed(ErrorDefined.errorConfig) == false)
		{
			ErrorDefined._instance.initialize();
		}
		return ErrorDefined._instance;
	}

	private initialize()
	{
		this.dataList = DefinedManager.GetData(ErrorDefined.errorConfig) as Array<ErrorDefinition>;
	}
	public getDetails(id: number):string
	{
		let def: ErrorDefinition = this.getDefinition(id);
		if (def)
		{
			return def.des;
		}
		return qin.StringConstants.Empty;
	}
}
/**
 * 错误码定义
 */
class ErrorDefinition implements IBaseDefintion
{
	/*id*/
	public id: number;
	/**
	 * 错误消息
	 */
	public des: string;
}