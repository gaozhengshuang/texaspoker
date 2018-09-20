/**
 * 隐藏组件
 */
class GuideHideComponentStepProcess extends BaseGuideStepProcess
{
	public run()
	{
		super.run();
		if (this.stepDef)
		{
			let panel: BasePanel = UIManager.getPanel(this.stepDef.panelName);
			if (!panel)
			{
				qin.Console.logError("引导隐藏组件触发异常！未找到面板，面板名：" + this.stepDef.panelName);
				return;
			}
			if (this.stepDef.component)
			{
				let component: egret.DisplayObject = qin.ObjectUtil.getTreeProperty(panel, this.stepDef.component);
				if (!component)
				{
					qin.Console.logError("引导隐藏组件触发异常！未找到组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
					return;
				}
				component.visible = false;
			}
			else
			{
				qin.Console.logError("引导隐藏组件触发异常！未找到组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
			}
		}
		else
		{
			qin.Console.log("引导数据未找到");
		}
	}
}