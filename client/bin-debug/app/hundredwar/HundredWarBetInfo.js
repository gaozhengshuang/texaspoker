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
 * 百人大战注数信息
*/
var HWBetInfo = (function (_super) {
    __extends(HWBetInfo, _super);
    function HWBetInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWBetInfo.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return HWBetInfo;
}(BaseServerValueInfo));
__reflect(HWBetInfo.prototype, "HWBetInfo");
//# sourceMappingURL=HundredWarBetInfo.js.map