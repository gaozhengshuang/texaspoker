var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 引导处理
 */
var GuideExecutor = (function () {
    function GuideExecutor() {
    }
    Object.defineProperty(GuideExecutor, "notClearStepList", {
        get: function () {
            return GuideExecutor._notClearStepList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GuideExecutor, "isOnGuide", {
        get: function () {
            return GuideExecutor._isOnGuide;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 检测引导 仅支持单线性的引导不能同时开启多个 可在当前引导类型结束之后再次尝试调用检测
     */
    GuideExecutor.checkGuide = function () {
        if (GuideExecutor._isOnGuide) {
            return;
        }
        var startType = GuideType.NewUser;
        var endType = GuideType.NewUser;
        var recordPhase = 0;
        var guideInfo;
        var guideDef;
        for (var i = startType; i <= endType; i++) {
            guideInfo = UserManager.userInfo.getGuideInfo(i);
            if (guideInfo) {
                if (guideInfo.Id < GuideDefined.GetInstance().getMaxPhase(i)) {
                    guideDef = GuideDefined.GetInstance().getGuideDefinition(i, guideInfo.Id + 1);
                    break;
                }
            }
            else {
                guideDef = GuideDefined.GetInstance().getGuideDefinition(i, 1);
                break;
            }
        }
        if (guideDef) {
            var triggerDef = GuideTriggerDefined.GetInstance().getTriggerDefinition(guideDef.type);
            GuideExecutor.verifyTriggerType(guideDef, triggerDef);
        }
        else {
            GuideExecutor.guideProcess = undefined;
            qin.Console.log("未检测到有合适的引导开启or引导已经完成or引导数据异常!");
        }
    };
    /**
     * 验证开启类型
     */
    GuideExecutor.verifyTriggerType = function (guideDef, triggerDef) {
        if (triggerDef.triggerType == GuideTriggerType.Login_Hall) {
            GuideExecutor.run(guideDef);
        }
        else {
            qin.Console.logError("未找到合适引导触发类型！");
        }
    };
    /**
     * 直接执行 子步骤
     */
    GuideExecutor.runChildStep = function (def) {
        var stepProcess = GuideExecutor.getStepProcess(def, null);
        stepProcess = GuideExecutor.getStepProcess(def, null);
        if (stepProcess) {
            stepProcess.run();
            GuideExecutor.tmpChildStepProcess.push(stepProcess);
        }
    };
    /**
     * 清理单步引导产生的临时运行的子步骤
     */
    GuideExecutor.clearChildStepProcess = function () {
        for (var _i = 0, _a = GuideExecutor.tmpChildStepProcess; _i < _a.length; _i++) {
            var stepProcess = _a[_i];
            var stepDef = GuideStepDefined.GetInstance().getDefinition(stepProcess.definition.stepId);
            if (stepDef) {
                stepProcess.clear();
                GuideExecutor.pushStepProcess(stepDef.type, stepProcess);
            }
        }
        GuideExecutor.tmpChildStepProcess.length = 0;
    };
    GuideExecutor.run = function (def) {
        if (!def) {
            return;
        }
        var guideDef;
        if (typeof def == "number") {
            guideDef = GuideDefined.GetInstance().getDefinition(def);
        }
        else {
            guideDef = def;
        }
        if (!guideDef) {
            qin.Console.log("GuideExecutor.run执行引导异常，引导数据为空！");
            return;
        }
        qin.Console.log("引导------------>" + guideDef.des);
        GuideExecutor.clearChildStepProcess();
        if (GuideExecutor.guideProcess) {
            GuideExecutor.guideProcess.clear();
        }
        else {
            GuideExecutor.guideProcess = new GuideProcess();
        }
        GuideExecutor.guideProcess.init(guideDef, null);
        var steps = guideDef.steps;
        if (steps) {
            var stepProcess = void 0;
            var stepDef = void 0;
            for (var i = 0; i < steps.length; i++) {
                stepProcess = GuideExecutor.getStepProcess(steps[i], GuideExecutor.guideProcess);
                if (stepProcess) {
                    GuideExecutor.guideProcess.addStep(stepProcess);
                }
            }
            GuideExecutor._isOnGuide = true;
            GuideExecutor.guideProcess.comleteEvent.addListener(GuideExecutor.guideProcessComplete, this);
            GuideExecutor.guideProcess.run();
        }
        else {
            qin.Console.log("引导步骤数据为空！引导ID：" + guideDef.id);
            GuideExecutor.guideProcessComplete(GuideExecutor.guideProcess); //没有子步骤执行的话，直接执行结束
        }
    };
    GuideExecutor.guideProcessComplete = function (target, next) {
        var definition;
        if (typeof target == "number") {
            definition = GuideDefined.GetInstance().getDefinition(target);
        }
        else if (target instanceof GuideDefinition) {
            definition = target;
        }
        else if (target instanceof BaseGuideProcess) {
            target.comleteEvent.removeListener(GuideExecutor.guideProcessComplete, this);
            definition = target.definition;
        }
        if (definition) {
            if (GuideDefined.GetInstance().getDefinition(definition.id).phaseEndFlag == 1) {
                GuideExecutor.trySetGuideStep(definition, next);
            }
            else {
                GuideExecutor.doNext(definition, next);
            }
        }
        else {
            qin.Console.logError("处理引导完毕逻辑异常！target：" + target);
        }
    };
    GuideExecutor.trySetGuideStep = function (definition, next) {
        GuideManager.onSetGuideStepEvent.addListener(GuideExecutor.setGuideRecordComplete, this);
        GuideManager.reqSetGuideStep(definition, next);
    };
    GuideExecutor.doNext = function (definition, next) {
        var guideDef;
        if (next) {
            guideDef = GuideDefined.GetInstance().getDefinition(next);
        }
        else {
            guideDef = GuideDefined.GetInstance().getDefinition(definition.next);
        }
        if (guideDef) {
            if (definition.delay > 0) {
                qin.Tick.AddTimeoutInvoke(function (data) {
                    GuideExecutor.clearNotClearSteps(definition);
                    GuideExecutor._isOnGuide = false;
                    GuideExecutor.run(data);
                }, definition.delay, this, guideDef);
            }
            else {
                GuideExecutor.clearNotClearSteps(definition);
                GuideExecutor._isOnGuide = false;
                GuideExecutor.run(guideDef);
            }
        }
        else {
            GuideExecutor._isOnGuide = false;
            qin.Console.logError("同阶段触发下一步引导异常！ID:" + definition.id);
        }
    };
    GuideExecutor.setGuideRecordComplete = function (data) {
        GuideManager.onSetGuideStepEvent.removeListener(GuideExecutor.setGuideRecordComplete, this);
        var guideDef = GuideDefined.GetInstance().getGuideDefinition(data.type, data.id);
        if (guideDef) {
            if (data.next) {
                if (guideDef.delay > 0) {
                    qin.Tick.AddTimeoutInvoke(function (tmp) {
                        GuideExecutor.clearNotClearSteps(guideDef);
                        GuideExecutor._isOnGuide = false;
                        GuideExecutor.run(tmp.next);
                    }, guideDef.delay, this, data);
                }
                else {
                    //尝试检测下阶段的引导开启
                    GuideExecutor.clearNotClearSteps(guideDef);
                    GuideExecutor._isOnGuide = false;
                    GuideExecutor.run(data.next);
                }
            }
            else {
                if (guideDef.delay > 0) {
                    qin.Tick.AddTimeoutInvoke(function () {
                        GuideExecutor.clearNotClearSteps(guideDef);
                        GuideExecutor._isOnGuide = false;
                        GuideExecutor.checkGuide();
                    }, guideDef.delay, this);
                }
                else {
                    //尝试检测下阶段的引导开启
                    GuideExecutor.clearNotClearSteps(guideDef);
                    GuideExecutor._isOnGuide = false;
                    GuideExecutor.checkGuide();
                }
            }
        }
    };
    GuideExecutor.addNotClearStep = function (id, step) {
        var list = GuideExecutor._notClearStepList.getValue(id);
        if (!list) {
            list = new Array();
            GuideExecutor._notClearStepList.add(id, list);
        }
        list.push(step);
    };
    GuideExecutor.clearNotClearSteps = function (def) {
        if (def && def.clear) {
            var id = void 0;
            var list = void 0;
            var step = void 0;
            for (var i = 0; i < def.clear.length; i++) {
                id = def.clear[i];
                list = GuideExecutor._notClearStepList.getValue(id);
                if (list) {
                    for (var j = 0; j < list.length; j++) {
                        step = list[j];
                        var stepDef = GuideStepDefined.GetInstance().getDefinition(step.definition.stepId);
                        if (stepDef) {
                            step.clear();
                            GuideExecutor.pushStepProcess(stepDef.type, step);
                        }
                    }
                    list.length = 0;
                    GuideExecutor._notClearStepList.remove(id);
                }
            }
        }
    };
    /**
     * 获取步骤处理器
     */
    GuideExecutor.getStepProcess = function (def, par) {
        var stepDef = GuideStepDefined.GetInstance().getDefinition(def.stepId);
        switch (stepDef.type) {
            case GuideStepType.CreateRoom:
                return GuideExecutor.getStepProcessInstance(GuideCreateRoomStepProcess, def, par);
            case GuideStepType.FlopCard:
                return GuideExecutor.getStepProcessInstance(GuideFlopCardStepProcess, def, par);
            case GuideStepType.BoardCard:
                return GuideExecutor.getStepProcessInstance(GuideBoardCardStepProcess, def, par);
            case GuideStepType.Action:
                return GuideExecutor.getStepProcessInstance(GuideRoomActionStepProcess, def, par);
            case GuideStepType.Tips:
                return GuideExecutor.getStepProcessInstance(GuideTipsStepProcess, def, par);
            case GuideStepType.OpenPanel:
                return GuideExecutor.getStepProcessInstance(GuideOpenPanelStepProcess, def, par);
            case GuideStepType.GamblingOver:
                return GuideExecutor.getStepProcessInstance(GuideGamblingOverStepProcess, def, par);
            case GuideStepType.Click:
                return GuideExecutor.getStepProcessInstance(GuideClickStepProcess, def, par);
            case GuideStepType.Slide:
                return GuideExecutor.getStepProcessInstance(GuideSlideStepProcess, def, par);
            case GuideStepType.SwitchScene:
                return GuideExecutor.getStepProcessInstance(GuideSceneSwitchStepProcess, def, par);
            case GuideStepType.Prompt:
                return GuideExecutor.getStepProcessInstance(GuidePromptStepProcess, def, par);
            case GuideStepType.HideComponent:
                return GuideExecutor.getStepProcessInstance(GuideHideComponentStepProcess, def, par);
            case GuideStepType.RunPanelFunc:
                return GuideExecutor.getStepProcessInstance(GuideRunPanelFuncStepProcess, def, par);
            default:
                qin.Console.logError("获取引导步骤处理器异常！" + stepDef.type);
                break;
        }
        return null;
    };
    /**
     * 获取单步实例对象
     */
    GuideExecutor.getStepProcessInstance = function (clz, def, par) {
        var list;
        var stepProcess;
        list = GuideExecutor.stepProcessMap.getValue(clz);
        if (!list) {
            list = new Array();
            GuideExecutor.stepProcessMap.add(clz, list);
        }
        stepProcess = list.pop();
        if (!stepProcess) {
            stepProcess = new clz();
        }
        stepProcess.init(def, par);
        return stepProcess;
    };
    GuideExecutor.pushStepProcess = function (type, instance) {
        if (!instance) {
            return;
        }
        var clz;
        switch (type) {
            case GuideStepType.CreateRoom:
                clz = GuideCreateRoomStepProcess;
                break;
            case GuideStepType.FlopCard:
                clz = GuideFlopCardStepProcess;
                break;
            case GuideStepType.BoardCard:
                clz = GuideBoardCardStepProcess;
                break;
            case GuideStepType.Action:
                clz = GuideRoomActionStepProcess;
                break;
            case GuideStepType.Tips:
                clz = GuideTipsStepProcess;
                break;
            case GuideStepType.OpenPanel:
                clz = GuideOpenPanelStepProcess;
                break;
            case GuideStepType.GamblingOver:
                clz = GuideGamblingOverStepProcess;
                break;
            case GuideStepType.Click:
                clz = GuideClickStepProcess;
                break;
            case GuideStepType.Slide:
                clz = GuideSlideStepProcess;
                break;
            case GuideStepType.SwitchScene:
                clz = GuideSceneSwitchStepProcess;
                break;
            case GuideStepType.Prompt:
                clz = GuidePromptStepProcess;
                break;
            case GuideStepType.HideComponent:
                clz = GuideHideComponentStepProcess;
                break;
            case GuideStepType.RunPanelFunc:
                clz = GuideRunPanelFuncStepProcess;
                break;
            default:
                qin.Console.logError("回收引导步骤处理器异常！" + type);
                return;
        }
        var list = GuideExecutor.stepProcessMap.getValue(clz);
        if (!list) {
            list = new Array();
            GuideExecutor.stepProcessMap.add(clz, list);
        }
        if (list.indexOf(instance) == -1) {
            list.push(instance);
        }
    };
    GuideExecutor._notClearStepList = new qin.Dictionary();
    GuideExecutor.tmpChildStepProcess = new Array();
    GuideExecutor.stepProcessMap = new qin.Dictionary();
    return GuideExecutor;
}());
__reflect(GuideExecutor.prototype, "GuideExecutor");
//# sourceMappingURL=GuideExecutor.js.map