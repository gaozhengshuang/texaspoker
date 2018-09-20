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
 * 引导指示步骤处理
 */
var GuidePromptStepProcess = (function (_super) {
    __extends(GuidePromptStepProcess, _super);
    function GuidePromptStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuidePromptStepProcess.prototype.run = function () {
        _super.prototype.run.call(this);
        if (!this.stepDef) {
            return;
        }
        var panel = UIManager.getPanel(this.stepDef.panelName);
        if (!panel) {
            qin.Console.logError("引导添加指示显示异常！未找到显示的面板，面板名：" + this.stepDef.panelName);
            return;
        }
        if (this.stepDef.component) {
            var component = qin.ObjectUtil.getTreeProperty(panel, this.stepDef.component);
            if (!component) {
                qin.Console.logError("引导添加指示显示异常！未找到显示的组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
                return;
            }
            this._component = GuidePromptComponent.get();
            this._component.init({ data: this.stepDef, parent: component });
        }
        else {
            qin.Console.logError("引导添加指示显示异常！未找到显示的组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
        }
    };
    GuidePromptStepProcess.prototype.complete = function () {
        _super.prototype.complete.call(this);
    };
    GuidePromptStepProcess.prototype.clear = function () {
        _super.prototype.clear.call(this);
        if (this._component) {
            this._component.destroy();
            this._component = null;
        }
    };
    return GuidePromptStepProcess;
}(BaseGuideStepProcess));
__reflect(GuidePromptStepProcess.prototype, "GuidePromptStepProcess");
//# sourceMappingURL=GuidePromptStepProcess.js.map