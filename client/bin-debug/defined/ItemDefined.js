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
 * 充值选项的定义
 * */
var ItemDefined = (function (_super) {
    __extends(ItemDefined, _super);
    function ItemDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemDefined.GetInstance = function () {
        if (!ItemDefined._instance) {
            ItemDefined._instance = new ItemDefined();
        }
        if (DefinedManager.IsParsed(ItemDefined.itemConfig) == false) {
            ItemDefined._instance.initialize();
        }
        return ItemDefined._instance;
    };
    ItemDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ItemDefined.itemConfig);
    };
    ItemDefined.itemConfig = "item";
    return ItemDefined;
}(BaseDefined));
__reflect(ItemDefined.prototype, "ItemDefined");
/**
 * 道具的定义
 * */
var ItemDefinition = (function () {
    function ItemDefinition() {
    }
    return ItemDefinition;
}());
__reflect(ItemDefinition.prototype, "ItemDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ItemDefined.js.map