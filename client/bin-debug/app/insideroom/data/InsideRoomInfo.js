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
 * 自己在里面的房间信息（包括游戏场房间，百人大战房间，锦标赛房间）
 */
var InsideRoomInfo = (function (_super) {
    __extends(InsideRoomInfo, _super);
    function InsideRoomInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InsideRoomInfo;
}(BaseServerValueInfo));
__reflect(InsideRoomInfo.prototype, "InsideRoomInfo");
//# sourceMappingURL=InsideRoomInfo.js.map