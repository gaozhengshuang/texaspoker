/**
 * VIP的定义
 * */
class VipDefined 
{
    private static _instance: VipDefined;
    public static GetInstance(): VipDefined
    {
        if (!VipDefined._instance)
        {
            VipDefined._instance = new VipDefined();
        }
        
        return VipDefined._instance;
    }
    /**
     * 通过等级查找配置
     */
    public getVipDefinitionByLevel(level: number): table.ITVipDefine
    {
        for (let def of table.TVip)
        {
            if (def.Level == level)
            {
                return def;
            }
        }
        game.Console.log("获取失败！level:" + level.toString());
        return null;
    }

    /**
    * 获取vip等级
    */
    public getVipLevel(vipExp: number): number
    {
        if (!table.TVip)
        {
            game.Console.log("vip表为空");
            return;
        }
        for (let i = table.TVip.length - 1; i >= 0; i--)
        {
            if (vipExp < table.TVip[i].TotalExp)
            {
                continue;
            }
            return table.TVip[i].Level;
        }
        return table.TVip[0].Level;
    }
}