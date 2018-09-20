/**
 * 渠道管理/原生扩展管理
 */
class ChannelManager 
{
	//------------------------------------------------------------------
	// sdk回调执行方法
	//------------------------------------------------------------------

	public static sdk_Logout(): void
	{
		PrefsManager.clearLoginInfo();
		GameManager.reload();
		ChannelManager.OnLogout.dispatch();
	}

	//------------------------------------------------------------------
	// 
	//------------------------------------------------------------------

	private static _channelType: string = qin.StringConstants.Empty;
	/**
	 * 渠道类型
	 */
	public static get channelType(): string
	{
		return ChannelManager._channelType;
	}
	/**
	 * 渠道登录类型
	 */
	public static loginType: string;
	/// <summary>
	/// 获取渠道类型+登录类型
	/// </summary>
	/// <returns></returns>
	public static getLoginChannel(): string
	{
		return ChannelUtil.GetLoginChannel(ChannelManager.channelType, ChannelManager.loginType);
	}
	private static _accountHandler: AccountHandler = new AccountHandler();//Qin 帐号系统 登录
	private static _channel: ChannelBase;//渠道处理类
	private static _isInitComplete: boolean = false;//渠道初始化是否完成
	private static _appName: string = qin.StringConstants.Empty;
	/**
	 * 应用名
	 */
	public static get appName(): string
	{
		return ChannelManager._appName;
	}
	private static _deviceId: string = qin.StringConstants.Empty;
	/**
	 * 设备id
	 */
	public static get deviceId(): string
	{
		return ChannelManager._deviceId;
	}
	private static _bundleId: string = qin.StringConstants.Empty;
	/**
	 * 包id
	 */
	public static get bundleId(): string
	{
		return ChannelManager._bundleId;
	}
	private static _hasWeixin: boolean = false;
	/**
	 * 是否安装有微信
	 */
	public static get hasWeixin(): boolean
	{
		return ChannelManager._hasWeixin;
	}
	private static _hasMicrophone: boolean = false
	/**
	 * 是否有麦克风或麦克风权限(需要执行requestMicrophone方法过后才有用)
	 */
	public static get hasMicrophone(): boolean
	{
		return ChannelManager._hasMicrophone;
	}
	private static _clientVersion: string = qin.StringConstants.Empty;
	/**
	 * 本地客户端安装包版本(web版没有)
	 */
	public static get clientVersion(): string
	{
		return ChannelManager._clientVersion;
	}

	//------------------------------------------------------------------
	// 
	//------------------------------------------------------------------

	/**
	 * 初始化
	 */
	public static initialize()
	{
		if (ChannelManager._isInitComplete)
		{
			ChannelManager.OnInitComplete.dispatch();
			return;
		}
		if (qin.System.isMicro)
		{
			if (qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.Ios)
			{
				ChannelManager._channel = new Channel_ios();
			}
			else if (qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.Android)
			{
				ChannelManager._channel = new Channel_android();
			}
			//安装包版初始化
			ChannelManager.initPackage();
		}
		else
		{
			//web版初始化
			ChannelManager.initWeb();
		}
	}
	private static initPackage(): void
	{
		qin.ExternalInterface.addCallback(ExtFuncName.OnApplicationFocus, (status: string) =>
		{
			let isStatus: boolean = qin.StringUtil.toBoolean(status);
			if (isStatus && qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.Android)
			{
				UIManager.closePanel(UIModuleName.PayMaskPanel);
			}
			ChannelManager.OnApplicationFocus.dispatch(isStatus);
		});
		qin.ExternalInterface.addCallback(ExtFuncName.Share, (status: string) =>
		{
			if (qin.StringUtil.toBoolean(status)) //直接抛送分享类型
			{
				ChannelManager.OnShareSucceed.dispatch(status);
			}
			else
			{
				ChannelManager.OnShareFailed.dispatch();
			}
		});
		qin.ExternalInterface.addCallback(ExtFuncName.Login, (json: string) =>
		{
			let data: any = JSON.parse(json);
			if (qin.StringUtil.toBoolean(data.status))
			{
				ChannelManager.OnTokenLoginSucceed.dispatch(data.token);
			} else
			{
				ChannelManager.OnLoginFailed.dispatch();
			}
		});
		qin.ExternalInterface.addCallback(ExtFuncName.Pay, (json: string) =>
		{
			let data: any = JSON.parse(json);
			if (qin.StringUtil.toBoolean(data.status))
			{
				ChannelManager._channel.sdkPaySucceed(JSON.parse(data.data));//不同平台可能有特殊处理
			} else
			{
				UIManager.closePanel(UIModuleName.PayMaskPanel);
				ChannelManager._channel.sdkPayFailed();
			}
		});
		qin.ExternalInterface.addCallback(ExtFuncName.Logout, ChannelManager.sdk_Logout);
		qin.ExternalInterface.addCallback(ExtFuncName.OnBackToApplication, (status: string) =>
		{
			ChannelManager.OnBackToApplication.dispatch(qin.StringUtil.toBoolean(status));
		});
		qin.ExternalInterface.addCallback(ExtFuncName.RecordAudio, (data: string) =>
		{
			RecordAudioManager.RecordComplete(data);
		});
		qin.ExternalInterface.addCallback(ExtFuncName.HasRecordData, (json: string) =>
		{
			ChatManager.checkComplete(json);
		});
		qin.ExternalInterface.addCallback(ExtFuncName.RequestMicrophone, (status: string) =>
		{
			ChannelManager._hasMicrophone = qin.StringUtil.toBoolean(status);
		});
		qin.ExternalInterface.addCallback(ExtFuncName.ImageSelect, (data: string) =>
		{
			ChannelManager.OnImageSelect.dispatch({ type: HeadUploadSystemType.native, data: data });
		});
		qin.ExternalInterface.addCallback(ExtFuncName.CopyToPastboard, (data: string) =>
		{
			UIManager.showFloatTips("邀请码复制成功");
		});
		//
		qin.ExternalInterface.addCallback(ExtFuncName.Initialize, (json: string) =>
		{
			ChannelManager._isInitComplete = true;
			let data: any = JSON.parse(json);
			ChannelManager._channelType = data['channelType'];
			if (qin.StringUtil.isNullOrEmpty(ChannelManager._channelType))
			{
				ChannelManager._channelType = ChannelType.qin;
			}
			ChannelManager._appName = data['appName'];
			ChannelManager._deviceId = data['deviceId'];
			ChannelManager._bundleId = data['bundleId'];
			ChannelManager._clientVersion = data['clientVersion'];
			ChannelManager._hasWeixin = qin.StringUtil.toBoolean(data['hasWeixin']);
			ChannelManager.OnInitComplete.dispatch();
		});
		qin.ExternalInterface.call(ExtFuncName.Initialize, '');
	}
	private static initWeb(): void
	{
		ChannelManager._channel = new Channel_web();
		ChannelManager._isInitComplete = true;
		ChannelManager._channelType = URLOption.getString(URLOption.Channel);
		if (qin.StringUtil.isNullOrEmpty(ChannelManager._channelType))
		{
			ChannelManager._channelType = ChannelType.qin;
		}
		ChannelManager._appName = window.document.title;
		ChannelManager.OnInitComplete.dispatch();
	}
	/**
	 * 登录
	 */
	public static login(loginType: string, isAutoLogin: boolean = false)
	{
		if (loginType == ChannelLoginType.Qin)
		{
			ChannelManager._accountHandler.Login(isAutoLogin);
		}
		else
		{
			ChannelManager._channel.Login(loginType, isAutoLogin);
		}
	}
	/**
	 * 登出
	 */
	public static logout()
	{
		if (ChannelManager.loginType == ChannelLoginType.Qin)
		{
			ChannelManager._accountHandler.Logout();
		}
		else
		{
			if (qin.System.isMicro)
			{
				qin.ExternalInterface.call(ExtFuncName.Logout, '');
			}
			else
			{
				ChannelManager.sdk_Logout();
			}
		}
	}
	/**
	 * 支付发送
	 */
	public static PaySend(shopId: number)
	{
		let payDef: ShopDefinition = ShopDefined.GetInstance().getDefinition(shopId);
		if (payDef)
		{
			let awardDef: AwardDefinition = AwardDefined.GetInstance().getDefinition(payDef.awardId);
			if (awardDef)
			{
				let payState: number = BundleManager.getPayState();
				if (payState == PayState.Close)
				{
					AlertManager.showAlertByString('支付已关闭，无法支付');
					return;
				}
				if (awardDef.costList && awardDef.costList.length > 0 && awardDef.costList[0].type == CostType.RMB)//消耗为rmb时调用支付
				{
					let price: number = awardDef.costList[0].count;
					if (price > 0)
					{
						let orderId: string = ChannelUtil.GenerateOrder(payDef.awardId, VersionManager.isServerTest);//订单id		
						ChannelManager._channel.PaySend(payState, payDef.awardId, UserManager.serverInfo.id, orderId, price, awardDef.name);
					}
					else
					{
						qin.Console.log("支付异常");
					}
				}
			}
		}
	}
	/**
	 * 设置sdk扩展数据
	 */
	public static SetExtData()
	{
		if (qin.System.isMicro)
		{
			let data: any = {};
			data["channelToken"] = LoginManager.channelToken;
			data["userId"] = LoginManager.loginInfo.userid;
			data["loginChannel"] = ChannelManager.getLoginChannel();
			qin.ExternalInterface.call(ExtFuncName.SetExtData, JSON.stringify(data));
		}
	}
	/**
	 * 设置服务器返回的渠道数据，有些坑爹的sdk用
	 */
	public static SetChannelData(account: string, token: string): void
	{
		if (qin.System.isMicro)
		{
			qin.ExternalInterface.call(ExtFuncName.SetChannelData, JSON.stringify({ account: account, token: token }));
		}
	}
	/**
	 * 检查有没有未完成的订单（苹果丢单处理,第一次进主场景时候检查）
 	 */
	public static checkUnFinishedPayList()
	{
		if (qin.System.isMicro)
		{
			ChannelManager._channel.checkUnFinishedPayList();
		}
	}
	/**
	 * 微信分享
	 */
	public static share(type: string, title: string, message: string, inviteCode?: string)
	{
		ChannelManager._channel.share(type, title, message, inviteCode);
	}
	/**
	 * 请求一次麦克风权限(ios、android有弹窗确认)
	 */
	public static requestMicrophone()
	{
		if (qin.System.isMicro)
		{
			qin.ExternalInterface.call(ExtFuncName.RequestMicrophone, '');
		}
	}
	/**
	 * 录音
	 */
	public static recordAudio(code: number)
	{
		if (qin.System.isMicro)
		{
			RecordAudioManager.RecordVoice(code);
			qin.ExternalInterface.call(ExtFuncName.RecordAudio, code.toString());
		}
	}
	/**
 	* 停止播放正在播放的录音
 	*/
	public static stopRecord(guid: string)
	{
		if (qin.System.isMicro)
		{
			qin.ExternalInterface.call(ExtFuncName.StopRecord, guid);
		}
	}
	/**
	 * 设置录音数据
	 */
	public static setRecordData(guid: string, data: string, playNow: boolean)
	{
		if (qin.System.isMicro)
		{
			qin.ExternalInterface.call(ExtFuncName.SetRecordData, JSON.stringify({ "guid": guid, "data": data, "playNow": playNow }));
		}
	}
	/**
	 * 本地是否已经存在录音文件
	 */
	public static hasRecordData(guid: string)
	{
		if (qin.System.isMicro)
		{
			qin.ExternalInterface.call(ExtFuncName.HasRecordData, guid);
		}
	}
	/**
	 * 播放录音
	 */
	public static playRecord(guid: string)
	{
		if (qin.System.isMicro)
		{
			qin.ExternalInterface.call(ExtFuncName.PlayRecord, guid);
		}
	}
	/**
	 * 选择图片
	 */
	public static imageSelect(size: number, quality: number): void
	{
		ChannelManager._channel.imageSelect(size, quality);
	}
	public static openURL(url: string): void
	{
		ChannelManager._channel.openURL(url);
	}
	/**
	 * 震动
	 */
	public static shake()
	{
		if (qin.System.isMicro)
		{
			qin.ExternalInterface.call(ExtFuncName.Shake, qin.StringConstants.Empty);
		}
		else
		{
			qin.System.webVibrate();
		}
	}
	public static copyToPastboard(data: string)
	{
		ChannelManager._channel.copyToPastboard(data);
	}
	//------------------------------------------------------------------
	// Event
	//------------------------------------------------------------------

	/**
	 * 应用 获取/失去 焦点
	 */
	public static OnApplicationFocus: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 账号登录成功
	 */
	public static OnAccountLoginSucceed: qin.DelegateDispatcher = new qin.DelegateDispatcher();//Action< string, string, bool >
	public static DispatchAccountLoginSucceed(account: string, password: string, isRegister: boolean = false)
	{
		ChannelManager.OnAccountLoginSucceed.dispatch([account, password, isRegister]);
	}
	/**
	 * 初始化完成
	 */
	public static OnInitComplete: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * token登录成功
	 */
	public static OnTokenLoginSucceed: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 登录失败
	 */
	public static OnLoginFailed: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 游戏登出
	 */
	public static OnLogout: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 从其他程序返回当前程序的事件
	 */
	public static OnBackToApplication: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 分享成功
	 */
	public static OnShareSucceed: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 分享失败
	 */
	public static OnShareFailed: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 图片选择完成回调
	 */
	public static OnImageSelect: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 支付模式选择
	 */
	public static OnPayModelSelectEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}