/**
 * 活动页面（只有一张图片）
 */
class SimplePicturePanel extends BaseActivityPanel
{
    public titleLabel: eui.Label;
    public activityScroller: eui.Scroller;
    public activityImg: eui.Image;
    public desLabel: eui.Label;
    public imgGroup: eui.Group;

    private _anime: PanelAnime;
    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.SimplePicturePanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.activityScroller.viewport = this.imgGroup;
    }

    public init(appendData: any)
    {
        super.init(appendData);
        this.activityScroller.viewport.scrollV = 0;
        if (InfoUtil.checkAvailable(this.activityInfo))
        {
            this.activityImg.source = this.activityInfo.definition.icon;
            this.titleLabel.text = this.activityInfo.definition.name;
        }
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this._anime.onEnable();
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this._anime.onDisable();
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }
}