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
 * 任务面板
 */
var AssignmentPanel = (function (_super) {
    __extends(AssignmentPanel, _super);
    function AssignmentPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.AssignmentPanel);
        return _this;
    }
    AssignmentPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.prevPanelName = UIModuleName.GameHallPanel;
        this.assignmentTab.build(TabComponent.CreatData(["每日任务", "每周任务", "成长任务"], [this.achieveGroup, this.achieveGroup, this.achieveGroup], TabButtonType.BigOf3));
        UIUtil.listRenderer(this.achieveList, this.achieveScroller, AssignmentItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        egret.callLater(this.addRedPoint, this);
        UIManager.pushResizeScroller(this.achieveScroller, 1020);
    };
    AssignmentPanel.prototype.addRedPoint = function () {
        var btn = this.assignmentTab.getBtnByLabel("每日任务");
        UIUtil.addSingleNotify(btn, NotifyType.Achieve_HaveDaily, 8, 38);
        btn = this.assignmentTab.getBtnByLabel("每周任务");
        UIUtil.addSingleNotify(btn, NotifyType.Achieve_HaveWeekly, 8, 38);
        btn = this.assignmentTab.getBtnByLabel("成长任务");
        UIUtil.addSingleNotify(btn, NotifyType.Achieve_HaveGrowUp, 8, 38);
    };
    AssignmentPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.assignmentTab.init(0);
        this.achieveScroller.viewport.scrollV = 0;
        this.refreshList();
    };
    AssignmentPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.assignmentTab.tabChangeEvent.addListener(this.onBarItemTap, this);
        AchievementManager.achieveChangeEvent.addListener(this.refreshList, this);
        AchievementManager.getAchievementPrizeEvent.addListener(this.refreshList, this);
    };
    AssignmentPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.assignmentTab.tabChangeEvent.removeListener(this.onBarItemTap, this);
        AchievementManager.achieveChangeEvent.removeListener(this.refreshList, this);
        AchievementManager.getAchievementPrizeEvent.removeListener(this.refreshList, this);
    };
    AssignmentPanel.prototype.refreshList = function () {
        var list = AchievementManager.getShowAchieveListByType(this.assignmentTab.lastIndex + 1);
        UIUtil.writeListInfo(this.achieveList, list, "id", true, SortUtil.showAchieveListSort);
    };
    AssignmentPanel.prototype.onBarItemTap = function (index) {
        this.refreshList();
    };
    AssignmentPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return AssignmentPanel;
}(BasePanel));
__reflect(AssignmentPanel.prototype, "AssignmentPanel");
//# sourceMappingURL=AssignmentPanel.js.map