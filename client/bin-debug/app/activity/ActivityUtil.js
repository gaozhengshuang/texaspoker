var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 活动工具
 */
var ActivityUtil = (function () {
    function ActivityUtil() {
    }
    /**
     * 是否已经存在子活动信息
     */
    ActivityUtil.isExistSubInfo = function (activityInfo, subId) {
        if (activityInfo && activityInfo.subList) {
            for (var _i = 0, _a = activityInfo.subList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.subId == subId) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 是否可以参与某项活动
     */
    ActivityUtil.isInJoinTime = function (info) {
        if (!InfoUtil.checkAvailable(info) || info.startDateTime == undefined) {
            return false;
        }
        if (info.definition.joinTime == undefined) {
            return true;
        }
        if (ActivityUtil.getActivityOpenState(info) != ActivityOpenState.Open) {
            return false;
        }
        var dt = TimeManager.GetServerLocalDateTime();
        var outOfTime = Math.round(dt.getTime() - info.startDateTime.getTime() / 1000);
        if (info.definition.joinTime <= outOfTime) {
            return false;
        }
        return true;
    };
    /**
    * 根据配置表数据获取活动状态
    */
    ActivityUtil.getActivityOpenState = function (info) {
        if (!InfoUtil.checkAvailable(info)) {
            return ActivityOpenState.None;
        }
        var dt = TimeManager.GetServerLocalDateTime();
        if (info.definition.isByServerTime) {
            if (dt >= info.severStartDateTime && dt < info.severEndDateTime) {
                return ActivityOpenState.Open;
            }
            return ActivityOpenState.End;
        }
        if (dt < info.startDateTime) {
            return ActivityOpenState.UnOpen;
        }
        if (dt > info.endDateTime) {
            return ActivityOpenState.End;
        }
        if (dt >= info.startDateTime && dt < info.endDateTime) {
            return ActivityOpenState.Open;
        }
        return ActivityOpenState.None;
    };
    /**
     * 设置活动信息的开始时间
     */
    ActivityUtil.setStartTime = function (info) {
        info.startDateTime = info.definition.startDt;
        if (ActivityUtil.IsOpenServerActivity(info.definition) && UserManager.userInfo.openServerTime > 0) {
            if (info.definition.openServerTimeStart > 0) {
                info.startDateTime = qin.DateTimeUtil.secondes2Date(UserManager.userInfo.openServerTime + info.definition.openServerTimeStart);
            }
            else {
                info.startDateTime = qin.DateTimeUtil.secondes2Date(UserManager.userInfo.openServerTime);
            }
        }
        else if (ActivityUtil.IsCreateRoleActivity(info.definition) && UserManager.userInfo.createdTime > 0) {
            if (info.definition.keepDayStart > 0) {
                info.startDateTime = qin.DateTimeUtil.secondes2Date(UserManager.userInfo.createdTime + info.definition.keepDayStart);
            }
            else {
                info.startDateTime = qin.DateTimeUtil.secondes2Date(UserManager.userInfo.createdTime);
            }
        }
    };
    /**
     * 设置活动信息的结束时间
     */
    ActivityUtil.setEndTime = function (info) {
        info.endDateTime = info.definition.endDt;
        if (ActivityUtil.IsOpenServerActivity(info.definition)) {
            if (info.definition.openServerTimeEnd > 0 && UserManager.userInfo.openServerTime > 0) {
                info.endDateTime = qin.DateTimeUtil.secondes2Date(UserManager.userInfo.openServerTime + info.definition.openServerTimeEnd);
            }
        }
        else if (ActivityUtil.IsCreateRoleActivity(info.definition)) {
            if (info.definition.keepDayEnd > 0 && UserManager.userInfo.createdTime > 0) {
                info.endDateTime = qin.DateTimeUtil.secondes2Date(UserManager.userInfo.createdTime + info.definition.keepDayEnd);
            }
        }
    };
    /**
     * 是否是开服型活动，开服型活动完成统一不消失
     */
    ActivityUtil.IsOpenServerActivity = function (def) {
        if (def) {
            return def.openServerTimeStart > 0 || def.openServerTimeEnd > 0;
        }
        return false;
    };
    /**
     * 活动是否是创号型活动
     */
    ActivityUtil.IsCreateRoleActivity = function (def) {
        if (def != null) {
            return def.keepDayStart > 0 || def.keepDayEnd > 0;
        }
        return false;
    };
    return ActivityUtil;
}());
__reflect(ActivityUtil.prototype, "ActivityUtil");
//# sourceMappingURL=ActivityUtil.js.map