/**
 * 奖励次数信息
 */
class AwardTimesInfo implements IHaveDefintionInfo
{

    private _id: number;
    public get id(): number
    {
        return this._id;
    }
    public set id(value: number)
    {
        this._id = value;
        this._definition = AwardDefined.GetInstance().getDefinition(this._id);
    }

    private _definition: AwardDefinition;

    public get definition(): AwardDefinition
    {
        return this._definition;
    }
    /**
     * 已经发送的次数
     */
    public times: number;
    /**
     * 最近一次的修改时间
     */
    public lastTime: number;

    public setInfo(id: number, times: number, lastTime: number)
    {
        this.id = id;
        this.times = times;
        this.lastTime = lastTime;
    }
}