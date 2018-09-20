/**
 * 引导点击触发
 */
class GuideClickStepProcess extends BaseGuideStepProcess
{
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
			qin.Console.logError("引导点击触发异常！未找到面板，面板名：" + this.stepDef.panelName);
			return;
		}
		if (this.stepDef.component)
		{
			let component: egret.DisplayObject = qin.ObjectUtil.getTreeProperty(panel, this.stepDef.component);
			if (!component)
			{
				qin.Console.logError("引导点击触发异常！未找到组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
				return;
			}
			component.addEventListener(egret.TouchEvent.TOUCH_TAP, this.componentClickHandler, this);
		}
		else
		{
			qin.Console.logError("引导点击触发异常！未找到组件，面板名：" + this.stepDef.panelName + "组件名：" + this.stepDef.component);
		}
	}
	private componentClickHandler(event: egret.TouchEvent)
	{
		event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.componentClickHandler, this);
		if (this.definition.stepParams.goto == 1)
		{
			if(this.parent)
			{
				this.parent.complete();
			}
		}
		else
		{
			qin.Console.logError("点击子步骤无goto！");
		}
	}
	public clear()
	{
		if (this.stepDef)
		{
			let panel: BasePanel = UIManager.getPanel(this.stepDef.panelName);
			if (this.stepDef.component && panel)
			{
				let component: egret.DisplayObject = qin.ObjectUtil.getTreeProperty(panel, this.stepDef.component);
				if (component)
				{
					component.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.componentClickHandler, this);
				}
			}
		}
		super.clear();
	}
}