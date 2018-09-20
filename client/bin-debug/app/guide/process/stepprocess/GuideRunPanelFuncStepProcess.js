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
 * 执行面板函数
 */
var GuideRunPanelFuncStepProcess = (function (_super) {
    __extends(GuideRunPanelFuncStepProcess, _super);
    function GuideRunPanelFuncStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideRunPanelFuncStepProcess.prototype.run = function () {
        if (this.stepDef) {
            var panel = UIManager.getPanel(this.stepDef.panelName);
            if (!panel) {
                qin.Console.logError("引导执行面板函数触发异常！未找到面板，面板名：" + this.stepDef.panelName);
                return;
            }
            if (this.stepDef.component) {
                var len = this.stepDef.component.length;
                var component = panel;
                for (var i = 0; i < len - 1; i++) {
                    component = component[this.stepDef.component[i]];
                }
                if (!component) {
                    qin.Console.logError("引导执行面板函数触发异常！未找到属性，面板名：" + this.stepDef.panelName + "属性列表：" + this.stepDef.component);
                    return;
                }
                if (component[this.stepDef.component[len - 1]]) {
                    component[this.stepDef.component[len - 1]]();
                    if (this.definition.stepParams && this.definition.stepParams.self > 0) {
                        GuideExecutor.guideProcessComplete(this.definition.stepParams.self);
                    }
                }
                else {
                    qin.Console.logError("引导执行面板函数触发异常！未找到函数，面板名：" + this.stepDef.panelName + "属性列表：" + this.stepDef.component);
                }
            }
            else {
                qin.Console.logError("引导执行面板函数触发异常！未找到属性，面板名：" + this.stepDef.panelName + "属性列表：" + this.stepDef.component);
            }
        }
        else {
            qin.Console.log("引导数据未找到");
        }
    };
    return GuideRunPanelFuncStepProcess;
}(BaseGuideStepProcess));
__reflect(GuideRunPanelFuncStepProcess.prototype, "GuideRunPanelFuncStepProcess");
//# sourceMappingURL=GuideRunPanelFuncStepProcess.js.map