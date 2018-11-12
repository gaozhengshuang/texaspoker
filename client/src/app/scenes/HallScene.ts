/**
 * 游戏大厅
 */
class HallScene extends BaseScene
{
	/**
	 * 荷官骨骼资源加载完毕标记
	 */
	private _isDealarDbLoaded: boolean = false;
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
	protected onAllResLoadComplete()
	{
		if (this._isDealarDbLoaded)
		{
			this.final();
		}
		else
		{
			this.tryLoadDealerDb();
		}
	}
	/**
	 * 加载龙骨动画
	 */
	private async tryLoadDealerDb()
	{
		await RES.getResAsync(ResFixedFileName.Dealer_db_texturedata);
		await RES.getResAsync(ResFixedFileName.Dealer_db_ske);
		await RES.getResAsync(ResFixedFileName.Dealer_db_png);

		this._isDealarDbLoaded = true;
		this.final();
	}
	private final()
	{
		this.LoadCompleteEvent.dispatch(this);
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
	}
}