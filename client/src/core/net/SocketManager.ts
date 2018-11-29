/// <summary>
/// 和游戏服务器通信的socket连接
/// </summary>
class SocketManager
{
	private static ResetRoleInfoErrorCode: number = 201;//重新获取角色数据错误码
	private static HeartbeatInterval: number = 3000;//心跳包发送间隔时间，60秒
	private static _ignoreError: Array<string>;
	private static _lastSendTime: number;
	/**
	 * 重连时的服务器推送的session记录
	 */
	private static _recconectServerPushSession: number;
	private static _connectHandler: PollingSocket;
	/// <summary>
	/// 添加忽略错误码处理
	/// </summary>
	/// <param name="error"></param>
	public static AddIgnoreError(error: string)
	{
		if (!SocketManager._ignoreError)
		{
			SocketManager._ignoreError = new Array<string>();
		}
		if (SocketManager._ignoreError.indexOf(error) == -1)
		{
			SocketManager._ignoreError.push(error);
		}
	}
	/// <summary>
	/// 移除忽略错误码处理
	/// </summary>
	/// <param name="error"></param>
	public static RemoveIgnoreError(error: string)
	{
		game.ArrayUtil.RemoveItem(error, SocketManager._ignoreError)
	}

	//------------------------------------------------------------------
	// 
	//------------------------------------------------------------------

	/// <summary>
	/// 是否是正在进入游戏中，不需要重连，提示错误后特殊处理
	/// </summary>
	public static _isEntering: boolean = false;
	public static get isEntering(): boolean
	{
		return SocketManager._isEntering;
	}
	public static set isEntering(value: boolean)
	{
		SocketManager._isEntering = value;
		if (SocketManager._socket)
		{
			SocketManager._socket.enabledErrorCode = SocketManager._isEntering == false;
		}
	}
	//
	private static _socket: game.GameSocket;
	private static _lastTimestamp: number;//服务器最后回包时间
	private static _heartbeatTime: number;//心跳时间
	private static _isReconnecting: boolean = false;//是否是重连中
	private static _autoReconnect: boolean = false;//是自动重连
	private static _delayId: number = undefined;

	private static Initialize(msgType: string = egret.WebSocket.TYPE_BINARY)
	{
		SocketManager._isReconnecting = false;
		if (!SocketManager._socket)
		{
			SocketManager._socket = new game.GameSocket();
			SocketManager._socket.enabledErrorCode = (SocketManager._isEntering == false);
			// SocketManager._socket.addNormalError(SocketManager.ResetRoleInfoErrorCode); //move todo
			SocketManager._socket.initialize(msgType);
			SocketManager._socket.AddMessageListener(SocketManager.OnMessage, this);
		}
		game.Tick.AddSecondsInvoke(SocketManager.tickHnadler, this);
	}
	private static tickHnadler()
	{
		if (SocketManager._lastSendTime != undefined)
		{
			let out: number = ProjectDefined.onTimeOut;
			if (out == undefined || out <= 0)
			{
				out = 15000;
			}
			let now: number = Date.now();
			if (now - SocketManager._lastSendTime > out)
			{
				SocketManager._lastSendTime = undefined;
				SocketManager.OnLoadingTimeout();
			}
		}
	}
	/**
 	* 获取服务器推送的最大session
 	*/
	public static get requestSessionMax(): number
	{
		return SocketManager._socket.requestSessionMax;
	}
	public static Dispose()
	{
		if (SocketManager._socket)
		{
			egret.clearTimeout(SocketManager._delayId);
			SocketManager._socket.RemoveMessageListener(SocketManager.OnMessage, this);
			SocketManager.StopHeartbeat();
			SocketManager.RemoveAllListener();
			SocketManager._socket.dispose();
			SocketManager._socket = null;
		}
	}
	/// <summary>
	/// 关闭连接
	/// </summary>
	/// <param name="enabledSend"></param>
	public static Close(enabledSend: boolean = false, stopHeartbeat: boolean = true)
	{
		if (SocketManager._socket)
		{
			egret.clearTimeout(SocketManager._delayId);
			if (stopHeartbeat)
			{
				SocketManager.StopHeartbeat();
			}
			SocketManager.RemoveAllListener();
			SocketManager._socket.close(enabledSend);
		}
		//停止轮训 move todo
		SocketManager._connectHandler.stop();
	}
	/**
	 * 开始连接
	 */
	public static pollingConnect(adress: string, port?: number, isShowLoading: boolean = true)
	{
		this.Initialize();
		if (!SocketManager._connectHandler)
		{
			SocketManager._connectHandler = new PollingSocket(2, game.Delegate.getOut(SocketManager.Connect, this), game.Delegate.getOut(SocketManager.OnLoadingTimeout, this));
		}
		SocketManager._connectHandler.gameConnect(adress, port, isShowLoading);
	}
	/// <summary>
	/// 连接服务器
	/// </summary>
	/// <param name="ip"></param>
	/// <param name="port"></param>
	/// <param name="isShowLoading"></param>
	private static Connect(isShowLoading: boolean = true)
	{
		if (SocketManager._socket == null)
		{
			throw new Error("socket no initialize");
		}
		if (isShowLoading)
		{
			UIManager.showPanel(UIModuleName.LoadingPanel, true);
		}
		SocketManager.AddAllListener();
		egret.log("socket重连");
		if (SocketManager._connectHandler.port != undefined)
		{
			SocketManager._socket.Connect(SocketManager._connectHandler.port, SocketManager._connectHandler.initAdress);
		}
		else
		{
			SocketManager._socket.Connect(SocketManager._connectHandler.initAdress); //不用轮训 todo
		}
	}
	/// <summary>
	/// 重连，必须先Close才可以重连
	/// </summary>
	public static Reconnect()
	{
		if (SocketManager.VerifyReLogin())
		{
			AlertManager.showAlertObj({ confirmLabel: "登录失效", message: "登录验证失效，请重新登录游戏！", OnConfirm: SocketManager.OnClickReLogin, isSingle: true });
		}
		else
		{
			SocketManager._isReconnecting = true;
			SocketManager._connectHandler.gameReconnect();
		}
	}
	private static AddAllListener()
	{
		SocketManager._socket.AddResultListener(SocketManager.OnResult, this);
	}

	private static RemoveAllListener()
	{
		SocketManager._socket.RemoveResultListener(SocketManager.OnResult, this);
	}
	private static OnLoadingTimeout()
	{
		SocketManager.Close();
		AlertManager.showAlertObj({ confirmLabel: "重新登录", message: "网络连接超时，请检查您的网络是否正常并重试！", OnConfirm: SocketManager.OnClickReLogin, isSingle: true }); //move todo OnClickReconnect 重连原来
	}
	//------------------------------------------------------------------
	// Send 可重复连续发送
	//------------------------------------------------------------------

	/**
	 * 同步发送
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 */
	public static Send(cmdId: string, args: any = null, subId?: string)
	{
		SocketManager.InvokeSend(false, false, cmdId, args, true, undefined, undefined, undefined, subId);
	}
	/**
	 * 同步发送，断线重连后会重发失败的数据
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 */
	public static SendDiscRetry(cmdId: string, args: any = null, subId?: string)
	{
		SocketManager.InvokeSend(false, true, cmdId, args, true, undefined, undefined, undefined, subId);
	}
	/**
	 * 同步隐式发送，不显示loading，不影响交互事件
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 */
	public static ImplSend(cmdId: string, args: any = null, subId?: string)
	{
		SocketManager.InvokeSend(false, false, cmdId, args, false, undefined, undefined, undefined, subId);
	}
	/**
	 * 同步隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 */
	public static ImplSendDiscRetry(cmdId: string, args: any = null, subId?: string)
	{
		SocketManager.InvokeSend(false, true, cmdId, args, false, undefined, undefined, undefined, subId);
	}

	//------------------------------------------------------------------
	// Send 不可重复连续发送
	//------------------------------------------------------------------

	/**
	 * 独占发送
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 */
	public static SendAsync(cmdId: string, args: any = null, subId?: string)
	{
		SocketManager.InvokeSend(true, false, cmdId, args, true, undefined, undefined, undefined, subId);
	}
	/**
	 * 独占发送，断线重连后会重发失败的数据
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 */
	public static SendAsyncDiscRetry(cmdId: string, args: any = null, subId?: string)
	{
		SocketManager.InvokeSend(true, true, cmdId, args, true, undefined, undefined, undefined, subId);
	}
	/**
	 * 独占隐式发送，不显示loading，不影响交互事件
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 */
	public static ImplSendAsync(cmdId: string, args: any = null, subId?: string)
	{
		SocketManager.InvokeSend(true, false, cmdId, args, false, undefined, undefined, undefined, subId);
	}
	/**
	 * 独占隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 */
	public static ImplSendAsyncDiscRetry(cmdId: string, args: any = null, subId?: string)
	{
		SocketManager.InvokeSend(true, true, cmdId, args, false, undefined, undefined, undefined, subId);
	}

	//------------------------------------------------------------------
	// Send 事件
	//------------------------------------------------------------------

	public static AddCommandListener(cmdId: string, listener: Function, thisObject: any)
	{
		if (SocketManager._socket != null && listener != null && cmdId)
		{
			SocketManager._socket.AddCommandListener(cmdId, listener, thisObject);
		}
		else
		{
			console.error("AddCommandListener:socket no initialize");
		}
	}
	public static RemoveCommandListener(cmdId: string, listener: Function, thisObject: any)
	{
		if (SocketManager._socket != null)
		{
			SocketManager._socket.RemoveCommandListener(cmdId, listener, thisObject);
		}
	}
	public static AddErrorListener(cmdId: string, listener: Function, thisObject: any)
	{
		if (SocketManager._socket != null)
		{
			SocketManager._socket.AddErrorListener(cmdId, listener, thisObject);
		}
		else
		{
			console.error("AddCommandListener:socket no initialize");
		}
	}
	public static RemoveErrorListener(cmdId: string, listener: Function, thisObject: any)
	{
		if (SocketManager._socket != null)
		{
			SocketManager._socket.RemoveErrorListener(cmdId, listener, thisObject);
		}
	}

	//------------------------------------------------------------------
	// Call 可重复连续发送
	//------------------------------------------------------------------

	/**
	 * 同步发送
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 * 回调执行后会自动移除
	 */
	public static call(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any, subId?: string)
	{
		SocketManager.InvokeSend(false, false, cmdId, args, true, onResult, onError, thisObject, subId);
	}
	/**
	 * 同步发送，断线重连后会重发失败的数据
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 * 回调执行后会自动移除
	 */
	public static callDiscRetry(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any, subId?: string)
	{
		SocketManager.InvokeSend(false, true, cmdId, args, true, onResult, onError, thisObject, subId);
	}
	/**
	 * 同步隐式发送，不显示loading，不影响交互事件
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 * 回调执行后会自动移除
	 */
	public static ImplCall(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any, subId?: string)
	{
		SocketManager.InvokeSend(false, false, cmdId, args, false, onResult, onError, thisObject, subId);
	}
	/**
	 * 同步隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 * 回调执行后会自动移除
	 */
	public static ImplCallDiscRetry(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any, subId?: string)
	{
		SocketManager.InvokeSend(false, true, cmdId, args, false, onResult, onError, thisObject, subId);
	}

	/**
	 * 移除发送回调
	 */
	public static RemoveCall(cmdId: string, onResult: Function, thisObject: any)
	{
		if (SocketManager._socket != null)
		{
			SocketManager._socket.RemoveCall(cmdId, onResult, thisObject);
		}
	}

	//------------------------------------------------------------------
	// Call 不可重复连续发送
	//------------------------------------------------------------------

	/**
	 * 独占发送
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 * 回调执行后会自动移除
	 */
	public static callAsync(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any, subId?: string)
	{
		SocketManager.InvokeSend(true, false, cmdId, args, true, onResult, onError, thisObject, subId);
	}
	/**
	 * 独占发送，断线重连后会重发失败的数据
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 * 回调执行后会自动移除
	 */
	public static callAsyncDiscRetry(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any, subId?: string)
	{
		SocketManager.InvokeSend(true, true, cmdId, args, true, onResult, onError, thisObject, subId);
	}
	/**
	 * 独占隐式发送，不显示loading，不影响交互事件
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 * 回调执行后会自动移除
	 */
	public static ImplCallAsync(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any, subId?: string)
	{
		SocketManager.InvokeSend(true, false, cmdId, args, false, onResult, onError, thisObject, subId);
	}
	/**
	 * 独占隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 * 回调执行后会自动移除
	 */
	public static ImplCallAsyncDiscRetry(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any, subId?: string)
	{
		SocketManager.InvokeSend(true, true, cmdId, args, false, onResult, onError, thisObject, subId);
	}

	//------------------------------------------------------------------
	// 
	//------------------------------------------------------------------

	private static InvokeSend(isSole: boolean, isDiscRetry: boolean, cmdId: string, args: any = null, isShowLoading: boolean, onResult?: Function, onError?: Function, thisObject?: any, subId?: string)
	{
		if (SocketManager._socket)
		{
			if (SocketManager._socket.enabledSend)
			{
				if (isShowLoading)
				{
					UIManager.showPanel(UIModuleName.LoadingPanel, true);
				}
			}
			else
			{
				game.Console.log("禁止发送:" + cmdId);
			}
			SocketManager._lastSendTime = Date.now();
			SocketManager._socket.InvokeSend(isSole, isDiscRetry, cmdId, args, onResult, onError, thisObject, subId);
		}
	}

	/// <summary>
	/// 服务器返回错误码事件，全局的
	/// </summary>
	public static OnResultError: game.DelegateDispatcher = new game.DelegateDispatcher();
	/// <summary>
	/// 进入游戏错误
	/// </summary>
	public static OnEnterError: game.DelegateDispatcher = new game.DelegateDispatcher();
	/// <summary>
	/// socket连接成功
	/// </summary>
	public static OnConnect: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 重连同步
	 */
	public static OnReconnectSynchronize: game.DelegateDispatcher = new game.DelegateDispatcher();

	//------------------------------------------------------------------
	// 
	//------------------------------------------------------------------

	private static OnResult(result: game.SpRpcResult)
	{
		SocketManager._lastTimestamp = TimeManager.GetServerUtcSecondstamp();
		SocketManager._lastSendTime = undefined;
		if (result.op == game.SpRpcOp.Response)
		{
			//客户端请求的返回
			// SocketManager._heartbeatTime = egret.getTimer(); //move todo
			UIManager.closePanel(UIModuleName.LoadingPanel);
			if (!game.StringUtil.isNullOrEmpty(result.error))
			{
				// if (result.error == SocketManager.ResetRoleInfoErrorCode)
				// {
				// 	//当发送给服务器成功，在服务器返回之前断线，然后重连请求一样的session时候，重新拉数据
				// 	GameManager.initServerHandler.AfreshGetInfo();
				// }
				// else
				// {
				if (!SocketManager._ignoreError || SocketManager._ignoreError.indexOf(result.error) == -1)
				{
					if (SocketManager._isEntering)
					{
						NetUtil.AlertResultError(result, SocketManager.OnClickEnterError);
					}
					else
					{
						NetUtil.AlertResultError(result);
						SocketManager.OnResultError.dispatch(result.error);
					}
				}
				let title = game.StringUtil.format("protocol:{0}", result.cmdId);
				game.Console.log(game.StringUtil.format("{0},描述：{1}", title, result.error));
				// }
			}
		}
		else
		{
			//服务器主动通知返回
			//
			//如果在别的地方登录，就不提示服务器断开连接的错误提示了
			if (result.cmdId == Command.System_Response_Login_2013)
			{
				UIManager.closePanel(UIModuleName.LoadingPanel);
				SocketManager.Close();
				AlertManager.showAlert("该账号在其它地方登录，确定回到登录界面。", SocketManager.OnClickReLogin);
			}
			if (SocketManager._recconectServerPushSession != undefined && result.session - SocketManager._recconectServerPushSession > 1)
			{
				SocketManager._recconectServerPushSession = undefined;
				egret.log("抛送数据同步事件1");
				SocketManager.OnReconnectSynchronize.dispatch();
			}
		}
	}
	private static OnMessage(msg: game.SocketMessage)
	{
		game.Console.logSocket(msg);
		SocketManager._lastSendTime = undefined;
		switch (msg.type)
		{
			case game.SocketMessageType.Connect:
				SocketManager._connectHandler.stop();
				UIManager.closePanel(UIModuleName.LoadingPanel);
				game.Console.log("游戏服务器连接成功");
				SocketManager._autoReconnect = true;
				SocketManager._socket.InvokeDiscRetry();
				if (SocketManager._isReconnecting)
				{
					SocketManager._recconectServerPushSession = SocketManager._socket.requestSessionMax;
					egret.log("发送重连协议" + SocketManager._socket.requestSessionMax);
					SocketManager._isReconnecting = false;
					SocketManager._socket.SimpleSend(Command.System_GetNotice_3004, { sessionId: SocketManager._socket.requestSessionMax });
				}
				SocketManager.StartHeartbeat();
				SocketManager.OnConnect.dispatch();
				break;
			case game.SocketMessageType.Failing: //连接断开
				SocketManager._connectHandler.stop();
				UIManager.closePanel(UIModuleName.LoadingPanel);
				SocketManager.Close();
				NetUtil.AlertFailing(msg.errorCode, SocketManager.OnClickReLogin);
				break;
			case game.SocketMessageType.NetworkError: //网络异常
				UIManager.closePanel(UIModuleName.LoadingPanel);
				if (SocketManager.VerifyReLogin())
				{
					SocketManager.Close();
					NetUtil.AlertNetworkErrorReLogin(msg.errorCode, SocketManager.OnClickReLogin);
				}
				else
				{
					SocketManager._connectHandler.errorConnectHandler();
					if (SocketManager._connectHandler.isTimeout)
					{
						if (SocketManager._isEntering)
						{
							SocketManager.Close();
							NetUtil.AlertConnectError(msg.errorCode, SocketManager.OnClickReconnect);
						}
						else
						{
							SocketManager.Close();
							//每次连接成功后，都可以断线自动重连一次
							if (SocketManager._autoReconnect)
							{
								SocketManager._delayId = egret.setTimeout(SocketManager.delayAutoReconnect, this, 2000);
							}
							else
							{
								NetUtil.AlertConnectError(msg.errorCode, SocketManager.OnClickReconnect);
							}
						}
					}
				}
				break;
			case game.SocketMessageType.HandshakeError:
				UIManager.closePanel(UIModuleName.LoadingPanel);
				SocketManager.Close();
				NetUtil.AlertNetworkErrorReLogin(msg.errorCode, SocketManager.OnClickReLogin);
				break;
			case game.SocketMessageType.SendError:
				UIManager.closePanel(UIModuleName.LoadingPanel);
				//
				let alertInfo: AlertInfo = new AlertInfo();
				alertInfo.title = "发送协议出错";
				alertInfo.subTitle = msg.errorCode;
				alertInfo.message = msg.message;
				AlertManager.showAlertInfo(alertInfo);
				break;
			case game.SocketMessageType.NotInitialized:
				UIManager.closePanel(UIModuleName.LoadingPanel);
				//
				alertInfo = new AlertInfo();
				alertInfo.title = "协议初始化异常";
				alertInfo.subTitle = msg.errorCode;
				alertInfo.message = msg.message;
				AlertManager.showAlertInfo(alertInfo);
				break;
		}
	}

	//------------------------------------------------------------------
	// 
	//------------------------------------------------------------------

	private static delayAutoReconnect()
	{
		SocketManager._autoReconnect = false;
		SocketManager.Reconnect();
	}
	/// <summary>
	/// 验证是否需要重新登录
	/// </summary>
	/// <returns></returns>
	private static VerifyReLogin(): boolean
	{
		// if (TimeManager.GetServerUtcSecondstamp() - SocketManager._lastTimestamp < 270)//4分30秒 move todo目前没有登录失效一说
		// {
		// 	return false;
		// }
		// if (TimeManager.GetCurrentOnlineLength() < 1500)//25分钟
		// {
		// 	return false;
		// }
		return true;
	}
	private static OnClickReLogin(data: any)
	{
		if (SocketManager._isEntering)
		{
			SocketManager.OnEnterError.dispatch();
		}
		else
		{
			GameManager.reload();
		}
	}
	private static OnClickReconnect(data: any)
	{
		if (SocketManager._isEntering)
		{
			SocketManager.OnEnterError.dispatch();
		}
		else
		{
			SocketManager.Reconnect();
		}
	}
	private static OnClickEnterError(data: any)
	{
		SocketManager.OnEnterError.dispatch();
	}

	//------------------------------------------------------------------
	// 心跳
	//------------------------------------------------------------------

	private static StartHeartbeat()
	{
		SocketManager._heartbeatTime = egret.getTimer();
		game.Tick.AddSecondsInvoke(SocketManager.OnTickHeartbeat, this);
	}
	private static StopHeartbeat()
	{
		game.Tick.RemoveSecondsInvoke(SocketManager.OnTickHeartbeat, this);
	}
	private static OnTickHeartbeat()
	{
		if (egret.getTimer() - SocketManager._heartbeatTime >= SocketManager.HeartbeatInterval)
		{
			SocketManager._heartbeatTime = egret.getTimer();
			SocketManager._socket.SimpleCall(Command.C2GW_ReqHeartBeat, {}, SocketManager.OnHeartbeatServer, null, this);
			// SocketManager._socket.SimpleCall(Command.GW2C_RetHeartBeat, { sessionId: SocketManager._socket.requestSessionMax }, SocketManager.OnHeartbeatServer, null, this);
		}
	}
	private static OnHeartbeatServer(result: game.SpRpcResult)
	{
		TimeManager.SetServerTimestamp((result.data as msg.GW2C_RetHeartBeat).time);
	}
}