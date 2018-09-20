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
 * 百人大战房间信息
 */
var HWRoomInfo = (function (_super) {
    __extends(HWRoomInfo, _super);
    function HWRoomInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 玩家列表
         */
        _this.playerList = new Array();
        /**
         * 注池列表
        */
        _this.betList = new Array();
        return _this;
    }
    Object.defineProperty(HWRoomInfo.prototype, "hwId", {
        /**
         * 房间的配置ID
         */
        get: function () {
            return this._roomId;
        },
        set: function (value) {
            this._roomId = value;
            this._definition = HundredWarDefined.GetInstance().getDefinition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HWRoomInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    HWRoomInfo.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return HWRoomInfo;
}(BaseServerValueInfo));
__reflect(HWRoomInfo.prototype, "HWRoomInfo", ["IHaveDefintionInfo"]);
//# sourceMappingURL=HundredWarRoomInfo.js.map