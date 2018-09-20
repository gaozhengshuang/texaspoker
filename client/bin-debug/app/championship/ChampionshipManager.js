var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 锦标赛管理
 */
var ChampionshipManager = (function () {
    function ChampionshipManager() {
    }
    /**
     * 添加推送监听
    */
    ChampionshipManager.addPushListener = function () {
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
    };
    ChampionshipManager.initialize = function (result) {
        ChampionshipManager.addPushListener();
        if (!ChampionshipManager.mttRemindStartHandler) {
            ChampionshipManager.mttRemindStartHandler = new MTTRemindStartHandler();
        }
        if (!ChampionshipManager.showMTTList) {
            ChampionshipManager.showMTTList = new Array();
        }
        if (!ChampionshipManager.joinMTTList) {
            ChampionshipManager.joinMTTList = new Array();
        }
        if (!ChampionshipManager.processMTTList) {
            ChampionshipManager.processMTTList = new Array();
        }
        if (!ChampionshipManager.outsList) {
            ChampionshipManager.outsList = new Array();
        }
        if (!ChampionshipManager.showSitAndPlayList) {
            ChampionshipManager.showSitAndPlayList = new Array();
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
    };
    /**
     * 初始化设置锦标赛所在房间列表
    */
    ChampionshipManager.initMTTRoomListInfo = function () {
        var list = InsideRoomManager.getInfoListByType(InsideRoomType.Match);
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var roomInfo = list_1[_i];
            var matchRoomInfo = ChampionshipManager.getMathInfoByRecordId(roomInfo.mttId);
            if (matchRoomInfo) {
                matchRoomInfo.roomId = roomInfo.id;
            }
        }
    };
    /**
     * 设置坐满即玩赛事列表
    */
    ChampionshipManager.initSitAndPlayListInfo = function () {
        qin.ArrayUtil.Clear(ChampionshipManager.showSitAndPlayList);
        var matchDefList = ChampionshipDefined.GetInstance().getSitAndPlayMatchList();
        if (matchDefList) {
            for (var _i = 0, matchDefList_1 = matchDefList; _i < matchDefList_1.length; _i++) {
                var def = matchDefList_1[_i];
                var matchInfo = new MatchRoomInfo();
                matchInfo.id = def.id;
                matchInfo.isShow = 1;
                ChampionshipManager.setOpenAndCloseTime(matchInfo);
                ChampionshipManager.showSitAndPlayList.push(matchInfo);
            }
        }
    };
    /**
     * 设置坐满即玩赛事开放和关闭时间
    */
    ChampionshipManager.setOpenAndCloseTime = function (matchInfo) {
        var subDefList = SystemTimeDefined.GetInstance().getSubListById(matchInfo.definition.timeId);
        if (subDefList) {
            matchInfo.openTime = SystemTimeManager.GetDateTimeByArray(subDefList[0].start, TimeManager.GetServerLocalDateTime()).getTime();
            if (subDefList[0].end) {
                matchInfo.closeTime = SystemTimeManager.GetDateTimeByArray(subDefList[0].end, TimeManager.GetServerLocalDateTime()).getTime();
            }
        }
    };
    /**
     * 发送获取锦标赛赛事列表的请求
    */
    ChampionshipManager.reqGetMTTListInfo = function () {
        SocketManager.call(Command.MTTList_Req_3611, null, ChampionshipManager.getMTTListInfoResponse, null, this);
    };
    ChampionshipManager.getMTTListInfoResponse = function (result) {
        if (result.data && result.data["MTTList"]) {
            var tmpProcessList = ChampionshipManager.processMTTList.concat();
            qin.ArrayUtil.Clear(ChampionshipManager.processMTTList);
            qin.ArrayUtil.Clear(ChampionshipManager.showMTTList);
            for (var _i = 0, _a = result.data["MTTList"]; _i < _a.length; _i++) {
                var mttInfo = _a[_i];
                var matchInfo = new MatchRoomInfo();
                matchInfo.copyValueFrom(mttInfo);
                for (var _b = 0, tmpProcessList_1 = tmpProcessList; _b < tmpProcessList_1.length; _b++) {
                    var existInfo = tmpProcessList_1[_b];
                    if (existInfo.recordId == matchInfo.recordId) {
                        matchInfo.roomId = existInfo.roomId; //沿用上次数据的房间ID 单步更新有推送
                        break;
                    }
                }
                matchInfo.leftJoin = mttInfo.leftjoin;
                var chapDef = matchInfo.definition;
                if (chapDef) {
                    if (chapDef.type == MatchType.MTT) {
                        ChampionshipManager.setIsMTTShow(chapDef, matchInfo, mttInfo);
                        if (matchInfo.isShow) {
                            ChampionshipManager.showMTTList.push(matchInfo);
                        }
                    }
                    else if (chapDef.type == MatchType.SNG) {
                        matchInfo.isShow = 1;
                        if (!matchInfo.isRemineded && matchInfo.join >= matchInfo.definition.bNum) {
                            matchInfo.isRemineded = true;
                        }
                    }
                }
                ChampionshipManager.processMTTList.push(matchInfo);
            }
            tmpProcessList = null;
            ChampionshipManager.onGetMatchListEvent.dispatch();
        }
    };
    /**
     * 判断是否开启报名
    */
    ChampionshipManager.isStartJoin = function (matchInfo) {
        if (InfoUtil.checkAvailable(matchInfo)) {
            if (matchInfo.definition.type == MatchType.MTT) {
                if (matchInfo.definition.signTime != matchInfo.definition.displayTime && matchInfo.isShow == 1) {
                    if (matchInfo.startTime - matchInfo.definition.signTime < TimeManager.GetServerUtcTimestamp()) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (matchInfo.definition.signTime == matchInfo.definition.displayTime && matchInfo.isShow == 1) {
                    return true;
                }
            }
            else if (matchInfo.definition.type == MatchType.SNG) {
                if (SystemTimeManager.IsInTime(matchInfo.definition.timeId) && matchInfo.isShow == 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        return false;
    };
    /**
     * mtt设置是否显示
    */
    ChampionshipManager.setIsMTTShow = function (chapDef, matchinfo, mttInfo) {
        if (chapDef.delaySign) {
            if (TimeManager.GetServerUtcTimestamp() < matchinfo.startTime + chapDef.delaySign && !mttInfo.outTime && !mttInfo.endTime) {
                matchinfo.isShow = 1;
            }
        }
        else {
            if (TimeManager.GetServerUtcTimestamp() < matchinfo.startTime) {
                matchinfo.isShow = 1;
            }
        }
    };
    /**
     * 发送获取已报名的赛事列表
    */
    ChampionshipManager.reqJoinedMTTList = function () {
        var callback = function (result) {
            if (result.data && result.data.Array) {
                qin.ArrayUtil.Clear(ChampionshipManager.joinMTTList);
                for (var _i = 0, _a = result.data.Array; _i < _a.length; _i++) {
                    var mttInfo = _a[_i];
                    var matchinfo = new MatchRoomInfo();
                    matchinfo.copyValueFrom(mttInfo);
                    if (matchinfo.definition && matchinfo.definition.type == MatchType.SNG) {
                        ChampionshipManager.setOpenAndCloseTime(matchinfo);
                    }
                    for (var _b = 0, _c = ChampionshipManager.processMTTList; _b < _c.length; _b++) {
                        var existInfo = _c[_b];
                        if (existInfo.recordId == matchinfo.recordId) {
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
    };
    /**
     * 开始进行赛事倒计时（用来通知赛事将要开始）
    */
    ChampionshipManager.remindMTTStart = function () {
        if (!ChampionshipManager.mttRemindStartHandler) {
            ChampionshipManager.mttRemindStartHandler = new MTTRemindStartHandler();
        }
        ChampionshipManager.mttRemindStartHandler.onEnable();
        ChampionshipManager.mttRemindStartHandler.initialize();
    };
    /**
     * 发送获取最近赛况信息请求
    */
    ChampionshipManager.reqGetRecentActionInfo = function () {
        SocketManager.call(Command.MTTRecordList_Req_3615, null, ChampionshipManager.getGetRecentActionInfoResponse, null, this);
    };
    ChampionshipManager.getGetRecentActionInfoResponse = function (result) {
        if (result.data) {
            qin.ArrayUtil.Clear(ChampionshipManager.outsList);
            for (var _i = 0, _a = result.data["recordList"]; _i < _a.length; _i++) {
                var recordInfo = _a[_i];
                var record = new OutsInfo();
                var rankInfo = new ChampionshipRankInfo();
                record.id = recordInfo.id;
                record.recordId = recordInfo.recordId;
                record.time = recordInfo.startTime;
                record.rankList = new Array();
                var def = ChampionshipDefined.GetInstance().getDefinition(recordInfo.id);
                var championshipPrizeList = void 0;
                if (def) {
                    record.name = def.name;
                    championshipPrizeList = ChampionshipManager.getAwardList(def.id);
                }
                rankInfo.name = recordInfo["name"];
                rankInfo.rank = 1;
                if (recordInfo['head']) {
                    rankInfo.head = recordInfo["head"];
                }
                if (recordInfo["sex"]) {
                    rankInfo.sex = recordInfo["sex"];
                }
                else {
                    rankInfo.sex = 0;
                }
                if (championshipPrizeList) {
                    for (var _b = 0, championshipPrizeList_1 = championshipPrizeList; _b < championshipPrizeList_1.length; _b++) {
                        var championshipPrize = championshipPrizeList_1[_b];
                        if (rankInfo.rank == championshipPrize.start) {
                            var str = "获得";
                            var des = AwardDefined.GetInstance().getAwardNameById(championshipPrize.awardId);
                            if (des) {
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
    };
    /**
     * 发送获取最近赛况名次信息
    */
    ChampionshipManager.reqGetRankList = function (recordId) {
        var callback = function (result) {
            if (result.data && result.data["rankList"]) {
                for (var _i = 0, _a = result.data["rankList"]; _i < _a.length; _i++) {
                    var rankInfo = _a[_i];
                    var rank = new ChampionshipRankInfo();
                    rank.copyValueFrom(rankInfo);
                    var championshipPrizeList = ChampionshipManager.getAwardList(ChampionshipManager.recentMTTId);
                    if (championshipPrizeList) {
                        for (var _b = 0, championshipPrizeList_2 = championshipPrizeList; _b < championshipPrizeList_2.length; _b++) {
                            var championshipPrize = championshipPrizeList_2[_b];
                            if (rankInfo.rank == championshipPrize.start) {
                                var str = "获得";
                                var des = AwardDefined.GetInstance().getAwardNameById(championshipPrize.awardId);
                                if (des) {
                                    str += des;
                                    rank.award = str;
                                }
                            }
                        }
                    }
                    var outInfo = ChampionshipManager.getOutsInfoByRecordId(recordId);
                    if (outInfo && outInfo.rankList) {
                        if (rank.rank != 1) {
                            outInfo.rankList.push(rank);
                        }
                    }
                }
                ChampionshipManager.OnGetRankListEvent.dispatch(recordId);
            }
        };
        SocketManager.call(Command.MTTRecentlyRankList_Req_3616, { recordId: recordId }, callback, null, this);
    };
    /**
     * 发送立即报名的请求
    */
    ChampionshipManager.reqRequestJoin = function (recordId, flag, startTime, id, type) {
        var callback = function (result) {
            if (type == MatchType.SNG) {
                var isExist = false;
                for (var _i = 0, _a = ChampionshipManager.processMTTList; _i < _a.length; _i++) {
                    var sngInfo = _a[_i];
                    if (sngInfo.recordId == result.data.recordId) {
                        isExist = true;
                        sngInfo.join++;
                        sngInfo.joinWay = flag;
                        ChampionshipManager.setOpenAndCloseTime(sngInfo);
                        ChampionshipManager.joinMTTList.push(sngInfo);
                        ChampionshipManager.enterMttHandler.enterMatch(sngInfo, qin.StringConstants.Empty);
                        break;
                    }
                }
                if (!isExist) {
                    var info = new MatchRoomInfo();
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
            else if (type == MatchType.MTT) {
                var championshipInfo = void 0;
                for (var _b = 0, _c = ChampionshipManager.processMTTList; _b < _c.length; _b++) {
                    championshipInfo = _c[_b];
                    if (championshipInfo.recordId == result.data.recordId) {
                        championshipInfo.join++;
                        championshipInfo.joinWay = flag;
                        ChampionshipManager.joinMTTList.push(championshipInfo);
                        break;
                    }
                }
                ChampionshipManager.remindMTTStart();
                var time = startTime - TimeManager.GetServerUtcTimestamp();
                if (time > 0 && InfoUtil.checkAvailable(championshipInfo)) {
                    UIManager.showPanel(UIModuleName.JoinChampionshipSuccessPanel, { name: championshipInfo.definition.name, time: championshipInfo.startTime, applyNum: championshipInfo.join, bNum: championshipInfo.definition.bNum, chip: championshipInfo.definition.initialChips });
                }
            }
            ChampionshipManager.onRequestJoinEvent.dispatch({ flag: flag, recordId: result.data.recordId });
        };
        if (ChampionshipManager.isNotFull(recordId, type)) {
            if (type == MatchType.MTT) {
                SocketManager.call(Command.MTTRequestJoin_Req_3612, { recordId: recordId, joinWay: flag }, callback, ChampionshipManager.MTTCancelErrorDispose, this);
            }
            else if (type == MatchType.SNG) {
                SocketManager.call(Command.MTTRequestJoin_Req_3612, { joinWay: flag, id: id }, callback, null, this);
            }
        }
    };
    /**
     * 根据recordId获得赛况信息
    */
    ChampionshipManager.getOutsInfoByRecordId = function (recordId) {
        if (ChampionshipManager.outsList.length > 0) {
            for (var _i = 0, _a = ChampionshipManager.outsList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.recordId == recordId) {
                    return info;
                }
            }
        }
        return null;
    };
    /**
     * 验证赛事人数是否未满
    */
    ChampionshipManager.isNotFull = function (recordId, type) {
        if (recordId == undefined) {
            return true;
        }
        var mttInfo;
        for (var _i = 0, _a = ChampionshipManager.processMTTList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.recordId == recordId) {
                mttInfo = info;
                break;
            }
        }
        if (InfoUtil.checkAvailable(mttInfo) && mttInfo.join < mttInfo.definition.bNum) {
            return true;
        }
        else {
            UIManager.showFloatTips("该比赛报名已达最大人数，请选择其他比赛！");
            return false;
        }
    };
    /**
     * 赛事已取消后报名错误处理
    */
    ChampionshipManager.MTTCancelErrorDispose = function (result) {
        if (result.cmdId == Command.MTTRequestJoin_Req_3612) {
            AlertManager.showAlert("该赛事因为报名人数不足已经取消。", ChampionshipManager.reqGetMTTListInfo);
        }
    };
    /**
     * 发送获取赛况请求
    */
    ChampionshipManager.reqOutsInfo = function (recordId, blindType) {
        var callback = function (result) {
            if (result.data) {
                ChampionshipManager.nowBlindId = blindType;
                if (!ChampionshipManager.matchOutsInfo) {
                    ChampionshipManager.matchOutsInfo = new MatchOutsInfo();
                }
                if (result.data["blindLevel"]) {
                    ChampionshipManager.nowBlindRank = result.data["blindLevel"];
                    var addBlindTime = Math.floor(result.data["blindTime"] - TimeManager.GetServerUtcTimestamp());
                    if (addBlindTime <= 0) {
                        ChampionshipManager.matchOutsInfo.addBlindTime = 0;
                    }
                    else {
                        ChampionshipManager.matchOutsInfo.addBlindTime = Math.floor(result.data["blindTime"] - TimeManager.GetServerUtcTimestamp());
                    }
                }
                else {
                    ChampionshipManager.nowBlindRank = 1;
                    var mttBlindDef = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank, blindType);
                    if (mttBlindDef) {
                        ChampionshipManager.matchOutsInfo.addBlindTime = mttBlindDef.upTime;
                    }
                }
                var blindDef = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank, blindType);
                ChampionshipManager.setOutsBlindInfo(blindDef);
                ChampionshipManager.matchOutsInfo.rank = result.data["rank"];
                ChampionshipManager.OnOutsInfoEvent.dispatch();
            }
        };
        if (recordId != undefined) {
            SocketManager.call(Command.MTTOutsInfo_Req_3617, { recordId: recordId }, callback, ChampionshipManager.MTTOverErrorDispose, this);
        }
    };
    /**
     * 赛事已结束错误处理
    */
    ChampionshipManager.MTTOverErrorDispose = function (result) {
        if (result.cmdId == Command.MTTOutsInfo_Req_3617 || result.cmdId == Command.EnterRoomInfo_Req_3600) {
            UIManager.closePanel(UIModuleName.ChampionshipInfoPanel);
            AlertManager.showAlert("该赛事已经结束。", ChampionshipManager.reqGetMTTListInfo);
        }
    };
    /**
     * 发送获取排名的请求
    */
    ChampionshipManager.reqRankInfo = function (recordId, startRank, count) {
        if (startRank === void 0) { startRank = 0; }
        if (count === void 0) { count = 10; }
        var callback = function (result) {
            var isBottom = true;
            var mttRankInfo = new Array();
            if (result.data && result.data["rankList"]) {
                if (result.data["rankList"].length < count) {
                    isBottom = true;
                }
                else {
                    isBottom = false;
                }
                for (var _i = 0, _a = result.data["rankList"]; _i < _a.length; _i++) {
                    var rankInfo = _a[_i];
                    var info = new ChampionshipRankInfo();
                    info.copyValueFrom(rankInfo);
                    mttRankInfo.push(info);
                }
            }
            ChampionshipManager.OnRankInfoEvent.dispatch({ isBottom: isBottom, rankList: mttRankInfo });
        };
        SocketManager.call(Command.MTTRankInfo_Req_3618, { recordId: recordId, startRank: startRank, count: count }, callback, null, this);
    };
    /**
     * 发送退赛请求
    */
    ChampionshipManager.reqWithdraw = function (recordId) {
        var callback = function (result) {
            var withdrawMatch;
            if (ChampionshipManager.joinMTTList && ChampionshipManager.joinMTTList.length > 0) {
                for (var i = 0; i < ChampionshipManager.joinMTTList.length; i++) {
                    if (ChampionshipManager.joinMTTList[i].recordId == recordId) {
                        withdrawMatch = ChampionshipManager.joinMTTList[i];
                        ChampionshipManager.joinMTTList.splice(i, 1);
                        break;
                    }
                }
                if (InfoUtil.checkAvailable(withdrawMatch) && withdrawMatch.definition.type == MatchType.MTT) {
                    ChampionshipManager.remindMTTStart();
                }
            }
            if (InfoUtil.checkAvailable(withdrawMatch)) {
                if (withdrawMatch.definition.type == MatchType.MTT) {
                    ChampionshipManager.setNotJoinFromMTTList(recordId);
                }
                else if (withdrawMatch.definition.type == MatchType.SNG) {
                    ChampionshipManager.setNotJoinFromSitAndPlayList(recordId);
                }
                ChampionshipManager.onRefreshMTTListEvent.dispatch({ type: MTTRefreshType.MTTList });
                ChampionshipManager.OnWithdrawEvent.dispatch({ joinWay: withdrawMatch.joinWay, recordId: recordId });
            }
        };
        SocketManager.call(Command.MTTRequestWithdraw_Req_3613, { recordId: recordId }, callback, null, this);
    };
    /**
     * 退赛时将该赛事在mtt列表中的报名方式置为0（未报名状态）
    */
    ChampionshipManager.setNotJoinFromMTTList = function (recordId) {
        for (var i = 0; i < ChampionshipManager.showMTTList.length; i++) {
            if (ChampionshipManager.showMTTList[i].recordId == recordId) {
                ChampionshipManager.showMTTList[i].joinWay = 0;
                break;
            }
        }
    };
    /**
     * 退赛时将该赛事在坐满即玩列表中的报名方式置为0（未报名状态）
    */
    ChampionshipManager.setNotJoinFromSitAndPlayList = function (recordId) {
        for (var i = 0; i < ChampionshipManager.processMTTList.length; i++) {
            if (ChampionshipManager.processMTTList[i].recordId == recordId) {
                ChampionshipManager.processMTTList[i].joinWay = 0;
                break;
            }
        }
    };
    /**********服务器推送通知的相应操作****************/
    /**
     * 各赛事报名人数数据推送对应的操作
    */
    ChampionshipManager.onJoinNumPush = function (result) {
        if (result.data && result.data["MTTList"]) {
            for (var _i = 0, _a = result.data['MTTList']; _i < _a.length; _i++) {
                var mttInfo = _a[_i];
                if (ChampionshipManager.processMTTList) {
                    for (var _b = 0, _c = ChampionshipManager.processMTTList; _b < _c.length; _b++) {
                        var matchiInfo = _c[_b];
                        if (mttInfo.id == matchiInfo.recordId) {
                            matchiInfo.join = mttInfo.join;
                            break;
                        }
                    }
                }
                if (ChampionshipManager.joinMTTList) {
                    for (var _d = 0, _e = ChampionshipManager.joinMTTList; _d < _e.length; _d++) {
                        var applicationInfo = _e[_d];
                        if (mttInfo.id == applicationInfo.recordId) {
                            applicationInfo.join = mttInfo.join;
                            break;
                        }
                    }
                }
                if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) {
                    if (mttInfo.id == GamblingManager.matchRoomInfo.recordId) {
                        GamblingManager.matchRoomInfo.join = mttInfo.join;
                    }
                }
            }
            ChampionshipManager.mttRemindStartHandler.sitAndPlayStartRemind();
            ChampionshipManager.onRefreshMTTListEvent.dispatch({ data: result.data["MTTList"], type: MTTRefreshType.MTTJOinNum });
        }
    };
    /**
     * 赛事因为人数不满足最小报名人数而取消推送对应的操作
     */
    ChampionshipManager.onCancelMTTPush = function (result) {
        if (result.data) {
            var info = new MatchRoomInfo();
            for (var _i = 0, _a = ChampionshipManager.processMTTList; _i < _a.length; _i++) {
                var matchInfo = _a[_i];
                if (matchInfo.recordId == result.data["recordId"]) {
                    info = matchInfo;
                }
            }
            if (InfoUtil.checkAvailable(info)) {
                AlertManager.showAlert("您报名的" + info.definition.name + "因为报名人数不足已经取消，您的所有报名费用/门票已经返还给您！");
            }
            UIManager.closePanel(UIModuleName.SecondRemindPanel);
            ChampionshipManager.OnCancelMTTPushEvent.dispatch(info);
            ChampionshipManager.refreshMTTMatchInfo(result.data["recordId"], true);
        }
    };
    /**
     * 赛事结束推送对应的操作（该玩家被淘汰）
    */
    ChampionshipManager.onMTTOverPush = function (result) {
        if (result.data && result.data["recordId"]) {
            if (SceneManager.sceneType == SceneType.Game && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match
                && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.recordId == result.data["recordId"]) {
                qin.Console.log("推送锦标赛结束，recordId：" + result.data["recordId"]);
                GamblingManager.championshipHandler.outChampionship(result.data["recordId"]);
            }
            ChampionshipManager.refreshMTTMatchInfo(result.data["recordId"], true);
            ChampionshipManager.OnMTTOverPushEvent.dispatch(result.data);
        }
    };
    /**
     * 赛事房间信息推送
    */
    ChampionshipManager.onMTTRoomIdPush = function (result) {
        if (result.data) {
            var matchRoomInfo = ChampionshipManager.getMathInfoByRecordId(result.data.mttId);
            if (matchRoomInfo) {
                matchRoomInfo.roomId = result.data.id;
            }
            if (GamblingManager.matchRoomInfo.recordId == result.data.mttId && GamblingManager.matchRoomInfo.roomId != result.data.id) {
                GamblingManager.matchRoomInfo.roomId = result.data.id;
                ChampionshipManager.enterMttHandler.enterMatch(GamblingManager.matchRoomInfo, qin.StringConstants.Empty);
            }
            ChampionshipManager.OnMTTRoomIdPushEvent.dispatch();
        }
    };
    /**
     * 比赛信息定时推送
     */
    ChampionshipManager.onMTTRankPush = function (result) {
        if (result.data && result.data["recordId"]) {
            var rInfo = ChampionshipManager.getMathInfoByRecordId(result.data["recordId"]);
            if (rInfo != null) {
                var leftJoin = rInfo.leftJoin;
                rInfo.copyValueFrom(result.data);
                if (!leftJoin && GamblingManager.matchRoomInfo.leftJoin) {
                    leftJoin = GamblingManager.matchRoomInfo.leftJoin;
                }
                rInfo.leftJoin = result.data["join"];
                rInfo.cloneTo(GamblingManager.matchRoomInfo);
                ChampionshipManager.OnMTTRankPushEvent.dispatch({ recordId: rInfo.recordId, leftJoin: leftJoin });
            }
        }
    };
    /**
     * 有新的赛事推送
    */
    ChampionshipManager.onMTTNewPush = function (result) {
        if (result.data) {
            ChampionshipManager.OnNewMTTPushEvent.dispatch();
        }
    };
    /**
     * 赛事减少时 更新赛事和已报名赛事列表数据  （取消或被淘汰）
    */
    ChampionshipManager.refreshMTTMatchInfo = function (recordId, flag) {
        if (flag === void 0) { flag = false; }
        if (recordId) {
            if (ChampionshipManager.processMTTList) {
                for (var i = 0; i < ChampionshipManager.processMTTList.length; i++) {
                    var processInfo = ChampionshipManager.processMTTList[i];
                    if (processInfo.recordId == recordId) {
                        processInfo.isShow = 0;
                        break;
                    }
                }
                for (var i = 0; i < ChampionshipManager.showMTTList.length; i++) {
                    if (ChampionshipManager.showMTTList[i].recordId == recordId) {
                        ChampionshipManager.showMTTList.splice(i, 1);
                        break;
                    }
                }
            }
            if (flag) {
                if (ChampionshipManager.joinMTTList) {
                    for (var i = 0; i < ChampionshipManager.joinMTTList.length; i++) {
                        if (ChampionshipManager.joinMTTList[i].recordId == recordId) {
                            ChampionshipManager.joinMTTList.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            ChampionshipManager.onRefreshMTTListEvent.dispatch({ type: MTTRefreshType.MTTList });
        }
    };
    /**
     * 根据赛事id获得奖励列表
    */
    ChampionshipManager.getAwardList = function (id) {
        var championship = ChampionshipDefined.GetInstance().getDefinition(id);
        if (championship) {
            var championshipPrizeList = ChampionshipPrizeDefined.GetInstance().getChampionshipPrizeList(championship.prize);
            return championshipPrizeList;
        }
        return null;
    };
    /**
     * 根据房间号获得赛事信息
     */
    ChampionshipManager.getMatchRoomInfoByRoomId = function (roomId) {
        for (var _i = 0, _a = ChampionshipManager.processMTTList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.roomId == roomId) {
                return info;
            }
        }
        return null;
    };
    /**
     * 根据赛事唯一Id获得赛事信息
     */
    ChampionshipManager.getMathInfoByRecordId = function (recordId) {
        if (ChampionshipManager.processMTTList) {
            for (var _i = 0, _a = ChampionshipManager.processMTTList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.recordId == recordId) {
                    return info;
                }
            }
        }
        return null;
    };
    /**
     * 根据赛事Id获得正在参与的赛事
     */
    ChampionshipManager.getJoinedMathInfoById = function (id) {
        for (var _i = 0, _a = ChampionshipManager.joinMTTList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.id == id && !info.outTime && !info.endTime) {
                return info;
            }
        }
        return null;
    };
    /**
     * 获取进入奖励圈的排名
     */
    ChampionshipManager.getAwardMaxRank = function (championship) {
        var maxRank = 0;
        if (championship) {
            var championshipPrizeList = ChampionshipPrizeDefined.GetInstance().getChampionshipPrizeList(championship.prize);
            if (championshipPrizeList) {
                for (var _i = 0, championshipPrizeList_3 = championshipPrizeList; _i < championshipPrizeList_3.length; _i++) {
                    var info = championshipPrizeList_3[_i];
                    if (info.end > maxRank) {
                        maxRank = info.end;
                    }
                }
            }
        }
        return maxRank;
    };
    /**
     * 设置赛况盲注级别信息
    */
    ChampionshipManager.setOutsBlindInfo = function (blindDef) {
        if (blindDef) {
            if (blindDef.preBet) {
                ChampionshipManager.matchOutsInfo.nowAnte = blindDef.preBet;
            }
            else {
                ChampionshipManager.matchOutsInfo.nowAnte = 0;
            }
            ChampionshipManager.matchOutsInfo.nowSBlind = blindDef.sBlind;
            ChampionshipManager.matchOutsInfo.nowBBlind = blindDef.bBlind;
        }
        if (ChampionshipManager.blindList && ChampionshipManager.blindList.length > 0 && ChampionshipManager.nowBlindRank < ChampionshipManager.blindList.length) {
            blindDef = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(ChampionshipManager.nowBlindRank + 1, ChampionshipManager.nowBlindId);
        }
        if (blindDef) {
            if (blindDef.preBet) {
                ChampionshipManager.matchOutsInfo.nextAnte = blindDef.preBet;
            }
            else {
                ChampionshipManager.matchOutsInfo.nextAnte = 0;
            }
            ChampionshipManager.matchOutsInfo.nextSBlind = blindDef.sBlind;
            ChampionshipManager.matchOutsInfo.nextBBlind = blindDef.bBlind;
        }
    };
    /**
     * 设置赛况涨盲时间
    */
    ChampionshipManager.setOutsAddBlindTimeInfo = function (upTime) {
        ChampionshipManager.matchOutsInfo.addBlindTime = upTime;
    };
    /**
     * 进入锦标赛
     */
    ChampionshipManager.enterMttHandler = new EnterMttHandler();
    /**
     * 请求赛事列表广播事件
     */
    ChampionshipManager.onGetMatchListEvent = new qin.DelegateDispatcher();
    /**
     * 请求已参加赛事列表广播事件
     */
    ChampionshipManager.onGetJoinedMatchListEvent = new qin.DelegateDispatcher();
    /**
     * 请求最近赛况信息广播事件
    */
    ChampionshipManager.onGetRecentActionInfoEvent = new qin.DelegateDispatcher();
    /**
     * 刷新MTT赛事列表信息广播事件
    */
    ChampionshipManager.onRefreshMTTListEvent = new qin.DelegateDispatcher();
    /**
     * 立即报名成功广播事件
    */
    ChampionshipManager.onRequestJoinEvent = new qin.DelegateDispatcher();
    /**
     * 最近赛况列表点击事件广播
    */
    ChampionshipManager.onOutsItemClickEvent = new qin.DelegateDispatcher();
    /**
     * 请求赛况信息广播事件
    */
    ChampionshipManager.OnOutsInfoEvent = new qin.DelegateDispatcher();
    /**
     * 请求排名信息广播事件
    */
    ChampionshipManager.OnRankInfoEvent = new qin.DelegateDispatcher();
    /**
     * 请求退赛广播事件
    */
    ChampionshipManager.OnWithdrawEvent = new qin.DelegateDispatcher();
    /**
     * 获取最近赛况的排名信息成功广播事件
    */
    ChampionshipManager.OnGetRankListEvent = new qin.DelegateDispatcher();
    /**
     * 锦标赛房间Id推送广播事件
     */
    ChampionshipManager.OnMTTRoomIdPushEvent = new qin.DelegateDispatcher();
    /**
    *  锦标赛排名推送广播事件
    */
    ChampionshipManager.OnMTTRankPushEvent = new qin.DelegateDispatcher();
    /**
     * 比赛结束
     */
    ChampionshipManager.OnMTTOverPushEvent = new qin.DelegateDispatcher();
    /**
     * 比赛取消
     */
    ChampionshipManager.OnCancelMTTPushEvent = new qin.DelegateDispatcher();
    /**
     * 有新比赛广播
     */
    ChampionshipManager.OnNewMTTPushEvent = new qin.DelegateDispatcher();
    return ChampionshipManager;
}());
__reflect(ChampionshipManager.prototype, "ChampionshipManager");
var MTTRefreshType;
(function (MTTRefreshType) {
    /**
     * 赛事列表更新
    */
    MTTRefreshType[MTTRefreshType["MTTList"] = 1] = "MTTList";
    /**
     * 赛事人数更新
    */
    MTTRefreshType[MTTRefreshType["MTTJOinNum"] = 2] = "MTTJOinNum";
})(MTTRefreshType || (MTTRefreshType = {}));
//# sourceMappingURL=ChampionshipManager.js.map