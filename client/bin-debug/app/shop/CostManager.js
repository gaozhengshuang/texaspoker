var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消费管理
 */
var CostManager = (function () {
    function CostManager() {
    }
    /**
     * 验证钻石不足
     */
    CostManager.verifyDiamond = function (diamond, isShowTips, callback, cancelCallBack) {
        if (isShowTips === void 0) { isShowTips = false; }
        if (diamond <= UserManager.userInfo.diamond) {
            return true;
        }
        if (isShowTips) {
            CostManager.showBuyDiamond(callback, cancelCallBack);
        }
        return false;
    };
    /**
     * 显示购买钻石提示
     */
    CostManager.showBuyDiamond = function (callback, cancelCallBack) {
        if (callback) {
            AlertManager.showConfirm("钻石数量不足，是否前往充值？", callback, cancelCallBack);
        }
        else {
            CostManager.currentTab = ShopGroupIndex.Diamond;
            AlertManager.showConfirm("钻石数量不足，是否前往充值？", CostManager.gotoShoppingPanel, cancelCallBack);
        }
    };
    /**
     * 验证金币不足
     */
    CostManager.verifyGold = function (gold, isShowTips, callback, cancelCallBack) {
        if (isShowTips === void 0) { isShowTips = false; }
        if (gold <= UserManager.userInfo.gold) {
            return true;
        }
        if (isShowTips) {
            CostManager.showBuyGold(gold, callback, cancelCallBack);
        }
        return false;
    };
    /**
     * 显示购买金币提示
     */
    CostManager.showBuyGold = function (goldShortage, callback, cancelCallBack) {
        if (callback) {
            AlertManager.showConfirm("金币数量不足，是否前往充值？", callback, cancelCallBack);
        }
        else {
            UIManager.showPanel(UIModuleName.GoldShortagePanel, { goldShortage: goldShortage });
        }
    };
    CostManager.gotoShoppingPanel = function () {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: CostManager.currentTab });
    };
    CostManager.currentTab = 0;
    return CostManager;
}());
__reflect(CostManager.prototype, "CostManager");
//# sourceMappingURL=CostManager.js.map