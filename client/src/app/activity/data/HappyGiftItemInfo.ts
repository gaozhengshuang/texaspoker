class HappyGiftItemInfo extends BaseActivitySubInfo<ActivityHappyGiftDefintion>
{
    protected trySetDefinition()
    {
        super.trySetDefinition();
        this._definition = ActivityHappyGiftDefined.GetInstance().getSubDefinition(this._id, this._subId);
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
     * 购买次数
     */
    public buyTime: number;
}