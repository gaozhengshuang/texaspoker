
class ChannelUtil
{
	private static OrderLength: number = 6;//订单截取长度
	/**
	 * 订单是否是非法的
	 */
	public static IsOrderIlleg(orderId: string): boolean
	{
		if (game.StringUtil.isNullOrEmpty(orderId))
		{
			return true;
		}
		let split: Array<string> = orderId.split('-');
		return split.length != ChannelUtil.OrderLength;
	}
	/**
	 * 生成订单
	 * [账号ID]-[角色ID]-[角色所在服务器ID]-[商品ID(如果没有传0)]-[是否是测试，1是测试，0是正式]-[商品数量，默认1]
	 */
	public static GenerateOrder(productId: number, isTest: boolean): string
	{
		let t: string = isTest ? "1" : "0";
		let timeStr: string = TimeManager.GetServerUtcSecondstamp().toString();
		let result: string ="";// LoginManager.loginInfo.userid + "-" + UserManager.userInfo.roleId + "-" + UserManager.serverInfo.id + "-" + productId + "-" + t + "-" + timeStr.substring(4);
		if (result.length > 32)
		{
			result = result.substring(0, 32);//订单号不超过32个字符
		}
		return result;
	}
	/**
	 * 获取渠道类型+"_"+登录类型的完整标识
	 */
	public static GetLoginChannel(channel: string, loginType: string): string
	{
		if (game.StringUtil.isNullOrEmpty(loginType))
		{
			return channel;
		}
		else
		{
			return game.StringUtil.format("{0}_{1}", channel, loginType);
		}
	}
	/**
	 * 执行网页支付
	 */
	public static openWebPay(serverId: number, orderId: string, price: number, productName: string, awardId: number): void
	{
		let url: string = ChannelUtil.getWebPayUrl(serverId, orderId, price, productName, awardId);
		ChannelManager.openURL(url);
	}
	public static iframeWebPay(serverId: number, orderId: string, price: number, productName: string, awardId: number): void
	{
		game.WebView.getInstance().width = GameManager.stage.stageWidth;
		game.WebView.getInstance().height = GameManager.stage.stageHeight;
		game.WebView.getInstance().backgroundColor = '#ffffff';
		game.WebView.getInstance().closeButton = true;
		game.WebView.getInstance().src = ChannelUtil.getWebPayUrl(serverId, orderId, price, productName, awardId);
		GameManager.stage.addChild(game.WebView.getInstance());

		UIManager.pushResizeDom(game.WebView.getInstance(), 0, 0);
	}
	private static getWebPayUrl(serverId: number, orderId: string, price: number, productName: string, awardId: number): string
	{
		let url: string = ProjectDefined.getPayIndexUrl();
		let appId: string = GameSetting.AppId;
		let platform: string = game.RuntimeTypeName.getCurrentName();
		let roleId: number = UserManager.userInfo.roleId;
		let roleName: string = encodeURIComponent(UserManager.userInfo.name);
		let appName: string = encodeURIComponent(ChannelManager.appName);
		productName = encodeURIComponent(productName);
		let bundleId: string = encodeURIComponent(ChannelManager.bundleId);//这个bid要传的是安装包的bundleId,不是映射给游戏服的数字包ID
		let bagId: number = BundleManager.getBid();//数字包ID
		let test: number = VersionManager.isServerTest ? 1 : 0;
		let op: string = OperatePlatform.getCurrent();
		url = url + '?serverId=' + serverId + '&roleId=' + roleId + '&price=' + price +
			'&appid=' + appId + '&platform=' + platform + '&bagid=' + bagId + '&bid=' +
			bundleId + '&test=' + test + '&payDes=' + productName + '&roleName=' + roleName + '&appName=' + appName + '&awardid=' + awardId + '&op=' + op;
		return url;
	}
	/**
	 * 微信jsapi支付
	 */
	public static wxJsapiPay(openId: string, serverId: number, price: number, productName: string, awardId: number): void
	{
		if (window['WeixinJSBridge'])
		{
			//微信公众号支付
			ChannelUtil.wxUnifiedOrder(function (data)
			{
				window['WeixinJSBridge'].invoke('getBrandWCPayRequest', {
					appId: data.appId,
					timeStamp: data.timeStamp + '',
					nonceStr: data.nonceStr,
					package: data.package,
					signType: data.signType,
					paySign: data.paySign
				});
			}, this, openId, serverId, price, productName, awardId,WxTradeType.JSAPI);
		}
		else
		{
			UIManager.showFloatTips("没有找到微信支付接口");
		}
	}
	/**
	 * 微信统一下单
	 */
	public static wxUnifiedOrder(func: Function, thisObject: any, openId: string, serverId: number, price: number, productName: string, awardId: number, tradeType: string = ''): void
	{
		let appId: string = GameSetting.AppId;
		let roleId: number = UserManager.userInfo.roleId;
		let uourl: string = ProjectDefined.getWxpayUnifiedOrderUrl();
		let bagId: number = BundleManager.getBid();
		let test: number = VersionManager.isServerTest ? 1 : 0;
		let op: string = OperatePlatform.getCurrent();
		productName = encodeURIComponent(productName);
		uourl += '?appid=' + appId + '&openId=' + openId + '&serverId=' + serverId + '&roleId=' + roleId + '&price=' + price +
			'&bagid=' + bagId + '&test=' + test + '&payDes=' + productName + '&awardid=' + awardId + '&op=' + op + '&tradeType=' + tradeType;
		URLLoader.downloadContent(uourl, this, function (data: string)
		{
			let obj;
			try
			{
				obj = JSON.parse(data);
			} catch (exception) { }
			if (obj)
			{
				if (obj['return_code'])
				{
					AlertManager.showAlertByString(obj['return_msg']);
				}
				else
				{
					game.FuncUtil.invoke(func, thisObject, obj);
				}
			}
			else
			{
				AlertManager.showAlertByString('请求支付数据返回错误');
			}
		}, function (event: egret.IOErrorEvent)
			{
				AlertManager.showAlertByString('请求支付失败，请检查网络是否正常');
			});
	}
}