var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 礼物商店物品项
*/
var GiftShopItemRenderer = (function (_super) {
    __extends(GiftShopItemRenderer, _super);
    function GiftShopItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.GiftShopItemRenderer;
        return _this;
    }
    GiftShopItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
        if (this.bindData) {
            this.icon.init(this.bindData.iconName + ResSuffixName.PNG, 80, SheetSubName.GiftShopItemBg, false, false);
            var awardDef = AwardDefined.GetInstance().getDefinition(this.bindData.awardId);
            if (awardDef) {
                this.nameLabel.text = awardDef.name;
                if (awardDef.costList && awardDef.costList.length > 0) {
                    var cost = awardDef.costList[0];
                    this.costCount.text = cost.count.toString();
                    if (cost.type == CostType.Gold) {
                        this.costIcon.init(ItemFixedId.gold, 60, null, false, true);
                    }
                    else if (cost.type == CostType.Diamond) {
                        this.costIcon.init(ItemFixedId.diamond, 60, null, false, true);
                    }
                }
            }
        }
        this.setSelect(ShopManager.giftShopSelect == this);
    };
    GiftShopItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
    };
    GiftShopItemRenderer.prototype.onSelect = function (event) {
        if (this.bindData) {
            if (ShopManager.giftShopSelect) {
                ShopManager.giftShopSelect.setSelect(false);
            }
            this.setSelect(true);
            ShopManager.giftShopSelect = this;
            ShopManager.giftShopItemSelectEvent.dispatch();
        }
    };
    GiftShopItemRenderer.prototype.setSelect = function (isSelect) {
        this.selectImg.visible = isSelect;
    };
    GiftShopItemRenderer.prototype.buy = function () {
        var isEnough = false;
        var awardDef = AwardDefined.GetInstance().getDefinition(this.bindData.awardId);
        if (awardDef && awardDef.costList && awardDef.costList.length > 0) {
            var cost = awardDef.costList[0];
            if (cost.type == CostType.Diamond) {
                isEnough = CostManager.verifyDiamond(cost.count, true, function () { JumpUtil.JumpToShopping(ShopGroupIndex.Diamond, UIModuleName.GiftShopPanel); });
            }
            else if (cost.type == CostType.Gold) {
                isEnough = CostManager.verifyGold(cost.count, true, function () { JumpUtil.JumpToShopping(ShopGroupIndex.Vip, UIModuleName.GiftShopPanel); });
            }
        }
        if (isEnough) {
            if (ShopManager.giftShopIsSelf) {
                AwardManager.Exchange(this.bindData.awardId, 1, true);
            }
            else {
                ShopManager.reqSendGift(UserManager.otherUserInfo.roleId, this.bindData.id);
            }
        }
    };
    return GiftShopItemRenderer;
}(BaseItemRenderer));
__reflect(GiftShopItemRenderer.prototype, "GiftShopItemRenderer");
//# sourceMappingURL=GiftShopItemRenderer.js.map