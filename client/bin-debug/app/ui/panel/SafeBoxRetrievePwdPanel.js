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
 * 找回保险箱密码
*/
var SafeBoxRetrievePwdPanel = (function (_super) {
    __extends(SafeBoxRetrievePwdPanel, _super);
    function SafeBoxRetrievePwdPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.SafeBoxRetrievePwdPanel);
        return _this;
    }
    SafeBoxRetrievePwdPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    SafeBoxRetrievePwdPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.newSafePwd.init({ isNotMaskKeyPanel: true });
        this.confirmSafePwd.init({ isNotMaskKeyPanel: true });
    };
    SafeBoxRetrievePwdPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    SafeBoxRetrievePwdPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        this.newSafePwd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeY, this);
        this.confirmSafePwd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeY, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        UIManager.onPanelCloseEvent.addListener(this.restoreY, this);
        this.newSafePwd.pwdInput.addListener(this.pwdInput, this);
        this.confirmSafePwd.pwdInput.addListener(this.pwdInput, this);
        SafeBoxManager.onGetCodeEvent.addListener(this.sendCodeSuccess, this);
        SafeBoxManager.onRetrievePwdEvent.addListener(this.findPwdSuccess, this);
    };
    SafeBoxRetrievePwdPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        this.newSafePwd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeY, this);
        this.confirmSafePwd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeY, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        UIManager.onPanelCloseEvent.removeListener(this.restoreY, this);
        this.newSafePwd.pwdInput.removeListener(this.pwdInput, this);
        this.confirmSafePwd.pwdInput.removeListener(this.pwdInput, this);
        SafeBoxManager.onGetCodeEvent.removeListener(this.sendCodeSuccess, this);
        SafeBoxManager.onRetrievePwdEvent.removeListener(this.findPwdSuccess, this);
        this.restoreY();
    };
    SafeBoxRetrievePwdPanel.prototype.pwdInput = function () {
        var pwd1 = this.newSafePwd.getPwd();
        var pwd2 = this.confirmSafePwd.getPwd();
        if (pwd1.length > 0 && pwd2.length > 0) {
            var min = Math.min(pwd1.length, pwd2.length);
            if (pwd1.substring(0, min) != pwd2.substring(0, min)) {
                this.pwdErrorLabel.text = "*新密码两次不一致";
            }
            else {
                this.pwdErrorLabel.text = "";
            }
        }
    };
    /**
     * 还原y轴位置
    */
    SafeBoxRetrievePwdPanel.prototype.restoreY = function () {
        this.verticalCenter = 0;
        this.enableLabelClick();
    };
    /**
     * 输入密码框点击事件
    */
    SafeBoxRetrievePwdPanel.prototype.changeY = function () {
        this.verticalCenter = -220;
        this.disableLabelClick();
    };
    /**
     * 禁止输入框点击   （防止面板上移后，点击输入框面板复位 但是光标还在原处）
    */
    SafeBoxRetrievePwdPanel.prototype.disableLabelClick = function () {
        this.telephoneLabel.touchEnabled = false;
        this.verificationCodeLabel.touchEnabled = false;
    };
    /**
     * 打开输入框点击
    */
    SafeBoxRetrievePwdPanel.prototype.enableLabelClick = function () {
        this.telephoneLabel.touchEnabled = true;
        this.verificationCodeLabel.touchEnabled = true;
    };
    /**
     * 发送手机验证码
    */
    SafeBoxRetrievePwdPanel.prototype.sendCodeRes = function () {
        SafeBoxManager.reqGetCode(this.telephoneLabel.text.trim());
    };
    /**
     * 确认按钮点击执行的事件
    */
    SafeBoxRetrievePwdPanel.prototype.onConfirmClick = function (e) {
        _super.prototype.onConfirmClick.call(this, e);
        var newPwd = this.newSafePwd.getPwd();
        var againPwd = this.confirmSafePwd.getPwd();
        if (qin.RegexUtil.isPhoneNumber(this.telephoneLabel.text) && this.codeValidate(false) && UserUtil.checkTwoPwd(newPwd, againPwd, 6, 6, this.pwdErrorLabel)) {
            SafeBoxManager.reqRetrievePwd(newPwd, this.verificationCodeLabel.text.trim());
        }
    };
    /**
     * 找回密码成功执行的事件
    */
    SafeBoxRetrievePwdPanel.prototype.findPwdSuccess = function () {
        _super.prototype.onCloseBtnClickHandler.call(this, null);
    };
    SafeBoxRetrievePwdPanel.prototype.onButtonClick = function (e) {
        if (e.target != this.newSafePwd && e.target != this.confirmSafePwd) {
            this.restoreY();
            UIManager.closePanel(UIModuleName.KeyBoardPanel);
        }
    };
    return SafeBoxRetrievePwdPanel;
}(BaseRetrievePwdPanel));
__reflect(SafeBoxRetrievePwdPanel.prototype, "SafeBoxRetrievePwdPanel");
//# sourceMappingURL=SafeBoxRetrievePwdPanel.js.map