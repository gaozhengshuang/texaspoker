
/// <summary>
/// 绑定帐号系统处理
/// </summary>
class BindAccountManager
{
	private static _bindedList: Array<BindAccountInfo> = new Array<BindAccountInfo>();
	/**
	 * 绑定的渠道标识列表
	 */
	public static get bindedList(): Array<BindAccountInfo>
	{
		return BindAccountManager._bindedList;
	}
	public static clear()
	{
		if (BindAccountManager._bindedList)
		{
			BindAccountManager._bindedList.length = 0;
		}
	}
	/**
	 * 获取绑定的渠道列表
	 */
	public static reqGetList()
	{
		let callBack: Function = function (result: qin.SpRpcResult)
		{
			BindAccountManager._bindedList.length = 0;
			if (result.data && result.data.Array)
			{
				BindAccountManager._bindedList = result.data.Array;
			}
			BindAccountManager.bindListEvent.dispatch();
		};
		SocketManager.call(Command.Bind_GetList_3705, null, callBack, null, this);
	}
	public static reqBind(token: string, logintype: string)
	{
		let channel: string = ChannelUtil.GetLoginChannel(ChannelManager.channelType, logintype);
		let callBack: Function = function (result: qin.SpRpcResult)
		{
			let info: BindAccountInfo = new BindAccountInfo();
			info.channel = channel;
			info.time = TimeManager.GetServerUtcTimestamp();
			BindAccountManager._bindedList.push(info);

			switch (logintype)
			{
				case ChannelLoginType.Qin:
					AlertManager.showAlert("您的手机账号绑定成功，请牢记您的账号和登录密码，如有遗忘，可通过“忘记密码”找回。");
					break;
				case ChannelLoginType.Weixin:
					AlertManager.showAlert("绑定微信成功，可用绑定的微信登录！");
					break;
			}
			BindAccountManager.bindSuccessEvent.dispatch(logintype);
		};
		SocketManager.callAsync(Command.Bind_Account_3597, { "Token": token, "Channel": channel }, callBack, null, this);
	}
	/**
	 * 获取账号是否绑定某一渠道
	 */
	public static getIsBinding(loginType: string): boolean
	{
		let channel: string = ChannelUtil.GetLoginChannel(ChannelManager.channelType, loginType);
		for (let info of BindAccountManager._bindedList)
		{
			if (info.channel == channel)
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 绑定成功事件
	 */
	public static bindSuccessEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 获取绑定的渠道列表事件
	 */
	public static bindListEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	//--------------沁游内置账号绑定-------------
	public static startBindQin(prevPanelName:string)
	{
		AccountManager.Initialize(GameSetting.AppId, ChannelManager.channelType, ChannelManager.deviceId, ProjectDefined.GetInstance().getValue(ProjectDefined.usePhone));
		BindAccountManager.RemoveQinEvents();
		AccountManager.OnLoginCancel.addListener(BindAccountManager.OnQinLoginCancel, this);
		AccountManager.OnLoginSuccess.addListener(BindAccountManager.OnQinLoginSuccess, this);
		UIManager.showPanel(UIModuleName.BindPhoneAccountPanel, { prevPanelName: prevPanelName });
	}
	private static RemoveQinEvents()
	{
		AccountManager.OnLoginCancel.removeListener(BindAccountManager.OnQinLoginCancel, this);
		AccountManager.OnLoginSuccess.removeListener(BindAccountManager.OnQinLoginSuccess, this);
	}
	private static OnQinLoginSuccess(data: any)
	{
		BindAccountManager.RemoveQinEvents();

		BindAccountManager.reqBind(data.token, ChannelLoginType.Qin);
	}
	private static OnQinLoginCancel()
	{
		BindAccountManager.RemoveQinEvents();
	}
	public static IsHaveChannelQin(): boolean
	{
		let channelList: Array<string> = ChannelLoginType.GetChannelLoginList(OperatePlatform.getCurrent(), ChannelManager.channelType, VersionManager.isServerTest, VersionManager.isSafe);
		if (channelList == null || channelList.length <= 0)
		{
			return false;
		}
		else if (channelList.indexOf(ChannelLoginType.Qin) != -1)
		{
			return true;
		}
		return false;
	}

	//--------------------weix绑定----------------------------
	/**
 	* 尝试绑定微信
	*/
	public static tryBindWx()
	{
		if (qin.System.isMicro)
		{
			if (ChannelManager.hasWeixin == false)
			{
				AlertManager.showAlert("您未安装微信，绑定失败。");
			}
			else
			{
				ChannelManager.OnTokenLoginSucceed.addListener(BindAccountManager.OnTokenLoginSucceed, this);
				ChannelManager.OnLoginFailed.addListener(BindAccountManager.onLoginFaildHandler, this);
				ChannelManager.login(ChannelLoginType.Weixin);
			}
		}
		else
		{
			let token: string = WebConfig.wxRefreshToken;
			if (token)
			{
				token = WebConfig.wxAuthorizeType + '###2###' + token;
				BindAccountManager.reqBind(token, ChannelLoginType.Weixin);
			}
			else
			{
				AlertManager.showAlert("token不能为空，绑定失败!");
			}
		}
	}
	/**
	 * 微信登录回来
	 */
	private static OnTokenLoginSucceed(token: string)
	{
		ChannelManager.OnTokenLoginSucceed.removeListener(BindAccountManager.OnTokenLoginSucceed, this);
		ChannelManager.OnLoginFailed.removeListener(BindAccountManager.onLoginFaildHandler, this);
		if (token)
		{
			BindAccountManager.reqBind(token, ChannelLoginType.Weixin);
		}
		else
		{
			AlertManager.showAlert("token不能为空，绑定失败!");
		}
	}
	private static onLoginFaildHandler()
	{
		ChannelManager.OnTokenLoginSucceed.removeListener(BindAccountManager.OnTokenLoginSucceed, this);
		ChannelManager.OnLoginFailed.removeListener(BindAccountManager.onLoginFaildHandler, this);
		AlertManager.showAlert("绑定失败！");
	}
}