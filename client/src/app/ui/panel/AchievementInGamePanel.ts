/**
 * 战局中的任务面板
 */
class AchievementInGamePanel extends BasePanel
{
    public achieveScroller: eui.Scroller;
    public achieveList: eui.List;
    public goldLabel: eui.Label;
    public anmGroup: eui.Group;
    /**
     * 战局类型
     */
    private _playingFieldPattern: AchieveShowPattern;
    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.AchievementInGamePanel);
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
        UIUtil.listRenderer(this.achieveList, this.achieveScroller, AchieveInGameItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    }

    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.achieveScroller.viewport.scrollV = 0;
        this.refreshGold();
        this.refreshList();
    }

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        AchievementManager.achieveChangeEvent.addListener(this.refreshList, this);
        UserManager.propertyChangeEvent.addListener(this.refreshGold, this);
        AchievementManager.getAchievementPrizeEvent.addListener(this.tryClosePanel, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        AchievementManager.achieveChangeEvent.removeListener(this.refreshList, this);
        UserManager.propertyChangeEvent.removeListener(this.refreshGold, this);
        AchievementManager.getAchievementPrizeEvent.removeListener(this.tryClosePanel, this);
    }

    private refreshGold()
    {
        this.goldLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
    }

    private refreshList()
    {
        let list: Array<AchievementInfo> = AchievementManager.getShowAchieveListByPlayType(this._playingFieldPattern);
        UIUtil.writeListInfo(this.achieveList, list, "id", false, SortUtil.showAchieveListSort);
    }
    private tryClosePanel()
    {
        if (AchievementManager.isHaveNoTakeByPlayType(this._playingFieldPattern))
        {
            this.refreshList();
        }
        else
        {
            super.onCloseBtnClickHandler(null);
        }
    }
}