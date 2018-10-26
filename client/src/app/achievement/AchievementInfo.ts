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
        this._definition = table.AchieveById[value];
    }
    private _definition: table.IAchieveDefine
    public get definition(): table.IAchieveDefine
    {
        return this._definition;
    }
    public set definition(value: table.IAchieveDefine)
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
    /**
     * 是否是激活
     */
    public isActive:boolean;
    /**
     * 设置默认激活，幸运任务默认不激活
     */
    public setActive()
    {
        this.isActive = true;
        if(this.definition && this.definition.LuckyTask > 0)
        {
            this.isActive = false;
        }
    }
}