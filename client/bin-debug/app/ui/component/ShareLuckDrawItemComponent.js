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
 * 分享抽奖物品组件
 */
var ShareLuckDrawItemComponent = (function (_super) {
    __extends(ShareLuckDrawItemComponent, _super);
    function ShareLuckDrawItemComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._defaultItemSize = 0.85;
        return _this;
    }
    ShareLuckDrawItemComponent.prototype.init = function (itemId, num) {
        var def = ItemDefined.GetInstance().getDefinition(itemId);
        if (def) {
            this.itemImg.source = def.icon + ResSuffixName.PNG;
        }
        if (num && num > 1) {
            this.numLabel.text = qin.MathUtil.formatNum(num);
            this.numLabel.visible = true;
        }
        else {
            this.numLabel.visible = false;
        }
    };
    /**
     * 设置是否显示高亮
    */
    ShareLuckDrawItemComponent.prototype.setHighLightImgVisible = function (value) {
        this.highLightImg.visible = value;
    };
    /**
     * 设置高亮的透明度
    */
    ShareLuckDrawItemComponent.prototype.setHighLightAlpha = function (value) {
        this.highLightImg.alpha = value;
    };
    return ShareLuckDrawItemComponent;
}(BaseComponent));
__reflect(ShareLuckDrawItemComponent.prototype, "ShareLuckDrawItemComponent");
//# sourceMappingURL=ShareLuckDrawItemComponent.js.map