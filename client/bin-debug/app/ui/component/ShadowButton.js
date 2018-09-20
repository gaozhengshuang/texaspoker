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
 * 带有文字阴影的按钮
 */
var ShadowButton = (function (_super) {
    __extends(ShadowButton, _super);
    function ShadowButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShadowButton.prototype.createChildren = function () {
        var label = this.labelDisplay;
        if (label) {
            qin.FilterUtil.setShadow(label);
        }
    };
    return ShadowButton;
}(eui.Button));
__reflect(ShadowButton.prototype, "ShadowButton");
/**
 * 绿色阴影按钮
 */
var GreenShadowButton = (function (_super) {
    __extends(GreenShadowButton, _super);
    function GreenShadowButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GreenShadowButton.prototype.createChildren = function () {
        var label = this.labelDisplay;
        if (label) {
            qin.FilterUtil.setGreenShadow(label);
        }
    };
    return GreenShadowButton;
}(eui.Button));
__reflect(GreenShadowButton.prototype, "GreenShadowButton");
//# sourceMappingURL=ShadowButton.js.map