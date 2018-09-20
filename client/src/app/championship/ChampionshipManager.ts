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
    public static blindList: Array<ChampionshipBlindDefinition>;
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
        SocketManager.AddCommandListener(Command.MTTJoinNumChange_Push_2114, ChampionshipManager.onJoinNumPush, this);
        //比赛取消推送
        SocketManager.AddCommandListener(Command.MTTCancel_Push_2115, ChampionshipManager.onCancelMTTPush, this);
        //比赛结算推送(该玩家被淘汰)
        SocketManager.AddCommandListener(Command.MTTWeedOut_Push_2118, ChampionshipManager.onMTTOverPush, this);
        //赛事房间id推送
        SocketManager.AddCommandListener(Command.MTTRoomId_Push_2116, ChampionshipManager.onMTTRoomIdPush, this);
        //推送赛事排名
        SocketManager.AddCommandListener(Command.MTTRank_Push_2117, ChampionshipManager.onMTTRankPush, this);
        //推送有新的赛事
        SocketManager.AddCommandListener(Command.MTTNew_Push_2121, ChampionshipManager.onMTTNewPush, this);
    }
    public static initialize(result: qin.SpRpcResult)
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
        //拉取已报名的赛事列表
        ChampionshipManager.reqJoinedMTTList();

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
        qin.ArrayUtil.Clear(ChampionshipManager.showSitAndPlayList);
        let matchDefList: Array<ChampionshipDefinition> = ChampionshipDefined.GetInstance().getSitAndPlayMatchList();
        if (matchDefList)
        {
            for (let def of matchDefList)
            {
                let matchInfo: MatchRoomInfo = new MatchRoomInfo();
                matchInfo.id = def.id;
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
        let subDefList: Array<SystemTimeDefinition> = SystemTimeDefined.GetInstance().getSubListById(matchInfo.definition.timeId);
        if (subDefList)
        {
            matchInfo.openTime = SystemTimeManager.GetDateTimeByArray(subDefList[0].start, TimeManager.GetServerLocalDateTime()).getTime();
            if (subDefList[0].end)
            {
                matchInfo.closeTime = SystemTimeManager.GetDateTimeByArray(subDefList[0].end, TimeManager.GetServerLocalDateTime()).getTime();
            }
        }
    }
    /**
     * 发送获取锦标赛赛事列表的请求
    */
    public static reqGetMTTListInfo()
    {
        SocketManager.call(Command.MTTList_Req_3611, null, ChampionshipManager.getMTTListInfoResponse, null, this);
    }
    private static getMTTListInfoResponse(result: qin.SpRpcResult)
    {
        if (result.data && result.data["MTTList"])
        {
            let tmpProcessList: Array<MatchRoomInfo> = ChampionshipManager.processMTTList.concat();
            qin.ArrayUtil.Clear(ChampionshipManager.processMTTList);
            qin.ArrayUtil.Clear(ChampionshipManager.showMTTList);

            for (let mttInfo of result.data["MTTList"])
            {
                let matchInfo: MatchRoomInfo = new MatchRoomInfo();
                matchInfo.copyValueFrom(mttInfo);
                for (let existInfo of tmpProcessList)
                {
                    if (existInfo.recordId == matchInfo.recordId)
                    {
                        matchInfo.roomId = existInfo.roomId; //沿用上次数据的房间ID 单步更新有推送
                        break;
                    }
                }
                matchInfo.leftJoin = mttInfo.leftjoin;
                let chapDef: ChampionshipDefinition = matchInfo.definition;
                if (chapDef)
                {
                    if (chapDef.type == MatchType.MTT)
                    {
                        ChampionshipManager.setIsMTTShow(chapDef, matchInfo, mttInfo);
                        if (matchInfo.isShow)
                        {
                            ChampionshipManager.showMTTList.push(matchInfo);
                        }
                    }
                    else if (chapDef.type == MatchType.SNG)
                    {
                        matchInfo.isShow = 1;
                        if (!matchInfo.isRemineded && matchInfo.join >= matchInfo.definition.bNum)
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
            if (matchInfo.definition.type == MatchType.MTT)
            {
                if (matchInfo.definition.signTime != matchInfo.definition.displayTime && matchInfo.isShow == 1)
                {
                    if (matchInfo.startTime - matchInfo.definition.signTime < TimeManager.GetServerUtcTimestamp())
                    {
                        return true;
                    } else
                    {
                        return false;
                    }
                } else if (matchInfo.definition.signTime == matchInfo.definition.displayTime && matchInfo.isShow == 1)
                {
                    return true;
                }
            } else if (matchInfo.definition.type == MatchType.SNG)
            {
                if (SystemTimeManager.IsInTime(matchInfo.definition.timeId) && matchInfo.isShow == 1)
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
    private static setIsMTTShow(chapDef: ChampionshipDefinition, matchinfo: MatchRoomInfo, mttInfo: any)
    {
        if (chapDef.delaySign)
        {
            if (TimeManager.GetServerUtcTimestamp() < matchinfo.startTime + chapDef.delaySign && !mttInfo.outTime && !mttInfo.endTime)
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
        let callback: Function = function (result: qin.SpRpcResult)
        {
            if (result.data && result.data.Array)
            {
                qin.ArrayUtil.Clear(ChampionshipManager.joinMTTList);
                for (let mttInfo of result.data.Array)
                {
                    let matchinfo: MatchRoomInfo = new MatchRoomInfo();
                    matchinfo.copyValueFrom(mttInfo);
                    if (matchinfo.definition && matchinfo.definition.type == MatchType.SNG)
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
        SocketManager.call(Command.JoinedMTTList_Req_3706, null, callback, null, this);
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
        SocketManager.call(Command.MTTRecordList_Req_3615, null, ChampionshipManager.getGetRecentActionInfoResponse, null, this);
    }
    public static getGetRecentActionInfoResponse(result: qin.SpRpcResult)
    {
        if (result.data)
        {
            qin.ArrayUtil.Clear(ChampionshipManager.outsList);
            for (let recordInfo of result.data["recordList"])
            {
                let record: OutsInfo = new OutsInfo();
                let rankInfo: ChampionshipRankInfo = new ChampionshipRankInfo();
                record.id = recordInfo.id;
                record.recordId = recordInfo.recordId;
                record.time = recordInfo.startTime;
                record.rankList = new Array<ChampionshipRankInfo>();
                let def: ChampionshipDefinition = ChampionshipDefined.GetInstance().getDefinition(recordInfo.id);
                let championshipPrizeList: Array<ChampionshipPrizeDefinition>;
                if (def)
                {
                    record.name = def.name;
                    championshipPrizeList = ChampionshipManager.getAwardList(def.id);
                }
                rankInfo.name = recordInfo["name"];
                rankInfo.rank = 1;
                if (recordInfo['head'])
                {
                    rankInfo.head = recordInfo["head"];
                }
                if (recordInfo["sex"])
                {
                    rankInfo.sex = recordInfo["sex"];
                } else
                {
                    rankInfo.sex = 0;
                }
                if (championshipPrizeList)
                {
                    for (let championshipPrize of championshipPrizeList)
                    {
                        if (rankInfo.rank == championshipPrize.start)
                        {
                            let str: string = "获得";
                            let des = AwardDefined.GetInstance().getAwardNameById(championshipPrize.awardId);
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
        let callback: Function = function (result: qin.SpRpcResult)
        {
            if (result.data && result.data["rankList"])
            {
                for (let rankInfo of result.data["rankList"])
                {
                    let rank: ChampionshipRankInfo = new ChampionshipRankInfo();
                    rank.copyValueFrom(rankInfo);
                    let championshipPrizeList: Array<ChampionshipPrizeDefinition> = ChampionshipManager.getAwardList(ChampionshipManager.recentMTTId);
                    if (championshipPrizeList)
                    {
                        for (let championshipPrize of championshipPrizeList)
                        {
                            if (rankInfo.rank == championshipPrize.start)
                            {
                                let str: string = "获得";
                                let des: string = AwardDefined.GetInstance().getAwardNameById(championshipPrize.awardId);
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
        SocketManager.call(Command.MTTRecentlyRankList_Req_3616, { recordId: recordId }, callback, null, this);
    }
    /**
     * 发送立即报名的请求
    */
    public static reqRequestJoin(recordId: number, flag: JoinChampionshipWay, startTime: number, id: number, type: MatchType)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            if (type == MatchType.SNG)
            {
                let isExist: boolean = false;
                for (let sngInfo of ChampionshipManager.processMTTList)
                {
                    if (sngInfo.recordId == result.data.recordId)  //存在 更新
                    {
                        isExist = true;
                        sngInfo.join++;
                        sngInfo.joinWay = flag;
                        ChampionshipManager.setOpenAndCloseTime(sngInfo);
                        ChampionshipManager.joinMTTList.push(sngInfo);
                        ChampionshipManager.enterMttHandler.enterMatch(sngInfo, qin.StringConstants.Empty);
                        break;
                    }
                }
                if (!isExist)  //不存在 添加
                {
                    let info: MatchRoomInfo = new MatchRoomInfo();
                    info.id = id;
                    info.recordId = result.data["recordId"];
                    info.isRemineded = false;
                    info.join = 1;
                    info.joinWay = flag;
                    ChampionshipManager.setOpenAndCloseTime(info);
                    ChampionshipManager.processMTTList.push(info);
                    ChampionshipManager.joinMTTList.push(info);
                    ChampionshipManager.enterMttHandler.enterMatch(info, qin.StringConstants.Empty);
                }
            }
            else if (type == MatchType.MTT)
            {
                let championshipInfo: MatchRoomInfo;
                for (championshipInfo of ChampionshipManager.processMTTList)
                {
                    if (championshipInfo.recordId == result.data.recordId)
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
                    UIManager.showPanel(UIModuleName.JoinChampionshipSuccessPanel, { name: championshipInfo.definition.name, time: championshipInfo.startTime, applyNum: championshipInfo.join, bNum: championshipInfo.definition.bNum, chip: championshipInfo.definition.initialChips });
                }
            }
            ChampionshipManager.onRequestJoinEvent.dispatch({ flag: flag, recordId: result.data.recordId });
        };
        if (ChampionshipManager.isNotFull(recordId, type))
        {
            if (type == MatchType.MTT)
            {
                SocketManager.call(Command.MTTRequestJoin_Req_3612, { recordId: recordId, joinWay: flag }, callback, ChampionshipManager.MTTCancelErrorDispose, this);
            } else if (type == MatchType.SNG)
            {
                SocketManager.call(Command.MTTRequestJoin_Req_3612, { joinWay: flag, id: id }, callback, null, this);
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

        if (InfoUtil.checkAvailable(mttInfo) && mttInfo.join < mttInfo.definition.bNum)
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
    public static MTTCancelErrorDispose(result: qin.SpRpcResult)
    {
        if (result.cmdId == Command.MTTRequestJoin_Req_3612)
        {
            AlertManager.showAlert("该赛事因为报名人数不足已经取消。", ChampionshipManager.reqGetMTTListInfo);
        }
    }
    /**
     * 发送获取赛况请求
    */
    public static reqOutsInfo(recordId: number, blindType: number)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            if (result.data)
            {
                ChampionshipManager.nowBlindId = blindType;
                if (!ChampionshipManager.matchOutsInfo)
                {
                    ChampionshipManager.matchOutsInfo = new MatchOutsInfo();
                }
                if (result.data["blindLevel"])  //如果赛事没开始，盲注级别应该为1
                {
                    ChampionshipManager.nowBlindRank = result.data["blindLevel"];
                    let addBlindTime: number = Math.floor(result.data["blindTime"] - TimeManager.GetServerUtcTimestamp());
                    if (addBlindTime <= 0)
                    {
                        ChampionshipManager.matchOutsInfo.addBlindTime = 0;
                    } else
                    {
                        ChampionshipManager.matchOutsInfo.addBlindTime = Math.floor(result.data["blindTime"] - TimeManager.GetServerUtcTimestamp());
                    }
                }
                else
                {
                    ChampionshipManager.nowBlindRank = 1;
                    let mttBlindDef: ChampionshipBlindDefinition = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank, blindType);
                    if (mttBlindDef)
                    {
                        ChampionshipManager.matchOutsInfo.addBlindTime = mttBlindDef.upTime;
                    }
                }
                let blindDef: ChampionshipBlindDefinition = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank, blindType);
                ChampionshipManager.setOutsBlindInfo(blindDef);
                ChampionshipManager.matchOutsInfo.rank = result.data["rank"];
                ChampionshipManager.OnOutsInfoEvent.dispatch();
            }
        };
        if (recordId != undefined)
        {
            SocketManager.call(Command.MTTOutsInfo_Req_3617, { recordId: recordId }, callback, ChampionshipManager.MTTOverErrorDispose, this);
        }
    }
    /**
     * 赛事已结束错误处理
    */
    public static MTTOverErrorDispose(result: qin.SpRpcResult)
    {
        if (result.cmdId == Command.MTTOutsInfo_Req_3617 || result.cmdId == Command.EnterRoomInfo_Req_3600)
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
        let callback: Function = function (result: qin.SpRpcResult)
        {
            let isBottom: boolean = true;
            let mttRankInfo: Array<ChampionshipRankInfo> = new Array<ChampionshipRankInfo>();
            if (result.data && result.data["rankList"])
            {
                if (result.data["rankList"].length < count)
                {
                    isBottom = true;
                } else
                {
                    isBottom = false;
                }
                for (let rankInfo of result.data["rankList"])
                {
                    let info: ChampionshipRankInfo = new ChampionshipRankInfo();
                    info.copyValueFrom(rankInfo);
                    mttRankInfo.push(info);
                }
            }
            ChampionshipManager.OnRankInfoEvent.dispatch({ isBottom: isBottom, rankList: mttRankInfo });
        };
        SocketManager.call(Command.MTTRankInfo_Req_3618, { recordId: recordId, startRank: startRank, count: count }, callback, null, this);
    }
    /**
     * 发送退赛请求
    */
    public static reqWithdraw(recordId: number)
    {
        let callback: Function = function (result: qin.SpRpcResult)
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
                if (InfoUtil.checkAvailable(withdrawMatch) && withdrawMatch.definition.type == MatchType.MTT)
                {
                    ChampionshipManager.remindMTTStart();
                }
            }
            if (InfoUtil.checkAvailable(withdrawMatch))
            {
                if (withdrawMatch.definition.type == MatchType.MTT)
                {
                    ChampionshipManager.setNotJoinFromMTTList(recordId);
                } else if (withdrawMatch.definition.type == MatchType.SNG)
                {
                    ChampionshipManager.setNotJoinFromSitAndPlayList(recordId);
                }
                ChampionshipManager.onRefreshMTTListEvent.dispatch({ type: MTTRefreshType.MTTList });
                ChampionshipManager.OnWithdrawEvent.dispatch({ joinWay: withdrawMatch.joinWay, recordId: recordId });
            }
        };
        SocketManager.call(Command.MTTRequestWithdraw_Req_3613, { recordId: recordId }, callback, null, this);
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
    public static onJoinNumPush(result: qin.SpRpcResult)
    {
        if (result.data && result.data["MTTList"])
        {
            for (let mttInfo of result.data['MTTList'])  
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
            ChampionshipManager.onRefreshMTTListEvent.dispatch({ data: result.data["MTTList"], type: MTTRefreshType.MTTJOinNum });
        }
    }
    /**
     * 赛事因为人数不满足最小报名人数而取消推送对应的操作
     */
    public static onCancelMTTPush(result: qin.SpRpcResult)
    {
        if (result.data)
        {
            let info: MatchRoomInfo = new MatchRoomInfo();
            for (let matchInfo of ChampionshipManager.processMTTList)
            {
                if (matchInfo.recordId == result.data["recordId"])
                {
                    info = matchInfo;
                }
            }
            if (InfoUtil.checkAvailable(info))
            {
                AlertManager.showAlert("您报名的" + info.definition.name + "因为报名人数不足已经取消，您的所有报名费用/门票已经返还给您！");
            }
            UIManager.closePanel(UIModuleName.SecondRemindPanel);
            ChampionshipManager.OnCancelMTTPushEvent.dispatch(info);
            ChampionshipManager.refreshMTTMatchInfo(result.data["recordId"], true);
        }
    }
    /**
     * 赛事结束推送对应的操作（该玩家被淘汰）
    */
    public static onMTTOverPush(result: qin.SpRpcResult)
    {
        if (result.data && result.data["recordId"])
        {
            if (SceneManager.sceneType == SceneType.Game && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match
                && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.recordId == result.data["recordId"])
            {
                qin.Console.log("推送锦标赛结束，recordId：" + result.data["recordId"]);
                GamblingManager.championshipHandler.outChampionship(result.data["recordId"]);
            }
            ChampionshipManager.refreshMTTMatchInfo(result.data["recordId"], true);
            ChampionshipManager.OnMTTOverPushEvent.dispatch(result.data);
        }
    }
    /**
     * 赛事房间信息推送
    */
    public static onMTTRoomIdPush(result: qin.SpRpcResult)
    {
        if (result.data)
        {
            let matchRoomInfo: MatchRoomInfo = ChampionshipManager.getMathInfoByRecordId(result.data.mttId);
            if (matchRoomInfo)
            {
                matchRoomInfo.roomId = result.data.id;
            }
            if (GamblingManager.matchRoomInfo.recordId == result.data.mttId && GamblingManager.matchRoomInfo.roomId != result.data.id) //赛事的房间ID变更
            {
                GamblingManager.matchRoomInfo.roomId = result.data.id;
                ChampionshipManager.enterMttHandler.enterMatch(GamblingManager.matchRoomInfo, qin.StringConstants.Empty);
            }
            ChampionshipManager.OnMTTRoomIdPushEvent.dispatch();
        }
    }
    /**
     * 比赛信息定时推送
     */
    public static onMTTRankPush(result: qin.SpRpcResult)
    {
        if (result.data && result.data["recordId"])
        {
            let rInfo: MatchRoomInfo = ChampionshipManager.getMathInfoByRecordId(result.data["recordId"]);
            if (rInfo != null)
            {
                let leftJoin: number = rInfo.leftJoin;
                rInfo.copyValueFrom(result.data);
                if (!leftJoin && GamblingManager.matchRoomInfo.leftJoin)
                {
                    leftJoin = GamblingManager.matchRoomInfo.leftJoin;
                }
                rInfo.leftJoin = result.data["join"];

                rInfo.cloneTo(GamblingManager.matchRoomInfo);
                ChampionshipManager.OnMTTRankPushEvent.dispatch({ recordId: rInfo.recordId, leftJoin: leftJoin });
            }
        }
    }
    /**
     * 有新的赛事推送
    */
    public static onMTTNewPush(result: qin.SpRpcResult)
    {
        if (result.data)
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
    public static getAwardList(id: number): Array<ChampionshipPrizeDefinition>
    {
        let championship: ChampionshipDefinition = ChampionshipDefined.GetInstance().getDefinition(id);
        if (championship)
        {
            let championshipPrizeList: Array<ChampionshipPrizeDefinition> = ChampionshipPrizeDefined.GetInstance().getChampionshipPrizeList(championship.prize);
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
    public static getAwardMaxRank(championship: ChampionshipDefinition): number
    {
        let maxRank: number = 0;
        if (championship)
        {
            let championshipPrizeList: Array<ChampionshipPrizeDefinition> = ChampionshipPrizeDefined.GetInstance().getChampionshipPrizeList(championship.prize);
            if (championshipPrizeList)
            {
                for (let info of championshipPrizeList)
                {
                    if (info.end > maxRank)
                    {
                        maxRank = info.end;
                    }
                }
            }
        }
        return maxRank;
    }
    /**
     * 设置赛况盲注级别信息
    */
    public static setOutsBlindInfo(blindDef: ChampionshipBlindDefinition)
    {
        if (blindDef)
        {
            if (blindDef.preBet)
            {
                ChampionshipManager.matchOutsInfo.nowAnte = blindDef.preBet;
            } else
            {
                ChampionshipManager.matchOutsInfo.nowAnte = 0;
            }
            ChampionshipManager.matchOutsInfo.nowSBlind = blindDef.sBlind;
            ChampionshipManager.matchOutsInfo.nowBBlind = blindDef.bBlind;
        }
        if (ChampionshipManager.blindList && ChampionshipManager.blindList.length > 0 && ChampionshipManager.nowBlindRank < ChampionshipManager.blindList.length)
        {
            blindDef = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank + 1, ChampionshipManager.nowBlindId);
        }
        if (blindDef)
        {
            if (blindDef.preBet)
            {
                ChampionshipManager.matchOutsInfo.nextAnte = blindDef.preBet;
            } else
            {
                ChampionshipManager.matchOutsInfo.nextAnte = 0;
            }
            ChampionshipManager.matchOutsInfo.nextSBlind = blindDef.sBlind;
            ChampionshipManager.matchOutsInfo.nextBBlind = blindDef.bBlind;
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
    public static onGetMatchListEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
	 * 请求已参加赛事列表广播事件
	 */
    public static onGetJoinedMatchListEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 请求最近赛况信息广播事件
    */
    public static onGetRecentActionInfoEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 刷新MTT赛事列表信息广播事件
    */
    public static onRefreshMTTListEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 立即报名成功广播事件
    */
    public static onRequestJoinEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 最近赛况列表点击事件广播
    */
    public static onOutsItemClickEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 请求赛况信息广播事件
    */
    public static OnOutsInfoEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 请求排名信息广播事件
    */
    public static OnRankInfoEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 请求退赛广播事件
    */
    public static OnWithdrawEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 获取最近赛况的排名信息成功广播事件
    */
    public static OnGetRankListEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 锦标赛房间Id推送广播事件
     */
    public static OnMTTRoomIdPushEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
    *  锦标赛排名推送广播事件
    */
    public static OnMTTRankPushEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 比赛结束
     */
    public static OnMTTOverPushEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 比赛取消
     */
    public static OnCancelMTTPushEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 有新比赛广播
     */
    public static OnNewMTTPushEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
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