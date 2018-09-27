/**
 * 破产补助活动配置
 */
class BankruptSubsidyDefined extends BaseActivitySubDefined<any>
{
    private static readonly config: string = "activity_bankruptSubsidy";
    private static _instance: BankruptSubsidyDefined;
    public static GetInstance(): BankruptSubsidyDefined
    {
        if (!BankruptSubsidyDefined._instance)
        {
            BankruptSubsidyDefined._instance = new BankruptSubsidyDefined();
        }
        if (DefinedManager.IsParsed(BankruptSubsidyDefined.config) == false)
        {
            BankruptSubsidyDefined._instance.initialize();
        }
        return BankruptSubsidyDefined._instance;
    }

    public initialize()
    {
        // this.dataList = DefinedManager.GetData(BankruptSubsidyDefined.config) as Array<BankruptSubsidyDefintion>; //move todo
    }
}
/**
 * 破产补助配置
 */
class BankruptSubsidyDefintion
{
    /**
     * 奖励id
     */
    public awardId: number;
    /**
     * 条件
     */
    public limitGold: number;
    /**
     * 领取次数
     */
    public times: number;
}