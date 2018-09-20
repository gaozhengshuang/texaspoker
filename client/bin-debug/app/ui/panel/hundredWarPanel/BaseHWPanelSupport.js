var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 百人大战牌局面板支持
 */
var BaseHWPanelSupport = (function () {
    function BaseHWPanelSupport(panel) {
        this.target = panel;
    }
    BaseHWPanelSupport.prototype.initialize = function () {
        this.isDisabled = false;
    };
    BaseHWPanelSupport.prototype.onEnable = function () {
        this.isDisabled = false;
    };
    BaseHWPanelSupport.prototype.onDisable = function () {
        this.isDisabled = true;
    };
    BaseHWPanelSupport.prototype.clear = function () {
    };
    return BaseHWPanelSupport;
}());
__reflect(BaseHWPanelSupport.prototype, "BaseHWPanelSupport");
//# sourceMappingURL=BaseHWPanelSupport.js.map