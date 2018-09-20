/**
 * 注册手机账号基类
*/
class BaseRegisterTelPanel extends BasePanel
{
    public registerBtn: eui.Button;
    public sendCodeBtn: eui.Button;
    public accountLabel: eui.Label;
    public pwdLabel: eui.Label;
    public pwdLabel1: eui.Label;
    public codeLabel: eui.Label;
    public pwdErrorLabel: eui.Label;
    public telErrorLabel: eui.Label;
    public leftTime: number;
    protected _anime: PanelAnime;

    public constructor()
    {
        super();
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
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
    }

    public init(appendData: any)
    {
        super.init(appendData);
        this.reset();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this._anime.onEnable();
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerClickHandler, this);
        this.sendCodeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sencCodeClickHandler, this);
        this.accountLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.accountValidate, this);
        this.codeLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.codeValidate, this);
        this.pwdLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.pwdValidate, this);
        this.pwdLabel1.addEventListener(egret.FocusEvent.FOCUS_OUT, this.pwd1Validate, this);
        AccountManager.OnPhoneRegister.addListener(this.sendCodeSuccess, this);
        AccountManager.OnRegisterSuccess.addListener(this.registerSuccessHandler, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
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
    }
    /**
     * 重置
    */
    protected reset()
    {
        this.pwdErrorLabel.text = this.telErrorLabel.text = "";
        UserUtil.initCode(this.sendCodeBtn);
    }
    /**
     * 手机错误提示清空
    */
    protected clearTelError()
    {
        this.telErrorLabel.text = "";
    }
    /**
     * 密码错误提示清空
    */
    protected clearPwdError()
    {
        this.pwdErrorLabel.text = "";
    }
    /**
     * 注册按钮点击事件
    */
    protected registerClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        let pwd1: string = this.pwdLabel1.text.trim();
        let pwd: string = this.pwdLabel.text.trim();
        if (this.accountValidate() && this.codeValidate() && UserUtil.checkTwoPwd(pwd, pwd1, 16, 6, this.pwdErrorLabel))
        {
            AccountManager.PhoneRegisterVerify(this.accountLabel.text.trim(), this.codeLabel.text.trim(), this.pwdLabel.text.trim());
        }
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
            AccountManager.PhoneRegister(this.accountLabel.text.trim());
        }
    }
    /**
     * 验证码发送成功回调
    */
    protected sendCodeSuccess()
    {
        UserUtil.addCodeCountDown({ sendCodeBtn: this.sendCodeBtn, leftTime: this.leftTime });
    }
    /**
     * 客户端验证
    */
    protected accountValidate(): boolean  //手机号（账号）
    {
        let account: string = this.accountLabel.text.trim();
        if (!account)
        {
            this.telErrorLabel.text = "*手机号不能为空";
            return false;
        }
        if (qin.RegexUtil.isPhoneNumber(account))
        {
            this.clearTelError();
            return true;
        } else
        {
            this.telErrorLabel.text = "*手机号格式不正确";
            return false;
        }
    }
    protected codeValidate()  //验证码
    {
        let code: string = this.codeLabel.text.trim();
        if (code)
        {
            this.clearTelError();
            return true;
        } else
        {
            this.telErrorLabel.text = "*请填写手机验证码";
            return false;
        }
    }
    protected pwdValidate()  //密码
    {
        let pwd: string = this.pwdLabel.text.trim();
        if (UserUtil.checkPwd(pwd, 16, 6, this.pwdErrorLabel))
        {
            this.pwdErrorLabel.text = "";
        }
    }
    protected pwd1Validate()  //重复密码
    {
        let pwd1: string = this.pwdLabel1.text.trim();
        let pwd: string = this.pwdLabel.text.trim();
        if (UserUtil.checkTwoPwd(pwd, pwd1, 16, 6, this.pwdErrorLabel))
        {
            this.pwdErrorLabel.text = "";
        }
    }
    /**
     * 注册成功
     */
    protected registerSuccessHandler(data: any)
    {
        AlertManager.showAlert("注册成功！", () =>
        {
            AccountManager.OnLoginSuccess.dispatch({ token: data.token, uid: data.uid });
            this.onCloseBtnClickHandler(null);
        });
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }
}