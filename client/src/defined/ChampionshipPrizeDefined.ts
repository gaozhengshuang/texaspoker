/**
 * 锦标赛赛事奖品的定义
 * */
class ChampionshipPrizeDefined
{
    private static _instance: ChampionshipPrizeDefined;
    public static GetInstance(): ChampionshipPrizeDefined
    {
        if (!ChampionshipPrizeDefined._instance)
        {
            ChampionshipPrizeDefined._instance = new ChampionshipPrizeDefined();
        }
        return ChampionshipPrizeDefined._instance;
    }

    /**
     * 根据type类型获得championshipPrize的集合数组
    */
    public getChampionshipPrizeList(prizeId: number): Array<table.IChampionshipPrizeDefine>
    {
        if (table.ChampionshipPrize)
        {
            let championshipPrizeList: Array<table.IChampionshipPrizeDefine> = new Array<table.IChampionshipPrizeDefine>();
            for (let def of table.ChampionshipPrize)
            {
                if (def.PrizeId == prizeId)
                {
                    if (def.Start != def.End)
                    {
                        for (let i: number = def.Start; i <= def.End - def.Start; i++)
                        {
                            let info: table.IChampionshipPrizeDefine = {};
                            info.Id = def.Id;
                            info.Start = i;
                            info.End = i;
                            info.PrizeId = def.PrizeId;
                            info.AwardId = def.AwardId;
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
