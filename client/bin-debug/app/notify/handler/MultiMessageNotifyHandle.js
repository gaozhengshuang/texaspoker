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
 * 多条消息的组合通知
 */
var MultiMessageNotifyHandle = (function (_super) {
    __extends(MultiMessageNotifyHandle, _super);
    function MultiMessageNotifyHandle(params) {
        var _this = _super.call(this, params[0]) || this;
        _this._types = params;
        return _this;
    }
    MultiMessageNotifyHandle.prototype.init = function () {
        _super.prototype.init.call(this);
        NotifyManager.OnNotifyValueChanged.addListener(this.notifyManager_OnNotifyValueChanged, this);
    };
    MultiMessageNotifyHandle.prototype.notifyManager_OnNotifyValueChanged = function (data) {
        if (data.type != this.type && this._types && this._types.indexOf(data.type) != -1) {
            this.dispatchNotify();
        }
    };
    Object.defineProperty(MultiMessageNotifyHandle.prototype, "count", {
        get: function () {
            var result = 0;
            if (this._types.length > 1) {
                for (var i = 1; i < this._types.length; i++) {
                    result += NotifyManager.getCount(this._types[i]);
                }
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    return MultiMessageNotifyHandle;
}(BaseNotifyHandle));
__reflect(MultiMessageNotifyHandle.prototype, "MultiMessageNotifyHandle");
//# sourceMappingURL=MultiMessageNotifyHandle.js.map