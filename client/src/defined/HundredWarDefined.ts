/**
 *百人大战信息
*/
class HundredWarDefined extends BaseDefined<HundredWarDefinition>
{
    public static readonly hundredWarConfig: string = "hundredWar";
    private static _instance: HundredWarDefined;
    public static GetInstance(): HundredWarDefined
    {
        if (!HundredWarDefined._instance)
        {
            HundredWarDefined._instance = new HundredWarDefined();
        }
        if (DefinedManager.IsParsed(HundredWarDefined.hundredWarConfig) == false)
        {
            HundredWarDefined._instance.initialize();
        }
        return HundredWarDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(HundredWarDefined.hundredWarConfig) as Array<HundredWarDefinition>;
    }
}
/**
* 百人大战定义
*/
class HundredWarDefinition implements IBaseDefintion
{
    /**
     * ID
    */
    public id: number;
    /**
     * 类型
    */
    public type: number;
    /**
     * 名字
    */
    public name: string;
    /**
     * 进入下限
    */
    public minBuyin: number;
    /**
     * 最大人数
    */
    public maxRole: number;
    /**
     * 下注筹码
    */
    public bet: Array<number>;
    /**
     *  上庄需要金币
     */
    public bankerGold: number;
    /**
     * 入座需要金币
     */
    public seatGold: number;
    /**
     * 押注比例
     */
    public bettingRatio: number;
    /**
     * 税率
     */
    public taxRate: number;
    /**
     * 座位数
     */
    public seat: number;
    /**
     * icon
     */
    public icon: string;
    /**
     * 未压住踢出轮数
    */
    public kick: number;
    /**
     * 牌局休息时间
    */
    public waitTime: number;
    /**
     * 下注时间
    */
    public betTime: number;
    /**
     * 自动确认时间
    */
    public confirmTime: number;
    /**
     * 服务器发牌结算+等待超时总时长
    */
    public timeOut: number;
    /**
     * 最小在庄金币
    */
    public bankerMinGold: number;
    /**
     * 最大在庄回合数
    */
    public bankerRound: number;
    /**
     * 奖池图片
     */
    public poolImg: string;
    /**
     * 标题图片
     */
    public titleImg: string;
    /**
     * 字体颜色
     */
    public fontColor: number;
}
