/**
 * 编辑资料面板 
 */
class EditUserInfoPanel extends BasePanel
{
    public userHeadComp: CircleHeadComponent;//头像组件
    public addheadlabel: eui.Label;//添加头像
    public verifyLabel: eui.Label; //审核中状态
    public sexMaleButton: eui.RadioButton;//男性选项
    public sexFemaleButton: eui.RadioButton;//女性选项
    public sexUnkonwnButton: eui.RadioButton;//保密选项
    public sexButtonGroup: eui.RadioButtonGroup;//性别选项组
    public sexGroup: eui.Group;//性别显示组
    public sexLabel: eui.Label;//性别
    public ageLabel: eui.EditableText;//年龄
    public showSexSelect: eui.Image;
    public headMask: eui.Image;//遮罩

    private _headInfo: SimpleHeadInfo;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.EditUserInfoPanel);
    }
    /**
 * 皮肤文件加载完成时调用，仅面板初始化调用一次
 * */
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this.sexButtonGroup = new eui.RadioButtonGroup();
        this.sexMaleButton.group = this.sexButtonGroup;
        this.sexMaleButton.value = Sex.Male;
        this.sexFemaleButton.group = this.sexButtonGroup;
        this.sexFemaleButton.value = Sex.Female;
        this.sexUnkonwnButton.group = this.sexButtonGroup;
        this.sexUnkonwnButton.value = Sex.Unknown;
        this._headInfo = new SimpleHeadInfo();
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.sexButtonGroup.selectedValue = UserManager.userInfo.sex;
        this.ageLabel.inputType = egret.TextFieldInputType.TEL;
        this.ageLabel.restrict = "0-9";
        this.ageLabel.maxChars = 2;
    }

    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.refreshInfo();
    }

    private refreshInfo()
    {
        this.refreshHead();
        this.ageLabel.text = UserManager.userInfo.age.toString();
        this.sexLabel.text = this.sexButtonGroup.getRadioButtonAt(UserManager.userInfo.sex).label;
    }


    private refreshHead()
    {
        if (game.StringUtil.isNullOrEmpty(UserManager.userInfo.verifyHead))
        {
            this._headInfo.head = UserManager.userInfo.head;
        }
        else
        {
            this._headInfo.head = UserManager.userInfo.verifyHead;
        }
        this._headInfo.sex = UserManager.userInfo.sex;
        this.userHeadComp.init(this._headInfo);
        this.addheadlabel.visible = false;
        this.verifyLabel.visible = false;
        this.userHeadComp.touchEnabled = true;
        if (UserManager.userInfo.isHeadVerify)
        {
            this.headMask.visible = true;
            this.verifyLabel.text = "审核中";
            this.verifyLabel.visible = true;
            this.userHeadComp.touchEnabled = false;
        }
        else if (UserManager.userInfo.isHeadUnPass)
        {
            this.headMask.visible = true;
            this.verifyLabel.text = "未通过";
            this.verifyLabel.visible = true;
        }
        else
        {
            this.headMask.visible = false;
            this.addheadlabel.visible = false;
        }
    }

    private reqSaveEdit()
    {
        let userDes: string = null;
        let userSex: number = undefined;
        let userAge: number = undefined;
        if (this.sexButtonGroup.selectedValue != UserManager.userInfo.sex)
        {
            userSex = this.sexButtonGroup.selectedValue;
        }
        if (this.ageLabel.text != game.StringConstants.Empty && parseInt(this.ageLabel.text) != UserManager.userInfo.age)
        {
            userAge = parseInt(this.ageLabel.text);
        }
        UserManager.reqSetUserInfo(userDes, userSex, userAge);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.sexButtonGroup.addEventListener(egret.Event.CHANGE, this.changeActive, this);
        UploadHeadManager.OnUploadHeadUpdate.addListener(this.refreshHead, this); //需要审核通过才能变更头像
        UserManager.headImageUpdateEvent.addListener(this.refreshHead, this);
    }

    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.sexButtonGroup.removeEventListener(egret.Event.CHANGE, this.changeActive, this);
        //UserHeadManager.clear();
        UserManager.headImageUpdateEvent.removeListener(this.refreshHead, this);
        UploadHeadManager.OnUploadHeadUpdate.removeListener(this.refreshHead, this);
        UploadHeadManager.clear();
    }

    /**
	 * 点击面板按钮事件处理
	*/
    private clickHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (this.sexGroup.visible)
        {
            this.sexGroup.visible = false;
        }
        switch (event.target)
        {
            case this.closeButton:
                this.reqSaveEdit();
                break;
            case this.sexLabel:
            case this.showSexSelect:
                this.sexGroup.visible = true;
                break;
            case this.userHeadComp:
                UploadHeadManager.selectHead();
                break;
        }
    }

	/**
	 * 改变选项卡按钮状态
	*/
    private changeActive(event: eui.UIEvent)
    {
        this.sexLabel.text = this.sexButtonGroup.selection.label;
    }
}
/**
 * 简单头像信息
 */
class SimpleHeadInfo implements IBaseHead
{
    head: string;
    sex: Sex;
}