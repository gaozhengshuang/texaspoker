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
        // this.dataList = DefinedManager.GetData(ActivityDefined.config) as Array<ActivityDefintion>;
        // if (this.dataList)
        // {
        //     for (let def of this.dataList)
        //     {
        //         def.triggerParams = game.StringUtil.toStringArray(def.trigger);
        //         if (def.startTime)
        //         {
        //             def.startDt = this.getDate(def, def.startTime);
        //         }
        //         else
        //         {
        //             def.startDt = TimeManager.Utc1970;
        //         }
        //         if (def.endTime)
        //         {
        //             def.endDt = this.getDate(def, def.endTime);
        //         }
        //         else
        //         {
        //             def.endDt = new Date(2099, 0, 1, 0, 0, 0);
        //         }
        //     }
        // }
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