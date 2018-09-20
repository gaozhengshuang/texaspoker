/**
 * 活动列表的定义
 * */
class ActivityDefined extends BaseDefined<ActivityDefintion>
{
    private static readonly config: string = "activity_list";
    private static _instance: ActivityDefined;
    public static GetInstance(): ActivityDefined
    {
        if (!ActivityDefined._instance)
        {
            ActivityDefined._instance = new ActivityDefined();
        }
        if (DefinedManager.IsParsed(ActivityDefined.config) == false)
        {
            ActivityDefined._instance.initialize();
        }
        return ActivityDefined._instance;
    }

    public initialize()
    {
        this.dataList = DefinedManager.GetData(ActivityDefined.config) as Array<ActivityDefintion>;
        if (this.dataList)
        {
            for (let def of this.dataList)
            {
                def.triggerParams = qin.StringUtil.toStringArray(def.trigger);
                if (def.startTime)
                {
                    def.startDt = this.getDate(def, def.startTime);
                }
                else
                {
                    def.startDt = TimeManager.Utc1970;
                }
                if (def.endTime)
                {
                    def.endDt = this.getDate(def, def.endTime);
                }
                else
                {
                    def.endDt = new Date(2099, 0, 1, 0, 0, 0);
                }
            }
        }
    }
    public getDate(def: ActivityDefintion, timeStr: string): Date
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
                qin.Console.log("活动时间格式不对！活动ID：" + def.id);
            }
        }
        return null;
    }
}
/**
 * 活动定义
 */
class ActivityDefintion implements IBaseDefintion
{
    public id: number;
    /**
     * 活动类型
     */
    public type: string;
    /**
     * 活动名称
     */
    public name: string;
    /**
     * 开服时间限制(开启限制)
     */
    public openServerTimeStart: number;
    /**
     * 开服倒计时（结束限制）
     */
    public openServerTimeEnd: number;
    /**
     * 创号时间限制(开启限制)
     */
    public keepDayStart: number;
    /**
     * 创号持续天数（结束限制）
     */
    public keepDayEnd: number;
    /**
     * 开始时间
     */
    public startDt: Date;
    /**
     * 结束时间
     */
    public endDt: Date;
    /**
     * 开始时间
     */
    public startTime: string;
    /**
     * 结束时间
     */
    public endTime: string;
    /**
     * 是否是服务器控制时间
     */
    public isByServerTime: boolean;
    /**
     * 活动完成是否显示
     */
    public showFinish: boolean;
    /**
     * 活动图标
     */
    public icon: string;
    /**
     * 活动描述
     */
    public des: string;
    /**
     * 对应UI面板
     */
    public panelName: string;
    /**
     * 不显示在活动中心
     */
    public unInShowPanel: boolean;
    /**
     * 子类型
     */
    public subType: string;
    /**
     * 活动的参与时间
     */
    public joinTime: number;
    /**
     * 触发参数
     */
    public trigger: string;
    /**
     * 活动触发
     */
    public triggerParams: Array<string>;
    /**
     * 触发类型
     */
    public triggerType: ActivityTriggerType;
    /**
     * 资源组名
     */
    public resGroup: string;
    /**
     * 活动背景图
     */
    public imgId: string;
}