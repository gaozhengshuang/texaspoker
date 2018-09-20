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
 * 有参数的基本通知
 */
var MultiNotifyHandle = (function (_super) {
    __extends(MultiNotifyHandle, _super);
    function MultiNotifyHandle(type) {
        var _this = _super.call(this, type) || this;
        /**
         * 参数列表，列表里面的参数是对等的
         */
        _this._params = new qin.Dictionary();
        return _this;
    }
    /**
    * 根据id获取数量,需要重写
    */
    MultiNotifyHandle.prototype.getCountByParams = function (params) {
        return this._params.getValue(params);
    };
    MultiNotifyHandle.prototype.clearParams = function () {
        this._params.clear();
    };
    MultiNotifyHandle.prototype.dispatchNotifyByParams = function (params) {
        NotifyManager.dispatchNotify(this.type, params);
    };
    MultiNotifyHandle.prototype.setParams = function (params, count) {
        if (count === void 0) { count = 0; }
        this._params.add(params, count);
    };
    Object.defineProperty(MultiNotifyHandle.prototype, "totalCount", {
        /**
         * 获取总count
         */
        get: function () {
            var values = this._params.getValues();
            var count = 0;
            for (var i = 0; i < values.length; i++) {
                if (values[i] != undefined) {
                    count += values[i];
                }
            }
            return count;
        },
        enumerable: true,
        configurable: true
    });
    MultiNotifyHandle.prototype.dispatchNotify = function () {
        throw new Error("这个方法不能被调用，请调用上面的dispatchNotifyByParams(string id)");
    };
    return MultiNotifyHandle;
}(BaseNotifyHandle));
__reflect(MultiNotifyHandle.prototype, "MultiNotifyHandle");
//# sourceMappingURL=MultiNotifyHandle.js.map