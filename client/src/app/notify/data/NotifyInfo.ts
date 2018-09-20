/**
 * 通知信息
 */
class NotifyInfo
{
	/**
	 * 红点吸附的目标
	 */
	public attachObject: egret.DisplayObjectContainer;
	/**
	 * 绑定的通知类型
	 */
	public type: NotifyType;
	/**
	 * 上偏移
	 */
	public top: number;
	/**
	 * 右偏移
	 */
	public right: number;
	/**
	 * 是否显示数量
	 */
	public isShowNum:boolean;
	/**
	 * 附加参数，用于区别同一通知类型的不同红点显示
	 */
	public params:any;
}