/**
 * 我的奖品订单确定面板
 */
class PrizeOrderSurePanel extends BasePanel
{
    /**
     * 道具名字
    */
    public awardNameLabel: eui.Label;
    /**
     * 收件人
    */
    public nameLabel: eui.Label;
    /**
     * 手机号
    */
    public telLabel: eui.Label;
    /**
     * qq号
    */
    public qqLabel: eui.Label;
    /**
     * 详细地址
    */
    public addressLabel: eui.Label;
    /**
     * 兑换按钮
    */
    public confirmBtn: eui.Button;
    /**
     * 收件人group
    */
    public nameGroup: eui.Group;
    /**
     * 详细地址group
    */
    public addressGroup: eui.Group;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.PrizeOrderSurePanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
    }
    public init(appendData: any)
    {
        super.init(appendData);
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.nameGroup.visible = this.addressGroup.visible = false;
        if (this.panelData.type == PrizeEffectType.Kind)
        {
            this.nameGroup.visible = this.addressGroup.visible = true;
            this.nameLabel.text = UserManager.userInfo.addressName;
            this.awardNameLabel.text = this.panelData.awardName;
            this.telLabel.text = UserManager.userInfo.phoneNum;
            this.addressLabel.text = UserManager.userInfo.address;
        } else
        {
            this.awardNameLabel.text = this.panelData.awardName;
            this.telLabel.text = UserManager.userInfo.phoneNum;
            this.qqLabel.text = UserManager.userInfo.qqNum;
        }
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
    }
    /**
     * 确定兑换
    */
    private confirmBtnClick(event: TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        PrizeManager.reqGetAward(this.panelData.id);
    }
}