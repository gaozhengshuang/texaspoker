/**
 * 基本红点通知处理
 */
abstract class BaseNotifyHandle
{
	protected type: NotifyType;

	public constructor(type: NotifyType)
	{
		this.type = type;
		this.init();
	}
	protected init()
	{
	}
	/**
	 * 设置通知的值
	 */
	protected dispatchNotify()
	{
		NotifyManager.dispatchNotify(this.type);
	}
	/**
	 * 获取未读消息的数量,如果没有数量，则大于0表示有通知，0表示没有通知
	 */
	public get count(): number
	{
		return 0;
	}
	/**
	 * 重置数据，用于重新登录时清空数据缓存
	 */
	public reset()
	{

	}
	/**
	 * 销毁
	 */
	public destroy()
	{
	}
}