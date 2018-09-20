/**
 * 计时奖励定义
*/
class TimeAwardDefined extends BaseDefined<TimeAwardDefinition>
{
    private static readonly timeAwardConfig: string = "timeAward";
    private static _instance: TimeAwardDefined;
    public static GetInstance(): TimeAwardDefined
    {
        if (!TimeAwardDefined._instance)
        {
            TimeAwardDefined._instance = new TimeAwardDefined();
        }
        if (DefinedManager.IsParsed(TimeAwardDefined.timeAwardConfig) == false)
        {
            TimeAwardDefined._instance.initialize();
        }
        return TimeAwardDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(TimeAwardDefined.timeAwardConfig) as Array<TimeAwardDefinition>;
        for (let def of this.dataList)
        {
            def.awardList = new Array<number>();
            for (let i: number = 0; i < 3; i++)
            {
                let str: string = "roomType";
                let index: number = i + 1;
                def.awardList[i] = def[str + index];
            }
        }
    }
}
/**
 * 计时奖励定义
 * */
class TimeAwardDefinition implements IBaseDefintion
{
    /**
     * 轮数（计时奖励的等级）
     */
    public id: number;
	/**
	 * 初级场对应的金币奖励
	 */
    public roomType1: number;
    /**
     * 中级场对应的金币奖励
     */
    public roomType2: number;
    /**
     * 高级场对应的金币奖励
     */
    public roomType3: number;
    /**
     * 得到奖励所需的时间(总秒数)
     */
    public time: number;
    /**
     * 奖励数组
    */
    public awardList: Array<number>;
}