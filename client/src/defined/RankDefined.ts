/**
 * 排行榜的定义
 * */
class RankDefined extends BaseDefined<RankDefinition>
{
    private static readonly rankConfig: string = "rank";
    private static _instance: RankDefined;
    public static GetInstance(): RankDefined
    {
        if (!RankDefined._instance)
        {
            RankDefined._instance = new RankDefined();
        }
        if (DefinedManager.IsParsed(RankDefined.rankConfig) == false)
        {
            RankDefined._instance.initialize();
        }
        return RankDefined._instance;
    }

    private initialize()
    {
        this.dataList = DefinedManager.GetData(RankDefined.rankConfig) as Array<RankDefinition>;
    }
}

/**
* 用户等级的定义
* */
class RankDefinition implements IBaseDefintion
{   
    /**
     * id
     */
    public id: number;
    /**
     * 排行榜类型
     */
    public type: RankType;
    /**
     * 参数1
     */
    public param1: number;
    /**
     * 参数2
     */
    public param2: number;
    /**
     * 参数3
     */
    public param3: number;
    /**
     * 刷新时间
     */
    public cd: number;
}