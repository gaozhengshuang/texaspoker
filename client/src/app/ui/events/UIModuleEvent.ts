/**
 * ui模块事件
 */
class UIModuleEvent extends egret.Event
{
	/**
	 * socket连接超时事件
	 */
	public static OnTimeout: string = "OnTimeout";
	/**
	 * 面板名
	 */
	public panelName: string = game.StringConstants.Empty;
	//面板事件-----
	/**
    * 面传入回调target初始化事件
    */
	public static OnCallTargetInit: string = "OnCallTargetInit";
	public constructor(type: string, pName: string)
	{
		super(type);
		this.panelName = pName;
	}
}