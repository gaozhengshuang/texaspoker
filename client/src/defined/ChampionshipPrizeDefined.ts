/**
 * 锦标赛赛事奖品的定义
 * */
class ChampionshipPrizeDefined extends BaseDefined<ChampionshipPrizeDefinition>
{
    private static readonly championshipPrizeConfig: string = "championshipPrize";
    private static _instance: ChampionshipPrizeDefined;
    public static GetInstance(): ChampionshipPrizeDefined
    {
        if (!ChampionshipPrizeDefined._instance)
        {
            ChampionshipPrizeDefined._instance = new ChampionshipPrizeDefined();
        }
        if (DefinedManager.IsParsed(ChampionshipPrizeDefined.championshipPrizeConfig) == false)
        {
            ChampionshipPrizeDefined._instance.initialize();
        }
        return ChampionshipPrizeDefined._instance;
    }

    private initialize()
    {
        this.dataList = DefinedManager.GetData(ChampionshipPrizeDefined.championshipPrizeConfig) as Array<ChampionshipPrizeDefinition>;
    }
    /**
     * 根据type类型获得championshipPrize的集合数组
    */
    public getChampionshipPrizeList(prizeId: number): Array<ChampionshipPrizeDefinition>
    {
        if (this.dataList != null)
        {
            let championshipPrizeList: Array<ChampionshipPrizeDefinition> = new Array<ChampionshipPrizeDefinition>();
            for (let def of this.dataList)
            {
                if (def.prizeId == prizeId)
                {
                    if (def.start != def.end)
                    {
                        for (let i: number = def.start; i <= def.end - def.start; i++)
                        {
                            let info: ChampionshipPrizeDefinition = new ChampionshipPrizeDefinition();
                            info.id = def.id;
                            info.start = i;
                            info.end = i;
                            info.prizeId = def.prizeId;
                            info.awardId = def.awardId;
                            championshipPrizeList.push(def);
                        }
                    } else
                    {
                        championshipPrizeList.push(def);
                    }
                }
            }
            return championshipPrizeList;
        }
    }
}
/**
 * 奖品的定义
 * */
class ChampionshipPrizeDefinition implements IBaseDefintion
{
    /**
     * 奖品id
     */
    public id: number;
	/**
	 * 奖品类型
	 */
    public prizeId: number;
    /**
     * 获取该奖品的开始名次
     */
    public start: number;
    /**
     * 获得该奖品的结束名次
     */
    public end: number;
    /**
     * 对应award表中的rewardId
     */
    public awardId: number;
}