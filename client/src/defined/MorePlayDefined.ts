/**
 * 更多玩法的定义
 * */
class MorePlayDefined 
{
    private static _instance: MorePlayDefined;
    public static GetInstance(): MorePlayDefined
    {
        if (!MorePlayDefined._instance)
        {
            MorePlayDefined._instance = new MorePlayDefined();
        }
        return MorePlayDefined._instance;
    }

    public initialize()
    {
        if (table.MorePlay)
        {
            for (let def of table.MorePlay)
            {
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
    private getDate(def: table.IMorePlayDefine, timeStr: string): Date
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
                game.Console.log("时间格式不对！活动ID：" + def.Id);
            }
        }
        return null;
    }
    /**
     * 获取显示的玩法定义列表
     */
    private getShowDefList(): Array<table.IMorePlayDefine>
    {
        if (table.MorePlay)
        {
            let result: Array<table.IMorePlayDefine> = new Array<table.IMorePlayDefine>();
            let dt: Date = TimeManager.GetServerLocalDateTime();
            for (let def of table.MorePlay)
            {
                let startDt = new Date(def.StartTime[0], def.StartTime[1], def.StartTime[2], def.StartTime[3], def.StartTime[4], def.StartTime[5]);
                let endDt = new Date(def.EndTime[0], def.EndTime[1], def.EndTime[2], def.EndTime[3], def.EndTime[4], def.EndTime[5]);

                if (dt >= startDt && dt < endDt)
                {
                    result.push(def);
                }
            }
            return result;
        }
        return null;
    }
    /**
     * 获取在大厅显示的定义
     */
    public getDefInHall(): table.IMorePlayDefine
    {
        let list = this.getShowDefList();
        if (list)
        {
            for (let def of list)
            {
                if (def.IsInHall)
                {
                    return def;
                }
            }
        }
        return null;
    }
    /**
     * 获取在更多玩法面板显示的玩法定义列表
     */
    public getDefListInMorePlay(): Array<table.IMorePlayDefine>
    {
        let list = this.getShowDefList();
        if (list)
        {
            let result: Array<table.IMorePlayDefine> = new Array<table.IMorePlayDefine>();
            for (let def of list)
            {
                if (!def.IsInHall)
                {
                    result.push(def);
                }
            }
            return result;
        }
        return null;
    }
}