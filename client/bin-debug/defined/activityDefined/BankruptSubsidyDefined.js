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
 * 破产补助活动配置
 */
var BankruptSubsidyDefined = (function (_super) {
    __extends(BankruptSubsidyDefined, _super);
    function BankruptSubsidyDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BankruptSubsidyDefined.GetInstance = function () {
        if (!BankruptSubsidyDefined._instance) {
            BankruptSubsidyDefined._instance = new BankruptSubsidyDefined();
        }
        if (DefinedManager.IsParsed(BankruptSubsidyDefined.config) == false) {
            BankruptSubsidyDefined._instance.initialize();
        }
        return BankruptSubsidyDefined._instance;
    };
    BankruptSubsidyDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(BankruptSubsidyDefined.config);
    };
    BankruptSubsidyDefined.config = "activity_bankruptSubsidy";
    return BankruptSubsidyDefined;
}(BaseActivitySubDefined));
__reflect(BankruptSubsidyDefined.prototype, "BankruptSubsidyDefined");
/**
 * 破产补助配置
 */
var BankruptSubsidyDefintion = (function (_super) {
    __extends(BankruptSubsidyDefintion, _super);
    function BankruptSubsidyDefintion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BankruptSubsidyDefintion;
}(BaseActivitySubDefnition));
__reflect(BankruptSubsidyDefintion.prototype, "BankruptSubsidyDefintion");
//# sourceMappingURL=BankruptSubsidyDefined.js.map