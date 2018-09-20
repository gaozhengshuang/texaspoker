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
 * 引导点击触发
 */
var GuideClickStepProcess = (function (_super) {
    __extends(GuideClickStepProcess, _super);
    function GuideClickStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideClickStepProcess.prototype.run = function () {
        _super.prototype.run.call(this);
        if (!this.stepDef) {
            return;
        }
        var panel = UIManager.getPanel(this.stepDef.panelName);
        if (!panel) {
            qin.Console.logError("引导点击触发异常！未找到面板，面板名：" + this.stepDef.panelName);
            return;
        }
        if (this.stepDef.component) {
            var component = qin.ObjectUtil.getTreeProperty(panel, this.stepDef.component);
            if (!component) {
                qin.Console.logError("引导点击触发异常！未找到组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
                return;
            }
            component.addEventListener(egret.TouchEvent.TOUCH_TAP, this.componentClickHandler, this);
        }
        else {
            qin.Console.logError("引导点击触发异常！未找到组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
        }
    };
    GuideClickStepProcess.prototype.componentClickHandler = function (event) {
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.componentClickHandler, this);
        if (this.definition.stepParams.goto == 1) {
            if (this.parent) {
                this.parent.complete();
            }
        }
        else {
            qin.Console.logError("点击子步骤无goto！");
        }
    };
    GuideClickStepProcess.prototype.clear = function () {
        if (this.stepDef) {
            var panel = UIManager.getPanel(this.stepDef.panelName);
            if (this.stepDef.component && panel) {
                var component = qin.ObjectUtil.getTreeProperty(panel, this.stepDef.component);
                if (component) {
                    component.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.componentClickHandler, this);
                }
            }
        }
        _super.prototype.clear.call(this);
    };
    return GuideClickStepProcess;
}(BaseGuideStepProcess));
__reflect(GuideClickStepProcess.prototype, "GuideClickStepProcess");
//# sourceMappingURL=GuideClickStepProcess.js.map