var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *  资产管理类
 */
var PropertyManager = (function () {
    function PropertyManager() {
    }
    Object.defineProperty(PropertyManager, "itemGetList", {
        get: function () {
            return PropertyManager._itemGetList;
        },
        enumerable: true,
        configurable: true
    });
    PropertyManager.OpenGet = function () {
        PropertyManager._isOpen = true;
        qin.ArrayUtil.Clear(PropertyManager._itemGetList);
        PropertyManager._itemOldList.clear();
        for (var _i = 0, _a = ItemManager.itemList; _i < _a.length; _i++) {
            var itemInfo = _a[_i];
            PropertyManager._itemOldList.add(itemInfo.id, itemInfo.count);
        }
        PropertyManager._goldOffset = UserManager.userInfo.gold;
        PropertyManager._diamondOffset = UserManager.userInfo.diamond;
        PropertyManager._expOffset = UserManager.userInfo.exp;
    };
    PropertyManager.Clear = function () {
        PropertyManager._isOpen = false;
    };
    PropertyManager.ShowGoldPanel = function (count) {
        if (PropertyManager._isOpen) {
            if (count > 0) {
                UIManager.showPanel(UIModuleName.GetCoinTipsPanel, "您获得了" + qin.MathUtil.formatNum(count) + "金币");
            }
        }
    };
    PropertyManager.ShowItemList = function () {
        if (!PropertyManager._isOpen) {
            return;
        }
        PropertyManager._goldOffset = UserManager.userInfo.gold - PropertyManager._goldOffset;
        PropertyManager._diamondOffset = UserManager.userInfo.diamond - PropertyManager._diamondOffset;
        PropertyManager._expOffset = UserManager.userInfo.exp - PropertyManager._expOffset;
        for (var _i = 0, _a = ItemManager.itemList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (PropertyManager._itemOldList.containsKey(item.id)) {
                var itemCount = PropertyManager._itemOldList.getValue(item.id);
                if (item.count > itemCount) {
                    PropertyManager.AddBase(item.id, item.count - itemCount);
                }
            }
            else {
                PropertyManager.AddBase(item.id, item.count);
            }
        }
        PropertyManager.AddBase(ItemFixedId.gold, PropertyManager._goldOffset);
        PropertyManager.AddBase(ItemFixedId.diamond, PropertyManager._diamondOffset);
        PropertyManager.AddBase(ItemFixedId.exp, PropertyManager._expOffset);
        if (PropertyManager._itemGetList.length == 1 && PropertyManager._itemGetList[0].id == ItemFixedId.gold) {
            PropertyManager.ShowGoldPanel(PropertyManager._itemGetList[0].count);
            PropertyManager.Clear();
            return;
        }
        if (PropertyManager._itemGetList.length > 0) {
            UIManager.showPanel(UIModuleName.GetItemTipsPanel, PropertyManager._itemGetList);
        }
        PropertyManager.Clear();
    };
    PropertyManager.AddBase = function (itemId, count) {
        if (count > 0 && PropertyManager._isOpen) {
            var info = new ItemGetInfo();
            info.id = itemId;
            info.count = count;
            PropertyManager._itemGetList.push(info);
        }
    };
    PropertyManager._isOpen = false;
    /**
     * 物品
     */
    PropertyManager._itemOldList = new qin.Dictionary();
    /**
     * item获取列表
     */
    PropertyManager._itemGetList = new Array();
    return PropertyManager;
}());
__reflect(PropertyManager.prototype, "PropertyManager");
//# sourceMappingURL=PropertyManager.js.map