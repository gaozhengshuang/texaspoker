/**
 * 绑定的账号信息
 */
class BindAccountInfo extends BaseServerValueInfo
{
	/**
	 * 渠道标识
	 */
	public channel: string;
	/**
	 * 绑定时间
	 */
	public time: number;
	public reset()
	{
		this.channel = undefined;
		this.time = undefined;
	}
}