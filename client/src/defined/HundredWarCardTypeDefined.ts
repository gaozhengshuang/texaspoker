/**
 *百人大战牌型赔率信息
*/
class HundredWarCardTypeDefined extends BaseDefined<HundredWarCardTypeDefinition>
{
    public static readonly hundredWarCardTypeConfig: string = "hundredWarCardType";
    private static _instance: HundredWarCardTypeDefined;
    public static GetInstance(): HundredWarCardTypeDefined
    {
        if (!HundredWarCardTypeDefined._instance)
        {
            HundredWarCardTypeDefined._instance = new HundredWarCardTypeDefined();
        }
        if (DefinedManager.IsParsed(HundredWarCardTypeDefined.hundredWarCardTypeConfig) == false)
        {
            HundredWarCardTypeDefined._instance.initialize();
        }
        return HundredWarCardTypeDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(HundredWarCardTypeDefined.hundredWarCardTypeConfig) as Array<HundredWarCardTypeDefinition>;
    }
    /**
     * 根据类型获得赔率
    */
    public getOddsByType(type: number): number
    {
        if (this.dataList != null)
        {
            for (let i: number = 0; i < this.dataList.length; i++)
            {
                if (this.dataList[i].type == type)
                {
                    return this.dataList[i].odds;
                }
            }
        }
        return null;
    }
}
/**
* 百人大战牌型赔率定义
*/
class HundredWarCardTypeDefinition implements IBaseDefintion
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
     * 赔率
    */
    public odds: number;
    /**
     * 爆奖池赔率
    */
    public poolOdds: number;
}
