var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 物品信息
 */
var ItemInfo = (function () {
    function ItemInfo() {
        /**
         * 是否为新物品
         */
        this.isNew = false;
    }
    Object.defineProperty(ItemInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = ItemDefined.GetInstance().getDefinition(this.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    return ItemInfo;
}());
__reflect(ItemInfo.prototype, "ItemInfo", ["IHaveDefintionInfo"]);
//# sourceMappingURL=ItemInfo.js.map