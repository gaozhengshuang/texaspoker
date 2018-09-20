var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌局管理器
 */
var GamblingManager = (function () {
    function GamblingManager() {
    }
    Object.defineProperty(GamblingManager, "matchRoomInfo", {
        /**
         * 当前比赛信息
         */
        get: function () {
            if (!GamblingManager._matchRoomInfo) {
                GamblingManager._matchRoomInfo = new MatchRoomInfo();
            }
            return GamblingManager._matchRoomInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "showPotChips", {
        /**
         * 显示的底池筹码 客户端自己维护
         */
        get: function () {
            if (GamblingManager._showPotChips == undefined) {
                GamblingManager._showPotChips = GamblingManager.totalPotChips;
            }
            return GamblingManager._showPotChips;
        },
        /**
         * 显示的底池筹码 客户端自己维护
         */
        set: function (value) {
            GamblingManager._showPotChips = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "isInRoom", {
        /**
         * 是否在房间中
         */
        get: function () {
            return GamblingManager.roomInfo != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "isInSeat", {
        /**
         * 是否在座位上
         */
        get: function () {
            if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList) {
                for (var i = 0; i < GamblingManager.roomInfo.playerList.length; i++) {
                    if (GamblingManager.roomInfo.playerList[i].roleId == UserManager.userInfo.roleId) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "totalPotChips", {
        /**
         * 获取当前房间的总底池
         */
        get: function () {
            var tmpChips = 0;
            if (GamblingManager.roomInfo) {
                if (GamblingManager.roomInfo.potChips) {
                    for (var _i = 0, _a = GamblingManager.roomInfo.potChips; _i < _a.length; _i++) {
                        var chips = _a[_i];
                        tmpChips += chips;
                    }
                }
                if (GamblingManager.roomInfo.playerList) {
                    for (var _b = 0, _c = GamblingManager.roomInfo.playerList; _b < _c.length; _b++) {
                        var pInfo = _c[_b];
                        if (pInfo.num > 0) {
                            tmpChips += pInfo.num;
                        }
                    }
                }
                return tmpChips;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    GamblingManager.resetByReLogin = function () {
        GamblingManager.reset();
        GamblingManager._isInitialize = false;
    };
    GamblingManager.reset = function () {
        // GamblingManager.roomDataPushHandler.reset();
        GamblingManager.standClear();
        if (GamblingManager.roomInfo) {
            GamblingManager.roomInfo.publicCard = undefined;
        }
        GamblingManager.roomInfo = undefined;
        GamblingManager.roundOverInfo = undefined;
        GamblingManager.clearPlayerTotalNum();
        GamblingManager.lastCallPos = undefined;
        GamblingManager.clearMatchRoomInfo();
        GamblingManager.timeAwardHandler.isGetTimeAward = false;
        qin.Tick.RemoveSecondsInvoke(GamblingManager.sngReadyCountDown, this);
    };
    GamblingManager.clearMatchRoomInfo = function () {
        GamblingManager._matchRoomInfo = undefined;
    };
    /**
     * 站起数据清理
     */
    GamblingManager.standClear = function () {
        GamblingManager._isOnSeat = false;
        GamblingManager._self = null;
        if (GamblingManager.roomInfo) {
            GamblingManager.roomInfo.handCard = undefined;
        }
        GamblingManager.oneLoopClear();
        GamblingManager.timeAwardHandler.stopCountDown();
    };
    /**
     * 一轮圈注结束清理
     */
    GamblingManager.oneLoopClear = function () {
        GamblingManager.showPotChips = 0;
        if (GamblingManager.roomInfo) {
            GamblingManager.roomInfo.maxAnte = 0;
            // GamblingManager.roomInfo.minRaiseNum = 0;
        }
        GamblingManager.isCallAny = false;
        GamblingManager.isCheckOrFold = false;
        GamblingManager.clearPlayerNum();
    };
    /**
     * 一局结束清理
     */
    GamblingManager.roundOverClear = function () {
        GamblingManager.showPotChips = 0;
        GamblingManager.roomInfo.maxAnte = 0;
        GamblingManager.roomInfo.minRaiseNum = 0;
        GamblingManager.roundOverInfo.handCardList = undefined;
        GamblingManager.roomInfo.handCard = undefined;
        GamblingManager.clearPlayerNum();
    };
    /**
     * 清理玩家身上的筹码
     */
    GamblingManager.clearPlayerNum = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList) {
            for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                var pInfo = _a[_i];
                pInfo.num = 0; //一局结束清空玩家筹码
            }
        }
    };
    GamblingManager.clearPlayerTotalNum = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList) {
            for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                var pInfo = _a[_i];
                pInfo.totalnum = 0; //一局结束清空玩家总筹码
            }
        }
    };
    /**
     * 添加推送协议侦听
     */
    GamblingManager.addPushListener = function () {
        // GamblingManager.roomDataPushHandler.initialize();
        SocketManager.AddCommandListener(Command.NextRoundStart_Push_2107, GamblingManager.pushNextRoundStart, this);
        SocketManager.AddCommandListener(Command.BlindChange_Push_2100, GamblingManager.pushBlindChange, this);
        // SocketManager.AddCommandListener(Command.Push_PotChipsChange_2101, GamblingManager.pushPotChipsChange);
        SocketManager.AddCommandListener(Command.OneLoopOver_Push_2102, GamblingManager.pushOneLoopOver, this);
        SocketManager.AddCommandListener(Command.SitOrStand_Push_2103, GamblingManager.pushSitOrStand, this);
        SocketManager.AddCommandListener(Command.PlayerStateChange_Push_2104, GamblingManager.pushStateChange, this);
        SocketManager.AddCommandListener(Command.ActionPosChange_Push_2105, GamblingManager.pushActionPosChange, this);
        SocketManager.AddCommandListener(Command.OneRoundOver_Push_2106, GamblingManager.pushOneRoundOver, this);
        SocketManager.AddCommandListener(Command.HandCard_Push_2108, GamblingManager.pushHandCard, this);
        SocketManager.AddCommandListener(Command.ChipsChange_Push_2110, GamblingManager.pushChipsChange, this);
        SocketManager.AddCommandListener(Command.InTrusteeship_Push_2119, GamblingManager.pushInTrusteeship, this);
        SocketManager.AddCommandListener(Command.OutRoom_Push_2128, GamblingManager.pushExitRoom, this);
        SocketManager.AddCommandListener(Command.BrightCard_Push_2109, GamblingManager.pushImmediatelyBirhgtCard, this);
        GamblingManager.timeAwardHandler.addPushListener();
        SocketManager.OnReconnectSynchronize.addListener(GamblingManager.onReconnectHandler, this);
        // SocketManager.AddCommandListener(Command.Push_PlayerListStateChange_2113, GamblingManager.pushPlayerListStateChange);
    };
    /**
     * 推送离开房间
     */
    GamblingManager.pushExitRoom = function (result) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && result.data && GamblingManager.roomInfo.id == result.data["id"]) {
            var type = GamblingType.Common;
            if (GamblingManager.roomInfo) {
                type = GamblingManager.roomInfo.gamblingType;
            }
            switch (GamblingManager.roomInfo.gamblingType) {
                case GamblingType.Match:
                    if (GamblingManager.roomInfo.isOnWatch) {
                        GamblingManager.OnPushLeaveRoomEvent.dispatch({ type: type, isInMtt: false });
                        // AlertManager.showAlert("", () =>
                        // {
                        // 	GamblingManager.leaveRoom();
                        // })
                    }
                    break;
            }
        }
    };
    /**
     * 请求进入房间
     */
    GamblingManager.reqEnterRoom = function (id, password, isQuicklyEnter, isReconnect) {
        if (id === void 0) { id = 0; }
        // qin.QinLog.log("gamlbingmanager进入房间：reqEnterRoom" + id);
        // GamblingManager.roomDataPushHandler.reset();
        var callback = function (result) {
            SocketManager.RemoveCommandListener(Command.EnterRoomInfo_Req_3600, callback, this);
            GamblingManager.isQuicklyEnter = isQuicklyEnter;
            GamblingManager.initialize(result, isReconnect);
            if (!GamblingManager._isInitialize) {
                GamblingManager._isInitialize = true;
                GamblingManager.addPushListener();
            }
        };
        SocketManager.AddCommandListener(Command.EnterRoomInfo_Req_3600, callback, this);
        if (password != undefined && id > 0) {
            SocketManager.Send(Command.EnterRoomInfo_Req_3600, { id: id, password: password });
        }
        else if (id > 0) {
            SocketManager.Send(Command.EnterRoomInfo_Req_3600, { id: id });
        }
        else {
            SocketManager.Send(Command.EnterRoomInfo_Req_3600);
        }
    };
    GamblingManager.initialize = function (result, isReconnect) {
        GamblingManager.reset();
        if (result.data && result.data["id"]) {
            GamblingManager.roomInfo = new RoomInfo(result.data);
            GamblingManager.roomInfo.isTrusteeship = undefined;
            GamblingManager.roomInfo.isMatchOut = undefined;
            GamblingManager.roomInfo.isFlopCardOver = true;
            GamblingManager.championshipHandler.initializeRoomInfo(result);
            GamblingManager.roomInfo.handCard = new Array();
            GamblingUtil.cardArr2CardInfoList(result.data["handCard"], GamblingManager.roomInfo.handCard);
            if (GamblingManager.roomInfo.handCard.length == 0) {
                GamblingManager.roomInfo.handCard = undefined;
            }
            GamblingManager.roomInfo.publicCard = new Array();
            GamblingUtil.cardArr2CardInfoList(result.data["publicCard"], GamblingManager.roomInfo.publicCard);
            if (GamblingManager.roomInfo.publicCard.length == 0) {
                GamblingManager.roomInfo.publicCard = undefined;
            }
            if (GamblingManager.roomInfo.handCard && GamblingManager.roomInfo.handCard.length > 2) {
                qin.Console.logError("手牌张数大于2" + GamblingManager.roomInfo.handCard.length);
            }
            if (GamblingManager.roomInfo.playerList && GamblingManager.roomInfo.playerList.length > 0) {
                for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                    var pInfo = _a[_i];
                    if (pInfo.roleId == UserManager.userInfo.roleId) {
                        GamblingManager._isOnSeat = true;
                    }
                    GamblingManager.reqGetPlayerUserInfo(pInfo);
                }
            }
            else {
                GamblingManager.getPlayerUserInfoOver();
            }
            //设置计时奖励数据	
            if (result.data.roomId) {
                var roomDef = RoomDefined.GetInstance().getDefinition(result.data.roomId);
                if (roomDef) {
                    this.timeAwardHandler.reqGetTimeAwardInfo(roomDef.type);
                }
            }
            GamblingManager.gamblingReviewHandler.isNewRound = true;
            // GamblingManager.roomDataPushHandler.isGetRoomData = true;
            // GamblingManager.roomDataPushHandler.setRoomData();
        }
        else {
            GamblingManager.getPlayerUserInfoOver();
        }
        GamblingManager.showPotChips = GamblingManager.totalPotChips;
        GamblingManager.guessHandler.onEnable();
        GamblingManager.OnGetRoomInfoEvent.dispatch(isReconnect);
    };
    /**
     * 推送下一局开始
     */
    GamblingManager.pushNextRoundStart = function (result) {
        // GamblingManager.roomDataPushHandler.writeResult(Command.NextRoundStart_Push_2107, result);
        if (result.data && GamblingManager.roomInfo) {
            GamblingManager.roomInfo.publicCard = undefined;
            GamblingManager.roundOverInfo = undefined;
            GamblingManager.clearPlayerTotalNum();
            GamblingManager.roomInfo.isShowCard = false;
            GamblingManager.oneLoopClear();
            GamblingManager.roomInfo.copyValueFrom(result.data);
            GamblingManager.roomInfo.potChips = undefined;
            GamblingManager.roomInfo.startTime = TimeManager.GetServerUtcTimestamp();
            GamblingManager.roomInfo.isFlopCardOver = false;
            //重置初始筹码数
            if (GamblingManager.self) {
                GamblingManager.self.initbankRoll = GamblingManager.self.bankRoll;
                GamblingManager.roomInfo.isOnWatch = false;
            }
            else {
                GamblingManager.roomInfo.isOnWatch = true;
            }
            if (GamblingManager.roomInfo.gamblingType == GamblingType.Match && GamblingManager.roomInfo.blindLevel) {
                if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition) {
                    var def = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.blindLevel, GamblingManager.matchRoomInfo.definition.blindType);
                    if (def && def.sBlind == GamblingManager.roomInfo.sBlind && def.bBlind == GamblingManager.roomInfo.bBlind) {
                        GamblingManager.roomInfo.ante = def.preBet;
                    }
                }
                GamblingManager.roomInfo.nowBlindLevel = GamblingManager.roomInfo.blindLevel;
            }
            GamblingManager.roomInfo.addbuy = 0;
            GamblingManager.guessHandler.resetBuyRB();
            if (GamblingManager.roomInfo.playerList) {
                for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                    var pInfo = _a[_i];
                    if (pInfo.bankRoll <= 0) {
                        pInfo.state = PlayerState.WaitNext;
                    }
                }
            }
            GamblingManager.NextRoundStartEvent.dispatch();
        }
    };
    /**
     * 推送盲注前注变化
     */
    GamblingManager.pushBlindChange = function (result) {
        // GamblingManager.roomDataPushHandler.writeResult(Command.BlindChange_Push_2100, result);
        if (result.data && GamblingManager.roomInfo) {
            var bLevel = GamblingManager.roomInfo.blindLevel;
            GamblingManager.roomInfo.copyValueFrom(result.data);
            var isAddLevel = false;
            if (bLevel < GamblingManager.roomInfo.blindLevel) {
                isAddLevel = true;
                GamblingManager.championshipHandler.setNextAddTime();
            }
            GamblingManager.BlindChangeEvent.dispatch({ isAddLevel: isAddLevel });
        }
    };
    GamblingManager.pushPotChipsChange = function (result) {
        if (result.data && GamblingManager.roomInfo) {
            GamblingManager.roomInfo.copyValueFrom(result.data);
            GamblingManager.PotChipsChangeEvent.dispatch();
        }
    };
    /**
     * 推送公共牌
     */
    GamblingManager.pushOneLoopOver = function (result) {
        // GamblingManager.roomDataPushHandler.writeResult(Command.OneLoopOver_Push_2102, result);
        if (result.data && GamblingManager.roomInfo) {
            // if (GamblingManager.roomInfo.playerList)
            // {
            // 	for (let pInfo of GamblingManager.roomInfo.playerList)
            // 	{
            // 		switch (pInfo.state)
            // 		{
            // 			case PlayerState.Action:
            // 				break;
            // 		}
            // 		pInfo.num = 0;
            // 	}
            // }
            if (!GamblingManager.roomInfo.publicCard) {
                // qin.CopyUtil.supCopyList(GamblingManager.roomInfo, result.data, "cardList", CardInfo);
                GamblingManager.roomInfo.publicCard = new Array();
            }
            GamblingUtil.cardArr2CardInfoList(result.data["card"], GamblingManager.roomInfo.publicCard);
            if (GamblingManager.roomInfo.publicCard.length == 0) {
                GamblingManager.roomInfo.publicCard = undefined;
            }
            var cardList = void 0;
            if (GamblingManager.roomInfo.handCard) {
                cardList = GamblingManager.roomInfo.handCard.concat();
            }
            var publicCardList = void 0;
            if (GamblingManager.roomInfo.publicCard) {
                publicCardList = GamblingManager.roomInfo.publicCard.concat();
            }
            GamblingManager.oneLoopClear();
            GamblingManager.roomInfo.minRaiseNum = GamblingManager.roomInfo.bBlind; //一轮押注圈结束 下注金额最低最1*大盲
            GamblingManager.roomInfo.potChips = result.data["potChips"];
            GamblingManager.roomInfo.maxAnte = 0;
            GamblingManager.OneLoopOverEvent.dispatch([cardList, publicCardList]);
        }
    };
    /**
     * 推送玩家坐下或站起
     */
    GamblingManager.pushSitOrStand = function (result) {
        // GamblingManager.roomDataPushHandler.writeResult(Command.SitOrStand_Push_2103, result);
        if (result.data) {
            var state = result.data["state"];
            if (state == BuyInGameState.Sit) {
                var playerInfo = new PlayerInfo();
                playerInfo.roleId = result.data["roleId"];
                playerInfo.pos = result.data["pos"];
                playerInfo.bankRoll = result.data["bankRoll"];
                playerInfo.state = PlayerState.WaitNext; //刚坐下来 处于空状态
                GamblingManager.addPlayer(playerInfo);
                GamblingManager.SitOrStandEvent.dispatch({ pInfo: playerInfo, state: state });
                GamblingManager.reqGetPlayerUserInfo(playerInfo);
            }
            else if (state == BuyInGameState.Stand) {
                var roleId = result.data["roleId"];
                var playerInfo = GamblingManager.getPlayerInfo(roleId);
                if (playerInfo) {
                    if (playerInfo.roleId == UserManager.userInfo.roleId) {
                        GamblingManager.standClear();
                    }
                    GamblingManager.removePlayer(roleId);
                    GamblingManager.SitOrStandEvent.dispatch({ pInfo: playerInfo, state: state });
                }
            }
        }
    };
    /**
     * 推送玩家状态变更
     */
    GamblingManager.pushStateChange = function (result) {
        // GamblingManager.roomDataPushHandler.writeResult(Command.PlayerStateChange_Push_2104, result);
        if (result.data) {
            var roleId = result.data["roleId"];
            if (roleId == UserManager.userInfo.roleId) {
                GamblingManager.isCallAny = false;
                GamblingManager.isCheckOrFold = false;
            }
            var state = result.data["state"];
            var num = result.data["num"];
            if (num == undefined) {
                num = 0;
            }
            var pInfo = GamblingManager.getPlayerInfo(roleId);
            if (GamblingManager.showPotChips == 0) {
                GamblingManager.showPotChips = GamblingManager.totalPotChips;
            }
            if (pInfo && pInfo.totalnum == undefined) {
                pInfo.totalnum = 0;
            }
            if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && num > 0) {
                if (pInfo && pInfo.num > 0) {
                    GamblingManager.showPotChips += num - pInfo.num;
                    pInfo.totalnum += num - pInfo.num;
                }
                else {
                    GamblingManager.showPotChips += num;
                    pInfo.totalnum += num;
                }
            }
            if ((state == PlayerState.Check || state == PlayerState.AllIn || state == PlayerState.Blind || state == PlayerState.Raise) && InfoUtil.checkAvailable(GamblingManager.roomInfo) && num > 0) {
                if (num > GamblingManager.roomInfo.maxAnte) {
                    if (num < GamblingManager.roomInfo.bBlind) {
                        GamblingManager.roomInfo.maxAnte = GamblingManager.roomInfo.bBlind; //处理跟注不足一个大盲的问题
                    }
                    else {
                        GamblingManager.roomInfo.maxAnte = num;
                    }
                }
            }
            if (pInfo) {
                pInfo.state = state;
                pInfo.num = num;
                if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && pInfo.state == PlayerState.Raise || pInfo.state == PlayerState.AllIn) {
                    var lastMaxNum = GamblingManager.findMaxPlayerNum(pInfo.roleId);
                    var tmpNum = pInfo.num - lastMaxNum;
                    if (lastMaxNum == 0 || lastMaxNum == GamblingManager.roomInfo.ante) {
                        GamblingManager.roomInfo.minRaiseNum = GamblingManager.roomInfo.bBlind * 2;
                        GamblingManager.roomInfo.minRaiseNum = Math.max(GamblingManager.roomInfo.minRaiseNum, tmpNum * 2);
                    }
                    else if (tmpNum > 0) {
                        if (tmpNum < GamblingManager.roomInfo.bBlind) {
                            GamblingManager.roomInfo.minRaiseNum = pInfo.num + GamblingManager.roomInfo.bBlind;
                        }
                        else {
                            GamblingManager.roomInfo.minRaiseNum = pInfo.num + tmpNum; //最小加注额度
                        }
                    }
                }
                if (state == PlayerState.Call || state == PlayerState.AllIn) {
                    GamblingManager.lastCallPos = pInfo.pos;
                }
                if (state == PlayerState.Check || state == PlayerState.Fold || state == PlayerState.Raise) {
                    GamblingManager.lastCallPos = undefined;
                }
                GamblingManager.PlayerStateChangeEvent.dispatch({ roleId: roleId, state: state, num: num });
            }
        }
    };
    /**
     * 查找状态参数最大的数量
     */
    GamblingManager.findMaxPlayerNum = function (excludeRoleId) {
        var num = 0;
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList) {
            for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                var pInfo = _a[_i];
                if (pInfo.roleId != excludeRoleId && pInfo.num > num) {
                    num = pInfo.num;
                }
            }
        }
        return num;
    };
    /**
     * 推送说话位置变更
     */
    GamblingManager.pushActionPosChange = function (result) {
        // GamblingManager.roomDataPushHandler.writeResult(Command.ActionPosChange_Push_2105, result);
        if (result.data && GamblingManager.roomInfo) {
            GamblingManager.roomInfo.copyValueFrom(result.data);
            GamblingManager.ActionPosChangeEvent.dispatch(GamblingManager.roomInfo.handCard);
        }
    };
    /**
     * 推送一局结束
     */
    GamblingManager.pushOneRoundOver = function (result) {
        // GamblingManager.roomDataPushHandler.writeResult(Command.OneRoundOver_Push_2106, result);
        if (result.data) {
            if (!GamblingManager.roundOverInfo) {
                GamblingManager.roundOverInfo = new RoundOverInfo();
            }
            var handCard = void 0;
            if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.handCard) {
                handCard = GamblingManager.roomInfo.handCard.concat();
            }
            GamblingManager.roundOverClear();
            GamblingManager.roundOverInfo.copyValueFrom(result.data);
            if (GamblingManager.roomInfo) {
                GamblingManager.roomInfo.endTime = TimeManager.GetServerUtcTimestamp();
            }
            //重置初始筹码数
            var temporaryRoll = undefined;
            if (GamblingManager.self) {
                temporaryRoll = GamblingManager.self.initbankRoll;
                GamblingManager.self.initbankRoll = 0;
            }
            GamblingManager.RoundOverEvent.dispatch({ initbankRoll: temporaryRoll, handCard: handCard });
            GamblingManager.gamblingReviewHandler.isNewRound = true;
            // GamblingManager.roomInfo.potChips = undefined;
        }
    };
    /**
     * 推送玩家手牌
     */
    GamblingManager.pushHandCard = function (result) {
        // GamblingManager.roomDataPushHandler.writeResult(Command.HandCard_Push_2108, result);
        if (result.data && GamblingManager.self) {
            if (!GamblingManager.roomInfo.handCard) {
                GamblingManager.roomInfo.handCard = new Array();
            }
            GamblingManager.roomInfo.handCard.length = 0;
            var cardInfo = void 0;
            if (result.data["card"]) {
                GamblingUtil.cardArr2CardInfoList(result.data["card"], GamblingManager.roomInfo.handCard);
                if (GamblingManager.roomInfo.handCard.length == 0) {
                    GamblingManager.roomInfo.handCard = undefined;
                }
                if (GamblingManager.roomInfo.handCard && GamblingManager.roomInfo.handCard.length > 2) {
                    qin.Console.logError("手牌张数大于2" + GamblingManager.roomInfo.handCard.length);
                }
            }
            var cardList = void 0;
            if (GamblingManager.roomInfo.handCard) {
                cardList = GamblingManager.roomInfo.handCard.concat();
            }
            GamblingManager.guessHandler.setResultListInfo();
            GamblingManager.HandCardComeEvent.dispatch(cardList);
        }
    };
    /**
     * 推送筹码变更
     */
    GamblingManager.pushChipsChange = function (result) {
        // GamblingManager.roomDataPushHandler.writeResult(Command.ChipsChange_Push_2110, result);
        if (result.data) {
            var roleId = result.data["roleId"];
            var br = result.data["bankRoll"];
            var pInfo = GamblingManager.getPlayerInfo(roleId);
            if (pInfo) {
                pInfo.bankRoll = br;
                GamblingManager.ChipsChangeEvent.dispatch(pInfo);
            }
        }
    };
    /**
     * 推送玩家列表状态变更
     */
    GamblingManager.pushPlayerListStateChange = function (result) {
        if (result.data) {
            var list = result.data["roleId"];
            var state = result.data["state"];
            if (list && state != undefined) {
                var pInfo = void 0;
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var roleId = list_1[_i];
                    pInfo = GamblingManager.getPlayerInfo(roleId);
                    if (pInfo) {
                        pInfo.state = state;
                    }
                }
                GamblingManager.PlayerListStateChangeEvent.dispatch();
            }
        }
    };
    GamblingManager.pushInTrusteeship = function (result) {
        // GamblingManager.roomDataPushHandler.writeResult(Command.InTrusteeship_Push_2119, result);
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && !GamblingManager.roomInfo.isTrusteeship) {
            GamblingManager.roomInfo.isTrusteeship = true;
            GamblingManager.InTrusteeshipEvent.dispatch();
        }
    };
    /**
     * 推送有人立即亮牌
     */
    GamblingManager.pushImmediatelyBirhgtCard = function (result) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && result.data) {
            var info = new HandCardInfo(result.data);
            GamblingManager.SomeBodyBrightCardEvent.dispatch(info);
        }
    };
    GamblingManager.onReconnectHandler = function () {
        if (GamblingManager.roomInfo) {
            egret.log("重连从新拉取数据！");
            var id = GamblingManager.roomInfo.id;
            GamblingManager.reset();
            GamblingManager.reqEnterRoom(id, qin.StringConstants.Empty, false, true); //从新拉取房间数据
        }
    };
    GamblingManager.sngNextRoundStart = function (time) {
        if (time != undefined) {
            GamblingManager.sngReadyCountDownTime = time;
        }
        else {
            if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) {
                GamblingManager.sngReadyCountDownTime = GamblingManager.matchRoomInfo.definition.waitingTime;
                if (GamblingManager.sngReadyCountDownTime == undefined) {
                    GamblingManager.sngReadyCountDownTime = 8;
                }
            }
            else {
                GamblingManager.sngReadyCountDownTime = 8;
            }
        }
        qin.Tick.RemoveSecondsInvoke(GamblingManager.sngReadyCountDown, this);
        qin.Tick.AddSecondsInvoke(GamblingManager.sngReadyCountDown, this);
    };
    GamblingManager.sngReadyCountDown = function () {
        GamblingManager.sngReadyCountDownTime--;
        if (GamblingManager.sngReadyCountDownTime <= 0) {
            qin.Tick.RemoveSecondsInvoke(GamblingManager.sngReadyCountDown, this);
            GamblingManager.reqNextRoundStart();
        }
        GamblingManager.SngReadyCountDownEvent.dispatch();
    };
    /**
     * 请求下一局开始(准备)
     */
    GamblingManager.reqNextRoundStart = function () {
        if (GamblingUtil.isMatch) {
            if (GamblingManager._isOnSeat && !GamblingManager.roomInfo.isMatchOut && !GamblingUtil.isSelfMatchOut) {
                GamblingManager.sendNextRoundStart();
            }
        }
        else {
            if (GamblingManager._isOnSeat) {
                GamblingManager.sendNextRoundStart();
            }
        }
    };
    GamblingManager.sendNextRoundStart = function () {
        SocketManager.AddCommandListener(Command.NextRound_Req_3601, GamblingManager.onNextRoundStart, this);
        SocketManager.Send(Command.NextRound_Req_3601);
    };
    GamblingManager.onNextRoundStart = function (result) {
        SocketManager.RemoveCommandListener(Command.NextRound_Req_3601, GamblingManager.onNextRoundStart, this);
        if (GamblingManager.roomInfo) {
            GamblingManager.ReadyStateChangeEvent.dispatch();
        }
    };
    GamblingManager.cancelTrusteeship = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship) {
            GamblingManager.reqAction(PlayerState.Trusteeship);
        }
    };
    /**
     * 请求说话
     */
    GamblingManager.reqAction = function (state, num) {
        if (num === void 0) { num = 0; }
        var callBack = function (result) {
            if (GamblingManager.self) {
                if (GamblingManager.roomInfo) {
                    GamblingManager.roomInfo.isTrusteeship = false;
                }
                SocketManager.RemoveCommandListener(Command.Action_Req_3602, callBack, this);
                GamblingManager.ActionOverEvent.dispatch(state);
            }
        };
        SocketManager.AddCommandListener(Command.Action_Req_3602, callBack, this);
        if (num != 0) {
            SocketManager.Send(Command.Action_Req_3602, { state: state, num: num });
        }
        else {
            SocketManager.Send(Command.Action_Req_3602, { state: state });
        }
    };
    /**
     * 请求超时操作
     */
    GamblingManager.reqTimeOut = function () {
        if (GamblingUtil.isCanCheck) {
            GamblingManager.reqAction(PlayerState.Check);
        }
        else {
            GamblingManager.reqAction(PlayerState.Fold);
        }
    };
    /**
     * 请求离开房间(返回大厅)如需添加事件请在发送请求之前添加
     */
    GamblingManager.reqLeaveRoom = function (isInMtt) {
        if (isInMtt === void 0) { isInMtt = false; }
        var callBack = function (result) {
            var type = GamblingType.Common;
            if (GamblingManager.roomInfo) {
                type = GamblingManager.roomInfo.gamblingType;
            }
            SocketManager.RemoveCommandListener(Command.LeaveRoom_Req_3603, callBack, this);
            SocketManager.RemoveErrorListener(Command.LeaveRoom_Req_3603, callBackError, this);
            if (GamblingManager.roomInfo.gamblingType == GamblingType.Match && GamblingManager.roomInfo.isMatchOut) {
                GamblingManager.roomInfo.isMatchOut = undefined;
            }
            GamblingManager.leaveRoom();
            GamblingManager.LeaveRoomEvent.dispatch({ type: type, isInMtt: isInMtt });
        };
        var callBackError = function (result) {
            var type = GamblingType.Common;
            if (GamblingManager.roomInfo) {
                type = GamblingManager.roomInfo.gamblingType;
            }
            SocketManager.RemoveCommandListener(Command.LeaveRoom_Req_3603, callBack, this);
            SocketManager.RemoveErrorListener(Command.LeaveRoom_Req_3603, callBackError, this);
            if (GamblingManager.roomInfo.gamblingType == GamblingType.Match && GamblingManager.roomInfo.isMatchOut) {
                GamblingManager.roomInfo.isMatchOut = undefined;
            }
            if (!isInMtt) {
                GamblingManager.leaveRoom();
            }
            GamblingManager.LeaveRoomErrorEvent.dispatch({ type: type, isInMtt: isInMtt });
        };
        /**
         * 发了离开房间，离开房间协议没有返回，又发了请求下一局的协议 则会报错误
         */
        GamblingManager._isOnSeat = false; //点击了返回大厅则此值立即生效
        GamblingManager.roomInfo.isOnWatch = false; //主动点击离开房间
        // if (GamblingUtil.isMatch) //比赛中请求离开房间
        // {
        // 	if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isMatchOut) //被淘汰状态，请求直接清理数据抛送离开事件
        // 	{
        // 		let type: GamblingType = GamblingManager.roomInfo.gamblingType;
        // 		GamblingManager.roomInfo.isMatchOut = undefined;
        // 		GamblingManager.leaveRoom();
        // 		GamblingManager.LeaveRoomEvent.dispatch({ type: type, isInMtt: isInMtt });
        // 	}
        // 	else
        // 	{
        // 		SocketManager.AddCommandListener(Command.LeaveRoom_Req_3603, callBack, this);
        // 		SocketManager.AddErrorListener(Command.LeaveRoom_Req_3603, callBackError, this);
        // 		SocketManager.Send(Command.LeaveRoom_Req_3603);
        // 	}
        // }
        // else
        // {
        SocketManager.AddCommandListener(Command.LeaveRoom_Req_3603, callBack, this);
        SocketManager.AddErrorListener(Command.LeaveRoom_Req_3603, callBackError, this);
        SocketManager.Send(Command.LeaveRoom_Req_3603);
        // }
    };
    GamblingManager.leaveRoom = function () {
        GamblingManager.isQuicklyEnter = false;
        GamblingManager.guessHandler.leaveRoomReset();
        GamblingManager.championshipHandler.stopRoomDisbandListener();
        GamblingManager.reset();
    };
    /**
     * 请求买入游戏
     */
    GamblingManager.reqBuyInGame = function (num, isAutoBuy, pos) {
        var callBack = function (result) {
            SocketManager.RemoveCommandListener(Command.BuyInGame_Req_3604, callBack, this);
            GamblingManager._isOnSeat = true;
            if (GamblingManager.roomInfo) {
                GamblingManager.roomInfo.isAutoBuy = isAutoBuy;
            }
            if (result.data) {
                GamblingManager.BuyInGameEvent.dispatch();
            }
        };
        SocketManager.AddCommandListener(Command.BuyInGame_Req_3604, callBack, this);
        SocketManager.Send(Command.BuyInGame_Req_3604, { num: num, isAutoBuy: isAutoBuy, pos: pos });
    };
    /**
     * 快速开始游戏
     */
    GamblingManager.reqQuicklyBuyInGame = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo)) {
            if (UserManager.userInfo.gold < GamblingManager.roomInfo.definition.sBuyin) {
                qin.Console.log("快速买入失败！玩家身上金币小于最低买入金额");
                return false;
            }
            var willBuyNum = Math.ceil(GamblingManager.roomInfo.definition.bBuyin / 2);
            willBuyNum = Math.min(UserManager.userInfo.gold, willBuyNum);
            if (willBuyNum > 0) {
                var pInfo = void 0;
                for (var i = 1; i <= GamblingManager.maxSeats; i++) {
                    pInfo = GamblingManager.getPlayerInfoByPos(i);
                    if (!pInfo) {
                        GamblingManager.reqBuyInGame(willBuyNum, true, i);
                        return true; //也存在服务器买入失败的情况，但客户端已验证通过
                    }
                }
            }
            qin.Console.log("快速买入失败！买入金额" + willBuyNum + "位子已满？");
            return false;
        }
        else {
            qin.Console.log("快速买入失败！房间信息不能为空！");
            return false;
        }
    };
    /**
     * 请求站起
     */
    GamblingManager.reqStandUp = function () {
        var callBack = function (result) {
            SocketManager.RemoveCommandListener(Command.StandUp_Req_3605, callBack, this);
            GamblingManager.StandUpEvent.dispatch();
        };
        SocketManager.AddCommandListener(Command.StandUp_Req_3605, callBack, this);
        SocketManager.Send(Command.StandUp_Req_3605);
    };
    /**
     * 请求亮牌
     */
    GamblingManager.reqBrightCard = function () {
        var callBack = function (result) {
            SocketManager.RemoveCommandListener(Command.BrightCard_Req_3606, callBack, this);
            if (GamblingManager.roomInfo) {
                GamblingManager.roomInfo.isShowCard = !GamblingManager.roomInfo.isShowCard;
            }
            GamblingManager.BrightCardFlagEvent.dispatch();
        };
        SocketManager.AddCommandListener(Command.BrightCard_Req_3606, callBack, this);
        SocketManager.Send(Command.BrightCard_Req_3606);
    };
    /**
     * 请求增加金币
     */
    GamblingManager.reqAddCoin = function (num) {
        if (num > 0) {
            var callBack_1 = function (result) {
                SocketManager.RemoveCommandListener(Command.AddCoin_Req_3607, callBack_1, this);
                GamblingManager.AddCoinEvent.dispatch();
            };
            SocketManager.AddCommandListener(Command.AddCoin_Req_3607, callBack_1, this);
            SocketManager.Send(Command.AddCoin_Req_3607, { num: num });
        }
        else {
            qin.Console.log("增加金币数量异常！");
        }
    };
    //--------------------------组全用户信息用-----------------------------
    /**
     * 拉取玩家信息完毕 可以进入房间 or 进入大厅
     */
    GamblingManager.getPlayerUserInfoOver = function () {
        if (GamblingManager.self && GamblingManager.self.state != PlayerState.WaitNext && GamblingManager.self.state != PlayerState.Empty) {
            GamblingManager.timeAwardHandler.startCountDown(); //断线重连开始计时
        }
    };
    /**
    * 拉取玩家的用户信息
    */
    GamblingManager.reqGetPlayerUserInfo = function (playerInfo) {
        if (!playerInfo) {
            return;
        }
        if (!GamblingManager._getUserInfoQueue) {
            GamblingManager._getUserInfoQueue = new Array();
        }
        for (var _i = 0, _a = GamblingManager._getUserInfoQueue; _i < _a.length; _i++) {
            var info = _a[_i];
            if (playerInfo.roleId == info.roleId) {
                return; //已存在
            }
        }
        GamblingManager._getUserInfoQueue.push(playerInfo);
        GamblingManager.startGetUserInfo(GamblingManager._getUserInfoQueue[0]);
    };
    GamblingManager.startGetUserInfo = function (target) {
        if (!GamblingManager._isOnGetUserInfo) {
            GamblingManager._isOnGetUserInfo = true;
            var callBack = function (result) {
                GamblingManager._isOnGetUserInfo = false;
                GamblingManager._getUserInfoQueue[0].userInfo = new UserInfo(result.data);
                GamblingManager.OnGetRoomUserInfoEvent.dispatch(GamblingManager._getUserInfoQueue[0].userInfo.roleId);
                GamblingManager._getUserInfoQueue.shift();
                if (result.data) {
                    GamblingManager.getNext();
                }
            };
            var errorCallBack = function (result) {
                GamblingManager._isOnGetUserInfo = false;
                GamblingManager._getUserInfoQueue.shift();
                GamblingManager.getNext();
            };
            UserManager.sendGetUserInfo(target.roleId, callBack, errorCallBack);
        }
    };
    GamblingManager.getNext = function () {
        if (GamblingManager._getUserInfoQueue.length > 0) {
            GamblingManager.startGetUserInfo(GamblingManager._getUserInfoQueue[0]);
        }
        else {
            GamblingManager.getPlayerUserInfoOver();
        }
    };
    /**
     * 检测破产
     */
    GamblingManager.checkBust = function () {
        if (GamblingManager.self) {
            if (UserManager.isBust && GamblingManager.self.bankRoll <= 0) {
                GamblingManager.reqStandUp();
            }
        }
    };
    /**
    * 执行默认的行为
    */
    GamblingManager.doDefaultAction = function () {
        if (GamblingUtil.isCanCheck) {
            GamblingManager.reqAction(PlayerState.Check);
        }
        else if (GamblingUtil.isNeedAllIn) {
            if (GamblingManager.self) {
                GamblingManager.reqAction(PlayerState.AllIn, GamblingManager.self.bankRoll);
            }
        }
        else if (GamblingUtil.callNum > 0) {
            GamblingManager.reqAction(PlayerState.Call, GamblingUtil.callNum);
        }
    };
    Object.defineProperty(GamblingManager, "self", {
        //--------------------------------------------------------------------
        //-----------------------------数据状态处理与更新----------------------
        get: function () {
            if (!GamblingManager._self) {
                GamblingManager._self = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
            }
            return GamblingManager._self;
        },
        enumerable: true,
        configurable: true
    });
    GamblingManager.addPlayer = function (playerInfo) {
        if (GamblingManager.roomInfo) {
            if (GamblingManager.roomInfo.playerList) {
                if (playerInfo && GamblingUtil.isContainPlayer(playerInfo.roleId) == false) {
                    GamblingManager.roomInfo.playerList.push(playerInfo);
                }
            }
            else {
                GamblingManager.roomInfo.playerList = new Array();
                if (playerInfo) {
                    GamblingManager.roomInfo.playerList.push(playerInfo);
                }
            }
        }
    };
    /**
     * 移除玩家
     */
    GamblingManager.removePlayer = function (roleId) {
        var player = GamblingManager.getPlayerInfo(roleId);
        qin.ArrayUtil.RemoveItem(player, GamblingManager.roomInfo.playerList);
    };
    /**
     * 获取玩家信息
     */
    GamblingManager.getPlayerInfo = function (roleId) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList) {
            for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                var player = _a[_i];
                if (player.roleId == roleId) {
                    return player;
                }
            }
        }
        return null;
    };
    /**
     * 获取玩家状态
     */
    GamblingManager.getPlayerStateByRoleId = function (roleId) {
        var pInfo = GamblingManager.getPlayerInfo(roleId);
        if (pInfo) {
            return pInfo.state;
        }
        else {
            return PlayerState.Empty;
        }
    };
    /**
     * 获取玩家信息根据位置
     */
    GamblingManager.getPlayerInfoByPos = function (pos) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList) {
            for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                var player = _a[_i];
                if (player.pos == pos) {
                    return player;
                }
            }
        }
        return null;
    };
    Object.defineProperty(GamblingManager, "maxSeats", {
        /**
         * 获取最大座位
         */
        get: function () {
            if (InfoUtil.checkAvailable(GamblingManager.roomInfo)) {
                return GamblingManager.roomInfo.definition.seat;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "isMaster", {
        /**
         * 获取自己是否是房主
         */
        get: function () {
            return GamblingUtil.getIsMaster(GamblingManager.self);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "isOneLoopStart", {
        /**
         * 是否是新一轮圈注开始
         */
        get: function () {
            if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList) {
                for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                    var pInfo = _a[_i];
                    if (pInfo.num > 0) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "isOnRoundOverIng", {
        /**
         * 牌局是否在结算中
         */
        get: function () {
            return GamblingManager.roundOverInfo != undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 计时奖励管理
    */
    GamblingManager.timeAwardHandler = new TimeAwardHandler();
    /**
     * 竞猜管理
    */
    GamblingManager.guessHandler = new GuessHandler();
    /**
     * 锦标赛管理
     */
    GamblingManager.championshipHandler = new ChampionshipHandler();
    /**
     * 上局回顾管理
     */
    GamblingManager.gamblingReviewHandler = new GamblingReviewHandler();
    /**
    * 房间数据推送
    */
    // public static roomDataPushHandler: PushRoomDataHandler = new PushRoomDataHandler();
    /**
    * 最大牌数
    */
    GamblingManager.MaxCardNum = 7;
    /**
     * 公共牌最大数量
     */
    GamblingManager.MaxBoardNum = 5;
    /**
     * 奥马哈手牌数量
     */
    GamblingManager.OmahaHandCardNum = 4;
    /**
     * 大于10的显示图片
     */
    GamblingManager.FlushSplitIndex = 10;
    /**
     * 是否过或弃
     */
    GamblingManager.isCheckOrFold = false;
    /**
     * 是否跟任何
     */
    GamblingManager.isCallAny = false;
    /**
     * 是否是快速游戏进入房间标记
     */
    GamblingManager.isQuicklyEnter = false;
    GamblingManager._showPotChips = 0;
    /**
     * 是否在座位上 请求下一局准备标记变量
     */
    GamblingManager._isOnSeat = false;
    GamblingManager._isInitialize = false;
    //--------------------------------------------------------------------
    GamblingManager.sngReadyCountDownTime = 8;
    GamblingManager._isOnGetUserInfo = false;
    //-----------------------------------event事件--------------------------------
    /**
     * 拉取房间信息
     */
    GamblingManager.OnGetRoomInfoEvent = new qin.DelegateDispatcher();
    /**
     * 获取玩家房间信息
     */
    GamblingManager.OnGetRoomUserInfoEvent = new qin.DelegateDispatcher();
    /**
     * 下一局开始事件
     */
    GamblingManager.NextRoundStartEvent = new qin.DelegateDispatcher();
    /**
     * 买入游戏事件
     */
    GamblingManager.BuyInGameEvent = new qin.DelegateDispatcher();
    /**
     * 坐下或站起
     */
    GamblingManager.SitOrStandEvent = new qin.DelegateDispatcher();
    /**
     * 玩家状态变更
     */
    GamblingManager.PlayerStateChangeEvent = new qin.DelegateDispatcher();
    /**
     * 手牌推送
     */
    GamblingManager.HandCardComeEvent = new qin.DelegateDispatcher();
    /**
     * 筹码变更
     */
    GamblingManager.ChipsChangeEvent = new qin.DelegateDispatcher();
    /**
     * 底池变更
     */
    GamblingManager.PotChipsChangeEvent = new qin.DelegateDispatcher();
    /**
     * 公共牌变化
     */
    GamblingManager.OneLoopOverEvent = new qin.DelegateDispatcher();
    /**
     * 推送说话位置变更
     */
    GamblingManager.ActionPosChangeEvent = new qin.DelegateDispatcher();
    /**
     * 准备状态变更
     */
    GamblingManager.ReadyStateChangeEvent = new qin.DelegateDispatcher();
    /**
     * 说话完毕
     */
    GamblingManager.ActionOverEvent = new qin.DelegateDispatcher();
    /**
     * 离开房间事件
     */
    GamblingManager.LeaveRoomEvent = new qin.DelegateDispatcher();
    /**
     * 服务器主动推送房间离开
     */
    GamblingManager.OnPushLeaveRoomEvent = new qin.DelegateDispatcher();
    /**
     * 离开房间错误事件
     */
    GamblingManager.LeaveRoomErrorEvent = new qin.DelegateDispatcher();
    /**
     * 站起
     */
    GamblingManager.StandUpEvent = new qin.DelegateDispatcher();
    /**
     * 请求亮牌
     */
    GamblingManager.BrightCardFlagEvent = new qin.DelegateDispatcher();
    /**
     * 增加金币
     */
    GamblingManager.AddCoinEvent = new qin.DelegateDispatcher();
    /**
     * 玩家列表状态变更
     */
    GamblingManager.PlayerListStateChangeEvent = new qin.DelegateDispatcher();
    /**
     * 一局结束
     */
    GamblingManager.RoundOverEvent = new qin.DelegateDispatcher();
    /**
     * 盲注前注变更
     */
    GamblingManager.BlindChangeEvent = new qin.DelegateDispatcher();
    /**
     * 重购/增购完成
     */
    GamblingManager.RebuyORAddonEvent = new qin.DelegateDispatcher();
    /**
     * 进入托管状态
     */
    GamblingManager.InTrusteeshipEvent = new qin.DelegateDispatcher();
    /**
     * 超时事件
     */
    GamblingManager.TimeOutEvent = new qin.DelegateDispatcher();
    /**
     * 发牌完毕事件
     */
    GamblingManager.FlopCardOverEvent = new qin.DelegateDispatcher();
    /**
     * 淘汰赛准备倒计时事件
     */
    GamblingManager.SngReadyCountDownEvent = new qin.DelegateDispatcher();
    /**
     * 推送某人亮牌事件
     */
    GamblingManager.SomeBodyBrightCardEvent = new qin.DelegateDispatcher();
    return GamblingManager;
}());
__reflect(GamblingManager.prototype, "GamblingManager");
//# sourceMappingURL=GamblingManager.js.map