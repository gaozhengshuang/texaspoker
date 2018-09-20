/**
 * 更多玩法的定义
 * */
class MorePlayDefined extends BaseDefined<MorePlayDefinition>
{
    private static readonly morePlayConfig: string = "morePlay";
    private static _instance: MorePlayDefined;
    public static GetInstance(): MorePlayDefined
    {
        if (!MorePlayDefined._instance)
        {
            MorePlayDefined._instance = new MorePlayDefined();
        }
        if (DefinedManager.IsParsed(MorePlayDefined.morePlayConfig) == false)
        {
            MorePlayDefined._instance.initialize();
        }
        return MorePlayDefined._instance;
    }

    private initialize()
    {
        this.dataList = DefinedManager.GetData(MorePlayDefined.morePlayConfig) as Array<MorePlayDefinition>;
        if (this.dataList)
        {
            for (let def of this.dataList)
            {
                if (def.startTime)
                {
                    def.startDate = this.getDate(def, def.startTime);
                }
                else
                {
                    def.startDate = TimeManager.Utc1970;
                }
                if (def.endTime)
                {
                    def.endDate = this.getDate(def, def.endTime);
                }
                else
                {
                    def.endDate = new Date(2099, 0, 1, 0, 0, 0);
                }
            }
        }
    }
    private getDate(def: MorePlayDefinition, timeStr: string): Date
    {
        let dataArr: Array<number>;
        dataArr = qin.StringUtil.toIntArray(timeStr);
        if (dataArr)
        {
            if (dataArr.length == 6)
            {
                return new Date(dataArr[0], dataArr[1] - 1, dataArr[2], dataArr[3], dataArr[4], dataArr[5]);
            }
            else
            {
                qin.Console.log("时间格式不对！活动ID：" + def.id);
            }
        }
        return null;
    }
    /**
     * 获取显示的玩法定义列表
     */
    private getShowDefList(): Array<MorePlayDefinition>
    {
        if (this.dataList)
        {
            let result: Array<MorePlayDefinition> = new Array<MorePlayDefinition>();
            let dt: Date = TimeManager.GetServerLocalDateTime();
            for (let def of this.dataList)
            {
                if (dt >= def.startDate && dt < def.endDate)
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
    public getDefInHall(): MorePlayDefinition
    {
        let list = this.getShowDefList();
        if (list)
        {
            for (let def of list)
            {
                if (def.isInHall)
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
    public getDefListInMorePlay(): Array<MorePlayDefinition>
    {
        let list = this.getShowDefList();
        if (list)
        {
            let result: Array<MorePlayDefinition> = new Array<MorePlayDefinition>();
            for (let def of list)
            {
                if (!def.isInHall)
                {
                    result.push(def);
                }
            }
            return result;
        }
        return null;
    }
}

/**
* 更多玩法的定义
* */
class MorePlayDefinition implements IBaseDefintion
{
    public id: number;
    public name: string;
    public isInHall: boolean;
    public icon: string;
    public des: string;
    public startTime: string;
    public endTime: string;
    public desId: number;

    public startDate: Date;
    public endDate: Date;
}