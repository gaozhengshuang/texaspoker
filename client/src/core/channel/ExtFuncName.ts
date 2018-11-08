class ExtFuncName
{
	/**
	 * 应用返回，只有ios有
	 */
	public static readonly OnBackToApplication: string = "OnBackToApplication";
	public static readonly OnApplicationFocus: string = "OnApplicationFocus";
	public static readonly OpenURL: string = "OpenURL";
	//
	public static readonly Initialize: string = "Initialize";
	public static readonly Login: string = "Login";
	/**
	 * 检测登录状态
	 */
	public static readonly CheckLoginState:string = "CheckLoginState";
	public static readonly Logout: string = "Logout";
	public static readonly Share: string = "Share";
	/**
	 * 请求麦克风(提前弹出权限提示),并且返回是否有权限
	 */
	public static readonly RequestMicrophone: string = "RequestMicrophone";
	/**
	 * 录音
	 */
	public static readonly RecordAudio: string = "RecordAudio";
	/**
	 * 设置录音数据
	 */
	public static readonly SetRecordData: string = "SetRecordData";
	/**
	 * 本地是否存在录音数据
	 */
	public static readonly HasRecordData: string = "HasRecordData";
	/**
	 * 播放录音
	 */
	public static readonly PlayRecord: string = "PlayRecord";
	/**
	 * 停止播放正在播放的录音
	 */
	public static readonly StopRecord: string = "StopRecord";
	//
	public static readonly SetExtData: string = "SetExtData";
	public static readonly SetChannelData: string = "SetChannelData";
	//pay
	public static readonly Pay: string = "Pay";
	public static readonly CheckUnFinishedPayList: string = "CheckUnFinishedPayList";
	public static readonly DeleteOrder: string = "DeleteOrder";
	//头像上传
	public static readonly ImageSelect: string = "ImageSelect";
	/**
	 * 震动
	 */
	public static readonly Shake: string = "Shake";
	//talkingdata
	public static readonly TDSetAccount: string = "TDSetAccount";
	public static readonly TDSetAccountName: string = "TDSetAccountName";
	public static readonly TDSetLevel: string = "TDSetLevel";
	public static readonly TDOnItemPurchase: string = "TDOnItemPurchase";
	public static readonly TDOnItemUse: string = "TDOnItemUse";
	public static readonly TDOnVirtualCurrencyChargeRequest: string = "TDOnVirtualCurrencyChargeRequest";
	public static readonly TDOnVirtualCurrencyChargeSuccess: string = "TDOnVirtualCurrencyChargeSuccess";
	//copy
	public static readonly CopyToPastboard: string = "CopyToPastboard";
}