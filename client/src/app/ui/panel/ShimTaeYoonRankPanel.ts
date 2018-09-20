/**
 * 德州转转转排行榜面板
 */
class ShimTaeYoonRankPanel extends BasePanel
{
    public rankTypeTab: TabComponent;
    public listTypeTab: TabComponent;
    public listTabBg: eui.Image;
    public rankList: eui.List;
    public rankScroller: eui.Scroller;
    public rankGroup: eui.Group;
    public myRankLabel: eui.Label;
    public myNameLabel: eui.Label;
    public awardLabel: eui.Label;
    public noRankLabel: eui.Label;
    public selfRankGroup: eui.Group;

    private currentRankType: ShimTaeYoonRankType;
    private currentListNum: number;
    private _bottomList: Array<number>;
    private _countDownTime: number;

    private _currentRankListInfo: RankListInfo;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ShimTaeYoonRankPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this.rankTypeTab.build(TabComponent.CreatData(["今天", "昨天"], [this.rankGroup, this.rankGroup], TabButtonType.LaBa2));
        this.rankTypeTab.isTween = false;
        this.listTypeTab.isTween = false;
        UIUtil.listRenderer(this.rankList, this.rankScroller, ShimTaeYoonRankItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    }
    public init(appendData: any)
    {
        super.init(appendData);

        if (!this._bottomList)
        {
            this._bottomList = new Array<number>();
            if (appendData)
            {
                this._bottomList = LaBaDefined.GetInstance().getBottomList(appendData.id);
            }
            let arrDes: Array<string> = new Array<string>();
            let arrGroup: Array<eui.Group> = new Array<eui.Group>();
            for (let i: number = this._bottomList.length - 1; i >= 0; i--)
            {
                arrGroup.push(this.rankGroup);
                arrDes.push(qin.MathUtil.formatNum(this._bottomList[i]));
            }
            this.listTypeTab.build(TabComponent.CreatData(arrDes, arrGroup, TabButtonType.SubOf4));
        }

        this.rankTypeTab.init(0);
        this.listTypeTab.init(0);
        this.currentRankType = ShimTaeYoonRankType.Today;
        this.currentListNum = this._bottomList[this._bottomList.length - 1];
        this.reqGetRankList();
        this._countDownTime = 300;
        qin.Tick.AddSecondsInvoke(this.countDown, this);
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.rankTypeTab.tabChangeEvent.addListener(this.onRankTypeTabTap, this);
        this.listTypeTab.tabChangeEvent.addListener(this.onListTypeTabTap, this);
        RankManager.getRankListEvent.addListener(this.getRankList, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.rankTypeTab.tabChangeEvent.removeListener(this.onRankTypeTabTap, this);
        this.listTypeTab.tabChangeEvent.removeListener(this.onListTypeTabTap, this);
        RankManager.getRankListEvent.removeListener(this.getRankList, this);
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
        this.rankScroller.stopAnimation();
    }

    /**
     * 倒计时拉取奖池信息
    */
    private countDown()
    {
        this._countDownTime--;
        if (this._countDownTime <= 0)
        {
            this.reqGetRankList();
            qin.Console.log("拉取排行榜信息");
        }
    }
    private getRankList(myRank: number)
    {
        if (this._currentRankListInfo)
        {
            let selfRankInfo: RankInfo = RankManager.getRankInfoByRoleId(this._currentRankListInfo.list, UserManager.userInfo.roleId);
            if (selfRankInfo)
            {
                this.selfRankGroup.visible = true;
                this.noRankLabel.visible = false;
                this.myNameLabel.text = UserManager.userInfo.name;
                this.myRankLabel.text = selfRankInfo.rank.toString();
                this.awardLabel.text = qin.MathUtil.formatNum(selfRankInfo.score);
            } else
            {
                this.selfRankGroup.visible = false;
                this.noRankLabel.visible = true;
            }
            this.refreshUI();
            this._countDownTime = 300;
        }
    }
	/**
     * 渲染信息
    */
    private refreshUI()
    {
        UIUtil.writeListInfo(this.rankList, this._currentRankListInfo.list, "roleId", true);
    }
    private onRankTypeTabTap(index: number)
    {
        this.currentRankType = index;
        if (index == 0)
        {
            this.currentRankType = ShimTaeYoonRankType.Today;
        } else
        {
            this.currentRankType = ShimTaeYoonRankType.Yesterday;
        }
        this.currentListNum = this._bottomList[this._bottomList.length - 1];
        this.listTypeTab.setSelectIndex(0);
        this.reqGetRankList();
        this.rankScroller.stopAnimation();
    }
    private onListTypeTabTap(index: number)
    {
        this.currentListNum = this._bottomList[this._bottomList.length - 1 - index];
        this.reqGetRankList();
        this.rankScroller.stopAnimation();
    }
    /**
     * 发送获取排行榜请求
    */
    private reqGetRankList()
    {
        this._currentRankListInfo = RankManager.getRankListInfo(RankType.Activity, this.panelData.id, this.currentRankType, this.currentListNum);
        if (RankManager.isRefreshRank(this._currentRankListInfo))
        {
            RankManager.reqRankList(RankType.Activity, 1, this.panelData.id, this.currentRankType, this.currentListNum);
        }
        else
        {
            this.refreshUI();
        }
    }
}
