class PilePrizeItemInfo extends BaseActivitySubInfo<ActivityPilePrizeDefintion>
{
    protected trySetDefinition()
    {
        super.trySetDefinition();
        this._definition = ActivityPilePrizeDefined.GetInstance().getSubDefinition(this._id, this._subId);
    }
    public get awardInfoDef(): AwardDefinition
    {
        if (this.definition)
        {
            let awardDef = AwardDefined.GetInstance().getDefinition(this.definition.awardId);
            if (awardDef)
            {
                return awardDef;
            }
        }
        return null;
    }
    /**
     * 进度
     */
    public process: number;
    /**
     * 是否领取过
     */
    public isTaken: boolean;
    /**
     * 是否可领取
     */
    public get isCanTake(): boolean
    {
        if (this.process && this.definition.para1)
        {
            return this.process >= this.definition.para1;
        }
        return false;
    }
}