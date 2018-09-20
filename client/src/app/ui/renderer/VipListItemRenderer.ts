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
            let awardDef = AwardDefined.GetInstance().getDefinition(this.bindData.definition.awardId);
            this.vipImg.source = this.bindData.definition.iconName + ResSuffixName.PNG;
            if (awardDef)
            {
                if (this.bindData.definition.type == ShopType.Prop)
                {
                    this.desVip.text = awardDef.des;
                }
                else if (awardDef.rewardList)
                {
                    this.desVip.text = ItemDefined.GetInstance().getDefinition(awardDef.rewardList[0].id).des;
                }
                this.monthVip.text = awardDef.name;
                if (awardDef.costList)
                {
                    for (let def of awardDef.costList)
                    {
                        if (def.type == CostType.Diamond)
                        {
                            this.vipCountBtn.label = def.count.toString();
                        }
                    }
                }
            }
        }
    }
}