/**
 * VIP的定义
 * */
class VipDefined extends BaseDefined<VipDefinition>
{
    private static readonly vipConfig: string = "vip";
    private static _instance: VipDefined;
    public static GetInstance(): VipDefined
    {
        if (!VipDefined._instance)
        {
            VipDefined._instance = new VipDefined();
        }
        if (DefinedManager.IsParsed(VipDefined.vipConfig) == false)
        {
            VipDefined._instance.initialize();
        }
        return VipDefined._instance;
    }

    private initialize()
    {
        this.dataList = DefinedManager.GetData(VipDefined.vipConfig) as Array<VipDefinition>;
    }
    /**
     * 通过等级查找配置
     */
    public getVipDefinitionByLevel(level: number): VipDefinition
    {
        for (let def of this.dataList)
        {
            if (def.level == level)
            {
                return def;
            }
        }
        qin.Console.log("获取失败！level:" + level.toString());
        return null;
    }

    /**
    * 获取vip等级
    */
    public getVipLevel(vipExp: number): number
    {
        if (!this.dataList || this.dataList.length == 0)
        {
            qin.Console.log("vip表为空");
        }
        for (let i = this.dataList.length - 1; i >= 0; i--)
        {
            if (vipExp < this.dataList[i].totalExp)
            {
                continue;
            }
            return this.dataList[i].level;
        }
        return this.dataList[0].level;
    }
}

/**
 * vip的定义
 * */
class VipDefinition implements IBaseDefintion
{
    /**
     * id
     */
    public id: number;
    /**
     * VIP等级
     */
    public level: number;
    /**
     * VIP当级经验
     */
    public exp: number;
    /**
     * 总需要经验
     */
    public totalExp: number;
    /**
     * 专属成就
     */
    public exclusiveAchieve: number;
    /**
     * 等级加速系数
     */
    public expRate: number;
    /**
     * 好友排名靠前
     */
    public friendRank: number;
    /**
     * 好友数量
     */
    public friendLimit: number;
    /**
     * 创建私人房
     */
    public createRoom: number;
    /**
     * 使用保险箱
     */
    public useSafe: number;
}