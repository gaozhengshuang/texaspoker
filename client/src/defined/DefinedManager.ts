class DefinedManager
{
	private static _textMap: Object[];
	private static _parseSet: boolean[];
	/**
	 * 重置
	 */
	public static Reset()
	{
		DefinedManager._parseSet = [];//关联数组不能用length=0清空
	}
	/**
	 * 设置配置表数据
	 */
	public static SetConfigData(zipList: any[])
	{
		DefinedManager._parseSet = [];
		DefinedManager._textMap = [];
		if (zipList)
		{
			for (let item of zipList)
			{
				if (DefinedManager._textMap[item.name] == null)
				{
					try
					{
						DefinedManager._textMap[item.name] = JSON.parse(item.asText());
					}
					catch (e)
					{
						qin.Console.log("配置表格式有问题！" + item.name);
					}
				}
				else
				{
					qin.Console.log("Config有重复的:", item.name);
				}
			}
		}
	}
	/**
	 * 配置表是否已经解析过
	 */
	public static IsParsed(name: string, suffix: string = AssetsSuffixName.JSON): boolean
	{
		return DefinedManager._parseSet[name + suffix] == true;
	}
	/**
	 * 设置配置数据,仅在开发模式使用
	 */
	public static setData(name: string, data: Object)
	{
		if (DefinedManager._textMap == null)
		{
			DefinedManager._textMap = [];
		}
		if (DefinedManager._parseSet == null)
		{
			DefinedManager._parseSet = [];
		}
		if (DefinedManager._textMap[name] == null)
		{
			DefinedManager._textMap[name] = data;
		}
		else
		{
			qin.Console.log("Config有重复的:", name);
		}
	}
	/**
	 * 获取配置表数据
	 */
	public static GetData(name: string, suffix: string = AssetsSuffixName.JSON): Object
	{
		name += suffix;
		DefinedManager._parseSet[name] = true;
		return DefinedManager._textMap[name];
	}
}