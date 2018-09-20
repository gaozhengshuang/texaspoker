/**
 * 弹窗数据信息
 */
class PopupInfo
{
	/**
	 * 弹出类型
	 */
	public type: PopupType;
	/**
	 * 触发类型
	 */
	public triggerType: Array<PopupTriggerType> = new Array<PopupTriggerType>();
	/**
	 * 触发参数
	 */
	public triggerParams: Array<any> = new Array<any>();
	/**
	 * 是否弹出过
	 */
	public isPopuped:boolean;
	/**
	 * 是否延迟触发
	 */
	public isDelay:boolean;
}