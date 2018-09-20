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
 * 牌局上局回顾面板
*/
var GamblingReviewPanel = (function (_super) {
    __extends(GamblingReviewPanel, _super);
    function GamblingReviewPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.GamblingReviewPanel);
        return _this;
    }
    GamblingReviewPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        UIUtil.listRenderer(this.reviewList, this.reviewScroller, GamblingReviewItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.reviewScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
    };
    GamblingReviewPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.reqReviewInfo();
    };
    GamblingReviewPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GamblingReviewPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        GamblingManager.gamblingReviewHandler.onGetAllPlayerInfoEvent.addListener(this.setPanelInfo, this);
    };
    GamblingReviewPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        GamblingManager.gamblingReviewHandler.onGetAllPlayerInfoEvent.removeListener(this.setPanelInfo, this);
    };
    /**
     * 设置面板数据
    */
    GamblingReviewPanel.prototype.setPanelInfo = function () {
        if (GamblingManager.gamblingReviewHandler.reviewInfoList.length > 0) {
            this.hasReviewGroup.visible = true;
            this.noReviewGroup.visible = false;
            if (GamblingManager.gamblingReviewHandler.reviewInfoList && GamblingManager.gamblingReviewHandler.reviewInfoList.length > 0) {
                UIUtil.writeListInfo(this.reviewList, GamblingManager.gamblingReviewHandler.reviewInfoList, "roleId");
            }
        }
        else {
            this.hasReviewGroup.visible = false;
            this.noReviewGroup.visible = true;
        }
    };
    /**
     * 发送获取上局回顾信息请求
    */
    GamblingReviewPanel.prototype.reqReviewInfo = function () {
        if (this.panelData) {
            GamblingManager.gamblingReviewHandler.reqReviewInfo(this.panelData);
        }
    };
    return GamblingReviewPanel;
}(BasePanel));
__reflect(GamblingReviewPanel.prototype, "GamblingReviewPanel");
//# sourceMappingURL=GamblingReviewPanel.js.map