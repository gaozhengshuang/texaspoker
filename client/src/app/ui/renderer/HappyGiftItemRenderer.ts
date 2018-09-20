/**
 * 欢乐豪礼商品项
*/
class HappyGiftItemRenderer extends BaseItemRenderer<HappyGiftItemInfo>
{
    public itemComp: CommonIcon;
    public nameLabel: eui.Label;
    public costLabel: eui.Label;
    public getPrizeBtn: eui.Button;
    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.HappyGiftItemRenderer;
    }

    protected dataChanged()
    {
        super.dataChanged();
        this.getPrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refreshUI();
    }

    private refreshUI()
    {
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.costLabel.text = game.MathUtil.numAddSpace(this.bindData.definition.cost) + "欢乐券";
            if (this.bindData.awardInfoDef)
            {
                let rewardList = this.bindData.awardInfoDef.rewardList;
                if (rewardList.length > 0)
                {
                    let itemDef = ItemDefined.GetInstance().getDefinition(rewardList[0].id);
                    if (itemDef)
                    {
                        if (itemDef.id == ItemFixedId.gold)
                        {
                            this.nameLabel.text = itemDef.name + " * " + game.MathUtil.formatNum(rewardList[0].count);
                        }
                        else
                        {
                            this.nameLabel.text = itemDef.name;
                        }
                        this.itemComp.init(itemDef.icon + ResSuffixName.PNG, 130, null, false, true);
                    }
                }
            }
            if (this.bindData.definition.limit > this.bindData.buyTime)
            {
                this.getPrizeBtn.visible = true;
            }
            else
            {
                this.getPrizeBtn.visible = false;
            }
        }
    }

    private getPrize()
    {
        let info = ActivityManager.getActivityInfo(this.bindData.id);
        if (info)
        {
            if (info.step > this.bindData.definition.cost)
            {
                ActivityManager.ReqGetActivityAward(this.bindData.id, this.bindData.subId);
            }
            else
            {
                UIManager.showFloatTips("欢乐券不足！");
            }
        }
    }

    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.getPrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
    }
}
