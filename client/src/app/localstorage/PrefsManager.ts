/**
 * 本地存储管理
 */
class PrefsManager
{
	/**
	 * 第三方登录返回的token，如果有直接使用登录
	 */
	private static Login_Token: string = "login_token";
	/**
	 * 第三方登录返回的token的有效期
	 */
	private static Login_Token_Expire: string = "login_token_expire";
	//
	/**
	 * 游戏内置的帐号系统登录帐号(不对用户使用)
	 */
	public static Login_Account: string = "login_account";
	/**
	 * 游戏内置的帐号系统登录密码(不对用户使用)
	 */
	public static Login_Password: string = "login_password";
	/**
	 * 当前登录类型
	 */
	public static Login_LoginType: string = "login_loginType";
	//声音
	public static Sound_Bg_Volume: string = "sound_bg_volume";
	public static Sound_Bg_Enable: string = "sound_bg_enable";
	public static Sound_Effect_Volume: string = "sound_effect_volume";
	public static Sound_Effect_Enable: string = "sound_effect_enable";
	//震动
	public static Shake_Enable: string = "shake_enable";
	/**
	 * 自动语音
	 */
	public static AutoVocie_Enable: string = "autovocie_enable"
	/**
	 * 语言
	 */
	public static Language: string = 'language';
	/**
	 * 上次登录时间
	 */
	public static User_LastLoginTime: string = "user_lastLoginTime";
	/**
	 * 登录文本通知
	 */
	public static LoginTextNotify: string = "logintextnotify";

	public static setValue(key: string, value: string, isPrivate: boolean = false)
	{
		if (isPrivate)
		{
			egret.localStorage.setItem(PrefsManager.getUserId() + key, value);
		}
		else
		{
			egret.localStorage.setItem(key, value);
		}
	}
	public static getValue(key: string, isPrivate: boolean = false): string
	{
		if (isPrivate)
		{
			return egret.localStorage.getItem(PrefsManager.getUserId() + key);
		}
		else
		{
			return egret.localStorage.getItem(key);
		}
	}
	/**
	 * 清除本地缓存
	 */
	public static removeData(key: string, isPrivate: boolean = false)
	{
		if (isPrivate)
		{
			return egret.localStorage.removeItem(PrefsManager.getUserId() + key);
		}
		else
		{
			return egret.localStorage.removeItem(key);
		}
	}
	public static setBoolean(key: string, value: boolean, isPrivate: boolean = false)
	{
		PrefsManager.setValue(key, value.toString(), isPrivate);
	}
	public static getBoolean(key: string, defaultValue: boolean = false, isPrivate: boolean = false): boolean
	{
		let value: string = PrefsManager.getValue(key, isPrivate);
		if (game.StringUtil.isNullOrEmpty(value))
		{
			return defaultValue;
		}
		return game.StringUtil.toBoolean(value);
	}
	public static setNumber(key: string, value: number, isPrivate: boolean = false)
	{
		PrefsManager.setValue(key, value.toString(), isPrivate);
	}
	public static getNumber(key: string, defaultValue: number = 0, isPrivate: boolean = false): number
	{
		let value: string = PrefsManager.getValue(key, isPrivate);
		if (game.StringUtil.isNullOrEmpty(value))
		{
			return defaultValue;
		}
		return parseFloat(value);
	}
	private static getUserId(): string
	{
		if (UserManager.userInfo && UserManager.userInfo.id)
		{
			return UserManager.userInfo.id.toString();
		}
		return game.StringConstants.Empty;
	}

	public static clearLoginInfo(): void
	{
		PrefsManager.setValue(PrefsManager.Login_LoginType, game.StringConstants.Empty);
		PrefsManager.setValue(PrefsManager.Login_Token, game.StringConstants.Empty);
		PrefsManager.setNumber(PrefsManager.Login_Token_Expire, 0);
	}
	public static getLoginToken(): string
	{
		let token: string = PrefsManager.getValue(PrefsManager.Login_Token);
		if (token)
		{
			let expire: number = PrefsManager.getNumber(PrefsManager.Login_Token_Expire);
			if (expire == 0 || expire > Math.floor(Date.now() / 1000))
			{
				return token;
			}
		}
		return game.StringConstants.Empty;
	}
	public static setLoginToken(token: string, expire: number = 0): void
	{
		PrefsManager.setValue(PrefsManager.Login_Token, token);
		PrefsManager.setNumber(PrefsManager.Login_Token_Expire, expire + Math.floor(Date.now() / 1000));
	}
}