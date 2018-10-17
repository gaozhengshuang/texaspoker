/**
 * 活动时间定义
*/
class SystemTimeDefined
{
    private static _instance: SystemTimeDefined;
    public static GetInstance(): SystemTimeDefined
    {
        if (!SystemTimeDefined._instance)
        {
            SystemTimeDefined._instance = new SystemTimeDefined();
        }
     
        return SystemTimeDefined._instance;
    }
    /**
     * 根据类型获得子类型列表
     */
    public getSubListById(timeId: number): Array<table.ISystemTimeDefine>
    {
        let result: Array<table.ISystemTimeDefine> = new Array<table.ISystemTimeDefine>();
        for (let def of table.SystemTime)
        {
            if (def.TimeId == timeId)
            {
                result.push(def);
            }
        }
        return result;
    }
    /**
     * 获取系统时间类型
     */
    public getSystemType(def: table.ISystemTimeDefine): SystemTimeType
    {
        if (def.Start[6] != -1)
        {
            return SystemTimeType.Week;
        }
        else if (def.Start[0] == 0 && def.Start[1] == 0 && def.Start[2] == 0 && def.End[0] == 0 && def.End[1] == 0 && def.End[2] == 0)
        {
            return SystemTimeType.EveryDay;
        }
        else
        {
            return SystemTimeType.Normal;
        }

    }
}