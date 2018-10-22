/**
 *跑马灯
*/
class MarqueeDefined
{
    private static _instance: MarqueeDefined;
    public static GetInstance(): MarqueeDefined
    {
        if (!MarqueeDefined._instance)
        {
            MarqueeDefined._instance = new MarqueeDefined();
        }
        return MarqueeDefined._instance;
    }
    /**
     * 通过type获得数据
    */
    public getInfoByType(type: MarqueeMsgType): table.IMarqueeDefine
    {
        if (table.Marquee)
        {
            for (let def of table.Marquee)
            {
                if (def.Type == type)
                {
                    return def;
                }
            }
        }
        return null;
    }
}