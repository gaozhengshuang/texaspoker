
class AccountUtil
{
	public static ResultToHashtable(data: any, url: string): Object
	{
		try
		{
			let obj: Object = JSON.parse(data);
			return obj;
		}
		catch (e)
		{
			qin.Console.logError("账号系统接收数据错误！" + url);
		}
		return null;
	}
	/// <summary>
	/// 错误码漂浮提示
	/// </summary>
	/// <param name="code"></param>
	public static ShowCodeFloatTips(code: string, message: string)
	{
		let des: string = AccountCode.GetDescription(code);
		if (qin.StringUtil.isNullOrEmpty(des))
		{
			if (!qin.StringUtil.isNullOrEmpty(message))
			{
				try
				{
					des = decodeURIComponent(message);
				}
				catch (e)
				{
					qin.Console.logError("转义失败！" + message);
				}
			}
		}
		UIManager.showFloatTips(des);
	}
	/// <summary>
	/// 密码修改成功漂浮提示
	/// </summary>
	public static ShowModifyPwFloatTips()
	{
		UIManager.showFloatTips("密码修改成功");
	}
	/// <summary>
	/// 绑定手机成功漂浮提示
	/// </summary>
	public static ShowPhoneBindFloatTips(isBind: boolean)
	{
		if (isBind)
		{
			UIManager.showFloatTips("绑定手机成功");
		}
		else
		{
			UIManager.showFloatTips("解绑手机成功，为了您的帐号安全请尽快绑定手机");
		}
	}
	public static VerifyRegisterAccount(text: string): boolean
	{
		if (qin.RegexUtil.IsNumeric(text))
		{
			UIManager.showFloatTips("帐号至少包含一个英文字母");
			return false;
		}
		return true;
	}
	public static VerifyAccount(text: string): boolean
	{
		if (qin.StringUtil.isNullOrEmpty(text))
		{
			UIManager.showFloatTips("请输入帐号");
			return false;
		}
		if (text.length < AccountConfig.InputCharMin)
		{
			UIManager.showFloatTips(qin.StringUtil.format("帐号不能小于{0}个字符", AccountConfig.InputCharMin));
			return false;
		}
		else if (text.length > AccountConfig.InputCharMax)
		{
			UIManager.showFloatTips(qin.StringUtil.format("帐号不能大于{0}个字符", AccountConfig.InputCharMax));
			return false;
		}
		if (qin.RegexUtil.IsEnglishAndNumber(text) == false)
		{
			UIManager.showFloatTips("帐号只能使用英文和数字");
			return false;
		}
		return true;
	}
	public static VerifyPassword(text: string): boolean
	{
		if (qin.StringUtil.isNullOrEmpty(text))
		{
			UIManager.showFloatTips("请输入密码");
			return false;
		}
		if (text.length < AccountConfig.InputCharMin)
		{
			UIManager.showFloatTips(qin.StringUtil.format("密码不能小于{0}个字符", AccountConfig.InputCharMin));
			return false;
		}
		else if (text.length > AccountConfig.InputCharMax)
		{
			UIManager.showFloatTips(qin.StringUtil.format("密码不能大于{0}个字符", AccountConfig.InputCharMax));
			return false;
		}
		if (qin.RegexUtil.IsEnglishAndNumber(text) == false) 
		{
			UIManager.showFloatTips("密码只能使用英文和数字");
			return false;
		}
		return true;
	}
	/// <summary>
	/// 验证2次输入密码是否一致
	/// </summary>
	/// <param name="pw"></param>
	/// <param name="pw2"></param>
	/// <returns></returns>
	public static VerifyDualPassword(pw: string, pw2: string): boolean
	{
		if (pw != pw2)
		{
			UIManager.showFloatTips("两次输入的密码不匹配，请重新输入");
			return false;
		}
		return true;
	}
	/// <summary>
	/// 验证手机号码
	/// </summary>
	/// <param name="text"></param>
	/// <returns></returns>
	public static VerifyMobileNo(text: string): boolean
	{
		if (qin.StringUtil.isNullOrEmpty(text) || text.length < AccountConfig.MobileNoMin || text.length > AccountConfig.MobileNoMax || qin.RegexUtil.IsUInt(text) == false)
		{
			UIManager.showFloatTips("请输入手机号码");
			return false;
		}
		return true;
	}
	/// <summary>
	/// 验证短信验证码
	/// </summary>
	/// <param name="text"></param>
	/// <returns></returns>
	public static VerifyMobileCode(text: string): boolean
	{
		if (qin.StringUtil.isNullOrEmpty(text) || text.length > AccountConfig.InputCharMax || qin.RegexUtil.IsUInt(text) == false)
		{
			UIManager.showFloatTips("请输入短信验证码");
			return false;
		}
		return true;
	}

	public static ToStringArray(content: string, separator: string = ','): Array<string>
	{
		if (qin.StringUtil.isNullOrEmpty(content))
		{
			return null;
		}
		return content.split(separator);
	}
}
