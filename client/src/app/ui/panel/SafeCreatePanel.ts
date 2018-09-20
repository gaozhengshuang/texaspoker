/**
 * 保险箱密码创建面板
 */
class SafeCreatePanel extends BasePanel
{

    public tipPwd: eui.Label;// 密码提示
    public createPwdBtn: eui.Button;
    public pwdGroup: eui.Group;
    private pwdFrist: PwdComponent;
    private pwdSecond: PwdComponent;
    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.SafeCreatePanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.setTips("");
        this.pwdFrist = new PwdComponent(UIComponentSkinName.PwdComponent);
        this.pwdGroup.addChild(this.pwdFrist);
        this.pwdSecond = new PwdComponent(UIComponentSkinName.PwdComponent);
        this.pwdGroup.addChild(this.pwdSecond);
        this.maskAlpha = 0;
    }
    public init(appendData: any)
    {
        super.init(appendData);
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.pwdFrist.init({ isNotMaskKeyPanel: true, isSelect: true });
        this.pwdSecond.init({ isNotMaskKeyPanel: true });
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPanel, this)
        this.createPwdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createPwdHandle, this);
        this.pwdFrist.pwdInput.addListener(this.pwdInput, this);
        this.pwdSecond.pwdInput.addListener(this.pwdInput, this);
        SafeBoxManager.pwdSuccessEvent.addListener(this.pwdSuccessEvent, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPanel, this)
        this.createPwdBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.createPwdHandle, this);
        this.pwdFrist.pwdInput.removeListener(this.pwdInput, this);
        this.pwdSecond.pwdInput.removeListener(this.pwdInput, this);
        SafeBoxManager.pwdSuccessEvent.removeListener(this.pwdSuccessEvent, this);
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
    }
    private onClickPanel(event: eui.UIEvent)
    {
        if (!this.pwdFrist.isTarget(event.target) && !this.pwdSecond.isTarget(event.target))
        {
            UIManager.closePanel(UIModuleName.KeyBoardPanel);
        }
    }
    private pwdSuccessEvent()
    {
        if (UserManager.userInfo.isSafePwd)
        {
            JumpUtil.JumpToSafeBox(UIModuleName.SafeCreatePanel);
            this.onCloseBtnClickHandler(null);
        }
    }
    private pwdInput()
    {
        let pwd1 = this.pwdFrist.getPwd();
        let pwd2 = this.pwdSecond.getPwd();
        if (pwd1.length > 0 && pwd2.length > 0)
        {
            let min = Math.min(pwd1.length, pwd2.length);
            if (pwd1.substring(0, min) != pwd2.substring(0, min))
            {
                this.setTips("*两次密码不一致");
            }
            else
            {
                this.setTips("");
            }
        }
    }
    /*
	* 创建密码操作
	*/
    private createPwdHandle()
    {
        let pwd1 = this.pwdFrist.getPwd();
        let pwd2 = this.pwdSecond.getPwd();
        if (pwd1.length == 0 || pwd2.length == 0)
        {
            this.setTips("*密码不能为空")
        }
        else if (pwd1.length < 6)
        {
            this.setTips("*密码长度为6位")
        }
        else if (pwd1 == pwd2)
        {
            SafeBoxManager.reqCreatePwd(pwd1);
        }
        else
        {
            this.setTips("*两次密码不一致");
        }
    }
    /**
	  * 设置提示
	 */
    private setTips(tipName: string)
    {
        this.tipPwd.text = tipName;
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
        super.onCloseBtnClickHandler(event);
    }
}