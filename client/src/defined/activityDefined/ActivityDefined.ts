/**
 * 活动列表的定义
 * */
class ActivityDefined
{
    private static _instance: ActivityDefined;
    public static GetInstance(): ActivityDefined
    {
        if (!ActivityDefined._instance)
        {
            ActivityDefined._instance = new ActivityDefined();
        }
        return ActivityDefined._instance;
    }
    public initialize()
    {
        if (table.Activity_list)
        {
            for (let def of table.Activity_list)
            {
                // def.TriggerParams = game.StringUtil.toStringArray(def.trigger);
                if (def.StartTime.length == 0)
                {
                    def.StartTime = [2000, 0, 1, 0, 0, 0];
                }
                if (def.EndTime.length == 0)
                {
                    def.EndTime = [2099, 0, 1, 0, 0, 0];
                }
            }
        }
    }
    public getDate(def: table.IActivity_listDefine, timeStr: string): Date
    {
        let dataArr: Array<number>;
        dataArr = game.StringUtil.toIntArray(timeStr);
        if (dataArr)
        {
            if (dataArr.length == 6)
            {
                return new Date(dataArr[0], dataArr[1] - 1, dataArr[2], dataArr[3], dataArr[4], dataArr[5]);
            }
            else
            {
                game.Console.log("活动时间格式不对！活动ID：" + def.Id);
            }
        }
        return null;
    }
}
ActivityDefined.GetInstance().initialize();