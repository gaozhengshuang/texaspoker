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
 * 欢乐豪礼活动配置
 */
var ActivityHappyGiftDefined = (function (_super) {
    __extends(ActivityHappyGiftDefined, _super);
    function ActivityHappyGiftDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityHappyGiftDefined.GetInstance = function () {
        if (!ActivityHappyGiftDefined._instance) {
            ActivityHappyGiftDefined._instance = new ActivityHappyGiftDefined();
        }
        if (DefinedManager.IsParsed(ActivityHappyGiftDefined.activityConfig) == false) {
            ActivityHappyGiftDefined._instance.initialize();
        }
        return ActivityHappyGiftDefined._instance;
    };
    ActivityHappyGiftDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ActivityHappyGiftDefined.activityConfig);
    };
    ActivityHappyGiftDefined.activityConfig = "activity_happyGift";
    return ActivityHappyGiftDefined;
}(BaseActivitySubDefined));
__reflect(ActivityHappyGiftDefined.prototype, "ActivityHappyGiftDefined");
/**
 * 欢乐豪礼活动配置
 */
var ActivityHappyGiftDefintion = (function (_super) {
    __extends(ActivityHappyGiftDefintion, _super);
    function ActivityHappyGiftDefintion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ActivityHappyGiftDefintion;
}(BaseActivitySubDefnition));
__reflect(ActivityHappyGiftDefintion.prototype, "ActivityHappyGiftDefintion");
//# sourceMappingURL=ActivityHappyGiftDefined.js.map