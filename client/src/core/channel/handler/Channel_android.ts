class Channel_android extends ChannelBase
{
	public Login(loginType: string, isAutoLogin: boolean)
	{
		if (loginType == ChannelLoginType.Weixin)
		{
			//微信登录
			if (isAutoLogin)
			{
				let token: string = PrefsManager.getLoginToken();
				if (token)
				{
					ChannelManager.OnTokenLoginSucceed.dispatch(WxAuthorizeType.App + '###2###' + token);
					return;
				}
			}
			egret.ExternalInterface.call(ExtFuncName.Login, loginType);
		}
		else if (loginType == ChannelLoginType.Account || ChannelManager.loginType == ChannelLoginType.IntranetAccount) //微端测试使用
		{
			this.accountLogin(isAutoLogin);
		}
	}
	private accountLogin(isAutoLogin: boolean): void
	{
		let account: string = PrefsManager.getValue(PrefsManager.Login_Account);
		let password: string = PrefsManager.getValue(PrefsManager.Login_Password);
		if (isAutoLogin && account && password)
		{
			ChannelManager.DispatchAccountLoginSucceed(account, password);
		}
		else
		{
			if (!UIManager.isShowPanel(UIModuleName.LoginLocalPanel))
			{
				UIManager.showPanel(UIModuleName.LoginLocalPanel);
			}
		}
	}
	public PaySend(payState: number, awardId: number, serverId: number, orderId: string, price: number, productName: string)
	{
		ChannelUtil.openWebPay(serverId, orderId, price, productName, awardId);
	}
	public share(type: string, title: string, message: string, inviteCode?: string)
	{
		let data: Object = {};
		data['type'] = type;
		data['title'] = title;
		data['message'] = message;
		data['url'] = ProjectDefined.GetInstance().getShareWebUrl(GameSetting.AppId, inviteCode);
		egret.ExternalInterface.call(ExtFuncName.Share, JSON.stringify(data));
	}
	public imageSelect(size: number, quality: number): void
	{
		let obj: Object = { size: size, quality: quality };
		egret.ExternalInterface.call(ExtFuncName.ImageSelect, JSON.stringify(obj));
	}
	public openURL(url: string): void
	{
		egret.ExternalInterface.call(ExtFuncName.OpenURL, url);
	}
	public copyToPastboard(data: string)
	{
		egret.ExternalInterface.call(ExtFuncName.CopyToPastboard, data);
	}
}
