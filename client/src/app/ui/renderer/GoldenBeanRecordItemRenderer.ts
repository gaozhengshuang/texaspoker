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
            this.timeLabel.text = qin.DateTimeUtil.formatTimestamp(this.bindData.time, qin.DateTimeUtil.Format_Standard_NoSecondAndYear);
            let awardDef: AwardDefinition = AwardDefined.GetInstance().getDefinition(this.bindData.awardId);
            if (awardDef)
            {
                if (awardDef.rewardList && awardDef.rewardList.length > 0)
                {
                    let itemDef: ItemDefinition = ItemDefined.GetInstance().getDefinition(awardDef.rewardList[0].id);
                    if (itemDef)
                    {
                        this.nameLabel.text = itemDef.name;
                    }
                }
                if (awardDef.costList && awardDef.costList.length > 0)
                {
                    this.goldenBeanLabel.text = awardDef.costList[0].count.toString();
                }
            }
        }
    }
}