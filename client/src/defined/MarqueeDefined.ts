/**
 *跑马灯
*/
class MarqueeDefined extends BaseDefined<MarqueeDefinition>
{
    public static readonly marqueeConfig: string = "marquee";
    private static _instance: MarqueeDefined;
    public static GetInstance(): MarqueeDefined
    {
        if (!MarqueeDefined._instance)
        {
            MarqueeDefined._instance = new MarqueeDefined();
        }
        if (DefinedManager.IsParsed(MarqueeDefined.marqueeConfig) == false)
        {
            MarqueeDefined._instance.initialize();
        }
        return MarqueeDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(MarqueeDefined.marqueeConfig) as Array<MarqueeDefinition>;
    }
    /**
     * 通过type获得数据
    */
    public getInfoByType(type: MarqueeMsgType): MarqueeDefinition
    {
        if (this.dataList != null)
        {
            for (let def of this.dataList)
            {
                if (def.type == type)
                {
                    return def;
                }
            }
        }
        return null;
    }
}
/**
* 跑马灯定义
*/
class MarqueeDefinition implements IBaseDefintion
{
    public Id: number;
    public type: number;
    /**
     * 显示位置
    */
    public show: number;
    /**
     * 信息
    */
    public message: string;
}