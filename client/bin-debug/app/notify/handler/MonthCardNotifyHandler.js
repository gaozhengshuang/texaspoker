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
 * 月卡消息通知处理
 */
var MonthCardNotifyHandler = (function (_super) {
    __extends(MonthCardNotifyHandler, _super);
    function MonthCardNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthCardNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        AwardManager.getExChangeInfoEa.addListener(this.refresh, this);
        AwardManager.OnAwardValueChanged.addListener(this.refresh, this);
    };
    Object.defineProperty(MonthCardNotifyHandler.prototype, "count", {
        get: function () {
            if (VipManager.isActiveMonthCard()) {
                if (VipManager.isBringMonthCardAward()) {
                    return 0;
                }
                else {
                    return 1;
                }
            }
            else {
                if (UserManager.isFirstLoginToday) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    MonthCardNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    MonthCardNotifyHandler.prototype.destroy = function () {
        AwardManager.getExChangeInfoEa.removeListener(this.refresh, this);
        AwardManager.OnAwardValueChanged.removeListener(this.refresh, this);
    };
    return MonthCardNotifyHandler;
}(BaseNotifyHandle));
__reflect(MonthCardNotifyHandler.prototype, "MonthCardNotifyHandler");
//# sourceMappingURL=MonthCardNotifyHandler.js.map