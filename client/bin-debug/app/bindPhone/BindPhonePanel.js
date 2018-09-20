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
 * 绑定手机面板
 */
var BindPhonePanel = (function (_super) {
    __extends(BindPhonePanel, _super);
    function BindPhonePanel() {
        var _this = _super.call(this) || this;
        _this.isTween = true;
        _this.setSkinName(UIModuleName.BindPhonePanel);
        return _this;
    }
    BindPhonePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.phoneLabel.type = egret.TextFieldType.INPUT;
        this.phoneLabel.inputType = egret.TextFieldInputType.TEL;
        this.phoneLabel.restrict = "0-9";
        this.phoneLabel.maxChars = 11;
        this.codeLabel.type = egret.TextFieldType.INPUT;
    };
    BindPhonePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.reset();
    };
    BindPhonePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    BindPhonePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.sendCodeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sencCodeClickHandler, this);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandler, this);
        this.phoneLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.phoneValidate, this);
        this.codeLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.codeValidate, this);
        BindPhoneManager.onGetCodeEvent.addListener(this.sendCodeSuccess, this);
        BindPhoneManager.onBindPhoneEvent.addListener(this.bindSuccess, this);
    };
    BindPhonePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.sendCodeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sencCodeClickHandler, this);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandler, this);
        this.phoneLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.phoneValidate, this);
        this.codeLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.codeValidate, this);
        BindPhoneManager.onGetCodeEvent.removeListener(this.sendCodeSuccess, this);
        BindPhoneManager.onBindPhoneEvent.removeListener(this.bindSuccess, this);
        UserUtil.removeCodeCountDown();
    };
    /**
     * 重置
    */
    BindPhonePanel.prototype.reset = function () {
        this.clearTelError();
        this.phoneLabel.text = "";
        this.codeLabel.text = "";
        UserUtil.initCode(this.sendCodeBtn);
    };
    /**
     * 手机错误提示清空
    */
    BindPhonePanel.prototype.clearTelError = function () {
        this.telErrorLabel.text = "";
    };
    /**
     * 发送验证码
    */
    BindPhonePanel.prototype.sencCodeClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.phoneValidate()) {
            BindPhoneManager.reqGetCode(this.phoneLabel.text.trim());
        }
    };
    /**
     * 发送成功回调
    */
    BindPhonePanel.prototype.sendCodeSuccess = function () {
        UserUtil.addCodeCountDown({ sendCodeBtn: this.sendCodeBtn, leftTime: this.leftTime });
    };
    /**
     * 点击下一步
    */
    BindPhonePanel.prototype.confirmHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.phoneValidate() && this.codeValidate()) {
            BindPhoneManager.reqBindPhone(this.phoneLabel.text.trim(), this.codeLabel.text.trim());
        }
    };
    /**
     * 绑定手机验证成功回调
    */
    BindPhonePanel.prototype.bindSuccess = function () {
        if (this.panelData && this.panelData.isShowCreatePwd) {
            UIManager.showPanel(UIModuleName.SafeCreatePanel);
        }
        UserManager.userInfo.mno = this.phoneLabel.text.trim();
        this.onCloseBtnClickHandler(null);
    };
    /**
     * 客户端验证
    */
    BindPhonePanel.prototype.phoneValidate = function () {
        var account = this.phoneLabel.text.trim();
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
    BindPhonePanel.prototype.codeValidate = function () {
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
    return BindPhonePanel;
}(BasePanel));
__reflect(BindPhonePanel.prototype, "BindPhonePanel");
//# sourceMappingURL=BindPhonePanel.js.map