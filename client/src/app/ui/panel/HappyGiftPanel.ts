/**
 * 模板面板
 */
class HappyGiftPanel extends BaseActivityPanel
{
    public titleLabel: eui.Label;
    public activityTab: TabComponent;

    public prizeGroup: eui.Group;
    public rankGroup: eui.Group;
    public useGroup: eui.Group;
    public helpGroup: eui.Group;

    public leftTimeLabel: eui.Label;
    public ticketNumLabel: eui.Label;

    public prizeScroller: eui.Scroller;
    public prizeList: eui.List;

    public rankTab: TabComponent;
    public rankScrollerGroup: eui.Group;
    public rankScroller: eui.Scroller;
    public rankList: eui.List;

    public noUseLabel: eui.Label;
    public useScroller: eui.Scroller;
    public useList: eui.List;

    public helpLabel: eui.Label;
    public helpTitleLabel: eui.Label;
    public helpScroller: eui.Scroller;
    public helpTextGroup: eui.Group;

    private _anime: PanelAnime;

    private _currentRankListInfo: RankListInfo;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.HappyGiftPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.activityTab.build(TabComponent.CreatData(["礼品", "排行榜", "使用记录", "活动帮助"], [this.prizeGroup, this.rankGroup, this.useGroup, this.helpGroup], TabButtonType.HappyGiftOf4));
        this.rankTab.build(TabComponent.CreatData(["总排行", "好友排行"], [this.rankScrollerGroup, this.rankScrollerGroup], TabButtonType.HappyGiftOf2));
        UIUtil.listRenderer(this.prizeList, this.prizeScroller, HappyGiftItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.rankList, this.rankScroller, HappyGiftRankRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.useList, this.useScroller, HappyGiftUseRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.setLabel(this.helpTitleLabel, this.helpLabel, TextFixedId.HappyGiftHelp);
        this.helpScroller.viewport = this.helpTextGroup;
        UIManager.pushResizeScroller(this.prizeScroller, 700);
        UIManager.pushResizeScroller(this.rankScroller, 580);
        UIManager.pushResizeScroller(this.useScroller, 640);
        UIManager.pushResizeScroller(this.helpScroller, 640);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.activityTab.init(0);
        this.rankTab.init(0);
        ActivityManager.reqActivityInfo(this.activityInfo.id);
    }

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this._anime.onEnable();
        this.activityTab.tabChangeEvent.addListener(this.onActTabTap, this);
        this.rankTab.tabChangeEvent.addListener(this.onRankTabTap, this);
        RankManager.getRankListEvent.addListener(this.refreshRank, this);
        ActivityManager.onReqSingleActivityEvent.addListener(this.onEventRefresh, this);
        ActivityManager.happyGiftHandler.takePrizeCompleteEvent.addListener(this.refreshUI, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this._anime.onDisable();
        this.activityTab.tabChangeEvent.removeListener(this.onActTabTap, this);
        this.rankTab.tabChangeEvent.removeListener(this.onRankTabTap, this);
        RankManager.getRankListEvent.removeListener(this.refreshRank, this);
        ActivityManager.onReqSingleActivityEvent.removeListener(this.onEventRefresh, this);
        ActivityManager.happyGiftHandler.takePrizeCompleteEvent.removeListener(this.refreshUI, this);
    }
    /**
     * 拉取事件后刷新
     */
    private onEventRefresh(id: number)
    {
        if (InfoUtil.checkAvailable(this.activityInfo) && id == this.activityInfo.id)
        {
            this.refreshUI();
        }
    }

    private refreshUI()
    {
        this.titleLabel.text = this.activityInfo.definition.Name;
        this.ticketNumLabel.text = "您的欢乐券：" + game.MathUtil.numAddSpace(this.activityInfo.step);
        if (ActivityUtil.isInJoinTime(this.activityInfo))
        {
            let startTime: number = Math.round(this.activityInfo.startDateTime.getTime() / 1000);
            let endTime: number = Math.round(this.activityInfo.endDateTime.getTime() / 1000);
            let leftTime: number;
            // if (this.activityInfo.definition.JoinTime)  //move todo
            // {
            //     leftTime = startTime + this.activityInfo.definition.JoinTime - TimeManager.GetServerUtcTimestamp();
            // }
            // else
            // {
            //     leftTime = endTime - TimeManager.GetServerUtcTimestamp();
            // }
            game.DateTimeUtil.GetLefttimeText(leftTime, false, false);
            this.leftTimeLabel.text = "距离结束还有：" + game.DateTimeUtil.GetLefttimeText(leftTime);
        }
        else
        {
            this.leftTimeLabel.text = "活动已结束";
        }
        UIUtil.writeListInfo(this.prizeList, this.activityInfo.subList, "subId", false);
    }

    private setLabel(title: eui.Label, text: eui.Label, id: TextFixedId)
    {
        let def: table.ITextDefine = table.TextById[id];
        if (def)
        {
            if (def.IsRichTxt)
            {
                text.textFlow = game.TextUtil.parse(def.Text);
                title.textFlow = game.TextUtil.parse(def.Title);
            }
            else
            {
                text.text = def.Text;
                title.text = def.Title;
            }
        }
    }

    private onActTabTap(index: number)
    {
        this.resetScrollV(index);
        if (index == 1)
        {
            this.rankTab.setSelectIndex(0);
            this._currentRankListInfo = RankManager.getRankListInfo(RankType.Activity, this.activityInfo.id, HappyGiftRankSubType.All);
            if (RankManager.isRefreshRank(this._currentRankListInfo))
            {
                RankManager.reqRankList(RankType.Activity, 1, this.activityInfo.id, HappyGiftRankSubType.All);
            }
            else
            {
                this.refreshRank();
            }
        }
        else if (index == 2)
        {
            let list: HappyGiftItemInfo[] = ActivityManager.happyGiftHandler.getHaveTakenPrizeList(this.activityInfo.id);
            if (list.length > 0)
            {
                UIUtil.writeListInfo(this.useList, ActivityManager.happyGiftHandler.getHaveTakenPrizeList(this.activityInfo.id), "subId");
                this.noUseLabel.visible = false;
            }
            else
            {
                this.noUseLabel.visible = true;
            }
        }
    }
    public onRankTabTap(index: number)
    {
        this.rankScroller.stopAnimation();
        this.rankScroller.viewport.scrollV = 0;
        if (index == 0)
        {
            this._currentRankListInfo = RankManager.getRankListInfo(RankType.Activity, this.activityInfo.id, HappyGiftRankSubType.All);
            if (RankManager.isRefreshRank(this._currentRankListInfo))
            {
                RankManager.reqRankList(RankType.Activity, 1, this.activityInfo.id, HappyGiftRankSubType.All);
            }
            else
            {
                this.refreshRank();
            }
        }
        else if (index == 1)
        {
            this._currentRankListInfo = RankManager.getRankListInfo(RankType.Activity, this.activityInfo.id, HappyGiftRankSubType.Friend);
            if (RankManager.isRefreshRank(this._currentRankListInfo))
            {
                RankManager.reqRankList(RankType.Activity, 1, this.activityInfo.id, HappyGiftRankSubType.Friend);
            }
            else
            {
                this.refreshRank();
            }
        }
    }
    private refreshRank()
    {
        UIUtil.writeListInfo(this.rankList, this._currentRankListInfo.list, "roleId", true);
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }

    private resetScrollV(index: number)
    {
        switch (index)
        {
            case 0:
                this.prizeScroller.stopAnimation();
                this.prizeScroller.viewport.scrollV = 0;
                break;
            case 1:
                this.rankScroller.stopAnimation();
                this.rankScroller.viewport.scrollV = 0;
                break;
            case 2:
                this.useScroller.stopAnimation();
                this.useScroller.viewport.scrollV = 0;
                break;
            case 3:
                this.helpScroller.stopAnimation();
                this.helpScroller.viewport.scrollV = 0;
                break;
        }
    }
}