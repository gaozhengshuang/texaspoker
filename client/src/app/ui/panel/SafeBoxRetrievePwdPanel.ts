/**
 * 找回保险箱密码
*/
class SafeBoxRetrievePwdPanel extends BaseRetrievePwdPanel
{
    public confirmBtn: ShadowButton;
    public newSafePwd: PwdComponent;
    public confirmSafePwd: PwdComponent;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.SafeBoxRetrievePwdPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.newSafePwd.init({ isNotMaskKeyPanel: true });
        this.confirmSafePwd.init({ isNotMaskKeyPanel: true });
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent)
    {
        super.onEnable(event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        this.newSafePwd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeY, this)
        this.confirmSafePwd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeY, this)
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        UIManager.onPanelCloseEvent.addListener(this.restoreY, this);
        this.newSafePwd.pwdInput.addListener(this.pwdInput, this);
        this.confirmSafePwd.pwdInput.addListener(this.pwdInput, this);
        SafeBoxManager.onGetCodeEvent.addListener(this.sendCodeSuccess, this);
        SafeBoxManager.onRetrievePwdEvent.addListener(this.findPwdSuccess, this);
    }
    protected onDisable(event: eui.UIEvent)
    {
        super.onDisable(event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        this.newSafePwd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeY, this)
        this.confirmSafePwd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeY, this)
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        UIManager.onPanelCloseEvent.removeListener(this.restoreY, this);
        this.newSafePwd.pwdInput.removeListener(this.pwdInput, this);
        this.confirmSafePwd.pwdInput.removeListener(this.pwdInput, this);
        SafeBoxManager.onGetCodeEvent.removeListener(this.sendCodeSuccess, this);
        SafeBoxManager.onRetrievePwdEvent.removeListener(this.findPwdSuccess, this);
        this.restoreY();
    }

    private pwdInput()
    {
        let pwd1 = this.newSafePwd.getPwd();
        let pwd2 = this.confirmSafePwd.getPwd();
        if (pwd1.length > 0 && pwd2.length > 0)
        {
            let min = Math.min(pwd1.length, pwd2.length);
            if (pwd1.substring(0, min) != pwd2.substring(0, min))
            {
                this.pwdErrorLabel.text = "*新密码两次不一致";
            }
            else
            {
                this.pwdErrorLabel.text = "";
            }
        }
    }
    /**
     * 还原y轴位置
    */
    private restoreY()
    {
        this.verticalCenter = 0;
        this.enableLabelClick();
    }
    /**
     * 输入密码框点击事件
    */
    private changeY()
    {
        this.verticalCenter = -220;
        this.disableLabelClick();
    }
    /**
     * 禁止输入框点击   （防止面板上移后，点击输入框面板复位 但是光标还在原处）
    */
    private disableLabelClick()
    {
        this.telephoneLabel.touchEnabled = false;
        this.verificationCodeLabel.touchEnabled = false;
    }
    /**
     * 打开输入框点击
    */
    private enableLabelClick()
    {
        this.telephoneLabel.touchEnabled = true;
        this.verificationCodeLabel.touchEnabled = true;
    }
    /**
     * 发送手机验证码
    */
    protected sendCodeRes()
    {
        SafeBoxManager.reqGetCode(this.telephoneLabel.text.trim());
    }
    /**
     * 确认按钮点击执行的事件
    */
    protected onConfirmClick(e: egret.TouchEvent)
    {
        super.onConfirmClick(e);
        let newPwd = this.newSafePwd.getPwd();
        let againPwd = this.confirmSafePwd.getPwd();
        if (qin.RegexUtil.isPhoneNumber(this.telephoneLabel.text) && this.codeValidate(false) && UserUtil.checkTwoPwd(newPwd, againPwd, 6, 6, this.pwdErrorLabel))
        {
            SafeBoxManager.reqRetrievePwd(newPwd, this.verificationCodeLabel.text.trim());
        }
    }
    /**
     * 找回密码成功执行的事件
    */
    private findPwdSuccess()
    {
        super.onCloseBtnClickHandler(null);
    }
    private onButtonClick(e: egret.TouchEvent)
    {
        if (e.target != this.newSafePwd && e.target != this.confirmSafePwd)
        {
            this.restoreY();
            UIManager.closePanel(UIModuleName.KeyBoardPanel);
        }
    }
}