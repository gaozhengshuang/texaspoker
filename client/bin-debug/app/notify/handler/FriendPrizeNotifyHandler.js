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
 * 好友礼物红点通知处理
 */
var FriendPrizeNotifyHandler = (function (_super) {
    __extends(FriendPrizeNotifyHandler, _super);
    function FriendPrizeNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FriendPrizeNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        FriendManager.onRefreshInfoEvent.addListener(this.refresh, this);
        FriendManager.onReceiveGiftEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(FriendPrizeNotifyHandler.prototype, "count", {
        get: function () {
            if (FriendManager.giftList && FriendManager.giftList.length > 0) {
                return 1;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    FriendPrizeNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    FriendPrizeNotifyHandler.prototype.destroy = function () {
        FriendManager.onRefreshInfoEvent.removeListener(this.refresh, this);
        FriendManager.onReceiveGiftEvent.removeListener(this.refresh, this);
    };
    return FriendPrizeNotifyHandler;
}(BaseNotifyHandle));
__reflect(FriendPrizeNotifyHandler.prototype, "FriendPrizeNotifyHandler");
//# sourceMappingURL=FriendPrizeNotifyHandler.js.map