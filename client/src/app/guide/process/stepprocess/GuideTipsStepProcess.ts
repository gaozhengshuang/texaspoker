/**
 * 引导tips处理器
 */
class GuideTipsStepProcess extends BaseGuideStepProcess
{
	private _component: GuideTipsComponent;
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
			qin.Console.logError("引导添加tips显示异常！未找到显示的面板，面板名：" + this.stepDef.panelName);
			return;
		}
		if (this.stepDef.component)
		{
			let component: any = qin.ObjectUtil.getTreeProperty(panel, this.stepDef.component);
			if (!component)
			{
				qin.Console.logError("引导添加tips显示异常！未找到显示的组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
				return;
			}
			this._component = GuideTipsComponent.get();
			this._component.init({ parent: component, data: this.stepDef });
			if (this.definition.stepParams && this.definition.stepParams.self > 0)
			{
				GuideExecutor.guideProcessComplete(this.definition.stepParams.self);
			}
		}
		else
		{
			qin.Console.logError("引导添加tips显示异常！未找到显示的组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
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