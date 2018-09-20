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
 * 锦标赛赛事信息
*/
var MatchRoomInfo = (function (_super) {
    __extends(MatchRoomInfo, _super);
    function MatchRoomInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MatchRoomInfo.prototype, "id", {
        /**
         * 配置ID
         */
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = ChampionshipDefined.GetInstance().getDefinition(value);
            this.maxAwardRank = ChampionshipManager.getAwardMaxRank(this._definition);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatchRoomInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatchRoomInfo.prototype, "roomId", {
        /**
         * 赛事所在房间的ID 只有进行中的比赛有房间ID
         */
        get: function () {
            return this._roomId;
        },
        set: function (value) {
            this._roomId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatchRoomInfo.prototype, "isWaitStart", {
        /**
         * 锦标赛的状态是否在等待开始
         */
        get: function () {
            return !this.roomId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 将自己克隆到一个对象
     */
    MatchRoomInfo.prototype.cloneTo = function (target) {
        target._definition = this._definition;
        var data = this;
        for (var key in data) {
            target[key] = data[key];
        }
    };
    MatchRoomInfo.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return MatchRoomInfo;
}(BaseServerValueInfo));
__reflect(MatchRoomInfo.prototype, "MatchRoomInfo", ["IHaveDefintionInfo"]);
//# sourceMappingURL=MatchRoomInfo.js.map