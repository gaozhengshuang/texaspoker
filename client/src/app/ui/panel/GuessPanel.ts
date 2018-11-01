/**
 * 手牌竞猜面板
*/
class GuessPanel extends BasePanel
{
    public tabComponent: TabComponent;
    /**
     * 不同选项卡的group
    */
    public buyGroup: eui.Group;
    public weekGroup: eui.Group;
    public resultGroup: eui.Group;
    public buyrRecordGroup: eui.Group;
    public helpGroup: eui.Group;
    /**
     * 不同选项卡的scroller
    */
    public buyScroller: eui.Scroller;
    public weekScroller: eui.Scroller;
    public resultScroller: eui.Scroller;
    public buyrRecordScroller: eui.Scroller;
    public helpScroller: eui.Scroller;
    /**
     * 不同选项卡的list
    */
    public buyList: eui.List;
    public weekList: eui.List;
    public resultList: eui.List;
    public buyrRecordList: eui.List;
    public helpList: eui.List;
    /**
     * 下注所需的金币
    */
    public totalBuyLabel: eui.Label;
    /**
     * 全部金币数（桌外 + 桌内）
    */
    public goldNumLabel: eui.Label;
    /**
     * 购买局数
    */
    public buyOnceRB: eui.ToggleButton;
    public buyEveryRB: eui.ToggleButton;
    private toggleBtns: Array<eui.ToggleButton>;
    /**
     * 帮助标题
    */
    public helpTitleLabel: eui.Label;
    public txtLabel: eui.Label;
    public txtGroup: eui.Group;

    private _contentList: Array<string>;
    private _def: table.ITextDefine;
    private _txtCount: number = 24;
    public _lastShowContainer: any;

    public anmGroup: eui.Group;

    public constructor()
    {
        super();
        this._contentList = new Array<string>();
        this.setSkinName(UIModuleName.GuessPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.isMaskClickClose = true;
        this.tabComponent.isTween = false;
        this.maskAlpha = 0.5;

        let array: Array<eui.Group> = new Array<eui.Group>();
        array.push(this.buyGroup);
        array.push(this.weekGroup);
        array.push(this.resultGroup);
        array.push(this.buyrRecordGroup);
        array.push(this.helpGroup);
        this.tabComponent.build(TabComponent.CreatData(["购买", "本周榜单", "开奖信息", "购买记录", "帮助"], array, TabButtonType.XSmallOf5));
        UIUtil.listRenderer(this.buyList, this.buyScroller, GuessBuyItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, false);
        UIUtil.listRenderer(this.weekList, this.weekScroller, GuessWeekItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.resultList, this.resultScroller, GuessResultItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.buyrRecordList, this.buyrRecordScroller, GuessRecordItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.buyScroller.scrollPolicyH = this.weekScroller.scrollPolicyH = this.resultScroller.scrollPolicyH = this.buyrRecordScroller.scrollPolicyH = this.helpScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.toggleBtns = new Array<eui.ToggleButton>();
        this.toggleBtns.push(this.buyOnceRB);
        this.toggleBtns.push(this.buyEveryRB);
        this.buyOnceRB["desBT"].label = "购买一局";
        this.buyEveryRB["desBT"].label = "购买每局";
        this.totalBuyLabel.text = "$0";
        this.helpScroller.viewport = this.txtGroup;

        GamblingManager.guessHandler.getGuessOddsInfo();
        this.setHelpInfo();
        UIManager.pushResizeGroup(this.anmGroup);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.tabComponent.init(0);
        this.buyOnceRB.selected = GamblingManager.guessHandler.buyOnceRBSel;
        if (GamblingManager.guessHandler.totalAnte == 0)
        {
            this.totalBuyLabel.text = "$0";
            this.buyOnceRB.selected = this.buyEveryRB.selected = false;
        }
        switch (GamblingManager.guessHandler.buyInning)
        {
            case 1:
                this.buyOnceRB.selected = true;
                break;
            case 2:
                this.buyEveryRB.selected = true;
                break;
        }

        this.refreshGoldNum();
        this.setGuessOddsInfo();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        UserManager.propertyChangeEvent.addListener(this.refreshGoldNum, this);
        GamblingManager.guessHandler.onChangeTotalAnteEvent.addListener(this.refreshTotalNum, this);
        this.buyOnceRB.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        this.buyEveryRB.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        this.tabComponent.tabChangeEvent.addListener(this.onTabClickHandler, this);
        GamblingManager.guessHandler.onWeekInfoEvent.addListener(this.setWeekInfo, this);
        GamblingManager.guessHandler.onGetBuyRecordInfoEvent.addListener(this.setBuyRecordInfo, this);
        GamblingManager.guessHandler.onResetBuyOnceStateEvent.addListener(this.resetBuyOnceState, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        UserManager.propertyChangeEvent.removeListener(this.refreshGoldNum, this);
        GamblingManager.guessHandler.onChangeTotalAnteEvent.removeListener(this.refreshTotalNum, this);
        this.buyOnceRB.removeEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        this.buyEveryRB.removeEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        this.tabComponent.tabChangeEvent.removeListener(this.onTabClickHandler, this);
        GamblingManager.guessHandler.onWeekInfoEvent.removeListener(this.setWeekInfo, this);
        GamblingManager.guessHandler.onGetBuyRecordInfoEvent.removeListener(this.setBuyRecordInfo, this);
        GamblingManager.guessHandler.onResetBuyOnceStateEvent.removeListener(this.resetBuyOnceState, this);
    }

    /**
     * 下一局开始重置购买一次按钮状态
    */
    private resetBuyOnceState()
    {
        this.buyOnceRB.selected = false;
    }
    /**
     * 设置投注手牌类型及赔率信息
    */
    private setGuessOddsInfo()
    {
        if (GamblingManager.guessHandler.guessOddsList)
        {
            UIUtil.writeListInfo(this.buyList, GamblingManager.guessHandler.guessOddsList, "id");
        }
    }
    /**
     * 更新金币数量
    */
    private refreshGoldNum()
    {
        let playInfo: PlayerInfo = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
        if (playInfo)
        {
            let bankRoll: number = playInfo.bankRoll;  //桌内的筹码             
            this.goldNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.gold + bankRoll);
        } else
        {
            this.goldNumLabel.text = game.MathUtil.formatNum(UserManager.userInfo.gold);
        }
    }
    /**
     * 更新下注所需金币的数量
    */
    private refreshTotalNum()
    {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo))
        {
            this.totalBuyLabel.text = "$" + GamblingManager.guessHandler.totalAnte * game.longToNumber(GamblingManager.roomInfo.definition.BBlind);
        }
    }
    /**
     * 购买局数单选点击事件
    */
    private radioChangeHandler(event: eui.UIEvent)
    {
        // 自动押注 
        // 在未坐下时，玩家也可开始押注，但直到玩家坐下才开始生效。
        // 因此，在开启新一局时，需要进行扣除下注金额时，都要判断玩家牌桌外金额是否满足下注。
        if (GamblingManager.guessHandler.totalAnte == 0)
        {
            event.target.selected = false;
            AlertManager.showAlert("请选择要买入项");
            return;
        }
        let num: number = parseInt(event.target.label);
        for (let btn of this.toggleBtns)
        {
            if (btn == event.target)
            {
                btn.selected = event.target.selected;
            } else
            {
                btn.selected = false;
            }
        }
        if (GamblingManager.guessHandler.buyInning)
        {
            if (GamblingManager.guessHandler.buyInning == num)
            {
                GamblingManager.guessHandler.buyInning = 0;
                //发送取消购买的请求
                GamblingManager.guessHandler.reqBuyGuessAnte();
                GamblingManager.guessHandler.buyInning = undefined;
                GamblingManager.guessHandler.buyOnceRBSel = false;
                GamblingManager.guessHandler.isBuyGuess = false;
                return;
            }
        }
        if (GamblingManager.guessHandler.totalAnte * GamblingManager.roomInfo.bBlind > UserManager.userInfo.gold)
        {
            event.target.selected = false;
            AlertManager.showConfirm("您牌桌外的剩余金币不足。", this.goShoppingPanel, null, null, null, null, "充值");
            return;
        }
        GamblingManager.guessHandler.buyInning = num;
        GamblingManager.guessHandler.isBuyGuess = true;
        this.setBuyInfo(GamblingManager.guessHandler.buyGuessAnteInfo);
    }
    /**
     * 充值金币
    */
    private goShoppingPanel(event: egret.TouchEvent)
    {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.GamblingPanel });
    }
    /**
     *设置购买的注数数据
    */
    private setBuyInfo(anteList: Array<BuyGuessAnteInfoBase>)
    {
        game.ArrayUtil.Clear(GamblingManager.guessHandler.buyAnteInfo);
        if (!GamblingManager.guessHandler.buyAnteInfo)
        {
            GamblingManager.guessHandler.buyAnteInfo = new Array<BuyGuessAnteInfoBase>();
        }
        if (anteList && anteList.length > 0)
        {
            for (let anteInfo of anteList)
            {
                let buyInfo: BuyGuessAnteInfo = new BuyGuessAnteInfo();
                buyInfo.handtype = anteInfo.handtype;
                buyInfo.num = anteInfo.num;
                GamblingManager.guessHandler.buyAnteInfo.push(buyInfo);
            }
        }
    }
    /**
     * 打开充值面板
    */
    private payGold()
    {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: ShopGroupIndex.Gold });
    }
    /**
     * 设置本周榜单信息
    */
    private setWeekInfo()
    {
        if (GamblingManager.guessHandler.weekGuessRankList)
        {
            this.weekList.dataProvider = new eui.ArrayCollection(GamblingManager.guessHandler.weekGuessRankList);
        }
    }
    /**
     * 设置购买记录
    */
    private setBuyRecordInfo()
    {
        if (GamblingManager.guessHandler.recordList)
        {
            this.buyrRecordList.dataProvider = new eui.ArrayCollection(GamblingManager.guessHandler.recordList);
        }
    }
    /**
     * 设置帮助信息
    */
    private setHelpInfo()
    {
        this._def = table.TextById[TextFixedId.GuessHelp];
        if (this._def)
        {
            this.helpTitleLabel.textFlow = game.TextUtil.parse(TextDefined.GetInstance().getTitle(this._def));
            this.txtLabel.textFlow = game.TextUtil.parse(TextDefined.GetInstance().getText(this._def));
            this.txtGroup.visible = true;
            this._lastShowContainer = this.txtGroup;
        }
    }
    /**
     * 选项卡选项点击事件
    */
    private onTabClickHandler(index: number)
    {
        if (index == 1)
        {
            //发送获取本周榜单请求
            GamblingManager.guessHandler.reqGetWeekInfo();
        } else if (index == 2)
        {
            // 数据记录在客户端，即玩家在此牌桌进行的最近10局比赛手牌情况，未进行下注也进行显示，未下注，中奖注数为0  
            if (GamblingManager.guessHandler.resultList)
            {
                this.resultList.dataProvider = new eui.ArrayCollection(GamblingManager.guessHandler.resultList.sort(SortUtil.guessResultTimeSort));
            }
        } else if (index == 3)
        {
            GamblingManager.guessHandler.reqGetBuyRecordInfo();
        }
    }
}