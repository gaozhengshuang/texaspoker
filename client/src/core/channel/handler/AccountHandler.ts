
/// <summary>
/// qin自己内置的帐号系统处理
/// </summary>
class AccountHandler
{
	public Login(isAutoLogin: boolean)
	{
		AccountManager.Initialize(GameSetting.AppId, ChannelManager.channelType, ChannelManager.deviceId, false);
		this.RemoveQinEvents();
		AccountManager.OnLoginCancel.addListener(this.OnQinLoginCancel, this);
		AccountManager.OnLoginSuccess.addListener(this.OnQinLoginSuccess, this);
		AccountManager.ShowLogin(isAutoLogin);
	}
	public Logout()
	{
		AccountManager.Logout();
		ChannelManager.sdk_Logout();
	}
	private RemoveQinEvents()
	{
		AccountManager.OnLoginCancel.removeListener(this.OnQinLoginCancel, this);
		AccountManager.OnLoginSuccess.removeListener(this.OnQinLoginSuccess, this);
	}
	private OnQinLoginSuccess(data: any)
	{
		this.RemoveQinEvents();
		ChannelManager.OnTokenLoginSucceed.dispatch(data.token);
	}
	private OnQinLoginCancel()
	{
		this.RemoveQinEvents();
		ChannelManager.OnLoginFailed.dispatch();
	}
}