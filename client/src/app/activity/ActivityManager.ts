/**
 * 活动管理
 */
class ActivityManager
{
    /**
     * 触发管理器
     */
    private static triggerHandler: ActivityTriggerHandler = new ActivityTriggerHandler();
    /**
     * 签到处理
    */
    public static signInHandler = new SignInHandler(ActivityType.Signin);
    /**
     * 欢乐豪礼处理
     */
    public static happyGiftHandler = new HappyGiftHandler(ActivityType.HappyGift);
    /**
     * 充值活动管理
     */
    public static payPrizeHandler = new PayPrizeHandler(ActivityType.PayPrize);
    /**
     * 德州转转转管理
     */
    public static shimTaeYoonHandler = new ShimTaeYoonHandler(ActivityType.LaBa);
    /**
     * 破产补助活动管理
     */
    public static bankruptSubsidyHandler = new BankruptSubsidyHandler(ActivityType.BankruptSubsidy);
    /**
     * 累充活动管理
     */
    public static pilePrizeHandler = new PilePrizeHandler(ActivityType.PilePrize);
    /**
     *绑定大礼包活动管理
     */
    public static bindPhoneAwardHandler = new BindPhoneAwardHandler(ActivityType.BindChannel);
    /**
     *分享活动管理
     */
    public static shareLuckDrawHandler = new ShareLuckDrawHandler(ActivityType.Share);
    /**
     *邀请活动管理
     */
    private static _subHandlerList: qin.Dictionary<string, BaseActivitySubHandler<BaseActivitySubInfo<BaseActivitySubDefnition>>> = new qin.Dictionary<string, BaseActivitySubHandler<BaseActivitySubInfo<BaseActivitySubDefnition>>>();
    /**
     * 活动列表
     */
    public static list: Array<ActivityInfo> = new Array<ActivityInfo>();
    /**
     * 显示的活动列表
     */
    public static showList: Array<ActivityInfo> = new Array<ActivityInfo>();

    public static clear()
    {
        ActivityManager._subHandlerList.foreach((k, v) => 
        {
            v.clear();
        }, this);
        ActivityManager.triggerHandler.clear();
    }

    public static initialize(result: qin.SpRpcResult)
    {
        ActivityManager.clear();
        ActivityManager.triggerHandler.initialize();
        ActivityManager.addHandlers();
        ActivityManager.initActivityList();

        TimeManager.resetTime0Event.addListener(ActivityManager.onTimeReset, this);
        SocketManager.AddCommandListener(Command.Activity_Push_2088, ActivityManager.pushActivityInfo, this);

        if (result.data && result.data.Array)
        {
            for (let i: number = 0; i < result.data.Array.length; i++)
            {
                ActivityManager.setActivityInfo(result.data.Array[i]);
            }
        }
        ActivityManager.checkCompleteHide();
    }

    private static addHandlers()
    {
        if (ActivityManager._subHandlerList.count == 0)
        {
            ActivityManager._subHandlerList.add(ActivityType.Signin, ActivityManager.signInHandler); //此处添加各个活动的子handler
            ActivityManager._subHandlerList.add(ActivityType.PayPrize, ActivityManager.payPrizeHandler);
            ActivityManager._subHandlerList.add(ActivityType.HappyGift, ActivityManager.happyGiftHandler);
            ActivityManager._subHandlerList.add(ActivityType.LaBa, ActivityManager.shimTaeYoonHandler);
            ActivityManager._subHandlerList.add(ActivityType.BankruptSubsidy, ActivityManager.bankruptSubsidyHandler);
            ActivityManager._subHandlerList.add(ActivityType.PilePrize, ActivityManager.pilePrizeHandler);
            ActivityManager._subHandlerList.add(ActivityType.BindChannel, ActivityManager.bindPhoneAwardHandler);
            ActivityManager._subHandlerList.add(ActivityType.Share, ActivityManager.shareLuckDrawHandler);
        }
    }
    /**
     * 请求活动公共数据
     */
    public static reqPubJson(id: number)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            if (result.data)
            {
                ActivityManager.onReqPubJsonEvent.dispatch(result.data);
            }
        };
        SocketManager.call(Command.ActivityPubJoin_Req_3234, { Id: id }, callback, null, this);
    }

    /**
     * 请求参与活动
    */
    public static reqJoinActivity(Id: number, SubId: number, Param1?: number)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            if (result.data)
            {
                ActivityManager.onJoinActivityEvent.dispatch(result.data);
            }
        };
        if (Param1)
        {
            SocketManager.call(Command.ActivityJoin_Req_3584, { Id: Id, SubId: SubId, Param1: Param1 }, callback, null, this);
        } else
        {
            SocketManager.call(Command.ActivityJoin_Req_3584, { Id: Id, SubId: SubId }, callback, null, this);
        }
    }
    /**
     * 拉取活动操作记录
    */
    public static reqActionRecord(id: number, count: number, act: number, idx: number = 0, roleId?: number)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            if (result.data && result.data.Array)
            {
                ActivityManager.OnActionRecordEvent.dispatch(result.data.Array);
            }
        };
        let reqData: Object = new Object();
        reqData["id"] = id;
        reqData["count"] = count;
        reqData["idx"] = idx;
        reqData["act"] = act;
        if (roleId)
        {
            reqData["roleId"] = roleId;
        }
        SocketManager.call(Command.ActivityActionRecord_Req_3235, reqData, callback, null, this);
    }
    /**
     * 活动中心打开子活动面板
     */
    public static showPanelInActivityCenter(activityInfo: ActivityInfo)
    {
        if (activityInfo.definition)
        {
            UIManager.showPanel(activityInfo.definition.panelName, { prevPanelName: UIModuleName.ActivityPanel, info: activityInfo });
        }
    }
    /**
     * 获取活动信息
     */
    public static getActivityInfo(id: number): ActivityInfo
    {
        for (let info of ActivityManager.list)
        {
            if (info.id == id)
            {
                return info;
            }
        }
        return null;
    }
    /**
     * 根据类型获得开启的活动（同类型活动只有一个开启）
     */
    public static getOpenAchivityByType(type: ActivityType)
    {
        for (let info of ActivityManager.list)
        {
            let state: ActivityOpenState = ActivityUtil.getActivityOpenState(info);
            if (info.definition && info.definition.type == type && state == ActivityOpenState.Open)
            {
                return info;
            }
        }
        return null;
    }

    private static initActivityList()
    {
        qin.ArrayUtil.Clear(ActivityManager.list);
        ActivityManager._subHandlerList.foreach((k, v) => { v.clear(); }, this);
        for (let info of ActivityDefined.GetInstance().dataList)
        {
            let activityInfo: ActivityInfo = new ActivityInfo();
            activityInfo.id = info.id;
            activityInfo.step = 0;
            activityInfo.jsonObj = {};
            activityInfo.gotJsonObj = {};
            ActivityUtil.setStartTime(activityInfo);
            ActivityUtil.setEndTime(activityInfo);
            let handler: BaseActivitySubHandler<BaseActivitySubInfo<BaseActivitySubDefnition>>;
            handler = ActivityManager._subHandlerList.getValue(activityInfo.definition.type);
            if (handler)
            {
                handler.initialize(activityInfo);
            }
            else
            {
                qin.Console.log("处理活动类型子逻辑异常！TYPE：" + activityInfo.definition.type);
            }
            ActivityManager.triggerHandler.register(activityInfo);
            ActivityManager.list.push(activityInfo);
        }
    }
    /**
     * 显示的活动
     */
    public static checkCompleteHide()
    {
        qin.ArrayUtil.Clear(ActivityManager.showList);
        for (let info of ActivityManager.list)
        {
            if (!info.definition.unInShowPanel) //在面板里面显示
            {
                let state: ActivityOpenState = ActivityUtil.getActivityOpenState(info);
                if (state == ActivityOpenState.End)
                {
                    if (info.definition.showFinish == true) //完成了也显示
                    {
                        ActivityManager.showList.push(info);
                    }
                }
                else if (state == ActivityOpenState.Open) //正在进行中的活动
                {
                    ActivityManager.showList.push(info);
                }
            }
        }
    }
    /**
     * 0点重置
     */
    private static onTimeReset()
    {
        SocketManager.call(Command.Activity_GetList_3233, null, ActivityManager.initialize, null, this);
    }
    /**
     * 设置活动信息
     */
    private static setActivityInfo(data: any)
    {
        if (data)
        {
            let activityInfo: ActivityInfo = ActivityManager.getActivityInfo(data["Id"]);
            if (activityInfo)
            {
                activityInfo.step = data["Step"];
                activityInfo.pubStep = data["PubStep"];
                activityInfo.severStartDateTime = data["StartTime"];
                activityInfo.severEndDateTime = data["EndTime"];
                try
                {
                    if (data["Json"])
                    {
                        let jsonObj: any = JSON.parse(data["Json"]);
                        activityInfo.jsonObj = jsonObj;
                    }
                    if (!activityInfo.jsonObj)
                    {
                        activityInfo.jsonObj = {};
                    }
                    if (data["GotJson"])
                    {
                        let gotJsonObj: any = JSON.parse(data["GotJson"]); //处理已经领取的奖励信息
                        activityInfo.gotJsonObj = gotJsonObj;
                    }
                    if (!activityInfo.gotJsonObj)
                    {
                        activityInfo.gotJsonObj = {};
                    }
                    let handler: BaseActivitySubHandler<BaseActivitySubInfo<BaseActivitySubDefnition>>;
                    handler = ActivityManager._subHandlerList.getValue(activityInfo.definition.type);
                    if (handler)
                    {
                        handler.setJson(activityInfo);
                    }
                    else
                    {
                        qin.Console.log("处理活动类型子逻辑异常！TYPE：" + activityInfo.definition.type);
                    }
                }
                catch (e)
                {
                    qin.Console.log("解析活动协议出错 Json：" + data["Json"]);
                    qin.Console.log("解析活动协议出错 GotJson：" + data["GotJson"]);
                }
            }
        }
    }
    /**
     * 拉取活动信息
     */
    public static reqActivityInfo(id: number)
    {
        let callback: Function = function (result)
        {
            if (id == 0)
            {
                ActivityManager.OnActivityGetListEvent.dispatch(result);
            }
            else
            {
                if (result.data && result.data.Array)
                {
                    ActivityManager.setActivityInfo(result.data.Array[0]);
                    ActivityManager._subHandlerList.foreach((k, v) => 
                    {
                        v.refreshActivityInfo(id);
                    }, this);
                }
                ActivityManager.onReqSingleActivityEvent.dispatch(id);
            }
        }
        SocketManager.call(Command.Activity_GetList_3233, { "Id": id }, callback, null, this);
    }

    /**
     * 活动信息推送
     */
    public static pushActivityInfo(result: qin.SpRpcResult)
    {
        if (result.data)
        {
            let id: number = result.data["Id"];
            ActivityManager.setActivityInfo(result.data);
            ActivityManager._subHandlerList.foreach((k, v) => 
            {
                if (id)
                {
                    v.refreshActivityInfo(id);
                }
            }, this);
            ActivityManager.onPushActivityEvent.dispatch(id);
        }
    }

    /**
     * 请求领取活动奖励
     */
    public static ReqGetActivityAward(activityId: number, subId: number, isShowList: boolean = true)
    {
        let callback: Function = function (sp: qin.SpRpcResult)
        {
            PropertyManager.ShowItemList();
            ActivityManager.getAwardResult(activityId, subId);
        };
        if (isShowList)
        {
            PropertyManager.OpenGet();
        }
        SocketManager.call(Command.Activity_GetPrize_3202, { "Id": activityId, "SubId": subId }, callback, null, this);
    }

    /**
     * 获取显示的公告栏列表
     */
    public static getShowNoticeList(): Array<string>
    {
        let result: Array<string> = new Array<string>();
        if (ImgNotifyDefined.GetInstance().dataList)
        {
            for (let i: number = 0; i < ImgNotifyDefined.GetInstance().dataList.length; i++)
            {
                let def: ImgNotifyDefinition = ImgNotifyDefined.GetInstance().dataList[i];
                if (SystemTimeManager.IsInTime(def.timeId) && UserManager.userInfo.level > def.level)
                {
                    result.push(def.imgId);
                }
            }
        }
        return result;
    }

    public static getAwardResult(id: number, subId: number)
    {
        let def: ActivityDefintion = ActivityDefined.GetInstance().getDefinition(id);
        let info: ActivityInfo = ActivityManager.getActivityInfo(id);
        if (def && info)
        {
            let handler: BaseActivitySubHandler<BaseActivitySubInfo<BaseActivitySubDefnition>> = ActivityManager._subHandlerList.getValue(def.type);
            if (handler)
            {
                handler.onGetAwardComplete(id, subId);
            }
            else
            {
                qin.Console.log("参加活动结果返回 获取子活动handler异常！" + def.type);
            }
        }
    }

    /**
	 * 请求参与活动广播事件
	 */
    public static onJoinActivityEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 请求公共数据完成事件   
     */
    public static onReqPubJsonEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 拉取单个活动数据事件
     */
    public static onReqSingleActivityEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 活动信息推送事件
     */
    public static onPushActivityEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 拉取活动列表事件
     */
    public static OnActivityGetListEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 拉取活动操作记录成功广播
     */
    public static OnActionRecordEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}