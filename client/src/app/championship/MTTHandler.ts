/**
 * 已报名锦标赛开始提醒管理
 */
class MTTRemindStartHandler
{
    /**
     * 已报名的MTT赛事列表
    */
    public joinedMTTList: Array<MatchRoomInfo>;
    /**
     * 等待推送开始提醒的MTT赛事列表
    */
    public waitRemindMTTList: Array<MatchRoomInfo>;
    /**
     * 一个事件段内第一个开始推送的赛事
    */
    public firstStartMTT: MatchRoomInfo;
    /**
     * 横幅面板打开开关
    */
    public minuteOpenFlag: boolean = true;
    /**
     * 3分钟横幅打开开关
    */
    public threeMinOpenFlag: boolean = true;
    /**
     * 20秒推送过的已参加赛事
    */
    public hadRemindJoinedMTT: Array<MatchRoomInfo>;

    public initialize()
    {
        if (!this.joinedMTTList)
        {
            this.joinedMTTList = new Array<MatchRoomInfo>();
        }
        if (!this.hadRemindJoinedMTT)
        {
            this.hadRemindJoinedMTT = new Array<MatchRoomInfo>();
        }
        for (let matchInfo of ChampionshipManager.joinMTTList)
        {
            if (matchInfo.definition && matchInfo.definition.type == MatchType.MTT)
            {
                this.joinedMTTList.push(matchInfo);
            }
        }
        qin.Tick.AddSecondsInvoke(this.countDown, this);
    }
    public onEnable()
    {
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
        qin.ArrayUtil.Clear(this.joinedMTTList);
        qin.ArrayUtil.Clear(this.waitRemindMTTList);
        this.firstStartMTT = null;
        this.minuteOpenFlag = true;
    }

    /**
     * 坐满即玩赛事开赛提醒
    */
    public sitAndPlayStartRemind()
    {
        for (let joinedMatch of ChampionshipManager.processMTTList)
        {
            if (InfoUtil.checkAvailable(joinedMatch) && joinedMatch.definition.type == MatchType.SNG && joinedMatch.join >= joinedMatch.definition.bNum && !joinedMatch.outTime && joinedMatch.joinWay)
            {
                joinedMatch.startTime = TimeManager.GetServerUtcTimestamp();  //人数满时就是赛事开始时间
                if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.recordId == joinedMatch.recordId)
                {
                    GamblingManager.matchRoomInfo.startTime = joinedMatch.startTime;
                }
                if (!joinedMatch.isRemineded)
                {
                    let enterMatch: MatchRoomInfo = ChampionshipManager.getMathInfoByRecordId(joinedMatch.recordId);
                    if (enterMatch)
                    {
                        joinedMatch.isRemineded = true;
                        if (SceneManager.sceneType == SceneType.Game && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.recordId == enterMatch.recordId)
                        {
                            return;
                        }
                        UIManager.showPanel(UIModuleName.SitAndPlayStartRemindPanel, { countDownNum: 8, startMatch: enterMatch });
                    } else
                    {
                        AlertManager.showAlert("获取赛事信息异常");
                    }
                    break;
                }
            }
        }
    }
    /**
     * 清除已经进行过20秒提醒的数据
    */
    public clearHadRemindMTT()
    {
        qin.ArrayUtil.Clear(this.hadRemindJoinedMTT);
    }
    /**
     * 比赛3分钟开始横幅提醒推送对应的操作
    */
    public onThreeMinStartPush(recordId: number)
    {
        if (SceneManager.sceneType == SceneType.Game && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.recordId == recordId)
        {
            return;
        }
        UIManager.showPanel(UIModuleName.ThreeMinRemindPanel, "您报名的比赛将于3分钟后开始！");
    }
    /**
    * 比赛1分钟开始横幅提醒推送对应的操作
   */
    public onMinuteStartPush(countDownNum: number, recordId: number)
    {
        if (SceneManager.sceneType == SceneType.Game && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.recordId == recordId)
        {
            return;
        }
        UIManager.showPanel(UIModuleName.MinuteRemindPanel, { countDownNum: countDownNum, recordId: recordId });
    }
    /**
     * 比赛20秒开始弹窗提醒推送对应的操作
    */
    public onSecondStartPush(countDownNum: number, recordId: number)
    {
        if (SceneManager.sceneType == SceneType.Game && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.recordId == recordId)
        {
            return;
        }
        UIManager.showPanel(UIModuleName.SecondRemindPanel, { countDownNum: countDownNum, recordId: recordId });
    }
    /**
     * 倒计时已报名的MTT赛事
    */
    private countDown()
    {
        if (this.joinedMTTList)
        {
            for (let i: number = 0; i < this.joinedMTTList.length; i++)
            {
                let joinMTTinfo: MatchRoomInfo = new MatchRoomInfo();
                joinMTTinfo = this.joinedMTTList[i];
                let countDownNum: number = Math.floor(joinMTTinfo.startTime - TimeManager.GetServerUtcTimestamp());
                if (countDownNum == 180)
                {
                    if (this.threeMinOpenFlag)
                    {
                        this.onThreeMinStartPush(joinMTTinfo.recordId);
                        this.threeMinOpenFlag = false;
                    }
                }
                if (countDownNum <= 60 && countDownNum > 0)
                {
                    if (this.minuteOpenFlag)
                    {
                        if (!this.firstStartMTT)
                        {
                            this.firstStartMTT = new MatchRoomInfo();
                        }
                        this.firstStartMTT = joinMTTinfo;
                        this.onMinuteStartPush(countDownNum, joinMTTinfo.recordId);
                        this.minuteOpenFlag = false;
                    }
                    else
                    {
                        if (!this.waitRemindMTTList)
                        {
                            this.waitRemindMTTList = new Array<MatchRoomInfo>();
                        }
                        if (this.waitRemindMTTList.indexOf(joinMTTinfo) == -1 && joinMTTinfo.recordId != this.firstStartMTT.recordId)
                        {
                            this.waitRemindMTTList.push(joinMTTinfo);
                            this.joinedMTTList.splice(i, 1);
                        }
                    }
                }
                if (countDownNum <= 20 && countDownNum > 0)
                {
                    let secondRemindFlag: boolean = true;
                    for (let hadRemindJoinedMTTInfo of this.hadRemindJoinedMTT)
                    {
                        if (hadRemindJoinedMTTInfo.recordId == joinMTTinfo.recordId)
                        {
                            secondRemindFlag = false;
                            break;
                        }
                    }
                    if (secondRemindFlag)
                    {
                        this.onSecondStartPush(countDownNum, joinMTTinfo.recordId);
                        this.hadRemindJoinedMTT.push(joinMTTinfo);
                    }
                }
            }
        }
    }
    /**
     * 等待提醒的MTT赛事开始提醒
    */
    public waitCounDown()
    {
        if (this.waitRemindMTTList && this.waitRemindMTTList.length > 0)
        {
            this.minuteOpenFlag = true;
            for (let i: number = 0; i < this.waitRemindMTTList.length; i++)
            {
                let joinMTTinfo: MatchRoomInfo = new MatchRoomInfo();
                joinMTTinfo = this.waitRemindMTTList[i];
                let countDownNum: number = Math.floor(joinMTTinfo.startTime - TimeManager.GetServerUtcTimestamp());
                if (countDownNum <= 60 && countDownNum > 0)
                {
                    if (this.minuteOpenFlag)
                    {
                        this.onMinuteStartPush(countDownNum, joinMTTinfo.recordId);
                        this.minuteOpenFlag = false;
                    }
                }
                if (countDownNum <= 20 && countDownNum > 0)
                {
                    this.onSecondStartPush(countDownNum, joinMTTinfo.recordId);
                    this.waitRemindMTTList.splice(i, 1);
                    qin.Tick.RemoveSecondsInvoke(this.waitCounDown, this);
                }
                if (countDownNum <= 0)
                {
                    this.waitRemindMTTList.splice(i, 1);
                    qin.Tick.RemoveSecondsInvoke(this.waitCounDown, this);
                }
            }
        }
    }
    /**
     * 倒计时等待队列中的MTT赛事
    */
    public remindWaitMTT()
    {
        qin.Tick.AddSecondsInvoke(this.waitCounDown, this);
    }
    /**
     * 重置3分钟横幅提醒打开开关
    */
    public resetThreeMinFlag()
    {
        this.threeMinOpenFlag = true;
    }
    /**
     *重置3分钟横幅提醒打开开关广播
    */
    public ResetThreeMinFlagEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}

