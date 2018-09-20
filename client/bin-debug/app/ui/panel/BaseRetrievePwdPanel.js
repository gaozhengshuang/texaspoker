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
 * 找回密码基类
*/
var BaseRetrievePwdPanel = (function (_super) {
    __extends(BaseRetrievePwdPanel, _super);
    function BaseRetrievePwdPanel() {
        return _super.call(this) || this;
    }
    BaseRetrievePwdPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.telephoneLabel.inputType = egret.TextFieldInputType.TEL;
        this.telephoneLabel.restrict = "0-9";
        this.telephoneLabel.maxChars = 11;
        this.verificationCodeLabel.inputType = egret.TextFieldInputType.TEL;
        this.verificationCodeLabel.restrict = "0-9";
        this.verificationCodeLabel.maxChars = 6;
    };
    BaseRetrievePwdPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        UserUtil.initCode(this.sendCodeBtn);
        this.phoneErrorLabel.text = "";
        this.pwdErrorLabel.text = "";
        this.telephoneLabel.text = "";
        this.verificationCodeLabel.text = "";
    };
    BaseRetrievePwdPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    BaseRetrievePwdPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClick, this);
        this.sendCodeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendCodeBtnClick, this);
        this.telephoneLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onPhoneLabelFouseOut, this);
        this.verificationCodeLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onCodeLabelFouseOut, this);
    };
    BaseRetrievePwdPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClick, this);
        this.sendCodeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendCodeBtnClick, this);
        this.telephoneLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onPhoneLabelFouseOut, this);
        this.verificationCodeLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onCodeLabelFouseOut, this);
        UserUtil.removeCodeCountDown();
    };
    /**
     * 关闭按钮点击执行的操作
    */
    BaseRetrievePwdPanel.prototype.onCloseBtnClick = function (e) {
        SoundManager.playButtonEffect(e.target);
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
    };
    /**
     * 手机号输入框失去焦点
    */
    BaseRetrievePwdPanel.prototype.onPhoneLabelFouseOut = function (e) {
        this.phoneErrorLabel.text = qin.RegexUtil.isPhoneNumber(this.telephoneLabel.text) ? "" : "您输入的手机号错误，请重新输入！";
    };
    /**
     * 点击发送验证码执行的操作
    */
    BaseRetrievePwdPanel.prototype.sendCodeBtnClick = function (e) {
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
     * 验证码输入框失去焦点
    */
    BaseRetrievePwdPanel.prototype.onCodeLabelFouseOut = function (e) {
        this.codeValidate(true);
    };
    /**
     * 确认按钮点击执行的事件
    */
    BaseRetrievePwdPanel.prototype.onConfirmClick = function (e) {
        SoundManager.playButtonEffect(e.target);
    };
    /**
     * 发送手机验证码
    */
    BaseRetrievePwdPanel.prototype.sendCodeRes = function () {
    };
    /**
     * 发送成功回调
    */
    BaseRetrievePwdPanel.prototype.sendCodeSuccess = function () {
        UserUtil.addCodeCountDown({ sendCodeBtn: this.sendCodeBtn, leftTime: this.leftTime });
    };
    /**
     * 验证验证码
    */
    BaseRetrievePwdPanel.prototype.codeValidate = function (isShowAlert) {
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
    return BaseRetrievePwdPanel;
}(BasePanel));
__reflect(BaseRetrievePwdPanel.prototype, "BaseRetrievePwdPanel");
//# sourceMappingURL=BaseRetrievePwdPanel.js.map