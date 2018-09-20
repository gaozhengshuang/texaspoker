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
 * 绑定手机奖励活动配置
 */
var ActivityPhoneDefined = (function (_super) {
    __extends(ActivityPhoneDefined, _super);
    function ActivityPhoneDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityPhoneDefined.GetInstance = function () {
        if (!ActivityPhoneDefined._instance) {
            ActivityPhoneDefined._instance = new ActivityPhoneDefined();
        }
        if (DefinedManager.IsParsed(ActivityPhoneDefined.config) == false) {
            ActivityPhoneDefined._instance.initialize();
        }
        return ActivityPhoneDefined._instance;
    };
    ActivityPhoneDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ActivityPhoneDefined.config);
    };
    ActivityPhoneDefined.config = "activity_bindChannel";
    return ActivityPhoneDefined;
}(BaseActivitySubDefined));
__reflect(ActivityPhoneDefined.prototype, "ActivityPhoneDefined");
/**
 * 绑定手机奖励活动配置
 */
var ActivityPhoneDefintion = (function (_super) {
    __extends(ActivityPhoneDefintion, _super);
    function ActivityPhoneDefintion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ActivityPhoneDefintion;
}(BaseActivitySubDefnition));
__reflect(ActivityPhoneDefintion.prototype, "ActivityPhoneDefintion");
//# sourceMappingURL=ActivityPhoneDefined.js.map