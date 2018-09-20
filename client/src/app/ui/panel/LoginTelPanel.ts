/**
 * 手机登录面板
 */
class LoginTelPanel extends BasePanel
{
    public tabCom: TabComponent;
    /**
     * 验证码登录
    */
    public codeLoginGroup: eui.Group;
    public codeLabel: eui.Label;
    public sendCodeBtn: eui.Button;
    public telErrorLabel: eui.Label;
    public leftTime: number;
    /**
     * 密码登录
    */
    public pwdLoginGroup: eui.Group;
    public registerBtn: eui.Label;
    public findPwdBtn: eui.Label;
    public pwdText: eui.EditableText;

    public loginBtn: eui.Button;
    public accountText: eui.EditableText;

    public constructor()
    {
        super();
        this.isTween = true;
        this.setSkinName(UIModuleName.LoginTelPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
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
        let array: Array<eui.Group> = new Array<eui.Group>();
        array.push(this.pwdLoginGroup);
        array.push(this.codeLoginGroup);
        this.tabCom.build(TabComponent.CreatData(["密码登录", "手机验证码登录"], array, TabButtonType.SmallOf2));
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.accountText.text = qin.StringConstants.Empty;
        this.pwdText.text = qin.StringConstants.Empty;
        this.setDefaultAccount();
        UserUtil.initCode(this.sendCodeBtn);
        this.tabCom.init(0);
        this.telErrorLabel.text = "";
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
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
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
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
    }
    /**
     * 设置默认的账号和密码
    */
    private setDefaultAccount()
    {
        let list: Array<any> = AccountPlayerPrefs.GetAccountList();
        if (list != null && list.length > 0)
        {
            let info: any = list[0];
            this.accountText.text = info.account;
            this.pwdText.text = info.pw;
        }
    }
    /**
     * 清空手机验证码登录内容
    */
    private clearVcodeLoginText()
    {
        this.telErrorLabel.text = "";
        this.codeLabel.text = "";
        this.accountText.text = "";
    }
    /**
     * 选项卡按钮点击事件
    */
    private onTabClickHandler(index: number): void
    {
        if (index == 0)
        {
            this.setDefaultAccount();
        } else if (index == 1)
        {
            this.clearVcodeLoginText();
        }
    }
	/**
	 * 点击登录按钮进行登录
	 * DispatchAccountLoginSucceed（）第三个参数来区分是进行注册还是进行登录操作
	*/
    private loginHandler(event: egret.TouchEvent)
    {
        let account: string = this.accountText.text.trim();
        SoundManager.playButtonEffect(event.target);
        if (!this.isEmpty())
        {
            if (this.tabCom.lastIndex == 0)
            {
                let pw: string = this.pwdText.text.trim();
                let isPwMd5: boolean = AccountPlayerPrefs.IsMatchAccountPassword(account, pw);
                AccountManager.Login(account, pw, isPwMd5);
            } else if (this.tabCom.lastIndex == 1)
            {
                let code: string = this.codeLabel.text.trim();
                AccountManager.PhoneSmsLoginVerify(code, account);
            }
        }
    }
    /**
     * 没有密码提醒
    */
    private noPwRemind()
    {
        AlertManager.showConfirm("此账号只使用验证码登录过，请通过忘记密码来设置密码或仍使用验证码登录！", this.jumpToCodeLogin.bind(this), this.findPwdHandler.bind(this), null, null, null, "验证码登录", "设置密码");
    }
    /**
     * 跳转到验证码登录
    */
    private jumpToCodeLogin()
    {
        this.tabCom.init(1);
        this.clearVcodeLoginText();
    }
    /**
     * 验证账号
    */
    private isEmpty(): boolean
    {
        let account: string = this.accountText.text.trim();
        if (this.tabCom.lastIndex == 0)
        {
            let pw: string = this.pwdText.text.trim();
            if (!account || !pw)
            {
                AlertManager.showAlert("您的账号或密码为空，请重新输入！");
                return true;
            }
        } else if (this.tabCom.lastIndex == 1)
        {
            let code: string = this.codeLabel.text.trim();
            if (!account || !code)
            {
                AlertManager.showAlert("您的账号或手机验证码为空，请重新输入！");
                return true;
            }
        }
        return false;
    }
    /**
    * 登录成功回调
   */
    private loginSuccessHandler()
    {
        let account: string = this.accountText.text.trim();
        let pwd: string = this.pwdText.text.trim();
        UIManager.showFloatTips("欢迎回来 " + AccountManager.account);
        ChannelManager.DispatchAccountLoginSucceed(account, pwd, false);
        this.onCloseBtnClickHandler(null);
    }
	/**
	 * 点击注册按钮显示注册面板
	*/
    private registerHandler(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        UIManager.showPanel(UIModuleName.RegisterTelPanel, { prevPanelName: UIModuleName.LoginTelPanel });
    }
	/**
	 * 点击忘记密码显示找回密码面板
	*/
    private findPwdHandler(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        JumpUtil.JumpToRetrievePwd(UIModuleName.LoginTelPanel);
    }
    /**
     * 发送验证码按钮点击事件
    */
    protected sencCodeClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (this.accountValidate())
        {
            //发送手机验证码
            AccountManager.PhoneSmsLogin(this.accountText.text.trim());
        }
    }
    /**
     * 验证码发送成功回调
    */
    protected sendCodeSuccess()
    {
        UserUtil.addCodeCountDown({ sendCodeBtn: this.sendCodeBtn, leftTime: this.leftTime });
    }
    protected accountValidate(): boolean  //手机号（账号）
    {
        let account: string = this.accountText.text.trim();
        if (!account)
        {
            this.telErrorLabel.text = "*手机号不能为空";
            return false;
        }
        if (qin.RegexUtil.isPhoneNumber(account))
        {
            this.telErrorLabel.text = "";
            return true;
        } else
        {
            this.telErrorLabel.text = "*手机号格式不正确";
            return false;
        }
    }
    /**
     * 点击遮罩关闭执行的操作
    */
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        super.onCloseBtnClickHandler(event);
        if (event)
        {
            ChannelManager.OnLoginFailed.dispatch();
        }
    }
    /**
     * 显示loading界面
    */
    private showLoading()
    {
        UIManager.showPanel(UIModuleName.LoadingPanel);
    }
    /**
     * 关闭loading界面
    */
    private closeLoading()
    {
        UIManager.closePanel(UIModuleName.LoadingPanel);
    }
}