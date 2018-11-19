/**
 * 游戏功能配置定义 
 */
class ProjectDefined
{
	public static role = {
		"gold": 2000
	};
	public static happyGift = [
		{
			"6": 1,
			"7": 2,
			"8": 2,
			"9": 3,
			"10": 4,
			"11": 5,
			"12": 5,
			"13": 5,
			"14": 6,
			"15": 6,
			"16": 6,
			"17": 7,
			"18": 7,
			"19": 7,
			"20": 8,
			"21": 8,
			"22": 8,
			"23": 9
		},
		{
			"2000": 1,
			"20000": 10,
			"200000": 100
		},
		{
			"cents": 100,
			"more": 1000
		}
	];

	public static invite = {
		"bindSelf": 20000,
		"bindFriend": 30000,
		"finishSelf": 20,
		"finishFriend": 20,
		"payPer": 0.1,
		"goldBeanLimit": 500,
		"levelLimit": 3,
		"startTime": "2018,4,15,12,0,0",
		"endTime": "2019,4,16,12,0,0"
	};
	public static gameFeedback = {
		"forum": "",
		"customerService": ""
	};
	public static vipSpeed = [{ type: 0, speed: 0 }, { type: 1, speed: 5 }, { type: 2, speed: 15 }, { type: 3, speed: 5 }];
	public static isTest = true;
	public static version = "0.5.0";
	public static onTimeOut = 15000;
	public static serverCrowded = 500;
	public static waitStartTime = 30;
	public static initPutTimeOut = 86400;
	public static initPutTimeOutClient = 30;
	public static putTimeout = 86400;
	public static putTimeoutClient = 15;
	public static putTimeoutTimes = 3;
	public static hostedPutTime = 2;
	public static actionTime = 32;
	public static actionTimeClient = 30;
	public static actionSpeed = 1;
	public static waitReadyTime = 86400;
	public static waitDisbandTime = 300;
	public static angangRate = 1;
	public static minggangRate = 1.5;
	public static jiagangRate = 1;
	public static hupaiRate = 1;
	public static jiaganghuRate = 1.5;
	public static maimaRate = 1;
	public static getShareCardMaxNum = 50;
	public static chatMaxRecordTime = 15000;
	public static login_in_address = "10.0.0.212";
	public static login_address = "g.xydp*.cn.istar8.com";
	public static login_in_port = 8000;
	public static login_test_port = 8004;
	public static login_port = 8000;
	public static storage_host = "http://g.xydp.cn.istar8.com=81021111";
	public static sdk_url = "http://g.xydp.cn.istar9.com=81011111";
	public static sdk_url_test = "http://g.xydp.cn.istar9.com=809711111";
	public static webpay_url = "https://pay.istar8.com";
	public static authorize_url = "https://auth.istar8.com";
	public static webclient_url = "http://play.istar8.com/game";
	public static weekMemberExpRate = 1.5;
	public static monthMemberExpRate = 2;
	public static huPaiExp = 30;
	public static gangPaiExp = 30;
	public static roundHostExp = 30;
	public static roundExp = 10;
	public static giveOnceGoldNum = 500;
	public static safeGoldMinLimit = 10000;
	public static freeGoldTime = 1800;
	public static freeGoldAward = 4;
	public static MTTBuyTimeout = 25;
	public static MTTBuyTimeoutClient = 20;
	public static mTTIntervalTime = 300;
	public static takeAwardGuideStep = 4;
	public static pollingLimit = 1;
	public static shareResultNumLimit = 30;
	/**
	 * 最大用户等级
	 */
	public static maxUseLevel = 100;

	/**
 * 获取登录地址
 */
	public static getLoginAddress(isIntranet: boolean): string
	{
		if (isIntranet)
		{
			return ProjectDefined.login_in_address;
		}
		return ProjectDefined.login_address;
	}
	/**
	 * 获取登录端口
	 */
	public static getLoginPort(isIntranet: boolean, isServerTest: boolean): number
	{
		if (isIntranet)
		{
			return ProjectDefined.login_in_port;
		}
		if (isServerTest)
		{
			return ProjectDefined.login_test_port;
		}
		return ProjectDefined.login_port;
	}
	/**
 * 苹果支付验证回调url
 */
	public static getPayCallbackUrl(isServerTest: boolean)
	{
		return isServerTest ? ProjectDefined.sdk_url_test : ProjectDefined.sdk_url + '/applepay/paycallback.php';
	}
	/**
 * 微信支付unifiedorder url
 */
	public static getWxpayUnifiedOrderUrl()
	{
		return ProjectDefined.webpay_url + '/wxpay/unifiedorder.php';
	}
	/**
	 * 维护内容url
	 */
	public static getMaintainUrl(appId: string): string
	{
		return ProjectDefined.webclient_url + '/' + appId + '/version/mt.txt?' + Date.now().toString() + Math.random().toString();
	}
	/**
 * 版本文件url
 */
	public static getVersionUrl(appId: string): string
	{
		return ProjectDefined.webclient_url + '/' + appId + '/version/version.json?' + Date.now().toString() + Math.random().toString();
	}
	/**
 * 微信二维码登录 url
 */
	public static getWxQrconnectUrl(): string
	{
		return ProjectDefined.authorize_url + '/wx_qrconnect.php';
	}

	/**
 	* 微信jsapi ticket url
 	*/
	public static getWxTicketUrl(): string
	{
		return ProjectDefined.authorize_url + '/wx_ticket.php';
	}

	/**
 	* 获取支付url
 	*/
	public static getPayIndexUrl()
	{
		return ProjectDefined.webpay_url + '/inpay.php';
	}

	public static getVipSpeedDefinition(type: number): any
	{
		for (let def of ProjectDefined.vipSpeed)
		{
			if (def.type == type)
			{
				return def;
			}
		}
		return null;
	}

	/**
 	* 头像上传url
 	*/
	public static getHeadUpLoadUrl(): string
	{
		return ProjectDefined.storage_host + '/uploadimg.php';
	}
	/**
    * 用户协议url
	*/
	public static get userAgreementUrl(): string
	{
		return ProjectDefined.webclient_url + '/resource/agreement.txt';
	}
	/**
 	* 获取分享 web url
 	*/
	public static getShareWebUrl(appId: string, inviteCode?: string): string
	{
		inviteCode = inviteCode ? '&invite_code=' + inviteCode : '';
		return ProjectDefined.webclient_url + '/?appid=' + appId + inviteCode;
	}

	/**
 	* 语音上传url
 	*/
	public static getVoiceUpLoadUrl(): string
	{
		return ProjectDefined.storage_host + '/uploadvoice.php';
	}
	/**
 * 获取公告
 */
	public static getNoticeUrl(appId: string): string
	{
		return ProjectDefined.getWebAppRootUrl(appId) + '/notice.txt';
	}

	/**
 	* 获取web客户端根url
 	*/
	public static getWebAppRootUrl(appId: string): string
	{
		return ProjectDefined.webclient_url + '/' + appId;
	}
}