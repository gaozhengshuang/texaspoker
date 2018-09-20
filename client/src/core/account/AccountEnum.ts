
/// <summary>
/// 帐号系统配置
/// </summary>
class AccountConfig
{
	/// <summary>
	/// 输入字符最小限制
	/// </summary>
	public static readonly InputCharMin: number = 6;
	/// <summary>
	/// 输入字符最大限制
	/// </summary>
	public static readonly InputCharMax: number = 32;
	/// <summary>
	/// 手机号码最小长度
	/// </summary>
	public static readonly MobileNoMin: number = 11;
	/// <summary>
	/// 手机号码最大长度
	/// </summary>
	public static readonly MobileNoMax: number = 13;
	/// <summary>
	/// 短信验证码超时时间
	/// </summary>
	public static readonly MobileCodeTimeout: number = 600;
}
/// <summary>
/// 帐号系统状态码
/// </summary>
class AccountCode
{
	public static readonly Success = "0";
	public static readonly NoPw = "1024";

	public static GetDescription(code: string): string
	{
		if (game.StringUtil.isNullOrEmpty(code))
		{
			return "状态码为空";
		}
		switch (code)
		{
			case AccountCode.Success:
				return game.StringConstants.Empty;//成功返回空
			case "-1": //系统
				return "帐号系统错误";
			case "-2":
				return "服务器维护";
			case "1001": //客户端
				return "参数错误";
			case "1002":
				return "帐号不存在";
			case "1003":
				return "帐号已存在";
			case "1004":
				return "帐号信息校验失败";
			case "1006":
				return "登录失败";
			case "1007":
				return "应用不存在";
			case "1008":
				return "签名验证失败";
			case "1009":
				return "帐号或密码错误";
			case "1010":
				return "短信验证码发送失败";
			case "1011":
				return "短信验证码验证失败";
			case "1012":
				return "手机号码未绑定";
			case "1013":
				return "手机号码已绑定";
			case "1018":
				return "帐号已禁用";
			case "1019":
				return "该手机号码发送次数超过当天限制";
			case "1020":
				return "该手机号码发送次数超过每小时限制";
			case "1021":
				return "短信发送次数过于频繁，请一分钟后再试";
			case "1022":
				return "手机账号不能绑定/解绑";
			case "1023":
				return "请求过于频繁，请稍后再试";
			case "2001": //服务器
				return "token验证失败";
			case "2002":
				return "应用不存在";
			case "2003":
				return "签名校验失败";
			case "2004":
				return "应用已禁用";
		}
		return game.StringConstants.Empty;
	}
}
class AccountHttpUrl
{
	/// <summary>
	/// 正式地址
	/// </summary>
	private static readonly API_URL = "http://api.istar9.com/oauth1/";
	/// <summary>
	/// 测试地址
	/// </summary>
	// private static readonly API_URL = "http://10.0.0.186:8002/oauth1/";
	//
	public static readonly login: string = AccountHttpUrl.API_URL + "login";
	public static readonly register: string = AccountHttpUrl.API_URL + "register";
	public static readonly phone_register: string = AccountHttpUrl.API_URL + "phone_register2";
	public static readonly phone_register_verify: string = AccountHttpUrl.API_URL + "phone_register_verify";
	public static readonly phone_bind: string = AccountHttpUrl.API_URL + "phone_bind2";
	public static readonly phone_bind_verify: string = AccountHttpUrl.API_URL + "phone_bind_verify";
	public static readonly phone_unbind_verify: string = AccountHttpUrl.API_URL + "phone_unbind_verify";
	public static readonly modify_password: string = AccountHttpUrl.API_URL + "modify_password";
	public static readonly phone_find_password: string = AccountHttpUrl.API_URL + "phone_find_password2";
	public static readonly phone_modify_password: string = AccountHttpUrl.API_URL + "phone_modify_password";
	public static readonly sq_modify_password: string = AccountHttpUrl.API_URL + "sq_modify_password";
	public static readonly sq_set: string = AccountHttpUrl.API_URL + "sq_set";
	public static readonly phone_sms_login: string = AccountHttpUrl.API_URL + "sms_login2";
	public static readonly phone_sms_login_verify: string = AccountHttpUrl.API_URL + "sms_login_verify";
	public static readonly phone_token_login: string = AccountHttpUrl.API_URL + "token_login";
}
/**
 * 登录类型密码
*/
class AccountPwdType
{
	/**
	 * 密码登录
	*/
	public static readonly pw: string = "pw";
	/**
	 * token登录
	*/
	public static readonly token: string = "token";
}