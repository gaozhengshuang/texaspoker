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
var MailInfo = (function (_super) {
    __extends(MailInfo, _super);
    function MailInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MailInfo.prototype.reset = function () {
    };
    Object.defineProperty(MailInfo.prototype, "isHavePrize", {
        /**
        * 是否有附件
        */
        get: function () {
            return this.attaList != null && this.attaList.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    return MailInfo;
}(BaseServerValueInfo));
__reflect(MailInfo.prototype, "MailInfo");
//# sourceMappingURL=MailInfo.js.map