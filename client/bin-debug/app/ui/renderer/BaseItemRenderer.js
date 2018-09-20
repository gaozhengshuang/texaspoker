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
 * 基础项渲染信息
 */
var BaseItemRenderer = (function (_super) {
    __extends(BaseItemRenderer, _super);
    function BaseItemRenderer() {
        return _super.call(this) || this;
    }
    BaseItemRenderer.prototype.dataChanged = function () {
        this.bindData = this.data;
    };
    BaseItemRenderer.prototype.destroy = function () {
    };
    return BaseItemRenderer;
}(eui.ItemRenderer));
__reflect(BaseItemRenderer.prototype, "BaseItemRenderer");
//# sourceMappingURL=BaseItemRenderer.js.map