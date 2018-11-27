class Channel_ios extends ChannelBase
{
	public Login(loginType: string, isAutoLogin: boolean)
	{
		if (loginType == ChannelLoginType.GameCenter) // move todo
		{
			//微信登录
			if (isAutoLogin)
			{
				let token: string = PrefsManager.getLoginToken();
				if (token)
				{
					ChannelManager.OnTokenLoginSucceed.dispatch(WxAuthorizeType.App + '###2###' + token);
					return;
				}
			}
			game.ExternalInterface.call(ExtFuncName.Login, loginType);
		}
		else if (ChannelManager.loginType == ChannelLoginType.IntranetAccount) //微端测试使用 //loginType == ChannelLoginType.Account || //move todo
		{
			this.accountLogin(isAutoLogin);
		}
	}
	private accountLogin(isAutoLogin: boolean): void
	{
		let account: string = PrefsManager.getValue(PrefsManager.Login_Account);
		let password: string = PrefsManager.getValue(PrefsManager.Login_Password);
		if (isAutoLogin && account && password)
		{
			ChannelManager.DispatchAccountLoginSucceed(account, password);
		}
		else
		{
			if (!UIManager.isShowPanel(UIModuleName.LoginLocalPanel))
			{
				UIManager.showPanel(UIModuleName.LoginLocalPanel);
			}
		}
	}
	public PaySend(payState: number, awardId: number, serverId: number, orderId: string, price: number, productName: string)
	{
		let bagId: number;
		let data: any;
		UIManager.showPanel(UIModuleName.PayMaskPanel);
		bagId = BundleManager.getBid();//数字包ID

		data = { "awardId": awardId, "passData": { "orderId": orderId, "bagId": bagId }, "price": price, "name": productName };
		game.ExternalInterface.call(ExtFuncName.Pay, JSON.stringify(data));
	}
	private onSelectPayModelHandler(data: any)
	{
		// this.PaySend(data.payState, data.awardId, UserManager.serverInfo.id, data.passData.orderId, data.price, data.name);
		ChannelManager.OnPayModelSelectEvent.removeListener(this.onSelectPayModelHandler, this);
	}
	public share(type: string, title: string, message: string, inviteCode?: string)
	{
		let data: Object = {};
		data['type'] = type;
		data['title'] = title;
		data['message'] = message;
		data['url'] = ProjectDefined.getShareWebUrl(GameSetting.AppId, inviteCode);
		game.ExternalInterface.call(ExtFuncName.Share, JSON.stringify(data));
	}
	/**
	 * 检查支付订单
	 */
	public checkUnFinishedPayList()
	{
		game.ExternalInterface.call(ExtFuncName.CheckUnFinishedPayList, game.StringConstants.Empty);
	}
	/// <summary>
	/// 支付成功（sdk -> unity）
	/// </summary>
	/// <param name="data"></param>
	public sdkPaySucceed(data: any)
	{
		UIManager.closePanel(UIModuleName.PayModePanel);
		//购买成功后，通知服务器
		//通过post发送数据给服务器
		if (data)
		{
			this.reqApppayPurches(data);
		}
		else
		{
			UIManager.closePanel(UIModuleName.PayMaskPanel);
			game.Console.log("sdkPaySucceed apple服务器验证支付失败 data:null");
		}
	}
	/**
     * 请求 apple 支付验证
     */
	private reqApppayPurches(data: any)
	{
		let checkData = new msg.C2GW_ReqApplePayCheck();
		let passdata = JSON.parse(data.passData);
		if (passdata.orderId.indexOf(game.LoginManager.loginUserInfo.account) == -1 || passdata.orderId.indexOf(UserManager.userInfo.roleId) == -1)
		{
			game.Console.log("非法支付passdata", data.passData);
			return;
		}
		let arr = data.passData.split("-");
		checkData.issandbox = arr[3];
		checkData.receipt = data.receipt;
		// checkData.state = data.state;
		// checkData.transactionIdentifier = data.transactionIdentifier;
		// checkData.productIdentifier = data.productIdentifier;
		let callBack: Function = function (result: game.SpRpcResult)
		{
			game.Console.log("服务器验证支付成功" + data.receipt);
			game.ExternalInterface.call(ExtFuncName.DeleteOrder, data.receipt);
			PropertyManager.ShowItemList();
		};
		let errorCallBack: Function = function (result: game.SpRpcResult)
		{
			let message: string = (data == '-1') ? '非法支付' : '支付失败';
			AlertManager.showAlert(message, null, null, null, null, data);
			game.Console.log("apple服务器验证支付失败");
		};
		PropertyManager.OpenGet();
		SocketManager.call(Command.C2GW_ReqApplePayCheck, checkData, callBack, errorCallBack, this);
	}
	/// <summary>
	/// 将商品名转化为product id
	/// </summary>
	/// <param name="productId"></param>
	/// <returns></returns>
	private ParseAwardId(productId: string): number
	{
		let reg: RegExp = new RegExp(/\d+$/);
		let result: RegExpMatchArray = productId.match(reg);
		if (result && result.length > 0)
		{
			return parseInt(result[0]);
		}
		return 0;
	}
	/// <summary>
	/// 发送服务器给数据
	/// receipt
	//  orderid 订单号
	//fee 金额
	/// </summary>
	/// <param name="data"></param>
	/// <returns></returns>
	private PostDataToServer(passData: string, receipt: string, payId: number): void
	{
		let passDataObj: any;
		try
		{
			passDataObj = JSON.parse(passData);
		}
		catch (e)
		{
			game.Console.log("苹果支付转换透传数据失败！");
		}
		let orderId: string;
		let bagId: number;
		if (!passDataObj)
		{
			orderId = ChannelUtil.GenerateOrder(payId, VersionManager.isServerTest);
			bagId = BundleManager.getBid();
		}
		else
		{
			orderId = passDataObj.orderId;
			bagId = passDataObj.bagId
		}
		if (ChannelUtil.IsOrderIlleg(orderId))
		{
			orderId = ChannelUtil.GenerateOrder(payId, VersionManager.isServerTest);
		}
		let params: string = "orderid=" + orderId + "&receipt=" + receipt + '&bagid=' + bagId;
		let path: string = ProjectDefined.getPayCallbackUrl(VersionManager.isServerTest);
		URLLoader.downloadContent(path, this, (data: any) =>
		{
			if (data != "21005")
			{
				if (data != "0")
				{
					let message: string = (data == '-1') ? '非法支付' : '支付失败';
					game.Console.log("服务器验证支付失败" + data);
					AlertManager.showAlert(message, null, null, null, null, data);
				}
				else
				{
					game.Console.log("服务器验证支付成功" + orderId);
					game.ExternalInterface.call(ExtFuncName.DeleteOrder, receipt);
				}
			}
			game.Tick.AddTimeoutInvoke(() =>
			{
				UIManager.closePanel(UIModuleName.PayMaskPanel);
			}, 1000, this);
		}, (data: any) =>
			{
				game.Console.log("服务器验证支付失败" + orderId);
				UIManager.closePanel(UIModuleName.PayMaskPanel);
			}, params, 1);
	}
	/**
	 * 选择图片
	 */
	public imageSelect(size: number, quality: number): void
	{
		let obj: Object = { size: size, quality: quality };
		game.ExternalInterface.call(ExtFuncName.ImageSelect, JSON.stringify(obj));
	}
	public openURL(url: string): void
	{
		game.ExternalInterface.call(ExtFuncName.OpenURL, url);
	}
	public copyToPastboard(data: string)
	{
		game.ExternalInterface.call(ExtFuncName.CopyToPastboard, data);
	}
}
