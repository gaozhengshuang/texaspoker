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
 * 比赛3分钟开始倒计时提醒面板
 */
var ThreeMinRemindPanel = (function (_super) {
    __extends(ThreeMinRemindPanel, _super);
    function ThreeMinRemindPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ThreeMinRemindPanel);
        return _this;
    }
    ThreeMinRemindPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    ThreeMinRemindPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    ThreeMinRemindPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    ThreeMinRemindPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        ChampionshipManager.mttRemindStartHandler.ResetThreeMinFlagEvent.addListener(this.resetThreeMinFlag, this);
    };
    ThreeMinRemindPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        ChampionshipManager.mttRemindStartHandler.ResetThreeMinFlagEvent.removeListener(this.resetThreeMinFlag, this);
    };
    /**
     * 重置3分钟横幅打开开关
    */
    ThreeMinRemindPanel.prototype.resetThreeMinFlag = function () {
        ChampionshipManager.mttRemindStartHandler.resetThreeMinFlag();
    };
    return ThreeMinRemindPanel;
}(BaseBannerRemindPanel));
__reflect(ThreeMinRemindPanel.prototype, "ThreeMinRemindPanel");
//# sourceMappingURL=ThreeMinRemindPanel.js.map