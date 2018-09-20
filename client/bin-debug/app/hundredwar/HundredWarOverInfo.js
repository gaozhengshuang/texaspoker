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
 * 百人大战结算信息
*/
var HundredWarOverInfo = (function (_super) {
    __extends(HundredWarOverInfo, _super);
    function HundredWarOverInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HundredWarOverInfo.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return HundredWarOverInfo;
}(BaseServerValueInfo));
__reflect(HundredWarOverInfo.prototype, "HundredWarOverInfo");
//# sourceMappingURL=HundredWarOverInfo.js.map