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
    private static _subHandlerList: game.Map<string, BaseActivitySubHandler<BaseActivitySubInfo<IBaseActivitySubDefnition>>> = new game.Map<string, BaseActivitySubHandler<BaseActivitySubInfo<IBaseActivitySubDefnition>>>();
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

    public static initialize(result: game.SpRpcResult)
    {
        ActivityManager.clear();
        ActivityManager.triggerHandler.initialize();
        ActivityManager.addHandlers();
        ActivityManager.initActivityList();

        TimeManager.resetTime0Event.addListener(ActivityManager.onTimeReset, this);
        SocketManager.AddCommandListener(Command.Activity_Push_2088, ActivityManager.pushActivityInfo, this);
        let data: msg.GW2C_RetActivityInfo = result.data;
        if (data && data.array)
        {
            for (let i: number = 0; i < data.array.length; i++)
            {
                ActivityManager.setActivityInfo(data.array[i]);
            }
        }
        ActivityManager.checkCompleteHide();
    }

    private static addHandlers()
    {
        if (ActivityManager._subHandlerList.count == 0)
        {
            ActivityManager._subHandlerList.add(ActivityType.Signin, ActivityManager.signInHandler); //此处添加各个活动的子handler
            // ActivityManager._subHandlerList.add(ActivityType.PayPrize, ActivityManager.payPrizeHandler);
            // ActivityManager._subHandlerList.add(ActivityType.HappyGift, ActivityManager.happyGiftHandler);
            // ActivityManager._subHandlerList.add(ActivityType.LaBa, ActivityManager.shimTaeYoonHandler);
            ActivityManager._subHandlerList.add(ActivityType.BankruptSubsidy, ActivityManager.bankruptSubsidyHandler);
            // ActivityManager._subHandlerList.add(ActivityType.PilePrize, ActivityManager.pilePrizeHandler);
            // ActivityManager._subHandlerList.add(ActivityType.BindChannel, ActivityManager.bindPhoneAwardHandler);
            // ActivityManager._subHandlerList.add(ActivityType.Share, ActivityManager.shareLuckDrawHandler);
        }
    }
    /**
     * 请求活动公共数据
     */
    public static reqPubJson(id: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
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
        let callback: Function = function (result: game.SpRpcResult)
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
        let callback: Function = function (result: game.SpRpcResult)
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
            UIManager.showPanel(activityInfo.definition.PanelName, { prevPanelName: UIModuleName.ActivityPanel, info: activityInfo });
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
            if (info.definition && info.definition.Type == type && state == ActivityOpenState.Open)
            {
                return info;
            }
        }
        return null;
    }

    private static initActivityList()
    {
        game.ArrayUtil.Clear(ActivityManager.list);
        ActivityManager._subHandlerList.foreach((k, v) => { v.clear(); }, this);
        for (let info of table.Activity_list)
        {
            let activityInfo: ActivityInfo = new ActivityInfo();
            activityInfo.id = info.Id;
            activityInfo.step = 0;
            activityInfo.jsonObj = {};
            activityInfo.gotJsonObj = {};
            ActivityUtil.setStartTime(activityInfo);
            ActivityUtil.setEndTime(activityInfo);
            let handler: BaseActivitySubHandler<BaseActivitySubInfo<IBaseActivitySubDefnition>>;
            handler = ActivityManager._subHandlerList.getValue(activityInfo.definition.Type);
            if (handler)
            {
                handler.initialize(activityInfo);
            }
            else
            {
                game.Console.log("处理活动类型子逻辑异常！TYPE：" + activityInfo.definition.Type);
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
        game.ArrayUtil.Clear(ActivityManager.showList);
        for (let info of ActivityManager.list)
        {
            if (!info.definition.UnInShowPanel) //在面板里面显示
            {
                let state: ActivityOpenState = ActivityUtil.getActivityOpenState(info);
                if (state == ActivityOpenState.End)
                {
                    // if (info.definition.ShowFinish == true) //完成了也显示  move todo
                    // {
                    //     ActivityManager.showList.push(info);
                    // }
                }
                else if (state == ActivityOpenState.Open) //正在进行中的活动
                {
                    ActivityManager.showList.push(info);
                }
            }
        }
    }
    /**
    * 获取
    */
    public static getSubDefinition(id: number, subId: number, targetList: any[]): any
    {
        if (targetList)
        {
            for (let def of targetList)
            {
                if (def.ActivityId == id && def.SubId == subId)
                {
                    return def;
                }
            }
        }
        game.Console.log("获取活动子表定义异常！Id:" + id + " " + "subId:" + subId);
        return null;
    }
    /**
     * 0点重置
     */
    private static onTimeReset()
    {
        SocketManager.call(Command.C2GW_ReqActivityInfo, null, ActivityManager.initialize, null, this);
    }
    /**
     * 设置活动信息
     */
    private static setActivityInfo(data: msg.IActivityInfo)
    {
        if (data)
        {
            let activityInfo: ActivityInfo = ActivityManager.getActivityInfo(data.id);
            if (activityInfo)
            {
                activityInfo.step = data.step; //   ["Step"];
                // activityInfo.pubStep = data["PubStep"];  //move todo
                activityInfo.severStartDateTime = new Date(data.starttime * 1000);// ["StartTime"];
                activityInfo.severEndDateTime = new Date(data.endtime * 1000);// ["EndTime"];
                try
                {
                    if (data.json)
                    {
                        let jsonObj: any = JSON.parse(data.json);
                        activityInfo.jsonObj = jsonObj;
                    }
                    if (!activityInfo.jsonObj)
                    {
                        activityInfo.jsonObj = {};
                    }
                    if (data.gotjson)
                    {
                        let gotJsonObj: any = JSON.parse(data.gotjson); //处理已经领取的奖励信息
                        activityInfo.gotJsonObj = gotJsonObj;
                    }
                    if (!activityInfo.gotJsonObj)
                    {
                        activityInfo.gotJsonObj = {};
                    }
                    let handler: BaseActivitySubHandler<BaseActivitySubInfo<IBaseActivitySubDefnition>>;
                    handler = ActivityManager._subHandlerList.getValue(activityInfo.definition.Type);
                    if (handler)
                    {
                        handler.setJson(activityInfo);
                    }
                    else
                    {
                        game.Console.log("处理活动类型子逻辑异常！TYPE：" + activityInfo.definition.Type);
                    }
                }
                catch (e)
                {
                    game.Console.log("解析活动协议出错 Json：" + data.json);
                    game.Console.log("解析活动协议出错 GotJson：" + data.gotjson);
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
        SocketManager.call(Command.C2GW_ReqActivityInfo, { "id": id }, callback, null, this);
    }

    /**
     * 活动信息推送
     */
    public static pushActivityInfo(result: game.SpRpcResult)
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
        let callback: Function = function (sp: game.SpRpcResult)
        {
            PropertyManager.ShowItemList();
            ActivityManager.getAwardResult(activityId, subId);
        };
        if (isShowList)
        {
            PropertyManager.OpenGet();
        }
        SocketManager.call(Command.C2GW_ReqGetActivityReward, { "id": activityId, "subid": subId }, callback, null, this);
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
        let def: table.IActivity_listDefine = table.Activity_listById[id];
        let info: ActivityInfo = ActivityManager.getActivityInfo(id);
        if (def && info)
        {
            let handler: BaseActivitySubHandler<BaseActivitySubInfo<IBaseActivitySubDefnition>> = ActivityManager._subHandlerList.getValue(def.Type);
            if (handler)
            {
                handler.onGetAwardComplete(id, subId);
            }
            else
            {
                game.Console.log("参加活动结果返回 获取子活动handler异常！" + def.Type);
            }
        }
    }

    /**
	 * 请求参与活动广播事件
	 */
    public static onJoinActivityEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 请求公共数据完成事件   
     */
    public static onReqPubJsonEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 拉取单个活动数据事件
     */
    public static onReqSingleActivityEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 活动信息推送事件
     */
    public static onPushActivityEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 拉取活动列表事件
     */
    public static OnActivityGetListEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 拉取活动操作记录成功广播
     */
    public static OnActionRecordEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}