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
 * 礼物商城列表定义
 * */
var GiftShopDefined = (function (_super) {
    __extends(GiftShopDefined, _super);
    function GiftShopDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GiftShopDefined.GetInstance = function () {
        if (!GiftShopDefined._instance) {
            GiftShopDefined._instance = new GiftShopDefined();
        }
        if (DefinedManager.IsParsed(GiftShopDefined.GiftShopConfig) == false) {
            GiftShopDefined._instance.initialize();
        }
        return GiftShopDefined._instance;
    };
    GiftShopDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(GiftShopDefined.GiftShopConfig);
    };
    GiftShopDefined.prototype.getListByType = function (type) {
        var result = new Array();
        if (this.dataList != null) {
            for (var i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].type == type) {
                    result.push(this.dataList[i]);
                }
            }
        }
        return result;
    };
    GiftShopDefined.GiftShopConfig = "giftShop";
    return GiftShopDefined;
}(BaseDefined));
__reflect(GiftShopDefined.prototype, "GiftShopDefined");
/**
 * 礼物商城配置定义
 * */
var GiftShopDefinition = (function () {
    function GiftShopDefinition() {
    }
    return GiftShopDefinition;
}());
__reflect(GiftShopDefinition.prototype, "GiftShopDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=GiftShopDefined.js.map