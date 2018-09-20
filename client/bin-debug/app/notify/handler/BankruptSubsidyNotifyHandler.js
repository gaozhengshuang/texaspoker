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
 * 破产补助通知处理
 */
var BankruptSubsidyNotifyHandler = (function (_super) {
    __extends(BankruptSubsidyNotifyHandler, _super);
    function BankruptSubsidyNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BankruptSubsidyNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.addListener(this.refresh, this);
        UserManager.propertyChangeEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(BankruptSubsidyNotifyHandler.prototype, "count", {
        get: function () {
            if (ActivityManager.bankruptSubsidyHandler.isBankruptSubsidy) {
                return ActivityManager.bankruptSubsidyHandler.getLeftPrizeTimes();
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    BankruptSubsidyNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    BankruptSubsidyNotifyHandler.prototype.destroy = function () {
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.removeListener(this.refresh, this);
    };
    return BankruptSubsidyNotifyHandler;
}(BaseNotifyHandle));
__reflect(BankruptSubsidyNotifyHandler.prototype, "BankruptSubsidyNotifyHandler");
//# sourceMappingURL=BankruptSubsidyNotifyHandler.js.map