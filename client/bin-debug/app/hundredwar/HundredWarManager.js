var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 百人大战玩法管理
*/
var HundredWarManager = (function () {
    function HundredWarManager() {
    }
    Object.defineProperty(HundredWarManager, "self", {
        get: function () {
            HundredWarManager._self = HundredWarManager.getPlayerInfo(UserManager.userInfo.roleId);
            return HundredWarManager._self;
        },
        enumerable: true,
        configurable: true
    });
    HundredWarManager.addPushListener = function () {
        SocketManager.AddCommandListener(Command.HWSeatChange_Push_2127, HundredWarManager.onPosChange, this);
        SocketManager.AddCommandListener(Command.HWBetChange_Push_2123, HundredWarManager.onBetChange, this);
        SocketManager.AddCommandListener(Command.HWStateChange_Push_2126, HundredWarManager.onRoomStateChange, this);
        SocketManager.AddCommandListener(Command.HWCards_Push_2124, HundredWarManager.onCardPush, this);
        SocketManager.AddCommandListener(Command.OutRoom_Push_2128, HundredWarManager.onOutRoomPush, this);
        SocketManager.AddIgnoreError(ErrorCode.HundredWarOverFlow);
    };
    HundredWarManager.removePushListener = function () {
        SocketManager.RemoveCommandListener(Command.HWSeatChange_Push_2127, HundredWarManager.onPosChange, this);
        SocketManager.RemoveCommandListener(Command.HWBetChange_Push_2123, HundredWarManager.onBetChange, this);
        SocketManager.RemoveCommandListener(Command.HWStateChange_Push_2126, HundredWarManager.onRoomStateChange, this);
        SocketManager.RemoveCommandListener(Command.HWCards_Push_2124, HundredWarManager.onCardPush, this);
        SocketManager.RemoveCommandListener(Command.OutRoom_Push_2128, HundredWarManager.onOutRoomPush, this);
        SocketManager.RemoveIgnoreError(ErrorCode.HundredWarOverFlow);
        HundredWarManager.onBankerChangeEvent.removeListener(HundredWarManager.onBankerChange, this);
    };
    /**
     * 离开房间清空数据
    */
    HundredWarManager.leaveClear = function () {
        HundredWarManager.roomInfo = undefined;
        HundredWarManager.hundredWarOverInfo = undefined;
        HundredWarManager._self = undefined;
    };
    /**
     * 一轮结束清除数据
    */
    HundredWarManager.roundOverClear = function () {
        if (HundredWarManager.roomInfo) {
            for (var _i = 0, _a = HundredWarManager.roomInfo.betList; _i < _a.length; _i++) {
                var betInfo = _a[_i];
                betInfo.bet = 0;
                betInfo.myBet = 0;
            }
        }
    };
    HundredWarManager.resetByReLogin = function () {
        HundredWarManager._isInitialize = false;
    };
    /**
     * 发送请求进入房间
    */
    HundredWarManager.reqEnterRoom = function (id) {
        if (id === void 0) { id = 0; }
        var callback = function (result) {
            if (result.data) {
                if (!HundredWarManager._isInitialize) {
                    HundredWarManager._isInitialize = true;
                    HundredWarManager.OnGetRoomInfoEvent.addListener(HundredWarManager.onFirstEnterRoom, this);
                    HundredWarManager.addPushListener();
                }
                SocketManager.RemoveCommandListener(Command.EnterHW_Req_3693, callback, this);
                HundredWarManager.roomInfo = new HWRoomInfo();
                HundredWarManager.roomInfo.copyValueFrom(result.data);
                if (result.data.playerList) {
                    UserManager.OnGetSimpleUserInfoEvent.addListener(HundredWarManager.onReqComplete, this);
                    HundredWarManager.roomInfo.playerList = new Array();
                    var info = void 0;
                    for (var i = 0; i < result.data.playerList.length; i++) {
                        var playerInfo = result.data.playerList[i];
                        info = new HWHundredWarRoomPlayerInfo();
                        info.copyValueFrom(playerInfo);
                        HundredWarManager.roomInfo.playerList.push(info);
                    }
                    HundredWarManager.startReqPlayerInfo(HundredWarManager.roomInfo.playerList);
                }
                if (result.data.myBet && result.data.myBet.length > 0) {
                    if (result.data.betList && result.data.betList.length > 0) {
                        HundredWarManager.roomInfo.betList = new Array();
                        for (var _i = 0, _a = result.data.betList; _i < _a.length; _i++) {
                            var betInfo = _a[_i];
                            betInfo.myBet = result.data.myBet[betInfo.pos - 1];
                            HundredWarManager.roomInfo.betList.push(betInfo);
                        }
                    }
                }
                HundredWarManager._isHadLeave = false;
                HundredWarManager.OnGetRoomInfoEvent.dispatch();
            }
            HundredWarManager.onBankerChangeEvent.addListener(HundredWarManager.onBankerChange, this);
        };
        SocketManager.AddCommandListener(Command.EnterHW_Req_3693, callback, this);
        if (id > 0) {
            SocketManager.Send(Command.EnterHW_Req_3693, { id: id });
        }
        else {
            SocketManager.Send(Command.EnterHW_Req_3693);
        }
    };
    Object.defineProperty(HundredWarManager, "reqPlayerInfoListClone", {
        get: function () {
            return HundredWarManager._reqPlayerInfoListClone;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 开始请求
     */
    HundredWarManager.startReqPlayerInfo = function (list) {
        HundredWarManager._reqPlayerInfoListClone = HundredWarManager.roomInfo.playerList.concat();
        var info;
        for (var i = 0; i < HundredWarManager._reqPlayerInfoListClone.length; i++) {
            info = HundredWarManager._reqPlayerInfoListClone[i];
            if (HundredWarManager.isSysBanker(info.roleId)) {
                HundredWarManager._reqPlayerInfoListClone.splice(i, 1);
                break;
            }
        }
        HundredWarManager.nextReq();
    };
    /**
     * 请求下一个
     */
    HundredWarManager.nextReq = function () {
        if (this._reqPlayerInfoListClone.length > 0) {
            var playerInfo = this._reqPlayerInfoListClone.shift();
            if (HundredWarManager.isSysBanker(playerInfo.roleId)) {
                this.onReqComplete(null);
            }
            else {
                UserManager.reqSimpleUserInfo(playerInfo.roleId);
            }
        }
    };
    /**
     * 请求完成
     */
    HundredWarManager.onReqComplete = function (data) {
        if (data) {
            HundredWarManager.getetRoomInfoOver(data);
        }
        HundredWarManager.nextReq();
    };
    /**
     * 庄家变更
     */
    HundredWarManager.onBankerChange = function (data) {
        if (data) {
            if (data.beforeId == UserManager.userInfo.roleId) {
                for (var i = 0; i < HundredWarManager.panelHandler.HundredWarBankerList.length; i++) {
                    if (HundredWarManager.panelHandler.HundredWarBankerList[i].roleId == data.beforeId) {
                        HundredWarManager.panelHandler.HundredWarBankerList.splice(i, 1);
                        break;
                    }
                }
                HundredWarManager.panelHandler.onUpDownBankerEvent.dispatch(false);
            }
        }
    };
    /**
     * 进入房间后拉取完用户信息
    */
    HundredWarManager.getetRoomInfoOver = function (data) {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList) {
            HundredWarManager.getPlayerInfoSuccess(data);
            var banker = HundredWarManager.getPlayerInfoByPos(0); //进入房间时写入庄家坐庄带入的金币
            if (banker) {
                if (HundredWarManager.isSysBanker(banker.roleId)) {
                    banker.gold = HundredWarManager.sysBanker.gold;
                }
                else {
                    banker.gold = HundredWarManager.roomInfo.bankerGold;
                }
            }
            var len = HundredWarManager.roomInfo.playerList.length;
            if (len > 0) {
                if (data.roleId == HundredWarManager.roomInfo.playerList[len - 1].roleId) {
                    UserManager.OnGetSimpleUserInfoEvent.removeListener(HundredWarManager.onReqComplete, this);
                    HundredWarManager.OnGetPlayerInfoEvent.dispatch();
                    return;
                }
            }
            else {
                UserManager.OnGetSimpleUserInfoEvent.removeListener(HundredWarManager.onReqComplete, this);
                HundredWarManager.OnGetPlayerInfoEvent.dispatch();
            }
        }
    };
    HundredWarManager.getPlayerInfoSuccess = function (data) {
        if (data && HundredWarManager.roomInfo.playerList) {
            for (var _i = 0, _a = HundredWarManager.roomInfo.playerList; _i < _a.length; _i++) {
                var playerInfo = _a[_i];
                if (playerInfo.roleId == data["roleId"]) {
                    playerInfo.copyValueFrom(data);
                    if (!HundredWarManager.isSysBanker(data.roleId) && HundredWarManager.isBanker(data.roleId) && HundredWarManager.roomInfo && HundredWarManager.roomInfo.bankerGold) {
                        playerInfo.gold = HundredWarManager.roomInfo.bankerGold;
                    }
                    break;
                }
            }
        }
    };
    /**
     * 发送坐下请求
    */
    HundredWarManager.reqSeat = function (pos) {
        var callback = function (result) {
            HundredWarManager.onSeatEvent.dispatch(pos);
        };
        SocketManager.call(Command.HWSit_Req_3701, { pos: pos }, callback, null, this);
    };
    /**
     * 发送站起请求
    */
    HundredWarManager.reqStandUp = function () {
        var callback = function (result) {
            HundredWarManager.onStandUpEvent.dispatch();
        };
        SocketManager.call(Command.HWStandUp_Req_3704, null, callback, null, this);
    };
    /**
     * 发送下注请求
    */
    HundredWarManager.reqBet = function (pos, num) {
        var callback = function (result) {
            var addFlag = true;
            for (var _i = 0, _a = HundredWarManager.roomInfo.betList; _i < _a.length; _i++) {
                var betInfo = _a[_i];
                var i = betInfo.pos - 1;
                if (betInfo.pos == pos) {
                    betInfo.myBet += num;
                    addFlag = false;
                    break;
                }
            }
            if (addFlag) {
                var betInfo = new HWBetPotInfo();
                betInfo.pos = pos;
                betInfo.myBet = num;
                HundredWarManager.roomInfo.betList.push(betInfo);
            }
            HundredWarManager.onBetEvent.dispatch({ pos: pos, num: num });
        };
        var errorCallback = function (result) {
            if (result.error == ErrorCode.HundredWarOverFlow) {
                UIManager.showFloatTips("当前下注金币数已达庄家金币上限");
            }
        };
        SocketManager.call(Command.HWBet_Req_3694, { pos: pos, num: num }, callback, errorCallback, this);
    };
    /**
     * 发送离开请求
    */
    HundredWarManager.reqLeave = function () {
        var callback = function (result) {
            HundredWarManager.leaveClear();
            HundredWarManager.onLeaveEvent.dispatch();
        };
        if (HundredWarManager.roomInfo) {
            if (HundredWarManager.panelHandler.isBankerList()) {
                AlertManager.showAlert("您现在已上庄，请下庄后再退出房间！");
                return;
            }
            if ((HundredWarManager.roomInfo.state == HWState.Bet) && (HundredWarManager.getThisBetGold() > 0)) {
                AlertManager.showAlert("游戏正在进行中，您暂时不能退出房间，请等本局结束再操作。");
            }
            else {
                HundredWarManager._isHadLeave = true;
                SocketManager.call(Command.HWLeave_Req_3702, null, callback, null, this);
            }
        }
    };
    /**
     * 请求下一局开始
    */
    HundredWarManager.reqNextRoundStart = function () {
        var callback = function (result) {
        };
        if (!HundredWarManager._isHadLeave && HundredWarManager.roomInfo) {
            SocketManager.call(Command.HWNextRoundStart_Req_3703, null, callback, null, this);
        }
    };
    /**
     * 位置变更
     */
    HundredWarManager.onPosChange = function (result) {
        if (result.data) {
            var beforeId = void 0;
            if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList) {
                if (result.data.pos == 0 && !result.data.roleId && HundredWarManager.isBanker(UserManager.userInfo.roleId) && InfoUtil.checkAvailable(HundredWarManager.roomInfo) && HundredWarManager.roomInfo.bankerGold < HundredWarManager.roomInfo.definition.bankerMinGold) {
                    AlertManager.showAlert("您的当前金币低于" + qin.MathUtil.formatNum(HundredWarManager.roomInfo.definition.bankerMinGold) + "金币，已从庄家列表退出。");
                }
                if (HundredWarManager.roomInfo.playerList.length > 0) {
                    var flag = true;
                    for (var i = 0; i < HundredWarManager.roomInfo.playerList.length; i++) {
                        if (result.data.pos == HundredWarManager.roomInfo.playerList[i].pos) {
                            beforeId = HundredWarManager.roomInfo.playerList[i].roleId;
                            if (!result.data.roleId) {
                                HundredWarManager.roomInfo.playerList.splice(i, 1);
                            }
                            else if (result.data.roleId != HundredWarManager.roomInfo.playerList[i].roleId) {
                                HundredWarManager.roomInfo.playerList[i].roleId = result.data.roleId;
                                UserManager.reqSimpleUserInfo(result.data.roleId);
                            }
                            flag = false;
                        }
                    }
                    if (flag) {
                        var playerInfo = new HWHundredWarRoomPlayerInfo();
                        playerInfo.pos = result.data.pos;
                        playerInfo.roleId = result.data.roleId;
                        HundredWarManager.roomInfo.playerList.push(playerInfo);
                        UserManager.reqSimpleUserInfo(result.data.roleId);
                    }
                }
                else {
                    if (result.data.roleId && !HundredWarManager.isSysBanker(result.data.roleId)) {
                        var playerInfo = new HWHundredWarRoomPlayerInfo();
                        playerInfo.pos = result.data.pos;
                        playerInfo.roleId = result.data.roleId;
                        HundredWarManager.roomInfo.playerList.push(playerInfo);
                        UserManager.reqSimpleUserInfo(result.data.roleId);
                    }
                    else {
                        HundredWarManager.roomInfo.playerList.push(HundredWarManager.sysBanker);
                        UserManager.OnGetSimpleUserInfoEvent.dispatch(HundredWarManager.sysBanker);
                    }
                }
                if (result.data.bankerGold) {
                    HundredWarManager.roomInfo.bankerGold = result.data.bankerGold;
                }
                if (HundredWarManager.isSysBanker(result.data.roleId)) {
                    HundredWarManager.roomInfo.bankerGold = HundredWarManager.sysBanker.gold;
                }
            }
            if (result.data.pos == 0) {
                HundredWarManager.onBankerChangeEvent.dispatch({ beforeId: beforeId, afterId: result.data.roleId });
            }
            HundredWarManager.onPosChangeEvent.dispatch({ pos: result.data.pos, roleId: result.data.roleId });
        }
    };
    /**
     * 注池变更
     */
    HundredWarManager.onBetChange = function (result) {
        if (result.data && result.data.bet) {
            var changeBet = new Array();
            for (var _i = 0, _a = HundredWarManager.roomInfo.betList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.pos - 1 >= 0) {
                    if (info.bet != result.data.bet[info.pos - 1]) {
                        changeBet.push(info.pos);
                    }
                    info.bet = result.data.bet[info.pos - 1];
                }
            }
            result.data.bet = changeBet;
            HundredWarManager.onBetChangeEvent.dispatch(result.data);
        }
    };
    /**
     * 房间状态变更
     */
    HundredWarManager.onRoomStateChange = function (result) {
        if (result.data) {
            if (HundredWarManager.roomInfo) {
                HundredWarManager.roomInfo.state = result.data.state;
                if (result.data.stateTime) {
                    HundredWarManager.roomInfo.stateTime = result.data.stateTime;
                }
                else {
                    HundredWarManager.roomInfo.stateTime = 0;
                }
            }
            HundredWarManager.onRoomStateChangeEvent.dispatch();
        }
    };
    /**
     * 牌推送(结算)
     */
    HundredWarManager.onCardPush = function (result) {
        if (result.data) {
            HundredWarManager.hundredWarOverInfo = new HundredWarOverInfo();
            if (result.data.betList) {
                var cardInfoList = void 0;
                var betPot = void 0;
                HundredWarManager.hundredWarOverInfo.betList = new Array();
                for (var _i = 0, _a = result.data.betList; _i < _a.length; _i++) {
                    var betInfo = _a[_i];
                    cardInfoList = new Array();
                    betPot = new HWBetPotInfo();
                    GamblingUtil.cardArr2CardInfoList(betInfo.cards, cardInfoList);
                    betPot.cards = cardInfoList;
                    betPot.pos = betInfo.pos;
                    betPot.win = betInfo.win;
                    HundredWarManager.hundredWarOverInfo.betList.push(betPot);
                }
            }
            if (result.data.rankList) {
                HundredWarManager.hundredWarOverInfo.rankList = result.data.rankList;
                HundredWarManager.hundredWarOverInfo.rankList.sort(SortUtil.hundredOverRankSort);
            }
            HundredWarManager.hundredWarOverInfo.gold = result.data.gold;
            HundredWarManager.hundredWarOverInfo.pool = result.data.pool;
            HundredWarManager.hundredWarOverInfo.isWin = result.data.isWin;
            HundredWarManager.roomInfo.bankerGold = result.data.bankerGold;
            HundredWarManager.onCardPushEvent.dispatch();
        }
    };
    /**
     * 被踢出房间
    */
    HundredWarManager.onOutRoomPush = function (result) {
        if (result.data) {
            HundredWarManager._isHadLeave = true;
            HundredWarManager.onOutRoomEvent.dispatch(result.data["id"]);
        }
    };
    HundredWarManager.onFirstEnterRoom = function () {
        HundredWarManager.OnGetRoomInfoEvent.removeListener(HundredWarManager.onFirstEnterRoom, this);
        SceneManager.switcScene(SceneType.HundredWar);
    };
    Object.defineProperty(HundredWarManager, "sysBanker", {
        get: function () {
            if (!HundredWarManager._sysBanker) {
                HundredWarManager._sysBanker = new HWHundredWarRoomPlayerInfo();
                HundredWarManager._sysBanker.roleId = 9999;
                HundredWarManager._sysBanker.sex = 2;
                HundredWarManager._sysBanker.name = "萌萌";
                HundredWarManager._sysBanker.gold = 88888888;
                HundredWarManager._sysBanker.head = SheetSubName.HundredWarSysBanker_Head;
                HundredWarManager._sysBanker.pos = 0;
            }
            return HundredWarManager._sysBanker;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 判断是不是系统庄家根据roleId
    */
    HundredWarManager.isSysBanker = function (roleId) {
        if (roleId == HundredWarManager.sysBanker.roleId) {
            return true;
        }
        return false;
    };
    /**
     * 获得闲家下注的总金币数
    */
    HundredWarManager.getPlayerBetTotalNum = function () {
        var total = 0;
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.betList) {
            for (var _i = 0, _a = HundredWarManager.roomInfo.betList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.bet > 0) {
                    total += info.bet;
                }
            }
        }
        return total;
    };
    /**
     * 根据位置获取对应注池自己下注的金额
    */
    HundredWarManager.getSelfPoolGoldByPos = function (pos) {
        if (HundredWarManager.roomInfo.betList) {
            for (var _i = 0, _a = HundredWarManager.roomInfo.betList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.pos == pos && info.myBet) {
                    return info.myBet;
                }
            }
        }
        return null;
    };
    /**
     * 根据位置获取该注池是否有人下注
    */
    HundredWarManager.getIsHasBetByPos = function (pos) {
        if (HundredWarManager.roomInfo.betList) {
            for (var _i = 0, _a = HundredWarManager.roomInfo.betList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.pos == pos && info.bet > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 获得自己本轮下注的总金币数
    */
    HundredWarManager.getThisBetGold = function () {
        var total = 0;
        if (HundredWarManager.roomInfo.betList) {
            for (var _i = 0, _a = HundredWarManager.roomInfo.betList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.myBet) {
                    total += info.myBet;
                }
            }
        }
        return total;
    };
    /**
     * 根据位置注池的位置获得该注池的输赢
    */
    HundredWarManager.getBetPotResultByPos = function (pos) {
        var isWin;
        if (HundredWarManager.hundredWarOverInfo && HundredWarManager.hundredWarOverInfo.betList) {
            for (var _i = 0, _a = HundredWarManager.hundredWarOverInfo.betList; _i < _a.length; _i++) {
                var betInfo = _a[_i];
                if (betInfo.pos == pos) {
                    if (betInfo.win == HundredWarResultType.Win) {
                        isWin = true;
                    }
                    else {
                        isWin = false;
                    }
                    break;
                }
            }
        }
        return isWin;
    };
    /**
     * 获取玩家信息根据位置
     */
    HundredWarManager.getPlayerInfoByPos = function (pos) {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList) {
            for (var _i = 0, _a = HundredWarManager.roomInfo.playerList; _i < _a.length; _i++) {
                var player = _a[_i];
                if (player.pos == pos) {
                    return player;
                }
            }
        }
        return null;
    };
    /**
     * 获取坐下玩家信息根据玩家id
     */
    HundredWarManager.getPlayerInfo = function (roleId) {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList) {
            for (var _i = 0, _a = HundredWarManager.roomInfo.playerList; _i < _a.length; _i++) {
                var player = _a[_i];
                if (player.roleId == roleId) {
                    return player;
                }
            }
        }
        return null;
    };
    /**
     * 判断是不是庄家
    */
    HundredWarManager.isBanker = function (roleId) {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList) {
            for (var i = 0; i < HundredWarManager.roomInfo.playerList.length; i++) {
                if (HundredWarManager.roomInfo.playerList[i].roleId == roleId && HundredWarManager.roomInfo.playerList[i].pos == 0) {
                    return true;
                }
            }
        }
        return false;
    };
    HundredWarManager.panelHandler = new HundredWarPanelHandler();
    HundredWarManager._isInitialize = false;
    /**
     * 进入百人大战成功广播
    */
    HundredWarManager.OnGetRoomInfoEvent = new qin.DelegateDispatcher();
    /**
     * 拉取坐下用户信息完成广播
    */
    HundredWarManager.OnGetPlayerInfoEvent = new qin.DelegateDispatcher();
    /**
     * 坐下成功广播
    */
    HundredWarManager.onSeatEvent = new qin.DelegateDispatcher();
    /**
     * 站起成功广播
    */
    HundredWarManager.onStandUpEvent = new qin.DelegateDispatcher();
    /**
     * 下注成功广播
    */
    HundredWarManager.onBetEvent = new qin.DelegateDispatcher();
    /**
     * 离开成功广播
    */
    HundredWarManager.onLeaveEvent = new qin.DelegateDispatcher();
    /**
     * 注池变更推送广播
    */
    HundredWarManager.onBetChangeEvent = new qin.DelegateDispatcher();
    /**
     * 牌推送广播
    */
    HundredWarManager.onCardPushEvent = new qin.DelegateDispatcher();
    /**
     * 房间状态变更推送广播
    */
    HundredWarManager.onRoomStateChangeEvent = new qin.DelegateDispatcher();
    /**
     * 位置变更推送广播
    */
    HundredWarManager.onPosChangeEvent = new qin.DelegateDispatcher();
    /**
     * 庄家变更事件
     */
    HundredWarManager.onBankerChangeEvent = new qin.DelegateDispatcher();
    /**
     * 发牌动画完成广播
    */
    HundredWarManager.onDealCardsEvent = new qin.DelegateDispatcher();
    /**
     * 显示牌动画完成广播
    */
    HundredWarManager.onShowCardsEvent = new qin.DelegateDispatcher();
    /**
     * 结算动画播放完成广播
    */
    HundredWarManager.onShowCardsAnimOverEvent = new qin.DelegateDispatcher();
    /**
     * 隐藏牌广播
    */
    HundredWarManager.onHideCardsEvent = new qin.DelegateDispatcher();
    /**
     * 踢出房间广播
    */
    HundredWarManager.onOutRoomEvent = new qin.DelegateDispatcher();
    return HundredWarManager;
}());
__reflect(HundredWarManager.prototype, "HundredWarManager");
//# sourceMappingURL=HundredWarManager.js.map