/**
 * 游戏场景
 */
class GameScene extends BaseScene
{
	public constructor()
	{
		super();
		this.resGroupName = [ResGroupName.Gambling, ResGroupName.Common];
	}
	public clear()
	{
		UIManager.closePanel(UIModuleName.GamblingPanel);
	}
	public async initialize()
	{
		super.initialize();
	}
	protected onAllResLoadComplete()
	{
		if (!ChannelManager.hasMicrophone)
		{
			ChannelManager.requestMicrophone();
		}
		if (this._isResLoaded)
		{
			UIManager.addEventListener(UIModuleName.GamblingPanel, UIModuleEvent.COMPLETE, this.panelInitialzeComplete, this);
			UIManager.showPanel(UIModuleName.GamblingPanel);
		}
	}
	private panelInitialzeComplete()
	{
		UIManager.removeEventListener(UIModuleName.GamblingPanel, UIModuleEvent.COMPLETE, this.panelInitialzeComplete, this);
		this.LoadCompleteEvent.dispatch(this);
	}
}
