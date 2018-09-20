/**
 * 进入游戏前初始化应用，登录之后
 */
class InitAppHandler
{
	private _isAppComplete: boolean = false;
	public get isAppComplete(): boolean
	{
		return this._isAppComplete;
	}
	public Invoke()
	{
		if (this._isAppComplete == false)
		{
			//第一次登录初始化一次
			this._isAppComplete = true;
			NotifyManager.initialize();
			UploadHeadManager.initialize();
			SceneManager.initialize();
		}
		else
		{
			//非第一次登录执行
			//重登录,做了数据缓存的都清除
		}
		//每次登录都执行
		ShopManager.initialize();
		VipManager.initialize();
		NotifyManager.initByReLogin();
		UploadHeadManager.clearAllData();
		BindAccountManager.clear();
		RankManager.initialize();
		PopupManager.initialize();
	}
}