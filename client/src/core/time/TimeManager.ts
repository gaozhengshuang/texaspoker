/**
 * 时间管理
 */
class TimeManager
{
	private static _serverTimestamp: number = 0;//utc时间，当前服务器时间(秒)
	private static _loginTimestamp: number = 0;//utc时间，登录的服务器时间(秒)
	private static _timeZone: number;//服务器的时区差值(秒)
	private static _serverSyncTime: number;//客户端同步服务器记录时间(秒)
	/**
	 * 零点重置事件
	 */
	public static resetTime0Event: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 1970UTC
	 */
	public static readonly Utc1970: Date = new Date(1970, 0, 1, 0, 0, 0, 0);
	public static initialize(data: any)
	{
		if (data)
		{
			TimeManager._timeZone = 0;
			if (data["timezone"])
			{
				TimeManager._timeZone = data["timezone"];
			}
			TimeManager._loginTimestamp = 0;
			if (data["timestamp"])
			{
				TimeManager._loginTimestamp = data["timestamp"];
				TimeManager.SetServerTimestamp(data);
			}
		}
		SocketManager.AddCommandListener(Command.System_Push_ResetTime0_2015, TimeManager.onResetTime, this);
	}

	private static onResetTime(result: game.SpRpcResult)
	{
		TimeManager.resetTime0Event.dispatch();
	}

	public static SetServerTimestamp(data: any)
	{
		TimeManager._serverTimestamp = 0;
		if (data["timestamp"])
		{
			TimeManager._serverTimestamp = data["timestamp"];
		}
		TimeManager._serverSyncTime = Math.floor(Date.now() / 1000);
	}
	/**
	 * 登录时间
	 */
	public static get loginTimestamp(): number	
	{
		return TimeManager._loginTimestamp;
	}

	/**
	 * 获取当次登录后的在线时长(秒)
	 */
	public static GetCurrentOnlineLength(): number
	{
		return TimeManager.GetServerUtcTimestamp() - TimeManager._loginTimestamp;
	}
	/**
	 * 获取服务器时区差值(秒)
	 */
	public static GetServerTimeZone(): number
	{
		return TimeManager._timeZone;
	}
	/**
	 *  获取当前服务器UTC时间总秒数（UTC1970年到现在）
	 */
	public static GetServerUtcTimestamp(): number
	{
		if (TimeManager._serverTimestamp == 0)
		{
			return 0;
		}
		return TimeManager._serverTimestamp + (Math.floor(Date.now() / 1000) - TimeManager._serverSyncTime);
	}
	/**
	 * 获取服务器当前本地时间
	 */
	public static GetServerLocalDateTime(offsetHours: number = 0): Date
	{
		if (offsetHours == 0)
		{
			return new Date(TimeManager.GetServerUtcTimestamp() * 1000);
		}
		return new Date((TimeManager.GetServerUtcTimestamp() + offsetHours * 3600) * 1000);
	}
	/**
	 * 获取当日五点刷新时间点
	 */
	public static GetFiveRefreshLocalTime(): Date
	{
		let date = TimeManager.GetServerLocalDateTime();
		return new Date(date.getFullYear(), date.getMonth(), date.getDay(), 5);
	}
}