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
 * 好友申请红点通知处理
 */
var NewFriendNotifyHandler = (function (_super) {
    __extends(NewFriendNotifyHandler, _super);
    function NewFriendNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewFriendNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        FriendManager.onRefreshInfoEvent.addListener(this.refresh, this);
        FriendManager.onReceiveFriendRequestEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(NewFriendNotifyHandler.prototype, "count", {
        get: function () {
            if (FriendManager.requestFriendList && FriendManager.requestFriendList.length > 0) {
                return 1;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    NewFriendNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    NewFriendNotifyHandler.prototype.destroy = function () {
        FriendManager.onRefreshInfoEvent.removeListener(this.refresh, this);
        FriendManager.onReceiveFriendRequestEvent.removeListener(this.refresh, this);
    };
    return NewFriendNotifyHandler;
}(BaseNotifyHandle));
__reflect(NewFriendNotifyHandler.prototype, "NewFriendNotifyHandler");
//# sourceMappingURL=NewFriendNotifyHandler.js.map