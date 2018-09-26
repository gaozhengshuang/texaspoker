/**
 * 商城vip列表
*/
class VipListItemRenderer extends BaseItemRenderer<ShopInfo>{
    public vipImg: eui.Image;//vip图片；
    public monthVip: eui.Label;//vip数量；
    public desVip: eui.Label;//vip描述
    public vipCountBtn: eui.Button;//钻石（元）；

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.VipListItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        if (InfoUtil.checkAvailable(this.bindData) && this.vipImg != null)
        {
            let awardDef = table.AwardById[this.bindData.definition.awardId];
            this.vipImg.source = this.bindData.definition.iconName + ResSuffixName.PNG;
            if (awardDef)
            {
                if (this.bindData.definition.type == ShopType.Prop)
                {
                    this.desVip.text = awardDef.Des;
                }
                else if (awardDef.RewardId)
                {
                    this.desVip.text = ItemDefined.GetInstance().getDefinition(awardDef.RewardId[0]).des;
                }
                this.monthVip.text = awardDef.Name;
                if (awardDef.CostType)
                {
                    for (let i: number = 0; i < awardDef.CostType.length; i++)
                    {
                        if (awardDef.CostType[i] == CostType.Diamond)
                        {
                            this.vipCountBtn.label = awardDef.CostNum[i].toString();
                        }
                    }
                }
            }
        }
    }
}