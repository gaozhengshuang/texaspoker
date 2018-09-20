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
 * 自动登录面板
 */
var AutoLoginPanel = (function (_super) {
    __extends(AutoLoginPanel, _super);
    function AutoLoginPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.AutoLoginPanel);
        return _this;
    }
    AutoLoginPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        AccountManager.OnLoginSuccess.addListener(this.loginSuccessHandler, this);
    };
    AutoLoginPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        AccountManager.OnLoginSuccess.removeListener(this.loginSuccessHandler, this);
    };
    /**
    * 登录成功回调
   */
    AutoLoginPanel.prototype.loginSuccessHandler = function () {
        UIManager.showFloatTips("欢迎回来 " + AccountManager.account);
        this.onCloseBtnClickHandler(null);
    };
    return AutoLoginPanel;
}(BasePanel));
__reflect(AutoLoginPanel.prototype, "AutoLoginPanel");
//# sourceMappingURL=AutoLoginPanel.js.map