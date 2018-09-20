var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 基本红点通知处理
 */
var BaseNotifyHandle = (function () {
    function BaseNotifyHandle(type) {
        this.type = type;
        this.init();
    }
    BaseNotifyHandle.prototype.init = function () {
    };
    /**
     * 设置通知的值
     */
    BaseNotifyHandle.prototype.dispatchNotify = function () {
        NotifyManager.dispatchNotify(this.type);
    };
    Object.defineProperty(BaseNotifyHandle.prototype, "count", {
        /**
         * 获取未读消息的数量,如果没有数量，则大于0表示有通知，0表示没有通知
         */
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 重置数据，用于重新登录时清空数据缓存
     */
    BaseNotifyHandle.prototype.reset = function () {
    };
    /**
     * 销毁
     */
    BaseNotifyHandle.prototype.destroy = function () {
    };
    return BaseNotifyHandle;
}());
__reflect(BaseNotifyHandle.prototype, "BaseNotifyHandle");
//# sourceMappingURL=BaseNotifyHandle.js.map