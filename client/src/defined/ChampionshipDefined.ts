/**
 * 锦标赛定义
*/
class ChampionshipDefined extends BaseDefined<ChampionshipDefinition>
{
    private static readonly championshipConfig: string = "championship";
    private static _instance: ChampionshipDefined;
    public static GetInstance(): ChampionshipDefined
    {
        if (!ChampionshipDefined._instance)
        {
            ChampionshipDefined._instance = new ChampionshipDefined();
        }
        // if (DefinedManager.IsParsed(ChampionshipDefined.championshipConfig) == false) //movetodo
        // {
        //     ChampionshipDefined._instance.initialize();
        // }
        return ChampionshipDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(ChampionshipDefined.championshipConfig) as Array<ChampionshipDefinition>;
    }
    /**
     * 获得坐满即玩赛事列表
    */
    public getSitAndPlayMatchList(): Array<ChampionshipDefinition>
    {
        if (this.dataList != null)
        {
            let matchList: Array<ChampionshipDefinition> = new Array<ChampionshipDefinition>();
            for (let info of this.dataList)
            {
                if (info.type == MatchType.SNG)
                {
                    matchList.push(info);
                }
            }
            return matchList;
        }
        return null;
    }
}
/**
 * 锦标赛定义
 * */
class ChampionshipDefinition implements IBaseDefintion
{
    /**
     * id
     */
    public id: number;
    /**
     * 房间ID
     */
    public roomId:number;
	/**
	 * 名字
	 */
    public name: string;
    /**
     * icon
     */
    public icon: string;
    /**
     * 最小人数
     */
    public sNum: number;
    /**
     * 最大人数
     */
    public bNum: number;
    /**
     * 参赛费
     */
    public signCost: number;
    /**
     * 手续费
     */
    public serveCost: number;
    /**
     * 门票id
     */
    public ticketId: number;
    /**
     * 时间id
     */
    public timeId: number;
    /**
     * 赛事开始时间之前多久开始显示 （即显示在赛事列表中）
     */
    public displayTime: number;
    /**
     * 距离比赛开始时间多久可以开启报名
    */
    public signTime: number;
    /**
     * 延迟报名时间
     */
    public delaySign: number;
    /**
     * 重购次数(有次数就可重购)
     */
    public rebuy: number;
    /**
     *  一局最大重购次数
     */
    public maxRebuyTimes: number;
    /**
     * 增购次数(有次数就可增购)
     */
    public addon: number;
    /**
     * prize表中的type (用来拉取该赛事名次对应的奖励的信息的awardId)
     */
    public prize: number;
    /**
     * championshipBlind表中的type (用来拉取该赛事不同时间对应的盲注等信息)
     */
    public blindType: number;
    /**
     * 初始筹码
     */
    public initialChips: number;
    /**
     * 循环间隔时间
    */
    public intervalSec: number;
    /**
     * 循环次数
    */
    public loopTimes: number;
    /**
     * 增购数量
    */
    public addonChips: number;
    /**
     * 增购花费
    */
    public addonCost: number;
    /**
     * 重购花费
    */
    public rebuyCost: number;
    /**
     * 赛事类型
    */
    public type: number;
    /**
     * 开赛的准备时间
     */
    public waitingTime:number;
}