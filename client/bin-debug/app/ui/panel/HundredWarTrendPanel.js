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
 * 百人大战胜负走势面板
*/
var HundredWarTrendPanel = (function (_super) {
    __extends(HundredWarTrendPanel, _super);
    function HundredWarTrendPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.HundredWarTrendPanel);
        return _this;
    }
    HundredWarTrendPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.recordList, this.recordScroller, HundredWarTrendItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.recordScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.showGroup();
    };
    HundredWarTrendPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        HundredWarManager.panelHandler.reqHundredWarTrendList();
    };
    HundredWarTrendPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    HundredWarTrendPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        HundredWarManager.panelHandler.OnGetHundredWarTrendListEvent.addListener(this.refreshUI, this);
    };
    HundredWarTrendPanel.prototype.refreshUI = function () {
        if (HundredWarManager.panelHandler.HundredWarTrendList.length > 0) {
            this.showGroup(this.recordGroup);
            UIUtil.writeListInfo(this.recordList, HundredWarManager.panelHandler.HundredWarTrendList);
        }
        else {
            this.showGroup(this.noRecordGroup);
        }
    };
    HundredWarTrendPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        HundredWarManager.panelHandler.OnGetHundredWarTrendListEvent.removeListener(this.refreshUI, this);
    };
    HundredWarTrendPanel.prototype.showGroup = function (group) {
        this.recordGroup.visible = false;
        this.noRecordGroup.visible = false;
        if (group) {
            group.visible = true;
        }
    };
    return HundredWarTrendPanel;
}(BasePanel));
__reflect(HundredWarTrendPanel.prototype, "HundredWarTrendPanel");
//# sourceMappingURL=HundredWarTrendPanel.js.map