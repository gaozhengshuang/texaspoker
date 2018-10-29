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
                let rewardList:number[] = this.bindData.awardInfoDef.RewardId;
                if (rewardList.length > 0)
                {
                    let itemDef = table.ItemBaseDataById[rewardList[0]];
                    if (itemDef)
                    {
                        if (itemDef.Id == ItemFixedId.gold)
                        {
                            this.nameLabel.text = itemDef.Name + " * " + game.MathUtil.formatNum(game.longToNumber(this.bindData.awardInfoDef.RewardNum[0]));
                        }
                        else
                        {
                            this.nameLabel.text = itemDef.Name;
                        }
                        this.itemComp.init(itemDef.Icon + ResSuffixName.PNG, 130, null, false, true);
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
