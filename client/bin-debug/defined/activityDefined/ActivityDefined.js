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
 * 活动列表的定义
 * */
var ActivityDefined = (function (_super) {
    __extends(ActivityDefined, _super);
    function ActivityDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityDefined.GetInstance = function () {
        if (!ActivityDefined._instance) {
            ActivityDefined._instance = new ActivityDefined();
        }
        if (DefinedManager.IsParsed(ActivityDefined.config) == false) {
            ActivityDefined._instance.initialize();
        }
        return ActivityDefined._instance;
    };
    ActivityDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ActivityDefined.config);
        if (this.dataList) {
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                def.triggerParams = qin.StringUtil.toStringArray(def.trigger);
                if (def.startTime) {
                    def.startDt = this.getDate(def, def.startTime);
                }
                else {
                    def.startDt = TimeManager.Utc1970;
                }
                if (def.endTime) {
                    def.endDt = this.getDate(def, def.endTime);
                }
                else {
                    def.endDt = new Date(2099, 0, 1, 0, 0, 0);
                }
            }
        }
    };
    ActivityDefined.prototype.getDate = function (def, timeStr) {
        var dataArr;
        dataArr = qin.StringUtil.toIntArray(timeStr);
        if (dataArr) {
            if (dataArr.length == 6) {
                return new Date(dataArr[0], dataArr[1] - 1, dataArr[2], dataArr[3], dataArr[4], dataArr[5]);
            }
            else {
                qin.Console.log("活动时间格式不对！活动ID：" + def.id);
            }
        }
        return null;
    };
    ActivityDefined.config = "activity_list";
    return ActivityDefined;
}(BaseDefined));
__reflect(ActivityDefined.prototype, "ActivityDefined");
/**
 * 活动定义
 */
var ActivityDefintion = (function () {
    function ActivityDefintion() {
    }
    return ActivityDefintion;
}());
__reflect(ActivityDefintion.prototype, "ActivityDefintion", ["IBaseDefintion"]);
//# sourceMappingURL=ActivityDefined.js.map