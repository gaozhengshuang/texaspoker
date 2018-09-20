/**
 * 账号信息条
 */
class LoginBar extends BasePanel
{
	public switchAccountButton: eui.Button;
	public accountLabel: eui.Label;
	public enterBtn: eui.Button;

	private _serverInfo: ServerInfo;

	public constructor()
	{
		super();
		this.isTween = true;
		this.setSkinName(UIModuleName.LoginBar);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		let loginInfo: LoginInfo = appendData;
		if (loginInfo.ServerList != null && loginInfo.ServerList.length > 0)
		{
			//显示最后登录的服务器
			if (loginInfo.LastSId > 0)
			{
				for (let i: number = 0; i < loginInfo.ServerList.length; i++)
				{
					let item: ServerInfo = loginInfo.ServerList[i];
					if (item.id == loginInfo.LastSId)
					{
						this._serverInfo = item;
						break;
					}
				}
			}
			if (this._serverInfo == null)
			{
				// loginInfo.ServerList.Sort(LoginUtil.OnSortServerInfo);
				//显示没有维护的服务器
				for (let i: number = loginInfo.ServerList.length - 1; i >= 0; i--)
				{
					let item: ServerInfo = loginInfo.ServerList[i];
					if (item.status != 1)
					{
						this._serverInfo = item;
						break;
					}
				}
				//显示最后一台服务器
				if (this._serverInfo == null)
				{
					this._serverInfo = loginInfo.ServerList[loginInfo.ServerList.length - 1];
				}
			}
		}

		//平台登录则是平台帐号id，qin登录特殊处理显示平台帐号名
		if (ChannelLoginType.IsViewAccount(ChannelManager.loginType))
		{
			this.accountLabel.text = ChannelManager.loginType == ChannelLoginType.Qin ? AccountManager.account : LoginManager.account;
		}
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.switchAccountButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchClickHandler, this);
		this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterClickHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.switchAccountButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.switchClickHandler, this);
		this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterClickHandler, this);
	}
	private switchClickHandler(event: egret.TouchEvent)
	{
		// if (PlatSettingDefined.GetInstance().isSwitchAccount || PlatSettingDefined.GetInstance().IsBuiltLogin(ChannelManager.channelType))
		// {
		//     UIManager.DispatchEvent(this, UIModuleEvent.OnChanged);
		// }
		SoundManager.playButtonEffect(event.target);
		UIManager.dispatchEvent(UIModuleName.LoginBar, UIModuleEvent.CHANGE);
	}
	private enterClickHandler(event: egret.TouchEvent)
	{
		//  if (this._serverInfo != null)
		// {
		// if (ServerIsMaintain())
		// {
		//     UIManager.ShowFloatTips(LangDefined.GetText("服务器维护中！"));
		//     return;
		// }
		SoundManager.playButtonEffect(event.target);
		UIManager.dispatchEvent(UIModuleName.LoginBar, UIModuleEvent.COMPLETE, this._serverInfo);
		super.onCloseBtnClickHandler(event);
	}
}