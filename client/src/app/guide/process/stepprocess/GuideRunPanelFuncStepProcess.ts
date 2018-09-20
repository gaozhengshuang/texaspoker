/**
 * 执行面板函数
 */
class GuideRunPanelFuncStepProcess extends BaseGuideStepProcess
{
	public run()
	{
		if (this.stepDef)
		{
			let panel: BasePanel = UIManager.getPanel(this.stepDef.panelName);
			if (!panel)
			{
				game.Console.logError("引导执行面板函数触发异常！未找到面板，面板名：" + this.stepDef.panelName);
				return;
			}
			if (this.stepDef.component)
			{
				let len: number = this.stepDef.component.length;
				let component: any = panel;
				for (let i: number = 0; i < len - 1; i++)
				{
					component = component[this.stepDef.component[i]];
				}
				if (!component)
				{
					game.Console.logError("引导执行面板函数触发异常！未找到属性，面板名：" + this.stepDef.panelName + "属性列表：" + this.stepDef.component);
					return;
				}
				if (component[this.stepDef.component[len - 1]])
				{
					component[this.stepDef.component[len - 1]]();
					if (this.definition.stepParams && this.definition.stepParams.self > 0)
					{
						GuideExecutor.guideProcessComplete(this.definition.stepParams.self);
					}
				}
				else
				{
					game.Console.logError("引导执行面板函数触发异常！未找到函数，面板名：" + this.stepDef.panelName + "属性列表：" + this.stepDef.component);
				}
			}
			else
			{
				game.Console.logError("引导执行面板函数触发异常！未找到属性，面板名：" + this.stepDef.panelName + "属性列表：" + this.stepDef.component);
			}
		}
		else
		{
			game.Console.log("引导数据未找到");
		}
	}
}