/**
 * 欢乐豪礼活动配置
 */
class ActivityHappyGiftDefined extends BaseActivitySubDefined<ActivityHappyGiftDefintion>
{
    private static readonly activityConfig: string = "activity_happyGift";
    private static _instance: ActivityHappyGiftDefined;
    public static GetInstance(): ActivityHappyGiftDefined
    {
        if (!ActivityHappyGiftDefined._instance)
        {
            ActivityHappyGiftDefined._instance = new ActivityHappyGiftDefined();
        }
        if (DefinedManager.IsParsed(ActivityHappyGiftDefined.activityConfig) == false)
        {
            ActivityHappyGiftDefined._instance.initialize();
        }
        return ActivityHappyGiftDefined._instance;
    }

    public initialize()
    {
        this.dataList = DefinedManager.GetData(ActivityHappyGiftDefined.activityConfig) as Array<ActivityHappyGiftDefintion>;
    }
}
/**
 * 欢乐豪礼活动配置
 */
class ActivityHappyGiftDefintion extends BaseActivitySubDefnition
{
    /**
     * 奖励id
     */
    public awardId: number;
    /**
     * 限制购买次数
     */
    public limit: number;
    /**
     * 消耗
     */
    public cost: number;
}