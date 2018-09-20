/**
 * 修改昵称面板 
 */
class ChangeUserNamePanel extends BasePanel
{
    public nameTextLabel: eui.EditableText;//输入框
    public randomBtn: eui.Button;//随机按钮
    public changeNameBtn: eui.Button;//修改

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ChangeUserNamePanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.nameTextLabel.text = UserManager.userInfo.name;
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        UserManager.onCreateRoleEvent.addListener(this.onChangeComplete, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        UserManager.onCreateRoleEvent.removeListener(this.onChangeComplete, this);
    }
    /**
	 * 点击面板按钮事件处理
	*/
    private clickHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (event.target == this.randomBtn)
        {
            this.nameTextLabel.text = NameDefined.GetInstance().getRandomNickName(UserManager.userInfo.sex);
        }
        else if (event.target == this.changeNameBtn)
        {
            if (this.nameTextLabel.text == UserManager.userInfo.name)
            {
                UIManager.showFloatTips("请输入一个新的昵称");
                return;
            }
            if (UserUtil.isLegalNickName(this.nameTextLabel.text))
            {
                UserManager.editUserName(this.nameTextLabel.text);
            }
        }
    }
    private onChangeComplete()
    {
        this.tweenClose();
        UIManager.showFloatTips("修改成功");
    }
}