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
 * 百人大战聊天消息通知处理
 */
var HundredWarChatNotifyHandler = (function (_super) {
    __extends(HundredWarChatNotifyHandler, _super);
    function HundredWarChatNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HundredWarChatNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        ChatManager.onRefreshChatRedPointEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(HundredWarChatNotifyHandler.prototype, "count", {
        get: function () {
            if (ChatManager.isHaveNewChatMsg) {
                return 1;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    HundredWarChatNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    HundredWarChatNotifyHandler.prototype.destroy = function () {
        ChatManager.onRefreshChatRedPointEvent.removeListener(this.refresh, this);
    };
    return HundredWarChatNotifyHandler;
}(BaseNotifyHandle));
__reflect(HundredWarChatNotifyHandler.prototype, "HundredWarChatNotifyHandler");
//# sourceMappingURL=HundredWarChatNotifyHandler.js.map