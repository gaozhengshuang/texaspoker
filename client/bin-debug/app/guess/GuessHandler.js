var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 手牌竞猜管理器
*/
var GuessHandler = (function () {
    function GuessHandler() {
        /**
         * 获取投注的手牌类型以及赔率的数据成功的广播
        */
        this.onGetGuessOddsInfoEvent = new qin.DelegateDispatcher();
        /**
         * 投注注数更改广播
        */
        this.onChangeTotalAnteEvent = new qin.DelegateDispatcher();
        /**
         * 获取本周榜单信息成功广播
        */
        this.onWeekInfoEvent = new qin.DelegateDispatcher();
        /**
         * 获取购买记录信息成功广播
        */
        this.onGetBuyRecordInfoEvent = new qin.DelegateDispatcher();
        /**
         * 竞猜中奖广播
        */
        this.onGuessCorrectlyEvent = new qin.DelegateDispatcher();
        /**
         * 下一局开始重置购买一次按钮状态广播
        */
        this.onResetBuyOnceStateEvent = new qin.DelegateDispatcher();
    }
    /**
     * 重置数据
    */
    GuessHandler.prototype.reset = function () {
        this.totalAnte = 0;
        qin.ArrayUtil.Clear(this.guessOddsList);
    };
    /**
     * 离开房间重置数据
    */
    GuessHandler.prototype.leaveRoomReset = function () {
        this.totalAnte = 0;
        GamblingManager.guessHandler.buyInning = undefined;
        qin.ArrayUtil.Clear(this.resultList);
        qin.ArrayUtil.Clear(this.buyGuessAnteInfo);
        this.onDisable();
    };
    GuessHandler.prototype.onEnable = function () {
        UserManager.propertyChangeEvent.addListener(this.goldChange, this);
    };
    GuessHandler.prototype.onDisable = function () {
        UserManager.propertyChangeEvent.removeListener(this.goldChange, this);
    };
    /**
    * 下一局开始重置购买一次按钮状态
   */
    GuessHandler.prototype.resetBuyRB = function () {
        this.buyOnceRBSel = false;
        if (this.buyInning == 1) {
            GamblingManager.guessHandler.buyInning = undefined;
        }
        this.onResetBuyOnceStateEvent.dispatch();
    };
    /**
     * 设置购买的竞猜信息
    */
    GuessHandler.prototype.setBuyGuessAnteInfo = function (id, ante) {
        if (!this.buyGuessAnteInfo) {
            this.buyGuessAnteInfo = new Array();
        }
        if (this.buyGuessAnteInfo.length > 0) {
            var flag = true;
            for (var i = 0; i < this.buyGuessAnteInfo.length; i++) {
                var info = this.buyGuessAnteInfo[i];
                if (info.id == id) {
                    if (ante == 0) {
                        this.buyGuessAnteInfo.splice(i, 1);
                        return;
                    }
                    else {
                        info.num = ante;
                    }
                    flag = false;
                }
            }
            if (flag) {
                this.setNewGuessAnteInfo(id, ante);
            }
        }
        else {
            this.setNewGuessAnteInfo(id, ante);
        }
    };
    /**
     * 写入新的竞猜注数信息
    */
    GuessHandler.prototype.setNewGuessAnteInfo = function (id, ante) {
        var def = HoleCardsDefined.GetInstance().getDefinition(id);
        if (def) {
            var buyAnteInfo = new BuyGuessAnteInfoBase();
            buyAnteInfo.id = id;
            buyAnteInfo.handType = def.type;
            buyAnteInfo.num = ante;
            this.buyGuessAnteInfo.push(buyAnteInfo);
        }
    };
    /**
     * 写入开奖信息数据
    */
    GuessHandler.prototype.setResultListInfo = function () {
        if (!GamblingUtil.isMatch && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.handCard) {
            var guessResultInfo = new GuessResultInfo();
            guessResultInfo.time = TimeManager.GetServerUtcTimestamp();
            guessResultInfo.card1 = GamblingManager.roomInfo.handCard[0];
            guessResultInfo.card2 = GamblingManager.roomInfo.handCard[1];
            //中奖注数        
            if (this.isBuyGuess) {
                //判断是否中奖了
                var num = this.guessCorrectlyAnte(guessResultInfo.card1, guessResultInfo.card2);
                if (num) {
                    guessResultInfo.ante = num;
                    this.onGuessCorrectlyEvent.dispatch();
                }
                else {
                    guessResultInfo.ante = 0;
                }
                if (this.buyInning == undefined) {
                    this.isBuyGuess = false;
                }
            }
            else {
                guessResultInfo.ante = 0;
            }
            if (!this.resultList) {
                this.resultList = new Array();
            }
            if (this.resultList.length >= 10) {
                this.resultList.shift();
            }
            this.resultList.push(guessResultInfo);
        }
    };
    /**
     * 中奖注数
    */
    GuessHandler.prototype.guessCorrectlyAnte = function (card1, card2) {
        if (this.buyGuessAnteInfo) {
            var ante = 0;
            for (var _i = 0, _a = this.buyGuessAnteInfo; _i < _a.length; _i++) {
                var guessInfo = _a[_i];
                switch (guessInfo.handType) {
                    case GuessType.NoAOrK://无A和K
                        if (card1.card[1] != 1 && card1.card[1] != 13 && card2.card[1] != 1 && card2.card[1] != 13) {
                            ante += guessInfo.num;
                        }
                        break;
                    case GuessType.Flush://为同花
                        if (card1.card[0] == card2.card[0]) {
                            ante += guessInfo.num;
                        }
                        break;
                    case GuessType.HasAOrK://含A或K
                        if (card1.card[1] == 1 || card1.card[1] == 13 || card2.card[1] == 1 || card2.card[1] == 13) {
                            ante += guessInfo.num;
                        }
                        break;
                    case GuessType.HasA://含A
                        if (card1.card[1] == 1 || card2.card[1] == 1) {
                            ante += guessInfo.num;
                        }
                        break;
                    case GuessType.OnePair://为对子
                        if (card1.card[1] == card2.card[1]) {
                            ante += guessInfo.num;
                        }
                        break;
                    case GuessType.HasAA://为AA
                        if (card1.card[1] == 1 && card2.card[1] == 1) {
                            ante += guessInfo.num;
                        }
                        break;
                }
            }
            return ante;
        }
        return null;
    };
    /**
     * 获得投注的手牌类型以及赔率的数据
    */
    GuessHandler.prototype.getGuessOddsInfo = function () {
        this.reset();
        if (!this.guessOddsList) {
            this.guessOddsList = new Array();
        }
        if (HoleCardsDefined.GetInstance().dataList) {
            for (var _i = 0, _a = HoleCardsDefined.GetInstance().dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                var guessOddsInfo = new GuessOddsInfo();
                guessOddsInfo.id = def.id;
                this.guessOddsList.push(guessOddsInfo);
            }
        }
    };
    /**
     * 发送购买竞猜注数请求
    */
    GuessHandler.prototype.reqBuyGuessAnte = function (type, anteList) {
        if (type === void 0) { type = 0; }
        var callback = function (result) {
        };
        if (type == 0) {
            SocketManager.call(Command.GuessBuy_Req_3622, null, callback, null, this);
        }
        else {
            SocketManager.call(Command.GuessBuy_Req_3622, { type: type, anteList: anteList }, callback, null, this);
        }
    };
    /**
     * 发送获取本周榜单请求
    */
    GuessHandler.prototype.reqGetWeekInfo = function () {
        SocketManager.call(Command.GuessCrunchies_Req_3623, null, this.getWeekInfoResponse, null, this);
    };
    GuessHandler.prototype.getWeekInfoResponse = function (result) {
        if (result.data && result.data.Array) {
            this.weekGuessRankList = result.data.Array;
            this.onWeekInfoEvent.dispatch();
        }
    };
    /**
     * 发送获取购买记录请求
    */
    GuessHandler.prototype.reqGetBuyRecordInfo = function () {
        SocketManager.call(Command.GuessRecord_Req_3624, null, this.getBuyRecordInfoResponse, null, this);
    };
    GuessHandler.prototype.getBuyRecordInfoResponse = function (result) {
        if (result.data && result.data.Array) {
            if (!this.recordList) {
                this.recordList = new Array();
            }
            qin.ArrayUtil.Clear(this.recordList);
            for (var _i = 0, _a = result.data.Array; _i < _a.length; _i++) {
                var dataInfo = _a[_i];
                var recordInfo = new GuessRecordInfo();
                var cardList = new Array();
                var numList = new Array();
                numList = JSON.parse(dataInfo.cards);
                recordInfo.type = dataInfo.type;
                recordInfo.ante = dataInfo.ante;
                recordInfo.gold = dataInfo.gold;
                recordInfo.time = dataInfo.time;
                GamblingUtil.cardArr2CardInfoList(numList, cardList);
                recordInfo.card1 = cardList[0];
                recordInfo.card2 = cardList[1];
                this.recordList.push(recordInfo);
            }
            for (var _b = 0, _c = this.recordList; _b < _c.length; _b++) {
                var recordInfo = _c[_b];
                var def = new HoleCardsDefinition();
                def = HoleCardsDefined.GetInstance().getHoleCardsInfoByType(recordInfo.type);
                recordInfo.record = def.des;
            }
            this.onGetBuyRecordInfoEvent.dispatch();
        }
    };
    /**
     * 外部金币小于买入竞猜筹码
    */
    GuessHandler.prototype.goldChange = function () {
        if (GamblingManager.roomInfo) {
            var guessGold = GamblingManager.guessHandler.totalAnte * GamblingManager.roomInfo.bBlind;
            if (guessGold && UserManager.userInfo.gold < guessGold) {
                GamblingManager.guessHandler.buyInning = undefined;
                GamblingManager.guessHandler.isBuyGuess = false;
            }
        }
    };
    return GuessHandler;
}());
__reflect(GuessHandler.prototype, "GuessHandler");
/**
 * 投注手牌信息
*/
var GuessOddsInfo = (function () {
    function GuessOddsInfo() {
    }
    Object.defineProperty(GuessOddsInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = HoleCardsDefined.GetInstance().getDefinition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GuessOddsInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    return GuessOddsInfo;
}());
__reflect(GuessOddsInfo.prototype, "GuessOddsInfo", ["IHaveDefintionInfo"]);
var BuyGuessAnteInfo = (function () {
    function BuyGuessAnteInfo() {
    }
    return BuyGuessAnteInfo;
}());
__reflect(BuyGuessAnteInfo.prototype, "BuyGuessAnteInfo");
/**
 * 竞猜购买的注数信息
*/
var BuyGuessAnteInfoBase = (function (_super) {
    __extends(BuyGuessAnteInfoBase, _super);
    function BuyGuessAnteInfoBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BuyGuessAnteInfoBase;
}(BuyGuessAnteInfo));
__reflect(BuyGuessAnteInfoBase.prototype, "BuyGuessAnteInfoBase");
/**
 * 本周榜单信息
*/
var WeekGuessRankInfo = (function () {
    function WeekGuessRankInfo() {
    }
    return WeekGuessRankInfo;
}());
__reflect(WeekGuessRankInfo.prototype, "WeekGuessRankInfo");
/**
 * 开奖信息
*/
var GuessResultInfo = (function () {
    function GuessResultInfo() {
    }
    return GuessResultInfo;
}());
__reflect(GuessResultInfo.prototype, "GuessResultInfo");
var GuessRecordInfo = (function (_super) {
    __extends(GuessRecordInfo, _super);
    function GuessRecordInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GuessRecordInfo;
}(GuessResultInfo));
__reflect(GuessRecordInfo.prototype, "GuessRecordInfo");
/**
 * 竞猜类型
*/
var GuessType;
(function (GuessType) {
    /**
     * 无A无K
    */
    GuessType[GuessType["NoAOrK"] = 2] = "NoAOrK";
    /**
     * 同花
     */
    GuessType[GuessType["Flush"] = 3] = "Flush";
    /**
     * 含A或K
    */
    GuessType[GuessType["HasAOrK"] = 4] = "HasAOrK";
    /**
     * 含A
    */
    GuessType[GuessType["HasA"] = 5] = "HasA";
    /**
     * 一对
     */
    GuessType[GuessType["OnePair"] = 6] = "OnePair";
    /**
     * 为AA
    */
    GuessType[GuessType["HasAA"] = 7] = "HasAA";
})(GuessType || (GuessType = {}));
//# sourceMappingURL=GuessHandler.js.map