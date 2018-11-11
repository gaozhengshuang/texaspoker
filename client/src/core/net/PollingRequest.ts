/**
 * 轮循请求处理器
 */
class PollingRequest
{
	private _addressIndex: number = 0;
	public get addressIndex(): number
	{
		return this._addressIndex;
	}
	private _startConnectTime: number;
	private readonly _outTime: number = 5000;
	/**
 	* 轮询连接次数
 	*/
	private _connectTimes: number = 0;
	public isTimeout: boolean;
	/**
	 * 重连
 	 */
	public onConnectDelegate: game.Delegate;
	/**
	 * 超次数
	 */
	public onTimeoutDelegate: game.Delegate;

	public constructor(connect: game.Delegate, timeout: game.Delegate)
	{
		this.onConnectDelegate = connect;
		this.onTimeoutDelegate = timeout;
	}

	public get isIntranet(): boolean
	{
		return ChannelManager.loginType == ChannelLoginType.IntranetAccount; // || ChannelManager.loginType == ChannelLoginType.IntranetGuest //move todo
	}
	/**
	 * 是否轮询
	 */
	public get isPolling(): boolean
	{
		return !this.isIntranet;
	}
	public connect(isAutoConnect: boolean = true)
	{
		this.resetTime();
		game.Tick.addFrameInvoke(this.timing, this);
		if (this.onConnectDelegate && isAutoConnect)
		{
			this.onConnectDelegate.invoke();
		}
	}
	public resetTime()
	{
		this._startConnectTime = egret.getTimer();
	}
	public stop()
	{
		game.Tick.removeFrameInvoke(this.timing, this);
	}
	//超时自动轮询
	private timing(event: egret.Event)
	{
		let offsetTime = egret.getTimer() - this._startConnectTime;
		if (offsetTime > this._outTime)
		{
			this.nextPolling(true);
			if (!this.isTimeout && this.onConnectDelegate)
			{
				this.resetTime();
				this.onConnectDelegate.invoke();
			}
		}
	}
	public changeAdressIndex()
	{
		this._addressIndex++;
		if (this._addressIndex > ProjectDefined.pollingLimit)
		{
			this._addressIndex = 0;
		}
	}
	public nextPolling(isTimesOutDispatch: boolean)
	{
		if (this.isPolling)
		{
			this.changeAdressIndex();
			this._connectTimes++;
			if (this._connectTimes > ProjectDefined.pollingLimit)
			{
				this._connectTimes = 0;
				this.isTimeout = true;
				this.stop();
				if (this.onTimeoutDelegate && isTimesOutDispatch)
				{
					this.onTimeoutDelegate.invoke();
				}
			}
			else
			{
				this.isTimeout = false;
			}
		}
		else
		{
				this.isTimeout = true;
		}
	}
	//连接错误手动执行轮询
	public errorConnectHandler()
	{
		if (this.isPolling)
		{
			this.stop(); //停止自动轮询
			this.nextPolling(false);
			if (!this.isTimeout && this.onConnectDelegate)
			{
				this.onConnectDelegate.invoke();
			}
		}
		else
		{
			this.isTimeout = true; //非正式服直接超时，点击重连
		}
	}
}