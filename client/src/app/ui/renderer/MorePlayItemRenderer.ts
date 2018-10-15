/**
 * 更多玩法列表渲染项
 */
class MorePlayItemRenderer extends BaseItemRenderer<table.IMorePlayDefine>
{
    public morePlayIcon: eui.Image //图片
    public itemTitleLabel: eui.Label//标题
    public itemDesLabel: eui.Label//描述
    public playWayBtn: eui.Button;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.MorePlayItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refresh();
    }

    private refresh()
    {
        if (this.bindData)
        {
            this.itemTitleLabel.text = this.bindData.Name;
            this.itemDesLabel.text = this.bindData.Des;
            this.morePlayIcon.source = this.bindData.Icon + ResSuffixName.PNG;
            this.playWayBtn.visible = this.bindData.DesId != undefined;
        }
    }

    private onClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (event.target == this.playWayBtn)
        {
            UIManager.showPanel(UIModuleName.TextInfoPanel, this.bindData.DesId);
        }
        else
        {
            if (this.bindData.Id == MorePlay.Omaha)
            {
                UIManager.showPanel(UIModuleName.PlayingFieldPanel, { playWay: PlayWayType.Omaha, prevPanelName: UIModuleName.MorePlayPanel });
            }
        }
    }

    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}