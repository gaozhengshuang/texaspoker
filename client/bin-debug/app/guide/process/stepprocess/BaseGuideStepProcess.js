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
 * 子步骤处理器基类
 */
var BaseGuideStepProcess = (function (_super) {
    __extends(BaseGuideStepProcess, _super);
    function BaseGuideStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseGuideStepProcess.prototype.init = function (definition, par) {
        _super.prototype.init.call(this, definition, par);
        if (definition) {
            this.stepDef = GuideStepDefined.GetInstance().getDefinition(definition.stepId);
            if (!this.stepDef) {
                qin.Console.logError("未找到子步骤数据：stepId" + definition.stepId + "params" + definition.stepParams);
            }
        }
    };
    BaseGuideStepProcess.prototype.run = function () {
    };
    BaseGuideStepProcess.prototype.clear = function () {
        this.comleteEvent.clear();
        this.parent = undefined;
        this.definition = undefined;
        this.stepDef = undefined;
    };
    return BaseGuideStepProcess;
}(BaseGuideProcess));
__reflect(BaseGuideStepProcess.prototype, "BaseGuideStepProcess");
//# sourceMappingURL=BaseGuideStepProcess.js.map