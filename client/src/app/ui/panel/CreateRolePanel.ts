/**
 * 创建角色
*/
class CreateRolePanel extends BasePanel
{
    /**
     * 性别按钮
    */
    private manRadioBtn: eui.RadioButton;
    private womanRadioBtn: eui.RadioButton;
    /**
     * 性别
    */
    private sex: number;
    /**
     * 昵称
    */
    private nickNameLable: eui.Label;
    /**
     * 随机生成昵称按钮
    */
    private randomBtn: eui.Button;
    /**
     * 进入游戏按钮
    */
    private enterBtn: eui.Button;

    private radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
    public dealerImg:eui.Image;

    public constructor()
    {
        super();
        this.layer = UILayerType.Tips;
        this.setSkinName(UIModuleName.CreateRolePanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this.nickNameLable.type = egret.TextFieldType.INPUT;
        this.manRadioBtn.label = "男";
        this.manRadioBtn.value = Sex.Male;
        this.manRadioBtn.selected = true;
        this.sex = this.manRadioBtn.value;
        this.manRadioBtn.group = this.radioGroup;
        this.womanRadioBtn.label = "女";
        this.womanRadioBtn.value = Sex.Female;
        this.womanRadioBtn.group = this.radioGroup;
        this.dealerImg.source = BundleManager.getResNameByBundle(ResFixedFileName.Dealer_Png);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        if (ChannelManager.loginType == ChannelLoginType.Weixin && LoginManager.loginInfo.channeldata)
        {
            if (LoginManager.loginInfo.channeldata.hasOwnProperty("head"))
            {
                let head: string = LoginManager.loginInfo.channeldata["head"];
                if (head) //微信登录上传微信头像
                {
                    UserManager.tryUpLoadWxHead(head)
                }
            }
            if (LoginManager.loginInfo.channeldata.hasOwnProperty("sex"))
            {
                this.radioGroup.selectedValue = this.sex = parseInt(LoginManager.loginInfo.channeldata["sex"]);
            }
            if (LoginManager.loginInfo.channeldata.hasOwnProperty("name"))
            {
                this.nickNameLable.text = LoginManager.loginInfo.channeldata["name"];
            }
            if (qin.StringUtil.isNullOrEmpty(this.nickNameLable.text))
            {
                this.nickNameLable.text = NameDefined.GetInstance().getRandomNickName(this.sex);
            }
        }
        else
        {
            this.nickNameLable.text = NameDefined.GetInstance().getRandomNickName(this.sex);
        }
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.radioGroup.addEventListener(eui.UIEvent.CHANGE, this.sexRadioChangeHandler, this);
        this.manRadioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.womanRadioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.randomNameHandler, this);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
        UserManager.onCreateRoleEvent.addListener(this.onCreateRoleHandler, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.radioGroup.removeEventListener(eui.UIEvent.CHANGE, this.sexRadioChangeHandler, this);
        this.manRadioBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.womanRadioBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.randomBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.randomNameHandler, this);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
        UserManager.onCreateRoleEvent.removeListener(this.onCreateRoleHandler, this);
    }
    /**
     * 更改性别触发的操作
    */
    private sexRadioChangeHandler(event: eui.UIEvent)
    {
        let radioGroup: eui.RadioButtonGroup = event.target;
        let name: string;
        this.sex = radioGroup.selectedValue;
        this.nickNameLable.text = NameDefined.GetInstance().getRandomNickName(this.sex);
    }
    /**
     * 更改性别按钮点击播放声音
    */
    private sexRadioClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
    }
    /**
     * 点击随机按钮触发的操作
    */
    private randomNameHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        this.nickNameLable.text = NameDefined.GetInstance().getRandomNickName(this.sex);
    }
    /**
     * 点击进入游戏按钮触发的操作
    */
    private enterHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (UserUtil.isLegalNickName(this.nickNameLable.text))
        {
            //首先验证是否重名
            UserManager.reqCreateRole(this.nickNameLable.text, this.sex);
        }
    }
    private onCreateRoleHandler()
    {
        if (qin.System.isWeb)  //自动绑定邀请码
        {
            let code: string = URLOption.getString(URLOption.InviteCode);
            if (!qin.StringUtil.isNullOrEmpty(code))
            {
                InviteManager.reqBindInviteCode(code);
            }
        }
        super.onCloseBtnClickHandler(null);
    }
}