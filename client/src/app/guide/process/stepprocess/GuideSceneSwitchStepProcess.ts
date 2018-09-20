/**
 * 引导步骤场景切换
 */
class GuideSceneSwitchStepProcess extends BaseGuideStepProcess
{
	public run()
	{
		super.run();
		if (this.definition)
		{
			if (SceneManager.sceneType == this.definition.stepParams.type)
			{
				this.switchSceneCompleteHandler();
			}
			else
			{
				SceneManager.onSwitchCompleteEvent.addListener(this.switchSceneCompleteHandler, this);
				SceneManager.switcScene(this.definition.stepParams.type, this.definition.stepParams.params);
			}
		}
	}
	private switchSceneCompleteHandler()
	{
		SceneManager.onSwitchCompleteEvent.removeListener(this.switchSceneCompleteHandler, this);
		if (this.definition.stepParams && this.definition.stepParams.goto == 1)
		{
			if (this.parent)
			{
				this.parent.complete();
			}
		}
	}
	public clear()
	{
		super.clear();
		SceneManager.onSwitchCompleteEvent.removeListener(this.switchSceneCompleteHandler, this);
	}
}