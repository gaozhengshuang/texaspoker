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
 * 找回账号密码
*/
var AccountRetrievePwdPanel = (function (_super) {
    __extends(AccountRetrievePwdPanel, _super);
    function AccountRetrievePwdPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.AccountRetrievePwdPanel);
        return _this;
    }
    AccountRetrievePwdPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.telephoneLabel.inputType = egret.TextFieldInputType.TEL;
        this.telephoneLabel.restrict = "0-9";
        this.telephoneLabel.maxChars = 11;
        this.verificationCodeLabel.inputType = egret.TextFieldInputType.TEL;
        this.verificationCodeLabel.restrict = "0-9";
        this.verificationCodeLabel.maxChars = 6;
        this.newPwdLabel.maxChars = 16;
        this.confirmPwdLabel.maxChars = 16;
        this.newPwdLabel.inputType = this.confirmPwdLabel.inputType = egret.TextFieldInputType.PASSWORD;
    };
    AccountRetrievePwdPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        UserUtil.initCode(this.sendCodeBtn);
        this.phoneErrorLabel.text = "";
        this.pwdErrorLabel.text = "";
        this.telephoneLabel.text = "";
        this.verificationCodeLabel.text = "";
        this.newPwdLabel.text = "";
        this.confirmPwdLabel.text = "";
    };
    AccountRetrievePwdPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        this.sendCodeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendCodeBtnClick, this);
        this.telephoneLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onPhoneLabelFouseOut, this);
        this.verificationCodeLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onCodeLabelFouseOut, this);
        this.newPwdLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onPwdLabelFouceOut, this);
        this.confirmPwdLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onPwdLabelFouceOut, this);
        AccountManager.OnPhoneModifyPassword.addListener(this.phoneFindPwdSuccess, this);
        AccountManager.OnPhoneFindPassword.addListener(this.sendCodeSuccess, this);
    };
    AccountRetrievePwdPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        this.sendCodeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendCodeBtnClick, this);
        this.telephoneLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onPhoneLabelFouseOut, this);
        this.verificationCodeLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onCodeLabelFouseOut, this);
        this.newPwdLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onPwdLabelFouceOut, this);
        this.confirmPwdLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onPwdLabelFouceOut, this);
        AccountManager.OnPhoneModifyPassword.removeListener(this.phoneFindPwdSuccess, this);
        AccountManager.OnPhoneFindPassword.removeListener(this.sendCodeSuccess, this);
        UserUtil.removeCodeCountDown();
    };
    /**
    * 手机号输入框失去焦点
   */
    AccountRetrievePwdPanel.prototype.onPhoneLabelFouseOut = function (e) {
        this.phoneErrorLabel.text = qin.RegexUtil.isPhoneNumber(this.telephoneLabel.text) ? "" : "您输入的手机号错误，请重新输入！";
    };
    /**
     * 点击发送验证码执行的操作
    */
    AccountRetrievePwdPanel.prototype.sendCodeBtnClick = function (e) {
        if (qin.RegexUtil.isPhoneNumber(this.telephoneLabel.text)) {
            SoundManager.playButtonEffect(e.target);
            this.phoneErrorLabel.text = "";
            this.sendCodeRes();
        }
        else {
            this.phoneErrorLabel.text = "您输入的手机号错误，请重新输入！";
        }
    };
    /**
     * 发送手机验证码
    */
    AccountRetrievePwdPanel.prototype.sendCodeRes = function () {
        AccountManager.PhoneFindPassword(this.telephoneLabel.text.trim(), this.telephoneLabel.text.trim());
        qin.Console.log("账号找回密码发送手机验证码");
    };
    /**
     * 发送成功回调
    */
    AccountRetrievePwdPanel.prototype.sendCodeSuccess = function () {
        UserUtil.addCodeCountDown({ sendCodeBtn: this.sendCodeBtn, leftTime: this.leftTime });
    };
    /**
     * 验证码输入框失去焦点
    */
    AccountRetrievePwdPanel.prototype.onCodeLabelFouseOut = function (e) {
        this.codeValidate(true);
    };
    /**
     * 确认按钮点击执行的事件
    */
    AccountRetrievePwdPanel.prototype.onConfirmClick = function (e) {
        SoundManager.playButtonEffect(e.target);
        var newPwd = this.newPwdLabel.text.trim();
        var againPwd = this.confirmPwdLabel.text.trim();
        if (qin.RegexUtil.isPhoneNumber(this.telephoneLabel.text) && this.codeValidate(false) && UserUtil.checkTwoPwd(newPwd, againPwd, 16, 6, this.pwdErrorLabel)) {
            AccountManager.PhoneModifyPassword(this.verificationCodeLabel.text.trim(), this.telephoneLabel.text.trim(), this.newPwdLabel.text.trim());
        }
    };
    /**
     * 手机修改密码成功
    */
    AccountRetrievePwdPanel.prototype.phoneFindPwdSuccess = function () {
        // UIManager.showPanel(UIModuleName.LoginTelPanel);
        // this.onCloseBtnClickHandler(null);
        this.onCloseBtnClickHandler(null);
    };
    /**
     * 密码输入框失去焦点
    */
    AccountRetrievePwdPanel.prototype.onPwdLabelFouceOut = function () {
        var newPwd = this.newPwdLabel.text.trim();
        var againPwd = this.confirmPwdLabel.text.trim();
        if (UserUtil.checkTwoPwd(newPwd, againPwd, 16, 6, this.pwdErrorLabel)) {
            this.pwdErrorLabel.text = "";
        }
    };
    /**
     * 验证验证码
    */
    AccountRetrievePwdPanel.prototype.codeValidate = function (isShowAlert) {
        if (isShowAlert === void 0) { isShowAlert = false; }
        var code = this.verificationCodeLabel.text.trim();
        if (code && code.length == 6) {
            this.phoneErrorLabel.text = "";
            return true;
        }
        else {
            if (isShowAlert) {
                this.phoneErrorLabel.text = "您输入的验证码错误，请重新输入！";
            }
            return false;
        }
    };
    AccountRetrievePwdPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return AccountRetrievePwdPanel;
}(BasePanel));
__reflect(AccountRetrievePwdPanel.prototype, "AccountRetrievePwdPanel");
//# sourceMappingURL=AccountRetrievePwdPanel.js.map