/**
 * 用户等级的定义
 * */
class ExpDefined extends BaseDefined<ExpDefinition>
{
    private static readonly expConfig: string = "exp";
    private static _instance: ExpDefined;
    public static GetInstance(): ExpDefined
    {
        if (!ExpDefined._instance)
        {
            ExpDefined._instance = new ExpDefined();
        }
        if (DefinedManager.IsParsed(ExpDefined.expConfig) == false)
        {
            ExpDefined._instance.initialize();
        }
        return ExpDefined._instance;
    }

    private initialize()
    {
        this.dataList = DefinedManager.GetData(ExpDefined.expConfig) as Array<ExpDefinition>;
    }
}

/**
* 用户等级的定义
* */
class ExpDefinition implements IBaseDefintion
{
    public id: number;
    public level: number;
    public exp: number;
    public title: string;
}