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
 * 邀请有奖励可领取消息通知处理
 */
var InviteNotifyHandler = (function (_super) {
    __extends(InviteNotifyHandler, _super);
    function InviteNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InviteNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        InviteManager.OnInviteAwardEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(InviteNotifyHandler.prototype, "count", {
        get: function () {
            if (InviteManager.isCanBring) {
                return 1;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    InviteNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    InviteNotifyHandler.prototype.destroy = function () {
        InviteManager.OnInviteAwardEvent.removeListener(this.refresh, this);
    };
    return InviteNotifyHandler;
}(BaseNotifyHandle));
__reflect(InviteNotifyHandler.prototype, "InviteNotifyHandler");
//# sourceMappingURL=InviteNotifyHandler.js.map