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
 * 引导步骤场景切换
 */
var GuideSceneSwitchStepProcess = (function (_super) {
    __extends(GuideSceneSwitchStepProcess, _super);
    function GuideSceneSwitchStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideSceneSwitchStepProcess.prototype.run = function () {
        _super.prototype.run.call(this);
        if (this.definition) {
            if (SceneManager.sceneType == this.definition.stepParams.type) {
                this.switchSceneCompleteHandler();
            }
            else {
                SceneManager.onSwitchCompleteEvent.addListener(this.switchSceneCompleteHandler, this);
                SceneManager.switcScene(this.definition.stepParams.type, this.definition.stepParams.params);
            }
        }
    };
    GuideSceneSwitchStepProcess.prototype.switchSceneCompleteHandler = function () {
        SceneManager.onSwitchCompleteEvent.removeListener(this.switchSceneCompleteHandler, this);
        if (this.definition.stepParams && this.definition.stepParams.goto == 1) {
            if (this.parent) {
                this.parent.complete();
            }
        }
    };
    GuideSceneSwitchStepProcess.prototype.clear = function () {
        _super.prototype.clear.call(this);
        SceneManager.onSwitchCompleteEvent.removeListener(this.switchSceneCompleteHandler, this);
    };
    return GuideSceneSwitchStepProcess;
}(BaseGuideStepProcess));
__reflect(GuideSceneSwitchStepProcess.prototype, "GuideSceneSwitchStepProcess");
//# sourceMappingURL=GuideSceneSwitchStepProcess.js.map