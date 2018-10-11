class PilePrizeItemInfo extends BaseActivitySubInfo<any>
{
    protected trySetDefinition()
    {
        super.trySetDefinition();
        // this._definition = ActivityPilePrizeDefined.GetInstance().getSubDefinition(this._id, this._subId);
    }
     public get awardInfoDef(): table.IAwardDefine
    {
        if (this.definition)
        {
            let awardDef = table.AwardById[this.definition.awardId];
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