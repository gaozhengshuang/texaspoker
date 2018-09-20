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
 * 模板面板
 */
var HappyGiftPanel = (function (_super) {
    __extends(HappyGiftPanel, _super);
    function HappyGiftPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.HappyGiftPanel);
        return _this;
    }
    HappyGiftPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
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
    };
    HappyGiftPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.activityTab.init(0);
        this.rankTab.init(0);
        ActivityManager.reqActivityInfo(this.activityInfo.id);
    };
    HappyGiftPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.activityTab.tabChangeEvent.addListener(this.onActTabTap, this);
        this.rankTab.tabChangeEvent.addListener(this.onRankTabTap, this);
        RankManager.getRankListEvent.addListener(this.refreshRank, this);
        ActivityManager.onReqSingleActivityEvent.addListener(this.onEventRefresh, this);
        ActivityManager.happyGiftHandler.takePrizeCompleteEvent.addListener(this.refreshUI, this);
    };
    HappyGiftPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.activityTab.tabChangeEvent.removeListener(this.onActTabTap, this);
        this.rankTab.tabChangeEvent.removeListener(this.onRankTabTap, this);
        RankManager.getRankListEvent.removeListener(this.refreshRank, this);
        ActivityManager.onReqSingleActivityEvent.removeListener(this.onEventRefresh, this);
        ActivityManager.happyGiftHandler.takePrizeCompleteEvent.removeListener(this.refreshUI, this);
    };
    /**
     * 拉取事件后刷新
     */
    HappyGiftPanel.prototype.onEventRefresh = function (id) {
        if (InfoUtil.checkAvailable(this.activityInfo) && id == this.activityInfo.id) {
            this.refreshUI();
        }
    };
    HappyGiftPanel.prototype.refreshUI = function () {
        this.titleLabel.text = this.activityInfo.definition.name;
        this.ticketNumLabel.text = "您的欢乐券：" + qin.MathUtil.numAddSpace(this.activityInfo.step);
        if (ActivityUtil.isInJoinTime(this.activityInfo)) {
            var startTime = Math.round(this.activityInfo.startDateTime.getTime() / 1000);
            var endTime = Math.round(this.activityInfo.endDateTime.getTime() / 1000);
            var leftTime = void 0;
            if (this.activityInfo.definition.joinTime) {
                leftTime = startTime + this.activityInfo.definition.joinTime - TimeManager.GetServerUtcTimestamp();
            }
            else {
                leftTime = endTime - TimeManager.GetServerUtcTimestamp();
            }
            qin.DateTimeUtil.GetLefttimeText(leftTime, false, false);
            this.leftTimeLabel.text = "距离结束还有：" + qin.DateTimeUtil.GetLefttimeText(leftTime);
        }
        else {
            this.leftTimeLabel.text = "活动已结束";
        }
        UIUtil.writeListInfo(this.prizeList, this.activityInfo.subList, "subId", false);
    };
    HappyGiftPanel.prototype.setLabel = function (title, text, id) {
        var def = TextDefined.GetInstance().getDefinition(id);
        if (def) {
            if (def.isRichTxt) {
                text.textFlow = qin.TextUtil.parse(def.text);
                title.textFlow = qin.TextUtil.parse(def.title);
            }
            else {
                text.text = def.text;
                title.text = def.title;
            }
        }
    };
    HappyGiftPanel.prototype.onActTabTap = function (index) {
        this.resetScrollV(index);
        if (index == 1) {
            this.rankTab.setSelectIndex(0);
            this._currentRankListInfo = RankManager.getRankListInfo(RankType.Activity, this.activityInfo.id, HappyGiftRankSubType.All);
            if (RankManager.isRefreshRank(this._currentRankListInfo)) {
                RankManager.reqRankList(RankType.Activity, 1, this.activityInfo.id, HappyGiftRankSubType.All);
            }
            else {
                this.refreshRank();
            }
        }
        else if (index == 2) {
            var list = ActivityManager.happyGiftHandler.getHaveTakenPrizeList(this.activityInfo.id);
            if (list.length > 0) {
                UIUtil.writeListInfo(this.useList, ActivityManager.happyGiftHandler.getHaveTakenPrizeList(this.activityInfo.id), "subId");
                this.noUseLabel.visible = false;
            }
            else {
                this.noUseLabel.visible = true;
            }
        }
    };
    HappyGiftPanel.prototype.onRankTabTap = function (index) {
        this.rankScroller.stopAnimation();
        this.rankScroller.viewport.scrollV = 0;
        if (index == 0) {
            this._currentRankListInfo = RankManager.getRankListInfo(RankType.Activity, this.activityInfo.id, HappyGiftRankSubType.All);
            if (RankManager.isRefreshRank(this._currentRankListInfo)) {
                RankManager.reqRankList(RankType.Activity, 1, this.activityInfo.id, HappyGiftRankSubType.All);
            }
            else {
                this.refreshRank();
            }
        }
        else if (index == 1) {
            this._currentRankListInfo = RankManager.getRankListInfo(RankType.Activity, this.activityInfo.id, HappyGiftRankSubType.Friend);
            if (RankManager.isRefreshRank(this._currentRankListInfo)) {
                RankManager.reqRankList(RankType.Activity, 1, this.activityInfo.id, HappyGiftRankSubType.Friend);
            }
            else {
                this.refreshRank();
            }
        }
    };
    HappyGiftPanel.prototype.refreshRank = function () {
        UIUtil.writeListInfo(this.rankList, this._currentRankListInfo.list, "roleId", true);
    };
    HappyGiftPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    HappyGiftPanel.prototype.resetScrollV = function (index) {
        switch (index) {
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
    };
    return HappyGiftPanel;
}(BaseActivityPanel));
__reflect(HappyGiftPanel.prototype, "HappyGiftPanel");
//# sourceMappingURL=HappyGiftPanel.js.map