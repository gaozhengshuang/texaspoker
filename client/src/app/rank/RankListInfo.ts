/**
 * 排行榜信息
 */
class RankListInfo implements IHaveDefintionInfo
{
    public definition: table.IRankDefine;
    public lastTime: number;
    public list: Array<RankInfo>;
}
