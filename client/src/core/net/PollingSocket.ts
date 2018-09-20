/**
* socket轮询连接处理
*/
class PollingSocket
{
	/**
	 * 类型 1.登录 2.游戏
	 */
	private _type: number;
	private _initAdress: string;

	public address: string;
	public port: number;
	public get isTimeout(): boolean
	{
		return this._pollingRequest.isTimeout;
	}
	private _pollingRequest: PollingRequest;
	/**
	 * 重连
	 */
	public onConnectDelegate: qin.Delegate;
	/**
	 * 超次数
	 */
	public onTimeoutDelegate: qin.Delegate;
	private _isShowLoading: boolean;

	constructor(type: number, connect: qin.Delegate, timeout: qin.Delegate)
	{
		this._type = type;
		this.onConnectDelegate = connect;
		this.onTimeoutDelegate = timeout;
		this._pollingRequest = new PollingRequest(qin.Delegate.getOut(this.onConnectHandler, this), qin.Delegate.getOut(this.onTimeOutHandler, this));
	}
	/**
 	* 是否轮询
 	*/
	public get isPolling(): boolean
	{
		return this._pollingRequest.isPolling;
	}
	/**
 	* 游戏连接
 	*/
	public gameConnect(address: string, port: number, isShowLoading: boolean)
	{
		this._initAdress = address;
		this.port = port;
		this._isShowLoading = isShowLoading;
		this.setGameAdress();
		this.onEnable();
		if (this.onConnectDelegate)
		{
			this.onConnectDelegate.invoke(isShowLoading);
		}
	}
	/**
	 * 游戏重连
	 */
	public gameReconnect()
	{
		this._pollingRequest.changeAdressIndex();
		this.gameConnect(this._initAdress, this.port, this._isShowLoading);
	}
	/**
	 * 登录连接
	 */
	public loginConnect()
	{
		this.setLoginAdressPort();
		this.onEnable();
		if (this.onConnectDelegate)
		{
			this.onConnectDelegate.invoke();
		}
	}
	private onEnable()
	{
		this._pollingRequest.connect(false);
	}
	public stop()
	{
		this._pollingRequest.stop();
	}
	/**
	 * 设置登录地址端口
	 */
	private setLoginAdressPort()
	{
		this.address = ProjectDefined.GetInstance().getLoginAddress(this._pollingRequest.isIntranet);
		if (this._pollingRequest.isPolling)
		{
			let index: number = this._pollingRequest.addressIndex;
			let repStr: string = qin.StringConstants.Empty;
			if (index > 0)
			{
				repStr = index.toString();
			}
			this.address = this.address.replace(qin.StringConstants.Asterisk, repStr);
		}
		this.port = ProjectDefined.GetInstance().getLoginPort(this._pollingRequest.isIntranet, VersionManager.isServerTest);
	}
	/**
	 * 设置游戏地址
	 */
	private setGameAdress()
	{
		this.address = ProjectDefined.GetInstance().getLoginAddress(this._pollingRequest.isIntranet);
		if (this._pollingRequest.isPolling)
		{
			let index: number = this._pollingRequest.addressIndex;
			let repStr: string = qin.StringConstants.Empty;
			if (index > 0)
			{
				repStr = index.toString();
			}
			if (this._initAdress) //使用服务器传入的地址
			{
				this.address = this._initAdress.replace(qin.StringConstants.Asterisk, repStr);
			}
			else
			{ 
				this.address = this.address.replace(qin.StringConstants.Asterisk, repStr); //使用登录的地址
			}
		}
	}
	/**
	 * 超时自动重连
	 */
	private onConnectHandler(event: egret.Event)
	{
		if (this._type == 1)
		{
			this.setLoginAdressPort();
		}
		else if (this._type == 2)
		{
			this.setGameAdress();
		}
		this._pollingRequest.resetTime();
		if (this.onConnectDelegate)
		{
			this.onConnectDelegate.invoke(this._isShowLoading);
		}
	}
	private onTimeOutHandler(event: egret.Event)
	{
		this.stop(); //超次数停止轮询
		if (this.onTimeoutDelegate)
		{
			this.onTimeoutDelegate.invoke();
		}
	}
	public errorConnectHandler()
	{
		this._pollingRequest.errorConnectHandler();
	}
}