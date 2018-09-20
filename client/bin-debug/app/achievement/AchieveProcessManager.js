var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 成就/任务进度管理
 */
var AchieveProcessManager = (function () {
    function AchieveProcessManager() {
    }
    AchieveProcessManager.Initialize = function (result) {
        AchieveProcessManager.ClearList();
        AchieveProcessManager.initList();
        if (result.data["groupList"]) {
            for (var _i = 0, _a = result.data["groupList"]; _i < _a.length; _i++) {
                var info = _a[_i];
                for (var _b = 0, _c = AchieveProcessManager._list; _b < _c.length; _b++) {
                    var process = _c[_b];
                    if (process.group == info["group"]) {
                        process.init(info["process"]);
                        break;
                    }
                }
            }
        }
        if (result.data["achieveList"]) {
            for (var _d = 0, _e = result.data["achieveList"]; _d < _e.length; _d++) {
                var info = _e[_d];
                for (var _f = 0, _g = UserManager.userInfo.allAchieveList; _f < _g.length; _f++) {
                    var achieveInfo = _g[_f];
                    if (achieveInfo.id == info["id"]) {
                        achieveInfo.isTake = true;
                    }
                }
            }
        }
    };
    /**
     * 根据组查找进度信息
     */
    AchieveProcessManager.getAchieveProcessInfoByGroup = function (group) {
        for (var _i = 0, _a = AchieveProcessManager._list; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.group == group) {
                return info;
            }
        }
        return null;
    };
    /**
     * 根据任务大类查找进度列表
     */
    AchieveProcessManager.getAchieveProcessListByTag = function (tag) {
        var list = new Array();
        for (var _i = 0, _a = AchieveProcessManager._list; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.tag == tag) {
                list.push(info);
            }
        }
        return list;
    };
    /**
     * 根据组生成进度类
     */
    AchieveProcessManager.GetProcess = function (group) {
        var process;
        switch (group) {
            case AchieveGroup.GoldGroup:
                process = new GoldProcess(group);
                break;
            case AchieveGroup.FriendGroup:
                process = new FriendProcess(group);
                break;
            case AchieveGroup.LevelGroup:
                process = new LevelProcess(group);
                break;
            case AchieveGroup.OnePairGroup:
                process = new OnePairProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.TwoPairsGroup:
                process = new TwoPairsProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.ThreeOfAKindGroup:
                process = new ThreeOfAKindProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.StraightGroup:
                process = new StraightProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.FlushGroup:
                process = new FlushProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.FullhouseGroup:
                process = new FullhouseProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.FourOfAKindGroup:
                process = new FourOfAKindProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.StraightFlushGroup:
                process = new StraightFlushProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.RoyalFlushGroup:
                process = new RoyalFlushProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.PrimaryPatternGroup:
                process = new PrimaryPatternProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.MiddlePatternGroup:
                process = new MiddlePatternProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.HighPatternGroup:
                process = new HighPatternProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.WinGroup:
                process = new WinProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.LevelUpGroup:
                process = new LevelUpProcess(group);
                break;
            case AchieveGroup.JoinMTTGroup:
                process = new JoinMTTProcess(group);
                break;
            case AchieveGroup.WinMTTGroup:
                process = new WinMTTProcess(group);
                break;
            case AchieveGroup.HWFunPatternGroup:
                process = new HundredWarFunPatternProcess(group);
                break;
            case AchieveGroup.HWRichPatternGroup:
                process = new HundredWarRichPatternProcess(group);
                break;
            case AchieveGroup.WinHWGroup:
                process = new WinHundredWarProcess(group);
                break;
        }
        return process;
    };
    AchieveProcessManager.initList = function () {
        if (!AchieveProcessManager._list) {
            AchieveProcessManager._list = new Array();
        }
        if (!AchieveProcessManager._playOverList) {
            AchieveProcessManager._playOverList = new AchieveProcessInfoList(AchieveType.PlayOver);
        }
        for (var _i = 0, _a = AchieveDefined.GetInstance().getAchieveGroup(); _i < _a.length; _i++) {
            var group = _a[_i];
            var achieveInfo = AchieveProcessManager.GetProcess(group);
            if (achieveInfo.group == AchieveGroup.LevelUpGroup || achieveInfo.group == AchieveGroup.LevelGroup) {
                achieveInfo.init(UserManager.userInfo.level);
            }
            else if (achieveInfo.group == AchieveGroup.GoldGroup) {
                achieveInfo.init(UserManager.userInfo.maxGold);
            }
            else {
                achieveInfo.init(0);
            }
            AchieveProcessManager._list.push(achieveInfo);
        }
    };
    /**
     * 重登陆的时候清除list里的信息和事件
     */
    AchieveProcessManager.ClearList = function () {
        if (AchieveProcessManager._list != null) {
            for (var i = 0; i < AchieveProcessManager._list.length; i++) {
                AchieveProcessManager._list[i].destroy();
            }
            qin.ArrayUtil.Clear(AchieveProcessManager._list);
        }
    };
    /**
     * 根据类型创建监听
     */
    AchieveProcessManager.addProcessListener = function (type, callback, thisObj) {
        switch (type) {
            case AchieveType.Gold:
                UserManager.propertyChangeEvent.addListener(callback, thisObj);
                break;
            case AchieveType.Friend:
                FriendManager.onRefreshInfoEvent.addListener(callback, thisObj);
                break;
            case AchieveType.Level:
                UserManager.levelUpgrade.addListener(callback, thisObj);
            case AchieveType.PlayOver:
                GamblingManager.RoundOverEvent.addListener(callback, thisObj);
                break;
        }
    };
    /**
    * 根据类型移除监听
    */
    AchieveProcessManager.removeProcessListener = function (type, callback, thisObj) {
        switch (type) {
            case AchieveType.Gold:
                UserManager.propertyChangeEvent.removeListener(callback, thisObj);
                break;
            case AchieveType.Friend:
                FriendManager.onRefreshInfoEvent.removeListener(callback, thisObj);
                break;
            case AchieveType.Level:
                UserManager.levelUpgrade.removeListener(callback, thisObj);
            case AchieveType.PlayOver:
                GamblingManager.RoundOverEvent.addListener(callback, thisObj);
                break;
        }
    };
    /**
     * 通过不同游戏场 对局 后的进度更新
     */
    AchieveProcessManager.onWinOfPlayField = function (processInfo, type) {
        var overInfo = GamblingManager.roundOverInfo;
        if (overInfo && InfoUtil.checkAvailable(GamblingManager.roomInfo) && type == AchievementManager.playingFieldTypeToAchieveShowPattern(GamblingManager.roomInfo.definition.type) && AchieveProcessManager.isOnPlay()) {
            processInfo.process++;
        }
    };
    /**
     * 通过百人大战不同场次 对局 后的进度更新
     */
    AchieveProcessManager.onPlayHWField = function (processInfo, type) {
        if (InfoUtil.checkAvailable(HundredWarManager.roomInfo) && HundredWarManager.roomInfo.definition.type == type && HundredWarManager.getThisBetGold() != 0) {
            processInfo.process++;
        }
    };
    /**
     * 是否在游玩
     */
    AchieveProcessManager.isOnPlay = function () {
        if (GamblingManager.self && GamblingManager.self.state != PlayerState.WaitNext) {
            return true;
        }
        return false;
    };
    /**
     * 通过牌型胜利后的进度更新
     */
    AchieveProcessManager.onWinOfCardType = function (processInfo, type) {
        if (GamblingUtil.isWin(UserManager.userInfo.roleId)) {
            var cardInfoList = GamblingManager.roomInfo.handCard;
            if (cardInfoList) {
                CardTypeMatchUtil.matchCardInRoom(cardInfoList);
                if (CardTypeMatchUtil.cardType == type) {
                    processInfo.process++;
                    processInfo.init(processInfo.process);
                }
            }
        }
    };
    /**
     * 任务进度更新事件
     */
    AchieveProcessManager.processUpdateEvent = new qin.DelegateDispatcher();
    return AchieveProcessManager;
}());
__reflect(AchieveProcessManager.prototype, "AchieveProcessManager");
//# sourceMappingURL=AchieveProcessManager.js.map