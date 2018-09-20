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
 * 引导打开面板处理器 面板打开不触发完成事件 需要玩家手动触发
 */
var GuideOpenPanelStepProcess = (function (_super) {
    __extends(GuideOpenPanelStepProcess, _super);
    function GuideOpenPanelStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideOpenPanelStepProcess.prototype.run = function () {
        _super.prototype.run.call(this);
        if (this.stepDef) {
            UIManager.onPanelOpenEvent.addListener(this.onPanelOpenHandler, this);
            UIManager.showPanel(this.definition.stepParams.panelName, this.definition.stepParams.params);
        }
        else {
            qin.Console.log("引导数据未找到");
        }
    };
    GuideOpenPanelStepProcess.prototype.onPanelOpenHandler = function (name) {
        UIManager.onPanelOpenEvent.removeListener(this.onPanelOpenHandler, this);
        if (this.definition && this.definition.stepParams && this.definition.stepParams.panelName == name) {
            if (this.definition.stepParams.params && this.definition.stepParams.params.self > 0 && this.definition.stepParams.params.isAuto == 1) {
                GuideExecutor.guideProcessComplete(this.definition.stepParams.params.self);
            }
        }
    };
    GuideOpenPanelStepProcess.prototype.clear = function () {
        _super.prototype.clear.call(this);
        UIManager.onPanelOpenEvent.removeListener(this.onPanelOpenHandler, this);
    };
    return GuideOpenPanelStepProcess;
}(BaseGuideStepProcess));
__reflect(GuideOpenPanelStepProcess.prototype, "GuideOpenPanelStepProcess");
//# sourceMappingURL=GuideOpenPanelStepProcess.js.map