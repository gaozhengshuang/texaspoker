/**
 * 文本信息的定义
 * */
class TextDefined extends BaseDefined<TextDefinition>
{
	private static readonly textConfig: string = "text";
	private static _instance: TextDefined;
	public static GetInstance(): TextDefined
	{
		if (!TextDefined._instance)
		{
			TextDefined._instance = new TextDefined();
		}
		if (DefinedManager.IsParsed(TextDefined.textConfig) == false)
		{
			TextDefined._instance.initialize();
		}
		return TextDefined._instance;
	}

	private initialize()
	{
		this.dataList = DefinedManager.GetData(TextDefined.textConfig) as Array<TextDefinition>;
		let reg: RegExp = /\\n/g;
		for (let val of this.dataList)
		{
			val.text = val.text.replace(reg, "\n");
		}
	}
}
/**
 * 文本的定义
 * */
class TextDefinition implements IBaseDefintion
{
	public id: number;
	/**
	 * 文本内容
	 */
	public text: string;
	/**
	 * 标题图片名
	 */
	public title: string;
	/**
	 * url
	 */
	public url: string;
	/**
	 * 是否是富文本显示
	 */
	public isRichTxt:boolean;
}