var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 物品管理
 */
var ItemManager = (function () {
    function ItemManager() {
    }
    ItemManager.reset = function () {
        qin.ArrayUtil.Clear(ItemManager.itemList);
    };
    ItemManager.initialize = function (result) {
        ItemManager.reset();
        if (result.data && result.data.Array) {
            for (var _i = 0, _a = result.data.Array; _i < _a.length; _i++) {
                var info = _a[_i];
                var item = new ItemInfo();
                item.id = info.Id;
                item.count = info.Count;
                ItemManager.itemList.push(item);
            }
        }
        SocketManager.AddCommandListener(Command.Rec_ItemListAdd_2002, this.onItemListAdd, this);
        SocketManager.AddCommandListener(Command.Rec_ItemListReduce_2005, this.onItemListReduce, this);
    };
    /**
     * 物品增加
     */
    ItemManager.onItemListAdd = function (result) {
        if (result.data && result.data.Array) {
            for (var _i = 0, _a = result.data.Array; _i < _a.length; _i++) {
                var info = _a[_i];
                var item = ItemManager.getItemById(info.Id);
                if (item) {
                    item.count += info.Count;
                    ItemManager.checkItemCount(item);
                }
                else {
                    item = new ItemInfo();
                    item.id = info.Id;
                    item.count = info.Count;
                    ItemManager.itemList.push(item);
                }
            }
        }
        ItemManager.itemAddEvent.dispatch();
    };
    /**
     * 物品减少
     */
    ItemManager.onItemListReduce = function (result) {
        if (result.data && result.data.Array) {
            for (var _i = 0, _a = result.data.Array; _i < _a.length; _i++) {
                var info = _a[_i];
                var item = ItemManager.getItemById(info.Id);
                if (item) {
                    item.count -= info.Count;
                    ItemManager.checkItemCount(item);
                }
            }
        }
        ItemManager.itemReduceEvent.dispatch();
    };
    ItemManager.getItemById = function (id) {
        for (var _i = 0, _a = ItemManager.itemList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id == id) {
                return item;
            }
        }
        return null;
    };
    /**
     * 通过id查找某列表物品数量
     */
    ItemManager.getItemNumById = function (id, list) {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (item.id == id) {
                return item.count;
            }
        }
        return 0;
    };
    /**
     * 使用物品的请求
     */
    ItemManager.reqUseItem = function (id, count, msg) {
        if (msg === void 0) { msg = null; }
        var iteminfo = ItemManager.getItemById(id);
        var number = count;
        if (InfoUtil.checkAvailable(iteminfo)) {
            var callback = function () {
                // UIManager.showFloatTips(qin.StringUtil.format("使用了{0} * {1}", iteminfo.definition.name, count))
                var def = ItemDefined.GetInstance().getDefinition(id);
                if (def) {
                    TalkingDataManager.onItemUse(def.name, count);
                }
            };
            if (iteminfo.count < count) {
                UIManager.showFloatTips("物品不存在或数量不够");
            }
            else {
                SocketManager.call(Command.Req_UseItem_3021, { "Id": id, "Count": count, "msg": msg }, callback, null, this);
            }
        }
    };
    /**
     * 检查物品是用完
     */
    ItemManager.checkItemCount = function (info) {
        if (info.count == 0) {
            qin.ArrayUtil.RemoveItem(info, ItemManager.itemList);
        }
    };
    /**
     * 根据类型获取道具列表
     */
    ItemManager.getItemListByType = function (type) {
        var result = new Array();
        for (var _i = 0, _a = ItemManager.itemList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.definition.type == type) {
                result.push(info);
            }
        }
        return result;
    };
    /**
     * 是否拥有某赛事的门票
    */
    ItemManager.isHaveTicket = function (ticketId) {
        if (ItemManager.itemList && ItemManager.itemList.length > 0) {
            for (var _i = 0, _a = ItemManager.itemList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.id == ticketId) {
                    return true;
                }
            }
        }
        return false;
    };
    ItemManager.itemList = new Array();
    /**
     * 物品增加事件
     */
    ItemManager.itemAddEvent = new qin.DelegateDispatcher();
    /**
     * 物品减少事件
     */
    ItemManager.itemReduceEvent = new qin.DelegateDispatcher();
    return ItemManager;
}());
__reflect(ItemManager.prototype, "ItemManager");
//# sourceMappingURL=ItemManager.js.map