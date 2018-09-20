/**
 * 计时奖励管理
*/
class TimeAwardHandler
{
    /**
     * 计时奖励数组
    */
    public timeAwardList: Array<TimeAwardInfo>;
    /**
     * 轮数
    */
    public round: number;
    /**
     * 下次领奖时间（秒）
    */
    public time: number;
    /**
     * 开始计时开关
    */
    public startTimeFlag: boolean = true;
    /**
     * 是否处于有效的计时奖励时间
    */
    public isEffectTime: boolean = false;
    /**
     * 是否处于可以领取计时奖励状态
    */
    public isGetTimeAward: boolean = false;

    /**
     * 重置
    */
    public reset()
    {
        this.time = undefined;
        this.round = undefined;
        qin.ArrayUtil.Clear(this.timeAwardList);
    }
    /**
     * 添加监听推送
    */
    public addPushListener()
    {
        /**
         * 计时奖励时间更新推送
        */
        SocketManager.AddCommandListener(Command.TimeAwardRefresh_Push_2122, this.refreshTimeAwardTime, this);
    }
    /**
     * 初始化
    */
    public initialize(round: number, time: number = 0)
    {
        this.reset();
        this.round = round;
        this.time = time;
        this.TimeAwardInfoEvent.dispatch();
    }
    /**
     * 刷新计时奖励时间
    */
    public refreshTimeAwardTime(result: qin.SpRpcResult)
    {
        if (result.data)
        {
            if (result.data.startTime)  //一局开始
            {
                this.isEffectTime = true;
                if (result.data.secTime)
                {
                    this.setInitInfo(this.round, result.data.secTime, result.data.startTime);
                }
                if (GamblingManager.timeAwardHandler.startTimeFlag && GamblingManager.self && !GamblingManager.timeAwardHandler.isGetTimeAward)
                {
                    GamblingManager.timeAwardHandler.startCountDown();
                }
            } else if (result.data.secTime)  //一局结束
            {
                this.isEffectTime = false;
                GamblingManager.timeAwardHandler.stopCountDown();
            }
        }
    }
    /**
     * 拉取计时奖励信息
    */
    public reqGetTimeAwardInfo(roomFieldType: PlayingFieldType)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            if (result.data)
            {
                if (result.data.round == undefined)
                {
                    result.data.round = 0;
                }
                if (result.data.round == 0 && result.data.secTime == undefined)
                {
                    let timeawardDef: TimeAwardDefinition = TimeAwardDefined.GetInstance().getDefinition(1);
                    this.initialize(0, timeawardDef.time);
                    return;
                }
                if (result.data.round < TimeAwardDefined.GetInstance().dataList.length)
                {
                    this.setInitInfo(result.data.round, result.data.secTime, result.data.startTime);
                } else
                {
                    this.initialize(result.data.round);
                }
            }
        };
        if (roomFieldType == PlayingFieldType.PlayFieldPersonal)
        {
            roomFieldType = PlayingFieldType.High;
        }
        SocketManager.call(Command.TimeAwardInfo_Req_3620, { roomType: roomFieldType }, callback, null, this);
    }
    /**
     * 设置计时奖励数据
    */
    private setInitInfo(round: number, secTime: number, startTime: number)
    {
        let timeawardDef: TimeAwardDefinition = TimeAwardDefined.GetInstance().getDefinition(round + 1);
        if (timeawardDef)
        {
            if (secTime < timeawardDef.time)
            {
                if (startTime == undefined)
                {
                    this.initialize(round, timeawardDef.time - secTime + 3);
                } else
                {
                    this.initialize(round, timeawardDef.time - (Math.round(TimeManager.GetServerUtcTimestamp()) - startTime + secTime) + 3);
                }
            } else
            {
                this.initialize(round);
            }
        }
    }
    /**
     * 发送领取奖励请求
    */
    public reqGetTimeAward(roomFieldType: PlayingFieldType)
    {
        SocketManager.call(Command.TimeAwardGet_Req_3621, { roomType: roomFieldType }, this.getTimeAwardResponse, null, this);
    }
    public getTimeAwardResponse(result: qin.SpRpcResult)
    {
        PropertyManager.ShowItemList();
        this.round++;
        let def: TimeAwardDefinition = TimeAwardDefined.GetInstance().getDefinition(this.round + 1);
        if (def)
        {
            this.time = def.time;
        }
        this.GetTimeAwardInfoEvent.dispatch();
    }
    /**
     * 获取对应场次的计时奖励数据
    */
    public getTimeAward(type: PlayingFieldType)
    {
        let awardList = TimeAwardDefined.GetInstance().dataList;
        if (awardList)
        {
            qin.ArrayUtil.Clear(this.timeAwardList);
            if (!this.timeAwardList)
            {
                this.timeAwardList = new Array<TimeAwardInfo>();
            }
            for (let def of awardList)
            {
                let timeAwardInfo: TimeAwardInfo = new TimeAwardInfo();
                timeAwardInfo.num = def.awardList[type - 1];
                if (this.round && def.id <= this.round)
                {
                    timeAwardInfo.isBring = 1;
                }
                timeAwardInfo.icon = SheetSubName["TimeAwardGold" + def.id];
                this.timeAwardList.push(timeAwardInfo);
            }
        }
        this.getTimeAwardEvent.dispatch();
    }
    public startCountDown()
    {
        if (GamblingUtil.isMatch || GamblingUtil.isOmaha)  //比赛不进行计时奖励
        {
            return;
        }
        qin.Tick.AddSecondsInvoke(this.countDown, this);
        this.startTimeFlag = false;
    }
    /**
     * 倒计时
    */
    public countDown()
    {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo))
        {
            if (this.time > 0)
            {
                this.time--;
            }
            this.TimeAwardCountDownEvent.dispatch();
            if (this.time <= 0)
            {
                this.stopCountDown();
                let def: TimeAwardDefinition = TimeAwardDefined.GetInstance().getDefinition(this.round + 1);
                if (def)
                {
                    let num: number;
                    num = def.awardList[GamblingManager.roomInfo.definition.type - 1];
                    UIManager.showPanel(UIModuleName.GetTimeAwardRemindPanel, { round: this.round, num: num, pattern: GamblingManager.roomInfo.definition.type });
                }
                this.isGetTimeAward = true;
                this.BringTimeAwardEvent.dispatch();
            }
        }
        else
        {
            this.stopCountDown();
        }
    }
    /**
     * 停止计时
    */
    public stopCountDown()
    {
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
        this.startTimeFlag = true;
    }
    /**
     * 获取轮数和下次领奖时间的数据成功广播
    */
    public GetTimeAwardInfoEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 获取对应场次计时奖励数据成功广播
    */
    public getTimeAwardEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     *计时奖励可领取广播
    */
    public BringTimeAwardEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     *计时进行中广播
    */
    public TimeAwardCountDownEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     *拉取计时奖励信息成功广播
    */
    public TimeAwardInfoEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}