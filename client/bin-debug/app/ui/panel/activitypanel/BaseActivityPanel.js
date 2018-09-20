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
 * 活动面板基类
 */
var BaseActivityPanel = (function (_super) {
    __extends(BaseActivityPanel, _super);
    function BaseActivityPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseActivityPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.activityInfo = appendData.info;
    };
    return BaseActivityPanel;
}(BasePanel));
__reflect(BaseActivityPanel.prototype, "BaseActivityPanel");
//# sourceMappingURL=BaseActivityPanel.js.map