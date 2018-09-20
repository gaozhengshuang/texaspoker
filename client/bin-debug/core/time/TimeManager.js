var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 时间管理
 */
var TimeManager = (function () {
    function TimeManager() {
    }
    TimeManager.initialize = function (data) {
        if (data) {
            TimeManager._timeZone = 0;
            if (data["timezone"]) {
                TimeManager._timeZone = data["timezone"];
            }
            TimeManager._loginTimestamp = 0;
            if (data["timestamp"]) {
                TimeManager._loginTimestamp = data["timestamp"];
                TimeManager.SetServerTimestamp(data);
            }
        }
        SocketManager.AddCommandListener(Command.System_Push_ResetTime0_2015, TimeManager.onResetTime, this);
    };
    TimeManager.onResetTime = function (result) {
        TimeManager.resetTime0Event.dispatch();
    };
    TimeManager.SetServerTimestamp = function (data) {
        TimeManager._serverTimestamp = 0;
        if (data["timestamp"]) {
            TimeManager._serverTimestamp = data["timestamp"];
        }
        TimeManager._serverSyncTime = Math.floor(Date.now() / 1000);
    };
    Object.defineProperty(TimeManager, "loginTimestamp", {
        /**
         * 登录时间
         */
        get: function () {
            return TimeManager._loginTimestamp;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取当次登录后的在线时长(秒)
     */
    TimeManager.GetCurrentOnlineLength = function () {
        return TimeManager.GetServerUtcTimestamp() - TimeManager._loginTimestamp;
    };
    /**
     * 获取服务器时区差值(秒)
     */
    TimeManager.GetServerTimeZone = function () {
        return TimeManager._timeZone;
    };
    /**
     *  获取当前服务器UTC时间总秒数（UTC1970年到现在）
     */
    TimeManager.GetServerUtcTimestamp = function () {
        if (TimeManager._serverTimestamp == 0) {
            return 0;
        }
        return TimeManager._serverTimestamp + (Math.floor(Date.now() / 1000) - TimeManager._serverSyncTime);
    };
    /**
     * 获取服务器当前本地时间
     */
    TimeManager.GetServerLocalDateTime = function (offsetHours) {
        if (offsetHours === void 0) { offsetHours = 0; }
        if (offsetHours == 0) {
            return new Date(TimeManager.GetServerUtcTimestamp() * 1000);
        }
        return new Date((TimeManager.GetServerUtcTimestamp() + offsetHours * 3600) * 1000);
    };
    /**
     * 获取当日五点刷新时间点
     */
    TimeManager.GetFiveRefreshLocalTime = function () {
        var date = TimeManager.GetServerLocalDateTime();
        return new Date(date.getFullYear(), date.getMonth(), date.getDay(), 5);
    };
    TimeManager._serverTimestamp = 0; //utc时间，当前服务器时间(秒)
    TimeManager._loginTimestamp = 0; //utc时间，登录的服务器时间(秒)
    /**
     * 零点重置事件
     */
    TimeManager.resetTime0Event = new qin.DelegateDispatcher();
    /**
     * 1970UTC
     */
    TimeManager.Utc1970 = new Date(1970, 0, 1, 0, 0, 0, 0);
    return TimeManager;
}());
__reflect(TimeManager.prototype, "TimeManager");
//# sourceMappingURL=TimeManager.js.map