var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *商城管理
 */
var ShopManager = (function () {
    function ShopManager() {
    }
    ShopManager.initialize = function () {
        qin.ArrayUtil.Clear(ShopManager.shoppingList);
        var info;
        for (var i = 0; i < ShopDefined.GetInstance().dataList.length; i++) {
            info = new ShopInfo();
            info.id = ShopDefined.GetInstance().dataList[i].id;
            if (info.definition) {
                switch (info.definition.type) {
                    case ShopType.Gold:
                        ShopManager.goldList.push(info);
                        break;
                    case ShopType.Diamond:
                        ShopManager.diamondList.push(info);
                        break;
                    case ShopType.Vip:
                        ShopManager.vipList.push(info);
                        break;
                    case ShopType.Prop:
                        ShopManager.propList.push(info);
                        break;
                }
            }
        }
        var awardDef;
        for (var i = 0; i < ShopManager.goldList.length; i++) {
            awardDef = AwardDefined.GetInstance().getDefinition(ShopManager.goldList[i].definition.awardId);
            ShopManager.awardGoldList.push(awardDef);
        }
        var temp = Math.ceil(ShopManager.goldList.length / 3);
        for (var i = 0; i < temp; i++) {
            ShopManager.goldListRender.push([]);
        }
        for (var i = 0; i < ShopManager.goldList.length; i++) {
            ShopManager.goldListRender[Math.floor(i / 3)][i % 3] = ShopManager.goldList[i];
        }
        temp = Math.ceil(ShopManager.diamondList.length / 3);
        for (var i = 0; i < temp; i++) {
            ShopManager.diamondListRender.push([]);
        }
        for (var i = 0; i < ShopManager.diamondList.length; i++) {
            ShopManager.diamondListRender[Math.floor(i / 3)][i % 3] = ShopManager.diamondList[i];
        }
    };
    /**
     * 兑换vip后的操作
     */
    ShopManager.onExchangeVipHandler = function (id) {
        if (ShopManager._vipId.indexOf(id) != -1) {
            var awardDef = AwardDefined.GetInstance().getDefinition(id);
            if (awardDef && awardDef.rewardList) {
                var itemGetList = new Array();
                for (var _i = 0, _a = awardDef.rewardList; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    var itemGetInfo = new ItemGetInfo();
                    itemGetInfo.id = reward.id;
                    itemGetInfo.count = reward.count;
                    itemGetInfo.type = reward.type;
                    itemGetList.push(itemGetInfo);
                    if (itemGetInfo.id == ItemFixedId.vipExp) {
                        UserManager.userInfo.vipExp += itemGetInfo.count;
                    }
                }
                UIManager.showPanel(UIModuleName.GetItemTipsPanel, itemGetList);
            }
        }
    };
    ShopManager.reqSendGift = function (roleId, id) {
        var callback = function (result) {
            ShopManager.sendGiftEvent.dispatch({ "id": id, "roleId": roleId });
        };
        SocketManager.call(Command.SendGift_Req_3716, { "id": id, "roleId": roleId }, callback, null, this);
    };
    /**
     * 清空列表
    */
    ShopManager.clearList = function () {
        qin.ArrayUtil.Clear(ShopManager.diamondList);
        qin.ArrayUtil.Clear(ShopManager.goldList);
        qin.ArrayUtil.Clear(ShopManager.vipList);
    };
    ShopManager.shoppingList = new Array();
    ShopManager.goldList = new Array();
    ShopManager.diamondList = new Array();
    ShopManager.vipList = new Array();
    ShopManager.propList = new Array();
    ShopManager.awardGoldList = new Array();
    ShopManager.goldListRender = [];
    ShopManager.diamondListRender = [];
    ShopManager._vipId = [AwardFixedId.OneMonthVip, AwardFixedId.SixMonthVip, AwardFixedId.YearVip, AwardFixedId.GShopOneMonthVip, AwardFixedId.GShopSixMonthVip, AwardFixedId.GShopYearVip];
    /**
     * 礼物商店选中事件
     */
    ShopManager.giftShopItemSelectEvent = new qin.DelegateDispatcher();
    /**
     * 赠送礼物事件
     */
    ShopManager.sendGiftEvent = new qin.DelegateDispatcher();
    return ShopManager;
}());
__reflect(ShopManager.prototype, "ShopManager");
//# sourceMappingURL=ShopManager.js.map