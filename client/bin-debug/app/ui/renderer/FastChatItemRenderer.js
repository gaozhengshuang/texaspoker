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
 * 快捷输入项面板
*/
var FastChatItemRenderer = (function (_super) {
    __extends(FastChatItemRenderer, _super);
    function FastChatItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.FastChatItemRenderer;
        return _this;
    }
    FastChatItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.desLabel.text = this.bindData.des;
        }
    };
    return FastChatItemRenderer;
}(BaseItemRenderer));
__reflect(FastChatItemRenderer.prototype, "FastChatItemRenderer");
//# sourceMappingURL=FastChatItemRenderer.js.map