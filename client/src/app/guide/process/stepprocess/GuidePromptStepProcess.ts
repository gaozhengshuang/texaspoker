/**
 * 引导指示步骤处理
 */
class GuidePromptStepProcess extends BaseGuideStepProcess
{
	private _component: GuidePromptComponent;
	public run()
	{
		super.run();
		if (!this.stepDef)
		{
			return;
		}
		let panel: BasePanel = UIManager.getPanel(this.stepDef.panelName);
		if (!panel)
		{
			qin.Console.logError("引导添加指示显示异常！未找到显示的面板，面板名：" + this.stepDef.panelName);
			return;
		}
		if (this.stepDef.component)
		{
			let component: egret.DisplayObject = qin.ObjectUtil.getTreeProperty(panel, this.stepDef.component);
			if (!component)
			{
				qin.Console.logError("引导添加指示显示异常！未找到显示的组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
				return;
			}
			this._component = GuidePromptComponent.get();
			this._component.init({ data: this.stepDef, parent: component });
		}
		else
		{
			qin.Console.logError("引导添加指示显示异常！未找到显示的组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
		}
	}
	public complete()
	{
		super.complete();
	}
	public clear()
	{
		super.clear();
		if (this._component)
		{
			this._component.destroy();
			this._component = null;
		}
	}
}