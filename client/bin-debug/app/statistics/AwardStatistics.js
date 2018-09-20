var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 兑换统计
 */
var AwardStatistics = (function () {
    function AwardStatistics() {
    }
    AwardStatistics.Invoke = function (info) {
        try {
            //充值
            var def = AwardDefined.GetInstance().getDefinition(info.id);
            var isCostCurrency = false;
            if (def.costList) {
                for (var _i = 0, _a = def.costList; _i < _a.length; _i++) {
                    var costDef = _a[_i];
                    if (costDef.type == CostType.RMB) {
                        isCostCurrency = true;
                        break;
                    }
                }
            }
            if (isCostCurrency) {
                var payList = ShopDefined.GetInstance().dataList;
                for (var i = 0; i < payList.length; i++) {
                    var payDef = payList[i];
                    if (def != null && def.costList != null && def.costList.length > 0
                        && def.rewardList != null && def.rewardList.length > 0 && payDef.awardId == def.id) {
                        var orderId = ChannelUtil.GenerateOrder(def.id, VersionManager.isServerTest); //订单id
                        var price = def.costList[0].count / 100; //消耗的RMB,单位：元
                        TalkingDataManager.onVirtualCurrencyChargeRequest(orderId, def.name, price, def.rewardList[0].count, ChannelManager.channelType);
                        TalkingDataManager.onVirtualCurrencyChargeSuccess(orderId);
                        // ChannelManager.PaySuccessFromServer(price, orderId);
                        // TDEventStatistics.FirstCharge_RoleLevel(UserManager.level);
                        return;
                    }
                }
            }
            //消耗
            if (def != null && def.costList != null) {
                for (var i = 0; i < def.costList.length; i++) {
                    if (def.costList[i].type == CostType.Diamond) {
                        TalkingDataManager.onItemPurchase("Award:" + def.id.toString(), info.times, def.costList[i].count);
                    }
                }
            }
        }
        catch (Exception) { }
    };
    /// <summary>
    /// 钻石花费记录
    /// </summary>
    AwardStatistics.diamondCostRecord = function (type, times, diamond) {
        try {
            TalkingDataManager.onItemPurchase(type.toString(), times, diamond);
        }
        catch (Exception) { }
    };
    return AwardStatistics;
}());
__reflect(AwardStatistics.prototype, "AwardStatistics");
//# sourceMappingURL=AwardStatistics.js.map