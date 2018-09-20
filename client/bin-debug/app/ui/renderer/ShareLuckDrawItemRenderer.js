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
 * 分享中奖信息渲染项
 */
var ShareLuckDrawItemRenderer = (function (_super) {
    __extends(ShareLuckDrawItemRenderer, _super);
    function ShareLuckDrawItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ShareLuckDrawItemRenderer;
        return _this;
    }
    ShareLuckDrawItemRenderer.prototype.updateData = function () {
        this.dataChanged();
    };
    ShareLuckDrawItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.bindData) {
            this.nameLabel.text = this.getChar(this.bindData.name, 4);
            this.awardDesLabel.text = this.getChar(this.bindData.award, 6);
        }
    };
    ShareLuckDrawItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    ShareLuckDrawItemRenderer.prototype.getChar = function (str, length) {
        var len = length - 1;
        if (str.length > len) {
            var size = qin.CodeUtil.getStringByteLength(str);
            if (size <= len * 3) {
                return str;
            }
            else {
                return str.substr(0, len) + "...";
            }
        }
        return str;
    };
    return ShareLuckDrawItemRenderer;
}(BaseItemRenderer));
__reflect(ShareLuckDrawItemRenderer.prototype, "ShareLuckDrawItemRenderer");
//# sourceMappingURL=ShareLuckDrawItemRenderer.js.map