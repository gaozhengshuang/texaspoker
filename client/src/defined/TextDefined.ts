/**
 * 文本信息的定义
 * */
class TextDefined
{
	private static _instance: TextDefined;
	public static GetInstance(): TextDefined
	{
		if (!TextDefined._instance)
		{
			TextDefined._instance = new TextDefined();
		}
		return TextDefined._instance;
	}

	public initialize()
	{
		let reg: RegExp = /\\n/g;
		let fieldList = ["Text", "TwText"];
		for (let val of table.Text)
		{
			for (let key of fieldList)
			{
				val[key] = val[key].replace(reg, "\n");
			}
		}
	}
	/**
	 * 获取文本消息，会有语言转换
	 */
	public getText(def: table.ITextDefine): string
	{
		switch (langName)
		{
			case "zh-tw":
				return def.TwText;
			case "zh-cn":
				return def.Text;
			case "en":
				return def.Text;
			default:
				return def.Text;
		}
	}
	/**
	 * 获取文本消息，会有语言转换
	 */
	public getTitle(def: table.ITextDefine): string
	{
		switch (langName)
		{
			case "zh-tw":
				return def.TwTitle;
			case "zh-cn":
				return def.Title;
			case "en":
				return def.Title;
			default:
				return def.Title;
		}
	}
}