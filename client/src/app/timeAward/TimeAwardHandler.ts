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
        game.ArrayUtil.Clear(this.timeAwardList);
    }
    /**
     * 添加监听推送
    */
    public addPushListener()
    {
        /**
         * 计时奖励时间更新推送
        */
        SocketManager.AddCommandListener(Command.RS2C_PushTimeAwardRefresh, this.refreshTimeAwardTime, this);
    }
    /**
     * 初始化
    */
    public initialize(round: number, time: number = 0)
    {
        this.reset();
        this.round = round;
        if(time < 0)
        {
            time = 0;
        }
        this.time = time;
        this.TimeAwardInfoEvent.dispatch();
    }
    /**
     * 刷新计时奖励时间
    */
    public refreshTimeAwardTime(result: game.SpRpcResult)
    {
        if (result.data)
        {
            let data: msg.RS2C_PushTimeAwardRefresh = result.data;
            if (data.starttime)  //一局开始
            {
                this.isEffectTime = true;
                if (data.sectime)
                {
                    this.setInitInfo(this.round, data.sectime, data.starttime);
                }
                if (GamblingManager.timeAwardHandler.startTimeFlag && GamblingManager.self && !GamblingManager.timeAwardHandler.isGetTimeAward)
                {
                    GamblingManager.timeAwardHandler.startCountDown();
                }
            } else  //一局结束
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
        let callback: Function = function (result: game.SpRpcResult)
        {
            if (result.data)
            {
                let data: msg.C2RS_ReqTimeAwardInfo = result.data;
                if (result.data.round == undefined)
                {
                    result.data.round = 0;
                }
                if (result.data.round == 0 && result.data.sectime == undefined)
                {
                    let timeawardDef: table.ITimeAwardDefine = table.TimeAwardById[1];
                    if (timeawardDef)
                    {
                        this.initialize(0, timeawardDef.Time);
                    }
                    return;
                }
                if (result.data.round < table.TimeAward.length)
                {
                    this.setInitInfo(result.data.round, result.data.sectime, result.data.starttime);
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
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqTimeAwardInfo, { roomtype: roomFieldType }, callback, null, this);
    }
    /**
     * 设置计时奖励数据
    */
    private setInitInfo(round: number, sectime: number, startTime: number)
    {
        let timeawardDef: table.ITimeAwardDefine = table.TimeAwardById[round + 1];
        if (timeawardDef)
        {
            if (sectime < timeawardDef.Time)
            {
                if (startTime == undefined || startTime == 0)
                {
                    this.initialize(round, timeawardDef.Time - sectime);
                } else
                {
                    this.initialize(round, timeawardDef.Time - (Math.round(TimeManager.GetServerUtcSecondstamp()) - startTime + sectime));
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
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqTimeAwardGet, { roomType: roomFieldType }, this.getTimeAwardResponse, null, this);
    }
    public getTimeAwardResponse(result: game.SpRpcResult)
    {
        PropertyManager.ShowItemList();
        this.round++;
        let def: table.ITimeAwardDefine = table.TimeAwardById[this.round + 1];
        if (def)
        {
            this.time = def.Time;
        }
        this.GetTimeAwardInfoEvent.dispatch();
    }
    /**
     * 获取对应场次的计时奖励数据
    */
    public getTimeAward(type: PlayingFieldType)
    {
        let awardList = table.TimeAward;
        if (awardList)
        {
            game.ArrayUtil.Clear(this.timeAwardList);
            if (!this.timeAwardList)
            {
                this.timeAwardList = new Array<TimeAwardInfo>();
            }
            for (let def of awardList)
            {
                let timeAwardInfo: TimeAwardInfo = new TimeAwardInfo();
                let awardList = this.getAwardList(def);
                timeAwardInfo.num = awardList[type - 1];
                if (this.round && def.Id <= this.round)
                {
                    timeAwardInfo.isBring = 1;
                }
                timeAwardInfo.icon = SheetSubName["TimeAwardGold" + def.Id];
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
        game.Tick.AddSecondsInvoke(this.countDown, this);
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
                let def: table.ITimeAwardDefine = table.TimeAwardById[this.round + 1];
                if (def)
                {
                    let num: number;
                    let aList = this.getAwardList(def);
                    num = aList[GamblingManager.roomInfo.definition.Type - 1];
                    UIManager.showPanel(UIModuleName.GetTimeAwardRemindPanel, { round: this.round, num: num, pattern: GamblingManager.roomInfo.definition.Type });
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
    public getAwardList(def: table.IAwardDefine): Array<number>
    {
        let list = [];
        let str: string = "RoomType";
        for (let i: number = 0; i < 3; i++)
        {
            let index: number = i + 1;
            list[i] = def[str + index];
        }
        return list;
    }

    /**
     * 停止计时
    */
    public stopCountDown()
    {
        game.Tick.RemoveSecondsInvoke(this.countDown, this);
        this.startTimeFlag = true;
    }
    /**
     * 获取轮数和下次领奖时间的数据成功广播
    */
    public GetTimeAwardInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 获取对应场次计时奖励数据成功广播
    */
    public getTimeAwardEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     *计时奖励可领取广播
    */
    public BringTimeAwardEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     *计时进行中广播
    */
    public TimeAwardCountDownEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     *拉取计时奖励信息成功广播
    */
    public TimeAwardInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}