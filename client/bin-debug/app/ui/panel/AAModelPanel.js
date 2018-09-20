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
var AAModelPanel = (function (_super) {
    __extends(AAModelPanel, _super);
    function AAModelPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "";
        return _this;
    }
    AAModelPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    AAModelPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    AAModelPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    AAModelPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    AAModelPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return AAModelPanel;
}(BasePanel));
__reflect(AAModelPanel.prototype, "AAModelPanel");
//# sourceMappingURL=AAModelPanel.js.map