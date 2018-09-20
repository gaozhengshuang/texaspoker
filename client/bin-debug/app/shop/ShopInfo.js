var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ShopInfo = (function () {
    function ShopInfo() {
        this._id = 0;
    }
    Object.defineProperty(ShopInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = ShopDefined.GetInstance().getDefinition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShopInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        set: function (value) {
            this._definition = value;
        },
        enumerable: true,
        configurable: true
    });
    return ShopInfo;
}());
__reflect(ShopInfo.prototype, "ShopInfo", ["IHaveDefintionInfo"]);
//# sourceMappingURL=ShopInfo.js.map