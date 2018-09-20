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
 *邀请奖励信息
 */
var InviteAwardInfo = (function (_super) {
    __extends(InviteAwardInfo, _super);
    function InviteAwardInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InviteAwardInfo.prototype.reset = function () {
        this.gotBean = 0;
        this.getBean = 0;
        this.gotGold = 0;
        this.getGold = 0;
        this.bind = 0;
        this.finish = 0;
    };
    return InviteAwardInfo;
}(BaseServerValueInfo));
__reflect(InviteAwardInfo.prototype, "InviteAwardInfo");
//# sourceMappingURL=InviteAwardInfo.js.map