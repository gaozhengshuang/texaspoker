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
var AchievementInHundredWarPanel = (function (_super) {
    __extends(AchievementInHundredWarPanel, _super);
    function AchievementInHundredWarPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.AchievementInHundredWarPanel);
        return _this;
    }
    AchievementInHundredWarPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        UIManager.pushResizeGroup(this.anmGroup);
    };
    AchievementInHundredWarPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this._playingFieldPattern = appendData;
        }
        UIUtil.listRenderer(this.achieveList, this.achieveScroller, AchieveInHundredWarItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    AchievementInHundredWarPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.achieveScroller.viewport.scrollV = 0;
        this.refreshList();
    };
    AchievementInHundredWarPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        AchievementManager.achieveChangeEvent.addListener(this.refreshList, this);
        AchievementManager.getAchievementPrizeEvent.addListener(this.refreshList, this);
    };
    AchievementInHundredWarPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        AchievementManager.achieveChangeEvent.removeListener(this.refreshList, this);
        AchievementManager.getAchievementPrizeEvent.removeListener(this.refreshList, this);
    };
    AchievementInHundredWarPanel.prototype.refreshList = function () {
        var list = AchievementManager.getShowAchieveListByPlayType(this._playingFieldPattern);
        UIUtil.writeListInfo(this.achieveList, list, "id", false, SortUtil.showAchieveListSort);
    };
    return AchievementInHundredWarPanel;
}(BasePanel));
__reflect(AchievementInHundredWarPanel.prototype, "AchievementInHundredWarPanel");
//# sourceMappingURL=AchievementInHundredWarPanel.js.map