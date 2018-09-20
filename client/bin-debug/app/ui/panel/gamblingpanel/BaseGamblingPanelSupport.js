var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌局面板支持
 */
var BaseGamblingPanelSupport = (function () {
    function BaseGamblingPanelSupport(panel) {
        this.target = panel;
    }
    BaseGamblingPanelSupport.prototype.initialize = function () {
        this.isDisabled = false;
    };
    BaseGamblingPanelSupport.prototype.onEnable = function () {
        this.isDisabled = false;
    };
    BaseGamblingPanelSupport.prototype.onDisable = function () {
        this.isDisabled = true;
    };
    BaseGamblingPanelSupport.prototype.clear = function () {
    };
    return BaseGamblingPanelSupport;
}());
__reflect(BaseGamblingPanelSupport.prototype, "BaseGamblingPanelSupport");
//# sourceMappingURL=BaseGamblingPanelSupport.js.map