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
 * ui模块事件
 */
var UIModuleEvent = (function (_super) {
    __extends(UIModuleEvent, _super);
    function UIModuleEvent(type, pName) {
        var _this = _super.call(this, type) || this;
        /**
         * 面板名
         */
        _this.panelName = qin.StringConstants.Empty;
        _this.panelName = pName;
        return _this;
    }
    /**
     * socket连接超时事件
     */
    UIModuleEvent.OnTimeout = "OnTimeout";
    //面板事件-----
    /**
    * 面传入回调target初始化事件
    */
    UIModuleEvent.OnCallTargetInit = "OnCallTargetInit";
    return UIModuleEvent;
}(egret.Event));
__reflect(UIModuleEvent.prototype, "UIModuleEvent");
//# sourceMappingURL=UIModuleEvent.js.map