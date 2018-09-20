/**
 * 弹窗管理
 */
class PopupManager
{
	/**
	 * 文本公告 
	 */
	public static readonly textNotify: TextNotifyHandler = new TextNotifyHandler();

	private static _popupList: Array<PopupInfo>;

	public static initialize()
	{
		if (!PopupManager._popupList)
		{
			PopupManager._popupList = new Array<PopupInfo>();

			let info: PopupInfo = new PopupInfo();
			info.type = PopupType.CreateRole;
			//大厅面板打开 创建角色面板弹出
			info.triggerType.push(PopupTriggerType.OpenPanel);
			info.triggerParams.push(UIModuleName.GameHallPanel);
			PopupManager._popupList.push(info);

			info = new PopupInfo();
			info.type = PopupType.Guide;
			//大厅面板打开||关闭创建角色面板 触发引导
			info.triggerType.push(PopupTriggerType.OpenPanel, PopupTriggerType.ClosePanel);
			info.triggerParams.push(UIModuleName.GameHallPanel, UIModuleName.CreateRolePanel);
			PopupManager._popupList.push(info);

			info = new PopupInfo();
			info.type = PopupType.TextNotify;
			info.isDelay = true;
			//大厅面板打开||引导完成||关闭创建角色面板 触发文字公告
			info.triggerType.push(PopupTriggerType.OpenPanel, PopupTriggerType.ClosePanel, PopupTriggerType.GuideComplete);
			info.triggerParams.push(UIModuleName.GameHallPanel, UIModuleName.CreateRolePanel, 1);
			PopupManager._popupList.push(info);

			info = new PopupInfo();
			info.type = PopupType.ImageNotify;
			info.isDelay = true;
			//大厅面板打开||文字公告面板关闭||引导完成 触发图片公告
			info.triggerType.push(PopupTriggerType.OpenPanel, PopupTriggerType.ClosePanel, PopupTriggerType.GuideComplete);
			info.triggerParams.push(UIModuleName.GameHallPanel, UIModuleName.TextInfoPanel, 1);
			PopupManager._popupList.push(info);

			info = new PopupInfo();
			info.type = PopupType.SignIn;
			info.isDelay = true;
			//打开大厅面板||关闭图片公告 ||关闭文字公告面板||引导完成
			info.triggerType.push(PopupTriggerType.OpenPanel, PopupTriggerType.ClosePanel, PopupTriggerType.ClosePanel, PopupTriggerType.GuideComplete);
			info.triggerParams.push(UIModuleName.GameHallPanel, UIModuleName.ImgNotifyPanel, UIModuleName.TextInfoPanel, 1);
			PopupManager._popupList.push(info);

			info = new PopupInfo();
			info.type = PopupType.FirstPay;
			info.isDelay = true;
			//大厅面板打开||图片公告关闭||文字公告面板关闭||签到面板关闭||引导完成
			info.triggerType.push(PopupTriggerType.OpenPanel, PopupTriggerType.ClosePanel, PopupTriggerType.ClosePanel, PopupTriggerType.ClosePanel, PopupTriggerType.GuideComplete);
			info.triggerParams.push(UIModuleName.GameHallPanel, UIModuleName.ImgNotifyPanel, UIModuleName.TextInfoPanel, UIModuleName.SignInPanel, 1);
			PopupManager._popupList.push(info);
		}

		PopupManager._popupList.sort((a: PopupInfo, b: PopupInfo) =>
		{
			if (a.type > b.type)
			{
				return 1;
			}
			if (a.type < b.type)
			{
				return -1;
			}
			return 0;
		});
		UIManager.onPanelOpenEvent.addListener(PopupManager.onPanelOpenHandler, this);
		UIManager.onPanelCloseEvent.addListener(PopupManager.onPanelCloseHandler, this);
		GuideManager.onSetGuideStepEvent.addListener(PopupManager.onGuideStepHandler, this);
	}
	/**
	 * 检测
	 */
	private static check(type: PopupTriggerType, params: any)
	{
		let info: PopupInfo;
		for (let i: number = 0; i < PopupManager._popupList.length; i++)
		{
			info = PopupManager._popupList[i];
			if (!info.isPopuped)
			{
				let paramsIndex: number = info.triggerParams.indexOf(params);
				if (paramsIndex != -1 && info.triggerType[paramsIndex] == type)
				{
					info.isPopuped = true;
					if (info.isDelay)
					{
						game.Tick.AddTimeoutInvoke(() =>
						{
							PopupManager.popup(info, type, params);
						}, 50, this);
					}
					else
					{
						PopupManager.popup(info, type, params);
					}
					if (i == PopupManager._popupList.length - 1)
					{
						PopupManager.destory();
					}
					break;
				}
			}
		}
	}
	/**
	 * 弹出窗口
	 */
	private static popup(info: PopupInfo, type: PopupTriggerType, params: any)
	{
		switch (info.type)
		{
			case PopupType.CreateRole:
				if (!UserManager.userInfo.name || UserManager.userInfo.name.length <= 0)
				{
					UIManager.showPanel(UIModuleName.CreateRolePanel);
				}
				else
				{
					PopupManager.check(type, params);
				}
				break;
			case PopupType.Guide:
				GuideExecutor.checkGuide();
				if (!GuideExecutor.isOnGuide)
				{
					PopupManager.check(type, params);
				}
				break;
			case PopupType.TextNotify:
				PopupManager.textNotify.loginTextNotify(() =>
				{
					PopupManager.check(type, params);
				}, this);
				break;
			case PopupType.ImageNotify:
				if (UserManager.isFirstLoginToday)
				{
					let urlList: Array<string> = ActivityManager.getShowNoticeList();
					if (urlList.length > 0)
					{
						JumpUtil.JumpToNoticePanel(urlList);
					}
					else
					{
						PopupManager.check(type, params);
					}
				}
				else
				{
					PopupManager.check(type, params);
				}
				break;
			case PopupType.SignIn:
				if (!ActivityManager.signInHandler.isSignToday())
				{
					JumpUtil.JumpToSignIn();
				}
				else
				{
					PopupManager.check(type, params);
				}
				break;
			case PopupType.FirstPay:
				if (ActivityManager.payPrizeHandler.isShowFirstPay() && UserManager.isFirstLoginToday)
				{
					JumpUtil.JumpToFirstPayPanel();
				}
				else
				{
					PopupManager.check(type, params);
				}
				break;
		}

	}
	/**
	 * 面板打开
	 */
	private static onPanelOpenHandler(name: string)
	{
		if (PopupManager._popupList && !GuideExecutor.isOnGuide)
		{
			for (let info of PopupManager._popupList)
			{
				let paramsIndex: number = info.triggerParams.indexOf(name);
				if (paramsIndex != -1 && info.triggerType[paramsIndex] == PopupTriggerType.OpenPanel)
				{
					PopupManager.check(PopupTriggerType.OpenPanel, name);
					break;
				}
			}
		}
	}
	/**
	 * 面板关闭
	 */
	private static onPanelCloseHandler(name: string)
	{
		if (PopupManager._popupList && !GuideExecutor.isOnGuide)
		{
			for (let info of PopupManager._popupList)
			{
				let paramsIndex: number = info.triggerParams.indexOf(name);
				if (paramsIndex != -1 && info.triggerType[paramsIndex] == PopupTriggerType.ClosePanel)
				{
					PopupManager.check(PopupTriggerType.ClosePanel, name);
					break;
				}
			}
		}
	}
	/**
	 * 新手引导完成
	 */
	private static onGuideStepHandler(data: any)
	{
		let phase: number = GuideDefined.GetInstance().getMaxPhase(data.type);
		if (phase == data.id)
		{
			PopupManager.check(PopupTriggerType.GuideComplete, 1);
		}
	}
	private static destory()
	{
		UIManager.onPanelCloseEvent.removeListener(PopupManager.onPanelCloseHandler, this);
		UIManager.onPanelOpenEvent.removeListener(PopupManager.onPanelOpenHandler, this);
		GuideManager.onSetGuideStepEvent.removeListener(PopupManager.onGuideStepHandler, this);
	}
	public static reset()
	{
		if (PopupManager._popupList)
		{
			for (let info of PopupManager._popupList)
			{
				info.isPopuped = false;
			}
		}
	}
}