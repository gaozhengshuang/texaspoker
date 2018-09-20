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
 * 引导游戏介绍面板
 */
var GuideGameDescriptionPanel = (function (_super) {
    __extends(GuideGameDescriptionPanel, _super);
    function GuideGameDescriptionPanel() {
        var _this = _super.call(this, true) || this;
        _this.setSkinName(UIModuleName.GuideGameDescriptionPanel);
        return _this;
    }
    GuideGameDescriptionPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = false;
        UIUtil.loadBg(ResFixedFileName.Guide_Bg_1, this.bgImg);
    };
    GuideGameDescriptionPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, TextFixedId.GuidePlayWay);
        this.panelData = appendData;
    };
    GuideGameDescriptionPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GuideGameDescriptionPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.nextStepBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextStepBtnClick, this);
    };
    GuideGameDescriptionPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.nextStepBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.nextStepBtnClick, this);
    };
    GuideGameDescriptionPanel.prototype.nextStepBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        // UIManager.showPanel(this.panelData.panelName, this.panelData);
        if (this.panelData && this.panelData.self) {
            GuideExecutor.guideProcessComplete(this.panelData.self);
        }
        this.onCloseBtnClickHandler(null);
    };
    return GuideGameDescriptionPanel;
}(TextInfoPanel));
__reflect(GuideGameDescriptionPanel.prototype, "GuideGameDescriptionPanel");
//# sourceMappingURL=GuideGameDescriptionPanel.js.map