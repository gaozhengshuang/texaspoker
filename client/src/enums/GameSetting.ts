/**
 * 游戏配置
 * */
class GameSetting
{
	/**
	 * 应用id
	 */
	public static readonly AppId: string = '1004';
	/**
	 * 舞台宽高
	 * */
	public static readonly StageWidth: number = 720;
	public static readonly StageHeight: number = 1280;
	/**
	 * 是否同意了用户协议
	 */
	public static IsAgreeUserAgreement: boolean = false;
	/**
	 * 最大邮件数量
	 */
	public static MaxMailNum: number = 30;
	/**
	 * 头像上传审核标记
	 */
	public static HeadUploadVerifySign: string = "#1#";
	/**
	 * 头像上传审核未通过
	 */
	public static HeadUploadUnPassSign: string = "#2#";

	private static _shakeEnabled: boolean;
	/**
	 * 是否开启震动
	 */
	public static get shakeEnabled(): boolean
	{
		if (GameSetting._shakeEnabled === undefined)
		{
			GameSetting._shakeEnabled = PrefsManager.getBoolean(PrefsManager.Shake_Enable, true);
		}
		return GameSetting._shakeEnabled;
	}
	public static set shakeEnabled(value: boolean)
	{
		GameSetting._shakeEnabled = value;
		PrefsManager.setBoolean(PrefsManager.Shake_Enable, value);
	}
	/**
	 * 是否开启自动语音
	 */
	private static _autoVoiceEnabled: boolean;
	public static get autoVoiceEnabled(): boolean
	{
		if (GameSetting._autoVoiceEnabled === undefined)
		{
			GameSetting._autoVoiceEnabled = PrefsManager.getBoolean(PrefsManager.AutoVocie_Enable, true);
		}
		return GameSetting._autoVoiceEnabled;
	}
	public static set autoVoiceEnabled(value: boolean)
	{
		GameSetting._autoVoiceEnabled = value;
		PrefsManager.setBoolean(PrefsManager.AutoVocie_Enable, value);
	}
	public static replaceHeadSign(targetStr: string): string
	{
		return targetStr.replace(/#[12]{1}#/g, qin.StringConstants.Empty);
	}
}