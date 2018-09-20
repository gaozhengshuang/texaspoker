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
 * 有未领取的任务红点通知处理
 */
var AchieveNotifyHandler = (function (_super) {
    __extends(AchieveNotifyHandler, _super);
    function AchieveNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AchieveNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        AchievementManager.getAchievementPrizeEvent.addListener(this.refresh, this);
        AchieveProcessManager.processUpdateEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(AchieveNotifyHandler.prototype, "count", {
        get: function () {
            switch (this.type) {
                case NotifyType.Achieve_HaveDaily:
                    return AchievementManager.isHaveNoTakeByType(AchieveDailyType.Daily) ? 1 : 0;
                case NotifyType.Achieve_HaveWeekly:
                    return AchievementManager.isHaveNoTakeByType(AchieveDailyType.Weekly) ? 1 : 0;
                case NotifyType.Achieve_HaveGrowUp:
                    return AchievementManager.isHaveNoTakeByType(AchieveDailyType.GrowUp) ? 1 : 0;
                case NotifyType.Achieve_PrimaryPattern:
                    return AchievementManager.isHaveNoTakeByPlayType(AchieveShowPattern.PrimaryPattern) ? 1 : 0;
                case NotifyType.Achieve_MiddlePattern:
                    return AchievementManager.isHaveNoTakeByPlayType(AchieveShowPattern.MiddlePattern) ? 1 : 0;
                case NotifyType.Achieve_HighPattern:
                    return AchievementManager.isHaveNoTakeByPlayType(AchieveShowPattern.HighPattern) ? 1 : 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    AchieveNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    AchieveNotifyHandler.prototype.destroy = function () {
        AchievementManager.getAchievementPrizeEvent.removeListener(this.refresh, this);
        AchieveProcessManager.processUpdateEvent.removeListener(this.refresh, this);
    };
    return AchieveNotifyHandler;
}(BaseNotifyHandle));
__reflect(AchieveNotifyHandler.prototype, "AchieveNotifyHandler");
//# sourceMappingURL=AchieveNotifyHandler.js.map