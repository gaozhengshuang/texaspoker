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
 * 模板面板
 */
var NetworkPanel = (function (_super) {
    __extends(NetworkPanel, _super);
    function NetworkPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "";
        return _this;
    }
    NetworkPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    NetworkPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    NetworkPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    NetworkPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    NetworkPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return NetworkPanel;
}(BasePanel));
__reflect(NetworkPanel.prototype, "NetworkPanel");
//# sourceMappingURL=NetworkPanel.js.map