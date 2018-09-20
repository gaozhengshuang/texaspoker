/**
 * 最近赛况
*/
class OutsInfo
{
    /**
     * 赛事id
    */
    public id: number;
    /**
     * 当前赛事唯一id
    */
    public recordId: number;
    /**
     * 赛事时间
    */
    public time: number;
    /**
     * 名字
    */
    public name: string;
    /**
     * 排名信息
    */
    public rankList: Array<ChampionshipRankInfo>;
}