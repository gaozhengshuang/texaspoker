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
 * 注册手机账号基类
*/
var BaseRegisterTelPanel = (function (_super) {
    __extends(BaseRegisterTelPanel, _super);
    function BaseRegisterTelPanel() {
        return _super.call(this) || this;
    }
    BaseRegisterTelPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.accountLabel.type = egret.TextFieldType.INPUT;
        this.accountLabel.inputType = egret.TextFieldInputType.TEL;
        this.accountLabel.restrict = "0-9";
        this.accountLabel.maxChars = 11;
        this.codeLabel.type = egret.TextFieldType.INPUT;
        this.pwdLabel.type = egret.TextFieldType.INPUT;
        this.pwdLabel.inputType = egret.TextFieldInputType.PASSWORD;
        this.pwdLabel1.type = egret.TextFieldType.INPUT;
        this.pwdLabel1.inputType = egret.TextFieldInputType.PASSWORD;
        this._anime = new PanelAnime(this);
    };
    BaseRegisterTelPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.reset();
    };
    BaseRegisterTelPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerClickHandler, this);
        this.sendCodeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sencCodeClickHandler, this);
        this.accountLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.accountValidate, this);
        this.codeLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.codeValidate, this);
        this.pwdLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.pwdValidate, this);
        this.pwdLabel1.addEventListener(egret.FocusEvent.FOCUS_OUT, this.pwd1Validate, this);
        AccountManager.OnPhoneRegister.addListener(this.sendCodeSuccess, this);
        AccountManager.OnRegisterSuccess.addListener(this.registerSuccessHandler, this);
    };
    BaseRegisterTelPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.registerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.registerClickHandler, this);
        this.sendCodeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sencCodeClickHandler, this);
        this.accountLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.accountValidate, this);
        this.codeLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.codeValidate, this);
        this.pwdLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.pwdValidate, this);
        this.pwdLabel1.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.pwd1Validate, this);
        AccountManager.OnPhoneRegister.removeListener(this.sendCodeSuccess, this);
        AccountManager.OnRegisterSuccess.removeListener(this.registerSuccessHandler, this);
        UserUtil.removeCodeCountDown();
    };
    /**
     * 重置
    */
    BaseRegisterTelPanel.prototype.reset = function () {
        this.pwdErrorLabel.text = this.telErrorLabel.text = "";
        UserUtil.initCode(this.sendCodeBtn);
    };
    /**
     * 手机错误提示清空
    */
    BaseRegisterTelPanel.prototype.clearTelError = function () {
        this.telErrorLabel.text = "";
    };
    /**
     * 密码错误提示清空
    */
    BaseRegisterTelPanel.prototype.clearPwdError = function () {
        this.pwdErrorLabel.text = "";
    };
    /**
     * 注册按钮点击事件
    */
    BaseRegisterTelPanel.prototype.registerClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        var pwd1 = this.pwdLabel1.text.trim();
        var pwd = this.pwdLabel.text.trim();
        if (this.accountValidate() && this.codeValidate() && UserUtil.checkTwoPwd(pwd, pwd1, 16, 6, this.pwdErrorLabel)) {
            AccountManager.PhoneRegisterVerify(this.accountLabel.text.trim(), this.codeLabel.text.trim(), this.pwdLabel.text.trim());
        }
    };
    /**
     * 发送验证码按钮点击事件
    */
    BaseRegisterTelPanel.prototype.sencCodeClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.accountValidate()) {
            //发送手机验证码
            AccountManager.PhoneRegister(this.accountLabel.text.trim());
        }
    };
    /**
     * 验证码发送成功回调
    */
    BaseRegisterTelPanel.prototype.sendCodeSuccess = function () {
        UserUtil.addCodeCountDown({ sendCodeBtn: this.sendCodeBtn, leftTime: this.leftTime });
    };
    /**
     * 客户端验证
    */
    BaseRegisterTelPanel.prototype.accountValidate = function () {
        var account = this.accountLabel.text.trim();
        if (!account) {
            this.telErrorLabel.text = "*手机号不能为空";
            return false;
        }
        if (qin.RegexUtil.isPhoneNumber(account)) {
            this.clearTelError();
            return true;
        }
        else {
            this.telErrorLabel.text = "*手机号格式不正确";
            return false;
        }
    };
    BaseRegisterTelPanel.prototype.codeValidate = function () {
        var code = this.codeLabel.text.trim();
        if (code) {
            this.clearTelError();
            return true;
        }
        else {
            this.telErrorLabel.text = "*请填写手机验证码";
            return false;
        }
    };
    BaseRegisterTelPanel.prototype.pwdValidate = function () {
        var pwd = this.pwdLabel.text.trim();
        if (UserUtil.checkPwd(pwd, 16, 6, this.pwdErrorLabel)) {
            this.pwdErrorLabel.text = "";
        }
    };
    BaseRegisterTelPanel.prototype.pwd1Validate = function () {
        var pwd1 = this.pwdLabel1.text.trim();
        var pwd = this.pwdLabel.text.trim();
        if (UserUtil.checkTwoPwd(pwd, pwd1, 16, 6, this.pwdErrorLabel)) {
            this.pwdErrorLabel.text = "";
        }
    };
    /**
     * 注册成功
     */
    BaseRegisterTelPanel.prototype.registerSuccessHandler = function (data) {
        var _this = this;
        AlertManager.showAlert("注册成功！", function () {
            AccountManager.OnLoginSuccess.dispatch({ token: data.token, uid: data.uid });
            _this.onCloseBtnClickHandler(null);
        });
    };
    BaseRegisterTelPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return BaseRegisterTelPanel;
}(BasePanel));
__reflect(BaseRegisterTelPanel.prototype, "BaseRegisterTelPanel");
//# sourceMappingURL=BaseRegisterTelPanel.js.map