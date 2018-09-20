/**
 * 活动面板基类
 */
class BaseActivityPanel extends BasePanel
{
	protected activityInfo: ActivityInfo;
	public init(appendData: any)
	{
		super.init(appendData);
		this.activityInfo = appendData.info as ActivityInfo;
	}
}