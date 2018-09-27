/**
 *  活动页面（具有图文内容的活动）
 */
class NormalActivityPanel extends BaseActivityPanel
{
    public titleLabel: eui.Label;
    public activityImg: eui.Image;
    public desLabel: eui.Label;
    public activityScroller: eui.Scroller;
    public activityList: eui.List;

    private _anime: PanelAnime;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.NormalActivityPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        UIUtil.listRenderer(this.activityList, this.activityScroller, ActivityAwardItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    }

    public init(appendData: any)
    {
        super.init(appendData);
        if (InfoUtil.checkAvailable(this.activityInfo))
        {
            //this.activityImg.source = this.info.definition.imgId
            this.titleLabel.text = this.activityInfo.definition.Name;
            // this.desLabel.text = this.info.definition.des2;
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