/**
 * 锦标赛定义
*/
class ChampionshipDefined
{
    private static _instance: ChampionshipDefined;
    public static GetInstance(): ChampionshipDefined
    {
        if (!ChampionshipDefined._instance)
        {
            ChampionshipDefined._instance = new ChampionshipDefined();
        }
        return ChampionshipDefined._instance;
    }
    /**
     * 获得坐满即玩赛事列表
    */
    public getSitAndPlayMatchList(): Array<table.IChampionshipDefine>
    {
        if (table.Championship)
        {
            let matchList: Array<table.IChampionshipDefine> = new Array<table.IChampionshipDefine>();
            for (let info of table.Championship)
            {
                if (info.Type == MatchType.SNG)
                {
                    matchList.push(info);
                }
            }
            return matchList;
        }
        return null;
    }
}