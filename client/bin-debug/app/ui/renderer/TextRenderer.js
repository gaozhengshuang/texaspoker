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
 * 文本渲染项
 */
var TextRenderer = (function (_super) {
    __extends(TextRenderer, _super);
    function TextRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.TextRenderer;
        return _this;
    }
    TextRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData && this.txtLabel) {
            this.txtLabel.text = this.bindData;
        }
    };
    return TextRenderer;
}(BaseItemRenderer));
__reflect(TextRenderer.prototype, "TextRenderer");
//# sourceMappingURL=TextRenderer.js.map