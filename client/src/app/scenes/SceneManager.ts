/**
 * 场景管理
 */
class SceneManager
{
	private static _switchDontClosePanelList: Array<string> = new Array<string>();
	private static _switchPanel: LoadingSwitchPanel;
	private static _isLogout: boolean = false;
	/**
	 * 显示切换面板
	 */
	public static showSwitchPanel(): void
	{
		if (!UIManager.isShowPanelObj(SceneManager._switchPanel))
		{
			UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
		}
		if (!SceneManager._switchPanel)
		{
			SceneManager._switchPanel = UIManager.getPanel(UIModuleName.LoadingSwitchPanel) as LoadingSwitchPanel;
		}
	}
	/**
	 * 关闭切换面板
	 */
	public static closeSwitchPanel(): void
	{
		UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
	}
	public static initialize()
	{
		SceneManager.addSwitchDontClosePanel(UIModuleName.GamblingPanel,
			UIModuleName.HundredWarRoomPanel, UIModuleName.GameHallPanel, UIModuleName.LoginSceneBgPanel);
	}
	/**
	 * 更新切换面板进度条
	 */
	public static updateSwitchProgress(progress: number): void
	{
		// if (SceneManager._switchPanel)
		// {
		// 	SceneManager._switchPanel.updateProgress(progress, "正在加载场景资源.....");
		// }
	}
	/**
	 * 场景缓存列表
	 */
	public static cacheSceneList: game.Map<SceneType, BaseScene>;
	/**
	 * 当前场景
	 */
	private static _currentScene: BaseScene;
	/**
	 * 上一场景
	 */
	private static _lastScene: BaseScene;

	/**
	 * 当前场景类型
	 */
	public static get sceneType(): SceneType 
	{
		if (SceneManager._currentScene)
		{
			return SceneManager._currentScene.sceneInfo.type;
		}
		return SceneType.None;
	}
	/**
	 * 切换场景
	 */
	public static switcScene(type: SceneType, extendData?: any): void
	{
		if (SceneManager._currentScene && SceneManager._currentScene.sceneInfo.type == type)
		{
			return;
		}
		if (!SceneManager._currentScene || (SceneManager._currentScene && SceneManager._currentScene.isResLoaded))
		{
			if (!SceneManager.cacheSceneList)
			{
				SceneManager.cacheSceneList = new game.Map<SceneType, BaseScene>();
			}
			if (SceneManager._currentScene)
			{
				SceneManager._currentScene.LoadCompleteEvent.removeListener(SceneManager.switchComplete, this);
				SceneManager._lastScene = SceneManager._currentScene;
			}
			let scene: BaseScene = SceneManager.cacheSceneList.getValue(type);
			let isFirstCreate: boolean = false;
			if (!scene)
			{
				isFirstCreate = true;
				switch (type)
				{
					case SceneType.Login:
						scene = new LoginScene();
						break;
					case SceneType.Hall:
						scene = new HallScene();
						break;
					case SceneType.Game:
						scene = new GameScene();
						break;
					case SceneType.HundredWar:
						scene = new HundredWarScene();
						break;
					default:
						game.Console.logError("切换场景失败！未知的场景类型：" + type);
						break;
				}
				if (scene)
				{
					SceneManager.cacheSceneList.add(type, scene);
				}
			}
			if (scene)
			{
				SceneManager._currentScene = scene;
				scene.LoadCompleteEvent.addListener(SceneManager.switchComplete, this);
				SceneManager.showSwitchPanel();
				if (!scene.sceneInfo)
				{
					scene.sceneInfo = new SceneInfo(type, extendData);
				}
				else
				{
					scene.sceneInfo.type = type;
					scene.sceneInfo.extendData = extendData;
				}
				if (isFirstCreate)
				{
					game.Tick.AddTimeoutInvoke(SceneManager.delaySwitch, SceneManager.delayNum, this, scene);
				}
				else
				{
					scene.initialize();
				}
			}
		}
		else
		{
			SceneManager._isLogout = (type == SceneType.Login);
		}
	}
	private static _delayNum: number;
	private static get delayNum(): number
	{
		if (SceneManager._delayNum == undefined) //第一次进入场景延迟5帧在执行
		{
			SceneManager._delayNum = Math.ceil(1000 / GameManager.stage.frameRate * 5);
		}
		return SceneManager._delayNum;
	}
	private static delaySwitch(scene: BaseScene)
	{
		scene.initialize();
	}
	/**
	 * 场景切换完毕
	 */
	private static switchComplete(scene: BaseScene)
	{
		if (SceneManager._lastScene)
		{
			SceneManager._lastScene.clear();
		}
		scene.LoadCompleteEvent.removeListener(SceneManager.switchComplete, this);
		SoundManager.playBgMusic();
		if (SceneManager._isLogout)
		{
			SceneManager._isLogout = false;
			GameManager.reload();
		}
		SceneManager.closeSwitchPanel()
		SceneManager.onSwitchCompleteEvent.dispatch();
	}
	/**
	 * 获取场景
	 */
	public static getScene(type: SceneType): BaseScene
	{
		if (SceneManager.cacheSceneList)
		{
			return SceneManager.cacheSceneList.getValue(type);
		}
		return null;
	}
	public static switchClosePanels()
	{
		UIManager.panelDict.foreach(SceneManager.closeChildPanel, this);
	}
	private static closeChildPanel(name: string, panel: BasePanel)
	{
		if (SceneManager._switchDontClosePanelList.indexOf(name) == -1)
		{
			UIManager.closePanel(name);
		}
	}
	public static addSwitchDontClosePanel(...args)
	{
		if (args)
		{
			SceneManager._switchDontClosePanelList = SceneManager._switchDontClosePanelList.concat(args);
		}
		else
		{
			game.Console.log("添加切场景不关闭面板异常！面板信息为空！");
		}
	}
	public static removeSwitchDontClosePanel(...args)
	{
		if (args)
		{
			for (let panel of args)
			{
				game.ArrayUtil.RemoveItem(panel, SceneManager._switchDontClosePanelList);
			}
		}
		else
		{
			game.Console.log("移除切场景不关闭面板异常！面板信息为空！");
		}
	}
	/**
	 * 场景切换完成广播
	*/
	public static onSwitchCompleteEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}

