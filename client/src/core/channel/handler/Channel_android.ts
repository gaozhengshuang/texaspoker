class Channel_android extends ChannelBase
{
	public Login(loginType: string, isAutoLogin: boolean)
	{
		if (ChannelManager.loginType == ChannelLoginType.IntranetAccount) //微端测试使用 //loginType == ChannelLoginType.Account ||  // move todo
		{
			this.accountLogin(isAutoLogin);
		}
		else
		{
			egret.ExternalInterface.call(ExtFuncName.Login, loginType);
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
		// UIManager.showPanel(UIModuleName.PayMaskPanel);
		let bagId = BundleManager.getBid();//数字包ID
		let data = { "awardId": awardId, "passData": { "orderId": orderId, "bagId": bagId }, "price": price, "name": productName };
		console.log("白鹭支付 data：", JSON.stringify(data));
		game.ExternalInterface.call(ExtFuncName.Pay, JSON.stringify(data));
		// ChannelUtil.openWebPay(serverId, orderId, price, productName, awardId);
	}
	public share(type: string, title: string, message: string, inviteCode?: string)
	{
		let data: Object = {};
		data['type'] = type;
		data['title'] = title;
		data['message'] = message;
		data['url'] = ProjectDefined.getShareWebUrl(GameSetting.AppId, inviteCode);
		egret.ExternalInterface.call(ExtFuncName.Share, JSON.stringify(data));
	}
	public imageSelect(size: number, quality: number): void
	{
		let obj: Object = { size: size, quality: quality };
		egret.ExternalInterface.call(ExtFuncName.ImageSelect, JSON.stringify(obj));
	}
	public openURL(url: string): void
	{
		egret.ExternalInterface.call(ExtFuncName.OpenURL, url);
	}
	public copyToPastboard(data: string)
	{
		egret.ExternalInterface.call(ExtFuncName.CopyToPastboard, data);
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
			this.reqGooglePlayBilling(data);
			// let awardId: number = this.ParseAwardId(data.orderId);
			// let def: table.IPayListDefine = ShopDefined.GetInstance().getDefinitionByAwardId(awardId);
			// if (def != null)
			// {
			// 	 this.PostDataToServer(data.passData, data.receipt, awardId);
			// }
			// else
			// {
			// 	UIManager.closePanel(UIModuleName.PayMaskPanel);
			// }
		}
		else
		{
			UIManager.closePanel(UIModuleName.PayMaskPanel);
		}
	}
	/// <summary>
	/// 将商品名转化为product id
	/// </summary>
	/// <param name="orderId"></param>
	/// <returns></returns>
	private ParseAwardId(orderId: string): number
	{
		let reg: RegExp = new RegExp(/\d+$/);
		let result: RegExpMatchArray = orderId.match(reg);
		if (result && result.length > 0)
		{
			return parseInt(result[0]);
		}
		return 0;
	}
	/**
	 * 请求google play 支付验证
	 */
	private reqGooglePlayBilling(data: any)
	{
		let callBack: Function = function (result: game.SpRpcResult)
		{
			game.Console.log("googleplay服务器验证支付成功" + JSON.stringify(data));
			game.ExternalInterface.call(ExtFuncName.DeleteOrder, data.token);
		};
		let errorCallBack: Function = function (result: game.SpRpcResult)
		{
			game.Console.log("googleplay服务器验证支付失败");
		};
		let checkData = new msg.C2GW_ReqGooglePayCheck();
		checkData.productid = data.productId;
		checkData.purchasetoken = data.token;
		SocketManager.call(Command.C2GW_ReqGooglePayCheck, checkData, callBack, errorCallBack, this);
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
			game.Console.log("google支付转换透传数据失败！");
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
 	* 检查支付订单
 	*/
	public checkUnFinishedPayList()
	{
		game.ExternalInterface.call(ExtFuncName.CheckUnFinishedPayList, game.StringConstants.Empty);
	}
}
