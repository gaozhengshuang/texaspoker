/**
 * 邮件定义
 */
class MailDefined extends BaseDefined<MailDefintion>
{
    private static readonly mailConfig: string = "mail";
    private static _instance: MailDefined;
    public static GetInstance(): MailDefined
    {
        if (!MailDefined._instance)
        {
            MailDefined._instance = new MailDefined();
        }
        if (DefinedManager.IsParsed(MailDefined.mailConfig) == false)
        {
            MailDefined._instance.initialize();
        }
        return MailDefined._instance;
    }

    private initialize()
    {
        this.dataList = DefinedManager.GetData(MailDefined.mailConfig) as Array<MailDefintion>;
    }
}

class MailDefintion
{
    /**
     * id
     */
    public id: number;
    /**
     * 类型
     */
    public type: MailResolveType;
    /**
     * 邮件标题
     */
    public title: string;
    /**
     * 邮件
     */
    public content: string;
}