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
 * 引导触发定义
 */
var GuideTriggerDefined = (function (_super) {
    __extends(GuideTriggerDefined, _super);
    function GuideTriggerDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideTriggerDefined.GetInstance = function () {
        if (!GuideTriggerDefined._instance) {
            GuideTriggerDefined._instance = new GuideTriggerDefined();
        }
        if (DefinedManager.IsParsed(GuideTriggerDefined.config) == false) {
            GuideTriggerDefined._instance.initialize();
        }
        return GuideTriggerDefined._instance;
    };
    GuideTriggerDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(GuideTriggerDefined.config);
    };
    GuideTriggerDefined.prototype.getTriggerDefinition = function (type) {
        var def;
        if (this.dataList) {
            var len = this.dataList.length;
            for (var i = 0; i < len; i++) {
                def = this.dataList[i];
                if (def.guideType == type) {
                    return def;
                }
            }
        }
        qin.Console.logError("获取引导触发数据异常！GuideType" + type);
        return def;
    };
    GuideTriggerDefined.config = "guideTrigger";
    return GuideTriggerDefined;
}(BaseDefined));
__reflect(GuideTriggerDefined.prototype, "GuideTriggerDefined");
/**
* 引导触发定义
* */
var GuideTriggerDefinition = (function () {
    function GuideTriggerDefinition() {
    }
    return GuideTriggerDefinition;
}());
__reflect(GuideTriggerDefinition.prototype, "GuideTriggerDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=GuideTriggerDefined.js.map