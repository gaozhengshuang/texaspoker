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
 * 房间信息
 */
var RoomInfo = (function (_super) {
    __extends(RoomInfo, _super);
    function RoomInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RoomInfo.prototype, "roomId", {
        /**
         * 房间的配置ID
         */
        get: function () {
            return this._roomId;
        },
        set: function (value) {
            this._roomId = value;
            this._definition = RoomDefined.GetInstance().getDefinition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomInfo.prototype, "sBlind", {
        get: function () {
            if (this._sBlind == undefined || this._sBlind == 0 && this._definition) {
                this._sBlind = this._definition.sBlind;
            }
            return this._sBlind;
        },
        set: function (value) {
            this._sBlind = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomInfo.prototype, "bBlind", {
        /**
         * 大盲
         */
        get: function () {
            if (this._bBlind == undefined || this._bBlind == 0 && this._definition) {
                this._bBlind = this._definition.bBlind;
            }
            return this._bBlind;
        },
        set: function (value) {
            this._bBlind = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomInfo.prototype, "gamblingType", {
        /**
         * 1.常规 2.比赛 3.私人
         */
        get: function () {
            if (this._definition) {
                return GamblingType.getType(this._definition.type);
            }
            return GamblingType.Common;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomInfo.prototype, "maxAnte", {
        /**
         * 当前圈注最大下注额度
         */
        get: function () {
            if (this._maxAnte == undefined) {
                this._maxAnte = 0;
            }
            return this._maxAnte;
        },
        set: function (value) {
            this._maxAnte = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomInfo.prototype, "minRaiseNum", {
        /**
         * 最小加注额度
         */
        get: function () {
            if (this._minRaiseNum == undefined || this._minRaiseNum <= 0) {
                if (GamblingManager.isOneLoopStart) {
                    this._minRaiseNum = this.bBlind;
                }
                else {
                    this._minRaiseNum = this.bBlind * 2;
                }
            }
            if (this._minRaiseNum < this.bBlind) {
                this._minRaiseNum = this.bBlind + this._minRaiseNum;
            }
            if (GamblingManager.self) {
                return Math.min(GamblingManager.self.bankRoll + GamblingManager.self.num, this._minRaiseNum);
            }
            return this._minRaiseNum;
        },
        /**
         * 当前最小加注额度
         */
        set: function (value) {
            this._minRaiseNum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    //--------锦标赛--------
    RoomInfo.prototype.reset = function () {
        this.id = 0;
        this.buttonPos = 0;
        this.potChips = undefined;
        this.roomId = 0;
        this.ante = 0;
        this.sBlind = 0;
        this.bBlind = 0;
        this.pos = 0;
        this.posTime = 0;
        this.startTime;
        this.publicCard = undefined;
        this.playerList = undefined;
        this.sidePot = undefined;
        this.isShowCard = undefined;
        this.handCard = undefined;
        this.isAutoBuy = undefined;
        this._definition = undefined;
        this.maxAnte = 0;
        this.minRaiseNum = 0;
        this.masterId = 0;
        this.rebuyTimes = 0;
        this.blindLevel = 0;
        this.nowBlindLevel = 0;
        this.blindTime = 0;
        this.addbuy = 0;
        this.isTrusteeship = undefined;
        this.isMatchOut = undefined;
        this.isFlopCardOver = undefined;
        this.isOnWatch = undefined;
    };
    RoomInfo.prototype.copyValueFrom = function (data) {
        _super.prototype.copyValueFrom.call(this, data);
        qin.CopyUtil.supCopyList(this, data, "playerList", PlayerInfo);
        if (data["playerList"]) {
            var playerInfo = void 0;
            for (var i = 0; i < data["playerList"].length; i++) {
                playerInfo = data["playerList"][i];
                playerInfo.cardList = new Array();
                GamblingUtil.cardArr2CardInfoList(playerInfo["card"], playerInfo.cardList);
                if (playerInfo.cardList.length == 0) {
                    playerInfo.cardList = undefined;
                }
            }
        }
        // qin.CopyUtil.supCopyList<CardInfo>(this, data, "handCardList", CardInfo);
        // qin.CopyUtil.supCopyList<CardInfo>(this, data, "cardList", CardInfo);
    };
    return RoomInfo;
}(BaseServerValueInfo));
__reflect(RoomInfo.prototype, "RoomInfo", ["IHaveDefintionInfo"]);
/**
 * 卡牌信息
 */
var CardInfo = (function (_super) {
    __extends(CardInfo, _super);
    function CardInfo(array) {
        var _this = _super.call(this) || this;
        _this.card = array;
        return _this;
    }
    /**
     * 克隆
     */
    CardInfo.prototype.clone = function () {
        var cardInfo = new CardInfo(undefined);
        if (this.card) {
            cardInfo.card = this.card.concat();
        }
        return cardInfo;
    };
    CardInfo.prototype.reset = function () {
        this.card = undefined;
    };
    return CardInfo;
}(BaseServerValueInfo));
__reflect(CardInfo.prototype, "CardInfo");
//# sourceMappingURL=RoomInfo.js.map