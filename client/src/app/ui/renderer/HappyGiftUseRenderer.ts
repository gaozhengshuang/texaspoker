/**
 * 欢乐豪礼兑换使用项
*/
class HappyGiftUseRenderer extends BaseItemRenderer<HappyGiftItemInfo>
{
    public nameLabel: eui.Label;
    public countLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.HappyGiftUseRenderer;
    }

    protected dataChanged()
    {
        super.dataChanged();
        this.refreshUI();
    }

    private refreshUI()
    {
        if (this.bindData)
        {
            // let awardDef = this.bindData.awardInfoDef;  //move todo
            // if (awardDef && awardDef.rewardList)
            // {
            //     let itemDef = ItemDefined.GetInstance().getDefinition(awardDef.rewardList[0].id);
            //     if (itemDef)
            //     {
            //         this.nameLabel.text = itemDef.name;
            //     }
            // }
            this.countLabel.text = this.bindData.buyTime.toString();
        }
    }
}
