/**
 * 底池奖励信息
 */
class PotAwardInfo extends BaseServerValueInfo
{
	/**
	 * 用户ID列表
	 */
	public roleId: Array<number>;
	/**
	 * 0.主池 边池从1递增
	 */
	public type: number;
	/**
	 * 金额	
	 */
	public num: number;
	public reset()
	{
		this.roleId = undefined;
		this.type = 0;
		this.num = 0;
	}
}