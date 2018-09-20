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
 * 手机登录面板
 */
var LoginTelPanel = (function (_super) {
    __extends(LoginTelPanel, _super);
    function LoginTelPanel() {
        var _this = _super.call(this) || this;
        _this.isTween = true;
        _this.setSkinName(UIModuleName.LoginTelPanel);
        return _this;
    }
    LoginTelPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.accountText.inputType = egret.TextFieldInputType.TEL;
        this.accountText.restrict = "0-9";
        this.accountText.maxChars = 11;
        this.codeLabel.inputType = egret.TextFieldInputType.TEL;
        this.codeLabel.restrict = "0-9";
        this.codeLabel.maxChars = 6;
        this.pwdText.inputType = egret.TextFieldInputType.PASSWORD;
        this.isMaskClickClose = true;
        // this.accountText.text = PrefsManager.getValue(PrefsManager.Login_Account);
        // this.pwdText.text = PrefsManager.getValue(PrefsManager.Login_Password);
        this.maskAlpha = 0;
        this.tweenGroup.verticalCenter = 220;
        this.tabCom.isTween = false;
        this.codeLoginGroup.visible = this.pwdLoginGroup.visible = false;
        var array = new Array();
        array.push(this.pwdLoginGroup);
        array.push(this.codeLoginGroup);
        this.tabCom.build(TabComponent.CreatData(["密码登录", "手机验证码登录"], array, TabButtonType.SmallOf2));
    };
    LoginTelPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.accountText.text = qin.StringConstants.Empty;
        this.pwdText.text = qin.StringConstants.Empty;
        this.setDefaultAccount();
        UserUtil.initCode(this.sendCodeBtn);
        this.tabCom.init(0);
        this.telErrorLabel.text = "";
    };
    LoginTelPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    LoginTelPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginHandler, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerHandler, this);
        this.findPwdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.findPwdHandler, this);
        this.sendCodeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sencCodeClickHandler, this);
        AccountManager.OnLoginSuccess.addListener(this.loginSuccessHandler, this);
        AccountManager.OnLoadingStart.addListener(this.showLoading, this);
        AccountManager.OnLoadingFinish.addListener(this.closeLoading, this);
        AccountManager.OnPhoneSmsLogin.addListener(this.sendCodeSuccess, this);
        AccountManager.OnNoPw.addListener(this.noPwRemind, this);
        this.tabCom.tabChangeEvent.addListener(this.onTabClickHandler, this);
        AccountManager.OnPhoneModifyPassword.addListener(this.setDefaultAccount, this);
    };
    LoginTelPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.loginHandler, this);
        this.registerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.registerHandler, this);
        this.findPwdBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.findPwdHandler, this);
        this.sendCodeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sencCodeClickHandler, this);
        AccountManager.OnLoginSuccess.removeListener(this.loginSuccessHandler, this);
        AccountManager.OnLoadingStart.removeListener(this.showLoading, this);
        AccountManager.OnLoadingFinish.removeListener(this.closeLoading, this);
        AccountManager.OnPhoneSmsLogin.removeListener(this.sendCodeSuccess, this);
        AccountManager.OnNoPw.removeListener(this.noPwRemind, this);
        this.tabCom.tabChangeEvent.removeListener(this.onTabClickHandler, this);
        AccountManager.OnPhoneModifyPassword.removeListener(this.setDefaultAccount, this);
        UserUtil.removeCodeCountDown();
    };
    /**
     * 设置默认的账号和密码
    */
    LoginTelPanel.prototype.setDefaultAccount = function () {
        var list = AccountPlayerPrefs.GetAccountList();
        if (list != null && list.length > 0) {
            var info = list[0];
            this.accountText.text = info.account;
            this.pwdText.text = info.pw;
        }
    };
    /**
     * 清空手机验证码登录内容
    */
    LoginTelPanel.prototype.clearVcodeLoginText = function () {
        this.telErrorLabel.text = "";
        this.codeLabel.text = "";
        this.accountText.text = "";
    };
    /**
     * 选项卡按钮点击事件
    */
    LoginTelPanel.prototype.onTabClickHandler = function (index) {
        if (index == 0) {
            this.setDefaultAccount();
        }
        else if (index == 1) {
            this.clearVcodeLoginText();
        }
    };
    /**
     * 点击登录按钮进行登录
     * DispatchAccountLoginSucceed（）第三个参数来区分是进行注册还是进行登录操作
    */
    LoginTelPanel.prototype.loginHandler = function (event) {
        var account = this.accountText.text.trim();
        SoundManager.playButtonEffect(event.target);
        if (!this.isEmpty()) {
            if (this.tabCom.lastIndex == 0) {
                var pw = this.pwdText.text.trim();
                var isPwMd5 = AccountPlayerPrefs.IsMatchAccountPassword(account, pw);
                AccountManager.Login(account, pw, isPwMd5);
            }
            else if (this.tabCom.lastIndex == 1) {
                var code = this.codeLabel.text.trim();
                AccountManager.PhoneSmsLoginVerify(code, account);
            }
        }
    };
    /**
     * 没有密码提醒
    */
    LoginTelPanel.prototype.noPwRemind = function () {
        AlertManager.showConfirm("此账号只使用验证码登录过，请通过忘记密码来设置密码或仍使用验证码登录！", this.jumpToCodeLogin.bind(this), this.findPwdHandler.bind(this), null, null, null, "验证码登录", "设置密码");
    };
    /**
     * 跳转到验证码登录
    */
    LoginTelPanel.prototype.jumpToCodeLogin = function () {
        this.tabCom.init(1);
        this.clearVcodeLoginText();
    };
    /**
     * 验证账号
    */
    LoginTelPanel.prototype.isEmpty = function () {
        var account = this.accountText.text.trim();
        if (this.tabCom.lastIndex == 0) {
            var pw = this.pwdText.text.trim();
            if (!account || !pw) {
                AlertManager.showAlert("您的账号或密码为空，请重新输入！");
                return true;
            }
        }
        else if (this.tabCom.lastIndex == 1) {
            var code = this.codeLabel.text.trim();
            if (!account || !code) {
                AlertManager.showAlert("您的账号或手机验证码为空，请重新输入！");
                return true;
            }
        }
        return false;
    };
    /**
    * 登录成功回调
   */
    LoginTelPanel.prototype.loginSuccessHandler = function () {
        var account = this.accountText.text.trim();
        var pwd = this.pwdText.text.trim();
        UIManager.showFloatTips("欢迎回来 " + AccountManager.account);
        ChannelManager.DispatchAccountLoginSucceed(account, pwd, false);
        this.onCloseBtnClickHandler(null);
    };
    /**
     * 点击注册按钮显示注册面板
    */
    LoginTelPanel.prototype.registerHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        UIManager.showPanel(UIModuleName.RegisterTelPanel, { prevPanelName: UIModuleName.LoginTelPanel });
    };
    /**
     * 点击忘记密码显示找回密码面板
    */
    LoginTelPanel.prototype.findPwdHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        JumpUtil.JumpToRetrievePwd(UIModuleName.LoginTelPanel);
    };
    /**
     * 发送验证码按钮点击事件
    */
    LoginTelPanel.prototype.sencCodeClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.accountValidate()) {
            //发送手机验证码
            AccountManager.PhoneSmsLogin(this.accountText.text.trim());
        }
    };
    /**
     * 验证码发送成功回调
    */
    LoginTelPanel.prototype.sendCodeSuccess = function () {
        UserUtil.addCodeCountDown({ sendCodeBtn: this.sendCodeBtn, leftTime: this.leftTime });
    };
    LoginTelPanel.prototype.accountValidate = function () {
        var account = this.accountText.text.trim();
        if (!account) {
            this.telErrorLabel.text = "*手机号不能为空";
            return false;
        }
        if (qin.RegexUtil.isPhoneNumber(account)) {
            this.telErrorLabel.text = "";
            return true;
        }
        else {
            this.telErrorLabel.text = "*手机号格式不正确";
            return false;
        }
    };
    /**
     * 点击遮罩关闭执行的操作
    */
    LoginTelPanel.prototype.onCloseBtnClickHandler = function (event) {
        _super.prototype.onCloseBtnClickHandler.call(this, event);
        if (event) {
            ChannelManager.OnLoginFailed.dispatch();
        }
    };
    /**
     * 显示loading界面
    */
    LoginTelPanel.prototype.showLoading = function () {
        UIManager.showPanel(UIModuleName.LoadingPanel);
    };
    /**
     * 关闭loading界面
    */
    LoginTelPanel.prototype.closeLoading = function () {
        UIManager.closePanel(UIModuleName.LoadingPanel);
    };
    return LoginTelPanel;
}(BasePanel));
__reflect(LoginTelPanel.prototype, "LoginTelPanel");
//# sourceMappingURL=LoginTelPanel.js.map