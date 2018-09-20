/**
 * 运营平台（值要全小写和配置表对应,登录服务器、版本管理、充值列表用到）
 */
class OperatePlatform
{
	/**
	 * 中国
	 */
	public static readonly cn = 'cn';
	/**
	 * 港澳台
	 */
	public static readonly hmt = 'hmt';
	/**
	 * 北美
	 */
	public static readonly na = 'na';
	/**
	 * 东南亚
	 */
	public static readonly sea = 'sea';
	/**
	 * 获取当前运营平台
	 */
	public static getCurrent(): string
	{
		//todo 不支持条件编译，只能一个个写死
		return OperatePlatform.cn;
	}
	/**
	 * 当前运营平台支持的语言列表
	 */
	public static getLangs(): string[]
	{
		switch (OperatePlatform.getCurrent())
		{
			case OperatePlatform.na:
			case OperatePlatform.sea:
				return ['en', 'zh-cn'];
			case OperatePlatform.hmt:
				return ['zh-tw', 'zh-cn', 'en'];
		}
		return ['zh-cn'];
	}
}
/**
 * 渠道类型(唯一的)
 */
class ChannelType
{
	/**
	 * 游客渠道标识，所有平台的游客都是这个标识
	 */
	public static readonly guest = "guest";
	/**
	 * 沁游
	 */
	public static readonly qin = "qin";
}
/**
 * 渠道登录类型
 */
class ChannelLoginType
{
	/**
	 * 沁游互动登录
	 */
	public static readonly Qin: string = "qin";
	/**
	 * 游客
	 */
	public static readonly Guest: string = "guest";
	/**
	 * 内网游客登录
	 */
	public static readonly IntranetGuest: string = "intranetGuest";
	/**
	 *  内网账号登录
	 */
	public static readonly IntranetAccount: string = "intranetAccount";
	/**
	 * 微信登录
	 */
	public static readonly Weixin: string = "weixin";
	/**
	 * 外网游戏账号登录
	 */
	public static readonly Account: string = "account";
	/**
	 * 客户端标识的渠道登录,Token登录
	 */
	public static readonly Normal: string = "";

	public static IsViewAccount(loginType: string): boolean
	{
		switch (loginType)
		{
			case ChannelLoginType.Qin:
			case ChannelLoginType.Guest:
			case ChannelLoginType.Account:
			case ChannelLoginType.IntranetGuest:
			case ChannelLoginType.IntranetAccount:
				return true;
		}
		return false;
	}
	/**
	 * 获取登录类型的token有效期(秒)
	 */
	public static getTokenExpire(loginType: string):number
	{
		if(loginType == ChannelLoginType.Weixin)
		{
			return 3600*24*30;//30天
		}
		return 0;
	}
	/**
	 * 获取渠道登录列表
	 */
	public static GetChannelLoginList(op: string, channelType: string, isTest: boolean, isSafe: boolean): string[]
	{
		let list: string[] = [];
		if (DEBUG || game.System.isLocalhost)
		{
			if(game.System.isMicro || game.System.isWeChat || game.System.isLocalhost == false)
			{
				list.push(ChannelLoginType.Weixin);
			}
			list.push(ChannelLoginType.Qin);
			list.push(ChannelLoginType.Account);
			list.push(ChannelLoginType.Guest);
			list.push(ChannelLoginType.IntranetAccount);
			list.push(ChannelLoginType.IntranetGuest);
			if (game.System.isWeb)
			{
				//debug的web版有token登录调试用
				list.push(ChannelLoginType.Normal);
			}
		}
		else
		{
			if (game.System.isMicro)
			{
				//安装包
				if (isTest == false || isSafe == false)
				{
					list.push(ChannelLoginType.Weixin);
				}
				list.push(ChannelLoginType.Qin);
			}
			else
			{
				//非安装包
				list.push(ChannelLoginType.Weixin);
				list.push(ChannelLoginType.Qin);
			}
		}
		if (list.length <= 0)
		{
			game.Console.logError("登录类型列表长度不可能为0");
		}
		return list;
	}
}
/**
 * 分享类型
 */
class ChannelShareType
{
	public static readonly WxTimeLine: string = "WxTimeLine";
	public static readonly WxMessage: string = "WxMessage";
	public static readonly QQZone: string = "QQZone";
	public static readonly QQMessage: string = "QQMessage";
}