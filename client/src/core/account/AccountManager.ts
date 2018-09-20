
/// <summary>
/// 帐号系统管理类
/// </summary>
class AccountManager
{
	//------------------------------------------------------------------
	// ui
	//------------------------------------------------------------------
	/// <summary>
	/// 用户中心
	/// </summary>
	public static ShowUserCenter()
	{
		UIManager.showPanel(UIModuleName.BindAccountPanel);
	}
	/// <summary>
	/// 登录
	/// </summary>
	/// <param name="isAuto">是否自动登录</param>
	public static ShowLogin(isAuto: boolean, isBind: boolean = false)
	{
		//显示登录界面
		if (isAuto)
		{
			let account: string = AccountManager.AutoLogin();
			if (qin.StringUtil.isNullOrEmpty(account) == false)
			{
				UIManager.showPanel(UIModuleName.AutoLoginPanel);
			}
			else
			{
				UIManager.showPanel(UIModuleName.LoginTelPanel);
			}
		} else
		{
			if (!isBind)
			{
				UIManager.showPanel(UIModuleName.LoginTelPanel);
			}
		}
	}
	/**
	 * 显示绑定面板
	 */
	public static showBind()
	{
		UIManager.showPanel(UIModuleName.BindAccountPanel);
	}
	//------------------------------------------------------------------
	// logic
	//------------------------------------------------------------------

	private static _account: string;
	/// <summary>
	/// 帐号
	/// </summary>
	public static get account(): string
	{

		return AccountManager._account;
	}
	private static _uid: string;
	/// <summary>
	/// 帐号id
	/// </summary>
	public static get uid(): string
	{
		return AccountManager._uid;
	}
	private static _mno: string;
	/// <summary>
	/// 手机号码
	/// </summary>
	public static get mno(): string
	{
		return AccountManager._mno;
	}
	private static _startStr: string = "*******";
	/// <summary>
	/// 获取格式化显示的手机号码
	/// </summary>
	public static get formatMno(): string
	{
		if (qin.StringUtil.isNullOrEmpty(AccountManager._mno))
		{
			return AccountManager._startStr;
		}
		if (AccountManager._mno.length < 4)
		{
			return AccountManager._startStr + AccountManager._mno;
		}
		return AccountManager._startStr + AccountManager._mno.substring(AccountManager._mno.length - 4);
	}
	private static _token: string;
	/// <summary>
	/// 是否绑定手机
	/// </summary>
	public static get isBindPhone(): boolean
	{
		return qin.StringUtil.isNullOrEmpty(AccountManager._mno) == false;
	}
	public static Logout()
	{
		AccountManager._account = null;
		AccountManager._uid = null;
		AccountManager._mno = null;
		AccountManager._token = null;
	}
	private static _deviceId: string;
	private static _appId: string;
	private static _channel: string;
	private static _usePhone: boolean;
	/// <summary>
	/// 是否使用手机
	/// </summary>
	public static get isUsePhone(): boolean
	{
		return AccountManager._usePhone;
	}
	private static addField(key: string, value: string, connectSymbol: string = "&"): string
	{
		return connectSymbol + key + "=" + value;
	}
	/// <summary>
	/// 初始化
	/// </summary>
	/// <param name="appId"></param>
	/// <param name="channel"></param>
	/// <param name="deviceId"></param>
	/// <param name="usePhone"></param>
	public static Initialize(appId: string, channel: string, deviceId: string, usePhone: boolean = true)
	{
		AccountManager._appId = appId;
		AccountManager._channel = channel;
		AccountManager._deviceId = deviceId;
		AccountManager._usePhone = usePhone;
	}
	/// <summary>
	/// 自动登录
	/// </summary>
	/// <returns></returns>
	public static AutoLogin(): string
	{
		let list: Array<any> = AccountPlayerPrefs.GetAccountList();
		if (list != null && list.length > 0)
		{
			let info: any = list[0];
			if (info.type == AccountPwdType.token)
			{
				AccountManager.TokenLogin(info.token, info.account);
			} else
			{
				AccountManager.LoginCoroutine(true, AccountHttpUrl.login, info.account, info.pw, true);
			}
			return info.account;
		}
		return null;
	}
	private static parseData(account: string, data: any, md5pw: string, type: string = AccountPwdType.pw)
	{
		AccountManager._account = account;
		AccountManager._uid = data["uid"];
		AccountManager._mno = data["mno"];
		AccountManager._token = data["token"];
		AccountPlayerPrefs.InsertAccount(AccountManager._account, md5pw, type);
	}
	private static getRequestData(account: string, md5pw: string): string
	{
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("appid", AccountManager._appId, qin.StringConstants.Empty);
		data += AccountManager.addField("account", account);
		data += AccountManager.addField("pw", md5pw);
		data += AccountManager.addField("did", AccountManager._deviceId);
		data += AccountManager.addField("channel", AccountManager._channel);
		return data;
	}
	/// <summary>
	/// 登录
	/// </summary>
	/// <param name="account"></param>
	/// <param name="pw"></param>
	public static Login(account: string, pw: string, isMd5: boolean, isBind: boolean = false)
	{
		AccountManager.OnLoadingStart.dispatch();
		AccountManager.LoginCoroutine(false, AccountHttpUrl.login, account, pw, isMd5, isBind);
	}
	private static LoginCoroutine(isAuto: boolean, url: string, account: string, pw: string, isMd5: boolean, isBind: boolean = false)
	{
		let md5pw: string = isMd5 ? pw : qin.Crypt.hex_md5(pw);
		let data: string = AccountManager.getRequestData(account, md5pw);
		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					AccountManager.parseData(account, table, md5pw);
					AccountManager.OnLoginSuccess.dispatch({ token: AccountManager._token, uid: AccountManager._uid });
				}
				else if (code == AccountCode.NoPw)
				{
					AccountManager.OnNoPw.dispatch();
				} else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
					AccountManager.ShowLogin(false, isBind);
				}
			}
			else
			{
				AccountManager.ShowLogin(false, isBind);
			}
		}, () =>
			{
				AccountManager.ShowLogin(false, isBind);
			}, data);
	}
	/// <summary>
	/// 帐号注册 没用到
	/// </summary>
	/// <param name="account"></param>
	/// <param name="pw"></param>
	public static Register(account: string, pw: string)
	{
		AccountManager.OnLoadingStart.dispatch();
		AccountManager.RegisterCoroutine(AccountHttpUrl.register, account, pw);
	}
	/**
	 * 没用到
	 */
	private static RegisterCoroutine(url: string, account: string, pw: string)
	{
		let md5pw: string = qin.Crypt.hex_md5(pw);
		let data: string = AccountManager.getRequestData(account, md5pw);
		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					AccountManager.parseData(account, table, md5pw);
					AccountManager.OnRegisterSuccess.dispatch({ token: AccountManager._token, uid: AccountManager._uid, account: AccountManager._account, pw: pw });
				}
				else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
				}
			}
		}, null, data);
	}
	/// <summary>
	/// 手机注册
	/// </summary>
	/// <param name="mno"></param>
	/// <param name="again"></param>
	public static PhoneRegister(mno: string, again: boolean = false)
	{
		AccountManager.OnLoadingStart.dispatch();
		AccountManager.PhoneRegisterCoroutine(mno, again);
	}
	private static PhoneRegisterCoroutine(mno: string, again: boolean)
	{
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("mno", mno, qin.StringConstants.Empty);
		data += AccountManager.addField("appid", AccountManager._appId);
		let url: string = AccountHttpUrl.phone_register;
		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					if (again)
					{
						AccountManager.OnAgainMobileCode.dispatch();
					}
					else
					{
						AccountManager.OnPhoneRegister.dispatch(mno);
					}
				}
				else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
				}
			}
		}, null, data);
	}
	/// <summary>
	/// 手机注册验证
	/// </summary>
	/// <param name="mno"></param>
	/// <param name="vcode"></param>
	/// <param name="pw"></param>
	public static PhoneRegisterVerify(mno: string, vcode: string, pw: string)
	{
		AccountManager.OnLoadingStart.dispatch();
		AccountManager.PhoneRegisterVerifyCoroutine(mno, vcode, pw);
	}
	private static PhoneRegisterVerifyCoroutine(mno: string, vcode: string, pw: string)
	{
		let md5pw: string = qin.Crypt.hex_md5(pw);
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("appid", AccountManager._appId, qin.StringConstants.Empty);
		data += AccountManager.addField("mno", mno);
		data += AccountManager.addField("vcode", vcode);
		data += AccountManager.addField("pw", md5pw);
		data += AccountManager.addField("did", AccountManager._deviceId);
		data += AccountManager.addField("channel", AccountManager._channel);

		let url: string = AccountHttpUrl.phone_register_verify;

		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					AccountManager.parseData(mno, table, md5pw);
					AccountManager.OnRegisterSuccess.dispatch({ token: AccountManager._token, uid: AccountManager._uid, pw: pw });
				}
				else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
				}
			}
		}, null, data);
	}
	/// <summary>
	/// 绑定/解绑手机(账号系统的绑定手机，如原来的账号系统并不是手机号，需要绑定手机号) 没用到
	/// </summary>
	/// <param name="mno"></param>
	public static PhoneBind(mno: string, again: boolean = false)
	{
		AccountManager.OnLoadingStart.dispatch();
		AccountManager.PhoneBindCoroutine(AccountManager._account, mno, again);
	}
	/**
	 * 没用到
	 */
	private static PhoneBindCoroutine(account: string, mno: string, again: boolean)
	{
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("account", account, qin.StringConstants.Empty);
		data += AccountManager.addField("mno", mno);
		data += AccountManager.addField("appid", AccountManager._appId);
		let url: string = AccountHttpUrl.phone_bind;

		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					if (again)
					{
						AccountManager.OnAgainMobileCode.dispatch();
					}
					else
					{
						//isBindPhone == false 为绑定手机，反之为解绑手机
						AccountManager.OnPhoneBind.dispatch({ mno: mno, isBindPhone: AccountManager.isBindPhone == false });
					}
				}
				else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
				}
			}
		}, null, data);
	}
	/// <summary>
	/// 绑定手机验证 没用到
	/// </summary>
	/// <param name="vcode"></param>
	/// <param name="pw"></param>
	public static PhoneBindVerify(vcode: string, pw: string)
	{
		AccountManager.OnLoadingStart.dispatch();
		AccountManager.PhoneBindVerifyCoroutine(vcode, AccountManager._account, pw);
	}
	/**
	 * 没用到
	 */
	private static PhoneBindVerifyCoroutine(vcode: string, account: string, pw: string)
	{
		let md5pw: string = qin.Crypt.hex_md5(pw);
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("vcode", vcode, qin.StringConstants.Empty);
		data += AccountManager.addField("account", account);
		data += AccountManager.addField("pw", md5pw);
		data += AccountManager.addField("appid", AccountManager._appId);
		let url: string = AccountHttpUrl.phone_bind_verify;

		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					AccountManager._mno = table["mno"];
					AccountManager.OnPhoneBindVerify.dispatch(true);
					AccountUtil.ShowPhoneBindFloatTips(true);
				}
				else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
				}
			}
		}, null, data);
	}
	/// <summary>
	/// 解绑手机验证 没用到
	/// </summary>
	/// <param name="vcode"></param>
	public static PhoneUnbindVerify(vcode: string)
	{
		AccountManager.OnLoadingStart.dispatch();
		AccountManager.PhoneUnbindVerifyCoroutine(vcode, AccountManager._account);
	}
	/**
	 * 没用到
	 */
	private static PhoneUnbindVerifyCoroutine(vcode: string, account: string)
	{
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("vcode", vcode, qin.StringConstants.Empty);
		data += AccountManager.addField("account", account);
		data += AccountManager.addField("appid", AccountManager._appId);
		let url: string = AccountHttpUrl.phone_unbind_verify;

		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					AccountManager._mno = null;
					AccountManager.OnPhoneBindVerify.dispatch();
					AccountUtil.ShowPhoneBindFloatTips(false);
				}
				else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
				}
			}
		}, null, data);
	}
	/// <summary>
	/// 修改密码 没用到
	/// </summary>
	/// <param name="pw">旧密码</param>
	/// <param name="pw2">新密码</param>
	public static ModifyPassword(oldpw: string, pw: string)
	{
		AccountManager.OnLoadingStart.dispatch();
		AccountManager.ModifyPasswordCoroutine(AccountManager._account, oldpw, pw);
	}
	/**
	 * 没用到
	 */
	private static ModifyPasswordCoroutine(account: string, oldpw: string, pw: string)
	{
		let md5pw: string = qin.Crypt.hex_md5(pw);
		let md5oldpw: string = qin.Crypt.hex_md5(oldpw);
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("account", account, qin.StringConstants.Empty);
		data += AccountManager.addField("pw", md5oldpw);
		data += AccountManager.addField("pw2", md5pw);
		data += AccountManager.addField("appid", AccountManager._appId);
		let url: string = AccountHttpUrl.modify_password;

		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					AccountPlayerPrefs.InsertAccount(account, md5pw);
					AccountManager.OnModifyPassword.dispatch();
					AccountUtil.ShowModifyPwFloatTips();
				}
				else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
				}
			}
		}, null, data);
	}
	/// <summary>
	/// 手机找回密码
	/// </summary>
	/// <param name="account"></param>
	/// <param name="mno"></param>
	/// <param name="again"></param>
	public static PhoneFindPassword(account: string, mno: string, again: boolean = false)
	{
		AccountManager.OnLoadingStart.dispatch();
		AccountManager.PhoneFindPasswordCoroutine(account, mno, again);
	}
	private static PhoneFindPasswordCoroutine(account: string, mno: string, again: boolean)
	{
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("account", account, qin.StringConstants.Empty);
		data += AccountManager.addField("mno", mno);
		data += AccountManager.addField("appid", AccountManager._appId);
		let url: string = AccountHttpUrl.phone_find_password;

		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					if (again)
					{
						AccountManager.OnAgainMobileCode.dispatch();
					}
					else
					{
						AccountManager.OnPhoneFindPassword.dispatch({ account: account, mno: mno });
					}
				}
				else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
				}
			}
		}, null, data);
	}
	/// <summary>
	/// 手机修改密码
	/// </summary>
	/// <param name="vcode"></param>
	/// <param name="account"></param>
	/// <param name="pw"></param>
	public static PhoneModifyPassword(vcode: string, account: string, pw: string)
	{
		AccountManager.OnLoadingStart.dispatch();
		AccountManager.PhoneModifyPasswordCoroutine(vcode, account, pw);
	}
	private static PhoneModifyPasswordCoroutine(vcode: string, account: string, pw: string)
	{
		let md5pw: string = qin.Crypt.hex_md5(pw);
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("vcode", vcode, qin.StringConstants.Empty);
		data += AccountManager.addField("account", account);
		data += AccountManager.addField("pw", md5pw);
		data += AccountManager.addField("appid", AccountManager._appId);
		let url: string = AccountHttpUrl.phone_modify_password;

		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					AccountPlayerPrefs.InsertAccount(account, md5pw);
					AccountManager.OnPhoneModifyPassword.dispatch();
					AccountUtil.ShowModifyPwFloatTips();
				}
				else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
				}
			}
		}, null, data);
	}
	/**
	 * 手机验证码登录
	*/
	public static PhoneSmsLogin(mno: string)
	{
		AccountManager.OnLoadingStart.dispatch();
		AccountManager.PhoneSmsLoginCoroutine(mno);
	}
	private static PhoneSmsLoginCoroutine(mno: string)
	{
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("mno", mno, qin.StringConstants.Empty);
		data += AccountManager.addField("appid", AccountManager._appId);
		let url: string = AccountHttpUrl.phone_sms_login;

		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					AccountManager.OnPhoneSmsLogin.dispatch(mno);
				}
				else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
				}
			}
		}, null, data);
	}
	/**
	 * 手机验证码登录验证
	*/
	public static PhoneSmsLoginVerify(vcode: string, mno: string)
	{
		AccountManager.OnLoadingStart.dispatch();
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("mno", mno, qin.StringConstants.Empty);
		data += AccountManager.addField("vcode", vcode);
		data += AccountManager.addField("appid", AccountManager._appId);
		data += AccountManager.addField("did", AccountManager._deviceId);
		data += AccountManager.addField("channel", AccountManager._channel);
		let url: string = AccountHttpUrl.phone_sms_login_verify;

		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					let md5pw: string = table["app_token"];
					AccountManager.parseData(mno, table, md5pw, AccountPwdType.token);
					AccountManager.OnLoginSuccess.dispatch({ token: AccountManager._token, uid: AccountManager._uid });
				}
				else
				{
					AccountUtil.ShowCodeFloatTips(code, table["msg"]);
					AccountManager.ShowLogin(false);
				}
			} else
			{
				AccountManager.ShowLogin(false);
			}
		}, () =>
			{
				AccountManager.ShowLogin(false);
			}, data);
	}
	/**
	 *token登录
	*/
	public static TokenLogin(app_token: string, account: string)
	{
		AccountManager.OnLoadingStart.dispatch();
		let data: string = qin.StringConstants.Empty;
		data += AccountManager.addField("account", account, qin.StringConstants.Empty);
		data += AccountManager.addField("app_token", app_token);
		data += AccountManager.addField("appid", AccountManager._appId);
		data += AccountManager.addField("did", AccountManager._deviceId);
		data += AccountManager.addField("channel", AccountManager._channel);
		let url: string = AccountHttpUrl.phone_token_login;

		URLLoader.downloadContent(url, this, (result: any) =>
		{
			AccountManager.OnLoadingFinish.dispatch();
			let table: Object = AccountUtil.ResultToHashtable(result, url);
			if (table != null)
			{
				let code: string = table["code"];
				if (code == AccountCode.Success)
				{
					let md5pw: string = data["app_token"];
					AccountManager.parseData(account, table, md5pw, AccountPwdType.token);
					AccountManager.OnLoginSuccess.dispatch({ token: AccountManager._token, uid: AccountManager._uid });
				}
				else
				{
					AccountManager.ShowLogin(false);
				}
			} else
			{
				AccountManager.ShowLogin(false);
			}
		}, () =>
			{
				AccountManager.ShowLogin(false);
			}, data);
	}
	//------------------------------------------------------------------
	// event
	//------------------------------------------------------------------

	public static OnLoadingStart: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	public static OnLoadingFinish: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 选择页面
	/// </summary>
	public static OnSelectTab: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 重新获取验证码
	/// </summary>
	public static OnAgainMobileCode: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 登录成功
	/// </summary>
	public static OnLoginSuccess: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 注册成功
	/// </summary>
	public static OnRegisterSuccess: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 取消登录
	/// </summary>
	public static OnLoginCancel: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 手机注册
	/// </summary>
	public static OnPhoneRegister: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 绑定/解绑手机
	/// </summary>
	public static OnPhoneBind: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 手机绑定/解绑验证成功
	/// </summary>
	public static OnPhoneBindVerify: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 密码修改成功
	/// </summary>
	public static OnModifyPassword: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 手机找回密码
	/// </summary>
	public static OnPhoneFindPassword: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 手机修改密码成功
	/// </summary>
	public static OnPhoneModifyPassword: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 手机验证码登录发送验证码成功
	/// </summary>
	public static OnPhoneSmsLogin: qin.DelegateDispatcher = new qin.DelegateDispatcher();

	/// <summary>
	/// 账号没有密码广播
	/// </summary>
	public static OnNoPw: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}
