/**
 * 版本管理
 */
class VersionManager
{
	/**
	 * 检测完成
	 */
	public static onServerComplete: game.DelegateDispatcher = new game.DelegateDispatcher();

	private static _isMaintain: boolean = false;//是否维护
	private static _clientVersion: string;//安装包版本
	private static _clientVersionArray: Array<number>;
	private static _isServerTest: boolean = DEBUG;
	/**
	 * 是否是连接测试服
	 */
	public static get isServerTest(): boolean
	{
		return VersionManager._isServerTest;
	}
	private static _isSafe: boolean = false;
	/**
	 * 是否开启安全开关（提审的时候需要开启，用来屏蔽部分东西）
	 */
	public static get isSafe(): boolean
	{
		return VersionManager._isServerTest && VersionManager._isSafe;
	}
	/**
	 * 初始化
	 */
	public static Initialize(callback: Function, thisObject: any): void
	{
		if (game.System.isMicro)
		{
			//微端
			VersionManager._isSafe = DEBUG ? false : WebConfig.isSafe;
			VersionManager._clientVersion = WebConfig.clientVersion;
			VersionManager._clientVersionArray = game.StringUtil.toIntArray(VersionManager._clientVersion, game.StringConstants.Dot);
			if (VersionManager._clientVersionArray && VersionManager._clientVersionArray.length > 2)
			{
				let serverVersion: string = WebConfig.serverVersion;
				let serverVersionArray: number[] = game.StringUtil.toIntArray(serverVersion, game.StringConstants.Dot);
				let isNewClient: boolean = VersionUtil.CompareAllForce(VersionManager._clientVersionArray, serverVersionArray);
				VersionManager._isServerTest = DEBUG ? true : isNewClient;
				VersionManager.parsePackageVersion(serverVersion, serverVersionArray, VersionManager._clientVersionArray, function ()
				{
					game.FuncUtil.invoke(callback, thisObject);
				}, function ()
					{
						GameManager.reload();
					});
			}
			else
			{
				AlertManager.showAlertByString('版本号获取错误，请检查初始文件是否正确');
			}
		}
		else
		{
			//web版
			VersionManager._isSafe = false;
			VersionManager._isServerTest = DEBUG ? true : URLOption.getBoolean(URLOption.ServerTest);
			game.FuncUtil.invoke(callback, thisObject);
		}
	}
	private static onLoadVersionComplete(data: any, url: string)
	{
		game.Console.log("version.json的数据：" + JSON.stringify(data));
		if (data)
		{
			VersionManager._isMaintain = game.StringUtil.toBoolean(data.mt);
			//web版、微端
			if (RELEASE && VersionManager._isServerTest == false && VersionManager._isMaintain)
			{
				VersionManager.LoadMaintainTxt();
			}
			else
			{
				VersionManager.onServerComplete.dispatch();
			}
		}
		else
		{
			AlertManager.showAlert2("加载版本文件失败！点击确定重新加载！", VersionManager, VersionManager.loadServerVersion);
		}
	}
	public static loadServerVersion()
	{
		let url: string = ProjectDefined.getVersionUrl(GameSetting.AppId);
		RES.getResByUrl(url, VersionManager.onLoadVersionComplete, this, RES.ResourceItem.TYPE_JSON);
	}
	private static parsePackageVersion(serverVersion: string, serverVersionArray: number[], clientVersionArray: number[], callback: Function, errorCallback: Function, data?: any): void
	{
		if (serverVersionArray && clientVersionArray && serverVersionArray.length > 2 && clientVersionArray.length > 2)
		{
			if (VersionUtil.CompareForce(serverVersionArray, clientVersionArray)) //强制更新版本 | 版本的前两位 | 服务器的版本大于本地版本
			{
				AlertManager.showAlert2("有新版本(" + serverVersion + ")更新，需要更新才能进入游戏，点击确定前往更新!", VersionManager, VersionManager.gotoLoadNewVersion);
			}
			else
			{
				if (VersionUtil.CompareOptimize(serverVersionArray, clientVersionArray))//有优化包
				{
					AlertManager.showConfirm2("有新版本(" + serverVersion + ")更新，是否前往更新？", VersionManager, VersionManager.gotoLoadNewVersion, callback, null, data);
				}
				else
				{
					game.FuncUtil.invoke(callback, VersionManager, data);
				}
			}
		}
		else
		{
			AlertManager.showAlert2("版本文件解析错误！点击确定重新加载！", VersionManager, errorCallback);
		}
	}
	/**
	 * 跳转下载新的版本
	 */
	private static gotoLoadNewVersion()
	{
		let url: string = BundleManager.getUrl();
		if (url)
		{
			ChannelManager.openURL(url);
		}
		else
		{
			AlertManager.showAlert("下载地址空，请到应用商店下载或联系客服处理");
		}
	}
	/**
	 * 验证服务器版本(游戏内容版本)
	 */
	public static VerifyGameServer(gameServerVersion: string): boolean
	{
		let gsv: Array<number> = game.StringUtil.toIntArray(gameServerVersion, game.StringConstants.Dot);
		let codeVersionArray: Array<number> = game.StringUtil.toIntArray(ProjectDefined.version, game.StringConstants.Dot);
		if (codeVersionArray.length > 1)
		{
			if ((codeVersionArray[0] != gsv[0]) || (codeVersionArray[1] < gsv[1]))
			{
				return false;
			}
			return true;
		}
		return false;
	}
	/**
	 * 加载维护文件
	 */
	private static async LoadMaintainTxt()
	{
		let url: string = ProjectDefined.getMaintainUrl(GameSetting.AppId);
		RES.getResByUrl(url, VersionManager.OnMaintainComplete, this, RES.ResourceItem.TYPE_TEXT);
	}
	private static OnMaintainComplete(text: string)
	{
		if (text)
		{
			AlertManager.showAlert2(text, VersionManager, VersionManager.loadServerVersion);
		}
		else
		{
			AlertManager.showAlert2("游戏停机维护中，届时将无法登录游戏，请各位相互转告。具体开服时间可能会根据实际情况通告，敬请谅解。", VersionManager, VersionManager.loadServerVersion);
		}
	}

	/**
	 * 根据安全开关来控制组件的显示
	 */
	public static setComponentVisibleBySafe(...args)
	{
		if (args != null)
		{
			if (VersionManager.isSafe)
			{
				for (let i: number = 0; i < args.length; i++)
				{
					if (args[i] && args[i].parent)
					{
						args[i].parent.removeChild(args[i]);
					}
				}
			}
		}
	}
	/**
	 * 获取版本字符串显示
	 */
	public static getVersionStr(): string
	{
		let vstr: string = "v" + ProjectDefined.version;
		if (game.System.isMicro)
		{
			vstr = vstr + "(" + VersionManager._clientVersion + ")";
		}
		return vstr;
	}
}