/**
 * 公告定义
 */
class ImgNotifyDefined extends BaseDefined<ImgNotifyDefinition>
{
    private static readonly imgNotifyConfig: string = "imgNotify";
    private static _instance: ImgNotifyDefined;
    public static GetInstance(): ImgNotifyDefined
    {
        if (!ImgNotifyDefined._instance)
        {
            ImgNotifyDefined._instance = new ImgNotifyDefined();
        }
        if (DefinedManager.IsParsed(ImgNotifyDefined.imgNotifyConfig) == false)
        {
            ImgNotifyDefined._instance.initialize();
        }
        return ImgNotifyDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(ImgNotifyDefined.imgNotifyConfig) as Array<ImgNotifyDefinition>;
    }
}

/**
 * 公告定义
 */
class ImgNotifyDefinition implements IBaseDefintion
{
    /**
     * 索引编号
     */
    public indexId: number;
    /**
     * id
     */
    public Id: number;
    /**
     * 类型（1绝对时间，2相对于创号时间）
     */
    public type: number;
    /**
     * 需求等级
     */
    public level: number;
    /**
     * 公告图
     */
    public imgId: string;
    /**
     * 时间id
     */
    public timeId: number;
}