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
 * 结算信息
 */
var RoundOverInfo = (function (_super) {
    __extends(RoundOverInfo, _super);
    function RoundOverInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoundOverInfo.prototype.reset = function () {
        this.potList = undefined;
        this.handCardList = undefined;
    };
    RoundOverInfo.prototype.copyValueFrom = function (data) {
        _super.prototype.copyValueFrom.call(this, data);
        qin.CopyUtil.supCopyList(this, data, "handCardList", HandCardInfo);
    };
    return RoundOverInfo;
}(BaseServerValueInfo));
__reflect(RoundOverInfo.prototype, "RoundOverInfo");
//# sourceMappingURL=RoundOverInfo.js.map