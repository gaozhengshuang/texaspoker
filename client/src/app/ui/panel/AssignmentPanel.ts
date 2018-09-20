/**
 * 任务面板
 */
class AssignmentPanel extends BasePanel
{
    public assignmentTab: TabComponent;
    public achieveGroup: eui.Group;
    public achieveScroller: eui.Scroller;
    public achieveList: eui.List;

    private _anime: PanelAnime;
    public constructor()
    {
        super();
   		this.setSkinName(UIModuleName.AssignmentPanel);
 }

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.prevPanelName = UIModuleName.GameHallPanel;
        this.assignmentTab.build(TabComponent.CreatData(["每日任务", "每周任务", "成长任务"], [this.achieveGroup, this.achieveGroup, this.achieveGroup], TabButtonType.BigOf3));
        UIUtil.listRenderer(this.achieveList, this.achieveScroller, AssignmentItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        egret.callLater(this.addRedPoint, this);
        UIManager.pushResizeScroller(this.achieveScroller, 1020);
    }

    private addRedPoint()
    {
        let btn: eui.RadioButton = this.assignmentTab.getBtnByLabel("每日任务");
        UIUtil.addSingleNotify(btn, NotifyType.Achieve_HaveDaily, 8, 38);
        btn = this.assignmentTab.getBtnByLabel("每周任务");
        UIUtil.addSingleNotify(btn, NotifyType.Achieve_HaveWeekly, 8, 38);
        btn = this.assignmentTab.getBtnByLabel("成长任务");
        UIUtil.addSingleNotify(btn, NotifyType.Achieve_HaveGrowUp, 8, 38);
    }

    public init(appendData: any)
    {
        super.init(appendData);
        this.assignmentTab.init(0);
        this.achieveScroller.viewport.scrollV = 0;
        this.refreshList();
    }

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this._anime.onEnable();
        this.assignmentTab.tabChangeEvent.addListener(this.onBarItemTap, this);
        AchievementManager.achieveChangeEvent.addListener(this.refreshList, this);
        AchievementManager.getAchievementPrizeEvent.addListener(this.refreshList, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this._anime.onDisable();
        this.assignmentTab.tabChangeEvent.removeListener(this.onBarItemTap, this);
        AchievementManager.achieveChangeEvent.removeListener(this.refreshList, this);
        AchievementManager.getAchievementPrizeEvent.removeListener(this.refreshList, this);
    }
    private refreshList()
    {
        let list: Array<AchievementInfo> = AchievementManager.getShowAchieveListByType(this.assignmentTab.lastIndex + 1);
        UIUtil.writeListInfo(this.achieveList, list, "id", true, SortUtil.showAchieveListSort);
    }
    private onBarItemTap(index: number)
    {
        this.refreshList();
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }
}