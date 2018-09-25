/**
 * 绑定账号面板
 */
class BindAccountPanel extends BasePanel
{
    /**
     * 绑定手机
    */
    public bindPhoneBtn: eui.Button;
    public phoneImg: eui.Image;
    public phoneNumLabel: eui.Label;
    /**
     * 绑定微信
    */
    public wxGroup: eui.Group;
    public bindWXBtn: eui.Button;
    public wxImg: eui.Image;
    public wxNameLabel: eui.Label;
    /**
     * 用户信息
    */
    public userHeadCom: CircleHeadComponent;
    public nameLabel: eui.Label;
    public idLabel: eui.Label;

    public constructor()
    {
        super();
        this.isTween = true;
        this.setSkinName(UIModuleName.BindAccountPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this.wxImg.visible = this.bindWXBtn.visible = this.bindPhoneBtn.visible = this.phoneImg.visible = false;
    }
    public init(appendData: any)
    {
        super.init(appendData);

        this.userHeadCom.init(UserManager.userInfo, 110);
        this.nameLabel.text = UserManager.userInfo.name;
        this.idLabel.text = UserManager.userInfo.id.toString();
        VersionManager.setComponentVisibleBySafe(this.wxGroup);

        BindAccountManager.reqGetList();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        BindAccountManager.bindListEvent.addListener(this.bindListHandler, this);
        BindAccountManager.bindSuccessEvent.addListener(this.bindSuccessHandler, this);
        this.bindPhoneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bindPhoneHandler, this);
        this.bindWXBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bindWXHandler, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        BindAccountManager.bindListEvent.removeListener(this.bindListHandler, this);
        BindAccountManager.bindSuccessEvent.removeListener(this.bindSuccessHandler, this);
        this.bindPhoneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bindPhoneHandler, this);
        this.bindWXBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bindWXHandler, this);
    }
    private bindListHandler()
    {
        this.refreshQinBindState();
        this.refreshWxBindState();
    }
    private refreshQinBindState()
    {
        //手机账号绑定
        if (BindAccountManager.getIsBinding(ChannelLoginType.GiantFun) || ChannelManager.loginType == ChannelLoginType.GiantFun)  //判断用户是否绑定了手机
        {
            this.bindPhoneBtn.visible = false;
            this.phoneImg.visible = true;
            this.phoneNumLabel.text = "已绑定";
            // this.phoneNumLabel.text = this.phoneNumFormat(4, 9, UserManager.userInfo.mno);
        }
        else
        {
            this.bindPhoneBtn.visible = true;
            this.phoneImg.visible = false;
            this.phoneNumLabel.text = "未绑定";
        }
    }
    private refreshWxBindState()
    {
        //微信绑定
        if (BindAccountManager.getIsBinding(ChannelLoginType.Weixin) || ChannelManager.loginType == ChannelLoginType.Weixin) 
        {
            this.bindWXBtn.visible = false;
            this.wxImg.visible = true;
            this.wxNameLabel.text = "已绑定";
        }
        else
        {
            if (game.System.isWeChat)
            {
                this.bindWXBtn.enabled = true;
            }
            else if (game.System.isWeb)
            {
                this.bindWXBtn.enabled = false;
            }
            else
            {
                this.bindWXBtn.enabled = true;
            }
            this.bindWXBtn.visible = true;
            this.wxImg.visible = false;
            this.wxNameLabel.text = "未绑定";
        }

    }
    /**
     * 绑定成功处理
     */
    private bindSuccessHandler(data: any)
    {
        switch (data)
        {
            case ChannelLoginType.GiantFun:
                this.refreshQinBindState();
                break;
            case ChannelLoginType.Weixin:
                this.refreshWxBindState();
                break;
        }
    }
	/**
	 * 点击绑定手机
	*/
    private bindPhoneHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (!BindAccountManager.getIsBinding(ChannelLoginType.GiantFun))
        {
            BindAccountManager.startBindQin(UIModuleName.BindAccountPanel);
        }
    }
	/**
	 * 点击绑定微信
	*/
    private bindWXHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (!BindAccountManager.getIsBinding(ChannelLoginType.Weixin))
        {
            BindAccountManager.tryBindWx();
        }
    }
}