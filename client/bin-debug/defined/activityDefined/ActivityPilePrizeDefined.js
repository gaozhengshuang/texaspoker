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
 * 累充活动配置
 */
var ActivityPilePrizeDefined = (function (_super) {
    __extends(ActivityPilePrizeDefined, _super);
    function ActivityPilePrizeDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityPilePrizeDefined.GetInstance = function () {
        if (!ActivityPilePrizeDefined._instance) {
            ActivityPilePrizeDefined._instance = new ActivityPilePrizeDefined();
        }
        if (DefinedManager.IsParsed(ActivityPilePrizeDefined.activityConfig) == false) {
            ActivityPilePrizeDefined._instance.initialize();
        }
        return ActivityPilePrizeDefined._instance;
    };
    ActivityPilePrizeDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ActivityPilePrizeDefined.activityConfig);
    };
    ActivityPilePrizeDefined.activityConfig = "activity_pilePrize";
    return ActivityPilePrizeDefined;
}(BaseActivitySubDefined));
__reflect(ActivityPilePrizeDefined.prototype, "ActivityPilePrizeDefined");
/**
 * 累充活动配置
 */
var ActivityPilePrizeDefintion = (function (_super) {
    __extends(ActivityPilePrizeDefintion, _super);
    function ActivityPilePrizeDefintion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ActivityPilePrizeDefintion;
}(BaseActivitySubDefnition));
__reflect(ActivityPilePrizeDefintion.prototype, "ActivityPilePrizeDefintion");
//# sourceMappingURL=ActivityPilePrizeDefined.js.map