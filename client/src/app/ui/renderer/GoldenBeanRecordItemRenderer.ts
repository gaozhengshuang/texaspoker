/**
 * 兑换记录项
*/
class GoldenBeanRecordItemRenderer extends BaseItemRenderer<AwardRecordInfo>
{
    public timeLabel: eui.Label;
    public nameLabel: eui.Label;
    public goldenBeanLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GoldenBeanRecordItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.timeLabel.text = game.DateTimeUtil.formatTimestamp(this.bindData.time, game.DateTimeUtil.Format_Standard_NoSecondAndYear);
            let awardDef: table.IAwardDefine = table.AwardById[this.bindData.awardId];
            if (awardDef)
            {
                if (awardDef.RewardId && awardDef.RewardId.length > 0)
                {
                    let itemDef: table.IItemBaseDataDefine = table.ItemBaseDataById[awardDef.RewardId[0]];
                    if (itemDef)
                    {
                        this.nameLabel.text = itemDef.Name;
                    }
                }
                if (awardDef.CostNum && awardDef.CostNum.length > 0)
                {
                    this.goldenBeanLabel.text = awardDef.CostNum[0].toString();
                }
            }
        }
    }
}