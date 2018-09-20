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
 * 引导tips处理器
 */
var GuideTipsStepProcess = (function (_super) {
    __extends(GuideTipsStepProcess, _super);
    function GuideTipsStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideTipsStepProcess.prototype.run = function () {
        _super.prototype.run.call(this);
        if (!this.stepDef) {
            return;
        }
        var panel = UIManager.getPanel(this.stepDef.panelName);
        if (!panel) {
            qin.Console.logError("引导添加tips显示异常！未找到显示的面板，面板名：" + this.stepDef.panelName);
            return;
        }
        if (this.stepDef.component) {
            var component = qin.ObjectUtil.getTreeProperty(panel, this.stepDef.component);
            if (!component) {
                qin.Console.logError("引导添加tips显示异常！未找到显示的组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
                return;
            }
            this._component = GuideTipsComponent.get();
            this._component.init({ parent: component, data: this.stepDef });
            if (this.definition.stepParams && this.definition.stepParams.self > 0) {
                GuideExecutor.guideProcessComplete(this.definition.stepParams.self);
            }
        }
        else {
            qin.Console.logError("引导添加tips显示异常！未找到显示的组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
        }
    };
    GuideTipsStepProcess.prototype.complete = function () {
        _super.prototype.complete.call(this);
    };
    GuideTipsStepProcess.prototype.clear = function () {
        _super.prototype.clear.call(this);
        if (this._component) {
            this._component.destroy();
            this._component = null;
        }
    };
    return GuideTipsStepProcess;
}(BaseGuideStepProcess));
__reflect(GuideTipsStepProcess.prototype, "GuideTipsStepProcess");
//# sourceMappingURL=GuideTipsStepProcess.js.map