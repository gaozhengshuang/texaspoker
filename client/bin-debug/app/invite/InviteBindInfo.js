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
 * 邀请活动绑定列表信息
*/
var InviteBindInfo = (function (_super) {
    __extends(InviteBindInfo, _super);
    function InviteBindInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InviteBindInfo;
}(BaseServerValueInfo));
__reflect(InviteBindInfo.prototype, "InviteBindInfo");
//# sourceMappingURL=InviteBindInfo.js.map