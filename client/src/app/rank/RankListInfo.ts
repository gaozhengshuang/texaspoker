/**
 * 排行榜信息
 */
class RankListInfo implements IHaveDefintionInfo
{
    public definition: RankDefinition;
    public lastTime: number;
    public list: Array<RankInfo>;
}
