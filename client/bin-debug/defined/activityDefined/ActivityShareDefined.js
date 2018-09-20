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
 * 分享抽奖活动配置
 */
var ActivityShareDefined = (function (_super) {
    __extends(ActivityShareDefined, _super);
    function ActivityShareDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityShareDefined.GetInstance = function () {
        if (!ActivityShareDefined._instance) {
            ActivityShareDefined._instance = new ActivityShareDefined();
        }
        if (DefinedManager.IsParsed(ActivityShareDefined.config) == false) {
            ActivityShareDefined._instance.initialize();
        }
        return ActivityShareDefined._instance;
    };
    ActivityShareDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ActivityShareDefined.config);
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            this.setAwardInfoDefinitionList(def);
        }
    };
    ActivityShareDefined.prototype.setAwardInfoDefinitionList = function (awardDef) {
        if (awardDef["rewardType"]) {
            awardDef.rewardList = new Array();
            for (var i = 0; i < awardDef["rewardType"].length; i++) {
                var reward = new AwardInfoDefinition();
                reward.type = awardDef["rewardType"][i];
                if (awardDef["rewardId"]) {
                    reward.id = awardDef["rewardId"][i];
                }
                if (awardDef["rewardNum"]) {
                    reward.count = awardDef["rewardNum"][i];
                }
                awardDef.rewardList.push(reward);
            }
        }
    };
    ActivityShareDefined.config = "activity_share";
    return ActivityShareDefined;
}(BaseActivitySubDefined));
__reflect(ActivityShareDefined.prototype, "ActivityShareDefined");
/**
 * 分享抽奖活动配置
 */
var ActivityShareDefintion = (function (_super) {
    __extends(ActivityShareDefintion, _super);
    function ActivityShareDefintion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ActivityShareDefintion;
}(BaseActivitySubDefnition));
__reflect(ActivityShareDefintion.prototype, "ActivityShareDefintion");
//# sourceMappingURL=ActivityShareDefined.js.map