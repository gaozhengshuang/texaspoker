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
 * 手机号注册面板
 */
var RegisterTelPanel = (function (_super) {
    __extends(RegisterTelPanel, _super);
    function RegisterTelPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.RegisterTelPanel);
        return _this;
    }
    RegisterTelPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    RegisterTelPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    RegisterTelPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    RegisterTelPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return RegisterTelPanel;
}(BaseRegisterTelPanel));
__reflect(RegisterTelPanel.prototype, "RegisterTelPanel");
//# sourceMappingURL=RegisterTelPanel.js.map