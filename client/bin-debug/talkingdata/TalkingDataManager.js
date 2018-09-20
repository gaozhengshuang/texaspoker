var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * talkingdata
 */
var TalkingDataManager = (function () {
    function TalkingDataManager() {
    }
    /**
     * 设置唯一账户
     */
    TalkingDataManager.setAccount = function (accountId) {
        if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(accountId)) {
            qin.ExternalInterface.call(ExtFuncName.TDSetAccount, accountId);
        }
    };
    /**
     * 设置帐户的显示性名
     */
    TalkingDataManager.setAccountName = function (accountName) {
        if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(accountName)) {
            qin.ExternalInterface.call(ExtFuncName.TDSetAccountName, accountName);
        }
    };
    /**
     * 设置等级
     */
    TalkingDataManager.setLevel = function (level) {
        if (TalkingDataManager.enabled && level > 0) {
            qin.ExternalInterface.call(ExtFuncName.TDSetLevel, level.toString());
        }
    };
    /**
     * 购买虚拟物品
     */
    TalkingDataManager.onItemPurchase = function (item, itemNumber, priceInVirtualCurrency) {
        if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(item) && itemNumber > 0 && priceInVirtualCurrency > 0) {
            var obj = { item: item, itemNumber: itemNumber, priceInVirtualCurrency: priceInVirtualCurrency };
            qin.ExternalInterface.call(ExtFuncName.TDOnItemPurchase, JSON.stringify(obj));
        }
    };
    /**
     * 物品使用
     */
    TalkingDataManager.onItemUse = function (item, itemNumber) {
        if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(item) && itemNumber > 0) {
            var obj = { item: item, itemNumber: itemNumber };
            qin.ExternalInterface.call(ExtFuncName.TDOnItemUse, JSON.stringify(obj));
        }
    };
    /**
     * 请求购买虚拟货币
     */
    TalkingDataManager.onVirtualCurrencyChargeRequest = function (orderId, iapId, currencyAmount, virtualCurrencyAmount, paymentType) {
        if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(orderId)
            && !qin.StringUtil.isNullOrEmpty(iapId) && currencyAmount > 0 && virtualCurrencyAmount > 0 && !qin.StringUtil.isNullOrEmpty(paymentType)) {
            var obj = { orderId: orderId, iapId: iapId, currencyAmount: currencyAmount, virtualCurrencyAmount: virtualCurrencyAmount, paymentType: paymentType };
            qin.ExternalInterface.call(ExtFuncName.TDOnVirtualCurrencyChargeRequest, JSON.stringify(obj));
        }
    };
    /**
     * 购买成功
     */
    TalkingDataManager.onVirtualCurrencyChargeSuccess = function (orderId) {
        if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(orderId)) {
            var obj = { orderId: orderId };
            qin.ExternalInterface.call(ExtFuncName.TDOnVirtualCurrencyChargeSuccess, JSON.stringify(obj));
        }
    };
    TalkingDataManager.enabled = false;
    return TalkingDataManager;
}());
__reflect(TalkingDataManager.prototype, "TalkingDataManager");
//# sourceMappingURL=TalkingDataManager.js.map