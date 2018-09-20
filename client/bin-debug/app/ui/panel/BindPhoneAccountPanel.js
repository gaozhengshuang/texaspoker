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
 * 绑定手机账号面板
*/
var BindPhoneAccountPanel = (function (_super) {
    __extends(BindPhoneAccountPanel, _super);
    function BindPhoneAccountPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.BindPhoneAccountPanel);
        return _this;
    }
    BindPhoneAccountPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.registerGroup.visible = this.hasAccountGroup.visible = false;
        var array = new Array();
        array.push(this.registerGroup);
        array.push(this.hasAccountGroup);
        this.tabCom.build(TabComponent.CreatData(["注册手机账号", "已有手机账号"], array, TabButtonType.BigOf2));
        this.accountText.inputType = egret.TextFieldInputType.TEL;
        this.accountText.restrict = "0-9";
        this.accountText.maxChars = 11;
        this.pwdText.inputType = egret.TextFieldInputType.PASSWORD;
    };
    BindPhoneAccountPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.tabCom.init(0);
    };
    BindPhoneAccountPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginHandler, this);
        this.findPwdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.findPwdHandler, this);
        AccountManager.OnLoginSuccess.addListener(this.loginSuccessHandler, this);
        AccountManager.OnLoadingStart.addListener(this.showLoading, this);
        AccountManager.OnLoadingFinish.addListener(this.closeLoading, this);
    };
    BindPhoneAccountPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.loginHandler, this);
        this.findPwdBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.findPwdHandler, this);
        AccountManager.OnLoginSuccess.removeListener(this.loginSuccessHandler, this);
        AccountManager.OnLoadingStart.removeListener(this.showLoading, this);
        AccountManager.OnLoadingFinish.removeListener(this.closeLoading, this);
    };
    /**
     * 注册成功
     */
    BindPhoneAccountPanel.prototype.registerSuccessHandler = function (data) {
        AccountManager.OnLoginSuccess.dispatch({ token: data.token, uid: data.uid });
        this.onCloseBtnClickHandler(null);
    };
    /**
     * 点击登录按钮进行登录
     * DispatchAccountLoginSucceed（）第三个参数来区分是进行注册还是进行登录操作
    */
    BindPhoneAccountPanel.prototype.loginHandler = function (event) {
        var account = this.accountText.text.trim();
        var pw = this.pwdText.text.trim();
        SoundManager.playButtonEffect(event.target);
        if (!account || !pw) {
            AlertManager.showAlert("您的账号或密码为空，请重新输入！");
            return;
        }
        var isPwMd5 = AccountPlayerPrefs.IsMatchAccountPassword(account, pw);
        AccountManager.Login(account, pw, isPwMd5, true);
    };
    /**
    * 登录成功回调
   */
    BindPhoneAccountPanel.prototype.loginSuccessHandler = function () {
        var account = this.accountText.text.trim();
        var pwd = this.pwdText.text.trim();
        if (account) {
            ChannelManager.DispatchAccountLoginSucceed(account, pwd, false);
            this.onCloseBtnClickHandler(null);
        }
    };
    /**
     * 点击忘记密码显示找回密码面板
    */
    BindPhoneAccountPanel.prototype.findPwdHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        JumpUtil.JumpToRetrievePwd(UIModuleName.BindPhoneAccountPanel);
    };
    /**
     * 显示loading界面
    */
    BindPhoneAccountPanel.prototype.showLoading = function () {
        UIManager.showPanel(UIModuleName.LoadingPanel);
    };
    /**
     * 关闭loading界面
    */
    BindPhoneAccountPanel.prototype.closeLoading = function () {
        UIManager.closePanel(UIModuleName.LoadingPanel);
    };
    return BindPhoneAccountPanel;
}(BaseRegisterTelPanel));
__reflect(BindPhoneAccountPanel.prototype, "BindPhoneAccountPanel");
//# sourceMappingURL=BindPhoneAccountPanel.js.map