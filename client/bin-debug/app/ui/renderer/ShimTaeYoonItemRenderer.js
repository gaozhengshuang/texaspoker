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
 * 德州转转转列表项面板
*/
var ShimTaeYoonItemRenderer = (function (_super) {
    __extends(ShimTaeYoonItemRenderer, _super);
    function ShimTaeYoonItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ShimTaeYoonItemRenderer;
        return _this;
    }
    ShimTaeYoonItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.iconImg.source = ResPrefixName.LaBaResult + this.bindData + ResSuffixName.PNG;
            this.bgImg.source = ResPrefixName.LaBaResultBg + this.bindData + ResSuffixName.PNG;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    };
    ShimTaeYoonItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    return ShimTaeYoonItemRenderer;
}(BaseItemRenderer));
__reflect(ShimTaeYoonItemRenderer.prototype, "ShimTaeYoonItemRenderer");
//# sourceMappingURL=ShimTaeYoonItemRenderer.js.map