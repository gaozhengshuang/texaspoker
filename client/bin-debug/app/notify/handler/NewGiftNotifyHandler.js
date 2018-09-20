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
 * 新人礼通知处理
 */
var NewGiftNotifyHandler = (function (_super) {
    __extends(NewGiftNotifyHandler, _super);
    function NewGiftNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewGiftNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(NewGiftNotifyHandler.prototype, "count", {
        get: function () {
            var activityInfo = ActivityManager.pilePrizeHandler.getInfoBySubType(ActivitySubType.NewGift);
            if (activityInfo) {
                return ActivityManager.pilePrizeHandler.isHavePrize(activityInfo.id) ? 1 : 0;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    NewGiftNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    NewGiftNotifyHandler.prototype.destroy = function () {
        ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.removeListener(this.refresh, this);
    };
    return NewGiftNotifyHandler;
}(BaseNotifyHandle));
__reflect(NewGiftNotifyHandler.prototype, "NewGiftNotifyHandler");
//# sourceMappingURL=NewGiftNotifyHandler.js.map