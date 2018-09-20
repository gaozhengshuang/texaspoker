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
 * 充值活动配置
 */
var ActivityPayPrizeDefined = (function (_super) {
    __extends(ActivityPayPrizeDefined, _super);
    function ActivityPayPrizeDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityPayPrizeDefined.GetInstance = function () {
        if (!ActivityPayPrizeDefined._instance) {
            ActivityPayPrizeDefined._instance = new ActivityPayPrizeDefined();
        }
        if (DefinedManager.IsParsed(ActivityPayPrizeDefined.config) == false) {
            ActivityPayPrizeDefined._instance.initialize();
        }
        return ActivityPayPrizeDefined._instance;
    };
    ActivityPayPrizeDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ActivityPayPrizeDefined.config);
    };
    ActivityPayPrizeDefined.config = "activity_payPrize";
    return ActivityPayPrizeDefined;
}(BaseActivitySubDefined));
__reflect(ActivityPayPrizeDefined.prototype, "ActivityPayPrizeDefined");
/**
 * 充值活动配置
 */
var ActivityPayPrizeDefintion = (function (_super) {
    __extends(ActivityPayPrizeDefintion, _super);
    function ActivityPayPrizeDefintion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ActivityPayPrizeDefintion;
}(BaseActivitySubDefnition));
__reflect(ActivityPayPrizeDefintion.prototype, "ActivityPayPrizeDefintion");
//# sourceMappingURL=ActivityPayPrizeDefined.js.map