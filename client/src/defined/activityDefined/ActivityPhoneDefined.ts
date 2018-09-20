/**
 * 绑定手机奖励活动配置
 */
class ActivityPhoneDefined extends BaseActivitySubDefined<ActivityPhoneDefintion>
{
    private static readonly config: string = "activity_bindChannel";
    private static _instance: ActivityPhoneDefined;
    public static GetInstance(): ActivityPhoneDefined
    {
        if (!ActivityPhoneDefined._instance)
        {
            ActivityPhoneDefined._instance = new ActivityPhoneDefined();
        }
        if (DefinedManager.IsParsed(ActivityPhoneDefined.config) == false)
        {
            ActivityPhoneDefined._instance.initialize();
        }
        return ActivityPhoneDefined._instance;
    }

    public initialize()
    {
        this.dataList = DefinedManager.GetData(ActivityPhoneDefined.config) as Array<ActivityPhoneDefintion>;
    }
}
/**
 * 绑定手机奖励活动配置
 */
class ActivityPhoneDefintion extends BaseActivitySubDefnition
{
    /**
     * 奖励id
     */
    public awardId: number;
}