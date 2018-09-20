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
 *引导问题信息
*/
var GuideQuestionDefined = (function (_super) {
    __extends(GuideQuestionDefined, _super);
    function GuideQuestionDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideQuestionDefined.GetInstance = function () {
        if (!GuideQuestionDefined._instance) {
            GuideQuestionDefined._instance = new GuideQuestionDefined();
        }
        if (DefinedManager.IsParsed(GuideQuestionDefined.guideQuestionConfig) == false) {
            GuideQuestionDefined._instance.initialize();
        }
        return GuideQuestionDefined._instance;
    };
    GuideQuestionDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(GuideQuestionDefined.guideQuestionConfig);
    };
    GuideQuestionDefined.guideQuestionConfig = "guideQuestion";
    return GuideQuestionDefined;
}(BaseDefined));
__reflect(GuideQuestionDefined.prototype, "GuideQuestionDefined");
/**
* 引导问题定义
*/
var GuideQuestionDefinition = (function () {
    function GuideQuestionDefinition() {
    }
    return GuideQuestionDefinition;
}());
__reflect(GuideQuestionDefinition.prototype, "GuideQuestionDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=GuideQuestionDefined.js.map