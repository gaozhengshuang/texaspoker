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
 * 商城钻石渲染项
*/
var ShopDiamondItemRenderer = (function (_super) {
    __extends(ShopDiamondItemRenderer, _super);
    function ShopDiamondItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ShopDiamondItemRenderer;
        return _this;
    }
    ShopDiamondItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var list = [this.item0, this.item1, this.item2];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            item.visible = false;
        }
        if (this.bindData) {
            for (var i = 0; i < this.bindData.length; i++) {
                if (this.bindData[i]) {
                    list[i].visible = true;
                    list[i].init(this.bindData[i]);
                }
            }
        }
    };
    return ShopDiamondItemRenderer;
}(BaseItemRenderer));
__reflect(ShopDiamondItemRenderer.prototype, "ShopDiamondItemRenderer");
//# sourceMappingURL=ShopDiamondItemRenderer.js.map