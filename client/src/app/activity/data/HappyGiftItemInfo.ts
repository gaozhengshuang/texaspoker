class HappyGiftItemInfo extends BaseActivitySubInfo<any>
{
    protected trySetDefinition()
    {
        super.trySetDefinition();
        // this._definition = ActivityHappyGiftDefined.GetInstance().getSubDefinition(this._id, this._subId);
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
     * 购买次数
     */
    public buyTime: number;
}