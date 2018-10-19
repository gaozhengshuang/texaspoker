class NetUtil
{
	//------------------------------------------------------------------
	// alert
	//------------------------------------------------------------------

	public static AlertResultError(result: any, OnConfirm: Function = null)
	{
		let alertInfo: AlertInfo = new AlertInfo();
		// alertInfo.subTitle = game.StringUtil.format("protocol:{0} code:{1}", result.cmdId, result.error);
		alertInfo.message = JianTFanTTranser.tryTraditionalized(result.error);// ErrorDefined.GetInstance().getDetails(result.error);
		alertInfo.OnConfirm = OnConfirm;
		AlertManager.showAlertInfo(alertInfo);
	}
	public static AlertFailing(errorCode: string, OnReLogin: Function)
	{
		let alertInfo: AlertInfo = new AlertInfo();
		alertInfo.title = "连接失败";
		alertInfo.confirmLabel = "重新登录";
		// alertInfo.subTitle = errorCode;
		alertInfo.message = "登录验证失效或网络连接断开，点击确认重新登录游戏！";
		alertInfo.OnConfirm = OnReLogin;
		AlertManager.showAlertInfo(alertInfo);
	}
	public static AlertNetworkErrorReLogin(errorCode: string, OnReLogin: Function)
	{
		let alertInfo: AlertInfo = new AlertInfo();
		alertInfo.title = "网络断开";
		alertInfo.confirmLabel = "重新登录";
		// alertInfo.subTitle = errorCode;
		alertInfo.message = "登录验证已失效，点击确认重新登录游戏！";
		alertInfo.OnConfirm = OnReLogin;
		AlertManager.showAlertInfo(alertInfo);
	}
	/**
	 * socket 连接失败 网络错误，或服务器主动断开
	 */
	public static AlertConnectError(errorCode: string, OnReconnect: Function, title: string = "网络断开", message: string = "网络连接断开，请检查您的网络是否正常，点击确认重试！")
	{
		let alertInfo: AlertInfo = new AlertInfo();
		alertInfo.title = title;
		// alertInfo.subTitle = errorCode;
		alertInfo.confirmLabel = "重连";
		alertInfo.message = message;
		alertInfo.OnConfirm = OnReconnect;
		AlertManager.showAlertInfo(alertInfo);
	}
	public static AlertHandshakeError(errorCode: string, OnReconnect: Function)
	{
		let alertInfo: AlertInfo = new AlertInfo();
		alertInfo.title = "验证错误";
		// alertInfo.subTitle = errorCode;
		// let error: number = parseInt(errorCode);
		if (!game.StringUtil.isNullOrEmpty(errorCode))
		{
			alertInfo.message = errorCode;// ErrorDefined.GetInstance().getDetails(error);
		}
		else
		{
			alertInfo.message = "连接服务器验证错误";
		}
		alertInfo.confirmLabel = "重连";
		alertInfo.OnConfirm = OnReconnect;
		AlertManager.showAlertInfo(alertInfo);
	}
}
