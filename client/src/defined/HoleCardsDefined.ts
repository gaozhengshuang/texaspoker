/**
 * 手牌竞猜投注定义
*/
class HoleCardsDefined extends BaseDefined<HoleCardsDefinition>
{
    private static readonly holeCardsConfig: string = "holeCards";
    private static _instance: HoleCardsDefined;
    public static GetInstance(): HoleCardsDefined
    {
        if (!HoleCardsDefined._instance)
        {
            HoleCardsDefined._instance = new HoleCardsDefined();
        }
        if (DefinedManager.IsParsed(HoleCardsDefined.holeCardsConfig) == false)
        {
            HoleCardsDefined._instance.initialize();
        }
        return HoleCardsDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(HoleCardsDefined.holeCardsConfig) as Array<HoleCardsDefinition>;
    }
    public getHoleCardsInfoByType(type: number): HoleCardsDefinition
    {
        if (this.dataList != null)
        {
            for (let i: number = 0; i < this.dataList.length; i++)
            {
                if (this.dataList[i].type == type)
                {
                    return this.dataList[i];
                }
            }
        }
        return null;
    }
}
/**
 * 手牌竞猜投注定义
 * */
class HoleCardsDefinition implements IBaseDefintion
{
    /**
     * id
     */
    public id: number;
    /**
     * 类型
    */
    public type: number;
    /**
     * 描述
    */
    public des: string;
    /**
     * 赔率
    */
    public odds: number;
}