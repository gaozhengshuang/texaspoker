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
 * 新邮件/未领取邮件红点通知处理
 */
var NewMailNotifyHandler = (function (_super) {
    __extends(NewMailNotifyHandler, _super);
    function NewMailNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewMailNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        MailManager.getMailListEvent.addListener(this.refresh, this);
        MailManager.getMailPrizeEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(NewMailNotifyHandler.prototype, "count", {
        get: function () {
            if (this.type == NotifyType.Mail_HaveNewSystem) {
                return MailManager.isHaveNotTakeMailByType(0) ? 1 : 0;
            }
            else if (this.type == NotifyType.Mail_HaveNewPlayer) {
                return MailManager.isHaveNotTakeMailByType(1) ? 1 : 0;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    NewMailNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    NewMailNotifyHandler.prototype.destroy = function () {
        MailManager.getMailListEvent.removeListener(this.refresh, this);
        MailManager.getMailPrizeEvent.removeListener(this.refresh, this);
    };
    return NewMailNotifyHandler;
}(BaseNotifyHandle));
__reflect(NewMailNotifyHandler.prototype, "NewMailNotifyHandler");
//# sourceMappingURL=NewMailNotifyHandler.js.map