/**
 * 活动时间定义
*/
class SystemTimeDefined extends BaseDefined<SystemTimeDefinition>
{
    private static readonly systemTimeConfig: string = "systemTime";
    private static _instance: SystemTimeDefined;
    public static GetInstance(): SystemTimeDefined
    {
        if (!SystemTimeDefined._instance)
        {
            SystemTimeDefined._instance = new SystemTimeDefined();
        }
        if (DefinedManager.IsParsed(SystemTimeDefined.systemTimeConfig) == false)
        {
            SystemTimeDefined._instance.initialize();
        }
        return SystemTimeDefined._instance;
    }
    private initialize()
    {
        this.dataList = DefinedManager.GetData(SystemTimeDefined.systemTimeConfig) as Array<SystemTimeDefinition>;
    }
    /**
     * 根据类型获得子类型列表
     */
    public getSubListById(timeId: number): Array<SystemTimeDefinition>
    {
        let result: Array<SystemTimeDefinition> = new Array<SystemTimeDefinition>();
        for (let def of this.dataList)
        {
            if (def.timeId == timeId)
            {
                result.push(def);
            }
        }
        return result;
    }
    /**
     * 获取系统时间类型
     */
    public getSystemType(def: SystemTimeDefinition): SystemTimeType
    {
        if (def.start[6] != -1)
        {
            return SystemTimeType.Week;
        }
        else if (def.start[0] == 0 && def.start[1] == 0 && def.start[2] == 0 && def.end[0] == 0 && def.end[1] == 0 && def.end[2] == 0)
        {
            return SystemTimeType.EveryDay;
        }
        else
        {
            return SystemTimeType.Normal;
        }

    }
}
/**
 * 活动时间定义
*/
class SystemTimeDefinition implements IBaseDefintion
{
    /**
     * id
     */
    public Id: number;
    /**
     * 类型
     */
    public timeId: number;
    /**
     * 子类型id
    */
    public subId: number;
    /**
     * 开始时间
     */
    public start: Array<number>;
    /**
     * 结束时间
     */
    public end: Array<number>;
}