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
 * 注册面板
 */
var RegisterPanel = (function (_super) {
    __extends(RegisterPanel, _super);
    function RegisterPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.RegisterPanel);
        return _this;
    }
    RegisterPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.accountLabel.type = egret.TextFieldType.INPUT;
        this.pwdLabel.type = egret.TextFieldType.INPUT;
        this.pwdLabel.inputType = egret.TextFieldInputType.PASSWORD;
    };
    RegisterPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    RegisterPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerClickHandler, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backClickHandler, this);
    };
    RegisterPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.registerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.registerClickHandler, this);
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backClickHandler, this);
    };
    RegisterPanel.prototype.registerClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        var account = this.accountLabel.text.trim();
        var pwd = this.pwdLabel.text.trim();
        if (account && pwd) {
            ChannelManager.DispatchAccountLoginSucceed(account, pwd, true);
            this.onCloseBtnClickHandler(event);
        }
    };
    RegisterPanel.prototype.backClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.showPanel(UIModuleName.LoginLocalPanel);
        this.onCloseBtnClickHandler(event);
    };
    return RegisterPanel;
}(BasePanel));
__reflect(RegisterPanel.prototype, "RegisterPanel");
//# sourceMappingURL=RegisterPanel.js.map