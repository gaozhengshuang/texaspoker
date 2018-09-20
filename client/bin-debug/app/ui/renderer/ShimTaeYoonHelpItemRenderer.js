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
 * 德州转转转帮助列表项面板
*/
var ShimTaeYoonHelpItemRenderer = (function (_super) {
    __extends(ShimTaeYoonHelpItemRenderer, _super);
    function ShimTaeYoonHelpItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ShimTaeYoonHelpItemRenderer;
        return _this;
    }
    ShimTaeYoonHelpItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.oddLabel.text = this.bindData.coefficientDes;
            this.iconImg0.source = this.bindData.img1;
            this.iconImg1.source = this.bindData.img2;
            this.iconImg2.source = this.bindData.img3;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    };
    ShimTaeYoonHelpItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    return ShimTaeYoonHelpItemRenderer;
}(BaseItemRenderer));
__reflect(ShimTaeYoonHelpItemRenderer.prototype, "ShimTaeYoonHelpItemRenderer");
//# sourceMappingURL=ShimTaeYoonHelpItemRenderer.js.map