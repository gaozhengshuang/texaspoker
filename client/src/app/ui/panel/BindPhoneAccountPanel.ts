/**
 * 绑定手机账号面板
*/
class BindPhoneAccountPanel extends BaseRegisterTelPanel
{
    public tabCom: TabComponent;
    /**
     * 注册手机账号group
    */
    public registerGroup: eui.Group;
    /**
     * 已有账号group
    */
    public hasAccountGroup: eui.Group;

    public loginBtn: eui.Button;
    public findPwdBtn: eui.Label;
    public accountText: eui.EditableText;
    public pwdText: eui.EditableText;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.BindPhoneAccountPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.registerGroup.visible = this.hasAccountGroup.visible = false;
        let array: Array<eui.Group> = new Array<eui.Group>();
        array.push(this.registerGroup);
        array.push(this.hasAccountGroup);
        this.tabCom.build(TabComponent.CreatData(["注册手机账号", "已有手机账号"], array, TabButtonType.BigOf2));

        this.accountText.inputType = egret.TextFieldInputType.TEL;
        this.accountText.restrict = "0-9";
        this.accountText.maxChars = 11;
        this.pwdText.inputType = egret.TextFieldInputType.PASSWORD;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.tabCom.init(0);
    }

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginHandler, this);
        this.findPwdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.findPwdHandler, this);
        AccountManager.OnLoginSuccess.addListener(this.loginSuccessHandler, this);
        AccountManager.OnLoadingStart.addListener(this.showLoading, this);
        AccountManager.OnLoadingFinish.addListener(this.closeLoading, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.loginHandler, this);
        this.findPwdBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.findPwdHandler, this);
        AccountManager.OnLoginSuccess.removeListener(this.loginSuccessHandler, this);
        AccountManager.OnLoadingStart.removeListener(this.showLoading, this);
        AccountManager.OnLoadingFinish.removeListener(this.closeLoading, this);
    }
    /**
     * 注册成功
     */
    protected registerSuccessHandler(data: any)
    {
        AccountManager.OnLoginSuccess.dispatch({ token: data.token, uid: data.uid });
        this.onCloseBtnClickHandler(null);
    }
    /**
	 * 点击登录按钮进行登录
	 * DispatchAccountLoginSucceed（）第三个参数来区分是进行注册还是进行登录操作
	*/
    private loginHandler(event: egret.TouchEvent)
    {
        let account: string = this.accountText.text.trim();
        let pw: string = this.pwdText.text.trim();
        SoundManager.playButtonEffect(event.target);
        if (!account || !pw)
        {
            AlertManager.showAlert("您的账号或密码为空，请重新输入！");
            return;
        }
        let isPwMd5: boolean = AccountPlayerPrefs.IsMatchAccountPassword(account, pw);
        AccountManager.Login(account, pw, isPwMd5, true);
    }
    /**
    * 登录成功回调
   */
    private loginSuccessHandler()
    {
        let account: string = this.accountText.text.trim();
        let pwd: string = this.pwdText.text.trim();
        if (account)
        {
            ChannelManager.DispatchAccountLoginSucceed(account, pwd, false);
            this.onCloseBtnClickHandler(null);
        }
    }
	/**
	 * 点击忘记密码显示找回密码面板
	*/
    private findPwdHandler(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        JumpUtil.JumpToRetrievePwd(UIModuleName.BindPhoneAccountPanel);
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