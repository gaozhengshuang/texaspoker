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
 * 赛事场房间信息
*/
var PlayingFieldRoomInfo = (function (_super) {
    __extends(PlayingFieldRoomInfo, _super);
    function PlayingFieldRoomInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PlayingFieldRoomInfo.prototype, "roomId", {
        /**
         * 配置ID
         */
        get: function () {
            return this._roomId;
        },
        set: function (value) {
            this._roomId = value;
            this._definition = RoomDefined.GetInstance().getDefinition(value);
            if (this._definition && this._definition.ante && this._definition.ante.length > 0) {
                this._ante = this._definition.ante[0];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayingFieldRoomInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayingFieldRoomInfo.prototype, "ante", {
        get: function () {
            return this._ante;
        },
        enumerable: true,
        configurable: true
    });
    PlayingFieldRoomInfo.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return PlayingFieldRoomInfo;
}(BaseServerValueInfo));
__reflect(PlayingFieldRoomInfo.prototype, "PlayingFieldRoomInfo");
//# sourceMappingURL=PlayingFieldRoomInfo.js.map