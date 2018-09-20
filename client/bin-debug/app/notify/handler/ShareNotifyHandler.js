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
 * 分享有可用的抽奖次数消息通知处理
 */
var ShareNotifyHandler = (function (_super) {
    __extends(ShareNotifyHandler, _super);
    function ShareNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShareNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        ActivityManager.onReqSingleActivityEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(ShareNotifyHandler.prototype, "count", {
        get: function () {
            var info = ActivityManager.getOpenAchivityByType(ActivityType.Share);
            if (info && info.step > 0 && !(info.gotJsonObj.length && info.gotJsonObj.length > 0)) {
                return 1;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    ShareNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    ShareNotifyHandler.prototype.destroy = function () {
        ActivityManager.onReqSingleActivityEvent.removeListener(this.refresh, this);
    };
    return ShareNotifyHandler;
}(BaseNotifyHandle));
__reflect(ShareNotifyHandler.prototype, "ShareNotifyHandler");
//# sourceMappingURL=ShareNotifyHandler.js.map