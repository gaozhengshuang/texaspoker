/**
 * 底池奖励信息
 */
class PotAwardInfo extends BaseServerValueInfo
{
	public data: msg.IPotInfo;
	/**
	 * 用户ID列表
	 */
	public get roleId(): number[]
	{
		if (this.data)
		{
			return game.longToNumberList(this.data.roleid);
		}
	}
	public set roleId(value: number[])
	{
		if (this.data)
		{
			this.data.roleid = value;
		}
	}
	/**
	 * 0.主池 边池从1递增
	 */
	public get type(): number
	{
		if (this.data)
		{
			return this.data.type;
		}
	}
	public set type(value: number)
	{
		if (this.data)
		{
			this.data.type = value;
		}
	}
	/**
	 * 金额	
	 */
	public get num(): number
	{
		if (this.data)
		{
			return this.data.num;
		}
	}
	public set num(value: number)
	{
		if (this.data)
		{
			this.data.num = value;
		}
	}
	public reset()
	{
		this.data = undefined;
		this.roleId = undefined;
		this.type = 0;
		this.num = 0;
	}
}