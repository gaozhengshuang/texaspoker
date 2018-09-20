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
 * 绑定的账号信息
 */
var BindAccountInfo = (function (_super) {
    __extends(BindAccountInfo, _super);
    function BindAccountInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BindAccountInfo.prototype.reset = function () {
        this.channel = undefined;
        this.time = undefined;
    };
    return BindAccountInfo;
}(BaseServerValueInfo));
__reflect(BindAccountInfo.prototype, "BindAccountInfo");
//# sourceMappingURL=BindAccountInfo.js.map