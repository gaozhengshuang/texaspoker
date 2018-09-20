/**
 * 找回账号密码
*/
class AccountRetrievePwdPanel extends BasePanel
{
    public confirmBtn: ShadowButton;
    public newPwdLabel: eui.EditableText;
    public confirmPwdLabel: eui.EditableText;

    public telephoneLabel: eui.EditableText;
    public verificationCodeLabel: eui.EditableText;
    public sendCodeBtn: ShadowButton;
    public phoneErrorLabel: eui.Label;  //手机号错误提示
    public pwdErrorLabel: eui.Label;  //验证码错误提示
    public leftTime: number;

    private _anime: PanelAnime;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.AccountRetrievePwdPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
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
    }
    public init(appendData: any)
    {
        super.init(appendData);
        UserUtil.initCode(this.sendCodeBtn);
        this.phoneErrorLabel.text = "";
        this.pwdErrorLabel.text = "";
        this.telephoneLabel.text = "";
        this.verificationCodeLabel.text = "";
        this.newPwdLabel.text = "";
        this.confirmPwdLabel.text = "";
    }
    protected onEnable(event: eui.UIEvent)
    {
        super.onEnable(event);
        this._anime.onEnable();
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        this.sendCodeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendCodeBtnClick, this);
        this.telephoneLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onPhoneLabelFouseOut, this);
        this.verificationCodeLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onCodeLabelFouseOut, this);
        this.newPwdLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onPwdLabelFouceOut, this);
        this.confirmPwdLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onPwdLabelFouceOut, this);
        AccountManager.OnPhoneModifyPassword.addListener(this.phoneFindPwdSuccess, this);
        AccountManager.OnPhoneFindPassword.addListener(this.sendCodeSuccess, this);
    }
    protected onDisable(event: eui.UIEvent)
    {
        super.onDisable(event);
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
    }

    /**
    * 手机号输入框失去焦点
   */
    protected onPhoneLabelFouseOut(e: egret.TouchEvent)
    {
        this.phoneErrorLabel.text = game.RegexUtil.isPhoneNumber(this.telephoneLabel.text) ? "" : "您输入的手机号错误，请重新输入！";
    }
    /**
     * 点击发送验证码执行的操作
    */
    protected sendCodeBtnClick(e: egret.TouchEvent)
    {
        if (game.RegexUtil.isPhoneNumber(this.telephoneLabel.text))
        {
            SoundManager.playButtonEffect(e.target);
            this.phoneErrorLabel.text = "";
            this.sendCodeRes();
        } else
        {
            this.phoneErrorLabel.text = "您输入的手机号错误，请重新输入！";
        }
    }
    /**
     * 发送手机验证码
    */
    protected sendCodeRes()
    {
        AccountManager.PhoneFindPassword(this.telephoneLabel.text.trim(), this.telephoneLabel.text.trim());
        game.Console.log("账号找回密码发送手机验证码");
    }
    /**
     * 发送成功回调
    */
    protected sendCodeSuccess()
    {
        UserUtil.addCodeCountDown({ sendCodeBtn: this.sendCodeBtn, leftTime: this.leftTime });
    }
    /**
     * 验证码输入框失去焦点
    */
    protected onCodeLabelFouseOut(e: egret.TouchEvent)
    {
        this.codeValidate(true);
    }
    /**
     * 确认按钮点击执行的事件
    */
    protected onConfirmClick(e: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(e.target);
        let newPwd = this.newPwdLabel.text.trim();
        let againPwd = this.confirmPwdLabel.text.trim();
        if (game.RegexUtil.isPhoneNumber(this.telephoneLabel.text) && this.codeValidate(false) && UserUtil.checkTwoPwd(newPwd, againPwd, 16, 6, this.pwdErrorLabel))
        {
            AccountManager.PhoneModifyPassword(this.verificationCodeLabel.text.trim(), this.telephoneLabel.text.trim(), this.newPwdLabel.text.trim());
        }
    }
    /**
     * 手机修改密码成功
    */
    private phoneFindPwdSuccess()
    {
        // UIManager.showPanel(UIModuleName.LoginTelPanel);
        // this.onCloseBtnClickHandler(null);
        this.onCloseBtnClickHandler(null);
    }
    /**
     * 密码输入框失去焦点
    */
    private onPwdLabelFouceOut()
    {
        let newPwd = this.newPwdLabel.text.trim();
        let againPwd = this.confirmPwdLabel.text.trim();
        if (UserUtil.checkTwoPwd(newPwd, againPwd, 16, 6, this.pwdErrorLabel))
        {
            this.pwdErrorLabel.text = "";
        }
    }
    /**
     * 验证验证码
    */
    protected codeValidate(isShowAlert: boolean = false)
    {
        let code: string = this.verificationCodeLabel.text.trim();
        if (code && code.length == 6)
        {
            this.phoneErrorLabel.text = "";
            return true;
        } else
        {
            if (isShowAlert)
            {
                this.phoneErrorLabel.text = "您输入的验证码错误，请重新输入！";
            }
            return false;
        }
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }
}