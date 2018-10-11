/**
 * 活动列表渲染项
 */
class ActivityItemRenderer extends BaseItemRenderer<ActivityInfo>
{
    public activityIcon: eui.Image //图片
    public itemTitleLabel: eui.Label//标题
    public itemDesLabel: eui.Label//描述
    public iconGroup: eui.Group;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ActivityItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.addRedPoint();
        this.refresh();
    }

    private refresh()
    {
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.itemTitleLabel.text = this.bindData.definition.Name;
            this.itemDesLabel.text = this.bindData.definition.Des;
            this.activityIcon.source = this.bindData.definition.Icon + ResSuffixName.PNG;
        }
    }

    private addRedPoint()
    {
        if (this.bindData.definition.Type == ActivityType.BankruptSubsidy)
        {
            UIUtil.addMultiNotify(this.iconGroup, NotifyType.BankruptSubsidy, this.bindData.id, 0, 0);
        }
    }

    private onClick()
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        // ActivityManager.showPanelInActivityCenter(this.bindData);
        ActivityPanelJumpManager.JumpToPanel(this.bindData);
    }

    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}