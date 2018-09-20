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
 * 锦标赛面板
 */
var ChampionshipPanel = (function (_super) {
    __extends(ChampionshipPanel, _super);
    function ChampionshipPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ChampionshipPanel);
        return _this;
    }
    ChampionshipPanel.prototype.onAwake = function (event) {
        var _this = this;
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.prevPanelName = UIModuleName.GameHallPanel;
        UIUtil.listRenderer(this.matchList, this.matchScroller, ChampionshipItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.signedUpList, this.signedUpScroller, ChampionshipItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.ticketList, this.ticketScroller, MyTicketItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.resultList, this.resultScroller, OutsItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, false);
        UIUtil.listRenderer(this.outMatchList, this.outMatchScroller, ChampionshipOutItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.sitAndPlayMatchList, this.sitAndPlayMatchScroller, ChampionshipItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.matchScroller.scrollPolicyH = this.signedUpScroller.scrollPolicyH = this.ticketScroller.scrollPolicyH = this.resultScroller.scrollPolicyH = this.outMatchScroller.scrollPolicyH = this.sitAndPlayMatchScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.hasMatchGroup.visible = this.noMatchGroup.visible = this.hasSignedUpGroup.visible = this.noSignedUpGroup.visible = this.hasTicketGroup.visible = this.noTicketGroup.visible = false;
        this.hasResultGroup.visible = this.noResultGroup.visible = this.hasOutMatchGroup.visible = this.noOutMatchGroup.visible = this.hasSitAndPlayMatchGroup.visible = this.noSitAndPlayMatchGroup.visible = false;
        var array = new Array();
        array.push(this.matchGroup);
        array.push(this.sitAndPlayMatchGroup);
        array.push(this.selfMatchGroup);
        array.push(this.resultsGroup);
        this.matchTab.build(TabComponent.CreatData(["锦标赛", "坐满即玩", "我的比赛", "最近赛况"], array, TabButtonType.BigOf4));
        var selfMatchArray = new Array();
        selfMatchArray.push(this.signedUpGroup);
        selfMatchArray.push(this.outMatchGroup);
        selfMatchArray.push(this.ticketsGroup);
        this.selfMatchTab.build(TabComponent.CreatData(["进行中", "已结束", "我的门票"], selfMatchArray, TabButtonType.SubOf3));
        this.selfMatchTab.isTween = false;
        egret.callLater(function () {
            var btn = _this.matchTab.getBtnByLabel("我的比赛");
            var underWayBtn = _this.selfMatchTab.getBtnByLabel("进行中");
            UIUtil.addMultiNotify(btn, NotifyType.Mtt_HaveJoinedList, 1, 10, 10);
            UIUtil.addMultiNotify(underWayBtn, NotifyType.Mtt_HaveJoinedList, 2, 10, 50);
        }, this);
        UIManager.pushResizeScroller(this.matchScroller, 1020);
        UIManager.pushResizeScroller(this.signedUpScroller, 950);
        UIManager.pushResizeScroller(this.outMatchScroller, 950);
        UIManager.pushResizeScroller(this.ticketScroller, 1000);
        UIManager.pushResizeScroller(this.resultScroller, 1020);
        UIManager.pushResizeScroller(this.sitAndPlayMatchScroller, 1020);
        UIManager.pushResizeScroller(this.noSignedUpGroup, 950);
        UIManager.pushResizeScroller(this.noMatchGroup, 1070);
        UIManager.pushResizeScroller(this.noTicketGroup, 1000);
        UIManager.pushResizeScroller(this.noResultGroup, 1070);
        UIManager.pushResizeScroller(this.noSitAndPlayMatchGroup, 1070);
        UIManager.pushResizeScroller(this.noOutMatchGroup, 1000);
    };
    ChampionshipPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData && appendData.isToSNG) {
            this.matchTab.init(1);
        }
        else {
            this.matchTab.init(0);
        }
        this.hiddenSelfMatchTab();
        ChampionshipManager.reqGetMTTListInfo();
    };
    ChampionshipPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.matchTab.tabChangeEvent.addListener(this.onTabClickHandler, this);
        this.selfMatchTab.tabChangeEvent.addListener(this.onSelfMatchTabClickHandler, this);
        this.matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.getMatchDetail, this);
        this.sitAndPlayMatchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.getSitAndPlayMatchDetail, this);
        this.signedUpList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.getJoinMatchDetail, this);
        ChampionshipManager.onGetMatchListEvent.addListener(this.setMatchListInfo, this);
        ChampionshipManager.onGetJoinedMatchListEvent.addListener(this.setSignedUpListInfo, this);
        ChampionshipManager.onGetRecentActionInfoEvent.addListener(this.setRecentActionListInfo, this);
        ChampionshipManager.onRefreshMTTListEvent.addListener(this.refreshMatchInfo, this);
        this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showHelpPanel, this);
        ChampionshipManager.OnGetRankListEvent.addListener(this.setOutsRankInfo, this);
        ChampionshipManager.OnNewMTTPushEvent.addListener(this.getNewMatchListInfo, this);
    };
    ChampionshipPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.matchTab.tabChangeEvent.removeListener(this.onTabClickHandler, this);
        this.selfMatchTab.tabChangeEvent.removeListener(this.onSelfMatchTabClickHandler, this);
        this.matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.getMatchDetail, this);
        this.sitAndPlayMatchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.getSitAndPlayMatchDetail, this);
        this.signedUpList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.getJoinMatchDetail, this);
        ChampionshipManager.onGetMatchListEvent.removeListener(this.setMatchListInfo, this);
        ChampionshipManager.onGetJoinedMatchListEvent.removeListener(this.setSignedUpListInfo, this);
        ChampionshipManager.onGetRecentActionInfoEvent.removeListener(this.setRecentActionListInfo, this);
        ChampionshipManager.onRefreshMTTListEvent.removeListener(this.refreshMatchInfo, this);
        this.helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showHelpPanel, this);
        ChampionshipManager.OnGetRankListEvent.removeListener(this.setOutsRankInfo, this);
        ChampionshipManager.OnNewMTTPushEvent.removeListener(this.getNewMatchListInfo, this);
    };
    /**
     * 获取新的赛事列表
    */
    ChampionshipPanel.prototype.getNewMatchListInfo = function () {
        if (this.matchTab.lastIndex == 0) {
            ChampionshipManager.reqGetMTTListInfo();
        }
    };
    /**
     * 更新赛事列表
    */
    ChampionshipPanel.prototype.refreshMatchInfo = function (data) {
        if (data.type == MTTRefreshType.MTTList) {
            ChampionshipManager.reqJoinedMTTList();
            this.setMatchListInfo();
        }
        else if (data.type == MTTRefreshType.MTTJOinNum) {
            this.refreshMatchNumInfo(data.data, this.matchList);
            this.refreshMatchNumInfo(data.data, this.signedUpList);
            this.refreshMatchNumInfo(data.data, this.sitAndPlayMatchList);
        }
    };
    /**
     * 点击赛事列表获取赛事详细信息
    */
    ChampionshipPanel.prototype.getMatchDetail = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.matchList.selectedItem) {
            UIManager.showPanel(UIModuleName.ChampionshipInfoPanel, { championshipInfo: this.matchList.selectedItem });
        }
    };
    /**
     * 点击坐满即玩赛事列表获取赛事详细信息
    */
    ChampionshipPanel.prototype.getSitAndPlayMatchDetail = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.sitAndPlayMatchList.selectedItem) {
            UIManager.showPanel(UIModuleName.ChampionshipInfoPanel, { championshipInfo: this.sitAndPlayMatchList.selectedItem });
        }
    };
    /**
     * 点击已报名赛事列表获取赛事详细信息
    */
    ChampionshipPanel.prototype.getJoinMatchDetail = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.signedUpList.selectedItem && !this.signedUpList.selectedItem.endTime) {
            UIManager.showPanel(UIModuleName.ChampionshipInfoPanel, { championshipInfo: this.signedUpList.selectedItem });
        }
        else {
            AlertManager.showAlert("该赛事已经结束。");
        }
    };
    /**
     * 设置最近赛况列表信息
    */
    ChampionshipPanel.prototype.setRecentActionListInfo = function () {
        this.spreadItemTS = null;
        this.childlist = null;
        if (ChampionshipManager.outsList && ChampionshipManager.outsList.length > 0) {
            this.hasResultGroup.visible = true;
            this.noResultGroup.visible = false;
            UIUtil.writeListInfo(this.resultList, ChampionshipManager.outsList, "recordId");
        }
        else {
            this.noResultGroup.visible = true;
            this.hasResultGroup.visible = false;
        }
    };
    /**
     * 设置赛事列表信息
    */
    ChampionshipPanel.prototype.setMatchListInfo = function () {
        if (this.matchTab.lastIndex == 0) {
            this.setMTTListInfo();
        }
        else if (this.matchTab.lastIndex == 1) {
            this.setSitAndPlayListInfo();
        }
        if (this.matchTab.lastIndex == 2 && this.selfMatchTab.lastIndex == 0) {
            ChampionshipManager.reqJoinedMTTList();
        }
    };
    /**
     * 设置mtt赛事列表信息
    */
    ChampionshipPanel.prototype.setMTTListInfo = function () {
        if (ChampionshipManager.showMTTList && ChampionshipManager.showMTTList.length > 0) {
            this.hasMatchGroup.visible = true;
            this.noMatchGroup.visible = false;
            UIUtil.writeListInfo(this.matchList, ChampionshipManager.showMTTList, "recordId", false, SortUtil.matchStartTimeSort);
        }
        else {
            this.noMatchGroup.visible = true;
            this.hasMatchGroup.visible = false;
        }
    };
    /**
     * 设置坐满即玩赛事列表信息
    */
    ChampionshipPanel.prototype.setSitAndPlayListInfo = function () {
        if (ChampionshipManager.showSitAndPlayList && ChampionshipManager.showSitAndPlayList.length > 0) {
            this.hasSitAndPlayMatchGroup.visible = true;
            this.noSitAndPlayMatchGroup.visible = false;
            UIUtil.writeListInfo(this.sitAndPlayMatchList, ChampionshipManager.showSitAndPlayList, "id", false, SortUtil.matchStartTimeSort);
        }
        else {
            this.hasSitAndPlayMatchGroup.visible = false;
            this.noSitAndPlayMatchGroup.visible = true;
        }
    };
    /**
     * 更新赛事人数
    */
    ChampionshipPanel.prototype.refreshMatchNumInfo = function (list, matchList) {
        if (list) {
            for (var i = 0; i < list.length; i++) {
                for (var j = 0; j < matchList.numChildren; j++) {
                    var itemRender = matchList.getChildAt(j);
                    if (itemRender.bindData.recordId == list[i].id) {
                        itemRender.updateData();
                        break;
                    }
                }
            }
        }
    };
    /**
     * 设置已报名赛事列表信息
    */
    ChampionshipPanel.prototype.setSignedUpListInfo = function () {
        var underwayMatchList = this.getUnderWayMatchList();
        if (underwayMatchList && underwayMatchList.length > 0) {
            this.hasSignedUpGroup.visible = true;
            this.noSignedUpGroup.visible = false;
            UIUtil.writeListInfo(this.signedUpList, underwayMatchList, "recordId");
        }
        else {
            this.noSignedUpGroup.visible = true;
            this.hasSignedUpGroup.visible = false;
        }
    };
    /**
     * 设置我的门票列表信息
    */
    ChampionshipPanel.prototype.setMyTicketListInfo = function () {
        var myTicketList;
        myTicketList = ItemManager.getItemListByType(ItemType.Ticket);
        if (myTicketList && myTicketList.length > 0) {
            this.hasTicketGroup.visible = true;
            this.noTicketGroup.visible = false;
            UIUtil.writeListInfo(this.ticketList, myTicketList, "id", false, SortUtil.TicketIdSort);
        }
        else {
            this.hasTicketGroup.visible = false;
            this.noTicketGroup.visible = true;
        }
    };
    /**
     * 选项卡按钮点击事件
    */
    ChampionshipPanel.prototype.onTabClickHandler = function (index) {
        if (index == 0) {
            ChampionshipManager.reqGetMTTListInfo();
        }
        else if (index == 1) {
            this.setSitAndPlayListInfo();
        }
        else if (index == 2) {
            ChampionshipManager.reqJoinedMTTList();
            this.selfMatchTab.init(0);
        }
        else if (index == 3) {
            ChampionshipManager.reqGetRecentActionInfo();
        }
        if (index == 2) {
            this.showSelfMatchTab();
        }
        else {
            this.hiddenSelfMatchTab();
        }
    };
    /**
     * 二级选项卡按钮点击事件
    */
    ChampionshipPanel.prototype.onSelfMatchTabClickHandler = function (index) {
        switch (index) {
            case 0:
                ChampionshipManager.reqJoinedMTTList();
                break;
            case 1:
                this.setOutMatchInfo();
                break;
            case 2:
                this.setMyTicketListInfo();
                break;
        }
    };
    /**
     * 设置已结束列表数据渲染
    */
    ChampionshipPanel.prototype.setOutMatchInfo = function () {
        var outMatchList = this.getOutMatchList();
        if (outMatchList && outMatchList.length > 0) {
            this.hasOutMatchGroup.visible = true;
            this.noOutMatchGroup.visible = false;
            UIUtil.writeListInfo(this.outMatchList, outMatchList, "recordId");
        }
        else {
            this.hasOutMatchGroup.visible = false;
            this.noOutMatchGroup.visible = true;
        }
    };
    /**
     * 获得已结束赛事列表
    */
    ChampionshipPanel.prototype.getOutMatchList = function () {
        var outMatchList = new Array();
        if (ChampionshipManager.joinMTTList) {
            for (var _i = 0, _a = ChampionshipManager.joinMTTList; _i < _a.length; _i++) {
                var joinMTTInfo = _a[_i];
                if (joinMTTInfo.outTime) {
                    outMatchList.push(joinMTTInfo);
                }
            }
        }
        return outMatchList;
    };
    /**
     * 获得进行中赛事列表
    */
    ChampionshipPanel.prototype.getUnderWayMatchList = function () {
        var underwayMatchList = new Array();
        if (ChampionshipManager.joinMTTList) {
            for (var _i = 0, _a = ChampionshipManager.joinMTTList; _i < _a.length; _i++) {
                var joinMTTInfo = _a[_i];
                if (!joinMTTInfo.outTime) {
                    underwayMatchList.push(joinMTTInfo);
                }
            }
        }
        return underwayMatchList;
    };
    /**
     * 隐藏二级选项卡
    */
    ChampionshipPanel.prototype.hiddenSelfMatchTab = function () {
        this.selfMatchBG.visible = this.selfMatchTab.visible = false;
    };
    /**
     * 显示二级选项卡
    */
    ChampionshipPanel.prototype.showSelfMatchTab = function () {
        this.selfMatchBG.visible = this.selfMatchTab.visible = true;
    };
    /**
     * ?按钮点击事件
    */
    ChampionshipPanel.prototype.showHelpPanel = function () {
        SoundManager.playEffect(MusicAction.buttonClick);
        UIManager.showPanel(UIModuleName.TextInfoPanel, TextFixedId.PlayWay);
    };
    /**
    * 设置最近赛况排名信息
   */
    ChampionshipPanel.prototype.setOutsRankInfo = function (recordId) {
        var item;
        var outInfo = ChampionshipManager.getOutsInfoByRecordId(recordId);
        for (var i = 0; i < this.resultList.numChildren; i++) {
            item = this.resultList.getChildAt(i);
            if (item.bindData.recordId == recordId) {
                if (this.spreadItemTS) {
                    if (this.spreadItemTS == item.dirBtn) {
                        item.dirBtn.selected = !item.dirBtn.selected;
                    }
                    else {
                        if (this.childlist) {
                            this.childlist.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelBubble, this);
                            this.spreadItemTS.parent.removeChild(this.childlist);
                            this.spreadItemTS.parent.height = this.spreadItemTS.parent.height - this.childlist.height;
                            this.childlist = null;
                        }
                        this.spreadItemTS.selected = false;
                        this.spreadItemTS = item.dirBtn;
                        item.dirBtn.selected = true;
                    }
                }
                else {
                    this.spreadItemTS = item.dirBtn;
                    item.dirBtn.selected = true;
                }
            }
            else {
                item.dirBtn.selected = false;
            }
            if (item.dirBtn.selected == true) {
                this.createChild(item, outInfo);
            }
            else {
                if (this.spreadItemTS && this.childlist) {
                    var parent_1 = this.spreadItemTS.parent;
                    if (item.bindData.recordId == parent_1.bindData.recordId) {
                        this.delChild();
                    }
                }
            }
        }
    };
    /**
     * 创建折叠项
    */
    ChampionshipPanel.prototype.createChild = function (item, outInfo) {
        UIUtil.bindRender(item.list, OutsChildItemRenderer);
        item.list.useVirtualLayout = true;
        item.list.width = 720;
        var layout = new eui.VerticalLayout();
        layout.gap = 1;
        item.list.layout = layout;
        var rankList = new Array();
        if (outInfo && outInfo.rankList) {
            for (var i = 1; i < outInfo.rankList.length; i++) {
                rankList[i - 1] = outInfo.rankList[i];
            }
        }
        item.list.dataProvider = new eui.ArrayCollection(rankList);
        item.list.y = item.height;
        item.list.height = 64 * rankList.length;
        item.list.bottom = 1;
        item.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelBubble, this);
        this.childlist = item.list;
        item.addChild(item.list);
        item.height = item.list.height + item.height;
    };
    /**
     * 删除折叠项
    */
    ChampionshipPanel.prototype.delChild = function () {
        var parent = this.spreadItemTS.parent;
        parent.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelBubble, this);
        this.childlist = null;
        parent.height = parent.height - parent.list.height;
        parent.removeChild(parent.list);
    };
    /**
     * 取消冒泡
    */
    ChampionshipPanel.prototype.cancelBubble = function (event) {
        event.stopImmediatePropagation();
    };
    ChampionshipPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return ChampionshipPanel;
}(BasePanel));
__reflect(ChampionshipPanel.prototype, "ChampionshipPanel");
//# sourceMappingURL=ChampionshipPanel.js.map