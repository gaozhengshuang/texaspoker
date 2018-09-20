/**
 * loading文本的定义
 * */
class LoadingTextDefined extends BaseDefined<LoadingTextDefinition>
{
    private static readonly loadingTextConfig: string = "loadingText";
    private static _instance: LoadingTextDefined;
    public static GetInstance(): LoadingTextDefined
    {
        if (!LoadingTextDefined._instance)
        {
            LoadingTextDefined._instance = new LoadingTextDefined();
        }
        if (DefinedManager.IsParsed(LoadingTextDefined.loadingTextConfig) == false)
        {
            LoadingTextDefined._instance.initialize();
        }
        return LoadingTextDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(LoadingTextDefined.loadingTextConfig) as Array<LoadingTextDefinition>;
    }
}
/**
 * loading文本的定义
 * */
class LoadingTextDefinition implements IBaseDefintion
{
    public id: number;
	/**
	 * 文本内容
	 */
    public des: string;
}