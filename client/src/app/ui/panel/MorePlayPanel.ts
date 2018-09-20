/**
 * 更多玩法中心面板
 */
class MorePlayPanel extends BasePanel
{
    public morePlayScroller: eui.Scroller;
    public morePlayList: eui.List;

    private _anime: PanelAnime;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.MorePlayPanel);
    }

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        UIManager.pushResizeScroller(this.morePlayScroller, 1180);
        UIUtil.listRenderer(this.morePlayList, this.morePlayScroller, MorePlayItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    }

    public init(appendData: any)
    {
        super.init(appendData);
        this.morePlayScroller.viewport.scrollV = 0;
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
        let list = MorePlayDefined.GetInstance().getDefListInMorePlay();
        if (list)
        {
            UIUtil.writeListInfo(this.morePlayList, list, "id");
        }
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