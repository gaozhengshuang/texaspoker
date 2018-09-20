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
 * 百人大战房间玩家信息
 */
var HWHundredWarRoomPlayerInfo = (function (_super) {
    __extends(HWHundredWarRoomPlayerInfo, _super);
    function HWHundredWarRoomPlayerInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 头像宽高
         */
        _this.width = 100;
        _this.height = 100;
        return _this;
    }
    HWHundredWarRoomPlayerInfo.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.pos = undefined;
    };
    return HWHundredWarRoomPlayerInfo;
}(SimpleUserInfo));
__reflect(HWHundredWarRoomPlayerInfo.prototype, "HWHundredWarRoomPlayerInfo", ["IBaseHead"]);
//# sourceMappingURL=HundredWarRoomPlayerInfo.js.map