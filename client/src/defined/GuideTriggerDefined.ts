/**
 * 引导触发定义
 */
class GuideTriggerDefined extends BaseDefined<GuideTriggerDefinition>
{
	private static readonly config: string = "guideTrigger";
	private static _instance: GuideTriggerDefined;
	public static GetInstance(): GuideTriggerDefined
	{
		if (!GuideTriggerDefined._instance)
		{
			GuideTriggerDefined._instance = new GuideTriggerDefined();
		}
		if (DefinedManager.IsParsed(GuideTriggerDefined.config) == false)
		{
			GuideTriggerDefined._instance.initialize();
		}
		return GuideTriggerDefined._instance;
	}

	private initialize()
	{
		this.dataList = DefinedManager.GetData(GuideTriggerDefined.config) as Array<GuideTriggerDefinition>;
	}
	public getTriggerDefinition(type: GuideType)
	{
		let def: GuideTriggerDefinition;
		if (this.dataList)
		{
			let len = this.dataList.length;
			for (let i: number = 0; i < len; i++)
			{
				def = this.dataList[i];
				if (def.guideType == type)
				{
					return def;
				}
			}
		}
		game.Console.logError("获取引导触发数据异常！GuideType" + type);
		return def;
	}
}
/**
* 引导触发定义
* */
class GuideTriggerDefinition implements IBaseDefintion
{
	public id: number;
	/**
	 * 引导类型
	 */
	public guideType: GuideType;
	/**
	 * 引导触发类型
	 */
	public triggerType: GuideTriggerType;
	/**
	 * 等级限制
	 */
	public levelLimit: number;
}