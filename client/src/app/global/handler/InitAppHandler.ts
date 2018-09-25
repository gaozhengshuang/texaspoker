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
			// NotifyManager.initialize(); //move todo
			UploadHeadManager.initialize();
		}
		else
		{
			//非第一次登录执行
			//重登录,做了数据缓存的都清除
		}
		//每次登录都执行
		// ShopManager.initialize(); //move todo
		// VipManager.initialize(); //move todo
		// NotifyManager.initByReLogin(); //move todo
		UploadHeadManager.clearAllData();
		// BindAccountManager.clear(); //move todo
		// RankManager.initialize(); //move todo
		// PopupManager.initialize(); //move todo
	}
}