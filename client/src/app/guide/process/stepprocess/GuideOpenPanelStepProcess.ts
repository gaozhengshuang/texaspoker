/**
 * 引导打开面板处理器 面板打开不触发完成事件 需要玩家手动触发
 */
class GuideOpenPanelStepProcess extends BaseGuideStepProcess
{
	public run()
	{
		super.run();
		if (this.stepDef)
		{
			UIManager.onPanelOpenEvent.addListener(this.onPanelOpenHandler, this);
			UIManager.showPanel(this.definition.stepParams.panelName, this.definition.stepParams.params);
		}
		else
		{
			game.Console.log("引导数据未找到");
		}
	}
	private onPanelOpenHandler(name: string)
	{
		UIManager.onPanelOpenEvent.removeListener(this.onPanelOpenHandler, this);
		if (this.definition && this.definition.stepParams && this.definition.stepParams.panelName == name)
		{
			if (this.definition.stepParams.params && this.definition.stepParams.params.self > 0 && this.definition.stepParams.params.isAuto == 1)
			{
				GuideExecutor.guideProcessComplete(this.definition.stepParams.params.self);
			}
		}
	}
	public clear()
	{
		super.clear();
		UIManager.onPanelOpenEvent.removeListener(this.onPanelOpenHandler, this);
	}
}