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
 * 德州转转转排行榜面板
 */
var ShimTaeYoonRankPanel = (function (_super) {
    __extends(ShimTaeYoonRankPanel, _super);
    function ShimTaeYoonRankPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ShimTaeYoonRankPanel);
        return _this;
    }
    ShimTaeYoonRankPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.rankTypeTab.build(TabComponent.CreatData(["今天", "昨天"], [this.rankGroup, this.rankGroup], TabButtonType.LaBa2));
        this.rankTypeTab.isTween = false;
        this.listTypeTab.isTween = false;
        UIUtil.listRenderer(this.rankList, this.rankScroller, ShimTaeYoonRankItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    ShimTaeYoonRankPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (!this._bottomList) {
            this._bottomList = new Array();
            if (appendData) {
                this._bottomList = LaBaDefined.GetInstance().getBottomList(appendData.id);
            }
            var arrDes = new Array();
            var arrGroup = new Array();
            for (var i = this._bottomList.length - 1; i >= 0; i--) {
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
    };
    ShimTaeYoonRankPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    ShimTaeYoonRankPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.rankTypeTab.tabChangeEvent.addListener(this.onRankTypeTabTap, this);
        this.listTypeTab.tabChangeEvent.addListener(this.onListTypeTabTap, this);
        RankManager.getRankListEvent.addListener(this.getRankList, this);
    };
    ShimTaeYoonRankPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.rankTypeTab.tabChangeEvent.removeListener(this.onRankTypeTabTap, this);
        this.listTypeTab.tabChangeEvent.removeListener(this.onListTypeTabTap, this);
        RankManager.getRankListEvent.removeListener(this.getRankList, this);
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
        this.rankScroller.stopAnimation();
    };
    /**
     * 倒计时拉取奖池信息
    */
    ShimTaeYoonRankPanel.prototype.countDown = function () {
        this._countDownTime--;
        if (this._countDownTime <= 0) {
            this.reqGetRankList();
            qin.Console.log("拉取排行榜信息");
        }
    };
    ShimTaeYoonRankPanel.prototype.getRankList = function (myRank) {
        if (this._currentRankListInfo) {
            var selfRankInfo = RankManager.getRankInfoByRoleId(this._currentRankListInfo.list, UserManager.userInfo.roleId);
            if (selfRankInfo) {
                this.selfRankGroup.visible = true;
                this.noRankLabel.visible = false;
                this.myNameLabel.text = UserManager.userInfo.name;
                this.myRankLabel.text = selfRankInfo.rank.toString();
                this.awardLabel.text = qin.MathUtil.formatNum(selfRankInfo.score);
            }
            else {
                this.selfRankGroup.visible = false;
                this.noRankLabel.visible = true;
            }
            this.refreshUI();
            this._countDownTime = 300;
        }
    };
    /**
     * 渲染信息
    */
    ShimTaeYoonRankPanel.prototype.refreshUI = function () {
        UIUtil.writeListInfo(this.rankList, this._currentRankListInfo.list, "roleId", true);
    };
    ShimTaeYoonRankPanel.prototype.onRankTypeTabTap = function (index) {
        this.currentRankType = index;
        if (index == 0) {
            this.currentRankType = ShimTaeYoonRankType.Today;
        }
        else {
            this.currentRankType = ShimTaeYoonRankType.Yesterday;
        }
        this.currentListNum = this._bottomList[this._bottomList.length - 1];
        this.listTypeTab.setSelectIndex(0);
        this.reqGetRankList();
        this.rankScroller.stopAnimation();
    };
    ShimTaeYoonRankPanel.prototype.onListTypeTabTap = function (index) {
        this.currentListNum = this._bottomList[this._bottomList.length - 1 - index];
        this.reqGetRankList();
        this.rankScroller.stopAnimation();
    };
    /**
     * 发送获取排行榜请求
    */
    ShimTaeYoonRankPanel.prototype.reqGetRankList = function () {
        this._currentRankListInfo = RankManager.getRankListInfo(RankType.Activity, this.panelData.id, this.currentRankType, this.currentListNum);
        if (RankManager.isRefreshRank(this._currentRankListInfo)) {
            RankManager.reqRankList(RankType.Activity, 1, this.panelData.id, this.currentRankType, this.currentListNum);
        }
        else {
            this.refreshUI();
        }
    };
    return ShimTaeYoonRankPanel;
}(BasePanel));
__reflect(ShimTaeYoonRankPanel.prototype, "ShimTaeYoonRankPanel");
//# sourceMappingURL=ShimTaeYoonRankPanel.js.map