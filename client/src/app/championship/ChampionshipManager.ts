/**
 * 锦标赛管理
 */
class ChampionshipManager
{
    /**
     * 最近赛况
    */
    public static outsList: Array<OutsInfo>;
    /**
     * 锦标赛赛事列表
    */
    public static processMTTList: Array<MatchRoomInfo>;
    /**
     * 显示的锦标赛赛事列表
    */
    public static showMTTList: Array<MatchRoomInfo>;
    /**
     * 显示的坐满即玩赛事列表
    */
    public static showSitAndPlayList: Array<MatchRoomInfo>;
    /**
     * 锦标赛已报名赛事列表（包括已淘汰的和未淘汰的）
    */
    public static joinMTTList: Array<MatchRoomInfo>;
    /**
     * 赛况信息
    */
    public static matchOutsInfo: MatchOutsInfo;
    /**
     * 盲注列表
    */
    public static blindList: Array<table.IChampionshipBlindDefine>;
    /**
     * 奖品列表
    */
    public static awardList: Array<ChampionshipAwardInfo>;
    /**
     * 进入界面时当前盲注级别
    */
    public static nowBlindRank: number;
    /**
     * 该赛事的盲注id
    */
    public static nowBlindId: number;
    /**
    * 进入界面时当前盲注项
   */
    public static nowBlindItem: BlindItemRenderer;
    /**
     * 获取最近赛况排名的最近赛况的id
    */
    public static recentMTTId: number;
    /**
     * 赛事开始提醒
    */
    public static mttRemindStartHandler: MTTRemindStartHandler;
    /**
     * 进入锦标赛
     */
    public static enterMttHandler: EnterMttHandler = new EnterMttHandler();

    /**
     * 添加推送监听
    */
    private static addPushListener()
    {
        //赛事报名人数数据推送
        SocketManager.AddCommandListener(Command.RS2C_PushMTTJoinNumChange, ChampionshipManager.onJoinNumPush, this);
        //比赛取消推送
        SocketManager.AddCommandListener(Command.RS2C_PushMTTCancel, ChampionshipManager.onCancelMTTPush, this);
        //比赛结算推送(该玩家被淘汰)
        SocketManager.AddCommandListener(Command.RS2C_PushMTTWeedOut, ChampionshipManager.onMTTOverPush, this);
        //赛事房间id推送
        SocketManager.AddCommandListener(Command.RS2C_PushMTTRoomId, ChampionshipManager.onMTTRoomIdPush, this);
        //推送赛事排名
        SocketManager.AddCommandListener(Command.RS2C_PushMTTRank, ChampionshipManager.onMTTRankPush, this);
        //推送有新的赛事
        SocketManager.AddCommandListener(Command.RS2C_PushMTTNew, ChampionshipManager.onMTTNewPush, this);
    }
    public static initialize(result: game.SpRpcResult)
    {
        ChampionshipManager.addPushListener();
        if (!ChampionshipManager.mttRemindStartHandler)
        {
            ChampionshipManager.mttRemindStartHandler = new MTTRemindStartHandler();
        }
        if (!ChampionshipManager.showMTTList)
        {
            ChampionshipManager.showMTTList = new Array<MatchRoomInfo>();
        }
        if (!ChampionshipManager.joinMTTList)
        {
            ChampionshipManager.joinMTTList = new Array<MatchRoomInfo>();
        }
        if (!ChampionshipManager.processMTTList)
        {
            ChampionshipManager.processMTTList = new Array<MatchRoomInfo>();
        }
        if (!ChampionshipManager.outsList)
        {
            ChampionshipManager.outsList = new Array<OutsInfo>();
        }
        if (!ChampionshipManager.showSitAndPlayList)
        {
            ChampionshipManager.showSitAndPlayList = new Array<MatchRoomInfo>();
        }
        ChampionshipManager.mttRemindStartHandler.clearHadRemindMTT();
        //坐满即玩客户端配置的信息
        ChampionshipManager.initSitAndPlayListInfo();
        //进行中的比赛信息
        ChampionshipManager.getMTTListInfoResponse(result);
        //设置赛事的房间信息
        ChampionshipManager.initMTTRoomListInfo();
    }
    /**
     * 初始化设置锦标赛所在房间列表
    */
    private static initMTTRoomListInfo()
    {
        let list: Array<InsideRoomInfo> = InsideRoomManager.getInfoListByType(InsideRoomType.Match);
        for (let roomInfo of list)
        {
            let matchRoomInfo: MatchRoomInfo = ChampionshipManager.getMathInfoByRecordId(roomInfo.mttId);
            if (matchRoomInfo)
            {
                matchRoomInfo.roomId = roomInfo.id;
            }
        }
    }
    /**
     * 设置坐满即玩赛事列表
    */
    private static initSitAndPlayListInfo()
    {
        game.ArrayUtil.Clear(ChampionshipManager.showSitAndPlayList);
        let matchDefList: Array<table.IChampionshipDefine> = ChampionshipDefined.GetInstance().getSitAndPlayMatchList();
        if (matchDefList)
        {
            for (let def of matchDefList)
            {
                let matchInfo: MatchRoomInfo = new MatchRoomInfo();
                matchInfo.id = def.Id;
                matchInfo.isShow = 1;
                ChampionshipManager.setOpenAndCloseTime(matchInfo);
                ChampionshipManager.showSitAndPlayList.push(matchInfo);
            }
        }
    }
    /**
     * 设置坐满即玩赛事开放和关闭时间
    */
    private static setOpenAndCloseTime(matchInfo: MatchRoomInfo)
    {
        let subDefList: Array<table.ISystemTimeDefine> = SystemTimeDefined.GetInstance().getSubListById(matchInfo.definition.TimeId);
        if (subDefList)
        {
            matchInfo.openTime = SystemTimeManager.GetDateTimeByArray(subDefList[0].Start, TimeManager.GetServerLocalDateTime()).getTime();
            if (subDefList[0].End)
            {
                matchInfo.closeTime = SystemTimeManager.GetDateTimeByArray(subDefList[0].End, TimeManager.GetServerLocalDateTime()).getTime();
            }
        }
    }
    /**
     * 发送获取锦标赛赛事列表的请求
    */
    public static reqGetMTTListInfo()
    {
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqMTTList, null, ChampionshipManager.getMTTListInfoResponse, null, this);
    }
    private static getMTTListInfoResponse(result: game.SpRpcResult)
    {
        let data: msg.RS2C_RetMTTList = result.data;
        if (data)
        {
            let tmpProcessList: Array<MatchRoomInfo> = ChampionshipManager.processMTTList.concat();
            game.ArrayUtil.Clear(ChampionshipManager.processMTTList);
            game.ArrayUtil.Clear(ChampionshipManager.showMTTList);

            for (let mttInfo of data.mttlist)
            {
                let matchInfo: MatchRoomInfo = new MatchRoomInfo();
                matchInfo.copyValueFromIgnoreCase(mttInfo);
                for (let existInfo of tmpProcessList)
                {
                    if (existInfo.recordId == matchInfo.recordId)
                    {
                        matchInfo.roomId = existInfo.roomId; //沿用上次数据的房间ID 单步更新有推送
                        break;
                    }
                }
                matchInfo.leftJoin = mttInfo.leftjoin;
                let chapDef: table.IChampionshipDefine = matchInfo.definition;
                if (chapDef)
                {
                    if (chapDef.Type == MatchType.MTT)
                    {
                        ChampionshipManager.setIsMTTShow(chapDef, matchInfo, mttInfo);
                        if (matchInfo.isShow)
                        {
                            ChampionshipManager.showMTTList.push(matchInfo);
                        }
                    }
                    else if (chapDef.Type == MatchType.SNG)
                    {
                        matchInfo.isShow = 1;
                        if (!matchInfo.isRemineded && matchInfo.join >= matchInfo.definition.BNum)
                        {
                            matchInfo.isRemineded = true;
                        }
                    }
                }
                ChampionshipManager.processMTTList.push(matchInfo);
            }
            tmpProcessList = null;
            ChampionshipManager.onGetMatchListEvent.dispatch();
        }
    }
    /**
     * 判断是否开启报名
    */
    public static isStartJoin(matchInfo: MatchRoomInfo): boolean
    {
        if (InfoUtil.checkAvailable(matchInfo))
        {
            if (matchInfo.definition.Type == MatchType.MTT)
            {
                if (matchInfo.definition.SignTime != matchInfo.definition.DisplayTime && matchInfo.isShow == 1)
                {
                    if (matchInfo.startTime - matchInfo.definition.SignTime < TimeManager.GetServerUtcTimestamp())
                    {
                        return true;
                    } else
                    {
                        return false;
                    }
                } else if (matchInfo.definition.SignTime == matchInfo.definition.DisplayTime && matchInfo.isShow == 1)
                {
                    return true;
                }
            } else if (matchInfo.definition.Type == MatchType.SNG)
            {
                if (SystemTimeManager.IsInTime(matchInfo.definition.TimeId) && matchInfo.isShow == 1)
                {
                    return true;
                } else 
                {
                    return false;
                }
            }
        }
        return false;
    }
    /**
     * mtt设置是否显示
    */
    private static setIsMTTShow(chapDef: table.IChampionshipDefine, matchinfo: MatchRoomInfo, mttInfo: any)
    {
        if (chapDef.DelaySign)
        {
            if (TimeManager.GetServerUtcTimestamp() < matchinfo.startTime + chapDef.DelaySign && !mttInfo.outTime && !mttInfo.endTime)
            {
                matchinfo.isShow = 1;
            }
        } else
        {
            if (TimeManager.GetServerUtcTimestamp() < matchinfo.startTime)
            {
                matchinfo.isShow = 1;
            }
        }
    }
    /**
     * 发送获取已报名的赛事列表
    */
    public static reqJoinedMTTList()
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let data: msg.RS2C_RetJoinedMTTList = result.data;
            if (data && data.mttlist)
            {
                game.ArrayUtil.Clear(ChampionshipManager.joinMTTList);
                for (let mttInfo of data.mttlist)
                {
                    let matchinfo: MatchRoomInfo = new MatchRoomInfo();
                    matchinfo.copyValueFromIgnoreCase(mttInfo);
                    if (matchinfo.definition && matchinfo.definition.Type == MatchType.SNG)
                    {
                        ChampionshipManager.setOpenAndCloseTime(matchinfo);
                    }
                    for (let existInfo of ChampionshipManager.processMTTList)
                    {
                        if (existInfo.recordId == matchinfo.recordId)
                        {
                            matchinfo.roomId = existInfo.roomId; //沿用上次数据的房间ID 单步更新有推送
                            break;
                        }
                    }
                    ChampionshipManager.joinMTTList.push(matchinfo);
                }
                ChampionshipManager.joinMTTList.sort(SortUtil.JoinedMTTListSort);
                ChampionshipManager.remindMTTStart();
                ChampionshipManager.onGetJoinedMatchListEvent.dispatch();
            }
        };
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqJoinedMTTList, {}, callback, null, this);
    }
    /**
     * 开始进行赛事倒计时（用来通知赛事将要开始）
    */
    public static remindMTTStart()
    {
        if (!ChampionshipManager.mttRemindStartHandler)
        {
            ChampionshipManager.mttRemindStartHandler = new MTTRemindStartHandler();
        }
        ChampionshipManager.mttRemindStartHandler.onEnable();
        ChampionshipManager.mttRemindStartHandler.initialize();
    }
    /**
     * 发送获取最近赛况信息请求
    */
    public static reqGetRecentActionInfo()
    {
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqMTTRecordList, {}, ChampionshipManager.getGetRecentActionInfoResponse, null, this);
    }
    public static getGetRecentActionInfoResponse(result: game.SpRpcResult)
    {
        let data: msg.RS2C_RetMTTRecordList = result.data;
        if (data)
        {
            game.ArrayUtil.Clear(ChampionshipManager.outsList);
            for (let recordInfo of data.recordlist)
            {
                let record: OutsInfo = new OutsInfo();
                let rankInfo: ChampionshipRankInfo = new ChampionshipRankInfo();
                record.id = recordInfo.id;
                record.recordId = recordInfo.recordid;
                record.time = recordInfo.starttime;
                record.rankList = new Array<ChampionshipRankInfo>();
                let def: table.IChampionshipDefine = table.ChampionshipById[recordInfo.id];
                let championshipPrizeList: Array<table.IChampionshipPrizeDefine>;
                if (def)
                {
                    record.name = def.Name;
                    championshipPrizeList = ChampionshipManager.getAwardList(def.Id);
                }
                rankInfo.name = recordInfo.name;
                rankInfo.rank = 1;
                if (recordInfo.head)
                {
                    rankInfo.head = recordInfo.head;
                }
                if (recordInfo.sex)
                {
                    rankInfo.sex = recordInfo.sex;
                } else
                {
                    rankInfo.sex = 0;
                }
                if (championshipPrizeList)
                {
                    for (let championshipPrize of championshipPrizeList)
                    {
                        if (rankInfo.rank == championshipPrize.Start)
                        {
                            let str: string = "获得";
                            let des = AwardDefined.GetInstance().getAwardNameById(championshipPrize.AwardId);
                            if (des)
                            {
                                str += des;
                                rankInfo.award = str;
                            }
                        }
                    }
                }
                record.rankList.push(rankInfo);
                ChampionshipManager.outsList.push(record);
            }
            ChampionshipManager.outsList.sort(SortUtil.MTTOutsInfoTimeSort);
            ChampionshipManager.onGetRecentActionInfoEvent.dispatch();
        }
    }
    /**
     * 发送获取最近赛况名次信息
    */
    public static reqGetRankList(recordId: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let data: msg.RS2C_RetMTTRecentlyRankList = result.data;
            if (data && data.ranklist)
            {
                for (let rankInfo of data.ranklist)
                {
                    let rank: ChampionshipRankInfo = new ChampionshipRankInfo();
                    rank.copyValueFromIgnoreCase(rankInfo);
                    let championshipPrizeList: Array<table.IChampionshipPrizeDefine> = ChampionshipManager.getAwardList(ChampionshipManager.recentMTTId);
                    if (championshipPrizeList)
                    {
                        for (let championshipPrize of championshipPrizeList)
                        {
                            if (rankInfo.rank == championshipPrize.Start)
                            {
                                let str: string = "获得";
                                let des: string = AwardDefined.GetInstance().getAwardNameById(championshipPrize.AwardId);
                                if (des)
                                {
                                    str += des;
                                    rank.award = str;
                                }
                            }
                        }
                    }
                    let outInfo: OutsInfo = ChampionshipManager.getOutsInfoByRecordId(recordId);
                    if (outInfo && outInfo.rankList)
                    {
                        if (rank.rank != 1)
                        {
                            outInfo.rankList.push(rank);
                        }
                    }
                }
                ChampionshipManager.OnGetRankListEvent.dispatch(recordId);
            }
        };
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqMTTRecentlyRankList, { recordid: recordId }, callback, null, this);
    }
    /**
     * 发送立即报名的请求
    */
    public static reqRequestJoin(recordId: number, flag: JoinChampionshipWay, startTime: number, id: number, type: MatchType)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let data: msg.RS2C_RetMTTJoin = result.data;
            if (type == MatchType.SNG)
            {
                let isExist: boolean = false;
                for (let sngInfo of ChampionshipManager.processMTTList)
                {
                    if (sngInfo.recordId == data.recordid)  //存在 更新
                    {
                        isExist = true;
                        sngInfo.join++;
                        sngInfo.joinWay = flag;
                        ChampionshipManager.setOpenAndCloseTime(sngInfo);
                        ChampionshipManager.joinMTTList.push(sngInfo);
                        ChampionshipManager.enterMttHandler.enterMatch(sngInfo, game.StringConstants.Empty);
                        break;
                    }
                }
                if (!isExist)  //不存在 添加
                {
                    let info: MatchRoomInfo = new MatchRoomInfo();
                    info.id = id;
                    info.recordId = data.recordid;
                    info.isRemineded = false;
                    info.join = 1;
                    info.joinWay = flag;
                    ChampionshipManager.setOpenAndCloseTime(info);
                    ChampionshipManager.processMTTList.push(info);
                    ChampionshipManager.joinMTTList.push(info);
                    ChampionshipManager.enterMttHandler.enterMatch(info, game.StringConstants.Empty);
                }
            }
            else if (type == MatchType.MTT)
            {
                let championshipInfo: MatchRoomInfo;
                for (championshipInfo of ChampionshipManager.processMTTList)
                {
                    if (championshipInfo.recordId == data.recordid)
                    {
                        championshipInfo.join++;
                        championshipInfo.joinWay = flag;
                        ChampionshipManager.joinMTTList.push(championshipInfo);
                        break;
                    }
                }
                ChampionshipManager.remindMTTStart();
                let time: number = startTime - TimeManager.GetServerUtcTimestamp();
                if (time > 0 && InfoUtil.checkAvailable(championshipInfo))
                {
                    UIManager.showPanel(UIModuleName.JoinChampionshipSuccessPanel, { name: championshipInfo.definition.Name, time: championshipInfo.startTime, applyNum: championshipInfo.join, bNum: championshipInfo.definition.BNum, chip: championshipInfo.definition.InitialChips });
                }
            }
            ChampionshipManager.onRequestJoinEvent.dispatch({ flag: flag, recordId: data.recordid });
        };
        if (ChampionshipManager.isNotFull(recordId, type))
        {
            if (type == MatchType.MTT)
            {
                MsgTransferSend.sendRoomProto(Command.C2RS_ReqMTTJoin, { recordid: recordId, joinway: flag }, callback, ChampionshipManager.MTTCancelErrorDispose, this);
            } else if (type == MatchType.SNG)
            {
                MsgTransferSend.sendRoomProto(Command.C2RS_ReqMTTJoin, { joinway: flag, id: id }, callback, null, this);
            }
        }
    }
    /**
     * 根据recordId获得赛况信息
    */
    public static getOutsInfoByRecordId(recordId: number): OutsInfo
    {
        if (ChampionshipManager.outsList.length > 0)
        {
            for (let info of ChampionshipManager.outsList)
            {
                if (info.recordId == recordId)
                {
                    return info;
                }
            }
        }
        return null;
    }
    /**
     * 验证赛事人数是否未满
    */
    public static isNotFull(recordId: number, type: MatchType): boolean
    {
        if (recordId == undefined)  //坐满即玩没人报名时是没有recordId的
        {
            return true;
        }
        let mttInfo: MatchRoomInfo;
        for (let info of ChampionshipManager.processMTTList)
        {
            if (info.recordId == recordId)
            {
                mttInfo = info;
                break;
            }
        }

        if (InfoUtil.checkAvailable(mttInfo) && mttInfo.join < mttInfo.definition.BNum)
        {
            return true;
        } else
        {
            UIManager.showFloatTips("该比赛报名已达最大人数，请选择其他比赛！");
            return false;
        }
    }
    /**
     * 赛事已取消后报名错误处理
    */
    public static MTTCancelErrorDispose(result: game.SpRpcResult)
    {
        if (result.cmdId == Command.C2RS_ReqMTTJoin)
        {
            AlertManager.showAlert("该赛事因为报名人数不足已经取消。", ChampionshipManager.reqGetMTTListInfo);
        }
    }
    /**
     * 发送获取赛况请求
    */
    public static reqOutsInfo(recordId: number, blindType: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let data:msg.RS2C_RetMTTOutsInfo = result.data;
            if (data)
            {
                ChampionshipManager.nowBlindId = blindType;
                if (!ChampionshipManager.matchOutsInfo)
                {
                    ChampionshipManager.matchOutsInfo = new MatchOutsInfo();
                }
                if (data.blindlevel)  //如果赛事没开始，盲注级别应该为1
                {
                    ChampionshipManager.nowBlindRank = data.blindlevel;
                    let addBlindTime: number = Math.floor(data.blindtime - TimeManager.GetServerUtcTimestamp());
                    if (addBlindTime <= 0)
                    {
                        ChampionshipManager.matchOutsInfo.addBlindTime = 0;
                    } else
                    {
                        ChampionshipManager.matchOutsInfo.addBlindTime = Math.floor(data.blindtime - TimeManager.GetServerUtcTimestamp());
                    }
                }
                else
                {
                    ChampionshipManager.nowBlindRank = 1;
                    let mttBlindDef: table.IChampionshipBlindDefine = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank, blindType);
                    if (mttBlindDef)
                    {
                        ChampionshipManager.matchOutsInfo.addBlindTime = mttBlindDef.UpTime;
                    }
                }
                let blindDef: table.IChampionshipBlindDefine = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank, blindType);
                ChampionshipManager.setOutsBlindInfo(blindDef);
                ChampionshipManager.matchOutsInfo.rank = data.rank;
                ChampionshipManager.OnOutsInfoEvent.dispatch();
            }
        };
        if (recordId != undefined)
        {
            MsgTransferSend.sendRoomProto(Command.C2RS_ReqMTTOutsInfo, { recordid: recordId }, callback, ChampionshipManager.MTTOverErrorDispose, this);
        }
    }
    /**
     * 赛事已结束错误处理
    */
    public static MTTOverErrorDispose(result: game.SpRpcResult)
    {
        if (result.cmdId == Command.C2RS_ReqMTTOutsInfo || result.cmdId == Command.C2GW_ReqEnterRoom)
        {
            UIManager.closePanel(UIModuleName.ChampionshipInfoPanel);
            AlertManager.showAlert("该赛事已经结束。", ChampionshipManager.reqGetMTTListInfo);
        }
    }
    /**
     * 发送获取排名的请求
    */
    public static reqRankInfo(recordId: number, startRank: number = 0, count: number = 10)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let isBottom: boolean = true;
            let mttRankInfo: Array<ChampionshipRankInfo> = new Array<ChampionshipRankInfo>();
            let data:msg.RS2C_RetMTTRankInfo = result.data;
            if (data && data.ranklist)
            {
                if (data.ranklist.length < count)
                {
                    isBottom = true;
                } else
                {
                    isBottom = false;
                }
                for (let rankInfo of data.ranklist)
                {
                    let info: ChampionshipRankInfo = new ChampionshipRankInfo();
                    info.copyValueFromIgnoreCase(rankInfo);
                    mttRankInfo.push(info);
                }
            }
            ChampionshipManager.OnRankInfoEvent.dispatch({ isBottom: isBottom, rankList: mttRankInfo });
        };
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqMTTRankInfo, { recordid: recordId, startrank: startRank, count: count }, callback, null, this);
    }
    /**
     * 发送退赛请求
    */
    public static reqWithdraw(recordId: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let withdrawMatch: MatchRoomInfo;
            if (ChampionshipManager.joinMTTList && ChampionshipManager.joinMTTList.length > 0)
            {
                for (let i: number = 0; i < ChampionshipManager.joinMTTList.length; i++)
                {
                    if (ChampionshipManager.joinMTTList[i].recordId == recordId)
                    {
                        withdrawMatch = ChampionshipManager.joinMTTList[i];
                        ChampionshipManager.joinMTTList.splice(i, 1);
                        break;
                    }
                }
                if (InfoUtil.checkAvailable(withdrawMatch) && withdrawMatch.definition.Type == MatchType.MTT)
                {
                    ChampionshipManager.remindMTTStart();
                }
            }
            if (InfoUtil.checkAvailable(withdrawMatch))
            {
                if (withdrawMatch.definition.Type == MatchType.MTT)
                {
                    ChampionshipManager.setNotJoinFromMTTList(recordId);
                } else if (withdrawMatch.definition.Type == MatchType.SNG)
                {
                    ChampionshipManager.setNotJoinFromSitAndPlayList(recordId);
                }
                ChampionshipManager.onRefreshMTTListEvent.dispatch({ type: MTTRefreshType.MTTList });
                ChampionshipManager.OnWithdrawEvent.dispatch({ joinWay: withdrawMatch.joinWay, recordId: recordId });
            }
        };
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqMTTQuit, { recordid: recordId }, callback, null, this);
    }
    /**
     * 退赛时将该赛事在mtt列表中的报名方式置为0（未报名状态）
    */
    private static setNotJoinFromMTTList(recordId)
    {
        for (let i: number = 0; i < ChampionshipManager.showMTTList.length; i++)
        {
            if (ChampionshipManager.showMTTList[i].recordId == recordId)
            {
                ChampionshipManager.showMTTList[i].joinWay = 0;
                break;
            }
        }
    }
    /**
     * 退赛时将该赛事在坐满即玩列表中的报名方式置为0（未报名状态）
    */
    private static setNotJoinFromSitAndPlayList(recordId)
    {
        for (let i: number = 0; i < ChampionshipManager.processMTTList.length; i++)
        {
            if (ChampionshipManager.processMTTList[i].recordId == recordId)
            {
                ChampionshipManager.processMTTList[i].joinWay = 0;
                break;
            }
        }
    }
    /**********服务器推送通知的相应操作****************/
    /**
     * 各赛事报名人数数据推送对应的操作
    */
    public static onJoinNumPush(result: game.SpRpcResult)
    {
        let data:msg.RS2C_PushMTTJoinNumChange = result.data;
        if (data && data.mttlist)
        {
            for (let mttInfo of data.mttlist)  
            {
                if (ChampionshipManager.processMTTList)
                {
                    for (let matchiInfo of ChampionshipManager.processMTTList)
                    {
                        if (mttInfo.id == matchiInfo.recordId)
                        {
                            matchiInfo.join = mttInfo.join;
                            break;
                        }
                    }
                }
                if (ChampionshipManager.joinMTTList)
                {
                    for (let applicationInfo of ChampionshipManager.joinMTTList)
                    {
                        if (mttInfo.id == applicationInfo.recordId)
                        {
                            applicationInfo.join = mttInfo.join;
                            break;
                        }
                    }
                }
                if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo))
                {
                    if (mttInfo.id == GamblingManager.matchRoomInfo.recordId)
                    {
                        GamblingManager.matchRoomInfo.join = mttInfo.join;
                    }
                }
            }
            ChampionshipManager.mttRemindStartHandler.sitAndPlayStartRemind();
            ChampionshipManager.onRefreshMTTListEvent.dispatch({ data: data.mttlist, type: MTTRefreshType.MTTJOinNum });
        }
    }
    /**
     * 赛事因为人数不满足最小报名人数而取消推送对应的操作
     */
    public static onCancelMTTPush(result: game.SpRpcResult)
    {
        let data:msg.RS2C_PushMTTCancel = result.data;
        if (data)
        {
            let info: MatchRoomInfo = new MatchRoomInfo();
            for (let matchInfo of ChampionshipManager.processMTTList)
            {
                if (matchInfo.recordId == data.recordid)
                {
                    info = matchInfo;
                }
            }
            if (InfoUtil.checkAvailable(info))
            {
                AlertManager.showAlert("您报名的" + info.definition.Name + "因为报名人数不足已经取消，您的所有报名费用/门票已经返还给您！");
            }
            UIManager.closePanel(UIModuleName.SecondRemindPanel);
            ChampionshipManager.OnCancelMTTPushEvent.dispatch(info);
            ChampionshipManager.refreshMTTMatchInfo(data.recordid, true);
        }
    }
    /**
     * 赛事结束推送对应的操作（该玩家被淘汰）
    */
    public static onMTTOverPush(result: game.SpRpcResult)
    {
        let data:msg.RS2C_PushMTTWeedOut = result.data;
        if (data && data.recordid)
        {
            if (SceneManager.sceneType == SceneType.Game && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match
                && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.recordId == data.recordid)
            {
                game.Console.log("推送锦标赛结束，recordId：" + data.recordid);
                GamblingManager.championshipHandler.outChampionship(data.recordid);
            }
            ChampionshipManager.refreshMTTMatchInfo(data.recordid, true);
            ChampionshipManager.OnMTTOverPushEvent.dispatch(data);
        }
    }
    /**
     * 赛事房间信息推送
    */
    public static onMTTRoomIdPush(result: game.SpRpcResult)
    {
        let data:msg.RS2C_PushMTTRoomId = result.data;
        if (data)
        {
            let matchRoomInfo: MatchRoomInfo = ChampionshipManager.getMathInfoByRecordId(data.mttid);
            if (matchRoomInfo)
            {
                matchRoomInfo.roomId = game.longToNumber(data.id);
            }
            if (GamblingManager.matchRoomInfo.recordId == data.mttid && GamblingManager.matchRoomInfo.roomId != data.id) //赛事的房间ID变更
            {
                GamblingManager.matchRoomInfo.roomId = game.longToNumber(data.id);
                ChampionshipManager.enterMttHandler.enterMatch(GamblingManager.matchRoomInfo, game.StringConstants.Empty);
            }
            ChampionshipManager.OnMTTRoomIdPushEvent.dispatch();
        }
    }
    /**
     * 比赛信息定时推送
     */
    public static onMTTRankPush(result: game.SpRpcResult)
    {
        let data:msg.RS2C_PushMTTRank = result.data;
        if (data && data.recordid)
        {
            let rInfo: MatchRoomInfo = ChampionshipManager.getMathInfoByRecordId(data.recordid);
            if (rInfo != null)
            {
                let leftJoin: number = rInfo.leftJoin;
                rInfo.copyValueFromIgnoreCase(data);
                if (!leftJoin && GamblingManager.matchRoomInfo.leftJoin)
                {
                    leftJoin = GamblingManager.matchRoomInfo.leftJoin;
                }
                rInfo.leftJoin = data.join;

                rInfo.cloneTo(GamblingManager.matchRoomInfo);
                ChampionshipManager.OnMTTRankPushEvent.dispatch({ recordId: rInfo.recordId, leftJoin: leftJoin });
            }
        }
    }
    /**
     * 有新的赛事推送
    */
    public static onMTTNewPush(result: game.SpRpcResult)
    {
        let data:msg.RS2C_PushMTTNew = result.data;
        if (data)
        {
            ChampionshipManager.OnNewMTTPushEvent.dispatch();
        }
    }

    /**
     * 赛事减少时 更新赛事和已报名赛事列表数据  （取消或被淘汰）
    */
    public static refreshMTTMatchInfo(recordId: number, flag: boolean = false)
    {
        if (recordId)
        {
            if (ChampionshipManager.processMTTList)
            {
                for (let i: number = 0; i < ChampionshipManager.processMTTList.length; i++)
                {
                    let processInfo: MatchRoomInfo = ChampionshipManager.processMTTList[i];
                    if (processInfo.recordId == recordId)
                    {
                        processInfo.isShow = 0;
                        break;
                    }
                }
                for (let i: number = 0; i < ChampionshipManager.showMTTList.length; i++)
                {
                    if (ChampionshipManager.showMTTList[i].recordId == recordId)
                    {
                        ChampionshipManager.showMTTList.splice(i, 1);
                        break;
                    }
                }
            }
            if (flag)
            {
                if (ChampionshipManager.joinMTTList)
                {
                    for (let i: number = 0; i < ChampionshipManager.joinMTTList.length; i++)
                    {
                        if (ChampionshipManager.joinMTTList[i].recordId == recordId)
                        {
                            ChampionshipManager.joinMTTList.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            ChampionshipManager.onRefreshMTTListEvent.dispatch({ type: MTTRefreshType.MTTList });
        }
    }
    /**
     * 根据赛事id获得奖励列表
    */
    public static getAwardList(id: number): Array<table.IChampionshipPrizeDefine>
    {
        let championship: table.IChampionshipDefine = table.ChampionshipById[id];
        if (championship)
        {
            let championshipPrizeList: Array<table.IChampionshipPrizeDefine> = ChampionshipPrizeDefined.GetInstance().getChampionshipPrizeList(championship.Prize);
            return championshipPrizeList;
        }
        return null;
    }
    /**
     * 根据房间号获得赛事信息
     */
    public static getMatchRoomInfoByRoomId(roomId: number): MatchRoomInfo
    {
        for (let info of ChampionshipManager.processMTTList)
        {
            if (info.roomId == roomId)
            {
                return info;
            }
        }
        return null;
    }
    /**
     * 根据赛事唯一Id获得赛事信息
     */
    public static getMathInfoByRecordId(recordId: number): MatchRoomInfo
    {
        if (ChampionshipManager.processMTTList)
        {
            for (let info of ChampionshipManager.processMTTList)
            {
                if (info.recordId == recordId)
                {
                    return info;
                }
            }
        }
        return null;
    }
    /**
     * 根据赛事Id获得正在参与的赛事
     */
    public static getJoinedMathInfoById(id: number): MatchRoomInfo
    {
        for (let info of ChampionshipManager.joinMTTList)
        {
            if (info.id == id && !info.outTime && !info.endTime)
            {
                return info;
            }
        }
        return null;
    }
    /**
     * 获取进入奖励圈的排名
     */
    public static getAwardMaxRank(championship: table.IChampionshipDefine): number
    {
        let maxRank: number = 0;
        if (championship)
        {
            let championshipPrizeList: Array<table.IChampionshipPrizeDefine> = ChampionshipPrizeDefined.GetInstance().getChampionshipPrizeList(championship.Prize);
            if (championshipPrizeList)
            {
                for (let info of championshipPrizeList)
                {
                    if (info.End > maxRank)
                    {
                        maxRank = info.End;
                    }
                }
            }
        }
        return maxRank;
    }
    /**
     * 设置赛况盲注级别信息
    */
    public static setOutsBlindInfo(blindDef: table.IChampionshipBlindDefine)
    {
        if (blindDef)
        {
            if (blindDef.PreBet)
            {
                ChampionshipManager.matchOutsInfo.nowAnte = blindDef.PreBet;
            } else
            {
                ChampionshipManager.matchOutsInfo.nowAnte = 0;
            }
            ChampionshipManager.matchOutsInfo.nowSBlind = blindDef.SBlind;
            ChampionshipManager.matchOutsInfo.nowBBlind = blindDef.BBlind;
        }
        if (ChampionshipManager.blindList && ChampionshipManager.blindList.length > 0 && ChampionshipManager.nowBlindRank < ChampionshipManager.blindList.length)
        {
            blindDef = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank + 1, ChampionshipManager.nowBlindId);
        }
        if (blindDef)
        {
            if (blindDef.PreBet)
            {
                ChampionshipManager.matchOutsInfo.nextAnte = blindDef.PreBet;
            } else
            {
                ChampionshipManager.matchOutsInfo.nextAnte = 0;
            }
            ChampionshipManager.matchOutsInfo.nextSBlind = blindDef.SBlind;
            ChampionshipManager.matchOutsInfo.nextBBlind = blindDef.BBlind;
        }
    }
    /**
     * 设置赛况涨盲时间
    */
    public static setOutsAddBlindTimeInfo(upTime: number)
    {
        ChampionshipManager.matchOutsInfo.addBlindTime = upTime;
    }
    /**
	 * 请求赛事列表广播事件
	 */
    public static onGetMatchListEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
	 * 请求已参加赛事列表广播事件
	 */
    public static onGetJoinedMatchListEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 请求最近赛况信息广播事件
    */
    public static onGetRecentActionInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 刷新MTT赛事列表信息广播事件
    */
    public static onRefreshMTTListEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 立即报名成功广播事件
    */
    public static onRequestJoinEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 最近赛况列表点击事件广播
    */
    public static onOutsItemClickEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 请求赛况信息广播事件
    */
    public static OnOutsInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 请求排名信息广播事件
    */
    public static OnRankInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 请求退赛广播事件
    */
    public static OnWithdrawEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 获取最近赛况的排名信息成功广播事件
    */
    public static OnGetRankListEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 锦标赛房间Id推送广播事件
     */
    public static OnMTTRoomIdPushEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
    *  锦标赛排名推送广播事件
    */
    public static OnMTTRankPushEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 比赛结束
     */
    public static OnMTTOverPushEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 比赛取消
     */
    public static OnCancelMTTPushEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 有新比赛广播
     */
    public static OnNewMTTPushEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}
enum MTTRefreshType
{
    /**
     * 赛事列表更新
    */
    MTTList = 1,
    /**
     * 赛事人数更新
    */
    MTTJOinNum = 2
}