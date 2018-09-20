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
 * 游戏牌型面板
 */
var GuideCardTypeIntroPanel = (function (_super) {
    __extends(GuideCardTypeIntroPanel, _super);
    function GuideCardTypeIntroPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.GuideCardTypeIntroPanel);
        return _this;
    }
    GuideCardTypeIntroPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.desScroller.viewport = this.desGroup;
        this.desScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        UIUtil.loadBg(ResFixedFileName.Guide_Bg_1, this.bgImg);
        UIManager.pushResizeScroller(this.desScroller, 915);
    };
    GuideCardTypeIntroPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    GuideCardTypeIntroPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GuideCardTypeIntroPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.nextStepBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextStepBtnClick, this);
    };
    GuideCardTypeIntroPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.nextStepBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.nextStepBtnClick, this);
    };
    GuideCardTypeIntroPanel.prototype.nextStepBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.showPanel(this.panelData.panelName, this.panelData);
        this.onCloseBtnClickHandler(null);
    };
    return GuideCardTypeIntroPanel;
}(BasePanel));
__reflect(GuideCardTypeIntroPanel.prototype, "GuideCardTypeIntroPanel");
//# sourceMappingURL=GuideCardTypeIntroPanel.js.map