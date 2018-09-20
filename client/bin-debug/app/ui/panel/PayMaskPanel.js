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
 * 支付遮罩面板
 */
var PayMaskPanel = (function (_super) {
    __extends(PayMaskPanel, _super);
    function PayMaskPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.PayMaskPanel);
        return _this;
    }
    PayMaskPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0.5;
    };
    return PayMaskPanel;
}(BasePanel));
__reflect(PayMaskPanel.prototype, "PayMaskPanel");
//# sourceMappingURL=PayMaskPanel.js.map