var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 成就/任务管理
 */
var AchievementManager = (function () {
    function AchievementManager() {
    }
    AchievementManager.initialize = function (result) {
        TimeManager.resetTime0Event.addListener(this.onResetTime, this);
        if (!AchievementManager.allList) {
            AchievementManager.allList = new Array();
            for (var _i = 0, _a = AchieveDefined.GetInstance().dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                var info = new AchievementInfo();
                info.id = def.id;
                info.isComplete = false;
                info.isTake = false;
                info.isOther = false;
                AchievementManager.allList.push(info);
            }
        }
        AchievementManager.setAllAchieveList(UserManager.userInfo, result);
    };
    /**
     * 拉取某人成就信息
     */
    AchievementManager.reqUserAchieveList = function (info) {
        if (info.roleId == UserManager.userInfo.roleId) {
            info.allAchieveList = UserManager.userInfo.allAchieveList;
            return;
        }
        var callback = function (result) {
            AchievementManager.setAllAchieveList(info, result);
            // AchievementManager.setAchieveInfoByGroupInfo(info, AchieveGroup.GoldGroup, info.maxGold);
            // AchievementManager.setAchieveInfoByGroupInfo(info, AchieveGroup.FriendGroup, info.friendNum);
            // AchievementManager.setAchieveInfoByGroupInfo(info, AchieveGroup.LevelGroup, info.level);
        };
        SocketManager.call(Command.Achievement_GetList_3090, { "roleId": info.roleId }, callback, null, this);
    };
    /**
     * 设置某用户已解锁的成就信息
     */
    AchievementManager.setAllAchieveList = function (info, result) {
        var list = new Array();
        if (AchievementManager.otherProcessList) {
            AchievementManager.otherProcessList.clear();
        }
        else {
            AchievementManager.otherProcessList = new qin.Dictionary();
        }
        if (result.data["groupList"]) {
            for (var _i = 0, _a = result.data["groupList"]; _i < _a.length; _i++) {
                var userInfo = _a[_i];
                var achieveInfoList = AchievementManager.getAchieveListByGroup(AchievementManager.allList, userInfo["group"]);
                AchievementManager.otherProcessList.add(userInfo["group"], userInfo["process"]);
                for (var _b = 0, achieveInfoList_1 = achieveInfoList; _b < achieveInfoList_1.length; _b++) {
                    var achieveInfo = achieveInfoList_1[_b];
                    if (InfoUtil.checkAvailable(achieveInfo) && achieveInfo.definition.para1 <= userInfo["process"]) {
                        var completeInfo = new AchievementInfo();
                        completeInfo.id = achieveInfo.id;
                        completeInfo.isTake = false;
                        completeInfo.isComplete = true;
                        completeInfo.isOther = info.roleId != UserManager.userInfo.roleId;
                        list.push(completeInfo);
                    }
                }
            }
        }
        info.allAchieveList = AchievementManager.getCompleteAchieveInfoDic(list, info);
    };
    /**
     * 通过组进度信息设置已解锁成就信息
     */
    AchievementManager.setAchieveInfoByGroupInfo = function (info, group, process) {
        AchievementManager.otherProcessList.add(group, process);
        var achieveInfoList = AchievementManager.getAchieveListByGroup(AchievementManager.allList, group);
        for (var _i = 0, achieveInfoList_2 = achieveInfoList; _i < achieveInfoList_2.length; _i++) {
            var achieveInfo = achieveInfoList_2[_i];
            if (achieveInfo.definition && achieveInfo.definition.para1 <= process) {
                for (var _a = 0, _b = info.allAchieveList; _a < _b.length; _a++) {
                    var achieveInfoTemp = _b[_a];
                    if (achieveInfoTemp.id == achieveInfo.id) {
                        achieveInfoTemp.isComplete = true;
                        break;
                    }
                }
            }
        }
    };
    /**
     * 生成包括所有成就信息的列表
     */
    AchievementManager.getCompleteAchieveInfoDic = function (list, userInfo) {
        if (list == null || list.length == 0) {
            return AchievementManager.allList;
        }
        var result = new Array();
        for (var i = 0; i < AchievementManager.allList.length; i++) {
            var info = AchievementManager.allList[i];
            var resultInfo = void 0;
            for (var j = 0; j < list.length; j++) {
                if (list[j].id == info.id) {
                    resultInfo = list[j];
                    break;
                }
                else {
                    resultInfo = new AchievementInfo();
                    resultInfo.id = info.id;
                    resultInfo.isTake = false;
                    resultInfo.isComplete = false;
                    resultInfo.isOther = userInfo.roleId != UserManager.userInfo.roleId;
                }
            }
            result.push(resultInfo);
        }
        return result;
    };
    /**
     * 根据tag获取成就/任务列表
     */
    AchievementManager.getAchieveListByTag = function (userInfo, tag) {
        var result = new Array();
        for (var _i = 0, _a = userInfo.allAchieveList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.definition && info.definition.tag == tag) {
                result.push(info);
            }
        }
        return result;
    };
    /**
     * 根据组获取成就/任务列表
     */
    AchievementManager.getAchieveListByGroup = function (list, group) {
        var result = new Array();
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var info = list_1[_i];
            if (info.definition && info.definition.group == group) {
                result.push(info);
            }
        }
        return result;
    };
    /**
     * 接收到推送的回调
     */
    AchievementManager.onGetAchieveInfo = function (result) {
        if (result.data) {
            var info = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, result.data["id"]);
            info.isComplete = true;
            AchievementManager.achieveChangeEvent.dispatch(info);
        }
    };
    /**
     * 通过成就id获取成就信息
     */
    AchievementManager.getAchieveInfoById = function (list, id) {
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var info = list_2[_i];
            if (info.id == id) {
                return info;
            }
        }
        return null;
    };
    /**
    * 获取显示的任务列表
    */
    AchievementManager.getShowAchieveList = function () {
        var list = AchieveProcessManager.getAchieveProcessListByTag(AchieveTag.Quest);
        var result = new Array();
        for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
            var info = list_3[_i];
            if (!info.isTakeComplete) {
                var achieveInfo = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, info.takeStep);
                if (VersionManager.isSafe) {
                    if (achieveInfo.definition.isSafe) {
                        result.push(achieveInfo);
                    }
                }
                else {
                    result.push(achieveInfo);
                }
            }
        }
        return result;
    };
    /**
     * 根据类型查找显示的列表
     */
    AchievementManager.getShowAchieveListByType = function (dailyType) {
        var list = AchievementManager.getShowAchieveList();
        var result = new Array();
        for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
            var info = list_4[_i];
            if (info.definition && info.definition.dailyQuest == dailyType) {
                result.push(info);
            }
        }
        return result;
    };
    /**
     * 根据类型判断是否有未领取的任务
     */
    AchievementManager.isHaveNoTakeByType = function (dailyType) {
        var list = AchievementManager.getShowAchieveListByType(dailyType);
        for (var _i = 0, list_5 = list; _i < list_5.length; _i++) {
            var info = list_5[_i];
            if (info.isComplete == true && info.isTake == false) {
                return true;
            }
        }
        return false;
    };
    /**
     * 根据战局类型查找显示的列表
     */
    AchievementManager.getShowAchieveListByPlayType = function (type) {
        var list = AchievementManager.getShowAchieveList();
        var result = new Array();
        for (var _i = 0, list_6 = list; _i < list_6.length; _i++) {
            var info = list_6[_i];
            if (info.definition) {
                var playingType = info.definition.playingFieldPattern;
                if (playingType == AchieveShowPattern.All || playingType == type) {
                    result.push(info);
                }
                if (playingType == AchieveShowPattern.AllPattern) {
                    if (type == AchieveShowPattern.PrimaryPattern || type == AchieveShowPattern.MiddlePattern || type == AchieveShowPattern.HighPattern) {
                        result.push(info);
                    }
                }
            }
        }
        return result;
    };
    /**
     * 根据战局判断是否有未领取的任务
    */
    AchievementManager.isHaveNoTakeByPlayType = function (type) {
        var list = AchievementManager.getShowAchieveListByPlayType(type);
        for (var _i = 0, list_7 = list; _i < list_7.length; _i++) {
            var info = list_7[_i];
            if (info.isComplete == true && info.isTake == false) {
                return true;
            }
        }
        return false;
    };
    /**
     * 房间类型转换为任务显示显示类型
     */
    AchievementManager.playingFieldTypeToAchieveShowPattern = function (type) {
        switch (type) {
            case PlayingFieldType.Primary:
                return AchieveShowPattern.PrimaryPattern;
            case PlayingFieldType.Middle:
                return AchieveShowPattern.MiddlePattern;
            case PlayingFieldType.High:
                return AchieveShowPattern.HighPattern;
            case PlayingFieldType.Mtt:
                return AchieveShowPattern.Match;
        }
    };
    /**
     * 发送领取成就奖励的请求
     */
    AchievementManager.reqTakeAchievePrize = function (id) {
        PropertyManager.OpenGet();
        SocketManager.call(Command.Achievement_GetPrize_3088, { "Id": id }, AchievementManager.onTakeAchievePrize, null, this);
    };
    AchievementManager.onTakeAchievePrize = function (result) {
        if (result.data && result.data["Id"]) {
            PropertyManager.ShowItemList();
            for (var _i = 0, _a = result.data["Id"]; _i < _a.length; _i++) {
                var id = _a[_i];
                var info = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, id);
                if (info && !info.isTake) {
                    info.isTake = true;
                }
            }
            AchievementManager.getAchievementPrizeEvent.dispatch();
        }
        else {
            UIManager.showFloatTips("领取失败");
        }
    };
    /**
     * 重置任务
     */
    AchievementManager.onResetTime = function (result) {
        AchievementManager.resetAchievement(AchieveDailyType.Daily);
        if (TimeManager.GetServerLocalDateTime().getDay() == WeekDay.Monday) {
            AchievementManager.resetAchievement(AchieveDailyType.Weekly);
        }
    };
    /**
     * 重置任务
     */
    AchievementManager.resetAchievement = function (dailyType) {
        for (var _i = 0, _a = AchieveProcessManager.getAchieveProcessListByTag(AchieveTag.Quest); _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.dailyQuest == dailyType) {
                info.resetProcess();
            }
        }
    };
    /**
    * 成就解锁事件
    */
    AchievementManager.achieveChangeEvent = new qin.DelegateDispatcher();
    /**
     * 领取成就奖励事件
     */
    AchievementManager.getAchievementPrizeEvent = new qin.DelegateDispatcher();
    return AchievementManager;
}());
__reflect(AchievementManager.prototype, "AchievementManager");
//# sourceMappingURL=AchievementManager.js.map