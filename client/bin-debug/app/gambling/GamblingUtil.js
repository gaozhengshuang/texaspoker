var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌局工具
 */
var GamblingUtil = (function () {
    function GamblingUtil() {
    }
    /**
     * 卡牌数据转换 因为一开始定的数据结构，服务器存储数据库问题
     */
    GamblingUtil.cardArr2CardInfoList = function (data, targetList) {
        if (data && targetList) {
            var cardInfo = void 0;
            for (var i = 0; i < data.length; i++) {
                if (i % 2 == 1) {
                    for (var _i = 0, targetList_1 = targetList; _i < targetList_1.length; _i++) {
                        cardInfo = targetList_1[_i];
                        if (cardInfo.card[0] == data[i - 1] && cardInfo.card[1] == data[i]) {
                            AlertManager.showAlertByString("已存在相同的牌");
                            qin.Console.logError("已存在相同的牌");
                            continue; //容错 推送了相同的牌不添加
                        }
                    }
                    cardInfo = new CardInfo([data[i - 1], data[i]]);
                    targetList.push(cardInfo);
                }
            }
        }
    };
    /**
    * 根据结算信息判断是否获胜
    */
    GamblingUtil.isWin = function (roleId) {
        if (GamblingManager.roundOverInfo) {
            if (GamblingManager.roundOverInfo.potList && GamblingManager.roundOverInfo.potList.length > 0) {
                var getNum = 0;
                for (var _i = 0, _a = GamblingManager.roundOverInfo.potList; _i < _a.length; _i++) {
                    var potAwardInfo = _a[_i];
                    if (potAwardInfo.roleId && potAwardInfo.roleId.indexOf(roleId) != -1) {
                        getNum += Math.floor(potAwardInfo.num / potAwardInfo.roleId.length);
                    }
                }
                var pInfo = GamblingManager.getPlayerInfo(roleId);
                if (pInfo) {
                    return getNum > pInfo.totalnum; //收益大于投入
                }
                qin.Console.log("获取是否赢牌失败,奖励的roleID列表为空！：" + roleId);
                return false;
            }
            else {
                qin.Console.log("获取是否赢牌失败,底池为空！roleId：" + roleId);
            }
        }
        else {
            qin.Console.log("获取是否赢牌失败，结算信息为空！roleId：" + roleId);
        }
    };
    /**
    * 玩家是否已存在
    */
    GamblingUtil.isContainPlayer = function (roleId) {
        return GamblingManager.getPlayerInfo(roleId) != null;
    };
    /**
     * 获取与小盲位置差
     */
    GamblingUtil.getOffsetPosBySbPos = function (targetPos) {
        var sbPos = GamblingUtil.sBlindPos;
        var pos = 0;
        if (sbPos != -1) {
            if (targetPos >= sbPos) {
                pos = targetPos - sbPos;
            }
            else {
                pos = targetPos + (GamblingManager.maxSeats - sbPos);
            }
            return pos;
        }
        return pos;
    };
    Object.defineProperty(GamblingUtil, "earliestActionPos", {
        /**
         * 获取最先开始说话人的位置
         */
        get: function () {
            var sbPos = GamblingUtil.sBlindPos;
            var pos = 0;
            if (sbPos != -1) {
                var pInfo = void 0;
                var index = 1;
                var currentIndex = 0;
                if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && !GamblingManager.roomInfo.publicCard) {
                    index = 3; //第一圈注从小盲的起的第二个说话位置开始
                }
                for (var i = 0; i < GamblingManager.maxSeats; i++) {
                    pInfo = GamblingManager.getPlayerInfoByPos(GamblingPanelSetting.getNextIndex(sbPos, i));
                    if (pInfo && pInfo.state != PlayerState.Fold && pInfo.state != PlayerState.WaitNext) {
                        currentIndex++;
                        if (currentIndex == index) {
                            return pInfo.pos;
                        }
                    }
                }
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "sBlindPos", {
        /**
         * 小盲位
         */
        get: function () {
            if (GamblingManager.roomInfo.playerList) {
                var len = GamblingManager.roomInfo.playerList.length;
                var pInfo = void 0;
                if (len == 2) {
                    for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                        pInfo = _a[_i];
                        if (pInfo.pos != GamblingManager.roomInfo.buttonPos) {
                            return pInfo.pos;
                        }
                    }
                }
                else {
                    GamblingManager.roomInfo.playerList.sort(GamblingUtil.sortPlayerListByPos);
                    var posIndex = void 0;
                    for (var i = 0; i < len; i++) {
                        pInfo = GamblingManager.roomInfo.playerList[i];
                        if (pInfo.pos == GamblingManager.roomInfo.buttonPos) {
                            if (i + 1 > len - 1) {
                                posIndex = i + 1 - len;
                            }
                            else {
                                posIndex = i + 1;
                            }
                            // posIndex = GamblingPanelSetting.getNextIndex(i, 1, len - 1);
                            break;
                        }
                    }
                    if (posIndex >= 0 && posIndex <= GamblingManager.roomInfo.playerList.length) {
                        return GamblingManager.roomInfo.playerList[posIndex].pos;
                    }
                }
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "bBlindPos", {
        /**
         * 大盲位
         */
        get: function () {
            if (GamblingManager.roomInfo.playerList) {
                var len = GamblingManager.roomInfo.playerList.length;
                var pInfo = void 0;
                if (len == 2) {
                    return GamblingManager.roomInfo.buttonPos;
                }
                else {
                    GamblingManager.roomInfo.playerList.sort(GamblingUtil.sortPlayerListByPos);
                    var posIndex = void 0;
                    for (var i = 0; i < len; i++) {
                        pInfo = GamblingManager.roomInfo.playerList[i];
                        if (pInfo.pos == GamblingManager.roomInfo.buttonPos) {
                            if (i + 2 > len - 1) {
                                posIndex = i + 2 - len;
                            }
                            else {
                                posIndex = i + 2;
                            }
                            // posIndex = GamblingPanelSetting.getNextIndex(i, 2, len - 1);
                            break;
                        }
                    }
                    if (posIndex >= 0 && posIndex < GamblingManager.roomInfo.playerList.length) {
                        return GamblingManager.roomInfo.playerList[posIndex].pos;
                    }
                }
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "utgPos", {
        /**
         * 枪口位
         */
        get: function () {
            var pos;
            var bbPos = GamblingUtil.bBlindPos;
            for (var i = 1; i <= GamblingPanelSetting.MaxPitIndex - 1; i++) {
                pos = GamblingPanelSetting.getNextIndex(bbPos, i); //查找大盲位置的后一位，如果有玩家存在，则该位置是枪口位
                if (GamblingManager.roomInfo && GamblingManager.roomInfo.playerList) {
                    for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.pos == pos) {
                            return info.pos;
                        }
                    }
                }
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "maxRaiseChips", {
        /**
         * 获取可以加注的最大值
         */
        get: function () {
            if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList && GamblingManager.self) {
                var maxBankRoll = GamblingUtil.maxBankRoll;
                if (maxBankRoll > GamblingManager.roomInfo.minRaiseNum) {
                    // let offset: number = maxBankRoll - GamblingManager.roomInfo.minRaiseNum;
                    // let bbNum: number = Math.ceil(offset / GamblingManager.roomInfo.bBlind);
                    // let additional: number = bbNum * GamblingManager.roomInfo.bBlind;
                    // additional += GamblingManager.roomInfo.minRaiseNum;
                    return Math.min(maxBankRoll, GamblingManager.self.bankRoll + GamblingManager.self.num);
                }
                return GamblingManager.roomInfo.minRaiseNum;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否在说话
     */
    GamblingUtil.getIsOnAction = function (role) {
        if (role instanceof PlayerInfo) {
            return GamblingManager.roomInfo.pos == role.pos && role.state != PlayerState.WaitNext;
        }
        else {
            var pInfo = GamblingManager.getPlayerInfo(role);
            if (pInfo && GamblingManager.roomInfo) {
                return pInfo.pos == GamblingManager.roomInfo.pos && pInfo.state != PlayerState.WaitNext;
            }
        }
        return false;
    };
    Object.defineProperty(GamblingUtil, "callNum", {
        /**
        * 获取需要跟注的数量
        */
        get: function () {
            if (GamblingManager.self && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingUtil.isOnProcess(GamblingManager.self)) {
                return GamblingManager.roomInfo.maxAnte - GamblingManager.self.num;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "maxBankRoll", {
        /**
         * 当前玩家身上最多的筹码量
         */
        get: function () {
            var maxBankRoll = 0;
            for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                var pInfo = _a[_i];
                if (pInfo.roleId != UserManager.userInfo.roleId && pInfo.bankRoll + pInfo.num > maxBankRoll) {
                    maxBankRoll = pInfo.bankRoll + pInfo.num;
                }
            }
            return maxBankRoll;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "isCanCheck", {
        /**
         * 是否可以过牌
         */
        get: function () {
            if (GamblingManager.self && GamblingManager.roomInfo) {
                if (GamblingUtil.isOnProcess(GamblingManager.self) && GamblingManager.self.num == GamblingManager.roomInfo.maxAnte) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "isCanRaise", {
        /**
         * 是否可以加注
         */
        get: function () {
            if (GamblingManager.self && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingUtil.getIsOnAction(GamblingManager.self)) {
                if (GamblingManager.self.bankRoll + GamblingManager.self.num > GamblingManager.roomInfo.maxAnte) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "isNeedAllIn", {
        /**
         * 是否需要allin 加注最小值
         */
        get: function () {
            if (InfoUtil.checkAvailable(GamblingManager.roomInfo)) {
                if (GamblingManager.roomInfo.definition.pattern == GamblingPattern.AllIn) {
                    var maxBankRoll = GamblingUtil.maxBankRoll;
                    if (GamblingManager.self && GamblingUtil.isOnProcess(GamblingManager.self)) {
                        if (maxBankRoll >= GamblingManager.self.bankRoll || GamblingManager.roomInfo.maxAnte <= GamblingManager.roomInfo.bBlind) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else {
                    if (GamblingManager.self && GamblingUtil.isOnProcess(GamblingManager.self)) {
                        if (GamblingManager.self.bankRoll + GamblingManager.self.num <= GamblingManager.roomInfo.maxAnte) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 是否还在玩牌 没有弃牌，非等待下一局
    */
    GamblingUtil.isOnProcess = function (role) {
        var pInfo;
        if (role instanceof PlayerInfo) {
            pInfo = role;
        }
        else {
            pInfo = GamblingManager.getPlayerInfo(role);
        }
        if (pInfo) {
            switch (pInfo.state) {
                case PlayerState.Check:
                case PlayerState.Call:
                case PlayerState.Raise:
                case PlayerState.Blind:
                case PlayerState.AllIn:
                case PlayerState.WaitAction:
                    return true;
            }
            return GamblingUtil.getIsOnAction(pInfo);
        }
        return false;
    };
    /**
     * 获取是否是房主
     */
    GamblingUtil.getIsMaster = function (role) {
        if (GamblingManager.roomInfo) {
            if (role instanceof PlayerInfo) {
                return role.roleId == GamblingManager.roomInfo.masterId;
            }
            else {
                return role == GamblingManager.roomInfo.masterId;
            }
        }
        return false;
    };
    Object.defineProperty(GamblingUtil, "isCanThanCard", {
        /**
         * 是否可以比牌
         */
        get: function () {
            if (GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.handCardList) {
                for (var _i = 0, _a = GamblingManager.roundOverInfo.handCardList; _i < _a.length; _i++) {
                    var handCardInfo = _a[_i];
                    var pInfo = GamblingManager.getPlayerInfo(handCardInfo.roleId);
                    if (GamblingUtil.isOnProcess(pInfo)) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "isCanOper", {
        /**
         * 是否可以操作
         */
        get: function () {
            if (GamblingManager.self) {
                switch (GamblingManager.self.state) {
                    case PlayerState.AllIn:
                    case PlayerState.Fold:
                    case PlayerState.WaitNext:
                        return false;
                }
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "isOmaha", {
        /**
         * 是否是奥马哈
        */
        get: function () {
            return InfoUtil.checkAvailable(GamblingManager.roomInfo) && (GamblingManager.roomInfo.gamblingType == GamblingType.Omaha || GamblingManager.roomInfo.gamblingType == GamblingType.OmahaPersonal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "isMatch", {
        /**
         * 是否是比赛房间
         */
        get: function () {
            return InfoUtil.checkAvailable(GamblingManager.roomInfo) && (GamblingManager.roomInfo.gamblingType == GamblingType.Match);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "isMtt", {
        /**
         * 是否是锦标赛
         */
        get: function () {
            return InfoUtil.checkAvailable(GamblingManager.roomInfo) &&
                InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) &&
                GamblingManager.matchRoomInfo.definition.type == MatchType.MTT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "isSng", {
        /**
         * 是否是淘汰赛
         */
        get: function () {
            return InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) &&
                GamblingManager.matchRoomInfo.definition.type == MatchType.SNG;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否是单桌
     */
    GamblingUtil.isSingleTable = function (info) {
        if (InfoUtil.checkAvailable(info)) {
            var roomDef = RoomDefined.GetInstance().getDefinition(info.definition.roomId);
            if (roomDef && roomDef.seat && Math.ceil(info.definition.bNum / roomDef.seat) == 1) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(GamblingUtil, "isSelfMatchOut", {
        /**
         * 客户端获取自己是否已经被淘汰
         */
        get: function () {
            if (GamblingUtil.isMatch && GamblingManager.matchRoomInfo && GamblingManager.self && GamblingManager.roomInfo) {
                if (GamblingManager.self.bankRoll <= 0) {
                    if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy) == false && GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon) == false) {
                        return true;
                    }
                }
                return false;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingUtil, "gamblingPanelStateIndex", {
        get: function () {
            if (GamblingManager.roomInfo) {
                switch (GamblingManager.roomInfo.gamblingType) {
                    case GamblingType.Common:
                    case GamblingType.PlayFieldPersonal:
                        return GamblingPanelStateIndex.Normal;
                    case GamblingType.Match:
                        return GamblingUtil.getGamblingPanelStateIndex(GamblingManager.matchRoomInfo); //等待状态不做断线处理，所以如果房间类型是锦标赛则面板的状态是锦标赛状态
                    case GamblingType.Guide:
                        return GamblingPanelStateIndex.Guide;
                    case GamblingType.GuidePlayWay:
                        return GamblingPanelStateIndex.GuidePlayWay;
                    case GamblingType.Omaha:
                    case GamblingType.OmahaPersonal:
                        return GamblingPanelStateIndex.Omaha;
                }
            }
            return GamblingUtil.getGamblingPanelStateIndex(GamblingManager.matchRoomInfo); //房间信息不存在，则是比赛赛等待状态
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否超出了报名时间，某比赛
     */
    GamblingUtil.isOutOfJoin = function (info) {
        if (InfoUtil.checkAvailable(info)) {
            var leftTime = info.startTime + info.definition.delaySign - TimeManager.GetServerUtcTimestamp();
            return leftTime <= 0;
        }
        return false;
    };
    /**
     * 根据锦标赛状态获取面板状态
     */
    GamblingUtil.getGamblingPanelStateIndex = function (info) {
        if (info) {
            return info.isWaitStart ? GamblingPanelStateIndex.MatchWait : GamblingPanelStateIndex.Match;
        }
        qin.Console.logError("切换到游戏场景状态有问题，比赛的房间信息为空！");
        return GamblingPanelStateIndex.Match;
    };
    /**
     * 玩家列表根据位置升序排序
     * @param a
     * @param b
     */
    GamblingUtil.sortPlayerListByPos = function (a, b) {
        if (a.pos > b.pos) {
            return 1;
        }
        if (a.pos < b.pos) {
            return -1;
        }
        return 0;
    };
    return GamblingUtil;
}());
__reflect(GamblingUtil.prototype, "GamblingUtil");
//# sourceMappingURL=GamblingUtil.js.map