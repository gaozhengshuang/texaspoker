var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 计时奖励管理
*/
var TimeAwardHandler = (function () {
    function TimeAwardHandler() {
        /**
         * 开始计时开关
        */
        this.startTimeFlag = true;
        /**
         * 是否处于有效的计时奖励时间
        */
        this.isEffectTime = false;
        /**
         * 是否处于可以领取计时奖励状态
        */
        this.isGetTimeAward = false;
        /**
         * 获取轮数和下次领奖时间的数据成功广播
        */
        this.GetTimeAwardInfoEvent = new qin.DelegateDispatcher();
        /**
         * 获取对应场次计时奖励数据成功广播
        */
        this.getTimeAwardEvent = new qin.DelegateDispatcher();
        /**
         *计时奖励可领取广播
        */
        this.BringTimeAwardEvent = new qin.DelegateDispatcher();
        /**
         *计时进行中广播
        */
        this.TimeAwardCountDownEvent = new qin.DelegateDispatcher();
        /**
         *拉取计时奖励信息成功广播
        */
        this.TimeAwardInfoEvent = new qin.DelegateDispatcher();
    }
    /**
     * 重置
    */
    TimeAwardHandler.prototype.reset = function () {
        this.time = undefined;
        this.round = undefined;
        qin.ArrayUtil.Clear(this.timeAwardList);
    };
    /**
     * 添加监听推送
    */
    TimeAwardHandler.prototype.addPushListener = function () {
        /**
         * 计时奖励时间更新推送
        */
        SocketManager.AddCommandListener(Command.TimeAwardRefresh_Push_2122, this.refreshTimeAwardTime, this);
    };
    /**
     * 初始化
    */
    TimeAwardHandler.prototype.initialize = function (round, time) {
        if (time === void 0) { time = 0; }
        this.reset();
        this.round = round;
        this.time = time;
        this.TimeAwardInfoEvent.dispatch();
    };
    /**
     * 刷新计时奖励时间
    */
    TimeAwardHandler.prototype.refreshTimeAwardTime = function (result) {
        if (result.data) {
            if (result.data.startTime) {
                this.isEffectTime = true;
                if (result.data.secTime) {
                    this.setInitInfo(this.round, result.data.secTime, result.data.startTime);
                }
                if (GamblingManager.timeAwardHandler.startTimeFlag && GamblingManager.self && !GamblingManager.timeAwardHandler.isGetTimeAward) {
                    GamblingManager.timeAwardHandler.startCountDown();
                }
            }
            else if (result.data.secTime) {
                this.isEffectTime = false;
                GamblingManager.timeAwardHandler.stopCountDown();
            }
        }
    };
    /**
     * 拉取计时奖励信息
    */
    TimeAwardHandler.prototype.reqGetTimeAwardInfo = function (roomFieldType) {
        var callback = function (result) {
            if (result.data) {
                if (result.data.round == undefined) {
                    result.data.round = 0;
                }
                if (result.data.round == 0 && result.data.secTime == undefined) {
                    var timeawardDef = TimeAwardDefined.GetInstance().getDefinition(1);
                    this.initialize(0, timeawardDef.time);
                    return;
                }
                if (result.data.round < TimeAwardDefined.GetInstance().dataList.length) {
                    this.setInitInfo(result.data.round, result.data.secTime, result.data.startTime);
                }
                else {
                    this.initialize(result.data.round);
                }
            }
        };
        if (roomFieldType == PlayingFieldType.PlayFieldPersonal) {
            roomFieldType = PlayingFieldType.High;
        }
        SocketManager.call(Command.TimeAwardInfo_Req_3620, { roomType: roomFieldType }, callback, null, this);
    };
    /**
     * 设置计时奖励数据
    */
    TimeAwardHandler.prototype.setInitInfo = function (round, secTime, startTime) {
        var timeawardDef = TimeAwardDefined.GetInstance().getDefinition(round + 1);
        if (timeawardDef) {
            if (secTime < timeawardDef.time) {
                if (startTime == undefined) {
                    this.initialize(round, timeawardDef.time - secTime + 3);
                }
                else {
                    this.initialize(round, timeawardDef.time - (Math.round(TimeManager.GetServerUtcTimestamp()) - startTime + secTime) + 3);
                }
            }
            else {
                this.initialize(round);
            }
        }
    };
    /**
     * 发送领取奖励请求
    */
    TimeAwardHandler.prototype.reqGetTimeAward = function (roomFieldType) {
        SocketManager.call(Command.TimeAwardGet_Req_3621, { roomType: roomFieldType }, this.getTimeAwardResponse, null, this);
    };
    TimeAwardHandler.prototype.getTimeAwardResponse = function (result) {
        PropertyManager.ShowItemList();
        this.round++;
        var def = TimeAwardDefined.GetInstance().getDefinition(this.round + 1);
        if (def) {
            this.time = def.time;
        }
        this.GetTimeAwardInfoEvent.dispatch();
    };
    /**
     * 获取对应场次的计时奖励数据
    */
    TimeAwardHandler.prototype.getTimeAward = function (type) {
        var awardList = TimeAwardDefined.GetInstance().dataList;
        if (awardList) {
            qin.ArrayUtil.Clear(this.timeAwardList);
            if (!this.timeAwardList) {
                this.timeAwardList = new Array();
            }
            for (var _i = 0, awardList_1 = awardList; _i < awardList_1.length; _i++) {
                var def = awardList_1[_i];
                var timeAwardInfo = new TimeAwardInfo();
                timeAwardInfo.num = def.awardList[type - 1];
                if (this.round && def.id <= this.round) {
                    timeAwardInfo.isBring = 1;
                }
                timeAwardInfo.icon = SheetSubName["TimeAwardGold" + def.id];
                this.timeAwardList.push(timeAwardInfo);
            }
        }
        this.getTimeAwardEvent.dispatch();
    };
    TimeAwardHandler.prototype.startCountDown = function () {
        if (GamblingUtil.isMatch || GamblingUtil.isOmaha) {
            return;
        }
        qin.Tick.AddSecondsInvoke(this.countDown, this);
        this.startTimeFlag = false;
    };
    /**
     * 倒计时
    */
    TimeAwardHandler.prototype.countDown = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo)) {
            if (this.time > 0) {
                this.time--;
            }
            this.TimeAwardCountDownEvent.dispatch();
            if (this.time <= 0) {
                this.stopCountDown();
                var def = TimeAwardDefined.GetInstance().getDefinition(this.round + 1);
                if (def) {
                    var num = void 0;
                    num = def.awardList[GamblingManager.roomInfo.definition.type - 1];
                    UIManager.showPanel(UIModuleName.GetTimeAwardRemindPanel, { round: this.round, num: num, pattern: GamblingManager.roomInfo.definition.type });
                }
                this.isGetTimeAward = true;
                this.BringTimeAwardEvent.dispatch();
            }
        }
        else {
            this.stopCountDown();
        }
    };
    /**
     * 停止计时
    */
    TimeAwardHandler.prototype.stopCountDown = function () {
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
        this.startTimeFlag = true;
    };
    return TimeAwardHandler;
}());
__reflect(TimeAwardHandler.prototype, "TimeAwardHandler");
//# sourceMappingURL=TimeAwardHandler.js.map