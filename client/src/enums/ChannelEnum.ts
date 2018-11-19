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
		if (DEBUG && false)
		{
			return OperatePlatform.cn;
		}
		else
		{
			return OperatePlatform.hmt;
		}
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
	 * 巨枫
	 */
	public static readonly giantfun = "giantfun";
	/**
	 * 苹果商店
	 */
	public static readonly applestore = "applestore";
	/**
	 * 谷歌商店
	 */
	public static readonly googleplay = "googleplay";
}
/**
 * 渠道登录类型
 */
class ChannelLoginType
{
	/**
	 *  内网账号登录
	 */
	public static readonly IntranetAccount: string = "IntranetAccount";
	/**
	 *  FaceBook
	 */
	public static readonly FaceBook: string = "FaceBook";
	/**
	 *  GameCenter ios
	 */
	public static readonly GameCenter: string = "GameCenter";
	/**
	 *  GooglePlay android
	 */
	public static readonly GooglePlay: string = "GooglePlay";



	public static IsViewAccount(loginType: string): boolean
	{
		switch (loginType)
		{
			case ChannelLoginType.FaceBook:
			case ChannelLoginType.GameCenter:
			case ChannelLoginType.GooglePlay:
			case ChannelLoginType.IntranetAccount:
				return true;
		}
		return false;
	}
	/**
	 * 获取渠道登录列表
	 */
	public static GetChannelLoginList(op: string, channelType: string, isTest: boolean, isSafe: boolean): string[]
	{
		let list: string[] = [];
		if (DEBUG || game.System.isLocalhost)
		{
			list.push(ChannelLoginType.FaceBook);
			list.push(ChannelLoginType.GooglePlay);
			list.push(ChannelLoginType.IntranetAccount);
		}
		else
		{
			if (channelType == ChannelType.applestore)
			{
				list.push(ChannelLoginType.FaceBook);
				list.push(ChannelLoginType.GameCenter);
				if (isTest == false || isSafe == false)
				{
				}
			}
			else if (channelType == ChannelType.googleplay)
			{
				if (DEBUG) //todo 临时发版本处理
				{
					list.push(ChannelLoginType.FaceBook);
					list.push(ChannelLoginType.GooglePlay);
				}
			}
			else if (channelType == ChannelType.giantfun)
			{
				list.push(ChannelLoginType.IntranetAccount);
			}
			//to do 测试
			list.push(ChannelLoginType.IntranetAccount);
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