var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 活动管理
 */
var ActivityManager = (function () {
    function ActivityManager() {
    }
    ActivityManager.clear = function () {
        ActivityManager._subHandlerList.foreach(function (k, v) {
            v.clear();
        }, this);
        ActivityManager.triggerHandler.clear();
    };
    ActivityManager.initialize = function (result) {
        ActivityManager.clear();
        ActivityManager.triggerHandler.initialize();
        ActivityManager.addHandlers();
        ActivityManager.initActivityList();
        TimeManager.resetTime0Event.addListener(ActivityManager.onTimeReset, this);
        SocketManager.AddCommandListener(Command.Activity_Push_2088, ActivityManager.pushActivityInfo, this);
        if (result.data && result.data.Array) {
            for (var i = 0; i < result.data.Array.length; i++) {
                ActivityManager.setActivityInfo(result.data.Array[i]);
            }
        }
        ActivityManager.checkCompleteHide();
    };
    ActivityManager.addHandlers = function () {
        if (ActivityManager._subHandlerList.count == 0) {
            ActivityManager._subHandlerList.add(ActivityType.Signin, ActivityManager.signInHandler); //此处添加各个活动的子handler
            ActivityManager._subHandlerList.add(ActivityType.PayPrize, ActivityManager.payPrizeHandler);
            ActivityManager._subHandlerList.add(ActivityType.HappyGift, ActivityManager.happyGiftHandler);
            ActivityManager._subHandlerList.add(ActivityType.LaBa, ActivityManager.shimTaeYoonHandler);
            ActivityManager._subHandlerList.add(ActivityType.BankruptSubsidy, ActivityManager.bankruptSubsidyHandler);
            ActivityManager._subHandlerList.add(ActivityType.PilePrize, ActivityManager.pilePrizeHandler);
            ActivityManager._subHandlerList.add(ActivityType.BindChannel, ActivityManager.bindPhoneAwardHandler);
            ActivityManager._subHandlerList.add(ActivityType.Share, ActivityManager.shareLuckDrawHandler);
        }
    };
    /**
     * 请求活动公共数据
     */
    ActivityManager.reqPubJson = function (id) {
        var callback = function (result) {
            if (result.data) {
                ActivityManager.onReqPubJsonEvent.dispatch(result.data);
            }
        };
        SocketManager.call(Command.ActivityPubJoin_Req_3234, { Id: id }, callback, null, this);
    };
    /**
     * 请求参与活动
    */
    ActivityManager.reqJoinActivity = function (Id, SubId, Param1) {
        var callback = function (result) {
            if (result.data) {
                ActivityManager.onJoinActivityEvent.dispatch(result.data);
            }
        };
        if (Param1) {
            SocketManager.call(Command.ActivityJoin_Req_3584, { Id: Id, SubId: SubId, Param1: Param1 }, callback, null, this);
        }
        else {
            SocketManager.call(Command.ActivityJoin_Req_3584, { Id: Id, SubId: SubId }, callback, null, this);
        }
    };
    /**
     * 拉取活动操作记录
    */
    ActivityManager.reqActionRecord = function (id, count, act, idx, roleId) {
        if (idx === void 0) { idx = 0; }
        var callback = function (result) {
            if (result.data && result.data.Array) {
                ActivityManager.OnActionRecordEvent.dispatch(result.data.Array);
            }
        };
        var reqData = new Object();
        reqData["id"] = id;
        reqData["count"] = count;
        reqData["idx"] = idx;
        reqData["act"] = act;
        if (roleId) {
            reqData["roleId"] = roleId;
        }
        SocketManager.call(Command.ActivityActionRecord_Req_3235, reqData, callback, null, this);
    };
    /**
     * 活动中心打开子活动面板
     */
    ActivityManager.showPanelInActivityCenter = function (activityInfo) {
        if (activityInfo.definition) {
            UIManager.showPanel(activityInfo.definition.panelName, { prevPanelName: UIModuleName.ActivityPanel, info: activityInfo });
        }
    };
    /**
     * 获取活动信息
     */
    ActivityManager.getActivityInfo = function (id) {
        for (var _i = 0, _a = ActivityManager.list; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.id == id) {
                return info;
            }
        }
        return null;
    };
    /**
     * 根据类型获得开启的活动（同类型活动只有一个开启）
     */
    ActivityManager.getOpenAchivityByType = function (type) {
        for (var _i = 0, _a = ActivityManager.list; _i < _a.length; _i++) {
            var info = _a[_i];
            var state = ActivityUtil.getActivityOpenState(info);
            if (info.definition && info.definition.type == type && state == ActivityOpenState.Open) {
                return info;
            }
        }
        return null;
    };
    ActivityManager.initActivityList = function () {
        qin.ArrayUtil.Clear(ActivityManager.list);
        ActivityManager._subHandlerList.foreach(function (k, v) { v.clear(); }, this);
        for (var _i = 0, _a = ActivityDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var info = _a[_i];
            var activityInfo = new ActivityInfo();
            activityInfo.id = info.id;
            activityInfo.step = 0;
            activityInfo.jsonObj = {};
            activityInfo.gotJsonObj = {};
            ActivityUtil.setStartTime(activityInfo);
            ActivityUtil.setEndTime(activityInfo);
            var handler = void 0;
            handler = ActivityManager._subHandlerList.getValue(activityInfo.definition.type);
            if (handler) {
                handler.initialize(activityInfo);
            }
            else {
                qin.Console.log("处理活动类型子逻辑异常！TYPE：" + activityInfo.definition.type);
            }
            ActivityManager.triggerHandler.register(activityInfo);
            ActivityManager.list.push(activityInfo);
        }
    };
    /**
     * 显示的活动
     */
    ActivityManager.checkCompleteHide = function () {
        qin.ArrayUtil.Clear(ActivityManager.showList);
        for (var _i = 0, _a = ActivityManager.list; _i < _a.length; _i++) {
            var info = _a[_i];
            if (!info.definition.unInShowPanel) {
                var state = ActivityUtil.getActivityOpenState(info);
                if (state == ActivityOpenState.End) {
                    if (info.definition.showFinish == true) {
                        ActivityManager.showList.push(info);
                    }
                }
                else if (state == ActivityOpenState.Open) {
                    ActivityManager.showList.push(info);
                }
            }
        }
    };
    /**
     * 0点重置
     */
    ActivityManager.onTimeReset = function () {
        SocketManager.call(Command.Activity_GetList_3233, null, ActivityManager.initialize, null, this);
    };
    /**
     * 设置活动信息
     */
    ActivityManager.setActivityInfo = function (data) {
        if (data) {
            var activityInfo = ActivityManager.getActivityInfo(data["Id"]);
            if (activityInfo) {
                activityInfo.step = data["Step"];
                activityInfo.pubStep = data["PubStep"];
                activityInfo.severStartDateTime = data["StartTime"];
                activityInfo.severEndDateTime = data["EndTime"];
                try {
                    if (data["Json"]) {
                        var jsonObj = JSON.parse(data["Json"]);
                        activityInfo.jsonObj = jsonObj;
                    }
                    if (!activityInfo.jsonObj) {
                        activityInfo.jsonObj = {};
                    }
                    if (data["GotJson"]) {
                        var gotJsonObj = JSON.parse(data["GotJson"]); //处理已经领取的奖励信息
                        activityInfo.gotJsonObj = gotJsonObj;
                    }
                    if (!activityInfo.gotJsonObj) {
                        activityInfo.gotJsonObj = {};
                    }
                    var handler = void 0;
                    handler = ActivityManager._subHandlerList.getValue(activityInfo.definition.type);
                    if (handler) {
                        handler.setJson(activityInfo);
                    }
                    else {
                        qin.Console.log("处理活动类型子逻辑异常！TYPE：" + activityInfo.definition.type);
                    }
                }
                catch (e) {
                    qin.Console.log("解析活动协议出错 Json：" + data["Json"]);
                    qin.Console.log("解析活动协议出错 GotJson：" + data["GotJson"]);
                }
            }
        }
    };
    /**
     * 拉取活动信息
     */
    ActivityManager.reqActivityInfo = function (id) {
        var callback = function (result) {
            if (id == 0) {
                ActivityManager.OnActivityGetListEvent.dispatch(result);
            }
            else {
                if (result.data && result.data.Array) {
                    ActivityManager.setActivityInfo(result.data.Array[0]);
                    ActivityManager._subHandlerList.foreach(function (k, v) {
                        v.refreshActivityInfo(id);
                    }, this);
                }
                ActivityManager.onReqSingleActivityEvent.dispatch(id);
            }
        };
        SocketManager.call(Command.Activity_GetList_3233, { "Id": id }, callback, null, this);
    };
    /**
     * 活动信息推送
     */
    ActivityManager.pushActivityInfo = function (result) {
        if (result.data) {
            var id_1 = result.data["Id"];
            ActivityManager.setActivityInfo(result.data);
            ActivityManager._subHandlerList.foreach(function (k, v) {
                if (id_1) {
                    v.refreshActivityInfo(id_1);
                }
            }, this);
            ActivityManager.onPushActivityEvent.dispatch(id_1);
        }
    };
    /**
     * 请求领取活动奖励
     */
    ActivityManager.ReqGetActivityAward = function (activityId, subId, isShowList) {
        if (isShowList === void 0) { isShowList = true; }
        var callback = function (sp) {
            PropertyManager.ShowItemList();
            ActivityManager.getAwardResult(activityId, subId);
        };
        if (isShowList) {
            PropertyManager.OpenGet();
        }
        SocketManager.call(Command.Activity_GetPrize_3202, { "Id": activityId, "SubId": subId }, callback, null, this);
    };
    /**
     * 获取显示的公告栏列表
     */
    ActivityManager.getShowNoticeList = function () {
        var result = new Array();
        if (ImgNotifyDefined.GetInstance().dataList) {
            for (var i = 0; i < ImgNotifyDefined.GetInstance().dataList.length; i++) {
                var def = ImgNotifyDefined.GetInstance().dataList[i];
                if (SystemTimeManager.IsInTime(def.timeId) && UserManager.userInfo.level > def.level) {
                    result.push(def.imgId);
                }
            }
        }
        return result;
    };
    ActivityManager.getAwardResult = function (id, subId) {
        var def = ActivityDefined.GetInstance().getDefinition(id);
        var info = ActivityManager.getActivityInfo(id);
        if (def && info) {
            var handler = ActivityManager._subHandlerList.getValue(def.type);
            if (handler) {
                handler.onGetAwardComplete(id, subId);
            }
            else {
                qin.Console.log("参加活动结果返回 获取子活动handler异常！" + def.type);
            }
        }
    };
    /**
     * 触发管理器
     */
    ActivityManager.triggerHandler = new ActivityTriggerHandler();
    /**
     * 签到处理
    */
    ActivityManager.signInHandler = new SignInHandler(ActivityType.Signin);
    /**
     * 欢乐豪礼处理
     */
    ActivityManager.happyGiftHandler = new HappyGiftHandler(ActivityType.HappyGift);
    /**
     * 充值活动管理
     */
    ActivityManager.payPrizeHandler = new PayPrizeHandler(ActivityType.PayPrize);
    /**
     * 德州转转转管理
     */
    ActivityManager.shimTaeYoonHandler = new ShimTaeYoonHandler(ActivityType.LaBa);
    /**
     * 破产补助活动管理
     */
    ActivityManager.bankruptSubsidyHandler = new BankruptSubsidyHandler(ActivityType.BankruptSubsidy);
    /**
     * 累充活动管理
     */
    ActivityManager.pilePrizeHandler = new PilePrizeHandler(ActivityType.PilePrize);
    /**
     *绑定大礼包活动管理
     */
    ActivityManager.bindPhoneAwardHandler = new BindPhoneAwardHandler(ActivityType.BindChannel);
    /**
     *分享活动管理
     */
    ActivityManager.shareLuckDrawHandler = new ShareLuckDrawHandler(ActivityType.Share);
    /**
     *邀请活动管理
     */
    ActivityManager._subHandlerList = new qin.Dictionary();
    /**
     * 活动列表
     */
    ActivityManager.list = new Array();
    /**
     * 显示的活动列表
     */
    ActivityManager.showList = new Array();
    /**
     * 请求参与活动广播事件
     */
    ActivityManager.onJoinActivityEvent = new qin.DelegateDispatcher();
    /**
     * 请求公共数据完成事件
     */
    ActivityManager.onReqPubJsonEvent = new qin.DelegateDispatcher();
    /**
     * 拉取单个活动数据事件
     */
    ActivityManager.onReqSingleActivityEvent = new qin.DelegateDispatcher();
    /**
     * 活动信息推送事件
     */
    ActivityManager.onPushActivityEvent = new qin.DelegateDispatcher();
    /**
     * 拉取活动列表事件
     */
    ActivityManager.OnActivityGetListEvent = new qin.DelegateDispatcher();
    /**
     * 拉取活动操作记录成功广播
     */
    ActivityManager.OnActionRecordEvent = new qin.DelegateDispatcher();
    return ActivityManager;
}());
__reflect(ActivityManager.prototype, "ActivityManager");
//# sourceMappingURL=ActivityManager.js.map