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
 * 引导步定义
 */
var GuideStepDefined = (function (_super) {
    __extends(GuideStepDefined, _super);
    function GuideStepDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideStepDefined.GetInstance = function () {
        if (!GuideStepDefined._instance) {
            GuideStepDefined._instance = new GuideStepDefined();
        }
        if (DefinedManager.IsParsed(GuideStepDefined.config) == false) {
            GuideStepDefined._instance.initialize();
        }
        return GuideStepDefined._instance;
    };
    GuideStepDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(GuideStepDefined.config);
    };
    GuideStepDefined.config = "guideStep";
    return GuideStepDefined;
}(BaseDefined));
__reflect(GuideStepDefined.prototype, "GuideStepDefined");
/**
* 引导单步定义
* */
var GuideStepDefinition = (function () {
    function GuideStepDefinition() {
    }
    return GuideStepDefinition;
}());
__reflect(GuideStepDefinition.prototype, "GuideStepDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=GuideStepDefined.js.map