/**
 * 找回密码基类
*/
class BaseRetrievePwdPanel extends BasePanel
{
    public telephoneLabel: eui.EditableText;
    public verificationCodeLabel: eui.EditableText;
    public sendCodeBtn: ShadowButton;
    public phoneErrorLabel: eui.Label;  //手机号错误提示
    public pwdErrorLabel: eui.Label;  //验证码错误提示
    public leftTime: number;

    public constructor()
    {
        super();
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this.telephoneLabel.inputType = egret.TextFieldInputType.TEL;
        this.telephoneLabel.restrict = "0-9";
        this.telephoneLabel.maxChars = 11;

        this.verificationCodeLabel.inputType = egret.TextFieldInputType.TEL;
        this.verificationCodeLabel.restrict = "0-9";
        this.verificationCodeLabel.maxChars = 6;
    }

    public init(appendData: any)
    {
        super.init(appendData);
        UserUtil.initCode(this.sendCodeBtn);
        this.phoneErrorLabel.text = "";
        this.pwdErrorLabel.text = "";
        this.telephoneLabel.text = "";
        this.verificationCodeLabel.text = "";
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent)
    {
        super.onEnable(event);
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClick, this);
        this.sendCodeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendCodeBtnClick, this);
        this.telephoneLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onPhoneLabelFouseOut, this);
        this.verificationCodeLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onCodeLabelFouseOut, this);
    }
    protected onDisable(event: eui.UIEvent)
    {
        super.onDisable(event);
        this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnClick, this);
        this.sendCodeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendCodeBtnClick, this);
        this.telephoneLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onPhoneLabelFouseOut, this);
        this.verificationCodeLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onCodeLabelFouseOut, this);
        UserUtil.removeCodeCountDown();
    }

    /**
     * 关闭按钮点击执行的操作
    */
    protected onCloseBtnClick(e: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(e.target);
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
    }
    /**
     * 手机号输入框失去焦点
    */
    protected onPhoneLabelFouseOut(e: egret.TouchEvent)
    {
        this.phoneErrorLabel.text = qin.RegexUtil.isPhoneNumber(this.telephoneLabel.text) ? "" : "您输入的手机号错误，请重新输入！";
    }
    /**
     * 点击发送验证码执行的操作
    */
    protected sendCodeBtnClick(e: egret.TouchEvent)
    {
        if (qin.RegexUtil.isPhoneNumber(this.telephoneLabel.text))
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
    }
    /**
     * 发送手机验证码
    */
    protected sendCodeRes()
    {

    }
    /**
     * 发送成功回调
    */
    protected sendCodeSuccess()
    {
        UserUtil.addCodeCountDown({ sendCodeBtn: this.sendCodeBtn, leftTime: this.leftTime });
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
}