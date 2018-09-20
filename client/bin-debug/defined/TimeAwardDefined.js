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
 * 计时奖励定义
*/
var TimeAwardDefined = (function (_super) {
    __extends(TimeAwardDefined, _super);
    function TimeAwardDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeAwardDefined.GetInstance = function () {
        if (!TimeAwardDefined._instance) {
            TimeAwardDefined._instance = new TimeAwardDefined();
        }
        if (DefinedManager.IsParsed(TimeAwardDefined.timeAwardConfig) == false) {
            TimeAwardDefined._instance.initialize();
        }
        return TimeAwardDefined._instance;
    };
    TimeAwardDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(TimeAwardDefined.timeAwardConfig);
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            def.awardList = new Array();
            for (var i = 0; i < 3; i++) {
                var str = "roomType";
                var index = i + 1;
                def.awardList[i] = def[str + index];
            }
        }
    };
    TimeAwardDefined.timeAwardConfig = "timeAward";
    return TimeAwardDefined;
}(BaseDefined));
__reflect(TimeAwardDefined.prototype, "TimeAwardDefined");
/**
 * 计时奖励定义
 * */
var TimeAwardDefinition = (function () {
    function TimeAwardDefinition() {
    }
    return TimeAwardDefinition;
}());
__reflect(TimeAwardDefinition.prototype, "TimeAwardDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=TimeAwardDefined.js.map