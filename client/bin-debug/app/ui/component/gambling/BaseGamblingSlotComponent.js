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
 * 牌局插槽组件
 */
var BaseGamblingSlotComponent = (function (_super) {
    __extends(BaseGamblingSlotComponent, _super);
    function BaseGamblingSlotComponent(skinName, type) {
        var _this = _super.call(this, skinName) || this;
        _this.layerType = type;
        return _this;
    }
    return BaseGamblingSlotComponent;
}(BaseComponent));
__reflect(BaseGamblingSlotComponent.prototype, "BaseGamblingSlotComponent");
//# sourceMappingURL=BaseGamblingSlotComponent.js.map