/**
 * 金豆兑换奖品定义
 * */
class GoldenBeanAwardDefined extends BaseDefined<GoldenBeanAwardDefinition>
{
    private static readonly goldenBeanAwardConfig: string = "goldenBeanAward";
    private static _instance: GoldenBeanAwardDefined;
    public static GetInstance(): GoldenBeanAwardDefined
    {
        if (!GoldenBeanAwardDefined._instance)
        {
            GoldenBeanAwardDefined._instance = new GoldenBeanAwardDefined();
        }
        if (DefinedManager.IsParsed(GoldenBeanAwardDefined.goldenBeanAwardConfig) == false)
        {
            GoldenBeanAwardDefined._instance.initialize();
        }
        return GoldenBeanAwardDefined._instance;
    }

    private initialize()
    {
        this.dataList = DefinedManager.GetData(GoldenBeanAwardDefined.goldenBeanAwardConfig) as Array<GoldenBeanAwardDefinition>;
    }
}

/**
* 金豆兑换奖品定义
* */
class GoldenBeanAwardDefinition implements IBaseDefintion
{
    public id: number;
    public awardId: number;
}