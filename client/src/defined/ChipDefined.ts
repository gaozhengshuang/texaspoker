/**
 * 筹码的定义
 * */
class ChipsDefined extends BaseDefined<ChipsDefinition>
{
	private static readonly chipsConfig: string = "chips";
	private static _instance: ChipsDefined;

	public static GetInstance(): ChipsDefined
	{
		if (!ChipsDefined._instance)
		{
			ChipsDefined._instance = new ChipsDefined();
		}
		if (DefinedManager.IsParsed(ChipsDefined.chipsConfig) == false)
		{
			ChipsDefined._instance.initialize();
		}
		return ChipsDefined._instance;
	}

	private initialize()
	{
		this.dataList = DefinedManager.GetData(ChipsDefined.chipsConfig) as Array<ChipsDefinition>;
	}
}

/**
 * 筹码选项的定义
 * */
class ChipsDefinition implements IBaseDefintion
{
	public id: number;
	public phase: number;
	public img: string;
}