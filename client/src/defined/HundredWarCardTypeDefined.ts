/**
 *百人大战牌型赔率信息
*/
class HundredWarCardTypeDefined
{
    private static _instance: HundredWarCardTypeDefined;
    public static GetInstance(): HundredWarCardTypeDefined
    {
        if (!HundredWarCardTypeDefined._instance)
        {
            HundredWarCardTypeDefined._instance = new HundredWarCardTypeDefined();
        }
        return HundredWarCardTypeDefined._instance;
    }
    /**
     * 根据类型获得赔率
    */
    public getOddsByType(type: number): number
    {
        if (table.HundredWarCardType)
        {
            for (let i: number = 0; i < table.HundredWarCardType.length; i++)
            {
                let def = table.HundredWarCardType[i];
                if (def.Type == type)
                {
                    return table.HundredWarCardType[i].Odds;
                }
            }
        }
        return null;
    }
}
