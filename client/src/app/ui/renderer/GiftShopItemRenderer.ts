/**
 * 礼物商店物品项
*/
class GiftShopItemRenderer extends BaseItemRenderer<GiftShopDefinition>
{
    public icon: CommonIcon;
    public nameLabel: eui.Label;
    public costIcon: CommonIcon;
    public costCount: eui.Label;
    public selectImg: eui.Image;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GiftShopItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
        if (this.bindData)
        {
            this.icon.init(this.bindData.iconName + ResSuffixName.PNG, 80, SheetSubName.GiftShopItemBg, false, false);
            // let awardDef: AwardDefinition = AwardDefined.GetInstance().getDefinition(this.bindData.awardId);  //move todo
            // if (awardDef)
            // {
            //     this.nameLabel.text = awardDef.name;
            //     if (awardDef.costList && awardDef.costList.length > 0)
            //     {
            //         let cost: AwardInfoDefinition = awardDef.costList[0];
            //         this.costCount.text = cost.count.toString();
            //         if (cost.type == CostType.Gold)
            //         {
            //             this.costIcon.init(ItemFixedId.gold, 60, null, false, true);
            //         }
            //         else if (cost.type == CostType.Diamond)
            //         {
            //             this.costIcon.init(ItemFixedId.diamond, 60, null, false, true);
            //         }
            //     }
            // }
        }
        this.setSelect(ShopManager.giftShopSelect == this)
    }

    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
    }

    private onSelect(event: egret.TouchEvent)
    {
        if (this.bindData)
        {
            if (ShopManager.giftShopSelect)
            {
                ShopManager.giftShopSelect.setSelect(false);
            }
            this.setSelect(true);
            ShopManager.giftShopSelect = this;
            ShopManager.giftShopItemSelectEvent.dispatch();
        }
    }

    public setSelect(isSelect: boolean)
    {
        this.selectImg.visible = isSelect;
    }

    public buy()
    {
        let isEnough: boolean = false;
        // let awardDef: AwardDefinition = AwardDefined.GetInstance().getDefinition(this.bindData.awardId); //move todo
        // if (awardDef && awardDef.costList && awardDef.costList.length > 0)
        // {
        //     let cost: AwardInfoDefinition = awardDef.costList[0];
        //     if (cost.type == CostType.Diamond)
        //     {
        //         isEnough = CostManager.verifyDiamond(cost.count, true, () => { JumpUtil.JumpToShopping(ShopGroupIndex.Diamond, UIModuleName.GiftShopPanel); });
        //     }
        //     else if (cost.type == CostType.Gold)
        //     {
        //         isEnough = CostManager.verifyGold(cost.count, true, () => { JumpUtil.JumpToShopping(ShopGroupIndex.Vip, UIModuleName.GiftShopPanel); });
        //     }
        // }
        if (isEnough)
        {
            if (ShopManager.giftShopIsSelf)//购买
            {
                AwardManager.Exchange(this.bindData.awardId, 1, true);
            }
            else//赠送
            {
                ShopManager.reqSendGift(UserManager.otherUserInfo.id, this.bindData.id);
            }
        }
    }
}