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
 * 邮件定义
 */
var MailDefined = (function (_super) {
    __extends(MailDefined, _super);
    function MailDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MailDefined.GetInstance = function () {
        if (!MailDefined._instance) {
            MailDefined._instance = new MailDefined();
        }
        if (DefinedManager.IsParsed(MailDefined.mailConfig) == false) {
            MailDefined._instance.initialize();
        }
        return MailDefined._instance;
    };
    MailDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(MailDefined.mailConfig);
    };
    MailDefined.mailConfig = "mail";
    return MailDefined;
}(BaseDefined));
__reflect(MailDefined.prototype, "MailDefined");
var MailDefintion = (function () {
    function MailDefintion() {
    }
    return MailDefintion;
}());
__reflect(MailDefintion.prototype, "MailDefintion");
//# sourceMappingURL=MailDefined.js.map