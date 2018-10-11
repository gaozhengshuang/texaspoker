/**
 * 分享抽奖活动配置
 */
class ActivityShareDefined extends BaseActivitySubDefined<any>
{
    private static readonly config: string = "activity_share";
    private static _instance: ActivityShareDefined;
    public static GetInstance(): ActivityShareDefined
    {
        if (!ActivityShareDefined._instance)
        {
            ActivityShareDefined._instance = new ActivityShareDefined();
        }
        if (DefinedManager.IsParsed(ActivityShareDefined.config) == false)
        {
            ActivityShareDefined._instance.initialize();
        }
        return ActivityShareDefined._instance;
    }

    public initialize()
    {
        // this.dataList = DefinedManager.GetData(ActivityShareDefined.config) as Array<ActivityShareDefintion>;  //move todo
        // for (let def of this.dataList)
        // {
        //     this.setAwardInfoDefinitionList(def);
        // }
    }
    private setAwardInfoDefinitionList(awardDef: ActivityShareDefintion)
    {
        if (awardDef["rewardType"])
        {
            awardDef.rewardList = new Array<AwardInfoDefinition>();
            for (let i: number = 0; i < awardDef["rewardType"].length; i++)
            {
                let reward: AwardInfoDefinition = new AwardInfoDefinition();
                reward.type = awardDef["rewardType"][i];
                if (awardDef["rewardId"])
                {
                    reward.id = awardDef["rewardId"][i];
                }
                if (awardDef["rewardNum"])
                {
                    reward.count = awardDef["rewardNum"][i];
                }
                awardDef.rewardList.push(reward);
            }
        }
    }
}
/**
 * 分享抽奖活动配置
 */
class ActivityShareDefintion
{
    /**
     * 奖励列表
    */
    public rewardList: Array<AwardInfoDefinition>;
    /**
     * 权重
    */
    public weight: number;
    /**
     * 是否在滚动列表中滚动展现   1 展现  无 不展现
    */
    public hotTag: number;
}