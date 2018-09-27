/**
 * 兑换奖品项
*/
class GoldenBeanAwardItemRenderer extends BaseItemRenderer<GoldenBeanAwardDefinition>
{

    public nameLabel: eui.Label;
    public icon: CommonIcon;
    public goldenBeanLabel: eui.Label;
    public awardBtn: eui.Button;

    private _cost: number;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GoldenBeanAwardItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.awardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAward, this);
        if (this.bindData)
        {
            let awardDef: table.IAwardDefine = table.AwardById[this.bindData.awardId];
            if (awardDef)
            {
                this.icon.init(awardDef);
                if (awardDef.RewardId && awardDef.RewardId.length > 0)
                {
                    let itemDef: table.IItemBaseDataDefine = table.ItemBaseDataById[awardDef.RewardId[0]);
                    if (itemDef)
                    {
                        this.nameLabel.text = itemDef.name;
                    }
                }
                if (awardDef.CostNum && awardDef.CostNum.length > 0)
                {
                    this._cost = awardDef.CostNum[0];
                    this.goldenBeanLabel.text = this._cost.toString();
                }
            }
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.awardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAward, this);
    }

    private onAward(event: egret.TouchEvent)
    {
        if (this.bindData)
        {
            if (ItemManager.getItemNumById(ItemFixedId.GoldenBean, ItemManager.itemList) >= this._cost)
            {
                AwardManager.Exchange(this.bindData.awardId);
            }
            else
            {
                AlertManager.showAlert("您的金豆不足，完成新人礼、邀请好友等活动可获得金豆。");
            }
        }
    }
}