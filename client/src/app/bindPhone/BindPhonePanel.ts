/**
 * 绑定手机面板
 */
class BindPhonePanel extends BasePanel
{
    /**
     * 手机号
    */
    public phoneLabel: eui.Label;
    /**
     * 验证码
    */
    public codeLabel: eui.Label;
    public sendCodeBtn: eui.Button;
    /**
     * 下一步
    */
    public confirmBtn: eui.Button;
    /**
     * 格式验证错误提醒
    */
    public telErrorLabel: eui.Label;

    public leftTime: number;

    public constructor()
    {
        super();
        this.isTween = true;
        this.setSkinName(UIModuleName.BindPhonePanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.phoneLabel.type = egret.TextFieldType.INPUT;
        this.phoneLabel.inputType = egret.TextFieldInputType.TEL;
        this.phoneLabel.restrict = "0-9";
        this.phoneLabel.maxChars = 11;
        this.codeLabel.type = egret.TextFieldType.INPUT;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.reset();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.sendCodeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sencCodeClickHandler, this);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandler, this);
        this.phoneLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.phoneValidate, this);
        this.codeLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.codeValidate, this);
        BindPhoneManager.onGetCodeEvent.addListener(this.sendCodeSuccess, this);
        BindPhoneManager.onBindPhoneEvent.addListener(this.bindSuccess, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.sendCodeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sencCodeClickHandler, this);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandler, this);
        this.phoneLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.phoneValidate, this);
        this.codeLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.codeValidate, this);
        BindPhoneManager.onGetCodeEvent.removeListener(this.sendCodeSuccess, this);
        BindPhoneManager.onBindPhoneEvent.removeListener(this.bindSuccess, this);
        UserUtil.removeCodeCountDown();
    }

    /**
     * 重置
    */
    private reset()
    {
        this.clearTelError();
        this.phoneLabel.text = "";
        this.codeLabel.text = "";
        UserUtil.initCode(this.sendCodeBtn);
    }
    /**
     * 手机错误提示清空
    */
    private clearTelError()
    {
        this.telErrorLabel.text = "";
    }
    /**
     * 发送验证码
    */
    private sencCodeClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (this.phoneValidate())
        {
            BindPhoneManager.reqGetCode(this.phoneLabel.text.trim());
        }
    }
    /**
     * 发送成功回调
    */
    private sendCodeSuccess()
    {
        UserUtil.addCodeCountDown({ sendCodeBtn: this.sendCodeBtn, leftTime: this.leftTime });
    }
	/**
	 * 点击下一步
	*/
    private confirmHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (this.phoneValidate() && this.codeValidate())
        {
            BindPhoneManager.reqBindPhone(this.phoneLabel.text.trim(), this.codeLabel.text.trim());
        }
    }
    /**
     * 绑定手机验证成功回调
    */
    private bindSuccess()
    {
        if (this.panelData && this.panelData.isShowCreatePwd)
        {
            UIManager.showPanel(UIModuleName.SafeCreatePanel);
        }
        UserManager.userInfo.mno = this.phoneLabel.text.trim();
        this.onCloseBtnClickHandler(null);
    }

    /**
     * 客户端验证
    */
    private phoneValidate(): boolean  //手机号（账号）
    {
        let account: string = this.phoneLabel.text.trim();
        if (!account)
        {
            this.telErrorLabel.text = "*手机号不能为空";
            return false;
        }
        if (game.RegexUtil.isPhoneNumber(account))
        {
            this.clearTelError();
            return true;
        } else
        {
            this.telErrorLabel.text = "*手机号格式不正确";
            return false;
        }
    }
    private codeValidate()  //验证码
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
}