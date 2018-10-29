/**
 * 礼物商店物品项
*/
class GiftShopItemRenderer extends BaseItemRenderer<table.IGiftShopDefine>
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
            this.icon.init(this.bindData.IconName + ResSuffixName.PNG, 80, SheetSubName.GiftShopItemBg, false, false);
            let awardDef: table.IAwardDefine = table.AwardById[this.bindData.AwardId];
            if (awardDef)
            {
                this.nameLabel.text = awardDef.Name;
                if (awardDef.CostId && awardDef.CostId.length > 0)
                {
                    let type = awardDef.CostType[0];
                    this.costCount.text = awardDef.CostNum[0].toString();
                    if (type == CostType.Gold)
                    {
                        this.costIcon.init(ItemFixedId.gold, 60, null, false, true);
                    }
                    else if (type == CostType.Diamond)
                    {
                        this.costIcon.init(ItemFixedId.diamond, 60, null, false, true);
                    }
                }
            }
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
        let awardDef: table.IAwardDefine = table.AwardById[this.bindData.AwardId];
        if (awardDef && awardDef.CostId && awardDef.CostId.length > 0)
        {
            let type = awardDef.CostType[0];
            if (type == CostType.Diamond)
            {
                isEnough = CostManager.verifyDiamond(game.longToNumber(awardDef.CostNum[0]), true, () => { JumpUtil.JumpToShopping(ShopGroupIndex.Diamond, UIModuleName.GiftShopPanel); });
            }
            else if (type == CostType.Gold)
            {
                isEnough = CostManager.verifyGold(game.longToNumber(awardDef.CostNum[0]), true, () => { JumpUtil.JumpToShopping(ShopGroupIndex.Vip, UIModuleName.GiftShopPanel); });
            }
        }
        if (isEnough)
        {
            if (ShopManager.giftShopIsSelf)//购买
            {
                AwardManager.Exchange(this.bindData.AwardId, 1, true);
            }
            else//赠送
            {
                ShopManager.reqSendGift(UserManager.otherUserInfo.roleId, this.bindData.Id);
            }
        }
    }
}