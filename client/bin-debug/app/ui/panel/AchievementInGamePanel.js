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
 * 战局中的任务面板
 */
var AchievementInGamePanel = (function (_super) {
    __extends(AchievementInGamePanel, _super);
    function AchievementInGamePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.AchievementInGamePanel);
        return _this;
    }
    AchievementInGamePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        UIManager.pushResizeGroup(this.anmGroup);
    };
    AchievementInGamePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this._playingFieldPattern = appendData;
        }
        UIUtil.listRenderer(this.achieveList, this.achieveScroller, AchieveInGameItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    AchievementInGamePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.achieveScroller.viewport.scrollV = 0;
        this.refreshGold();
        this.refreshList();
    };
    AchievementInGamePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        AchievementManager.achieveChangeEvent.addListener(this.refreshList, this);
        UserManager.propertyChangeEvent.addListener(this.refreshGold, this);
        AchievementManager.getAchievementPrizeEvent.addListener(this.tryClosePanel, this);
    };
    AchievementInGamePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        AchievementManager.achieveChangeEvent.removeListener(this.refreshList, this);
        UserManager.propertyChangeEvent.removeListener(this.refreshGold, this);
        AchievementManager.getAchievementPrizeEvent.removeListener(this.tryClosePanel, this);
    };
    AchievementInGamePanel.prototype.refreshGold = function () {
        this.goldLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
    };
    AchievementInGamePanel.prototype.refreshList = function () {
        var list = AchievementManager.getShowAchieveListByPlayType(this._playingFieldPattern);
        UIUtil.writeListInfo(this.achieveList, list, "id", false, SortUtil.showAchieveListSort);
    };
    AchievementInGamePanel.prototype.tryClosePanel = function () {
        if (AchievementManager.isHaveNoTakeByPlayType(this._playingFieldPattern)) {
            this.refreshList();
        }
        else {
            _super.prototype.onCloseBtnClickHandler.call(this, null);
        }
    };
    return AchievementInGamePanel;
}(BasePanel));
__reflect(AchievementInGamePanel.prototype, "AchievementInGamePanel");
//# sourceMappingURL=AchievementInGamePanel.js.map