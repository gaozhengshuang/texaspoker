/**
 * 引导处理
 */
class GuideExecutor
{
	private static _notClearStepList: qin.Dictionary<number, Array<BaseGuideProcess<GuideControllerDefinition>>> = new qin.Dictionary<number, Array<BaseGuideProcess<GuideControllerDefinition>>>();
	public static get notClearStepList(): qin.Dictionary<number, Array<BaseGuideProcess<GuideControllerDefinition>>>
	{
		return GuideExecutor._notClearStepList;
	}
	private static guideProcess: GuideProcess;
	private static _isOnGuide: boolean;
	public static get isOnGuide(): boolean
	{
		return GuideExecutor._isOnGuide;
	}
	/**
	 * 检测引导 仅支持单线性的引导不能同时开启多个 可在当前引导类型结束之后再次尝试调用检测
	 */
	public static checkGuide()
	{
		if (GuideExecutor._isOnGuide)
		{
			return;
		}
		let startType: GuideType = GuideType.NewUser;
		let endType: GuideType = GuideType.NewUser;

		let recordPhase: number = 0;
		let guideInfo: GuideInfo;
		let guideDef: GuideDefinition;
		for (let i: GuideType = startType; i <= endType; i++)
		{
			guideInfo = UserManager.userInfo.getGuideInfo(i);
			if (guideInfo)
			{
				if (guideInfo.Id < GuideDefined.GetInstance().getMaxPhase(i))
				{
					guideDef = GuideDefined.GetInstance().getGuideDefinition(i, guideInfo.Id + 1);
					break;
				}
			}
			else
			{
				guideDef = GuideDefined.GetInstance().getGuideDefinition(i, 1);
				break;
			}
		}
		if (guideDef)
		{
			let triggerDef: GuideTriggerDefinition = GuideTriggerDefined.GetInstance().getTriggerDefinition(guideDef.type);
			GuideExecutor.verifyTriggerType(guideDef, triggerDef);
		}
		else
		{
			GuideExecutor.guideProcess = undefined;
			qin.Console.log("未检测到有合适的引导开启or引导已经完成or引导数据异常!");
		}
	}

	/**
	 * 验证开启类型
	 */
	private static verifyTriggerType(guideDef: GuideDefinition, triggerDef: GuideTriggerDefinition)
	{
		if (triggerDef.triggerType == GuideTriggerType.Login_Hall)
		{
			GuideExecutor.run(guideDef);
		}
		else
		{
			qin.Console.logError("未找到合适引导触发类型！");
		}
	}
	private static tmpChildStepProcess: Array<BaseGuideProcess<GuideControllerDefinition>> = new Array<BaseGuideProcess<GuideControllerDefinition>>();
	/**
	 * 直接执行 子步骤
	 */
	public static runChildStep(def: GuideControllerDefinition)
	{
		let stepProcess: BaseGuideProcess<GuideControllerDefinition> = GuideExecutor.getStepProcess(def, null);
		stepProcess = GuideExecutor.getStepProcess(def, null);
		if (stepProcess)
		{
			stepProcess.run();
			GuideExecutor.tmpChildStepProcess.push(stepProcess);
		}
	}
	/**
	 * 清理单步引导产生的临时运行的子步骤
	 */
	public static clearChildStepProcess()
	{
		for (let stepProcess of GuideExecutor.tmpChildStepProcess)
		{
			let stepDef: GuideStepDefinition = GuideStepDefined.GetInstance().getDefinition(stepProcess.definition.stepId);
			if (stepDef)
			{
				stepProcess.clear();
				GuideExecutor.pushStepProcess(stepDef.type, stepProcess);
			}
		}
		GuideExecutor.tmpChildStepProcess.length = 0;
	}
	private static run(def: number);
	private static run(def: GuideDefinition);
	private static run(def: any)
	{
		if (!def)
		{
			return;
		}
		let guideDef: GuideDefinition;
		if (typeof def == "number")
		{
			guideDef = GuideDefined.GetInstance().getDefinition(def);
		}
		else
		{
			guideDef = def;
		}
		if (!guideDef)
		{
			qin.Console.log("GuideExecutor.run执行引导异常，引导数据为空！");
			return;
		}
		qin.Console.log("引导------------>" + guideDef.des);
		GuideExecutor.clearChildStepProcess();
		if (GuideExecutor.guideProcess)
		{
			GuideExecutor.guideProcess.clear();
		}
		else
		{
			GuideExecutor.guideProcess = new GuideProcess();
		}
		GuideExecutor.guideProcess.init(guideDef, null);
		let steps: Array<GuideControllerDefinition> = guideDef.steps;
		if (steps)
		{
			let stepProcess: BaseGuideProcess<GuideControllerDefinition>;
			let stepDef: GuideStepDefinition;
			for (let i: number = 0; i < steps.length; i++)
			{
				stepProcess = GuideExecutor.getStepProcess(steps[i], GuideExecutor.guideProcess);
				if (stepProcess)
				{
					GuideExecutor.guideProcess.addStep(stepProcess);
				}
			}
			GuideExecutor._isOnGuide = true;
			GuideExecutor.guideProcess.comleteEvent.addListener(GuideExecutor.guideProcessComplete, this);
			GuideExecutor.guideProcess.run();
		}
		else
		{
			qin.Console.log("引导步骤数据为空！引导ID：" + guideDef.id);
			GuideExecutor.guideProcessComplete(GuideExecutor.guideProcess); //没有子步骤执行的话，直接执行结束
		}
	}
	/**
	 * 一步引导完毕
	 */
	public static guideProcessComplete(target: number, next?: number);
	public static guideProcessComplete(target: GuideDefinition, next?: number);
	public static guideProcessComplete(target: BaseGuideProcess<GuideDefinition>, next?: number);
	public static guideProcessComplete(target: any, next?: number)
	{
		let definition: GuideDefinition;
		if (typeof target == "number")
		{
			definition = GuideDefined.GetInstance().getDefinition(target);
		}
		else if (target instanceof GuideDefinition)
		{
			definition = target;
		}
		else if (target instanceof BaseGuideProcess)
		{
			target.comleteEvent.removeListener(GuideExecutor.guideProcessComplete, this);
			definition = target.definition;
		}
		if (definition)
		{
			if (GuideDefined.GetInstance().getDefinition(definition.id).phaseEndFlag == 1) //当前阶段引导执行完毕
			{
				GuideExecutor.trySetGuideStep(definition, next);
			}
			else
			{
				GuideExecutor.doNext(definition, next);
			}
		}
		else
		{
			qin.Console.logError("处理引导完毕逻辑异常！target：" + target);
		}
	}
	private static trySetGuideStep(definition: GuideDefinition, next?: number)
	{
		GuideManager.onSetGuideStepEvent.addListener(GuideExecutor.setGuideRecordComplete, this);
		GuideManager.reqSetGuideStep(definition, next);
	}
	private static doNext(definition: GuideDefinition, next?: number)
	{
		let guideDef: GuideDefinition;
		if (next)
		{
			guideDef = GuideDefined.GetInstance().getDefinition(next);
		}
		else
		{
			guideDef = GuideDefined.GetInstance().getDefinition(definition.next);
		}

		if (guideDef)
		{
			if (definition.delay > 0)
			{
				qin.Tick.AddTimeoutInvoke((data: any) =>
				{
					GuideExecutor.clearNotClearSteps(definition);
					GuideExecutor._isOnGuide = false;
					GuideExecutor.run(data);
				}, definition.delay, this, guideDef);
			}
			else
			{
				GuideExecutor.clearNotClearSteps(definition);
				GuideExecutor._isOnGuide = false;
				GuideExecutor.run(guideDef);
			}
		}
		else
		{
			GuideExecutor._isOnGuide = false;
			qin.Console.logError("同阶段触发下一步引导异常！ID:" + definition.id);
		}
	}
	private static setGuideRecordComplete(data: any)
	{
		GuideManager.onSetGuideStepEvent.removeListener(GuideExecutor.setGuideRecordComplete, this);
		let guideDef: GuideDefinition = GuideDefined.GetInstance().getGuideDefinition(data.type, data.id);
		if (guideDef)
		{
			if (data.next) //指定运行下一步的引导
			{
				if (guideDef.delay > 0)
				{
					qin.Tick.AddTimeoutInvoke((tmp: any) =>
					{
						GuideExecutor.clearNotClearSteps(guideDef);
						GuideExecutor._isOnGuide = false;
						GuideExecutor.run(tmp.next);
					}, guideDef.delay, this, data);
				}
				else
				{
					//尝试检测下阶段的引导开启
					GuideExecutor.clearNotClearSteps(guideDef);
					GuideExecutor._isOnGuide = false;
					GuideExecutor.run(data.next);
				}
			}
			else
			{
				if (guideDef.delay > 0)
				{
					qin.Tick.AddTimeoutInvoke(() =>
					{
						GuideExecutor.clearNotClearSteps(guideDef);
						GuideExecutor._isOnGuide = false;
						GuideExecutor.checkGuide();
					}, guideDef.delay, this);
				}
				else
				{
					//尝试检测下阶段的引导开启
					GuideExecutor.clearNotClearSteps(guideDef);
					GuideExecutor._isOnGuide = false;
					GuideExecutor.checkGuide();
				}
			}
		}
	}
	public static addNotClearStep(id: number, step: BaseGuideProcess<GuideControllerDefinition>)
	{
		let list: Array<BaseGuideProcess<GuideControllerDefinition>> = GuideExecutor._notClearStepList.getValue(id);
		if (!list)
		{
			list = new Array<BaseGuideProcess<GuideControllerDefinition>>();
			GuideExecutor._notClearStepList.add(id, list);
		}
		list.push(step);
	}
	private static clearNotClearSteps(def: GuideDefinition)
	{
		if (def && def.clear)
		{
			let id: number;
			let list: Array<BaseGuideProcess<GuideControllerDefinition>>;
			let step: BaseGuideProcess<GuideControllerDefinition>;
			for (let i: number = 0; i < def.clear.length; i++)
			{
				id = def.clear[i];
				list = GuideExecutor._notClearStepList.getValue(id);
				if (list)
				{
					for (let j: number = 0; j < list.length; j++)
					{
						step = list[j];
						let stepDef: GuideStepDefinition = GuideStepDefined.GetInstance().getDefinition(step.definition.stepId);
						if (stepDef)
						{
							step.clear();
							GuideExecutor.pushStepProcess(stepDef.type, step);
						}
					}
					list.length = 0;
					GuideExecutor._notClearStepList.remove(id);
				}
			}
		}

	}
	private static stepProcessMap: qin.Dictionary<any, Array<BaseGuideProcess<GuideControllerDefinition>>> = new qin.Dictionary<any, Array<BaseGuideProcess<GuideControllerDefinition>>>();
	/**
	 * 获取步骤处理器
	 */
	private static getStepProcess(def: GuideControllerDefinition, par: BaseGuideProcess<GuideDefinition>): BaseGuideProcess<GuideControllerDefinition>
	{
		let stepDef: GuideStepDefinition = GuideStepDefined.GetInstance().getDefinition(def.stepId);
		switch (stepDef.type)
		{
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
	}
	/**
	 * 获取单步实例对象
	 */
	private static getStepProcessInstance(clz: any, def: GuideControllerDefinition, par: BaseGuideProcess<GuideDefinition>): BaseGuideProcess<GuideControllerDefinition>
	{
		let list: Array<BaseGuideProcess<GuideControllerDefinition>>;
		let stepProcess: BaseGuideProcess<GuideControllerDefinition>;
		list = GuideExecutor.stepProcessMap.getValue(clz);
		if (!list)
		{
			list = new Array<BaseGuideProcess<GuideControllerDefinition>>();
			GuideExecutor.stepProcessMap.add(clz, list);
		}
		stepProcess = list.pop();
		if (!stepProcess)
		{
			stepProcess = new clz();
		}
		stepProcess.init(def, par);
		return stepProcess;
	}
	public static pushStepProcess(type: GuideStepType, instance: BaseGuideProcess<GuideControllerDefinition>)
	{
		if (!instance)
		{
			return;
		}
		let clz: any;
		switch (type)
		{
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
		let list: Array<BaseGuideProcess<GuideControllerDefinition>> = GuideExecutor.stepProcessMap.getValue(clz);
		if (!list)
		{
			list = new Array<BaseGuideProcess<GuideControllerDefinition>>();
			GuideExecutor.stepProcessMap.add(clz, list);
		}
		if (list.indexOf(instance) == -1)
		{
			list.push(instance);
		}
	}
}