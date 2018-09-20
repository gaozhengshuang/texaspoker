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
 * 引导单步处理
 */
var GuideProcess = (function (_super) {
    __extends(GuideProcess, _super);
    function GuideProcess() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._step = 0;
        _this.steps = new Array();
        return _this;
    }
    GuideProcess.prototype.run = function () {
        var step;
        this._step = 0;
        qin.Console.log("引导步骤ID：" + this.definition.id);
        var i = 0;
        var len = this.steps.length; //一定要这样处理，有个想不到的问题
        for (var i_1 = 0; i_1 < len; i_1++) {
            step = this.steps[i_1];
            step.comleteEvent.addListener(this.stepComplete, this);
            step.run();
        }
    };
    GuideProcess.prototype.addStep = function (step) {
        if (step) {
            this.steps.push(step);
        }
    };
    GuideProcess.prototype.removeStep = function (step) {
        qin.ArrayUtil.RemoveItem(step, this.steps);
    };
    GuideProcess.prototype.stepComplete = function (target) {
        target.comleteEvent.removeListener(this.stepComplete, this);
        if (this._step == undefined) {
            this._step = 0;
        }
        this._step++;
        if (this._step == this.steps.length) {
            this.complete();
        }
    };
    GuideProcess.prototype.complete = function () {
        _super.prototype.complete.call(this);
    };
    GuideProcess.prototype.clear = function () {
        this.comleteEvent.clear();
        this.parent = undefined;
        var step;
        for (var i = 0; i < this.steps.length; i++) {
            step = this.steps[i];
            step.comleteEvent.removeListener(this.stepComplete, this);
            var stepDef = GuideStepDefined.GetInstance().getDefinition(step.definition.stepId);
            if (stepDef) {
                if (stepDef.isNotClear == 1) {
                    GuideExecutor.addNotClearStep(this.definition.id, step);
                }
                else {
                    step.clear();
                    GuideExecutor.pushStepProcess(stepDef.type, step);
                }
            }
        }
        this._step = 0;
        this.steps.length = 0;
    };
    return GuideProcess;
}(BaseGuideProcess));
__reflect(GuideProcess.prototype, "GuideProcess");
//# sourceMappingURL=GuideProcess.js.map