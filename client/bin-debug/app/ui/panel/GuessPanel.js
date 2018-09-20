var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 手牌竞猜面板
*/
var GuessPanel = (function (_super) {
    __extends(GuessPanel, _super);
    function GuessPanel() {
        var _this = _super.call(this) || this;
        _this._txtCount = 24;
        _this._contentList = new Array();
        _this.setSkinName(UIModuleName.GuessPanel);
        return _this;
    }
    GuessPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.tabComponent.isTween = false;
        this.maskAlpha = 0.5;
        var array = new Array();
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
        this.toggleBtns = new Array();
        this.toggleBtns.push(this.buyOnceRB);
        this.toggleBtns.push(this.buyEveryRB);
        this.buyOnceRB["desBT"].label = "购买一局";
        this.buyEveryRB["desBT"].label = "购买每局";
        this.totalBuyLabel.text = "$0";
        this.helpScroller.viewport = this.txtGroup;
        GamblingManager.guessHandler.getGuessOddsInfo();
        this.setHelpInfo();
        UIManager.pushResizeGroup(this.anmGroup);
    };
    GuessPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.tabComponent.init(0);
        this.buyOnceRB.selected = GamblingManager.guessHandler.buyOnceRBSel;
        if (GamblingManager.guessHandler.totalAnte == 0) {
            this.totalBuyLabel.text = "$0";
            this.buyOnceRB.selected = this.buyEveryRB.selected = false;
        }
        if (GamblingManager.guessHandler.buyInning == undefined) {
            this.buyEveryRB.selected = false;
        }
        this.refreshGoldNum();
        this.setGuessOddsInfo();
    };
    GuessPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GuessPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        UserManager.propertyChangeEvent.addListener(this.refreshGoldNum, this);
        GamblingManager.guessHandler.onChangeTotalAnteEvent.addListener(this.refreshTotalNum, this);
        this.buyOnceRB.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        this.buyEveryRB.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        this.tabComponent.tabChangeEvent.addListener(this.onTabClickHandler, this);
        GamblingManager.guessHandler.onWeekInfoEvent.addListener(this.setWeekInfo, this);
        GamblingManager.guessHandler.onGetBuyRecordInfoEvent.addListener(this.setBuyRecordInfo, this);
        GamblingManager.guessHandler.onResetBuyOnceStateEvent.addListener(this.resetBuyOnceState, this);
    };
    GuessPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        UserManager.propertyChangeEvent.removeListener(this.refreshGoldNum, this);
        GamblingManager.guessHandler.onChangeTotalAnteEvent.removeListener(this.refreshTotalNum, this);
        this.buyOnceRB.removeEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        this.buyEveryRB.removeEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        this.tabComponent.tabChangeEvent.removeListener(this.onTabClickHandler, this);
        GamblingManager.guessHandler.onWeekInfoEvent.removeListener(this.setWeekInfo, this);
        GamblingManager.guessHandler.onGetBuyRecordInfoEvent.removeListener(this.setBuyRecordInfo, this);
        GamblingManager.guessHandler.onResetBuyOnceStateEvent.removeListener(this.resetBuyOnceState, this);
    };
    /**
     * 下一局开始重置购买一次按钮状态
    */
    GuessPanel.prototype.resetBuyOnceState = function () {
        this.buyOnceRB.selected = false;
    };
    /**
     * 设置投注手牌类型及赔率信息
    */
    GuessPanel.prototype.setGuessOddsInfo = function () {
        if (GamblingManager.guessHandler.guessOddsList) {
            UIUtil.writeListInfo(this.buyList, GamblingManager.guessHandler.guessOddsList, "id");
        }
    };
    /**
     * 更新金币数量
    */
    GuessPanel.prototype.refreshGoldNum = function () {
        var playInfo = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
        if (playInfo) {
            var bankRoll = playInfo.bankRoll; //桌内的筹码             
            this.goldNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold + bankRoll);
        }
        else {
            this.goldNumLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
        }
    };
    /**
     * 更新下注所需金币的数量
    */
    GuessPanel.prototype.refreshTotalNum = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo)) {
            this.totalBuyLabel.text = "$" + GamblingManager.guessHandler.totalAnte * GamblingManager.roomInfo.definition.bBlind;
        }
    };
    /**
     * 购买局数单选点击事件
    */
    GuessPanel.prototype.radioChangeHandler = function (event) {
        // 自动押注 
        // 在未坐下时，玩家也可开始押注，但直到玩家坐下才开始生效。
        // 因此，在开启新一局时，需要进行扣除下注金额时，都要判断玩家牌桌外金额是否满足下注。
        if (GamblingManager.guessHandler.totalAnte == 0) {
            event.target.selected = false;
            AlertManager.showAlert("请选择要买入项");
            return;
        }
        var num = parseInt(event.target.label);
        for (var _i = 0, _a = this.toggleBtns; _i < _a.length; _i++) {
            var btn = _a[_i];
            if (btn == event.target) {
                btn.selected = event.target.selected;
            }
            else {
                btn.selected = false;
            }
        }
        if (GamblingManager.guessHandler.buyInning) {
            if (GamblingManager.guessHandler.buyInning == num) {
                //发送取消购买的请求
                GamblingManager.guessHandler.reqBuyGuessAnte();
                GamblingManager.guessHandler.buyInning = undefined;
                GamblingManager.guessHandler.buyOnceRBSel = false;
                GamblingManager.guessHandler.isBuyGuess = false;
                return;
            }
        }
        if (GamblingManager.guessHandler.totalAnte * GamblingManager.roomInfo.bBlind > UserManager.userInfo.gold) {
            event.target.selected = false;
            AlertManager.showConfirm("您牌桌外的剩余金币不足。", this.goShoppingPanel, null, null, null, null, "充值");
            return;
        }
        GamblingManager.guessHandler.buyInning = num;
        GamblingManager.guessHandler.isBuyGuess = true;
        this.setBuyInfo(GamblingManager.guessHandler.buyGuessAnteInfo);
        if (GamblingManager.guessHandler.buyInning == 1) {
            //发送购买一局请求
            GamblingManager.guessHandler.buyOnceRBSel = true;
            GamblingManager.guessHandler.reqBuyGuessAnte(1, this.buyAnteInfo);
        }
        else if (GamblingManager.guessHandler.buyInning == 2) {
            // 发送购买每局请求
            GamblingManager.guessHandler.reqBuyGuessAnte(2, this.buyAnteInfo);
            GamblingManager.guessHandler.buyOnceRBSel = false;
        }
    };
    /**
     * 充值金币
    */
    GuessPanel.prototype.goShoppingPanel = function (event) {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.GamblingPanel });
    };
    /**
     *设置购买的注数数据
    */
    GuessPanel.prototype.setBuyInfo = function (anteList) {
        qin.ArrayUtil.Clear(this.buyAnteInfo);
        if (!this.buyAnteInfo) {
            this.buyAnteInfo = new Array();
        }
        if (anteList && anteList.length > 0) {
            for (var _i = 0, anteList_1 = anteList; _i < anteList_1.length; _i++) {
                var anteInfo = anteList_1[_i];
                var buyInfo = new BuyGuessAnteInfo();
                buyInfo.handType = anteInfo.handType;
                buyInfo.num = anteInfo.num;
                this.buyAnteInfo.push(buyInfo);
            }
        }
    };
    /**
     * 打开充值面板
    */
    GuessPanel.prototype.payGold = function () {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: ShopGroupIndex.Gold });
    };
    /**
     * 设置本周榜单信息
    */
    GuessPanel.prototype.setWeekInfo = function () {
        if (GamblingManager.guessHandler.weekGuessRankList) {
            this.weekList.dataProvider = new eui.ArrayCollection(GamblingManager.guessHandler.weekGuessRankList);
        }
    };
    /**
     * 设置购买记录
    */
    GuessPanel.prototype.setBuyRecordInfo = function () {
        if (GamblingManager.guessHandler.recordList) {
            this.buyrRecordList.dataProvider = new eui.ArrayCollection(GamblingManager.guessHandler.recordList);
        }
    };
    /**
     * 设置帮助信息
    */
    GuessPanel.prototype.setHelpInfo = function () {
        this._def = TextDefined.GetInstance().getDefinition(TextFixedId.GuessHelp);
        if (this._def) {
            this.helpTitleLabel.textFlow = qin.TextUtil.parse(this._def.title);
            this.txtLabel.textFlow = qin.TextUtil.parse(this._def.text);
            this.txtGroup.visible = true;
            this._lastShowContainer = this.txtGroup;
        }
    };
    /**
     * 选项卡选项点击事件
    */
    GuessPanel.prototype.onTabClickHandler = function (index) {
        if (index == 1) {
            //发送获取本周榜单请求
            GamblingManager.guessHandler.reqGetWeekInfo();
        }
        else if (index == 2) {
            // 数据记录在客户端，即玩家在此牌桌进行的最近10局比赛手牌情况，未进行下注也进行显示，未下注，中奖注数为0  
            if (GamblingManager.guessHandler.resultList) {
                this.resultList.dataProvider = new eui.ArrayCollection(GamblingManager.guessHandler.resultList.sort(SortUtil.guessResultTimeSort));
            }
        }
        else if (index == 3) {
            GamblingManager.guessHandler.reqGetBuyRecordInfo();
        }
    };
    return GuessPanel;
}(BasePanel));
__reflect(GuessPanel.prototype, "GuessPanel");
//# sourceMappingURL=GuessPanel.js.map