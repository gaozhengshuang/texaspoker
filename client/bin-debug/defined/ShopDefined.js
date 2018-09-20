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
 * 支付配置列表定义
 * */
var ShopDefined = (function (_super) {
    __extends(ShopDefined, _super);
    function ShopDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopDefined.GetInstance = function () {
        if (!ShopDefined._instance) {
            ShopDefined._instance = new ShopDefined();
        }
        if (DefinedManager.IsParsed(ShopDefined.ShoppingConfig) == false) {
            ShopDefined._instance.initialize();
        }
        return ShopDefined._instance;
    };
    ShopDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ShopDefined.ShoppingConfig);
    };
    ShopDefined.prototype.getDefinitionByAwardId = function (id) {
        if (this.dataList) {
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.awardId == id) {
                    return def;
                }
            }
        }
        return null;
    };
    /**
     * 指定的awardid是否是指定类型
     */
    ShopDefined.prototype.isType = function (awardId, type) {
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.awardId == awardId && def.type == type) {
                return true;
            }
        }
        return false;
    };
    ShopDefined.ShoppingConfig = "payList";
    return ShopDefined;
}(BaseDefined));
__reflect(ShopDefined.prototype, "ShopDefined");
/**
 * 支付配置定义
 * */
var ShopDefinition = (function () {
    function ShopDefinition() {
    }
    return ShopDefinition;
}());
__reflect(ShopDefinition.prototype, "ShopDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ShopDefined.js.map