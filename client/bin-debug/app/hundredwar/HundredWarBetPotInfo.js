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
 * 百人大战注池信息
 */
var HWBetPotInfo = (function (_super) {
    __extends(HWBetPotInfo, _super);
    function HWBetPotInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWBetPotInfo.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return HWBetPotInfo;
}(BaseServerValueInfo));
__reflect(HWBetPotInfo.prototype, "HWBetPotInfo");
/**
 * 百人大战结果类型
*/
var HundredWarResultType;
(function (HundredWarResultType) {
    /**
     * 输
    */
    HundredWarResultType[HundredWarResultType["Lose"] = 0] = "Lose";
    /**
     * 赢
    */
    HundredWarResultType[HundredWarResultType["Win"] = 1] = "Win";
    /**
     * 平
    */
    HundredWarResultType[HundredWarResultType["Dogfall"] = 2] = "Dogfall";
})(HundredWarResultType || (HundredWarResultType = {}));
//# sourceMappingURL=HundredWarBetPotInfo.js.map