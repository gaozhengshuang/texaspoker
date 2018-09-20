/**
 * 游戏功能配置定义 
 */
class ProjectDefined extends BaseDefined<any>
{
	//------------------------------------------------------------------
	// static
	//------------------------------------------------------------------

	private static readonly projectConfig: string = "project";
	private static _instance: ProjectDefined;
	public static GetInstance(): ProjectDefined
	{
		if (ProjectDefined._instance == null)
		{
			ProjectDefined._instance = new ProjectDefined();
		}
		if (DefinedManager.IsParsed(ProjectDefined.projectConfig) == false)
		{
			ProjectDefined._instance.initialize();
		}
		return ProjectDefined._instance;
	}

	//------------------------------------------------------------------
	// public
	//------------------------------------------------------------------

	/**
	 * socket连接超时
	 */
	public static readonly onTimeOut: string = "onTimeOut";
	/**
	 * 服务器拥挤人数限定
	 */
	public static readonly serverCrowded: string = "serverCrowded";
	/**
	 * 等待碰杠时间 超时不给碰杠
	 */
	public static readonly waitActionTimeClient: string = "waitActionTimeClient";
	/**
	 * 出牌超时时间 超时自动本次出牌
	 */
	public static readonly putTimeoutClient: string = "putTimeoutClient";
	/**
	 * 出牌超时次数 超过次次数 则托管
	 */
	public static readonly putTimeoutTimes: string = "putTimeoutTimes";
	/**
    * 初始化出牌时间 庄家第一次出牌
    */
	public static readonly initPutTimeOutClient: string = "initPutTimeOutClient";
	/**
	 * 准备时间倒计时
	 */
	public static readonly waitReadyTime: string = "waitReadyTime";
	/**
	 * 解散房间等待时间
	 */
	public static readonly waitDisbandTime: string = "waitDisbandTime";
	/**
	 * 聊天最大记录时间
	 */
	public static readonly chatMaxRecordTime: string = "chatMaxRecordTime";
	/**
	 * 免费金币间隔时间
	 */
	public static readonly freeGoldTime: string = "freeGoldTime";
	/**
	 * 免费金币awardId
	 */
	public static readonly freeGoldAward: string = "freeGoldAward";
	/**
	 * 是否使用手机号码
	 */
	public static readonly usePhone: string = "usePhone";

	//------------------------------------------------------------------
	// private
	//------------------------------------------------------------------

	/**
	 * 代码版本，和服务器同步
	 */
	private static readonly version = 'version';
	/**
	 * 内网登录IP
	 */
	private static readonly login_in_address: string = "login_in_address";
	/**
	 * 内容登录端口
	 */
	private static readonly login_in_port: string = "login_in_port";
	/**
	 * 登录地址
	 */
	private static readonly login_address: string = "login_address";
	/**
	 * 登录端口
	 */
	private static readonly login_port: string = "login_port";
	/**
	 * 测试登录端口
	 */
	private static readonly login_test_port: string = "login_test_port";
	/**
	 * 储存服地址
	 */
	private static readonly storage_host: string = "storage_host";
	/**
	 * web支付URL
	 */
	private static readonly webpay_url: string = "webpay_url";
	/**
	 * sdk服地址
	 */
	private static readonly sdk_url: string = 'sdk_url';
	/**
	 * sdk服测试地址
	 */
	private static readonly sdk_url_test: string = 'sdk_url_test';
	/**
	 * 授权地址
	 */
	private static readonly authorize_url: string = 'authorize_url';
	/**
	 * 轮询上限
	 */
	private static readonly pollingLimit: string = "pollingLimit";
	/**
	 * 网页版客户端根url
	 */
	private static readonly webclient_url: string = 'webclient_url';
	/**
	 * 邀请奖励信息
	*/
	private static readonly invite: string = "invite";
	/**
	 * 分享抽奖结果展示条数
	*/
	private static readonly shareResultNumLimit: string = "shareResultNumLimit";

	//------------------------------------------------------------------
	// class
	//------------------------------------------------------------------

	private _projectObject: any;
	/**
	 * vip成长速度配置
	 */
	public vipSpeed: Array<VipSpeedDefinition>;
	/**
     * 锦标赛输光 被踢时间(只有在能重购/增购是有效) 客户端用
     */
	public MTTBuyTimeoutClient: number;
	/**
	 * 锦标赛 间隔提示(在锦标赛房间中每隔一段时间提示一次剩余人数)
	 */
	public mTTIntervalTime: number;
	/**
     * 好友赠送一次的金币数量
    */
	public static giveOnceGoldNum: number;

	public initialize()
	{
		this._projectObject = DefinedManager.GetData(ProjectDefined.projectConfig);
		this.vipSpeed = this._projectObject.vipSpeed;
		this.MTTBuyTimeoutClient = this._projectObject.MTTBuyTimeoutClient;
		this.mTTIntervalTime = this._projectObject.mTTIntervalTime;
		if (this.mTTIntervalTime < 60)
		{
			this.mTTIntervalTime = 60;
		}
		ProjectDefined.giveOnceGoldNum = this._projectObject.giveOnceGoldNum;
	}

	public getValue(key: string): any
	{
		if (this._projectObject)
		{
			return this._projectObject[key];
		}
		return null;
	}
	public getVipSpeedDefinition(type: number): VipSpeedDefinition
	{
		for (let def of this.vipSpeed)
		{
			if (def.type == type)
			{
				return def;
			}
		}
		return null;
	}
	/**
	 * 获取登录地址
	 */
	public getLoginAddress(isIntranet: boolean): string
	{
		if (isIntranet)
		{
			return this.getValue(ProjectDefined.login_in_address);
		}
		return this.getValue(ProjectDefined.login_address);
	}
	/**
	 * 获取登录端口
	 */
	public getLoginPort(isIntranet: boolean, isServerTest: boolean): number
	{
		if (isIntranet)
		{
			return this.getValue(ProjectDefined.login_in_port);
		}
		if (isServerTest)
		{
			return this.getValue(ProjectDefined.login_test_port);
		}
		return this.getValue(ProjectDefined.login_port);
	}
	/**
	 * 获取储存服地址
	 */
	public getStorageHost(): string
	{
		return this.getValue(ProjectDefined.storage_host);
	}
	/**
	 * 头像上传url
	 */
	public getHeadUpLoadUrl(): string
	{
		return this.getStorageHost() + '/uploadimg.php';
	}
	/**
	 * 语音上传url
	 */
	public getVoiceUpLoadUrl(): string
	{
		return this.getStorageHost() + '/uploadvoice.php';
	}
	/**
	 * 获取支付url
	 */
	public getPayIndexUrl()
	{
		return this.getValue(ProjectDefined.webpay_url) + '/inpay.php';
	}
	/**
	 * 苹果支付验证回调url
	 */
	public getPayCallbackUrl(isServerTest: boolean)
	{
		return this.getValue(isServerTest ? ProjectDefined.sdk_url_test : ProjectDefined.sdk_url) + '/applepay/paycallback.php';
	}
	/**
	 * 微信支付unifiedorder url
	 */
	public getWxpayUnifiedOrderUrl()
	{
		return this.getValue(ProjectDefined.webpay_url) + '/wxpay/unifiedorder.php';
	}
	/**
	 * 微信支付wappay url
	 */
	public getWxpayWapPayUrl()
	{
		return this.getValue(ProjectDefined.webpay_url) + '/wxpay/wappay.php';
	}
	/**
	 * 支付宝wappay url
	 */
	public getAlipayWapPayUrl()
	{
		return this.getValue(ProjectDefined.webpay_url) + '/alipay/wappay.php';
	}
	/**
	 * 版本文件url
	 */
	public getVersionUrl(appId: string): string
	{
		return this.getValue(ProjectDefined.webclient_url) + '/' + appId + '/version/version.json?' + Date.now().toString() + Math.random().toString();
	}
	/**
	 * 维护内容url
	 */
	public getMaintainUrl(appId: string): string
	{
		return this.getValue(ProjectDefined.webclient_url) + '/' + appId + '/version/mt.txt?' + Date.now().toString() + Math.random().toString();
	}
	/**
	 * 用户协议url
	*/
	public get userAgreementUrl(): string
	{
		return this.getValue(ProjectDefined.webclient_url) + '/resource/agreement.txt';
	}
	/**
	 * 微信jsapi ticket url
	 */
	public getWxTicketUrl(): string
	{
		return this.getValue(ProjectDefined.authorize_url) + '/wx_ticket.php';
	}
	/**
	 * 微信二维码登录 url
	 */
	public getWxQrconnectUrl(): string
	{
		return this.getValue(ProjectDefined.authorize_url) + '/wx_qrconnect.php';
	}
	/**
	 * 代码版本，和服务器同步
	 */
	public get codeVersion(): string
	{
		return this.getValue(ProjectDefined.version);
	}
	/**
	 * 轮询上限
	 */
	public get pollingLimit(): number
	{
		return parseInt(this.getValue(ProjectDefined.pollingLimit));
	}
	/**
	 * 分享抽奖结果展示上限
	 */
	public get shareResultNumLimit(): number
	{
		return parseInt(this.getValue(ProjectDefined.shareResultNumLimit));
	}
	/**
	 * 获得金豆上限
	 */
	public get goldBeanLimit(): number
	{
		let data: any = this.getValue(ProjectDefined.invite);
		if (data && data.goldBeanLimit)
		{
			return parseInt(data.goldBeanLimit);
		}
		return 0;
	}
	/**
	 * 获得绑定邀请码等级上限
	 */
	public get bindICodeLevelLimit(): number
	{
		let data: any = this.getValue(ProjectDefined.invite);
		if (data && data.levelLimit)
		{
			return parseInt(data.levelLimit);
		}
		return 0;
	}
	/**
	 * 获得绑定邀请码后绑定者完成新人礼后被绑定者获得的金豆数
	*/
	public get finishSelf(): number
	{
		let data: any = this.getValue(ProjectDefined.invite);
		if (data && data.finishSelf)
		{
			return parseInt(data.finishSelf);
		}
		return 0;
	}
	/**
	 * 获得邀请奖励信息
	 */
	public get invite(): Object
	{
		return this.getValue(ProjectDefined.invite);
	}
	/**
	 * 获取分享 web url
	 */
	public getShareWebUrl(appId: string, inviteCode?: string): string
	{
		inviteCode = inviteCode ? '&invite_code=' + inviteCode : '';
		return this.getValue(ProjectDefined.webclient_url) + '/?appid=' + appId + inviteCode;
	}
	/**
	 * 获取web客户端根url
	 */
	public getWebAppRootUrl(appId: string): string
	{
		return this.getValue(ProjectDefined.webclient_url) + '/' + appId;
	}
	/**
	 * 获取公告
	 */
	public getNoticeUrl(appId: string): string
	{
		return this.getWebAppRootUrl(appId) + '/notice.txt';
	}
}
/**
 * 局数定义
 */
class RoundDefinition
{
	/**
	 * 消耗房卡
	 */
	public cost: number;
	/**
	 * 对局数量
	 */
	public num: number;
	/**
	 * 描述
	 */
	public des;
	/**
	 * 是否是创建房间
	 */
	public isRound: boolean;
}
/**
 * 玩法定义
 */
class PlayWayDefinition
{
	/**
	 * 类型
	 */
	public type: number;
	/**
	 * 描述
	 */
	public des: string;
}
/**
 * 底分定义
 */
class AntesDefinition
{
	/**
	 * 底分
	 */
	public score: number;
	/**
	 * 描述
	 */
	public des: string;
}
/**
 * 底分定义
 */
class BringRoomCardDefinition
{
	/**
	 * 类型
	 */
	public type: string;
	/**
	 * 朋友获得的数量
	 */
	public friend: number;
	/**
	 * 我获得的数量
	 */
	public your: number;
}
/**
 * 游戏成长速度
 */
class VipSpeedDefinition
{
	public type: VipType;
	public speed: number;

}