class ShimTaeYoonInfo extends BaseActivitySubInfo<LaBaDefinition>
{
    /**
     * 获得的奖励
    */
    public gold: number;
    /**
     * 奖池
    */
    public pool: number;

    protected trySetDefinition()
    {
        super.trySetDefinition();
        this._definition = LaBaDefined.GetInstance().getSubDefinition(this._id, this._subId);
    }
}