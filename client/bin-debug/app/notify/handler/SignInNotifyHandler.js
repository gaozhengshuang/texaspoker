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
 * 签到红点通知处理
 */
var SignInNotifyHandler = (function (_super) {
    __extends(SignInNotifyHandler, _super);
    function SignInNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignInNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        ActivityManager.signInHandler.signInCompleteEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(SignInNotifyHandler.prototype, "count", {
        get: function () {
            if (ActivityManager.signInHandler.isSignToday()) {
                return 0;
            }
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    SignInNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    SignInNotifyHandler.prototype.destroy = function () {
        ActivityManager.signInHandler.signInCompleteEvent.removeListener(this.refresh, this);
    };
    return SignInNotifyHandler;
}(BaseNotifyHandle));
__reflect(SignInNotifyHandler.prototype, "SignInNotifyHandler");
//# sourceMappingURL=SignInNotifyHandler.js.map