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
 * 房间玩家信息
 */
var PlayerInfo = (function (_super) {
    __extends(PlayerInfo, _super);
    function PlayerInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 头像宽高
         */
        _this.width = 100;
        _this.height = 100;
        return _this;
    }
    Object.defineProperty(PlayerInfo.prototype, "bankRoll", {
        /**
         * 游戏时身上的筹码数
         */
        get: function () {
            return this._bankRoll;
        },
        /**
         * 游戏时身上的筹码数
         */
        set: function (value) {
            this.lastBankRoll = this._bankRoll;
            this._bankRoll = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerInfo.prototype, "state", {
        /**
         * 0.等待下一局 1.弃牌 2.过牌 3.加注 4.allin 5.跟注 6.盲注
         */
        get: function () {
            return this._state;
        },
        set: function (value) {
            if (this._state != value) {
                this._state = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerInfo.prototype, "sex", {
        get: function () {
            if (this.userInfo) {
                return this.userInfo.sex;
            }
            return Sex.Unknown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerInfo.prototype, "head", {
        /**
         * 获取头像
         */
        get: function () {
            if (this.userInfo) {
                return this.userInfo.head;
            }
            return qin.StringConstants.Empty;
        },
        enumerable: true,
        configurable: true
    });
    PlayerInfo.prototype.reset = function () {
        this.roleId = undefined;
        this.lastBankRoll = undefined;
        this.bankRoll = undefined;
        this.pos = undefined;
        this.state = PlayerState.WaitNext;
        this.isSitDown = false;
        this.initbankRoll = undefined;
    };
    /**
     * 获取状态描述
     */
    PlayerInfo.getStateDes = function (state) {
        switch (state) {
            case PlayerState.AllIn:
                return "全下";
            case PlayerState.Fold:
                return "弃牌";
            case PlayerState.Check:
                return "过牌";
            case PlayerState.Raise:
                return "加注";
            case PlayerState.Call:
                return "跟注";
            case PlayerState.Action:
                return "思考中";
            case PlayerState.ShowCard:
                return "亮牌";
            case PlayerState.WaitNext:
                return "等待";
            default:
                return qin.StringConstants.Empty;
        }
    };
    /**
     * 获取状态背景资源
     */
    PlayerInfo.getStateImgRes = function (state) {
        switch (state) {
            case PlayerState.AllIn:
                return SheetSubName.AllInState;
            case PlayerState.Fold:
                return SheetSubName.FoldState;
            case PlayerState.Check:
                return SheetSubName.CheckState;
            case PlayerState.Raise:
                return SheetSubName.RaiseState;
            case PlayerState.Call:
                return SheetSubName.CallState;
            case PlayerState.Action:
            case PlayerState.ShowCard:
                return qin.StringConstants.Empty;
        }
        return qin.StringConstants.Empty;
    };
    return PlayerInfo;
}(BaseServerValueInfo));
__reflect(PlayerInfo.prototype, "PlayerInfo", ["IBaseHead"]);
//# sourceMappingURL=PlayerInfo.js.map