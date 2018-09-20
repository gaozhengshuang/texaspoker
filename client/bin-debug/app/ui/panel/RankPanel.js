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
 * 排行榜面板
 */
var RankPanel = (function (_super) {
    __extends(RankPanel, _super);
    function RankPanel() {
        var _this = _super.call(this) || this;
        _this.isTween = false;
        _this.setSkinName(UIModuleName.RankPanel);
        return _this;
    }
    RankPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.panelAlignType = PanelAlignType.Left_Center;
        this.rankTypeTab.build(TabComponent.CreatData(["财富", "等级", "VIP"], [this.rankGroup, this.rankGroup, this.rankGroup], TabButtonType.SmallOf3));
        this.rankTypeTab.isTween = false;
        this.listTypeTab.build(TabComponent.CreatData(["全部", "好友"], [this.rankGroup, this.rankGroup], TabButtonType.SubOf2));
        this.listTypeTab.isTween = false;
        UIUtil.listRenderer(this.rankList, this.rankScroller, RankItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    RankPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.rankTypeTab.init(0);
        this.listTypeTab.init(0);
        this._currentRankType = this.rankTypeTab.lastIndex;
        this._currentListType = this.listTypeTab.lastIndex;
        this.reqRankList();
        this.setEnterAnime();
    };
    RankPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.rankTypeTab.tabChangeEvent.addListener(this.onRankTypeTabTap, this);
        this.listTypeTab.tabChangeEvent.addListener(this.onListTypeTabTap, this);
        RankManager.getRankListEvent.addListener(this.getRankList, this);
        UIManager.onPanelCloseEvent.addListener(this.setOutAnime, this);
    };
    RankPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.rankTypeTab.tabChangeEvent.removeListener(this.onRankTypeTabTap, this);
        this.listTypeTab.tabChangeEvent.removeListener(this.onListTypeTabTap, this);
        RankManager.getRankListEvent.removeListener(this.getRankList, this);
        UIManager.onPanelCloseEvent.removeListener(this.setOutAnime, this);
        this.rankScroller.stopAnimation();
    };
    RankPanel.prototype.getRankList = function (type) {
        UIUtil.writeListInfo(this.rankList, this._currentRankListInfo.list, "roleId", true);
    };
    RankPanel.prototype.onRankTypeTabTap = function (index) {
        this._currentRankType = index;
        this._currentListType = RankListType.All;
        this.listTypeTab.setSelectIndex(0);
        this.reqRankList();
        this.rankScroller.stopAnimation();
        this.rankScroller.viewport.scrollV = 0;
    };
    RankPanel.prototype.onListTypeTabTap = function (index) {
        this._currentListType = index;
        this.reqRankList();
        this.rankScroller.stopAnimation();
        this.rankScroller.viewport.scrollV = 0;
    };
    /**
     * 发送排行榜请求
     */
    RankPanel.prototype.reqRankList = function () {
        var type = this.getListType(this._currentRankType, this._currentListType);
        this._currentRankListInfo = RankManager.getRankListInfo(type);
        if (RankManager.isRefreshRank(this._currentRankListInfo)) {
            RankManager.reqRankList(type);
        }
        else {
            this.getRankList(type);
        }
    };
    /**
     * 计算发送得的type类型
     */
    RankPanel.prototype.getListType = function (rankType, listType) {
        if (rankType == RankTabType.Vip) {
            this.listTypeTab.visible = false;
            this.listTabBg.visible = false;
            this.rankGroup.y = 200;
            this.rankGroup.height = 620;
            this.rankList.height = 620;
            this.rankScroller.height = 620;
            return RankType.Vip;
        }
        else {
            this.listTypeTab.visible = true;
            this.listTabBg.visible = true;
            this.rankGroup.y = 270;
            this.rankGroup.height = 550;
            this.rankList.height = 550;
            this.rankScroller.height = 550;
            return rankType * 2 + listType + 1;
        }
    };
    RankPanel.prototype.setEnterAnime = function () {
        this.removeAnime();
        this.left = -this.width;
        egret.Tween.get(this).to({ left: 20 }, 200).to({ left: 0 }, 120, egret.Ease.backIn);
    };
    RankPanel.prototype.setOutAnime = function (panelName) {
        if (panelName == UIModuleName.RankPanel) {
            this.removeAnime();
            this.left = 0;
            egret.Tween.get(this).to({ left: -this.width }, 400, egret.Ease.backOut).call(this.tweenClose, this);
        }
    };
    RankPanel.prototype.removeAnime = function () {
        egret.Tween.removeTweens(this);
    };
    RankPanel.prototype.onCloseBtnClickHandler = function (event) {
        if (event) {
            if (event.target instanceof eui.Button) {
                SoundManager.playEffect(MusicAction.close);
            }
        }
        if (!this.isTweenCloseing) {
            this.onTweenOver(); //打开面板动画，还未播放完毕，就触发了关闭 则清除打开状态
            this.isTweenCloseing = true;
            this.setOutAnime(UIModuleName.RankPanel);
        }
    };
    return RankPanel;
}(BasePanel));
__reflect(RankPanel.prototype, "RankPanel");
var RankTabType;
(function (RankTabType) {
    /**
     * 财富
     */
    RankTabType[RankTabType["Gold"] = 0] = "Gold";
    /**
     * 等级
     */
    RankTabType[RankTabType["Level"] = 1] = "Level";
    /**
     * Vip
     */
    RankTabType[RankTabType["Vip"] = 2] = "Vip";
})(RankTabType || (RankTabType = {}));
var RankListType;
(function (RankListType) {
    /**
     * 所有
     */
    RankListType[RankListType["All"] = 0] = "All";
    /**
     * 朋友
     */
    RankListType[RankListType["Friend"] = 1] = "Friend";
})(RankListType || (RankListType = {}));
//# sourceMappingURL=RankPanel.js.map