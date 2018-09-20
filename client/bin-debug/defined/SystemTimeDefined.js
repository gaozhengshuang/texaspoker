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
 * 活动时间定义
*/
var SystemTimeDefined = (function (_super) {
    __extends(SystemTimeDefined, _super);
    function SystemTimeDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SystemTimeDefined.GetInstance = function () {
        if (!SystemTimeDefined._instance) {
            SystemTimeDefined._instance = new SystemTimeDefined();
        }
        if (DefinedManager.IsParsed(SystemTimeDefined.systemTimeConfig) == false) {
            SystemTimeDefined._instance.initialize();
        }
        return SystemTimeDefined._instance;
    };
    SystemTimeDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(SystemTimeDefined.systemTimeConfig);
    };
    /**
     * 根据类型获得子类型列表
     */
    SystemTimeDefined.prototype.getSubListById = function (timeId) {
        var result = new Array();
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.timeId == timeId) {
                result.push(def);
            }
        }
        return result;
    };
    /**
     * 获取系统时间类型
     */
    SystemTimeDefined.prototype.getSystemType = function (def) {
        if (def.start[6] != -1) {
            return SystemTimeType.Week;
        }
        else if (def.start[0] == 0 && def.start[1] == 0 && def.start[2] == 0 && def.end[0] == 0 && def.end[1] == 0 && def.end[2] == 0) {
            return SystemTimeType.EveryDay;
        }
        else {
            return SystemTimeType.Normal;
        }
    };
    SystemTimeDefined.systemTimeConfig = "systemTime";
    return SystemTimeDefined;
}(BaseDefined));
__reflect(SystemTimeDefined.prototype, "SystemTimeDefined");
/**
 * 活动时间定义
*/
var SystemTimeDefinition = (function () {
    function SystemTimeDefinition() {
    }
    return SystemTimeDefinition;
}());
__reflect(SystemTimeDefinition.prototype, "SystemTimeDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=SystemTimeDefined.js.map