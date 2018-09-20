/**
 *快速聊天
*/
class FastChatDefined extends BaseDefined<FastChatDefinition>
{
    private static readonly fastChatConfig: string = "fastChat";
    private static _instance: FastChatDefined;
    public static GetInstance(): FastChatDefined
    {
        if (!FastChatDefined._instance)
        {
            FastChatDefined._instance = new FastChatDefined();
        }
        if (DefinedManager.IsParsed(FastChatDefined.fastChatConfig) == false)
        {
            FastChatDefined._instance.initialize();
        }
        return FastChatDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(FastChatDefined.fastChatConfig) as Array<FastChatDefinition>;
    }
}
/**
* 随机昵称的定义
*/
class FastChatDefinition implements IBaseDefintion
{
    /**
     * id
    */
    public id: number;
    /**
     * 聊天内容
    */
    public des: string;
}