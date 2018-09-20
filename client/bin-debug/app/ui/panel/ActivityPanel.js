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
 * 活动中心面板
 */
var ActivityPanel = (function (_super) {
    __extends(ActivityPanel, _super);
    function ActivityPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ActivityPanel);
        return _this;
    }
    ActivityPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        UIManager.pushResizeGroup(this.resizeGroup);
        UIManager.pushResizeScroller(this.activityScroller, 1180);
        UIUtil.listRenderer(this.activityList, this.activityScroller, ActivityItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    ActivityPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.activityScroller.viewport.scrollV = 0;
        this.refreshList();
    };
    ActivityPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
    };
    ActivityPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
    };
    ActivityPanel.prototype.refreshList = function () {
        UIUtil.writeListInfo(this.activityList, ActivityManager.showList, "id");
    };
    ActivityPanel.prototype.showPrePanelName = function () {
        if (this.prevPanelName == UIModuleName.GamblingPanel) {
            UIManager.showPanel(this.prevPanelName, true);
        }
        else {
            UIManager.showPanel(this.prevPanelName);
        }
    };
    ActivityPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return ActivityPanel;
}(BasePanel));
__reflect(ActivityPanel.prototype, "ActivityPanel");
//# sourceMappingURL=ActivityPanel.js.map