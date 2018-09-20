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
 * 引导定义
 */
var GuideDefined = (function (_super) {
    __extends(GuideDefined, _super);
    function GuideDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideDefined.GetInstance = function () {
        if (!GuideDefined._instance) {
            GuideDefined._instance = new GuideDefined();
        }
        if (DefinedManager.IsParsed(GuideDefined.config) == false) {
            GuideDefined._instance.initialize();
        }
        return GuideDefined._instance;
    };
    GuideDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(GuideDefined.config);
    };
    /**
     * 获取引导配置数据
     */
    GuideDefined.prototype.getGuideDefinition = function (type, phase) {
        var def;
        if (this.dataList) {
            var len = this.dataList.length;
            for (var i = 0; i < len; i++) {
                def = this.dataList[i];
                if (def.type == type && def.phase == phase) {
                    return def;
                }
            }
        }
        qin.Console.log("未找到引导配置数据---->type:" + type + "phase:" + phase);
        return def;
    };
    /**
     * 获取引导类型的最大引导阶段
     */
    GuideDefined.prototype.getMaxPhase = function (type) {
        if (this.dataList) {
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.type == type && def.typeEndFlag == 1) {
                    return def.phase;
                }
            }
        }
        return 0;
    };
    GuideDefined.config = "guide";
    return GuideDefined;
}(BaseDefined));
__reflect(GuideDefined.prototype, "GuideDefined");
/**
 * 引导
 */
var GuideDefinition = (function () {
    function GuideDefinition() {
    }
    return GuideDefinition;
}());
__reflect(GuideDefinition.prototype, "GuideDefinition", ["IBaseDefintion"]);
/**
 * 引导控制
 */
var GuideControllerDefinition = (function () {
    function GuideControllerDefinition() {
    }
    return GuideControllerDefinition;
}());
__reflect(GuideControllerDefinition.prototype, "GuideControllerDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=GuideDefined.js.map