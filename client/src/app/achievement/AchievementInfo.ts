/**
 * 成就信息
 */
class AchievementInfo implements IHaveDefintionInfo
{
    private _id: number;
    public get id(): number
    {
        return this._id;
    }
    public set id(value: number)
    {
        this._id = value;
        this._definition = AchieveDefined.GetInstance().getDefinition(value);
    }
    private _definition: AchieveDefintion
    public get definition(): AchieveDefintion
    {
        return this._definition;
    }
    public set definition(value: AchieveDefintion)
    {
        this._definition = value;
    }
    /**
     * 是否完成
     */
    public isComplete: boolean;
    /**
     * 是否领取奖励
     */
    public isTake: boolean;
    /**
     * 是否为别人的成就
     */
    public isOther: boolean;
}