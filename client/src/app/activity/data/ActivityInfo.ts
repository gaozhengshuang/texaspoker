/**
 * 活动信息
 */
class ActivityInfo extends BaseServerValueInfo implements IHaveDefintionInfo
{
    public reset()
    {
        
    }
    private _id: number;
    public get id(): number
    {
        return this._id;
    }
    public set id(value: number)
    {
        this._id = value;
        this._definition = ActivityDefined.GetInstance().getDefinition(this._id);
    }

    private _definition: ActivityDefintion;
    public get definition(): ActivityDefintion
    {
        return this._definition;
    }
    /**
     * 活动的完成状态
     */
    public completeState: boolean = false;
    /**
     * 记录玩家累计活动的数据
     */
    public actionNum: number = 0;
    /**
     * 活动是否已经过期
     */
    public IsOutOfTime: boolean = false;
    /**
     * 活动参与开始的时间(服务器提供)
     */
    public severStartDateTime: Date = TimeManager.Utc1970;
    /**
     * 活动参与的结束时间(服务器提供)
     */
    public severEndDateTime: Date = TimeManager.Utc1970;
    /**
     * 活动开始的时间
     */
    public startDateTime: Date = TimeManager.Utc1970;
    /**
     * 活动的结束时间
     */
    public endDateTime: Date = TimeManager.Utc1970;
    /**
     * 活动提示时间
     */
    public notifyTime: Date = TimeManager.Utc1970;
    public notifyIsOpen: boolean;
    /**
     * 已领取奖励的子项列表
     */
    public gotJsonObj: any;
    /**
     * 活动状态的一个描述，可以为登录的天数|签到的天数|充值的金额-- --
     */
    public step: number;
    /**
     * 	一个活动全服玩家的step（公共step）
     */
    public pubStep: number;
    /**
     * 对应协议json的对象 仅当前玩家
     */
    public jsonObj: any;
    /**
     * 对应协议pubJson的对象 一个活动全服玩家的json（公共JSON)
     */
    public pubJsonObj: any;
    /**
     * 子活动列表
     */
    public subList: Array<BaseActivitySubInfo<BaseActivitySubDefnition>>;
}