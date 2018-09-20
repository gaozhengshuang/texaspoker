var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 锦标赛行牌管理
 */
var ChampionshipHandler = (function () {
    function ChampionshipHandler() {
    }
    ChampionshipHandler.prototype.initializeRoomInfo = function (result) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match) {
            var matchRoomInfo = ChampionshipManager.getMatchRoomInfoByRoomId(GamblingManager.roomInfo.id);
            if (matchRoomInfo) {
                matchRoomInfo.cloneTo(GamblingManager.matchRoomInfo);
                if (result && result.data) {
                    if (result.data["rank"]) {
                        GamblingManager.matchRoomInfo.rank = result.data["rank"];
                    }
                    if (result.data["join"]) {
                        GamblingManager.matchRoomInfo.leftJoin = result.data["join"];
                    }
                    if (result.data["avgChips"]) {
                        GamblingManager.matchRoomInfo.avgChips = result.data["avgChips"];
                    }
                }
            }
            if (!GamblingManager.roomInfo.blindLevel) {
                GamblingManager.roomInfo.blindLevel = 1;
            }
            if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) {
                //盲注等级达到上限
                var def = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.blindLevel + 1, GamblingManager.matchRoomInfo.definition.blindType);
                if (!def) {
                    GamblingManager.roomInfo.blindTime = -1;
                }
                else if (!GamblingManager.roomInfo.blindTime && GamblingManager.roomInfo.startTime) {
                    GamblingManager.roomInfo.blindTime = GamblingManager.roomInfo.startTime + def.upTime;
                }
            }
            GamblingManager.roomInfo.nowBlindLevel = GamblingManager.roomInfo.blindLevel;
            if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition) {
                var def = ChampionshipBlindDefined.GetInstance().getDefByBlind(GamblingManager.matchRoomInfo.definition.blindType, GamblingManager.roomInfo.sBlind, GamblingManager.roomInfo.bBlind);
                if (def && def.level <= GamblingManager.roomInfo.blindLevel) {
                    GamblingManager.roomInfo.nowBlindLevel = def.level;
                }
            }
            if (!GamblingManager.roomInfo.addonTimes) {
                GamblingManager.roomInfo.addonTimes = 0;
            }
            if (!GamblingManager.roomInfo.rebuyTimes) {
                GamblingManager.roomInfo.rebuyTimes = 0;
            }
            if (!GamblingManager.self) {
                this.startRoomDisbandListener();
            }
        }
    };
    /**
     * 设置下级盲注时间
     */
    ChampionshipHandler.prototype.setNextAddTime = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match) {
            if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition && GamblingManager.roomInfo) {
                if (!GamblingManager.roomInfo.blindLevel) {
                    GamblingManager.roomInfo.blindLevel = 1;
                }
                var def = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.blindLevel + 1, GamblingManager.matchRoomInfo.definition.blindType);
                if (def) {
                    GamblingManager.roomInfo.blindTime = def.upTime + TimeManager.GetServerUtcTimestamp();
                }
                else {
                    GamblingManager.roomInfo.blindTime = -1;
                }
            }
        }
    };
    /**
     * 是否能重购/增购
     */
    ChampionshipHandler.prototype.isCanAddChips = function (type, isShow) {
        if (isShow === void 0) { isShow = false; }
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition) {
            if (type == ChampionshipBuyType.Rebuy) {
                var pInfo = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
                if (pInfo && (pInfo.initbankRoll <= GamblingManager.matchRoomInfo.definition.initialChips || !pInfo.initbankRoll)) {
                    var def = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.nowBlindLevel, GamblingManager.matchRoomInfo.definition.blindType);
                    if (def && def.rebuy > 0 && GamblingManager.matchRoomInfo.definition.rebuy > 0 && GamblingManager.matchRoomInfo.definition.maxRebuyTimes > 0) {
                        if (GamblingManager.matchRoomInfo.definition.rebuy > GamblingManager.roomInfo.rebuyTimes || !GamblingManager.roomInfo.rebuyTimes) {
                            if (!GamblingManager.roomInfo.addbuy || (GamblingManager.roomInfo.addbuy < GamblingManager.matchRoomInfo.definition.maxRebuyTimes * GamblingManager.matchRoomInfo.definition.initialChips)) {
                                return true;
                            }
                            else {
                                if (isShow) {
                                    AlertManager.showAlert("本局重购次数已达上限");
                                }
                                return false;
                            }
                        }
                        else {
                            if (isShow) {
                                AlertManager.showAlert("重购次数已达上限");
                            }
                            return false;
                        }
                    }
                }
                else {
                    if (isShow) {
                        AlertManager.showAlert("拥有筹码小于或等于初始筹码时才能进行重购");
                    }
                    return false;
                }
            }
            else if (type == ChampionshipBuyType.Addon) {
                var def = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.nowBlindLevel, GamblingManager.matchRoomInfo.definition.blindType);
                if (def && def.addon > 0 && GamblingManager.matchRoomInfo.definition.addon > 0) {
                    if (GamblingManager.matchRoomInfo.definition.addon > GamblingManager.roomInfo.addonTimes || !GamblingManager.roomInfo.addonTimes) {
                        if (!GamblingManager.roomInfo.addbuy || (GamblingManager.roomInfo.addbuy < GamblingManager.matchRoomInfo.definition.addonChips)) {
                            return true;
                        }
                        else {
                            if (isShow) {
                                AlertManager.showAlert("本局增购次数已达上限");
                            }
                            return false;
                        }
                    }
                    else {
                        if (isShow) {
                            AlertManager.showAlert("增购次数已达上限");
                        }
                        return false;
                    }
                }
            }
        }
        if (isShow) {
            if (type == ChampionshipBuyType.Rebuy) {
                AlertManager.showAlert("当前阶段无法重购");
            }
            else if (type == ChampionshipBuyType.Addon) {
                AlertManager.showAlert("当前阶段无法增购");
            }
        }
        return false;
    };
    /**
     * 请求重购/增购
     */
    ChampionshipHandler.prototype.addShip = function (type) {
        if (!GamblingManager.roomInfo || GamblingManager.roomInfo.isMatchOut) {
            return;
        }
        var callback = function (result) {
            SocketManager.RemoveCommandListener(Command.MTTRebuyOrAddon_3619, callback, this);
            SocketManager.RemoveErrorListener(Command.MTTRebuyOrAddon_3619, callbackError, this);
            if (type == ChampionshipBuyType.Out) {
                return;
            }
            if (GamblingManager.roomInfo) {
                if (type == ChampionshipBuyType.Rebuy) {
                    GamblingManager.roomInfo.rebuyTimes++;
                }
                else {
                    GamblingManager.roomInfo.addonTimes++;
                }
                if (GamblingManager.roomInfo.gamblingType == GamblingType.Match) {
                    if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition) {
                        if (!GamblingManager.roomInfo.addbuy) {
                            GamblingManager.roomInfo.addbuy = 0;
                        }
                        if (type == ChampionshipBuyType.Rebuy) {
                            GamblingManager.roomInfo.addbuy += GamblingManager.matchRoomInfo.definition.initialChips;
                            AlertManager.showAlert(qin.StringUtil.format("重购成功,{0}筹码将在下局增加", GamblingManager.matchRoomInfo.definition.initialChips));
                        }
                        else {
                            GamblingManager.roomInfo.addbuy += GamblingManager.matchRoomInfo.definition.addonChips;
                            AlertManager.showAlert(qin.StringUtil.format("增购成功,{0}筹码将在下局增加", GamblingManager.matchRoomInfo.definition.addonChips));
                        }
                    }
                    else {
                        if (type == ChampionshipBuyType.Rebuy) {
                            AlertManager.showAlert("重购成功,筹码将在下局增加");
                        }
                        else {
                            AlertManager.showAlert("增购成功,筹码将在下局增加");
                        }
                    }
                }
            }
            GamblingManager.RebuyORAddonEvent.dispatch({ isSuccess: true });
        };
        var callbackError = function (result) {
            SocketManager.RemoveCommandListener(Command.MTTRebuyOrAddon_3619, callback, this);
            SocketManager.RemoveErrorListener(Command.MTTRebuyOrAddon_3619, callbackError, this);
            if (result.error == 3012) {
                if (type == ChampionshipBuyType.Rebuy) {
                    AlertManager.showAlert("当前阶段无法重购");
                }
                else if (type == ChampionshipBuyType.Addon) {
                    AlertManager.showAlert("当前阶段无法增购");
                }
            }
            GamblingManager.RebuyORAddonEvent.dispatch({ isSuccess: false });
        };
        SocketManager.AddCommandListener(Command.MTTRebuyOrAddon_3619, callback, this);
        SocketManager.AddErrorListener(Command.MTTRebuyOrAddon_3619, callbackError, this);
        SocketManager.Send(Command.MTTRebuyOrAddon_3619, { type: type });
    };
    ChampionshipHandler.prototype.outChampionship = function (recordId) {
        GamblingManager.roomInfo.isMatchOut = true;
        qin.Console.log("房间处于旁观状态状态");
    };
    /**
     * 比赛房间侦听自动解散
     */
    ChampionshipHandler.prototype.startRoomDisbandListener = function () {
        qin.Tick.AddSecondsInvoke(this.checkRoomPlayerList, this);
    };
    ChampionshipHandler.prototype.stopRoomDisbandListener = function () {
        qin.Tick.RemoveSecondsInvoke(this.checkRoomPlayerList, this);
    };
    ChampionshipHandler.prototype.checkRoomPlayerList = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo)) {
            if (GamblingManager.roomInfo.playerList && GamblingManager.roomInfo.playerList.length <= 1) {
                this.stopRoomDisbandListener();
                AlertManager.showAlert("该比赛房间已经解散，请返回大厅！", function () {
                    GamblingManager.reqLeaveRoom();
                });
            }
        }
        else {
            this.stopRoomDisbandListener();
        }
    };
    return ChampionshipHandler;
}());
__reflect(ChampionshipHandler.prototype, "ChampionshipHandler");
var ChampionshipBuyType = (function () {
    function ChampionshipBuyType() {
    }
    /**
     * 重购
     */
    ChampionshipBuyType.Rebuy = 1;
    /**
     * 增购
     */
    ChampionshipBuyType.Addon = 2;
    /**
     * 取消(输光时)
     */
    ChampionshipBuyType.Out = 3;
    return ChampionshipBuyType;
}());
__reflect(ChampionshipBuyType.prototype, "ChampionshipBuyType");
/**
 * 竞标赛 房间消息类型
 */
var ChampionshipRoomUIAlertType = (function () {
    function ChampionshipRoomUIAlertType() {
    }
    /**
     * 进入奖励圈
     */
    ChampionshipRoomUIAlertType.InAward = 1;
    /**
     * 进入最终桌
     */
    ChampionshipRoomUIAlertType.InFinals = 2;
    /**
     * 重新分配房间
     */
    ChampionshipRoomUIAlertType.ChangeRoom = 3;
    /**
     * 剩余人数变更
     */
    ChampionshipRoomUIAlertType.LeftNumChange = 4;
    return ChampionshipRoomUIAlertType;
}());
__reflect(ChampionshipRoomUIAlertType.prototype, "ChampionshipRoomUIAlertType");
//# sourceMappingURL=ChampionshipHandler.js.map