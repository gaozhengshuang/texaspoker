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
		for (let val of table.Text)
		{
			val.Text = val.Text.replace(reg, "\n");
		}
	}
}