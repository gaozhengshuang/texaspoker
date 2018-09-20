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
 * 隐藏组件
 */
var GuideHideComponentStepProcess = (function (_super) {
    __extends(GuideHideComponentStepProcess, _super);
    function GuideHideComponentStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideHideComponentStepProcess.prototype.run = function () {
        _super.prototype.run.call(this);
        if (this.stepDef) {
            var panel = UIManager.getPanel(this.stepDef.panelName);
            if (!panel) {
                qin.Console.logError("引导隐藏组件触发异常！未找到面板，面板名：" + this.stepDef.panelName);
                return;
            }
            if (this.stepDef.component) {
                var component = qin.ObjectUtil.getTreeProperty(panel, this.stepDef.component);
                if (!component) {
                    qin.Console.logError("引导隐藏组件触发异常！未找到组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
                    return;
                }
                component.visible = false;
            }
            else {
                qin.Console.logError("引导隐藏组件触发异常！未找到组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
            }
        }
        else {
            qin.Console.log("引导数据未找到");
        }
    };
    return GuideHideComponentStepProcess;
}(BaseGuideStepProcess));
__reflect(GuideHideComponentStepProcess.prototype, "GuideHideComponentStepProcess");
//# sourceMappingURL=GuideHideComponentStepProcess.js.map