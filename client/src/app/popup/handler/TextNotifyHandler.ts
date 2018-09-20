/**
 * 文字公告
 */
class TextNotifyHandler
{
	private readonly ReloadThreshold: number = 1800 * 1000;//重新加载公告阀值
	//
	private _textNotifyTime: Date = new Date();
	private _textNotify: TextDefinition = null;
	private _isLoginNotifyed: boolean = false;
	public get isLoginNotifyed(): boolean
	{
		return this._isLoginNotifyed;
	}
	public set isLoginNotifyed(value: boolean)
	{
		this._isLoginNotifyed = value;
	}
	private createTextNotify()
	{
		if (this._textNotify == null)
		{
			this._textNotify = new TextDefinition();
			this._textNotify.title = "公  告";
		}
	}

	//------------------------------------------------------------------
	// 文字公告
	//------------------------------------------------------------------

	/**
	 * 显示文字公告
	 */
	public showTextNotify()
	{
		if (VersionManager.isSafe || game.System.isLocalhost)
		{
			this.onTextNotifyException();
			return;
		}
		if (!this._textNotify || Date.now() - this._textNotifyTime.getTime() > this.ReloadThreshold)
		{
			let url: string = ProjectDefined.GetInstance().getNoticeUrl(GameSetting.AppId);
			RES.getResByUrl(url, this.OnTextNotifyComplete, this, RES.ResourceItem.TYPE_TEXT);
		}
		else
		{
			UIManager.showPanel(UIModuleName.TextInfoPanel, this._textNotify);
		}
	}
	private OnTextNotifyComplete(data: string)
	{
		this._textNotifyTime.setTime(Date.now());
		if (data)
		{
			this.createTextNotify();
			this._textNotify.text = game.StringUtil.format(data, ChannelManager.appName);
			UIManager.showPanel(UIModuleName.TextInfoPanel, this._textNotify);
		}
		else
		{
			this.onTextNotifyException();
		}
	}
	private onTextNotifyException(error?: any)
	{
		UIManager.showFloatTips("当前没有公告");
	}

	//------------------------------------------------------------------
	// 登录公告
	//------------------------------------------------------------------
	private _checkNextCallBack: Function;
	private _checkNextThisObj: any;
	/**
	 * 显示登录公告
	 */
	public loginTextNotify(checkCallBack: Function, thisObj: any)
	{
		this._checkNextCallBack = checkCallBack;
		this._checkNextThisObj = thisObj;
		if ((VersionManager.isSafe || game.System.isLocalhost))
		{
			game.Console.log("编辑器运行和安全开关开启不自动加载公告");
			game.FuncUtil.invoke(this._checkNextCallBack, this._checkNextThisObj);
			return false;
		}
		let url: string = ProjectDefined.GetInstance().getNoticeUrl(GameSetting.AppId);
		RES.getResByUrl(url, this.onLoginNotifyComplete, this, RES.ResourceItem.TYPE_TEXT);
	}
	private onLoginNotifyComplete(data: string)
	{
		this._textNotifyTime.setTime(Date.now());
		if (data)
		{
			let storageData: any = PrefsManager.getValue(PrefsManager.LoginTextNotify);
			if (storageData)
			{
				try
				{
					storageData = JSON.parse(storageData);
				}
				catch (e)
				{
					game.Console.log("文字公告本地数据存储异常！storageData：" + storageData);
				}
			}
			let nowMd5: string = game.Crypt.hex_md5(data);
			let isShow: boolean = false;
			if (storageData)
			{
				if (storageData.md5 != nowMd5)
				{
					isShow = true;
				}
				else
				{
					let time = parseInt(storageData.time)
					if (Date.now() - time > 3600 * 3 * 1000)
					{
						isShow = true;
					}
				}
			}
			else
			{
				isShow = true;
			}
			if (isShow)
			{
				PrefsManager.setValue(PrefsManager.LoginTextNotify, JSON.stringify({ time: Date.now().toString(), md5: nowMd5 }));
				this.createTextNotify();
				if (!game.StringUtil.isNullOrEmpty(data))
				{
					this._textNotify.text = game.StringUtil.format(data, ChannelManager.appName);
				}
				else
				{
					this._textNotify.text = game.StringConstants.Empty;
				}
				UIManager.showPanel(UIModuleName.TextInfoPanel, this._textNotify);
			}
			else
			{
				game.FuncUtil.invoke(this._checkNextCallBack, this._checkNextThisObj);
			}
		}
		else
		{
			game.FuncUtil.invoke(this._checkNextCallBack, this._checkNextThisObj);
		}
	}
}