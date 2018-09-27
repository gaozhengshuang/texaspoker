/**
 * 充值活动配置
 */
class ActivityPayPrizeDefined extends BaseActivitySubDefined<any>
{
    private static readonly config: string = "activity_payPrize";
    private static _instance: ActivityPayPrizeDefined;
    public static GetInstance(): ActivityPayPrizeDefined
    {
        if (!ActivityPayPrizeDefined._instance)
        {
            ActivityPayPrizeDefined._instance = new ActivityPayPrizeDefined();
        }
        if (DefinedManager.IsParsed(ActivityPayPrizeDefined.config) == false)
        {
            ActivityPayPrizeDefined._instance.initialize();
        }
        return ActivityPayPrizeDefined._instance;
    }

    public initialize()
    {
        // this.dataList = DefinedManager.GetData(ActivityPayPrizeDefined.config) as Array<ActivityPayPrizeDefintion>;  //move todo
    }
}
/**
 * 充值活动配置
 */
class ActivityPayPrizeDefintion
{
    /**
     * 充值金额（单位：分）
     */
    public payNum: number;
    /**
     * 奖励id
     */
    public awardId: number;
    /**
     * 是否自动发奖
     */
    public isAutoPrize: boolean;
    /**
     * 描述
     */
    public des: string;
}