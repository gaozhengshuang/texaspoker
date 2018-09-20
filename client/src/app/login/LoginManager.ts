/**
 * 登录管理
 */
class LoginManager
{
	private static TokenErrorCode: number = 406;//token登录错误码
	//
	private static _connectHandler: PollingSocket;
	//
	private static _socket: qin.LoginSocket;
	private static _clientKey: string;
	private static _hexsecret: string;
	private static _password: string;
	private static _channel: string;//登录渠道，安装包渠道+"_"+登录类型
	private static _isLogin: number;
	private static _tokenCode: string;

	private static _loginMode: LoginMode;
	/**
	 * 登录模式
	 */
	public static get loginMode()
	{
		return LoginManager._loginMode;
	}
	private static _loginInfo: LoginInfo;
	/**
	 * 登录信息
	 */
	public static get loginInfo(): LoginInfo
	{
		return LoginManager._loginInfo;
	}
	private static _account: string;
	/**
	 * 游戏帐号名 或 渠道帐号id（对于游戏来说，渠道的帐号id就是游戏帐号名）
	 */
	public static get account()
	{
		return LoginManager._account;
	}
	private static _channelToken: string;
	/**
	 * 渠道返回的token
	 */
	public static get channelToken()
	{
		return LoginManager._channelToken;
	}
	/**
	 * 销毁
	 */
	public static Dispose()
	{
		LoginManager.OnComplete.clear();
		if (LoginManager._socket != null)
		{
			LoginManager.RemoveAllListener();
			LoginManager._socket.dispose();
			LoginManager._socket = null;
		}
	}
	/**
	 * 关闭
	 */
	public static Close()
	{
		if (LoginManager._socket != null)
		{
			LoginManager.RemoveAllListener();
			LoginManager._socket.close();
		}
	}
	private static RemoveAllListener()
	{
		UIManager.removeEventListener(UIModuleName.LoadingSwitchPanel, UIModuleEvent.OnTimeout, LoginManager.OnLoadingTimeout, this);
		LoginManager._socket.RemoveMessageListener(LoginManager.OnLoginMessage, this);
		LoginManager._socket.RemoveCommandListener(Command.Login_login, LoginManager.OnLogin, this);
		LoginManager._socket.RemoveCommandListener(Command.Login_exchange, LoginManager.OnExchange, this);
		LoginManager._socket.RemoveCommandListener(Command.Login_auth, LoginManager.OnAuth, this);
		LoginManager._socket.RemoveResultListener(LoginManager.OnResult, this);
	}
	/**
	 * 游客登录
	 */
	public static GuestLogin(channel: string)
	{
		LoginManager._loginMode = LoginMode.Guest;
		LoginManager._isLogin = 1;
		LoginManager._channel = channel;
		LoginManager._account = "游客";
		LoginManager._password = qin.StringConstants.Empty;
		LoginManager.pollingConnect();
	}
	/**
	 * 游戏账号登录
	 */
	public static AccountLogin(channel: string, account: string, pwd: string)
	{
		LoginManager._loginMode = LoginMode.Account;
		LoginManager._isLogin = 1;
		LoginManager._channel = channel;
		LoginManager._account = account;
		LoginManager._password = pwd;
		LoginManager.pollingConnect();
	}
	/**
	 * token调试登录,除了_loginMode和TokenLogin不一样，其它都一样
	 */
	public static TokenDebug(loginChannel: string, token: string)
	{
		LoginManager._loginMode = LoginMode.TokenDebug;
		LoginManager._isLogin = 1;
		LoginManager._channel = loginChannel;
		LoginManager._tokenCode = token;
		LoginManager.pollingConnect();
	}
	/**
	 * 平台token登录
	 */
	public static TokenLogin(loginChannel: string, token: string)
	{
		LoginManager._loginMode = LoginMode.Token;
		LoginManager._isLogin = 1;
		LoginManager._channel = loginChannel;
		LoginManager._tokenCode = token;
		LoginManager.pollingConnect();
	}
	/**
	 * 游戏账号注册
	 */
	public static AccountRegister(channel: string, account: string, pwd: string)
	{
		LoginManager._loginMode = LoginMode.Account;
		LoginManager._isLogin = 611;
		LoginManager._channel = channel;
		LoginManager._account = account;
		LoginManager._password = pwd;
		LoginManager.pollingConnect();
	}

	//------------------------------------------------------------------
	// private
	//------------------------------------------------------------------
	private static pollingConnect()
	{
		if (!LoginManager._connectHandler)
		{
			LoginManager._connectHandler = new PollingSocket(1, qin.Delegate.getOut(LoginManager.Connect, this), qin.Delegate.getOut(LoginManager.OnLoadingTimeout, this))
		}
		LoginManager._connectHandler.loginConnect();
	}
	private static Connect()
	{
		if (LoginManager._socket == null)
		{
			LoginManager._socket = new qin.LoginSocket();
			LoginManager._socket.initialize(ProtocolManager.LoginBin);
		}
		//
		LoginManager.Close();
		if (!LoginManager._connectHandler.isPolling)
		{
			UIManager.addEventListener(UIModuleName.LoadingSwitchPanel, UIModuleEvent.OnTimeout, LoginManager.OnLoadingTimeout, this)
		}
		UIManager.showPanel(UIModuleName.LoadingSwitchPanel, true);
		LoginManager._socket.AddMessageListener(LoginManager.OnLoginMessage, this);
		LoginManager._socket.AddResultListener(LoginManager.OnResult, this);
		LoginManager._socket.Connect(LoginManager._connectHandler.address, LoginManager._connectHandler.port);
	}
	private static OnLoadingTimeout()
	{
		LoginManager.Close();
		AlertManager.showAlert("网络连接超时！", LoginManager.OnErrorConfirm, null, null, "网络超时");
	}
	private static OnLogin(result: qin.SpRpcResult)
	{
		LoginManager._socket.RemoveCommandListener(Command.Login_login, LoginManager.OnLogin, this);
		let serverVersion: string = result.data["Version"];
		if (VersionManager.VerifyGameServer(serverVersion))
		{
			let challenge: string = result.data["challenge"];
			let serverkey: string = result.data["serverkey"];

			// serverkey = qin.Crypt.lb64decode(serverkey);
			// let secret: string = qin.Crypt.ldhsecret(serverkey, LoginManager._clientKey);
			// LoginManager._hexsecret = qin.Crypt.ltohex(secret);

			//
			LoginManager._hexsecret = "266f889930929ff7";
			let hmac = qin.Crypt.HmacSha1(LoginManager._hexsecret, challenge);
			//交换
			LoginManager._socket.AddCommandListener(Command.Login_exchange, LoginManager.OnExchange, this)
			LoginManager._socket.SimpleSend(Command.Login_exchange, { "hmac": hmac });
		}
		else
		{
			UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
			LoginManager.RemoveAllListener();
			LoginManager.OnVersionError.dispatch();
		}
	}
	private static OnExchange(result: qin.SpRpcResult)
	{
		LoginManager._socket.RemoveCommandListener(Command.Login_exchange, LoginManager.OnExchange, this);
		//
		let deviceId: string = ChannelManager.deviceId;
		let token: string = qin.StringConstants.Empty;
		if (LoginManager._loginMode == LoginMode.Account)
		{
			token = qin.StringUtil.format("{0}@{1}:{2}", qin.Crypt.lb64encode(LoginManager._account), qin.Crypt.lb64encode(LoginManager._password), LoginManager._isLogin);
		}
		else if (LoginManager._loginMode == LoginMode.Guest)
		{
			token = deviceId;
		}
		else
		{
			token = LoginManager._tokenCode;
		}
		token = qin.Crypt.AESEncrypt(token, LoginManager._hexsecret);
		LoginManager._socket.AddCommandListener(Command.Login_auth, LoginManager.OnAuth, this);
		//
		let bid: number = BundleManager.getBid();
		if (bid)
		{
			//一定要有包ID
			LoginManager._socket.SimpleSend(Command.Login_auth, { "token": token, "channel": LoginManager._channel, "device": deviceId, "bid": bid });
		}
	}

	private static OnAuth(result: qin.SpRpcResult)
	{
		LoginManager._socket.RemoveCommandListener(Command.Login_auth, LoginManager.OnAuth, this);
		LoginManager.Close();

		if (DEBUG || qin.System.isLocalhost) //发布版本不关闭(发布版本直接登录，没有手动登录过程) 后续拉进入游戏的协议还会打开，为了进入体验
		{
			UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
		}
		//
		LoginManager._loginInfo = LoginInfo.CreateFromProto(result.data);
		LoginManager._loginInfo.secret = LoginManager._hexsecret;
		if (LoginManager._loginMode == LoginMode.Token)
		{
			if (LoginManager._loginInfo.channeldata != null)
			{
				let channeldata: Object = LoginManager._loginInfo.channeldata;
				if (channeldata.hasOwnProperty("account"))
				{
					LoginManager._account = channeldata["account"] as string;//_account不能设置默认为空，因为登录时候有赋值
				}
				LoginManager._channelToken = channeldata.hasOwnProperty("token") ? (channeldata["token"] as string) : qin.StringConstants.Empty;
				//
				PrefsManager.setLoginToken(LoginManager._channelToken, ChannelLoginType.getTokenExpire(ChannelManager.loginType));//登录完成把sdk返回的token记录本地，下次登录如果有直接使用登录
				ChannelManager.SetChannelData(LoginManager._account, LoginManager._channelToken);//设置回sdk，因为有些sdk需要用到服务器的sdk数据
			}
		}
		//
		else if (LoginManager._loginMode == LoginMode.Account)
		{
			if (LoginManager._account)
			{
				PrefsManager.setValue(PrefsManager.Login_Account, LoginManager._account);
				PrefsManager.setValue(PrefsManager.Login_Password, LoginManager._password);
			}
		}
		SocketManager.Dispose();//登录过，要销毁游戏Socket，保证都是重新开始的
		//游戏登录成功设置保存登录类型
		PrefsManager.setValue(PrefsManager.Login_LoginType, ChannelManager.loginType);
		LoginManager.OnComplete.dispatch();
	}
	private static OnLoginMessage(msg: qin.SocketMessage)
	{
		qin.Console.logSocket(msg);
		switch (msg.type)
		{
			case qin.SocketMessageType.Connect:
				qin.Console.log("Login服务器连接成功");
				LoginManager._connectHandler.stop();
				//握手
				//LoginManager._clientKey = qin.Crypt.lrandomkey();
				//let tmpkey: string = LoginManager._clientKey;
				//tmpkey = qin.Crypt.lb64encode(qin.Crypt.ldhexchange(LoginManager._clientKey));
				LoginManager._clientKey = "xuEaV3HSKms=";
				//tmpkey = LoginManager._clientKey;
				LoginManager._socket.AddCommandListener(Command.Login_login, LoginManager.OnLogin, this);
				LoginManager._socket.SimpleSend(Command.Login_login, { "clientkey": LoginManager._clientKey, "Version": ProjectDefined.GetInstance().codeVersion });
				// LoginManager._socket.SendAsync(Command.Login_login, { "clientkey": qin.Crypt.lb64encode(qin.Crypt.ldhexchange(LoginManager._clientKey)), "Version": "0.1.0" });//VersionManager.clientVersion
				break;
			case qin.SocketMessageType.NetworkError:
				LoginManager._connectHandler.errorConnectHandler();
				if (LoginManager._connectHandler.isTimeout)
				{
					LoginManager.onErrorOccured(msg);
				}
				break;
			case qin.SocketMessageType.Failing:
				LoginManager._connectHandler.stop();
				LoginManager.onErrorOccured(msg);
				break;
			case qin.SocketMessageType.SendError:
				UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
				LoginManager.Close();
				//
				let alertInfo: AlertInfo = new AlertInfo();
				alertInfo.title = "发送协议出错";
				alertInfo.subTitle = msg.errorCode;
				alertInfo.message = msg.message;
				alertInfo.OnConfirm = LoginManager.OnErrorConfirm;
				AlertManager.showAlertInfo(alertInfo);
				break;
			case qin.SocketMessageType.NotInitialized:
				UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
				LoginManager.Close();
				//
				alertInfo = new AlertInfo();
				alertInfo.title = "协议初始化异常";
				alertInfo.subTitle = msg.errorCode;
				alertInfo.message = msg.message;
				alertInfo.OnConfirm = LoginManager.OnErrorConfirm;
				AlertManager.showAlertInfo(alertInfo);
				break;
		}
	}
	private static onErrorOccured(msg: qin.SocketMessage)
	{
		UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
		LoginManager.Close();
		//
		let alertInfo: AlertInfo = new AlertInfo();
		alertInfo.title = "网络异常";
		alertInfo.subTitle = msg.errorCode;
		alertInfo.message = "连接服务器失败";
		alertInfo.OnConfirm = LoginManager.OnErrorConfirm;
		AlertManager.showAlertInfo(alertInfo);
	}
	/// <summary>
	/// 客户端主动请求的才执行
	/// </summary>
	/// <param name="result"></param>
	private static OnResult(result: qin.SpRpcResult)
	{
		if (result.op == qin.SpRpcOp.Response)
		{
			if (result.error != 0)
			{
				LoginManager.Close();
				UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
				let isWebReload = false;
				//406错误，抛出验证失败的事件
				if (result.error == LoginManager.TokenErrorCode)
				{
					PrefsManager.clearLoginInfo();
					isWebReload = qin.System.isWeb && ChannelManager.loginType == ChannelLoginType.Weixin;
					LoginManager.OnValiateFail.dispatch();
				}

				let alertInfo: AlertInfo = new AlertInfo();
				alertInfo.title = "提示";
				alertInfo.subTitle = "protocol:" + result.cmdId + ",code:" + result.error;
				alertInfo.message = isWebReload?'平台验证失败，请重新登录':ErrorDefined.GetInstance().getDetails(result.error);
				alertInfo.OnConfirm = LoginManager.OnErrorConfirm;
				alertInfo.confirmParam = isWebReload;
				console.warn(qin.StringUtil.format("{0},描述：{1}", alertInfo.subTitle, alertInfo.message));
				AlertManager.showAlertInfo(alertInfo);
			}
		}
	}
	private static OnErrorConfirm(obj: any)
	{
		if(obj)
		{
			GameManager.reload();
		}
		else
		{
			LoginManager.OnError.dispatch();
		}
	}

	//------------------------------------------------------------------
	// event
	//------------------------------------------------------------------

	/**
	 * 登录完成
	 */
	public static OnComplete: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 登录错误
	 */
	public static OnError: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 406错误，验证token失败
	 */
	public static OnValiateFail: qin.DelegateDispatcher = new qin.DelegateDispatcher();
	/**
	 * 和登录服务器版本验证错误
	 */
	public static OnVersionError: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}