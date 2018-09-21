/**
 * 游戏大厅
 */
class HallScene extends BaseScene
{
	public constructor()
	{
		super();
		this.resGroupName = [ResGroupName.Common];
	}
	public clear()
	{
		UIManager.closePanel(UIModuleName.GameHallPanel);
		UIManager.closePanel(UIModuleName.PlayingFieldPanel);
		UIManager.closePanel(UIModuleName.ChampionshipPanel);
		UIManager.closePanel(UIModuleName.HundredWarPanel);
	}
	public async initialize()
	{
		super.initialize();
	}
	protected onAllResLoadComplete()
	{
		SceneManager.switchClosePanels();
		if (this.sceneInfo.extendData)
		{
			if (this.sceneInfo.extendData.action == SceneSwitchAction.RepleacePanel)
			{
				UIManager.showPanel(this.sceneInfo.extendData.panel, this.sceneInfo.extendData.params);
			}
			else if (this.sceneInfo.extendData.action == SceneSwitchAction.OpenPanel)
			{
				UIManager.showPanel(UIModuleName.GameHallPanel, this.sceneInfo.extendData);
			}
		}
		else
		{
			UIManager.showPanel(UIModuleName.GameHallPanel);
		}
		this.LoadCompleteEvent.dispatch(this);
	}
}