var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 已报名锦标赛开始提醒管理
 */
var MTTRemindStartHandler = (function () {
    function MTTRemindStartHandler() {
        /**
         * 横幅面板打开开关
        */
        this.minuteOpenFlag = true;
        /**
         * 3分钟横幅打开开关
        */
        this.threeMinOpenFlag = true;
        /**
         *重置3分钟横幅提醒打开开关广播
        */
        this.ResetThreeMinFlagEvent = new qin.DelegateDispatcher();
    }
    MTTRemindStartHandler.prototype.initialize = function () {
        if (!this.joinedMTTList) {
            this.joinedMTTList = new Array();
        }
        if (!this.hadRemindJoinedMTT) {
            this.hadRemindJoinedMTT = new Array();
        }
        for (var _i = 0, _a = ChampionshipManager.joinMTTList; _i < _a.length; _i++) {
            var matchInfo = _a[_i];
            if (matchInfo.definition && matchInfo.definition.type == MatchType.MTT) {
                this.joinedMTTList.push(matchInfo);
            }
        }
        qin.Tick.AddSecondsInvoke(this.countDown, this);
    };
    MTTRemindStartHandler.prototype.onEnable = function () {
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
        qin.ArrayUtil.Clear(this.joinedMTTList);
        qin.ArrayUtil.Clear(this.waitRemindMTTList);
        this.firstStartMTT = null;
        this.minuteOpenFlag = true;
    };
    /**
     * 坐满即玩赛事开赛提醒
    */
    MTTRemindStartHandler.prototype.sitAndPlayStartRemind = function () {
        for (var _i = 0, _a = ChampionshipManager.processMTTList; _i < _a.length; _i++) {
            var joinedMatch = _a[_i];
            if (InfoUtil.checkAvailable(joinedMatch) && joinedMatch.definition.type == MatchType.SNG && joinedMatch.join >= joinedMatch.definition.bNum && !joinedMatch.outTime && joinedMatch.joinWay) {
                joinedMatch.startTime = TimeManager.GetServerUtcTimestamp(); //人数满时就是赛事开始时间
                if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.recordId == joinedMatch.recordId) {
                    GamblingManager.matchRoomInfo.startTime = joinedMatch.startTime;
                }
                if (!joinedMatch.isRemineded) {
                    var enterMatch = ChampionshipManager.getMathInfoByRecordId(joinedMatch.recordId);
                    if (enterMatch) {
                        joinedMatch.isRemineded = true;
                        if (SceneManager.sceneType == SceneType.Game && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.recordId == enterMatch.recordId) {
                            return;
                        }
                        UIManager.showPanel(UIModuleName.SitAndPlayStartRemindPanel, { countDownNum: 8, startMatch: enterMatch });
                    }
                    else {
                        AlertManager.showAlert("获取赛事信息异常");
                    }
                    break;
                }
            }
        }
    };
    /**
     * 清除已经进行过20秒提醒的数据
    */
    MTTRemindStartHandler.prototype.clearHadRemindMTT = function () {
        qin.ArrayUtil.Clear(this.hadRemindJoinedMTT);
    };
    /**
     * 比赛3分钟开始横幅提醒推送对应的操作
    */
    MTTRemindStartHandler.prototype.onThreeMinStartPush = function (recordId) {
        if (SceneManager.sceneType == SceneType.Game && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.recordId == recordId) {
            return;
        }
        UIManager.showPanel(UIModuleName.ThreeMinRemindPanel, "您报名的比赛将于3分钟后开始！");
    };
    /**
    * 比赛1分钟开始横幅提醒推送对应的操作
   */
    MTTRemindStartHandler.prototype.onMinuteStartPush = function (countDownNum, recordId) {
        if (SceneManager.sceneType == SceneType.Game && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.recordId == recordId) {
            return;
        }
        UIManager.showPanel(UIModuleName.MinuteRemindPanel, { countDownNum: countDownNum, recordId: recordId });
    };
    /**
     * 比赛20秒开始弹窗提醒推送对应的操作
    */
    MTTRemindStartHandler.prototype.onSecondStartPush = function (countDownNum, recordId) {
        if (SceneManager.sceneType == SceneType.Game && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.recordId == recordId) {
            return;
        }
        UIManager.showPanel(UIModuleName.SecondRemindPanel, { countDownNum: countDownNum, recordId: recordId });
    };
    /**
     * 倒计时已报名的MTT赛事
    */
    MTTRemindStartHandler.prototype.countDown = function () {
        if (this.joinedMTTList) {
            for (var i = 0; i < this.joinedMTTList.length; i++) {
                var joinMTTinfo = new MatchRoomInfo();
                joinMTTinfo = this.joinedMTTList[i];
                var countDownNum = Math.floor(joinMTTinfo.startTime - TimeManager.GetServerUtcTimestamp());
                if (countDownNum == 180) {
                    if (this.threeMinOpenFlag) {
                        this.onThreeMinStartPush(joinMTTinfo.recordId);
                        this.threeMinOpenFlag = false;
                    }
                }
                if (countDownNum <= 60 && countDownNum > 0) {
                    if (this.minuteOpenFlag) {
                        if (!this.firstStartMTT) {
                            this.firstStartMTT = new MatchRoomInfo();
                        }
                        this.firstStartMTT = joinMTTinfo;
                        this.onMinuteStartPush(countDownNum, joinMTTinfo.recordId);
                        this.minuteOpenFlag = false;
                    }
                    else {
                        if (!this.waitRemindMTTList) {
                            this.waitRemindMTTList = new Array();
                        }
                        if (this.waitRemindMTTList.indexOf(joinMTTinfo) == -1 && joinMTTinfo.recordId != this.firstStartMTT.recordId) {
                            this.waitRemindMTTList.push(joinMTTinfo);
                            this.joinedMTTList.splice(i, 1);
                        }
                    }
                }
                if (countDownNum <= 20 && countDownNum > 0) {
                    var secondRemindFlag = true;
                    for (var _i = 0, _a = this.hadRemindJoinedMTT; _i < _a.length; _i++) {
                        var hadRemindJoinedMTTInfo = _a[_i];
                        if (hadRemindJoinedMTTInfo.recordId == joinMTTinfo.recordId) {
                            secondRemindFlag = false;
                            break;
                        }
                    }
                    if (secondRemindFlag) {
                        this.onSecondStartPush(countDownNum, joinMTTinfo.recordId);
                        this.hadRemindJoinedMTT.push(joinMTTinfo);
                    }
                }
            }
        }
    };
    /**
     * 等待提醒的MTT赛事开始提醒
    */
    MTTRemindStartHandler.prototype.waitCounDown = function () {
        if (this.waitRemindMTTList && this.waitRemindMTTList.length > 0) {
            this.minuteOpenFlag = true;
            for (var i = 0; i < this.waitRemindMTTList.length; i++) {
                var joinMTTinfo = new MatchRoomInfo();
                joinMTTinfo = this.waitRemindMTTList[i];
                var countDownNum = Math.floor(joinMTTinfo.startTime - TimeManager.GetServerUtcTimestamp());
                if (countDownNum <= 60 && countDownNum > 0) {
                    if (this.minuteOpenFlag) {
                        this.onMinuteStartPush(countDownNum, joinMTTinfo.recordId);
                        this.minuteOpenFlag = false;
                    }
                }
                if (countDownNum <= 20 && countDownNum > 0) {
                    this.onSecondStartPush(countDownNum, joinMTTinfo.recordId);
                    this.waitRemindMTTList.splice(i, 1);
                    qin.Tick.RemoveSecondsInvoke(this.waitCounDown, this);
                }
                if (countDownNum <= 0) {
                    this.waitRemindMTTList.splice(i, 1);
                    qin.Tick.RemoveSecondsInvoke(this.waitCounDown, this);
                }
            }
        }
    };
    /**
     * 倒计时等待队列中的MTT赛事
    */
    MTTRemindStartHandler.prototype.remindWaitMTT = function () {
        qin.Tick.AddSecondsInvoke(this.waitCounDown, this);
    };
    /**
     * 重置3分钟横幅提醒打开开关
    */
    MTTRemindStartHandler.prototype.resetThreeMinFlag = function () {
        this.threeMinOpenFlag = true;
    };
    return MTTRemindStartHandler;
}());
__reflect(MTTRemindStartHandler.prototype, "MTTRemindStartHandler");
//# sourceMappingURL=MTTHandler.js.map