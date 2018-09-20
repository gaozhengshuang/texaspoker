/**
 * 活动中心面板
 */
class ActivityPanel extends BasePanel
{
    public activityScroller: eui.Scroller;
    public activityList: eui.List;
    public resizeGroup: eui.Group;

    private _anime: PanelAnime;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ActivityPanel);
    }

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        UIManager.pushResizeGroup(this.resizeGroup);
        UIManager.pushResizeScroller(this.activityScroller, 1180);
        UIUtil.listRenderer(this.activityList, this.activityScroller, ActivityItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    }

    public init(appendData: any)
    {
        super.init(appendData);
        this.activityScroller.viewport.scrollV = 0;
        this.refreshList();
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
    private refreshList()
    {
        UIUtil.writeListInfo(this.activityList, ActivityManager.showList, "id");
    }
    protected showPrePanelName()
    {
        if (this.prevPanelName == UIModuleName.GamblingPanel)
        {
            UIManager.showPanel(this.prevPanelName, true);
        }
        else
        {
            UIManager.showPanel(this.prevPanelName);
        }
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }
}