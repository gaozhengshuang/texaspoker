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
 * 计时奖励红点通知处理
 */
var NewTimeAwardNotifyHandler = (function (_super) {
    __extends(NewTimeAwardNotifyHandler, _super);
    function NewTimeAwardNotifyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewTimeAwardNotifyHandler.prototype.init = function () {
        _super.prototype.init.call(this);
        GamblingManager.timeAwardHandler.BringTimeAwardEvent.addListener(this.refresh, this);
        GamblingManager.timeAwardHandler.TimeAwardInfoEvent.addListener(this.refresh, this);
        GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.addListener(this.refresh, this);
    };
    Object.defineProperty(NewTimeAwardNotifyHandler.prototype, "count", {
        get: function () {
            var len = TimeAwardDefined.GetInstance().dataList.length;
            if ((GamblingManager.timeAwardHandler.round < len && GamblingManager.timeAwardHandler.time > 0) || GamblingManager.timeAwardHandler.round == len || GamblingManager.timeAwardHandler.round == undefined) {
                return 0;
            }
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    NewTimeAwardNotifyHandler.prototype.refresh = function () {
        this.dispatchNotify();
    };
    NewTimeAwardNotifyHandler.prototype.destroy = function () {
        GamblingManager.timeAwardHandler.BringTimeAwardEvent.removeListener(this.refresh, this);
        GamblingManager.timeAwardHandler.TimeAwardInfoEvent.removeListener(this.refresh, this);
        GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.removeListener(this.refresh, this);
    };
    return NewTimeAwardNotifyHandler;
}(BaseNotifyHandle));
__reflect(NewTimeAwardNotifyHandler.prototype, "NewTimeAwardNotifyHandler");
//# sourceMappingURL=NewTimeAwardNotifyHandler.js.map