/**
 * 手牌竞猜投注定义
*/
class HoleCardsDefined 
{
    private static _instance: HoleCardsDefined;
    public static GetInstance(): HoleCardsDefined
    {
        if (!HoleCardsDefined._instance)
        {
            HoleCardsDefined._instance = new HoleCardsDefined();
        }
        return HoleCardsDefined._instance;
    }
    public getHoleCardsInfoByType(type: number): table.ITHoleCardsDefine
    {
        if (table.THoleCards != null)
        {
            for (let i: number = 0; i < table.THoleCards.length; i++)
            {
                if (table.THoleCards[i].Type == type)
                {
                    return table.THoleCards[i];
                }
            }
        }
        return null;
    }
}
