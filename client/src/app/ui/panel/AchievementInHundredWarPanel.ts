/**
 * 战局中的任务面板
 */
class AchievementInHundredWarPanel extends BasePanel
{
    public achieveScroller: eui.Scroller;
    public achieveList: eui.List;
    public anmGroup: eui.Group;
    /**
     * 战局类型
     */
    private _playingFieldPattern: AchieveShowPattern;
    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.AchievementInHundredWarPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        UIManager.pushResizeGroup(this.anmGroup);
    }

    public init(appendData: any)
    {
        super.init(appendData);
        if (appendData)
        {
            this._playingFieldPattern = appendData;
        }
        UIUtil.listRenderer(this.achieveList, this.achieveScroller, AchieveInHundredWarItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    }

    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.achieveScroller.viewport.scrollV = 0;
        this.refreshList();
    }

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        AchievementManager.achieveChangeEvent.addListener(this.refreshList, this);
        AchievementManager.getAchievementPrizeEvent.addListener(this.refreshList, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        AchievementManager.achieveChangeEvent.removeListener(this.refreshList, this);
        AchievementManager.getAchievementPrizeEvent.removeListener(this.refreshList, this);
    }

    private refreshList()
    {
        let list: Array<AchievementInfo> = AchievementManager.getShowAchieveListByPlayType(this._playingFieldPattern);
        UIUtil.writeListInfo(this.achieveList, list, "id", false, SortUtil.showAchieveListSort);
    }
}