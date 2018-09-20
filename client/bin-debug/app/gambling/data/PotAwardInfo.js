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
 * 底池奖励信息
 */
var PotAwardInfo = (function (_super) {
    __extends(PotAwardInfo, _super);
    function PotAwardInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PotAwardInfo.prototype.reset = function () {
        this.roleId = undefined;
        this.type = 0;
        this.num = 0;
    };
    return PotAwardInfo;
}(BaseServerValueInfo));
__reflect(PotAwardInfo.prototype, "PotAwardInfo");
//# sourceMappingURL=PotAwardInfo.js.map